import type { Dictionary } from "./en";

const sw: Dictionary = {
  meta: {
    title: "Kibarua Mtaani | Vibarua vya mtaani, vimefanywa vizuri",
    description:
      "Pata msaada unaoaminika kwa kazi za kila siku mtaani kwako, au tafuta kazi karibu nawe. Usafi, fundi, uwasilishaji, kuhama na zaidi.",
  },
  nav: {
    home: "Nyumbani",
    findWork: "Tafuta Kazi",
    postJob: "Weka Kazi",
    howItWorks: "Jinsi inavyofanya kazi",
    login: "Ingia",
    signup: "Jisajili",
    menu: "Fungua menyu",
    dashboard: "Dashibodi",
    logout: "Toka",
  },
  hero: {
    badge: "Vibarua vya mtaani, vimefanywa vizuri",
    titleStart: "Msaada na kazi,",
    titleHighlight: "papo hapo mtaani kwako",
    subtitle:
      "Ajiri watu wanaoaminika kwa kazi za kila siku, au tafuta kazi karibu nawe. Haraka, haki na malipo kupitia M-Pesa.",
    needHelp: "Nahitaji msaada",
    needHelpText: "Weka kazi chini ya dakika moja.",
    postJob: "Weka kazi",
    wantWork: "Nataka kazi",
    wantWorkText: "Tafuta kazi karibu nawe upate pesa leo.",
    findWork: "Tafuta kazi",
  },
  categories: {
    heading: "Kazi maarufu",
    subheading:
      "Chochote kinachohitaji kufanywa, kuna mtu karibu nawe anaweza.",
    items: {
      cleaning: { name: "Usafi", blurb: "Nyumba, ofisi, baada ya sherehe" },
      laundry: { name: "Ufuaji", blurb: "Mama fua, kupiga pasi" },
      fundi: { name: "Fundi", blurb: "Mabomba, umeme, ukarabati" },
      delivery: { name: "Uwasilishaji", blurb: "Safari ndogo na vifurushi" },
      moving: { name: "Kuhama", blurb: "Kuhamisha nyumba, kubeba mizigo" },
      gardening: { name: "Bustani", blurb: "Nyasi, ua, kupanda" },
      painting: { name: "Upakaji rangi", blurb: "Ndani na nje" },
      other: { name: "Kazi nyingine", blurb: "Chochote kingine unachohitaji" },
    },
  },
  how: {
    heading: "Jinsi inavyofanya kazi",
    hirerTitle: "Ukihitaji msaada",
    workerTitle: "Ukitaka kazi",
    hirerSteps: [
      {
        title: "Weka kazi yako",
        text: "Tuambie unachohitaji, wapi, na bajeti yako.",
      },
      {
        title: "Pata mtu",
        text: "Wafanyakazi waliothibitishwa mtaani kwako hujibu haraka.",
      },
      {
        title: "Lipa kwa usalama",
        text: "Lipa kupitia M-Pesa. Tunaachilia pesa kazi ikikamilika.",
      },
    ],
    workerSteps: [
      {
        title: "Jisajili bure",
        text: "Namba yako ya simu tu. Hakuna barua pepe.",
      },
      {
        title: "Pata arifa za kazi",
        text: "Pokea kazi karibu nawe kwa SMS au WhatsApp.",
      },
      {
        title: "Lipwa haraka",
        text: "Mapato yanaingia moja kwa moja kwenye M-Pesa yako.",
      },
    ],
  },
  trust: [
    {
      title: "Wafanyakazi waliothibitishwa",
      text: "Tunakagua vitambulisho kabla ya kutoa beji.",
    },
    {
      title: "Tathmini za kweli",
      text: "Maoni kutoka kwa kazi zilizokamilika pekee.",
    },
    {
      title: "Lipa kwa M-Pesa",
      text: "Salama, rahisi, bila usumbufu wa pesa taslimu.",
    },
  ],
  cta: {
    heading: "Uko tayari kuanza?",
    text: "Jiunge na majirani zako wanaofanikisha mambo kwenye Kibarua Mtaani.",
    postJob: "Weka kazi",
    registerWorker: "Jisajili kama mfanyakazi",
  },
  footer: {
    tagline:
      "Vibarua vya mtaani, vimefanywa vizuri. Pata msaada unaoaminika au tafuta kazi mtaani kwako.",
    quickLinks: "Viungo vya haraka",
    contact: "Mawasiliano",
    rights: "Haki zote zimehifadhiwa.",
  },

  postJob: {
    title: "Weka kazi",
    subtitle:
      "Tuambie unachohitaji. Ni bure na inachukua chini ya dakika moja.",
    fields: {
      category: "Unahitaji nini?",
      categoryPlaceholder: "Chagua aina ya kazi",
      title: "Kichwa cha kazi",
      titlePlaceholder: "k.m. Kusafisha nyumba ya vyumba viwili",
      description: "Maelezo",
      descriptionPlaceholder:
        "Eleza kazi, ukubwa wake, na vifaa vinavyohitajika...",
      estate: "Mtaa au eneo",
      estatePlaceholder: "k.m. Kilimani",
      when: "Unahitaji lini?",
      budget: "Bajeti (KES), si lazima",
      budgetPlaceholder: "k.m. 1500",
      budgetHint: "Acha wazi upate makadirio ya bei.",
      name: "Jina lako",
      phone: "Namba ya simu",
      phoneHint: "Inatumika kwa M-Pesa. Haionyeshwi hadharani.",
    },
    when: {
      asap: "Haraka iwezekanavyo",
      today: "Leo",
      tomorrow: "Kesho",
      thisWeek: "Wiki hii",
      flexible: "Niko tayari wakati wowote",
    },
    submit: "Weka kazi",
    submitting: "Inawekwa...",
    errors: {
      generic: "Tafadhali angalia sehemu hii.",
      category: "Chagua aina ya kazi.",
      titleShort: "Kichwa kiwe na angalau herufi 5.",
      titleLong: "Kichwa kisizidi herufi 80.",
      descShort: "Eleza kazi kwa angalau herufi 10.",
      descLong: "Maelezo yasizidi herufi 500.",
      estate: "Weka mtaa au eneo lako.",
      when: "Chagua wakati.",
      budgetInvalid: "Tumia namba tu, k.m. 1500.",
      budgetMin: "Bajeti ya chini ni KES 100.",
      name: "Weka jina lako.",
      phone: "Weka namba sahihi ya simu, k.m. 0712 345 678.",
    },
    success: {
      title: "Kazi imewekwa!",
      text: "Tumepokea kazi yako. Tutakupigia simu mfanyakazi akikubali.",
      ref: "Namba yako ya kumbukumbu",
      another: "Weka kazi nyingine",
      home: "Rudi nyumbani",
    },
  },

  worker: {
    title: "Jisajili kama mfanyakazi",
    subtitle:
      "Kujiunga ni bure. Pata arifa za kazi karibu nawe na lipwa kupitia M-Pesa.",
    fields: {
      name: "Jina lako",
      phone: "Namba ya simu",
      phoneHint: "Tutatuma arifa za kazi hapa. Haionyeshwi hadharani.",
      skills: "Unafanya kazi gani?",
      skillsHint: "Chagua zote zinazokufaa.",
      areas: "Unaweza kufanya kazi wapi?",
      areasHint: "Chagua mitaa unayoweza kufika.",
      otherArea: "Maeneo mengine",
      otherAreaPlaceholder: "k.m. Ngong Road, Syokimau (tenganisha kwa koma)",
      experience: "Uzoefu",
      experiencePlaceholder: "Chagua moja",
      about: "Kukuhusu (si lazima)",
      aboutPlaceholder:
        "Waambie wateja kidogo kuhusu kazi yako na kinachokufanya uaminike...",
      consent:
        "Nakubali kupigiwa au kutumiwa ujumbe wa kazi kwa SMS au WhatsApp.",
    },
    experience: {
      new: "Naanza tu",
      lt1: "Chini ya mwaka 1",
      "1to3": "Miaka 1 hadi 3",
      "3plus": "Zaidi ya miaka 3",
    },
    submit: "Jisajili",
    submitting: "Inasajili...",
    errors: {
      generic: "Tafadhali angalia sehemu hii.",
      name: "Weka jina lako.",
      phone: "Weka namba sahihi ya simu, k.m. 0712 345 678.",
      skills: "Chagua angalau aina moja ya kazi.",
      areas: "Chagua au andika angalau eneo moja.",
      areasMax: "Tafadhali chagua maeneo 10 au chini.",
      experience: "Chagua uzoefu wako.",
      aboutLong: "Isizidi herufi 300.",
      consent: "Tafadhali kubali ili tuweze kukutumia kazi.",
    },
    success: {
      title: "Umesajiliwa!",
      text: "Karibu Kibarua Mtaani. Tutakutumia ujumbe kazi zikipatikana eneo lako. Baadaye utaweza kuthibitisha kitambulisho chako upate beji ya kuaminika.",
      ref: "Namba yako ya kumbukumbu",
      another: "Sajili mtu mwingine",
      home: "Rudi nyumbani",
    },
  },

  howPage: {
    title: "Rahisi kwa kila mtu",
    subtitle:
      "Iwe unahitaji msaada au unataka kupata kipato, kuanza kunachukua dakika chache tu.",
    faqHeading: "Maswali ya kawaida",
    faqs: [
      {
        q: "Je, kuweka kazi ni bure?",
        a: "Ndiyo. Kuweka kazi ni bure. Unalipia kazi yenyewe tu.",
      },
      {
        q: "Je, ni bure kwa wafanyakazi kujiunga?",
        a: "Ndiyo. Kujisajili ni bure, na unabaki na unachopata.",
      },
      {
        q: "Wafanyakazi huthibitishwa vipi?",
        a: "Wafanyakazi wanaweza kuwasilisha kitambulisho ili wapate beji ya uthibitisho. Tathmini kutoka kwa kazi zilizokamilika hujenga uaminifu.",
      },
      {
        q: "Nalipaje?",
        a: "Unakubaliana bei na mfanyakazi. Malipo salama ya M-Pesa yanakuja hivi karibuni.",
      },
      {
        q: "Mnahudumia maeneo gani?",
        a: "Tunaanza na mitaa fulani ya Nairobi na tutapanuka.",
      },
    ],
  },

  findWork: {
    title: "Tafuta kazi",
    subtitle: "Angalia kazi karibu nawe na uwasiliane.",
    category: "Aina",
    area: "Eneo",
    allCategories: "Aina zote",
    allAreas: "Maeneo yote",
    filter: "Chuja",
    clear: "Futa",
    results: "Kazi {n} zimepatikana",
    noResults: "Hakuna kazi zinazolingana bado. Jaribu eneo au aina nyingine.",
    quotes: "Omba makadirio",
    postedAgo: "saa {n} zilizopita",
    interested: "Nimevutiwa",
    noAccountCta: "Unataka arifa za kazi kwenye simu yako?",
    register: "Jisajili kama mfanyakazi",
  },
  auth: {
    show: "Onyesha",
    hide: "Ficha",
    login: {
      title: "Ingia",
      subtitle: "Karibu tena. Ingia kwa namba yako ya simu na nenosiri.",
      submit: "Ingia",
      submitting: "Inaingia...",
      noAccount: "Wewe ni mgeni?",
      signupLink: "Fungua akaunti",
    },
    signup: {
      title: "Fungua akaunti yako",
      subtitle: "Ni bure. Tumia namba yako ya simu na uchague nenosiri.",
      name: "Jina lako",
      submit: "Fungua akaunti",
      submitting: "Inafungua...",
      haveAccount: "Una akaunti tayari?",
      loginLink: "Ingia",
    },
    fields: {
      phone: "Namba ya simu",
      password: "Nenosiri",
      passwordHint: "Angalau herufi 8. Usitumie PIN yako ya M-Pesa kamwe.",
    },
    errors: {
      name: "Weka jina lako.",
      phone: "Weka namba sahihi ya simu, k.m. 0712 345 678.",
      password: "Weka nenosiri lako.",
      passwordShort: "Nenosiri liwe na angalau herufi 8.",
      passwordLong: "Nenosiri ni refu mno.",
      phoneTaken: "Namba hii ina akaunti tayari. Jaribu kuingia.",
      invalidLogin: "Namba ya simu au nenosiri si sahihi.",
      locked:
        "Majaribio mengi yaliyoshindwa. Tafadhali jaribu tena baada ya dakika 15.",
      saveFailed: "Hitilafu imetokea. Tafadhali jaribu tena.",
    },
  },
  dashboard: {
    greeting: "Habari, {name}",
    subtitle: "Ungependa kufanya nini?",
    postJob: "Weka kazi",
    findWork: "Tafuta kazi",
    registerWorker: "Weka wasifu wangu wa mfanyakazi",
    soon: "Kazi zako na maombi yako yataonekana hapa hivi karibuni.",
  },
};

export default sw;
