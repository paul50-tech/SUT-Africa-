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
import { collection, onSnapshot, addDoc, query, orderBy, limit } from "firebase/firestore";
import { db } from "./lib/firebase";

// Direct import of HomeTab for instantaneous First Contentful Paint without lazy delay
import { HomeTab } from "./components/HomeTab";

// Code-split other tabs for efficient bundle size
const GatheringTab = React.lazy(() => import("./components/GatheringTab").then(m => ({ default: m.GatheringTab })));
const EldersTab = React.lazy(() => import("./components/EldersTab").then(m => ({ default: m.EldersTab })));
const LoreTab = React.lazy(() => import("./components/LoreTab").then(m => ({ default: m.LoreTab })));
const RegistrationTab = React.lazy(() => import("./components/RegistrationTab").then(m => ({ default: m.RegistrationTab })));
const VolunteerTab = React.lazy(() => import("./components/VolunteerTab").then(m => ({ default: m.VolunteerTab })));
const DonationsTab = React.lazy(() => import("./components/DonationsTab").then(m => ({ default: m.DonationsTab })));
const PortalTab = React.lazy(() => import("./components/PortalTab").then(m => ({ default: m.PortalTab })));
import { HeartHandshake, ShieldCheck, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { ElderSponsorshipDetails } from "./components/ElderSponsorshipDetails";

// Prefetch secondary tabs in browser idle time for zero-lag navigation
const prefetchTabs = () => {
  import("./components/GatheringTab");
  import("./components/RegistrationTab");
  import("./components/EldersTab");
  import("./components/LoreTab");
  import("./components/DonationsTab");
  import("./components/PortalTab");
  import("./components/VolunteerTab");
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [isGlobalSponsorModalOpen, setIsGlobalSponsorModalOpen] = useState(false);
  const [globalSponsorSuccess, setGlobalSponsorSuccess] = useState(false);

  const [proposals, setProposals] = useState<WorkshopProposal[]>(INITIAL_PROPOSALS);
  const [registrations, setRegistrations] = useState<TicketRegistration[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);

  // Prefetch tabs during idle browser time
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(prefetchTabs, { timeout: 2500 });
      } else {
        setTimeout(prefetchTabs, 1200);
      }
    }
  }, []);

  // Sync with Firestore with query limits for fast response
  useEffect(() => {
    const unsubProposals = onSnapshot(
      query(collection(db, "proposals"), orderBy("timestamp", "desc"), limit(50)),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WorkshopProposal[];
        setProposals(data);
      },
      (err) => console.warn("Proposals snapshot error:", err)
    );

    const unsubRegistrations = onSnapshot(
      query(collection(db, "registrations"), orderBy("timestamp", "desc"), limit(100)),
      (snapshot) => {
        setRegistrations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TicketRegistration[]);
      },
      (err) => console.warn("Registrations snapshot error:", err)
    );

    const unsubVolunteers = onSnapshot(
      query(collection(db, "volunteers"), orderBy("timestamp", "desc"), limit(100)),
      (snapshot) => {
        setVolunteers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as VolunteerApplication[]);
      },
      (err) => console.warn("Volunteers snapshot error:", err)
    );

    const unsubDonations = onSnapshot(
      query(collection(db, "donations"), orderBy("timestamp", "desc"), limit(100)),
      (snapshot) => {
        setDonations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as DonationRecord[]);
      },
      (err) => console.warn("Donations snapshot error:", err)
    );

    return () => {
      unsubProposals();
      unsubRegistrations();
      unsubVolunteers();
      unsubDonations();
    };
  }, []);

  // Handlers
  const handleAddProposal = async (newProp: WorkshopProposal) => {
    try {
      await addDoc(collection(db, "proposals"), { ...newProp, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error("Error adding proposal: ", error);
    }
  };

  const handleRegister = async (newReg: TicketRegistration) => {
    try {
      await addDoc(collection(db, "registrations"), { ...newReg, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error("Error adding registration: ", error);
    }
  };

  const handleAddVolunteer = async (newVol: VolunteerApplication) => {
    try {
      await addDoc(collection(db, "volunteers"), { ...newVol, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error("Error adding volunteer: ", error);
    }
  };

  const handleAddDonation = async (newDon: DonationRecord) => {
    try {
      await addDoc(collection(db, "donations"), { ...newDon, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error("Error adding donation: ", error);
    }
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
          <React.Suspense fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 rounded-full border-4 border-[#D4A373] border-t-[#E65100] animate-spin"></div>
            </div>
          }>
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
          </React.Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSponsorModal={() => setIsGlobalSponsorModalOpen(true)}
      />

      {/* GLOBAL SPONSOR AN ELDER MODAL */}
      {isGlobalSponsorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-[#FAF6F0] text-[#2C221E] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-2 border-[#D4A373] transform transition-all my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-[#2A1810] via-[#5C2C16] to-[#8C3A15] p-6 text-white relative border-b border-[#D4A373]/30 shrink-0">
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
                    Sponsor an Elder's Travel
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <ElderSponsorshipDetails
                onAddDonation={handleAddDonation}
                onClose={() => setIsGlobalSponsorModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
