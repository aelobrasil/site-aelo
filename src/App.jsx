import React, { useState, useEffect, useRef } from 'react';

// Importa ícones do Lucide React
import { Home, Mic, Briefcase, Users, Lightbulb, Trophy, DollarSign, Bike, MessageSquare, CheckCircle, Heart, Leaf, Star, Info, MapPin, Award, RefreshCcw, CalendarDays, Volume2, Search, Gift, Send, Copy, FileText, Mail, Phone, Menu, X, Quote, ChevronLeft, ChevronRight, Scale, Upload, BriefcaseBusiness, Calculator, Rss, ListTodo, Sparkles, TrendingUp, Handshake, Globe, PlayCircle, Instagram, Gamepad2, Cloud, Wind } from 'lucide-react';

// Modal para o fluxo de envio de áudio
const SendAudioModal = ({ onClose, navigateTo }) => {
    // Cores fixas para o modal
    const modalBg = 'bg-white';
    const modalText = 'text-gray-900';
    const buttonBg = 'bg-[#1282A2]'; // Azul vibrante
    const buttonText = 'text-white';
    const primaryColor = 'text-[#034078]'; // Azul médio
    const successBg = 'bg-green-600'; // Verde para sucesso
    const successText = 'text-green-700';
    const warningBg = 'bg-[#1282A2]'; // Azul vibrante para anexar comprovante
    const errorText = 'text-red-500';
    const inputBg = 'bg-[#F0F4F8]'; // Azul claro acinzentado
    const inputBorder = 'border-[#A8DADC]'; // Azul claro
    const inputOutline = 'focus:ring-[#034078]'; // Azul médio para outline

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
            <div className={`p-6 rounded-xl shadow-2xl w-11/12 max-w-md max-h-[90vh] overflow-y-auto relative ${modalBg} ${modalText} border border-[#A8DADC]`}>
                <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-full bg-[#A8DADC] text-[#0A1128] hover:bg-[#D0D9E5] transition-colors`}>
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-[#034078]">Envie seu Áudio para a AELO!</h2>

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
                                className={`form-radio h-4 w-4 text-[#034078] focus:ring-[#1282A2]`}
                            />
                            <span className="ml-2">{category}</span>
                        </label>
                    ))}
                </div>

                {selectedCategory && (
                    <>
                        <div className={`mb-4 p-3 rounded-lg bg-[#E0E7F0]`}>
                            <p className="font-semibold">Tempo de Áudio Recomendado para "{selectedCategory}":</p>
                            <p className={`text-lg font-bold text-[#034078]`}>{audioDurations[selectedCategory]}</p>
                            <p className="font-semibold mt-2">Preço:</p>
                            <p className={`text-lg font-bold text-green-600`}>{prices[selectedCategory]}</p>
                        </div>

                        <div className={`mb-4 p-3 rounded-lg text-center bg-[#E0E7F0] border border-[#034078]`}>
                            <p className="font-semibold mt-4 mb-2">3. Realize o Pagamento via Pix:</p>
                            <p className={`text-lg font-bold text-green-600`}>Titular: {pixHolder}</p>
                            <button onClick={() => {
                                const tempInput = document.createElement('input');
                                tempInput.value = pixKey;
                                document.body.appendChild(tempInput);
                                tempInput.select();
                                document.execCommand('copy');
                                document.body.removeChild(tempInput);
                                console.log('Chave Pix copiada!');
                            }} className={`mt-2 px-4 py-2 bg-[#034078] text-white rounded-full hover:bg-[#1282A2] transition-colors flex items-center justify-center gap-1 mx-auto`}>
                                <Copy size={16} /> Copiar Chave Pix (CNPJ)
                            </button>
                            <p className={`mt-2 text-sm text-gray-700`}>Use a chave Pix copiada para realizar o pagamento em seu aplicativo bancário.</p>

                            <p className="font-semibold mt-6 mb-2">4. Escaneie o QR Code para Enviar Comprovante e Áudio via WhatsApp:</p>
                            <p className={`text-sm text-gray-700`}>Escaneie o QR Code abaixo para nos enviar o comprovante de pagamento e o seu áudio via WhatsApp.</p>
                            <img src={qrCodeUrl} alt="QR Code WhatsApp" className="mx-auto my-4 rounded-lg shadow-md" />
                            
                            <div className="mt-4 flex flex-col items-center">
                                <label htmlFor="paymentProof" className={`px-4 py-2 bg-[#1282A2] text-white rounded-lg hover:bg-[#034078] transition-colors cursor-pointer flex items-center gap-1`}>
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
                                    <p className={`text-sm mt-2 text-red-500`}>O comprovante de pagamento é obrigatório para prosseguir.</p>
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
                    <p className={`mt-2 font-semibold text-red-500`}>Atenção: A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                </div>

                {/* Campos para Nome e Sobrenome */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-semibold mb-1">Seu Nome (Obrigatório)</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full p-3 rounded-lg border border-[#A8DADC] bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-[#034078] text-[#0A1128]`}
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
                        className={`w-full p-3 rounded-lg border border-[#A8DADC] bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-[#034078] text-[#0A1128]`}
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
                        className={`w-full p-3 rounded-lg border border-[#A8DADC] bg-[#F0F4F8] focus:outline-none focus:ring-2 focus:ring-[#034078] text-[#0A1128]`}
                        placeholder="Ex: Instagram, Amigo, Pesquisa no Google"
                    />
                </div>

                <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className={`form-checkbox h-4 w-4 text-[#034078] focus:ring-[#1282A2]`}
                        />
                        <span className={`ml-2 text-[#0A1128]`}>Aceito os <a href="#" onClick={handleTermsClick} className={`text-[#034078] hover:underline`}>termos e condições</a> da AELO - Sua Voz em Movimento.</span>
                    </label>
                </div>

                <button
                    onClick={handleWhatsAppClick}
                    disabled={!selectedCategory || !agreedToTerms || !paymentProofFile || !firstName || !lastName}
                    className={`w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
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

    // Função para adicionar a fonte Poppins ao documento
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

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
            icon: <Sparkles size={28} className="text-[#1282A2]" />,
            description: "Em um dia comum em Bauru, João estava se sentindo desanimado com os desafios da vida. De repente, um ciclista da AELO passou, veiculando um áudio motivacional. A mensagem, em movimento, alcançou João no momento certo, e ele sentiu uma onda de esperança, percebendo que sua jornada continuava. A voz da AELO, pedalando pela cidade, transformou seu dia!"
        },
        {
            id: 2,
            title: "O Bom Dia Sonoro que Alegrou a Cidade",
            icon: <TrendingUp size={28} className="text-[#034078]" />,
            description: "Maria, uma cliente da AELO, teve a ideia de enviar um 'Super Bom Dia!' para toda a cidade de Bauru. Ela gravou sua mensagem cheia de energia, e a AELO a veiculou por diferentes bairros. O feedback foi incrível! Pessoas nas ruas sorriam e acenavam, e Maria se sentiu realizada por ter espalhado tanta positividade em movimento. Sua voz, em cada pedalada, fez a diferença."
        },
        {
            id: 3,
            title: "A Promoção que Lotou a Pizzaria Saborosa",
            icon: <Star size={28} className="text-[#1282A2]" />,
            description: "A Pizzaria Saborosa lançou uma nova promoção e precisava de um empurrão. A AELO veiculou o anúncio nas ruas próximas, e o resultado foi imediato: a pizzaria registrou um aumento de 30% nas vendas no primeiro fim de semana da campanha. O som atraiu os clientes diretamente para o sabor!"
        },
        {
            id: 4,
            title: "Achou o Áudio e Ganhou um Presente!",
            icon: <Award size={28} className="text-[#034078]" />,
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
            icon: <Heart size={24} className="text-pink-600" />
        },
        {
            quote: "A inauguração da nossa cafeteria foi um sucesso! A propaganda na AELO atraiu muita gente do bairro. O retorno foi imediato e superou as expectativas.",
            name: "Juliana P.",
            service: "AELO Negócio",
            icon: <Briefcase size={24} className="text-[#034078]" />
        },
        {
            quote: "Conseguimos muitos voluntários para nossa campanha de doação de agasalhos. AELO foi fundamental para espalhar a mensagem pela comunidade.",
            name: "ONG Mãos que Ajudam",
            service: "AELO Informações Públicas",
            icon: <Info size={24} className="text-[#1282A2]" />
        },
        {
            quote: "Ouvir a voz dos meus filhos me parabenizando pelo meu aniversário enquanto eu caminhava na rua... me emocionei demais! Uma surpresa maravilhosa.",
            name: "Silvia R.",
            service: "AELO+ Cliente",
            icon: <Gift size={24} className="text-yellow-600" />
        },
        {
            quote: "A veiculação da AELO divulgou nosso bazar de roupas usadas e superou as expectativas de público. Foi uma solução de baixo custo com um resultado incrível!",
            name: "Bazar da Ana",
            service: "AELO Negócio",
            icon: <DollarSign size={24} className="text-green-600" />
        },
        {
            quote: "Usamos a AELO para divulgar um evento de adoção de animais. O áudio com os latidos e miados chamou muita atenção e a maioria dos bichinhos encontrou um lar!",
            name: "Abrigo Patas Felizes",
            service: "AELO Informações Públicas",
            icon: <Heart size={24} className="text-red-600" />
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
        <div className="min-h-screen font-poppins antialiased flex flex-col bg-[#F0F4F8] text-[#0A1128]">
            {/* Header aprimorado */}
            <header className="p-6 md:p-8 shadow-lg rounded-b-3xl relative text-center bg-gradient-to-r from-[#034078] to-[#0A1128] text-white border-b border-[#A8DADC]">
                <div className="container mx-auto flex justify-between items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-full bg-[#1282A2] text-white z-50 hover:bg-[#034078] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A8DADC]"
                        aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <div className="flex-grow text-center">
                        <div className="flex items-center justify-center mb-1 animate-fade-in-down drop-shadow-lg">
                            {/* Novo Logotipo AELO: Nuvem com Vento */}
                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1282A2] text-white shadow-lg mr-3 relative">
                                <Cloud size={32} strokeWidth={2.5} className="absolute" />
                                <Wind size={20} strokeWidth={2.5} className="absolute right-2 bottom-2 transform rotate-45" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                                AELO
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2 animate-fade-in-down delay-200 text-shadow-sm text-[#A8DADC]">
                            Sua Voz em Movimento
                            <Bike size={24} className="text-[#A8DADC] transform transition-transform duration-300 hover:rotate-[360deg]" />
                        </p>
                    </div>
                    {/* Placeholder para alinhar o título ao centro se o botão estiver à esquerda */}
                    <div className="w-12"></div> 
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
            <nav className={`fixed inset-y-0 left-0 p-6 shadow-xl z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-[#A8DADC]`}>
                <div className="flex justify-end items-center mb-6">
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-full bg-[#A8DADC] text-[#0A1128] hover:bg-[#D0D9E5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#034078]"
                        aria-label="Fechar menu de navegação"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={() => navigateTo('home')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'home' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Home size={20} /> Início</button>
                    <button onClick={() => navigateTo('categorias')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'categorias' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Briefcase size={20} /> Categorias</button>
                    <button onClick={() => navigateTo('porque-aelo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'porque-aelo' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Lightbulb size={20} /> Por Que AELO?</button>
                    <button onClick={() => navigateTo('comparativo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'comparativo' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Scale size={20} /> AELO vs. Tradicionais</button>
                    <button onClick={() => navigateTo('depoimentos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'depoimentos' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Quote size={20} /> Depoimentos</button>
                    <button onClick={() => navigateTo('dinamicas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'dinamicas' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Trophy size={20} /> Dinâmicas</button>
                    <button onClick={() => navigateTo('temporadas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'temporadas' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><CalendarDays size={20} /> Temporadas</button>
                    <button onClick={() => navigateTo('precos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'precos' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><DollarSign size={20} /> Preços</button>
                    <button onClick={() => navigateTo('como-enviar')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'como-enviar' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Send size={20} /> Como Enviar Áudios</button>
                    <button onClick={() => navigateTo('aelo-em-acao')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'aelo-em-acao' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Sparkles size={20} /> AELO em Ação</button>
                    <button onClick={() => navigateTo('simular-assinatura')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'simular-assinatura' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Calculator size={20} /> Simulador de Assinatura</button>
                    <button onClick={() => navigateTo('blog')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'blog' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Rss size={20} /> Blog/Notícias</button>
                    <button onClick={() => navigateTo('trabalhe-conosco')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'trabalhe-conosco' ? 'bg-[#034078] text-white shadow-md animate-pulse' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><BriefcaseBusiness size={20} /> Trabalhe Conosco</button>
                    <button onClick={() => navigateTo('compromisso-sustentavel')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'compromisso-sustentavel' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Leaf size={20} /> Compromisso Sustentável</button>
                    <button onClick={() => navigateTo('faq')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'faq' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><Info size={20} /> FAQ</button>
                    <button onClick={() => navigateTo('termos-condicoes')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'termos-condicoes' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><FileText size={20} /> Termos</button>
                    <button onClick={() => navigateTo('contato')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'contato' ? 'bg-[#034078] text-white shadow-md' : 'bg-[#E0E7F0] text-[#0A1128] hover:bg-[#D0D9E5]'}`}><MessageSquare size={20} /> Contato</button>
                </div>
            </nav>
            
            {/* Botões Flutuantes Enfileirados e Condicionais */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 transition-all duration-300" style={{ transform: activePage !== 'home' ? 'scale(0.9) opacity(0.8)' : 'scale(1) opacity(1)' }}>
                {/* Floating Instagram Button */}
                <a
                    href="https://www.instagram.com/aelovoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center bg-pink-600 text-white"
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
                    className="p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center bg-green-600 text-white"
                    aria-label="Fale Conosco no WhatsApp"
                    title="Fale Conosco no WhatsApp"
                >
                    <MessageSquare size={20} />
                </a>

                {/* Fixed "Envie seu Áudio" Button */}
                <button
                    onClick={() => setShowSendAudioModal(true)}
                    className="px-5 py-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center font-bold text-sm bg-[#1282A2] text-white"
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
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 text-center animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0A1128] leading-tight">
                                Sua Voz em Movimento: A Publicidade que Transforma
                            </h2>
                            <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-700">
                                Na AELO, levamos sua mensagem para as ruas de Bauru e região de forma inovadora, sustentável e memorável. Conecte-se com seu público de um jeito único!
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                <button onClick={() => navigateTo('como-enviar')} className="px-8 py-4 bg-[#034078] text-white font-bold rounded-full shadow-lg hover:bg-[#1282A2] transition-colors transform hover:scale-105 flex items-center gap-2">
                                    <Send size={20} /> Envie Seu Áudio Agora!
                                </button>
                                <button onClick={() => navigateTo('precos')} className="px-8 py-4 bg-[#1282A2] text-white font-bold rounded-full shadow-lg hover:bg-[#034078] transition-colors transform hover:scale-105 flex items-center gap-2">
                                    <DollarSign size={20} /> Veja Nossos Preços
                                </button>
                            </div>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                                <div className="p-6 rounded-lg shadow-md bg-[#E0E7F0] border border-[#A8DADC] animate-fade-in-up">
                                    <Users size={32} className="text-[#034078] mb-3" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Conexão Humana</h3>
                                    <p className="text-gray-700">Mensagens que tocam o coração e criam laços reais com a comunidade.</p>
                                </div>
                                <div className="p-6 rounded-lg shadow-md bg-[#E0E7F0] border border-[#A8DADC] animate-fade-in-up delay-100">
                                    <Leaf size={32} className="text-green-600 mb-3" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Sustentabilidade</h3>
                                    <p className="text-gray-700">Publicidade "verde" com bicicletas, reduzindo o impacto ambiental.</p>
                                </div>
                                <div className="p-6 rounded-lg shadow-md bg-[#E0E7F0] border border-[#A8DADC] animate-fade-in-up delay-200">
                                    <Trophy size={32} className="text-yellow-600 mb-3" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Engajamento</h3>
                                    <p className="text-gray-700">Dinâmicas e surpresas que transformam a cidade em um palco interativo.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'categorias' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Nossas Categorias de Serviço: Sua Mensagem, Seu Impacto
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                A AELO oferece soluções personalizadas para cada necessidade. Escolha a categoria que melhor se alinha à sua voz e ao seu objetivo:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="category-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Heart size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">AELO+ Cliente</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Mensagens pessoais e emocionantes para celebrar momentos únicos: aniversários, pedidos de casamento, declarações de amor e apoio.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 mt-4 space-y-1">
                                        <li>Declarações de Amor</li>
                                        <li>Feliz Aniversário Inesquecível</li>
                                        <li>Palavras de Apoio</li>
                                    </ul>
                                </div>

                                <div className="category-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Briefcase size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">AELO Negócio</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Publicidade dinâmica para o seu empreendimento: promoções, inaugurações e eventos que precisam de destaque na cidade.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 mt-4 space-y-1">
                                        <li>Anúncios de Promoções</li>
                                        <li>Inaugurações e Lançamentos</li>
                                        <li>Divulgação de Eventos</li>
                                    </ul>
                                </div>

                                <div className="category-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-200">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Info size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">AELO Informações Públicas</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Amplifique causas sociais e avisos comunitários importantes, promovendo o bem-estar e a conscientização na cidade.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 mt-4 space-y-1">
                                        <li>Campanhas de Conscientização</li>
                                        <li>Eventos Beneficentes</li>
                                        <li>Avisos Comunitários</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'porque-aelo' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Por Que AELO? A Diferença que Você Sente e Ouve
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Escolher a AELO é optar por uma comunicação que vai além do convencional. Descubra os pilares que nos tornam únicos:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <CheckCircle size={40} className="text-[#034078] mb-4" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Alcance Dinâmico e Preciso</h3>
                                    <p className="text-gray-700">Sua mensagem em movimento, atingindo o público certo, no lugar certo, com agilidade e impacto.</p>
                                </div>
                                <div className="feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <Lightbulb size={40} className="text-yellow-600 mb-4" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Engajamento Inovador</h3>
                                    <p className="text-gray-700">Cative a atenção com a originalidade da publicidade sonora em bicicleta, gerando curiosidade e memorização.</p>
                                </div>
                                <div className="feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-200">
                                    <Volume2 size={40} className="text-[#1282A2] mb-4" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Qualidade Sonora Impecável</h3>
                                    <p className="text-gray-700">Áudios moderados e veiculados com a mais alta qualidade, garantindo que sua mensagem seja clara e profissional.</p>
                                </div>
                                <div className="feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-300">
                                    <Leaf size={40} className="text-green-600 mb-4" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Compromisso Sustentável</h3>
                                    <p className="text-gray-700">Escolha uma publicidade que contribui para um meio ambiente mais limpo e uma cidade mais saudável.</p>
                                </div>
                                <div className="feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-400">
                                    <Handshake size={40} className="text-orange-600 mb-4" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Conexão Humana Autêntica</h3>
                                    <p className="text-gray-700">Nossos ciclistas criam uma interação genuína, tornando sua mensagem mais próxima e memorável.</p>
                                </div>
                                <div className="feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-500">
                                    <Award size={40} className="text-red-600 mb-4" />
                                    <h3 className="text-xl font-semibold text-[#0A1128] mb-2">Resultados Comprovados</h3>
                                    <p className="text-gray-700">Clientes satisfeitos e campanhas de sucesso que demonstram o poder da AELO.</p>
                                </div>
                            </div>
                        </section>
                    )}
                    
                    {/* Página de Comparativo */}
                    {activePage === 'comparativo' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                AELO vs. O Tradicional: A Evolução da Sua Publicidade
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Compare a inovação da AELO com os métodos tradicionais de veiculação e descubra a escolha inteligente para sua mensagem.
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Coluna AELO */}
                                <div className="p-8 rounded-xl shadow-lg bg-[#E0E7F0] border-2 border-[#034078] transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#0A1128]">
                                        <Bike size={36} className="text-[#034078]" /> AELO: A Voz do Futuro
                                    </h3>
                                    <ul className="space-y-5 text-gray-700">
                                        <li>
                                            <strong className="text-[#0A1128]">Facilidade e Agilidade:</strong> Grave seu áudio com o celular e envie. Processo descomplicado e rápido.
                                        </li>
                                        <li>
                                            <strong className="text-[#0A1128]">Custo-Benefício Imbatível:</strong> Preços a partir de R$ 6,00 por áudio, com veiculação o dia inteiro. Mais impacto por menos investimento.
                                        </li>
                                        <li>
                                            <strong className="text-[#0A1128]">Engajamento Autêntico:</strong> A presença humana do ciclista cria uma conexão genuína, capturando a atenção de forma orgânica.
                                        </li>
                                        <li>
                                            <strong className="text-[#0A1128]">Sustentabilidade:</strong> Publicidade ecológica que promove a mobilidade urbana e a consciência ambiental.
                                        </li>
                                        <li>
                                            <strong className="text-[#0A1128]">Alcance Segmentado:</strong> Leve sua mensagem para bairros e pontos específicos com flexibilidade e dinamismo.
                                        </li>
                                    </ul>
                                </div>

                                {/* Coluna Veiculadores Tradicionais */}
                                <div className="p-8 rounded-xl shadow-lg bg-[#E0E7F0] border-2 border-[#A8DADC] transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-700">
                                        <Volume2 size={36} className="text-gray-600" /> Carros de Som: O Passado
                                    </h3>
                                    <ul className="space-y-5 text-gray-700">
                                        <li>
                                            <strong className="text-gray-800">Processo Burocrático:</strong> Geralmente exige mais etapas e tempo para veiculação.
                                        </li>
                                        <li>
                                            <strong className="text-gray-800">Custo Elevado:</strong> Preços mais altos por um alcance genérico e menos direcionado.
                                        </li>
                                        <li>
                                            <strong className="text-gray-800">Menor Engajamento:</strong> Muitas vezes ignorado pelo público devido à saturação e falta de interação.
                                        </li>
                                        <li>
                                            <strong className="text-gray-800">Impacto Ambiental:</strong> Contribui para a poluição sonora e atmosférica nas cidades.
                                        </li>
                                        <li>
                                            <strong className="text-gray-800">Rotas Fixas:</strong> Menos flexibilidade para adaptar a veiculação a áreas de maior interesse.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-lg text-center leading-relaxed mt-12 text-[#034078] font-semibold">
                                Escolha a AELO e faça sua voz ser ouvida de forma mais inteligente, eficaz e responsável!
                            </p>
                        </section>
                    )}

                    {activePage === 'depoimentos' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in relative border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Histórias que Inspiram: A Voz dos Nossos Clientes
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Nada nos orgulha mais do que ver o impacto real que a AELO gera na vida das pessoas e nos negócios. Conheça algumas de nossas histórias de sucesso:
                            </p>
                            
                            {/* Carrossel de depoimentos */}
                            <div className="relative bg-[#E0E7F0] p-8 rounded-xl shadow-inner border border-[#A8DADC]">
                                <div className="flex items-center justify-center mb-6">
                                    <Quote size={48} className="text-gray-500 opacity-70" />
                                </div>
                                <p key={currentTestimonialIndex} className="text-xl italic leading-relaxed mb-6 text-center text-gray-700 animate-fade-in-up">"{testimonials[currentTestimonialIndex].quote}"</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-right">
                                    <div className="p-4 rounded-full bg-[#A8DADC] shadow-md">
                                        {testimonials[currentTestimonialIndex].icon}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#0A1128] text-lg">{testimonials[currentTestimonialIndex].name}</p>
                                        <p className="text-gray-600 text-md">{testimonials[currentTestimonialIndex].service}</p>
                                    </div>
                                </div>
                                
                                {/* Botões de navegação */}
                                <button
                                    onClick={prevTestimonial}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-[#F0F4F8] shadow-lg text-[#034078] hover:bg-[#A8DADC] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1282A2]"
                                    aria-label="Depoimento anterior"
                                >
                                    <ChevronLeft size={28} />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-[#F0F4F8] shadow-lg text-[#034078] hover:bg-[#A8DADC] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1282A2]"
                                    aria-label="Próximo depoimento"
                                >
                                    <ChevronRight size={28} />
                                </button>
                            </div>
                            
                            {/* Indicadores de posição (dots) */}
                            <div className="flex justify-center items-center gap-3 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonialIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonialIndex === index ? 'bg-[#034078]' : 'bg-[#A8DADC] hover:bg-[#D0D9E5]'}`}
                                        aria-label={`Ir para o depoimento ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </section>
                    )}

                    {activePage === 'dinamicas' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Dinâmicas AELO: Interação, Diversão e Recompensas!
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Transforme a cidade em um palco de experiências com as dinâmicas exclusivas da AELO. Participe e tenha a chance de ganhar prêmios incríveis!
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="dynamic-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-600 text-white mx-auto mb-4">
                                        <Mic size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">Achou um Áudio Conhecido?</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Ouça atentamente! Se você reconhecer um áudio veiculado pela AELO, grave um vídeo do ciclista, marque-nos no Instagram (@Aelovoz) e envie o vídeo. O dono da voz pode ganhar um brinde exclusivo!
                                    </p>
                                </div>

                                <div className="dynamic-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <DollarSign size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">Ticket de até R$1000</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Ao enviar qualquer áudio para veiculação, você automaticamente participa de uma dinâmica especial que pode te premiar com um ticket valioso de até R$1000,00!
                                    </p>
                                </div>

                                <div className="dynamic-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-200">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1282A2] text-white mx-auto mb-4">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">O Áudio Misterioso</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Fique ligado! Periodicamente, veicularemos um "Áudio Misterioso". Desvende o enigma e envie sua resposta para a AELO para ganhar prêmios! (Funcionalidade em atualização)
                                    </p>
                                </div>

                                <div className="dynamic-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-300">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mx-auto mb-4">
                                        <MapPin size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">Caça ao Tesouro Sonora</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Prepare-se para uma aventura urbana! Siga as pistas em áudio veiculadas por nossos ciclistas em dias específicos para encontrar um tesouro escondido na cidade!
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'temporadas' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Temporadas AELO: Conecte Sua Mensagem com o Momento
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                As Temporadas AELO potencializam sua mensagem, alinhando-a com o espírito e os eventos da cidade. Sua voz ganha ainda mais relevância!
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="season-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Volume2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">Como Funcionam?</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Cada temporada possui um tema central que reflete celebrações, sentimentos ou eventos do período, criando um ambiente sonoro coeso na cidade.
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 mt-4 space-y-1">
                                        <li>Temas alinhados com o calendário.</li>
                                        <li>Maior ressonância com o público.</li>
                                    </ul>
                                </div>

                                <div className="season-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mx-auto mb-4">
                                        <Leaf size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">Exemplos de Temporadas</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Já tivemos e teremos temporadas como "Áudio Verde" (sustentabilidade), "Áudio do Coração" (amor e amizade) e "Áudio Ação" (eventos e promoções).
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 mt-4 space-y-1">
                                        <li>Áudio Verde: Meio ambiente e bem-estar.</li>
                                        <li>Áudio do Coração: Amor, amizade, gratidão.</li>
                                        <li>Áudio Ação: Comércio e eventos.</li>
                                    </ul>
                                </div>

                                <div className="season-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-200 col-span-full">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-600 text-white mx-auto mb-4">
                                        <RefreshCcw size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3 text-center">Participe e Potencialize</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Alinhe o conteúdo do seu áudio com o tema da temporada vigente para maximizar a ressonância e o impacto da sua mensagem.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'precos' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Invista em Emoção e Resultado: Nossos Planos AELO
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Oferecemos planos flexíveis e acessíveis para que sua voz alcance o público certo, com o melhor custo-benefício.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* AELO+ Cliente */}
                                <div className="price-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border-2 border-[#034078] text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Heart size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3">AELO+ Cliente</h3>
                                    <p className="text-5xl font-extrabold text-green-600 mb-2">R$ 6<span className="text-xl font-normal text-gray-700">,00</span></p>
                                    <p className="text-gray-600 mb-4">por áudio (veiculação o dia inteiro)</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Ideal para mensagens pessoais e emocionantes que buscam criar um momento inesquecível.
                                    </p>
                                </div>

                                {/* AELO Negócio - Em Fila */}
                                <div className="price-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border-2 border-[#034078] text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Briefcase size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3">AELO Negócio</h3>
                                    <p className="text-xl font-bold text-gray-700 mb-2">Plano Em Fila</p>
                                    <p className="text-5xl font-extrabold text-green-600 mb-2">R$ 29<span className="text-xl font-normal text-gray-700">,90</span></p>
                                    <p className="text-gray-600 mb-4">por dia</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Seu anúncio é veiculado em sequência com outros, garantindo visibilidade contínua e acessível.
                                    </p>
                                </div>

                                {/* AELO Negócio - Particular */}
                                <div className="price-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border-2 border-[#034078] text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-200">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Briefcase size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3">AELO Negócio</h3>
                                    <p className="text-xl font-bold text-gray-700 mb-2">Plano Particular</p>
                                    <p className="text-5xl font-extrabold text-green-600 mb-2">R$ 69<span className="text-xl font-normal text-gray-700">,90</span></p>
                                    <p className="text-gray-600 mb-4">por dia</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Exclusividade total: apenas o áudio da sua empresa é veiculado durante todo o dia.
                                    </p>
                                </div>

                                {/* AELO Informações Públicas */}
                                <div className="price-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border-2 border-[#034078] text-center transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-300 col-span-full lg:col-span-1 lg:col-start-2">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <Info size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#0A1128] mb-3">AELO Informações Públicas</h3>
                                    <p className="text-5xl font-extrabold text-green-600 mb-2">R$ 49<span className="text-xl font-normal text-gray-700">,90</span></p>
                                    <p className="text-gray-600 mb-4">por áudio o dia todo</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Amplifique causas sociais e avisos comunitários, gerando impacto positivo na comunidade.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#E0E7F0] p-8 rounded-xl shadow-lg mt-12 text-center border border-green-600 animate-fade-in-up delay-400">
                                <h3 className="text-2xl font-bold mb-4 text-green-600 flex items-center justify-center gap-2">
                                    <DollarSign size={28} className="text-green-600" /> Pagamento Simples via Pix
                                </h3>
                                <p className="text-xl font-bold mb-2 text-[#0A1128]">Chave Pix (CNPJ): <span className="font-semibold text-[#034078]">60.676.425/0001-47</span></p>
                                <p className="text-lg mb-4 text-gray-700">Titular: A A S Fernandes</p>
                                <button onClick={copyPixKey} className="inline-flex items-center justify-center px-8 py-4 bg-[#034078] text-white font-bold rounded-full shadow-lg hover:bg-[#1282A2] transform hover:scale-105 transition-all duration-300 gap-2" aria-label="Copiar chave Pix"><Copy size={20} /> Copiar Chave Pix</button>
                                {pixCopiedMessage && (<p className="mt-4 text-sm font-semibold text-green-600 animate-fade-in-up">{pixCopiedMessage}</p>)}
                                <p className="text-gray-600 mt-4">Dica: Copie a chave Pix acima e realize o pagamento. Após a transação, envie o comprovante para nós via WhatsApp ou Instagram <span className="font-semibold text-[#034078]">@Aelovoz</span> para agilizar a veiculação do seu áudio!</p>
                            </div>
                        </section>
                    )}

                    {activePage === 'como-enviar' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Envie Seu Áudio para a AELO: Simples, Rápido e Eficaz!
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Levar sua mensagem para as ruas com a AELO é um processo descomplicado. Siga estes passos e veja sua voz ganhar vida:
                            </p>
                            <div className="space-y-8 text-left">
                                <div className="step-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 border border-[#A8DADC] transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex-shrink-0 w-16 h-16 text-white rounded-full flex items-center justify-center text-3xl font-extrabold bg-[#034078] shadow-md">1</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#0A1128] mb-2 flex items-center gap-2"><Mic size={24} className="text-yellow-600" /> Grave Seu Áudio com Qualidade e Duração Ideal</h3>
                                        <p className="text-gray-700">Use seu celular, computador ou qualquer dispositivo para gravar a mensagem que deseja veicular. A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                                        <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
                                            <li><span className="font-semibold text-[#0A1128]">AELO+ Cliente (Pessoais)</span>: 15 a 20 segundos.</li>
                                            <li><span className="font-semibold text-[#0A1128]">AELO Negócio:</span> 30 segundos a 1 minuto.</li>
                                            <li><span className="font-semibold text-[#0A1128]">AELO Informações Públicas:</span> 30 segundos a 1 minuto e 30 segundos.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="step-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 border border-[#A8DADC] transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex-shrink-0 w-16 h-16 text-white rounded-full flex items-center justify-center text-3xl font-extrabold bg-[#034078] shadow-md">2</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#0A1128] mb-2 flex items-center gap-2"><Upload size={24} className="text-yellow-600" /> Envie o Áudio para a AELO</h3>
                                        <p className="text-gray-700">Após a gravação, envie seu áudio diretamente para a nossa equipe. Você pode fazer isso de forma muito prática pelo nosso WhatsApp ou via Direct do Instagram <span className="font-semibold text-[#0A1128]">@Aelovoz</span>. Escolha o canal que for mais conveniente para você!</p>
                                        <p className="mt-2 text-gray-600">Para uma experiência mais fluida, o envio do áudio pode ser feito diretamente pelo WhatsApp da AELO - Sua Voz em Movimento.</p>
                                    </div>
                                </div>
                                <div className="step-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 border border-[#A8DADC] transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up delay-200">
                                    <div className="flex-shrink-0 w-16 h-16 text-white rounded-full flex items-center justify-center text-3xl font-extrabold bg-[#034078] shadow-md">3</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#0A1128] mb-2 flex items-center gap-2"><ListTodo size={24} className="text-yellow-600" /> Forneça os Detalhes da Veiculação</h3>
                                        <p className="text-gray-700">Junto com o áudio, nos informe a categoria que melhor se encaixa (AELO+ Cliente, AELO Negócio, AELO Informações Públicas) e os detalhes essenciais da veiculação: data, horário preferencial, e o endereço aproximado se for para uma pessoa ou local específico.</p>
                                    </div>
                                </div>
                                <div className="step-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6 border border-[#A8DADC] transform hover:scale-[1.01] transition-transform duration-300 animate-fade-in-up delay-300">
                                    <div className="flex-shrink-0 w-16 h-16 text-white rounded-full flex items-center justify-center text-3xl font-extrabold bg-[#034078] shadow-md">4</div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-[#0A1128] mb-2 flex items-center gap-2"><CheckCircle size={24} className="text-yellow-600" /> Confirmação e Pagamento</h3>
                                        <p className="text-gray-700">Nossa equipe fará a moderação do áudio para garantir a melhor qualidade e confirmará todos os detalhes com você. Após sua aprovação e o pagamento (via Pix, por exemplo), seu áudio estará pronto para ir para as ruas e encantar a cidade!</p>
                                    </div>
                                </div>
                                {/* Player de Áudio de Exemplo na página "Como Enviar" */}
                                <div className="bg-[#E0E7F0] p-6 rounded-xl shadow-md text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-400 border border-[#A8DADC]">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-[#1282A2]">
                                        <PlayCircle size={28} className="text-[#1282A2]" /> Exemplo de Qualidade de Áudio AELO
                                    </h3>
                                    <p className="text-gray-700">
                                        Exemplos de áudio não estão disponíveis no momento devido a atualizações na API.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'aelo-em-acao' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                AELO em Ação: Histórias que Fazem a Diferença
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Veja como a AELO - Sua Voz em Movimento transforma mensagens em momentos inesquecíveis e resultados reais na comunidade de Bauru.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {aeloInActionStories.map((story) => (
                                    <div key={story.id} className="story-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#034078] text-white flex items-center justify-center shadow-md">
                                                {story.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0A1128]">{story.title}</h3>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{story.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activePage === 'simular-assinatura' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Simulador de Assinatura AELO: Planeje Sua Economia
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Descubra as vantagens de assinar nossos planos! Calcule sua economia e o custo-benefício de cada opção de veiculação.
                            </p>

                            <div className="space-y-8">
                                {/* Seleção de Plano */}
                                <div className="bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC]">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#0A1128]">
                                        <Briefcase size={24} className="text-[#034078]" /> 1. Escolha o Plano
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <label className="flex items-center cursor-pointer p-4 rounded-lg border border-[#A8DADC] bg-white hover:bg-[#F0F4F8] transition-colors flex-1 shadow-sm">
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="emFila"
                                                checked={selectedPlan === 'emFila'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="form-radio h-5 w-5 text-[#034078] focus:ring-[#1282A2]"
                                            />
                                            <span className="ml-3 font-medium text-[#0A1128]">AELO Negócio - Em Fila (R$ 29,90/dia)</span>
                                        </label>
                                        <label className="flex items-center cursor-pointer p-4 rounded-lg border border-[#A8DADC] bg-white hover:bg-[#F0F4F8] transition-colors flex-1 shadow-sm">
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="particular"
                                                checked={selectedPlan === 'particular'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="form-radio h-5 w-5 text-[#034078] focus:ring-[#1282A2]"
                                            />
                                            <span className="ml-3 font-medium text-[#0A1128]">AELO Negócio - Particular (R$ 69,90/dia)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Seleção de Duração */}
                                <div className="bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC]">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#0A1128]">
                                        <CalendarDays size={24} className="text-[#034078]" /> 2. Escolha a Duração da Assinatura
                                    </h3>
                                    <select
                                        value={selectedDuration}
                                        onChange={(e) => setSelectedDuration(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-[#A8DADC] bg-white text-[#0A1128] focus:outline-none focus:ring-2 focus:ring-[#034078]"
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
                                    <div className="bg-green-100 p-6 rounded-xl shadow-md border-l-4 border-green-600 animate-fade-in-up">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-600">
                                            <CheckCircle size={24} className="text-green-600" /> Resultados da Simulação
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-[#0A1128]">
                                            <p><strong>Custo Diário Normal:</strong> <span className="font-bold text-[#034078]">{formatCurrency(dailyCost)}</span></p>
                                            <p><strong>Duração Total:</strong> <span className="font-bold text-[#034078]">{totalDays} dias</span></p>
                                            <p><strong>Custo Base (sem desconto):</strong> <span className="font-bold line-through text-red-600">{formatCurrency(baseCost)}</span></p>
                                            <p><strong>Desconto Aplicado:</strong> <span className="font-bold text-green-600">{formatPercentage(discountPercentage)}</span></p>
                                            <p className="col-span-full text-2xl font-bold text-[#0A1128]">
                                                Custo Total da Assinatura: <span className="text-[#034078]">{formatCurrency(finalCost)}</span>
                                            </p>
                                            <p className="col-span-full text-xl font-bold text-green-600">
                                                Economia Total: <span className="text-green-600">{formatCurrency(savings)}</span>
                                            </p>
                                            <p className="col-span-full text-xl font-bold text-[#0A1128]">
                                                Custo Diário Efetivo: <span className="text-[#034078]">{formatCurrency(effectiveDailyCost)}</span>
                                            </p>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-700">
                                            *Os valores apresentados são uma simulação e podem sofrer pequenas variações. Para um orçamento exato, entre em contato com nossa equipe.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                    
                    {activePage === 'blog' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Blog AELO: Notícias, Dicas e Insights
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Explore nossos artigos e fique por dentro das últimas tendências em publicidade sonora, sustentabilidade e o impacto da AELO na comunidade.
                            </p>

                            {selectedBlogPost ? (
                                <div className="bg-[#E0E7F0] p-8 rounded-xl shadow-md border border-[#A8DADC]">
                                    <button
                                        onClick={() => setSelectedBlogPost(null)}
                                        className="mb-6 inline-flex items-center gap-2 px-6 py-3 bg-[#034078] text-white rounded-full hover:bg-[#1282A2] transition-colors transform hover:scale-105"
                                    >
                                        <ChevronLeft size={20} /> Voltar para o Blog
                                    </button>
                                    <h3 className="text-3xl font-bold mb-4 text-[#0A1128]">{selectedBlogPost.title}</h3>
                                    <p className="text-sm mb-6 text-gray-600">
                                        Por {selectedBlogPost.author} em {selectedBlogPost.date}
                                    </p>
                                    <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedBlogPost.content }} />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {blogPosts.map((post) => (
                                        <div key={post.id} className="blog-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                            <h3 className="text-xl font-bold mb-3 text-[#0A1128]">{post.title}</h3>
                                            <p className="text-sm mb-4 text-gray-600">
                                                Por {post.author} em {post.date}
                                            </p>
                                            <p className="mb-5 text-gray-700 leading-relaxed">{post.snippet}</p>
                                            <button
                                                onClick={() => setSelectedBlogPost(post)}
                                                className="inline-flex items-center gap-2 px-5 py-2 bg-[#1282A2] text-white rounded-full hover:bg-[#034078] transition-colors transform hover:scale-105 font-semibold"
                                            >
                                                Leia Mais <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                    
                    {activePage === 'trabalhe-conosco' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128] animate-pulse">
                                Trabalhe Conosco: Pedale Rumo ao Sucesso com a AELO!
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Quer fazer parte de uma equipe inovadora, contribuir para a comunicação da sua cidade e ainda ter a chance de ganhar acima de R$ 10.000 por mês veiculando áudios? A AELO - Sua Voz em Movimento está buscando talentos!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="job-feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <DollarSign size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A1128] mb-3 text-center">Potencial de Ganhos Elevado</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Com um bom desempenho na veiculação de áudios, você tem a oportunidade de alcançar rendimentos superiores a R$ 10.000 por mês!
                                    </p>
                                    <p className="mt-4 text-sm text-gray-600 text-center">
                                        *Os ganhos são baseados na produtividade e na quantidade de áudios veiculados. Detalhes sobre o modelo de remuneração serão apresentados na entrevista.
                                    </p>
                                </div>

                                <div className="job-feature-card bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#034078] text-white mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A1128] mb-3 text-center">Requisitos Essenciais</h3>
                                    <p className="text-gray-700 leading-relaxed text-center">
                                        Para fazer parte da nossa equipe de ciclistas, os seguintes itens são essenciais:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                                        <li><Bike size={20} className="text-[#034078] inline-block mr-2" /> Bicicleta em boas condições.</li>
                                        <li><Volume2 size={20} className="text-[#034078] inline-block mr-2" /> Caixa de som portátil de qualidade.</li>
                                        <li><Users size={20} className="text-[#034078] inline-block mr-2" /> EPIs (Capacete, joelheiras, etc.) para sua segurança.</li>
                                        <li><FileText size={20} className="text-[#034078] inline-block mr-2" /> Relatório médico positivo.</li>
                                        <li><BriefcaseBusiness size={20} className="text-[#034078] inline-block mr-2" /> CNPJ ativo para formalização.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-[#E0E7F0] p-8 rounded-xl shadow-lg mt-12 text-center border border-[#034078] animate-fade-in-up delay-200">
                                <h3 className="text-2xl font-bold mb-4 text-[#0A1128] flex items-center justify-center gap-2">
                                    <MessageSquare size={28} className="text-[#034078]" /> Interessado? Fale Conosco!
                                </h3>
                                <p className="leading-relaxed mb-6 text-gray-700">
                                    Se você se encaixa no perfil e está pronto para pedalar rumo ao sucesso, entre em contato!
                                </p>
                                <button
                                    onClick={() => {
                                        const whatsappLink = `https://wa.me/5514981150675?text=${encodeURIComponent('Olá, AELO! Tenho interesse em ser um ciclista PJ da AELO.')}`;
                                        window.open(whatsappLink, '_blank');
                                    }}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-[#034078] text-white font-bold rounded-full shadow-lg hover:bg-[#1282A2] transform hover:scale-105 transition-all duration-300 gap-2"
                                >
                                    <Mail size={20} /> Enviar Mensagem via WhatsApp
                                </button>
                            </div>
                        </section>
                    )}

                    {activePage === 'compromisso-sustentavel' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Nosso Compromisso Sustentável: AELO e o Futuro Verde
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Na AELO, a sustentabilidade é a essência do nosso negócio. Acreditamos em um futuro onde a comunicação e o respeito ao meio ambiente caminham juntos.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="sustainability-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mx-auto mb-4">
                                        <Bike size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A1128] mb-3">Mobilidade Urbana Consciente</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Nossa escolha pela bicicleta reduz a emissão de carbono, diminui o trânsito e promove um estilo de vida mais saudável.
                                    </p>
                                </div>
                                <div className="sustainability-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-100">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mx-auto mb-4">
                                        <Globe size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A1128] mb-3">Impacto Ambiental Positivo</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Ao optar pela AELO, você contribui diretamente para uma cidade mais limpa, com menos poluição sonora e atmosférica.
                                    </p>
                                </div>
                                <div className="sustainability-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex flex-col items-center text-center border border-[#A8DADC] transform hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up delay-200 col-span-full">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-600 text-white mx-auto mb-4">
                                        <Handshake size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0A1128] mb-3">Parceria com a Comunidade</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Nossa operação fortalece a economia local e incentiva a prática de atividades físicas, construindo uma comunidade mais engajada.
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'faq' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Perguntas Frequentes (FAQ)
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Encontre aqui as respostas para as dúvidas mais comuns sobre os nossos serviços e dinâmicas.
                            </p>
                            <div className="space-y-4">
                                {faqData.map((item, index) => (
                                    <div key={index} className="rounded-xl overflow-hidden shadow-md bg-[#E0E7F0] border border-[#A8DADC] transition-all duration-300">
                                        <button
                                            className="w-full text-left p-5 font-semibold text-xl flex justify-between items-center bg-[#A8DADC] text-[#0A1128] hover:bg-[#D0D9E5] transition-colors rounded-t-xl"
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        >
                                            {item.question}
                                            <ChevronLeft size={24} className={`transform transition-transform duration-300 ${openFaqIndex === index ? '-rotate-90' : 'rotate-90'}`} />
                                        </button>
                                        <div
                                            className={`p-5 transition-all duration-300 ease-in-out overflow-hidden text-gray-700 ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0'}`}
                                        >
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activePage === 'termos-condicoes' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Termos e Condições de Uso da AELO
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Ao utilizar os serviços da AELO - Sua Voz em Movimento, você concorda com os seguintes termos e condições, que visam garantir a qualidade, a segurança e a integridade de todas as mensagens veiculadas.
                            </p>
                            <div className="space-y-8 text-left">
                                <div className="bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] animate-fade-in-up">
                                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0A1128]"><CheckCircle size={24} className="text-green-600" /> Moderação de Conteúdo</h3>
                                    <p className="leading-relaxed text-gray-700">Todos os áudios enviados para veiculação na AELO - Sua Voz em Movimento são submetidos a um rigoroso processo de moderação. Nosso objetivo é assegurar que o conteúdo seja claro, objetivo e, acima de tudo, respeitoso e adequado para o público geral.</p>
                                    <p className="mt-4 leading-relaxed text-gray-700"><span className="font-semibold text-red-600">Conteúdos Estritamente Proibidos:</span> Não serão veiculados áudios que contenham:</p>
                                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-600">
                                        <li>Mensagens de má-fé, difamação ou calúnia.</li>
                                        <li>Qualquer forma de discriminação (racial, de gênero, religiosa, sexual).</li>
                                        <li>Discurso de ódio ou incitação à violência.</li>
                                        <li>Conteúdo sexualmente explícito ou obsceno.</li>
                                        <li>Informações falsas ou enganosas.</li>
                                        <li>Conteúdo que viole direitos autorais ou de propriedade intelectual.</li>
                                        <li>Qualquer conteúdo que seja ilegal ou promova atividades ilícitas.</li>
                                    </ul>
                                    <p className="mt-4 leading-relaxed text-gray-700">A AELO - Sua Voz em Movimento se reserva o direito de recusar a veiculação de qualquer áudio que, a seu critério exclusivo, não esteja em conformidade com estas diretrizes, sem a necessidade de justificativa detalhada.</p>
                                </div>
                                <div className="bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] animate-fade-in-up delay-100">
                                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0A1128]"><DollarSign size={24} className="text-green-600" /> Política de Reembolso</h3>
                                    <p className="leading-relaxed text-gray-700">Entendemos que imprevistos podem acontecer. No entanto, é importante que você esteja ciente da nossa política de reembolso:</p>
                                    <p className="mt-4 leading-relaxed text-gray-700">Após o envio do áudio e a confirmação do pagamento, não haverá reembolso caso você desista da veiculação após 30 (trinta) minutos. Esta política se aplica mesmo que o áudio não infrinja nossas regras.</p>
                                </div>
                                <div className="bg-[#E0E7F0] p-6 rounded-xl shadow-md border border-[#A8DADC] animate-fade-in-up delay-200">
                                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-[#0A1128]"><Info size={24} className="text-[#034078]" /> Responsabilidade do Usuário</h3>
                                    <p className="leading-relaxed text-gray-700">O usuário é o único responsável pelo conteúdo do áudio enviado, garantindo que ele não viole quaisquer leis, regulamentos ou direitos de terceiros. A AELO - Sua Voz em Movimento não se responsabiliza por quaisquer danos ou prejuízos decorrentes da veiculação de conteúdo inadequado ou ilícito enviado pelo usuário.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activePage === 'contato' && (
                        <section className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-8 animate-fade-in border border-[#A8DADC]">
                            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#0A1128]">
                                Fale Conosco: Sua Voz é Importante para Nós!
                            </h2>
                            <p className="text-lg mb-10 leading-relaxed text-gray-700 text-center">
                                Tem alguma dúvida, sugestão ou quer saber mais sobre como a AELO - Sua Voz em Movimento pode amplificar sua mensagem? Preencha o formulário abaixo ou use nossos canais de contato direto.
                            </p>
                            
                            {/* Formulário de Contato */}
                            <form onSubmit={handleFormSubmit} className="space-y-6 bg-[#E0E7F0] p-8 rounded-xl shadow-md border border-[#A8DADC]">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#0A1128]">Seu Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-[#A8DADC] bg-white focus:outline-none focus:ring-2 focus:ring-[#034078] text-[#0A1128]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#0A1128]">Seu E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-[#A8DADC] bg-white focus:outline-none focus:ring-2 focus:ring-[#034078] text-[#0A1128]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[#0A1128]">Sua Mensagem</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        value={formMessage}
                                        onChange={(e) => setFormMessage(e.target.value)}
                                        className="w-full p-3 rounded-lg border border-[#A8DADC] bg-white focus:outline-none focus:ring-2 focus:ring-[#034078] text-[#0A1128]"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#034078] text-white font-bold rounded-lg shadow-md hover:bg-[#1282A2] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                                {formStatus && (
                                    <p className={`text-center font-semibold mt-4 ${formStatus.includes('Erro') ? 'text-red-600' : 'text-green-600'}`}>{formStatus}</p>
                                )}
                            </form>

                            <hr className="my-12 border-[#A8DADC]" />
                            
                            <div className="space-y-6 text-left">
                                <h3 className="text-2xl font-bold mb-4 text-[#0A1128]">Ou Fale Diretamente Conosco:</h3>
                                <div className="contact-info-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex items-start gap-4 animate-fade-in-up border border-[#A8DADC]">
                                    <Mail size={28} className="text-[#034078] flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-[#0A1128]">E-mail</h3>
                                        <p className="text-gray-700">Envie suas perguntas e sugestões para: <a href="mailto:Aelobrasil@gmail.com" className="text-[#034078] hover:underline">Aelobrasil@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="contact-info-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex items-start gap-4 animate-fade-in-up delay-100 border border-[#A8DADC]">
                                    <Phone size={28} className="text-[#034078] flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-[#0A1128]">WhatsApp</h3>
                                        <p className="text-gray-700">Para um atendimento rápido e direto, fale conosco pelo WhatsApp: <a href="https://wa.me/5514981150675" target="_blank" rel="noopener noreferrer" className="text-[#034078] hover:underline">(14) 98115-0675</a></p>
                                    </div>
                                </div>
                                <div className="contact-info-card bg-[#E0E7F0] p-6 rounded-xl shadow-md flex items-start gap-4 animate-fade-in-up delay-200 border border-[#A8DADC]">
                                    <Instagram size={28} className="text-pink-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-[#0A1128]">Redes Sociais</h3>
                                        <p className="text-gray-700">Siga-nos no Instagram para ficar por dentro das novidades, dinâmicas e temporadas: <a href="https://www.instagram.com/aelovoz" target="_blank" rel="noopener noreferrer" className="text-[#034078] hover:underline">@Aelovoz</a></p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Rodapé aprimorado */}
            <footer className="text-white text-center p-6 mt-auto rounded-t-xl shadow-inner bg-gradient-to-r from-[#034078] to-[#0A1128] border-t border-[#A8DADC]">
                <div className="container mx-auto flex flex-col items-center justify-center">
                    <p className="text-lg font-bold mb-1">AELO - Sua Voz em Movimento</p>
                    <p className="text-sm">Bauru, SP</p>
                    <p className="text-xs mt-2">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
                    <Bike size={24} className="text-[#A8DADC] transform transition-transform duration-300 hover:rotate-[360deg] mt-3" />
                </div>
            </footer>
        </div>
    );
};

export default App;
