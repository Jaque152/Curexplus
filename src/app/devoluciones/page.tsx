"use client";

import { useLanguage } from "@/context/language-context";

const content = {
  es: {
    title: "Política de Devoluciones",
    subtitle: "POLÍTICA DE CAMBIOS, DEVOLUCIONES Y REEMBOLSOS – CRM CODE RIGHT MEDICAL S.A. DE C.V.",
    intro: "Esta política aplica a todas las compras realizadas en el sitio web curexplus.com dentro de la República Mexicana y debe leerse junto con nuestras Condiciones Generales de Uso y de Contratación.",
    sections: [
      {
        title: "1. De qué trata esta política",
        body: "En esta sección explicamos en qué casos puedes devolver un producto, cuándo procede un reembolso y qué plazos y condiciones aplican. La finalidad es darte claridad sobre tus derechos como cliente y sobre el procedimiento que seguimos internamente para atender cualquier incidencia con tu compra."
      },
      {
        title: "2. Plazos: ¿cuánto tiempo tienes?",
        body: "Para simplificar las cosas, utilizamos dos plazos clave:\n● Para devoluciones por insatisfacción o cambio de opinión manejamos 30 días naturales a partir de la fecha en que recibes el producto en tu domicilio.\n● Para reportar productos dañados, defectuosos o incorrectos el plazo es de 5 días naturales contados a partir de la entrega.\n\nDespués de esos plazos, en principio ya no podremos aceptar devoluciones, salvo que exista una obligación legal específica o un acuerdo expreso por escrito."
      },
      {
        title: "3. Casos en los que sí puedes devolver",
        body: "Aceptamos devoluciones en dos escenarios generales:\n1. El producto no te convence (color, modelo, funcionalidad) o simplemente cambiaste de opinión, siempre que estés dentro de los 30 días, el artículo se haya usado de forma razonable y pueda volver a ponerse a la venta sin riesgo sanitario ni daño evidente.\n2. El producto presenta un problema objetivo: está dañado de transporte, llegó incompleto, tiene un defecto de fabricación de inicio o no corresponde a lo que pediste.\n\nEn este supuesto es indispensable que el reporte se haga dentro de los 5 días naturales posteriores a la entrega y que, en la medida de lo posible, nos envíes evidencia (fotos o video del producto y del empaque)."
      },
      {
        title: "4. Productos que, por regla general, no aceptan devolución",
        body: "En el caso de insumos y dispositivos médicos, hay ciertos artículos que, por motivos de higiene, control sanitario o por la forma en que están diseñados, en principio no pueden devolverse, salvo cuando presenten un defecto de fabricación o se haya surtido un producto distinto al solicitado.\n\nDentro de este grupo se encuentran, a modo de ejemplo, los consumibles desechables ya abiertos, los productos estériles cuyo empaque ha sido violado, los artículos que hayan tenido contacto directo con fluidos corporales o zonas íntimas y determinados equipos fabricados o configurados específicamente para el cliente.\n\nCuando un producto tenga reglas de devolución más estrictas, esto se señalará en la ficha del artículo o en la confirmación de tu pedido."
      },
      {
        title: "5. Condiciones en las que debemos recibir el producto",
        body: "Para poder procesar un cambio o reembolso necesitamos que el producto llegue de regreso en condiciones razonables.\n\nEsto significa que conserve, en lo posible, su empaque original, manuales, accesorios, cables, etiquetas, piezas y número de serie legible. Entendemos que, en el caso de productos defectuosos, puede ser que el empaque ya esté abierto; lo importante es que la condición del artículo corresponda con el tipo de incidencia reportada.\n\nSi al revisarlo detectamos señales claras de uso inadecuado, golpes, humedad, corrosión o intervenciones no autorizadas, es probable que no podamos aceptar la devolución."
      },
      {
        title: "6. Cómo se inicia una devolución",
        body: "Si necesitas devolver algo, el primer paso es escribirnos. Envía un correo a atencion@curexplus.com, indicando tu nombre, número de pedido, fecha de compra, producto involucrado y una breve explicación del motivo (por ejemplo: “no era el modelo que esperaba” o “llegó con la carcasa rota”).\n\nCuando se trate de daño, defecto o producto equivocado, adjunta fotografías claras del artículo, del área dañada y del empaque.\nNuestro equipo revisará la información y te contestará con las instrucciones a seguir, incluyendo la dirección a la que debe enviarse el producto o, en su caso, la guía de envío que te proporcionemos.\n\nTe pedimos no mandar ningún paquete sin haber recibido primero nuestra respuesta y número de autorización, ya que podríamos no poder identificarlo ni procesarlo correctamente a su llegada."
      },
      {
        title: "7. Quién cubre los costos de envío de regreso",
        body: "Si la devolución se debe a un error imputable a nosotros —por ejemplo, artículo incorrecto, producto con defecto de fabricación detectado al recibirlo o daño de transporte reportado dentro de los 5 días—, nosotros asumiremos el costo del transporte de regreso o te mandaremos una guía prepagada, según convengamos contigo en el correo de respuesta.\n\nSi la devolución obedece a un tema de preferencia personal o cambio de opinión dentro de los 30 días, el envío de vuelta corre a cargo del cliente y los gastos de envío originales del pedido no son reembolsables, salvo que exista alguna obligación legal que indique lo contrario."
      },
      {
        title: "8. Qué tipo de solución ofrecemos",
        body: "Una vez que el producto devuelto llega y se revisa, podemos ofrecer distintas salidas, dependiendo del caso:\n● En incidentes por daño, defecto de fábrica, producto equivocado o incompleto, lo habitual será reemplazar el artículo por uno en correcto estado o, si no es posible, ofrecer la devolución del dinero.\n● En devoluciones por cambio de opinión dentro de los 30 días, podremos hacer un reembolso del valor del producto o, si prefieres, dejar un saldo a favor para que lo apliques en otra compra, sujeto a lo que acordemos en cada caso.\n\nSi optas por cambiar un producto por otro distinto y el nuevo tiene un precio mayor, deberás cubrir la diferencia antes del envío. Si el nuevo es de menor importe, podremos devolverte la diferencia o transformarla en crédito en tienda."
      },
      {
        title: "9. ¿Cómo se realiza el reembolso?",
        body: "Cuando proceda un reembolso en efectivo (es decir, no en forma de saldo a favor), éste se tramitará, en principio, utilizando el mismo medio de pago que usaste al comprar, es decir, la misma tarjeta de crédito o débito a través del agregador de pagos autorizado.\n\nNo realizamos reembolsos en efectivo físico. El tiempo que tarda en verse reflejado el importe dependerá de los plazos internos del banco emisor y del propio procesador de pagos.\n\nNosotros te avisaremos por correo electrónico cuando el reembolso haya sido solicitado en el sistema; a partir de ahí, los movimientos en tu estado de cuenta pueden demorarse algunos días hábiles."
      },
      {
        title: "10. Relación con garantías del fabricante y con la ley",
        body: "Muchos de los equipos que vendemos cuentan con garantía directa del fabricante, que puede ir más allá de los plazos de esta política. En esos casos, después del periodo inicial de 5 días para daños de entrega y de 30 días para devoluciones estándar, es posible que determinadas fallas se atiendan a través de centros de servicio autorizados, según lo indique la póliza o el manual del producto.\n\nNada de lo anterior limita los derechos que te concede la Ley Federal de Protección al Consumidor en materia de compras a distancia, productos defectuosos o incumplimiento con lo publicitado. Esta política busca darle estructura a nuestro proceso interno, pero en todo momento respetaremos el marco legal aplicable en México."
      },
      {
        title: "11. ¿Dónde te atendemos para estos temas?",
        body: "Si necesitas aclarar algo sobre esta política, iniciar un trámite de devolución o dar seguimiento a un caso abierto, puedes escribirnos a atencion@curexplus.com o llamarnos al +52 1 55 5204 4092.\n\nCuando sea necesario enviar físicamente un producto, te indicaremos por correo la dirección exacta de recepción en Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Entidad Federativa Ciudad de México, así como cualquier referencia adicional que debas colocar en la guía o en la caja para que podamos identificar tu paquete al llegar."
      }
    ]
  },
  en: {
    title: "Return Policy",
    subtitle: "EXCHANGE, RETURN AND REFUND POLICY – CRM CODE RIGHT MEDICAL S.A. DE C.V.",
    intro: "This policy applies to all purchases made on the curexplus.com website within the Mexican Republic and must be read together with our General Conditions of Use and Contracting.",
    sections: [
      {
        title: "1. What is this policy about",
        body: "In this section we explain in which cases you can return a product, when a refund applies, and what terms and conditions apply. The purpose is to give you clarity about your rights as a customer and the procedure we follow internally to handle any incident with your purchase."
      },
      {
        title: "2. Timeframes: how much time do you have?",
        body: "To simplify things, we use two key timeframes:\n● For returns due to dissatisfaction or change of mind, we handle 30 calendar days from the date you receive the product at your address.\n● To report damaged, defective, or incorrect products, the timeframe is 5 calendar days from delivery.\n\nAfter these periods, in principle, we will no longer be able to accept returns, unless there is a specific legal obligation or an express written agreement."
      },
      {
        title: "3. Cases in which you can return",
        body: "We accept returns in two general scenarios:\n1. The product does not convince you (color, model, functionality) or you simply changed your mind, provided you are within 30 days, the item has been used reasonably, and can be put back on sale without sanitary risk or evident damage.\n2. The product presents an objective problem: it is damaged from transport, arrived incomplete, has a manufacturing defect from the start, or does not correspond to what you ordered.\n\nIn this case, it is essential that the report is made within 5 calendar days after delivery and that, as far as possible, you send us evidence (photos or video of the product and packaging)."
      },
      {
        title: "4. Products that, as a general rule, do not accept returns",
        body: "In the case of medical supplies and devices, there are certain items that, for hygiene, sanitary control, or the way they are designed, in principle cannot be returned, except when they present a manufacturing defect or a product different from the one requested was supplied.\n\nWithin this group are, by way of example, open disposable consumables, sterile products whose packaging has been violated, items that have had direct contact with bodily fluids or intimate areas, and certain equipment manufactured or configured specifically for the customer.\n\nWhen a product has stricter return rules, this will be noted on the item's sheet or in your order confirmation."
      },
      {
        title: "5. Conditions in which we must receive the product",
        body: "In order to process an exchange or refund, we need the product to arrive back in reasonable condition.\n\nThis means that it retains, as much as possible, its original packaging, manuals, accessories, cables, labels, parts, and a legible serial number. We understand that, in the case of defective products, the packaging may already be open; the important thing is that the condition of the item corresponds to the type of incident reported.\n\nIf upon review we detect clear signs of improper use, bumps, moisture, corrosion, or unauthorized interventions, it is likely that we will not be able to accept the return."
      },
      {
        title: "6. How a return is initiated",
        body: "If you need to return something, the first step is to write to us. Send an email to atencion@curexplus.com, indicating your name, order number, purchase date, product involved, and a brief explanation of the reason (for example: \"it was not the model I expected\" or \"arrived with a broken casing\").\n\nWhen it comes to damage, defect, or wrong product, attach clear photographs of the item, the damaged area, and the packaging.\nOur team will review the information and reply with instructions to follow, including the address to which the product should be sent or, if applicable, the shipping guide we provide you.\n\nWe ask you not to send any package without first receiving our response and authorization number, as we might not be able to identify or process it correctly upon arrival."
      },
      {
        title: "7. Who covers the return shipping costs",
        body: "If the return is due to an error attributable to us—for example, wrong item, product with a manufacturing defect detected upon receipt, or transport damage reported within 5 days—we will bear the cost of return transport or send you a prepaid guide, as agreed with you in the response email.\n\nIf the return is due to a matter of personal preference or change of mind within 30 days, the return shipping is borne by the customer and the original shipping costs of the order are non-refundable, unless there is a legal obligation indicating otherwise."
      },
      {
        title: "8. What kind of solution we offer",
        body: "Once the returned product arrives and is reviewed, we can offer different solutions, depending on the case:\n● In incidents involving damage, factory defect, wrong or incomplete product, the usual procedure will be to replace the item with one in good condition or, if not possible, offer a money refund.\n● For returns due to change of mind within 30 days, we can make a refund of the product value or, if you prefer, leave a store credit for you to apply to another purchase, subject to what we agree on in each case.\n\nIf you choose to exchange a product for a different one and the new one has a higher price, you must cover the difference before shipping. If the new one is of a lower amount, we can refund the difference or transform it into store credit."
      },
      {
        title: "9. How is the refund made?",
        body: "When a cash refund is appropriate (that is, not in the form of store credit), it will be processed, in principle, using the same payment method you used when purchasing, that is, the same credit or debit card through the authorized payment aggregator.\n\nWe do not make refunds in physical cash. The time it takes for the amount to be reflected will depend on the internal terms of the issuing bank and the payment processor itself.\n\nWe will notify you by email when the refund has been requested in the system; from there, the movements in your account statement may take a few business days."
      },
      {
        title: "10. Relationship with manufacturer warranties and the law",
        body: "Many of the equipments we sell have a direct warranty from the manufacturer, which may go beyond the timeframes of this policy. In those cases, after the initial period of 5 days for delivery damage and 30 days for standard returns, it is possible that certain failures are handled through authorized service centers, as indicated by the policy or product manual.\n\nNothing above limits the rights granted to you by the Federal Consumer Protection Law regarding distance purchases, defective products, or non-compliance with what was advertised. This policy seeks to structure our internal process, but at all times we will respect the applicable legal framework in Mexico."
      },
      {
        title: "11. Where do we assist you with these issues?",
        body: "If you need to clarify anything about this policy, initiate a return process, or follow up on an open case, you can write to us at atencion@curexplus.com or call us at +52 1 55 5204 4092.\n\nWhen it is necessary to physically send a product, we will indicate by email the exact receiving address at Calle Guanajuato N°224, Piso 8 Despacho 801-802, Colonia Roma, Alcaldía Cuauhtémoc, C.P. 06700, Mexico City, as well as any additional reference you must place on the guide or box so we can identify your package upon arrival."
      }
    ]
  }
};

export default function DevolucionesPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <main className="bg-bone pt-32 pb-24 min-h-screen">
      <div className="container-tight max-w-4xl rounded-3xl bg-paper p-8 shadow-sm sm:p-14">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-clay">{t.subtitle}</p>
        <p className="mt-6 text-muted-foreground leading-relaxed">{t.intro}</p>

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