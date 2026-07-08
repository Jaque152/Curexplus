"use client";

import { useLanguage } from "@/context/language-context";

const content = {
  es: {
    title: "Términos y condiciones",
    subtitle: "CONDICIONES GENERALES DE USO Y DE CONTRATACIÓN EN LÍNEA – CRM CODE RIGHT MEDICAL, S.A. DE C.V.",
    sections: [
      {
        title: "I. Quién presta el servicio",
        body: "La prestación de los servicios de comercio electrónico y la venta de productos a través del sitio web curexplus.com corre a cargo de la sociedad mercantil denominada CRM CODE RIGHT MEDICAL, S.A. DE C.V., con domicilio en Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Entidad Federativa Ciudad de México.\n\nPara cualquier comunicación relacionada con estas Condiciones puedes escribir a atencion@curexplus.com o llamar al número +52 1 55 5204 4092.\n\nAl acceder al sitio web o realizar una compra, el usuario (en adelante, el “Cliente”) reconoce que ha leído, entendido y aceptado íntegramente estas Condiciones Generales."
      },
      {
        title: "II. Qué tipo de tienda es y qué se vende",
        body: "El sitio web funciona como una tienda en línea que permite al Cliente adquirir productos de salud y equipo médico para uso domiciliario, profesional o institucional.\n\nSin limitar, el catálogo puede incluir: ayudas para baño, artículos de movilidad (andaderas, bastones, sillas), soluciones para habitación del paciente (camas, colchones, sillones, mesas), dispositivos de monitoreo, aspiradores, desfibriladores, mobiliario y otros insumos relacionados con el cuidado de la salud.\n\nEl catálogo, las características técnicas y la disponibilidad pueden modificarse en cualquier momento, sin necesidad de previo aviso."
      },
      {
        title: "III. Reglas básicas para usar el sitio",
        body: "1. El Cliente declara ser mayor de edad y tener capacidad legal para contratar conforme a la legislación mexicana.\n2. El uso del sitio debe realizarse únicamente con fines lícitos y para adquirir productos de forma legítima.\n3. No está permitido utilizar datos falsos, suplantar identidades, intentar vulnerar la seguridad del sitio ni realizar actividades que puedan considerarse fraudulentas.\n4. El prestador del servicio puede negar el acceso o cancelar pedidos cuando detecte conductas anómalas, incumplimientos a estas Condiciones o riesgos de fraude."
      },
      {
        title: "IV. Presentación de productos, precios y moneda",
        body: "Los productos se muestran con una descripción básica o detallada, especificaciones técnicas relevantes, y, cuando aplique, imágenes de referencia.\n\nEstas imágenes son ilustrativas, por lo que podría existir una ligera diferencia entre la fotografía y el producto físico, sin que ello implique necesariamente un defecto.\n\nTodos los importes indicados en el sitio se expresan en pesos mexicanos (MXN) e incluyen el Impuesto al Valor Agregado (IVA), salvo que se indique expresamente lo contrario.\n\nLos precios, promociones, costos de envío y disponibilidad de productos son válidos únicamente mientras aparezcan publicados y pueden variarse en cualquier momento.\n\nEl precio que se aplicará a una compra es el que se muestre en el momento en que el Cliente confirme el pedido en la sección de pago.\n\nEn caso de errores evidentes de publicación (por ejemplo, un precio claramente irreal debido a un fallo técnico), la empresa se reserva el derecho de anular el pedido y reembolsar cualquier cantidad pagada, informando al Cliente de la situación."
      },
      {
        title: "V. Formas de pago y agregador de pagos",
        body: "Solo se aceptan las siguientes formas de pago en línea: Tarjetas de crédito y de débito emitidas por instituciones financieras autorizadas en México.\n\nEl sitio no procesa directamente los pagos bancarios; éstos se canalizan a través de un agregador de pagos autorizado, que actúa como intermediario entre el Cliente, la empresa y las instituciones financieras emisoras de las tarjetas.\n\nEl uso de la pasarela de pago implica la aceptación de las condiciones y políticas de privacidad del agregador de pagos, que son independientes de las de esta tienda.\n\nLa información sensible de la tarjeta se gestiona en dicha plataforma, conforme a los estándares de seguridad aplicables.\n\nLa empresa puede efectuar verificaciones de seguridad adicionales y, en caso de identificar operaciones sospechosas, inconsistencias o riesgos, podrá cancelar la transacción y, en su caso, ordenar el reembolso correspondiente por el mismo medio de pago."
      },
      {
        title: "VI. Facturación",
        body: "Si el Cliente requiere factura electrónica (CFDI), deberá solicitarla dentro del plazo que se indique en el sitio o en la confirmación de compra, proporcionando de forma completa y correcta sus datos fiscales (nombre o razón social, RFC, domicilio fiscal, uso de CFDI, etc.).\n\nLa factura se generará con base en la información que el Cliente proporcione.\n\nLa empresa no será responsable de errores en datos fiscales derivados de información incorrecta o incompleta."
      },
      {
        title: "VII. Envío, entrega y transmisión del riesgo",
        body: "Los pedidos se envían mediante empresas de paquetería o mensajería seleccionadas por la empresa, con cobertura dentro de la República Mexicana.\n\nDurante el proceso de compra se indicará un plazo estimado de entrega y el costo de envío correspondiente.\n\nLos tiempos de entrega son aproximados y pueden variar por factores como: ubicación del destino, disponibilidad logística, periodos de alta demanda, condiciones climáticas, restricciones de autoridades o cualquier otro evento ajeno al control razonable de la empresa.\n\nLa entrega se considerará realizada cuando la paquetería ponga el producto a disposición del Cliente en el domicilio indicado y obtenga el acuse de recibo correspondiente (firma, registro electrónico, fotografía u otro medio que use la empresa de mensajería).\n\nA partir de ese momento, el riesgo de pérdida o daño se transmite al Cliente.\n\nSe recomienda que, al momento de recibir el paquete, el Cliente revise el estado externo del embalaje y, si detecta daños visibles, lo haga constar con el repartidor y conserve evidencia (por ejemplo, fotografías), además de reportarlo a la empresa dentro del plazo previsto en la política de devoluciones."
      },
      {
        title: "VIII. Disponibilidad de inventario y sustituciones",
        body: "Todos los pedidos están condicionados a la disponibilidad de producto.\n\nSi después de confirmar un pedido se detecta que el artículo no se encuentra en inventario o ha sido descontinuado, la empresa podrá proponer un producto alternativo de características similares, u ofrecer el reembolso total del monto pagado por dicho producto, informando oportunamente al Cliente para que decida."
      },
      {
        title: "IX. Devoluciones, cambios y reembolsos",
        body: "Las reglas específicas sobre plazos, requisitos, costos de envío, productos no retornables y modalidades de reembolso se encuentran desarrolladas en la Política de Reembolsos y Devoluciones, disponible en el sitio web y que forma parte de estas Condiciones.\n\nEn todo caso, se respetarán los derechos que la Ley Federal de Protección al Consumidor reconoce a los compradores en operaciones a distancia, especialmente cuando el producto presente defectos de origen, no corresponda a lo ofrecido o llegue dañado."
      },
      {
        title: "X. Uso de productos médicos y responsabilidad del Cliente",
        body: "Gran parte del catálogo está compuesto por equipos y dispositivos relacionados con la salud.\n\nEl Cliente es responsable de verificar que el producto sea adecuado para su situación particular y, cuando corresponda, de consultar a un profesional de la salud antes de su utilización.\n\nEl Cliente se compromete a seguir las instrucciones de uso, instalación, mantenimiento y seguridad proporcionadas por el fabricante o incluidas en el empaque, manuales o fichas técnicas.\n\nLa empresa no realiza diagnósticos ni prescripciones médicas y no asume responsabilidad por decisiones de salud tomadas únicamente con base en la información del sitio o por el uso incorrecto de los productos.\n\nCualquier daño derivado de una utilización adecuada, alteración, falta de mantenimiento o instalación deficiente es responsabilidad del Cliente."
      },
      {
        title: "XI. Contenidos del sitio y derechos de autor",
        body: "Los textos, diseños, logotipos, imágenes, fotografías, fichas técnicas, elementos gráficos y demás contenidos publicados en el sitio son propiedad de la empresa o de terceros que han autorizado su uso, y se encuentran protegidos por la legislación aplicable en materia de propiedad intelectual e industrial.\n\nEl Cliente puede consultar el contenido únicamente con fines informativos y para realizar compras.\n\nNo se autoriza la copia, reproducción, modificación, distribución o explotación comercial de dichos contenidos sin autorización previa y por escrito del titular correspondiente.\n\nEl sitio puede contener enlaces a páginas de terceros (por ejemplo, fabricantes, entidades financieras o el propio agregador de pagos).\n\nEsos sitios son independientes, están regidos por sus propios términos y políticas, y la empresa no es responsable del contenido ni de las prácticas de dichos terceros."
      },
      {
        title: "XII. Datos personales y confidencialidad",
        body: "Los datos personales que el Cliente proporcione durante la navegación o la realización de compras serán tratados de conformidad con lo establecido en el Aviso de Privacidad publicado en /privacidad.\n\nEn dicho documento se especifica qué datos se recaban, con qué finalidades se usan, con quién pueden compartirse y cuáles son los mecanismos para ejercer los derechos ARCO.\n\nEl uso del sitio y la realización de pedidos implican la aceptación del tratamiento de datos personales en los términos del Aviso de Privacidad."
      },
      {
        title: "XIII. Modificaciones de estas Condiciones y del sitio web",
        body: "La empresa puede introducir en cualquier momento cambios, ampliaciones o mejoras en el sitio web, así como modificar estas Condiciones Generales.\n\nLas versiones actualizadas se publicarán en el propio sitio e indicarán la fecha de entrada en vigor.\n\nLas operaciones realizadas con anterioridad se regirán por las condiciones vigentes al momento de su realización; el uso posterior del sitio se entenderá como aceptación de las nuevas condiciones."
      },
      {
        title: "XIV. Alcance de la responsabilidad de la empresa",
        body: "En la medida permitida por la ley, la responsabilidad máxima de la empresa frente al Cliente derivada de una compra específica se limitará al monto efectivamente pagado por el producto involucrado.\n\nLa empresa no será responsable por pérdidas de beneficios, interrupciones de actividad, daños indirectos, consecuenciales, punitivos o cualquier otro tipo de perjuicio que exceda el valor del producto adquirido, salvo que una disposición legal de carácter imperativo establezca lo contrario."
      },
      {
        title: "XV. Legislación aplicable y solución de controversias",
        body: "Las presentes Condiciones Generales, así como cualquier relación contractual derivada de compras realizadas en el sitio, se rigen por las leyes de los Estados Unidos Mexicanos.\n\nPara la interpretación y cumplimiento de estas Condiciones, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando desde ahora a cualquier otro fuero que pudiera corresponderles por razón de su domicilio presente o futuro.\n\nSin perjuicio de lo anterior, antes de acudir a instancias judiciales, la empresa y el Cliente procurarán resolver de buena fe cualquier desacuerdo mediante comunicación directa."
      }
    ]
  },
  en: {
    title: "Terms and Conditions",
    subtitle: "GENERAL CONDITIONS OF USE AND ONLINE CONTRACTING – CRM CODE RIGHT MEDICAL, S.A. DE C.V.",
    sections: [
      {
        title: "I. Who provides the service",
        body: "The provision of e-commerce services and the sale of products through the curexplus.com website is carried out by the commercial company named CRM CODE RIGHT MEDICAL, S.A. DE C.V., located at Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Mexico City.\n\nFor any communication related to these Conditions, you can write to atencion@curexplus.com or call +52 1 55 5204 4092.\n\nBy accessing the website or making a purchase, the user (hereinafter, the \"Customer\") acknowledges having read, understood, and fully accepted these General Conditions."
      },
      {
        title: "II. What kind of store it is and what is sold",
        body: "The website functions as an online store that allows the Customer to purchase health products and medical equipment for home, professional, or institutional use.\n\nWithout limitation, the catalog may include: bath aids, mobility items (walkers, canes, chairs), patient room solutions (beds, mattresses, recliners, tables), monitoring devices, aspirators, defibrillators, furniture, and other supplies related to health care.\n\nThe catalog, technical characteristics, and availability may be modified at any time, without prior notice."
      },
      {
        title: "III. Basic rules for using the site",
        body: "1. The Customer declares to be of legal age and have the legal capacity to contract under Mexican law.\n2. The use of the site must be for lawful purposes only and to acquire products legitimately.\n3. It is not permitted to use false data, impersonate identities, attempt to breach the site's security, or perform activities that could be considered fraudulent.\n4. The service provider may deny access or cancel orders when it detects anomalous behavior, breaches of these Conditions, or fraud risks."
      },
      {
        title: "IV. Product presentation, prices and currency",
        body: "Products are displayed with a basic or detailed description, relevant technical specifications, and, where applicable, reference images.\n\nThese images are illustrative, so there may be a slight difference between the photograph and the physical product, without this necessarily implying a defect.\n\nAll amounts indicated on the site are expressed in Mexican pesos (MXN) and include Value Added Tax (VAT), unless expressly stated otherwise.\n\nPrices, promotions, shipping costs, and product availability are valid only while published and may be changed at any time.\n\nThe price applied to a purchase is the one shown at the time the Customer confirms the order in the payment section.\n\nIn the event of obvious publication errors (for example, a clearly unrealistic price due to a technical glitch), the company reserves the right to cancel the order and refund any amount paid, informing the Customer of the situation."
      },
      {
        title: "V. Payment methods and payment aggregator",
        body: "Only the following online payment methods are accepted: Credit and debit cards issued by authorized financial institutions in Mexico.\n\nThe site does not directly process bank payments; these are channeled through an authorized payment aggregator, which acts as an intermediary between the Customer, the company, and the card-issuing financial institutions.\n\nThe use of the payment gateway implies acceptance of the payment aggregator's conditions and privacy policies, which are independent of those of this store.\n\nSensitive card information is managed on that platform, in accordance with applicable security standards.\n\nThe company may perform additional security checks and, if it identifies suspicious operations, inconsistencies, or risks, it may cancel the transaction and, where appropriate, order the corresponding refund through the same payment method."
      },
      {
        title: "VI. Billing",
        body: "If the Customer requires an electronic invoice (CFDI), they must request it within the period indicated on the site or in the purchase confirmation, providing completely and correctly their tax data (name or business name, RFC, tax address, CFDI use, etc.).\n\nThe invoice will be generated based on the information provided by the Customer.\n\nThe company will not be responsible for errors in tax data derived from incorrect or incomplete information."
      },
      {
        title: "VII. Shipping, delivery and transfer of risk",
        body: "Orders are shipped via parcel or courier companies selected by the company, with coverage within the Mexican Republic.\n\nDuring the purchase process, an estimated delivery time and the corresponding shipping cost will be indicated.\n\nDelivery times are approximate and may vary due to factors such as: destination location, logistical availability, high demand periods, weather conditions, authority restrictions, or any other event beyond the reasonable control of the company.\n\nDelivery will be considered complete when the courier makes the product available to the Customer at the indicated address and obtains the corresponding receipt (signature, electronic record, photograph, or other means used by the courier company).\n\nFrom that moment, the risk of loss or damage is transferred to the Customer.\n\nIt is recommended that, upon receiving the package, the Customer reviews the external state of the packaging and, if visible damage is detected, records it with the delivery person and keeps evidence (e.g., photographs), in addition to reporting it to the company within the period provided in the return policy."
      },
      {
        title: "VIII. Inventory availability and substitutions",
        body: "All orders are subject to product availability.\n\nIf after confirming an order it is detected that the item is not in inventory or has been discontinued, the company may propose an alternative product with similar characteristics, or offer a full refund of the amount paid for said product, promptly informing the Customer to decide."
      },
      {
        title: "IX. Returns, exchanges and refunds",
        body: "The specific rules regarding timeframes, requirements, shipping costs, non-returnable products, and refund modalities are developed in the Return and Refund Policy, available on the website and forming part of these Conditions.\n\nIn any case, the rights recognized by the Federal Consumer Protection Law for buyers in distance transactions will be respected, especially when the product presents origin defects, does not correspond to what was offered, or arrives damaged."
      },
      {
        title: "X. Use of medical products and Customer responsibility",
        body: "A large part of the catalog is composed of health-related equipment and devices.\n\nThe Customer is responsible for verifying that the product is suitable for their particular situation and, where appropriate, consulting a healthcare professional before use.\n\nThe Customer commits to follow the instructions for use, installation, maintenance, and safety provided by the manufacturer or included in the packaging, manuals, or technical data sheets.\n\nThe company does not make medical diagnoses or prescriptions and assumes no responsibility for health decisions made solely based on site information or the incorrect use of products.\n\nAny damage derived from improper use, alteration, lack of maintenance, or deficient installation is the responsibility of the Customer."
      },
      {
        title: "XI. Site content and copyright",
        body: "The texts, designs, logos, images, photographs, technical data sheets, graphic elements, and other contents published on the site are the property of the company or third parties who have authorized their use, and are protected by applicable intellectual and industrial property laws.\n\nThe Customer may consult the content solely for informational purposes and to make purchases.\n\nCopying, reproduction, modification, distribution, or commercial exploitation of said contents is not authorized without prior written authorization from the corresponding owner.\n\nThe site may contain links to third-party pages (e.g., manufacturers, financial entities, or the payment aggregator itself).\n\nThese sites are independent, governed by their own terms and policies, and the company is not responsible for the content or practices of such third parties."
      },
      {
        title: "XII. Personal data and confidentiality",
        body: "The personal data that the Customer provides during navigation or when making purchases will be treated in accordance with the provisions of the Privacy Notice published at /privacidad.\n\nThis document specifies what data is collected, for what purposes it is used, with whom it can be shared, and what mechanisms exist to exercise ARCO rights.\n\nUsing the site and placing orders imply the acceptance of personal data processing under the terms of the Privacy Notice."
      },
      {
        title: "XIII. Modifications to these Conditions and the website",
        body: "The company may introduce changes, expansions, or improvements to the website at any time, as well as modify these General Conditions.\n\nUpdated versions will be published on the site itself and will indicate the effective date.\n\nOperations carried out previously will be governed by the conditions in force at the time they were carried out; subsequent use of the site will be understood as acceptance of the new conditions."
      },
      {
        title: "XIV. Scope of company liability",
        body: "To the extent permitted by law, the maximum liability of the company towards the Customer derived from a specific purchase will be limited to the amount effectively paid for the product involved.\n\nThe company will not be liable for loss of profits, business interruptions, indirect, consequential, punitive damages, or any other type of harm exceeding the value of the purchased product, unless a mandatory legal provision establishes otherwise."
      },
      {
        title: "XV. Applicable law and dispute resolution",
        body: "These General Conditions, as well as any contractual relationship derived from purchases made on the site, are governed by the laws of the United Mexican States.\n\nFor the interpretation and fulfillment of these Conditions, the parties submit to the jurisdiction of the competent courts of Mexico City, expressly waiving any other jurisdiction that might correspond to them due to their present or future domiciles.\n\nWithout prejudice to the foregoing, before resorting to judicial instances, the company and the Customer will seek to resolve any disagreement in good faith through direct communication."
      }
    ]
  }
};

export default function TerminosPage() {
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