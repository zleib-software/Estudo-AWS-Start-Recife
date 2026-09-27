import json

with open('backend/src/data/questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

# Find all questions with < 4 options
less_than_4 = []
for idx, q in enumerate(questions):
    if len(q['options']) < 4:
        less_than_4.append((idx, q.get('id'), len(q['options']), q['question'], q['options'], q['answer']))

print(f"Total with < 4 options: {len(less_than_4)}")
for item in less_than_4:
    print(f"[{item[0]}] ID: {item[1]} (len={item[2]}, ans={item[5]}): {item[3]}")
    print(f"  Options: {item[4]}")
