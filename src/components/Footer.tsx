import React from "react";
import { TabType } from "../types";
import { Sparkles, HeartHandshake, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenSponsorModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSponsorModal }) => {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#1A120B] text-[#FAF6F0] border-t-2 border-[#5C3A21] pt-16 pb-12 relative overflow-hidden">
      {/* Top Ceremonial Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] via-[#BF360C] to-[#2E7D32]" />

      <div className="max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#5C3A21]/80">
          
          {/* Col 1: Mission & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFB74D] via-[#E65100] to-[#BF360C] flex items-center justify-center p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#1A120B] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#FFB74D] animate-pulse" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">SUT Africa</span>
            </div>
            <p className="text-sm text-[#FAF6F0]/85 leading-relaxed font-light">
              Spiritual Unity of the Tribes, Africa is a movement fostering cross-cultural harmony, ecological stewardship of the Mother Continent, and ancestral wisdom preservation.
            </p>
            <div className="p-3.5 rounded-xl bg-[#2C1D11]/80 border border-[#D4A373]/40 text-xs text-[#FFD8B5] italic font-serif">
              "Umuntu ngumuntu ngabantu" — I am because we are, and since we are, therefore I am.
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FFB74D]">✦</span>
              <span>Sacred Pathways</span>
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button 
                  onClick={() => { setActiveTab("home"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#D4A373] hover:text-[#FFB74D] transition-colors flex items-center gap-1.5"
                >
                  <span>Core Philosophy & 4 Directions</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("gathering"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#D4A373] hover:text-[#FFB74D] transition-colors flex items-center gap-1.5"
                >
                  <span>The Gathering & Council Fire</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("elders"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#D4A373] hover:text-[#FFB74D] transition-colors flex items-center gap-1.5"
                >
                  <span>Sponsor an Elder's Journey</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("lore"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#D4A373] hover:text-[#FFB74D] transition-colors flex items-center gap-1.5"
                >
                  <span>Wisdom Offerings & Lore</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("register"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#D4A373] hover:text-[#FFB74D] transition-colors flex items-center gap-1.5"
                >
                  <span>RSVP & Ticket Registration</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("volunteer"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#D4A373] hover:text-[#FFB74D] transition-colors flex items-center gap-1.5"
                >
                  <span>Volunteer Portal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab("portal"); window.scrollTo({top:0, behavior:"smooth"}); }}
                  className="text-[#FFB74D] font-bold hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>✦ My Passes & Secretariat Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Regional Hubs */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-[#FFB74D]">✦</span>
              <span>Secretariats</span>
            </h3>
            <div className="space-y-3.5 text-sm text-[#FAF6F0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">East Africa Hub</p>
                  <p className="text-xs text-[#D4A373]">Nairobi & Lake Nakuru Sanctuary, Kenya</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">West Africa Hub</p>
                  <p className="text-xs text-[#D4A373]">Dakar, Senegal & Accra, Ghana</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E65100] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Southern Africa Hub</p>
                  <p className="text-xs text-[#D4A373]">Johannesburg, RSA & Gaborone, Botswana</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#E65100] shrink-0" />
                <a href="mailto:secretariat@sutafrica.org" className="hover:text-[#FFB74D] transition-colors text-xs font-semibold">
                  secretariat@sutafrica.org
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Elder Action */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#FFB74D]">✦</span>
              <span>The Baobab Dispatch</span>
            </h3>
            <p className="text-xs text-[#FAF6F0]/80 leading-relaxed font-light">
              Receive proverbs of the month, gathering updates, and conservation charters directly to your inbox.
            </p>
            
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#1E3A1E] border border-[#4CAF50] text-[#A5D6A7] text-xs text-center font-bold shadow-inner">
                ✨ Thank you! You are now connected to the ancestral circle dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2C1D11] border border-[#5C3A21] text-sm text-white placeholder-[#D4A373]/60 focus:outline-none focus:border-[#E65100]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Join the Circle
                </button>
              </form>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenSponsorModal}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#BF360C] to-[#8C3A15] hover:from-[#E65100] hover:to-[#BF360C] text-white py-3 rounded-xl text-xs font-extrabold shadow-lg transition-all border border-[#FFB74D]/30"
              >
                <HeartHandshake className="w-4 h-4 text-[#FFB74D] animate-pulse" />
                <span>Support an Elder's Travel Now</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section & Gathering of Eagles Recognition */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#D4A373]/70 gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-[#FAF6F0]">© {new Date().getFullYear()} Spiritual Unity of the Tribes, Africa (SUT Africa). Rooted in Ubuntu.</p>
            <p className="text-[11px] text-[#D4A373]/60">
              Honoring the global <strong className="text-[#FFB74D] font-normal">Gathering of Eagles</strong> tradition & the Condor-Eagle Prophecy across all continents.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <span className="hover:text-[#FFB74D] cursor-pointer transition-colors">Privacy & Indigenous Data Charter</span>
            <span className="hover:text-[#FFB74D] cursor-pointer transition-colors">Terms of Sacred Assembly</span>
            <span className="hover:text-[#FFB74D] cursor-pointer transition-colors">Mobile-First Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
