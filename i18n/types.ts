export interface Dictionary {
  navigation: {
    about: string;
    projects: string;
    blog: string;
    experience: string;
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
  };
}
