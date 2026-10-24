import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { useT } from "../../i18n/useT";
import { BRAND } from "../../config/brand";
import { generateSahayakResponse } from "../../services/sahayakBot";

export default function AIAssistantModal({ onNavigate }) {
  const { t, lang } = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: t(
        "assistant.welcome",
        "Namaste! I am Sahayak, your SahkarSathi Assistant. How can I help you support workers or book services today?"
      ),
      time: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const chips = [
    t("assistant.chips.0", "Book electrician"),
    t("assistant.chips.1", "Book team / crew"),
    t("assistant.chips.2", "Check price rates"),
    t("assistant.chips.3", "Verify worker ID / QR"),
    t("assistant.chips.4", "How it works"),
  ];

  const cannedReplies = {
    "Book electrician":
      "Our certified electricians are available starting at ₹249/visit with zero surge pricing. Would you like to schedule an immediate visit or submit specific details?",
    "Book team / crew":
      "For team projects (renovations, masonry, painting, construction), we assemble a multi-trade team led by a Master Site Supervisor. Funds remain safe in escrow!",
    "Check price rates":
      "SahkarSathi rates are fixed democratically: Plumbing (₹299/visit), Electrical (₹249/visit), AC Repair (₹499/visit), Painting (₹14/sq ft), Cleaning (₹399/visit). No surge pricing ever.",
    "Verify worker ID / QR":
      "You can enter any 8-digit Cooperative ID or scan their QR code at /verify to check Aadhaar eKYC, police clearance, and trade skills certificates.",
    "How it works":
      "1. Post your requirement → 2. AI fair rotation matches verified cooperative craftspeople → 3. Receive transparent quote → 4. Pay safely upon verified satisfaction.",
    // Hindi replies
    "इलेक्ट्रीशियन बुक करें":
      "हमारे प्रमाणित इलेक्ट्रीशियन ₹249/विज़िट से उपलब्ध हैं। क्या आप विज़िट शेड्यूल करना चाहते हैं?",
    "टीम / क्रू बुक करें":
      "टीम परियोजनाओं के लिए हम एक मास्टर सुपरवाइजर नियुक्त करते हैं जो सुरक्षित एस्क्रो के तहत काम करता है।",
    "मूल्य दरें जांचें":
      "सहकारसाथी मानक सहकारी दरों पर काम करता है! प्लंबिंग ₹299/विज़िट, इलेक्ट्रिकल ₹249/विज़िट, एसी रिपेयर ₹499/विज़िट।",
    "कारीगर ID / QR सत्यापित करें":
      "आप किसी भी साथी के डिजिटल कार्ड पर QR कोड स्कैन कर सकते हैं या /verify पर उनकी आईडी दर्ज कर सकते हैं।",
    "यह कैसे काम करता है":
      "1. आवश्यकता दर्ज करें → 2. निष्पक्ष रोटेशन चयन → 3. पारदर्शी दर → 4. संतुष्टि पर सुरक्षित भुगतान।",
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg = {
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Generate response using Sahayak engine
    setTimeout(() => {
      let replyText = cannedReplies[query];
      let actionRoute = null;

      if (replyText) {
        if (/electric/i.test(query)) actionRoute = "/book";
        else if (/team|क्रू/i.test(query)) actionRoute = "/projects";
        else if (/price|दरें/i.test(query)) actionRoute = "/services";
        else if (/qr|id|सत्यापित/i.test(query)) actionRoute = "/verify";
        else if (/how|कैसे/i.test(query)) actionRoute = "/services";
      } else {
        const response = generateSahayakResponse(query, lang);
        replyText = response.text;
        actionRoute = response.actionRoute;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionRoute,
        },
      ]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={t("assistant.title", "SahkarSathi Assistant")}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary text-bg font-semibold shadow-2xl hover:bg-primary-hover transition-all duration-300 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-bg" />
          </div>
          <span className="text-sm hidden sm:inline-block font-heading">
            {t("assistant.title", "SahkarSathi Assistant")}
          </span>
          <span className="sm:hidden text-xs">AI Helper</span>
        </button>
      </div>

      {/* Chat Panel Modal / Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("assistant.title", "SahkarSathi Assistant")}
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[520px] rounded-card bg-surface border border-primary/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-surface-2 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text font-heading">
                  {t("assistant.title", "SahkarSathi Assistant")}
                </h3>
                <span className="text-[10px] text-primary flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span>{t("assistant.online", "Cooperative AI • Online")}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant panel"
              className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-md bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-bg font-medium rounded-tr-none"
                      : "bg-surface-2 border border-border text-text rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.actionRoute && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate(msg.actionRoute);
                      }}
                      className="inline-flex items-center gap-1 mt-2 font-bold text-primary hover:underline text-xs"
                    >
                      <span>Proceed to {msg.actionRoute}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === "user" ? "text-bg/70" : "text-text-muted"
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick-reply chips */}
          <div className="px-3 py-2 border-t border-border/80 bg-surface-2/40">
            <span className="text-[10px] text-text-muted uppercase font-semibold block mb-1.5">
              Quick Inquiries:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pb-1">
              {chips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(chip)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-surface border border-border hover:border-primary/50 text-text-muted hover:text-text hover:bg-surface-2 transition-colors whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-border bg-surface-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("assistant.placeholder", "Ask about services or rates...")}
                className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-xs text-text placeholder:text-text-muted/60 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                aria-label={t("assistant.send", "Send")}
                disabled={!inputValue.trim()}
                className="p-2 rounded-xl bg-primary text-bg hover:bg-primary-hover disabled:opacity-40 disabled:hover:bg-primary transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
