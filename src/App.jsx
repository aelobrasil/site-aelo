import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// Importa ícones do Lucide React
import { Home, Mic, Briefcase, Users, Lightbulb, Trophy, DollarSign, Bike, MessageSquare, CheckCircle, Heart, Leaf, Star, Info, MapPin, Award, RefreshCcw, CalendarDays, Volume2, Search, Gift, Send, Copy, FileText, Mail, Phone, Menu, X, Quote, ChevronLeft, ChevronRight, Moon, Sun, ChevronDown, Scale, MessageCircle, Upload, BriefcaseBusiness, Palette, Calculator, Rss, ListTodo, Sparkles, TrendingUp, Handshake, Globe, PlayCircle } from 'lucide-react';

// --- Contexto de Tema ---
// Define as paletas de cores
const colorPalettes = [
    {
        name: "Azul & Amarelo (Padrão)",
        primary: "blue",
        accent: "yellow",
        text: "gray-900", // Texto escuro para contraste no modo claro
        darkText: "gray-100", // Texto claro para contraste no modo escuro
        lightBg: "blue-50",
        darkBg: "blue-900",
        border: "blue-200",
        darkBorder: "blue-700",
        hoverLight: "blue-100",
        hoverDark: "blue-800",
        success: "green-500",
        error: "red-500",
        warning: "amber-500",
        iconPrimary: "blue-600",
        iconAccent: "yellow-400",
    },
    {
        name: "Verde & Laranja",
        primary: "green",
        accent: "orange",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "green-50",
        darkBg: "green-900",
        border: "green-200",
        darkBorder: "green-700",
        hoverLight: "green-100",
        hoverDark: "green-800",
        success: "lime-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "green-600",
        iconAccent: "orange-400",
    },
    {
        name: "Roxo & Ciano",
        primary: "purple",
        accent: "cyan",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "purple-50",
        darkBg: "purple-900",
        border: "purple-200",
        darkBorder: "purple-700",
        hoverLight: "purple-100",
        hoverDark: "purple-800",
        success: "emerald-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "purple-600",
        iconAccent: "cyan-400",
    },
    {
        name: "Vermelho & Dourado",
        primary: "red",
        accent: "amber",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "red-50",
        darkBg: "red-900",
        border: "red-200",
        darkBorder: "red-700",
        hoverLight: "red-100",
        hoverDark: "red-800",
        success: "green-500",
        error: "rose-500",
        warning: "yellow-500",
        iconPrimary: "red-600",
        iconAccent: "amber-400",
    },
    {
        name: "Cinza & Rosa",
        primary: "gray",
        accent: "pink",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "gray-50",
        darkBg: "gray-900",
        border: "gray-200",
        darkBorder: "gray-700",
        hoverLight: "gray-100",
        hoverDark: "gray-800",
        success: "emerald-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "gray-600",
        iconAccent: "pink-400",
    },
    {
        name: "Ciano & Índigo",
        primary: "cyan",
        accent: "indigo",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "cyan-50",
        darkBg: "cyan-900",
        border: "cyan-200",
        darkBorder: "cyan-700",
        hoverLight: "cyan-100",
        hoverDark: "cyan-800",
        success: "green-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "cyan-600",
        iconAccent: "indigo-400",
    },
    {
        name: "Laranja & Teal",
        primary: "orange",
        accent: "teal",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "orange-50",
        darkBg: "orange-900",
        border: "orange-200",
        darkBorder: "orange-700",
        hoverLight: "orange-100",
        hoverDark: "orange-800",
        success: "emerald-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "orange-600",
        iconAccent: "teal-400",
    },
    {
        name: "Rosa & Azul",
        primary: "pink",
        accent: "blue",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "pink-50",
        darkBg: "pink-900",
        border: "pink-200",
        darkBorder: "pink-700",
        hoverLight: "pink-100",
        hoverDark: "pink-800",
        success: "green-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "pink-600",
        iconAccent: "blue-400",
    },
    {
        name: "Marrom & Lima",
        primary: "amber", // Using amber as a 'brownish' tone for primary
        accent: "lime",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "amber-50",
        darkBg: "amber-900",
        border: "amber-200",
        darkBorder: "amber-700",
        hoverLight: "amber-100",
        hoverDark: "amber-800",
        success: "green-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "amber-600",
        iconAccent: "lime-400",
    },
    {
        name: "Índigo & Rosa",
        primary: "indigo",
        accent: "rose",
        text: "gray-900",
        darkText: "gray-100",
        lightBg: "indigo-50",
        darkBg: "indigo-900",
        border: "indigo-200",
        darkBorder: "indigo-700",
        hoverLight: "indigo-100",
        hoverDark: "indigo-800",
        success: "green-500",
        error: "red-500",
        warning: "yellow-500",
        iconPrimary: "indigo-600",
        iconAccent: "rose-400",
    },
];

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    // Inicializa o tema com a primeira paleta e o modo escuro a partir do localStorage ou falso
    const [currentTheme, setCurrentTheme] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('aeloTheme');
            return savedTheme ? JSON.parse(savedTheme) : colorPalettes[0];
        } catch (error) {
            console.error("Erro ao carregar tema do localStorage:", error);
            return colorPalettes[0];
        }
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const savedMode = localStorage.getItem('aeloDarkMode');
            return savedMode ? JSON.parse(savedMode) : false; // Padrão para modo claro
        } catch (error) {
            console.error("Erro ao carregar modo escuro do localStorage:", error);
            return false;
        }
    });

    // Efeito para salvar o tema no localStorage sempre que ele mudar
    useEffect(() => {
        try {
            localStorage.setItem('aeloTheme', JSON.stringify(currentTheme));
        } catch (error) {
            console.error("Erro ao salvar tema no localStorage:", error);
        }
    }, [currentTheme]);

    // Efeito para salvar o modo escuro no localStorage e aplicar a classe 'dark'
    useEffect(() => {
        try {
            localStorage.setItem('aeloDarkMode', JSON.stringify(isDarkMode));
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } catch (error) {
            console.error("Erro ao salvar modo escuro ou aplicar classe 'dark':", error);
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, colorPalettes, isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
// --- Fim Contexto de Tema ---

// Modal para o fluxo de envio de áudio
const SendAudioModal = ({ onClose, navigateTo }) => {
    const { currentTheme, isDarkMode } = useContext(ThemeContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [paymentProofFile, setPaymentProofFile] = useState(null); // Estado para o arquivo de comprovante
    const [howDidYouHear, setHowDidYouHear] = useState(''); // Novo estado para "Como conheceu a AELO?"
    const [firstName, setFirstName] = useState(''); // Novo estado para o primeiro nome
    const [lastName, setLastName] = useState(''); // Novo estado para o sobrenome

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
    // QR Code que leva para o WhatsApp da AELO
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://wa.me/5514981150675')}`;

    const handleWhatsAppClick = () => {
        // Verifica se nome e sobrenome foram preenchidos antes de abrir o WhatsApp
        if (!firstName || !lastName) {
            // Substituído alert por console.log para evitar bloqueio em iframes
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
            // Substituído alert por console.log para evitar bloqueio em iframes
            console.log(`Comprovante "${file.name}" anexado!`);
        }
    };

    // Nova função para lidar com o clique nos termos e condições
    const handleTermsClick = (e) => {
        e.preventDefault();
        onClose(); // Fecha o modal
        if (typeof navigateTo === 'function') {
            navigateTo('termos-condicoes'); // Navega para a página de termos
        } else {
            console.error("navigateTo não é uma função em SendAudioModal:", navigateTo);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-[100]">
            <div className={`p-6 rounded-lg shadow-2xl w-11/12 max-w-md max-h-[90vh] overflow-y-auto relative ${isDarkMode ? `bg-gray-800 text-${currentTheme.darkText}` : `bg-white text-${currentTheme.text}`}`}>
                <button onClick={onClose} className={`absolute top-3 right-3 p-2 rounded-full ${isDarkMode ? `bg-gray-700 hover:bg-gray-600 text-${currentTheme.darkText}` : `bg-gray-200 hover:bg-gray-300 text-${currentTheme.text}`} transition-colors`}>
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
                                className={`form-radio h-4 w-4 text-${currentTheme.primary}-600 transition-colors duration-200`}
                            />
                            <span className="ml-2">{category}</span>
                        </label>
                    ))}
                </div>

                {selectedCategory && (
                    <>
                        <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? `bg-${currentTheme.primary}-900` : `bg-${currentTheme.primary}-50`}`}>
                            <p className="font-semibold">Tempo de Áudio Recomendado para "{selectedCategory}":</p>
                            <p className={`text-lg font-bold ${isDarkMode ? `text-${currentTheme.primary}-300` : `text-${currentTheme.primary}-700`}`}>{audioDurations[selectedCategory]}</p>
                        </div>

                        <div className={`mb-4 p-3 rounded-lg text-center ${isDarkMode ? `bg-${currentTheme.success}-900` : `bg-${currentTheme.success}-50`}`}>
                            <p className="font-semibold mt-4 mb-2">Preço para "{selectedCategory}":</p>
                            <p className={`text-3xl font-bold ${isDarkMode ? `text-${currentTheme.success}-300` : `text-${currentTheme.success}-700`}`}>{prices[selectedCategory]}</p>

                            <p className="font-semibold mt-4 mb-2">3. Realize o Pagamento via Pix:</p>
                            <p className={`text-lg font-bold ${isDarkMode ? `text-${currentTheme.success}-300` : `text-${currentTheme.success}-700`} mb-2`}>Titular: {pixHolder}</p>
                            <button onClick={() => {
                                const tempInput = document.createElement('input');
                                tempInput.value = pixKey;
                                document.body.appendChild(tempInput);
                                tempInput.select();
                                document.execCommand('copy');
                                document.body.removeChild(tempInput);
                                // Substituído alert por console.log para evitar bloqueio em iframes
                                console.log('Chave Pix copiada!');
                            }} className={`mt-2 px-4 py-2 bg-${currentTheme.primary}-600 text-white rounded-full hover:bg-${currentTheme.primary}-700 transition-colors flex items-center justify-center gap-1 mx-auto`}>
                                <Copy size={16} /> Copiar Chave Pix (CNPJ)
                            </button>
                            <p className={`mt-2 text-sm ${isDarkMode ? `text-gray-300` : `text-gray-700`}`}>Use a chave Pix copiada para realizar o pagamento em seu aplicativo bancário.</p>

                            <p className="font-semibold mt-6 mb-2">4. Escaneie o QR Code para Enviar Comprovante e Áudio via WhatsApp:</p>
                            <p className={`text-sm ${isDarkMode ? `text-gray-300` : `text-gray-700`} mb-4`}>Escaneie o QR Code abaixo para nos enviar o comprovante de pagamento e o seu áudio via WhatsApp.</p>
                            <img src={qrCodeUrl} alt="QR Code WhatsApp" className="mx-auto my-4 rounded-lg shadow-md" />
                            
                            <div className="mt-4 flex flex-col items-center">
                                <label htmlFor="paymentProof" className={`px-4 py-2 bg-${currentTheme.warning}-600 text-white rounded-lg hover:bg-${currentTheme.warning}-700 transition-colors cursor-pointer flex items-center gap-1`}>
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
                                    <p className={`text-${currentTheme.error}-500 text-sm mt-2`}>O comprovante de pagamento é obrigatório para prosseguir.</p>
                                )}
                            </div>
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <p className="font-semibold mb-2">2. Instruções de Gravação:</p>
                    <ul className={`list-disc list-inside ${isDarkMode ? `text-gray-300` : `text-gray-700`} space-y-1`}>
                        <li>Grave seu áudio com qualidade (celular ou computador).</li>
                        <li>Informe a categoria escolhida e detalhes como data, horário preferencial e endereço (se for para uma pessoa/local específico).</li>
                        <li>Para uma experiência mais fluida, o envio do áudio pode ser feito diretamente pelo WhatsApp da AELO - Sua Voz em Movimento.</li>
                    </ul>
                    <p className={`mt-2 text-${currentTheme.error}-600 dark:text-${currentTheme.error}-400 font-semibold`}>Atenção: A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                </div>

                {/* Campos para Nome e Sobrenome */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-semibold mb-1">Seu Nome (Obrigatório)</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? `bg-gray-700 border-gray-600` : `bg-white border-gray-300`}`}
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
                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? `bg-gray-700 border-gray-600` : `bg-white border-gray-300`}`}
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
                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? `bg-gray-700 border-gray-600` : `bg-white border-gray-300`}`}
                        placeholder="Ex: Instagram, Amigo, Pesquisa no Google"
                    />
                </div>

                <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className={`form-checkbox h-4 w-4 text-${currentTheme.primary}-600 transition-colors duration-200`}
                        />
                        <span className={`ml-2 ${isDarkMode ? `text-gray-200` : `text-gray-800`}`}>Aceito os <a href="#" onClick={handleTermsClick} className={`text-${currentTheme.primary}-600 hover:underline`}>termos e condições</a> da AELO - Sua Voz em Movimento.</span>
                    </label>
                </div>

                <button
                    onClick={handleWhatsAppClick}
                    disabled={!selectedCategory || !agreedToTerms || !paymentProofFile || !firstName || !lastName}
                    className={`w-full py-3 bg-${currentTheme.success}-500 text-white font-bold rounded-lg shadow-md hover:bg-${currentTheme.success}-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                    <MessageSquare size={20} /> Enviar Áudio via WhatsApp
                </button>
            </div>
        </div>
    );
};


// Componente principal do aplicativo
const App = () => {
    const { currentTheme, setCurrentTheme, colorPalettes, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    // Estado para controlar a página ativa
    const [activePage, setActivePage] = useState('home');
    // Estado para controlar a visibilidade do conteúdo para a animação
    const [contentVisible, setContentVisible] = useState(true);
    // Estado para a mensagem de confirmação do Pix
    const [pixCopiedMessage, setPixCopiedMessage] = useState('');
    // Estado para controlar a visibilidade do menu lateral
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Estado para o sintetizador de áudio (Tone.js)
    const synth = useRef(null);
    // Estado para o carrossel de depoimentos
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    // Novos estados para o formulário de contato
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formMessage, setFormMessage] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado para controlar a visibilidade do chatbot
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    // Estados para o chat do chatbot
    const [chatMessages, setChatMessages] = useState([]);
    const [currentInput, setCurrentInput] = useState(''); // Alterado para useState
    const chatContainerRef = useRef(null); // Ref para scroll automático
    const [isChatbotTyping, setIsChatbotTyping] = useState(false); // Estado para indicar que o bot está digitando

    // Estado para controlar a visibilidade do modal de envio de áudio
    const [showSendAudioModal, setShowSendAudioModal] = useState(false);

    // --- Estados para o Simulador de Assinatura ---
    const [selectedPlan, setSelectedPlan] = useState(''); // 'emFila' ou 'particular'
    const [selectedDuration, setSelectedDuration] = useState(''); // '7d', '30d', '90d', '180d', '365d'
    const [dailyCost, setDailyCost] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const [baseCost, setBaseCost] = useState(0);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [finalCost, setFinalCost] = useState(0);
    const [savings, setSavings] = useState(0);
    const [effectiveDailyCost, setEffectiveDailyCost] = useState(0);

    // Dados para os áudios de cada categoria
    const [clientAudioUrl, setClientAudioUrl] = useState('');
    const [isClientAudioLoading, setIsClientAudioLoading] = useState(false);
    const [businessAudioUrl, setBusinessAudioUrl] = useState('');
    const [isBusinessAudioLoading, setIsBusinessAudioLoading] = useState(false);
    const [publicAudioUrl, setPublicAudioUrl] = useState('');
    const [isPublicAudioLoading, setIsPublicAudioLoading] = useState(false);
    const [sampleAudioUrl, setSampleAudioUrl] = useState('');
    const [isSampleAudioLoading, setIsSampleAudioLoading] = useState(false);


    // Função para formatar moeda
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    // Função para formatar porcentagem
    const formatPercentage = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(value);
    };

    // Efeito para recalcular os valores do simulador quando as seleções mudam
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
                    currentDiscountPercentage = 0.05; // 5%
                    break;
                case '90d':
                    currentTotalDays = 90;
                    currentDiscountPercentage = 0.10; // 10%
                    break;
                case '180d':
                    currentTotalDays = 180;
                    currentDiscountPercentage = 0.15; // 15%
                    break;
                case '365d':
                    currentTotalDays = 365;
                    currentDiscountPercentage = 0.20; // 20%
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
            // Resetar valores se as seleções não forem completas
            setDailyCost(0);
            setTotalDays(0);
            setBaseCost(0);
            setDiscountPercentage(0);
            setFinalCost(0);
            setSavings(0);
            setEffectiveDailyCost(0);
        }
    }, [selectedPlan, selectedDuration]);
    // --- Fim Estados para o Simulador de Assinatura ---

    // Inicializa o Tone.js de forma segura no lado do cliente
    useEffect(() => {
        // Verifica se Tone.js está disponível globalmente
        if (window.Tone) {
            synth.current = new window.Tone.Synth().toDestination();
        } else {
            console.warn("Tone.js não encontrado. Certifique-se de que o script está carregado em index.html.");
        }
    }, []);

    // Função para tocar o som misterioso
    const playMysterySound = () => {
        if (synth.current && window.Tone.context.state !== 'running') {
            window.Tone.start().then(() => {
                console.log("Tone.js context started.");
                const now = window.Tone.now();
                synth.current.triggerAttackRelease("C#3", "8n", now);
                synth.current.triggerAttackRelease("G3", "8n", now + 0.3);
                synth.current.triggerAttackRelease("E4", "16n", now + 0.6);
            }).catch(e => console.error("Erro ao iniciar Tone.js context:", e));
        } else if (synth.current) {
            console.log("Tone.js context já está rodando.");
            const now = window.Tone.now();
            synth.current.triggerAttackRelease("C#3", "8n", now);
            synth.current.triggerAttackRelease("G3", "8n", now + 0.3);
            synth.current.triggerAttackRelease("E4", "16n", now + 0.6);
        } else {
            console.error("Sintetizador Tone.js não inicializado.");
        }
    };

    // Dados para o blog (placeholders)
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

    const [selectedBlogPost, setSelectedBlogPost] = useState(null); // Estado para o post de blog selecionado

    // Dados para a nova seção "AELO em Ação"
    const aeloInActionStories = [
        {
            id: 1,
            title: "A Voz que Iluminou o Dia na Rotina de Bauru",
            icon: <Sparkles size={28} className={`text-${currentTheme.accent}-500`} />,
            description: "Em um dia comum em Bauru, João estava se sentindo desanimado com os desafios da vida. De repente, um ciclista da AELO passou, veiculando um áudio motivacional. A mensagem, em movimento, alcançou João no momento certo, e ele sentiu uma onda de esperança, percebendo que sua jornada continuava. A voz da AELO, pedalando pela cidade, transformou seu dia!"
        },
        {
            id: 2,
            title: "O Bom Dia Sonoro que Alegrou a Cidade",
            icon: <TrendingUp size={28} className={`text-${currentTheme.warning}-500`} />,
            description: "Maria, uma cliente da AELO, teve a ideia de enviar um 'Super Bom Dia!' para toda a cidade de Bauru. Ela gravou sua mensagem cheia de energia, e a AELO a veiculou por diferentes bairros. O feedback foi incrível! Pessoas nas ruas sorriam e acenavam, e Maria se sentiu realizada por ter espalhado tanta positividade em movimento. Sua voz, em cada pedalada, fez a diferença."
        },
        {
            id: 3,
            title: "A Promoção que Lotou a Pizzaria Saborosa",
            icon: <Star size={28} className={`text-${currentTheme.warning}-500`} />,
            description: "A Pizzaria Saborosa lançou uma nova promoção e precisava de um empurrão. A AELO veiculou o anúncio nas ruas próximas, e o resultado foi imediato: a pizzaria registrou um aumento de 30% nas vendas no primeiro fim de semana da campanha. O som atraiu os clientes diretamente para o sabor!"
        },
        {
            id: 4,
            title: "Achou o Áudio e Ganhou um Presente!",
            icon: <Award size={28} className={`text-${currentTheme.primary}-500`} />,
            description: "Durante nossa dinâmica 'Achou um Áudio Conhecido?', a Ana Paula reconheceu a voz da sua irmã veiculando uma mensagem de apoio. Ela gravou o vídeo, nos enviou e sua irmã recebeu um brinde exclusivo da AELO! A emoção de ser encontrado pela voz é indescritível."
        }
    ];

    // Opções iniciais do chatbot
    const chatbotInitialOptions = [
        { text: "Sobre a AELO", query: "O que é a AELO?" },
        { text: "Preços", query: "Quais são os preços dos planos?" },
        { text: "Termos e Condições", query: "Quais são os termos de uso?" },
        { text: "Dinâmicas", query: "Quais dinâmicas a AELO oferece?" },
        { text: "Falar com Humano", query: "Preciso falar com um atendente." }
    ];

    // Efeito para a mensagem inicial e opções do chatbot
    useEffect(() => {
        if (isChatbotOpen && chatMessages.length === 0) {
            setChatMessages([
                { sender: 'bot', text: 'Olá, sou Olea, a assistente virtual da AELO - Sua Voz em Movimento. Como posso te ajudar hoje? Escolha uma opção ou digite sua pergunta:' },
                { sender: 'options', options: chatbotInitialOptions }
            ]);
        }
    }, [isChatbotOpen, chatMessages.length]);

    // Scroll para o final do chat quando novas mensagens chegam
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    // Dados para o FAQ (mantidos)
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

    // Define o ano atual para o rodapé
    const currentYear = new Date().getFullYear();

    // Base de conhecimento detalhada para o chatbot Olea
    const aeloKnowledgeBase = `
        Você é Olea, a assistente virtual da AELO - Sua Voz em Movimento.
        Sua missão é fornecer informações precisas e relevantes sobre a AELO - Sua Voz em Movimento e seus serviços, planos, processos, termos e dinâmicas.
        O site oficial da AELO - Sua Voz em Movimento é https://aelo.vercel.app/.
        O dono da empresa é Arthur Hocc D'Mello.
        A AELO - Sua Voz em Movimento promove a publicidade local de forma sustentável e eficaz, conectando empresas, informações públicas e a comunidade através de uma plataforma de mobilidade urbana ecologicamente correta, utilizando ciclistas equipados com sistemas de som.
        Mercado de Atuação: Bauru e cidades vizinhas, com foco em publicidade local e desenvolvimento de comunidades.

        Serviços e Planos de Veiculação:
        1. AELO+ Cliente: Sua Mensagem Pessoal
           - Preço: R$ 6,00 por áudio.
           - Duração Ideal: 15 a 20 segundos.
           - Reprodução: O dia inteiro.
           - Ideal para: Mensagens pessoais e emocionantes (amor, aniversário, apoio, pedidos de desculpas, celebração de conquistas).

        2. AELO Negócio: Publicidade com Alma
           - Em Fila:
             - Preço: R$ 29,90 o dia todo.
             - Duração Ideal: 30 segundos a 1 minuto.
             - Reprodução: Áudio reproduzido em sequência com outros.
           - Particular:
             - Preço: R$ 69,90 o dia todo.
             - Duração Ideal: 30 segundos a 1 minuto.
             - Reprodução: Apenas o áudio da sua empresa será reproduzido, proporcionando exclusividade.
           - Ideal para: Anunciar promoções, inaugurações, eventos, lançamento de produtos.

        3. AELO Informações Públicas: Voz para o Bem
           - Preço: R$ 49,90 por áudio.
           - Duração Ideal: 30 segundos a 1 minuto e 30 segundos.
           - Reprodução: O dia todo, com sua mensagem em destaque.
           - Ideal para: Amplificar causas sociais, avisos comunitários, campanhas de conscientização, eventos beneficentes.

        Processo de Solicitação e Veiculação do Áudio:
        1. Grave Seu Áudio com Qualidade e Duração Ideal: Use celular/computador.
           - AELO+ Cliente: 15 a 20 segundos.
           - AELO Negócio: 30 segundos a 1 minuto.
           - AELO Informações Públicas: 30 segundos a 1 minuto e 30 segundos.
        2. Envie o Áudio para a AELO - Sua Voz em Movimento: Via WhatsApp ou Direct do Instagram @Aelovoz. Para uma experiência mais fluida, o envio do áudio pode ser feito diretamente pelo WhatsApp da AELO - Sua Voz em Movimento.
        3. Forneça os Detalhes da Veiculação: Informe categoria, data, horário preferencial, endereço aproximado (se específico).
        4. Confirmação e Pagamento: Nossa equipe fará a moderação do áudio. Após aprovação e pagamento (via Pix), seu áudio estará pronto.
        Chave Pix (CNPJ): 60.676.425/0001-47 (Titular: A A S Fernandes).

        Termos e Condições de Uso:
        - Moderação de Conteúdo: Todos os áudios são moderados para clareza, objetividade, respeito e adequação.
          - Conteúdos Estritamente Proibidos: Má-fé, difamação, calúnia, discriminação (racial, de gênero, religiosa, sexual), discurso de ódio, incitação à violência, conteúdo sexualmente explícito/obsceno, informações falsas/enganosas, violação de direitos autorais/propriedade intelectual, ou qualquer conteúdo ilegal/que promova atividades ilícitas.
          - A AELO - Sua Voz em Movimento se reserva o direito de recusar a veiculação de qualquer áudio que não esteja em conformidade com estas diretrizes.
        - Política de Reembolso: Não há reembolso caso o cliente desista da veiculação após 30 minutos da confirmação do pagamento, mesmo que o áudio não infrinja regras.
        - Responsabilidade do Usuário: O usuário é único responsável pelo conteúdo do áudio enviado.

        Dinâmicas AELO - Sua Voz em Movimento:
        - Achou um Áudio Conhecido? Surpreenda-se!: Grave vídeo do ciclista veiculando o áudio, marque @Aelovoz no Instagram, envie direct com nome do dono da voz e endereço. Recompensa: Brinde surpresa.
        - Ticket de até R$1000: Sua Voz Vale Ouro!: Ao enviar qualquer áudio, participa de dinâmica para ganhar ticket de até R$1000,00.
        - O Áudio Misterioso: Desvende o Enigma!: Periodicamente, veiculamos "Áudio Misterioso". Ouça, desvende o enigma e envie resposta para prêmios.
        - Caça ao Tesouro Sonora: Aventura Urbana!: Em dias específicos, ciclistas veiculam pistas em áudio para encontrar tesouro.

        Contato e Suporte:
        - E-mail: Aelobrasil@gmail.com
        - WhatsApp: (14) 98115-0675
        - Instagram: @Aelovoz

        Instruções de Resposta para Olea:
        1. Responda de forma linear e conversacional.
        2. Responda APENAS com base nas informações fornecidas sobre a AELO - Sua Voz em Movimento. Seja concisa, clara e objetiva.
        3. Se a pergunta do usuário NÃO for diretamente relacionada aos serviços, história, operações, termos ou dinâmicas da AELO, responda EXATAMENTE com a seguinte frase: "Desculpe, sou Olea, a assistente virtual da AELO, e fui programada apenas para responder perguntas sobre a AELO - Sua Voz em Movimento. Para informações diversas, por favor, fale com um de nossos atendentes através do WhatsApp (14) 98115-0675 ou e-mail Aelobrasil@gmail.com."
    `;

    // Função para enviar mensagem ao chatbot
    const handleSendMessage = async (messageText, isOption = false) => {
        if (messageText.trim() === '') return;

        const newUserMessage = { sender: 'user', text: messageText };
        setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
        setCurrentInput('');
        setIsChatbotTyping(true);

        // Lógica para respostas específicas de opções
        let botResponseText = '';
        if (isOption) {
            switch (messageText) {
                case "O que é a AELO?":
                    botResponseText = "A AELO - Sua Voz em Movimento é uma empresa inovadora que oferece soluções de comunicação e logística sustentável, utilizando ciclistas equipados com sistemas de som para veicular mensagens em Bauru e cidades vizinhas. Nosso site oficial é https://aelo.vercel.app/. O dono da empresa é Arthur Hocc D'Mello.";
                    break;
                case "Quais são os preços dos planos?":
                    botResponseText = "AELO+ Cliente: R$ 6,00 por áudio. AELO Negócio (Em Fila): R$ 29,90. AELO Negócio (Particular): R$ 69,90. AELO Informações Públicas: R$ 49,90. O pagamento é via Pix para o CNPJ: 60.676.425/0001-47 (Titular: A A S Fernandes).";
                    break;
                case "Quais são os termos de uso?":
                    botResponseText = "Todos os áudios são moderados para garantir que sejam claros, objetivos e respeitosos. Conteúdos proibidos incluem má-fé, discriminação, discurso de ódio, conteúdo sexualmente explícito, informações falsas, e violação de direitos autorais. Não há reembolso após 30 minutos da confirmação do pagamento. O usuário é responsável pelo conteúdo enviado.";
                    break;
                case "Quais dinâmicas a AELO oferece?":
                    botResponseText = "Oferecemos várias dinâmicas! 'Achou um Áudio Conhecido?' (ganhe brinde ao encontrar um áudio), 'Ticket de até R$1000' (participe ao enviar áudio), 'O Áudio Misterioso' (desvende enigmas para prêmios), e 'Caça ao Tesouro Sonora' (siga pistas em áudio pela cidade).";
                    break;
                case "Falar com Humano":
                    botResponseText = "Entendido! Você pode entrar em contato diretamente com nossa equipe via WhatsApp no número (14) 98115-0675 ou por e-mail em Aelobrasil@gmail.com. Estamos prontos para ajudar!";
                    break;
                default:
                    // Se não for uma opção predefinida, use a API Gemini
                    await callGeminiAPI(messageText);
                    return;
            }
            setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
            setIsChatbotTyping(false);
        } else {
            // Se não for uma opção, chame a API Gemini
            await callGeminiAPI(messageText); // Corrigido para usar messageText
        }
    };

    const callGeminiAPI = async (query) => {
        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: aeloKnowledgeBase + "\n\nPergunta do usuário: " + query }] });
        const payload = { contents: chatHistory };
        const apiKey = ""; // Sua chave de API
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const MAX_RETRIES = 3;
        let retries = 0;
        let delay = 1000; // 1 second

        while (retries < MAX_RETRIES) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                // Clona a resposta para que possamos ler seu corpo várias vezes, se necessário
                const clonedResponse = response.clone();

                if (!response.ok) {
                    const errorBody = await clonedResponse.text(); // Lê do clone
                    console.error(`Erro HTTP: ${response.status} - ${errorBody}`);
                    throw new Error(`Erro HTTP: ${response.status} - ${errorBody}`);
                }

                let result;
                try {
                    result = await response.json(); // Tenta analisar como JSON
                } catch (jsonError) {
                    const rawText = await clonedResponse.text(); // Se a análise JSON falhar, lê como texto puro
                    console.error("Erro ao fazer parse do JSON da API:", jsonError);
                    console.error("Resposta bruta da API:", rawText);
                    throw new Error("Resposta da API não é um JSON válido: " + rawText.substring(0, 100) + "..."); // Trunca para o console
                }

                let botResponseText = "Desculpe, não consegui obter uma resposta no momento. Por favor, tente novamente mais tarde ou entre em contato via WhatsApp.";

                // Verifica se o resultado é válido e tem a estrutura esperada
                if (result && result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                    botResponseText = result.candidates[0].content.parts[0].text;
                } else {
                    console.warn("Resposta da API Gemini não contém o formato esperado de 'candidates'.", result);
                    botResponseText = "Desculpe, a resposta da API não está no formato esperado. Por favor, tente novamente ou reformule sua pergunta.";
                }

                setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponseText }]);
                break; // Sai do loop em caso de sucesso
            } catch (error) {
                console.error("Erro na chamada da API do chatbot (tentativa " + (retries + 1) + "):", error);
                retries++;
                if (retries < MAX_RETRIES) {
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2; // Backoff exponencial
                } else {
                    setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Ocorreu um erro ao processar sua solicitação após várias tentativas. Por favor, tente novamente mais tarde.' }]);
                }
            } finally {
                setIsChatbotTyping(false);
            }
        }
    };

    // Funções auxiliares para converter PCM para WAV
    const pcmToWav = (pcmData, sampleRate) => {
        const numChannels = 1;
        const bytesPerSample = 2;
        const blockAlign = numChannels * bytesPerSample;
        const byteRate = sampleRate * blockAlign;

        const buffer = new ArrayBuffer(44 + pcmData.length * bytesPerSample);
        const view = new DataView(buffer);

        // WAV header
        let offset = 0;
        const writeString = (str) => {
            for (let i = 0; i < str.length; i++) view.setUint8(offset++, str.charCodeAt(i));
        };
        const writeUint32 = (val) => { view.setUint32(offset, val, true); offset += 4; };
        const writeUint16 = (val) => { view.setUint16(offset, val, true); offset += 2; };

        writeString('RIFF');
        writeUint32(36 + pcmData.length * bytesPerSample);
        writeString('WAVE');
        writeString('fmt ');
        writeUint32(16);
        writeUint16(1);
        writeUint16(numChannels);
        writeUint32(sampleRate);
        writeUint32(byteRate);
        writeUint16(blockAlign);
        writeUint16(bytesPerSample * 8);
        writeString('data');
        writeUint32(pcmData.length * bytesPerSample);

        // PCM data
        for (let i = 0; i < pcmData.length; i++) {
            view.setInt16(offset, pcmData[i], true);
            offset += 2;
        }

        return new Blob([view], { type: 'audio/wav' });
    };

    const base64ToArrayBuffer = (base64) => {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };

    // Função genérica para gerar e tocar áudio de exemplo
    const generateAndPlayAudio = async (prompt, setAudioUrl, setIsLoading) => {
        setIsLoading(true);
        setAudioUrl('');
        console.log("Iniciando geração de áudio para:", prompt);

        try {
            const payload = {
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: "Puck" } // Usando a voz feminina "Puck"
                        }
                    }
                },
                model: "gemini-2.5-flash-preview-tts"
            };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

            console.log("Enviando payload para a API:", payload);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Erro HTTP: ${response.status} - ${errorBody}`);
            }

            const result = await response.json();
            console.log("Resposta da API recebida:", result);

            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const audioData = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType;

            console.log("Dados de áudio:", { audioData: audioData ? "presente" : "ausente", mimeType });

            if (audioData && mimeType && mimeType.startsWith("audio/")) {
                const sampleRateMatch = mimeType.match(/rate=(\d+)/);
                if (!sampleRateMatch) {
                    throw new Error("MimeType não contém sample rate.");
                }
                const sampleRate = parseInt(sampleRateMatch[1], 10);
                console.log("Sample Rate detectado:", sampleRate);

                const pcmData = base64ToArrayBuffer(audioData);
                const pcm16 = new Int16Array(pcmData);
                const wavBlob = pcmToWav(pcm16, sampleRate);
                const url = URL.createObjectURL(wavBlob);
                setAudioUrl(url);
                console.log("Áudio gerado e URL criada:", url);
            } else {
                console.error("Estrutura de resposta de áudio inválida ou dados ausentes.");
            }
        } catch (error) {
            console.error("Erro ao gerar áudio:", error);
        } finally {
            setIsLoading(false);
            console.log("Geração de áudio finalizada.");
        }
    };
    
    // Dados para os depoimentos (Aumentado para o carrossel)
    const testimonials = [
        {
            quote: "O pedido de casamento foi mágico! Ouvir minha voz ecoando na praça onde nos conhecemos... Inesquecível. AELO tornou tudo perfeito!",
            name: "Lucas M.",
            service: "AELO+ Cliente",
            icon: <Heart size={24} className={`text-${currentTheme.accent}-500`} />
        },
        {
            quote: "A inauguração da nossa cafeteria foi um sucesso! A propaganda na AELO atraiu muita gente do bairro. O retorno foi imediato e superou as expectativas.",
            name: "Juliana P.",
            service: "AELO Negócio",
            icon: <Briefcase size={24} className={`text-${currentTheme.accent}-500`} />
        },
        {
            quote: "Conseguimos muitos voluntários para nossa campanha de doação de agasalhos. AELO foi fundamental para espalhar a mensagem pela comunidade.",
            name: "ONG Mãos que Ajudam",
            service: "AELO Informações Públicas",
            icon: <Info size={24} className={`text-${currentTheme.primary}-500`} />
        },
        {
            quote: "Ouvir a voz dos meus filhos me parabenizando pelo meu aniversário enquanto eu caminhava na rua... me emocionei demais! Uma surpresa maravilhosa.",
            name: "Silvia R.",
            service: "AELO+ Cliente",
            icon: <Gift size={24} className={`text-${currentTheme.accent}-500`} />
        },
        {
            quote: "A veiculação da AELO divulgou nosso bazar de roupas usadas e superou as expectativas de público. Foi uma solução de baixo custo com um resultado incrível!",
            name: "Bazar da Ana",
            service: "AELO Negócio",
            icon: <DollarSign size={24} className={`text-${currentTheme.success}-500`} />
        },
        {
            quote: "Usamos a AELO para divulgar um evento de adoção de animais. O áudio com os latidos e miados chamou muita atenção e a maioria dos bichinhos encontrou um lar!",
            name: "Abrigo Patas Felizes",
            service: "AELO Informações Públicas",
            icon: <Heart size={24} className={`text-${currentTheme.error}-500`} />
        }
    ];

    // Lógica para o carrossel de depoimentos
    const nextTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };
    
    // Auto-play do carrossel a cada 5 segundos
    useEffect(() => {
        if (activePage === 'depoimentos') {
            const timer = setInterval(() => {
                nextTestimonial();
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [activePage, currentTestimonialIndex]);

    // Função para navegar entre as páginas
    const navigateTo = (page) => {
        setContentVisible(false); // Inicia a animação de saída
        setIsMenuOpen(false); // Fecha o menu ao navegar
        setTimeout(() => {
            setActivePage(page);
            setContentVisible(true); // Inicia a animação de entrada
        }, 300); // Tempo da animação
    };

    // Estado para o FAQ (mantidos)
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Função para copiar a chave Pix
    const copyPixKey = () => {
        const pixKey = '60.676.425/0001-47';
        document.execCommand('copy'); // Use document.execCommand('copy') para compatibilidade em iframes
        const tempInput = document.createElement('input');
        tempInput.value = pixKey;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setPixCopiedMessage('Chave Pix copiada!');
        setTimeout(() => setPixCopiedMessage(''), 3000);
    };

    // Função para lidar com o envio do formulário de contato (simulado)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('');

        // Simula um envio de API
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Aqui você integraria com um serviço de backend real (e.g., Firebase Functions, Formspree)
        // Por enquanto, apenas simula sucesso/erro
        if (Math.random() > 0.1) { // 90% de chance de sucesso
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
        <div className={`min-h-screen font-inter antialiased flex flex-col transition-colors duration-300 ${isDarkMode ? `dark bg-gray-900 text-${currentTheme.darkText}` : `bg-gray-100 text-${currentTheme.text}`}`}>
            {/* Header aprimorado */}
            <header className={`bg-gradient-to-r from-black to-${currentTheme.primary}-600 text-white p-6 shadow-xl rounded-b-3xl relative text-center`}>
                <div className="container mx-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`absolute top-6 left-6 p-2 rounded-full bg-black text-white z-50 hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white`}
                        aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <h1 className="text-6xl md:text-7xl font-extrabold mb-1 animate-fade-in-down drop-shadow-lg">
                        AELO
                    </h1>
                    <p className={`text-xl md:text-2xl font-semibold flex items-center justify-center gap-2 animate-fade-in-down delay-200 text-shadow-sm text-${currentTheme.accent}-300`}>
                        Sua Voz em Movimento
                        <Bike size={28} className={`text-${currentTheme.accent}-300 transform transition-transform duration-300 hover:rotate-[360deg]`} />
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
            <nav className={`fixed inset-y-0 left-0 p-6 shadow-xl z-50 w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-full ${isDarkMode ? `bg-gray-700 hover:bg-gray-600 text-${currentTheme.darkText}` : `bg-gray-200 hover:bg-gray-300 text-${currentTheme.text}`} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                        aria-label={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
                    >
                        {isDarkMode ? <Sun size={24} className={`text-${currentTheme.accent}-400`} /> : <Moon size={24} className={`text-${currentTheme.text}`} />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className={`p-2 rounded-full ${isDarkMode ? `bg-gray-700 hover:bg-gray-600 text-${currentTheme.darkText}` : `bg-gray-200 hover:bg-gray-300 text-${currentTheme.text}`} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400`}
                        aria-label="Fechar menu de navegação"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('home')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'home' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Home size={20} /> Início</button>
                    <button onClick={() => navigateTo('categorias')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'categorias' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Briefcase size={20} /> Categorias</button>
                    <button onClick={() => navigateTo('porque-aelo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'porque-aelo' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Lightbulb size={20} /> Por Que AELO?</button>
                    <button onClick={() => navigateTo('comparativo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'comparativo' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Scale size={20} /> AELO vs. Tradicionais</button>
                    <button onClick={() => navigateTo('depoimentos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'depoimentos' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Quote size={20} /> Depoimentos</button>
                    <button onClick={() => navigateTo('dinamicas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'dinamicas' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Trophy size={20} /> Dinâmicas</button>
                    <button onClick={() => navigateTo('temporadas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'temporadas' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><CalendarDays size={20} /> Temporadas</button>
                    <button onClick={() => navigateTo('precos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'precos' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><DollarSign size={20} /> Preços</button>
                    <button onClick={() => navigateTo('como-enviar')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'como-enviar' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:bg-${currentTheme.primary}-100`}`}`}><Send size={20} /> Como Enviar Áudios</button>
                    <button onClick={() => navigateTo('aelo-em-acao')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'aelo-em-acao' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><Sparkles size={20} /> AELO em Ação</button> {/* Nova Aba */}
                    {/* Nova aba "Seu AELO" */}
                    <button onClick={() => navigateTo('seu-aelo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'seu-aelo' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><Palette size={20} /> Seu AELO</button>
                    <button onClick={() => navigateTo('simular-assinatura')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'simular-assinatura' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><Calculator size={20} /> Simulador de Assinatura</button> {/* Nova Aba */}
                    <button onClick={() => navigateTo('blog')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'blog' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><Rss size={20} /> Blog/Notícias</button> {/* Nova Aba */}
                    {/* Alterado para navegar para a página "Trabalhe Conosco" */}
                    <button onClick={() => navigateTo('trabalhe-conosco')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'trabalhe-conosco' ? `bg-${currentTheme.primary}-600 text-white shadow-md animate-pulse` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><BriefcaseBusiness size={20} /> Trabalhe Conosco</button>
                    <button onClick={() => navigateTo('compromisso-sustentavel')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'compromisso-sustentavel' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><Leaf size={20} /> Compromisso Sustentável</button> {/* Nova Aba */}
                    <button onClick={() => navigateTo('faq')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'faq' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><Info size={20} /> FAQ</button>
                    <button onClick={() => navigateTo('termos-condicoes')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'termos-condicoes' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><FileText size={20} /> Termos</button>
                    <button onClick={() => navigateTo('contato')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'contato' ? `bg-${currentTheme.primary}-600 text-white shadow-md` : `${isDarkMode ? `bg-gray-700 text-gray-100 hover:bg-${currentTheme.primary}-800` : `bg-gray-100 text-gray-800 hover:hover:bg-${currentTheme.primary}-100`}`}`}><MessageSquare size={20} /> Contato</button>
                </div>
            </nav>
            
            {/* Botões Flutuantes Enfileirados e Condicionais */}
            <div className={`fixed bottom-24 left-6 z-50 flex flex-col items-start space-y-2 transition-all duration-300 ${activePage !== 'home' ? 'scale-75 opacity-70' : ''}`}>
                {/* Floating Chatbot */}
                <button
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                    className={`p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center ${activePage !== 'home' ? 'p-2 text-sm animate-pulse' : 'p-4'} ${isDarkMode ? `bg-${currentTheme.primary}-700 text-white` : `bg-${currentTheme.primary}-500 text-white`}`}
                    aria-label="Abrir Chatbot"
                    title="Abrir Chatbot"
                >
                    <MessageCircle size={activePage !== 'home' ? 20 : 32} />
                </button>

                {/* Floating WhatsApp */}
                <a
                    href="https://wa.me/5514981150675"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center ${activePage !== 'home' ? 'p-2 text-sm animate-pulse' : 'p-4'} bg-green-500 text-white`}
                    aria-label="Fale Conosco no WhatsApp"
                    title="Fale Conosco no WhatsApp"
                >
                    <MessageSquare size={activePage !== 'home' ? 20 : 32} />
                </a>

                {/* Fixed "Envie seu Áudio" Button */}
                <button
                    onClick={() => setShowSendAudioModal(true)}
                    className={`p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center font-bold ${activePage !== 'home' ? 'p-2 text-sm animate-pulse' : 'p-4 text-lg'} ${isDarkMode ? `bg-${currentTheme.accent}-500 text-gray-900` : `bg-${currentTheme.accent}-400 text-gray-900`}`}
                    aria-label="Envie seu Áudio"
                    title="Envie seu Áudio"
                >
                    <Mic size={activePage !== 'home' ? 16 : 24} className={activePage !== 'home' ? 'mr-0' : 'mr-2'} />
                    {activePage === 'home' && "Envie seu Áudio"}
                </button>
            </div>

            {/* Janela do Chatbot */}
            {isChatbotOpen && (
                <div className={`fixed bottom-80 left-6 w-80 h-96 rounded-lg shadow-2xl z-60 flex flex-col transition-all duration-300 transform ${isChatbotOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`p-3 rounded-t-lg flex justify-between items-center ${isDarkMode ? `bg-${currentTheme.primary}-700 text-white` : `bg-${currentTheme.primary}-600 text-white`}`}>
                        <h3 className="font-bold">Chat AELO</h3>
                        <button onClick={() => setIsChatbotOpen(false)} className={`p-1 rounded-full hover:bg-${currentTheme.primary}-700 transition-colors`}>
                            <X size={20} />
                        </button>
                    </div>
                    <div ref={chatContainerRef} className={`flex-grow p-4 overflow-y-auto space-y-3 ${isDarkMode ? `text-${currentTheme.darkText}` : `text-${currentTheme.text}`}`}>
                        {chatMessages.map((msg, index) => (
                            <div key={index}>
                                {msg.sender === 'user' && (
                                    <div className="flex justify-end">
                                        <div className={`max-w-[75%] p-2 rounded-lg ${isDarkMode ? `bg-${currentTheme.primary}-600 text-white` : `bg-${currentTheme.primary}-500 text-white`}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                )}
                                {msg.sender === 'bot' && (
                                    <div className="flex justify-start">
                                        <div className={`max-w-[75%] p-2 rounded-lg ${isDarkMode ? `bg-gray-700 text-gray-200` : `bg-gray-200 text-gray-800`}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                )}
                                {msg.sender === 'options' && (
                                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                                        {msg.options.map((option, optIndex) => (
                                            <button
                                                key={optIndex}
                                                onClick={() => handleSendMessage(option.query, true)}
                                                className={`px-3 py-1 bg-${currentTheme.primary}-600 text-white rounded-full text-sm hover:bg-${currentTheme.primary}-700 transition-colors`}
                                            >
                                                {option.text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isChatbotTyping && (
                            <div className="flex justify-start">
                                <div className={`max-w-[75%] p-2 rounded-lg ${isDarkMode ? `bg-gray-700 text-gray-200` : `bg-gray-200 text-gray-800`}`}>
                                    <span className="animate-pulse">Digitando...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={`p-3 border-t flex ${isDarkMode ? `border-gray-700` : `border-gray-200`}`}>
                        <input
                            type="text"
                            placeholder="Digite sua mensagem..."
                            className={`flex-grow p-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? `bg-gray-700 border-gray-600 text-${currentTheme.darkText}` : `bg-white border-gray-300 text-${currentTheme.text}`}`}
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(currentInput); }}
                            disabled={isChatbotTyping}
                        />
                        <button
                            onClick={() => handleSendMessage(currentInput)}
                            className={`p-2 bg-${currentTheme.primary}-600 text-white rounded-r-lg hover:bg-${currentTheme.primary}-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={isChatbotTyping}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Envio de Áudio */}
            {showSendAudioModal && <SendAudioModal onClose={() => setShowSendAudioModal(false)} navigateTo={navigateTo} />}

            {/* Conteúdo Principal */}
            <main className="p-4 md:p-8 flex-grow pb-28"> {/* Adicionado pb-28 para dar espaço aos botões flutuantes */}
                <div key={activePage} className={`relative z-10 transition-opacity duration-300 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {activePage === 'home' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 text-center animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3">Bem-vindo(a) à AELO!</h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO, sua voz ganha asas e pedala pela cidade, criando conexões inesquecíveis. Transformamos mensagens em experiências sonoras que ecoam pelas ruas, alcançando corações e mentes.</p>
                            <p className={`text-lg mb-8 leading-relaxed flex items-center justify-center gap-2 text-${currentTheme.accent}-500`}>
                                <Mic size={28} className={`text-${currentTheme.accent}-500`} />
                                <span className="font-semibold">Bauru & Região</span>
                            </p>
                            <div className={`p-4 rounded-lg font-semibold flex items-center justify-center gap-2 border shadow-sm ${isDarkMode ? `bg-${currentTheme.primary}-900 text-${currentTheme.primary}-300 border-${currentTheme.primary}-700` : `bg-${currentTheme.primary}-100 text-${currentTheme.primary}-800 border-${currentTheme.primary}-200`}`}>
                                <Info size={20} />
                                Fique de olho nas nossas Temporadas Temáticas para uma conexão ainda mais profunda com o público! Explore a aba "Temporadas" e saiba como sua voz pode se encaixar perfeitamente no momento.
                            </div>
                        </div>
                    )}

                    {activePage === 'categorias' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                             <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Nossas Categorias de Serviço: Conecte-se de Forma Única <Users size={32} /></h2>
                             <p className="text-lg mb-6 leading-relaxed">Oferecemos soluções personalizadas para cada tipo de mensagem, garantindo que sua voz alcance o coração certo. Escolha a que mais ressoa com sua intenção:</p>
                             <div className={`category-box border p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200`}`}>
                                 <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><Heart size={24} /> AELO+ Cliente: Emoção que Pedala</h3>
                                 <p className="leading-relaxed">A categoria mais pessoal e emocionante, perfeita para momentos que merecem ser eternizados:</p>
                                 <ul className="list-disc list-inside space-y-2 mt-2">
                                     <li>Declarações de Amor: Um pedido de casamento inesquecível, uma homenagem tocante.</li>
                                     <li>Feliz Aniversário Inesquecível: Sua voz, suas risadas, suas memórias mais queridas.</li>
                                     <li>Palavras Amigas/Apoio: Conforto, incentivo e carinho em momentos cruciais.</li>
                                     <li>Pedidos de Desculpas Sinceros: A emoção da sua voz para a reconciliação.</li>
                                     <li>Celebração de Conquistas: Formaturas, novos empregos, vitórias que merecem ser celebradas em alto e bom som.</li>
                                 </ul>
                                 <p className="mt-4 leading-relaxed">Como funciona: Grave seu áudio com o coração (seu celular é perfeito!), envie para a AELO e nós o veiculamos com carinho. Simples e impactante!</p>
                                 <div className={`mt-4 p-4 rounded-lg shadow-inner text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                    <h4 className="font-semibold text-lg mb-2">Exemplo de Áudio:</h4>
                                    {clientAudioUrl ? (
                                        <audio controls src={clientAudioUrl} className="w-full"></audio>
                                    ) : (
                                        <button
                                            onClick={() => generateAndPlayAudio("Feliz aniversário, meu amor! Que o seu dia seja tão incrível quanto você. Te amo!", setClientAudioUrl, setIsClientAudioLoading)}
                                            className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-${currentTheme.primary}-500 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                                            disabled={isClientAudioLoading}
                                        >
                                            {isClientAudioLoading ? (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <PlayCircle size={22} />
                                            )}
                                            {isClientAudioLoading ? "Gerando..." : "Ouvir Exemplo"}
                                        </button>
                                    )}
                                </div>
                             </div>
                             <div className={`category-box border p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200`}`}>
                                 <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><Briefcase size={24} /> AELO Negócio: Sua Marca em Movimento</h3>
                                 <p className="leading-relaxed">A publicidade que o seu negócio precisa para se destacar na paisagem urbana. Ideal para:</p>
                                 <ul className="list-disc list-inside space-y-2 mt-2">
                                     <li>Anunciar Promoções Irresistíveis: Ofertas relâmpago, cupons de desconto que chamam a atenção.</li>
                                     <li>Inaugurações Memoráveis: Divulgar a abertura da sua loja ou serviço de forma criativa.</li>
                                     <li>Eventos Vibrantes: Convidar para feiras, workshops, espetáculos que não podem ser perdidos.</li>
                                     <li>Lançamento de Produtos Inovadores: Apresentar novidades ao público de forma dinâmica.</li>
                                 </ul>
                                 <p className="mt-4 leading-relaxed">É a solução ideal para pequenos e médios empreendedores que buscam um alcance direcionado, criativo e que realmente se conecta com a cidade.</p>
                                 <div className={`mt-4 p-4 rounded-lg shadow-inner text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                    <h4 className="font-semibold text-lg mb-2">Exemplo de Áudio:</h4>
                                    {businessAudioUrl ? (
                                        <audio controls src={businessAudioUrl} className="w-full"></audio>
                                    ) : (
                                        <button
                                            onClick={() => generateAndPlayAudio("Atenção, Bauru! A nova loja de doces 'Delícias da Vovó' acaba de abrir na Rua XV de Novembro, 123. Venha provar os nossos bolos caseiros, tortas frescas e doces artesanais. Delícias da Vovó, o sabor da tradição em cada mordida.", setBusinessAudioUrl, setIsBusinessAudioLoading)}
                                            className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-${currentTheme.primary}-500 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                                            disabled={isBusinessAudioLoading}
                                        >
                                            {isBusinessAudioLoading ? (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <PlayCircle size={22} />
                                            )}
                                            {isBusinessAudioLoading ? "Gerando..." : "Ouvir Exemplo"}
                                        </button>
                                    )}
                                </div>
                             </div>
                             <div className={`category-box border p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200`}`}>
                                 <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><Info size={24} /> AELO Informações Públicas: Ecoando Boas Causas</h3>
                                 <p className="leading-relaxed">Uma categoria dedicada a amplificar causas sociais e avisos comunitários importantes. Use a AELO para:</p>
                                 <ul className="list-disc list-inside space-y-2 mt-2">
                                     <li>Campanhas de Conscientização: Saúde, meio ambiente, segurança, e tudo que importa para a comunidade.</li>
                                     <li>Eventos Beneficentes: Divulgar ações de ONGs, pedidos de voluntários, e iniciativas solidárias.</li>
                                     <li>Avisos Comunitários: Informações cruciais para o bairro ou cidade, entregues de forma eficiente.</li>
                                 </ul>
                                 <p className="mt-4 leading-relaxed">Fazer o bem também tem voz, e a AELO está aqui para amplificar sua mensagem social, alcançando quem mais precisa.</p>
                                 <div className={`mt-4 p-4 rounded-lg shadow-inner text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                    <h4 className="font-semibold text-lg mb-2">Exemplo de Áudio:</h4>
                                    {publicAudioUrl ? (
                                        <audio controls src={publicAudioUrl} className="w-full"></audio>
                                    ) : (
                                        <button
                                            onClick={() => generateAndPlayAudio("A ONG 'Amigos do Bairro' convida a todos para o nosso evento de doação de agasalhos neste sábado na praça central. Contamos com a sua colaboração para aquecer o inverno de quem mais precisa. Juntos, fazemos a diferença!", setPublicAudioUrl, setIsPublicAudioLoading)}
                                            className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-${currentTheme.primary}-500 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                                            disabled={isPublicAudioLoading}
                                        >
                                            {isPublicAudioLoading ? (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <PlayCircle size={22} />
                                            )}
                                            {isPublicAudioLoading ? "Gerando..." : "Ouvir Exemplo"}
                                        </button>
                                    )}
                                </div>
                             </div>
                        </div>
                    )}

                    {activePage === 'porque-aelo' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                             <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Por Que Escolher a AELO? A Diferença que Você Ouve! <Star size={32} /></h2>
                             <p className="text-lg mb-6 leading-relaxed">A AELO - Sua Voz em Movimento vai além da publicidade; é uma experiência sonora que cativa. Descubra os diferenciais que nos tornam a escolha perfeita para sua mensagem:</p>
                             <ul className="space-y-4">
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className={`text-${currentTheme.primary}-600 mt-1`} />
                                     <div>
                                         <h3 className="text-xl font-semibold">Alcance Hiperlocal e Dinâmico</h3>
                                         <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Sua mensagem em movimento, alcançando ruas, bairros e públicos específicos com precisão e energia. Não é um anúncio parado, é uma voz que se integra ao ritmo da cidade.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className={`text-${currentTheme.primary}-600 mt-1`} />
                                     <div>
                                         <h3 className="text-xl font-semibold">Engajamento Inovador e Memorável</h3>
                                         <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Em um mundo de distrações visuais, o som inesperado de uma bicicleta captura a atenção e gera curiosidade genuína. Sua mensagem é ouvida em média 10 vezes por ciclo de veiculação, garantindo que ela seja fixada na mente.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className={`text-${currentTheme.primary}-600 mt-1`} />
                                     <div>
                                         <h3 className="text-xl font-semibold">Qualidade Sonora e Conteúdo Moderado</h3>
                                         <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Todos os áudios passam por um rigoroso processo de moderação. Garantimos clareza, objetividade e a melhor qualidade de som, para que sua mensagem chegue perfeita e sem ruídos indesejados, transmitindo profissionalismo e cuidado.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className={`text-${currentTheme.primary}-600 mt-1`} />
                                     <div>
                                         <h3 className="text-xl font-semibold">Sustentabilidade e Imagem Positiva</h3>
                                         <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Nossa publicidade é "verde" de verdade! Ao usar bicicletas, promovemos um marketing ecológico e associamos sua marca a valores de responsabilidade ambiental, saúde e inovação consciente.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-400 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className={`text-${currentTheme.primary}-600 mt-1`} />
                                     <div>
                                         <h3 className="text-xl font-semibold">A Magia da Conexão Humana</h3>
                                         <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Não é apenas um som; é uma voz levada por um ciclista, uma pessoa real que interage com a cidade. Essa presença humana cria uma conexão mais autêntica e emocional com quem ouve, tornando sua mensagem inesquecível e humana.</p>
                                     </div>
                                 </li>
                             </ul>
                        </div>
                    )}
                    
                    {/* Página de Comparativo */}
                    {activePage === 'comparativo' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                AELO vs. Veiculadores Tradicionais: A Evolução da Sua Voz! <Scale size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                No cenário da publicidade e comunicação, a escolha do método de veiculação faz toda a diferença. Compare a abordagem inovadora da AELO - Sua Voz em Movimento com os tradicionais carros de som e descubra por que somos a melhor opção para sua mensagem.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Coluna AELO */}
                                <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                    <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-4 flex items-center gap-2`}>
                                        <Bike size={28} /> AELO: Sua Voz em Movimento
                                    </h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <h4 className="font-bold text-lg">Facilidade e Estilo Facilitado:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Você tem o control total do seu marketing. Grave seu áudio com o celular, envie para nós e pronto! Simples, rápido e sem burocracia.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Preços e Economia Incomparáveis:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Nossos preços começam em apenas <span className={`font-semibold text-${currentTheme.success}-600`}>R$ 6,00</span> por áudio, com veiculação o dia inteiro (das 8h às 18h). Um custo-benefício que os veiculadores tradicionais não conseguem igualar.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Categorias Diversificadas e Humanizadas:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Além de anúncios para negócios, oferecemos as categorias AELO+ Cliente (para mensagens pessoais e emocionantes) e AELO Informações Públicas (para causas humanitárias e comunitárias). Levamos sua voz para quem mais precisa, de forma autêntica e impactante.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Maior Alcance e Mais Rápido:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Nossos ciclistas atendem toda a cidade de Bauru e região, alcançando áreas específicas com agilidade e dinamismo. Sua mensagem não fica presa a uma rota fixa, ela se move com a cidade.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Conexão Humana e Engajamento:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>A presença do ciclista cria uma interação mais genuína. O som inesperado da bicicleta com sua mensagem gera curiosidade e memorização, destacando-se no ambiente urbano.</p>
                                        </li>
                                    </ul>
                                </div>

                                {/* Coluna Veiculadores Tradicionais */}
                                <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                    <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-4 flex items-center gap-2`}>
                                        <Volume2 size={28} /> Carros de Som: O Passado da Veiculação
                                    </h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <h4 className="font-bold text-lg">Custo Elevado por Pouco Serviço:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Os carros de som geralmente cobram muito mais por um serviço com alcance limitado e menos flexibilidade, tornando-o menos acessível para pequenos empreendedores e mensagens pessoais.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Alcance Limitado e Menos Dinâmico:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Ficam restritos a rotas pré-definidas e horários fixos, perdendo a oportunidade de alcançar públicos em áreas de grande fluxo que mudam ao longo do dia.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Menos Engajamento:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>A presença constante e por vezes intrusiva pode levar à saturação e à ignorância por parte do público, que já está acostumado com esse tipo de anúncio.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Foco Exclusivo em Publicidade Comercial:</h4>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Geralmente, não oferecem opções para mensagens pessoais, declarações ou campanhas humanitárias, limitando o tipo de comunicação que pode ser veiculada.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-lg text-center leading-relaxed mt-8 flex items-center justify-center gap-2">
                                Escolha a AELO - Sua Voz em Movimento e leve sua voz para o futuro, com mais impacto, economia e conexão humana!
                            </p>
                        </div>
                    )}

                    {activePage === 'depoimentos' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                Histórias de Sucesso AELO: A Voz dos Nossos Clientes <Quote size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Nada fala mais alto sobre nosso impacto do que as histórias de quem confiou sua voz à AELO - Sua Voz em Movimento. Veja como transformamos mensagens em momentos inesquecíveis e resultados concretos.
                            </p>
                            
                            {/* Carrossel de depoimentos */}
                            <div className="relative">
                                <div className={`p-6 rounded-lg border-l-4 border-${currentTheme.primary}-600 transform transition-all duration-300 ease-in-out shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Quote size={32} className={`text-${currentTheme.primary}-300 mb-4`} />
                                    <p key={currentTestimonialIndex} className="text-lg italic leading-relaxed mb-4 animate-fade-in-up">"{testimonials[currentTestimonialIndex].quote}"</p>
                                    <div className="flex items-center justify-end gap-4">
                                        <div className="text-right">
                                            <p className="font-bold">{testimonials[currentTestimonialIndex].name}</p>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`} text-sm`}>{testimonials[currentTestimonialIndex].service}</p>
                                        </div>
                                        <div className={`p-3 rounded-full shadow-inner ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                            {testimonials[currentTestimonialIndex].icon}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Botões de navegação */}
                                <button
                                    onClick={prevTestimonial}
                                    className={`absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white'}`}
                                    aria-label="Depoimento anterior"
                                >
                                    <ChevronLeft size={24} className={`${isDarkMode ? `text-gray-400` : `text-gray-600`}`} />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className={`absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white'}`}
                                    aria-label="Próximo depoimento"
                                >
                                    <ChevronRight size={24} className={`${isDarkMode ? `text-gray-400` : `text-gray-600`}`} />
                                </button>
                            </div>
                            
                            {/* Indicadores de posição (dots) */}
                            <div className="flex justify-center items-center gap-2 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                    onClick={() => setCurrentTestimonialIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonialIndex === index ? `bg-${currentTheme.primary}-600` : `${isDarkMode ? `bg-gray-600 hover:bg-gray-500` : `bg-gray-300 hover:bg-gray-400`}`}`}
                                        aria-label={`Ir para o depoimento ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'dinamicas' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Dinâmicas AELO: Sua Chance de Brilhar e Ganhar! <Trophy size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO - Sua Voz em Movimento, a interação e a recompensa são parte da nossa essência. Participe das nossas dinâmicas exclusivas e transforme sua experiência em algo ainda mais emocionante e recompensador!</p>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? `bg-gray-700 border-${currentTheme.warning}-600 border` : `bg-${currentTheme.warning}-50 border-${currentTheme.warning}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.warning}-600 mb-3 flex items-center gap-2`}><Mic size={24} /> Achou um Áudio Conhecido? Surpreenda-se!</h3>
                                <p className="leading-relaxed">Você ouviu um áudio da AELO - Sua Voz em Movimento que reconheceu? Talvez seja a voz de um amigo, um familiar ou até a sua própria mensagem ecoando pela cidade!</p>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Grave um vídeo do ciclista AELO veiculando o áudio.</li>
                                    <li>Marque a AELO no seu Instagram <span className={`font-semibold text-${currentTheme.primary}-600`}>@Aelovoz</span>.</li>
                                    <li>Envie o vídeo para nós via direct, informando o nome da pessoa dona da voz e o endereço aproximado de onde a ouviu.</li>
                                </ul>
                                <p className={`mt-4 leading-relaxed flex items-center gap-2`}>Nossa equipe verificará a solicitação e, se confirmado, faremos a entrega de um brinde surpresa e exclusivo para a pessoa dona da voz! Uma emoção em dobro! <Award size={20} className={`text-${currentTheme.warning}-600`}/></p>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><DollarSign size={24} /> Ticket de até R$1000: Sua Voz Vale Ouro!</h3>
                                <p className="leading-relaxed">Ao enviar qualquer áudio para veiculação com a AELO - Sua Voz em Movimento (seja AELO+ Cliente, Negócio ou Informações Públicas), você automaticamente participa de uma dinâmica especial que pode te garantir um ticket valioso de até R$1000,00!</p>
                                <p className={`mt-4 leading-relaxed flex items-center gap-2`}>Sua voz não só emociona ou divulga, mas também pode te render um grande prêmio. É a AELO - Sua Voz em Movimento recompensando sua confiança e criatividade! <Trophy size={20} className={`text-${currentTheme.primary}-600`}/></p>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><Search size={24} /> O Áudio Misterioso: Desvende o Enigma!</h3>
                                <p className="leading-relaxed">Fique atento(a)! Periodicamente, veicularemos um "Áudio Misterioso". Ouça com atenção, desvende o enigma e envie sua resposta para a AELO - Sua Voz em Movimento para ganhar prêmios!</p>
                                <div className="mt-4 text-center">
                                    <button onClick={playMysterySound} className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-${currentTheme.primary}-500 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-600 transform hover:scale-105 transition-all duration-300`}>
                                        <PlayCircle size={22} /> Ouvir o Áudio Misterioso
                                    </button>
                                </div>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 ${isDarkMode ? `bg-gray-700 border-${currentTheme.success}-600 border` : `bg-${currentTheme.success}-50 border-${currentTheme.success}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.success}-600 mb-3 flex items-center gap-2`}><MapPin size={24} /> Caça ao Tesouro Sonora: Aventura Urbana!</h3>
                                <p className="leading-relaxed">Prepare-se para uma aventura! Em dias específicos, nossos ciclistas veiculam pistas em áudio, transformando a cidade em um grande jogo. Siga as pistas para encontrar o tesouro!</p>
                                <div className={`flex justify-center items-center gap-4 mt-4 text-${currentTheme.success}-400`}>
                                    <Search size={28} />
                                    <span className="text-2xl font-mono">→</span>
                                    <Bike size={28} />
                                    <span className="text-2xl font-mono">→</span>
                                    <Gift size={32} className={`text-${currentTheme.success}-600`} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'temporadas' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Temporadas AELO: Conecte-se com o Momento e Amplifique Sua Mensagem! <CalendarDays size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO - Sua Voz em Movimento, acreditamos que sua mensagem ganha ainda mais força quando está em sintonia com o espírito do momento. Por isso, operamos em "Temporadas" temáticas, que permitem uma conexão mais profunda e relevante com o público da cidade.</p>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><Volume2 size={24} /> Como Funcionam as Temporadas AELO?</h3>
                                <p className="leading-relaxed">Cada temporada tem um tema central cuidadosamente escolhido, que reflete eventos, sentimentos ou celebrações do período. Isso nos permite criar um ambiente sonoro na cidade que ressoa diretamente com o que as pessoas estão vivenciando e sentindo.</p>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Mensagens de amor e carinho podem ter um destaque especial na "Temporada Áudio do Coração".</li>
                                    <li>Campanhas de sustentabilidade e bem-estar brilham na "Temporada Áudio Verde".</li>
                                    <li>Anúncios de eventos e promoções ganham ainda mais visibilidade na "Temporada Áudio Ação".</li>
                                    <li>Anúncios de eventos e promoções ganham ainda mais visibilidade na "Temporada Áudio Ação".</li>
                                </ul>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><Leaf size={24} /> Exemplos de Temporadas Anteriores e Futuras</h3>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Temporada Áudio Verde: Foco em sustentabilidade, meio ambiente, vida saudável e bem-estar.</li>
                                    <li>Temporada Áudio do Coração: Celebração do amor, amizade, gratidão e conexões humanas.</li>
                                    <li>Temporada Áudio Ação: Impulso para o comércio local, grandes eventos, lançamentos e novidades.</li>
                                    <li>Temporada Áudio Festas: Mensagens especiais para datas comemorativas e celebrações.</li>
                                </ul>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}><RefreshCcw size={24} /> Como Participar e Potencializar Sua Mensagem</h3>
                                <p className="leading-relaxed">Para participar e maximizar o impacto, basta alinhar o conteúdo do seu áudio com o tema da temporada vigente. Embora não seja obrigatório, essa sintonia potencializa a ressonância da sua mensagem com o público.</p>
                            </div>
                        </div>
                    )}

                    {activePage === 'precos' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Invista em Emoção: Nossos Planos AELO! <DollarSign size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO - Sua Voz em Movimento, acreditamos que a publicidade de impacto e as mensagens que tocam o coração devem ser acessíveis. Nossos preços são pensados para oferecer o melhor custo-benefício e levar sua voz ainda mais longe.</p>
                            <div className={`price-card border p-6 rounded-lg shadow-md mb-6 text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center justify-center gap-2`}><Heart size={28} /> AELO+ Cliente: Sua Mensagem Pessoal</h3>
                                <p className="text-3xl font-bold mb-2">R$ 6,00</p>
                                <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>por áudio (reproduzido o dia inteiro)</p>
                                <p className="mt-4 leading-relaxed">Sua mensagem pessoal e emocionante veiculada para aquela pessoa especial durante todo o dia, criando um momento inesquecível.</p>
                            </div>
                            <div className={`price-card border p-6 rounded-lg shadow-md mb-6 text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center justify-center gap-2`}><Briefcase size={28} /> AELO Negócio: Publicidade com Alma</h3>
                                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mt-4">
                                    <div className="flex-1">
                                        <p className="text-2xl font-bold mb-1">Em Fila</p>
                                        <p className="text-3xl font-bold mb-2">R$ 29,90</p>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>o dia todo</p>
                                        <p className="mt-2 text-sm leading-relaxed">Seu áudio será reproduzido na fila de propagandas do dia, uma após a outra, garantindo visibilidade contínua.</p>
                                    </div>
                                    <div className={`flex-1 border-t md:border-t-0 md:border-l ${isDarkMode ? `border-gray-600` : `border-${currentTheme.primary}-300`} pt-4 md:pt-0 md:pl-6`}>
                                        <p className="text-2xl font-bold mb-1">Particular</p>
                                        <p className="text-3xl font-bold mb-2">R$ 69,90</p>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>o dia todo</p>
                                        <p className="mt-2 text-sm leading-relaxed">Apenas o áudio da sua empresa será reproduzido durante todo o dia, proporcionando exclusividade e máximo impacto.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`price-card border p-6 rounded-lg shadow-md text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center justify-center gap-2`}><Info size={28} /> AELO Informações Públicas: Voz para o Bem</h3>
                                <p className="text-3xl font-bold mb-2">R$ 49,90</p>
                                <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>por áudio o dia todo</p>
                                <p className="mt-4 leading-relaxed">Amplifique causas sociais e avisos comunitários, com sua mensagem em destaque o dia inteiro, gerando impacto positivo na comunidade.</p>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mt-8 text-center animate-fade-in-up delay-300 ${isDarkMode ? `bg-gray-700 border-${currentTheme.success}-600 border` : `bg-${currentTheme.success}-50 border-${currentTheme.success}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.success}-600 mb-3 flex items-center justify-center gap-2`}><DollarSign size={28} /> Pagamento Simples via Pix</h3>
                                <p className="text-xl font-bold mb-2">Chave Pix (CNPJ): <span className={`font-semibold text-${currentTheme.primary}-600`}>60.676.425/0001-47</span></p>
                                <p className="text-lg mb-2">Titular: A A S Fernandes</p>
                                <button onClick={copyPixKey} className={`inline-flex items-center justify-center px-6 py-3 bg-${currentTheme.primary}-600 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-700 transform hover:scale-105 transition-all duration-300 gap-2 mt-4`} aria-label="Copiar chave Pix"><Copy size={20} /> Copiar Chave Pix</button>
                                {pixCopiedMessage && (<p className={`text-${currentTheme.success}-500 mt-2 text-sm font-semibold animate-fade-in-up`}>{pixCopiedMessage}</p>)}
                                <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`} leading-relaxed mt-4`}>Dica: Copie a chave Pix acima e realize o pagamento. Após a transação, envie o comprovante para nós via WhatsApp ou Instagram <span className={`font-semibold text-${currentTheme.primary}-600`}>@Aelovoz</span> para agilizar a veiculação do seu áudio!</p>
                            </div>
                            <p className="text-lg text-center leading-relaxed mt-8 flex items-center justify-center gap-2">Pronto para levar sua voz em movimento? Fale conosco agora mesmo para um orçamento personalizado! <MessageSquare size={20} /></p>
                        </div>
                    )}

                    {activePage === 'como-enviar' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Como Enviar Seus Áudios para a AELO: Simples e Rápido! <Send size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Levar sua mensagem para as ruas com a AELO é um processo descomplicado. Siga estes passos e veja sua voz ganhar vida:</p>
                            <div className="space-y-6 text-left">
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className={`flex-shrink-0 w-8 h-8 bg-${currentTheme.primary}-600 text-white rounded-full flex items-center justify-center text-lg font-bold`}>1</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><Mic size={20} /> Grave Seu Áudio com Qualidade e Duração Ideal</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Use seu celular, computador ou qualquer dispositivo para gravar a mensagem que deseja veicular. A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                                        <ul className={`list-disc list-inside ${isDarkMode ? `text-gray-300` : `text-gray-600`} space-y-1 mt-2`}>
                                            <li><span className={`font-semibold text-${currentTheme.primary}-700`}>AELO+ Cliente (Pessoais):</span> 15 a 20 segundos.</li>
                                            <li><span className={`font-semibold text-${currentTheme.primary}-700`}>AELO Negócio:</span> 30 segundos a 1 minuto.</li>
                                            <li><span className={`font-semibold text-${currentTheme.primary}-700`}>AELO Informações Públicas:</span> 30 segundos a 1 minuto e 30 segundos.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className={`flex-shrink-0 w-8 h-8 bg-${currentTheme.primary}-600 text-white rounded-full flex items-center justify-center text-lg font-bold`}>2</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><Upload size={20} /> Envie o Áudio para a AELO</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Após a gravação, envie seu áudio diretamente para a nossa equipe. Você pode fazer isso de forma muito prática pelo nosso WhatsApp ou via Direct do Instagram <span className={`font-semibold text-${currentTheme.primary}-600`}>@Aelovoz</span>. Escolha o canal que for mais conveniente para você!</p>
                                        <p className={`mt-2 ${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Para uma experiência mais fluida, o envio do áudio pode ser feito diretamente pelo WhatsApp da AELO - Sua Voz em Movimento.</p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className={`flex-shrink-0 w-8 h-8 bg-${currentTheme.primary}-600 text-white rounded-full flex items-center justify-center text-lg font-bold`}>3</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><ListTodo size={20} /> Forneça os Detalhes da Veiculação</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Junto com o áudio, nos informe a categoria que melhor se encaixa (AELO+ Cliente, AELO Negócio, AELO Informações Públicas) e os detalhes essenciais da veiculação: data, horário preferencial, e o endereço aproximado se for para uma pessoa ou local específico.</p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className={`flex-shrink-0 w-8 h-8 bg-${currentTheme.primary}-600 text-white rounded-full flex items-center justify-center text-lg font-bold`}>4</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1 flex items-center gap-2"><CheckCircle size={20} /> Confirmação e Pagamento</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Nossa equipe fará a moderação do áudio para garantir a melhor qualidade e confirmará todos os detalhes com você. Após sua aprovação e o pagamento (via Pix, por exemplo), seu áudio estará pronto para ir para as ruas e encantar a cidade!</p>
                                    </div>
                                </div>
                                {/* Player de Áudio de Exemplo na página "Como Enviar" */}
                                <div className={`p-5 rounded-lg shadow-md text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-400 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center justify-center gap-2">
                                        <Volume2 size={24} /> Exemplo de Qualidade de Áudio AELO
                                    </h3>
                                    {sampleAudioUrl ? (
                                        <audio controls src={sampleAudioUrl} className="w-full"></audio>
                                    ) : (
                                        <button
                                            onClick={() => generateAndPlayAudio("Este é um exemplo da qualidade de áudio que a AELO oferece. Sua voz, clara e profissional, ecoando pelas ruas da cidade. Sua voz em movimento.", setSampleAudioUrl, setIsSampleAudioLoading)}
                                            className={`inline-flex items-center justify-center gap-3 px-6 py-3 bg-${currentTheme.primary}-500 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                                            disabled={isSampleAudioLoading}
                                        >
                                            {isSampleAudioLoading ? (
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <PlayCircle size={22} />
                                            )}
                                            {isSampleAudioLoading ? "Gerando..." : "Gerar e Ouvir Exemplo"}
                                        </button>
                                    )}
                                    <p className={`mt-2 text-sm ${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>
                                        Clique para gerar um áudio de exemplo e ouvir a qualidade da nossa veiculação.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'aelo-em-acao' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                AELO em Ação: Histórias e Destaques <Sparkles size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Veja como a AELO - Sua Voz em Movimento transforma mensagens em momentos inesquecíveis e resultados reais. Conheça algumas de nossas histórias de sucesso e o impacto que geramos!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {aeloInActionStories.map((story) => (
                                    <div key={story.id} className={`p-5 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            {story.icon}
                                            <h3 className={`text-xl font-semibold text-${currentTheme.primary}-600`}>{story.title}</h3>
                                        </div>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>{story.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'seu-aelo' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                Seu AELO: Personalize Sua Experiência! <Palette size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Bem-vindo(a) ao seu espaço pessoal na AELO! Aqui você pode personalizar o visual do site para que ele combine ainda mais com você.
                            </p>

                            <div className="mb-8">
                                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <Palette size={24} className={`text-${currentTheme.primary}-600`} /> Escolha sua Paleta de Cores
                                </h3>
                                <p className={`${isDarkMode ? `text-gray-300` : `text-gray-700`} mb-4`}>
                                    Selecione uma das paletas abaixo para mudar o tema principal do site:
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {colorPalettes.map((palette, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentTheme(palette)}
                                            className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 ${currentTheme.name === palette.name ? `border-4 border-${currentTheme.primary}-600` : `border ${isDarkMode ? `border-gray-600` : `border-gray-300`}`} ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                                        >
                                            <div className="flex gap-2 mb-2">
                                                <div className={`w-8 h-8 rounded-full bg-${palette.primary}-600`}></div>
                                                <div className={`w-8 h-8 rounded-full bg-${palette.accent}-400`}></div>
                                            </div>
                                            <span className={`text-sm font-medium ${isDarkMode ? `text-${currentTheme.darkText}` : `text-${currentTheme.text}`}`}>{palette.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className={`my-8 ${isDarkMode ? `border-gray-600` : `border-gray-300`}`} />

                            <div>
                                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                    <MessageCircle size={24} className={`text-${currentTheme.primary}-600`} /> Opções do Chatbot
                                </h3>
                                <p className={`${isDarkMode ? `text-gray-300` : `text-gray-700`} mb-4`}>
                                    Gerencie a sua experiência com a Olea, nossa assistente virtual.
                                </p>
                                <button
                                    onClick={() => setChatMessages([])}
                                    className={`px-6 py-3 bg-${currentTheme.primary}-600 text-white font-bold rounded-lg shadow-md hover:bg-${currentTheme.primary}-700 transition-colors duration-200`}
                                >
                                    Redefinir Conversa com Olea
                                </button>
                            </div>
                        </div>
                    )}

                    {activePage === 'simular-assinatura' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                Simulador de Assinatura AELO <Calculator size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Planeje sua veiculação com a AELO e descubra as vantagens de assinar nossos planos! Calcule sua economia e o custo-benefício de cada opção.
                            </p>

                            <div className="space-y-6">
                                {/* Seleção de Plano */}
                                <div className={`p-5 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                        <Briefcase size={20} className={`text-${currentTheme.primary}-600`} /> 1. Escolha o Plano
                                    </h3>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <label className={`flex items-center cursor-pointer p-3 rounded-lg border hover:bg-gray-100 transition-colors flex-1 ${isDarkMode ? `border-gray-600 hover:bg-gray-600` : `border-gray-300`}`}>
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="emFila"
                                                checked={selectedPlan === 'emFila'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className={`form-radio h-4 w-4 text-${currentTheme.primary}-600`}
                                            />
                                            <span className="ml-2 font-medium">AELO Negócio - Em Fila (R$ 29,90/dia)</span>
                                        </label>
                                        <label className={`flex items-center cursor-pointer p-3 rounded-lg border hover:bg-gray-100 transition-colors flex-1 ${isDarkMode ? `border-gray-600 hover:bg-gray-600` : `border-gray-300`}`}>
                                            <input
                                                type="radio"
                                                name="planType"
                                                value="particular"
                                                checked={selectedPlan === 'particular'}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className={`form-radio h-4 w-4 text-${currentTheme.primary}-600`}
                                            />
                                            <span className="ml-2 font-medium">AELO Negócio - Particular (R$ 69,90/dia)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Seleção de Duração */}
                                <div className={`p-5 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                        <CalendarDays size={20} className={`text-${currentTheme.primary}-600`} /> 2. Escolha a Duração da Assinatura
                                    </h3>
                                    <select
                                        value={selectedDuration}
                                        onChange={(e) => setSelectedDuration(e.target.value)}
                                        className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-${currentTheme.primary}-600 ${isDarkMode ? `bg-gray-900 border-gray-600` : `bg-white border-gray-300`}`}
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
                                    <div className={`p-5 rounded-lg shadow-md border-l-4 border-${currentTheme.success}-600 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                            <CheckCircle size={20} className={`text-${currentTheme.success}-600`} /> Resultados da Simulação
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                                            <p><strong>Custo Diário Normal:</strong> <span className={`text-${currentTheme.primary}-600 font-bold`}>{formatCurrency(dailyCost)}</span></p>
                                            <p><strong>Duração Total:</strong> <span className={`text-${currentTheme.primary}-600 font-bold`}>{totalDays} dias</span></p>
                                            <p><strong>Custo Base (sem desconto):</strong> <span className={`text-${currentTheme.warning}-600 font-bold line-through`}>{formatCurrency(baseCost)}</span></p>
                                            <p><strong>Desconto Aplicado:</strong> <span className={`text-${currentTheme.success}-600 font-bold`}>{formatPercentage(discountPercentage)}</span></p>
                                            <p className="col-span-full text-2xl font-bold">
                                                Custo Total da Assinatura: <span className={`text-${currentTheme.primary}-700`}>{formatCurrency(finalCost)}</span>
                                            </p>
                                            <p className="col-span-full text-xl font-bold">
                                                Economia Total: <span className={`text-${currentTheme.success}-700`}>{formatCurrency(savings)}</span>
                                            </p>
                                            <p className="col-span-full text-xl font-bold">
                                                Custo Diário Efetivo: <span className={`text-${currentTheme.primary}-700`}>{formatCurrency(effectiveDailyCost)}</span>
                                            </p>
                                        </div>
                                        <p className={`mt-4 text-sm ${isDarkMode ? `text-gray-300` : `text-gray-700`}`}>
                                            *Os valores apresentados são uma simulação e podem sofrer pequenas variações. Para um orçamento exato, entre em contato com nossa equipe.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    
                    {activePage === 'blog' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                Blog AELO: Fique por Dentro das Novidades! <Rss size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Explore nossos artigos, dicas e notícias sobre publicidade, sustentabilidade e o impacto da AELO na comunidade.
                            </p>

                            {selectedBlogPost ? (
                                <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <button
                                        onClick={() => setSelectedBlogPost(null)}
                                        className={`mb-4 inline-flex items-center gap-2 px-4 py-2 bg-${currentTheme.primary}-600 text-white rounded-full hover:bg-${currentTheme.primary}-700 transition-colors`}
                                    >
                                        <ChevronLeft size={20} /> Voltar para o Blog
                                    </button>
                                    <h3 className={`text-3xl font-bold mb-3 text-${currentTheme.primary}-600`}>{selectedBlogPost.title}</h3>
                                    <p className={`text-sm ${isDarkMode ? `text-gray-400` : `text-gray-500`} mb-4`}>
                                        Por {selectedBlogPost.author} em {selectedBlogPost.date}
                                    </p>
                                    <div className={`prose max-w-none ${isDarkMode ? `text-${currentTheme.darkText}` : `text-${currentTheme.text}`}`} dangerouslySetInnerHTML={{ __html: selectedBlogPost.content }} />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {blogPosts.map((post) => (
                                        <div key={post.id} className={`p-5 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                            <h3 className={`text-xl font-semibold mb-2 text-${currentTheme.primary}-600`}>{post.title}</h3>
                                            <p className={`text-sm ${isDarkMode ? `text-gray-400` : `text-gray-500`} mb-3`}>
                                                Por {post.author} em {post.date}
                                            </p>
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`} mb-4`}>{post.snippet}</p>
                                            <button
                                                onClick={() => setSelectedBlogPost(post)}
                                                className={`inline-flex items-center gap-2 px-4 py-2 bg-${currentTheme.accent}-500 text-gray-900 rounded-full hover:bg-${currentTheme.accent}-600 transition-colors`}
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
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-blue-600 animate-pulse">
                                Trabalhe com a AELO: Sua Oportunidade de Crescer! <BriefcaseBusiness size={32} />
                            </h2>
                            <p className="text-lg mb-6 leading-relaxed text-center">
                                Quer fazer parte de uma equipe inovadora, contribuir para a comunicação da sua cidade e ainda ter a chance de ganhar acima de R$ 10.000 por mês veiculando áudios? A AELO - Sua Voz em Movimento está buscando talentos!
                            </p>

                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}>
                                    <DollarSign size={24} /> Potencial de Ganhos Elevado
                                </h3>
                                <p className="leading-relaxed">
                                    Na AELO, valorizamos o seu esforço e dedicação. Com um bom desempenho na veiculação de áudios, você tem a oportunidade de alcançar rendimentos superiores a R$ 10.000 por mês! Quanto mais você pedala e mais mensagens veicula, maiores são seus ganhos.
                                </p>
                                <p className={`mt-4 text-sm ${isDarkMode ? `text-gray-300` : `text-gray-700`}`}>
                                    *Os ganhos são baseados na produtividade e na quantidade de áudios veiculados. Detalhes sobre o modelo de remuneração serão apresentados na entrevista.
                                </p>
                            </div>

                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center gap-2`}>
                                    <CheckCircle size={24} /> O Que Você Precisa Ter
                                </h3>
                                <p className="leading-relaxed">Para fazer parte da nossa equipe de ciclistas, os seguintes itens são essenciais:</p>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li><Bike size={20} className={`inline-block mr-2 text-${currentTheme.primary}-500`} /> Bicicleta: Em boas condições, para garantir a mobilidade e segurança.</li>
                                    <li><Volume2 size={20} className={`inline-block mr-2 text-${currentTheme.primary}-500`} /> Caixa de Som Portátil: Um equipamento de qualidade para veiculação clara dos áudios.</li>
                                    <li><Users size={20} className={`inline-block mr-2 text-${currentTheme.primary}-500`} /> EPIs (Equipamentos de Proteção Individual): Capacete, joelheiras, cotoveleiras e colete refletivo para sua segurança no trânsito.</li>
                                    <li><FileText size={20} className={`inline-block mr-2 text-${currentTheme.primary}-500`} /> Relatório Médico Positivo: Um atestado de saúde que comprove sua aptidão para a atividade física.</li>
                                    <li><BriefcaseBusiness size={20} className={`inline-block mr-2 text-${currentTheme.primary}-500`} /> CNPJ Ativo: Para formalizar sua parceria e garantir todos os benefícios.</li>
                                </ul>
                            </div>

                            <div className={`p-6 rounded-lg shadow-md text-center animate-fade-in-up delay-200 ${isDarkMode ? `bg-gray-700 border-${currentTheme.primary}-600 border` : `bg-${currentTheme.primary}-50 border-${currentTheme.primary}-200 border`}`}>
                                <h3 className={`text-2xl font-semibold text-${currentTheme.primary}-600 mb-3 flex items-center justify-center gap-2`}>
                                    <MessageSquare size={24} /> Interessado? Fale Conosco!
                                </h3>
                                <p className="leading-relaxed mb-4">
                                    Se você se encaixa no perfil e está pronto para pedalar rumo ao sucesso, entre em contato!
                                </p>
                                <button
                                    onClick={() => {
                                        const whatsappLink = `https://wa.me/5514981150675?text=${encodeURIComponent('Olá, AELO! Tenho interesse em ser um ciclista PJ da AELO.')}`;
                                        window.open(whatsappLink, '_blank');
                                    }}
                                    className={`inline-flex items-center justify-center px-6 py-3 bg-${currentTheme.primary}-600 text-white font-bold rounded-full shadow-lg hover:bg-${currentTheme.primary}-700 transform hover:scale-105 transition-all duration-300 gap-2`}
                                >
                                    <Mail size={20} /> Enviar Mensagem via WhatsApp
                                </button>
                            </div>
                        </div>
                    )}

                    {activePage === 'compromisso-sustentavel' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                Nosso Compromisso Sustentável: AELO e o Futuro Verde <Leaf size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Na AELO - Sua Voz em Movimento, a sustentabilidade não é apenas uma palavra, é a essência do nosso negócio. Acreditamos em um futuro onde a comunicação e o respeito ao meio ambiente caminham juntos.
                            </p>

                            <div className="space-y-6">
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Bike size={24} className={`text-${currentTheme.primary}-600 flex-shrink-0 mt-1`} />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Mobilidade Urbana Consciente</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>
                                            Nossa escolha pela bicicleta como principal meio de veiculação é um pilar do nosso compromisso. Reduzimos a emissão de carbono, diminuímos o trânsito e promovemos um estilo de vida mais saudável para nossos ciclistas e para a cidade.
                                        </p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Globe size={24} className={`text-${currentTheme.primary}-600 flex-shrink-0 mt-1`} />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Impacto Ambiental Positivo</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>
                                            Ao optar pela AELO, você contribui diretamente para uma cidade mais limpa e com menos poluição sonora e atmosférica. É uma publicidade que faz bem para o seu negócio e para o planeta.
                                        </p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Handshake size={24} className={`text-${currentTheme.primary}-600 flex-shrink-0 mt-1`} />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Parceria com a Comunidade</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>
                                            Além do impacto ambiental, nossa operação fortalece a economia local e incentiva a prática de atividades físicas. Somos parte ativa na construção de uma comunidade mais engajada e consciente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'faq' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Perguntas Frequentes <Info size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed text-center">Encontre aqui as respostas para as dúvidas mais comuns sobre os nossos serviços e dinâmicas.</p>
                            <div className="space-y-4">
                                {faqData.map((item, index) => (
                                    <div key={index} className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <button
                                            className={`w-full text-left p-4 font-semibold text-xl flex justify-between items-center transition-colors duration-200 hover:bg-gray-100 ${isDarkMode ? `hover:bg-gray-600 text-${currentTheme.darkText}` : `hover:bg-gray-100 text-${currentTheme.text}`}`}
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        >
                                            {item.question}
                                            <ChevronDown size={24} className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`} />
                                        </button>
                                        <div
                                            className={`p-4 transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0'}`}
                                        >
                                            <p className={`${isDarkMode ? `text-gray-300` : `text-gray-700`}`}>{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'termos-condicoes' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Termos e Condições de Uso da AELO <FileText size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Ao utilizar os serviços da AELO - Sua Voz em Movimento, você concorda com os seguintes termos e condições, que visam garantir a qualidade, a segurança e a integridade de todas as mensagens veiculadas.</p>
                            <div className="space-y-6 text-left">
                                <div className={`p-5 rounded-lg shadow-md animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2`}><CheckCircle size={20} className={`text-${currentTheme.primary}-600`} /> Moderação de Conteúdo</h3>
                                    <p className="leading-relaxed">Todos os áudios enviados para veiculação na AELO - Sua Voz em Movimento são submetidos a um rigoroso processo de moderação. Nosso objetivo é assegurar que o conteúdo seja claro, objetivo e, acima de tudo, respeitoso e adequado para o público geral.</p>
                                    <p className={`mt-2 leading-relaxed`}><span className={`font-semibold text-${currentTheme.error}-600`}>Conteúdos Estritamente Proibidos:</span> Não serão veiculados áudios que contenham:</p>
                                    <ul className={`list-disc list-inside ${isDarkMode ? `text-gray-300` : `text-gray-600`} space-y-1 mt-2`}>
                                        <li>Mensagens de má-fé, difamação ou calúnia.</li>
                                        <li>Qualquer forma de discriminação (racial, de gênero, religiosa, sexual).</li>
                                        <li>Discurso de ódio ou incitação à violência.</li>
                                        <li>Conteúdo sexualmente explícito ou obsceno.</li>
                                        <li>Informações falsas ou enganosas.</li>
                                        <li>Conteúdo que viole direitos autorais ou de propriedade intelectual.</li>
                                        <li>Qualquer conteúdo que seja ilegal ou promova atividades ilícitas.</li>
                                    </ul>
                                    <p className="mt-4 leading-relaxed">A AELO - Sua Voz em Movimento se reserva o direito de recusar a veiculação de qualquer áudio que, a seu critério exclusivo, não esteja em conformidade com estas diretrizes, sem a necessidade de justificativa detalhada.</p>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2`}><DollarSign size={20} className={`text-${currentTheme.primary}-600`} /> Política de Reembolso</h3>
                                    <p className="leading-relaxed">Entendemos que imprevistos podem acontecer. No entanto, é importante que você esteja ciente da nossa política de reembolso:</p>
                                    <p className="mt-2 leading-relaxed">Após o envio do áudio e a confirmação do pagamento, não haverá reembolso caso você desista da veiculação após 30 (trinta) minutos. Esta política se aplica mesmo que o áudio não esteja infringindo nenhuma das regras de conteúdo da empresa.</p>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className={`text-xl font-semibold mb-2 flex items-center gap-2`}><Info size={20} className={`text-${currentTheme.primary}-600`} /> Responsabilidade do Usuário</h3>
                                    <p className="leading-relaxed">O usuário é o único responsável pelo conteúdo do áudio enviado, garantindo que ele não viole quaisquer leis, regulamentos ou direitos de terceiros. A AELO - Sua Voz em Movimento não se responsabiliza por quaisquer danos ou prejuízos decorrentes da veiculação de conteúdo inadequado ou ilícito enviado pelo usuário.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'contato' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">Fale Conosco: Sua Voz é Importante! <MessageSquare size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Tem alguma dúvida, sugestão ou quer saber mais sobre como a AELO - Sua Voz em Movimento pode amplificar sua mensagem? Preencha o formulário abaixo ou use nossos canais de contato direto.</p>
                            
                            {/* Formulário de Contato */}
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className={`block text-sm font-semibold mb-1`}>Seu Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:border-${currentTheme.primary}-500 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={`block text-sm font-semibold mb-1`}>Seu E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:border-${currentTheme.primary}-500 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className={`block text-sm font-semibold mb-1`}>Sua Mensagem</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        value={formMessage}
                                        onChange={(e) => setFormMessage(e.target.value)}
                                        className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:border-${currentTheme.primary}-500 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full py-3 bg-${currentTheme.primary}-600 text-white font-bold rounded-lg shadow-md hover:bg-${currentTheme.primary}-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                                {formStatus && (
                                    <p className={`text-center font-semibold mt-4 ${formStatus.includes('Erro') ? `text-${currentTheme.error}-500` : `text-${currentTheme.success}-500`}`}>{formStatus}</p>
                                )}
                            </form>

                            <hr className={`my-8 ${isDarkMode ? `border-gray-600` : `border-gray-300`}`} />
                            
                            <div className="space-y-6 text-left">
                                <h3 className="text-2xl font-bold mb-4">Ou Fale Diretamente Conosco:</h3>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Mail size={24} className={`text-${currentTheme.primary}-600 flex-shrink-0 mt-1`} />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">E-mail</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Envie suas perguntas e sugestões para: <a href="mailto:Aelobrasil@gmail.com" className={`text-${currentTheme.primary}-600 hover:underline`}>Aelobrasil@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Phone size={24} className={`text-${currentTheme.primary}-600 flex-shrink-0 mt-1`} />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">WhatsApp</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Para um atendimento rápido e direto, fale conosco pelo WhatsApp: <a href="https://wa.me/5514981150675" target="_blank" rel="noopener noreferrer" className={`text-${currentTheme.primary}-600 hover:underline`}>(14) 98115-0675</a></p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Info size={24} className={`text-${currentTheme.primary}-600 flex-shrink-0 mt-1`} />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Redes Sociais</h3>
                                        <p className={`${isDarkMode ? `text-gray-300` : `text-gray-600`}`}>Siga-nos no Instagram para ficar por dentro das novidades, dinâmicas e temporadas: <a href="https://www.instagram.com/aelovoz" target="_blank" rel="noopener noreferrer" className={`text-${currentTheme.primary}-600 hover:underline`}>@Aelovoz</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Rodapé aprimorado */}
            <footer className={`bg-gradient-to-r from-black to-${currentTheme.primary}-700 text-white text-center p-4 mt-auto rounded-t-xl shadow-inner`}>
                <div className="container mx-auto flex flex-col items-center justify-center">
                    <p className="text-lg font-bold mb-1">AELO - Sua Voz em Movimento</p>
                    <p className="text-sm">Bauru, SP</p>
                    <p className="text-xs mt-2">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
                    <Bike size={20} className={`text-${currentTheme.accent}-300 transform transition-transform duration-300 hover:rotate-[360deg] mt-2`} />
                </div>
            </footer>
        </div>
    );
};

// Componente Wrapper para o ThemeProvider
const AppWrapper = () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

export default AppWrapper;
