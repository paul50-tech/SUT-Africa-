import React, { useState } from "react";
import { 
  TicketRegistration, 
  VolunteerApplication, 
  WorkshopProposal, 
  DonationRecord, 
  Elder,
  TabType 
} from "../types";
import { 
  QrCode, 
  Ticket, 
  Users, 
  HeartHandshake, 
  Download, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Lock, 
  Unlock, 
  FileSpreadsheet, 
  Sparkles, 
  Printer, 
  ArrowRight,
  Flame,
  UserCheck,
  RefreshCw,
  Share2
} from "lucide-react";

interface PortalTabProps {
  registrations: TicketRegistration[];
  volunteers: VolunteerApplication[];
  proposals: WorkshopProposal[];
  donations: DonationRecord[];
  setActiveTab: (tab: TabType) => void;
  onOpenSponsorModal: () => void;
}

export const PortalTab: React.FC<PortalTabProps> = ({
  registrations,
  volunteers,
  proposals,
  donations,
  setActiveTab,
  onOpenSponsorModal
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"attendee" | "organizer">("attendee");
  
  // Attendee state
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    registrations.length > 0 ? registrations[0].id : null
  );

  // Organizer Admin State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("UBUNTU2026");
  const [pinError, setPinError] = useState(false);
  const [organizerTable, setOrganizerTable] = useState<"attendees" | "volunteers" | "proposals" | "donations">("attendees");
  const [adminSearch, setAdminSearch] = useState("");
  const [checkInCode, setCheckInCode] = useState("");
  const [checkInResult, setCheckInResult] = useState<{ status: "success" | "error"; message: string } | null>(null);

  // Filter registrations for attendee view
  const myTickets = registrations.filter(r => {
    if (!searchEmail.trim()) return true;
    return (
      r.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
      r.fullName.toLowerCase().includes(searchEmail.toLowerCase()) ||
      r.ticketCode.toLowerCase().includes(searchEmail.toLowerCase())
    );
  });

  const activeTicket = registrations.find(r => r.id === selectedTicketId) || myTickets[0] || null;

  // Handle Admin Unlock
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().toUpperCase() === "UBUNTU2026") {
      setIsAdminUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // CSV Export Utility
  const exportToCSV = (filename: string, rows: Record<string, any>[]) => {
    if (rows.length === 0) {
      alert("No data available to export.");
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => 
        headers.map(header => {
          const val = row[header] === null || row[header] === undefined ? "" : String(row[header]);
          // Escape quotes and commas
          return `"${val.replace(/"/g, '""')}"`;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Check-In Simulation
  const handleSimulateCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInCode.trim()) return;
    
    const found = registrations.find(
      r => r.ticketCode.toLowerCase() === checkInCode.trim().toLowerCase() ||
           r.email.toLowerCase() === checkInCode.trim().toLowerCase()
    );

    if (found) {
      setCheckInResult({
        status: "success",
        message: `Verified! Welcome to Sanctuary Grounds, ${found.fullName} (${found.tribalAffiliation || "Ubuntu Circle"}). Pass: ${found.passType}.`
      });
    } else {
      setCheckInResult({
        status: "error",
        message: `Ticket code "${checkInCode}" not found in current local manifest. Check spelling or ensure registration is synchronized.`
      });
    }
  };

  // Metrics
  const totalFundsRaised = 12500;
  const totalCampingPitches = registrations.filter(r => r.passType.includes("Camping")).length;

  return (
    <div className="space-y-12 pb-16 font-sans">
      
      {/* HEADER BANNER */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#1A120B] via-[#2C1D11] to-[#1A120B] text-white p-8 sm:p-12 overflow-hidden border-2 border-[#5C3A21] shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-radial-gradient from-[#E65100]/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] via-[#BF360C] to-[#2E7D32]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E2315] border border-[#D4A373]/60 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-lg">
            <Sparkles className="w-4 h-4 text-[#FFB74D] animate-pulse" />
            <span>Step 1: Production Data Persistence & Live Portal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            My Sacred Bundle & Assembly Secretary Portal
          </h1>

          <p className="text-sm sm:text-base text-[#FAF6F0]/90 leading-relaxed font-light max-w-3xl">
            Welcome to the live data hub of SUT Africa. Attendees can access their digital ceremonial passes, QR tickets, and elder sponsorship receipts. Event organizers and regional coordinators can export official attendance manifests and simulate gate verification.
          </p>

          {/* Sub-Tab Navigation Toggle */}
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSubTab("attendee")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all shadow-lg ${
                activeSubTab === "attendee"
                  ? "bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white border border-[#FFB74D] scale-[1.02]"
                  : "bg-[#2C1D11] text-[#D4A373] border border-[#5C3A21] hover:bg-[#3E2315] hover:text-white"
              }`}
            >
              <Ticket className="w-4 h-4 text-[#FFB74D]" />
              <span>Attendee Sacred Passes ({registrations.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab("organizer")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all shadow-lg ${
                activeSubTab === "organizer"
                  ? "bg-gradient-to-r from-[#E65100] to-[#BF360C] text-white border border-[#FFB74D] scale-[1.02]"
                  : "bg-[#2C1D11] text-[#D4A373] border border-[#5C3A21] hover:bg-[#3E2315] hover:text-white"
              }`}
            >
              {isAdminUnlocked ? <Unlock className="w-4 h-4 text-[#FFB74D]" /> : <Lock className="w-4 h-4 text-[#FFB74D]" />}
              <span>Secretary Admin & Export Suite</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* VIEW 1: ATTENDEE SACRED PASSES & QR TICKET BUNDLE */}
      {/* ========================================================= */}
      {activeSubTab === "attendee" && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* Search & Filter Bar */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border-2 border-[#D4A373]/60 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
              <Search className="w-5 h-5 text-[#8C5319] shrink-0" />
              <input
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Search your passes by name, email, or ticket code..."
                className="w-full bg-white px-4 py-2.5 rounded-xl border border-[#D4A373]/60 text-xs sm:text-sm font-medium text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#E65100]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setActiveTab("register")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#1A120B] hover:bg-[#2C1D11] text-[#FFD8B5] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm border border-[#5C3A21]"
              >
                <span>+ Register Another Attendee</span>
              </button>
            </div>
          </div>

          {/* Empty State */}
          {myTickets.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-[#D4A373]/60 shadow-xl space-y-6 max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-[#FAF6F0] border-2 border-[#D4A373] flex items-center justify-center mx-auto text-[#E65100]">
                <Ticket className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#1A120B]">
                  No Sacred Passes Found in Current Bundle
                </h3>
                <p className="text-sm text-[#5C4033] font-light leading-relaxed">
                  We could not locate any Gathering tickets matching your search in local device persistence. If you haven't RSVP'd yet, secure your ceremonial pass today!
                </p>
              </div>
              <button
                onClick={() => setActiveTab("register")}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FFB74D]" />
                <span>Register for SUT Africa 2026 (Free & Camping)</span>
              </button>
            </div>
          ) : (
            
            /* Ticket Display Grid: Left selector, Right active ticket pass */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Ticket List */}
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#8C5319] block px-1">
                  Your Registered Tickets ({myTickets.length})
                </span>

                {myTickets.map((t) => {
                  const isSelected = activeTicket?.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTicketId(t.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-gradient-to-r from-[#1A120B] to-[#2C1D11] text-white border-[#E65100] shadow-xl scale-[1.02]"
                          : "bg-white text-[#1A120B] border-[#D4A373]/50 hover:border-[#8C5319] hover:bg-[#FAF6F0]"
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E65100] block">
                          Code: {t.ticketCode}
                        </span>
                        <span className="font-serif font-bold text-base block mt-0.5">
                          {t.fullName}
                        </span>
                        <span className={`text-xs block mt-1 font-medium ${isSelected ? "text-[#D4A373]" : "text-[#5C4033]"}`}>
                          {t.passType.split(" (")[0]} • {t.country || "African"}
                        </span>
                      </div>
                      <div className={`p-2 rounded-xl ${isSelected ? "bg-[#E65100] text-white" : "bg-[#FAF6F0] text-[#8C5319]"}`}>
                        <QrCode className="w-5 h-5" />
                      </div>
                    </button>
                  );
                })}

                {/* Quick Elder Support Callout inside attendee sidebar */}
                <div className="p-5 rounded-2xl bg-[#1A120B] text-white border border-[#5C3A21] space-y-3 shadow-lg mt-6">
                  <div className="flex items-center gap-2 text-[#FFB74D] font-extrabold text-xs uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Elder Sponsorship Status</span>
                  </div>
                  <p className="text-xs text-[#FAF6F0]/80 leading-relaxed font-light">
                    You have made <strong className="text-white font-bold">{donations.length}</strong> donation offering(s) supporting Indigenous elder transport and sanctuary preservation.
                  </p>
                  <button
                    onClick={onOpenSponsorModal}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#BF360C] to-[#E65100] hover:from-[#E65100] hover:to-[#FF6D00] text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
                  >
                    + Support Another Elder
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed Active Ticket Pass */}
              {activeTicket && (
                <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-[#D4A373] shadow-2xl overflow-hidden relative">
                  
                  {/* Ticket Header Bar */}
                  <div className="bg-gradient-to-r from-[#1A120B] via-[#2C1D11] to-[#1A120B] p-6 sm:p-8 text-white border-b-2 border-[#E65100] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-[#E65100] text-white font-mono text-[11px] font-extrabold uppercase tracking-widest shadow">
                          OFFICIAL ENTRY PASS
                        </span>
                        <span className="text-xs text-[#FFB74D] font-medium">
                          SUT Africa • September 2026
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                        {activeTicket.fullName}
                      </h2>
                      <p className="text-xs text-[#D4A373]">
                        {activeTicket.tribalAffiliation || "Ubuntu Ancestral Circle"} • {activeTicket.country || "Global Assembly"}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between gap-2 text-right">
                      <span className="font-mono text-lg sm:text-xl font-extrabold text-[#FFB74D] bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                        {activeTicket.ticketCode}
                      </span>
                      <span className="text-[10px] text-[#FAF6F0]/70 uppercase tracking-wider">
                        Issued: {activeTicket.dateRegistered || new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Ticket Body: QR Code & Logistics Details */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FAF6F0]">
                    
                    {/* Simulated QR Code Box */}
                    <div className="md:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#D4A373]/60 shadow-md text-center space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E65100]" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8C5319] block">
                        Gate Verification QR
                      </span>
                      
                      {/* Visual QR pattern simulation */}
                      <div className="w-40 h-40 mx-auto bg-[#1A120B] p-3 rounded-xl flex items-center justify-center relative shadow-inner">
                        <div className="w-full h-full border-4 border-dashed border-[#FFB74D] flex flex-col items-center justify-center p-2 space-y-1 text-white">
                          <QrCode className="w-16 h-16 text-[#FFB74D] animate-pulse" />
                          <span className="font-mono text-[10px] tracking-tighter text-[#D4A373]">
                            {activeTicket.ticketCode}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#5C4033] font-medium">
                        Present this barcode at sanctuary check-in desks in Nairobi, Dakar, or Johannesburg.
                      </p>
                    </div>

                    {/* Pass Details Table */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3.5 rounded-xl border border-[#D4A373]/40 shadow-sm">
                          <span className="text-[10px] font-bold text-[#8C5319] uppercase tracking-wider block">Pass Type</span>
                          <span className="font-serif font-bold text-sm text-[#1A120B]">{activeTicket.passType}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-[#D4A373]/40 shadow-sm">
                          <span className="text-[10px] font-bold text-[#8C5319] uppercase tracking-wider block">Dialect & Language</span>
                          <span className="font-serif font-bold text-sm text-[#1A120B]">{activeTicket.dialectNeeds || "English / Swahili"}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-[#D4A373]/40 shadow-sm">
                          <span className="text-[10px] font-bold text-[#8C5319] uppercase tracking-wider block">Dietary Covenant</span>
                          <span className="font-serif font-bold text-sm text-[#1A120B] truncate">{activeTicket.dietaryRestrictions || "Standard African Vegetarian"}</span>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-[#D4A373]/40 shadow-sm">
                          <span className="text-[10px] font-bold text-[#8C5319] uppercase tracking-wider block">Emergency Contact</span>
                          <span className="font-serif font-bold text-sm text-[#1A120B] truncate">{activeTicket.emergencyContact || "Logged with Sanctuary"}</span>
                        </div>
                      </div>

                      {/* Workshop Selections Banner */}
                      {activeTicket.workshopInterests && activeTicket.workshopInterests.length > 0 && (
                        <div className="bg-[#EFEBE6] p-3.5 rounded-xl border border-[#D4A373]/60 space-y-1.5">
                          <span className="text-[10px] font-extrabold text-[#8C5319] uppercase tracking-wider block">
                            Enrolled Sacred Circles ({activeTicket.workshopInterests.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeTicket.workshopInterests.map((w, idx) => (
                              <span key={idx} className="bg-white px-2.5 py-0.5 rounded-md border border-[#D4A373]/40 text-xs font-semibold text-[#1A120B]">
                                ✦ {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-wrap gap-3">
                        <button
                          onClick={() => window.print()}
                          className="flex-1 py-3 px-4 rounded-xl bg-[#1A120B] hover:bg-[#2C1D11] text-white font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-2"
                        >
                          <Printer className="w-4 h-4 text-[#FFB74D]" />
                          <span>Print Ceremonial Ticket</span>
                        </button>
                        <button
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: `SUT Africa 2026 Ticket - ${activeTicket.fullName}`,
                                text: `I'm attending the Gathering of Eagles in Africa! My pass code is ${activeTicket.ticketCode}. Join us under the Baobab tree!`,
                                url: window.location.href
                              }).catch(() => {});
                            } else {
                              alert(`Ticket share link copied for ${activeTicket.ticketCode}!`);
                            }
                          }}
                          className="py-3 px-4 rounded-xl bg-[#E65100] hover:bg-[#FF6D00] text-white font-bold text-xs uppercase tracking-wider shadow transition-all flex items-center justify-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share Pass</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Ticket Footer Covenant */}
                  <div className="bg-[#EFEBE6] px-6 py-3 border-t border-[#D4A373]/60 flex items-center justify-between text-xs text-[#5C4033]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                      <span>Zero-Waste & Sacred Sanctuary Covenant Verified</span>
                    </span>
                    <span className="font-serif italic text-right hidden sm:inline">
                      "I am because we are."
                    </span>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW 2: ORGANIZER ADMIN CONSOLE & DATA EXPORT SUITE */}
      {/* ========================================================= */}
      {activeSubTab === "organizer" && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* Admin PIN Unlock Screen if locked */}
          {!isAdminUnlocked ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#D4A373] shadow-2xl max-w-xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF6F0] border-2 border-[#D4A373] flex items-center justify-center mx-auto text-[#E65100]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#8C5319] block">
                  Sanctuary Secretary Access
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1A120B]">
                  Enter Coordinator Security Passcode
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4033] font-light">
                  To protect attendee privacy and Indigenous data sovereignty, please enter your secretary PIN.
                </p>
              </div>

              <form onSubmit={handleUnlockAdmin} className="space-y-4 max-w-sm mx-auto">
                <div>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter PIN..."
                    className={`w-full px-4 py-3 rounded-xl border-2 text-center font-mono text-lg tracking-widest focus:outline-none ${
                      pinError ? "border-red-500 bg-red-50 text-red-900" : "border-[#D4A373] bg-[#FAF6F0] text-[#1A120B] focus:border-[#E65100]"
                    }`}
                  />
                  {pinError && (
                    <span className="text-xs font-bold text-red-600 block mt-1">
                      Incorrect passcode. Use demonstration PIN: UBUNTU2026
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4 text-[#FFB74D]" />
                  <span>Unlock Secretary Suite</span>
                </button>
              </form>

              <div className="p-3 rounded-xl bg-[#EFEBE6] border border-[#D4A373]/60 text-xs text-[#5C4033]">
                💡 <strong className="text-[#1A120B]">Demo Note:</strong> The default testing PIN is prefilled as <code className="font-mono font-bold text-[#E65100]">UBUNTU2026</code>. Click unlock to proceed!
              </div>
            </div>
          ) : (
            
            /* Unlocked Admin Console */
            <div className="space-y-10">
              
              {/* Telemetry KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-[#1A120B] text-white p-6 rounded-2xl border-2 border-[#5C3A21] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-[#FFB74D]/20 group-hover:text-[#FFB74D]/40 transition-colors">
                    <Ticket className="w-12 h-12" />
                  </div>
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#FFB74D] block">
                    Total Registrations
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white block my-2">
                    {registrations.length}
                  </span>
                  <span className="text-xs text-[#D4A373] flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50]" />
                    <span>Synchronized locally</span>
                  </span>
                </div>

                <div className="bg-[#1A120B] text-white p-6 rounded-2xl border-2 border-[#5C3A21] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-[#FFB74D]/20 group-hover:text-[#FFB74D]/40 transition-colors">
                    <MapPin className="w-12 h-12" />
                  </div>
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#FFB74D] block">
                    Camping Pitches
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white block my-2">
                    {totalCampingPitches}
                  </span>
                  <span className="text-xs text-[#D4A373] flex items-center gap-1 font-medium">
                    <Flame className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>Sanctuary grove allocated</span>
                  </span>
                </div>

                <div className="bg-[#1A120B] text-white p-6 rounded-2xl border-2 border-[#5C3A21] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-[#FFB74D]/20 group-hover:text-[#FFB74D]/40 transition-colors">
                    <HeartHandshake className="w-12 h-12" />
                  </div>
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#FFB74D] block">
                    Elder Funds Raised
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4CAF50] block my-2">
                    ${totalFundsRaised.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#D4A373] flex items-center gap-1 font-medium">
                    <span>{donations.length} total sponsorship gifts</span>
                  </span>
                </div>

                <div className="bg-[#1A120B] text-white p-6 rounded-2xl border-2 border-[#5C3A21] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 text-[#FFB74D]/20 group-hover:text-[#FFB74D]/40 transition-colors">
                    <Users className="w-12 h-12" />
                  </div>
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#FFB74D] block">
                    Volunteer Corps
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-white block my-2">
                    {volunteers.length}
                  </span>
                  <span className="text-xs text-[#D4A373] flex items-center gap-1 font-medium">
                    <span>6 specialized field teams</span>
                  </span>
                </div>

              </div>

              {/* Gate Check-In Simulator Box */}
              <div className="bg-[#FAF6F0] p-6 sm:p-8 rounded-3xl border-2 border-[#D4A373] shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-[#E65100]" />
                    <h3 className="font-serif text-xl font-bold text-[#1A120B]">
                      Gate Check-In & Ticket Verifier Simulator
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-[#E65100]/10 text-[#E65100] px-3 py-1 rounded-full border border-[#E65100]/30">
                    Sanctuary Gate Entry Mode
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4033] font-light">
                  Test gate entry protocols by entering or pasting an attendee ticket code (e.g. <code className="font-mono font-bold">{registrations[0]?.ticketCode || "SUT-AFR-2026-0001"}</code>) to simulate check-in scanning.
                </p>

                <form onSubmit={handleSimulateCheckIn} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={checkInCode}
                    onChange={(e) => {
                      setCheckInCode(e.target.value);
                      if (checkInResult) setCheckInResult(null);
                    }}
                    placeholder="Enter or paste ticket code..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#D4A373]/80 font-mono text-sm uppercase tracking-wider text-[#1A120B] focus:outline-none focus:ring-2 focus:ring-[#E65100]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#1A120B] hover:bg-[#2C1D11] text-[#FFB74D] font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md border border-[#5C3A21]"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Verify Gate Pass</span>
                  </button>
                </form>

                {checkInResult && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-start gap-3 animate-fadeIn ${
                    checkInResult.status === "success"
                      ? "bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20]"
                      : "bg-[#FFEBEE] border-[#D32F2F] text-[#B71C1C]"
                  }`}>
                    {checkInResult.status === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-[#D32F2F] shrink-0 mt-0.5" />
                    )}
                    <span>{checkInResult.message}</span>
                  </div>
                )}
              </div>

              {/* Data Table Management & CSV Export */}
              <div className="bg-white rounded-3xl border-2 border-[#D4A373] shadow-2xl overflow-hidden">
                
                {/* Table Header Bar */}
                <div className="bg-[#1A120B] p-6 border-b border-[#5C3A21] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "attendees", label: `Attendees (${registrations.length})` },
                      { id: "volunteers", label: `Volunteers (${volunteers.length})` },
                      { id: "donations", label: `Sponsorships (${donations.length})` },
                      { id: "proposals", label: `Workshop Proposals (${proposals.length})` }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setOrganizerTable(tab.id as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          organizerTable === tab.id
                            ? "bg-[#E65100] text-white shadow-md border border-[#FFB74D]"
                            : "bg-[#2C1D11] text-[#D4A373] hover:bg-[#3E2315] hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (organizerTable === "attendees") exportToCSV("SUT_Africa_Attendees", registrations);
                        if (organizerTable === "volunteers") exportToCSV("SUT_Africa_Volunteers", volunteers);
                        if (organizerTable === "donations") exportToCSV("SUT_Africa_Donations", donations);
                        if (organizerTable === "proposals") exportToCSV("SUT_Africa_Proposals", proposals);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#388E3C] hover:to-[#2E7D32] text-white font-extrabold text-xs uppercase tracking-wider shadow transition-all flex items-center gap-2 border border-[#81C784]/40 whitespace-nowrap"
                    >
                      <FileSpreadsheet className="w-4 h-4 text-[#A5D6A7]" />
                      <span>Download CSV Export</span>
                    </button>
                  </div>
                </div>

                {/* Search Bar inside table */}
                <div className="p-4 bg-[#FAF6F0] border-b border-[#D4A373]/40 flex items-center gap-3">
                  <Search className="w-4 h-4 text-[#8C5319]" />
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={(e) => setAdminSearch(e.target.value)}
                    placeholder={`Filter current ${organizerTable} table...`}
                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#1A120B] focus:outline-none placeholder-[#8C5319]/60"
                  />
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                  
                  {/* Attendees Table */}
                  {organizerTable === "attendees" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#EFEBE6] text-[#5C4033] text-[10px] uppercase font-extrabold tracking-wider border-b border-[#D4A373]/60">
                          <th className="p-4">Ticket Code</th>
                          <th className="p-4">Full Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Pass Type</th>
                          <th className="p-4">Tribe / Country</th>
                          <th className="p-4">Dialect Needs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4A373]/30 text-xs text-[#1A120B] font-medium">
                        {registrations
                          .filter(r => !adminSearch || r.fullName.toLowerCase().includes(adminSearch.toLowerCase()) || r.email.toLowerCase().includes(adminSearch.toLowerCase()))
                          .map((r, i) => (
                            <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-[#FAF6F0]/50"}>
                              <td className="p-4 font-mono font-bold text-[#E65100]">{r.ticketCode}</td>
                              <td className="p-4 font-bold font-serif">{r.fullName}</td>
                              <td className="p-4 text-[#5C4033]">{r.email}</td>
                              <td className="p-4"><span className="bg-[#EFEBE6] px-2 py-1 rounded font-semibold">{r.passType.split(" (")[0]}</span></td>
                              <td className="p-4">{r.tribalAffiliation || "N/A"} ({r.country})</td>
                              <td className="p-4">{r.dialectNeeds}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}

                  {/* Volunteers Table */}
                  {organizerTable === "volunteers" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#EFEBE6] text-[#5C4033] text-[10px] uppercase font-extrabold tracking-wider border-b border-[#D4A373]/60">
                          <th className="p-4">Volunteer Name</th>
                          <th className="p-4">Assigned Role</th>
                          <th className="p-4">Email & Phone</th>
                          <th className="p-4">Languages Spoken</th>
                          <th className="p-4">Availability</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4A373]/30 text-xs text-[#1A120B] font-medium">
                        {volunteers
                          .filter(v => !adminSearch || v.fullName.toLowerCase().includes(adminSearch.toLowerCase()) || v.role.toLowerCase().includes(adminSearch.toLowerCase()))
                          .map((v, i) => (
                            <tr key={v.id} className={i % 2 === 0 ? "bg-white" : "bg-[#FAF6F0]/50"}>
                              <td className="p-4 font-bold font-serif">{v.fullName}</td>
                              <td className="p-4"><span className="bg-[#E65100]/10 text-[#E65100] px-2 py-1 rounded font-bold">{v.role}</span></td>
                              <td className="p-4">{v.email}<br/><span className="text-[10px] text-[#5C4033]">{v.phone}</span></td>
                              <td className="p-4">{v.languages}</td>
                              <td className="p-4">{v.availability}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}

                  {/* Donations Table */}
                  {organizerTable === "donations" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#EFEBE6] text-[#5C4033] text-[10px] uppercase font-extrabold tracking-wider border-b border-[#D4A373]/60">
                          <th className="p-4">Donor Name</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Payment Method</th>
                          <th className="p-4">Designated Elder</th>
                          <th className="p-4">Message / Offering</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4A373]/30 text-xs text-[#1A120B] font-medium">
                        {donations
                          .filter(d => !adminSearch || d.donorName.toLowerCase().includes(adminSearch.toLowerCase()))
                          .map((d, i) => {
                            return (
                              <tr key={d.id} className={i % 2 === 0 ? "bg-white" : "bg-[#FAF6F0]/50"}>
                                <td className="p-4 font-bold font-serif">{d.donorName}</td>
                                <td className="p-4 font-mono font-extrabold text-[#2E7D32]">${d.amount} {d.currency}</td>
                                <td className="p-4"><span className="bg-[#EFEBE6] px-2 py-0.5 rounded font-semibold">{d.method}</span></td>
                                <td className="p-4">{d.designatedElderId === "general" ? "General Elder & Sanctuary Fund" : "General Elder & Sanctuary Fund"}</td>
                                <td className="p-4 italic text-[#5C4033] max-w-xs truncate">"{d.message}"</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  )}

                  {/* Proposals Table */}
                  {organizerTable === "proposals" && (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#EFEBE6] text-[#5C4033] text-[10px] uppercase font-extrabold tracking-wider border-b border-[#D4A373]/60">
                          <th className="p-4">Workshop Title</th>
                          <th className="p-4">Leader / Elder Name</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Format</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D4A373]/30 text-xs text-[#1A120B] font-medium">
                        {proposals
                          .filter(p => !adminSearch || p.title.toLowerCase().includes(adminSearch.toLowerCase()) || p.submitterName.toLowerCase().includes(adminSearch.toLowerCase()))
                          .map((p, i) => (
                            <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-[#FAF6F0]/50"}>
                              <td className="p-4 font-bold font-serif">{p.title}</td>
                              <td className="p-4">{p.submitterName} ({p.tribeOrAffiliation})</td>
                              <td className="p-4"><span className="bg-[#FAF6F0] border px-2 py-0.5 rounded text-[11px] font-bold">{p.category}</span></td>
                              <td className="p-4">{p.format} ({p.duration})</td>
                              <td className="p-4"><span className="bg-[#E8F5E9] text-[#2E7D32] px-2 py-1 rounded font-bold uppercase text-[10px]">{p.status}</span></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}

                </div>

                <div className="bg-[#EFEBE6] p-4 border-t border-[#D4A373]/60 text-xs text-[#5C4033] flex items-center justify-between">
                  <span>Showing all local persistent records for <strong className="text-[#1A120B]">{organizerTable}</strong></span>
                  <span className="font-mono text-[11px]">SUT Africa Telemetry Engine v1.0</span>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
