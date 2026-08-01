import { Elder, EventInfo, LoreArticle, Proverb, WorkshopProposal, PartnerOrg, DonationRecord } from "../types";

export const INITIAL_ELDERS: Elder[] = [
  {
    id: "elder-1",
    name: "Mzee Ousmane Diop",
    title: "Master Griot & Oral Historian",
    tribe: "Wolof / Mandinka",
    country: "Senegal",
    region: "West Africa",
    bio: "For over five decades, Mzee Ousmane has carried the kora and the oral memory of the Mali and Jolof empires. He travels across West Africa mediating communal peace through ancestral genealogy and musical storytelling.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    wisdomQuote: "A tree without roots cannot withstand the storm; a people without their stories are strangers in their own land.",
    targetAmount: 850,
    raisedAmount: 620,
    travelNeeds: ["Flight from Dakar to Nairobi", "4-day accommodation in Rift Valley", "Herbal tea dietary accommodations"],
    featured: true
  },
  {
    id: "elder-2",
    name: "Laibon Ole Lekuton",
    title: "Maasai Spiritual Leader & Rainmaker",
    tribe: "Maasai",
    country: "Kenya / Tanzania",
    region: "East Africa",
    bio: "As a revered Laibon of the Loita Plains, Ole Lekuton bridges traditional cattle-herding wisdom with modern wildlife conservation. He leads sunrise libations asking Enkai (God) for harmony between people and wildlife.",
    photo: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=800&q=80",
    wisdomQuote: "We do not inherit the earth from our ancestors; we borrow it from our children and the beasts of the savanna.",
    targetAmount: 450,
    raisedAmount: 450,
    travelNeeds: ["4x4 overland transport from Mara", "Ceremonial lodging", "Community assistant support"],
    featured: true
  },
  {
    id: "elder-3",
    name: "Gogo Mandisa Dlamini",
    title: "Senior Sangoma & Herbalist",
    tribe: "Zulu",
    country: "South Africa",
    region: "Southern Africa",
    bio: "Initiated in the sacred Drakensberg mountains, Gogo Mandisa specializes in using indigenous fynbos and roots for emotional and spiritual trauma healing. She has mentored over 200 young traditional healers.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    wisdomQuote: "Umuntu ngumuntu ngabantu—I am because you are. When one leaf is healed, the whole branch rejoices.",
    targetAmount: 900,
    raisedAmount: 340,
    travelNeeds: ["Round-trip flight Johannesburg to Nairobi", "Safe transit for sacred medicinal herbs", "Accessible ground transport"],
    featured: true
  },
  {
    id: "elder-4",
    name: "Baba Nii Aryee",
    title: "Wulomo (Chief Priest) & Earth Steward",
    tribe: "Ga / Ashanti",
    country: "Ghana",
    region: "West Africa",
    bio: "Guardian of the sacred groves along the Gulf of Guinea, Baba Nii champions the restoration of taboo forests and coastal lagoons as living spiritual entities that protect coastal communities from erosion.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    wisdomQuote: "When the river is calm, do not forget the spring from which it flowed.",
    targetAmount: 800,
    raisedAmount: 710,
    travelNeeds: ["Flight Accra to Nairobi", "Ceremonial white linens & regalia transport", "Translator support (Ga/Twi to English)"],
    featured: false
  },
  {
    id: "elder-5",
    name: "Mama Keren Xhoo",
    title: "San Healer & Trance Dancer",
    tribe: "San / Bushmen",
    country: "Botswana / Namibia",
    region: "Southern Africa",
    bio: "Representing one of the oldest surviving continuous cultures on Earth, Mama Keren shares the healing power of the San trance dance and ancient desert water-finding wisdom.",
    photo: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
    wisdomQuote: "The stars are our campfires in the sky; when we dance around our fire on earth, we converse with the cosmos.",
    targetAmount: 950,
    raisedAmount: 480,
    travelNeeds: ["Charter connection from Kalahari", "Warm evening blankets for highland air", "Translator for Khoisan click dialects"],
    featured: true
  },
  {
    id: "elder-6",
    name: "Abba Tesfaye Bekele",
    title: "Orthodox Anchorite & Herbalist",
    tribe: "Oromo / Amhara",
    country: "Ethiopia",
    region: "East Africa",
    bio: "Guardian of the ancient church forests of northern Ethiopia, Abba Tesfaye protects biodiversity islands around sacred sanctuaries where rare birds and medicinal trees thrive in peace.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    wisdomQuote: "The forest is the garment of the sacred; strip the trees, and the prayers lose their shelter.",
    targetAmount: 600,
    raisedAmount: 590,
    travelNeeds: ["Flight Addis Ababa to Nairobi", "Vegetarian fasting meals", "Quiet contemplation quarter"],
    featured: false
  }
];

