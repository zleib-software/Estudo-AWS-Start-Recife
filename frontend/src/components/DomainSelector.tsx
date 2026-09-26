'use client';

interface DomainSelectorProps {
  selected: number;
  onChange: (domainId: number) => void;
}

const DOMAIN_OPTIONS = [
  {
    value: 0,
    label: 'Todos os Domínios (Simulado Geral)',
    desc: 'Questões mistas abrangendo 100% do conteúdo da prova oficial.',
    span: false,
  },
  {
    value: 1,
    label: 'Domínio 1: Conceitos de Nuvem',
    desc: '24% da prova • Well-Architected, CAF, Economia e CapEx vs OpEx.',
    span: false,
  },
  {
    value: 2,
    label: 'Domínio 2: Segurança e Conformidade',
    desc: '30% da prova • Responsabilidade Compartilhada, IAM, Shield, KMS e WAF.',
    span: false,
  },
  {
    value: 3,
    label: 'Domínio 3: Tecnologia e Serviços',
    desc: '34% da prova • EC2, S3, RDS, VPC, Lambda, CloudFront e Infraestrutura.',
    span: false,
  },
  {
    value: 4,
    label: 'Domínio 4: Cobrança, Finanças e Suporte',
    desc: '12% da prova • Pricing Calculator, Budgets, Organizations e Planos de Suporte.',
    span: true,
  },
];

export default function DomainSelector({
  selected,
  onChange,
}: DomainSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        1. Selecione o Domínio de Estudo
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {DOMAIN_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`border-2 p-4 rounded-xl flex items-start gap-3 cursor-pointer transition-all ${
              selected === opt.value
                ? 'border-aws-orange bg-amber-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${opt.span ? 'md:col-span-2' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <input
              type="radio"
              name="domain"
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
              className="mt-1"
            />
            <div>
              <span className="font-bold text-aws-navy block text-sm">
                {opt.label}
              </span>
              <span className="text-xs text-gray-500">{opt.desc}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
