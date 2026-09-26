import re
import json

def parse_block(q_num, raw_block):
    # Remove block headers
    block = re.sub(r'=== BLOC \d+ \([^)]+\) ===', '', raw_block)
    
    # 1. Domain detection
    domain_id = 3 # default Technology
    dom_match = re.search(r'Dom[ií]nio\s+([A-Za-z0-9\s&]+?)(?:\s*(?:Pergunta|[oO•]|$))', block, re.IGNORECASE)
    if dom_match:
        dom_str = dom_match.group(1).lower()
        if 'cloud' in dom_str or 'conceito' in dom_str:
            domain_id = 1
        elif 'security' in dom_str or 'seguran' in dom_str or 'compliance' in dom_str:
            domain_id = 2
        elif 'technolog' in dom_str or 'tecnolog' in dom_str:
            domain_id = 3
        elif 'bill' in dom_str or 'pric' in dom_str or 'cobran' in dom_str or 'finan' in dom_str or 'support' in dom_str:
            domain_id = 4

    # 2. General explanation
    general_exp = ""
    gen_match = re.search(r'Explica[çc][ãa]o geral\s+([\s\S]*?)(?:Dom[ií]nio|$)', block, re.IGNORECASE)
    if gen_match:
        general_exp = gen_match.group(1).strip()
        body = block[:gen_match.start()]
    else:
        body = block

    # 3. Clean start of question
    # e.g. "Pergunta 1 Correto 4: Explique melhor Qual das seguintes..."
    start_match = re.search(r'Pergunta\s+\d+\s*(?:Correto|Incorreto)?(?:\s*\d+:\s*Explique melhor)?', body, re.IGNORECASE)
    if start_match:
        body = body[start_match.end():]

    # Clean UI tags like "Sua resposta está incorreta", "Sua seleção está...", "resposta está cor..."
    ui_noises = [
        r'Sua resposta est[aá] incorreta',
        r'Sua sele[çc][aã]o est[aá] incorreta',
        r'Sua sele[çc][aã]o est[aá]',
        r'ua sele[çc][aã]o est[aá]',
        r'sele[çc][aã]o est[aá]',
        r'a resposta est[aá] cor[a-z]*',
        r'resposta est[aá] cor[a-z]*',
        r're[^\w\s]*\s*a resposta est[aá] cor[a-z]*',
        r're[^\w\s]*\s*resposta est[aá] co[a-z]*',
        r're[^\w\s]*\s*ua resposta est[aá] cor[a-z]*',
        r'J\@esposta co rreti\'',
    ]
    for noise in ui_noises:
        body = re.sub(noise, '', body, flags=re.IGNORECASE)

    # 4. Find all "Explicação (Correto!|Incorreto.)"
    # Matches: "Explicação Correto!", "Explicação Incorreto.", etc.
    exp_matches = list(re.finditer(r'Explica[çc][ãa]o\s+(Correto[!.]?|Incorreto[!.]?)\s*', body, re.IGNORECASE))
    
    if len(exp_matches) < 2:
        return None

    # Question prompt is before the first option
    # First option is right before exp_matches[0].start()
    first_exp_start = exp_matches[0].start()
    pre_text = body[:first_exp_start].strip()

    # Split pre_text into Question Prompt and Option 1
    # Often Option 1 starts on a new line or with a bullet like "O ", "C) ", "[8 "
    # Or pre_text has multiple lines: question prompt + option line
    pre_lines = [l.strip() for l in pre_text.split('\n') if l.strip()]
    if len(pre_lines) >= 2:
        q_prompt = " ".join(pre_lines[:-1]).strip()
        opt0_raw = pre_lines[-1]
    else:
        # Single line or fallback
        # Let's check if there's a '?' marking end of question prompt
        q_mark_pos = pre_text.rfind('?')
        if q_mark_pos != -1 and q_mark_pos < len(pre_text) - 3:
            q_prompt = pre_text[:q_mark_pos+1].strip()
            opt0_raw = pre_text[q_mark_pos+1:].strip()
        else:
            q_prompt = pre_text
            opt0_raw = "Opção 1"

    options = []
    opt_explanations = []
    correct_idx = -1

    # Extract options and explanations
    for idx, em in enumerate(exp_matches):
        status_word = em.group(1).lower()
        is_cor = status_word.startswith("correto")
        exp_start = em.end()
        next_exp_start = exp_matches[idx + 1].start() if idx + 1 < len(exp_matches) else len(body)
        
        chunk = body[exp_start:next_exp_start].strip()
        
        # In chunk, the explanation is first, and if not the last option, the next option's text is at the end of chunk
        if idx + 1 < len(exp_matches):
            chunk_lines = [cl.strip() for cl in chunk.split('\n') if cl.strip()]
            if len(chunk_lines) >= 2:
                cur_exp = " ".join(chunk_lines[:-1]).strip()
                next_opt_raw = chunk_lines[-1]
            elif len(chunk_lines) == 1:
                # If only 1 line, check if option starts with bullet or bullet-like char
                m_bullet = re.search(r'(?:^|[.!?]\s+)([oO•\(\[\@]\s+.*|[A-E][.)]\s+.*)$', chunk_lines[0])
                if m_bullet:
                    cur_exp = chunk_lines[0][:m_bullet.start(1)].strip()
                    next_opt_raw = m_bullet.group(1).strip()
                else:
                    cur_exp = chunk_lines[0]
                    next_opt_raw = f"Opção {idx + 2}"
            else:
                cur_exp = ""
                next_opt_raw = f"Opção {idx + 2}"
        else:
            cur_exp = chunk
            next_opt_raw = ""

        # Determine option text
        if idx == 0:
            raw_title = opt0_raw
        else:
            raw_title = prev_opt_raw

        # Try to refine option text from explanation if explanation quotes it:
        # e.g.: A opção 'Basic' soluciona... or 'Basic' é a resposta certa...
        quote_match = re.search(r"(?:A op[çc][ãa]o|pr[áa]tica citada em)\s+['\"]([^'\"]+)['\"]", cur_exp, re.IGNORECASE)
        if quote_match and len(quote_match.group(1).strip()) > 1:
            clean_title = quote_match.group(1).strip()
        else:
            # Clean raw title
            clean_title = re.sub(r'^[oO•\(\[\@]\s*', '', raw_title)
            clean_title = re.sub(r'^[A-E][.)]\s*', '', clean_title)
            clean_title = re.sub(r'^\[\d+\]\s*', '', clean_title)
            clean_title = clean_title.strip()
            
        if not clean_title or len(clean_title) < 2:
            clean_title = f"Alternativa {chr(65 + idx)}"

        options.append(clean_title)
        
        # Clean explanation text
        clean_exp = re.sub(r'^[oO•\(\[\@]\s*', '', cur_exp).strip()
        opt_explanations.append({
            "option": clean_title,
            "is_correct": is_cor,
            "explanation": clean_exp
        })

        if is_cor and correct_idx == -1:
            correct_idx = idx

        prev_opt_raw = next_opt_raw

    if correct_idx == -1:
        correct_idx = 0

    # Build final combined explanation
    exp_sections = []
    if general_exp:
        exp_sections.append(f"📚 Explicação Geral:\n{general_exp}")
    
    option_notes = []
    for opt_info in opt_explanations:
        status_tag = "✅ CORRETA" if opt_info["is_correct"] else "❌ INCORRETA"
        if opt_info["explanation"]:
            option_notes.append(f"{status_tag} - {opt_info['option']}:\n{opt_info['explanation']}")
            
    if option_notes:
        exp_sections.append("🔍 Justificativa das Alternativas:\n" + "\n\n".join(option_notes))

    full_explanation = "\n\n".join(exp_sections)

    # Clean q_prompt
    q_prompt = re.sub(r'^[oO•\(\[\@]\s*', '', q_prompt).strip()

    return {
        "q_num": q_num,
        "domainId": domain_id,
        "question": q_prompt,
        "options": options,
        "answer": correct_idx,
        "explanation": full_explanation
    }

