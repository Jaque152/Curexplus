"use client";

import { useLanguage } from "@/context/language-context";

const content = {
  es: {
    title: "Aviso de Privacidad",
    subtitle: "AVISO DE PRIVACIDAD – CRM CODE RIGHT MEDICAL, S.A. DE C.V.",
    sections: [
      {
        title: "1) ¿Quién es el responsable de tus datos?",
        body: "El responsable del tratamiento de tus datos personales es CRM CODE RIGHT MEDICAL, S.A. DE C.V., con domicilio en Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Entidad Federativa Ciudad de México.\n\nPuedes contactarnos en el correo atencion@curexplus.com y en el teléfono +52 1 55 5204 4092 para cualquier asunto relacionado con este Aviso de Privacidad. Este documento se emite conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento."
      },
      {
        title: "2) ¿Qué datos personales te pedimos?",
        body: "Cuando navegas por nuestro sitio y compras en línea en curexplus.com:\n● Datos de identificación: nombre completo, razón social (si facturas a empresa), RFC.\n● Datos de contacto: correo electrónico, teléfono, dirección de envío y, en su caso, dirección de facturación.\n● Datos de pago: información necesaria para procesar el cobro con tarjeta a través de un agregador de pagos autorizado (nosotros no almacenamos la información completa de tu tarjeta).\n● Datos de navegación: dirección IP, tipo de navegador, páginas visitadas, fecha y hora de acceso, cookies u otros identificadores en línea.\n\nEn principio no solicitamos datos personales sensibles. Si por cualquier motivo nos compartes información sobre tu estado de salud para orientarte sobre insumos, la trataremos con especial cuidado y, de ser necesario, te pediremos un consentimiento expreso adicional."
      },
      {
        title: "3) ¿Para qué usamos tu información?",
        body: "Usamos tus datos principalmente para:\n● Procesar tus pedidos de insumos y equipo médico: confirmar la compra, cobrar, preparar el pedido y enviarlo a tu domicilio.\n● Gestionar pagos con tarjeta a través de un agregador de pagos autorizado y prevenir fraudes.\n● Emitir facturas electrónicas (CFDI) cuando lo solicites y proporciones tus datos fiscales.\n● Atender dudas, aclaraciones, quejas, garantías, devoluciones y reembolsos.\n● Cumplir obligaciones legales, fiscales y de facturación.\n\nDe forma secundaria, podemos usar tu información para:\n● Enviarte promociones, noticias de productos, lanzamientos o descuentos relacionados con insumos y equipo médico.\n● Hacer estadísticas y análisis internos para mejorar el catálogo, la experiencia de compra y el servicio.\n\nSi no quieres recibir comunicaciones promocionales, puedes pedirlo en cualquier momento escribiendo a atencion@curexplus.com o usando el enlace para cancelar suscripción que venga en nuestros correos."
      },
      {
        title: "4) ¿Con quién compartimos tus datos?",
        body: "Solo compartimos tus datos personales con terceros que necesitamos para darte el servicio, por ejemplo:\n● El agregador de pagos autorizado, para procesar el cobro con tarjeta de crédito o débito.\n● Empresas de paquetería y mensajería, para entregar tus pedidos en la dirección que nos indiques.\n● Proveedores de servicios tecnológicos (hosting, correo, sistemas) que nos apoyan en la operación del sitio.\n● Asesores externos y autoridades, cuando la ley lo exige (por ejemplo, temas fiscales o de protección al consumidor).\n\nEstos terceros solo pueden usar tus datos siguiendo nuestras instrucciones y para las finalidades señaladas, y deben protegerlos con medidas de seguridad adecuadas.\n\nSi llegáramos a hacer alguna transferencia adicional que requiera tu consentimiento, te lo informaremos y te pediremos autorización previa."
      },
      {
        title: "5) ¿Qué pasa con tus datos de pago?",
        body: "Los pagos con tarjeta se procesan mediante un agregador de pagos autorizado, que cuenta con su propia plataforma segura y sus propias políticas de privacidad y seguridad.\n\nNosotros no almacenamos en nuestros servidores la información completa de tu tarjeta; el tratamiento detallado de esos datos se realiza directamente en la pasarela de pagos, bajo estándares de seguridad bancarios."
      },
      {
        title: "6) ¿Qué derechos tienes sobre tus datos?",
        body: "Tienes derecho a: Acceder a tus datos personales que tenemos; Rectificar datos que sean inexactos o estén incompletos; Cancelar tus datos cuando consideres que no se requieren para las finalidades indicadas, o se hayan usado indebidamente; Oponerte al tratamiento de tus datos para finalidades específicas, como publicidad y Revocar tu consentimiento para el tratamiento de tus datos, en la medida que la ley lo permita.\n\nPara ejercer estos derechos, envía una solicitud a atencion@curexplus.com indicando (i) Tu nombre completo; (ii) Un medio para contactarte (correo o domicilio); (iii) Una copia de tu identificación oficial y (iv) Qué derecho quieres ejercer y sobre qué datos.\n\nTe responderemos dentro de los plazos que marca la ley, indicándote si tu solicitud procede y cómo se hará efectiva."
      },
      {
        title: "7) ¿Usamos cookies y tecnologías similares?",
        body: "Sí. Nuestro sitio utiliza cookies y tecnologías similares para: Recordar tu carrito y tus preferencias, mejorar el funcionamiento del sitio, analizar qué secciones se visitan más y entender mejor el uso de la tienda, en algunos casos, mostrar publicidad más acorde a tus intereses.\n\nPuedes configurar tu navegador para bloquear o eliminar cookies; sin embargo, algunas funciones del sitio podrían dejar de funcionar correctamente si lo haces."
      },
      {
        title: "8) ¿Cómo protegemos tu información?",
        body: "Aplicamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra accesos no autorizados, pérdida, alteración o destrucción.\n\nEjemplos de estas medidas son: controles de acceso, uso de conexiones seguras (como protocolos de cifrado), políticas internas de protección de datos y acuerdos de confidencialidad con el personal y proveedores que tienen acceso a la información."
      },
      {
        title: "9) ¿Puede cambiar este Aviso de Privacidad?",
        body: "Sí. Podemos actualizar este Aviso de Privacidad cuando cambie la ley, nuestros procesos internos o los servicios que ofrecemos.\n\nCuando haya cambios importantes, publicaremos la versión actualizada en el sitio e indicaremos la fecha de la última modificación. Te recomendamos revisar este documento periódicamente."
      },
      {
        title: "10) ¿Cómo nos contactas para temas de privacidad?",
        body: "Si tienes dudas, quieres ejercer tus derechos o necesitas más información sobre cómo usamos tus datos, puedes escribirnos a:\n● Correo electrónico: atencion@curexplus.com\n● Teléfono: +52 1 55 5204 4092\n● Domicilio: Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Entidad Federativa Ciudad de México."
      }
    ]
  },
  en: {
    title: "Privacy Notice",
    subtitle: "PRIVACY NOTICE – CRM CODE RIGHT MEDICAL, S.A. DE C.V.",
    sections: [
      {
        title: "1) Who is responsible for your data?",
        body: "The entity responsible for processing your personal data is CRM CODE RIGHT MEDICAL, S.A. DE C.V., located at Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Mexico City.\n\nYou can contact us at atencion@curexplus.com and at +52 1 55 5204 4092 for any matter related to this Privacy Notice. This document is issued in accordance with the Federal Law on Protection of Personal Data Held by Private Parties and its Regulations."
      },
      {
        title: "2) What personal data do we ask for?",
        body: "When you browse our site and shop online at curexplus.com:\n● Identification data: full name, company name (if invoicing a company), RFC (Tax ID).\n● Contact data: email, phone, shipping address and, if applicable, billing address.\n● Payment data: information necessary to process card payments through an authorized payment aggregator (we do not store your full card information).\n● Browsing data: IP address, browser type, pages visited, access date and time, cookies, or other online identifiers.\n\nIn principle, we do not request sensitive personal data. If for any reason you share information about your health status to guide you on supplies, we will treat it with special care and, if necessary, request additional express consent."
      },
      {
        title: "3) What do we use your information for?",
        body: "We use your data primarily to:\n● Process your medical equipment and supplies orders: confirm the purchase, charge, prepare the order, and send it to your home.\n● Manage card payments through an authorized payment aggregator and prevent fraud.\n● Issue electronic invoices (CFDI) when requested and you provide your tax data.\n● Address doubts, clarifications, complaints, warranties, returns, and refunds.\n● Comply with legal, tax, and billing obligations.\n\nSecondarily, we may use your information to:\n● Send you promotions, product news, launches, or discounts related to medical equipment and supplies.\n● Make internal statistics and analyses to improve the catalog, shopping experience, and service.\n\nIf you do not want to receive promotional communications, you can request it at any time by writing to atencion@curexplus.com or using the unsubscribe link in our emails."
      },
      {
        title: "4) Who do we share your data with?",
        body: "We only share your personal data with third parties we need to provide the service, for example:\n● The authorized payment aggregator, to process credit or debit card charges.\n● Parcel and courier companies, to deliver your orders to the address you indicate.\n● Technology service providers (hosting, email, systems) that support us in operating the site.\n● External advisors and authorities, when required by law (for example, tax or consumer protection issues).\n\nThese third parties can only use your data following our instructions and for the stated purposes, and must protect them with appropriate security measures.\n\nIf we were to make any additional transfer that requires your consent, we will inform you and request prior authorization."
      },
      {
        title: "5) What happens to your payment data?",
        body: "Card payments are processed through an authorized payment aggregator, which has its own secure platform and its own privacy and security policies.\n\nWe do not store your full card information on our servers; the detailed processing of that data is carried out directly on the payment gateway, under banking security standards."
      },
      {
        title: "6) What rights do you have over your data?",
        body: "You have the right to: Access your personal data that we have; Rectify data that is inaccurate or incomplete; Cancel your data when you consider that it is not required for the indicated purposes, or has been used improperly; Oppose the processing of your data for specific purposes, such as advertising, and Revoke your consent for the processing of your data, to the extent permitted by law.\n\nTo exercise these rights, send a request to atencion@curexplus.com indicating (i) Your full name; (ii) A means to contact you (email or address); (iii) A copy of your official identification and (iv) What right you want to exercise and over what data.\n\nWe will respond within the timeframes established by law, indicating if your request is valid and how it will be made effective."
      },
      {
        title: "7) Do we use cookies and similar technologies?",
        body: "Yes. Our site uses cookies and similar technologies to: Remember your cart and preferences, improve site performance, analyze which sections are visited most and better understand the use of the store, and in some cases, show advertising more according to your interests.\n\nYou can configure your browser to block or delete cookies; however, some site functions may stop working properly if you do so."
      },
      {
        title: "8) How do we protect your information?",
        body: "We apply administrative, technical, and physical security measures to protect your personal data against unauthorized access, loss, alteration, or destruction.\n\nExamples of these measures are: access controls, use of secure connections (such as encryption protocols), internal data protection policies, and confidentiality agreements with staff and providers who have access to the information."
      },
      {
        title: "9) Can this Privacy Notice change?",
        body: "Yes. We may update this Privacy Notice when the law, our internal processes, or the services we offer change.\n\nWhen there are important changes, we will publish the updated version on the site and indicate the date of the last modification. We recommend reviewing this document periodically."
      },
      {
        title: "10) How to contact us for privacy issues?",
        body: "If you have questions, want to exercise your rights, or need more information about how we use your data, you can write to us at:\n● Email: atencion@curexplus.com\n● Phone: +52 1 55 5204 4092\n● Address: Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Mexico City."
      }
    ]
  }
};

export default function PrivacidadPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main className="bg-bone pt-32 pb-24 min-h-screen">
      <div className="container-tight max-w-4xl rounded-3xl bg-paper p-8 shadow-sm sm:p-14">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-clay">{t.subtitle}</p>

        <div className="mt-12 space-y-10">
          {t.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="font-display text-xl text-ink">{section.title}</h2>
              <p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground text-[0.95rem]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}