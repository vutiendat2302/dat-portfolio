export interface Dictionary {
  navigation: {
    home: string; 
    about: string;
    projects: string;
    blog: string;
    photos: string;
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
    title: string;
    description: string;
    interests: string;
    principles: string;
    focusAreas: string;
    album: string;
    albumDescription: string;
    albumButton: string;
    achievements: string;
    achievementsDescription: string;
    viewCertificate: string;
    openOriginal: string;
    showMore: string;
    showLess: string;
    close: string;
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
  photosPage: {
    eyebrow: string;
    title: string;
    description: string;
    ctaButton: string;
    tabs: {
      me: string;
      everyone: string;
    };
    seriesTitle: string;
    photoCount: string;
    viewAlbum: string;
    empty: string;
    breadcrumbPhotos: string;
    metaYear: string;
    metaDate: string;
    metaLocation: string;
    metaCount: string;
    metaCamera: string;
    metaLens: string;
    metaStats: string;
    back: string;
    hintLightbox: string;
    prevAlbum: string;
    nextAlbum: string;
    allAlbums: string;
    lightbox: {
      download: string;
      copyLink: string;
      copied: string;
      close: string;
      specs: string;
      camera: string;
      lens: string;
      aperture: string;
      shutter: string;
      iso: string;
      focalLength: string;
      extra: string;
      software: string;
      dimensions: string;
      prev: string;
      next: string;
      zoomIn: string;
      zoomOut: string;
    };
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
    title: string;
    description: string;
    directContact: string;
    email: string;
    phone: string;
    copy: string;
    copied: string;
    openEmail: string;
    social: string;
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
    photosTitle: string;
    photosDescription: string;
    cvTitle: string;
    cvDescription: string;
    contactTitle: string;
    contactDescription: string;
    privacyTitle: string;
    privacyDescription: string;
  };
}
