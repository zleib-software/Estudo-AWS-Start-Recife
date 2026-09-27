import json

with open('backend/src/data/questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Total questions: {len(questions)}")
print("\n--- Questions with < 4 options ---")
for idx, q in enumerate(questions):
    if len(q['options']) < 4:
        ans_idx = q['answer']
        ans = q['options'][ans_idx] if isinstance(ans_idx, int) and ans_idx < len(q['options']) else ans_idx
        print(f"[{idx}] ID: {q.get('id')} | Opts count: {len(q['options'])} | Ans: {ans}")
        print(f"  Q: {q.get('question')}")
        print(f"  Opts: {q.get('options')}")
        print()

print("\n--- Questions that mention multiple alternatives or pilares ---")
for idx, q in enumerate(questions):
    q_text = q.get('question', '').lower()
    exp_text = q.get('explanation', '').lower()
    if any(k in q_text for k in ['duas', 'três', 'tres', 'quais dos', 'quais das', 'selecione', 'pilares', 'componentes']) or 'selecione' in exp_text:
        print(f"[{idx}] ID: {q.get('id')} | Ans: {q.get('answer')} | Opts: {len(q['options'])}")
        print(f"  Q: {q.get('question')}")
        print(f"  Opts: {q.get('options')}")
        print(f"  Exp: {q.get('explanation')[:120]}...")
        print()
