import { useState } from "react";
import { Icon } from "@iconify/react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Use existing endpoint structure but log for now as backend might need update
      console.log("Sending request with data:", { question: inputMessage });

      // Sanitize API URL: remove trailing /api
      let baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      baseUrl = baseUrl.replace(/\/api$/, ''); // Remove trailing /api if present

      const response = await fetch(
        `${baseUrl}/api/chat/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: inputMessage,
          }),
        }
      );

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error("Invalid JSON response");
      }

      if (data.success) {
        const botMessage = {
          type: "bot",
          content: data.data.answer,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "API returned an error");
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback response for demo if API fails
      const botMessage = {
        type: "bot",
        content:
          "Thanks for your message! Our team is currently out on the pasture. Please use the Contact form for immediate orders.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
      setInputMessage("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-xl transition-all hover:scale-105"
      >
        {isOpen ? (
          <Icon icon="solar:close-circle-linear" width="28" height="28" />
        ) : (
          <Icon icon="solar:chat-round-dots-linear" width="28" height="28" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 bg-background rounded-lg shadow-2xl border border-primary/20 overflow-hidden animate-fade-in-up">
          <div className="p-4 bg-primary text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon icon="solar:user-speak-linear" width="24" height="24" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-none">Farm Assistant</h3>
              <span className="text-xs text-white/70">Ask about our products</span>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 bg-white/50 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-text/50 my-8">
                <Icon icon="solar:leaf-linear" width="48" height="48" className="mx-auto mb-2 opacity-20" />
                <p>Hello! Ask us about our pasture-raised beef, pork, chicken, and more.</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${message.type === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white border border-primary/10 text-text rounded-bl-none shadow-sm"
                    }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-primary/10 p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-primary/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-primary/20 rounded-full text-sm focus:outline-none focus:border-primary bg-background"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-secondary text-white p-2 rounded-full hover:bg-secondary/90 disabled:opacity-50 transition-colors"
              >
                <Icon icon="solar:plain-3-bold" width="20" height="20" className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
