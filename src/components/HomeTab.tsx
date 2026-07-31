import React, { useState, useEffect } from "react";
import { TabType, Elder } from "../types";
import { 
  HeartHandshake, 
  Calendar, 
  Sparkles, 
  Globe2, 
  TreePine, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Sun,
  ShieldCheck,
  Award,
  Play,
  ArrowRight,
  Compass
} from "lucide-react";

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  onOpenSponsorModal: () => void;
}

interface HeroSlide {
  id: number;
  title: string;
  location: string;
  tagline: string;
  image: string;
  description: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "The Great Rift Valley Sanctuary",
    location: "Lake Nakuru & Mount Kenya Foothills, East Africa",
    tagline: "Where Humanity First Walked Upright",
    image: "https://images.unsplash.com/photo-1516026974298-531bf4251037?auto=format&fit=crop&w=1600&q=80",
    description: "Beneath ancient baobabs and acacias, diverse tribes gather to renew sacred vows with the Mother Continent."
  },
  {
    id: 2,
    title: "Sacred Drum Circles & Griot Storytelling",
    location: "Dakar, Senegal & West African Coast",
    tagline: "The Heartbeat of the Mother Continent",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80",
    description: "Polyrhythmic drumming and oral history sessions bridge generations, passing down the memory of African peace."
  },
  {
    id: 3,
    title: "San Trance Dancers & Desert Wisdom",
    location: "The Kalahari Sands, Southern Africa",
    tagline: "Conversing with the Cosmos",
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1600&q=80",
    description: "Honoring one of Earth's oldest surviving continuous cultures as they guide us in living harmoniously with scarce waters."
  },
  {
    id: 4,
    title: "Dense Rainforests & Sacred Rivers",
    location: "The Congo & Nile Basins",
    tagline: "Arteries of Civilization and Unity",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80",
    description: "Protecting Africa's immense biodiversity as living spiritual entities that sustain all future generations."
  }
];

