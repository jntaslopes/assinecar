const asset = (name: string) => `/assets/figma/assinecar/${name}`;

export const assets = {
  logo: asset("logo-assine.svg"),
  angleDown: asset("angle-down.svg"),
  user: asset("user.svg"),
  heroShapeA: asset("hero-shape-a.svg"),
  heroShapeB: asset("hero-shape-b.svg"),
  heroCarA: asset("hero-car-fixed.png"),
  heroCarTrimmed: asset("hero-car-trimmed.png"),
  heroCarB: asset("hero-car-b.png"),
  plateHero: asset("plate-hero.svg"),
  whatsapp: asset("whatsapp.svg"),
  headphones: asset("headphones.svg"),
  footerLogo: asset("footer-logo-white.svg"),
  youtube: asset("youtube.svg"),
  instagram: asset("instagram.svg"),
  linkedin: asset("linkedin.svg"),
  badgeA: asset("badge-a.png"),
  badgeB: asset("badge-b.png"),
  badgeC: asset("badge-c.png"),
  privacyPhoto: asset("privacy-photo.png"),
  mobilityPhone: asset("mobility-phone.png"),
  ctaPhotoA: asset("cta-car-photo-a-fixed.png"),
  ctaPhotoB: asset("cta-car-photo-b-fixed.png"),
  arrowLeftPurple: asset("arrow-left-purple.svg"),
  arrowRightPurple: asset("arrow-right-purple.svg"),
  arrowRightWhite: asset("arrow-right-white.svg"),
  tagHatch: asset("tag-hatch.svg"),
  tagFuel: asset("tag-fuel.svg"),
  tagEngine: asset("tag-engine.svg"),
  tagCalendar: asset("tag-calendar.svg"),
  tagGear: asset("tag-gear.svg"),
};

export const stripBenefits = [
  ["icon-calendar-refresh.svg", "Carro por assinatura"],
  ["icon-check-square.svg", "Documentação + Impostos"],
  ["icon-tow.svg", "Assistência 24h e Proteção"],
  ["icon-zero.svg", "Zero burocracia"],
].map(([icon, label]) => ({ icon: asset(icon), label }));

export const includedBenefits = [
  ["icon-shield.svg", "Proteção"],
  ["icon-task.svg", "IPVA e documentação"],
  ["icon-wrench.svg", "Manutenção"],
  ["icon-tow.svg", "Assistência 24h"],
].map(([icon, label]) => ({ icon: asset(icon), label }));

export const cars = [
  {
    slug: "argo",
    title: "Argo",
    description: "Fiat Argo 1.0 Drive 26/26",
    price: "1.879",
    media: [{ src: asset("vehicle-argo.png"), className: "vehicle-image--argo", width: 240, height: 179 }],
    plate: { src: asset("vehicle-plate-argo.svg"), className: "vehicle-plate--argo", width: 28, height: 13 },
    tags: [
      { label: "Hatch", icon: assets.tagHatch },
      { label: "Flex", icon: assets.tagFuel },
      { label: "1.0", icon: assets.tagEngine },
    ],
  },
  {
    slug: "haval",
    title: "Haval H6 HEV2",
    description: "GWM Haval H6 1.5T HEV 2 DHT 26/26",
    price: "5.689",
    media: [{ src: asset("vehicle-haval-composite.png"), className: "vehicle-image--haval-main", width: 305, height: 201 }],
    plate: { src: asset("vehicle-plate-haval.svg"), className: "vehicle-plate--haval", width: 26, height: 12 },
    tags: [
      { label: "SUV", icon: assets.tagHatch },
      { label: "Entrega em 14 dias", icon: assets.tagCalendar },
    ],
  },
  {
    slug: "toro",
    title: "Toro",
    description: "Fiat Toro 2.2 TDI Ranch Auto 4WD 25/26",
    price: "4.499",
    media: [{ src: asset("vehicle-toro.png"), className: "vehicle-image--toro", width: 292, height: 164 }],
    plate: { src: asset("vehicle-plate-toro.svg"), className: "vehicle-plate--toro", width: 26, height: 14 },
    tags: [
      { label: "Automático", icon: assets.tagGear },
      { label: "Diesel", icon: assets.tagFuel },
    ],
  },
  {
    slug: "tracker",
    title: "Tracker",
    description: "Chevrolet Tracker 1.0 Turbo LT Auto 25/26",
    price: "2.829",
    media: [{ src: asset("vehicle-tracker.png"), className: "vehicle-image--tracker", width: 274, height: 204 }],
    plate: { src: asset("vehicle-plate-tracker.svg"), className: "vehicle-plate--tracker", width: 31, height: 15 },
    tags: [
      { label: "Automático", icon: assets.tagGear },
      { label: "Flex", icon: assets.tagFuel },
    ],
  },
];

export const steps = [
  {
    title: "1. Escolha o carro ideal",
    text: "Compare veículos por perfil de uso, prazo e franquia de quilometragem.",
  },
  {
    title: "2. Defina um plano",
    text: "Selecione tempo de contrato e pacote de quilômetros com tudo incluso.",
  },
  {
    title: "3. Conte com um processo simples",
    text: "A análise é rápida e a equipe acompanha você até a retirada do veículo.",
  },
  {
    title: "4. Retire e dirija",
    text: "Use o carro com manutenção, documentação, proteção e suporte LM.",
  },
];

export const advantages = [
  ["icon-shield.svg", "Proteção inclusa", "Dirija com cobertura e suporte contratado no plano."],
  ["icon-task.svg", "IPVA e taxas inclusos", "Documentação e impostos já entram na mensalidade."],
  ["icon-calendar-refresh.svg", "Planos flexíveis", "Escolha prazo e quilometragem conforme sua rotina."],
  ["icon-wrench.svg", "Sem burocracia", "A LM cuida dos pontos operacionais do veículo."],
  ["icon-tow.svg", "Assistência 24h", "Atendimento para emergências durante toda a assinatura."],
  ["icon-zero.svg", "Carro novo", "Modelos atuais, revisados e prontos para uso."],
].map(([icon, title, text]) => ({ icon: asset(icon), title, text }));

export const faqs = [
  "O que está incluso na assinatura do carro?",
  "Como funciona a assinatura do veículo?",
  "Quais documentos preciso para contratar?",
  "Posso escolher o prazo e a quilometragem do plano?",
  "A manutenção do veículo está inclusa?",
  "O seguro e o IPVA já estão inclusos na mensalidade?",
  "Como funciona a retirada do veículo?",
  "Posso devolver o carro antes do fim do contrato?",
  "O que acontece se eu ultrapassar a quilometragem contratada?",
  "Quanto tempo leva para eu receber o carro?",
];
