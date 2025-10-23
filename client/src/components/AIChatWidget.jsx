import { useState, useRef, useEffect } from "react"

// Enhanced knowledge base with context understanding
const AI_KNOWLEDGE_BASE = {
  store: {
    hours: {
      weekday: "10:00 AM - 9:00 PM",
      weekend: "11:00 AM - 6:00 PM",
      online: "24/7",
    },
    address: "No 168 , High Level road , Nugegoda",
    phone: "+775019192",
    email: "support@varashop.com",
  },
  delivery: {
    standard: "3-5 business days",
    express: "1-2 business days",
    freeThreshold: 2999,
    areas: "All across India",
  },
  returns: {
    period: "30 days",
    condition: "Unworn with original tags",
    process: "Easy online return process",
  },
  products: {
    categories: [
      "Casual Dresses",
      "Party Wear",
      "Traditional",
      "Wedding Collection",
      "Office Formals",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    materials: ["Silk", "Cotton", "Chiffon", "Georgette", "Linen"],
  },
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState({})
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm VARA AI, your fashion assistant. I can help you with:\n• Dress availability & sizes\n• Store timings & location\n• Delivery & returns\n• Product recommendations\n\nWhat would you like to know? 👗✨",
        isBot: true,
        timestamp: new Date(),
      },
    ])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // GPT-style intelligent response generator
  const generateAIResponse = (userMessage, context) => {
    const message = userMessage.toLowerCase().trim()

    // Greeting patterns
    if (/(hi|hello|hey|namaste|good morning|good afternoon)/.test(message)) {
      return "Hello! 👋 I'm VARA AI, your fashion assistant. How can I help you today?"
    }

    // Store hours with context understanding
    if (/(time|open|close|hour|timing|sunday|weekend)/.test(message)) {
      if (message.includes("sunday") || message.includes("weekend")) {
        return `On Sundays, our physical store is open from ${AI_KNOWLEDGE_BASE.store.hours.weekend}. However, you can shop online ${AI_KNOWLEDGE_BASE.store.hours.online}! 🛍️`
      }
      return `Our store hours are:\n• Monday-Saturday: ${AI_KNOWLEDGE_BASE.store.hours.weekday}\n• Sunday: ${AI_KNOWLEDGE_BASE.store.hours.weekend}\n• Online: ${AI_KNOWLEDGE_BASE.store.hours.online} 🌟`
    }

    // Location and address
    if (/(where|location|address|place|store|visit)/.test(message)) {
      return `📍 Our flagship store is located at:\n${AI_KNOWLEDGE_BASE.store.address}\n\nWe also deliver ${AI_KNOWLEDGE_BASE.delivery.areas}. Would you like directions? 🗺️`
    }

    // Delivery information
    if (
      /(deliver|shipping|dispatch|reach|when.*get|how long.*take)/.test(message)
    ) {
      if (message.includes("express") || message.includes("fast")) {
        return `🚀 Express delivery: ${AI_KNOWLEDGE_BASE.delivery.express}\n• Additional charges apply\n• Order before 2 PM for same-day dispatch\n\nStandard delivery: ${AI_KNOWLEDGE_BASE.delivery.standard}\n• Free on orders above Rs ${AI_KNOWLEDGE_BASE.delivery.freeThreshold}`
      }
      return `📦 Delivery Information:\n• Standard: ${AI_KNOWLEDGE_BASE.delivery.standard}\n• Express: ${AI_KNOWLEDGE_BASE.delivery.express}\n• Free shipping on orders above Rs ${AI_KNOWLEDGE_BASE.delivery.freeThreshold}\n• We deliver ${AI_KNOWLEDGE_BASE.delivery.areas}`
    }

    // Returns and exchanges
    if (/(return|exchange|refund|replace|wrong size)/.test(message)) {
      return `🔄 Returns & Exchanges:\n• ${AI_KNOWLEDGE_BASE.returns.period} return policy\n• Items must be ${AI_KNOWLEDGE_BASE.returns.condition}\n• ${AI_KNOWLEDGE_BASE.returns.process}\n• Refunds processed within 5-7 business days`
    }

    // Product availability and categories
    if (/(dress|product|item|collection|available|stock|have)/.test(message)) {
      if (
        message.includes("category") ||
        message.includes("type") ||
        message.includes("kind")
      ) {
        return `We have ${
          AI_KNOWLEDGE_BASE.products.categories.length
        } main categories:\n${AI_KNOWLEDGE_BASE.products.categories
          .map((cat) => `• ${cat}`)
          .join("\n")}\n\nWhich category interests you? 💫`
      }
      if (message.includes("size") || message.includes("fit")) {
        return `We offer sizes: ${AI_KNOWLEDGE_BASE.products.sizes.join(
          ", "
        )}\n\nEach product has a detailed size chart. For perfect fit, I recommend checking the size guide on the product page! 📏`
      }
      return "Yes! We have a wide range of beautiful dresses in stock. All products shown on our website are available. For specific size availability, check the product page or ask me about a particular dress! 👗"
    }

    // Contact information
    if (/(contact|call|phone|email|whatsapp|number|reach)/.test(message)) {
      return `📞 Contact Us:\n• Phone: ${AI_KNOWLEDGE_BASE.store.phone}\n• Email: ${AI_KNOWLEDGE_BASE.store.email}\n• Live Chat: Available 24/7 (that's me! 😊)\n• Store: ${AI_KNOWLEDGE_BASE.store.address}`
    }

    // Price and payment
    if (/(price|cost|expensive|cheap|discount|offer|sale)/.test(message)) {
      return `💰 We offer competitive pricing with regular discounts and sales! \n• Prices are clearly mentioned on each product\n• Free shipping on orders above Rs ${AI_KNOWLEDGE_BASE.delivery.freeThreshold}\n• Subscribe to our newsletter for exclusive offers! 🎁`
    }

    // Materials and quality
    if (
      /(material|fabric|quality|silky|cotton|chiffon|georgette)/.test(message)
    ) {
      return `We use premium materials for all our dresses:\n${AI_KNOWLEDGE_BASE.products.materials
        .map((mat) => `• ${mat}`)
        .join(
          "\n"
        )}\n\nEach product description includes detailed fabric information for your comfort! 🌟`
    }

    // Thank you responses
    if (/(thanks|thank you|thankyou|appreciate)/.test(message)) {
      return "You're welcome! 😊 I'm always here to help with your fashion needs. Is there anything else you'd like to know?"
    }

    // Default intelligent response
    return `I understand you're asking about "${userMessage}". While I'm specialized in fashion and store information, I'd be happy to help you with:\n\n• Dress collections and availability\n• Store timings and location\n• Delivery and return policies\n• Size guides and recommendations\n\nCould you rephrase your question, or ask me about our fashion products? 👗✨`
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking and generate response
    setTimeout(() => {
      const botResponse = generateAIResponse(inputMessage, conversationContext)
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Update conversation context for future responses
      setConversationContext((prev) => ({
        ...prev,
        lastTopic: inputMessage.toLowerCase(),
        messageCount: (prev.messageCount || 0) + 1,
      }))
    }, 1500 + Math.random() * 1000) // Variable delay for natural feel
  }

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Quick question suggestions
  const quickQuestions = [
    "What are your store timings?",
    "Do you have this dress in size M?",
    "What's your return policy?",
    "How long does delivery take?",
    "Where is your store located?",
    "Do you have party wear dresses?",
  ]

  return (
    <>
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group hover:shadow-xl"
      >
        <div className="relative">
          <span className="text-white text-2xl">🤖</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* Tooltip */}
        <div className="absolute right-20 bottom-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          Chat with VARA AI
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <div>
                <h3 className="font-semibold">VARA AI Assistant</h3>
                <p className="text-teal-100 text-sm">AI Powered • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-teal-200 transition-colors hover:scale-110"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Quick Questions */}
          <div className="p-3 bg-gray-50 border-b">
            <p className="text-xs text-gray-600 mb-2 font-medium">
              Quick questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="bg-white border border-teal-200 text-teal-700 text-xs px-3 py-1 rounded-full hover:bg-teal-50 transition-colors hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.isBot
                      ? "bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm"
                      : "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-tr-none shadow-md"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.isBot ? "text-gray-500" : "text-teal-100"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      VARA AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask VARA AI anything about fashion..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Powered by AI • Understands context • Real-time responses
            </p>
          </div>
        </div>
      )}
    </>
  )
}
