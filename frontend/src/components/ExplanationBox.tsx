import React from 'react';

interface ExplanationBoxProps {
  explanation?: string;
}

export default function ExplanationBox({ explanation }: ExplanationBoxProps) {
  if (!explanation || !explanation.trim()) {
    return (
      <p className="text-sm text-gray-500 italic">
        Nenhuma explicação detalhada disponível para esta questão.
      </p>
    );
  }

  // Split into distinct blocks/paragraphs by double newlines or single newlines before bullets
  const normalized = explanation.replace(/\r\n/g, '\n').trim();
  const rawBlocks = normalized.split(/\n{2,}/);

  return (
    <div className="space-y-3.5 text-sm leading-relaxed">
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check if block contains bullet points (starts with • or has \n•)
        if (trimmed.includes('•') || trimmed.startsWith('- ')) {
          const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
          return (
            <div key={blockIdx} className="space-y-2 mt-2 pt-2 border-t border-gray-200/80">
              {lines.map((line, lineIdx) => {
                const isBullet = line.startsWith('•') || line.startsWith('- ');
                const content = isBullet ? line.replace(/^[•\-]\s*/, '') : line;
                
                // Try splitting title: body (e.g. "Amazon S3: Armazena objetos...")
                const colonMatch = content.match(/^([^:]+):\s*(.+)$/);

                if (isBullet && colonMatch) {
                  const title = colonMatch[1].trim();
                  const body = colonMatch[2].trim();
                  return (
                    <div 
                      key={lineIdx} 
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/80 border border-gray-200/60 shadow-xs"
                    >
                      <span className="shrink-0 w-2 h-2 rounded-full bg-aws-blue mt-1.5" />
                      <div className="text-gray-800 text-xs sm:text-sm">
                        <strong className="font-semibold text-aws-navy">{renderFormattedText(title)}: </strong>
                        <span className="text-gray-700">{renderFormattedText(body)}</span>
                      </div>
                    </div>
                  );
                }

                if (isBullet) {
                  return (
                    <div 
                      key={lineIdx} 
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/80 border border-gray-200/60 shadow-xs"
                    >
                      <span className="shrink-0 w-2 h-2 rounded-full bg-aws-blue mt-1.5" />
                      <span className="text-gray-700 text-xs sm:text-sm">{renderFormattedText(content)}</span>
                    </div>
                  );
                }

                return (
                  <p key={lineIdx} className="text-gray-700 text-xs sm:text-sm">
                    {renderFormattedText(line)}
                  </p>
                );
              })}
            </div>
          );
        }

        // Regular clean paragraph
        return (
          <p key={blockIdx} className="text-gray-800 font-normal">
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// Helper to render markdown-like **bold** segments
function renderFormattedText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-aws-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