export const UPCOMING_GATHERING: EventInfo = {
  id: "sut-africa-2026",
  title: "The Great Rift Valley Convergence",
  subtitle: "Awakening the Ancestral Fire of Ubuntu",
  dates: "September 26, 2026",
  location: "Sacred Baobab Sanctuary, Nakuru Foothills, Kenya (Hybrid Physical & Global Virtual Access)",
  theme: "Healing the Land, Uniting the Tribes, Empowering the Youth",
  description: "On this sacred day, elders, healers, conservationists, and youth from over 40 African nations and the diaspora will gather beneath the ancient acacias and baobabs of the Great Rift Valley. Here, where humanity first walked upright, we join our voices in sunrise libations, oral storytelling, drum healing, and practical workshops on Indigenous ecology.",
  heroImage: "https://images.unsplash.com/photo-1516026974298-531bf4251037?auto=format&fit=crop&w=1600&q=80",
  schedule: [
    {
      id: "act-1",
      time: "06:00 AM – 07:30 AM",
      title: "Sunrise Libations & Blessing of the Four Winds",
      category: "ceremony",
      location: "The Grand Baobab Altar",
      leader: "Laibon Ole Lekuton & Gogo Mandisa",
      description: "As the golden sun rises over the Rift Valley escarpment, elders pour water and milk onto the red earth, calling upon the ancestors and Enkai for peace across the continent."
    },
    {
      id: "act-2",
      time: "09:30 AM – 11:30 AM",
      title: "Under the Baobab Tree: Oral Histories of Migration & Brotherhood",
      category: "storytelling",
      location: "The Central Amphitheater",
      leader: "Mzee Ousmane Diop (Master Griot)",
      description: "An immersive storytelling circle where master griots recount ancient treaties of kinship between West, East, and Southern African kingdoms long before colonial borders existed."
    },
    {
      id: "act-3",
      time: "01:30 PM – 03:30 PM",
      title: "Sacred Ecology & Indigenous Drought-Resistant Farming",
      category: "ecology",
      location: "The Permaculture Demonstration Plots",
      leader: "Baba Nii Aryee & Agronomy Team",
      description: "Hands-on field workshop exploring traditional Zai pits, water harvesting, and preserving ancient African millet and sorghum seed banks against climate change."
    },
    {
      id: "act-4",
      time: "04:00 PM – 06:00 PM",
      title: "Youth Rites of Passage & Ancestral Mentorship",
      category: "youth",
      location: "The Youth Council Circle",
      leader: "African Youth Ambassadors & Abba Tesfaye",
      description: "A dialogue bridging elders and Gen-Z leaders on cultural identity, digital storytelling, ethical leadership, and overcoming tribalism through modern Ubuntu."
    },
    {
      id: "act-5",
      time: "07:30 PM – 10:00 PM",
      title: "The Great Drum Circle & San Trance Healing Dance",
      category: "healing",
      location: "The Sacred Fire Plaza",
      leader: "Mama Keren Xhoo & Master Drummers of West Africa",
      description: "An electrifying night of polyrhythmic drumming, kora melodies, and communal dance designed to release collective grief and awaken spiritual joy."
    }
  ]
};

