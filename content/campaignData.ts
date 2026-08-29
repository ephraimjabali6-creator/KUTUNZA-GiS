export interface SlideItem {
  id: number;
  imageUrl: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  ctaTarget: string;
}

export interface PatronProfile {
  name: string;
  role: string;
  organization: string;
  bio: string;
  image: string;
  quote: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  school: string;
  age?: number;
  story: string;
  impactTag: string;
  avatar: string;
}

export interface VideoTestimonial {
  id: string;
  title: string;
  duration: string;
  speaker: string;
  thumbnail: string;
  videoUrl: string;
  summary: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  metrics: { label: string; value: string }[];
  image: string;
}

export interface DonationTier {
  id: string;
  amountUSD: number;
  amountGBP: number;
  amountEUR: number;
  amountKES: number;
  title: string;
  tagline: string;
  impactDescription: string;
  features: string[];
  popular?: boolean;
}

export const CAMPAIGN_DATA = {
  projectTitle: "Girls in School",
  projectTagline: "UK gifts buy washable sanitary packs and fund puberty lessons in Kenyan government schools.",
  targetGoalUSD: 32000,
  currentRaisedUSD: 4120,
  totalDonorsCount: 47,
  daysActive: 38,
  partnerSchoolsCount: 2,
  girlsSupportedCount: 0,
  padsDistributedCount: 0,

  heroSlides: [
    {
      id: 1,
      imageUrl: "/images/hero-crowd.jpg",
      badge: "Restoring Joy & Freedom",
      title: "Active, Confident & Thriving in School",
      description: "When adolescent girls are provided with sustainable menstrual supplies and comprehensive health education, their classroom attendance jumps by over 20%. No girl should be sidelined from play, learning, or her dreams.",
      ctaText: "Support a Schoolgirl",
      ctaTarget: "#donate"
    },
    {
      id: 2,
      imageUrl: "/images/hero-assembly.jpg",
      badge: "Olympic Junior Secondary School",
      title: "Grassroots Leadership in Kibera",
      description: "Partnering directly with local teachers and headmistresses across Olympic Junior Secondary and Ayany Primary. We provide culturally sensitive puberty guidance and durable menstrual equity kits directly to students.",
      ctaText: "See Our Mission",
      ctaTarget: "#about"
    },
    {
      id: 3,
      imageUrl: "/images/distribution.jpg",
      badge: "Dignity In Every Lesson",
      title: "Comprehensive Puberty Education",
      description: "Breaking menstrual taboos through compassionate, evidence-based workshops. We equip young girls with body literacy, hygiene kits, and the self-worth required to finish primary and secondary education.",
      ctaText: "Watch Testimonials",
      ctaTarget: "#testimonials"
    },
    {
      id: 4,
      imageUrl: "/images/handover.jpg",
      badge: "Zero Missed Days",
      title: "Empowering the Next Generation",
      description: "Our high-quality washable sanitary towel kits last up to 3 full years, liberating families from crippling monthly expenses and enabling girls to achieve top academic outcomes.",
      ctaText: "Donate Now",
      ctaTarget: "#donate"
    }
  ] as SlideItem[],

  quickStats: [
    { label: "Partner schools", value: "2", subtitle: "Olympic Primary and Ayany Primary", icon: "school" },
    { label: "Kit lifespan", value: "3 years", subtitle: "Washable packs, not monthly disposables", icon: "shield" },
    { label: "Lesson model", value: "Boys + girls", subtitle: "Then girls stay for the pack", icon: "chart" },
    { label: "Return visits", value: "Yearly", subtitle: "Same year group, same schools", icon: "sparkles" }
  ],

  aboutMission: {
    title: "About Our Mission",
    subtitle: "Breaking the Cycle of Period Poverty Through Sustainable Solutions & Education",
    introParagraph: `At Kutunza, Girls in School (GiS) works so more girls can stay in education in Kenya and, in time, other countries on the African sub-continent. Missing school during menstruation still keeps thousands of girls from a full year of learning.`,
    deepParagraphs: [
      `We partner with a local church that already has a relationship with a government school. At the school's invitation we teach a puberty lesson to boys and girls in their usual classroom. The lesson is grounded in the Bible. Afterwards the girls stay behind to receive a pack of washable sanitary towels.`,
      `We return to the same school and the same year group once a year, for several years, so the teaching and the practical provision become ordinary. We currently visit Olympic Primary and Ayany Primary in Nairobi. This website exists so UK donors can fund the products we take with us.`
    ],
    localArea: {
      title: "The Local Area: Kibera, Nairobi",
      description: `Kibera spans approximately 2.5 square kilometers in southwestern Nairobi and houses an estimated 500,000+ residents. Despite its vibrant resilience and brilliant youth, access to clean piped water, private sanitation blocks, and affordable personal hygiene items remains scarce. Commercial sanitary pads cost between 80 to 120 Kenyan Shillings ($0.60–$0.90 USD) per pack—an impossible expense for families surviving on less than $2 a day. Our localized supply chain and school-based distribution hubs ensure that products land directly in the hands of the girls who need them most.`
    },
    keyStatistics: [
      { stat: "65%", label: "Lack Access", description: "Of women and girls in Kenyan informal settlements cannot afford commercial sanitary pads consistently." },
      { stat: "1 in 10", label: "Drop Out", description: "Adolescent girls in Sub-Saharan Africa leave school permanently due to menstrual management barriers." },
      { stat: "20%", label: "Lost School Days", description: "Up to 50 days of vital classroom instruction lost every year by girls without proper sanitary supplies." },
      { stat: "3 Years", label: "Kit Durability", description: "Each washable kit prevents 400+ disposable pads from polluting waterways and local drainage." }
    ],
    progressMilestones: [
      { year: "Phase 1 - 2023", title: "Pilot at Olympic Primary", description: "Supplied 200 initial kits and held the first comprehensive puberty education seminar for 6th and 7th graders." },
      { year: "Phase 2 - 2024", title: "Expansion to Ayany & Olympic Junior Sec", description: "Scaled to 500+ girls, establishing peer-mentorship clubs and emergency pad dispensaries in teachers' lounges." },
      { year: "Phase 3 - 2025", title: "Community Health & Water Partnerships", description: "Integrated clean water and soap provisions with local sanitation trusts to ensure hygienic washing facilities." },
      { year: "Phase 4 - Current 2026", title: "Scaling to 2,500 Girls Across 10 Schools", description: "With our $25,000 fundraising goal, expanding reach to 4 new rural and peri-urban schools across Kenya." }
    ],
    patrons: [
      {
        name: "Mama Grace Ochieng",
        role: "Senior Headmistress & Community Liaison",
        organization: "Olympic Junior Secondary School, Kibera",
        bio: "With over 24 years of teaching in Nairobi's urban schools, Grace is a tireless advocate for girls' academic rights and retention. She oversees on-the-ground distribution and teacher-led puberty counseling.",
        image: "/images/hero-assembly.jpg",
        quote: "When a girl has her dignity restored, her grades shoot up and her confidence transforms the entire classroom."
      },
      {
        name: "Dr. Evelyn Mwangi, MD",
        role: "Adolescent Health Advisor",
        organization: "Nairobi Women's Health Collective",
        bio: "Public health physician specializing in maternal and adolescent reproductive health education in East Africa. Dr. Mwangi designed the age-appropriate puberty curriculum used across our school workshops.",
        image: "/images/kits-table.jpg",
        quote: "Menstrual equity is not merely a hygiene issue; it is a fundamental human right and the cornerstone of gender parity in education."
      },
      {
        name: "Pastor Samuel Kilonzo",
        role: "Faith & Community Partnership Director",
        organization: "Kibera Community Alliances",
        bio: "Pastor Samuel facilitates community buy-in and parental workshops, working with local churches and mosques to dismantle generational stigmas and foster supportive home environments.",
        image: "/images/handover.jpg",
        quote: "Engaging fathers, brothers, and spiritual leaders has turned whole neighborhoods into protectors of girls' education."
      }
    ] as PatronProfile[]
  },

  testimonials: [
    {
      id: "test-1",
      name: "Achieng N.",
      role: "Grade 8 Student",
      school: "Olympic Junior Secondary School",
      age: 14,
      story: "Before receiving the Kutunza washable kit, I used to stay home for five days every month during my period. I was falling behind in Mathematics and Science. Now, I have never missed a single day of class this whole term, and I ranked 3rd in our mock exams!",
      impactTag: "Academic Excellence",
      avatar: "👩🏾‍🎓"
    },
    {
      id: "test-2",
      name: "Faith W.",
      role: "Class 7 Student",
      school: "Ayany Primary School",
      age: 13,
      story: "My mother could not afford pads for me and my two older sisters. We used old rags that caused infections and made us feel scared of staining our uniforms. The washable pads are soft, easy to clean, and dry quickly. I feel free and proud.",
      impactTag: "Health & Dignity",
      avatar: "✨"
    },
    {
      id: "test-3",
      name: "Teacher Beatrice",
      role: "Lead Science Teacher & Dean of Girls",
      school: "Olympic Primary School",
      story: "The shift in class participation has been astonishing. Girls who used to sit silently at the back with their arms folded now lead our debate club and sports teams. The emergency dispensary kits in our staff room have eliminated school-day panics completely.",
      impactTag: "School Transformation",
      avatar: "👩🏾‍🏫"
    },
    {
      id: "test-4",
      name: "Mercy K.",
      role: "Secondary School Transition Scholar",
      school: "Kibera Community Center",
      age: 15,
      story: "The puberty lessons taught me that my body is strong and worthy of care. Learning that menstruation is natural gave me the confidence to speak up and mentor younger girls in my neighborhood.",
      impactTag: "Youth Leadership",
      avatar: "🌟"
    }
  ] as TestimonialItem[],

  videoTestimonials: [
    {
      id: "vid-1",
      title: "Voices of Olympic Junior Secondary School",
      duration: "4:15",
      speaker: "Grace Ochieng & Student Council",
      thumbnail: "/images/hero-assembly.jpg",
      videoUrl: "",
      summary: "Walk through the morning assembly at Olympic Junior Sec School and hear first-hand testimonies from the students and teachers whose lives have been impacted by the washable kits."
    },
    {
      id: "vid-2",
      title: "Inside the Puberty & Hygiene Workshop",
      duration: "3:40",
      speaker: "Health Educators & Students",
      thumbnail: "/images/kits-table.jpg",
      videoUrl: "",
      summary: "An uplifting look inside our classroom workshops where girls learn reproductive biology, kit sanitation, and peer mentorship in a safe, celebratory environment."
    }
  ] as VideoTestimonial[],

  caseStudies: [
    {
      id: "cs-1",
      slug: "reducing-absenteeism-olympic-junior-sec",
      title: "From 20% Absenteeism to Top 5 District Ranking: The Olympic Junior Sec Journey",
      category: "Education Impact",
      readTime: "5 min read",
      date: "February 2026",
      image: "/images/hero-assembly.jpg",
      excerpt: "A comprehensive 18-month longitudinal study demonstrating how reusable menstrual kits directly boosted female student retention and national exam pass rates.",
      metrics: [
        { label: "Absenteeism Drop", value: "-42%" },
        { label: "Retention Rate", value: "98.4%" },
        { label: "Exam Pass Gain", value: "+18%" }
      ],
      content: [
        "In 2024, Olympic Junior Secondary School recorded significant female student absenteeism correlated directly with monthly menstrual cycles. Teachers noted that girls in Grades 6 through 8 were missing an average of 4.3 school days every month, creating substantial learning gaps ahead of national examinations.",
        "Through the United With Kenya project, 350 adolescent girls were enrolled in a multi-tiered intervention comprising: (1) Medical-grade 3-year washable pad kits, (2) Monthly teacher-facilitated puberty seminars, and (3) Dedicated school sanitation privacy zones.",
        "Over an 18-month tracking period, female student absenteeism dropped by 42%. Furthermore, the female student body achieved an 18% improvement in average score rankings, validating that addressing menstrual poverty directly removes one of the largest structural barriers to academic achievement."
      ]
    },
    {
      id: "cs-2",
      slug: "eco-friendly-reusable-pads-vs-disposables",
      title: "Sustainable Economics: Why 3-Year Washable Kits Outperform Disposable Distributions",
      category: "Sustainability & Economics",
      readTime: "4 min read",
      date: "January 2026",
      image: "/images/hero-crowd.jpg",
      excerpt: "Analyzing the environmental and financial return on investment of durable menstrual kits compared to traditional single-use disposable aid.",
      metrics: [
        { label: "Cost Savings", value: "85%" },
        { label: "Waste Prevented", value: "450 Pads/Girl" },
        { label: "Lifespan", value: "36 Months" }
      ],
      content: [
        "Traditional aid initiatives frequently distribute disposable, single-use sanitary pads. While well-intentioned, this model creates critical challenges in informal settlements: ongoing supply vulnerability when donor funding fluctuates, and severe municipal waste burdens in areas lacking municipal trash disposal.",
        "Our washable kits utilize multi-layered antimicrobial microfiber, leakproof breathable PUL backing, and fast-drying cotton fabrics. A single $35 kit replaces over 450 single-use plastic-laden pads.",
        "This approach fosters true self-sufficiency for families, saves an average of $65 per girl per year in household expenditure, and protects local drainage systems from plastic blockages."
      ]
    },
    {
      id: "cs-3",
      slug: "faith-and-community-breaking-stigma",
      title: "Community Alliance: How Faith Leaders & Fathers are Championing Girls' Health in Nairobi",
      category: "Community Transformation",
      readTime: "6 min read",
      date: "December 2025",
      image: "/images/distribution.jpg",
      excerpt: "How holistic community dialogue with local elders and spiritual leaders successfully eliminated harmful cultural taboos around menstruation.",
      metrics: [
        { label: "Leaders Trained", value: "45" },
        { label: "Workshops Held", value: "28" },
        { label: "Community Support", value: "96%" }
      ],
      content: [
        "In many communities, menstruation has historically been shrouded in secrecy, with girls isolated or shamed during their cycles. The Kutunza project pioneered community town halls bringing together parents, church leaders, and school staff.",
        "By grounding hygiene and human dignity in universally shared values of compassion and family protection, the program turned local elders into proactive advocates.",
        "Today, fathers actively construct private wash stalls and collect rain-harvested water for school washrooms, creating a community-wide safety net for young girls."
      ]
    }
  ] as CaseStudy[],

  donationTiers: [
    {
      id: "tier-1",
      amountUSD: 15,
      amountGBP: 12,
      amountEUR: 14,
      amountKES: 1950,
      title: "Supporter Gift",
      tagline: "3 Months of Menstrual Supplies",
      impactDescription: "Provides emergency hygiene supplies, antibacterial soap, and an illustrated puberty & health booklet for 1 adolescent schoolgirl.",
      features: ["3 Months of hygiene supplies", "Educational health guide", "Personal hygiene soap bar"]
    },
    {
      id: "tier-2",
      amountUSD: 35,
      amountGBP: 28,
      amountEUR: 32,
      amountKES: 4500,
      title: "Dignity Kit Sponsor",
      tagline: "Full 3-Year Washable Kit + Underwear",
      impactDescription: "Equips 1 schoolgirl with a complete medical-grade washable sanitary towel kit (4 heavy + 4 light pads), waterproof pouch, 3 pairs of cotton underwear, and 1 year of puberty mentorship.",
      popular: true,
      features: ["Complete 3-Year washable pad kit", "Waterproof discreet carry pouch", "3 Pairs of cotton underwear", "Full year of puberty mentorship", "Personalized donor impact report"]
    },
    {
      id: "tier-3",
      amountUSD: 75,
      amountGBP: 60,
      amountEUR: 70,
      amountKES: 9750,
      title: "Sponsor Two Sisters",
      tagline: "Two 3-Year Kits + Health Seminars",
      impactDescription: "Provides full 3-year washable kits and educational support for 2 sisters or classmates, lifting an immense financial weight off their family.",
      features: ["Two complete 3-Year washable kits", "Family hygiene package", "Bi-monthly health check-ins", "Emergency dispensary support"]
    },
    {
      id: "tier-4",
      amountUSD: 150,
      amountGBP: 120,
      amountEUR: 140,
      amountKES: 19500,
      title: "Classroom Champion",
      tagline: "Equips 5 Girls + Teacher Dispensary",
      impactDescription: "Funds comprehensive 3-year kits for 5 students plus stocks the school teacher's dispensary with emergency pads and clean sanitation supplies.",
      features: ["5 Complete 3-Year washable kits", "School dispensary emergency stock", "Sanitation supplies for school washroom", "Dedicated school thank-you letter"]
    },
    {
      id: "tier-5",
      amountUSD: 500,
      amountGBP: 400,
      amountEUR: 460,
      amountKES: 65000,
      title: "School Grade Sponsor",
      tagline: "Transforms an Entire Grade Level",
      impactDescription: "Empowers 15+ schoolgirls across an entire grade level with 3-year kits, funds a multi-school health educator seminar, and sponsors clean washroom infrastructure repairs.",
      features: ["15+ Full 3-Year washable kits", "Full-day schoolwide health workshop", "Washroom facility water tank upgrade", "Named recognition in annual report", "Direct video thank you from school headmistress"]
    }
  ] as DonationTier[],

  transparencyBreakdown: [
    { category: "Direct Kits & Hygiene Supplies", percentage: 88, description: "Manufacturing and distribution of medical-grade washable pad kits, underwear, and hygiene soaps directly to students." },
    { category: "Puberty & Health Workshops", percentage: 8, description: "Training female health educators, curriculum printing, teacher training, and student counseling." },
    { category: "Logistics, Governance & Compliance", percentage: 4, description: "Third-party financial audits, PCI-compliant payment gateways, transparency reporting, and transport." }
  ],

  contactInfo: {
    email: "contact@kutunza.org",
    supportEmail: "giving@kutunza.org",
    phoneKenya: "+254 (0) 722 000 000 / +254 (0) 733 123 456",
    phoneInternational: "+44 (0) 20 7946 0991 / +1 (800) 555-0199",
    addressKenya: "Olympic Estate, Off Kibera Drive, Langata Sub-County, Nairobi, Kenya",
    addressUK: "Kutunza Project / Girls in School UK Liaison Office, London, United Kingdom",
    hours: "Monday – Friday: 8:00 AM – 6:00 PM EAT (UTC+3)"
  },

  socialLinks: {
    whatsapp: "https://wa.me/254722000000?text=I%20am%20supporting%20the%20United%20With%20Kenya%20Menstruation%20Equity%20Project",
    instagram: "https://instagram.com/kutunzaproject",
    twitter: "https://twitter.com/kutunzaproject",
    facebook: "https://facebook.com/kutunzaproject",
    linkedin: "https://linkedin.com/company/kutunza-project",
    gofundme: "https://www.gofundme.com/f/UnitedWithKenyaMenstruationEquityProject"
  },

  documentsAvailable: [
    { id: "doc-1", title: "2025 Annual Impact & Transparency Report", size: "2.4 MB PDF", type: "Annual Report" },
    { id: "doc-2", title: "Independent Financial Audit & Fund Allocation Statement", size: "1.1 MB PDF", type: "Financial Audit" },
    { id: "doc-3", title: "Non-Profit & NGO Registration Certificates (Kenya & UK)", size: "850 KB PDF", type: "Legal Registration" },
    { id: "doc-4", title: "Washable Sanitary Kit Clinical Safety & Material Specs", size: "1.8 MB PDF", type: "Technical Specs" },
    { id: "doc-5", title: "501(c)(3) & Gift Aid Tax Exemption Guidelines", size: "420 KB PDF", type: "Tax Guide" }
  ]
};
