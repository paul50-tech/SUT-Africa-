import React, { useState } from "react";
import { Elder } from "../types";
import { 
  HeartHandshake, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  Plane, 
  Home, 
  Coffee, 
  ShieldCheck, 
  ArrowRight,
  Filter,
  DollarSign
} from "lucide-react";
import confetti from "canvas-confetti";
import { ElderSponsorshipDetails } from "./ElderSponsorshipDetails";

interface EldersTabProps {
  onOpenGlobalSponsorModal: () => void;
}

export const EldersTab: React.FC<EldersTabProps> = ({
  onOpenGlobalSponsorModal
}) => {
  return (
    <div className="space-y-16 pb-16 w-full max-w-[1400px] mx-auto">
      
      {/* 1. HEADER & WHY SPONSORSHIP MATTERS IN AFRICA */}
      <section className="bg-[#1A120B] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#5C3A21] shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-wider shadow-md">
            <HeartHandshake className="w-4 h-4 animate-pulse text-[#FFB74D]" />
            <span>The Heart of the Movement</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sponsor an Elder: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB74D] via-[#FF8A00] to-[#E65100]">
              Bridging Vast African Distances
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAF6F0]/90 leading-relaxed font-light">
            In North American SUT gatherings, facilitating elder travel is a revered cornerstone. Across Africa, this mission is tenfold more critical: crossing continent-wide borders, navigating rough terrain from remote villages, and chartering regional flights is notoriously expensive and logistically complex.
          </p>

          <div className="p-5 rounded-2xl bg-[#18120D] border-2 border-[#D4A373]/50 text-xs sm:text-sm text-[#FFB74D] italic flex items-center gap-3.5 shadow-inner">
            <Sparkles className="w-7 h-7 text-[#FFB74D] shrink-0" />
            <span className="leading-relaxed">When you fund an elder's journey, you are not merely buying a ticket—you are ensuring that centuries of unwritten oral history, sacred medicinal pharmacopeia, and traditional peacemaking ceremonies arrive to guide the next generation.</span>
          </div>
        </div>

        {/* Global Progress Dashboard */}
        <div className="bg-[#2C1D11]/60 rounded-2xl p-6 sm:p-8 border-2 border-[#D4A373]/60 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative z-10">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              General Elder Travel Fund
            </h3>
            <p className="text-sm text-[#FAF6F0]/80 max-w-lg font-light mt-2">
              Supports round-trip flights, 4x4 village transit, lodging, and dietary accommodations for all attending leaders.
            </p>
          </div>

          <button
            onClick={onOpenGlobalSponsorModal}
            className="w-full md:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2.5 shrink-0 transition-all hover:scale-105 border border-[#FFB74D]/30"
          >
            <HeartHandshake className="w-5 h-5 text-[#FFB74D]" />
            <span>Open Fast Sponsorship Modal</span>
          </button>
        </div>
      </section>

      {/* 2. EXPLICIT PAYMENT & CONTRIBUTION CHANNELS */}
      <section className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-12 border-2 border-[#D4A373] shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#1A120B]">
            Explicit Contribution Channels
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4033]">
            Transfer directly to verified SUT Africa trust accounts via Safaricom M-Pesa Paybill, KCB Bank wire, MTN MoMo, or verified online gateways.
          </p>
        </div>

        <ElderSponsorshipDetails />
      </section>

    </div>
  );
};
