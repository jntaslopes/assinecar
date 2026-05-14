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
  advantagesPhone: asset("advantages-phone.png"),
  trustRingA: asset("trust-ring-a.svg"),
  trustRingB: asset("trust-ring-b.svg"),
  trustRingC: asset("trust-ring-c.svg"),
  ctaPhotoA: asset("cta-car-photo-a-fixed.png"),
  ctaPhotoB: asset("cta-car-photo-b-fixed.png"),
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
    image: asset("car-card-argo.png"),
    group: "Grupo A",
    name: "Kwid ou similares",
    tags: ["Hatch", "Manual"],
    price: "2.200",
  },
  {
    image: asset("hero-car-trimmed.png"),
    group: "Haval H6 PHEV",
    name: "SUV híbrido 0km até 1.782 km",
    tags: ["SUV", "Entrega rápida"],
    price: "5.689",
  },
  {
    image: asset("car-card-toro.png"),
    group: "Toro",
    name: "Fiat Toro 2.0 Turbo ou similar",
    tags: ["Picape", "Diesel"],
    price: "4.699",
  },
  {
    image: asset("car-card-tracker.png"),
    group: "Tracker",
    name: "Chevrolet Tracker LT Turbo",
    tags: ["SUV", "Flex"],
    price: "3.299",
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
  [
    "advantage-shield-check.svg",
    "Proteção inclusa",
    "Proteção total para você e seu carro. Cobertura para roubo, furto, colisões e danos a terceiros.",
  ],
  [
    "advantage-task-check.svg",
    "IPVA e taxas inclusas",
    "IPVA, licenciamento e outras taxas previstas na assinatura.",
  ],
  [
    "advantage-wrench.svg",
    "Manutenção e revisões",
    "Revisões e manutenções preventivas já estão inclusas no plano",
  ],
  [
    "advantage-thumb.svg",
    "Sem burocracia",
    "Documentação simples e aprovação rápida, sem complicação.",
  ],
  ["advantage-24h.svg", "Assistência 24h", "Reboque pane seca, chaveiro e suporte quando precisar."],
  [
    "advantage-car-reserve.svg",
    "Carro reserva",
    "Em casos de necessidade, mandamos um carro reserva para você.",
  ],
].map(([icon, title, text]) => ({ icon: asset(icon), title, text }));

export const trustCards = [
  ["trust-car-search.svg", "Modelos multimarcas 0km"],
  ["trust-car-pin.svg", "Pontos de retirada em todo o Brasil"],
].map(([icon, title]) => ({ icon: asset(icon), title }));

export const trustStats = [
  ["trust-calendar.svg", "+50 anos", "de história da LM Mobilidade."],
  ["trust-sync-location.svg", "Presença nacional", "Atendimento e suporte em diferentes regiões do Brasil."],
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
