Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]

function Await($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null

$lang = [Windows.Globalization.Language]::new("pt-BR")
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)

$simulados = @("simulado2", "simulado3", "simulado4")
$outputDir = "questoes_extracted"
if (!(Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir | Out-Null }

foreach ($sim in $simulados) {
    Write-Host "Processando $sim..."
    $imgDir = "$outputDir/$sim"
    if (!(Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir | Out-Null }
    
    # 1. Extrair imagens do PDF usando python
    python -c "
import pypdf, os
pdf_path = 'questoes/$sim.pdf'
out_dir = '$imgDir'
reader = pypdf.PdfReader(pdf_path)
page = reader.pages[0]
for idx, img in enumerate(page.images):
    img_name = f'img_{idx:03d}.jpg'
    with open(os.path.join(out_dir, img_name), 'wb') as f:
        f.write(img.data)
print(f'Extraidas {len(page.images)} imagens de $sim')
"

    # 2. Executar OCR em cada imagem em ordem
    $images = Get-ChildItem -Path $imgDir -Filter "*.jpg" | Sort-Object Name
    $fullText = New-Object System.Text.StringBuilder

    $total = $images.Count
    $current = 0
    foreach ($img in $images) {
        $current++
        Write-Host "  OCR $sim [$current/$total]: $($img.Name)"
        try {
            $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($img.FullName)) ([Windows.Storage.StorageFile])
            $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
            $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
            $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
            $ocrResult = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
            [void]$fullText.AppendLine("`n=== BLOC $current ($($img.Name)) ===`n")
            [void]$fullText.AppendLine($ocrResult.Text)
            $stream.Dispose()
        } catch {
            Write-Warning "Falha no OCR de $($img.FullName): $_"
        }
    }

    $textFile = "$outputDir/$sim`_ocr.txt"
    [System.IO.File]::WriteAllText($textFile, $fullText.ToString(), [System.Text.Encoding]::UTF8)
    Write-Host "Salvo texto completo em $textFile (Tamanho: $($fullText.Length) caracteres)"
}

Write-Host "Extração e OCR concluídos para todos os simulados!"