export const HomeTab: React.FC<HomeTabProps> = ({ setActiveTab, onOpenSponsorModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activePillar, setActivePillar] = useState<number | null>(0);

  // Auto advance slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const pillars = [
    {
      title: "The Spirit of Ubuntu",
      subtitle: "I am because we are",
      icon: <Users className="w-6 h-6 text-[#FFB74D]" />,
      content: "Unlike Western individualism, African ontology asserts that a person only becomes fully human through compassionate relationships with others and the natural world. In our gatherings, no tribe is greater or smaller; we sit in equal reverence around the council fire."
    },
    {
      title: "Stewardship of the Land",
      subtitle: "Our sacred relatives",
      icon: <TreePine className="w-6 h-6 text-[#81C784]" />,
      content: "We do not own the earth; we hold it in trust for future generations. SUT Africa integrates traditional ecological knowledge—such as taboo forests, water harvesting, and wildlife protection—as the world's most enduring conservation model."
    },
    {
      title: "Honoring Living Libraries",
      subtitle: "Reverence for our Elders",
      icon: <Flame className="w-6 h-6 text-[#FF8A65]" />,
      content: "When an elder dies in Africa, a library burns down. Facilitating the travel of diverse traditional leaders across vast borders is our highest priority, ensuring their oral histories and ceremonies heal the youth."
    },
    {
      title: "Cross-Cultural Harmony",
      subtitle: "One Mother Continent",
      icon: <Globe2 className="w-6 h-6 text-[#FFD54F]" />,
      content: "Long before colonial borders partitioned Africa into 54 nations, our kingdoms traded, intermarried, and forged treaties of brotherhood. We gather to heal ethnic divides and celebrate our shared spiritual origins."
    }
  ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION & VISUAL SHOWCASE */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden rounded-3xl bg-[#1A120B] text-white shadow-2xl border-2 border-[#5C3A21]">
        
        {/* Background Image Slider with Rich Gradient Overlays */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 scale-105 transition-transform duration-[12000ms]" : "opacity-0 scale-100 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/60 to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#1A120B_100%)] opacity-70" />
          </div>
        ))}

        {/* Hero Content Box */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3E2315]/90 border border-[#D4A373]/50 text-[#FFB74D] text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest mb-8 shadow-xl backdrop-blur-md animate-fadeIn max-w-full text-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB74D] shrink-0 animate-pulse-slow" />
            <span>Spiritual Unity of the Tribes • Africa</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-tight sm:leading-none drop-shadow-2xl">
            Walking in Oneness to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD8B5] via-[#FFB74D] via-[#E65100] to-[#FF6D00]">
              Steward the Mother Continent
            </span>
          </h1>

          {/* Ancestral Declaration Glassmorphic Card */}
          <div className="max-w-4xl mx-auto mb-12 p-8 sm:p-10 rounded-3xl bg-[#1A120B]/85 backdrop-blur-lg border border-[#D4A373]/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A373] via-[#E65100] to-[#D4A373]" />
            <p className="font-serif text-lg sm:text-2xl text-[#FAF6F0] italic leading-relaxed font-normal">
              "We are all spiritual beings who humbly walk alongside each other, in oneness, to steward the Mother Continent and the life upon it. Rooted in the spirit of <span className="text-[#FFB74D] font-bold not-italic">Ubuntu</span> — <span className="underline decoration-[#E65100] underline-offset-8">I am because we are</span> — we gather across tribes for future generations."
            </p>
            <p className="mt-6 text-xs sm:text-sm text-[#D4A373] uppercase tracking-widest font-bold">
              — SUT Africa Ancestral Council Declaration
            </p>
          </div>

          {/* Prominent CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={() => {
                setActiveTab("register");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-base sm:text-lg shadow-2xl shadow-[#E65100]/40 hover:scale-105 transition-all transform flex items-center justify-center gap-3 border border-[#FFB74D]/30"
            >
              <Calendar className="w-5 h-5 text-[#FFB74D]" />
              <span>Register for the Gathering</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenSponsorModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2A1810]/90 hover:bg-[#3E2315] border-2 border-[#D4A373]/80 text-[#FAF6F0] hover:text-white font-extrabold text-base sm:text-lg shadow-2xl backdrop-blur-md hover:scale-105 transition-all transform flex items-center justify-center gap-3 group"
            >
              <HeartHandshake className="w-5 h-5 text-[#FFB74D] group-hover:scale-110 transition-transform" />
              <span>Sponsor an Elder's Journey</span>
            </button>
          </div>

          {/* Slide Indicator Bar */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-[#FFB74D] border border-[#5C3A21] transition-colors focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  idx === currentSlide ? "w-12 bg-gradient-to-r from-[#FFB74D] to-[#E65100]" : "w-2.5 bg-[#5C3A21] hover:bg-[#8C5319]"
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              />
            ))}
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-black/60 hover:bg-black/90 text-[#FFB74D] border border-[#5C3A21] transition-colors focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-3 text-xs text-[#D4A373] font-medium tracking-wide">
            Featuring: <strong className="text-white">{HERO_SLIDES[currentSlide].title}</strong> — <span className="italic">{HERO_SLIDES[currentSlide].tagline}</span>
          </p>

        </div>
      </section>

      {/* 2. CORE PHILOSOPHY & PILLARS (CARVED TABLET MATRIX) */}
      <section className="w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFEBE6] border border-[#D4A373]/60 text-[#8C5319] text-xs font-extrabold uppercase tracking-widest mb-3 shadow-sm">
            <Sun className="w-3.5 h-3.5 text-[#E65100]" />
            <span>Foundational Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A120B] tracking-tight">
            The Philosophy That Unites Our Tribes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C4033] leading-relaxed">
            Across 54 African nations and thousands of ethnic languages, ancient threads of spiritual wisdom bind us to one another and to our sacred lands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const isSelected = activePillar === idx;
            return (
              <div
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={`cursor-pointer rounded-3xl p-7 transition-all duration-500 border-2 flex flex-col justify-between ${
                  isSelected
                    ? "bg-gradient-to-b from-[#2A1810] via-[#3E2315] to-[#1A120B] text-white shadow-2xl border-[#E65100] scale-[1.03] ring-4 ring-[#E65100]/20"
                    : "bg-white/90 hover:bg-white text-[#1A120B] border-[#D4A373]/50 hover:border-[#E65100]/80 shadow-md hover:shadow-xl"
                }`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 ${
                    isSelected ? "bg-[#E65100] text-white shadow-lg scale-110" : "bg-[#FAF6F0] border border-[#D4A373]/60 text-[#E65100]"
                  }`}>
                    {pillar.icon}
                  </div>
                  <span className={`text-[11px] font-extrabold uppercase tracking-widest block mb-1 ${
                    isSelected ? "text-[#FFB74D]" : "text-[#8C5319]"
                  }`}>
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl font-bold mb-2 tracking-tight">{pillar.title}</h3>
                  <p className={`text-xs italic mb-5 font-serif font-medium ${
                    isSelected ? "text-[#FFD8B5]" : "text-[#8C5319]"
                  }`}>
                    "{pillar.subtitle}"
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    isSelected ? "text-[#FAF6F0]/90" : "text-[#5C4033]"
                  }`}>
                    {pillar.content}
                  </p>
                </div>

                <div 
                  onClick={(e) => {
                    if (isSelected) {
                      e.stopPropagation();
                      setActiveTab("lore");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-bold uppercase tracking-wider ${
                  isSelected ? "border-[#D4A373]/40 text-[#FFB74D] hover:text-white cursor-pointer" : "border-[#D4A373]/30 text-[#8C5319]"
                }`}>
                  <span>Explore Wisdom</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "translate-x-1" : ""}`} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. UPCOMING GATHERING BANNER & HYBRID ACCESS */}
      <section className="w-full">
        <div className="rounded-3xl bg-gradient-to-r from-[#3E2315] via-[#5C2C16] to-[#2A1810] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border-2 border-[#D4A373]">
          <div className="absolute -right-16 -bottom-16 opacity-15 pointer-events-none">
            <TreePine className="w-[450px] h-[450px] text-[#FFB74D]" />
          </div>
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#D4A373] via-[#FFB74D] to-[#D4A373]" />

          <div className="relative z-10 max-w-3xl space-y-7">
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-[#FFD8B5] border border-white/20">
              <Calendar className="w-4 h-4 text-[#FFB74D]" />
              <span>September 26, 2026 • Lake Nakuru, Kenya</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              The Great Rift Valley Convergence: <br />
              <span className="text-[#FFB74D] font-normal italic">Awakening the Ancestral Fire</span>
            </h2>

            <p className="text-base sm:text-lg text-[#FAF6F0]/90 leading-relaxed font-light">
              Join elders, healers, storytellers, and youth from across Africa and the diaspora. Experience sunrise blessings, oral history under the Baobab tree, traditional drumming for spiritual healing, and youth rites of passage.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveTab("gathering");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#FAF6F0] text-[#1A120B] hover:bg-white font-extrabold text-sm shadow-xl transition-colors flex items-center gap-2 group border border-[#D4A373]"
              >
                <span>View Full Activity Schedule</span>
                <ChevronRight className="w-4 h-4 text-[#E65100] group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#E65100] via-[#D84315] to-[#BF360C] hover:from-[#FF6D00] hover:to-[#D84315] text-white font-extrabold text-sm shadow-xl transition-colors flex items-center gap-2 border border-[#FFB74D]/30"
              >
                <Award className="w-4 h-4 text-[#FFB74D]" />
                <span>Reserve Free Gathering Pass</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

