import json
import re

with open('backend/src/data/questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Total questions before update: {len(questions)}")

# Dictionary of targeted updates
UPDATES = {
    # 1. Questions that had < 4 options (make them 4 or 5 options)
    "35": {
        "question": "Qual dos seguintes serviços de bancos de dados da AWS proporciona, por padrão, gerenciamento completo, incluindo automação de tarefas como backup, aplicação de patches, monitoramento e escalabilidade automática sem servidor?",
        "options": [
            "Amazon DynamoDB",
            "Amazon RDS for SQL Server",
            "Amazon RDS for MySQL",
            "Amazon EC2 com banco de dados autogerenciado"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "51": {
        "question": "Um time de desenvolvimento detectou baixo desempenho em um banco de dados relacional. A concorrência entre um alto volume de consultas e outras operações no banco de dados tem elevado a latência no tráfego de dados. Qual é a abordagem mais eficiente e econômica para solucionar esse problema?",
        "options": [
            "Utilizar Read Replicas (Réplicas de Leitura do RDS)",
            "Substituir o RDS pelo DynamoDB",
            "Atualizar a role de acesso IAM ao banco de dados",
            "Aumentar a capacidade de armazenamento de um bucket S3"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "73": {
        "question": "Uma empresa de e-commerce enfrenta picos de tráfego durante promoções e precisa ajustar sua infraestrutura para garantir alta disponibilidade e bom desempenho, mesmo em momentos de alta demanda. Qual princípio de design de arquitetura é mais adequado para atender a essa necessidade?",
        "options": [
            "Implementar automação para provisionar e desprovisionar recursos conforme necessário (escalabilidade automática)",
            "Projetar para falhas e desativar balanceadores de carga",
            "Provisionar permanentemente a capacidade máxima esperada para o ano todo",
            "Migrar todos os servidores para uma única Zona de Disponibilidade física"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "99": {
        "question": "Qual é o banco de dados sem servidor (serverless) da AWS que oferece escalabilidade automática, suporte a esquemas flexíveis (chave-valor e documentos) e é ideal para cargas de trabalho que requerem baixa latência de milissegundos, como jogos e IoT?",
        "options": [
            "Amazon DynamoDB",
            "Amazon RDS for MySQL",
            "Amazon RDS for PostgreSQL",
            "Amazon RDS for MariaDB"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "111": {
        "question": "Clientes na Europa e Austrália enfrentam lentidão no carregamento de imagens em um site cuja infraestrutura está na Região de São Paulo. Qual solução imediata poderia ser implementada para melhorar a performance global, considerando a necessidade de reduzir a latência e otimizar a experiência do usuário?",
        "options": [
            "Habilitar o Amazon CloudFront para distribuir o conteúdo em Edge Locations globais",
            "Habilitar o S3 Intelligent-Tiering para reduzir os custos de armazenamento",
            "Reduzir drasticamente a resolução das imagens salvas no servidor",
            "Provisionar instâncias EC2 adicionais na mesma Região de São Paulo"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "112": {
        "question": "No contexto do Modelo de Responsabilidade Compartilhada da AWS, qual das seguintes alternativas descreve corretamente a divisão de responsabilidades sobre a criptografia e proteção dos dados?",
        "options": [
            "O cliente é responsável por configurar e gerenciar a criptografia de seus dados na nuvem (em repouso e em trânsito)",
            "A AWS é responsável por criptografar automaticamente e sem intervenção todos os arquivos e dados de clientes",
            "O cliente é responsável pela segurança física e manutenção dos discos rígidos nos data centers da AWS",
            "A AWS é a única responsável pela gestão de identidades e permissões de acesso dos usuários finais"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },

    # 2. MULTIPLE SELECTION QUESTIONS (MultiSelect: True, 5 Options)
    # Question 39
    "39": {
        "question": "Quais dos seguintes itens fazem parte dos 6 pilares oficiais do AWS Well-Architected Framework? (Selecione 2 alternativas)",
        "options": [
            "Segurança",
            "Excelência Operacional",
            "Monitoramento Contínuo",
            "Desacoplamento de Aplicações",
            "Escalabilidade Automática de Rede"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "Segurança e Excelência Operacional são pilares oficiais do AWS Well-Architected Framework (junto com Confiabilidade, Eficiência de Desempenho, Otimização de Custos e Sustentabilidade).\n\n• **Monitoramento Contínuo**: Prática essencial, mas não é um pilar oficial.\n• **Desacoplamento**: Princípio de design arquitetural, não um pilar.\n• **Escalabilidade Automática**: Recurso técnico da infraestrutura."
    },

    # Question 48
    "48": {
        "question": "Quais são os dois componentes principais do Amazon S3 utilizados para organizar e armazenar dados na nuvem? (Selecione 2 alternativas)",
        "options": [
            "Buckets",
            "Objetos",
            "IAM Roles",
            "Funções Lambda",
            "Tabelas de Rotas"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "No Amazon S3, os dois componentes fundamentais são:\n\n• **Buckets**: Contêineres de nível superior que armazenam os dados.\n• **Objetos**: Os arquivos em si, compostos por dados, metadados e chave identificadora.\n\n• **IAM Roles**: Gerenciamento de credenciais e permissões.\n• **Funções Lambda**: Computação serverless.\n• **Tabelas de Rotas**: Roteamento de rede dentro de uma VPC."
    },

    # Question 60
    "60": {
        "question": "O AWS Trusted Advisor é um serviço que inspeciona seu ambiente para seguir as melhores práticas da AWS. Quais dos itens abaixo representam categorias oficiais avaliadas pelo Trusted Advisor? (Selecione 3 alternativas)",
        "options": [
            "Otimização de Custos",
            "Segurança",
            "Desempenho (Performance)",
            "Proteção Física de Hardware",
            "Manutenção Elétrica de Servidores"
        ],
        "answer": [0, 1, 2],
        "multiSelect": True,
        "requiredSelections": 3,
        "explanation": "O AWS Trusted Advisor fornece recomendações em 5 categorias essenciais: Otimização de Custos, Segurança, Desempenho, Tolerância a Falhas e Limites de Serviço.\n\n• **Proteção Física e Manutenção Elétrica**: São de responsabilidade exclusiva da AWS segundo o Modelo de Responsabilidade Compartilhada."
    },

    # Question 82
    "82": {
        "question": "Quais são possíveis utilizações da AWS CLI (Command Line Interface) na administração de recursos na nuvem? (Selecione 2 alternativas)",
        "options": [
            "Controlar e gerenciar múltiplos serviços da AWS via comandos no terminal",
            "Automatizar tarefas e provisionamentos por meio de scripts de automação",
            "Acessar fisicamente servidores nos data centers da AWS",
            "Substituir a necessidade de chaves de acesso e permissões IAM",
            "Configurar diretamente o hardware das placas-mãe nos data centers"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "A AWS CLI permite gerenciar recursos via linha de comando e integrar automações com scripts (Bash, PowerShell, Python), economizando tempo em tarefas repetitivas.\n\n• **Acesso Físico e Hardware**: Clientes nunca têm acesso aos data centers físicos da AWS.\n• **Permissões IAM**: O CLI ainda exige credenciais válidas configuradas no perfil do IAM."
    },

    # Question 89
    "89": {
        "question": "Quais são as três etapas principais do processo de ETL executadas pelo serviço AWS Glue? (Selecione 3 alternativas)",
        "options": [
            "Extrair dados (Extract) de diversas fontes",
            "Transformar dados (Transform) aplicando limpeza e formatação",
            "Carregar dados (Load) no destino para análise",
            "Criptografar cabos físicos de fibra óptica",
            "Hospedar sites estáticos diretamente na web"
        ],
        "answer": [0, 1, 2],
        "multiSelect": True,
        "requiredSelections": 3,
        "explanation": "O AWS Glue é um serviço de ETL totalmente gerenciado cuja sigla significa:\n\n• **Extract**: Extrair dados de bancos de dados, S3 ou streams.\n• **Transform**: Limpar, validar, mapear e transformar esquemas.\n• **Load**: Carregar os dados enriquecidos em data lakes (S3) ou data warehouses (Redshift)."
    },

    # Question 97
    "97": {
        "question": "Quais opções representam recursos e práticas fundamentais da perspectiva de Segurança no AWS Cloud Adoption Framework (AWS CAF)? (Selecione 2 alternativas)",
        "options": [
            "Proteção de dados com criptografia em repouso e em trânsito",
            "Controles de acesso baseados em identidade e menor privilégio",
            "Negociação de contratos de energia elétrica para data centers",
            "Planejamento de refrigeração de racks de servidores físicos",
            "Gerenciamento manual de cabeamento de rede estruturada"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "Na perspectiva de Segurança do AWS CAF, os pilares incluem proteção de dados (criptografia), controle de identidade e acesso (IAM), segurança de rede e resposta a incidentes.\n\n• **Infraestrutura física**: Energia, refrigeração e cabeamento são gerenciados integralmente pela AWS."
    },

    # Question 102
    "102": {
        "question": "Selecione as afirmações verdadeiras sobre o AWS Identity and Access Management (IAM): (Selecione 2 alternativas)",
        "options": [
            "Suporta a integração com provedores de identidade externos (SAML 2.0 / OpenID Connect)",
            "Permite habilitar autenticação multifator (MFA) para maior segurança das contas",
            "Necessita obrigatoriamente da conta root para todas as tarefas do dia a dia",
            "Não permite a delegação de permissões específicas para serviços da AWS",
            "Cobra taxas mensais adicionais fixas por cada usuário cadastrado"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "O AWS IAM é um serviço global e gratuito que suporta federação de identidades com diretórios corporativos (SAML/OpenID) e recomenda fortemente o uso de MFA para proteger credenciais.\n\n• **Conta root**: Deve ser bloqueada e não utilizada nas tarefas diárias.\n• **Delegação de permissões**: É a função primária do IAM através de Roles e Policies."
    },

    # Question 103
    "103": {
        "question": "Quais dos itens abaixo NÃO fazem parte dos 6 pilares oficiais do AWS Well-Architected Framework? (Selecione 2 alternativas)",
        "options": [
            "Elasticidade",
            "Desacoplamento",
            "Segurança",
            "Sustentabilidade",
            "Excelência Operacional"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "Elasticidade e Desacoplamento são boas práticas arquiteturais recomendadas na nuvem, mas NÃO são pilares do Well-Architected Framework.\n\n• Os 6 pilares oficiais são: Excelência Operacional, Segurança, Confiabilidade, Eficiência de Desempenho, Otimização de Custos e Sustentabilidade."
    },

    # Question 114
    "114": {
        "question": "Quais são as principais capacidades oferecidas pelo Amazon SageMaker no ciclo de vida de Machine Learning? (Selecione 2 alternativas)",
        "options": [
            "Preparar, construir e treinar modelos de Machine Learning",
            "Implantar e monitorar modelos de Machine Learning em produção",
            "Gerenciar clusters locais de contêineres on-premises",
            "Substituir o Amazon Route 53 no gerenciamento de domínios DNS",
            "Proteger redes corporativas contra ataques DDoS na camada 3 e 4"
        ],
        "answer": [0, 1],
        "multiSelect": True,
        "requiredSelections": 2,
        "explanation": "O Amazon SageMaker é a plataforma integrada de ponta a ponta da AWS que permite aos desenvolvedores e cientistas de dados preparar dados, construir, treinar, validar, implantar e monitorar modelos de Machine Learning com alta eficiência."
    },

    # Question 131 (User's screenshot!)
    "131": {
        "question": "Quais dos itens abaixo fazem parte dos pilares oficiais do AWS Well-Architected Framework? (Selecione 3 alternativas)",
        "options": [
            "Sustentabilidade",
            "Otimização de Custos",
            "Disponibilidade",
            "Eficiência de Performance",
            "Resiliência"
        ],
        "answer": [0, 1, 3],
        "multiSelect": True,
        "requiredSelections": 3,
        "explanation": "Sustentabilidade, Otimização de Custos e Eficiência de Performance são pilares oficiais do AWS Well-Architected Framework.\n\n• **Disponibilidade e Resiliência**: São objetivos de projeto e características técnicas alcançadas através do pilar Confiabilidade, mas não são nomes de pilares."
    },

    # Question 147
    "147": {
        "question": "No Amazon S3, quais são os três componentes fundamentais que compõem um objeto armazenado? (Selecione 3 alternativas)",
        "options": [
            "Dados (o conteúdo do arquivo em si)",
            "Metadados (informações sobre o arquivo)",
            "Identificador exclusivo (Chave / Key)",
            "Instância EC2 associada",
            "Certificado SSL dedicado"
        ],
        "answer": [0, 1, 2],
        "multiSelect": True,
        "requiredSelections": 3,
        "explanation": "No Amazon S3, cada objeto é composto fundamentalmente por três elementos:\n\n• **Dados**: O conteúdo binário ou textual do arquivo.\n• **Metadados**: Pares de chave-valor que descrevem o objeto (como tipo MIME e data de modificação).\n• **Chave (Key)**: O identificador exclusivo do objeto dentro do bucket."
    },

    # 3. Rich questions with 5 options (single choice) for exam diversity
    "37": {
        "question": "Uma startup SaaS precisa avaliar os planos de suporte oficiais disponíveis na AWS. Quais são os cinco planos de suporte oferecidos pela AWS?",
        "options": [
            "Basic, Developer, Business, Enterprise On-Ramp e Enterprise",
            "Basic, Developer, Business, Advanced e Enterprise",
            "Standard, Developer, Business, Enterprise e Premium",
            "Bronze, Silver, Gold, Platinum e Diamond",
            "Free, Startup, Growth, Corporate e Enterprise"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "92": {
        "question": "A Amazon oferece várias classes de armazenamento no S3 específicas para cada caso de uso. Qual classe é recomendada para dados pouco acessados, mas que necessitam de recuperação rápida em milissegundos quando solicitados?",
        "options": [
            "S3 Standard-Infrequent Access (S3 Standard-IA)",
            "S3 Intelligent-Tiering",
            "S3 Glacier Flexible Retrieval",
            "S3 Glacier Deep Archive",
            "S3 Express One Zone"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "110": {
        "question": "Para desenvolver uma solução que permita a uma aplicação web escalonar automaticamente o número de instâncias EC2 de acordo com o aumento ou redução do tráfego, qual serviço deve ser configurado?",
        "options": [
            "Auto Scaling Group (ASG)",
            "AWS CloudFormation",
            "Amazon Route 53",
            "Elastic Load Balancing (ELB)",
            "Amazon CloudFront"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "115": {
        "question": "Em relação à infraestrutura global da AWS, qual das seguintes afirmações sobre Regiões e Zonas de Disponibilidade (AZs) está correta?",
        "options": [
            "Cada Região da AWS é composta por pelo menos duas ou mais Zonas de Disponibilidade (AZs) isoladas",
            "Uma Região é composta por apenas um único data center compartilhado",
            "Zonas de Disponibilidade são apenas nomes lógicos sem instalações físicas reais",
            "Todas as Regiões da AWS possuem exatamente a mesma quantidade de data centers",
            "Uma Zona de Disponibilidade conecta diretamente todas as Regiões sem necessidade de cabos submarinos"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    },
    "133": {
        "question": "O departamento de marketing de uma empresa está elaborando uma campanha contínua com duração prevista de 12 meses ininterruptos. Qual modelo de compra de instâncias EC2 oferece a maior economia para essa carga de trabalho permanente?",
        "options": [
            "Instâncias Reservadas (Reserved Instances) ou Savings Plans",
            "Instâncias On-Demand (Sob Demanda)",
            "Instâncias Spot",
            "Instâncias de Teste Temporário (Free Tier)",
            "Dedicated Hosts sem compromisso de prazo"
        ],
        "answer": 0,
        "multiSelect": False,
        "requiredSelections": 1
    }
}

updated_count = 0
for q in questions:
    qid = str(q.get('id'))
    if qid in UPDATES:
        u = UPDATES[qid]
        q['question'] = u['question']
        q['options'] = u['options']
        q['answer'] = u['answer']
        q['multiSelect'] = u.get('multiSelect', False)
        q['requiredSelections'] = u.get('requiredSelections', 1)
        if 'explanation' in u:
            q['explanation'] = u['explanation']
        updated_count += 1
    else:
        # Default flags for other questions
        if 'multiSelect' not in q:
            q['multiSelect'] = False
        if 'requiredSelections' not in q:
            q['requiredSelections'] = 1

# Verify option count distribution
counts = {}
for q in questions:
    l = len(q['options'])
    counts[l] = counts.get(l, 0) + 1

print(f"Total updated with explicit rules: {updated_count}")
print(f"New option counts distribution: {counts}")

# Assert no question has < 4 options
assert all(len(q['options']) >= 4 for q in questions), "Erro: ainda existem questões com menos de 4 opções!"

# Save back to backend/src/data/questions.json
with open('backend/src/data/questions.json', 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

print("Banco de dados atualizado com sucesso!")
