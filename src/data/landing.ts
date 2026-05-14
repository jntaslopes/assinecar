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
  faqHelp: asset("faq-help.svg"),
  faqArrowDown: asset("faq-arrow-down.svg"),
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
  howVisual: asset("how-visual.png"),
  arrowLeftPurple: asset("arrow-left-purple.svg"),
  arrowRightPurple: asset("arrow-right-purple.svg"),
  arrowRightWhite: asset("arrow-right-white.svg"),
  tagHatch: asset("tag-hatch.svg"),
  tagFuel: asset("tag-fuel.svg"),
  tagEngine: asset("tag-engine.svg"),
  tagCalendar: asset("tag-calendar.svg"),
  tagGear: asset("tag-gear.svg"),
};

export const productMenu = [
  {
    label: "LM Frotas",
    href: "https://lmmobilidade.com.br/lmfrotas/",
    logo: asset("logo-lm-frotas.svg"),
    width: 123,
    height: 29,
    alt: "LM Frotas",
  },
  {
    label: "LM AssineCar",
    href: "https://lmmobilidade.com.br/lmassinecar/",
    logo: asset("logo-lm-assinecar.svg"),
    width: 149,
    height: 30,
    alt: "LM AssineCar",
  },
  {
    label: "LM Veículos para Apps",
    href: "https://lmmobilidade.com.br/lmveiculosapps/",
    logo: asset("logo-lm-apps.svg"),
    width: 146,
    height: 31,
    alt: "LM Veículos para Apps",
  },
  {
    label: "LM Seminovos",
    href: "https://lmmobilidade.com.br/lmseminovos/",
    logo: asset("logo-lm-seminovos.png"),
    width: 150,
    height: 28,
    alt: "LM Seminovos",
  },
];

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
    media: [{ src: asset("vehicle-haval.png"), className: "vehicle-image--haval-main", width: 330, height: 224 }],
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
    icon: asset("how-icon-car-check.svg"),
    title: "1. Escolha o carro ideal",
    highlight: "Encontre o modelo",
    text: "que combina com sua rotina e estilo de vida.",
  },
  {
    icon: asset("how-icon-filter.svg"),
    title: "2. Defina um plano",
    highlight: "Defina prazo e quilometragem",
    text: "de acordo com a sua necessidade.",
  },
  {
    icon: asset("how-icon-chat.svg"),
    title: "3. Conte com um processo simples",
    highlight: "Entraremos em contato com você",
    text: "para resolver tudo no conforto da sua casa.",
  },
  {
    icon: asset("how-icon-pin.svg"),
    title: "4. Retire e dirija",
    highlight: "Retire seu veículo",
    text: "e aproveite a experiência com mais comodidade.",
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
  {
    question: "O que está incluso na assinatura do carro?",
    answer:
      "A mensalidade reúne os principais custos do veículo, como IPVA, licenciamento, documentação, seguro, manutenção preventiva e assistência 24h. Alguns planos também podem prever carro reserva em caso de sinistro, conforme as condições contratadas.",
  },
  {
    question: "Como funciona a assinatura de veículos?",
    answer:
      "Você escolhe o modelo, define prazo e franquia de quilometragem, passa pela análise de crédito e paga uma mensalidade fixa para usar o carro. Ao final do contrato, pode renovar, devolver ou avaliar a compra do veículo, conforme disponibilidade e contrato.",
  },
  {
    question: "Quais documentos preciso para contratar?",
    answer:
      "A contratação passa por análise de crédito e a documentação pode variar conforme pessoa física, empresa, oferta e perfil. Depois da simulação, a equipe da LM informa os dados e documentos necessários para seguir com a proposta.",
  },
  {
    question: "Posso escolher o prazo e a quilometragem do plano?",
    answer:
      "Sim. Os planos variam por modelo e oferta, com opções de prazo e franquia mensal de quilometragem. A recomendação é escolher a franquia conforme sua rotina para evitar cobrança por quilômetros excedentes.",
  },
  {
    question: "A manutenção do veículo está inclusa?",
    answer:
      "A manutenção preventiva está inclusa, seguindo as condições do plano e as recomendações do fabricante. Itens decorrentes de mau uso, desgaste severo, avarias ou serviços fora da cobertura podem ser cobrados à parte.",
  },
  {
    question: "O seguro e o IPVA já estão inclusos na mensalidade?",
    answer:
      "Sim. A assinatura contempla custos como IPVA, documentação/licenciamento e seguro. Em caso de sinistro, pode haver franquia ou coparticipação prevista em contrato.",
  },
  {
    question: "Como funciona a retirada do veículo?",
    answer:
      "Após aprovação, assinatura do contrato e disponibilidade do modelo, a LM orienta os próximos passos para entrega ou retirada. Os prazos variam conforme veículo, estoque e região.",
  },
  {
    question: "Posso devolver o carro antes do fim do contrato?",
    answer:
      "Pode, mas a devolução antecipada pode gerar multa ou cobrança prevista em contrato. Antes de contratar, vale escolher um prazo alinhado ao seu momento de vida para evitar custos de cancelamento.",
  },
  {
    question: "O que acontece se eu ultrapassar a quilometragem contratada?",
    answer:
      "A quilometragem é definida no contrato. Se houver excedente, a cobrança adicional por quilômetro pode ser apurada na devolução ou conforme as regras do plano contratado.",
  },
  {
    question: "Quanto tempo leva para eu receber o carro?",
    answer:
      "O prazo depende do modelo, estoque, aprovação e região de entrega. Nas condições comerciais publicadas, há ofertas com prazos como 15 dias para SP/ABC e 30 a 45 dias para outras regiões, variando por campanha e veículo.",
  },
];
