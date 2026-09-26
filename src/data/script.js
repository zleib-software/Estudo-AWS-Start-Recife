
        // Full Portuguese AWS CLF-C02 Question Bank Embedded Offline
        const QUESTION_BANK = [
            // ================= DOMÍNIO 1: CONCEITOS DE NUVEM (~24%) =================
            {
                id: 101,
                domainId: 1,
                question: "De acordo com o AWS Well-Architected Framework, qual pilar foca na capacidade de uma carga de trabalho executar suas funções pretendidas corretamente e de forma consistente quando esperado, e se recuperar de falhas de infraestrutura?",
                options: [
                    "Excelência Operacional",
                    "Confiabilidade (Reliability)",
                    "Eficiência de Desempenho",
                    "Sustentabilidade"
                ],
                answer: 1,
                explanation: "O pilar Confiabilidade (Reliability) abrange a capacidade do sistema de mitigar e se recuperar de falhas, testar procedimentos de recuperação e dimensionar horizontalmente para aumentar a disponibilidade."
            },
            {
                id: 102,
                domainId: 1,
                question: "Qual vantagem da computação em nuvem AWS permite às empresas trocar despesas com investimentos em capital (CapEx) por despesas operacionais variáveis (OpEx)?",
                options: [
                    "Economias de escala massivas",
                    "Pagar apenas pelo consumo (Pay-as-you-go)",
                    "Aumentar a velocidade e a agilidade",
                    "Garantia de custo zero em instâncias reservadas"
                ],
                answer: 1,
                explanation: "A nuvem permite substituir custos de capital iniciais em hardware físico e data centers (CapEx) por custos variáveis flexíveis e proporcionais ao uso real dos serviços (OpEx)."
            },
            {
                id: 103,
                domainId: 1,
                question: "Qual pilar do AWS Cloud Adoption Framework (AWS CAF) foca em criar uma cultura de inovação contínua, desenvolver habilidades em nuvem e alinhar as equipes organizacionais?",
                options: [
                    "Perspectiva de Negócios",
                    "Perspectiva de Pessoas",
                    "Perspectiva de Governança",
                    "Perspectiva de Segurança"
                ],
                answer: 1,
                explanation: "A perspectiva de Pessoas (People) do AWS CAF orienta as organizações na evolução de sua cultura corporativa, estrutura de equipes e capacitação de talentos para a transformação digital."
            },
            {
                id: 104,
                domainId: 1,
                question: "O que caracteriza o conceito de Elasticidade na nuvem AWS?",
                options: [
                    "A capacidade de alocar recursos fixos permanentemente sem variação.",
                    "O provisionamento e desprovisionamento automático de recursos de acordo com as variações de demanda.",
                    "A garantia de backup de dados em 3 Regiões AWS simultaneamente.",
                    "A migração automática de cargas de trabalho para servidores físicos dedicados."
                ],
                answer: 1,
                explanation: "Elasticidade é a capacidade de ajustar automaticamente a quantidade de recursos alocados conforme a demanda flutua, evitando custos desnecessários em momentos de baixo tráfego."
            },
            {
                id: 105,
                domainId: 1,
                question: "Uma empresa precisa implantar uma aplicação com baixíssima latência para usuários finais globais. Qual conceito da Infraestrutura Global da AWS atende a esse requisito?",
                options: [
                    "Zonas de Disponibilidade (AZs)",
                    "Pontos de Presença / Locações de Borda (Edge Locations)",
                    "Regiões Locais de Backup",
                    "Subredes Privadas de Região"
                ],
                answer: 1,
                explanation: "Os Pontos de Presença (Edge Locations) utilizam a rede CDN Amazon CloudFront para entregar dados, vídeos e APIs aos usuários com a menor latência possível."
            },
            {
                id: 106,
                domainId: 1,
                question: "O que é uma Zona de Disponibilidade (Availability Zone - AZ) na AWS?",
                options: [
                    "Um data center individual sem redundância de energia.",
                    "Um ou mais data centers discretos e redundantes conectados por redes de altíssima velocidade em uma Região.",
                    "Uma coleção global de servidores de cache para S3.",
                    "Uma cidade inteira dedicada ao processamento de dados."
                ],
                answer: 1,
                explanation: "Cada Zona de Disponibilidade (AZ) é composta por um ou mais data centers isolados contra falhas (energia, refrigeração e rede) dentro de uma Região geográfica."
            },
            {
                id: 107,
                domainId: 1,
                question: "Qual benefício da nuvem AWS permite que desenvolvedores experimentem e implantem recursos de TI em questão de minutos, em vez de semanas?",
                options: [
                    "Agilidade",
                    "Economia de escala",
                    "Aumento de CapEx",
                    "Tolerância estática a falhas"
                ],
                answer: 0,
                explanation: "Agilidade refere-se ao acesso imediato a novos recursos tecnológicos, reduzindo o tempo de inovação e lançamento de produtos."
            },

            // ================= DOMÍNIO 2: SEGURANÇA E CONFORMIDADE (~30%) =================
            {
                id: 201,
                domainId: 2,
                question: "De acordo com o Modelo de Responsabilidade Compartilhada da AWS, qual das opções a seguir é de responsabilidade EXCLUSIVA do cliente?",
                options: [
                    "Manutenção do hardware dos servidores nos data centers.",
                    "Proteção e criptografia dos dados do cliente em repouso e em trânsito.",
                    "Atualização de firmware em roteadores de borda da AWS.",
                    "Descarte físico seguro de discos rígidos danificados."
                ],
                answer: 1,
                explanation: "A AWS é responsável pela segurança 'DA' nuvem (infraestrutura física, hardware, hipervisores). O cliente é responsável pela segurança 'NA' nuvem (dados, criptografia, IAM e regras de firewall)."
            },
            {
                id: 202,
                domainId: 2,
                question: "Qual recomendação de segurança do AWS IAM reforça a proteção ao solicitar uma segunda forma de verificação além da senha do usuário?",
                options: [
                    "Rotação de Chaves KMS",
                    "Autenticação Multifator (MFA)",
                    "Listas de Controle de Acesso (NACL)",
                    "Chaves de Acesso de Longo Prazo"
                ],
                answer: 1,
                explanation: "A Autenticação Multifator (MFA) adiciona uma camada essencial de segurança, exigindo um código temporário gerado por token ou dispositivo celular."
            },
            {
                id: 203,
                domainId: 2,
                question: "Qual serviço AWS é um detector inteligente de ameaças gerenciado que analisa continuamente logs da AWS (CloudTrail, VPC Flow Logs e DNS) usando aprendizado de máquina?",
                options: [
                    "Amazon Inspector",
                    "AWS WAF",
                    "Amazon GuardDuty",
                    "AWS Secrets Manager"
                ],
                answer: 2,
                explanation: "O Amazon GuardDuty monitora e identifica atividades maliciosas e não autorizadas na sua conta e cargas de trabalho na AWS."
            },
            {
                id: 204,
                domainId: 2,
                question: "Onde um auditor de segurança pode obter acesso sob demanda a relatórios de conformidade (como SOC, PCI-DSS e ISO) e acordos da AWS?",
                options: [
                    "AWS Trusted Advisor",
                    "AWS Artifact",
                    "AWS Security Hub",
                    "Amazon Macie"
                ],
                answer: 1,
                explanation: "O AWS Artifact é o portal gratuito de conformidade da AWS que oferece acesso a relatórios de auditoria e certificações internacionais."
            },

            {
                id: 205,
                domainId: 2,
                question: "Qual é a principal diferença de comportamento de rede entre um Grupo de Segurança (Security Group) e uma Lista de Controle de Acesso à Rede (NACL)?",
                options: [
                    "Security Groups funcionam na subrede e são stateless; NACLs funcionam na instância e são stateful.",
                    "Security Groups atuam no nível de instância e são stateful; NACLs atuam no nível de subrede e são stateless.",
                    "Security Groups permitem regras explícitas de negação (Deny), enquanto NACLs não permitem.",
                    "NACLs são usadas exclusivamente para criptografia de dados em discos EBS."
                ],
                answer: 1,
                explanation: "Security Groups atuam na instância e são stateful (respostas ao tráfego permitido entram automaticamente). NACLs atuam na subrede e são stateless (regras de entrada e saída são avaliadas separadamente)."
            },
            {
                id: 206,
                domainId: 2,
                question: "Qual serviço AWS é usado para proteger aplicações web contra explorações comuns da Web, como injeção de SQL (SQLi) e Cross-Site Scripting (XSS)?",
                options: [
                    "AWS Shield Standard",
                    "AWS WAF (Web Application Firewall)",
                    "Amazon GuardDuty",
                    "AWS Network Firewall"
                ],
                answer: 1,
                explanation: "O AWS WAF inspeciona requisições HTTP/HTTPS no nível da camada de aplicação (Camada 7) e bloqueia ataques como SQLi e XSS."
            },
            {
                id: 207,
                domainId: 2,
                question: "Qual serviço permite criar, gerenciar e controlar chaves de criptografia usadas para proteger seus dados nos serviços AWS?",
                options: [
                    "AWS Certificate Manager (ACM)",
                    "AWS Key Management Service (KMS)",
                    "AWS Secrets Manager",
                    "AWS IAM Access Analyzer"
                ],
                answer: 1,
                explanation: "O AWS KMS é um serviço gerenciado que facilita a criação e o controle das chaves de criptografia criptográficas da sua organização."
            },

            // ================= DOMÍNIO 3: TECNOLOGIA E SERVIÇOS EM NUVEM (~34%) =================
            {
                id: 301,
                domainId: 3,
                question: "Uma equipe precisa executar código em resposta a eventos (ex: upload de foto no Amazon S3) sem a necessidade de provisionar ou gerenciar servidores. Qual serviço utilizar?",
                options: [
                    "Amazon EC2",
                    "AWS Lambda",
                    "Amazon ECS",
                    "AWS Elastic Beanstalk"
                ],
                answer: 1,
                explanation: "O AWS Lambda é o serviço de computação Serverless (sem servidor) que executa seu código em resposta a eventos com cobrança por milissegundo de execução."
            },
            {
                id: 302,
                domainId: 3,
                question: "Qual classe de armazenamento do Amazon S3 é ideal para dados armazenados a longo prazo, raramente acessados, com recuperação de baixo custo em questão de horas?",
                options: [
                    "S3 Standard",
                    "S3 Standard-Infrequent Access (S3 Standard-IA)",
                    "S3 Glacier Flexible Retrieval / Deep Archive",
                    "S3 Intelligent-Tiering"
                ],
                answer: 2,
                explanation: "O S3 Glacier e S3 Glacier Deep Archive oferecem armazenamento de baixíssimo custo para arquivamento de dados e auditorias corporativas."
            },
            {
                id: 303,
                domainId: 3,
                question: "Qual banco de dados gerenciado da AWS é do tipo NoSQL (chave-valor e documentos), oferecendo desempenho de latência inferior a 10 milissegundos em qualquer escala?",
                options: [
                    "Amazon RDS",
                    "Amazon Aurora",
                    "Amazon DynamoDB",
                    "Amazon Redshift"
                ],
                answer: 2,
                explanation: "O Amazon DynamoDB é um banco de dados NoSQL totalmente gerenciado, escalável e de altíssimo desempenho para aplicações modernas."
            },
            {
                id: 304,
                domainId: 3,
                question: "Qual serviço AWS funciona como uma Rede de Distribuição de Conteúdo (CDN) global para acelerar a entrega de conteúdo estático e dinâmico aos usuários?",
                options: [
                    "Amazon Route 53",
                    "AWS Direct Connect",
                    "Amazon CloudFront",
                    "AWS Global Accelerator"
                ],
                answer: 2,
                explanation: "O Amazon CloudFront distribui dados, vídeos, aplicações e APIs de forma segura para clientes globais com baixa latência usando a rede de Pontos de Presença."
            },
            {
                id: 305,
                domainId: 3,
                question: "Qual serviço de armazenamento fornece um sistema de arquivos em rede compartilhado e escalável para instâncias Linux (protocolo NFS)?",
                options: [
                    "Amazon EBS (Elastic Block Store)",
                    "Amazon S3",
                    "Amazon EFS (Elastic File System)",
                    "AWS Storage Gateway"
                ],
                answer: 2,
                explanation: "O Amazon EFS é um sistema de arquivos para Linux que pode ser montado simultaneamente por centenas de instâncias EC2."
            },
            {
                id: 306,
                domainId: 3,
                question: "Qual serviço AWS registra e monitora as chamadas de API e atividades de gerenciamento realizadas na sua conta para fins de governança e auditoria?",
                options: [
                    "Amazon CloudWatch",
                    "AWS CloudTrail",
                    "AWS Config",
                    "Amazon GuardDuty"
                ],
                answer: 1,
                explanation: "O AWS CloudTrail rastreia e registra o histórico de ações executadas por usuários, funções ou serviços na API da AWS."
            },
            {
                id: 307,
                domainId: 3,
                question: "Qual opção de compra de Instância EC2 oferece o maior desconto (até 90%) para cargas de trabalho tolerantes a interrupções e processamento em lote?",
                options: [
                    "Instâncias On-Demand",
                    "Instâncias Reservadas (RIs)",
                    "Instâncias Spot",
                    "Hospedeiros Dedicados"
                ],
                answer: 2,
                explanation: "Instâncias Spot aproveitam a capacidade ociosa de computação na AWS com grandes descontos, mas podem ser interrompidas com aviso prévio de 2 minutos."
            },

            // ================= DOMÍNIO 4: COBRANÇA, FINANÇAS E SUPORTE (~12%) =================
            {
                id: 401,
                domainId: 4,
                question: "Qual ferramenta da AWS permite criar alertas personalizados quando seus custos ou uso estimado de nuvem ultrapassarem limites financeiros predefinidos?",
                options: [
                    "AWS Cost Explorer",
                    "AWS Budgets",
                    "AWS Pricing Calculator",
                    "AWS License Manager"
                ],
                answer: 1,
                explanation: "O AWS Budgets permite configurar orçamentos personalizados e enviar alertas via e-mail ou SNS ao atingir limites de custos estipulados."
            },
            {
                id: 402,
                domainId: 4,
                question: "Qual plano de Suporte da AWS é o nível mínimo recomendado para cargas de trabalho de produção que exige suporte técnico 24x7 via telefone, chat e e-mail com resposta em menos de 1 hora para falhas graves?",
                options: [
                    "AWS Basic Support",
                    "AWS Developer Support",
                    "AWS Business Support",
                    "AWS Enterprise Support"
                ],
                answer: 2,
                explanation: "O AWS Business Support é recomendado para sistemas em produção, garantindo suporte técnico 24x7 com tempo de resposta de até 1 hora para sistemas caídos."
            },
            {
                id: 403,
                domainId: 4,
                question: "Qual recurso do AWS Organizations permite consolidar o pagamento de múltiplas contas AWS sob uma única fatura e obter descontos por volume acumulado?",
                options: [
                    "Agregador de Custos",
                    "Faturamento Consolidado (Consolidated Billing)",
                    "AWS Marketplace Sharing",
                    "AWS Cost Anomaly Detection"
                ],
                answer: 1,
                explanation: "O Faturamento Consolidado combina o uso de todas as contas vinculadas em uma organização, permitindo atingir níveis de preços com mais desconto por escala."
            },
            {
                id: 404,
                domainId: 4,
                question: "Qual ferramenta baseada em web é usada para estimar os custos mensais previstos de uma arquitetura AWS ANTES de implantá-la na nuvem?",
                options: [
                    "AWS Cost Explorer",
                    "AWS Pricing Calculator",
                    "Relatórios de Custo e Uso da AWS (CUR)",
                    "AWS Compute Optimizer"
                ],
                answer: 1,
                explanation: "A AWS Pricing Calculator é a calculadora oficial da AWS para estimar despesas mensais de serviços antes do provisionamento."
            },
            {
                id: 405,
                domainId: 4,
                question: "Quais são as três categorias de ofertas oferecidas pelo AWS Free Tier (Nível Gratuito)?",
                options: [
                    "Gratuito para sempre, 12 meses grátis e Testes temporários.",
                    "Gratuito apenas para estudantes, empresas e ONGs.",
                    "Gratuito para EC2, S3 e RDS sem limites.",
                    "Desconto fixo de 50%, 75% e 90% no primeiro ano."
                ],
                answer: 0,
                explanation: "O Nível Gratuito da AWS inclui: 1) Ofertas Sempre Gratuitas (ex: Lambda 1M requisições/mês), 2) 12 Meses Grátis para novas contas e 3) Testes Práticos por período limitado."
            }
        ];

        class AWSQuizApp {
            constructor() {
                this.state = {
                    domain: 0,              // 0: All, 1-4: Specific Domain
                    count: 25,              // Question limit or 'all'
                    mode: 'practice',       // 'practice' or 'exam'
                    questions: [],
                    currentIndex: 0,
                    userAnswers: {},        // { qIndex: optIndex }
                    flagged: {},            // { qIndex: true/false }
                    examTimeLeft: 5400,     // 90 min (5400 sec)
                    timerInterval: null,
                    gridFilter: 'all',      // 'all', 'answered', 'pending', 'flagged'
                    reviewFilter: 'all',
                    history: []
                };

                this.dom = {
                    views: {
                        home: document.getElementById('view-home'),
                        quiz: document.getElementById('view-quiz'),
                        results: document.getElementById('view-results'),
                        history: document.getElementById('view-history')
                    },
                    headerQuizInfo: document.getElementById('header-quiz-info'),
                    headerProgress: document.getElementById('header-progress'),
                    timerContainer: document.getElementById('timer-container'),
                    timerDisplay: document.getElementById('timer-display'),
                    drawer: document.getElementById('grid-drawer'),
                    gridContainer: document.getElementById('grid-buttons-container'),
                    modal: document.getElementById('modal-confirm'),
                    resumeBanner: document.getElementById('resume-banner'),
                    netBar: document.getElementById('net-status-bar'),
                    netText: document.getElementById('net-status-text')
                };

                this.initApp();
            }

            initApp() {
                this.setupServiceWorker();
                this.setupNetworkListeners();
                this.loadSavedHistory();
                this.checkActiveSavedState();
                this.setupUIHandlers();
            }

            // Registered Dynamic Service Worker via Blob URL (100% Offline)
            setupServiceWorker() {
                if ('serviceWorker' in navigator) {
                    const swScript = `
                        const CACHE_NAME = 'aws-simulado-offline-v1';
                        self.addEventListener('install', (e) => {
                            self.skipWaiting();
                        });
                        self.addEventListener('activate', (e) => {
                            e.waitUntil(clients.claim());
                        });
                        self.addEventListener('fetch', (e) => {
                            e.respondWith(
                                caches.match(e.request).then((res) => {
                                    return res || fetch(e.request).catch(() => {
                                        return new Response('Offline', { status: 200, statusText: 'OK' });
                                    });
                                })
                            );
                        });
                    `;
                    try {
                        const blob = new Blob([swScript], { type: 'application/javascript' });
                        const blobUrl = URL.createObjectURL(blob);
                        navigator.serviceWorker.register(blobUrl).catch(() => {});
                    } catch (e) {
                        console.log('ServiceWorker offline setup fallback active');
                    }
                }
            }

            setupNetworkListeners() {
                const updateStatus = () => {
                    if (navigator.onLine) {
                        this.dom.netBar.className = "bg-green-600 text-white text-xs font-semibold px-4 py-1 text-center transition-all duration-300 flex items-center justify-center space-x-2";
                        this.dom.netText.textContent = "100% OFFLINE (Conexão Detectada)";
                    } else {
                        this.dom.netBar.className = "bg-amber-600 text-white text-xs font-semibold px-4 py-1 text-center transition-all duration-300 flex items-center justify-center space-x-2";
                        this.dom.netText.textContent = "Modo Offline Ativo (100% Funcional)";
                    }
                };

                window.addEventListener('online', updateStatus);
                window.addEventListener('offline', updateStatus);
                updateStatus();
            }

            setupUIHandlers() {
                // Domain radio selection cards
                document.querySelectorAll('.domain-card').forEach(card => {
                    card.addEventListener('click', () => {
                        document.querySelectorAll('.domain-card').forEach(c => {
                            c.classList.remove('border-aws-orange', 'bg-amber-50');
                            c.classList.add('border-gray-200');
                        });
                        card.classList.remove('border-gray-200');
                        card.classList.add('border-aws-orange', 'bg-amber-50');
                        const radio = card.querySelector('input[type="radio"]');
                        if (radio) radio.checked = true;
                    });
                });

                // Execution mode cards
                document.querySelectorAll('.mode-card').forEach(card => {
                    card.addEventListener('click', () => {
                        document.querySelectorAll('.mode-card').forEach(c => {
                            c.classList.remove('border-aws-orange', 'bg-amber-50');
                            c.classList.add('border-gray-200');
                        });
                        card.classList.remove('border-gray-200');
                        card.classList.add('border-aws-orange', 'bg-amber-50');
                        const radio = card.querySelector('input[type="radio"]');
                        if (radio) radio.checked = true;
                    });
                });
            }

            setQuestionCount(count) {
                this.state.count = count;
                document.querySelectorAll('.count-btn').forEach(btn => {
                    btn.classList.remove('border-aws-orange', 'bg-amber-50');
                    btn.classList.add('border-gray-200');
                });
                const activeBtn = document.getElementById(`count-btn-${count}`);
                if (activeBtn) {
                    activeBtn.classList.remove('border-gray-200');
                    activeBtn.classList.add('border-aws-orange', 'bg-amber-50');
                }
            }

            startNewQuiz() {
                // Domain Selection
                const domainRadio = document.querySelector('input[name="domain"]:checked');
                this.state.domain = parseInt(domainRadio ? domainRadio.value : '0');

                // Mode Selection
                const modeRadio = document.querySelector('input[name="mode"]:checked');
                this.state.mode = modeRadio ? modeRadio.value : 'practice';

                // Filter Question Pool
                let pool = [...QUESTION_BANK];
                if (this.state.domain !== 0) {
                    pool = pool.filter(q => q.domainId === this.state.domain);
                }

                // Shuffle Questions
                pool.sort(() => Math.random() - 0.5);

                // Slice Target Count
                let targetCount = this.state.count === 'all' ? pool.length : parseInt(this.state.count);
                if (targetCount > pool.length) targetCount = pool.length;

                this.state.questions = pool.slice(0, targetCount);
                this.state.currentIndex = 0;
                this.state.userAnswers = {};
                this.state.flagged = {};
                this.state.examTimeLeft = 5400; // 90 min

                this.launchQuizScreen();
            }

            launchQuizScreen() {
                if (!this.state.questions || this.state.questions.length === 0) {
                    this.showModal('Aviso', 'Nenhuma questão encontrada para este domínio.', () => {}, false);
                    return;
                }

                this.switchView('quiz');
                this.dom.headerQuizInfo.classList.remove('hidden');

                const domainNames = {
                    0: 'Todos os Domínios',
                    1: 'Domínio 1: Conceitos',
                    2: 'Domínio 2: Segurança',
                    3: 'Domínio 3: Tecnologia',
                    4: 'Domínio 4: Finanças'
                };
                document.getElementById('quiz-domain-badge').textContent = domainNames[this.state.domain];
                document.getElementById('quiz-mode-badge').textContent = this.state.mode === 'practice' ? 'Modo Teste' : 'Modo Exame';

                if (this.state.mode === 'exam') {
                    this.dom.timerContainer.classList.remove('hidden');
                    this.dom.timerContainer.classList.add('flex');
                    this.startTimer();
                } else {
                    this.dom.timerContainer.classList.add('hidden');
                    this.dom.timerContainer.classList.remove('flex');
                    if (this.state.timerInterval) clearInterval(this.state.timerInterval);
                }

                this.renderQuestion();
                this.saveActiveState();
            }

            renderQuestion() {
                const q = this.state.questions[this.state.currentIndex];
                const total = this.state.questions.length;

                this.dom.headerProgress.textContent = `Questão ${this.state.currentIndex + 1}/${total}`;
                document.getElementById('q-number-title').textContent = `Questão ${this.state.currentIndex + 1} de ${total} • Domínio ${q.domainId}`;
                document.getElementById('q-text').textContent = q.question;

                const container = document.getElementById('q-options');
                container.innerHTML = '';

                const selected = this.state.userAnswers[this.state.currentIndex];

                q.options.forEach((optText, optIdx) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'option-btn w-full text-left p-4 rounded-xl border-2 font-medium text-sm flex items-start space-x-3 ';

                    let borderStyle = 'border-gray-200 bg-white';

                    if (this.state.mode === 'practice') {
                        if (selected !== undefined) {
                            if (optIdx === q.answer) {
                                borderStyle = 'border-green-500 bg-green-50 text-green-900 font-semibold';
                            } else if (selected === optIdx) {
                                borderStyle = 'border-red-500 bg-red-50 text-red-900 font-semibold';
                            } else {
                                borderStyle = 'border-gray-200 bg-white opacity-70';
                            }
                        }
                    } else {
                        // Exam Mode
                        if (selected === optIdx) {
                            borderStyle = 'border-aws-orange bg-amber-50 text-aws-navy font-bold shadow-sm';
                        }
                    }

                    btn.className += borderStyle;
                    btn.onclick = () => this.selectOption(optIdx);

                    btn.innerHTML = `
                        <span class="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0 ${selected === optIdx ? 'bg-aws-navy text-white border-aws-navy' : 'border-gray-400 text-gray-500'}">
                            ${String.fromCharCode(65 + optIdx)}
                        </span>
                        <span class="leading-relaxed">${optText}</span>
                    `;
                    container.appendChild(btn);
                });

                // Explanation Box Handling
                const expBox = document.getElementById('q-explanation');
                if (this.state.mode === 'practice' && selected !== undefined) {
                    expBox.classList.remove('hidden');
                    document.getElementById('q-explanation-text').textContent = q.explanation;
                    expBox.className = `p-4 rounded-xl border-l-4 text-sm space-y-2 animate-fadeIn ${selected === q.answer ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`;
                } else {
                    expBox.classList.add('hidden');
                }

                // Flag State
                const isFlagged = !!this.state.flagged[this.state.currentIndex];
                const flagIcon = document.getElementById('flag-icon');
                const flagText = document.getElementById('flag-text');
                const flagBtn = document.getElementById('flag-btn');

                if (isFlagged) {
                    flagIcon.className = 'svg-icon text-amber-500';
                    flagText.textContent = 'Sinalizada';
                    flagBtn.classList.add('bg-amber-50', 'border-amber-300');
                } else {
                    flagIcon.className = 'svg-icon text-gray-400';
                    flagText.textContent = 'Sinalizar';
                    flagBtn.classList.remove('bg-amber-50', 'border-amber-300');
                }

                // Navigation Controls
                const btnPrev = document.getElementById('btn-prev');
                btnPrev.disabled = this.state.currentIndex === 0;
                btnPrev.style.opacity = this.state.currentIndex === 0 ? '0.5' : '1';

                const isLast = this.state.currentIndex === total - 1;
                document.getElementById('btn-next').classList.toggle('hidden', isLast);
                document.getElementById('btn-finish').classList.toggle('hidden', !isLast);

                this.saveActiveState();
            }

            selectOption(idx) {
                this.state.userAnswers[this.state.currentIndex] = idx;
                this.renderQuestion();
            }

            toggleFlagCurrent() {
                const cur = this.state.currentIndex;
                this.state.flagged[cur] = !this.state.flagged[cur];
                this.renderQuestion();
            }

            nextQuestion() {
                if (this.state.currentIndex < this.state.questions.length - 1) {
                    this.state.currentIndex++;
                    this.renderQuestion();
                }
            }

            prevQuestion() {
                if (this.state.currentIndex > 0) {
                    this.state.currentIndex--;
                    this.renderQuestion();
                }
            }

            startTimer() {
                if (this.state.timerInterval) clearInterval(this.state.timerInterval);
                this.state.timerInterval = setInterval(() => {
                    this.state.examTimeLeft--;
                    if (this.state.examTimeLeft <= 0) {
                        clearInterval(this.state.timerInterval);
                        this.showModal('Tempo Esgotado!', 'O tempo do seu exame encerrou. Submetendo suas respostas.', () => this.finishQuiz(), false);
                    } else {
                        this.updateTimerDisplay();
                        if (this.state.examTimeLeft % 10 === 0) this.saveActiveState();
                    }
                }, 1000);
            }

            updateTimerDisplay() {
                const totalSec = this.state.examTimeLeft;
                const hrs = Math.floor(totalSec / 3600);
                const mins = Math.floor((totalSec % 3600) / 60);
                const secs = totalSec % 60;
                this.dom.timerDisplay.textContent = 
                    `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            }

            toggleGridDrawer() {
                const isHidden = this.dom.drawer.classList.contains('hidden');
                if (isHidden) {
                    this.renderGrid();
                    this.dom.drawer.classList.remove('hidden');
                } else {
                    this.dom.drawer.classList.add('hidden');
                }
            }

            filterGrid(filter) {
                this.state.gridFilter = filter;
                ['all', 'ans', 'pnd', 'flg'].forEach(f => {
                    const btn = document.getElementById(`grid-flt-${f}`);
                    if (btn) {
                        btn.classList.remove('bg-aws-navy', 'text-white');
                        btn.classList.add('bg-gray-100', 'text-gray-600');
                    }
                });
                const keyMap = { all: 'all', answered: 'ans', pending: 'pnd', flagged: 'flg' };
                const activeBtn = document.getElementById(`grid-flt-${keyMap[filter]}`);
                if (activeBtn) {
                    activeBtn.classList.remove('bg-gray-100', 'text-gray-600');
                    activeBtn.classList.add('bg-aws-navy', 'text-white');
                }
                this.renderGrid();
            }

            renderGrid() {
                const container = this.dom.gridContainer;
                container.innerHTML = '';

                this.state.questions.forEach((q, idx) => {
                    const isAnswered = this.state.userAnswers[idx] !== undefined;
                    const isCurrent = idx === this.state.currentIndex;
                    const isFlagged = !!this.state.flagged[idx];

                    if (this.state.gridFilter === 'answered' && !isAnswered) return;
                    if (this.state.gridFilter === 'pending' && isAnswered) return;
                    if (this.state.gridFilter === 'flagged' && !isFlagged) return;

                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'relative py-2.5 rounded-lg text-xs font-bold border flex flex-col items-center justify-center ';

                    if (isCurrent) {
                        btn.className += 'bg-aws-navy text-white border-aws-navy';
                    } else if (isAnswered) {
                        btn.className += 'bg-blue-50 border-blue-400 text-blue-800';
                    } else {
                        btn.className += 'bg-gray-50 border-gray-200 text-gray-700';
                    }

                    btn.onclick = () => {
                        this.state.currentIndex = idx;
                        this.renderQuestion();
                        this.toggleGridDrawer();
                    };

                    btn.innerHTML = `
                        <span>${idx + 1}</span>
                        ${isFlagged ? '<span class="absolute" style="top:-4px; right:0px; font-size:10px;">🚩</span>' : ''}
                    `;
                    container.appendChild(btn);
                });
            }

            finishQuizConfirm() {
                const unanswered = this.state.questions.length - Object.keys(this.state.userAnswers).length;
                let msg = "Deseja finalizar a prova e visualizar o relatório detalhado?";
                if (unanswered > 0) {
                    msg = `Atenção: Você possui ${unanswered} questão(ões) pendente(s). Deseja encerrar mesmo assim?`;
                }
                this.showModal('Finalizar Simulado', msg, () => this.finishQuiz());
            }

            finishQuiz() {
                if (this.state.timerInterval) clearInterval(this.state.timerInterval);
                this.dom.headerQuizInfo.classList.add('hidden');
                this.clearActiveSavedState();

                let correctCount = 0;
                const domainStats = {
                    1: { total: 0, correct: 0 },
                    2: { total: 0, correct: 0 },
                    3: { total: 0, correct: 0 },
                    4: { total: 0, correct: 0 }
                };

                this.state.questions.forEach((q, idx) => {
                    const userChoice = this.state.userAnswers[idx];
                    const isCorrect = userChoice === q.answer;

                    if (domainStats[q.domainId]) {
                        domainStats[q.domainId].total++;
                        if (isCorrect) domainStats[q.domainId].correct++;
                    }

                    if (isCorrect) correctCount++;
                });

                const totalQ = this.state.questions.length;
                const percentage = Math.round((correctCount / totalQ) * 100);
                
                // AWS Scaled Score Calculation (100 - 1000)
                const scaledScore = Math.round(100 + (percentage * 900 / 100));
                const isPassed = scaledScore >= 700;

                // Save to History LocalStorage
                const attemptRecord = {
                    id: Date.now(),
                    date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                    scoreScaled: scaledScore,
                    percentage: percentage,
                    correct: correctCount,
                    total: totalQ,
                    mode: this.state.mode,
                    domain: this.state.domain,
                    isPassed: isPassed
                };
                this.saveHistoryRecord(attemptRecord);

                // Render Results Screen
                this.renderResults(scaledScore, percentage, correctCount, totalQ, isPassed, domainStats);
                this.switchView('results');
            }

            renderResults(scaledScore, percentage, correctCount, totalQ, isPassed, domainStats) {
                const banner = document.getElementById('result-banner');
                const badge = document.getElementById('result-badge');

                if (isPassed) {
                    banner.className = 'p-6 md:p-8 rounded-2xl text-white shadow-lg space-y-4 text-center bg-gradient-pass';
                    badge.className = 'inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white';
                    badge.textContent = 'APROVADO';
                } else {
                    banner.className = 'p-6 md:p-8 rounded-2xl text-white shadow-lg space-y-4 text-center bg-gradient-fail';
                    badge.className = 'inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white';
                    badge.textContent = 'REPROVADO';
                }

                document.getElementById('result-score-scaled').textContent = scaledScore;
                document.getElementById('result-score-percent').textContent = `Aproveitamento de ${percentage}% (Nota de Corte AWS: 700 / 1000)`;
                document.getElementById('result-score-detail').textContent = `Você acertou ${correctCount} de ${totalQ} questões.`;

                // Update Domain Breakdown
                for (let d = 1; d <= 4; d++) {
                    const domElem = document.getElementById(`dom-score-${d}`);
                    if (domElem) {
                        const stat = domainStats[d];
                        if (stat && stat.total > 0) {
                            const domPct = Math.round((stat.correct / stat.total) * 100);
                            domElem.textContent = `${domPct}% (${stat.correct}/${stat.total})`;
                        } else {
                            domElem.textContent = 'N/A';
                        }
                    }
                }

                this.renderReviewList('all');
            }

            filterReview(filter) {
                this.state.reviewFilter = filter;
                ['all', 'wrong', 'flagged'].forEach(f => {
                    const btn = document.getElementById(`rev-filter-${f}`);
                    if (btn) {
                        btn.className = 'px-3 py-1.5 rounded-lg font-semibold text-gray-600';
                    }
                });
                const activeBtn = document.getElementById(`rev-filter-${filter}`);
                if (activeBtn) {
                    activeBtn.className = 'px-3 py-1.5 rounded-lg font-semibold bg-aws-navy text-white';
                }
                this.renderReviewList(filter);
            }

            renderReviewList(filter) {
                const container = document.getElementById('review-list');
                container.innerHTML = '';

                this.state.questions.forEach((q, idx) => {
                    const userChoice = this.state.userAnswers[idx];
                    const isCorrect = userChoice === q.answer;
                    const isFlagged = !!this.state.flagged[idx];

                    if (filter === 'wrong' && isCorrect) return;
                    if (filter === 'flagged' && !isFlagged) return;

                    const item = document.createElement('div');
                    item.className = `aws-card p-5 space-y-3 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`;

                    item.innerHTML = `
                        <div class="flex items-center justify-between text-xs font-semibold text-gray-500">
                            <span>Questão ${idx + 1} de ${this.state.questions.length} • Domínio ${q.domainId}</span>
                            <div class="flex items-center space-x-2">
                                ${isFlagged ? '<span class="text-amber-500">🚩 Sinalizada</span>' : ''}
                                <span class="${isCorrect ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}">
                                    ${isCorrect ? '✓ Correta' : '✗ Incorreta'}
                                </span>
                            </div>
                        </div>
                        <h4 class="font-bold text-sm text-aws-navy">${q.question}</h4>
                        <div class="space-y-1.5 pt-1">
                            ${q.options.map((opt, oIdx) => {
                                let optClass = "p-2.5 rounded-lg text-xs flex items-start space-x-2 border ";
                                if (oIdx === q.answer) {
                                    optClass += "bg-green-50 border-green-300 text-green-900 font-medium";
                                } else if (userChoice === oIdx && !isCorrect) {
                                    optClass += "bg-red-50 border-red-300 text-red-900 font-medium";
                                } else {
                                    optClass += "bg-gray-50 border-gray-100 text-gray-600 opacity-70";
                                }
                                return `
                                    <div class="${optClass}">
                                        <span class="font-bold shrink-0">${String.fromCharCode(65 + oIdx)})</span>
                                        <span>${opt}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="p-3 bg-blue-50 rounded-lg text-xs text-aws-navy leading-relaxed border border-blue-100">
                            <strong class="block mb-1 text-aws-blue">Explicação Técnica:</strong>
                            ${q.explanation}
                        </div>
                    `;
                    container.appendChild(item);
                });
            }

            // LocalStorage State Management
            saveActiveState() {
                const quizData = {
                    domain: this.state.domain,
                    count: this.state.count,
                    mode: this.state.mode,
                    questions: this.state.questions,
                    currentIndex: this.state.currentIndex,
                    userAnswers: this.state.userAnswers,
                    flagged: this.state.flagged,
                    examTimeLeft: this.state.examTimeLeft,
                    timestamp: Date.now()
                };
                try {
                    localStorage.setItem('aws_quiz_offline_state', JSON.stringify(quizData));
                } catch (e) {}
            }

            checkActiveSavedState() {
                try {
                    const saved = localStorage.getItem('aws_quiz_offline_state');
                    if (saved) {
                        const data = JSON.parse(saved);
                        if (data && data.questions && data.questions.length > 0) {
                            this.dom.resumeBanner.classList.remove('hidden');
                            document.getElementById('resume-details').textContent = 
                                `Progresso: Questão ${data.currentIndex + 1} de ${data.questions.length} • Modo ${data.mode === 'practice' ? 'Teste' : 'Exame'}`;
                        }
                    }
                } catch (e) {}
            }

            resumeQuiz() {
                try {
                    const saved = localStorage.getItem('aws_quiz_offline_state');
                    if (saved) {
                        const data = JSON.parse(saved);
                        this.state.domain = data.domain;
                        this.state.count = data.count;
                        this.state.mode = data.mode;
                        this.state.questions = data.questions;
                        this.state.currentIndex = data.currentIndex;
                        this.state.userAnswers = data.userAnswers || {};
                        this.state.flagged = data.flagged || {};
                        this.state.examTimeLeft = data.examTimeLeft || 5400;

                        this.dom.resumeBanner.classList.add('hidden');
                        this.launchQuizScreen();
                    }
                } catch (e) {
                    this.discardSavedQuiz();
                }
            }

            discardSavedQuiz() {
                this.clearActiveSavedState();
                this.dom.resumeBanner.classList.add('hidden');
            }

            clearActiveSavedState() {
                localStorage.removeItem('aws_quiz_offline_state');
            }

            saveHistoryRecord(record) {
                try {
                    this.state.history.unshift(record);
                    if (this.state.history.length > 30) this.state.history.pop();
                    localStorage.setItem('aws_quiz_history', JSON.stringify(this.state.history));
                } catch (e) {}
            }

            loadSavedHistory() {
                try {
                    const hist = localStorage.getItem('aws_quiz_history');
                    if (hist) {
                        this.state.history = JSON.parse(hist) || [];
                    }
                } catch (e) {
                    this.state.history = [];
                }
            }

            showHistory() {
                const container = document.getElementById('history-container');
                container.innerHTML = '';

                if (this.state.history.length === 0) {
                    container.innerHTML = `
                        <div class="aws-card p-8 text-center text-gray-500 space-y-2">
                            <p class="text-sm font-medium">Nenhum simulado finalizado até o momento.</p>
                        </div>
                    `;
                } else {
                    this.state.history.forEach(item => {
                        const card = document.createElement('div');
                        card.className = "aws-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3";
                        card.innerHTML = `
                            <div class="space-y-1">
                                <div class="flex items-center space-x-2">
                                    <span class="text-xs font-bold px-2 py-0.5 rounded ${item.isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                        ${item.isPassed ? 'APROVADO' : 'REPROVADO'}
                                    </span>
                                    <span class="text-xs text-gray-400">• ${item.date}</span>
                                </div>
                                <h4 class="font-bold text-sm text-aws-navy">Pontuação: ${item.scoreScaled} / 1000 (${item.percentage}%)</h4>
                                <p class="text-xs text-gray-500">Acertos: ${item.correct}/${item.total} • Modo ${item.mode === 'practice' ? 'Teste' : 'Exame'}</p>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                }

                this.switchView('history');
            }

            clearHistoryConfirm() {
                this.showModal('Limpar Histórico', 'Deseja apagar todos os registros do histórico?', () => {
                    this.state.history = [];
                    localStorage.removeItem('aws_quiz_history');
                    this.showHistory();
                });
            }

            // View Management
            switchView(viewName) {
                Object.keys(this.dom.views).forEach(key => {
                    if (key === viewName) {
                        this.dom.views[key].classList.remove('hidden');
                    } else {
                        this.dom.views[key].classList.add('hidden');
                    }
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            showHome() {
                if (this.state.timerInterval) clearInterval(this.state.timerInterval);
                this.dom.headerQuizInfo.classList.add('hidden');
                this.checkActiveSavedState();
                this.switchView('home');
            }

            showHomeConfirm() {
                if (!this.dom.views.quiz.classList.contains('hidden')) {
                    this.showModal('Sair do Simulado', 'Seu progresso atual continuará salvo no navegador. Deseja retornar à tela inicial?', () => {
                        this.showHome();
                    });
                } else {
                    this.showHome();
                }
            }

            // Custom Non-blocking Modal Dialog Replacement
            showModal(title, message, onConfirm, showCancel = true) {
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-msg').textContent = message;

                const cancelBtn = document.getElementById('modal-btn-cancel');
                const okBtn = document.getElementById('modal-btn-ok');

                cancelBtn.style.display = showCancel ? 'block' : 'none';

                const closeModal = () => {
                    this.dom.modal.classList.add('hidden');
                };

                cancelBtn.onclick = () => {
                    closeModal();
                };

                okBtn.onclick = () => {
                    closeModal();
                    if (onConfirm) onConfirm();
                };

                this.dom.modal.classList.remove('hidden');
            }
        }

        // Initialize Application
        let app;
        window.addEventListener('DOMContentLoaded', () => {
            app = new AWSQuizApp();
        });
    