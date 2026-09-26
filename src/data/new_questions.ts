export const NEW_QUESTIONS = [
    {
        id: 501,
        domainId: 1,
        question: "Uma empresa deseja armazenar arquivos que raramente são acessados, mas quando são, exigem recuperação em milissegundos. Qual classe de armazenamento do S3 é a mais econômica para este cenário?",
        options: [
            "S3 Standard",
            "S3 Standard-IA",
            "S3 Glacier Flexible Retrieval",
            "S3 Intelligent-Tiering"
        ],
        answer: 1,
        explanation: "O S3 Standard-IA (Infrequent Access) é projetado para dados acessados com menos frequência, mas que exigem acesso rápido (milissegundos) quando necessário, oferecendo menor custo de armazenamento que o S3 Standard."
    },
    {
        id: 502,
        domainId: 3,
        question: "Qual serviço AWS permite que você execute código sem provisionar ou gerenciar servidores (Serverless)?",
        options: [
            "Amazon EC2",
            "AWS Lambda",
            "Amazon ECS",
            "Amazon RDS"
        ],
        answer: 1,
        explanation: "O AWS Lambda é o principal serviço de computação Serverless da AWS, permitindo executar código em resposta a eventos sem gerenciar a infraestrutura subjacente."
    },
    {
        id: 503,
        domainId: 2,
        question: "Quem tem a responsabilidade de gerenciar as atualizações do sistema operacional convidado (Guest OS) em uma instância do Amazon EC2, segundo o Modelo de Responsabilidade Compartilhada?",
        options: [
            "O Cliente",
            "A AWS",
            "O Parceiro de Consultoria da AWS",
            "Responsabilidade compartilhada igualmente entre a AWS e o cliente"
        ],
        answer: 0,
        explanation: "No modelo IaaS (como EC2), o cliente é responsável por todo o software instalado dentro do sistema operacional convidado (Guest OS), incluindo atualizações e patches de segurança."
    },
    {
        id: 504,
        domainId: 4,
        question: "Qual serviço fornece alertas faturáveis quando seus custos excedem os limites que você definiu?",
        options: [
            "AWS Cost Explorer",
            "AWS Budgets",
            "AWS Pricing Calculator",
            "AWS Organizations"
        ],
        answer: 1,
        explanation: "O AWS Budgets permite configurar orçamentos personalizados e fornece alertas automatizados (por e-mail ou SNS) quando seus custos ou uso excedem os limites estabelecidos."
    },
    {
        id: 505,
        domainId: 3,
        question: "Qual serviço AWS pode ser usado para desacoplar e escalar microsserviços, distribuindo mensagens entre aplicações por meio de uma fila?",
        options: [
            "Amazon SNS",
            "Amazon SQS",
            "AWS Step Functions",
            "Amazon Kinesis"
        ],
        answer: 1,
        explanation: "O Amazon Simple Queue Service (SQS) é um serviço de fila de mensagens totalmente gerenciado, usado fundamentalmente para desacoplar componentes de aplicativos em nuvem."
    }
];
