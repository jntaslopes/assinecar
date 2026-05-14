"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import {
  advantages,
  assets,
  cars,
  faqs,
  includedBenefits,
  steps,
  stripBenefits,
} from "@/data/landing";

export function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BenefitStrip />
        <VehicleSection />
        <HowItWorks />
        <Advantages />
        <FaqSection />
        <ConsultantCta />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <Image src={assets.logo} alt="LM AssineCar" width={110} height={22} priority />
        <button className="brand-drop" type="button" aria-label="Abrir opções da marca">
          <Image src={assets.angleDown} alt="" width={11} height={14} />
        </button>
      </div>
      <nav className="main-nav" aria-label="Navegação principal">
        <span>Veículos Disponíveis</span>
        <span>Como Funciona</span>
        <span>Dúvidas Frequentes</span>
      </nav>
      <div className="header-actions">
        <span className="primary-button">Montar um plano</span>
        <span className="client-link">
          <Image src={assets.user} alt="" width={14} height={16} />
          Já sou cliente
        </span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1>
          Novo <span>Haval H6 GT</span>
          <strong>0km por assinatura</strong>
        </h1>
        <p>Não é financiamento: seguro, manutenção e documentação inclusos.</p>
        <div className="hero-price">
          <span>R$</span>
          <strong>5.689</strong>
          <em>/mês</em>
        </div>
        <small>No plano de 36 meses / 500km</small>
        <div className="hero-ctas">
          <a className="primary-button" href="#veiculos">
            Simular meu plano
          </a>
          <a className="secondary-button" href="#como-funciona">
            Entender como funciona
          </a>
        </div>
        <p className="legal">*Oferta limitada conforme disponibilidade. Consulte condições comerciais</p>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <Image className="hero-shape shape-a" src={assets.heroShapeA} alt="" width={621} height={342} priority />
        <Image className="hero-shape shape-b" src={assets.heroShapeB} alt="" width={621} height={342} priority />
        <Image className="hero-car car-a" src={assets.heroCarA} alt="" width={708} height={472} priority />
        <Image className="hero-plate" src={assets.plateHero} alt="" width={61} height={30} priority />
      </div>
      <aside className="included-card">
        <strong>Tudo incluso para você dirigir</strong>
        {includedBenefits.map((benefit) => (
          <span key={benefit.label}>
            <Image src={benefit.icon} alt="" width={24} height={24} />
            {benefit.label}
          </span>
        ))}
      </aside>
    </section>
  );
}

