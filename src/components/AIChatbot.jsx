import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I am Uni-Buddy, your AI assistant for Kyungmin University. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const suggestedQuestions = [
    "How do I extend my D-2 Visa?",
    "Best restaurants near Kyungmin University?",
    "What are the dorm rules?",
    "Can I work part-time with a student visa?"
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: `This is a simulated response to: "${text}". In a real environment, this would connect to an AI backend.` 
      }]);
    }, 1500);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-20 relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">AntiGravity Chatbot</h2>
        <p className="text-slate-600 dark:text-slate-400">Powered by advanced AI to answer all your international student queries.</p>
      </div>

      <div className="glass dark:glass-dark rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 shadow-2xl flex flex-col h-[600px]">
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-ai-purple ml-3' : 'bg-gradient-to-tr from-ai-cyan to-ai-purple mr-3'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                </div>

                {/* Bubble */}
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-ai-purple text-white rounded-tr-none shadow-md shadow-ai-purple/20' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.content}
                </div>

              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex flex-row">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-ai-cyan to-ai-purple mr-3">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
          
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {suggestedQuestions.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-4 py-2 text-sm rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-ai-cyan/10 hover:text-ai-cyan transition-colors border border-transparent hover:border-ai-cyan/30"
              >
                <Sparkles className="w-3 h-3 inline-block mr-1 text-ai-purple" />
                {q}
              </button>
            ))}
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask me anything..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-4 pl-6 pr-16 focus:ring-2 focus:ring-ai-purple focus:outline-none dark:text-white"
            />
            <button 
              onClick={() => handleSend(input)}
              className="absolute right-2 p-2 bg-ai-purple text-white rounded-full hover:scale-105 transition-transform"
            >
              <Send className="w-5 h-5 pl-0.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
