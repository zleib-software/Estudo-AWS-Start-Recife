/**
 * As 26 questões originais do QUESTION_BANK do index.html.
 * Extraídas diretamente do código-fonte para seed inicial no MongoDB.
 * O campo `id` numérico original é preservado como `legacyId` no source
 * para referência, mas o banco usa _id do Mongo.
 */
const INITIAL_QUESTIONS = [
  // ================= DOMÍNIO 1: CONCEITOS DE NUVEM (~24%) =================
  {
    domainId: 1,
    question:
      'De acordo com o AWS Well-Architected Framework, qual pilar foca na capacidade de uma carga de trabalho executar suas funções pretendidas corretamente e de forma consistente quando esperado, e se recuperar de falhas de infraestrutura?',
    options: [
      'Excelência Operacional',
      'Confiabilidade (Reliability)',
      'Eficiência de Desempenho',
      'Sustentabilidade',
    ],
    answer: 1,
    explanation:
      'O pilar Confiabilidade (Reliability) abrange a capacidade do sistema de mitigar e se recuperar de falhas, testar procedimentos de recuperação e dimensionar horizontalmente para aumentar a disponibilidade.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 1,
    question:
      'Qual vantagem da computação em nuvem AWS permite às empresas trocar despesas com investimentos em capital (CapEx) por despesas operacionais variáveis (OpEx)?',
    options: [
      'Economias de escala massivas',
      'Pagar apenas pelo consumo (Pay-as-you-go)',
      'Aumentar a velocidade e a agilidade',
      'Garantia de custo zero em instâncias reservadas',
    ],
    answer: 1,
    explanation:
      'A nuvem permite substituir custos de capital iniciais em hardware físico e data centers (CapEx) por custos variáveis flexíveis e proporcionais ao uso real dos serviços (OpEx).',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 1,
    question:
      'Qual pilar do AWS Cloud Adoption Framework (AWS CAF) foca em criar uma cultura de inovação contínua, desenvolver habilidades em nuvem e alinhar as equipes organizacionais?',
    options: [
      'Perspectiva de Negócios',
      'Perspectiva de Pessoas',
      'Perspectiva de Governança',
      'Perspectiva de Segurança',
    ],
    answer: 1,
    explanation:
      'A perspectiva de Pessoas (People) do AWS CAF orienta as organizações na evolução de sua cultura corporativa, estrutura de equipes e capacitação de talentos para a transformação digital.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 1,
    question: 'O que caracteriza o conceito de Elasticidade na nuvem AWS?',
    options: [
      'A capacidade de alocar recursos fixos permanentemente sem variação.',
      'O provisionamento e desprovisionamento automático de recursos de acordo com as variações de demanda.',
      'A garantia de backup de dados em 3 Regiões AWS simultaneamente.',
      'A migração automática de cargas de trabalho para servidores físicos dedicados.',
    ],
    answer: 1,
    explanation:
      'Elasticidade é a capacidade de ajustar automaticamente a quantidade de recursos alocados conforme a demanda flutua, evitando custos desnecessários em momentos de baixo tráfego.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 1,
    question:
      'Uma empresa precisa implantar uma aplicação com baixíssima latência para usuários finais globais. Qual conceito da Infraestrutura Global da AWS atende a esse requisito?',
    options: [
      'Zonas de Disponibilidade (AZs)',
      'Pontos de Presença / Locações de Borda (Edge Locations)',
      'Regiões Locais de Backup',
      'Subredes Privadas de Região',
    ],
    answer: 1,
    explanation:
      'Os Pontos de Presença (Edge Locations) utilizam a rede CDN Amazon CloudFront para entregar dados, vídeos e APIs aos usuários com a menor latência possível.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 1,
    question:
      'O que é uma Zona de Disponibilidade (Availability Zone - AZ) na AWS?',
    options: [
      'Um data center individual sem redundância de energia.',
      'Um ou mais data centers discretos e redundantes conectados por redes de altíssima velocidade em uma Região.',
      'Uma coleção global de servidores de cache para S3.',
      'Uma cidade inteira dedicada ao processamento de dados.',
    ],
    answer: 1,
    explanation:
      'Cada Zona de Disponibilidade (AZ) é composta por um ou mais data centers isolados contra falhas (energia, refrigeração e rede) dentro de uma Região geográfica.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 1,
    question:
      'Qual benefício da nuvem AWS permite que desenvolvedores experimentem e implantem recursos de TI em questão de minutos, em vez de semanas?',
    options: [
      'Agilidade',
      'Economia de escala',
      'Aumento de CapEx',
      'Tolerância estática a falhas',
    ],
    answer: 0,
    explanation:
      'Agilidade refere-se ao acesso imediato a novos recursos tecnológicos, reduzindo o tempo de inovação e lançamento de produtos.',
    source: 'QUESTION_BANK_INITIAL',
  },

  // ================= DOMÍNIO 2: SEGURANÇA E CONFORMIDADE (~30%) =================
  {
    domainId: 2,
    question:
      'De acordo com o Modelo de Responsabilidade Compartilhada da AWS, qual das opções a seguir é de responsabilidade EXCLUSIVA do cliente?',
    options: [
      'Manutenção do hardware dos servidores nos data centers.',
      'Proteção e criptografia dos dados do cliente em repouso e em trânsito.',
      'Atualização de firmware em roteadores de borda da AWS.',
      'Descarte físico seguro de discos rígidos danificados.',
    ],
    answer: 1,
    explanation:
      "A AWS é responsável pela segurança 'DA' nuvem (infraestrutura física, hardware, hipervisores). O cliente é responsável pela segurança 'NA' nuvem (dados, criptografia, IAM e regras de firewall).",
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 2,
    question:
      'Qual recomendação de segurança do AWS IAM reforça a proteção ao solicitar uma segunda forma de verificação além da senha do usuário?',
    options: [
      'Rotação de Chaves KMS',
      'Autenticação Multifator (MFA)',
      'Listas de Controle de Acesso (NACL)',
      'Chaves de Acesso de Longo Prazo',
    ],
    answer: 1,
    explanation:
      'A Autenticação Multifator (MFA) adiciona uma camada essencial de segurança, exigindo um código temporário gerado por token ou dispositivo celular.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 2,
    question:
      'Qual serviço AWS é um detector inteligente de ameaças gerenciado que analisa continuamente logs da AWS (CloudTrail, VPC Flow Logs e DNS) usando aprendizado de máquina?',
    options: [
      'Amazon Inspector',
      'AWS WAF',
      'Amazon GuardDuty',
      'AWS Secrets Manager',
    ],
    answer: 2,
    explanation:
      'O Amazon GuardDuty monitora e identifica atividades maliciosas e não autorizadas na sua conta e cargas de trabalho na AWS.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 2,
    question:
      'Onde um auditor de segurança pode obter acesso sob demanda a relatórios de conformidade (como SOC, PCI-DSS e ISO) e acordos da AWS?',
    options: [
      'AWS Trusted Advisor',
      'AWS Artifact',
      'AWS Security Hub',
      'Amazon Macie',
    ],
    answer: 1,
    explanation:
      'O AWS Artifact é o portal gratuito de conformidade da AWS que oferece acesso a relatórios de auditoria e certificações internacionais.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 2,
    question:
      'Qual é a principal diferença de comportamento de rede entre um Grupo de Segurança (Security Group) e uma Lista de Controle de Acesso à Rede (NACL)?',
    options: [
      'Security Groups funcionam na subrede e são stateless; NACLs funcionam na instância e são stateful.',
      'Security Groups atuam no nível de instância e são stateful; NACLs atuam no nível de subrede e são stateless.',
      'Security Groups permitem regras explícitas de negação (Deny), enquanto NACLs não permitem.',
      'NACLs são usadas exclusivamente para criptografia de dados em discos EBS.',
    ],
    answer: 1,
    explanation:
      'Security Groups atuam na instância e são stateful (respostas ao tráfego permitido entram automaticamente). NACLs atuam na subrede e são stateless (regras de entrada e saída são avaliadas separadamente).',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 2,
    question:
      'Qual serviço AWS é usado para proteger aplicações web contra explorações comuns da Web, como injeção de SQL (SQLi) e Cross-Site Scripting (XSS)?',
    options: [
      'AWS Shield Standard',
      'AWS WAF (Web Application Firewall)',
      'Amazon GuardDuty',
      'AWS Network Firewall',
    ],
    answer: 1,
    explanation:
      'O AWS WAF inspeciona requisições HTTP/HTTPS no nível da camada de aplicação (Camada 7) e bloqueia ataques como SQLi e XSS.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 2,
    question:
      'Qual serviço permite criar, gerenciar e controlar chaves de criptografia usadas para proteger seus dados nos serviços AWS?',
    options: [
      'AWS Certificate Manager (ACM)',
      'AWS Key Management Service (KMS)',
      'AWS Secrets Manager',
      'AWS IAM Access Analyzer',
    ],
    answer: 1,
    explanation:
      'O AWS KMS é um serviço gerenciado que facilita a criação e o controle das chaves de criptografia criptográficas da sua organização.',
    source: 'QUESTION_BANK_INITIAL',
  },

  // ================= DOMÍNIO 3: TECNOLOGIA E SERVIÇOS EM NUVEM (~34%) =================
  {
    domainId: 3,
    question:
      'Uma equipe precisa executar código em resposta a eventos (ex: upload de foto no Amazon S3) sem a necessidade de provisionar ou gerenciar servidores. Qual serviço utilizar?',
    options: [
      'Amazon EC2',
      'AWS Lambda',
      'Amazon ECS',
      'AWS Elastic Beanstalk',
    ],
    answer: 1,
    explanation:
      'O AWS Lambda é o serviço de computação Serverless (sem servidor) que executa seu código em resposta a eventos com cobrança por milissegundo de execução.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 3,
    question:
      'Qual classe de armazenamento do Amazon S3 é ideal para dados armazenados a longo prazo, raramente acessados, com recuperação de baixo custo em questão de horas?',
    options: [
      'S3 Standard',
      'S3 Standard-Infrequent Access (S3 Standard-IA)',
      'S3 Glacier Flexible Retrieval / Deep Archive',
      'S3 Intelligent-Tiering',
    ],
    answer: 2,
    explanation:
      'O S3 Glacier e S3 Glacier Deep Archive oferecem armazenamento de baixíssimo custo para arquivamento de dados e auditorias corporativas.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 3,
    question:
      'Qual banco de dados gerenciado da AWS é do tipo NoSQL (chave-valor e documentos), oferecendo desempenho de latência inferior a 10 milissegundos em qualquer escala?',
    options: [
      'Amazon RDS',
      'Amazon Aurora',
      'Amazon DynamoDB',
      'Amazon Redshift',
    ],
    answer: 2,
    explanation:
      'O Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado, escalável e de altíssimo desempenho para aplicações modernas.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 3,
    question:
      'Qual serviço AWS funciona como uma Rede de Distribuição de Conteúdo (CDN) global para acelerar a entrega de conteúdo estático e dinâmico aos usuários?',
    options: [
      'Amazon Route 53',
      'AWS Direct Connect',
      'Amazon CloudFront',
      'AWS Global Accelerator',
    ],
    answer: 2,
    explanation:
      'O Amazon CloudFront distribui dados, vídeos, aplicações e APIs de forma segura para clientes globais com baixa latência usando a rede de Pontos de Presença.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 3,
    question:
      'Qual serviço de armazenamento fornece um sistema de arquivos em rede compartilhado e escalável para instâncias Linux (protocolo NFS)?',
    options: [
      'Amazon EBS (Elastic Block Store)',
      'Amazon S3',
      'Amazon EFS (Elastic File System)',
      'AWS Storage Gateway',
    ],
    answer: 2,
    explanation:
      'O Amazon EFS é um sistema de arquivos para Linux que pode ser montado simultaneamente por centenas de instâncias EC2.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 3,
    question:
      'Qual serviço AWS registra e monitora as chamadas de API e atividades de gerenciamento realizadas na sua conta para fins de governança e auditoria?',
    options: [
      'Amazon CloudWatch',
      'AWS CloudTrail',
      'AWS Config',
      'Amazon GuardDuty',
    ],
    answer: 1,
    explanation:
      'O AWS CloudTrail rastreia e registra o histórico de ações executadas por usuários, funções ou serviços na API da AWS.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 3,
    question:
      'Qual opção de compra de Instância EC2 oferece o maior desconto (até 90%) para cargas de trabalho tolerantes a interrupções e processamento em lote?',
    options: [
      'Instâncias On-Demand',
      'Instâncias Reservadas (RIs)',
      'Instâncias Spot',
      'Hospedeiros Dedicados',
    ],
    answer: 2,
    explanation:
      'Instâncias Spot aproveitam a capacidade ociosa de computação na AWS com grandes descontos, mas podem ser interrompidas com aviso prévio de 2 minutos.',
    source: 'QUESTION_BANK_INITIAL',
  },

  // ================= DOMÍNIO 4: COBRANÇA, FINANÇAS E SUPORTE (~12%) =================
  {
    domainId: 4,
    question:
      'Qual ferramenta da AWS permite criar alertas personalizados quando seus custos ou uso estimado de nuvem ultrapassarem limites financeiros predefinidos?',
    options: [
      'AWS Cost Explorer',
      'AWS Budgets',
      'AWS Pricing Calculator',
      'AWS License Manager',
    ],
    answer: 1,
    explanation:
      'O AWS Budgets permite configurar orçamentos personalizados e enviar alertas via e-mail ou SNS ao atingir limites de custos estipulados.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 4,
    question:
      'Qual plano de Suporte da AWS é o nível mínimo recomendado para cargas de trabalho de produção que exige suporte técnico 24x7 via telefone, chat e e-mail com resposta em menos de 1 hora para falhas graves?',
    options: [
      'AWS Basic Support',
      'AWS Developer Support',
      'AWS Business Support',
      'AWS Enterprise Support',
    ],
    answer: 2,
    explanation:
      'O AWS Business Support é recomendado para sistemas em produção, garantindo suporte técnico 24x7 com tempo de resposta de até 1 hora para sistemas caídos.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 4,
    question:
      'Qual recurso do AWS Organizations permite consolidar o pagamento de múltiplas contas AWS sob uma única fatura e obter descontos por volume acumulado?',
    options: [
      'Agregador de Custos',
      'Faturamento Consolidado (Consolidated Billing)',
      'AWS Marketplace Sharing',
      'AWS Cost Anomaly Detection',
    ],
    answer: 1,
    explanation:
      'O Faturamento Consolidado combina o uso de todas as contas vinculadas em uma organização, permitindo atingir níveis de preços com mais desconto por escala.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 4,
    question:
      'Qual ferramenta baseada em web é usada para estimar os custos mensais previstos de uma arquitetura AWS ANTES de implantá-la na nuvem?',
    options: [
      'AWS Cost Explorer',
      'AWS Pricing Calculator',
      'Relatórios de Custo e Uso da AWS (CUR)',
      'AWS Compute Optimizer',
    ],
    answer: 1,
    explanation:
      'A AWS Pricing Calculator é a calculadora oficial da AWS para estimar despesas mensais de serviços antes do provisionamento.',
    source: 'QUESTION_BANK_INITIAL',
  },
  {
    domainId: 4,
    question:
      'Quais são as três categorias de ofertas oferecidas pelo AWS Free Tier (Nível Gratuito)?',
    options: [
      'Gratuito para sempre, 12 meses grátis e Testes temporários.',
      'Gratuito apenas para estudantes, empresas e ONGs.',
      'Gratuito para EC2, S3 e RDS sem limites.',
      'Desconto fixo de 50%, 75% e 90% no primeiro ano.',
    ],
    answer: 0,
    explanation:
      'O Nível Gratuito da AWS inclui: 1) Ofertas Sempre Gratuitas (ex: Lambda 1M requisições/mês), 2) 12 Meses Grátis para novas contas e 3) Testes Práticos por período limitado.',
    source: 'QUESTION_BANK_INITIAL',
  },
];

export default INITIAL_QUESTIONS;
