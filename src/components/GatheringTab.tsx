import React, { useState } from "react";
import { TabType, EventInfo, WorkshopProposal } from "../types";
import { 
  Calendar, 
  MapPin, 
  Sparkles, 
  Clock, 
  User, 
  PlusCircle, 
  CheckCircle2, 
  BookOpen, 
  HeartHandshake, 
  ShieldAlert, 
  TreePine, 
  Flame, 
  Music, 
  Users,
  Compass,
  ArrowRight
} from "lucide-react";

interface GatheringTabProps {
  event: EventInfo;
  proposals: WorkshopProposal[];
  onAddProposal: (proposal: WorkshopProposal) => void;
  setActiveTab: (tab: TabType) => void;
  onOpenSponsorModal: () => void;
}

export const GatheringTab: React.FC<GatheringTabProps> = ({
  event,
  proposals,
  onAddProposal,
  setActiveTab,
  onOpenSponsorModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [ribbons, setRibbons] = useState<{ id: string; color: string; author: string; text: string; direction: string }[]>([
    { id: "rib-1", color: "yellow", author: "Mama Wangari (Kenya)", text: "May the sunrise of illumination guide Africa's children to peace.", direction: "East • Illumination" },
    { id: "rib-2", color: "red", author: "Brother Amadou (Senegal)", text: "For our youth entering their rites of passage with strength and pride.", direction: "South • Vitality" },
    { id: "rib-3", color: "blue", author: "Sister Thandiwe (South Africa)", text: "May our rivers heal and our hearts forgive across all tribal borders.", direction: "West • Cleansing" },
    { id: "rib-4", color: "white", author: "Elder Osei (Ghana)", text: "We honor the unwritten libraries of our grandfathers and grandmothers.", direction: "North • Ancestors" },
  ]);
  const [newRibbonAuthor, setNewRibbonAuthor] = useState("");
  const [newRibbonText, setNewRibbonText] = useState("");
  const [newRibbonColor, setNewRibbonColor] = useState("yellow");
  const [isFireBurning, setIsFireBurning] = useState(true);

  const handleAddRibbon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRibbonText.trim()) return;
    const dirMap: Record<string, string> = {
      yellow: "East • Illumination",
      red: "South • Vitality",
      blue: "West • Cleansing",
      white: "North • Ancestors"
    };
    const newRib = {
      id: `rib-${Date.now()}`,
      color: newRibbonColor,
      author: newRibbonAuthor.trim() || "Anonymous Ubuntu Supporter",
      text: newRibbonText.trim(),
      direction: dirMap[newRibbonColor] || "Sacred Offering"
    };
    setRibbons(prev => [newRib, ...prev]);
    setNewRibbonText("");
    setNewRibbonAuthor("");
  };

  // Form State
  const [formData, setFormData] = useState({
    submitterName: "",
    tribeOrAffiliation: "",
    email: "",
    phone: "",
    title: "",
    category: "Herbal Medicine" as WorkshopProposal["category"],
    description: "",
    format: "Interactive Workshop" as WorkshopProposal["format"],
    duration: "1.5 Hours",
  });

  const categories = [
    { id: "all", label: "All Activities", icon: <Compass className="w-4 h-4 text-[#FFB74D]" /> },
    { id: "ceremony", label: "Sunrise Libations & Blessings", icon: <Sparkles className="w-4 h-4 text-[#FFB74D]" /> },
    { id: "storytelling", label: "Under the Baobab Tree", icon: <BookOpen className="w-4 h-4 text-[#E65100]" /> },
    { id: "healing", label: "Drumming & Trance Healing", icon: <Music className="w-4 h-4 text-[#BF360C]" /> },
    { id: "youth", label: "Youth Rites of Passage", icon: <Users className="w-4 h-4 text-[#8C5319]" /> },
    { id: "ecology", label: "Sacred Ecology & Farming", icon: <TreePine className="w-4 h-4 text-[#2E7D32]" /> },
  ];

  const filteredSchedule = selectedCategory === "all"
    ? event.schedule
    : event.schedule.filter(s => s.category === selectedCategory);

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const newProposal: WorkshopProposal = {
      id: `prop-${Date.now()}`,
      submitterName: formData.submitterName,
      tribeOrAffiliation: formData.tribeOrAffiliation || "Independent Earth Keeper",
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      format: formData.format,
      duration: formData.duration,
      dateSubmitted: new Date().toISOString().split("T")[0],
      status: "Pending Review"
    };

    onAddProposal(newProposal);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      setFormData({
        submitterName: "",
        tribeOrAffiliation: "",
        email: "",
        phone: "",
        title: "",
        category: "Herbal Medicine",
        description: "",
        format: "Interactive Workshop",
        duration: "1.5 Hours"
      });
    }, 2000);
  };

  return (
    <div className="space-y-20 pb-16 w-full max-w-[1600px] mx-auto">
      
      {/* 1. HERO BANNER: THE GATHERING OVERVIEW */}
      <section className="relative rounded-3xl overflow-hidden bg-[#1A120B] text-white shadow-2xl border-2 border-[#5C3A21]">
        <div className="absolute inset-0">
          <img
            src={event.heroImage}
            alt={event.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B] via-[#1A120B]/85 to-[#1A120B]/50" />
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
        </div>

        <div className="relative z-10 p-8 sm:p-14 lg:p-16 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-md">
            <Calendar className="w-4 h-4" />
            <span>Continental Annual Assembly</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {event.title}
          </h1>
          <p className="text-lg sm:text-xl text-[#FFB74D] font-serif italic tracking-wide">
            "{event.subtitle}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-[#FAF6F0] bg-[#18120D]/80 backdrop-blur-md p-6 rounded-2xl border-2 border-[#5C3A21] shadow-xl">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#E65100]/20 text-[#FFB74D] border border-[#E65100]/40 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-xs tracking-wider">Dates of Convergence</p>
                <p className="text-[#FFD8B5] font-semibold text-base mt-0.5">{event.dates}</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#E65100]/20 text-[#FFB74D] border border-[#E65100]/40 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-xs tracking-wider">Central Ancestral Site</p>
                <p className="text-[#FFD8B5] font-semibold text-base mt-0.5">{event.location}</p>
              </div>
            </div>
          </div>

          <p className="text-base text-[#FAF6F0]/90 leading-relaxed font-light">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-3">
            <button
              onClick={() => {
                setActiveTab("register");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-base shadow-2xl shadow-[#E65100]/40 flex items-center gap-3 transition-all hover:scale-105 border border-[#FFB74D]/30"
            >
              <span>RSVP For Gathering Pass</span>
              <ArrowRight className="w-5 h-5 text-[#FFB74D]" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-4 rounded-2xl bg-[#3E2315]/90 hover:bg-[#5C3A21] border-2 border-[#D4A373]/60 text-[#FFD8B5] hover:text-white font-bold text-sm shadow-xl flex items-center gap-2.5 transition-all"
            >
              <PlusCircle className="w-5 h-5 text-[#FFB74D]" />
              <span>Propose a Workshop</span>
            </button>
          </div>
        </div>
      </section>

      {/* 1.5. THE SACRED COUNCIL FIRE & BAOBAB PRAYER RIBBON WALL */}
      <section className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-12 border-2 border-[#D4A373] shadow-2xl space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFEBE6] border border-[#D4A373]/60 text-[#8C5319] text-xs font-extrabold uppercase tracking-widest shadow-sm">
            <Flame className="w-4 h-4 text-[#E65100] animate-pulse" />
            <span>Gathering of Eagles Tradition • African Altar</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight">
            The Eternal Council Fire & Sacred Prayer Ribbon Wall
          </h2>
          <p className="text-sm sm:text-base text-[#5C4033] leading-relaxed font-light">
            In the Gathering of Eagles tradition, the sacred fire is lit at dawn on Day 1 by traditional fire keepers and burns continuously until the closing circle. Around the fire, attendees tie colored prayer ribbons to the ceremonial Baobab tree, offering blessings for the Mother Earth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Eternal Council Fire Display & Controls */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1A120B] via-[#2C1D11] to-[#1A120B] text-white p-7 sm:p-8 rounded-3xl border-2 border-[#5C3A21] shadow-2xl space-y-6 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
            
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFB74D]">
                Ceremonal Hearth
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                The Sacred Council Fire
              </h3>
            </div>

            {/* Glowing Fire Animation Circle */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-1000 ${
                isFireBurning ? "bg-gradient-to-tr from-[#E65100] via-[#FF8A00] to-[#FFB74D] opacity-60 animate-pulse" : "bg-gray-800 opacity-20"
              }`} />
              <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-2xl ${
                isFireBurning ? "bg-[#2C1D11] border-[#FF8A00] text-[#FFB74D] scale-105" : "bg-gray-900 border-gray-700 text-gray-500"
              }`}>
                <Flame className={`w-14 h-14 transition-transform duration-700 ${isFireBurning ? "animate-bounce text-[#FF8A00]" : "text-gray-600"}`} />
              </div>
            </div>

            <p className="text-xs text-[#FAF6F0]/80 italic font-serif leading-relaxed px-4">
              {isFireBurning
                ? '"The fire carries our spoken words and silent prayers up to the Creator. As long as the flame burns, council is open and all voices speak in truth."'
                : '"The embers rest until the next ceremonial sunrise libation."'}
            </p>

            <button
              onClick={() => setIsFireBurning(!isFireBurning)}
              className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border ${
                isFireBurning
                  ? "bg-[#3E2315] hover:bg-[#5C2C16] text-[#FFD8B5] border-[#D4A373]/60"
                  : "bg-[#E65100] hover:bg-[#FF6D00] text-white border-[#FFB74D]"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>{isFireBurning ? "Honor the Fire Keepers (Active)" : "Kindle the Council Flame"}</span>
            </button>
          </div>

          {/* Tie a Prayer Ribbon Form & Live Wall */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Box */}
            <form onSubmit={handleAddRibbon} className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#D4A373]/60 shadow-lg space-y-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#1A120B] uppercase tracking-wider">
                <TreePine className="w-4 h-4 text-[#2E7D32]" />
                <span>Tie Your Sacred Prayer Ribbon to the Baobab</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#5C4033] mb-1">Your Name / Tribe (Optional):</label>
                  <input
                    type="text"
                    value={newRibbonAuthor}
                    onChange={(e) => setNewRibbonAuthor(e.target.value)}
                    placeholder="e.g. Sister Amina (Yoruba)"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D4A373]/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] bg-[#FAF6F0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5C4033] mb-1">Select Ceremonial Ribbon Color:</label>
                  <select
                    value={newRibbonColor}
                    onChange={(e) => setNewRibbonColor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D4A373]/60 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#E65100] bg-[#FAF6F0]"
                  >
                    <option value="yellow">💛 Golden Yellow (East • Illumination)</option>
                    <option value="red">❤️ Burnt Red (South • Vitality & Youth)</option>
                    <option value="blue">💙 Indigo Blue (West • Cleansing Waters)</option>
                    <option value="white">🤍 Pure White (North • Ancestral Wisdom)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C4033] mb-1">Your Blessing or Prayer for the Continent:</label>
                <input
                  type="text"
                  value={newRibbonText}
                  onChange={(e) => setNewRibbonText(e.target.value)}
                  placeholder="May our elders travel safely and our youth inherit a green, peaceful Africa..."
                  required
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D4A373]/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] bg-[#FAF6F0]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E65100] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FFB74D]" />
                <span>Tie Ribbon to the Sacred Tree</span>
              </button>
            </form>

            {/* Live Ribbons Display */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#8C5319] block px-1">
                Live Prayer Ribbons on the Baobab Branches ({ribbons.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ribbons.map((rib) => {
                  const colorStyles: Record<string, string> = {
                    yellow: "border-l-4 border-l-[#FF8A00] bg-[#FFF8E7] text-[#5C4033]",
                    red: "border-l-4 border-l-[#BF360C] bg-[#FFF3E0] text-[#5C4033]",
                    blue: "border-l-4 border-l-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]",
                    white: "border-l-4 border-l-[#8C5319] bg-white text-[#1A120B]"
                  };
                  return (
                    <div key={rib.id} className={`p-4 rounded-xl border border-[#D4A373]/40 shadow-sm space-y-1.5 transition-all hover:shadow-md ${colorStyles[rib.color] || colorStyles.yellow}`}>
                      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider opacity-80">
                        <span>{rib.author}</span>
                        <span className="bg-black/10 px-2 py-0.5 rounded">{rib.direction.split("•")[0]}</span>
                      </div>
                      <p className="text-xs font-serif italic leading-relaxed">
                        "{rib.text}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SCHEDULE OF ACTIVITIES (LOCALIZED SUT ADAPTATION) */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E65100]">
            Ceremonal Timeline
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight">
            Schedule of Sacred Activities
          </h2>
          <p className="text-sm sm:text-base text-[#5C4033] font-medium leading-relaxed">
            While Native North American SUT gatherings honor sunrise pipes and sweat lodges, our African convergence celebrates libations under the baobab tree, polyrhythmic drum healing, and Indigenous land wisdom.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 bg-[#FAF6F0] p-3 rounded-2xl border-2 border-[#D4A373]/60 shadow-inner">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-[#1A120B] text-[#FFB74D] shadow-lg scale-105 border border-[#D4A373]"
                    : "bg-white text-[#5C4033] hover:bg-[#EFEBE6] border border-[#D4A373]/30"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchedule.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border-2 border-[#D4A373]/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#E65100]/70"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF8E7] text-[#8C5319] border border-[#D4A373]/40 text-xs font-extrabold uppercase tracking-wider shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-[#E65100]" />
                    <span>{item.time}</span>
                  </span>
                  <span className="text-xs font-bold text-[#5C4033] bg-[#FAF6F0] border border-[#D4A373]/30 px-3 py-1 rounded-lg">
                    {item.location}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#1A120B] group-hover:text-[#E65100] transition-colors mb-2.5 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8C5319] font-bold mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E65100]" />
                  <span>Guided by: {item.leader}</span>
                </p>

                <p className="text-sm text-[#5C4033] leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-[#D4A373]/20 flex items-center justify-between text-xs font-semibold text-[#5C4033]">
                <span>Open to all registered attendees</span>
                <button
                  onClick={() => {
                    setActiveTab("register");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-[#E65100] font-extrabold hover:underline flex items-center gap-1.5"
                >
                  <span>Join Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALL FOR WORKSHOPS & COMMUNITY PROPOSALS BOARD */}
      <section className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 border-2 border-[#D4A373] shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-[#D4A373]/40">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E65100]">
              Community Participation
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A120B] mt-1 tracking-tight">
              Call for Workshops & Traditional Offerings
            </h2>
            <p className="text-sm text-[#5C4033] max-w-2xl mt-1 font-medium">
              Are you a traditional herbalist, agricultural scholar, woodcarver, or oral historian? Propose a session to share your knowledge under the baobab tree.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-sm shadow-xl flex items-center gap-2.5 shrink-0 transition-all hover:scale-105 border border-[#FFB74D]/30"
          >
            <PlusCircle className="w-5 h-5 text-[#FFB74D]" />
            <span>Submit Workshop Proposal</span>
          </button>
        </div>

        {/* Existing Community Proposals Grid */}
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-extrabold text-[#1A120B] flex items-center gap-2">
            <span>Approved & Submitted Community Offerings ({proposals.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl p-6 border-2 border-[#D4A373]/60 shadow-sm hover:shadow-xl hover:border-[#E65100]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-lg bg-[#FFF8E7] text-[#8C5319] border border-[#D4A373]/40 text-[10px] font-extrabold uppercase tracking-wider">
                      {prop.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${
                      prop.status === "Featured"
                        ? "bg-[#E65100] text-white border border-[#FFB74D]/40"
                        : "bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]"
                    }`}>
                      {prop.status}
                    </span>
                  </div>

                  <h4 className="font-serif font-extrabold text-[#1A120B] text-lg mb-2 line-clamp-2 tracking-tight">
                    {prop.title}
                  </h4>

                  <p className="text-xs text-[#5C4033] mb-3 flex items-center gap-1.5 font-semibold">
                    <User className="w-3.5 h-3.5 text-[#E65100] shrink-0" />
                    <span className="font-bold text-[#1A120B]">{prop.submitterName}</span>
                    <span className="font-light">({prop.tribeOrAffiliation})</span>
                  </p>

                  <p className="text-xs text-[#5C4033] leading-relaxed line-clamp-3 mb-4 font-light">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4A373]/30 flex items-center justify-between text-[11px] font-bold text-[#8C5319]">
                  <span>Format: {prop.format}</span>
                  <span>Duration: {prop.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORKSHOP PROPOSAL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF6F0] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#D4A373] p-6 sm:p-10 relative">
            <div className="flex items-center justify-between pb-5 border-b-2 border-[#D4A373]/40">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#E65100] text-white shadow-md">
                  <PlusCircle className="w-6 h-6 text-[#FFB74D]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-extrabold text-[#1A120B] tracking-tight">
                    Propose a Workshop Offering
                  </h3>
                  <p className="text-xs text-[#5C4033] font-medium">
                    Share ancestral wisdom, practical ecology, or traditional craft at the SUT Africa Gathering.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-white text-[#5C4033] transition-colors font-bold border border-transparent hover:border-[#D4A373]/40"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="py-14 text-center space-y-4 animate-fadeIn bg-white rounded-3xl p-8 border border-[#A5D6A7] mt-6 shadow-inner">
                <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <h3 className="font-serif text-3xl font-extrabold text-[#1A120B]">
                  Proposal Received with Gratitude!
                </h3>
                <p className="text-sm text-[#5C4033] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#E65100] underline">{formData.submitterName}</span>. Your offering has been logged into the SUT Africa community board and will be reviewed by our elder council.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} className="space-y-5 mt-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#D4A373]/60 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.submitterName}
                      onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                      placeholder="e.g. Dr. Kwame Nkrumah"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Tribe, Nation, or Affiliation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tribeOrAffiliation}
                      onChange={(e) => setFormData({ ...formData, tribeOrAffiliation: e.target.value })}
                      placeholder="e.g. Ashanti / Permaculture Guild"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.org"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 700 000000"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Workshop / Offering Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Traditional Rainwater Harvesting in Arid Savannas"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    >
                      <option value="Herbal Medicine">Herbal Medicine</option>
                      <option value="Indigenous Farming">Indigenous Farming</option>
                      <option value="Beadwork & Craft">Beadwork & Craft</option>
                      <option value="Spiritual Ecology">Spiritual Ecology</option>
                      <option value="Storytelling & Lore">Storytelling & Lore</option>
                      <option value="Youth Rites of Passage">Youth Rites of Passage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Format *
                    </label>
                    <select
                      value={formData.format}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value as any })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    >
                      <option value="Interactive Workshop">Interactive Workshop</option>
                      <option value="Ceremonal Circle">Ceremonal Circle</option>
                      <option value="Field Demonstration">Field Demonstration</option>
                      <option value="Oral Presentation">Oral Presentation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g. 1.5 Hours"
                      className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Description & Objectives *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what participants will learn, any materials needed, and how this connects to Ubuntu and ecological stewardship..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t-2 border-[#D4A373]/30">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 rounded-xl text-sm font-bold text-[#5C4033] hover:bg-[#FAF6F0] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white text-sm font-extrabold shadow-xl transition-all hover:scale-105 flex items-center gap-2.5 border border-[#FFB74D]/30"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FFB74D]" />
                    <span>Submit Offering Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