export const INITIAL_PROPOSALS: WorkshopProposal[] = [
  {
    id: "prop-1",
    submitterName: "Dr. Amina Touré",
    tribeOrAffiliation: "Fulani / African Herbalists Guild",
    email: "amina@herbalheritage.org",
    phone: "+221 77 555 0192",
    title: "Sacred Roots & Leaves: Integrating Traditional African Pharmacopeia with Community Healthcare",
    category: "Herbal Medicine",
    description: "A demonstration of 15 essential medicinal plants native to sub-Saharan Africa, teaching sustainable wild-harvesting and preparation of teas and poultices for malaria and inflammation relief.",
    format: "Interactive Workshop",
    duration: "2 Hours",
    dateSubmitted: "2026-07-10",
    status: "Approved"
  },
  {
    id: "prop-2",
    submitterName: "Kwame & Kweku Mensah",
    tribeOrAffiliation: "Ashanti Woodcarvers & Drum Guild",
    email: "mensahbros@ashanticrafts.gh",
    phone: "+233 24 555 8812",
    title: "The Heartbeat of the Wood: Carving and Tuning the Djembe and Talking Drum",
    category: "Beadwork & Craft",
    description: "Participants will learn the spiritual etiquette of harvesting wood, stretching goat skins, and the language of drum rhythms used to send messages across villages.",
    format: "Field Demonstration",
    duration: "3 Hours",
    dateSubmitted: "2026-07-15",
    status: "Featured"
  },
  {
    id: "prop-3",
    submitterName: "Tendai Mupfumi",
    tribeOrAffiliation: "Shona / Great Zimbabwe Earth Keepers",
    email: "tendai@earthkeepers.zw",
    phone: "+263 77 222 9901",
    title: "Restoring Sacred Groves: How Traditional Taboos Protect Biodiversity",
    category: "Spiritual Ecology",
    description: "Exploring how traditional community laws regarding sacred forests, totems, and protected water springs serve as the world's most effective community conservation model.",
    format: "Oral Presentation",
    duration: "1.5 Hours",
    dateSubmitted: "2026-07-18",
    status: "Approved"
  }
];

