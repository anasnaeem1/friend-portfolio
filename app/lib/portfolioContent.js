export const PAGES = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "workExperience", label: "Experience" },
];

/** Default values — matches models/PortfolioContent.js */
export const defaultContent = {
  home: {
    greeting: "Hello,",
    name: "Bassant",
    intro:
      "Creative Arts student, with a background in Marketing and advertising and 2 years of experience in campaigning creation within a college setting",
    bio:
      "I craft refined visuals and creative Advertising and Marketing campaigns that merge aesthetics with strategy, helping brands communicate with clarity and impact. Cohesive identities, compelling content, and visually intelligent solutions that elevate presence and leave a lasting impression.",
    primaryCta: "View work",
    primaryHref: "/work",
    secondaryCta: "About",
    secondaryHref: "/about",
  },
  work: {
    categoryLabel: "My work",
    heading: "Marketing",
    projects: [
      {
        id: "p1",
        title: "Campaign identity",
        description: "Launch visuals and social system for a summer product drop.",
        href: "#",
        imageUrl:
          "https://res.cloudinary.com/datcr1zua/image/upload/v1773703333/samples/woman-on-a-football-field.jpg",
      },
      {
        id: "p2",
        title: "Editorial series",
        description: "Print and digital layouts for a quarterly arts publication.",
        href: "#",
        imageUrl:
          "https://res.cloudinary.com/datcr1zua/image/upload/v1773703333/samples/woman-on-a-football-field.jpg",
      },
    ],
  },
  about: {
    skillsHeading: "Education & skills",
    contactsHeading: "Contacts",
    education: "B.A. Graphic Design — Demo Arts Institute · 2020–2024\nCreative Media certification — Demo College · 2019",
    skills: "Communication\nPublic Speaking\nTeam working\nCreativity\nDigital media",
    contactLabel: "Email",
    contactValue: "portfolio.demo@example.com",
    contactHref: "mailto:portfolio.demo@example.com",
  },
  workExperience: {
    heading: "Work experience",
    period: "2024 – Now",
    role: "SOLIS – Graphic Designer & Project Manager (Remotely)",
    description:
      "Leading creative designs & projects, managing timelines, and handling client communication.",
  },
};
