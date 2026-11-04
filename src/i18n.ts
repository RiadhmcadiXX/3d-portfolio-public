import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        about: "About",
        portfolio: "Portfolio",
        projects: "Projects",
        services: "Services",
        blog: "Blog",
        bookCall: "Book a call",
        toggleMenu: "Toggle menu",
      },
      hero: {
        available: "Available for work",
        title1: "Hi, I'm a",
        title2: "full-stack",
        title3: "developer",
        description:
          "I develop modern and scalable digital solutions tailored to the needs of businesses, entrepreneurs and organizations.",
        contact: "Contact me",
        getInTouch: "Get In Touch",
        downloadCV: "Download resume",
        findMeOn: "Find me on:",
        location: "Remote · Worldwide",
        reactExpert: "React Expert",
        rate: "$150 - $300/HR",
        brands: "The most recent brands\nI happily worked with ❤",
      },
      about: {
        mission:
          "My mission is to transform ideas into reliable, scalable, and impactful software that empowers businesses and creates meaningful experiences for users.",
        howCanI: "How Can I",
        assist: "Assist You?",
        clickFolder: "Click the folder to reveal my services.",
        services: {
          uiTitle: "UI Design",
          uiDesc:
            "I create intuitive, visually appealing interfaces that enhance user experience and navigation, ensuring your app is both beautiful and functional across all devices.",
          devTitle: "Development",
          devDesc:
            "I build reliable, scalable solutions, delivering clean code that powers websites and mobile apps with top-notch performance and security.",
          gfxTitle: "Graphic Design",
          gfxDesc:
            "I design responsive, user-friendly websites that blend aesthetics with functionality, providing a seamless experience across devices and reflecting your brand's identity.",
          brandTitle: "Branding",
          brandDesc:
            "I craft memorable brand identities, from logos to complete strategies, ensuring consistency and a strong connection with your audience across all platforms.",
        },
      },
      experience: {
        tag: "Experience",
        title1: "Explore My",
        title2: "Journey",
        description:
          "Over the past 8+ years, I've worked on a wide range of projects, collaborating with diverse teams.",
        bookCall: "Book a call →",
        tags: {
          fullTime: "Full-time",
          partTime: "Part-time",
          freelance: "Freelance",
          internship: "Internship",
        },
        items: {
          0: {
            role: "Programmer-Analyst Intern",
            period: "Aug 2025 – Nov 2025 · 4 months",
            description:
              "Internship within the development team of the SIGLS application, used by social housing management organizations in Quebec.\n\nStack: ASP.NET, .NET Framework and 4 additional skills.",
          },
          1: {
            role: "Electronics Department Associate",
            period: "Sept 2022 – Jan 2025 · 2 yrs 5 mos",
            description:
              "Providing quality customer service by helping clients find electronic products tailored to their needs.",
          },
          2: {
            role: "Mobile Developer – End-of-studies Internship",
            period: "Aug 2021 – June 2022 · 11 months",
            description:
              "Project: Meal delivery mobile application.\n\nParticipation in a team project as part of an academic end-of-studies internship. Developed with Android Studio (Java), with Firebase integration for the realtime database. Functional and unit testing, and contribution to technical documentation for the defense.\n\nStack: Firebase, Java and 1 additional skill.",
          },
          3: {
            role: "Computer Repair & IT Support Technician",
            period: "May 2017 – Nov 2018 · 1 yr 7 mos",
            description:
              "Diagnostics and repair of mobile phones (screen, battery, software, etc.).\nMaintenance and troubleshooting of computers (Windows, software installation, viruses, formatting).\nTechnical assistance for clients: configuration, usage advice, data recovery.\n\nStack: Microsoft Windows.",
          },
        },
      },
      education: {
        tag: "Education",
        title: "Academic background",
        items: {
          0: {
            degree: "DEC in Computer Science Techniques",
            period: "2023 – 2026",
            level: "College",
          },
          1: {
            degree: "Bachelor's in Computer Engineering",
            period: "2018 – 2022",
            level: "University",
          },
        },
      },
      projects: {
        tag: "Projects",
        title1: "Featured",
        title2: "Projects",
        description:
          "Discover a selection of projects I've worked on, combining design, technology and user impact.",
        viewAll: "View all →",
        visitWebsite: "Visit website",
        viewDetails: "View details",
        items: {
          allodoc:
            "SaaS medical management platform helping healthcare professionals digitize their practice and improve patient follow-up.",
          bioshare:
            "Modern Link in Bio solution allowing creators to centralize all their links and social networks in a single customizable page.",
          arwahli:
            "Algerian marketplace connecting individuals to verified craftsmen (plumbing, electricity, painting...) across all wilayas.",
          wardrobeai:
            "AI-powered wardrobe app for iOS and Android that digitizes your closet and generates outfit suggestions based on your style, the weather and the occasion.",
        },
      },
      projectsPage: {
        back: "Back to home",
        title1: "All",
        title2: "Projects",
        description: "A complete overview of projects I've built, from SaaS platforms to marketplaces.",
        empty: "No projects in this category yet.",
        filters: { all: "All" },
        categories: {
          software: "Software",
          webapps: "Web Apps",
          websites: "Websites",
          mobile: "Mobile Apps",
        },
        categoryDesc: {
          software: "Business tools and SaaS platforms.",
          webapps: "Interactive web applications.",
          websites: "Marketing sites and marketplaces.",
          mobile: "Native and cross-platform mobile experiences.",
        },
      },
      projectDetail: {
        back: "Back to projects",
        visit: "Visit website",
        overview: "Overview",
        problem: "The problem",
        solution: "The solution",
        features: "Key features",
        stack: "Tech stack",
        architecture: "How it works",
        meta: {
          category: "Category",
          year: "Year",
          role: "Role",
          status: "Status",
        },
        allodoc: {
          role: "Founder & Developer",
          status: "Live",
          overview: "AlloDoc overview — to be completed.",
          problem: "Problem statement — to be completed.",
          solution: "Solution description — to be completed.",
          featureList: [
            { title: "Patient Management", description: "Create, search and manage complete patient records with folder numbers, medical history and attached files." },
            { title: "Consultation Workflow", description: "Start consultations, write clinical notes, use reusable consultation models, request exams and store consultation history." },
            { title: "Prescription & Document Generation", description: "Generate printable prescriptions and medical certificates using customizable templates, logos and document headers." },
            { title: "Medical Certificate Generation", description: "Generate multiple types of medical certificates (medical, sick leave, aptitude, vaccination, consultation) in one click from ready-to-use templates." },
            { title: "Dental Odontogram", description: "Interactive dental chart using FDI tooth numbering, treatment types, surfaces and consultation-linked dental history." },
            { title: "Payments & Finance", description: "Manage consultation payments, services, partial payments, expenses and financial tracking." },
            { title: "Inventory Management", description: "Track products, stock movements, suppliers, expiration dates and service-product links." },
            { title: "Offline-first Local Storage", description: "All data is stored locally using SQLite, allowing the software to work without an internet connection." },
            { title: "License & Backup System", description: "Machine-based license validation, local license file, automatic backups and diagnostic logs." },
          ],
          stackList: ["React", "TypeScript", "Electron", "Vite", "SQLite", "better-sqlite3", "Tailwind CSS", "shadcn/ui", "Radix UI", "TanStack Query", "TipTap", "Recharts", "Zod", "react-hook-form", "Electron Builder"],
          architecture: "Architecture and internal workflow — to be completed.",
          mobileApp: {
            title: "Companion mobile app",
            subtitle: "For patients",
            description: "AlloDoc also ships with a mobile application designed for patients. Users can browse doctors near them, filter by specialty and city, and book appointments in just a few taps — all synced with the doctor's AlloDoc workspace.",
            features: [
              "Search doctors by specialty, city and availability",
              "View doctor profiles, location and consultation hours",
              "Book, reschedule or cancel appointments in seconds",
              "Receive reminders and notifications before each visit",
            ],
            platforms: "Available on iOS and Android",
          },
        },
        bioshare: {
          role: "Founder & Developer",
          status: "Live",
          featureList: [
            { title: "Public bio page", description: "A unique, shareable page bundling all the user's links and social networks." },
            { title: "Drag & drop links", description: "Add, remove and reorder links instantly with a smooth drag & drop experience." },
            { title: "Themes & customization", description: "Pick from ready-made themes or fine-tune colors, typography, background and buttons." },
            { title: "Analytics dashboard", description: "Track page views, per-link clicks, traffic sources and trends over time." },
            { title: "Auth & accounts", description: "Sign up with email or Google OAuth, secure JWT sessions via Supabase Auth." },
            { title: "Asset uploads", description: "Upload profile pictures, banners and custom assets stored in Supabase Storage." },
            { title: "Short URL & QR code", description: "Share your bio via a custom short URL or an auto-generated QR code." },
            { title: "SEO-friendly pages", description: "Each public page ships with dynamic meta tags and optimized social previews." },
          ],
          stackList: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL", "Supabase Auth", "Supabase Storage", "TanStack Query", "Zod", "react-hook-form", "Vercel"],
        },
        wardrobeai: {
          role: "Founder & Developer",
          status: "In development",
          webStack: "Web version",
          mobileStack: "Mobile version",
          featureList: [
            { title: "Smart garment capture", description: "Photograph any clothing item — background removal and cropping are handled automatically." },
            { title: "Auto categorization", description: "AI detects the category, dominant colors, pattern, material and season of each piece." },
            { title: "Digital wardrobe", description: "Browse, search and filter your entire closet by category, color, brand, season or occasion." },
            { title: "AI outfit generator", description: "Get complete outfit suggestions in one tap, balanced by color harmony and style rules." },
            { title: "Weather-aware suggestions", description: "Daily looks adapted to the local forecast and to the occasion (work, sport, evening)." },
            { title: "Wear tracking & cost per wear", description: "Log what you wear to surface forgotten items and compute the real cost per wear." },
            { title: "Outfit planner", description: "Plan looks ahead for trips or busy weeks and save them as reusable capsules." },
            { title: "Cross-platform sync", description: "Web and mobile share the same Supabase backend with real-time sync and secure auth." },
          ],
          stackWeb: ["TanStack Start", "TanStack Router", "TanStack Query", "Vite", "Supabase", "Tailwind CSS", "TypeScript"],
          stackMobile: ["React Native", "TypeScript", "Supabase"],
        },
      },
      techStack: {
        tag: "Tech Stack",
        title1: "Tools I",
        title2: "work with",
        description:
          "A curated set of technologies I've used across projects — from frontend frameworks to backends, databases, design and DevOps.",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          database: "Databases & BaaS",
          mobile: "Mobile & Desktop",
          devops: "DevOps & Cloud",
          design: "Design",
          productivity: "Productivity & Collaboration",
          ides: "IDEs & Editors",
        },
      },
      certifications: {
        tag: "Certifications",
        title1: "My",
        title2: "Certifications",
        description:
          "A selection of certifications obtained to deepen my skills and stay current with the latest technologies.",
        viewAll: "View all →",
        items: {
          aws: "Validation of skills in designing and deploying scalable and secure applications on AWS.",
          google:
            "Comprehensive program covering user research, wireframing, prototyping and usability testing.",
          meta:
            "Mastery of React, modern JavaScript and best practices in professional front-end development.",
          scrum:
            "Certification in agile project management and facilitation of high-performing Scrum teams.",
        },
        dates: {
          aws: "March 2024",
          google: "November 2023",
          meta: "June 2023",
          scrum: "January 2023",
        },
      },
      portfolio: {
        title1: "Selected",
        title2: "work",
        seeAll: "See All",
      },
      "blog": {
        "badge": "AlloDoc Blog",
        "title": "Health Tips & Advice",
        "subtitle": "Simple, practical advice to help you stay healthy every day. No medical jargon, just useful tips.",
        "heroHeading": "BLOG",
        "readOurBlog": "Read Our Blog",
        "latestArticles": "Latest Articles",
        "viewAllCategories": "View All Categories",
        "featured1Title": "Your Health Starts With Daily Habits",
        "featured1Alt": "Doctor giving health advice",
        "featured2Title": "Ready, Set, Go! How to Eat Better Every Day",
        "featured2Excerpt": "Eating well doesn't have to be complicated. Simple changes in your daily meals can lead to lasting improvements in energy, mood, and overall health.",
        "featured2Alt": "Healthy food bowl",
        "featured3Title": "Healthy Eating Made Simple",
        "featured3Alt": "Healthy nutrition",
        "featured4Title": "Morning Stretches: Start Your Day Right",
        "readMore": "Read more",
        "categoryWellness": "Wellness",
        "categoryNutrition": "Nutrition",
        "categorySleep": "Sleep",
        "categoryHydration": "Hydration",
        "categoryMentalHealth": "Mental Health",
        "categoryExercise": "Exercise",
        "readTime3": "3 min read",
        "readTime4": "4 min read",
        "readTime5": "5 min read",
        "readTime6": "6 min read",
        "article1Title": "5 Simple Habits to Boost Your Immune System",
        "article1Excerpt": "Small daily habits can make a big difference in your overall health. Discover five easy-to-adopt routines that support your body's natural defenses.",
        "article2Title": "The Mediterranean Diet: Why It Works",
        "article2Excerpt": "Rich in olive oil, vegetables, and lean proteins, the Mediterranean diet is one of the most studied and recommended eating patterns worldwide.",
        "article3Title": "How to Improve Your Sleep Quality Naturally",
        "article3Excerpt": "Poor sleep affects everything from mood to immunity. Learn practical tips for creating better sleep habits without medication.",
        "article4Title": "How Much Water Should You Really Drink?",
        "article4Excerpt": "The 8-glasses-a-day rule is a myth. Find out how much water your body actually needs and the best ways to stay hydrated.",
        "article5Title": "Managing Stress: A Doctor's Perspective",
        "article5Excerpt": "Chronic stress impacts your physical health more than you think. Here are evidence-based strategies to manage stress effectively.",
        "article6Title": "Walking 30 Minutes a Day: The Underrated Exercise",
        "article6Excerpt": "You don't need a gym membership to stay fit. Discover why a daily 30-minute walk is one of the best things you can do for your health.",
        "article1Content": ["Your immune system is your body's first line of defense. While no single habit can guarantee immunity, combining several healthy practices creates a strong foundation.", "Start your day with a glass of warm water and lemon. This simple habit helps kickstart your metabolism and supports digestion. Add a handful of seasonal fruits to your breakfast for a vitamin boost.", "Regular physical activity, even a brisk 20-minute walk, helps circulate immune cells throughout your body. Aim for consistency rather than intensity.", "Sleep is often overlooked but is critical for immune function. Adults should aim for 7-9 hours of quality sleep per night. Create a calming bedtime routine by limiting screens an hour before bed.", "Finally, manage stress through simple techniques like deep breathing, spending time outdoors, or connecting with loved ones. Chronic stress weakens immunity over time."],
        "article2Content": ["The Mediterranean diet isn't a strict meal plan — it's a way of eating inspired by the traditional cuisines of countries bordering the Mediterranean Sea.", "At its core, this diet emphasizes whole grains, fresh vegetables, legumes, nuts, and olive oil as the primary fat source. Fish and poultry are preferred over red meat, and meals are often enjoyed with family.", "Studies consistently show that following a Mediterranean-style diet can reduce the risk of heart disease, support brain health, and promote a healthy weight.", "Start small: replace butter with olive oil, add a side salad to your meals, and snack on nuts instead of processed foods. Swap sugary drinks for water or herbal tea.", "The beauty of this diet is its flexibility. You don't need special ingredients — many traditional Algerian dishes already align with Mediterranean principles."],
        "article3Content": ["Sleep quality matters more than quantity. You might spend 8 hours in bed but still wake up exhausted if your sleep quality is poor.", "Establish a consistent sleep schedule by going to bed and waking up at the same time every day, including weekends. This helps regulate your body's internal clock.", "Your sleep environment plays a huge role. Keep your bedroom cool, dark, and quiet. Consider blackout curtains and remove electronic devices that emit blue light.", "Avoid caffeine after 2 PM and heavy meals close to bedtime. Instead, try a light snack like a banana or warm milk, which contain natural sleep-promoting compounds.", "If racing thoughts keep you awake, try journaling before bed or practicing the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. This activates your body's relaxation response."],
        "article4Content": ["The old advice of drinking exactly 8 glasses of water per day is a general guideline, not a scientific fact. Your actual needs depend on your weight, activity level, climate, and diet.", "A better approach is to listen to your body. Thirst is a reliable indicator for most healthy adults. Additionally, check the color of your urine — pale yellow means you're well-hydrated.", "Foods contribute significantly to your daily water intake. Fruits like watermelon, oranges, and cucumbers are over 90% water. Soups and herbal teas also count.", "During hot weather or physical activity, increase your intake. In Algeria's warm climate, carrying a reusable water bottle is a practical habit to maintain throughout the day.", "Be cautious about overhydration, which can be just as problematic as dehydration. Drink steadily throughout the day rather than consuming large amounts at once."],
        "article5Content": ["Stress is not just a mental experience — it has real physical effects on your body, from increasing blood pressure to weakening your immune system over time.", "The first step in managing stress is recognizing your triggers. Keep a simple journal noting when you feel stressed and what caused it. Patterns will emerge that help you take preventive action.", "Physical activity is one of the most effective stress relievers. Even a 15-minute walk can reduce cortisol levels and improve your mood. Find an activity you enjoy — it doesn't have to be intense.", "Social connection is equally important. Talking to a friend, family member, or colleague about what's bothering you can provide perspective and emotional relief.", "Finally, practice setting boundaries. Learn to say no to commitments that drain your energy. Prioritize rest and activities that recharge you. Remember: taking care of yourself is not selfish, it's necessary."],
        "article6Content": ["Walking is perhaps the most accessible form of exercise available. It requires no equipment, no gym membership, and can be done almost anywhere.", "Research shows that a daily 30-minute walk can reduce the risk of heart disease by up to 30%, improve blood sugar regulation, and support healthy weight management.", "Walking also benefits mental health. Studies indicate that regular walkers report lower levels of anxiety and depression. The combination of gentle movement and fresh air has a natural calming effect.", "To make walking a habit, start by incorporating it into your existing routine. Walk to nearby errands instead of driving, take a post-lunch stroll, or schedule an evening walk with a friend or family member.", "For added benefit, vary your pace. Alternate between brisk walking and a comfortable pace. Over time, gradually increase your distance or speed. The key is consistency — a daily 30-minute walk beats an occasional hour-long session."],
        "articleNotFound": "Article not found",
        "backToBlog": "Back to Blog",
        "relatedArticles": "Related Articles"
      },
      cta: {
        title: "Let's work together",
        description:
          "Tell me about your project. I'll get back to you within 24 hours.",
        info: {
          emailLabel: "Email",
          email: "Riadhmcadi@gmail.com",
          phoneLabel: "Phone",
          phone: "+1 (581) 446-9484",
          locationLabel: "Location",
          location: "Montréal, Québec QC · Remote worldwide",
          availability: "Available for new projects",
          followMe: "Find me on",
        },
        form: {
          servicesLabel: "What can I help you with?",
          servicesHint: "Select one or more services",
          nameLabel: "Your name",
          namePlaceholder: "Jane Doe",
          emailLabel: "Your email",
          emailPlaceholder: "you@company.com",
          messageLabel: "Your message",
          messagePlaceholder: "Tell me a bit about your project...",
          submit: "Send message",
          success: "Thanks! I'll get back to you shortly.",
          error: "Please fill in all required fields.",
        },
        services: {
          webDesign: { title: "Web Design", desc: "I need a website design." },
          webDev: { title: "Web Development", desc: "I need a website built." },
          mobile: { title: "Mobile App", desc: "iOS or Android app." },
          fullstack: { title: "Full-stack App", desc: "End-to-end product." },
          consulting: { title: "Consulting", desc: "Tech & architecture advice." },
          other: { title: "Something else", desc: "Let's talk about it!" },
        },
      },
      contact: {
        title: "Contact me to sizzle your project",
        description:
          "Feel free to contact me if you have any questions. I'm available for new projects or just for chatting.",
        emailPlaceholder: "Your email",
        send: "Send",
        tag: "Contact",
        sectionTitle: "Contact me"
      },
      footer: {
        title: "Let's\nconnect\nand chat",
        follow: "Follow me!",
        bookCall: "Book a call",
      },
      studio: {
        welcome: "Welcome to the studio.",
        walk: "walk",
        look: "Drag to look",
        interact: "Click a label or press",
        pressE: "Press E",
        loading: "Unlocking the studio…",
        back: "Back to the studio",
        language: "Language",
        movement: "Movement controls",
        pad: { up: "Move forward", down: "Move back", left: "Move left", right: "Move right" },
        stations: {
          software: { label: "Software & Web", hint: "The laptop" },
          apps: { label: "Mobile Apps", hint: "The phone" },
          technical: { label: "Technical", hint: "Server rack" },
          experience: { label: "Career Timeline", hint: "The pinboard" },
          about: { label: "About me", hint: "Say hi" },
          contact: { label: "Say hello", hint: "Coffee corner" },
        },
        about: {
          title: "Hi, I build rooms you can walk into.",
          lede: "I design and code interactive experiences where 3D, motion and good typography meet. I model in Blender, build in React and Three.js, and care about every frame.",
          body: "This studio is my portfolio: every piece of furniture leads somewhere. Head back and try the pinboard.",
        },
        experience: { eyebrow: "From the pinboard", title: "Experience" },
        contact: {
          eyebrow: "Coffee corner",
          title: "Let's make something.",
          lede: "Open for freelance projects and full-time roles. Coffee's on me.",
        },
        work: {
          eyebrow: "From the desk",
          errorTitle: "Couldn't load",
          notFound: "Not found",
          missing: "This category doesn't exist.",
          software: { title: "Software & Web", blurb: "Web applications, websites and desktop software." },
          apps: { title: "Mobile Apps", blurb: "Apps for iOS and Android." },
          technical: { title: "Technical Projects", blurb: "Infrastructure, servers and systems work." },
        },
      },
    },
  },







  fr: {
    translation: {
      nav: {
        about: "À propos",
        portfolio: "Portfolio",
        projects: "Projets",
        services: "Services",
        blog: "Blog",
        bookCall: "Réserver un appel",
        toggleMenu: "Menu",
      },
      hero: {
        available: "Disponible pour travailler",
        title1: "Salut, je suis",
        title2: "Développeur ",
        title3: "Full-Stack",
        description:
          "Je développe des solutions numériques modernes et évolutives adaptées aux besoins des entreprises, des entrepreneurs et des organisations.",
        contact: "Me contacter",
        getInTouch: "Me contacter",
        downloadCV: "Télécharger CV",
        findMeOn: "Retrouvez-moi :",
        location: "À distance · Monde entier",
        reactExpert: "Expert React",
        rate: "150 - 300 $/H",
        brands: "Les marques les plus récentes\navec lesquelles j'ai travaillé ❤",
      },
      about: {
        mission:
          "Ma mission est de transformer les idées en solutions numériques fiables, évolutives et performantes, qui créent de la valeur pour les entreprises et offrent des expériences significatives aux utilisateurs.",
        howCanI: "Comment puis-je",
        assist: "vous aider ?",
        clickFolder: "Cliquez sur le dossier pour découvrir mes services.",
        services: {
          uiTitle: "Design UI",
          uiDesc:
            "Je crée des interfaces intuitives et esthétiques qui améliorent l'expérience et la navigation, garantissant une application belle et fonctionnelle sur tous les appareils.",
          devTitle: "Développement",
          devDesc:
            "Je construis des solutions fiables et évolutives, livrant un code propre qui alimente sites web et applications mobiles avec performance et sécurité.",
          gfxTitle: "Design Graphique",
          gfxDesc:
            "Je conçois des sites responsives et conviviaux mêlant esthétique et fonctionnalité, offrant une expérience fluide sur tous les supports et reflétant l'identité de votre marque.",
          brandTitle: "Branding",
          brandDesc:
            "Je crée des identités de marque mémorables, du logo à la stratégie complète, garantissant cohérence et lien fort avec votre audience sur toutes les plateformes.",
        },
      },
      experience: {
        tag: "Expérience",
        title1: "Explorez mon",
        title2: "parcours",
        description:
          "Au cours des 8 dernières années, j'ai travaillé sur une grande variété de projets, en collaborant avec des équipes diverses.",
        bookCall: "Réserver un appel →",
        tags: {
          fullTime: "Temps plein",
          partTime: "Temps partiel",
          freelance: "Freelance",
          internship: "Stage",
        },
        items: {
          0: {
            role: "Programmeur-analyste stagiaire",
            period: "août 2025 – nov. 2025 · 4 mois",
            description:
              "Au cours de mon stage chez COGIWEB, j'ai participé au développement, à l'amélioration et à la maintenance d'applications web internes utilisées dans un contexte professionnel. J'ai collaboré avec l'équipe de développement pour concevoir de nouvelles fonctionnalités, corriger des anomalies et optimiser les performances des applications afin d'offrir une expérience plus fiable aux utilisateurs \n\n Mes principales réalisations incluent : \n\n Développement et modification de fonctionnalités en C#, .NET et ASPX. \n\nAnalyse et correction de bogues afin d'améliorer la stabilité et la fiabilité des applications. \n\nConception et optimisation de requêtes SQL Server pour améliorer les performances des traitements de données. \n\nGénération de rapports PDF et Excel destinés aux besoins comptables et administratifs. \n\nParticipation aux tests fonctionnels et unitaires pour assurer la qualité des nouvelles fonctionnalités. \n\nUtilisation d'Entity Framework Core pour l'accès aux données et la gestion des migrations de bases de données. \n\nDéploiement des applications et validation des livraisons à l'aide de Jenkins et d'outils DevOps. \n\nDéveloppement de composants réutilisables afin de faciliter la maintenance et l'évolution des applications. \n\nCollaboration avec les membres de l'équipe pour analyser les besoins, proposer des solutions et assurer la maintenance continue des systèmes.\n\nStack : ASP.NET, .NET framework et 4 compétences de plus.",
          },
          1: {
            role: "Associé au département d'électronique",
            period: "sept. 2022 – janv. 2025 · 2 ans 5 mois",
            description:
              "Offrir un service à la clientèle de qualité en aidant les clients à trouver les produits électroniques adaptés à leurs besoins.",
          },
          2: {
            role: "Développeur mobile – Stage de fin d'études universitaire",
            period: "août 2021 – juin 2022 · 11 mois",
            description:
              "Projet : Application mobile de livraison de repas.\n\nParticipation à un projet en équipe dans le cadre d'un stage académique de fin d'études. Projet réalisé en équipe sous Android Studio (Java), avec intégration de Firebase pour la base de données en temps réel. Réalisation de tests fonctionnels et unitaires, et contribution à la documentation technique pour la soutenance.\n\nStack : Firebase, Java et 1 compétence de plus.",
          },
          3: {
            role: "Technicien en réparation et assistance informatique",
            period: "mai 2017 – nov. 2018 · 1 an 7 mois",
            description:
              "Diagnostic et réparation de téléphones mobiles (écran, batterie, logiciels, etc.).\nMaintenance et dépannage d'ordinateurs (Windows, installation de logiciels, virus, formatage).\nAssistance technique auprès des clients : configuration, conseils d'utilisation, récupération de données.\n\nStack : Microsoft Windows.",
          },
        },
      },
      education: {
        tag: "Formation",
        title: "Parcours académique",
        items: {
          0: {
            degree: "DEC – Techniques de l'informatique",
            period: "2023 – 2026",
            level: "Cégep",
          },
          1: {
            degree: "Baccalauréat en génie informatique",
            period: "2018 – 2022",
            level: "Université",
          },
        },
      },
      projects: {
        tag: "Projets",
        title1: "Projets",
        title2: "phares",
        description:
          "Découvrez une sélection de projets sur lesquels j'ai travaillé, alliant design, technologie et impact utilisateur.",
        viewAll: "Voir tout →",
        visitWebsite: "Visiter le site",
        viewDetails: "Voir les détails",
        items: {
          allodoc:
            "Plateforme SaaS de gestion médicale qui aide les professionnels de la santé à digitaliser leur cabinet et améliorer leur suivi patient.",
          bioshare:
            "Solution Link in Bio moderne permettant aux créateurs de centraliser tous leurs liens et réseaux sociaux dans une seule page personnalisable.",
          arwahli:
            "Marketplace algérienne reliant les particuliers à des artisans vérifiés (plomberie, électricité, peinture...) dans toutes les wilayas.",
          wardrobeai:
            "Application de garde-robe intelligente pour iOS et Android qui numérise votre dressing et génère des suggestions de tenues selon votre style, la météo et l'occasion.",
            orbit: "Dashboard personnel"
        },
      },
      projectsPage: {
        back: "Retour à l'accueil",
        title1: "Tous les",
        title2: "projets",
        description: "Un aperçu complet des projets que j'ai réalisés, des plateformes SaaS aux marketplaces.",
        empty: "Aucun projet dans cette catégorie pour le moment.",
        filters: { all: "Tous" },
        categories: {
          software: "Logiciels",
          webapps: "Applications Web",
          websites: "Sites Web",
          mobile: "Applications Mobiles",
        },
        categoryDesc: {
          software: "Outils métier et plateformes SaaS.",
          webapps: "Applications web interactives.",
          websites: "Sites vitrines et marketplaces.",
          mobile: "Expériences mobiles natives et cross-platform.",
        },
      },
      projectDetail: {
        back: "Retour aux projets",
        visit: "Visiter le site",
        overview: "Vue d'ensemble",
        problem: "Le problème",
        solution: "La solution",
        features: "Fonctionnalités clés",
        stack: "Stack technique",
        architecture: "Fonctionnement interne",
        meta: {
          category: "Catégorie",
          year: "Année",
          role: "Rôle",
          status: "Statut",
        },
        allodoc: {
          role: "Fondateur & Développeur",
          status: "En ligne",
          overview: "Vue d'ensemble d'AlloDoc — à compléter.",
          problem: "Énoncé du problème — à compléter.",
          solution: "Description de la solution — à compléter.",
          featureList: [
            { title: "Gestion des patients", description: "Créer, rechercher et gérer des dossiers patients complets avec numéros de dossier, historique médical et fichiers joints." },
            { title: "Workflow de consultation", description: "Démarrer des consultations, rédiger des notes cliniques, utiliser des modèles de consultation réutilisables, demander des examens et stocker l'historique des consultations." },
            { title: "Ordonnances & Génération de documents", description: "Générer des ordonnances et certificats médicaux imprimables à l'aide de modèles personnalisables, logos et en-têtes de documents." },
            { title: "Génération de certificats médicaux", description: "Générez en un clic plusieurs types de certificats médicaux (médical, arrêt de travail, aptitude, vaccination, consultation) à partir de modèles prêts à l'emploi." },
            { title: "Odontogramme dentaire", description: "Graphique dentaire interactif utilisant la numérotation dentaire FDI, les types de traitement, les surfaces et l'historique dentaire lié aux consultations." },
            { title: "Paiements & Finance", description: "Gérer les paiements de consultation, les services, les paiements partiels, les dépenses et le suivi financier." },
            { title: "Gestion des stocks", description: "Suivre les produits, les mouvements de stock, les fournisseurs, les dates d'expiration et les liens service-produit." },
            { title: "Stockage local Offline-first", description: "Toutes les données sont stockées localement via SQLite, permettant au logiciel de fonctionner sans connexion internet." },
            { title: "Système de licence & sauvegardes", description: "Validation de licence basée sur la machine, fichier de licence local, sauvegardes automatiques et journaux de diagnostic." },
          ],
          stackList: ["React", "TypeScript", "Electron", "Vite", "SQLite", "better-sqlite3", "Tailwind CSS", "shadcn/ui", "Radix UI", "TanStack Query", "TipTap", "Recharts", "Zod", "react-hook-form", "Electron Builder"],
          architecture: "Architecture et workflow interne — à compléter.",
          mobileApp: {
            title: "Application mobile dédiée",
            subtitle: "Pour les patients",
            description: "AlloDoc est accompagné d'une application mobile pensée pour les patients. Ils peuvent trouver des médecins à proximité, filtrer par spécialité et par ville, et prendre rendez-vous en quelques clics — le tout synchronisé avec l'espace du médecin sur AlloDoc.",
            features: [
              "Rechercher des médecins par spécialité, ville et disponibilité",
              "Consulter les profils, l'adresse et les horaires de consultation",
              "Prendre, reporter ou annuler un rendez-vous en quelques secondes",
              "Recevoir des rappels et notifications avant chaque visite",
            ],
            platforms: "Disponible sur iOS et Android",
          },
        },
        bioshare: {
          role: "Fondateur & Développeur",
          status: "En ligne",
          featureList: [
            { title: "Page bio publique", description: "Une page unique et partageable qui regroupe tous les liens et réseaux sociaux de l'utilisateur." },
            { title: "Liens drag & drop", description: "Ajouter, supprimer et réorganiser les liens instantanément avec une expérience fluide." },
            { title: "Thèmes & personnalisation", description: "Choisir parmi des thèmes prêts à l'emploi ou affiner couleurs, typographie, fond et boutons." },
            { title: "Tableau de bord analytics", description: "Suivre les vues de page, clics par lien, sources de trafic et tendances dans le temps." },
            { title: "Authentification & comptes", description: "Inscription par email ou OAuth Google, sessions JWT sécurisées via Supabase Auth." },
            { title: "Upload d'assets", description: "Téléverser photos de profil, bannières et assets personnalisés, stockés dans Supabase Storage." },
            { title: "URL courte & QR code", description: "Partager sa bio via une URL courte personnalisée ou un QR code généré automatiquement." },
            { title: "Pages SEO-friendly", description: "Chaque page publique embarque des meta tags dynamiques et des aperçus sociaux optimisés." },
          ],
          stackList: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Supabase", "PostgreSQL", "Supabase Auth", "Supabase Storage", "TanStack Query", "Zod", "react-hook-form", "Vercel"],
        },
        wardrobeai: {
          role: "Fondateur & Développeur",
          status: "En développement",
          webStack: "Version web",
          mobileStack: "Version mobile",
          featureList: [
            { title: "Capture intelligente des vêtements", description: "Photographiez n'importe quelle pièce — le détourage et le recadrage sont automatiques." },
            { title: "Catégorisation automatique", description: "L'IA détecte la catégorie, les couleurs dominantes, le motif, la matière et la saison de chaque pièce." },
            { title: "Dressing numérique", description: "Parcourez, recherchez et filtrez toute votre garde-robe par catégorie, couleur, marque, saison ou occasion." },
            { title: "Générateur de tenues IA", description: "Obtenez des tenues complètes en un clic, équilibrées selon l'harmonie des couleurs et des règles de style." },
            { title: "Suggestions selon la météo", description: "Des looks quotidiens adaptés à la météo locale et à l'occasion (travail, sport, soirée)." },
            { title: "Suivi du port & coût par utilisation", description: "Enregistrez ce que vous portez pour redécouvrir les pièces oubliées et calculer le coût réel par utilisation." },
            { title: "Planificateur de tenues", description: "Planifiez vos looks à l'avance pour un voyage ou une semaine chargée et sauvegardez-les en capsules réutilisables." },
            { title: "Synchronisation multi-plateforme", description: "Le web et le mobile partagent le même backend Supabase avec synchronisation temps réel et authentification sécurisée." },
          ],
          stackWeb: ["TanStack Start", "TanStack Router", "TanStack Query", "Vite", "Supabase", "Tailwind CSS", "TypeScript"],
          stackMobile: ["React Native", "TypeScript", "Supabase"],
        },
      },
      techStack: {
        tag: "Stack technique",
        title1: "Les outils",
        title2: "que j'utilise",
        description:
          "Une sélection de technologies que j'utilise sur mes projets — du frontend au backend, en passant par les bases de données, le design et le DevOps.",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          database: "Bases de données & BaaS",
          mobile: "Mobile & Desktop",
          devops: "DevOps & Cloud",
          design: "Design",
          productivity: "Productivité & Collaboration",
          ides: "IDE & Éditeurs",
        },
      },
      certifications: {
        tag: "Certifications",
        title1: "Mes",
        title2: "certifications",
        description:
          "Une sélection de certifications obtenues pour approfondir mes compétences et rester à jour avec les dernières technologies.",
        viewAll: "Voir tout →",
        items: {
          aws: "Validation des compétences en conception et déploiement d'applications scalables et sécurisées sur AWS.",
          google:
            "Programme complet couvrant la recherche utilisateur, le wireframing, le prototypage et les tests d'utilisabilité.",
          meta:
            "Maîtrise de React, JavaScript moderne et des bonnes pratiques de développement front-end professionnel.",
          scrum:
            "Certification en gestion de projet agile et facilitation d'équipes Scrum performantes.",
        },
        dates: {
          aws: "Mars 2024",
          google: "Novembre 2023",
          meta: "Juin 2023",
          scrum: "Janvier 2023",
        },
      },
      portfolio: {
        title1: "Travaux",
        title2: "sélectionnés",
        seeAll: "Voir tout",
      },
      blog: {
        tag: "Blog",
        title1: "Idées &",
        title2: "Tendances",
        posts: {
          0: { title: "Mener des recherches approfondies et des tests d'utilisabilité", category: "Recherche", readTime: "5 min de lecture" },
          1: { title: "Concevoir des interfaces qui ravissent utilisateurs et clients", category: "Design", readTime: "8 min de lecture" },
          2: { title: "Apporter conseil expert et orientation stratégique", category: "Stratégie", readTime: "6 min de lecture" },
        },
      },
      cta: {
        title: "Travaillons ensemble",
        description:
          "Parlez-moi de votre projet. Je vous réponds en moins de 24 h.",
        info: {
          emailLabel: "Courriel",
          email: "Riadhmcadi@gmail.com",
          phoneLabel: "Téléphone",
          phone: "+1 (581) 446-9484",
          locationLabel: "Localisation",
          location: "Montréal, Québec QC · À distance.",
          availability: "Disponible pour de nouveaux projets",
          followMe: "Retrouvez-moi sur",
        },
        form: {
          servicesLabel: "Comment puis-je vous aider ?",
          servicesHint: "Sélectionnez un ou plusieurs services",
          nameLabel: "Votre nom",
          namePlaceholder: "Jean Dupont",
          emailLabel: "Votre courriel",
          emailPlaceholder: "vous@entreprise.com",
          messageLabel: "Votre message",
          messagePlaceholder: "Parlez-moi un peu de votre projet...",
          submit: "Envoyer le message",
          success: "Merci ! Je vous réponds rapidement.",
          error: "Veuillez remplir tous les champs requis.",
        },
        services: {
          webDesign: { title: "Design web", desc: "J'ai besoin d'un design de site." },
          webDev: { title: "Développement web", desc: "J'ai besoin d'un site web." },
          mobile: { title: "Application mobile", desc: "App iOS ou Android." },
          fullstack: { title: "Application full-stack", desc: "Produit de bout en bout." },
          consulting: { title: "Conseil", desc: "Conseils tech & architecture." },
          other: { title: "Autre chose", desc: "Parlons-en !" },
        },
      },
      contact: {
        title: "Contactez-moi pour donner vie à votre projet",
        description:
          "N'hésitez pas à me contacter pour toute question. Je suis disponible pour de nouveaux projets ou simplement pour échanger.",
        emailPlaceholder: "Votre email",
        send: "Envoyer",
        tag: "Contact",
        sectionTitle: "Contactez moi"
      },
      footer: {
        title: "Restons\nen contact\net discutons",
        follow: "Suivez-moi !",
        bookCall: "Réserver un appel",
      },
      studio: {
        welcome: "Bienvenue dans le studio.",
        walk: "marcher",
        look: "Glisser pour regarder",
        interact: "Cliquez une étiquette ou appuyez sur",
        pressE: "Appuyez sur E",
        loading: "Ouverture du studio…",
        back: "Retour au studio",
        language: "Langue",
        movement: "Contrôles de déplacement",
        pad: { up: "Avancer", down: "Reculer", left: "Aller à gauche", right: "Aller à droite" },
        stations: {
          software: { label: "Logiciels et web", hint: "L'ordinateur" },
          apps: { label: "Applications mobiles", hint: "Le téléphone" },
          technical: { label: "Technique", hint: "Baie de serveurs" },
          experience: { label: "Parcours", hint: "Le tableau" },
          about: { label: "À propos", hint: "Dire bonjour" },
          contact: { label: "Me écrire", hint: "Coin café" },
        },
        about: {
          title: "Bonjour, je construis des pièces où l'on peut marcher.",
          lede: "Je conçois et je code des expériences interactives où la 3D, le mouvement et la typographie se rencontrent. Je modélise dans Blender, je construis avec React et Three.js, et je soigne chaque image.",
          body: "Ce studio est mon portfolio : chaque meuble mène quelque part. Revenez en arrière et essayez le tableau.",
        },
        experience: { eyebrow: "Depuis le tableau", title: "Expérience" },
        contact: {
          eyebrow: "Coin café",
          title: "Faisons quelque chose ensemble.",
          lede: "Disponible pour des mandats et des postes à temps plein. Le café est pour moi.",
        },
        work: {
          eyebrow: "Depuis le bureau",
          errorTitle: "Chargement impossible",
          notFound: "Introuvable",
          missing: "Cette catégorie n'existe pas.",
          software: { title: "Logiciels et web", blurb: "Applications web, sites et logiciels de bureau." },
          apps: { title: "Applications mobiles", blurb: "Applications pour iOS et Android." },
          technical: { title: "Projets techniques", blurb: "Infrastructure, serveurs et systèmes." },
        },
      },
    },
  },
};

// Same language on the server and the first client render. A saved choice is
// applied after mount so the page does not hydrate with a different language.
i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
