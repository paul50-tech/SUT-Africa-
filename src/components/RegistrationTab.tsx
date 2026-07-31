import React, { useState } from "react";
import { TicketRegistration, EventInfo } from "../types";
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Ticket, 
  User, 
  Mail, 
  Phone, 
  Globe2, 
  HeartHandshake, 
  ShieldCheck, 
  Award, 
  QrCode, 
  Printer,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

interface RegistrationTabProps {
  event: EventInfo;
  onRegister: (reg: TicketRegistration) => void;
}

export const RegistrationTab: React.FC<RegistrationTabProps> = ({ event, onRegister }) => {
  const [step, setStep] = useState<number>(1);
  const [completedTicket, setCompletedTicket] = useState<TicketRegistration | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    tribalAffiliation: "",
    passType: "General Gathering (Free)" as TicketRegistration["passType"],
    workshopInterests: [] as string[],
    dialectNeeds: "Swahili / English",
    emergencyContact: "",
    dietaryRestrictions: "Standard / Organic African Vegetarian available",
  });

  const passOptions: { id: TicketRegistration["passType"]; title: string; price: string; description: string; popular?: boolean }[] = [
    {
      id: "General Gathering (Free)",
      title: "General Gathering Pass",
      price: "FREE",
      description: "Full access to all sunrise libations, storytelling circles, drumming ceremonies, and youth dialogues under the baobab tree."
    },
    {
      id: "Camping Pass ($35 / Equiv)",
      title: "Sanctuary Camping Pass",
      price: "$35 / KES 4,500",
      description: "Includes General Admission + safe tent pitch space in our guarded baobab grove, spring water access, and solar charging stations.",
      popular: true
    },
    {
      id: "Meal Ticket Bundle ($50 / Equiv)",
      title: "Communal Meal Bundle",
      price: "$50 / KES 6,500",
      description: "Includes General Admission + 3 daily organic communal meals featuring traditional African grains (millet, sorghum, teff), stews, and herbal teas."
    },
    {
      id: "VIP Elder Supporter ($150 / Equiv)",
      title: "VIP Elder Supporter Pass",
      price: "$150 / KES 19,500",
      description: "Includes Camping + Meals + a direct $75 contribution toward chartering transport for rural elders from West and Southern Africa!"
    }
  ];

  const workshopsList = [
    "Herbal Medicine & Traditional Pharmacopeia",
    "Indigenous Drought-Resistant Farming (Zai Pits)",
    "Polyrhythmic Drumming & Trance Healing",
    "Under the Baobab Tree: Griot Oral Histories",
    "Youth Rites of Passage & Ethical Leadership",
    "Sacred Groves & Biodiversity Conservation"
  ];

  const toggleWorkshop = (ws: string) => {
    setFormData(prev => {
      const exists = prev.workshopInterests.includes(ws);
      return {
        ...prev,
        workshopInterests: exists
          ? prev.workshopInterests.filter(w => w !== ws)
          : [...prev.workshopInterests, ws]
      };
    });
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const newReg: TicketRegistration = {
      id: `reg-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country || "Kenya (Host Nation)",
      tribalAffiliation: formData.tribalAffiliation || "African Citizen",
      passType: formData.passType,
      workshopInterests: formData.workshopInterests.length ? formData.workshopInterests : ["General Assembly"],
      dialectNeeds: formData.dialectNeeds,
      emergencyContact: formData.emergencyContact || "Not provided",
      dietaryRestrictions: formData.dietaryRestrictions,
      dateRegistered: new Date().toISOString().split("T")[0],
      ticketCode: `SUT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    onRegister(newReg);
    setCompletedTicket(newReg);

    // Confetti celebration!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ea580c', '#10b981', '#ffffff']
      });
    } catch (err) {
      console.log("Confetti failed");
    }
  };

  return (
    <div className="space-y-16 pb-16 w-full max-w-[1400px] mx-auto">
      
      {/* HEADER BANNER */}
      <section className="bg-[#1A120B] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#5C3A21] shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-md">
          <Ticket className="w-4 h-4" />
          <span>The Functional Engine</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          RSVP & Ticket Registration: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB74D] via-[#FF8A00] to-[#E65100]">
            {event.title}
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#FAF6F0]/90 max-w-2xl mx-auto font-light leading-relaxed">
          {event.dates} • {event.location}. <br />
          SUT gatherings are open to all who come in reverence. Register below to secure your entry, camping pass, communal meal tickets, or dialect translation preferences.
        </p>
      </section>

      {/* COMPLETED TICKET VIEW */}
      {completedTicket ? (
        <div className="bg-[#1A120B] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#D4A373] shadow-2xl space-y-10 animate-fadeIn relative overflow-hidden">
          <div className="text-center space-y-4 relative z-10">
            <div className="w-20 h-20 bg-[#2E7D32]/20 text-[#4CAF50] border-2 border-[#4CAF50] rounded-full flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-11 h-11 animate-bounce" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Karibu! (Welcome to the Circle!)
            </h2>
            <p className="text-sm sm:text-base text-[#FFB74D] font-medium max-w-lg mx-auto">
              Your registration is confirmed. Please present this digital ticket code or QR upon arrival at the Lake Nakuru Baobab Sanctuary.
            </p>
          </div>

          {/* Digital Ticket Card */}
          <div className="max-w-3xl mx-auto bg-[#18120D] rounded-2xl border-2 border-[#D4A373]/80 overflow-hidden shadow-2xl relative z-10">
            <div className="bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] p-6 sm:p-8 text-white flex items-center justify-between border-b border-[#FFB74D]/30">
              <div className="flex items-center gap-3.5">
                <Sparkles className="w-7 h-7 text-[#FFB74D]" />
                <div>
                  <span className="text-xs uppercase tracking-widest font-extrabold text-[#FFD8B5]">
                    Official SUT Africa Pass
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-white">{event.title}</h3>
                </div>
              </div>
              <span className="font-mono text-base sm:text-xl font-extrabold bg-[#1A120B]/80 px-4 py-1.5 rounded-xl border border-[#FFB74D]/40 text-[#FFB74D] shadow-inner">
                {completedTicket.ticketCode}
              </span>
            </div>

            <div className="p-6 sm:p-10 space-y-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-[#2C1D11]/40">
              <div className="md:col-span-2 space-y-5 text-sm sm:text-base">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block">Attendee Name</span>
                    <span className="font-bold text-white text-base sm:text-lg">{completedTicket.fullName}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block">Pass Tier</span>
                    <span className="font-extrabold text-[#FF8A00] text-base sm:text-lg">{completedTicket.passType.split(" ")[0]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-[#5C3A21]/60 pt-3">
                  <div>
                    <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block">Country / Tribe</span>
                    <span className="text-[#FAF6F0] font-medium">{completedTicket.country} ({completedTicket.tribalAffiliation})</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block">Dialect Preference</span>
                    <span className="text-[#FAF6F0] font-medium">{completedTicket.dialectNeeds}</span>
                  </div>
                </div>

                <div className="border-t border-[#5C3A21]/60 pt-3">
                  <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider block">Registered Workshops</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {completedTicket.workshopInterests.map((w, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-[#1A120B] text-[#FFB74D] text-xs font-bold border border-[#D4A373]/50 shadow-sm">
                        {w.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* QR Code Column */}
              <div className="bg-white p-5 rounded-2xl flex flex-col items-center justify-center text-center mx-auto md:mx-0 border-2 border-[#D4A373] shadow-lg">
                <QrCode className="w-32 h-32 text-[#1A120B]" />
                <span className="text-[11px] font-mono font-bold text-[#1A120B] mt-2.5 block tracking-wide">
                  SCAN AT GATE • {completedTicket.ticketCode}
                </span>
              </div>
            </div>

            <div className="bg-[#18120D] px-8 py-5 border-t-2 border-[#5C3A21] flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-[#D4A373] gap-4">
              <span>{event.dates} • Lake Nakuru Foothills, Kenya</span>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-[#2C1D11] hover:bg-[#3E2315] text-[#FFB74D] font-extrabold flex items-center gap-2 transition-all border border-[#D4A373]/40 shadow-sm hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save Pass PDF</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-4 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setCompletedTicket(null);
                setStep(1);
              }}
              className="text-xs text-[#FFB74D] hover:underline font-extrabold tracking-wide uppercase"
            >
              + Register Another Family Member or Colleague
            </button>
            <span className="text-[#D4A373] hidden sm:inline">•</span>
            <span className="text-xs text-[#FAF6F0] font-medium">
              Your pass is now securely saved in <strong className="text-[#FFB74D]">My Passes & Secretariat Portal</strong> (Header Navigation)
            </span>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM STEPS */
        <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-14 border-2 border-[#D4A373] shadow-2xl space-y-10">
          
          {/* Progress Tabs */}
          <div className="flex items-center justify-between max-w-xl mx-auto border-b-2 border-[#D4A373]/40 pb-5">
            {[
              { num: 1, label: "Select Pass Tier" },
              { num: 2, label: "Personal Identity" },
              { num: 3, label: "Workshops & Logistics" }
            ].map((st) => (
              <button
                key={st.num}
                onClick={() => setStep(st.num)}
                className={`flex items-center gap-2.5 text-xs sm:text-sm font-extrabold transition-all ${
                  step === st.num ? "text-[#E65100] scale-105" : "text-[#8C5319] hover:text-[#1A120B]"
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${
                  step === st.num ? "bg-[#E65100] text-white" : "bg-white text-[#5C4033] border border-[#D4A373]"
                }`}>
                  {st.num}
                </span>
                <span className="hidden sm:inline">{st.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleCompleteRegistration} className="space-y-8">
            
            {/* STEP 1: PASS TYPES */}
            {step === 1 && (
              <div className="space-y-8 animate-fadeIn">
                <div className="text-center max-w-lg mx-auto space-y-1.5">
                  <h2 className="font-serif text-3xl font-extrabold text-[#1A120B] tracking-tight">
                    Choose Your Gathering Tier
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4033] font-medium">
                    SUT Africa gatherings are community-supported. Select the pass option that best fits your logistical needs or contribution desire.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {passOptions.map((pass) => {
                    const isSelected = formData.passType === pass.id;
                    return (
                      <div
                        key={pass.id}
                        onClick={() => setFormData({ ...formData, passType: pass.id })}
                        className={`cursor-pointer rounded-2xl p-6.5 border-2 transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? "bg-[#FFF8E7] border-[#E65100] shadow-xl scale-[1.02]"
                            : "bg-white border-[#D4A373]/60 hover:border-[#8C5319] shadow-sm"
                        }`}
                      >
                        {pass.popular && (
                          <span className="absolute -top-3 right-5 bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                            Most Popular Option
                          </span>
                        )}

                        <div>
                          <div className="flex items-center justify-between mb-2.5">
                            <h3 className="font-serif text-lg sm:text-xl font-extrabold text-[#1A120B]">{pass.title}</h3>
                            <span className="font-extrabold text-[#E65100] text-base sm:text-lg">{pass.price}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#5C4033] leading-relaxed font-light">
                            {pass.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3.5 border-t-2 border-[#D4A373]/30 flex items-center justify-between text-xs font-extrabold">
                          <span className={isSelected ? "text-[#E65100]" : "text-[#8C5319]"}>
                            {isSelected ? "✨ Tier Selected" : "Click to select tier"}
                          </span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-[#E65100] bg-[#E65100] text-white" : "border-[#D4A373]"
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2.5 border border-[#FFB74D]/30"
                  >
                    <span>Continue to Personal Identity</span>
                    <Globe2 className="w-4 h-4 text-[#FFB74D]" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONAL IDENTITY */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto bg-white p-8 rounded-3xl border-2 border-[#D4A373]/50 shadow-sm">
                <div className="text-center space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A120B]">
                    Attendee Identity & Lineage
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4033] font-medium">
                    We welcome attendees from all 54 African nations and global diaspora friends.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Wangari Maathai"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent font-medium bg-[#FAF6F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="wangari@greenbelt.org"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent font-medium bg-[#FAF6F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 711 000000"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent font-medium bg-[#FAF6F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Kenya, Senegal, South Africa"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent font-medium bg-[#FAF6F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Tribe, Nation, or Heritage Affiliation
                    </label>
                    <input
                      type="text"
                      value={formData.tribalAffiliation}
                      onChange={(e) => setFormData({ ...formData, tribalAffiliation: e.target.value })}
                      placeholder="e.g. Kikuyu / Diaspora / Earth Citizen"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent font-medium bg-[#FAF6F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Emergency Contact Number
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      placeholder="+254 722 000000 (Family/Friend)"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65100] focus:border-transparent font-medium bg-[#FAF6F0]"
                    />
                  </div>
                </div>

                <div className="pt-6 flex justify-between border-t border-[#D4A373]/30">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-[#FAF6F0] text-[#1A120B] font-extrabold text-sm hover:bg-[#EFEBE6] border border-[#D4A373]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!formData.fullName || !formData.email || !formData.phone}
                    onClick={() => setStep(3)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] disabled:opacity-50 text-white font-extrabold text-sm shadow-lg hover:scale-105 transition-all border border-[#FFB74D]/30"
                  >
                    Continue to Workshops & Logistics
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: WORKSHOPS & LOGISTICS */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto bg-white p-8 rounded-3xl border-2 border-[#D4A373]/50 shadow-sm">
                <div className="text-center space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A120B]">
                    Workshop Selection & Dialect Translation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5C4033] font-medium">
                    Select which afternoon workshops you plan to attend so our facilitators can prepare materials.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <label className="block text-xs font-extrabold text-[#1A120B] uppercase tracking-wider">
                    Select Workshop & Ceremony Interests (Check all that apply):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {workshopsList.map((ws, idx) => {
                      const isChecked = formData.workshopInterests.includes(ws);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleWorkshop(ws)}
                          className={`p-3.5 rounded-xl border-2 cursor-pointer text-xs font-semibold transition-all flex items-center justify-between ${
                            isChecked
                              ? "bg-[#FFF8E7] border-[#E65100] text-[#1A120B] font-extrabold shadow-sm"
                              : "bg-[#FAF6F0] border-[#D4A373]/50 text-[#5C4033] hover:bg-[#EFEBE6]"
                          }`}
                        >
                          <span>{ws}</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            isChecked ? "bg-[#E65100] border-[#E65100] text-white" : "border-[#D4A373]"
                          }`}>
                            {isChecked && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Preferred Dialect / Translation Needs
                    </label>
                    <select
                      value={formData.dialectNeeds}
                      onChange={(e) => setFormData({ ...formData, dialectNeeds: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm bg-[#FAF6F0] text-[#1A120B] font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                    >
                      <option value="Swahili / English (Primary)">Swahili / English (Primary)</option>
                      <option value="French / West Africa">French / West Africa</option>
                      <option value="Hausa / Yoruba">Hausa / Yoruba</option>
                      <option value="Zulu / Xhosa">Zulu / Xhosa</option>
                      <option value="Amharic / Oromo">Amharic / Oromo</option>
                      <option value="Arabic / North Africa">Arabic / North Africa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A120B] uppercase tracking-wider mb-1.5">
                      Dietary Preferences / Notes
                    </label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                      placeholder="e.g. Standard Organic African Vegetarian"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#D4A373]/60 text-sm bg-[#FAF6F0] text-[#1A120B] font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFF8E7] border-2 border-[#D4A373]/60 text-xs text-[#5C4033] space-y-1.5">
                  <div className="font-extrabold text-[#1A120B] flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
                    <span>Indigenous Data & Privacy Charter</span>
                  </div>
                  <p className="leading-relaxed font-light">
                    Your contact information is stored securely in our local registry for gathering logistics only. We never sell attendee data to commercial third parties.
                  </p>
                </div>

                <div className="pt-6 flex justify-between border-t border-[#D4A373]/30">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-[#FAF6F0] text-[#1A120B] font-extrabold text-sm hover:bg-[#EFEBE6] border border-[#D4A373]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-base shadow-xl hover:scale-105 transition-all flex items-center gap-2.5 border border-[#FFB74D]/30"
                  >
                    <Award className="w-5 h-5 text-[#FFB74D]" />
                    <span>Complete RSVP & Issue Pass</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      )}

    </div>
  );
};
