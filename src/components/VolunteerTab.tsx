import React, { useState } from "react";
import { VolunteerApplication } from "../types";
import { 
  Users, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Languages, 
  Stethoscope, 
  Flame, 
  Compass,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";

interface VolunteerTabProps {
  onAddVolunteer: (vol: VolunteerApplication) => void;
}

export const VolunteerTab: React.FC<VolunteerTabProps> = ({ onAddVolunteer }) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<VolunteerApplication["role"]>("Logistics & Transport");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    languages: "Swahili / English",
    experience: "",
    availability: "Full 5 Days (Sep 21-25)",
  });

  const roles: { id: VolunteerApplication["role"]; title: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "Logistics & Transport",
      title: "Logistics & Overland Transport",
      icon: <Truck className="w-5 h-5 text-[#E65100]" />,
      desc: "Assist with airport pickups in Nairobi/Dakar, driving 4x4 convoys to remote sanctuary sites, and coordinating elder luggage."
    },
    {
      id: "Medical & First Aid",
      title: "Medical Support & First Aid",
      icon: <Stethoscope className="w-5 h-5 text-[#BF360C]" />,
      desc: "Nurses, traditional herbal healers, and first responders to support attendees during highland altitude, heat, or ceremonial dances."
    },
    {
      id: "Dialect Translation",
      title: "Dialect & Language Translation",
      icon: <Languages className="w-5 h-5 text-[#1E3A8A]" />,
      desc: "Bridge communication between elders and youth in Swahili, Hausa, Amharic, Yoruba, French, Zulu, Arabic, and English."
    },
    {
      id: "Security & Peacekeeping",
      title: "Security & Peacekeeping",
      icon: <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />,
      desc: "Provide respectful perimeter guidance, campsite safety, and assist traditional elder mediation teams."
    },
    {
      id: "Ceremonal & Altar Setup",
      title: "Ceremonial & Altar Setup",
      icon: <Flame className="w-5 h-5 text-[#FFB74D]" />,
      desc: "Prepare sacred baobab fire pits, arrange firewood, maintain sunrise libation vessels, and assist master drummers."
    },
    {
      id: "Youth Guidance",
      title: "Youth Guidance & Rites",
      icon: <Compass className="w-5 h-5 text-[#8C5319]" />,
      desc: "Facilitate Gen-Z breakout circles, digital storytelling workshops, and traditional mentorship activities."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVol: VolunteerApplication = {
      id: `vol-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country || "Kenya",
      role: selectedRole,
      languages: formData.languages,
      experience: formData.experience || "Eager to serve with Ubuntu spirit",
      availability: formData.availability,
      dateApplied: new Date().toISOString().split("T")[0]
    };

    onAddVolunteer(newVol);
    setSubmitSuccess(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        languages: "Swahili / English",
        experience: "",
        availability: "Full 5 Days (Sep 21-25)"
      });
    }, 2500);
  };

  return (
    <div className="space-y-16 pb-16 w-full max-w-[1400px] mx-auto">
      
      {/* HEADER BANNER */}
      <section className="bg-gradient-to-br from-[#1A120B] via-[#2A1810] to-[#1A120B] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#5C3A21] shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C2C16] border border-[#D4A373]/50 text-[#FFB74D] text-xs font-extrabold uppercase tracking-widest shadow-md">
          <Users className="w-4 h-4" />
          <span>Service in Ubuntu</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Volunteer Portal: <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD8B5] via-[#FFB74D] to-[#E65100]">
            Offer Your Skills to the Circle
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-[#FAF6F0]/90 max-w-2xl mx-auto font-light leading-relaxed">
          A physical gathering of thousands across Africa requires devoted hands. Whether you speak multiple dialects, have medical training, or can drive a 4x4 across rough terrain, your service makes the convergence possible.
        </p>
      </section>

      {/* ROLE SELECTION & FORM */}
      <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-12 border-2 border-[#D4A373] shadow-2xl space-y-10">
        
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A120B] mb-2 tracking-tight">
            1. Select Your Primary Volunteer Role
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4033] mb-8 font-medium">
            Click on the area where your background and passion can best support the gathering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? "bg-gradient-to-br from-[#2A1810] via-[#3E2315] to-[#1A120B] text-white border-[#E65100] shadow-xl scale-[1.03] ring-4 ring-[#E65100]/20"
                      : "bg-white/95 text-[#1A120B] border-[#D4A373]/60 hover:border-[#E65100]/70 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${isSelected ? "bg-[#E65100] text-white" : "bg-[#FAF6F0] border border-[#D4A373]/40"}`}>
                        {role.icon}
                      </div>
                      {isSelected && (
                        <span className="bg-[#E65100] text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                          Selected
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2 tracking-tight">{role.title}</h3>
                    <p className={`text-xs leading-relaxed ${isSelected ? "text-[#FAF6F0]/85 font-light" : "text-[#5C4033]"}`}>{role.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* APPLICATION FORM */}
        <div className="pt-8 border-t-2 border-[#D4A373]/40">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A120B] mb-6 tracking-tight">
            2. Volunteer Identity & Availability
          </h2>

          {submitSuccess ? (
            <div className="py-14 text-center space-y-4 animate-fadeIn bg-white rounded-3xl border border-[#A5D6A7] p-8 shadow-inner">
              <div className="w-16 h-16 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1A120B]">
                Siyabonga! Volunteer Application Received
              </h3>
              <p className="text-sm sm:text-base text-[#5C4033] max-w-lg mx-auto leading-relaxed">
                Thank you for offering your skills in <span className="font-bold text-[#E65100] underline decoration-[#E65100]/40">{selectedRole}</span>. Our volunteer coordinator will reach out via WhatsApp/Email within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#D4A373]/60 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Sister Amina Diop"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="amina@ubuntu.org"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+221 77 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Country / Region
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Senegal / Kenya"
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  >
                    <option value="Full 5 Days (Sep 21-25)">Full 5 Days (Sep 21-25)</option>
                    <option value="Setup Days (Sep 19-20)">Setup Days (Sep 19-20)</option>
                    <option value="Weekend Only (Sep 24-25)">Weekend Only (Sep 24-25)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                  Languages Spoken & Proficiency
                </label>
                <input
                  type="text"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="e.g. Swahili (Fluent), Yoruba (Native), English (Fluent), French (Conversational)"
                  className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner"
                  />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4033] mb-1.5">
                  Relevant Experience or Background Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Briefly describe any experience in logistics, herbal medicine, event security, or working with traditional elders..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D4A373]/80 bg-[#FAF6F0]/40 text-[#1A120B] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E65100] transition-shadow shadow-inner resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-base shadow-2xl shadow-[#E65100]/40 hover:scale-105 transition-all flex items-center gap-3 border border-[#FFB74D]/30"
                >
                  <Award className="w-5 h-5 text-[#FFB74D]" />
                  <span>Submit Application for {selectedRole}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