function BenefitStrip() {
  return (
    <section className="benefit-strip" aria-label="Benefícios inclusos">
      <div>
        {stripBenefits.map((benefit) => (
          <span key={benefit.label}>
            <Image src={benefit.icon} alt="" width={36} height={36} />
            {benefit.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function VehicleSection() {
  const [slide, setSlide] = useState(0);
  const shift = slide === 0 ? "-175px" : "-350px";
  const tabletShift = slide === 0 ? "-114px" : "-228px";
  const mobileShift = slide === 0 ? "-40px" : "-68px";

  return (
    <section className="vehicles-section" id="veiculos">
      <h2>
        <span>Escolha</span> seu próximo carro por assinatura
      </h2>
      <div className="vehicle-gallery">
        <div className="vehicle-window">
          <div
            className="vehicle-track"
            style={
              {
                "--vehicle-shift": shift,
                "--vehicle-tablet-shift": tabletShift,
                "--vehicle-mobile-shift": mobileShift,
              } as CSSProperties & {
                "--vehicle-shift": string;
                "--vehicle-tablet-shift": string;
                "--vehicle-mobile-shift": string;
              }
            }
          >
            {cars.map((car) => (
              <article className="vehicle-card" key={car.slug}>
                <div className="vehicle-media">
                  {car.media.map((layer) => (
                    <Image
                      className={layer.className}
                      src={layer.src}
                      alt=""
                      width={layer.width}
                      height={layer.height}
                      loading="eager"
                      key={layer.src}
                    />
                  ))}
                  <Image
                    className={car.plate.className}
                    src={car.plate.src}
                    alt=""
                    width={car.plate.width}
                    height={car.plate.height}
                    loading="eager"
                  />
                </div>
                <div className="vehicle-content">
                  <div className="tags">
                    <span aria-hidden="true" className="vehicle-divider" />
                    {car.tags.map((tag) => (
                      <span className="vehicle-tag" key={tag.label}>
                        <Image src={tag.icon} alt="" width={16} height={16} />
                        {tag.label}
                      </span>
                    ))}
                    <span aria-hidden="true" className="vehicle-divider" />
                  </div>
                  <div className="vehicle-title">
                    <h3>{car.title}</h3>
                    <p>{car.description}</p>
                  </div>
                  <div className="vehicle-price">
                    <p>A partir de</p>
                    <div className="card-price">
                      <strong>R$ {car.price}</strong>
                      <span>/ mês</span>
                    </div>
                  </div>
                  <a className="outline-button" href="#atendimento">
                    Ver Detalhes
                  </a>
                </div>
              </article>
            ))}
          </div>
          <button
            className="vehicle-arrow vehicle-arrow--left"
            type="button"
            aria-label="Ver carros anteriores"
            onClick={() => setSlide((current) => (current === 0 ? 1 : 0))}
          >
            <Image src={assets.arrowLeftPurple} alt="" width={24} height={24} />
          </button>
          <button
            className="vehicle-arrow vehicle-arrow--right"
            type="button"
            aria-label="Ver próximos carros"
            onClick={() => setSlide((current) => (current === 0 ? 1 : 0))}
          >
            <Image src={assets.arrowRightPurple} alt="" width={24} height={24} />
          </button>
        </div>
      </div>
      <a className="primary-button catalog-button" href="#atendimento">
        Ver todos os veiculos disponíveis
        <Image src={assets.arrowRightWhite} alt="" width={24} height={24} />
      </a>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona">
      <div className="how-copy">
        <div className="how-heading">
          <h2>
            <span>Assine com praticidade</span> e sem complicação
          </h2>
          <p>
            Escolha o carro ideal e tenha tudo em uma mensalidade fixa.
            <br />
            Sem se preocupar com IPVA, seguro, manutenção ou revenda.
          </p>
        </div>
        <ol className="how-steps">
          {steps.map((step) => (
            <li key={step.title}>
              <span className="how-step-icon">
                <Image src={step.icon} alt="" width={40} height={40} />
              </span>
              <span className="how-step-copy">
                <strong>{step.title}</strong>
                <span>
                  <b>{step.highlight}</b> {step.text}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <a className="primary-button how-button" href="#veiculos">
          Escolher meu veículo
        </a>
      </div>
      <div className="how-visual" aria-hidden="true">
        <Image src={assets.howVisual} alt="" width={642} height={599} loading="eager" />
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section className="advantages-section">
      <h2>
        Vantagens de escolher um <span>carro por assinatura</span>
      </h2>
      <p>Tenha o carro que combina com sua rotina sem se preocupar com burocracia.</p>
      <div className="advantages-grid">
        <div className="phone-panel">
          <Image src={assets.heroCarTrimmed} alt="" width={420} height={280} loading="eager" />
          <Image src={assets.logo} alt="LM AssineCar" width={142} height={28} loading="eager" />
        </div>
        {advantages.map((item) => (
          <article key={item.title}>
            <Image src={item.icon} alt="" width={28} height={28} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="confidence-panel">
        <Image src={assets.ctaPhotoB} alt="" width={658} height={370} loading="eager" />
        <div>
          <h3>Confiança de quem entende de mobilidade</h3>
          <p>A LM Mobilidade oferece planos para pessoas e empresas com atendimento especializado.</p>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="faq-section" id="duvidas">
      <div className="faq-heading">
        <div className="faq-heading-copy">
          <Image src={assets.faqHelp} alt="" width={64} height={64} />
          <h2>
            Dúvidas
            <span>Frequentes</span>
          </h2>
          <p>Confira as perguntas frequentes ao lado. Se ainda precisar de ajuda, entre em contato com a gente.</p>
        </div>
        <a className="secondary-button" href="#atendimento">
          Ver todas as perguntas frequentes
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className={open === index ? "faq-item is-open" : "faq-item"} key={faq.question}>
            <button
              type="button"
              aria-expanded={open === index}
              onClick={() => setOpen(open === index ? -1 : index)}
            >
              {faq.question}
              <Image
                className="faq-arrow"
                src={assets.faqArrowDown}
                alt=""
                width={10}
                height={7}
              />
            </button>
            {open === index ? (
              <p>{faq.answer}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function ConsultantCta() {
  return (
    <section className="consultant-section" id="atendimento">
      <div className="consultant-card">
        <Image
          className="consultant-photo photo-a"
          src={assets.ctaPhotoA}
          alt=""
          width={713}
          height={475}
          loading="eager"
        />
        <Image
          className="consultant-photo photo-b"
          src={assets.ctaPhotoB}
          alt=""
          width={658}
          height={370}
          loading="eager"
        />
        <div>
          <h2>Ficou alguma dúvida?</h2>
          <h3>A gente te ajuda a decidir com segurança</h3>
          <p>
            Nossa equipe te ajuda a entender as opções disponíveis, comparar veículos e escolher
            a assinatura que faz mais sentido para você.
          </p>
          <a className="primary-button" href="tel:08000755050">
            <Image src={assets.headphones} alt="" width={20} height={20} />
            Falar com um Consultor
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-contact">
          <div className="footer-contact-main">
            <div className="footer-contact-heading">
              <h2>Atendimento</h2>
              <a className="phone" href="tel:08000755050">
                <Image src={assets.whatsapp} alt="" width={24} height={24} />
                0800 075 5050
              </a>
            </div>
            <div className="footer-contact-hours">
              <p>Segunda a sexta-feira, das 7h às 18h.</p>
              <p>Atendimento 24h para assistência, furto ou roubo.</p>
            </div>
          </div>
          <small>
            Dentro dos nossos meios de atendimento, você precisará fornecer seus dados pessoais para
            prosseguir no atendimento. Para entender como tratamos essas informações e como nos
            preocupamos com a privacidade de nossos parceiros, leia nossa{" "}
            <strong>Política de Privacidade</strong>.
          </small>
        </div>
        <div className="footer-link-groups">
          <nav className="footer-link-group" aria-label="Produtos LM">
            <strong>Produtos LM</strong>
            <a>LM Frotas</a>
            <a>LM Assinecar</a>
            <a>LM Seminovos</a>
            <a>LM Veículos para Apps</a>
            <a>LM AssineTruck</a>
          </nav>
          <nav className="footer-link-group wide-links" aria-label="A LM Mobilidade">
            <strong>A LM Mobilidade</strong>
            <div className="footer-link-columns">
              <a>Site Principal</a>
              <a>Quem Somos</a>
              <a>Nossa História</a>
              <a>Onde estamos</a>
              <a>Investidores</a>
              <a>Integridade</a>
              <a>Fornecedores</a>
              <a>Portal do Cliente</a>
              <a>Trabalhe Conosco</a>
              <a>Central de satisfação do Cliente</a>
            </div>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand-column">
          <div className="footer-brand-main">
            <Image src={assets.footerLogo} alt="LM Mobilidade" width={121} height={20} />
            <p>2025 - Todos os Direitos Reservados</p>
          </div>
          <div className="policy-row">
            <a>Política de privacidade</a>
            <a>Política de Cookies</a>
            <a>Condições Comerciais</a>
          </div>
          <div className="badges">
            <Image src={assets.badgeA} alt="" width={86} height={40} />
            <Image src={assets.badgeB} alt="" width={93} height={26} />
            <Image src={assets.badgeC} alt="" width={34} height={58} />
          </div>
        </div>
        <div className="footer-social-column">
          <strong>Siga as redes da LM:</strong>
          <div className="socials">
            <Image src={assets.youtube} alt="YouTube" width={24} height={24} />
            <Image src={assets.instagram} alt="Instagram" width={24} height={24} />
            <Image src={assets.linkedin} alt="LinkedIn" width={24} height={24} />
          </div>
          <p>
            Você está sendo redirecionado(a) para uma página externa, que contém seus próprios
            termos e condições de uso e avisos de privacidade. A LM não é responsável pelo conteúdo
            ou pelas práticas de privacidade da página de destino.
          </p>
        </div>
      </div>
    </footer>
  );
}
