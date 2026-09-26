/**
 * Metadados fixos dos 4 domínios do exame AWS CLF-C02.
 * Retornados em GET /api/domains — não ficam no banco, são constantes do exame.
 */
const DOMAINS = [
  {
    id: 1,
    name: 'Conceitos de Nuvem',
    weight: 24,
    description:
      'Define os benefícios da nuvem AWS, princípios do Well-Architected Framework, CAF, economia de escala e CapEx vs OpEx.',
  },
  {
    id: 2,
    name: 'Segurança e Conformidade',
    weight: 30,
    description:
      'Modelo de Responsabilidade Compartilhada, IAM, MFA, GuardDuty, WAF, KMS, Shield, Artifact e compliance.',
  },
  {
    id: 3,
    name: 'Tecnologia e Serviços em Nuvem',
    weight: 34,
    description:
      'EC2, Lambda, S3, RDS, DynamoDB, CloudFront, VPC, EFS, CloudTrail, CloudWatch e infraestrutura global.',
  },
  {
    id: 4,
    name: 'Cobrança, Finanças e Suporte',
    weight: 12,
    description:
      'Budgets, Cost Explorer, Pricing Calculator, Organizations, Consolidated Billing, Free Tier e planos de suporte.',
  },
];

export default DOMAINS;
