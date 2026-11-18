const en = {
  meta: {
    title: "Kibarua Mtaani | Neighborhood gigs, done right",
    description:
      "Find trusted help for everyday jobs in your estate, or find work near you. Cleaning, fundi, delivery, moving and more.",
  },
  nav: {
    home: "Home",
    findWork: "Find Work",
    postJob: "Post a Job",
    howItWorks: "How it works",
    login: "Log in",
    signup: "Sign up",
    menu: "Toggle menu",
  },
  hero: {
    badge: "Neighborhood gigs, done right",
    titleStart: "Help and work,",
    titleHighlight: "right in your mtaa",
    subtitle:
      "Hire trusted people for everyday jobs, or find work near you. Fast, fair and paid through M-Pesa.",
    needHelp: "I need help",
    needHelpText: "Post a job in under a minute.",
    postJob: "Post a job",
    wantWork: "I want work",
    wantWorkText: "Find gigs near you and earn today.",
    findWork: "Find work",
  },
  categories: {
    heading: "Popular jobs",
    subheading: "Whatever needs doing, someone nearby can do it.",
    items: {
      cleaning: { name: "Cleaning", blurb: "Homes, offices, post-event" },
      laundry: { name: "Laundry", blurb: "Mama fua, ironing" },
      fundi: { name: "Fundi", blurb: "Plumbing, electrical, repairs" },
      delivery: { name: "Delivery", blurb: "Errands and packages" },
      moving: { name: "Moving", blurb: "House moves, loading" },
      gardening: { name: "Gardening", blurb: "Lawns, hedges, planting" },
      painting: { name: "Painting", blurb: "Interior and exterior" },
      other: { name: "Other jobs", blurb: "Anything else you need" },
    },
  },
  how: {
    heading: "How it works",
    hirerTitle: "If you need help",
    workerTitle: "If you want work",
    hirerSteps: [
      {
        title: "Post your job",
        text: "Tell us what you need, where, and your budget.",
      },
      {
        title: "Get matched",
        text: "Verified workers in your estate respond fast.",
      },
      {
        title: "Pay safely",
        text: "Pay via M-Pesa. We release it when the job is done.",
      },
    ],
    workerSteps: [
      {
        title: "Sign up free",
        text: "Just your phone number. No email needed.",
      },
      {
        title: "Get job alerts",
        text: "Receive jobs near you by SMS or WhatsApp.",
      },
      {
        title: "Get paid fast",
        text: "Earnings land straight in your M-Pesa.",
      },
    ],
  },
  trust: [
    {
      title: "ID-verified workers",
      text: "We check IDs before badges are given.",
    },
    { title: "Real ratings", text: "Reviews only from completed jobs." },
    { title: "Pay with M-Pesa", text: "Safe, simple, no cash stress." },
  ],
  cta: {
    heading: "Ready to get started?",
    text: "Join your neighbours already getting things done on Kibarua Mtaani.",
    postJob: "Post a job",
    registerWorker: "Register as a worker",
  },
  footer: {
    tagline:
      "Neighborhood gigs, done right. Find trusted help or find work in your estate.",
    quickLinks: "Quick links",
    contact: "Contact",
    rights: "All rights reserved.",
  },

  postJob: {
    title: "Post a job",
    subtitle: "Tell us what you need. It's free and takes under a minute.",
    fields: {
      category: "What do you need?",
      categoryPlaceholder: "Choose a category",
      title: "Job title",
      titlePlaceholder: "e.g. Clean a 2-bedroom house",
      description: "Details",
      descriptionPlaceholder:
        "Describe the job, how big it is, and any tools needed...",
      estate: "Estate or area",
      estatePlaceholder: "e.g. Kilimani",
      when: "When do you need it?",
      budget: "Budget (KES), optional",
      budgetPlaceholder: "e.g. 1500",
      budgetHint: "Leave empty to get quotes.",
      name: "Your name",
      phone: "Phone number",
      phoneHint: "Used for M-Pesa. Never shown publicly.",
    },
    when: {
      asap: "As soon as possible",
      today: "Today",
      tomorrow: "Tomorrow",
      thisWeek: "This week",
      flexible: "I'm flexible",
    },
    submit: "Post job",
    submitting: "Posting...",
    errors: {
      generic: "Please check this field.",
      category: "Choose a job category.",
      titleShort: "Title must be at least 5 characters.",
      titleLong: "Title must be 80 characters or less.",
      descShort: "Describe the job in at least 10 characters.",
      descLong: "Details must be 500 characters or less.",
      estate: "Enter your estate or area.",
      when: "Choose when you need it.",
      budgetInvalid: "Use numbers only, e.g. 1500.",
      budgetMin: "Minimum budget is KES 100.",
      name: "Enter your name.",
      phone: "Enter a valid phone number, e.g. 0712 345 678.",
    },
    success: {
      title: "Job posted!",
      text: "We've received your job. We'll contact you on your phone when a worker accepts.",
      ref: "Your reference",
      another: "Post another job",
      home: "Back home",
    },
  },

  worker: {
    title: "Register as a worker",
    subtitle: "Free to join. Get job alerts near you and earn through M-Pesa.",
    fields: {
      name: "Your name",
      phone: "Phone number",
      phoneHint: "We'll send job alerts here. Never shown publicly.",
      skills: "What work do you do?",
      skillsHint: "Choose all that apply.",
      areas: "Where can you work?",
      areasHint: "Choose the estates you can reach.",
      otherArea: "Other areas",
      otherAreaPlaceholder: "e.g. Ngong Road, Syokimau (separate with commas)",
      experience: "Experience",
      experiencePlaceholder: "Choose one",
      about: "About you (optional)",
      aboutPlaceholder:
        "Tell customers a bit about your work and what makes you reliable...",
      consent: "I agree to be contacted about jobs by SMS or WhatsApp.",
    },
    experience: {
      new: "Just starting",
      lt1: "Less than 1 year",
      "1to3": "1 to 3 years",
      "3plus": "More than 3 years",
    },
    submit: "Register",
    submitting: "Registering...",
    errors: {
      generic: "Please check this field.",
      name: "Enter your name.",
      phone: "Enter a valid phone number, e.g. 0712 345 678.",
      skills: "Choose at least one kind of work.",
      areas: "Choose or enter at least one area.",
      areasMax: "Please choose 10 areas or fewer.",
      experience: "Choose your experience.",
      aboutLong: "Keep it under 300 characters.",
      consent: "Please agree so we can send you jobs.",
    },
    success: {
      title: "You're registered!",
      text: "Welcome to Kibarua Mtaani. We'll message you when jobs come up in your area. Later you'll be able to verify your ID for a trusted badge.",
      ref: "Your reference",
      another: "Register someone else",
      home: "Back home",
    },
  },
};

export default en;
export type Dictionary = typeof en;
