export interface Intro {
  profilImageLink: string;
  resumeLink: string;
  text: string;
  links: Link[];
}
export interface Link {
  name: string;
  link: string;
  iconClass: string;
}

export interface About {
  title: string;
  subTitle: string;
  summary: string;
  techStack: TechStack;
}

export interface TechStack {
  frontEnd: TechInfo;
  backEnd: TechInfo;
  others: TechInfo;
}
export interface TechInfo {
  title:string;
  technologies:Technology[]
}
export interface Technology {
  title: string;
  iconClass?: string;
  iconImage?: string;
  bgColor: string;
  color: string;
}


export interface PortfolioItem {
  title: string;
  subTitle: string;
  image?: string;
  links: ProjectLinks;
  duration?: string;
  summary: string;
  tasks: string[];
  techStack?: TechStackProject[];
}
export interface TechStackProject {
  title: string;
  iconClass?: string;
}
export interface ProjectLinks {
  live?: string;
  repo?: string;
  company?:string;
}

export interface  portfolioData{
  intro: Intro;
  about: About;
  workInfo: PortfolioItem[];
  projects: PortfolioItem[];
}
export interface Config {
  brandName: string;
  links: {
    home: boolean;
    about: boolean;
    projects: boolean;
    work: boolean;
  };
}