export const LORE_ARTICLES: LoreArticle[] = [
  {
    id: "lore-1",
    title: "Mount Kenya: The Realm of Ngai and the Sacred Fig Tree",
    subtitle: "How the Kikuyu and Maasai cosmology honors the majestic white-peaked mountain as the terrestrial throne of the Supreme Creator.",
    category: "Sacred Geography",
    region: "East Africa (Kenya)",
    summary: "Known as Kirinyaga ('The Mountain of Brightness'), Mount Kenya stands not merely as a geological wonder, but as the cosmic pillar holding the heavens above the earth.",
    fullText: [
      "In the beginning, when the Supreme Creator Ngai divided the cosmos, He created Kirinyaga (Mount Kenya) as His resting place when He came down from the heavens to inspect His creation. To the Kikuyu, Embu, and Maasai peoples who dwell in its fertile foothills, the mountain is the compass of all spiritual life.",
      "Traditional homes were built with their doors facing the snow-capped peaks so that the first morning light would carry blessings from Ngai into the household. When elders gathered to pray for rain during times of drought, they would stand beneath the sacred Mukuyu (fig tree) with their faces lifted toward the glacial heights.",
      "Today, as glaciers recede due to changing climates, SUT Africa elders remind us that protecting the mountain's forests is not just an environmental duty—it is defending the very sanctuary of the Divine."
    ],
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80",
    pdfTitle: "Sacred Mountains of Africa - Conservation Manifesto",
    pdfSize: "2.4 MB PDF"
  },
  {
    id: "lore-2",
    title: "The Baobab Tree (Adansonia): The Tree of Life and Council of Elders",
    subtitle: "Why the upside-down tree serves as Africa's ancient pharmacy, water reservoir, and supreme parliament.",
    category: "Sacred Flora & Fauna",
    region: "African",
    summary: "With lifespans exceeding two thousand years, the Baobab is living history. In village tradition, disputes are settled and stories told beneath its cooling shade.",
    fullText: [
      "African legend tells that when the world was young, the Baobab was so proud of its beauty that it boasted to the stars. In response, the Creator planted it upside down, with its gnarled roots reaching toward the sky as a lesson in humility.",
      "Yet from humility sprang immense generosity. A single ancient baobab can store over 30,000 gallons of water in its fibrous trunk, keeping entire communities alive during severe droughts. Its fruit, rich in Vitamin C and antioxidants, has nourished generations of children.",
      "In West African Griot culture, poets and musicians were traditionally buried in the hollow trunks of dry baobabs so their stories would become part of the wood, whispering to anyone who leaned their ear against the bark."
    ],
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516026974298-531bf4251037?auto=format&fit=crop&w=1000&q=80",
    pdfTitle: "Baobab & Acacia: Indigenous Tree Lore Trifold",
    pdfSize: "1.8 MB PDF"
  },
  {
    id: "lore-3",
    title: "The Legend of the Nile: Artery of Civilization and Unity",
    subtitle: "Tracing the sacred waters from Lake Victoria and the Ethiopian Highlands down to the Mediterranean Sea.",
    category: "Cosmology",
    region: "North & East Africa",
    summary: "The Nile is the umbilical cord of African civilization. From the ancient Nubian temples of Kush to the modern farming hamlets of Uganda and Sudan, its waters bind diverse tribes into one family.",
    fullText: [
      "In ancient Egyptian and Nubian cosmology, the annual flooding of the Nile (the Inundation or Akhet) was celebrated as the tears of Goddess Isis weeping for Osiris, bringing new silt and agricultural rebirth to the desert.",
      "Further south, at the source of the Blue Nile at Lake Tana in Ethiopia, the waters are revered as Gihon—one of the four rivers flowing out of the Garden of Eden in Orthodox scriptural tradition.",
      "SUT Africa views the Nile Basin as a supreme symbol of our interdependence: a drop of rain falling on the highlands of Rwanda or Ethiopia eventually quenches the thirst of travelers thousands of miles north in Cairo. What happens upstream blesses or burdens those downstream."
    ],
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80",
    pdfTitle: "Water is Life: African River Stewardship Guide",
    pdfSize: "3.1 MB PDF"
  },
  {
    id: "lore-4",
    title: "Ubuntu Cosmology: The Web of Belonging",
    subtitle: "Understanding the profound philosophical foundation that defines traditional African governance, justice, and community care.",
    category: "Mythology",
    region: "Southern & Central Africa",
    summary: "Unlike Western individualism ('I think, therefore I am'), African Ubuntu declares: 'I am because we are, and since we are, therefore I am.'",
    fullText: [
      "Ubuntu (in Zulu/Xhosa), Utu (in Swahili), Botho (in Sotho), or Hunhu (in Shona) is not merely a social etiquette—it is an ontology of existence. It asserts that a person only becomes fully human through their compassionate relationships with other human beings and the natural world.",
      "In traditional restorative justice (such as the Gacaca courts in Rwanda or the dare in Zimbabwe), when an individual errs, the community does not seek retribution to cast them out. Instead, elders gather to remind the person of their divine identity and reintegrate them into the harmony of the circle.",
      "SUT Africa applies Ubuntu to ecological conservation: the trees, rivers, elephants, and bees are also our 'relatives' in the great circle of life. When we destroy a forest, we diminish our own humanity."
    ],
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
    pdfTitle: "The Philosophy of Ubuntu - Educational Charter",
    pdfSize: "1.5 MB PDF"
  }
];

