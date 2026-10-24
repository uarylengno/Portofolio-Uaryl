import { useRef, useState, type FormEvent } from 'react';
import { Bot, LoaderCircle, MessageCircle, Send, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function PortfolioChatbot() {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, messages: nextMessages.slice(-8) }),
      });
      const responseText = await response.text();
      let result: unknown;
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          response.status === 404
            ? t(
                'Endpoint chatbot belum tersedia. Hentikan lalu jalankan ulang server dengan npm run dev.',
                'The chatbot endpoint is unavailable. Stop and restart the server with npm run dev.'
              )
            : t(
                'Server memberikan respons yang tidak valid. Coba muat ulang halaman.',
                'The server returned an invalid response. Try refreshing the page.'
              )
        );
      }

      if (!response.ok) {
        const message =
          typeof result === 'object' && result !== null && 'error' in result &&
          typeof result.error === 'string'
            ? result.error
            : t('Chatbot belum dapat menjawab. Silakan coba lagi.', 'The chatbot could not respond. Please try again.');
        throw new Error(message);
      }

      if (
        typeof result !== 'object' ||
        result === null ||
        !('reply' in result) ||
        typeof result.reply !== 'string'
      ) {
        throw new Error(t('Respons AI tidak valid.', 'The AI returned an invalid response.'));
      }

      const reply = result.reply;
      if (typeof reply !== 'string') {
        throw new Error(t('Respons AI tidak valid.', 'The AI returned an invalid response.'));
      }
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : t('Terjadi kesalahan. Silakan coba lagi.', 'Something went wrong. Please try again.')
      );
    } finally {
      setLoading(false);
      requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <section
          aria-label={t('Chatbot portofolio', 'Portfolio chatbot')}
          className="mb-3 flex h-[min(32rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-primary px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <Bot size={22} aria-hidden="true" />
              <div>
                <h2 className="font-black">{t('Tanya tentang portofolio', 'Ask about the portfolio')}</h2>
                <p className="text-xs text-white/75">{t('Asisten AI', 'AI assistant')}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('Tutup chatbot', 'Close chatbot')}
              className="rounded-full p-2 hover:bg-white/15"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-background p-4" aria-live="polite">
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white p-3 text-sm text-dark shadow-sm">
              {t(
                'Halo! Saya bisa membantu menjawab pertanyaan tentang proyek, pengalaman, dan sertifikat di portofolio ini.',
                'Hi! I can answer questions about the projects, experience, and certificates in this portfolio.'
              )}
            </p>
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`max-w-[90%] whitespace-pre-wrap rounded-2xl p-3 text-sm ${
                  message.role === 'user'
                    ? 'ml-auto rounded-tr-sm bg-primary text-white'
                    : 'rounded-tl-sm bg-white text-dark shadow-sm'
                }`}
              >
                {message.content}
              </p>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted">
                <LoaderCircle size={16} className="animate-spin" />
                {t('Sedang menjawab...', 'Thinking...')}
              </div>
            )}
            {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
            <div ref={endRef} />
          </div>

          <p className="px-4 pt-2 text-xs text-muted">
            {t(
              'Pesan diproses oleh OpenAI. Jangan kirim informasi sensitif.',
              'Messages are processed by OpenAI. Do not share sensitive information.'
            )}
          </p>
          <form onSubmit={sendMessage} className="flex items-center gap-2 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={1500}
              aria-label={t('Tulis pertanyaan', 'Type your question')}
              placeholder={t('Tulis pertanyaan...', 'Type a question...')}
              className="min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t('Kirim pesan', 'Send message')}
              className="rounded-full bg-primary p-3 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? t('Tutup chatbot', 'Close chatbot') : t('Buka chatbot AI', 'Open AI chatbot')}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-dark shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
