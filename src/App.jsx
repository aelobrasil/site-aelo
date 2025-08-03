import React, { useState, useEffect, useRef } from 'react';

// Importa ícones do Lucide React
import { Home, Mic, Briefcase, Users, Lightbulb, Trophy, DollarSign, Bike, MessageSquare, CheckCircle, Heart, Leaf, Star, Info, MapPin, Award, RefreshCcw, CalendarDays, Volume2, Search, Gift, Send, Copy, FileText, Mail, Phone, Menu, X, PlayCircle, Quote, ChevronLeft, ChevronRight, Moon, Sun, ChevronDown, Scale } from 'lucide-react';

// Componente para o botão flutuante de WhatsApp
const FloatingWhatsApp = () => (
    <a
        href="https://wa.me/5514981150675"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 transform hover:scale-110 transition-all duration-300 ease-in-out flex items-center justify-center"
        aria-label="Fale Conosco no WhatsApp"
        title="Fale Conosco no WhatsApp"
    >
        <MessageSquare size={32} />
    </a>
);

// Componente principal do aplicativo
const App = () => {
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

    // Novos estados para o player de áudio de exemplo
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Novos estados para os áudios de cada categoria
    const [clientAudioUrl, setClientAudioUrl] = useState('');
    const [isClientAudioLoading, setIsClientAudioLoading] = useState(false);
    const [businessAudioUrl, setBusinessAudioUrl] = useState('');
    const [isBusinessAudioLoading, setIsBusinessAudioLoading] = useState(false);
    const [publicAudioUrl, setPublicAudioUrl] = useState('');
    const [isPublicAudioLoading, setIsPublicAudioLoading] = useState(false);
    const [sampleAudioUrl, setSampleAudioUrl] = useState('');
    const [isSampleAudioLoading, setIsSampleAudioLoading] = useState(false);

    // Dados para o FAQ
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
        }
    ];

    // Efeito para aplicar o modo escuro ao elemento <html>
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

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

    // Função para navegar entre as páginas com animação
    const navigateTo = (pageId) => {
        setContentVisible(false); // Inicia o fade-out
        setIsMenuOpen(false); // Fecha o menu lateral ao navegar
        setTimeout(() => {
            setActivePage(pageId); // Muda a página
            setContentVisible(true); // Inicia o fade-in da nova página
            setPixCopiedMessage(''); // Limpa a mensagem do Pix ao mudar de página
            setFormStatus(''); // Limpa o status do formulário
        }, 300); // Tempo da transição (deve ser menor ou igual à duração da animação CSS)
    };

    // Função para copiar a chave Pix
    const copyPixKey = () => {
        const pixKey = '60.676.425/0001-47';
        const tempInput = document.createElement('input');
        tempInput.value = pixKey;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setPixCopiedMessage('Chave Pix copiada!');
        setTimeout(() => setPixCopiedMessage(''), 3000); // Mensagem some após 3 segundos
    };

    // Função para enviar o formulário de contato (simulado com API)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('Enviando sua mensagem...');

        try {
            // Prompt para a API Gemini para gerar uma resposta de confirmação
            const prompt = `Gere uma mensagem de confirmação para o envio de um formulário de contato. Use um tom amigável e profissional. Mencione que a AELO recebeu a mensagem de ${formName} e irá responder em breve.`;
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            // Chama a API com tratamento de erros e retentativa
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content) {
                const text = result.candidates[0].content.parts[0].text;
                setFormStatus(text);
                setFormName('');
                setFormEmail('');
                setFormMessage('');
            } else {
                setFormStatus('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error("Erro na chamada da API:", error);
            setFormStatus('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        } finally {
            setIsSubmitting(false);
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
            const apiKey = "AIzaSyB3DbqJDl_IgpIo-03GjE85xY-FsT8JxUs";
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
            quote: "O pedido de casamento foi mágico! Ouvir minha voz ecoando na praça onde nos conhecemos... Inesquecível. A AELO tornou tudo perfeito!",
            name: "Lucas M.",
            service: "AELO+ Cliente",
            icon: <Heart size={24} className="text-purple-500" />
        },
        {
            quote: "A inauguração da nossa cafeteria foi um sucesso! A propaganda na AELO atraiu muita gente do bairro. O retorno foi imediato e superou as expectativas.",
            name: "Juliana P.",
            service: "AELO Negócio",
            icon: <Briefcase size={24} className="text-orange-500" />
        },
        {
            quote: "Conseguimos muitos voluntários para nossa campanha de doação de agasalhos. A AELO foi fundamental para espalhar a mensagem pela comunidade.",
            name: "ONG Mãos que Ajudam",
            service: "AELO Informações Públicas",
            icon: <Info size={24} className="text-blue-500" />
        },
        {
            quote: "Ouvir a voz dos meus filhos me parabenizando pelo meu aniversário enquanto eu caminhava na rua... me emocionei demais! Uma surpresa maravilhosa.",
            name: "Silvia R.",
            service: "AELO+ Cliente",
            icon: <Gift size={24} className="text-pink-500" />
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

    // Define o ano atual para o rodapé
    const currentYear = new Date().getFullYear();

    return (
        <div className={`min-h-screen font-inter antialiased flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            {/* Header aprimorado */}
            <header className="bg-gradient-to-r from-purple-700 to-orange-600 text-white p-6 shadow-xl rounded-b-3xl relative text-center">
                <div className="container mx-auto">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="absolute top-6 left-6 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <h1 className="text-6xl md:text-7xl font-extrabold mb-1 animate-fade-in-down">
                        AELO
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold flex items-center justify-center gap-2 animate-fade-in-down delay-200">
                        Sua Voz em Movimento
                        <Bike size={28} className="text-white transform transition-transform duration-300 hover:rotate-[360deg]" />
                    </p>
                </div>
            </header>

            {/* Overlay para fechar o menu ao clicar fora */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* Navegação Lateral (Sidebar) */}
            <nav className={`fixed inset-y-0 left-0 dark:bg-gray-800 bg-white p-6 shadow-xl z-50 w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
                    >
                        {isDarkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-800" />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 rounded-full dark:bg-gray-700 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label="Fechar menu de navegação"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <button onClick={() => navigateTo('home')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'home' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Home size={20} /> Início</button>
                    <button onClick={() => navigateTo('categorias')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'categorias' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Briefcase size={20} /> Categorias</button>
                    <button onClick={() => navigateTo('porque-aelo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'porque-aelo' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Lightbulb size={20} /> Por Que AELO?</button>
                    <button onClick={() => navigateTo('comparativo')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'comparativo' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Scale size={20} /> AELO vs. Tradicionais</button>
                    <button onClick={() => navigateTo('depoimentos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'depoimentos' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Quote size={20} /> Depoimentos</button>
                    <button onClick={() => navigateTo('dinamicas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'dinamicas' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Trophy size={20} /> Dinâmicas</button>
                    <button onClick={() => navigateTo('temporadas')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'temporadas' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><CalendarDays size={20} /> Temporadas</button>
                    <button onClick={() => navigateTo('precos')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'precos' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><DollarSign size={20} /> Preços</button>
                    <button onClick={() => navigateTo('como-enviar')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'como-enviar' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Send size={20} /> Como Enviar Áudios</button>
                    <button onClick={() => navigateTo('faq')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'faq' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><Info size={20} /> FAQ</button>
                    <button onClick={() => navigateTo('termos-condicoes')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'termos-condicoes' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><FileText size={20} /> Termos</button>
                    <button onClick={() => navigateTo('contato')} className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-[1.02] ${activePage === 'contato' ? 'bg-purple-600 text-white shadow-md' : 'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-purple-800 bg-gray-100 text-gray-800 hover:bg-purple-100'}`}><MessageSquare size={20} /> Contato</button>
                </div>
            </nav>
            
            {/* Botão Flutuante do WhatsApp */}
            <FloatingWhatsApp />

            {/* Conteúdo Principal */}
            <main className="p-4 md:p-8 flex-grow">
                <div key={activePage} className={`transition-opacity duration-300 ease-in-out ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {activePage === 'home' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 text-center animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-4xl font-extrabold mb-4 flex items-center justify-center gap-3">Bem-vindo(a) à AELO!</h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO, sua voz ganha asas e pedala pela cidade, criando conexões inesquecíveis. Transformamos mensagens em experiências sonoras que ecoam pelas ruas, alcançando corações e mentes.</p>
                            <p className="text-lg mb-8 leading-relaxed">Descubra como a AELO revoluciona a forma de comunicar, levando sua marca, sua emoção e suas ideias para onde elas precisam ser ouvidas.</p>
                            <p className="text-lg mb-8 leading-relaxed flex items-center justify-center gap-2">
                                <Mic size={28} className="text-purple-600" />
                                <span className="font-semibold">Bauru & Região</span>
                            </p>
                            <div className="bg-purple-100 text-purple-800 p-4 rounded-lg font-semibold flex items-center justify-center gap-2 border border-purple-200 shadow-sm">
                                <Info size={20} />
                                Fique de olho nas nossas Temporadas Temáticas para uma conexão ainda mais profunda com o público! Explore a aba "Temporadas" e saiba como sua voz pode se encaixar perfeitamente no momento.
                            </div>
                        </div>
                    )}

                    {activePage === 'categorias' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                             <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Nossas Categorias de Serviço: Conecte-se de Forma Única <Users size={32} /></h2>
                             <p className="text-lg mb-6 leading-relaxed">Oferecemos soluções personalizadas para cada tipo de mensagem, garantindo que sua voz alcance o coração certo. Escolha a que mais ressoa com sua intenção:</p>
                             <div className={`category-box border p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700 border-purple-600' : 'bg-purple-50 border-purple-200'}`}>
                                 <h3 className="text-2xl font-semibold text-purple-500 mb-3 flex items-center gap-2"><Heart size={24} /> AELO+ Cliente: Emoção que Pedala</h3>
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
                                            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                             <div className={`category-box border p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700 border-orange-600' : 'bg-orange-50 border-orange-200'}`}>
                                 <h3 className="text-2xl font-semibold text-orange-500 mb-3 flex items-center gap-2"><Briefcase size={24} /> AELO Negócio: Sua Marca em Movimento</h3>
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
                                            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                             <div className={`category-box border p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700 border-blue-600' : 'bg-blue-50 border-blue-200'}`}>
                                 <h3 className="text-2xl font-semibold text-blue-500 mb-3 flex items-center gap-2"><Info size={24} /> AELO Informações Públicas: Ecoando Boas Causas</h3>
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
                                            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                             <p className="text-lg mb-6 leading-relaxed">A AELO vai além da publicidade; é uma experiência sonora que cativa. Descubra os diferenciais que nos tornam a escolha perfeita para sua mensagem:</p>
                             <ul className="space-y-4">
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className="text-purple-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold">Alcance Hiperlocal e Dinâmico</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Sua mensagem em movimento, alcançando ruas, bairros e públicos específicos com precisão e energia. Não é um anúncio parado, é uma voz que se integra ao ritmo da cidade.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className="text-purple-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold">Engajamento Inovador e Memorável</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Em um mundo de distrações visuais, o som inesperado de uma bicicleta captura a atenção e gera curiosidade genuína. Sua mensagem é ouvida em média 10 vezes por ciclo de veiculação, garantindo que ela seja fixada na mente.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className="text-purple-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold">Qualidade Sonora e Conteúdo Moderado</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Todos os áudios passam por um rigoroso processo de moderação. Garantimos clareza, objetividade e a melhor qualidade de som, para que sua mensagem chegue perfeita e sem ruídos indesejados, transmitindo profissionalismo e cuidado.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className="text-purple-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold">Sustentabilidade e Imagem Positiva</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Nossa publicidade é "verde" de verdade! Ao usar bicicletas, promovemos um marketing ecológico e associamos sua marca a valores de responsabilidade ambiental, saúde e inovação consciente.</p>
                                     </div>
                                 </li>
                                 <li className={`p-4 rounded-lg shadow-md flex items-start gap-3 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-400 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                     <CheckCircle size={24} className="text-purple-600 mt-1" />
                                     <div>
                                         <h3 className="text-xl font-semibold">A Magia da Conexão Humana</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Não é apenas um som; é uma voz levada por um ciclista, uma pessoa real que interage com a cidade. Essa presença humana cria uma conexão mais autêntica e emocional com quem ouve, tornando sua mensagem inesquecível e humana.</p>
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
                                No cenário da publicidade e comunicação, a escolha do método de veiculação faz toda a diferença. Compare a abordagem inovadora da AELO com os tradicionais carros de som e descubra por que somos a melhor opção para sua mensagem.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Coluna AELO */}
                                <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700 border-purple-600 border' : 'bg-purple-50 border-purple-200 border'}`}>
                                    <h3 className="text-2xl font-semibold text-purple-500 mb-4 flex items-center gap-2">
                                        <Bike size={28} /> AELO: Sua Voz em Movimento
                                    </h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <h4 className="font-bold text-lg">Facilidade e Estilo Facilitado:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Você tem o controle total do seu marketing. Grave seu áudio com o celular, envie para nós e pronto! Simples, rápido e sem burocracia.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Preços e Economia Incomparáveis:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Nossos preços começam em apenas <span className="font-bold text-green-600">R$ 6,00</span> por áudio, com veiculação o dia inteiro (das 8h às 18h). Um custo-benefício que os veiculadores tradicionais não conseguem igualar.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Categorias Diversificadas e Humanizadas:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Além de anúncios para negócios, oferecemos as categorias AELO+ Cliente (para mensagens pessoais e emocionantes) e AELO Informações Públicas (para causas humanitárias e comunitárias). Levamos sua voz para quem mais precisa, de forma autêntica e impactante.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Maior Alcance e Mais Rápido:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Nossos ciclistas atendem toda a cidade de Bauru e região, alcançando áreas específicas com agilidade e dinamismo. Sua mensagem não fica presa a uma rota fixa, ela se move com a cidade.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Conexão Humana e Engajamento:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">A presença do ciclista cria uma interação mais genuína. O som inesperado da bicicleta com sua mensagem gera curiosidade e memorização, destacando-se no ambiente urbano.</p>
                                        </li>
                                    </ul>
                                </div>

                                {/* Coluna Veiculadores Tradicionais */}
                                <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700 border-orange-600 border' : 'bg-orange-50 border-orange-200 border'}`}>
                                    <h3 className="text-2xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
                                        <Volume2 size={28} /> Carros de Som: O Passado da Veiculação
                                    </h3>
                                    <ul className="space-y-4">
                                        <li>
                                            <h4 className="font-bold text-lg">Custo Elevado por Pouco Serviço:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Os carros de som geralmente cobram muito mais por um serviço com alcance limitado e menos flexibilidade, tornando-o menos acessível para pequenos empreendedores e mensagens pessoais.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Alcance Limitado e Menos Dinâmico:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Ficam restritos a rotas pré-definidas e horários fixos, perdendo a oportunidade de alcançar públicos em áreas de grande fluxo que mudam ao longo do dia.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Menos Engajamento:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">A presença constante e por vezes intrusiva pode levar à saturação e à ignorância por parte do público, que já está acostumado com esse tipo de anúncio.</p>
                                        </li>
                                        <li>
                                            <h4 className="font-bold text-lg">Foco Exclusivo em Publicidade Comercial:</h4>
                                            <p className="text-gray-600 dark:text-gray-300">Geralmente, não oferecem opções para mensagens pessoais, declarações ou campanhas humanitárias, limitando o tipo de comunicação que pode ser veiculada.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-lg text-center leading-relaxed mt-8 flex items-center justify-center gap-2">
                                Escolha a AELO e leve sua voz para o futuro, com mais impacto, economia e conexão humana!
                            </p>
                        </div>
                    )}

                    {activePage === 'depoimentos' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                Histórias de Sucesso AELO: A Voz dos Nossos Clientes <Quote size={32} />
                            </h2>
                            <p className="text-lg mb-8 leading-relaxed text-center">
                                Nada fala mais alto sobre nosso impacto do que as histórias de quem confiou sua voz à AELO. Veja como transformamos mensagens em momentos inesquecíveis e resultados concretos.
                            </p>
                            
                            {/* Carrossel de depoimentos */}
                            <div className="relative">
                                <div className={`p-6 rounded-lg border-l-4 border-purple-500 transform transition-all duration-300 ease-in-out shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Quote size={32} className="text-purple-200 mb-4" />
                                    <p key={currentTestimonialIndex} className="text-lg italic leading-relaxed mb-4 animate-fade-in-up">"{testimonials[currentTestimonialIndex].quote}"</p>
                                    <div className="flex items-center justify-end gap-4">
                                        <div className="text-right">
                                            <p className="font-bold">{testimonials[currentTestimonialIndex].name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[currentTestimonialIndex].service}</p>
                                        </div>
                                        <div className="p-3 bg-white rounded-full shadow-inner dark:bg-gray-900">
                                            {testimonials[currentTestimonialIndex].icon}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Botões de navegação */}
                                <button
                                    onClick={prevTestimonial}
                                    className="absolute top-1/2 left-4 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:hover:bg-gray-800"
                                    aria-label="Depoimento anterior"
                                >
                                    <ChevronLeft size={24} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:hover:bg-gray-800"
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
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonialIndex === index ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                                        aria-label={`Ir para o depoimento ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'dinamicas' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Dinâmicas AELO: Sua Chance de Brilhar e Ganhar! <Trophy size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO, a interação e a recompensa são parte da nossa essência. Participe das nossas dinâmicas exclusivas e transforme sua experiência em algo ainda mais emocionante e recompensador!</p>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700 border-orange-600 border' : 'bg-orange-50 border-orange-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-orange-500 mb-3 flex items-center gap-2"><Mic size={24} /> Achou um Áudio Conhecido? Surpreenda-se!</h3>
                                <p className="leading-relaxed">Você ouviu um áudio da AELO que reconheceu? Talvez seja a voz de um amigo, um familiar ou até a sua própria mensagem ecoando pela cidade!</p>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Grave um vídeo do ciclista AELO veiculando o áudio.</li>
                                    <li>Marque a AELO no seu Instagram <span className="font-bold text-purple-600">@Aelovoz</span>.</li>
                                    <li>Envie o vídeo para nós via direct, informando o nome da pessoa dona da voz e o endereço aproximado de onde a ouviu.</li>
                                </ul>
                                <p className="mt-4 leading-relaxed flex items-center gap-2">Nossa equipe verificará a solicitação e, se confirmado, faremos a entrega de um brinde surpresa e exclusivo para a pessoa dona da voz! Uma emoção em dobro! <Award size={20} className="text-orange-500"/></p>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700 border-purple-600 border' : 'bg-purple-50 border-purple-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-3 flex items-center gap-2"><DollarSign size={24} /> Ticket de até R$1000: Sua Voz Vale Ouro!</h3>
                                <p className="leading-relaxed">Ao enviar qualquer áudio para veiculação com a AELO (seja AELO+ Cliente, Negócio ou Informações Públicas), você automaticamente participa de uma dinâmica especial que pode te garantir um ticket valioso de até R$1000,00!</p>
                                <p className="mt-4 leading-relaxed flex items-center gap-2">Sua voz não só emociona ou divulga, mas também pode te render um grande prêmio. É a AELO recompensando sua confiança e criatividade! <Trophy size={20} className="text-purple-500"/></p>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700 border-blue-600 border' : 'bg-blue-50 border-blue-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-blue-500 mb-3 flex items-center gap-2"><Search size={24} /> O Áudio Misterioso: Desvende o Enigma!</h3>
                                <p className="leading-relaxed">Fique atento(a)! Periodicamente, veicularemos um "Áudio Misterioso". Ouça com atenção, desvende o enigma e envie sua resposta para a AELO para ganhar prêmios!</p>
                                <div className="mt-4 text-center">
                                    <button onClick={playMysterySound} className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300">
                                        <PlayCircle size={22} /> Ouvir o Áudio Misterioso
                                    </button>
                                </div>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 ${isDarkMode ? 'bg-gray-700 border-green-600 border' : 'bg-green-50 border-green-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-green-500 mb-3 flex items-center gap-2"><MapPin size={24} /> Caça ao Tesouro Sonora: Aventura Urbana!</h3>
                                <p className="leading-relaxed">Prepare-se para uma aventura! Em dias específicos, nossos ciclistas veicularão pistas em áudio, transformando a cidade em um grande jogo. Siga as pistas para encontrar o tesouro!</p>
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
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Temporadas AELO: Conecte-se com o Momento e Amplifique Sua Mensagem! <CalendarDays size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO, acreditamos que sua mensagem ganha ainda mais força quando está em sintonia com o espírito do momento. Por isso, operamos em "Temporadas" temáticas, que permitem uma conexão mais profunda e relevante com o público da cidade.</p>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700 border-purple-600 border' : 'bg-purple-50 border-purple-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-3 flex items-center gap-2"><Volume2 size={24} /> Como Funcionam as Temporadas AELO?</h3>
                                <p className="leading-relaxed">Cada temporada tem um tema central cuidadosamente escolhido, que reflete eventos, sentimentos ou celebrações do período. Isso nos permite criar um ambiente sonoro na cidade que ressoa diretamente com o que as pessoas estão vivenciando e sentindo.</p>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Mensagens de amor e carinho podem ter um destaque especial na "Temporada Áudio do Coração".</li>
                                    <li>Campanhas de sustentabilidade e bem-estar brilham na "Temporada Áudio Verde".</li>
                                    <li>Anúncios de eventos e promoções ganham ainda mais visibilidade na "Temporada Áudio Ação".</li>
                                    <li>Anúncios de eventos e promoções ganham ainda mais visibilidade na "Temporada Áudio Ação".</li>
                                </ul>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mb-6 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700 border-orange-600 border' : 'bg-orange-50 border-orange-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-orange-500 mb-3 flex items-center gap-2"><Leaf size={24} /> Exemplos de Temporadas Anteriores e Futuras</h3>
                                <ul className="list-disc list-inside space-y-2 mt-2">
                                    <li>Temporada Áudio Verde: Foco em sustentabilidade, meio ambiente, vida saudável e bem-estar.</li>
                                    <li>Temporada Áudio do Coração: Celebração do amor, amizade, gratidão e conexões humanas.</li>
                                    <li>Temporada Áudio Ação: Impulso para o comércio local, grandes eventos, lançamentos e novidades.</li>
                                    <li>Temporada Áudio Festas: Mensagens especiais para datas comemorativas e celebrações.</li>
                                </ul>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700 border-blue-600 border' : 'bg-blue-50 border-blue-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-blue-500 mb-3 flex items-center gap-2"><RefreshCcw size={24} /> Como Participar e Potencializar Sua Mensagem</h3>
                                <p className="leading-relaxed">Para participar e maximizar o impacto, basta alinhar o conteúdo do seu áudio com o tema da temporada vigente. Embora não seja obrigatório, essa sintonia potencializa a ressonância da sua mensagem com o público.</p>
                            </div>
                        </div>
                    )}

                    {activePage === 'precos' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Invista em Emoção: Nossos Planos AELO! <DollarSign size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Na AELO, acreditamos que a publicidade de impacto e as mensagens que tocam o coração devem ser acessíveis. Nossos preços são pensados para oferecer o melhor custo-benefício e levar sua voz ainda mais longe.</p>
                            <div className={`price-card border p-6 rounded-lg shadow-md mb-6 text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up ${isDarkMode ? 'bg-gray-700 border-purple-600' : 'bg-purple-50 border-purple-200'}`}>
                                <h3 className="text-2xl font-semibold text-purple-500 mb-3 flex items-center justify-center gap-2"><Heart size={28} /> AELO+ Cliente: Sua Mensagem Pessoal</h3>
                                <p className="text-3xl font-bold mb-2">R$ 6,00</p>
                                <p className="text-gray-600 dark:text-gray-300">por áudio (reproduzido o dia inteiro)</p>
                                <p className="mt-4 leading-relaxed">Sua mensagem pessoal e emocionante veiculada para aquela pessoa especial durante todo o dia, criando um momento inesquecível.</p>
                            </div>
                            <div className={`price-card border p-6 rounded-lg shadow-md mb-6 text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700 border-orange-600' : 'bg-orange-50 border-orange-200'}`}>
                                <h3 className="text-2xl font-semibold text-orange-500 mb-3 flex items-center justify-center gap-2"><Briefcase size={28} /> AELO Negócio: Publicidade com Alma</h3>
                                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mt-4">
                                    <div className="flex-1">
                                        <p className="text-2xl font-bold mb-1">Em Fila</p>
                                        <p className="text-3xl font-bold mb-2">R$ 29,90</p>
                                        <p className="text-gray-600 dark:text-gray-300">o dia todo</p>
                                        <p className="mt-2 text-sm leading-relaxed">Seu áudio será reproduzido na fila de propagandas do dia, uma após a outra, garantindo visibilidade contínua.</p>
                                    </div>
                                    <div className="flex-1 border-t md:border-t-0 md:border-l border-orange-300 pt-4 md:pt-0 md:pl-6">
                                        <p className="text-2xl font-bold mb-1">Particular</p>
                                        <p className="text-3xl font-bold mb-2">R$ 69,90</p>
                                        <p className="text-gray-600 dark:text-gray-300">o dia todo</p>
                                        <p className="mt-2 text-sm leading-relaxed">Apenas o áudio da sua empresa será reproduzido durante todo o dia, proporcionando exclusividade e máximo impacto.</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`price-card border p-6 rounded-lg shadow-md text-center transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700 border-blue-600' : 'bg-blue-50 border-blue-200'}`}>
                                <h3 className="text-2xl font-semibold text-blue-500 mb-3 flex items-center justify-center gap-2"><Info size={28} /> AELO Informações Públicas: Voz para o Bem</h3>
                                <p className="text-3xl font-bold mb-2">R$ 49,90</p>
                                <p className="text-gray-600 dark:text-gray-300">por áudio o dia todo</p>
                                <p className="mt-4 leading-relaxed">Amplifique causas sociais e avisos comunitários, com sua mensagem em destaque o dia inteiro, gerando impacto positivo na comunidade.</p>
                            </div>
                            <div className={`p-6 rounded-lg shadow-md mt-8 text-center animate-fade-in-up delay-300 ${isDarkMode ? 'bg-gray-700 border-green-600 border' : 'bg-green-50 border-green-200 border'}`}>
                                <h3 className="text-2xl font-semibold text-green-500 mb-3 flex items-center justify-center gap-2"><DollarSign size={28} /> Pagamento Simples via Pix</h3>
                                <p className="text-xl font-bold mb-2">Chave Pix (CNPJ): <span className="font-bold text-purple-600">60.676.425/0001-47</span></p>
                                <p className="text-lg mb-2">Titular: A A S Fernandes</p>
                                <button onClick={copyPixKey} className="inline-flex items-center justify-center px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 gap-2 mt-4" aria-label="Copiar chave Pix"><Copy size={20} /> Copiar Chave Pix</button>
                                {pixCopiedMessage && (<p className="text-green-500 mt-2 text-sm font-semibold animate-fade-in-up">{pixCopiedMessage}</p>)}
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">Dica: Copie a chave Pix acima e realize o pagamento. Após a transação, envie o comprovante para nós via WhatsApp ou Instagram <span className="font-bold text-purple-600">@Aelovoz</span> para agilizar a veiculação do seu áudio!</p>
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
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">1</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Grave Seu Áudio com Qualidade e Duração Ideal</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Use seu celular, computador ou qualquer dispositivo para gravar a mensagem que deseja veicular. A qualidade do áudio é fundamental para uma experiência sonora impecável!</p>
                                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                                            <li><span className="font-semibold text-purple-700">AELO+ Cliente (Pessoais):</span> 15 a 20 segundos.</li>
                                            <li><span className="font-semibold text-orange-700">AELO Negócio:</span> 30 segundos a 1 minuto.</li>
                                            <li><span className="font-semibold text-blue-700">AELO Informações Públicas:</span> 30 segundos a 1 minuto e 30 segundos.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">2</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Envie o Áudio para a AELO</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Após a gravação, envie seu áudio diretamente para a nossa equipe. Você pode fazer isso de forma muito prática pelo nosso WhatsApp ou via Direct do Instagram <span className="font-bold text-purple-600">@Aelovoz</span>. Escolha o canal que for mais conveniente para você!</p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">3</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Forneça os Detalhes da Veiculação</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Junto com o áudio, nos informe a categoria que melhor se encaixa (AELO+ Cliente, AELO Negócio, AELO Informações Públicas) e os detalhes essenciais da veiculação: data, horário preferencial, e o endereço aproximado se for para uma pessoa ou local específico.</p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 transform hover:scale-[1.01] transition-transform duration-200 animate-fade-in-up delay-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">4</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Confirmação e Pagamento</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Nossa equipe fará a moderação do áudio para garantir a melhor qualidade e confirmará todos os detalhes com você. Após sua aprovação e o pagamento (via Pix, por exemplo), seu áudio estará pronto para ir para as ruas e encantar a cidade!</p>
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
                                            className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Clique para gerar um áudio de exemplo e ouvir a qualidade da nossa veiculação.
                                    </p>
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
                                            className="w-full text-left p-4 font-semibold text-xl flex justify-between items-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        >
                                            {item.question}
                                            <ChevronDown size={24} className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`} />
                                        </button>
                                        <div
                                            className={`p-4 transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0'}`}
                                        >
                                            <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activePage === 'termos-condicoes' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">Termos e Condições de Uso da AELO <FileText size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Ao utilizar os serviços da AELO, você concorda com os seguintes termos e condições, que visam garantir a qualidade, a segurança e a integridade de todas as mensagens veiculadas.</p>
                            <div className="space-y-6 text-left">
                                <div className={`p-5 rounded-lg shadow-md animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><CheckCircle size={20} className="text-purple-600" /> Moderação de Conteúdo</h3>
                                    <p className="leading-relaxed">Todos os áudios enviados para veiculação na AELO são submetidos a um rigoroso processo de moderação. Nosso objetivo é assegurar que o conteúdo seja claro, objetivo e, acima de tudo, respeitoso e adequado para o público geral.</p>
                                    <p className="mt-2 leading-relaxed"><span className="font-bold text-red-600">Conteúdos Estritamente Proibidos:</span> Não serão veiculados áudios que contenham:</p>
                                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                                        <li>Mensagens de má-fé, difamação ou calúnia.</li>
                                        <li>Qualquer forma de discriminação (racial, de gênero, religiosa, sexual, etc.).</li>
                                        <li>Discurso de ódio ou incitação à violência.</li>
                                        <li>Conteúdo sexualmente explícito ou obsceno.</li>
                                        <li>Informações falsas ou enganosas.</li>
                                        <li>Conteúdo que viole direitos autorais ou de propriedade intelectual.</li>
                                        <li>Qualquer conteúdo que seja ilegal ou promova atividades ilícitas.</li>
                                    </ul>
                                    <p className="mt-4 leading-relaxed">A AELO se reserva o direito de recusar a veiculação de qualquer áudio que, a seu critério exclusivo, não esteja em conformidade com estas diretrizes, sem a necessidade de justificativa detalhada.</p>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><DollarSign size={20} className="text-orange-600" /> Política de Reembolso</h3>
                                    <p className="leading-relaxed">Entendemos que imprevistos podem acontecer. No entanto, é importante que você esteja ciente da nossa política de reembolso:</p>
                                    <p className="mt-2 leading-relaxed">Após o envio do áudio e a confirmação do pagamento, não haverá reembolso caso você desista da veiculação após 30 (trinta) minutos. Esta política se aplica mesmo que o áudio não esteja infringindo nenhuma das regras de conteúdo da empresa.</p>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Info size={20} className="text-blue-600" /> Responsabilidade do Usuário</h3>
                                    <p className="leading-relaxed">O usuário é o único responsável pelo conteúdo do áudio enviado, garantindo que ele não viole quaisquer leis, regulamentos ou direitos de terceiros. A AELO não se responsabiliza por quaisquer danos ou prejuízos decorrentes da veiculação de conteúdo inadequado ou ilícito enviado pelo usuário.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activePage === 'contato' && (
                        <div className={`p-8 rounded-xl shadow-xl max-w-4xl mx-auto mt-8 animate-fade-in ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">Fale Conosco: Sua Voz é Importante! <MessageSquare size={32} /></h2>
                            <p className="text-lg mb-6 leading-relaxed">Tem alguma dúvida, sugestão ou quer saber mais sobre como a AELO pode amplificar sua mensagem? Preencha o formulário abaixo ou use nossos canais de contato direto.</p>
                            
                            {/* Formulário de Contato */}
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-1">Seu Nome</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        className={`w-full p-3 rounded-lg border-2 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:outline-none focus:border-purple-500`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-1">Seu E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        className={`w-full p-3 rounded-lg border-2 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:outline-none focus:border-purple-500`}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold mb-1">Sua Mensagem</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        value={formMessage}
                                        onChange={(e) => setFormMessage(e.target.value)}
                                        className={`w-full p-3 rounded-lg border-2 ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'} focus:outline-none focus:border-purple-500`}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                                {formStatus && (
                                    <p className={`text-center font-semibold mt-4 ${formStatus.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{formStatus}</p>
                                )}
                            </form>

                            <hr className="my-8 border-gray-300 dark:border-gray-600" />
                            
                            <div className="space-y-6 text-left">
                                <h3 className="text-2xl font-bold mb-4">Ou Fale Diretamente Conosco:</h3>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Mail size={24} className="text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">E-mail</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Envie suas perguntas e sugestões para: <a href="mailto:Aelobrasil@gmail.com" className="text-purple-600 hover:underline">Aelobrasil@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up delay-100 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Phone size={24} className="text-orange-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">WhatsApp</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Para um atendimento rápido e direto, fale conosco pelo WhatsApp: <a href="https://wa.me/5514981150675" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">(14) 98115-0675</a></p>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-lg shadow-md flex items-start gap-4 animate-fade-in-up delay-200 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Info size={24} className="text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">Redes Sociais</h3>
                                        <p className="text-gray-600 dark:text-gray-300">Siga-nos no Instagram para ficar por dentro das novidades, dinâmicas e temporadas: <a href="https://www.instagram.com/aelovoz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@Aelovoz</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Rodapé aprimorado */}
            <footer className="bg-gradient-to-r from-purple-800 to-orange-700 text-white text-center p-6 mt-auto rounded-t-xl shadow-inner">
                <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                    <p>&copy; {currentYear} AELO. Todos os direitos reservados.</p>
                    <Bike size={24} className="text-white transform transition-transform duration-300 hover:rotate-[360deg]" />
                </div>
            </footer>
        </div>
    );
};

export default App;
