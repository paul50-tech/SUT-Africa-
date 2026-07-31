import React, { useState, useEffect } from "react";
import { TabType, Elder, WorkshopProposal, TicketRegistration, VolunteerApplication, DonationRecord } from "./types";
import { 
  INITIAL_ELDERS, 
  UPCOMING_GATHERING, 
  INITIAL_PROPOSALS, 
  LORE_ARTICLES, 
  PROVERBS, 
  PARTNERS 
} from "./data/initialData";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeTab } from "./components/HomeTab";
import { GatheringTab } from "./components/GatheringTab";
import { EldersTab } from "./components/EldersTab";
import { LoreTab } from "./components/LoreTab";
import { RegistrationTab } from "./components/RegistrationTab";
import { VolunteerTab } from "./components/VolunteerTab";
import { DonationsTab } from "./components/DonationsTab";
import { PortalTab } from "./components/PortalTab";
import { HeartHandshake, ShieldCheck, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isGlobalSponsorModalOpen, setIsGlobalSponsorModalOpen] = useState(false);
  const [globalSponsorSuccess, setGlobalSponsorSuccess] = useState(false);

  const [proposals, setProposals] = useState<WorkshopProposal[]>(() => {
    try {
      const saved = localStorage.getItem("sut_africa_proposals");
      return saved ? JSON.parse(saved) : INITIAL_PROPOSALS;
    } catch {
      return INITIAL_PROPOSALS;
    }
  });

  const [registrations, setRegistrations] = useState<TicketRegistration[]>(() => {
    try {
      const saved = localStorage.getItem("sut_africa_registrations");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => {
    try {
      const saved = localStorage.getItem("sut_africa_volunteers");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem("sut_africa_donations");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("sut_africa_proposals", JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem("sut_africa_registrations", JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem("sut_africa_volunteers", JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem("sut_africa_donations", JSON.stringify(donations));
  }, [donations]);

  // Handlers
  const handleAddProposal = (newProp: WorkshopProposal) => {
    setProposals(prev => [newProp, ...prev]);
  };

  const handleRegister = (newReg: TicketRegistration) => {
    setRegistrations(prev => [newReg, ...prev]);
  };

  const handleAddVolunteer = (newVol: VolunteerApplication) => {
    setVolunteers(prev => [newVol, ...prev]);
  };

  const handleAddDonation = (newDon: DonationRecord) => {
    setDonations(prev => [newDon, ...prev]);
  };

  const handleGlobalSponsorSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalSponsorSuccess(true);
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch (err) {}

    setTimeout(() => {
      setGlobalSponsorSuccess(false);
      setIsGlobalSponsorModalOpen(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen w-full bg-[#18120D] text-[#FAF6F0] flex flex-col font-sans selection:bg-[#E65100] selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full bg-tribal-pattern text-[#2C221E] pt-8 sm:pt-12 pb-20">
        <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === "home" && (
            <HomeTab
              setActiveTab={setActiveTab}
              onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
            />
          )}

          {activeTab === "gathering" && (
            <GatheringTab
              event={UPCOMING_GATHERING}
              proposals={proposals}
              onAddProposal={handleAddProposal}
              setActiveTab={setActiveTab}
              onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
            />
          )}

          {activeTab === "elders" && (
            <EldersTab
              onOpenGlobalSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
            />
          )}

          {activeTab === "lore" && (
            <LoreTab
              articles={LORE_ARTICLES}
              proverbs={PROVERBS}
            />
          )}

          {activeTab === "register" && (
            <RegistrationTab
              event={UPCOMING_GATHERING}
              onRegister={handleRegister}
            />
          )}

          {activeTab === "volunteer" && (
            <VolunteerTab
              onAddVolunteer={handleAddVolunteer}
            />
          )}

          {activeTab === "donations" && (
            <DonationsTab
              partners={PARTNERS}
              onAddDonation={handleAddDonation}
              onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
            />
          )}

          {activeTab === "portal" && (
            <PortalTab
              registrations={registrations}
              volunteers={volunteers}
              proposals={proposals}
              donations={donations}
              setActiveTab={setActiveTab}
              onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
            />
          )}

        </div>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
      />

      {/* GLOBAL SPONSOR AN ELDER MODAL */}
      {isGlobalSponsorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#FAF6F0] text-[#2C221E] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-[#D4A373] transform transition-all">
            <div className="bg-gradient-to-r from-[#2A1810] via-[#5C2C16] to-[#8C3A15] p-6 text-white relative border-b border-[#D4A373]/30">
              <button
                onClick={() => setIsGlobalSponsorModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-[#FAF6F0] transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                ✕
              </button>
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#E65100] to-[#BF360C] text-white shadow-lg border border-white/20">
                  <HeartHandshake className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFB74D] block mb-0.5">
                    The Heart of SUT Africa
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                    Sponsor an Elder's Journey
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {globalSponsorSuccess ? (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#1A120B]">
                    Siyabonga! Contribution Recorded
                  </h4>
                  <p className="text-sm text-[#5C4033] leading-relaxed">
                    Your gift directly supports travel across Africa for our revered traditional leaders, ensuring no village elder is left behind.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleGlobalSponsorSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Contribution Amount (USD / Equiv):
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3 font-bold text-[#8C5319] text-base">$</span>
                      <input
                        type="number"
                        name="globalAmount"
                        min="10"
                        defaultValue={100}
                        required
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#D4A373]/80 bg-white text-[#1A120B] text-base font-bold shadow-inner focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#FFF8E7] rounded-xl text-xs text-[#5C4033] border border-[#FFE0B2] flex items-center gap-2.5 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
                    <span className="leading-relaxed">
                      <strong>Why this matters:</strong> Covering flights and 4x4 transit across vast African borders is our highest expense. Your sponsorship goes to a General Elder Fund to bring oral wisdom to the youth circle.
                    </span>
                  </div>

                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#D4A373]/40">
                    <button
                      type="button"
                      onClick={() => setIsGlobalSponsorModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#5C4033] hover:bg-[#EFEBE6] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                    >
                      <HeartHandshake className="w-4 h-4 animate-pulse" />
                      <span>Confirm Sponsorship Gift</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