export const PROVERBS: Proverb[] = [
  {
    id: "prov-1",
    quote: "If you want to go fast, go alone. If you want to go far, go together.",
    tribe: "Ashanti / Proverbial Consensus",
    country: "Ghana / African",
    meaning: "True achievement requires communal patience, mutual support, and solidarity rather than solitary competition.",
    theme: "Unity",
    pronunciationHint: "An ancient adage celebrated across the entire continent."
  },
  {
    id: "prov-2",
    quote: "When spider webs unite, they can tie up a lion.",
    tribe: "Amhara / Oromo",
    country: "Ethiopia",
    meaning: "Even the smallest and most vulnerable individuals, when organized in harmony and unity, can overcome immense obstacles.",
    theme: "Unity",
    pronunciationHint: "In Amharic: 'Dir biaber anbesa yiasir'."
  },
  {
    id: "prov-3",
    quote: "The earth is not ours; it is a treasure we hold in trust for future generations.",
    tribe: "Yoruba",
    country: "Nigeria",
    meaning: "We are stewards, not owners, of nature. Every harvest must leave seed for the children yet unborn.",
    theme: "Nature & Earth",
    pronunciationHint: "Reflects the Yoruba reverence for Ile-Ere (Mother Earth)."
  },
  {
    id: "prov-4",
    quote: "Wisdom is like a baobab tree; no individual can embrace it with their arms alone.",
    tribe: "Ewe / Akan",
    country: "Ghana / Togo",
    meaning: "Knowledge is vast and multi-faceted. We need the perspectives of elders from every tribe and nation to grasp total truth.",
    theme: "Wisdom",
    pronunciationHint: "Nyansa ye baobab..."
  },
  {
    id: "prov-5",
    quote: "A single bracelet does not jingle.",
    tribe: "Congo / Swahili",
    country: "DR Congo / Kenya",
    meaning: "We need the presence and cooperation of others to make joyful noise and create meaningful impact in society.",
    theme: "Community",
    pronunciationHint: "In Swahili: 'Kikuku kimoja hakilii'."
  },
  {
    id: "prov-6",
    quote: "However long the night, the dawn will break.",
    tribe: "Hausa",
    country: "Nigeria / Niger",
    meaning: "No matter how dark times of conflict or ecological hardship may seem, perseverance and faith will always bring renewal.",
    theme: "Patience & Courage",
    pronunciationHint: "In Hausa: 'Kome nisan jifa, kasa za shi dawo'."
  },
  {
    id: "prov-7",
    quote: "He who conceals his disease cannot expect to be cured.",
    tribe: "Sidama / Oromo",
    country: "Ethiopia",
    meaning: "Honesty in dialogue—whether regarding communal grievances or environmental decay—is the necessary first step toward healing.",
    theme: "Wisdom",
    pronunciationHint: "Encourages open truth-telling in elder circles."
  },
  {
    id: "prov-8",
    quote: "A river that forgets its source will surely dry up.",
    tribe: "Yoruba / Igbo",
    country: "Nigeria",
    meaning: "Never abandon your ancestral heritage, cultural identity, or spiritual roots as you navigate the modern world.",
    theme: "Community",
    pronunciationHint: "Odo ti ko gbagbe orisun re..."
  }
];

export const PARTNERS: PartnerOrg[] = [
  {
    id: "part-1",
    name: "Green Belt Movement Africa",
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=300&q=80",
    category: "Ecological Conservation",
    website: "https://greenbeltmovement.org",
    description: "Continuing the legacy of Nobel Laureate Wangari Maathai by empowering women to plant trees, restore watersheds, and protect climate resilience.",
    country: "Kenya"
  },
  {
    id: "part-2",
    name: "Kalahari Peoples Fund",
    logo: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=300&q=80",
    category: "Indigenous Rights",
    website: "https://kalaharipeoples.org",
    description: "Supporting the land rights, clean water access, and cultural preservation of the San, Bakgalagadi, and other indigenous peoples of Southern Africa.",
    country: "Botswana / Namibia"
  },
  {
    id: "part-3",
    name: "African Griot & Oral History Network",
    logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    category: "African Heritage",
    website: "https://panafricangriots.org",
    description: "Digitizing and preserving thousands of hours of traditional kora music, genealogy recitations, and village wisdom across West and Sahelian Africa.",
    country: "Senegal / Mali"
  },
  {
    id: "part-4",
    name: "African Traditional Medicine Guild (ATMG)",
    logo: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
    category: "Traditional Medicine",
    website: "https://traditionalmedicineafrica.org",
    description: "Promoting ethical research, conservation of rare medicinal plants, and integration of accredited traditional healers into regional primary healthcare.",
    country: "South Africa / Ghana"
  },
  {
    id: "part-5",
    name: "Rift Valley Indigenous Stewardship Trust",
    logo: "https://images.unsplash.com/photo-1516026974298-531bf4251037?auto=format&fit=crop&w=300&q=80",
    category: "Ecological Conservation",
    website: "https://riftstewardship.org",
    description: "Uniting pastoralist Maasai and Samburu communities to establish wildlife corridors and protect sacred springs along the Great Rift Valley escarpment.",
    country: "Kenya / Tanzania"
  },
  {
    id: "part-6",
    name: "Continental Ubuntu Peace Council",
    logo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=300&q=80",
    category: "African Heritage",
    website: "https://ubuntucouncil.org",
    description: "Deploying traditional elder mediation teams to resolve ethnic conflicts, foster youth dialogue, and promote restorative justice across borders.",
    country: "African"
  }
];
