export type Language = "en" | "ne";

export const translations = {
  en: {
    // Sidebar
    "sidebar.workspace": "Workspace",
    "sidebar.dashboard": "Dashboard",
    "sidebar.myNotes": "My Notes",
    "sidebar.settings": "Settings",
    "sidebar.createNote": "Create New Note",

    // Topbar
    "topbar.searchPlaceholder": "Search notes, community, resources...",
    "topbar.browse": "Browse",
    "topbar.community": "Community",
    "topbar.resources": "Resources",
    "topbar.upload": "Upload",
    "topbar.communitySoon": "Community is coming soon!",
    "topbar.resourcesSoon": "Resources is coming soon!",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.markAllRead": "Mark all as read",
    "notifications.loading": "Loading...",
    "notifications.empty": "No notifications yet.",
    "notifications.liked": "liked",
    "notifications.commented": "commented on",
    "notifications.yourNote": "your note",
    "notifications.someone": "Someone",
    "notifications.aNote": "a note",

    // Footer
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Collaborative notes and resources for students, everywhere.",
    "footer.product": "Product",
    "footer.browseNotes": "Browse Notes",
    "footer.uploadNotes": "Upload Notes",
    "footer.community": "Community",
    "footer.company": "Company",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    "footer.madeFor": "Made for students, by students.",

    // Landing page
    "landing.badge": "New features available",
    "landing.heroTitle": "Learn Smarter with",
    "landing.heroBrand": "Notesathi",
    "landing.heroSubtitle":
      "Elevate your academic journey through collaborative studying. Share resources, organize your knowledge, and connect with students worldwide.",
    "landing.getStarted": "Get Started",
    "landing.browseNotes": "Browse Notes",
    "landing.studentsCount": "50,000+ students",
    "landing.studentsSubtext": "already learning smarter",
    "landing.featuresTitle": "Everything you need to excel",
    "landing.featuresSubtitle":
      "Streamlining the student experience with powerful, collaborative tools.",
    "landing.collabTitle": "Student Collaboration",
    "landing.collabDesc":
      "Join study groups and find like-minded peers from across the globe. Share notes, ask questions, and learn together.",
    "landing.searchTitle": "Search Resources",
    "landing.searchDesc":
      "Access an extensive library of shared notes, past papers, and course materials tailored to your syllabus.",
    "landing.trustedTitle": "Trusted by 50,000+ students",
    "landing.ctaTitle": "Ready to start learning?",
    "landing.ctaSubtitle":
      "Join thousands of students who have already transformed their study habits.",
    "landing.ctaButton": "Create Free Account",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Manage your account preferences.",
    "settings.notifications": "Notifications",
    "settings.notificationsDesc":
      "Get notified about likes, comments, and activity on your notes.",
    "settings.language": "Language",
    "settings.languageDesc": "Choose your preferred display language.",
    "settings.changePassword": "Change Password",
    "settings.changePasswordDesc": "Update the password used to sign in.",
    "settings.viewProfile": "View your profile",

    // Testimonials
    "testimonial1.quote":
      "Notesathi changed the way I prepare for finals. The quality of shared notes is unbeatable, and the interface is so clean.",
    "testimonial1.role": "Computer Science Student",
    "testimonial2.quote":
      "The PDF export feature is a lifesaver — I can study the notes offline recorded on the train, fully synced across devices.",
    "testimonial2.role": "Engineering Student",
    "testimonial3.quote":
      "Collaborating with group projects has never been simpler. We keep all our research and coursework organized in one place.",
    "testimonial3.role": "Pharmacy Student",
  },
  ne: {
    // Sidebar
    "sidebar.workspace": "कार्यक्षेत्र",
    "sidebar.dashboard": "ड्यासबोर्ड",
    "sidebar.myNotes": "मेरा नोटहरू",
    "sidebar.settings": "सेटिङ",
    "sidebar.createNote": "नयाँ नोट थप्नुहोस्",

    // Topbar
    "topbar.searchPlaceholder": "नोट, समुदाय, स्रोतहरू खोज्नुहोस्...",
    "topbar.browse": "ब्राउज गर्नुहोस्",
    "topbar.community": "समुदाय",
    "topbar.resources": "स्रोतहरू",
    "topbar.upload": "अपलोड",
    "topbar.communitySoon": "समुदाय चाँडै आउँदैछ!",
    "topbar.resourcesSoon": "स्रोतहरू चाँडै आउँदैछ!",

    // Notifications
    "notifications.title": "सूचनाहरू",
    "notifications.markAllRead": "सबै पढिएको चिन्ह लगाउनुहोस्",
    "notifications.loading": "लोड हुँदैछ...",
    "notifications.empty": "अहिलेसम्म कुनै सूचना छैन।",
    "notifications.liked": "मन पराए",
    "notifications.commented": "टिप्पणी गरे",
    "notifications.yourNote": "तपाईंको नोटमा",
    "notifications.someone": "कसैले",
    "notifications.aNote": "एउटा नोट",

    // Footer
    "footer.privacy": "गोपनीयता",
    "footer.terms": "सर्तहरू",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.tagline": "विद्यार्थीहरूका लागि, जहाँसुकै, साझा नोट र स्रोतहरू।",
    "footer.product": "उत्पादन",
    "footer.browseNotes": "नोटहरू ब्राउज गर्नुहोस्",
    "footer.uploadNotes": "नोट अपलोड गर्नुहोस्",
    "footer.community": "समुदाय",
    "footer.company": "कम्पनी",
    "footer.about": "हाम्रोबारे",
    "footer.contact": "सम्पर्क",
    "footer.legal": "कानूनी",
    "footer.privacyPolicy": "गोपनीयता नीति",
    "footer.termsOfService": "सेवाका सर्तहरू",
    "footer.madeFor": "विद्यार्थीहरूका लागि, विद्यार्थीहरूद्वारा बनाइएको।",

    // Landing page
    "landing.badge": "नयाँ सुविधाहरू उपलब्ध छन्",
    "landing.heroTitle": "स्मार्ट तरिकाले सिक्नुहोस्",
    "landing.heroBrand": "नोटसाथी",
    "landing.heroSubtitle":
      "सहकार्यात्मक अध्ययनमार्फत आफ्नो शैक्षिक यात्रालाई अझ राम्रो बनाउनुहोस्। स्रोतहरू साझा गर्नुहोस्, आफ्नो ज्ञान व्यवस्थित गर्नुहोस्, र विश्वभरका विद्यार्थीहरूसँग जोडिनुहोस्।",
    "landing.getStarted": "सुरु गर्नुहोस्",
    "landing.browseNotes": "नोटहरू ब्राउज गर्नुहोस्",
    "landing.studentsCount": "५०,०००+ विद्यार्थीहरू",
    "landing.studentsSubtext": "पहिल्यै स्मार्ट तरिकाले सिकिरहेका छन्",
    "landing.featuresTitle": "उत्कृष्ट हुन चाहिने सबै कुरा",
    "landing.featuresSubtitle":
      "शक्तिशाली, सहकार्यात्मक उपकरणहरूसँग विद्यार्थी अनुभवलाई सहज बनाउँदै।",
    "landing.collabTitle": "विद्यार्थी सहकार्य",
    "landing.collabDesc":
      "अध्ययन समूहहरूमा सामेल हुनुहोस् र विश्वभरका समान विचारधाराका साथीहरू भेट्टाउनुहोस्। नोट साझा गर्नुहोस्, प्रश्न सोध्नुहोस्, र सँगै सिक्नुहोस्।",
    "landing.searchTitle": "स्रोतहरू खोज्नुहोस्",
    "landing.searchDesc":
      "तपाईंको पाठ्यक्रम अनुसार साझा गरिएका नोट, विगतका प्रश्नपत्र, र अध्ययन सामग्रीहरूको विशाल भण्डारमा पहुँच पाउनुहोस्।",
    "landing.trustedTitle": "५०,०००+ विद्यार्थीहरूको विश्वास",
    "landing.ctaTitle": "सिक्न सुरु गर्न तयार हुनुहुन्छ?",
    "landing.ctaSubtitle":
      "आफ्नो अध्ययनको तरिका पहिल्यै परिवर्तन गरिसकेका हजारौं विद्यार्थीहरूसँग जोडिनुहोस्।",
    "landing.ctaButton": "निःशुल्क खाता खोल्नुहोस्",

    // Settings
    "settings.title": "सेटिङ",
    "settings.subtitle": "आफ्नो खाताको प्राथमिकताहरू व्यवस्थापन गर्नुहोस्।",
    "settings.notifications": "सूचनाहरू",
    "settings.notificationsDesc":
      "तपाईंको नोटमा लाइक, टिप्पणी, र गतिविधिको बारेमा सूचना पाउनुहोस्।",
    "settings.language": "भाषा",
    "settings.languageDesc": "आफ्नो मनपर्ने प्रदर्शन भाषा छान्नुहोस्।",
    "settings.changePassword": "पासवर्ड परिवर्तन गर्नुहोस्",
    "settings.changePasswordDesc": "साइन इन गर्न प्रयोग हुने पासवर्ड अपडेट गर्नुहोस्।",
    "settings.viewProfile": "आफ्नो प्रोफाइल हेर्नुहोस्",

    // Testimonials
    "testimonial1.quote":
      "नोटसाथीले मेरो अन्तिम परीक्षाको तयारी गर्ने तरिका नै बदलिदियो। साझा गरिएका नोटहरूको गुणस्तर अतुलनीय छ, र इन्टरफेस पनि निकै सफा छ।",
    "testimonial1.role": "कम्प्युटर विज्ञान विद्यार्थी",
    "testimonial2.quote":
      "PDF निर्यात सुविधा साँच्चै उपयोगी छ — म रेलमा यात्रा गर्दा पनि नोटहरू अफलाइन अध्ययन गर्न सक्छु, सबै डिभाइसमा पूर्ण रूपमा सिंक भएको।",
    "testimonial2.role": "इन्जिनियरिङ विद्यार्थी",
    "testimonial3.quote":
      "समूह परियोजनाहरूमा सहकार्य गर्नु अब यति सजिलो कहिल्यै भएको थिएन। हामी हाम्रो सबै अनुसन्धान र पाठ्यक्रम कार्य एकै ठाउँमा राख्छौं।",
    "testimonial3.role": "फार्मेसी विद्यार्थी",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
