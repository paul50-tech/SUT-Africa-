import React, { useState } from "react";
import { LoreArticle, Proverb } from "../types";
import { 
  BookOpen, 
  Sparkles, 
  TreePine, 
  Globe2, 
  Download, 
  FileText, 
  Quote, 
  RefreshCw, 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  ChevronRight,
  Sun,
  Flame,
  Volume2
} from "lucide-react";

interface LoreTabProps {
  articles: LoreArticle[];
  proverbs: Proverb[];
}

interface AIChatMessage {
  id: string;
  sender: "user" | "baobab";
  text: string;
  timestamp: string;
}

export const LoreTab: React.FC<LoreTabProps> = ({ articles, proverbs }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeArticle, setActiveArticle] = useState<LoreArticle | null>(null);
  const [proverbIndex, setProverbIndex] = useState<number>(0);
  const [proverbTheme, setProverbTheme] = useState<string>("all");

  // Gemini AI Chat State
  const [chatMessages, setChatMessages] = useState<AIChatMessage[]>([
    {
      id: "init-1",
      sender: "baobab",
      text: "Sawubona! I am The Baobab Wisdom Guide, an interactive voice of Indigenous African proverbs, Ubuntu philosophy, and sacred ecology. Ask me a question about our ancestral traditions, rivers, mountains, or community harmony.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState("");
  const [isConsulting, setIsConsulting] = useState(false);
  const [selectedTopicStyle, setSelectedTopicStyle] = useState("Ubuntu & Ecological Harmony");

  const [activeStickElder, setActiveStickElder] = useState(0);
  const talkingStickCouncil = [
    {
      role: "The Eagle Keepers (North & South Americas)",
      message: "When the Condor of the South and the Eagle of the North fly together, the Earth will awaken. Now, the African Martial Eagle joins our flight so all four corners of humanity sit in equality.",
      symbol: "🦅",
      speaker: "Elder Chief Looking Horse Tradition"
    },
    {
      role: "The Fire Keepers (Kalahari & Serengeti)",
      message: "Our ancestors taught that when the sacred fire is lit, no man or woman holds a weapon. In Ubuntu, we speak with one voice and listen with two ears.",
      symbol: "🔥",
      speaker: "San & Maasai Council of Elders"
    },
    {
      role: "The River & Ocean Keepers (Nile & Congo & Atlantic)",
      message: "Water has no enemy. Just as many tributaries flow into one great river, our 54 nations and thousands of tribes flow into one Indigenous African soul.",
      symbol: "🌊",
      speaker: "Yoruba & Kongo Water Stewards"
    },
    {
      role: "The Mountain Stewards (Mount Kenya & Kilimanjaro)",
      message: "We face the sacred peaks where our forefathers offered millet and milk. Let our standing stones remind our youth that their heritage is carved in granite, not sand.",
      symbol: "🏔️",
      speaker: "Kikuyu & Chagga High Plateau Guardians"
    }
  ];

  // Filter proverbs
  const filteredProverbs = proverbTheme === "all"
    ? proverbs
    : proverbs.filter(p => p.theme === proverbTheme);

  const currentProverb = filteredProverbs[proverbIndex % filteredProverbs.length] || proverbs[0];

  const handleNextProverb = () => {
    setProverbIndex((prev) => (prev + 1) % filteredProverbs.length);
  };

  // Filter articles
  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const handleAskBaobab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim() || isConsulting) return;

    const userMsgText = inputQuestion;
    const newMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputQuestion("");
    setIsConsulting(true);

    try {
      const response = await fetch("/api/wisdom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMsgText,
          topic: selectedTopicStyle
        })
      });

      const data = await response.json();
      const botMsg: AIChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "baobab",
        text: data.reply || "May the roots of our ancestors ground your spirit in truth.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "baobab",
          text: `[Ancestral Memory Note]: "When spider webs unite, they can tie up a lion." Even in offline mode, remember that Ubuntu binds all living things. Please check network connectivity or API secrets to resume live synthesis.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="space-y-20 pb-16 w-full max-w-[1600px] mx-auto">
      
      {/* 1. HERO & PROVERB OF THE WEEK GENERATOR */}
      <section className="bg-[#1A120B] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#5C3A21] shadow-2xl space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <Quote className="w-96 h-96 text-[#FFB74D]" />
        </div>

        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-md">
            <BookOpen className="w-4 h-4" />
            <span>Ancestral Wisdom Archive</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Wisdom Offerings & Lore: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB74D] via-[#FF8A00] to-[#E65100]">
              The Living Memory of the Continent
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAF6F0]/90 leading-relaxed font-light">
            Where the US SUT site features the Legend of Turtle Island, SUT Africa preserves our own digital library of cosmology, proverbs, and ecological lore. Discover the spiritual significance of Mount Kenya, the Nile River, and the sacred Baobab tree.
          </p>
        </div>

        {/* Proverb of the Week/Day Interactive Box */}
        <div className="relative z-10 bg-[#18120D]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border-2 border-[#D4A373]/60 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#5C3A21]/80 pb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-[#FFB74D] animate-pulse" />
              <span className="font-serif text-lg font-extrabold text-[#FAF6F0]">
                Interactive Proverb Generator
              </span>
              <span className="text-xs bg-[#5C2C16] px-2.5 py-1 rounded-md text-[#FFB74D] font-bold border border-[#D4A373]/30">
                Theme: {currentProverb.theme}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <select
                value={proverbTheme}
                onChange={(e) => {
                  setProverbTheme(e.target.value);
                  setProverbIndex(0);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#2C1D11] border border-[#D4A373]/60 text-xs font-bold text-[#FFB74D] focus:outline-none focus:ring-2 focus:ring-[#E65100]"
              >
                <option value="all">All Themes</option>
                <option value="Unity">Unity</option>
                <option value="Nature & Earth">Nature & Earth</option>
                <option value="Wisdom">Wisdom</option>
                <option value="Community">Community</option>
                <option value="Patience & Courage">Patience & Courage</option>
              </select>

              <button
                onClick={handleNextProverb}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white text-xs font-extrabold shadow-lg transition-all hover:scale-105 border border-[#FFB74D]/30"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Next Proverb</span>
              </button>
            </div>
          </div>

          <div className="text-center py-6 px-2 sm:px-10 space-y-5">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-extrabold italic leading-tight tracking-wide">
              "{currentProverb.quote}"
            </p>
            
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2C1D11] border border-[#D4A373]/60 text-[#FFB74D] text-xs font-bold shadow-inner">
              <span>{currentProverb.tribe}</span>
              <span className="text-[#E65100]">•</span>
              <span className="text-[#FAF6F0]">{currentProverb.country}</span>
            </div>

            <p className="text-sm sm:text-base text-[#FAF6F0]/90 max-w-2xl mx-auto font-light leading-relaxed">
              <span className="font-extrabold text-[#FFB74D]">Meaning: </span>
              {currentProverb.meaning}
            </p>

            {currentProverb.pronunciationHint && (
              <p className="text-xs text-[#D4A373] italic pt-1 font-medium">
                💡 <span className="text-white font-bold">Cultural Note:</span> {currentProverb.pronunciationHint}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 1.5. THE SACRED TALKING STICK & LIBATION VESSEL COUNCIL */}
      <section className="bg-gradient-to-br from-[#1A120B] via-[#2C1D11] to-[#1A120B] rounded-3xl p-6 sm:p-12 border-2 border-[#D4A373] shadow-2xl text-white space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
        
        <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5C2C16] border border-[#D4A373]/60 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FFB74D]" />
            <span>Gathering of Eagles Ceremony • Council Protocol</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Sacred Talking Stick & Libation Council
          </h2>
          <p className="text-sm sm:text-base text-[#FAF6F0]/90 font-light leading-relaxed">
            In our gatherings, whoever holds the Sacred Talking Stick holds the ear of the entire continent. Click the ceremonial council chairs below to hear the proclamations of the global Indigenous wings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Council Chair Selection */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E65100] block px-1">
              Select Council Speaker
            </span>
            {talkingStickCouncil.map((c, idx) => {
              const isSelected = activeStickElder === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStickElder(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white border-[#FFB74D] shadow-xl scale-[1.02] font-extrabold"
                      : "bg-[#18120D] text-[#D4A373] border-[#5C3A21] hover:border-[#D4A373]/70 hover:bg-[#2C1D11] font-semibold"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-black/20 p-2 rounded-xl border border-white/10">{c.symbol}</span>
                    <div>
                      <span className="text-xs uppercase tracking-wider block opacity-80">{c.speaker}</span>
                      <span className="font-serif text-base sm:text-lg font-bold text-white block">{c.role}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? "translate-x-1 text-[#FFB74D]" : "text-[#5C3A21]"}`} />
                </button>
              );
            })}
          </div>

          {/* Talking Stick Proclamation Box */}
          <div className="lg:col-span-7 bg-[#18120D] p-8 sm:p-10 rounded-3xl border-2 border-[#D4A373] shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#5C3A21] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#5C2C16] border border-[#D4A373] flex items-center justify-center text-2xl shadow-md">
                  {talkingStickCouncil[activeStickElder].symbol}
                </div>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#E65100] block">
                    Holding the Sacred Talking Stick
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">
                    {talkingStickCouncil[activeStickElder].role}
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#E65100]/20 text-[#FFB74D] border border-[#E65100]/50">
                Live Council Voice
              </span>
            </div>

            <p className="text-base sm:text-xl text-[#FAF6F0] font-serif italic leading-relaxed bg-[#2C1D11]/60 p-6 rounded-2xl border border-[#5C3A21] shadow-inner">
              "{talkingStickCouncil[activeStickElder].message}"
            </p>

            <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-[#D4A373]">
              <span>Speaker: {talkingStickCouncil[activeStickElder].speaker}</span>
              <span className="text-[#FFB74D] uppercase tracking-wider">Aho • Ubuntu • Amen</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE BAOBAB WISDOM GUIDE (GEMINI AI INTERACTIVE ADVISOR) */}
      <section className="bg-[#1A120B] rounded-3xl p-6 sm:p-12 border-2 border-[#5C3A21] shadow-2xl text-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
          
          {/* Left Column: Explanatory Card */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <Bot className="w-4 h-4 text-[#FFB74D]" />
              <span>AI Studio Powered</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Consult The Baobab Wisdom Guide
            </h2>

            <p className="text-sm text-[#FAF6F0]/90 leading-relaxed font-light">
              Our interactive AI advisor is trained on African proverbs, Ubuntu cosmology, and Indigenous ecological stewardship. Ask for advice on community harmony, natural conservation, or tribal philosophies.
            </p>

            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-[#FFB74D] uppercase tracking-wider block">
                Sample Questions to Try:
              </span>
              <button
                onClick={() => setInputQuestion("What is the spiritual significance of the Baobab tree in West Africa?")}
                className="w-full text-left p-3 rounded-xl bg-[#2C1D11]/80 hover:bg-[#3E2315] border border-[#D4A373]/40 text-xs text-[#FAF6F0] transition-all flex items-center justify-between group shadow-sm"
              >
                <span className="font-medium">"Significance of the Baobab tree?"</span>
                <ChevronRight className="w-4 h-4 text-[#E65100] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setInputQuestion("How can young Africans apply Ubuntu to stop deforestation?")}
                className="w-full text-left p-3 rounded-xl bg-[#2C1D11]/80 hover:bg-[#3E2315] border border-[#D4A373]/40 text-xs text-[#FAF6F0] transition-all flex items-center justify-between group shadow-sm"
              >
                <span className="font-medium">"Applying Ubuntu to stop deforestation?"</span>
                <ChevronRight className="w-4 h-4 text-[#E65100] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setInputQuestion("Tell me a Maasai proverb about rain and livestock.")}
                className="w-full text-left p-3 rounded-xl bg-[#2C1D11]/80 hover:bg-[#3E2315] border border-[#D4A373]/40 text-xs text-[#FAF6F0] transition-all flex items-center justify-between group shadow-sm"
              >
                <span className="font-medium">"Maasai proverb about rain & cattle?"</span>
                <ChevronRight className="w-4 h-4 text-[#E65100] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right 2 Columns: Chat Window */}
          <div className="lg:col-span-2 bg-[#18120D] rounded-2xl border-2 border-[#5C3A21] flex flex-col h-[500px] overflow-hidden shadow-2xl">
            
            {/* Chat Header */}
            <div className="bg-[#2C1D11] px-5 py-3.5 border-b-2 border-[#5C3A21] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FFB74D] to-[#E65100] flex items-center justify-center p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-[#1A120B] flex items-center justify-center">
                    <TreePine className="w-4 h-4 text-[#FFB74D]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif font-extrabold text-sm text-white">The Baobab Guide</h3>
                  <p className="text-[10px] text-[#A5D6A7] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                    <span>Active Digital Archive</span>
                  </p>
                </div>
              </div>

              <select
                value={selectedTopicStyle}
                onChange={(e) => setSelectedTopicStyle(e.target.value)}
                className="bg-[#18120D] border border-[#D4A373]/60 text-[11px] font-bold text-[#FFB74D] px-3 py-1.5 rounded-lg focus:outline-none"
              >
                <option value="Ubuntu & Ecological Harmony">Ubuntu & Ecology</option>
                <option value="Griot Oral Storytelling">Griot Storytelling</option>
                <option value="Traditional Elder Peacemaking">Elder Peacemaking</option>
              </select>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                    msg.sender === "user"
                      ? "bg-[#E65100] text-white"
                      : "bg-[#3E2315] text-[#FFB74D] border border-[#D4A373]/60"
                  }`}>
                    {msg.sender === "user" ? <User className="w-4 h-4" /> : <TreePine className="w-4 h-4 text-[#FFB74D]" />}
                  </div>

                  <div className={`max-w-[80%] rounded-2xl px-4 py-3.5 text-xs sm:text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#E65100] to-[#D84315] text-white rounded-tr-none font-medium"
                      : "bg-[#2C1D11] text-[#FAF6F0] border border-[#5C3A21] rounded-tl-none leading-relaxed whitespace-pre-wrap font-light"
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-2 font-semibold ${msg.sender === "user" ? "text-[#FFD8B5]" : "text-[#D4A373]"}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              {isConsulting && (
                <div className="flex items-center gap-2 text-xs text-[#FFB74D] font-bold italic animate-pulse px-3">
                  <Sparkles className="w-4 h-4" />
                  <span>The Baobab Guide is synthesizing ancestral proverbs...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAskBaobab} className="p-3.5 bg-[#2C1D11] border-t-2 border-[#5C3A21] flex items-center gap-2.5">
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder="Ask about proverbs, sacred rivers, Ubuntu, or tribal harmony..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#18120D] border border-[#D4A373]/60 text-xs sm:text-sm text-white placeholder-[#D4A373]/60 focus:outline-none focus:ring-2 focus:ring-[#E65100] font-medium"
              />
              <button
                type="submit"
                disabled={isConsulting || !inputQuestion.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] disabled:opacity-50 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 border border-[#FFB74D]/30"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5 text-[#FFB74D]" />
              </button>
            </form>

          </div>

        </div>
      </section>

      {/* 3. AFRICAN COSMOLOGY & LORE ARTICLES */}
      <section className="space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-2 border-[#D4A373]/40 pb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E65100]">
              Sacred Geography & History
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A120B] mt-1 tracking-tight">
              Sacred Cosmology & Geographic Lore
            </h2>
            <p className="text-sm sm:text-base text-[#5C4033] mt-1 font-medium">
              Explore origin stories and why specific animals, mountains, and rivers are revered as divine guardians.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Offerings" },
              { id: "Sacred Geography", label: "Mountains & Rivers" },
              { id: "Sacred Flora & Fauna", label: "Flora & Fauna" },
              { id: "Cosmology", label: "Cosmology" },
              { id: "Mythology", label: "Ubuntu Philosophy" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#1A120B] text-[#FFB74D] shadow-lg border border-[#D4A373]"
                    : "bg-[#FAF6F0] text-[#5C4033] hover:bg-[#EFEBE6] border border-[#D4A373]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white rounded-2xl overflow-hidden border-2 border-[#D4A373]/60 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between hover:border-[#E65100]/80"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#5C2C16]/90 text-[#FFB74D] text-xs font-extrabold uppercase tracking-wider border border-[#D4A373]/50 shadow-md">
                      {article.category}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-[#1A120B]/80 text-white text-xs font-bold shadow-md">
                      {article.region}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#FFB74D] transition-colors leading-tight tracking-tight">
                      {article.title}
                    </h3>
                  </div>
                </div>

                <div className="p-7 space-y-3.5">
                  <p className="text-xs text-[#E65100] font-extrabold uppercase tracking-wider italic">
                    {article.subtitle}
                  </p>
                  <p className="text-sm text-[#5C4033] leading-relaxed line-clamp-3 font-light">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-4 border-t-2 border-[#D4A373]/20 flex items-center justify-between text-xs font-bold text-[#8C5319]">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#E65100]" />
                  <span>{article.readTime}</span>
                </span>
                <span className="text-[#E65100] group-hover:underline flex items-center gap-1 font-extrabold">
                  <span>Read Sacred Scroll</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIGITAL CONSERVATION LIBRARY (DOWNLOADS) */}
      <section className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-14 border-2 border-[#D4A373] shadow-2xl space-y-8">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E65100]">
            Resource Download Center
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A120B] mt-1 tracking-tight">
            Digital Library: Sacred Ecology & Conservation Flyers
          </h2>
          <p className="text-sm text-[#5C4033] max-w-2xl mt-1 font-medium">
            Downloadable PDFs, trifolds, and flyers designed for mobile-first sharing and community educational workshops across villages and schools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((art, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border-2 border-[#D4A373]/60 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between hover:border-[#E65100]/60"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8E7] text-[#E65100] border border-[#D4A373]/40 flex items-center justify-center mb-4 shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-extrabold text-[#1A120B] text-base mb-1.5 tracking-tight">
                  {art.pdfTitle || `${art.title.split(":")[0]} Guide`}
                </h4>
                <p className="text-xs text-[#5C4033] mb-5 font-light leading-relaxed">
                  Official SUT Africa trifold covering sacred ecology and traditional protection taboos.
                </p>
              </div>

              <button
                onClick={() => alert(`Downloading: ${art.pdfTitle || art.title}... (Simulated PDF download for AI Studio mobile preview)`)}
                className="w-full py-3 rounded-xl bg-[#1A120B] hover:bg-[#E65100] text-[#FFB74D] hover:text-white text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                <span>{art.pdfSize || "2.1 MB PDF"}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF6F0] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#D4A373] relative">
            
            {/* Modal Image Header */}
            <div className="relative h-80">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/60 to-transparent" />
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-[#1A120B]/80 hover:bg-[#E65100] text-white transition-all font-bold shadow-lg"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-8 right-8">
                <span className="px-3.5 py-1 rounded-lg bg-[#E65100] text-white text-xs font-extrabold uppercase tracking-wider mb-2.5 inline-block shadow-md">
                  {activeArticle.category} • {activeArticle.region}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 sm:p-12 space-y-8 bg-white m-4 sm:m-6 rounded-3xl border border-[#D4A373]/40 shadow-inner">
              <div className="p-5 rounded-2xl bg-[#FFF8E7] border-2 border-[#D4A373]/50 text-base sm:text-lg text-[#5C4033] font-serif italic leading-relaxed font-semibold">
                {activeArticle.subtitle}
              </div>

              <div className="space-y-5 text-base sm:text-lg text-[#5C4033] leading-relaxed font-light">
                {activeArticle.fullText.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-8 border-t-2 border-[#D4A373]/30 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="text-xs font-bold text-[#8C5319]">
                  <span>Part of the SUT Africa Ancestral Library • Rooted in Ubuntu</span>
                </div>
                <button
                  onClick={() => alert(`Downloading: ${activeArticle.pdfTitle || activeArticle.title}...`)}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white text-sm font-extrabold shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 border border-[#FFB74D]/30"
                >
                  <Download className="w-4 h-4 text-[#FFB74D]" />
                  <span>Download Trifold PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
