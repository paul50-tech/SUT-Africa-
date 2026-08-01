import React, { useState } from "react";
import { TabType } from "../types";
import { 
  HeartHandshake, 
  Calendar, 
  BookOpen, 
  Users, 
  HandHeart, 
  Menu, 
  X, 
  Sparkles, 
  Globe2,
  Ticket,
  QrCode
} from "lucide-react";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSponsorModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSponsorModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Philosophy", icon: <Globe2 className="w-4 h-4" /> },
    { id: "gathering", label: "Gathering", icon: <Calendar className="w-4 h-4" /> },
    { id: "elders", label: "Sponsor", icon: <HeartHandshake className="w-4 h-4" /> },
    { id: "lore", label: "Lore", icon: <BookOpen className="w-4 h-4" /> },
    { id: "register", label: "Tickets", icon: <Ticket className="w-4 h-4" /> },
    { id: "volunteer", label: "Volunteer", icon: <Users className="w-4 h-4" /> },
    { id: "donations", label: "Partners", icon: <HandHeart className="w-4 h-4" /> },
    { id: "portal", label: "My Portal", icon: <QrCode className="w-4 h-4 text-[#FFB74D]" /> },
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1A120B]/95 backdrop-blur-md text-[#FAF6F0] border-b border-[#5C3A21]/60 shadow-2xl transition-all">
      {/* Top African Ceremonial Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4A373] via-[#E65100] via-[#BF360C] to-[#2E7D32]" />
      
      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick("home")}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none min-w-0"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFB74D] via-[#E65100] to-[#BF360C] p-0.5 shadow-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 shrink-0">
              <div className="w-full h-full rounded-full bg-[#1A120B] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-[#E65100]/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFB74D] animate-pulse-slow relative z-10" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#FFB74D] transition-colors truncate">
                  SUT Africa
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest bg-[#5C2C16] text-[#FFD8B5] px-2 py-0.5 rounded-full font-bold border border-[#D4A373]/40 shadow-sm shrink-0">
                  Mother Earth
                </span>
              </div>
              <p className="text-xs text-[#D4A373] hidden md:block font-medium tracking-wide truncate">
                Spiritual Unity of the Tribes • Ubuntu Heritage
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white shadow-lg shadow-[#E65100]/30 font-bold border border-[#FFB74D]/30 scale-[1.02]"
                      : "text-[#D4A373] hover:bg-[#3E2315]/80 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-[#FFB74D]" : "text-[#D4A373] group-hover:text-white transition-colors shrink-0"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                 </button>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSponsorModal}
              className="flex items-center gap-2 bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl shadow-[#BF360C]/40 hover:shadow-[#E65100]/60 transition-all transform hover:-translate-y-0.5 border border-[#FFB74D]/20 whitespace-nowrap"
            >
              <HeartHandshake className="w-4 h-4 text-[#FFB74D] animate-bounce shrink-0" />
              <span>Sponsor an Elder</span>
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="flex xl:hidden items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              onClick={onOpenSponsorModal}
              className="hidden sm:flex md:hidden items-center gap-1.5 bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md border border-[#FFB74D]/20 shrink-0"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#FFB74D]" />
              <span>Sponsor</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#3E2315] text-[#FFD8B5] hover:text-white border border-[#5C3A21] focus:outline-none focus:ring-2 focus:ring-[#FFB74D] shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#1A120B] border-b border-[#5C3A21] px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-2xl">
          <p className="text-xs font-bold text-[#FFB74D]/80 uppercase tracking-widest px-2 mb-2 font-serif">
            Navigation Menu
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-left transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white font-bold shadow-lg border border-[#FFB74D]/30"
                      : "text-[#D4A373] hover:bg-[#3E2315] hover:text-white"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/20 text-[#FFB74D]" : "bg-[#3E2315] text-[#D4A373]"}`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-4 mt-2 border-t border-[#5C3A21] flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => handleTabClick("register")}
              className="w-full py-3 rounded-xl text-sm font-bold bg-[#3E2315] text-[#FFD8B5] hover:bg-[#5C3A21] text-center transition-colors border border-[#D4A373]/40"
            >
              Register for the Gathering
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSponsorModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] text-white py-3 rounded-xl text-sm font-bold shadow-lg border border-[#FFB74D]/20"
            >
              <HeartHandshake className="w-4 h-4 text-[#FFB74D]" />
              <span>Sponsor an Elder's Travel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