def process_file(sim_name):
    filepath = f"questoes_extracted/{sim_name}_ocr.txt"
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Find all "Pergunta \d+"
    matches = list(re.finditer(r'Pergunta\s+(\d+)', text, re.IGNORECASE))
    print(f"=== {sim_name}: {len(matches)} perguntas detectadas ===")
    
    parsed_list = []
    for i, m in enumerate(matches):
        q_num = int(m.group(1))
        start_pos = m.start()
        end_pos = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        block = text[start_pos:end_pos]
        
        parsed = parse_block(q_num, block)
        if parsed and len(parsed["options"]) >= 2 and len(parsed["question"]) > 10:
            parsed_list.append(parsed)
        else:
            print(f"  [Aviso] Pergunta {q_num} não parseou completamente (options={len(parsed['options']) if parsed else 0})")

    print(f"{sim_name}: {len(parsed_list)} questões parseadas com sucesso!")
    return parsed_list

all_questions = []
for s in ['simulado2', 'simulado3', 'simulado4']:
    qs = process_file(s)
    all_questions.extend(qs)

with open('questoes_extracted/all_questions.json', 'w', encoding='utf-8') as f:
    json.dump(all_questions, f, ensure_ascii=False, indent=2)

print("Salvo arquivo questoes_extracted/all_questions.json com sucesso!")
