import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// Importa ícones do Lucide React
import { Home, Mic, Briefcase, Users, Lightbulb, Trophy, DollarSign, Bike, MessageSquare, CheckCircle, Heart, Leaf, Star, Info, MapPin, Award, RefreshCcw, CalendarDays, Volume2, Search, Gift, Send, Copy, FileText, Mail, Phone, Menu, X, Quote, ChevronLeft, ChevronRight, Scale, Upload, BriefcaseBusiness, Calculator, Rss, ListTodo, Sparkles, TrendingUp, Handshake, Globe, PlayCircle, Instagram } from 'lucide-react';

// Modal para o fluxo de envio de áudio
const SendAudioModal = ({ onClose, navigateTo }) => {
    // Cores fixas para o modal
    const modalBg = 'bg-white';
    const modalText = 'text-gray-900';
    const buttonBg = 'bg-blue-600';
    const buttonText = 'text-white';
    const primaryColor = 'text-blue-600';
    const successBg = 'bg-green-500';
    const successText = 'text-green-700';
    const warningBg = 'bg-amber-600';
    const errorText = 'text-red-500';
    const inputBg = 'bg-white';
    const inputBorder = 'border-gray-200';
    const inputOutline = 'outline-blue-600';

    const [selectedCategory, setSelectedCategory] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [paymentProofFile, setPaymentProofFile] = useState(null);
    const [howDidYouHear, setHowDidYouHear] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const audioDurations = {
        'AELO+ Cliente': '15 a 20 segundos',
        'AELO Negócio - Em Fila': '30 segundos a 1 minuto',
        'AELO Negócio - Particular': '30 segundos a 1 minuto',
        'AELO Informações Públicas': '30 segundos a 1 minuto e 30 segundos',
    };

    const prices = {
        'AELO+ Cliente': 'R$ 6,00',
        'AELO Negócio - Em Fila': 'R$ 29,90',
        'AELO Negócio - Particular': 'R$ 69,90',
        'AELO Informações Públicas': 'R$ 49,90',
    };

    const pixKey = '60.676.425/0001-47';
    const pixHolder = 'A A S Fernandes';
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://wa.me/5514981150675')}`;

    const handleWhatsAppClick = () => {
        if (!firstName || !lastName) {
            console.log('Por favor, preencha seu nome e sobrenome antes de prosseguir.');
            return;
        }
        let message = `Olá, AELO! Meu nome é ${firstName} ${lastName}. Gostaria de enviar um áudio para a categoria "${selectedCategory}". Já realizei o pagamento e estou pronto(a) para gravar e enviar o áudio.`;
        if (howDidYouHear) {
            message += ` Conheci a AELO através de: ${howDidYouHear}.`;
        }
        window.open(`https://wa.me/5514981150675?text=${encodeURIComponent(message)}`, '_blank');
        onClose();
    };

    const handlePaymentProofUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPaymentProofFile(file);
            console.log(`Comprovante "${file.name}" anexado!`);
        }
    };

    const handleTermsClick = (e) => {
        e.preventDefault();
        onClose();
        if (typeof navigateTo === 'function') {
            navigateTo('termos-condicoes');
        } else {
            console.error("navigateTo não é uma função em SendAudioModal:", navigateTo);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-[100]">
            <div className={`p-6 rounded-lg shadow-2xl w-11/12 max-w-md max-h-[90vh] overflow-y-auto relative ${modalBg} ${modalText}`}>
                <button onClick={onClose} className={`absolute top-3 right-3 p-2 rounded-full bg-gray-100 text-gray-700`}>
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Envie seu Áudio para a AELO!</h2>

                <div className="mb-4">
                    <p className="font-semibold mb-2">1. Escolha a Categoria Desejada:</p>
                    {Object.keys(audioDurations).map((category) => (
                        <label key={category} className="flex items-center mb-2 cursor-pointer">
                            <input
                                type="radio"
                                name="audioCategory"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`form-radio h-4 w-4 ${primaryColor}`}
                            />
                            <span className="ml-2">{category}</span>
                        </label>
                    ))}
                </div>

                {selectedCategory && (
                    <>
                        <div className={`mb-4 p-3 rounded-lg bg-blue-50`}>
                            <p className="font-semibold">Tempo de Áudio Recomendado para "{selectedCategory}":</p>
                            <p className={`text-lg font-bold text-blue-700`}>{audioDurations[selectedCategory]}</p>
                        </div>

                        <div className={`mb-4 p-3 rounded-lg text-center ${successBg}`}>
                            <p className="font-semibold mt-4 mb-2">Preço para "{selectedCategory}":</p>
                            <p className={`text-3xl font-bold ${successText}`}>{prices[selectedCategory]}</p>

                            <p className="font-semibold mt-4 mb-2">3. Realize o Pagamento via Pix:</p>
                            <p className={`text-lg font-bold ${successText}`}>Titular: {pixHolder}</p>
                            <button onClick={() => {
                                const tempInput = document.createElement('input');
                                tempInput.value = pixKey;
                                document.body.appendChild(tempInput);
                                tempInput.select();
                                document.execCommand('copy');
                                document.body.removeChild(tempInput);
                                console.log('Chave Pix copiada!');
                            }} className={`mt-2 px-4 py-2 ${buttonText} rounded-full hover:opacity-90 transition-colors flex items-center justify-center gap-1 mx-auto ${buttonBg}`}>
                                <Copy size={16} /> Copiar Chave Pix (CNPJ)
                            </button>
                            <p className={`mt-2 text-sm text-gray-700`}>Use a chave Pix copiada para realizar o pagamento em seu aplicativo bancário.</p>

                            <p className="font-semibold mt-6 mb-2">4. Escaneie o QR Code para Enviar Comprovante e Áudio via WhatsApp:</p>
                            <p className={`text-sm text-gray-700`}>Escaneie o QR Code abaixo para nos enviar o comprovante de pagamento e o seu áudio via WhatsApp.</p>
                            <img src={qrCodeUrl} alt="QR Code WhatsApp" className="mx-auto my-4 rounded-lg shadow-md" />
                            
                            <div className="mt-4 flex flex-col items-center">
                                <label htmlFor="paymentProof" className={`px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors cursor-pointer flex items-center gap-1 ${warningBg}`}>
                                    <Upload size={18} /> Anexar Comprovante (Obrigatório)
                                </label>
                                <input
                                    type="file"
                                    id="paymentProof"
                                    accept="image/*,.pdf"
                                    onChange={handlePaymentProofUpload}
                                    className="hidden"
                                    required
                                />
                                {paymentProofFile && <p className="text-sm mt-2">Arquivo: {paymentProofFile.name} anexado.</p>}
                                {!paymentProofFile && (
                                    <p className={`text-sm mt-2 ${errorText}`}>O comprovante de pagamento é obrigatório para prosseguir.</p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <p className="font-semibold mb-2">2. Instruções de Gravação:</p>
                    <ul className={`list-disc list-inside space-y-1 text-gray-700`}>
                        <li>Grave seu áudio com qualidade (celular ou computador).</li>
                        <li>Informe a categoria escolhida e detalhes como data, horário preferencial e endereço (se for para uma pessoa/local específico).</li>
                        <li>Para uma experiência mais fluida, o envio do áudio pode ser feito diretamente pelo WhatsApp da AELO - Sua Voz em Movimento.</li>
                    </ul>
                    <p className={`mt-2 font-semibold text-red-600`}>Atenção: A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                </div>

                {/* Campos para Nome e Sobrenome */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-semibold mb-1">Seu Nome (Obrigatório)</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${inputBg} ${inputBorder} ${modalText} ${inputOutline}`}
                        placeholder="Ex: João"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-semibold mb-1">Seu Sobrenome (Obrigatório)</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${inputBg} ${inputBorder} ${modalText} ${inputOutline}`}
                        placeholder="Ex: Silva"
                        required
                    />
                </div>

                {/* Campo: Como conheceu a AELO? */}
                <div className="mb-4">
                    <label htmlFor="howDidYouHear" className="block text-sm font-semibold mb-1">Como conheceu a AELO? (Opcional)</label>
                    <input
                        type="text"
                        id="howDidYouHear"
                        value={howDidYouHear}
                        onChange={(e) => setHowDidYouHear(e.target.value)}
                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${inputBg} ${inputBorder} ${modalText} ${inputOutline}`}
                        placeholder="Ex: Instagram, Amigo, Pesquisa no Google"
                    />
                </div>

                <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className={`form-checkbox h-4 w-4 ${primaryColor}`}
                        />
                        <span className={`ml-2 text-gray-800`}>Aceito os <a href="#" onClick={handleTermsClick} className={`hover:underline ${primaryColor}`}>termos e condições</a> da AELO - Sua Voz em Movimento.</span>
                    </label>
                </div>

                <button
                    onClick={handleWhatsAppClick}
                    disabled={!selectedCategory || !agreedToTerms || !paymentProofFile || !firstName || !lastName}
                    className={`w-full py-3 text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 flex items-center justify-center gap-2`}
                >
                    <MessageSquare size={20} /> Enviar Áudio via WhatsApp
                </button>
            </div>
        </div>
    );
};


// Componente principal do aplicativo
const App = () => {
    const [activePage, setActivePage] = useState('home');
    const [contentVisible, setContentVisible] = useState(true);
    const [pixCopiedMessage, setPixCopiedMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSendAudioModal, setShowSendAudioModal] = useState(false);

    const [selectedPlan, setSelectedPlan] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [dailyCost, setDailyCost] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [baseCost, setBaseCost] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [finalCost, setFinalCost] = useState(0);
    const [savings, setSavings] = useState(0);
    const [effectiveDailyCost, setEffectiveDailyCost] = useState(0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatPercentage = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(value);
    };

    useEffect(() => {
        if (selectedPlan && selectedDuration) {
            let currentDailyCost = 0;
            if (selectedPlan === 'emFila') {
                currentDailyCost = 29.90;
            } else if (selectedPlan === 'particular') {
                currentDailyCost = 69.90;
            }
            setDailyCost(currentDailyCost);

            let currentTotalDays = 0;
            let currentDiscountPercentage = 0;

            switch (selectedDuration) {
                case '7d':
                    currentTotalDays = 7;
                    currentDiscountPercentage = 0;
                    break;
                case '30d':
                    currentTotalDays = 30;
                    currentDiscountPercentage = 0.05;
                    break;
                case '90d':
                    currentTotalDays = 90;
                    currentDiscountPercentage = 0.10;
                    break;
                case '180d':
                    currentTotalDays = 180;
                    currentDiscountPercentage = 0.15;
                    break;
                case '365d':
                    currentTotalDays = 365;
                    currentDiscountPercentage = 0.20;
                    break;
                default:
                    break;
            }
            setTotalDays(currentTotalDays);
            setDiscountPercentage(currentDiscountPercentage);

            const calculatedBaseCost = currentDailyCost * currentTotalDays;
            setBaseCost(calculatedBaseCost);

            const calculatedDiscountAmount = calculatedBaseCost * currentDiscountPercentage;
            setSavings(calculatedDiscountAmount);

            const calculatedFinalCost = calculatedBaseCost - calculatedDiscountAmount;
            setFinalCost(calculatedFinalCost);

            const calculatedEffectiveDailyCost = calculatedFinalCost / currentTotalDays;
            setEffectiveDailyCost(calculatedEffectiveDailyCost);

        } else {
            setDailyCost(0);
            setTotalDays(0);
            setBaseCost(0);
            setDiscountPercentage(0);
            setFinalCost(0);
            setSavings(0);
            setEffectiveDailyCost(0);
        }
    }, [selectedPlan, selectedDuration]);

    const blogPosts = [
        {
            id: 1,
            title: "A Revolução da Publicidade Sonora em Bauru",
            date: "15 de Julho de 2025",
            author: "Equipe AELO",
            snippet: "Descubra como a AELO está transformando a forma como as mensagens são veiculadas na cidade, unindo inovação e sustentabilidade.",
            content: `
                <p>A cidade de Bauru está vivenciando uma verdadeira revolução na forma como a publicidade e a comunicação se manifestam. Longe dos métodos tradicionais que muitas vezes se perdem no ruído visual, a AELO - Sua Voz em Movimento surge como uma proposta inovadora e altamente eficaz.</p>
                <p>Utilizando ciclistas equipados com sistemas de som de alta qualidade, a AELO leva mensagens diretamente às ruas, praças e bairros, criando uma experiência sonora que cativa e engaja.</p>
                <p>Nossa abordagem sustentável, que prioriza o uso de bicicletas, não só contribui para um meio ambiente mais limpo, mas também associa as marcas dos nossos clientes a valores de responsabilidade social e ambiental. É uma publicidade "verde" de verdade, que ressoa com a crescente preocupação do público com a sustentabilidade.</p>
                <p>Além disso, a interação humana proporcionada pelos nossos ciclistas cria uma conexão autêntica e emocional, diferenciando a AELO de qualquer outro meio de veiculação. Sua mensagem não é apenas ouvida, ela é sentida e lembrada.</p>
                <p>Junte-se a nós nessa revolução sonora e veja sua voz ganhar asas e pedalar pela cidade, alcançando corações e mentes de forma inesquecível!</p>
            `
        },
        {
            id: 2,
            title: "Como Criar um Áudio Impactante para o Seu Negócio",
            date: "01 de Agosto de 2025",
            author: "Arthur Hocc D'Mello",
            snippet: "Dicas essenciais para produzir um áudio que realmente chame a atenção e converta ouvintes em clientes.",
            content: `
                <p>Criar um áudio impactante para o seu negócio é uma arte que combina criatividade, clareza e estratégia. Na AELO - Sua Voz em Movimento, sabemos que a qualidade da sua mensagem é crucial para o sucesso da veiculação. Aqui estão algumas dicas para você produzir um áudio que realmente chame a atenção e converta ouvintes em clientes:</p>
                
                <h3>1. Seja Conciso e Direto</h3>
                <p>O tempo é precioso, especialmente na publicidade sonora. Vá direto ao ponto. Apresente sua oferta ou mensagem principal nos primeiros segundos. Evite introduções longas ou informações desnecessárias. Lembre-se das durações ideais para cada categoria: 30 segundos a 1 minuto para AELO Negócio.</p>
                
                <h3>2. Clareza é Fundamental</h3>
                <p>A dicção deve ser clara e a velocidade da fala adequada. Evite gírias excessivas ou jargões que seu público talvez não compreenda. A mensagem precisa ser facilmente entendida por qualquer pessoa que a ouça em movimento.</p>
                
                <h3>3. Chame a Atenção</h3>
                <p>Comece com algo que prenda a atenção do ouvinte. Pode ser uma pergunta, um som interessante (mas não invasivo), ou uma declaração ousada. O objetivo é fazer com que as pessoas parem e ouçam.</p>
                
                <h3>4. Destaque o Benefício, Não Apenas a Característica</h3>
                <p>Em vez de apenas listar o que você oferece, foque nos benefícios que seu produto ou serviço traz para o cliente. Como ele resolve um problema? Como melhora a vida do seu público?</p>
                
                <h3>5. Inclua uma Chamada para Ação (CTA) Clara</h3>
                <p>O que você quer que o ouvinte faça depois de ouvir seu áudio? Visitar seu site? Ligar para um número? Ir até sua loja? Deixe a chamada para ação muito clara e fácil de lembrar.</p>
                
                <h3>6. Considere a Música e Efeitos Sonoros (com cuidado)</h3>
                <p>Música de fundo e efeitos sonoros podem enriquecer seu áudio, mas use-os com moderação para não ofuscar a mensagem principal. Certifique-se de ter os direitos autorais de qualquer música utilizada.</p>
                
                <h3>7. Teste o Áudio</h3>
                <p>Antes de enviar para a AELO, ouça seu áudio em diferentes ambientes (com fones de ouvido, no carro, em um local barulhento). Isso ajudará a identificar se a mensagem é clara e audível em diversas situações.</p>
                
                <p>Seguindo essas dicas, você estará no caminho certo para criar um áudio que não apenas divulga, mas também conecta e gera resultados para o seu negócio com a AELO - Sua Voz em Movimento!</p>
            `
        },
        {
            id: 3,
            title: "AELO e o Impacto na Comunidade: Mais Que Voz, Uma Conexão",
            date: "20 de Julho de 2025",
            author: "Equipe AELO",
            snippet: "Descubra como a AELO vai além da publicidade, promovendo a conexão e o bem-estar na comunidade de Bauru.",
            content: `
                <p>Na AELO - Sua Voz em Movimento, nossa missão vai muito além de simplesmente veicular áudios. Acreditamos no poder da voz para conectar pessoas, fortalecer comunidades e promover o bem-estar social. Nosso compromisso com a comunidade de Bauru e região se manifesta de diversas formas:</p>
                
                <h3>1. Amplificando Causas Sociais</h3>
                <p>Através da categoria "AELO Informações Públicas", oferecemos uma plataforma para que ONGs, instituições e projetos sociais possam divulgar suas campanhas de conscientização, eventos beneficentes e chamados por voluntários. Damos voz a quem trabalha pelo coletivo, garantindo que mensagens importantes alcancem um público amplo e engajado.</p>
                
                <h3>2. Incentivo à Mobilidade Sustentável</h3>
                <p>Ao utilizar bicicletas como principal meio de veiculação, a AELO promove um estilo de vida mais ativo e saudável, além de contribuir para a redução da poluição e do trânsito nas cidades. Somos um exemplo de como o negócio pode ser aliado da sustentabilidade.</p>
                
                <h3>3. Dinâmicas de Engajamento Comunitário</h3>
                <p>Nossas dinâmicas, como "Achou um Áudio Conhecido?" e "Caça ao Tesouro Sonora", transformam a cidade em um palco de interação e diversão. Elas incentivam as pessoas a prestarem atenção ao ambiente ao redor, a se conectarem com as mensagens e a participarem de atividades que promovem a alegria e a união.</p>
                
                <h3>4. Apoio ao Comércio Local</h3>
                <p>Para os pequenos e médios empreendedores, a AELO oferece uma solução de publicidade acessível e eficaz, ajudando-os a alcançar seus clientes de forma direta e inovadora. Ao fortalecer o comércio local, contribuímos para a economia e o desenvolvimento da nossa comunidade.</p>
                
                <h3>5. Conexão Humana</h3>
                <p>Nossos ciclistas não são apenas portadores de mensagens; eles são parte da paisagem urbana, interagindo com as pessoas e criando uma presença humana que os carros de som tradicionais não conseguem replicar. Essa conexão genuína torna a experiência da AELO única e memorável.</p>
                
                <p>A AELO - Sua Voz em Movimento se orgulha de ser mais do que uma empresa de publicidade; somos um agente de transformação social, utilizando a voz para construir uma comunidade mais conectada, consciente e vibrante.</p>
            `
        }
    ];

    const [selectedBlogPost, setSelectedBlogPost] = useState(null);

    const aeloInActionStories = [
        {
            id: 1,
            title: "A Voz que Iluminou o Dia na Rotina de Bauru",
            icon: <Sparkles size={28} className="text-yellow-500" />,
            description: "Em um dia comum em Bauru, João estava se sentindo desanimado com os desafios da vida. De repente, um ciclista da AELO passou, veiculando um áudio motivacional. A mensagem, em movimento, alcançou João no momento certo, e ele sentiu uma onda de esperança, percebendo que sua jornada continuava. A voz da AELO, pedalando pela cidade, transformou seu dia!"
        },
        {
            id: 2,
            title: "O Bom Dia Sonoro que Alegrou a Cidade",
            icon: <TrendingUp size={28} className="text-amber-500" />,
            description: "Maria, uma cliente da AELO, teve a ideia de enviar um 'Super Bom Dia!' para toda a cidade de Bauru. Ela gravou sua mensagem cheia de energia, e a AELO a veiculou por diferentes bairros. O feedback foi incrível! Pessoas nas ruas sorriam e acenavam, e Maria se sentiu realizada por ter espalhado tanta positividade em movimento. Sua voz, em cada pedalada, fez a diferença."
        },
        {
            id: 3,
            title: "A Promoção que Lotou a Pizzaria Saborosa",
            icon: <Star size={28} className="text-amber-500" />,
            description: "A Pizzaria Saborosa lançou uma nova promoção e precisava de um empurrão. A AELO veiculou o anúncio nas ruas próximas, e o resultado foi imediato: a pizzaria registrou um aumento de 30% nas vendas no primeiro fim de semana da campanha. O som atraiu os clientes diretamente para o sabor!"
        },
        {
            id: 4,
            title: "Achou o Áudio e Ganhou um Presente!",
            icon: <Award size={28} className="text-blue-500" />,
            description: "Durante nossa dinâmica 'Achou um Áudio Conhecido?', a Ana Paula reconheceu a voz da sua irmã veiculando uma mensagem de apoio. Ela gravou o vídeo, nos enviou e sua irmã recebeu um brinde exclusivo da AELO! A emoção de ser encontrado pela voz é indescritível."
        }
    ];

    const faqData = [
        {
            question: "Onde os áudios são veiculados?",
            answer: "Nossos áudios são veiculados por ciclistas da AELO que se movem por áreas de grande circulação em Bauru e região, garantindo um alcance hiperlocal e dinâmico."
        },
        {
            question: "Como garanto que minha mensagem foi veiculada?",
            answer: "Nós enviamos um vídeo de confirmação, mostrando o ciclista da AELO veiculando sua mensagem. Além disso, você pode participar de nossas dinâmicas para tentar achar seu áudio na rua e ganhar prêmios!"
        },
        {
            question: "Quanto tempo dura a veiculação do meu áudio?",
            answer: "A veiculação dura o dia inteiro (das 8h às 18h), com o seu áudio sendo reproduzido múltiplas vezes, garantindo um impacto memorável."
        },
        {
            question: "Posso enviar áudios com música de fundo?",
            answer: "Sim, é possível! No entanto, todos os áudios com música devem ter os direitos autorais liberados. Caso contrário, a AELO não poderá veicular. Recomendamos o uso de músicas de domínio público ou que você mesmo tenha o direito de usar."
        },
        {
            question: "Qual a diferença entre os planos 'Em Fila' e 'Particular'?",
            answer: "No plano 'Em Fila', seu áudio é reproduzido em uma sequência com os demais áudios de clientes. No plano 'Particular', apenas o seu áudio será veiculado durante todo o dia, proporcionando exclusividade total."
        },
        {
            question: "A AELO atende outras cidades além de Bauru?",
            answer: "Atualmente, nosso foco principal é Bauru e cidades vizinhas. Para saber sobre a disponibilidade em outras localidades, por favor, entre em contato conosco diretamente."
        },
        {
            question: "Como posso acompanhar a veiculação do meu áudio?",
            answer: "Além do vídeo de confirmação que enviamos, você pode participar das nossas dinâmicas, como a 'Achou um Áudio Conhecido?', para ter a chance de encontrar seu áudio na rua e ganhar um brinde!"
        },
        {
            question: "Quais são as formas de pagamento aceitas?",
            answer: "Aceitamos pagamentos via Pix. Nossa chave Pix é o CNPJ: 60.676.425/0001-47 (Titular: A A S Fernandes). Após o pagamento, é importante enviar o comprovante para agilizar a veiculação."
        },
        {
            question: "Posso cancelar a veiculação do meu áudio?",
            answer: "Após o envio do áudio e a confirmação do pagamento, não há reembolso caso o cliente desista da veiculação após 30 minutos, mesmo que o áudio não infrinja nossas regras."
        },
        {
            question: "Existe alguma restrição de conteúdo para os áudios?",
            answer: "Sim, todos os áudios são moderados. Não veiculamos conteúdos de má-fé, difamação, discriminação, discurso de ódio, conteúdo sexualmente explícito, informações falsas, ou que violem direitos autorais e atividades ilícitas. A AELO se reserva o direito de recusar qualquer áudio que não esteja em conformidade com nossas diretrizes."
        }
    ];

    const currentYear = new Date().getFullYear();
    
    const testimonials = [
        {
            quote: "O pedido de casamento foi mágico! Ouvir minha voz ecoando na praça onde nos conhecemos... Inesquecível. AELO tornou tudo perfeito!",
            name: "Lucas M.",
            service: "AELO+ Cliente",
            icon: <Heart size={24} className="text-yellow-500" />
        },
        {
            quote: "A inauguração da nossa cafeteria foi um sucesso! A propaganda na AELO atraiu muita gente do bairro. O retorno foi imediato e superou as expectativas.",
            name: "Juliana P.",
            service: "AELO Negócio",
            icon: <Briefcase size={24} className="text-yellow-500" />
        },
        {
            quote: "Conseguimos muitos voluntários para nossa campanha de doação de agasalhos. AELO foi fundamental para espalhar a mensagem pela comunidade.",
            name: "ONG Mãos que Ajudam",
            service: "AELO Informações Públicas",
            icon: <Info size={24} className="text-blue-500" />
        },
        {
            quote: "Ouvir a voz dos meus filhos me parabenizando pelo meu aniversário enquanto eu caminhava na rua... me emocionei demais! Uma surpresa maravilhosa.",
            name: "Silvia R.",
            service: "AELO+ Cliente",
            icon: <Gift size={24} className="text-yellow-500" />
        },
        {
            quote: "A veiculação da AELO divulgou nosso bazar de roupas usadas e superou as expectativas de público. Foi uma solução de baixo custo com um resultado incrível!",
            name: "Bazar da Ana",
            service: "AELO Negócio",
            icon: <DollarSign size={24} className="text-green-500" />
        },
        {
            quote: "Usamos a AELO para divulgar um evento de adoção de animais. O áudio com os latidos e miados chamou muita atenção e a maioria dos bichinhos encontrou um lar!",
            name: "Abrigo Patas Felizes",
            service: "AELO Informações Públicas",
            icon: <Heart size={24} className="text-red-500" />
        }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };
    
    useEffect(() => {
        if (activePage === 'depoimentos') {
            const timer = setInterval(() => {
                nextTestimonial();
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [activePage, currentTestimonialIndex]);

    const navigateTo = (page) => {
        setContentVisible(false);
        setIsMenuOpen(false);
        setTimeout(() => {
            setActivePage(page);
            setContentVisible(true);
        }, 300);
    };

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const copyPixKey = () => {
        const pixKey = '60.676.425/0001-47';
        document.execCommand('copy');
        const tempInput = document.createElement('input');
        tempInput.value = pixKey;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setPixCopiedMessage('Chave Pix copiada!');
        setTimeout(() => setPixCopiedMessage(''), 3000);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('');

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (Math.random() > 0.1) {
            setFormStatus('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            setFormName('');
            setFormEmail('');
            setFormMessage('');
        } else {
            setFormStatus('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen font-inter antialiased flex flex-col transition-colors duration-300 bg-gray-100 text-gray-900">
            {/* Header aprimorado */}
            <header className="p-6 shadow-xl rounded-b-3xl relative text-center bg-gradient-to-r from-black to-blue-600">
                <div className="container mx-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="absolute top-6 left-6 p-2 rounded-full bg-black text-white z-50 hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <h1 className="text-6xl md:text-7xl font-extrabold mb-1 animate-fade-in-down drop-shadow-lg text-white">
                        AELO
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold flex items-center justify-center gap-2 animate-fade-in-down delay-200 text-shadow-sm text-yellow-300">
                        Sua Voz em Movimento
                        <Bike size={28} className="text-yellow-300 transform transition-transform duration-300 hover:rotate-[360deg]" />
                    </p>
                </div>
            </header>

            {/* Overlay para fechar o menu ao clicar fora */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* Navegação Lateral (Sidebar) */}
            <nav className={`fixed inset-y-0 left-0 p-6 shadow-xl z-50 w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto bg-white ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end items-center mb-6">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-full bg-gray-100 text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label="Fechar menu de navegação"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('home')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'home' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Home size={20} /> Início</button>
                    <button onClick={() => navigateTo('categorias')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'categorias' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Briefcase size={20} /> Categorias</button>
                    <button onClick={() => navigateTo('porque-aelo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'porque-aelo' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Lightbulb size={20} /> Por Que AELO?</button>
                    <button onClick={() => navigateTo('comparativo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'comparativo' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Scale size={20} /> AELO vs. Tradicionais</button>
                    <button onClick={() => navigateTo('depoimentos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'depoimentos' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Quote size={20} /> Depoimentos</button>
                    <button onClick={() => navigateTo('dinamicas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'dinamicas' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Trophy size={20} /> Dinâmicas</button>
                    <button onClick={() => navigateTo('temporadas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'temporadas' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><CalendarDays size={20} /> Temporadas</button>
                    <button onClick={() => navigateTo('precos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'precos' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><DollarSign size={20} /> Preços</button>
                    <button onClick={() => navigateTo('como-enviar')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'como-enviar' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Send size={20} /> Como Enviar Áudios</button>
                    <button onClick={() => navigateTo('aelo-em-acao')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'aelo-em-acao' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Sparkles size={20} /> AELO em Ação</button>
                    {/* Botão 'Seu AELO' removido */}
                    <button onClick={() => navigateTo('simular-assinatura')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'simular-assinatura' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Calculator size={20} /> Simulador de Assinatura</button>
                    <button onClick={() => navigateTo('blog')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'blog' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Rss size={20} /> Blog/Notícias</button>
                    <button onClick={() => navigateTo('trabalhe-conosco')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'trabalhe-conosco' ? `bg-blue-600 text-white shadow-md animate-pulse` : `bg-white text-gray-900 hover:bg-blue-100`}`}><BriefcaseBusiness size={20} /> Trabalhe Conosco</button>
                    <button onClick={() => navigateTo('compromisso-sustentavel')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'compromisso-sustentavel' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Leaf size={20} /> Compromisso Sustentável</button>
                    <button onClick={() => navigateTo('faq')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'faq' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><Info size={20} /> FAQ</button>
                    <button onClick={() => navigateTo('termos-condicoes')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'termos-condicoes' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><FileText size={20} /> Termos</button>
                    <button onClick={() => navigateTo('contato')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'contato' ? `bg-blue-600 text-white shadow-md` : `bg-white text-gray-900 hover:bg-blue-100`}`}><MessageSquare size={20} /> Contato</button>
                </div>
            </nav>
            
            {/* Botões Flutuantes Enfileirados e Condicionais */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 transition-all duration-300" style={{ transform: activePage !== 'home' ? 'scale(0.9) opacity(0.8)' : 'scale(1) opacity(1)' }}>
                {/* Floating Instagram Button */}
                <a
                    href="https://www.instagram.com/aelovoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center"
                    style={{ backgroundColor: '#E1306C', color: 'white' }}
                    aria-label="Visite nosso Instagram"
                    title="Visite nosso Instagram"
                >
                    <Instagram size={20} />
                </a>

                {/* Floating WhatsApp */}
                <a
                    href="https://wa.me/5514981150675"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                    aria-label="Fale Conosco no WhatsApp"
                    title="Fale Conosco no WhatsApp"
                >
                    <MessageSquare size={20} />
                </a>

                {/* Fixed "Envie seu Áudio" Button */}
                <button
                    onClick={() => setShowSendAudioModal(true)}
                    className="px-4 py-2 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center font-bold text-sm bg-yellow-400 text-gray-900"
                    aria-label="Envie seu Áudio"
                    title="Envie seu Áudio"
                >
                    <Mic size={16} className="mr-1" />
                    Envie seu Áudio
                </button>
            </div>

            {/* Modal de Envio de Áudio */}
            {showSendAudioModal && <SendAudioModal onClose={() => setShowSendAudioModal(false)} navigateTo={navigateTo} />}

            {/* Conteúdo Principal */}
            <main className="p-4 md:p-8 flex-grow pb-28">
                <div key={activePage} className={`relative z-10 transition-opacity duration-300 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {activePage === 'home' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 text-center animate-fade-in bg-blue-50">
                            <h2 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3 text-gray-900">Bem-vindo(a) à AELO!</h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Na AELO, sua voz ganha asas e pedala pela cidade, criando conexões inesquecíveis. Transformamos mensagens em experiências sonoras que ecoam pelas ruas, alcançando corações e mentes.</p>
                            <p className="text-lg mb-8 leading-relaxed flex items-center justify-center gap-2 text-yellow-500">
                                <Mic size={28} className="text-yellow-500" />
                                <span className="font-semibold">Bauru & Região</span>
                            </p>
                            <div className="p-4 rounded-lg font-semibold flex items-center justify-center gap-2 border shadow-sm bg-blue-100 text-blue-800 border-blue-200">
                                <Info size={20} />
                                Fique de olho nas nossas Temporadas Temáticas para uma conexão ainda mais profunda com o público! Explore a aba "Temporadas" e saiba como sua voz pode se encaixar perfeitamente no momento.
                            </div>
                        </div>
                    )}

                    {activePage === 'categorias' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                             <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Nossas Categorias de Serviço: Conecte-se de Forma Única <Users size={32} /></h2>
                             <p className="text-lg mb-6 leading-relaxed text-gray-900">Oferecemos soluções personalizadas para cada tipo de mensagem, garantindo que sua voz alcance o coração certo. Escolha a que mais ressoa com sua intenção:</p>
                             <div className="category-box border p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white border-blue-600">
                                 <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><Heart size={24} /> AELO+ Cliente: Emoção que Pedala</h3>
                                 <p className="leading-relaxed text-gray-900">A categoria mais pessoal e emocionante, perfeita para momentos que merecem ser eternizados:</p>
                                 <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                     <li>Declarações de Amor: Um pedido de casamento inesquecível, uma homenagem tocante.</li>
                                     <li>Feliz Aniversário Inesquecível: Sua voz, suas risadas, suas memórias mais queridas.</li>
                                     <li>Palavras Amigas/Apoio: Conforto, incentivo e carinho em momentos cruciais.</li>
                                     <li>Pedidos de Desculpas Sinceros: A emoção da sua voz para a reconciliação.</li>
                                     <li>Celebração de Conquistas: Formaturas, novos empregos, vitórias que merecem ser celebradas em alto e bom som.</li>
                                 </ul>
                                 <p className="mt-4 leading-relaxed text-gray-900">Como funciona: Grave seu áudio com o coração (seu celular é perfeito!), envie para a AELO e nós o veiculamos com carinho. Simples e impactante!</p>
                             </div>
                             <div className="category-box border p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white border-blue-600">
                                 <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><Briefcase size={24} /> AELO Negócio: Sua Marca em Movimento</h3>
                                 <p className="leading-relaxed text-gray-900">A publicidade que o seu negócio precisa para se destacar na paisagem urbana. Ideal para:</p>
                                 <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                     <li>Anunciar Promoções Irresistíveis: Ofertas relâmpago, cupons de desconto que chamam a atenção.</li>
                                     <li>Inaugurações Memoráveis: Divulgar a abertura da sua loja ou serviço de forma criativa.</li>
                                     <li>Eventos Vibrantes: Convidar para feiras, workshops, espetáculos que não podem ser perdidos.</li>
                                     <li>Lançamento de Produtos Inovadores: Apresentar novidades ao público de forma dinâmica.</li>
                                 </ul>
                                 <p className="mt-4 leading-relaxed text-gray-900">É a solução ideal para pequenos e médios empreendedores que buscam um alcance direcionado, criativo e que realmente se conecta com a cidade.</p>
                             </div>
                             <div className="category-box border p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white border-blue-600">
                                 <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><Info size={24} /> AELO Informações Públicas: Ecoando Boas Causas</h3>
                                 <p className="leading-relaxed text-gray-900">Uma categoria dedicada a amplificar causas sociais e avisos comunitários importantes. Use a AELO para:</p>
                                 <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                     <li>Campanhas de Conscientização: Saúde, meio ambiente, segurança, e tudo que importa para a comunidade.</li>
                                     <li>Eventos Beneficentes: Divulgar ações de ONGs, pedidos de voluntários, e iniciativas solidárias.</li>
                                     <li>Avisos Comunitários: Informações cruciais para o bairro ou cidade, entregues de forma eficiente.</li>
                                 </ul>
                                 <p className="mt-4 leading-relaxed text-gray-900">Fazer o bem também tem voz, e a AELO está aqui para amplificar sua mensagem social, alcançando quem mais precisa.</p>
                             </div>
                        </div>
                    )}

                    {activePage === 'porque-aelo' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                             <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Por Que Escolher a AELO? A Diferença que Você Ouve! <Star size={32} /></h2>
                             <p className="text-lg mb-6 leading-relaxed text-gray-900">A AELO - Sua Voz em Movimento vai além da publicidade; é uma experiência sonora que cativa. Descubra os diferenciais que nos tornam a escolha perfeita para sua mensagem:</p>
                             <ul className="space-y-4">
                                 <li className="p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white">
                                     <CheckCircle size={24} className="text-blue-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold text-gray-900">Alcance Hiperlocal e Dinâmico</h3>
                                         <p className="text-gray-600">Sua mensagem em movimento, alcançando ruas, bairros e públicos específicos com precisão e energia. Não é um anúncio parado, é uma voz que se integra ao ritmo da cidade.</p>
                                     </div>
                                 </li>
                                 <li className="p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white">
                                     <CheckCircle size={24} className="text-blue-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold text-gray-900">Engajamento Inovador e Memorável</h3>
                                         <p className="text-gray-600">Em um mundo de distrações visuais, o som inesperado de uma bicicleta captura a atenção e gera curiosidade genuína. Sua mensagem é ouvida em média 10 vezes por ciclo de veiculação, garantindo que ela seja fixada na mente.</p>
                                     </div>
                                 </li>
                                 <li className="p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white">
                                     <CheckCircle size={24} className="text-blue-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold text-gray-900">Qualidade Sonora e Conteúdo Moderado</h3>
                                         <p className="text-gray-600">Todos os áudios passam por um rigoroso processo de moderação. Garantimos clareza, objetividade e a melhor qualidade de som, para que sua mensagem chegue perfeita e sem ruídos indesejados, transmitindo profissionalismo e cuidado.</p>
                                     </div>
                                 </li>
                                 <li className="p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 bg-white">
                                     <CheckCircle size={24} className="text-blue-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold text-gray-900">Sustentabilidade e Imagem Positiva</h3>
                                         <p className="text-gray-600">Nossa publicidade é "verde" de verdade! Ao usar bicicletas, promovemos um marketing ecológico e associamos sua marca a valores de responsabilidade ambiental, saúde e inovação consciente.</p>
                                     </div>
                                 </li>
                                 <li className="p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-400 bg-white">
                                     <CheckCircle size={24} className="text-blue-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold text-gray-900">A Magia da Conexão Humana</h3>
                                         <p className="text-gray-600">Não é apenas um som; é uma voz levada por um ciclista, uma pessoa real que interage com a cidade. Essa presença humana cria uma conexão mais autêntica e emocional com quem ouve, tornando sua mensagem inesquecível e humana.</p>
                                     </div>
                                 </li>
                             </ul>
                        </div>
                    )}
                    
                    {/* Página de Comparativo */}
                    {activePage === 'comparativo' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">
                                AELO vs. Veiculadores Tradicionais: A Evolução da Sua Voz! <Scale size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center text-gray-900">
                                No cenário da publicidade e comunicação, a escolha do método de veiculação faz toda a diferença. Compare a abordagem inovadora da AELO - Sua Voz em Movimento com os tradicionais carros de som e descubra por que somos a melhor opção para sua mensagem.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Coluna AELO */}
                                <div className="p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white border border-blue-600">
                                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
                                        <Bike size={28} /> AELO: Sua Voz em Movimento
                                    </h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Facilidade e Estilo Facilitado:</h4>
                                            <p className="text-gray-600">Você tem o control total do seu marketing. Grave seu áudio com o celular, envie para nós e pronto! Simples, rápido e sem burocracia.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Preços e Economia Incomparáveis:</h4>
                                            <p className="text-gray-600">Nossos preços começam em apenas <span className="font-semibold text-green-600">R$ 6,00</span> por áudio, com veiculação o dia inteiro (das 8h às 18h). Um custo-benefício que os veiculadores tradicionais não conseguem igualar.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Categorias Diversificadas e Humanizadas:</h4>
                                            <p className="text-gray-600">Além de anúncios para negócios, oferecemos as categorias AELO+ Cliente (para mensagens pessoais e emocionantes) e AELO Informações Públicas (para causas humanitárias e comunitárias). Levamos sua voz para quem mais precisa, de forma autêntica e impactante.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Maior Alcance e Mais Rápido:</h4>
                                            <p className="text-gray-600">Nossos ciclistas atendem toda a cidade de Bauru e região, alcançando áreas específicas com agilidade e dinamismo. Sua mensagem não fica presa a uma rota fixa, ela se move com a cidade.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Conexão Humana e Engajamento:</h4>
                                            <p className="text-gray-600">A presença do ciclista cria uma interação mais genuína. O som inesperado da bicicleta com sua mensagem gera curiosidade e memorização, destacando-se no ambiente urbano.</p>
                                        </li>
                                    </ul>
                                </div>

                                {/* Coluna Veiculadores Tradicionais */}
                                <div className="p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white border border-blue-600">
                                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
                                        <Volume2 size={28} /> Carros de Som: O Passado da Veiculação
                                    </h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Custo Elevado por Pouco Serviço:</h4>
                                            <p className="text-gray-600">Os carros de som geralmente cobram muito mais por um serviço com alcance limitado e menos flexibilidade, tornando-o menos acessível para pequenos empreendedores e mensagens pessoais.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Alcance Limitado e Menos Dinâmico:</h4>
                                            <p className="text-gray-600">Ficam restritos a rotas pré-definidas e horários fixos, perdendo a oportunidade de alcançar públicos em áreas de grande fluxo que mudam ao longo do dia.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Menos Engajamento:</h4>
                                            <p className="text-gray-600">A presença constante e por vezes intrusiva pode levar à saturação e à ignorância por parte do público, que já está acostumado com esse tipo de anúncio.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg text-gray-900">Foco Exclusivo em Publicidade Comercial:</h4>
                                            <p className="text-gray-600">Geralmente, não oferecem opções para mensagens pessoais, declarações ou campanhas humanitárias, limitando o tipo de comunicação que pode ser veiculada.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-lg text-center leading-relaxed mt-8 flex items-center justify-center gap-2 text-gray-900">
                                Escolha a AELO - Sua Voz em Movimento e leve sua voz para o futuro, com mais impacto, economia e conexão humana!
                            </p>
                        </div>
                    )}

                    {activePage === 'depoimentos' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in relative bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">
                                Histórias de Sucesso AELO: A Voz dos Nossos Clientes <Quote size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center text-gray-900">
                                Nada fala mais alto sobre nosso impacto do que as histórias de quem confiou sua voz à AELO - Sua Voz em Movimento. Veja como transformamos mensagens em momentos inesquecíveis e resultados concretos.
                            </p>
                            
                            {/* Carrossel de depoimentos */}
                            <div className="relative">
                                <div className="p-6 rounded-lg border-l-4 transform transition-all duration-300 ease-in-out shadow-md bg-white border-blue-600">
                                    <Quote size={32} className="text-blue-300 mb-4" />
                                    <p key={currentTestimonialIndex} className="text-lg italic leading-relaxed mb-4 animate-fade-in-up text-gray-900">"{testimonials[currentTestimonialIndex].quote}"</p>
                                    <div className="flex items-center justify-end gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{testimonials[currentTestimonialIndex].name}</p>
                                            <p className="text-gray-600 text-sm">{testimonials[currentTestimonialIndex].service}</p>
                                        </div>
                                        <div className="p-3 rounded-full shadow-inner bg-white">
                                            {testimonials[currentTestimonialIndex].icon}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Botões de navegação */}
                                <button
                                    onClick={prevTestimonial}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-white hover:bg-gray-100 focus:ring-blue-600"
                                    aria-label="Depoimento anterior"
                                >
                                    <ChevronLeft size={24} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-white hover:bg-gray-100 focus:ring-blue-600"
                                    aria-label="Próximo depoimento"
                                >
                                    <ChevronRight size={24} className="text-gray-600" />
                                </button>
                            </div>
                            
                            {/* Indicadores de posição (dots) */}
                            <div className="flex justify-center items-center gap-2 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                    onClick={() => setCurrentTestimonialIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonialIndex === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                                        aria-label={`Ir para o depoimento ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'dinamicas' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Dinâmicas AELO: Sua Chance de Brilhar e Ganhar! <Trophy size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Na AELO - Sua Voz em Movimento, a interação e a recompensa são parte da nossa essência. Participe das nossas dinâmicas exclusivas e transforme sua experiência em algo ainda mais emocionante e recompensador!</p>
                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white border border-amber-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-amber-600"><Mic size={24} /> Achou um Áudio Conhecido? Surpreenda-se!</h3>
                                <p className="leading-relaxed text-gray-900">Você ouviu um áudio da AELO - Sua Voz em Movimento que reconheceu? Talvez seja a voz de um amigo, um familiar ou até a sua própria mensagem ecoando pela cidade!</p>
                                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                    <li>Grave um vídeo do ciclista AELO veiculando o áudio.</li>
                                    <li>Marque a AELO no seu Instagram <span className="font-semibold text-blue-600">@Aelovoz</span>.</li>
                                    <li>Envie o vídeo para nós via direct, informando o nome da pessoa dona da voz e o endereço aproximado de onde a ouviu.</li>
                                </ul>
                                <p className="mt-4 leading-relaxed flex items-center gap-2 text-gray-900">Nossa equipe verificará a solicitação e, se confirmado, faremos a entrega de um brinde surpresa e exclusivo para a pessoa dona da voz! Uma emoção em dobro! <Award size={20} className="text-amber-600"/></p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><DollarSign size={24} /> Ticket de até R$1000: Sua Voz Vale Ouro!</h3>
                                <p className="leading-relaxed text-gray-900">Ao enviar qualquer áudio para veiculação com a AELO - Sua Voz em Movimento (seja AELO+ Cliente, Negócio ou Informações Públicas), você automaticamente participa de uma dinâmica especial que pode te garantir um ticket valioso de até R$1000,00!</p>
                                <p className="mt-4 leading-relaxed flex items-center gap-2 text-gray-900">Sua voz não só emociona ou divulga, mas também pode te render um grande prêmio. É a AELO - Sua Voz em Movimento recompensando sua confiança e criatividade! <Trophy size={20} className="text-blue-600"/></p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><Search size={24} /> O Áudio Misterioso: Desvende o Enigma!</h3>
                                <p className="leading-relaxed text-gray-900">Fique atento(a)! Periodicamente, veicularemos um "Áudio Misterioso". Ouça com atenção, desvende o enigma e envie sua resposta para a AELO - Sua Voz em Movimento para ganhar prêmios!</p>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-700">
                                        O áudio misterioso não está disponível no momento devido a atualizações na API.
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 bg-white border border-green-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-green-600"><MapPin size={24} /> Caça ao Tesouro Sonora: Aventura Urbana!</h3>
                                <p className="leading-relaxed text-gray-900">Prepare-se para uma aventura! Em dias específicos, nossos ciclistas veiculam pistas em áudio, transformando a cidade em um grande jogo. Siga as pistas para encontrar o tesouro!</p>
                                <div className="flex justify-center items-center gap-4 mt-4 text-green-400">
                                    <Search size={28} />
                                    <span className="text-2xl font-mono">→</span>
                                    <Bike size={28} />
                                    <span className="text-2xl font-mono">→</span>
                                    <Gift size={32} className="text-green-600" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'temporadas' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Temporadas AELO: Conecte-se com o Momento e Amplifique Sua Mensagem! <CalendarDays size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Na AELO - Sua Voz em Movimento, acreditamos que sua mensagem ganha ainda mais força quando está em sintonia com o espírito do momento. Por isso, operamos em "Temporadas" temáticas, que permitem uma conexão mais profunda e relevante com o público da cidade.</p>
                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><Volume2 size={24} /> Como Funcionam as Temporadas AELO?</h3>
                                <p className="leading-relaxed text-gray-900">Cada temporada tem um tema central cuidadosamente escolhido, que reflete eventos, sentimentos ou celebrações do período. Isso nos permite criar um ambiente sonoro na cidade que ressoa diretamente com o que as pessoas estão vivenciando e sentindo.</p>
                                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                    <li>Mensagens de amor e carinho podem ter um destaque especial na "Temporada Áudio do Coração".</li>
                                    <li>Campanhas de sustentabilidade e bem-estar brilham na "Temporada Áudio Verde".</li>
                                    <li>Anúncios de eventos e promoções ganham ainda mais visibilidade na "Temporada Áudio Ação".</li>
                                    <li>Anúncios de eventos e promoções ganham ainda mais visibilidade na "Temporada Áudio Ação".</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><Leaf size={24} /> Exemplos de Temporadas Anteriores e Futuras</h3>
                                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                    <li>Temporada Áudio Verde: Foco em sustentabilidade, meio ambiente, vida saudável e bem-estar.</li>
                                    <li>Temporada Áudio do Coração: Celebração do amor, amizade, gratidão e conexões humanas.</li>
                                    <li>Temporada Áudio Ação: Impulso para o comércio local, grandes eventos, lançamentos e novidades.</li>
                                    <li>Temporada Áudio Festas: Mensagens especiais para datas comemorativas e celebrações.</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600"><RefreshCcw size={24} /> Como Participar e Potencializar Sua Mensagem</h3>
                                <p className="leading-relaxed text-gray-900">Para participar e maximizar o impacto, basta alinhar o conteúdo do seu áudio com o tema da temporada vigente. Embora não seja obrigatório, essa sintonia potencializa a ressonância da sua mensagem com o público.</p>
                            </div>
                        </div>
                    )}

                    {activePage === 'precos' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Invista em Emoção: Nossos Planos AELO! <DollarSign size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Na AELO - Sua Voz em Movimento, acreditamos que a publicidade de impacto e as mensagens que tocam o coração devem ser acessíveis. Nossos preços são pensados para oferecer o melhor custo-benefício e levar sua voz ainda mais longe.</p>
                            <div className="price-card border p-6 rounded-lg shadow-md mb-6 text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-2 text-blue-600"><Heart size={28} /> AELO+ Cliente: Sua Mensagem Pessoal</h3>
                                <p className="text-3xl font-bold mb-2 text-gray-900">R$ 6,00</p>
                                <p className="text-gray-600">por áudio (reproduzido o dia inteiro)</p>
                                <p className="mt-4 leading-relaxed text-gray-900">Sua mensagem pessoal e emocionante veiculada para aquela pessoa especial durante todo o dia, criando um momento inesquecível.</p>
                            </div>
                            <div className="price-card border p-6 rounded-lg shadow-md mb-6 text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-2 text-blue-600"><Briefcase size={28} /> AELO Negócio: Publicidade com Alma</h3>
                                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mt-4">
                                    <div className="flex-1">
                                        <p className="text-2xl font-bold mb-1 text-gray-900">Em Fila</p>
                                        <p className="text-3xl font-bold mb-2 text-gray-900">R$ 29,90</p>
                                        <p className="text-gray-600">o dia todo</p>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-900">Seu áudio será reproduzido na fila de propagandas do dia, uma após a outra, garantindo visibilidade contínua.</p>
                                    </div>
                                    <div className="flex-1 border-t md:border-t-0 md:border-l border-blue-300 pt-4 md:pt-0 md:pl-6">
                                        <p className="text-2xl font-bold mb-1 text-gray-900">Particular</p>
                                        <p className="text-3xl font-bold mb-2 text-gray-900">R$ 69,90</p>
                                        <p className="text-gray-600">o dia todo</p>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-900">Apenas o áudio da sua empresa será reproduzido durante todo o dia, proporcionando exclusividade e máximo impacto.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="price-card border p-6 rounded-lg shadow-md text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-2 text-blue-600"><Info size={28} /> AELO Informações Públicas: Voz para o Bem</h3>
                                <p className="text-3xl font-bold mb-2 text-gray-900">R$ 49,90</p>
                                <p className="text-gray-600">por áudio o dia todo</p>
                                <p className="mt-4 leading-relaxed text-gray-900">Amplifique causas sociais e avisos comunitários, com sua mensagem em destaque o dia inteiro, gerando impacto positivo na comunidade.</p>
                            </div>
                            <div className="p-6 rounded-lg shadow-md mt-8 text-center animate-fade-in-up delay-300 bg-white border border-green-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-2 text-green-600"><DollarSign size={28} /> Pagamento Simples via Pix</h3>
                                <p className="text-xl font-bold mb-2 text-gray-900">Chave Pix (CNPJ): <span className="font-semibold text-blue-600">60.676.425/0001-47</span></p>
                                <p className="text-lg mb-2 text-gray-900">Titular: A A S Fernandes</p>
                                <button onClick={copyPixKey} className="inline-flex items-center justify-center px-6 py-3 text-white font-bold rounded-full shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 gap-2 mt-4 bg-blue-600" aria-label="Copiar chave Pix"><Copy size={20} /> Copiar Chave Pix</button>
                                {pixCopiedMessage && (<p className="mt-2 text-sm font-semibold animate-fade-in-up text-green-500">{pixCopiedMessage}</p>)}
                                <p className="text-gray-600">Dica: Copie a chave Pix acima e realize o pagamento. Após a transação, envie o comprovante para nós via WhatsApp ou Instagram <span className="font-semibold text-blue-600">@Aelovoz</span> para agilizar a veiculação do seu áudio!</p>
                            </div>
                            <p className="text-lg text-center leading-relaxed mt-8 flex items-center justify-center gap-2 text-gray-900">Pronto para levar sua voz em movimento? Fale conosco agora mesmo para um orçamento personalizado! <MessageSquare size={20} /></p>
                        </div>
                    )}

                    {activePage === 'como-enviar' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Como Enviar Seus Áudios para a AELO: Simples e Rápido! <Send size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Levar sua mensagem para as ruas com a AELO é um processo descomplicado. Siga estes passos e veja sua voz ganhar vida:</p>
                            <div className="space-y-6 text-left">
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white">
                                    <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-lg font-bold bg-blue-600">1</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900"><Mic size={20} /> Grave Seu Áudio com Qualidade e Duração Ideal</h3>
                                        <p className="text-gray-600">Use seu celular, computador ou qualquer dispositivo para gravar a mensagem que deseja veicular. A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                                        <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
                                            <li><span className="font-semibold text-blue-700">AELO+ Cliente (Pessoais)</span>: 15 a 20 segundos.</li>
                                            <li><span className="font-semibold text-blue-700">AELO Negócio:</span> 30 segundos a 1 minuto.</li>
                                            <li><span className="font-semibold text-blue-700">AELO Informações Públicas:</span> 30 segundos a 1 minuto e 30 segundos.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white">
                                    <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-lg font-bold bg-blue-600">2</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900"><Upload size={20} /> Envie o Áudio para a AELO</h3>
                                        <p className="text-gray-600">Após a gravação, envie seu áudio diretamente para a nossa equipe. Você pode fazer isso de forma muito prática pelo nosso WhatsApp ou via Direct do Instagram <span className="font-semibold text-blue-600">@Aelovoz</span>. Escolha o canal que for mais conveniente para você!</p>
                                        <p className="mt-2 text-gray-600">Para uma experiência mais fluida, o envio do áudio pode ser feito diretamente pelo WhatsApp da AELO - Sua Voz em Movimento.</p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white">
                                    <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-lg font-bold bg-blue-600">3</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900"><ListTodo size={20} /> Forneça os Detalhes da Veiculação</h3>
                                        <p className="text-gray-600">Junto com o áudio, nos informe a categoria que melhor se encaixa (AELO+ Cliente, AELO Negócio, AELO Informações Públicas) e os detalhes essenciais da veiculação: data, horário preferencial, e o endereço aproximado se for para uma pessoa ou local específico.</p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 bg-white">
                                    <div className="flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center text-lg font-bold bg-blue-600">4</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-900"><CheckCircle size={20} /> Confirmação e Pagamento</h3>
                                        <p className="text-gray-600">Nossa equipe fará a moderação do áudio para garantir a melhor qualidade e confirmará todos os detalhes com você. Após sua aprovação e o pagamento (via Pix, por exemplo), seu áudio estará pronto para ir para as ruas e encantar a cidade!</p>
                                    </div>
                                </div>
                                {/* Player de Áudio de Exemplo na página "Como Enviar" */}
                                <div className="p-5 rounded-lg shadow-md text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-400 bg-white">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2 text-purple-600">
                                        <PlayCircle size={24} /> Exemplo de Qualidade de Áudio AELO
                                    </h3>
                                    <p className="text-gray-700">
                                        Exemplos de áudio não estão disponíveis no momento devido a atualizações na API.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'aelo-em-acao' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">
                                AELO em Ação: Histórias e Destaques <Sparkles size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center text-gray-900">
                                Veja como a AELO - Sua Voz em Movimento transforma mensagens em momentos inesquecíveis e resultados reais. Conheça algumas de nossas histórias de sucesso e o impacto que geramos!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {aeloInActionStories.map((story) => (
                                    <div key={story.id} className="p-5 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white">
                                        <div className="flex items-center gap-3 mb-3">
                                            {story.icon}
                                            <h3 className="text-xl font-semibold text-blue-600">{story.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{story.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'simular-assinatura' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">
                                Simulador de Assinatura AELO <Calculator size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center text-gray-900">
                                Planeje sua veiculação com a AELO e descubra as vantagens de assinar nossos planos! Calcule sua economia e o custo-benefício de cada opção.
                            </p>

                            <div className="space-y-6">
                                {/* Seleção de Plano */}
                                <div className="p-5 rounded-lg shadow-md bg-white">
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900">
                                        <Briefcase size={20} className="text-blue-600" /> 1. Escolha o Plano
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <label className="flex items-center cursor-pointer p-3 rounded-lg border hover:opacity-90 transition-colors flex-1 bg-white border-gray-300">
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="emFila"
                                                checked={selectedPlan === 'emFila'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2 font-medium text-gray-900">AELO Negócio - Em Fila (R$ 29,90/dia)</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer p-3 rounded-lg border hover:opacity-90 transition-colors flex-1 bg-white border-gray-300">
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="particular"
                                                checked={selectedPlan === 'particular'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="form-radio h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2 font-medium text-gray-900">AELO Negócio - Particular (R$ 69,90/dia)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Seleção de Duração */}
                                <div className="p-5 rounded-lg shadow-md bg-white">
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900">
                                        <CalendarDays size={20} className="text-blue-600" /> 2. Escolha a Duração da Assinatura
                                    </h3>
                                    <select
                                        value={selectedDuration}
                                        onChange={(e) => setSelectedDuration(e.target.value)}
                                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 bg-white border-gray-200 text-gray-900 outline-blue-600"
                                    >
                                        <option value="">Selecione a Duração</option>
                                        <option value="7d">1 Semana (7 dias)</option>
                                        <option value="30d">1 Mês (30 dias)</option>
                                        <option value="90d">3 Meses (90 dias)</option>
                                        <option value="180d">6 Meses (180 dias)</option>
                                        <option value="365d">1 Ano (365 dias)</option>
                                    </select>
                                </div>

                                {/* Resultados da Simulação */}
                                {selectedPlan && selectedDuration && (
                                    <div className="p-5 rounded-lg shadow-md border-l-4 bg-white border-green-600">
                                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900">
                                            <CheckCircle size={20} className="text-green-600" /> Resultados da Simulação
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                                            <p className="text-gray-900"><strong>Custo Diário Normal:</strong> <span className="font-bold text-blue-600">{formatCurrency(dailyCost)}</span></p>
                                            <p className="text-gray-900"><strong>Duração Total:</strong> <span className="font-bold text-blue-600">{totalDays} dias</span></p>
                                            <p className="text-gray-900"><strong>Custo Base (sem desconto):</strong> <span className="font-bold line-through text-amber-600">{formatCurrency(baseCost)}</span></p>
                                            <p className="text-gray-900"><strong>Desconto Aplicado:</strong> <span className="font-bold text-green-600">{formatPercentage(discountPercentage)}</span></p>
                                            <p className="col-span-full text-2xl font-bold text-gray-900">
                                                Custo Total da Assinatura: <span className="text-blue-700">{formatCurrency(finalCost)}</span>
                                            </p>
                                            <p className="col-span-full text-xl font-bold text-gray-900">
                                                Economia Total: <span className="text-green-700">{formatCurrency(savings)}</span>
                                            </p>
                                            <p className="col-span-full text-xl font-bold text-gray-900">
                                                Custo Diário Efetivo: <span className="text-blue-700">{formatCurrency(effectiveDailyCost)}</span>
                                            </p>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-700">
                                            *Os valores apresentados são uma simulação e podem sofrer pequenas variações. Para um orçamento exato, entre em contato com nossa equipe.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {activePage === 'blog' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">
                                Blog AELO: Fique por Dentro das Novidades! <Rss size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center text-gray-900">
                                Explore nossos artigos, dicas e notícias sobre publicidade, sustentabilidade e o impacto da AELO na comunidade.
                            </p>

                            {selectedBlogPost ? (
                                <div className="p-6 rounded-lg shadow-md bg-white">
                                    <button
                                        onClick={() => setSelectedBlogPost(null)}
                                        className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-white rounded-full hover:opacity-90 transition-colors bg-blue-600"
                                    >
                                        <ChevronLeft size={20} /> Voltar para o Blog
                                    </button>
                                    <h3 className="text-3xl font-bold mb-3 text-blue-600">{selectedBlogPost.title}</h3>
                                    <p className="text-sm mb-4 text-gray-500">
                                        Por {selectedBlogPost.author} em {selectedBlogPost.date}
                                    </p>
                                    <div className="prose max-w-none text-gray-900" dangerouslySetInnerHTML={{ __html: selectedBlogPost.content }} />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {blogPosts.map((post) => (
                                        <div key={post.id} className="p-5 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 bg-white">
                                            <h3 className="text-xl font-semibold mb-2 text-blue-600">{post.title}</h3>
                                            <p className="text-sm mb-3 text-gray-500">
                                                Por {post.author} em {post.date}
                                            </p>
                                            <p className="mb-4 text-gray-600">{post.snippet}</p>
                                            <button
                                                onClick={() => setSelectedBlogPost(post)}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-gray-900 rounded-full hover:opacity-90 transition-colors bg-yellow-500"
                                            >
                                                Leia Mais <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {activePage === 'trabalhe-conosco' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-blue-600 animate-pulse">
                                Trabalhe com a AELO: Sua Oportunidade de Crescer! <BriefcaseBusiness size={32} />
                            </h2>
                            <p className="text-lg mb-6 leading-relaxed text-center text-gray-900">
                                Quer fazer parte de uma equipe inovadora, contribuir para a comunicação da sua cidade e ainda ter a chance de ganhar acima de R$ 10.000 por mês veiculando áudios? A AELO - Sua Voz em Movimento está buscando talentos!
                            </p>

                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600">
                                    <DollarSign size={24} /> Potencial de Ganhos Elevado
                                </h3>
                                <p className="leading-relaxed text-gray-900">
                                    Na AELO, valorizamos o seu esforço e dedicação. Com um bom desempenho na veiculação de áudios, você tem a oportunidade de alcançar rendimentos superiores a R$ 10.000 por mês! Quanto mais você pedala e mais mensagens veicula, maiores são seus ganhos.
                                </p>
                                <p className="mt-4 text-sm text-gray-700">
                                    *Os ganhos são baseados na produtividade e na quantidade de áudios veiculados. Detalhes sobre o modelo de remuneração serão apresentados na entrevista.
                                </p>
                            </div>

                            <div className="p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-blue-600">
                                    <CheckCircle size={24} /> O Que Você Precisa Ter
                                </h3>
                                <p className="leading-relaxed text-gray-900">Para fazer parte da nossa equipe de ciclistas, os seguintes itens são essenciais:</p>
                                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-900">
                                    <li><Bike size={20} className="text-blue-500 inline-block mr-2" /> Bicicleta: Em boas condições, para garantir a mobilidade e segurança.</li>
                                    <li><Volume2 size={20} className="text-blue-500 inline-block mr-2" /> Caixa de Som Portátil: Um equipamento de qualidade para veiculação clara dos áudios.</li>
                                    <li><Users size={20} className="text-blue-500 inline-block mr-2" /> EPIs (Equipamentos de Proteção Individual): Capacete, joelheiras, cotoveleiras e colete refletivo para sua segurança no trânsito.</li>
                                    <li><FileText size={20} className="text-blue-500 inline-block mr-2" /> Relatório Médico Positivo: Um atestado de saúde que comprove sua aptidão para a atividade física.</li>
                                    <li><BriefcaseBusiness size={20} className="text-blue-500 inline-block mr-2" /> CNPJ Ativo: Para formalizar sua parceria e garantir todos os benefícios.</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-lg shadow-md text-center animate-fade-in-up delay-200 bg-white border border-blue-600">
                                <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center gap-2 text-blue-600">
                                    <MessageSquare size={24} /> Interessado? Fale Conosco!
                                </h3>
                                <p className="leading-relaxed mb-4 text-gray-900">
                                    Se você se encaixa no perfil e está pronto para pedalar rumo ao sucesso, entre em contato!
                                </p>
                                <button
                                    onClick={() => {
                                        const whatsappLink = `https://wa.me/5514981150675?text=${encodeURIComponent('Olá, AELO! Tenho interesse em ser um ciclista PJ da AELO.')}`;
                                        window.open(whatsappLink, '_blank');
                                    }}
                                    className="inline-flex items-center justify-center px-6 py-3 text-white font-bold rounded-full shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300 gap-2 bg-blue-600"
                                >
                                    <Mail size={20} /> Enviar Mensagem via WhatsApp
                                </button>
                            </div>
                        </div>
                    )}

                    {activePage === 'compromisso-sustentavel' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">
                                Nosso Compromisso Sustentável: AELO e o Futuro Verde <Leaf size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center text-gray-900">
                                Na AELO - Sua Voz em Movimento, a sustentabilidade não é apenas uma palavra, é a essência do nosso negócio. Acreditamos em um futuro onde a comunicação e o respeito ao meio ambiente caminham juntos.
                            </p>

                            <div className="space-y-6">
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up bg-white">
                                    <Bike size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">Mobilidade Urbana Consciente</h3>
                                        <p className="text-gray-600">
                                            Nossa escolha pela bicicleta como principal meio de veiculação é um pilar do nosso compromisso. Reduzimos a emissão de carbono, diminuímos o trânsito e promovemos um estilo de vida mais saudável para nossos ciclistas e para a cidade.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 bg-white">
                                    <Globe size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">Impacto Ambiental Positivo</h3>
                                        <p className="text-gray-600">
                                            Ao optar pela AELO, você contribui diretamente para uma cidade mais limpa e com menos poluição sonora e atmosférica. É uma publicidade que faz bem para o seu negócio e para o planeta.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 bg-white">
                                    <Handshake size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">Parceria com a Comunidade</h3>
                                        <p className="text-gray-600">
                                            Além do impacto ambiental, nossa operação fortalece a economia local e incentiva a prática de atividades físicas. Somos parte ativa na construção de uma comunidade mais engajada e consciente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'faq' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Perguntas Frequentes <Info size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-center text-gray-900">Encontre aqui as respostas para as dúvidas mais comuns sobre os nossos serviços e dinâmicas.</p>
                            <div className="space-y-4">
                                {faqData.map((item, index) => (
                                    <div key={index} className="rounded-lg overflow-hidden shadow-md transition-all duration-300 bg-white">
                                        <button
                                            className="w-full text-left p-4 font-semibold text-xl flex justify-between items-center transition-colors duration-200 hover:opacity-90 bg-white text-gray-900"
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        >
                                            {item.question}
                                            <ChevronDown size={24} className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`} />
                                        </button>
                                        <div
                                            className={`p-4 transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0'}`}
                                        >
                                            <p className="text-gray-700">{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'termos-condicoes' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-gray-900">Termos e Condições de Uso da AELO <FileText size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Ao utilizar os serviços da AELO - Sua Voz em Movimento, você concorda com os seguintes termos e condições, que visam garantir a qualidade, a segurança e a integridade de todas as mensagens veiculadas.</p>
                            <div className="space-y-6 text-left">
                                <div className="p-5 rounded-lg shadow-md animate-fade-in-up bg-white">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-blue-600"><CheckCircle size={20} /> Moderação de Conteúdo</h3>
                                    <p className="leading-relaxed text-gray-900">Todos os áudios enviados para veiculação na AELO - Sua Voz em Movimento são submetidos a um rigoroso processo de moderação. Nosso objetivo é assegurar que o conteúdo seja claro, objetivo e, acima de tudo, respeitoso e adequado para o público geral.</p>
                                    <p className="mt-2 leading-relaxed text-gray-900"><span className="font-semibold text-red-600">Conteúdos Estritamente Proibidos:</span> Não serão veiculados áudios que contenham:</p>
                                    <ul className="list-disc list-inside space-y-1 mt-2 text-gray-600">
                                        <li>Mensagens de má-fé, difamação ou calúnia.</li>
                                        <li>Qualquer forma de discriminação (racial, de gênero, religiosa, sexual).</li>
                                        <li>Discurso de ódio ou incitação à violência.</li>
                                        <li>Conteúdo sexualmente explícito ou obsceno.</li>
                                        <li>Informações falsas ou enganosas.</li>
                                        <li>Conteúdo que viole direitos autorais ou de propriedade intelectual.</li>
                                        <li>Qualquer conteúdo que seja ilegal ou promova atividades ilícitas.</li>
                                    </ul>
                                    <p className="mt-4 leading-relaxed text-gray-900">A AELO - Sua Voz em Movimento se reserva o direito de recusar a veiculação de qualquer áudio que, a seu critério exclusivo, não esteja em conformidade com estas diretrizes, sem a necessidade de justificativa detalhada.</p>
                                </div>
                                <div className="p-5 rounded-lg shadow-md animate-fade-in-up delay-100 bg-white">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-blue-600"><DollarSign size={20} /> Política de Reembolso</h3>
                                    <p className="leading-relaxed text-gray-900">Entendemos que imprevistos podem acontecer. No entanto, é importante que você esteja ciente da nossa política de reembolso:</p>
                                    <p className="mt-2 leading-relaxed text-gray-900">Após o envio do áudio e a confirmação do pagamento, não haverá reembolso caso você desista da veiculação após 30 (trinta) minutos. Esta política se aplica mesmo que o áudio não esteja infringindo nenhuma das regras de conteúdo da empresa.</p>
                                </div>
                                <div className="p-5 rounded-lg shadow-md animate-fade-in-up delay-200 bg-white">
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-blue-600"><Info size={20} /> Responsabilidade do Usuário</h3>
                                    <p className="leading-relaxed text-gray-900">O usuário é o único responsável pelo conteúdo do áudio enviado, garantindo que ele não viole quaisquer leis, regulamentos ou direitos de terceiros. A AELO - Sua Voz em Movimento não se responsabiliza por quaisquer danos ou prejuízos decorrentes da veiculação de conteúdo inadequado ou ilícito enviado pelo usuário.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'contato' && (
                        <div className="p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in bg-blue-50">
                            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-900">Fale Conosco: Sua Voz é Importante! <MessageSquare size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-gray-900">Tem alguma dúvida, sugestão ou quer saber mais sobre como a AELO - Sua Voz em Movimento pode amplificar sua mensagem? Preencha o formulário abaixo ou use nossos canais de contato direto.</p>
                            
                            {/* Formulário de Contato */}
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-1 text-gray-900">Seu Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 bg-white border-gray-200 text-gray-900 outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-1 text-gray-900">Seu E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 bg-white border-gray-200 text-gray-900 outline-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold mb-1 text-gray-900">Sua Mensagem</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        value={formMessage}
                                        onChange={(e) => setFormMessage(e.target.value)}
                                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 bg-white border-gray-200 text-gray-900 outline-blue-500"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                                {formStatus && (
                                    <p className={`text-center font-semibold mt-4 ${formStatus.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{formStatus}</p>
                                )}
                            </form>

                            <hr className="my-8 border-gray-300" />
                            
                            <div className="space-y-6 text-left">
                                <h3 className="text-2xl font-bold mb-4 text-gray-900">Ou Fale Diretamente Conosco:</h3>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up bg-white">
                                    <Mail size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">E-mail</h3>
                                        <p className="text-gray-600">Envie suas perguntas e sugestões para: <a href="mailto:Aelobrasil@gmail.com" className="hover:underline text-blue-600">Aelobrasil@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up delay-100 bg-white">
                                    <Phone size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">WhatsApp</h3>
                                        <p className="text-gray-600">Para um atendimento rápido e direto, fale conosco pelo WhatsApp: <a href="https://wa.me/5514981150675" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">(14) 98115-0675</a></p>
                                    </div>
                                </div>
                                <div className="p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up delay-200 bg-white">
                                    <Info size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 text-gray-900">Redes Sociais</h3>
                                        <p className="text-gray-600">Siga-nos no Instagram para ficar por dentro das novidades, dinâmicas e temporadas: <a href="https://www.instagram.com/aelovoz" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">@Aelovoz</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Rodapé aprimorado */}
            <footer className="text-white text-center p-4 mt-auto rounded-t-xl shadow-inner bg-gradient-to-r from-black to-blue-700">
                <div className="container mx-auto flex flex-col items-center justify-center">
                    <p className="text-lg font-bold mb-1">AELO - Sua Voz em Movimento</p>
                    <p className="text-sm">Bauru, SP</p>
                    <p className="text-xs mt-2">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
                    <Bike size={20} className="text-yellow-300 transform transition-transform duration-300 hover:rotate-[360deg] mt-2" />
                </div>
            </footer>
        </div>
    );
};

export default App;
