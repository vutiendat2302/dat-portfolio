export interface Dictionary {
  navigation: {
    home: string; 
    about: string;
    projects: string;
    blog: string;
    cv: string;
    contact: string;
    menu: string;
    closeMenu: string;
  };
  language: {
    label: string;
  };
  theme: {
    label: string;
    light: string;
    dark: string;
    system: string;
  };
  hero: {
    greeting: string;
    headline: string;
    exploreWork: string;
    readWriting: string;
    visualLabel: string;
    visualFooter: string;
  };
  sections: {
    about: { eyebrow: string; title: string; more: string };
    projects: { eyebrow: string; title: string; description: string; all: string };
    capabilities: { eyebrow: string; title: string; description: string };
    experience: { eyebrow: string; title: string };
    education: { eyebrow: string; title: string };
    writing: { eyebrow: string; title: string; description: string; all: string };
    contact: { eyebrow: string; title: string; description: string };
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    description: string;
    story: string;
    skills: string;
    experience: string;
    education: string;
    context: string;
    perspective: string;
    principles: string;
    focusAreas: string;
    interests: string;
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  blogPage: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cvPage: {
    eyebrow: string;
    title: string;
    description: string;
    print: string;
    downloadPdf: string;
    summary: string;
    skills: string;
    experience: string;
    education: string;
    projects: string;
    contact: string;
    activities: string;
    coursework: string;
    phone: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    description: string;
    directContact: string;
    email: string;
    phone: string;
    location: string;
    social: string;
    availability: string;
    availabilityStatus: string;
    availabilityNotice: string;
    responseTime: string;
    responseTimeNotice: string;
    sendMessage: string;
    formDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    copyEmail: string;
    emailCopied: string;
    openGmail: string;
  };
  project: {
    viewProject: string;
    back: string;
    overview: string;
    technologies: string;
    sourceCode: string;
    liveWebsite: string;
    technologyListLabel: string;
  };
  blog: {
    back: string;
    minuteRead: string;
    tagsLabel: string;
    readArticle: string;
    aiTranslated: string;
    missingTranslationNotice: string;
  };
  empty: {
    skills: string;
    experience: string;
    education: string;
    posts: string;
  };
  notFound: {
    label: string;
    title: string;
    description: string;
    home: string;
  };
  footer: {
    builtWith: string;
    privacyPolicy: string;
    githubRepo: string;
  };
  metadata: {
    siteDescription: string;
    homeTitle: string;
    aboutTitle: string;
    aboutDescription: string;
    projectsTitle: string;
    projectsDescription: string;
    blogTitle: string;
    blogDescription: string;
    cvTitle: string;
    cvDescription: string;
    contactTitle: string;
    contactDescription: string;
    privacyTitle: string;
    privacyDescription: string;
  };
}
