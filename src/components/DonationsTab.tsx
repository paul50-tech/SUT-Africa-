import React, { useState } from "react";
import { PartnerOrg, DonationRecord, Elder } from "../types";
import { 
  HandHeart, 
  DollarSign, 
  Smartphone, 
  CreditCard, 
  Globe2, 
  CheckCircle2, 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  HeartHandshake
} from "lucide-react";
import confetti from "canvas-confetti";

interface DonationsTabProps {
  partners: PartnerOrg[];
  onAddDonation: (donation: DonationRecord) => void;
  onOpenSponsorModal: () => void;
}

export const DonationsTab: React.FC<DonationsTabProps> = ({
  partners,
  onAddDonation,
  onOpenSponsorModal
}) => {
  const [currency, setCurrency] = useState<DonationRecord["currency"]>("USD");
  const [method, setMethod] = useState<DonationRecord["method"]>("M-Pesa");
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [designatedElderId, setDesignatedElderId] = useState<string>("general");
  const [certificate, setCertificate] = useState<DonationRecord | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currencySymbols: Record<string, { sym: string; rate: number; name: string }> = {
    USD: { sym: "$", rate: 1, name: "US Dollar" },
    KES: { sym: "KES ", rate: 130, name: "Kenyan Shilling (M-Pesa)" },
    NGN: { sym: "₦", rate: 1500, name: "Nigerian Naira (Flutterwave)" },
    ZAR: { sym: "R ", rate: 18, name: "South African Rand" },
    GHS: { sym: "GH₵ ", rate: 15, name: "Ghanaian Cedi (MTN MoMo)" },
    EUR: { sym: "€", rate: 0.92, name: "Euro" },
  };

  const methodsList: { id: DonationRecord["method"]; title: string; desc: string; icon: string; popularIn: string }[] = [
    { id: "M-Pesa", title: "M-Pesa Mobile Money", desc: "Instant mobile transfer via Safaricom/Vodacom.", icon: "📱", popularIn: "Kenya, Tanzania, DRC" },
    { id: "MTN Mobile Money", title: "MTN Mobile Money (MoMo)", desc: "Direct wallet contribution across West & Central Africa.", icon: "📲", popularIn: "Ghana, Uganda, Cameroon" },
    { id: "Flutterwave", title: "Flutterwave Africa", desc: "Seamless card, bank transfer, and mobile money payment.", icon: "⚡", popularIn: "Nigeria, Rwanda, Africa" },
    { id: "PayPal", title: "PayPal Global Gateway", desc: "International credit card and PayPal balance.", icon: "🌐", popularIn: "Global Diaspora & Supporters" },
    { id: "Stripe", title: "Stripe Secure Checkout", desc: "Visa, Mastercard, Amex, Apple Pay, Google Pay.", icon: "💳", popularIn: "Global & Corporate Donors" },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmt = customAmount ? Number(customAmount) : amount;
    if (!finalAmt || finalAmt <= 0) return;

    const newDonation: DonationRecord = {
      id: `don-${Date.now()}`,
      donorName: donorName || "Anonymous Ubuntu Supporter",
      amount: finalAmt,
      currency,
      method,
      designatedElderId: designatedElderId === "general" ? undefined : designatedElderId,
      message: message || "May this gift nourish our elders and safeguard the Mother Continent.",
      date: new Date().toISOString().split("T")[0]
    };

    onAddDonation(newDonation);
    setCertificate(newDonation);

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ea580c', '#10b981', '#3b82f6']
      });
    } catch (err) {}
  };

  const filteredPartners = selectedCategory === "all"
    ? partners
    : partners.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-20 pb-16 w-full max-w-[1600px] mx-auto">
      
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-br from-[#1A120B] via-[#2A1810] to-[#1A120B] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#5C3A21] shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-md">
          <HandHeart className="w-4 h-4" />
          <span>Localized Financial Infrastructure</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Sustaining the Movement: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD8B5] via-[#FFB74D] to-[#E65100]">
            Donation Gateways & Working Partnerships
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-[#FAF6F0]/90 max-w-3xl mx-auto font-light leading-relaxed">
          To build an authentic African movement, our financial engine must be accessible to both the rural farmer and the global philanthropist. We integrate local African mobile money (M-Pesa, MTN MoMo, Flutterwave) alongside global platforms (PayPal, Stripe).
        </p>
      </section>

      {/* 2. INTERACTIVE DONATION PORTAL */}
      <section className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-12 border-2 border-[#D4A373] shadow-2xl max-w-4xl mx-auto space-y-10">
        
        {certificate ? (
          <div className="bg-gradient-to-b from-[#1A120B] via-[#2A1810] to-[#1A120B] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#D4A373] shadow-2xl space-y-8 text-center animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
            <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFB74D]">
                Official Certificate of Gratitude
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                Siyabonga! SUT Africa Supporter
              </h2>
              <p className="text-sm text-[#FFD8B5]/90 max-w-lg mx-auto leading-relaxed">
                This document certifies your generous contribution to the preservation of Indigenous African wisdom and elder travel.
              </p>
            </div>

            <div className="bg-[#18120D] p-6 sm:p-8 rounded-2xl border-2 border-[#5C3A21] text-left space-y-4 text-sm max-w-lg mx-auto shadow-inner">
              <div className="flex justify-between pb-3 border-b border-[#5C3A21]">
                <span className="text-[#D4A373]">Donor Name:</span>
                <span className="font-bold text-[#FFB74D]">{certificate.donorName}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-[#5C3A21]">
                <span className="text-[#D4A373]">Contribution Amount:</span>
                <span className="font-bold text-[#E65100] text-lg">
                  {currencySymbols[certificate.currency].sym}{certificate.amount.toLocaleString()} ({certificate.currency})
                </span>
              </div>
              <div className="flex justify-between pb-3 border-b border-[#5C3A21]">
                <span className="text-[#D4A373]">Payment Gateway:</span>
                <span className="text-white font-medium">{certificate.method}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-[#5C3A21]">
                <span className="text-[#D4A373]">Designation:</span>
                <span className="text-white font-medium">
                  {certificate.designatedElderId === "general"
                    ? "General Elder & Sanctuary Fund"
                    : "General Elder & Sanctuary Fund"}
                </span>
              </div>
              <div className="pt-2 italic text-xs text-[#FFD8B5] font-serif leading-relaxed">
                "{certificate.message}"
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-xl bg-[#3E2315] hover:bg-[#5C3A21] text-[#FFD8B5] font-bold text-xs flex items-center gap-2 transition-colors border border-[#D4A373]/40"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Certificate PDF</span>
              </button>
              <button
                onClick={() => {
                  setCertificate(null);
                  setCustomAmount("");
                  setMessage("");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-bold text-xs transition-all shadow-lg"
              >
                Make Another Gift
              </button>
            </div>
          </div>
        ) : (
          /* DONATION FORM */
          <form onSubmit={handleDonate} className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#D4A373]/60 shadow-sm">
            <div className="text-center space-y-2 pb-2 border-b border-[#D4A373]/30">
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1A120B] tracking-tight">
                Make an Immediate Contribution
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4033] font-medium">
                Select your currency and gateway. All transactions are protected by 256-bit encryption and go directly to our secretariats.
              </p>
            </div>

            {/* CURRENCY & AMOUNT */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#5C4033]">
                  1. Select Currency:
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(currencySymbols).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => {
                        setCurrency(curr as any);
                        setCustomAmount("");
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        currency === curr
                          ? "bg-[#1A120B] text-white shadow-md scale-105 border border-[#D4A373]"
                          : "bg-[#FAF6F0] text-[#5C4033] hover:bg-[#EFEBE6] border border-[#D4A373]/40"
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[25, 50, 100, 250].map((baseVal) => {
                  const displayVal = Math.round(baseVal * currencySymbols[currency].rate);
                  const isSelected = !customAmount && amount === displayVal;
                  return (
                    <button
                      key={baseVal}
                      type="button"
                      onClick={() => {
                        setAmount(displayVal);
                        setCustomAmount("");
                      }}
                      className={`py-3.5 rounded-2xl font-bold text-sm border-2 transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-[#FFF8E7] border-[#E65100] text-[#1A120B] shadow-md scale-105 ring-2 ring-[#E65100]/20"
                          : "bg-white border-[#D4A373]/60 text-[#5C4033] hover:border-[#E65100]/60"
                      }`}
                    >
                      <span className="text-[10px] uppercase text-[#8C5319] font-bold tracking-widest">Tier</span>
                      <span className="text-base font-extrabold">{currencySymbols[currency].sym}{displayVal.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>

              <div className="relative pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                  Or enter custom amount in {currency}:
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 font-bold text-[#8C5319]">
                    {currencySymbols[currency].sym}
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setAmount(Number(e.target.value));
                    }}
                    placeholder="Custom contribution amount"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/50 text-[#1A120B] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD SELECTOR */}
            <div className="space-y-4 pt-6 border-t-2 border-[#D4A373]/30">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033]">
                2. Select African or Global Gateway:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {methodsList.map((m) => {
                  const isSelected = method === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-gradient-to-br from-[#2A1810] via-[#3E2315] to-[#1A120B] text-white border-[#E65100] shadow-xl scale-[1.02] ring-2 ring-[#E65100]/30"
                          : "bg-[#FAF6F0]/80 text-[#1A120B] border-[#D4A373]/60 hover:border-[#E65100]/60 shadow-sm"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl p-2 rounded-xl bg-white/10 shadow-inner">{m.icon}</span>
                          {isSelected && <span className="bg-[#E65100] text-white px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-sm">Active</span>}
                        </div>
                        <h3 className="font-serif font-bold text-base tracking-tight">{m.title}</h3>
                        <p className={`text-xs mt-1 leading-relaxed ${isSelected ? "text-[#FAF6F0]/80 font-light" : "text-[#5C4033]"}`}>{m.desc}</p>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider mt-4 pt-2.5 border-t block ${isSelected ? "text-[#FFB74D] border-[#5C3A21]" : "text-[#8C5319] border-[#D4A373]/40"}`}>
                        Popular in: {m.popularIn}
                      </span>
                    </div>
                  );
                })}
              </div>

              {(method === "M-Pesa" || method === "MTN Mobile Money" || method === "Flutterwave") && (
                <div className="mt-4 p-5 rounded-2xl bg-[#FFF8E7] border-2 border-[#D4A373] text-xs text-[#1A120B] space-y-3 animate-fadeIn shadow-inner">
                  <div className="font-bold flex items-center gap-2 text-[#8C5319] text-sm">
                    <Smartphone className="w-5 h-5 text-[#E65100]" />
                    <span>Enter your Mobile Money phone number (with country code):</span>
                  </div>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="e.g. +254 700 000000 or +233 24 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373] text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-sm"
                  />
                  <p className="text-[11px] text-[#5C4033] font-medium">
                    You will receive an instant push notification on your phone to authorize the STK/MoMo transaction.
                  </p>
                </div>
              )}
            </div>

            {/* DESIGNATION & DONOR DETAILS */}
            <div className="space-y-5 pt-6 border-t-2 border-[#D4A373]/30">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033]">
                3. Designation & Donor Details:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Designate This Contribution:
                  </label>
                  <select
                    value={designatedElderId}
                    onChange={(e) => setDesignatedElderId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/50 text-[#1A120B] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                  >
                    <option value="general">General Elder Travel & Sanctuary Fund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Your Name or Organization (Optional):
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Brother Ousmane / Eco-Consortium"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/50 text-[#1A120B] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                  Message of Blessing or Prayer:
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="May this gift nourish our elders and protect our sacred rivers..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/50 text-[#1A120B] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#E65100] shadow-inner resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8E7] border border-[#D4A373]/60 text-xs text-[#5C4033] flex items-center gap-3 font-medium shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#2E7D32] shrink-0" />
                <span>
                  SUT Africa operates with transparency. Our secretariats in Nairobi, Dakar, and Johannesburg publish annual audited financial charters.
                </span>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-base shadow-2xl shadow-[#E65100]/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 border border-[#FFB74D]/30"
                >
                  <HeartHandshake className="w-6 h-6 animate-pulse text-[#FFB74D]" />
                  <span>
                    Confirm Contribution of {currencySymbols[currency].sym}{(customAmount ? Number(customAmount) : amount).toLocaleString()} ({currency}) via {method}
                  </span>
                </button>
              </div>
            </div>

          </form>
        )}

      </section>

      {/* 3. WORKING PARTNERSHIPS DIRECTORY */}
      <section className="space-y-8 bg-[#FAF6F0] p-6 sm:p-12 rounded-3xl border-2 border-[#D4A373] shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#D4A373]/40 pb-6">
          <div>
            <h2 className="font-serif text-3xl font-extrabold text-[#1A120B] tracking-tight">
              Working Partnerships & NGO Network
            </h2>
            <p className="text-sm text-[#5C4033] mt-1 font-medium">
              SUT Africa collaborates with ecological conservation groups, indigenous rights NGOs, and traditional medicine associations across the continent.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Partners" },
              { id: "Ecological Conservation", label: "Conservation" },
              { id: "Indigenous Rights", label: "Indigenous Rights" },
              { id: "African Heritage", label: "Cultural Heritage" },
              { id: "Traditional Medicine", label: "Traditional Medicine" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#1A120B] text-[#FFB74D] shadow-md scale-105 border border-[#D4A373]"
                    : "bg-white text-[#5C4033] hover:bg-[#EFEBE6] border border-[#D4A373]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((part) => (
            <div
              key={part.id}
              className="bg-white rounded-2xl p-6 border-2 border-[#D4A373]/60 shadow-sm hover:shadow-xl hover:border-[#E65100]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg bg-[#FFF8E7] border border-[#D4A373]/40 text-[#8C5319] text-[10px] font-extrabold uppercase tracking-wider">
                    {part.category}
                  </span>
                  <span className="text-xs font-bold text-[#5C4033]">
                    {part.country}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-extrabold text-[#1A120B] group-hover:text-[#E65100] transition-colors mb-2.5 tracking-tight">
                  {part.name}
                </h3>

                <p className="text-xs text-[#5C4033] leading-relaxed mb-6 font-light">
                  {part.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4A373]/30 flex items-center justify-between text-xs font-extrabold">
                <a
                  href={part.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E65100] hover:underline flex items-center gap-1.5"
                >
                  <span>Visit Partner Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[#8C5319] text-[11px] font-semibold">Verified Network</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
