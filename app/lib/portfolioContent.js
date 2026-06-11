export const PAGES = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "Experience", label: "Experience" },
];

/** Default values — matches models/PortfolioContent.js */
export const defaultContent = {
  home: {
    greeting: "Hello,",
    name: "Umme Habiba",
    intro:
      "I am a Creative Arts student, with a background in Marketing, PR, and Advertising. I gained all of the skills necessary to create integrated Marketing campaigns from 2 years of experience within a college setting.",
    bio:
      "I craft refined visuals and creative Advertising and Marketing campaigns that merge aesthetics with strategy, helping brands communicate with clarity and impact. I have created cohesive identities, compelling content, visually aesthetic and out of the box solutions that elevate presence and leave a lasting impression for a successful outcome to please my clients",
    primaryCta: "View work",
    primaryHref: "/work",
    secondaryCta: "About",
    secondaryHref: "/about",
  },
  work: {
    categoryLabel: "My work",
    heading: "Marketing - Advertising and PR Campaigns",
    projects: [
      {
        id: "p1",
        title: "Fully Integrated Marketing Campaign for St Andrews First Aid",
        description: "Developed an integrated advertising and PR campaign for SAFA (St Andrews First Aid) focused on increasing first aid awareness and training participation within Scotland’s minority communities. The “Safe Spaces” campaign combined community-based workshops, influencer partnerships, social media, outdoor advertising, and PR outreach to make lifesaving skills more accessible and inclusive.",
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
    education: "HNC Marketing Communications at City of Glasgow College - 2024 to 2025 HND Marketing, Advertising and Public Relations at City of Glasgow College - 2025 to 2026",
    skills: "Communication\nPublic Speaking\nTeam working\nOrganisation\nDigital media\nTime Management\nCritical Thinking\nBudgeting",
    contactLabel: "Email",
    contactValue: "UmmeHMohammed987@gmail.com",
    contactHref: "mailto:UmmeHMohammed987@gmail.com",
  },
  Experience: {
    heading: "Work experience",
    workExperience: [
      {
        period: "2026",
        role: "Glasgow Chamber of Commerce - YATTLE",
        description:
          "Creating successful social media content for TikTok and Instagram to reach 16-25 year olds in Scotland looking for apprenticeships.",
      },
      {
        period: "2024 – Now",
        role: "SOLIS – Graphic Designer & Project Manager (Remotely)",
        description:
          "Leading creative designs & projects, managing timelines, and handling client communication.",
      }]
  }
};
