export type Category =
  | "Mobiliario Hospitalario"
  | "Equipo Médico"
  | "Laboratorio"
  | "Instrumental"
  | "Rehabilitación"
  | "Capacitación"
  | "Insumos"
  | "Hospital Furniture"
  | "Medical Equipment"
  | "Laboratory"
  | "Instruments"
  | "Rehabilitation"
  | "Training"
  | "Supplies";

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  blurb: string;
  description: string;
  features: string[];
  badge?: string;
};

export const CATEGORIES_ES: Category[] = [
  "Mobiliario Hospitalario", "Equipo Médico", "Laboratorio", 
  "Instrumental", "Rehabilitación", "Capacitación", "Insumos"
];

export const CATEGORIES_EN: Category[] = [
  "Hospital Furniture", "Medical Equipment", "Laboratory", 
  "Instruments", "Rehabilitation", "Training", "Supplies"
];

// 1. ESTRUCTURA DRY: Datos globales una sola vez, traducciones separadas
const rawProducts = [
  {
    id: 1,
    slug: "andadera-esmaltada-plegable-2-en-1",
    price: 7629.55,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSvxGYaJE-KJa0feo2hG6Lbz7WWMDXdH4g0AcVodhfK1Po-I96J5jzqfeADndB9WYWQC2Eyi-XZ11bp3cEe5fZo8L0atxw4AoqhbkFRDuoEUobTAqDPWRzICA",
    es: {
      name: "Andadera esmaltada plegable 2 en 1, paquete con 8 piezas",
      category: "Rehabilitación" as Category,
      blurb: "Andadera plegable de acero esmaltado, paquete con 8 piezas.",
      description: "Andadera 2 en 1 de estructura esmaltada, plegable para almacenamiento y traslado eficiente. Diseñada para brindar estabilidad y autonomía durante la recuperación y movilidad asistida del paciente.",
      features: ["Función 2 en 1, andadera y caminadora.", "Fabricados con tubo de aluminio esmaltado de alta duración.", "Barra estabilizadora central.", "Altura ajustable.", "Puños de hule espuma.", "Gomas antiderrapantes en los extremos de las patas."],
    },
    en: {
      name: "2-in-1 folding enameled walker, 8-piece package",
      category: "Rehabilitation" as Category,
      blurb: "Folding enameled steel walker, 8-piece package.",
      description: "2-in-1 enameled structure walker, foldable for efficient storage and transport. Designed to provide stability and autonomy during patient recovery and assisted mobility.",
      features: ["2-in-1 function, walker and stepper.", "Made with highly durable enameled aluminum tubing.", "Central stabilizing bar.", "Adjustable height.", "Foam rubber grips.", "Non-slip rubber tips on the legs."],
    }
  },
  {
    id: 2,
    slug: "aspirador-flemas-7e-a-hergom",
    price: 3781.6,
    image: "data:image/webp;base64,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",
    es: {
      name: "Aspirador de Flemas y Secreciones portátil de 18 L/min, Modelo 7E-A — Hergom",
      category: "Equipo Médico" as Category,
      blurb: "Aspirador portátil de secreciones, 18 L/min.",
      description: "Unidad Portátil, 18 Litros x Minuto y Silencioso. Controla la Regulación de Aspiración, Botella de Almacenamiento 1000ml. Válvula de Seguridad y Sistema Libre de Mantenimiento.",
      features: [],
    },
    en: {
      name: "Portable Phlegm and Secretion Aspirator 18 L/min, Model 7E-A — Hergom",
      category: "Medical Equipment" as Category,
      blurb: "Portable secretion aspirator, 18 L/min.",
      description: "Portable Unit, 18 Liters per Minute, and Silent. Controls Suction Regulation, 1000ml Storage Bottle. Safety Valve and Maintenance-Free System.",
      features: [],
    }
  },
  {
    id: 3,
    slug: "banco-de-ducha-plegable-10-piezas",
    price: 8855.15,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSgJ_m-hEcv9xQgNEfG7LfMbVqlmRoZ-n8vDSuw4NcQ_7LHmKtjoY838h9hH89DVfn6Hc36X-Vg7T_6Aw3_MFeLiQMFxNeFVX3UOJdKEq3m2j9a6Lr0TQ4d",
    es: {
      name: "Banco de ducha plegable. Paquete de 10 piezas.",
      category: "Rehabilitación" as Category,
      blurb: "Banco de ducha plegable, paquete con 10 piezas.",
      description: "Banco de ducha plegable. Paquete de 10 piezas.",
      features: ["Fabricado con plástico de alta resistencia y aluminio esmaltado.", "Puede plegarse fácilmente para guardarse o transportarse.", "Asiento ergonómico de superficie texturizada y orificios que evitan que el agua se almacene sobre el asiento.", "Gomas anti derrapantes para evitar deslizamientos indeseados", "Cuenta con 2 agarraderas para soporte del usuario"],
    },
    en: {
      name: "Folding shower bench. 10-piece package.",
      category: "Rehabilitation" as Category,
      blurb: "Folding shower bench, 10-piece package.",
      description: "Folding shower bench. 10-piece package.",
      features: ["Made with high-resistance plastic and enameled aluminum.", "Easily folds for storage or transport.", "Ergonomic textured surface seat with holes to prevent water accumulation.", "Non-slip rubber feet to prevent unwanted sliding.", "Includes 2 handles for user support."],
    }
  },
  {
    id: 4,
    slug: "banco-giratorio-respaldo-ruedas",
    price: 4025.1,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ1cduazhbAnSnwmS32ihxtS5aySFwgNe5K7FrP8BVUPmBIMBlJ8wWCw8TvUwQh-V-I4lD10EFXCss3VbaZSTuCt347wEUJvmjJIFj0gZSBWRuQ5qnGyk4zcw",
    es: {
      name: "Banco giratorio con respaldo y ruedas",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Banco giratorio con respaldo y ruedas.",
      description: "Banco giratorio con respaldo, asiento tapizado y ruedas, ideal para consultorios o laboratorios que requieren alta movilidad y confort durante el trabajo.",
      features: ["Asiento: Lámina de acero calibre 18, acabado cromado con refuerzo en forma de cruz.", "Sistema de altura: Tuerca con esparrago galvanizado.", "Estructura: Tubo de 1” y descansapiés de tubo de ½”, ambos en acero cromado.", "Ruedas: Negras de 2” de doble huella tipo “yoyo”.", "Medidas: 30 cm de diámetro x 55–65 cm de altura."],
    },
    en: {
      name: "Swivel stool with backrest and wheels",
      category: "Hospital Furniture" as Category,
      blurb: "Swivel stool with backrest and wheels.",
      description: "Swivel stool with backrest, upholstered seat, and wheels, ideal for clinics or laboratories requiring high mobility and comfort during work.",
      features: ["Seat: 18-gauge steel sheet, chrome finish with cross reinforcement.", "Height system: Nut with galvanized stud.", "Structure: 1” chrome steel tubing and ½” footrest tubing.", "Wheels: 2” black double-tread 'yoyo' style.", "Dimensions: 30 cm diameter x 55–65 cm height."],
    }
  },
  {
    id: 5,
    slug: "bascula-innerscan-pro-bluetooth",
    price: 16609.75,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRzh-3n8ZrTePF9__aNI7oQp4Heahi2HhNZVaPtC4jq6sf8NBBP9OJdXN42lu0iDdkjwal7P2bX-ZaczLd3n9qju0fuK3EV7vt1ECjmDIjC3ceCPLUr6imj4kI",
    es: {
      name: "Báscula digital InnerScan PRO con conexión Bluetooth",
      category: "Equipo Médico" as Category,
      blurb: "Báscula digital InnerScan PRO con conexión Bluetooth.",
      description: "Báscula digital InnerScan PRO con conexión Bluetooth",
      features: ["Pantalla LED.", "4 Memorias de usuario.", "Modo adulto, atleta, invitado y solo peso.", "Modo niño; determina peso, % grasa e IMC.", "Plataforma de vidrio templado.", "Electrodos transparentes.", "Conectividad Bluetooth 4.0 con el celular a través de la app “Healthy Edge Mobile” también compatible con iPhone.", "Tecnología BIA de frecuencia dual."],
    },
    en: {
      name: "InnerScan PRO digital scale with Bluetooth connection",
      category: "Medical Equipment" as Category,
      blurb: "InnerScan PRO digital scale with Bluetooth connection.",
      description: "Advanced InnerScan PRO digital scale with Bluetooth connection for precise body composition monitoring.",
      features: ["LED Display.", "4 User memories.", "Adult, athlete, guest, and weight-only modes.", "Child mode; determines weight, body fat %, and BMI.", "Tempered glass platform.", "Transparent electrodes.", "Bluetooth 4.0 connectivity with smartphone via 'Healthy Edge Mobile' app, also iPhone compatible.", "Dual-frequency BIA technology."],
    }
  },
  {
    id: 6,
    slug: "beurer-mg40-masajeador",
    price: 1774.8,
    image: "https://hergom-medical.com/cdn/shop/files/imagenesdescripcionavanzada2_Recuperado_-55_720x.png?v=1716484712",
    es: {
      name: "Beurer MG40 — Masajeador Eléctrico con Calor Infrarrojo, Vibración y Cabezal Ajustable",
      category: "Rehabilitación" as Category,
      blurb: "Masajeador con calor infrarrojo y cabezal ajustable.",
      description: "Masajeador eléctrico Beurer MG40 con función de calor infrarrojo, vibración y cabezal ajustable. Apoya la terapia de relajación muscular y la rehabilitación.",
      features: ["Ideal para un masaje selectivo.", "Cabezal de masaje giratorio (180°).", "Mango ajustable a 3 posiciones.", "Acción profunda por sus infrarrojos.", "4 accesorios de masaje intercambiables.", "3 funciones", "12 vatios", "Masaje por vibración", "Medidas: 8,8 x 39 x 8,5 cm", "Peso: 650 g"],
    },
    en: {
      name: "Beurer MG40 — Electric Massager with Infrared Heat, Vibration and Adjustable Head",
      category: "Rehabilitation" as Category,
      blurb: "Massager with infrared heat and adjustable head.",
      description: "Beurer MG40 electric massager with infrared heat function, vibration, and adjustable head. Supports muscle relaxation therapy and rehabilitation.",
      features: ["Ideal for selective massage.", "Rotating massage head (180°).", "3-position adjustable handle.", "Deep action through infrared.", "4 interchangeable massage attachments.", "3 functions", "12 watts", "Vibration massage", "Dimensions: 8.8 x 39 x 8.5 cm", "Weight: 650 g"],
    }
  },
  {
    id: 7,
    slug: "cama-cuna-pediatrica-ec03006",
    price: 71653.2,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS4vJ51_cbwkzU1M3V5doILBIbKAPdPsmICKJE4uPFh9pgwD7BAC30cqHyms2UM8s-Pj2TUqbLqWnLTe8OcqsimFrqPvfFUl81Rvyrc9Ek9CpKTkwUm8FifPw",
    es: {
      name: "Cama cuna pediátrica mecánica modelo EC03006",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Cuna pediátrica hospitalaria mecánica.",
      description: "Cama mecánica, rodable, diseñada para la atención de pacientes pediátricos en hospitalización y servicios de urgencias. Cuenta con múltiples posiciones ajustables y características que garantizan seguridad, funcionalidad y comodidad.",
      features: ["Posiciones ajustables de forma manual: Trendelenburg de 10°. Trendelenburg inverso de 11°.", "Elevación de la sección de espalda en angulaciones de 0° a 63° respecto a la horizontal.", "Estructura base fabricada en acero al carbono, calibre 16.", "Soporta un peso máximo de 85 kg.", "Manivelas abatibles fabricadas en acero inoxidable tipo 304.", "Protectores o parachoques en las cuatro esquinas.", "Ruedas giratorias de 5” de diámetro.", "Colchón de 8 cm de espesor, fabricado en espuma de poliuretano."],
    },
    en: {
      name: "Mechanical pediatric crib bed model EC03006",
      category: "Hospital Furniture" as Category,
      blurb: "Mechanical hospital pediatric crib.",
      description: "Rollable mechanical bed designed for pediatric patient care in hospitalization and emergency services. Features multiple adjustable positions to ensure safety, functionality, and comfort.",
      features: ["Manually adjustable positions: 10° Trendelenburg. 11° Reverse Trendelenburg.", "Back section elevation from 0° to 63° angles relative to horizontal.", "Base structure made of 16-gauge carbon steel.", "Supports a maximum weight of 85 kg.", "Folding cranks made of type 304 stainless steel.", "Bumpers on all four corners.", "5” diameter swivel wheels.", "8 cm thick mattress, made of polyurethane foam."],
    }
  },
  {
    id: 8,
    slug: "cama-hospitalaria-manual-colchon-seccionado",
    price: 9839.7,
    image: "https://resources.sanborns.com.mx/medios-plazavip/t1/1745265213LUCHMSB12G1001jpg?scale=500&qlty=75",
    es: {
      name: "Cama Hospitalaria Manual con Colchón Seccionado",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Cama manual OR269C11 con colchón seccionado.",
      description: "Cama hospitalaria manual diseñada para brindar comodidad y seguridad a pacientes que requieren permanecer en cama por periodos prolongados. Permite modificar la posición del paciente mediante manivelas.",
      features: ["Mecanismo manual.", "Armable, requiere de herramientas.", "Estructura de acero esmaltado.", "2 barandales laterales de aluminio, abatibles.", "Ruedas giratorias con freno (4 piezas).", "2 manivelas para movimiento en cabecera y piecera.", "Capacidad de carga: hasta 170 kg.", "Incluye: Colchón seccionado, Mesa de sobreponer, Portasuero con 4 ganchos."],
    },
    en: {
      name: "Manual Hospital Bed with Sectioned Mattress",
      category: "Hospital Furniture" as Category,
      blurb: "Manual bed OR269C11 with sectioned mattress.",
      description: "Manual hospital bed designed to provide comfort and safety to patients requiring prolonged bed rest. Modifies patient position via cranks.",
      features: ["Manual mechanism.", "Assembly required, requires tools.", "Enameled steel structure.", "2 folding aluminum side rails.", "Swivel wheels with brakes (4 pieces).", "2 cranks for head and foot movements.", "Load capacity: up to 170 kg.", "Includes: Sectioned mattress, Overbed table, IV pole with 4 hooks."],
    }
  },
  {
    id: 9,
    slug: "cama-manual-silla-cardiaca",
    price: 20814.75,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS8Dq8jupszqcQ4VGuvjD12aJAMtGp0Q-qWseYFOFsrtPsEu6WdE6SWK2ULhqz2fajVXnOHlbu7vIl-Zs_tRhnMG-z4IzMXzkS-K9RAqWcjCZr-7rWCKfo2QA",
    es: {
      name: "Cama manual con silla cardiaca",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Cama manual con función de silla cardiaca.",
      description: "Cama hospitalaria manual con función de posición silla cardiaca, ideal para pacientes con afecciones respiratorias o cardiacas. Multiposiciones para optimizar el confort y la atención.",
      features: ["La cama puede volverse en forma de silla.", "Con cómodo integrado.", "Función de giro: 0-55°.", "Realiza la posición en forma de silla.", "Con porta sueros.", "Con colchón.", "Con lavabo para la cabeza del paciente."],
    },
    en: {
      name: "Manual bed with cardiac chair function",
      category: "Hospital Furniture" as Category,
      blurb: "Manual bed with cardiac chair function.",
      description: "Manual hospital bed with cardiac chair position function, ideal for patients with respiratory or cardiac conditions. Multipositions to optimize comfort and care.",
      features: ["The bed can turn into a chair shape.", "With built-in commode.", "Rotation function: 0-55°.", "Performs chair-like position.", "With IV pole.", "With mattress.", "With washbasin for patient's head."],
    }
  },
  {
    id: 10,
    slug: "camilla-marina-ruedas-modelo-11",
    price: 36599.65,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLPrWZJNPxueBaiqmULSwkzHc3gjth1HA4n8qSxk1QA0LaaMvn_QxHzdEWdgNd_Salvd9AEBsECtVQrpoDGDE9YCp7rot7qW5jNCkbiIOvYNxjyGO9RXeYaA",
    es: {
      name: "Camilla marina con ruedas modelo 11",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Camilla de traslado con ruedas, modelo 11.",
      description: "Camilla marina con ruedas para traslado de pacientes, estructura robusta y respaldo ajustable. Diseñada para urgencias y desplazamiento.",
      features: ["Estructura de Aluminio ligero pero resistente.", "Superficie de nailon recubierto de vinilo resistente a fluidos orgánicos.", "Diseño plegable con bisagras centrales delgadas para un almacenamiento compacto.", "Colchoneta impermeable.", "Incluye: Dos sistemas de sujeción rápida para el paciente."],
    },
    en: {
      name: "Marine stretcher with wheels model 11",
      category: "Hospital Furniture" as Category,
      blurb: "Transport stretcher with wheels, model 11.",
      description: "Marine stretcher with wheels for patient transport, robust structure and adjustable backrest. Designed for emergencies and displacement.",
      features: ["Lightweight but sturdy aluminum structure.", "Fluid-resistant vinyl-coated nylon surface.", "Folding design with slim center hinges for compact storage.", "Waterproof pad.", "Includes: Two quick-release patient restraint systems."],
    }
  },
  {
    id: 11,
    slug: "carro-auxiliar-clinico-acero-inoxidable",
    price: 15201.07,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSQ69krQ51pBRB7OtgJ2lz07Rf_0-gGHxy8rWBhFNkLGAvZsajbnzXiPrgs50F7f69iVyhEiH8SlxqhmIzQ-xWBQb44XKJtORCAr3-Bzjj2IHP2PD2x2jNe",
    es: {
      name: "Carro auxiliar clínico de acero inoxidable con accesorios",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Carro auxiliar de acero inoxidable con accesorios.",
      description: "Carro auxiliar clínico fabricado en acero inoxidable, con accesorios para organización de instrumental y suministros. Higiénico, resistente y de fácil limpieza.",
      features: ["Cubierta y entrepaño de lamina de acero inoxidable", "Barandal redondo pulido de acero cromado.", "Estructura tubular de Ø 25mm de acero con acabado cromado.", "Rodaja de hule termoplástico de Ø 76 mm color gris.", "Cajones de lamina de acero con acabado esmaltado y pulido.", "Incluye: Cubeta de 12 litros, Palangana de 3 litros, Aros porta accesorios."],
    },
    en: {
      name: "Stainless steel clinical utility cart with accessories",
      category: "Hospital Furniture" as Category,
      blurb: "Stainless steel utility cart with accessories.",
      description: "Clinical utility cart made of stainless steel, with accessories for instrument and supply organization. Hygienic, resistant and easy to clean.",
      features: ["Stainless steel sheet top and shelf", "Polished round chrome steel railing.", "Ø 25mm tubular steel structure with chrome finish.", "Ø 76 mm gray thermoplastic rubber wheel.", "Enameled and polished steel sheet drawers.", "Includes: 12-liter bucket, 3-liter basin, Accessory holder rings."],
    }
  },
  {
    id: 12,
    slug: "carro-porta-equipo-estandar-plus",
    price: 10132.69,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR0L0-1Y8uT-kSwqUQz5HgykkkiBAKDrtMqvCSq2xtMwHaUi8e02PeOTOGLuaQRPzaKP8b2CwbhxsJiCnpMqObIpz_aWxOY",
    es: {
      name: "Carro porta equipo estándar plus",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Carro porta equipo estándar plus.",
      description: "Carro diseñado para el almacenamiento y transporte de equipo médico, con estructura resistente y rodajas que facilitan su desplazamiento en entornos clínicos y hospitalarios.",
      features: ["Estructura resistente en lámina de acero al carbón.", "Cubierta y entrepaños calibre 22.", "Barandales anticaída de 8 mm de diámetro.", "Cajón deslizable con correderas de extensión total de 35 cm.", "Porta accesorios con entrada de 13 mm (1/2”).", "Rodajas giratorias de 50 mm, dos con freno."],
    },
    en: {
      name: "Standard plus equipment cart",
      category: "Hospital Furniture" as Category,
      blurb: "Standard plus equipment cart.",
      description: "Cart designed for the storage and transport of medical equipment, with a sturdy structure and casters that facilitate its movement in clinical and hospital environments.",
      features: ["Sturdy structure in carbon steel sheet.", "22-gauge top and shelves.", "8 mm diameter anti-fall railings.", "Sliding drawer with 35 cm full extension slides.", "Accessory holder with 13 mm (1/2”) entrance.", "50 mm swivel casters, two with brakes."],
    }
  },
  {
    id: 13,
    slug: "carro-universal-abs-instrumental",
    price: 5282.59,
    image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT4yfNqi08YzOJWbkRRnloolt3gellCScC0bgGEEH39P19aGefcpThfF98zbtIbdtn9rYFBfClFS1nYQQoiMeVZkd5dMLry",
    es: {
      name: "Carro universal de ABS para instrumental y equipos",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Carro universal de ABS para instrumental.",
      description: "Carro universal de ABS de alta resistencia, ideal para el transporte y organización de instrumental y equipos clínicos.",
      features: ["Hecho de plástico ABS.", "Dos cajones y barandales laterales.", "Con 4 ruedas."],
    },
    en: {
      name: "Universal ABS cart for instruments and equipment",
      category: "Hospital Furniture" as Category,
      blurb: "Universal ABS cart for instruments.",
      description: "High-resistance ABS universal cart, ideal for the transport and organization of clinical instruments and equipment.",
      features: ["Made of ABS plastic.", "Two drawers and side rails.", "With 4 wheels."],
    }
  },
  {
    id: 14,
    slug: "cesto-papelero-acero-inoxidable",
    price: 3122.43,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQZ896XOtJPj_ZWyIj2JTd5a6uYwllzfX9GeikcXYW6RUjYOa_Tt9s6yKIunj1t6AeRewteRsOwIsMk31QDBrrMeRNkKWJBLX3vgLv_J5rV8LULUYmw3jOW",
    es: {
      name: "Cesto papelero de acero inoxidable",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Cesto papelero clínico de acero inoxidable.",
      description: "Cesto papelero de acero inoxidable para áreas clínicas, resistente a la corrosión y de fácil sanitización.",
      features: ["Fabricado con cuerpo de lamina de acero inoxidable en cal. 22.", "Acabado pulido", "Base estable", "Uso clínico general"],
    },
    en: {
      name: "Stainless steel wastebasket",
      category: "Hospital Furniture" as Category,
      blurb: "Stainless steel clinical wastebasket.",
      description: "Stainless steel wastebasket for clinical areas, corrosion resistant and easy to sanitize.",
      features: ["Made with 22-gauge stainless steel sheet body.", "Polished finish", "Stable base", "General clinical use"],
    }
  },
  {
    id: 15,
    slug: "colchon-ortopedico-multifuncional-ch4",
    price: 3148.7,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRcly948UoZiMbI6SZRYNZW7Vh2o0RJascucY-CwW2VunmChYC1cATPPGSgQyInvBpMzU65rWgw6BF_F4T_Fnp5FYCr9Pepz038UrRj4HlAughDhS3d6Q6uoA",
    es: {
      name: "Colchón ortopédico multifuncional modelo CH4",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Colchón ortopédico multifuncional CH4.",
      description: "Colchón ortopédico multifuncional modelo CH4.",
      features: ["Soporte ortopédico multifuncional", "Cubierta impermeable", "Distribución de presión", "Compatible con camas hospitalarias"],
    },
    en: {
      name: "Multifunctional orthopedic mattress model CH4",
      category: "Hospital Furniture" as Category,
      blurb: "Multifunctional orthopedic mattress CH4.",
      description: "Multifunctional orthopedic mattress model CH4.",
      features: ["Multifunctional orthopedic support", "Waterproof cover", "Pressure distribution", "Compatible with hospital beds"],
    }
  },
  {
    id: 16,
    slug: "colchon-viscoelastico-cama-hospitalaria",
    price: 27113.17,
    image: "https://img.medicalexpo.es/images_me/photo-g/68247-16200187.jpg",
    es: {
      name: "Colchón viscoelástico para cama hospitalaria",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Colchón viscoelástico para hospitalización.",
      description: "Colchón viscoelástico de alta densidad para camas hospitalarias, que mejora la comodidad del paciente y reduce el riesgo de úlceras por presión en estancias prolongadas.",
      features: ["Prevención de úlceras por presión.", "Funda de poliuretano resistente al agua.", "Fácil limpieza y desinfección.", "Colchón completamente hermético con costuras selladas."],
    },
    en: {
      name: "Viscoelastic mattress for hospital bed",
      category: "Hospital Furniture" as Category,
      blurb: "Viscoelastic mattress for hospitalization.",
      description: "High-density viscoelastic mattress for hospital beds, which improves patient comfort and reduces the risk of pressure ulcers during prolonged stays.",
      features: ["Prevention of pressure ulcers.", "Water-resistant polyurethane cover.", "Easy cleaning and disinfection.", "Completely hermetic mattress with sealed seams."],
    }
  },
  {
    id: 17,
    slug: "compresor-vascular-scd700",
    price: 85014.95,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHtoGXZzUoYihm1yAZzX8ysfBmStNDyJ8V1rHLSxgBzzBBYRVhjUw1_amH&s=10",
    es: {
      name: "Compresor vascular SCD700",
      category: "Equipo Médico" as Category,
      blurb: "Sistema de compresión secuencial SCD700.",
      description: "Compresor vascular SCD700 para terapia de compresión secuencial, indicado en la prevención de trombosis venosa profunda. Equipo de uso hospitalario.",
      features: ["Sistema de rellenado vascular (DRV).", "Promueve ciclos de compresión personalizados.", "Diseño flexible y transportable.", "Pantalla LCD.", "Tecnología de detección del paciente."],
    },
    en: {
      name: "SCD700 vascular compressor",
      category: "Medical Equipment" as Category,
      blurb: "SCD700 sequential compression system.",
      description: "SCD700 vascular compressor for sequential compression therapy, indicated in the prevention of deep vein thrombosis. Hospital use equipment.",
      features: ["Vascular Refill Detection (VRD) system.", "Promotes customized compression cycles.", "Flexible and transportable design.", "LCD screen.", "Patient detection technology."],
    }
  },
  {
    id: 18,
    slug: "concentrador-oxigeno-5l-olv5",
    price: 12597.6,
    image: "https://http2.mlstatic.com/D_NQ_NP_920363-MLM72005837677_092023-O.webp",
    es: {
      name: "Concentrador de Oxígeno de 5 L/min OLV-5",
      category: "Equipo Médico" as Category,
      blurb: "Concentrador de oxígeno de 5 L/min.",
      description: "Concentrador de Oxígeno 5 L OL V5S. Equipo de Flujo de Aire (Uso General). Brinda oxígeno de grado médico de forma continua y segura.",
      features: ["Flujo de hasta 5 L/min", "Grado médico", "Operación continua"],
    },
    en: {
      name: "5 L/min Oxygen Concentrator OLV-5",
      category: "Medical Equipment" as Category,
      blurb: "5 L/min oxygen concentrator.",
      description: "Oxygen Concentrator 5 L OL V5S. Air Flow Equipment (General Use). Provides medical grade oxygen continuously and safely.",
      features: ["Flow up to 5 L/min", "Medical grade", "Continuous operation"],
    }
  },
  {
    id: 19,
    slug: "contador-celulas-8-teclas-electronico",
    price: 11879.13,
    image: "https://ctrscientific.com/cdn/shop/files/CTL-DIFD-08KP.jpg?v=1683742467",
    es: {
      name: "Contador de células de 8 teclas electrónico",
      category: "Laboratorio" as Category,
      blurb: "Contador diferencial electrónico de 8 teclas.",
      description: "Contador de células electrónico de 8 teclas para el conteo diferencial en laboratorio clínico.",
      features: ["Capacidad hasta 999.", "Incluye totalizador.", "Plastico de alta resistencia quimica.", "Pantalla digital.", "Sistema de alarma audible cada 100 cuentas."],
    },
    en: {
      name: "Electronic 8-key cell counter",
      category: "Laboratory" as Category,
      blurb: "Electronic 8-key differential counter.",
      description: "Electronic 8-key cell counter for differential counting in clinical laboratory.",
      features: ["Capacity up to 999.", "Includes totalizer.", "High chemical resistance plastic.", "Digital display.", "Audible alarm system every 100 counts."],
    }
  },
  {
    id: 20,
    slug: "contador-celulas-8-teclas-mecanico",
    price: 11837.08,
    image: "https://http2.mlstatic.com/D_NQ_NP_853311-MLM53609214750_022023-O.webp",
    es: {
      name: "Contador de células de 8 teclas mecánico",
      category: "Laboratorio" as Category,
      blurb: "Contador diferencial mecánico de 8 teclas.",
      description: "Contador de células mecánico de 8 teclas, robusto y confiable para el conteo diferencial en laboratorio.",
      features: ["Capacidad hasta 999", "Las teclas tienen etiqueta", "Totalizador integrado", "Perilla para restaurar a cero", "Plastico de alta resistencia quimica"],
    },
    en: {
      name: "Mechanical 8-key cell counter",
      category: "Laboratory" as Category,
      blurb: "Mechanical 8-key differential counter.",
      description: "Mechanical 8-key cell counter, robust and reliable for differential counting in laboratory.",
      features: ["Capacity up to 999", "Keys have labels", "Integrated totalizer", "Knob to reset to zero", "High chemical resistance plastic"],
    }
  },
  {
    id: 21,
    slug: "contador-colonias-manual-acero-inoxidable",
    price: 20385.84,
    image: "https://image.made-in-china.com/202f0j00brUCTLctvsqp/SCITEK-Bacterial-Colony-Counter-laboratory-3-times-manual-colony-counter.webp",
    es: {
      name: "Contador de colonias manual en acero inoxidable",
      category: "Laboratorio" as Category,
      blurb: "Contador de colonias manual, acero inoxidable.",
      description: "Contador de colonias manual fabricado en acero inoxidable, con lupa de aumento para el conteo microbiológico en cajas Petri.",
      features: ["El conteo se realiza en forma manual.", "Pantalla display 5 dígitos, botón de borrado.", "Placa graduada de cristal.", "Manual de operación."],
    },
    en: {
      name: "Stainless steel manual colony counter",
      category: "Laboratory" as Category,
      blurb: "Manual colony counter, stainless steel.",
      description: "Manual colony counter made of stainless steel, with magnifying glass for microbiological counting in Petri dishes.",
      features: ["Counting is done manually.", "5-digit display screen, clear button.", "Graduated glass plate.", "Operation manual."],
    }
  },
  {
    id: 22,
    slug: "contador-diferencial-manual-9-teclas",
    price: 20078.15,
    image: "https://elcrisol.com.mx/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/h/e/heathhs5360b-p.jpg",
    es: {
      name: "Contador diferencial manual de 9 teclas",
      category: "Laboratorio" as Category,
      blurb: "Contador diferencial manual de 9 teclas.",
      description: "Contador diferencial manual de 9 teclas para el análisis hematológico en laboratorio clínico.",
      features: ["Cada tecla registra hasta 999.", "La ventana total realiza seguimiento general.", "Suena la campana a las 100 cuentas.", "mide: 320 x 76 x 56 mm."],
    },
    en: {
      name: "Manual 9-key differential counter",
      category: "Laboratory" as Category,
      blurb: "Manual 9-key differential counter.",
      description: "Manual 9-key differential counter for hematological analysis in clinical laboratory.",
      features: ["Each key registers up to 999.", "Total window keeps general track.", "Bell rings at 100 counts.", "Measures: 320 x 76 x 56 mm."],
    }
  },
  {
    id: 23,
    slug: "cortina-antibacteriana-170",
    price: 4326.8,
    image: "https://www.accrocher.com/wp-content/uploads/2024/04/Cortinas-Antibacterianas-Importadas-6.jpg",
    es: {
      name: "Cortina antibacteriana de 1.70 m largo × 2.41 m alto, con malla para perfil tubular",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Cortina antibacteriana con malla para perfil tubular.",
      description: "Cortina antibacteriana AEI Health con malla superior de 30 cm, diseñada para instalación en perfil tubular. Ofrece control higiénico.",
      features: ["Diseño con malla superior de 30 cm.", "Holgura: 15% para mejor caída.", "Ojillo: Diámetro de 1 1/2″.", "Material: Tejido antibacteriano para uso clínico."],
    },
    en: {
      name: "Antibacterial curtain 1.70 m length × 2.41 m height, with mesh for tubular profile",
      category: "Hospital Furniture" as Category,
      blurb: "Antibacterial curtain with mesh for tubular profile.",
      description: "AEI Health antibacterial curtain with 30 cm top mesh, designed for installation on tubular profile. Offers hygienic control.",
      features: ["Design with 30 cm top mesh.", "Slack: 15% for better drape.", "Eyelet: 1 1/2″ diameter.", "Material: Antibacterial fabric for clinical use."],
    }
  },
  {
    id: 24,
    slug: "cortina-antibacteriana-en-l",
    price: 13709.36,
    image: "https://http2.mlstatic.com/D_NQ_NP_654645-MLM72203483057_102023-O.webp",
    es: {
      name: "Cortina antibacteriana en L de 2.50 × 2.00 × 3.00 m altura",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Cortina antibacteriana en L para cubículos.",
      description: "Cortina antibacteriana en configuración en L, ideal para delimitar cubículos de pacientes. Medidas de 2.50 y 2.00 m de largo por 3.00 m de altura.",
      features: ["Configuración en L para cubículos", "Con malla en la parte superior de 30 cm.", "Incluye riel de aluminio extruido y correderas."],
    },
    en: {
      name: "L-shaped antibacterial curtain 2.50 × 2.00 × 3.00 m height",
      category: "Hospital Furniture" as Category,
      blurb: "L-shaped antibacterial curtain for cubicles.",
      description: "Antibacterial curtain in L configuration, ideal for delimiting patient cubicles. Measures 2.50 and 2.00 m long by 3.00 m high.",
      features: ["L-shaped configuration for cubicles", "With 30 cm top mesh.", "Includes extruded aluminum rail and gliders."],
    }
  },
  {
    id: 25,
    slug: "cubre-sonda-termometro-braun",
    price: 653.42,
    image: "https://m.media-amazon.com/images/I/5190KRtNPFL._AC_UF894,1000_QL80_.jpg",
    es: {
      name: "Cubre sonda para termómetro Braun (10 cajas con 20 piezas c/u)",
      category: "Insumos" as Category,
      blurb: "Cubre sondas desechables para termómetro Braun.",
      description: "Cubre sondas desechables compatibles con termómetros Braun, presentación de 10 cajas con 20 piezas cada una.",
      features: ["Compatibles con termómetro Welch Allyn Braun Thermo Scan PRO 6000.", "Paredes suaves para mayor comodidad.", "Desechables para evitar contaminación cruzada."],
    },
    en: {
      name: "Probe cover for Braun thermometer (10 boxes with 20 pieces each)",
      category: "Supplies" as Category,
      blurb: "Disposable probe covers for Braun thermometer.",
      description: "Disposable probe covers compatible with Braun thermometers, presentation of 10 boxes with 20 pieces each.",
      features: ["Compatible with Welch Allyn Braun Thermo Scan PRO 6000 thermometer.", "Soft walls for greater comfort.", "Disposable to prevent cross contamination."],
    }
  },
  {
    id: 26,
    slug: "data-logger-tactil-usb",
    price: 40671.31,
    image: "https://i0.wp.com/www.delca.com.mx/wp-content/uploads/2016/02/TSB_No_Probe_Left_Angle_-_Copy-12540.jpg?resize=275%2C234&ssl=1",
    es: {
      name: "Data Logger con pantalla táctil de 8 pulgadas y descarga USB",
      category: "Laboratorio" as Category,
      blurb: "Registrador de datos con pantalla táctil y USB.",
      description: "Data Logger diseñado para la supervisión de temperatura con pantalla táctil y múltiples configuraciones.",
      features: ["Pantalla táctil de 8 pulgadas.", "Frecuencia de muestreo personalizable.", "Alarmas audibles y visuales.", "Entrada USB.", "Batería recargable de respaldo (70 horas).", "Almacena hasta 1,000,000 de muestras."],
    },
    en: {
      name: "Data Logger with 8-inch touch screen and USB download",
      category: "Laboratory" as Category,
      blurb: "Data logger with touch screen and USB.",
      description: "Data Logger designed for temperature monitoring with touch screen and multiple configurations.",
      features: ["8-inch touch screen.", "Customizable sampling rate.", "Audible and visual alarms.", "USB input.", "Rechargeable backup battery (70 hours).", "Stores up to 1,000,000 samples."],
    }
  },
  {
    id: 27,
    slug: "doppler-fetal-bolsillo",
    price: 5048.9,
    image: "https://hergom-medical.com/cdn/shop/products/159687-800-auto_800x.webp?v=1766447498",
    es: {
      name: "Doppler fetal de bolsillo",
      category: "Equipo Médico" as Category,
      blurb: "Doppler fetal portátil de bolsillo.",
      description: "Doppler fetal de bolsillo para la detección de la frecuencia cardiaca fetal. Compacto y portátil, ideal para consulta ginecológica.",
      features: ["Transductor fetal: 3 MHz.", "Transductor vascular incluido.", "Operación simple con botón de encendido.", "Salida de sonido clara por altavoz o auriculares."],
    },
    en: {
      name: "Pocket fetal doppler",
      category: "Medical Equipment" as Category,
      blurb: "Portable pocket fetal doppler.",
      description: "Pocket fetal doppler for detecting fetal heart rate. Compact and portable, ideal for gynecological consultation.",
      features: ["Fetal transducer: 3 MHz.", "Vascular transducer included.", "Simple operation with power button.", "Clear sound output through speaker or headphones."],
    }
  },
  {
    id: 28,
    slug: "electrocardiografo-se1200-express",
    price: 67641.63,
    image: "https://novamedicasas.com/wp-content/uploads/2023/09/Electrocardiografo-SE-1200.jpg",
    es: {
      name: "Electrocardiógrafo multicanal con interpretación SE-1200 Express",
      category: "Equipo Médico" as Category,
      blurb: "Electrocardiógrafo multicanal con interpretación.",
      description: "Electrocardiógrafo multicanal SE-1200 Express. Equipo de diagnóstico cardiológico para hospitales y consultorios especializados.",
      features: ["Pantalla táctil a color de 8 pulgadas.", "Teclado alfanumérico.", "Interpretación de Glasgow incorporada.", "Almacenamiento interno de hasta 800 ECGs.", "Comunicación bidireccional de datos con DMS."],
    },
    en: {
      name: "SE-1200 Express multichannel electrocardiograph with interpretation",
      category: "Medical Equipment" as Category,
      blurb: "Multichannel electrocardiograph with interpretation.",
      description: "SE-1200 Express multichannel electrocardiograph. Cardiological diagnostic equipment for hospitals and specialized clinics.",
      features: ["8-inch color touch screen.", "Alphanumeric keyboard.", "Built-in Glasgow interpretation.", "Internal storage of up to 800 ECGs.", "Bidirectional data communication with DMS."],
    }
  },
  {
    id: 29,
    slug: "escalerilla-de-dedos",
    price: 3655.68,
    image: "https://www.rehabimedic.com/wp-content/uploads/2017/05/020110-1-thegem-product-single.jpg",
    es: {
      name: "Escalerilla de dedos",
      category: "Rehabilitación" as Category,
      blurb: "Escalerilla de dedos para rehabilitación de mano.",
      description: "Escalerilla de dedos para ejercicios de rehabilitación de mano y muñeca. Ayuda a ejercitar y rehabilitar miembros superiores.",
      features: ["36 escalones con una separación de 3.17 cm.", "Fabricada en madera de pino estufada.", "Base de tinta blanca y barniz.", "Incluye 2 juegos de tornillo para instalación."],
    },
    en: {
      name: "Finger ladder",
      category: "Rehabilitation" as Category,
      blurb: "Finger ladder for hand rehabilitation.",
      description: "Finger ladder for hand and wrist rehabilitation exercises. Helps exercise and rehabilitate upper limbs.",
      features: ["36 steps with a 3.17 cm separation.", "Made of kiln-dried pine wood.", "White stain base and varnish.", "Includes 2 sets of screws for installation."],
    }
  },
  {
    id: 30,
    slug: "esferometro-precision-u15030",
    price: 20679.02,
    image: "https://m.media-amazon.com/images/I/61fDq03n2vL._AC_UF894,1000_QL80_.jpg",
    es: {
      name: "Esferómetro de precisión U15030",
      category: "Laboratorio" as Category,
      blurb: "Esferómetro de precisión modelo U15030.",
      description: "Esferómetro de precisión U15030 para la medición de radios de curvatura y espesores con alta exactitud.",
      features: ["Trípode de acero.", "Tornillo micrométrico con punta de medición.", "Rango de medición: 0 – 25 mm y -10 – 15 mm.", "Precisión de medida: 0,001 mm."],
    },
    en: {
      name: "U15030 precision spherometer",
      category: "Laboratory" as Category,
      blurb: "Precision spherometer model U15030.",
      description: "U15030 precision spherometer for measuring radii of curvature and thicknesses with high accuracy.",
      features: ["Steel tripod.", "Micrometer screw with measuring tip.", "Measuring range: 0 – 25 mm and -10 – 15 mm.", "Measurement accuracy: 0.001 mm."],
    }
  },
  {
    id: 31,
    slug: "estacion-bombas-infusion-hedy",
    price: 13666.25,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/4/0/6/8/6/40686-large_default.jpg",
    es: {
      name: "Estación para bombas de infusión y perfusión marca HEDY",
      category: "Equipo Médico" as Category,
      blurb: "Estación de acople para bombas de infusión HEDY.",
      description: "Estación marca HEDY para el acople y gestión de múltiples bombas de infusión y perfusión. Organiza la terapia intravenosa en cuidados intensivos.",
      features: ["El módulo permite acoplar simultáneamente varias bombas de infusión o perfusión (modelos i5 y s5)"],
    },
    en: {
      name: "Docking station for HEDY infusion and perfusion pumps",
      category: "Medical Equipment" as Category,
      blurb: "Docking station for HEDY infusion pumps.",
      description: "HEDY brand station for docking and managing multiple infusion and perfusion pumps. Organizes intravenous therapy in intensive care.",
      features: ["The module allows simultaneously docking several infusion or perfusion pumps (models i5 and s5)"],
    }
  },
  {
    id: 32,
    slug: "estetoscopio-littmann-classic-iii-5620",
    price: 6265.45,
    image: "https://proveedoramedical.com/wp-content/uploads/2023/05/MC40.jpg",
    es: {
      name: "Estetoscopio Littmann® Classic III adulto, color negro 5620",
      category: "Instrumental" as Category,
      blurb: "Estetoscopio Littmann® Classic III adulto.",
      description: "Estetoscopio compacto y sensible, ideal para el monitoreo y evaluación de pacientes pediátricos y adultos.",
      features: ["Diseño de doble cara con campana de acero inoxidable.", "Lado pediátrico convertible en campana abierta.", "Auriculares ajustables y olivas suaves.", "Adecuado para entornos de atención no crítica."],
    },
    en: {
      name: "Littmann® Classic III adult stethoscope, black 5620",
      category: "Instruments" as Category,
      blurb: "Littmann® Classic III adult stethoscope.",
      description: "Compact and sensitive stethoscope, ideal for monitoring and assessing pediatric and adult patients.",
      features: ["Double-sided design with stainless steel chestpiece.", "Pediatric side convertible into an open bell.", "Adjustable headset and soft-sealing eartips.", "Suitable for non-critical care environments."],
    }
  },
  {
    id: 33,
    slug: "estuche-diagnostico-halogeno-3-5v",
    price: 16874.52,
    image: "https://medicazodiaco.com/wp-content/uploads/2017/03/97200WA.jpg",
    es: {
      name: "Estuche de diagnóstico recargable de halógeno 3.5 V",
      category: "Instrumental" as Category,
      blurb: "Estuche de diagnóstico recargable de halógeno 3.5 V.",
      description: "Estuche de diagnóstico recargable con iluminación halógena de 3.5 V para la exploración de ojos, oídos, nariz y garganta.",
      features: ["Oftalmoscopio coaxial de 3.5 V.", "Otoscopio de diagnóstico.", "Mango con batería de niquel-cadmio recargable.", "Iluminador nasal de 3.5 V.", "Estuche rígido."],
    },
    en: {
      name: "3.5 V halogen rechargeable diagnostic set",
      category: "Instruments" as Category,
      blurb: "3.5 V halogen rechargeable diagnostic set.",
      description: "Rechargeable diagnostic set with 3.5 V halogen illumination for eye, ear, nose, and throat examination.",
      features: ["3.5 V coaxial ophthalmoscope.", "Diagnostic otoscope.", "Handle with rechargeable nickel-cadmium battery.", "3.5 V nasal illuminator.", "Hard case."],
    }
  },
  {
    id: 34,
    slug: "kit-baumanometro-aneroide-ag1-30",
    price: 531.34,
    image: "https://alltc.com.mx/cdn/shop/files/BaumanometroMICROLIFE.jpg?v=1705521359",
    es: {
      name: "Kit baumanómetro aneroide con estetoscopio BP AG1-30",
      category: "Instrumental" as Category,
      blurb: "Kit baumanómetro aneroide + estetoscopio.",
      description: "Kit de baumanómetro aneroide con estetoscopio modelo BP AG1-30 para la toma de presión arterial.",
      features: ["Estetoscopio separado", "Manómetro integrado en el equipo.", "Brazalete profesional ajustable de 22-32 cm", "Campana doble", "Pera de inflado y válvula", "Estuche de nylon"],
    },
    en: {
      name: "Aneroid sphygmomanometer kit with BP AG1-30 stethoscope",
      category: "Instruments" as Category,
      blurb: "Aneroid sphygmomanometer + stethoscope kit.",
      description: "Aneroid sphygmomanometer kit with BP AG1-30 stethoscope for blood pressure measurement.",
      features: ["Separate stethoscope", "Manometer integrated into the equipment.", "Adjustable professional cuff 22-32 cm", "Double chestpiece", "Inflation bulb and valve", "Nylon case"],
    }
  },
  {
    id: 35,
    slug: "lampara-localizadora-venas-adultos",
    price: 9258.25,
    image: "https://www.beracahmedica.mx/web/image/product.product/12022/image_1920?unique=e0e7d33",
    es: {
      name: "Lámpara localizadora de venas para adultos",
      category: "Equipo Médico" as Category,
      blurb: "Localizador de venas por luz para adultos.",
      description: "Lámpara localizadora de venas para adultos que facilita la visualización del trayecto venoso, mejorando el éxito en punciones.",
      features: ["2 colores de LED optimizados.", "24 Luces LED.", "Cubiertas plásticas desechables.", "Con protector de luz.", "Batería recargable y cargador."],
    },
    en: {
      name: "Vein finder lamp for adults",
      category: "Medical Equipment" as Category,
      blurb: "Light vein finder for adults.",
      description: "Vein finder lamp for adults that facilitates visualization of the venous path, improving puncture success.",
      features: ["2 optimized LED colors.", "24 LED lights.", "Disposable plastic covers.", "With light shield.", "Rechargeable battery and charger."],
    }
  },
  {
    id: 36,
    slug: "lavabo-cirujano-sencillo-sin-valvula",
    price: 21470.15,
    image: "https://www.accutomex.com/wp-content/uploads/2024/09/LAVABO-PARA-CIRUGIA.jpg",
    es: {
      name: "Lavabo para cirujano sencillo de acero inoxidable, sin válvula",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Lavabo quirúrgico sencillo de acero inoxidable.",
      description: "Lavabo para cirujano de una posición, fabricado en acero inoxidable, sin válvula. Diseñado para el lavado quirúrgico.",
      features: ["Cuerpo de lámina de acero inoxidable.", "Calibre 18 tipo 304.", "Acabado pulido sanitario.", "Sin válvula de rodilla."],
    },
    en: {
      name: "Single stainless steel surgeon sink, without valve",
      category: "Hospital Furniture" as Category,
      blurb: "Single stainless steel surgical sink.",
      description: "One-position surgeon sink, made of stainless steel, without valve. Designed for surgical scrubbing.",
      features: ["Stainless steel sheet body.", "18-gauge type 304.", "Sanitary polished finish.", "Without knee valve."],
    }
  },
  {
    id: 37,
    slug: "lavabo-pasteur-izquierdo-120cm",
    price: 34121.4,
    image: "https://www.blesmed.com.mx/wp-content/uploads/2020/11/lavabopasteur2.jpg",
    es: {
      name: "Lavabo Pasteur izquierdo de 120 cm de acero inoxidable",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Lavabo Pasteur izquierdo de 120 cm.",
      description: "Lavabo Pasteur orientación izquierda de 120 cm, fabricado en acero inoxidable.",
      features: ["Cubierta de lámina acero inoxidable calibre 18.", "Orientación izquierda", "Estructura de perfil cuadrado de acero inoxidable.", "Puertas de tambor con jaladera integrada.", "No incluye accesorios."],
    },
    en: {
      name: "120 cm left stainless steel Pasteur sink",
      category: "Hospital Furniture" as Category,
      blurb: "120 cm left Pasteur sink.",
      description: "Left orientation Pasteur sink of 120 cm, made of stainless steel.",
      features: ["18-gauge stainless steel sheet top.", "Left orientation", "Stainless steel square profile structure.", "Drum doors with integrated handle.", "Accessories not included."],
    }
  },
  {
    id: 38,
    slug: "maniqui-cpr-prompt-adulto-nino",
    price: 5686.83,
    image: "https://shop.nascohealthcare.com/cdn/shop/products/LF06003-main_21959cd2-9477-42c7-aacb-ca46c8026fff_535x.jpg?v=1582601148",
    es: {
      name: "Maniquí CPR Prompt adulto/niño para RCP",
      category: "Capacitación" as Category,
      blurb: "Maniquí de RCP adulto/niño CPR Prompt.",
      description: "Maniquí CPR Prompt para entrenamiento de reanimación cardiopulmonar en adulto y niño. Herramienta didáctica para primeros auxilios.",
      features: ["Inclinación de la cabeza para abrir vías respiratorias.", "Marcas anatómicas precisas.", "“Clic” audible para compresión correcta.", "Bolsas sustituibles de pulmones.", "Selector de edad para ajuste de pistón."],
    },
    en: {
      name: "CPR Prompt adult/child manikin for CPR",
      category: "Training" as Category,
      blurb: "CPR Prompt adult/child CPR manikin.",
      description: "CPR Prompt manikin for cardiopulmonary resuscitation training in adults and children. Educational tool for first aid.",
      features: ["Head tilt to open airways.", "Precise anatomical landmarks.", "Audible 'click' for correct compression.", "Replaceable lung bags.", "Age selector for piston adjustment."],
    }
  },
  {
    id: 39,
    slug: "maniqui-entrenamiento-rcp-basicbilly",
    price: 26099.99,
    image: "https://www.3bscientific.com/thumblibrary/P72-D/P72-D_02_1200_1200_Simulador-de-soporte-de-constantes-vitales-BASICBilly-tono-de-piel-oscuro.jpg",
    es: {
      name: "Maniquí de entrenamiento RCP BASICBilly+",
      category: "Capacitación" as Category,
      blurb: "Maniquí avanzado de RCP BASICBilly+.",
      description: "Maniquí de entrenamiento RCP BASICBilly+ con retroalimentación en tiempo real para cursos avanzados de reanimación.",
      features: ["Vías respiratorias desechables.", "Indicadores de profundidad y frecuencia.", "Elevación torácica visible.", "Compatible con apps de tecnología heartisense®."],
    },
    en: {
      name: "BASICBilly+ CPR training manikin",
      category: "Training" as Category,
      blurb: "BASICBilly+ advanced CPR manikin.",
      description: "BASICBilly+ CPR training manikin with real-time feedback for advanced resuscitation courses.",
      features: ["Disposable airways.", "Depth and rate indicators.", "Visible chest rise.", "Compatible with heartisense® technology apps."],
    }
  },
  {
    id: 40,
    slug: "maniqui-infantil-rcp-baby-tyler",
    price: 8683.74,
    image: "https://m.media-amazon.com/images/I/71YRZgJgorL.jpg",
    es: {
      name: "Maniquí infantil realista para RCP modelo Baby Tyler",
      category: "Capacitación" as Category,
      blurb: "Maniquí infantil de RCP Baby Tyler.",
      description: "Maniquí infantil realista Baby Tyler para entrenamiento de RCP neonatal y pediátrico.",
      features: ["Tamaño y movimientos realistas.", "Respiración realista.", "Monitor inalámbrico de retroalimentación de RCP (Guías AHA 2020).", "Práctica de desobstrucción de vía aérea.", "Movimiento completo de extremidades."],
    },
    en: {
      name: "Realistic infant CPR manikin model Baby Tyler",
      category: "Training" as Category,
      blurb: "Baby Tyler infant CPR manikin.",
      description: "Realistic Baby Tyler infant manikin for neonatal and pediatric CPR training.",
      features: ["Realistic size and movements.", "Realistic breathing.", "Wireless CPR feedback monitor (2020 AHA Guidelines).", "Airway obstruction clearance practice.", "Full range of motion of limbs."],
    }
  },
  {
    id: 41,
    slug: "mesa-alta-180-doble-fregadero",
    price: 41502.33,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/3/9/4/7/1/39471.jpg",
    es: {
      name: "Mesa alta de 180 cm con doble fregadero central y cajones",
      category: "Laboratorio" as Category,
      blurb: "Mesa de laboratorio 180 cm, doble fregadero.",
      description: "Mesa de trabajo fabricada en acero inoxidable con doble fregadero central, diseñada para uso en laboratorios y áreas de trabajo higiénicas.",
      features: ["Cubierta de acero inoxidable calibre 18.", "Doble fregadero central (40 x 45 x 19 cm).", "Dos cajones con jaladera integral.", "Estructura de perfil cuadrado de acero.", "No incluye accesorios."],
    },
    en: {
      name: "180 cm high table with double central sink and drawers",
      category: "Laboratory" as Category,
      blurb: "180 cm laboratory table, double sink.",
      description: "Work table made of stainless steel with double central sink, designed for use in laboratories and hygienic work areas.",
      features: ["18-gauge stainless steel top.", "Double central sink (40 x 45 x 19 cm).", "Two drawers with integral handle.", "Steel square profile structure.", "Accessories not included."],
    }
  },
  {
    id: 42,
    slug: "mesa-alta-tratamiento",
    price: 15453.38,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTi6Tr5I35iEy1YfsRoUX8SrCs5LIMeD9qeQKoG56LZ3ZqwnAC9L7ty5u91l4jMAmTlmMWsvgT7taPDa6cNScqPepMJmdMe",
    es: {
      name: "Mesa alta para tratamiento",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Mesa alta para tratamiento clínico.",
      description: "Mesa alta para tratamiento, con superficie acolchada y estructura resistente.",
      features: ["Base fabricada en madera de pino con tratamiento retardante a la flama.", "Colchón desmontable de poliuretano de 7 cm, forrado con vinil."],
    },
    en: {
      name: "High treatment table",
      category: "Hospital Furniture" as Category,
      blurb: "High clinical treatment table.",
      description: "High treatment table, with padded surface and sturdy structure.",
      features: ["Base made of pine wood with flame retardant treatment.", "7 cm polyurethane removable mattress, upholstered with vinyl."],
    }
  },
  {
    id: 43,
    slug: "mesa-baja-tratamiento",
    price: 13035.5,
    image: "https://www.rehabimedic.com/wp-content/uploads/2017/08/010101.jpg",
    es: {
      name: "Mesa baja para tratamiento",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Mesa baja para tratamiento clínico.",
      description: "Mesa baja para tratamiento, de altura cómoda para procedimientos y terapias.",
      features: ["Base fabricada en madera de pino con tratamiento retardante a la flama.", "Tapizado lavable", "Colchón desmontable de poliuretano forrado con vinil."],
    },
    en: {
      name: "Low treatment table",
      category: "Hospital Furniture" as Category,
      blurb: "Low clinical treatment table.",
      description: "Low treatment table, with a comfortable height for procedures and therapies.",
      features: ["Base made of pine wood with flame retardant treatment.", "Washable upholstery", "Removable polyurethane mattress upholstered with vinyl."],
    }
  },
  {
    id: 44,
    slug: "mesa-inclinacion-electrica-remmy",
    price: 66607.2,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/1/2/1/5/0/12150.jpg",
    es: {
      name: "Mesa de inclinación eléctrica para paciente Mod. REMMY",
      category: "Rehabilitación" as Category,
      blurb: "Mesa de inclinación eléctrica REMMY.",
      description: "Mesa de inclinación eléctrica modelo REMMY para pruebas y rehabilitación de pacientes.",
      features: ["Estructura: Metálica cubierta con pintura epóxica.", "2 motores eléctricos de 24 volts.", "Ruedas: 4, para fácil movilidad.", "Cinturones: 3 para sujetar.", "Tapiz: Ignífugo de categoría M2.", "Soporta 150 kg.", "Para rehabilitación, laboratorio vascular y evaluaciones."],
    },
    en: {
      name: "Electric tilt table for patient Mod. REMMY",
      category: "Rehabilitation" as Category,
      blurb: "REMMY electric tilt table.",
      description: "REMMY model electric tilt table for patient testing and rehabilitation.",
      features: ["Structure: Metallic covered with epoxy paint.", "Two 24-volt electric motors.", "Wheels: 4, for easy mobility.", "Belts: 3 for securing.", "Upholstery: M2 category fireproof.", "Supports 150 kg.", "For rehabilitation, vascular laboratory and evaluations."],
    }
  },
  {
    id: 45,
    slug: "mesa-exploracion-pediatrica-esmaltada",
    price: 14215.8,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/3/8/9/5/5/38955.jpg",
    es: {
      name: "Mesa para exploración pediátrica esmaltada",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Mesa de exploración pediátrica esmaltada.",
      description: "Mesa para exploración pediátrica con estructura esmaltada. Cajonera integrada y superficie cómoda.",
      features: ["Fabricada en lámina de acero calibre 22.", "Barandal en forma de “L”.", "Tres cajones con jaladera integrada y gabinete con puerta.", "Escalón integrado, porta bahumanometro y porta báscula.", "Colchon en dos secciones forrado en vinil negro."],
    },
    en: {
      name: "Enameled pediatric examination table",
      category: "Hospital Furniture" as Category,
      blurb: "Enameled pediatric examination table.",
      description: "Pediatric examination table with enameled structure. Integrated drawer unit and comfortable surface.",
      features: ["Made of 22-gauge steel sheet.", "“L” shaped side rail.", "Three drawers with integrated handle and cabinet with door.", "Integrated step, sphygmomanometer holder and scale holder.", "Two-section mattress upholstered in black vinyl."],
    }
  },
  {
    id: 46,
    slug: "mesa-puente-abs-mpah",
    price: 9638.52,
    image: "https://www.beracahmedica.mx/web/image/product.product/17176/image_1920?unique=cb25394",
    es: {
      name: "Mesa puente de ABS modelo MPAH",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Mesa puente de ABS modelo MPAH.",
      description: "Mesa puente de ABS modelo MPAH, con altura ajustable para uso sobre la cama del paciente.",
      features: ["Material: Plástico ABS.", "Control de altura mediante pistón.", "4 ruedas de desplazamiento suave con frenos.", "Diseño con portavasos y borde elevado anticolisión."],
    },
    en: {
      name: "MPAH model ABS overbed table",
      category: "Hospital Furniture" as Category,
      blurb: "MPAH model ABS overbed table.",
      description: "MPAH model ABS overbed table, with adjustable height for use over the patient's bed.",
      features: ["Material: ABS Plastic.", "Height control via piston.", "4 smooth-rolling wheels with brakes.", "Design with cupholders and raised anti-collision edge."],
    }
  },
  {
    id: 47,
    slug: "microscopio-monocular-le800",
    price: 10495.68,
    image: "https://www.perea-borobio.com/wp-content/uploads/2019/06/MG_7767.jpg",
    es: {
      name: "Microscopio monocular LE800",
      category: "Laboratorio" as Category,
      blurb: "Microscopio monocular modelo LE800.",
      description: "Microscopio monocular LE800 para observación de laboratorio con óptica de calidad e iluminación integrada.",
      features: ["Cabeza monocular ángulo de inclinación a 45° giratoria 360°", "Amplificación 4x a 640 aumentos", "Revólver triple para 3 objetivos", "Platina fija con dos pinzas de sujeción", "Fuente de iluminación eléctrica (LED)"],
    },
    en: {
      name: "LE800 monocular microscope",
      category: "Laboratory" as Category,
      blurb: "Monocular microscope model LE800.",
      description: "LE800 monocular microscope for laboratory observation with quality optics and integrated illumination.",
      features: ["Monocular head 45° inclination angle, 360° rotatable", "Magnification 4x to 640x", "Triple nosepiece for 3 objectives", "Fixed stage with two stage clips", "Electric illumination source (LED)"],
    }
  },
  {
    id: 48,
    slug: "monitor-signos-vitales-12-msvg",
    price: 25363.4,
    image: "https://neotecnia.mx/cdn/shop/files/UCF6001-removebg-preview_400x@2x.png?v=1757551058",
    es: {
      name: "Monitor de signos vitales de 12\" multiparámetro con opción a capnografía MSVG",
      category: "Equipo Médico" as Category,
      blurb: "Monitor multiparámetro 12\" con capnografía opcional.",
      description: "Monitor multiparamétrico diseñado para la medición continua de signos vitales en pacientes adultos, pediátricos y neonatales. Pantalla LCD TFT de 12,1 pulgadas.",
      features: ["Pantalla a color de 12\"", "Alarmas configurables", "Hasta 8 formas de onda de ECG simultáneas", "Opción a capnografía sidestream y mainstream"],
    },
    en: {
      name: "12\" multiparameter vital signs monitor with capnography option MSVG",
      category: "Medical Equipment" as Category,
      blurb: "12\" multiparameter monitor with optional capnography.",
      description: "Multiparameter monitor designed for continuous measurement of vital signs in adult, pediatric and neonatal patients. 12.1-inch TFT LCD screen.",
      features: ["12\" color screen", "Configurable alarms", "Up to 8 simultaneous ECG waveforms", "Sidestream and mainstream capnography option"],
    }
  },
  {
    id: 49,
    slug: "muletas-axilares-ajustables",
    price: 632.2,
    image: "https://acdn-us.mitiendanube.com/stores/007/664/983/products/10_b108577f-c5f5-4fe0-ab6f-3ce3c1729437-1e81884bfebe76ec5817787914909147-1024-1024.webp",
    es: {
      name: "Muletas axilares ajustables de aluminio",
      category: "Rehabilitación" as Category,
      blurb: "Muletas axilares ajustables de aluminio.",
      description: "Muletas axilares ajustables fabricadas en aluminio ligero y resistente, para soporte en rehabilitación.",
      features: ["Axileras y puños acojinados.", "Tubos de aluminio ajustables a 9 alturas.", "Regaton antiderrapantes.", "Soporta 135 kgs.", "Disponibles en 3 tamaños: Chica, Mediana, Grande."],
    },
    en: {
      name: "Adjustable aluminum axillary crutches",
      category: "Rehabilitation" as Category,
      blurb: "Adjustable aluminum axillary crutches.",
      description: "Adjustable axillary crutches made of lightweight and resistant aluminum, for support in rehabilitation.",
      features: ["Cushioned underarm pads and handgrips.", "Aluminum tubes adjustable to 9 heights.", "Non-slip tips.", "Supports 135 kg.", "Available in 3 sizes: Small, Medium, Large."],
    }
  },
  {
    id: 50,
    slug: "portavenoclisis-resonancia-magnetica",
    price: 38995.49,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/4/0/3/6/7/40367.jpg",
    es: {
      name: "Portavenoclisis para resonancia magnética",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Portavenoclisis compatible con resonancia magnética.",
      description: "Éste portavenoclisis está diseñado específicamente para su uso seguro en entornos de resonancia magnética. Fabricado con materiales antimagnéticos, garantiza la seguridad tanto del paciente como del personal médico durante procedimientos de RM.",
      features: ["Fabricado con materiales no ferromagnéticos.", "Estructura de alta resistencia.", "Altura ajustable.", "Base con ruedas que facilita el desplazamiento.", "Ganchos dobles para soluciones intravenosas."],
    },
    en: {
      name: "MRI compatible IV pole",
      category: "Hospital Furniture" as Category,
      blurb: "MRI compatible IV pole.",
      description: "This IV pole is specifically designed for safe use in magnetic resonance imaging environments. Made with anti-magnetic materials, it guarantees the safety of both the patient and medical staff during MRI procedures.",
      features: ["Made with non-ferromagnetic materials.", "High strength structure.", "Adjustable height.", "Base with casters for easy movement.", "Double hooks for intravenous solutions."],
    }
  },
  {
    id: 51,
    slug: "refrigerador-medico-7-88",
    price: 54048.08,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/4/1/0/5/5/41055.jpg",
    es: {
      name: "Refrigerador médico de 7.88 pies cúbicos con puerta de cristal",
      category: "Laboratorio" as Category,
      blurb: "Refrigerador médico de 5°c a 3°c con puerta de cristal",
      description: "El refrigerador médico VMC12A está diseñado exclusivamente para el almacenamiento seguro de productos médicos y biológicos en hospitales. Su control de temperatura inteligente y materiales de alta calidad garantizan la conservación óptima de los productos.",
      features: ["Control de temperatura TDP y alarmas visuales.", "Gabinete de acero inoxidable.", "Puerta de vidrio con protección UV.", "Evaporador Supercontinuo y compresor de alta eficiencia.", "Iluminación LED y parrillas ajustables."],
    },
    en: {
      name: "7.88 cubic feet medical refrigerator with glass door",
      category: "Laboratory" as Category,
      blurb: "Medical refrigerator 5°c to 3°c with glass door",
      description: "The VMC12A medical refrigerator is designed exclusively for the safe storage of medical and biological products in hospitals. Its intelligent temperature control and high quality materials guarantee optimal preservation of products.",
      features: ["TDP temperature control and visual alarms.", "Stainless steel cabinet.", "Glass door with UV protection.", "Super-continuous evaporator and high-efficiency compressor.", "LED lighting and adjustable shelves."],
    }
  },
  {
    id: 52,
    slug: "refrigerador-medico-vertical-vmc-12m1",
    price: 54357.48,
    image: "https://www.inmeza.com/cdn/shop/files/ImberaVMC12-M11024061EnfriadorMedicoVerticalAceroInox334.34litros_600x600.jpg?v=1700855933",
    es: {
      name: "Refrigerador médico vertical con Luz LED de 12 pies modelo VMC-12M1",
      category: "Laboratorio" as Category,
      blurb: "Refrigerador vertical médico de 12 pies con iluminación LED.",
      description: "Refrigerador vertical diseñado para conservar medicamentos, reactivos o muestras biológicas a temperatura controlada. Su sistema de refrigeración con gas ecológico y su iluminación LED interna garantizan una visibilidad óptima y un funcionamiento eficiente en entornos clínicos o de laboratorio.",
      features: ["Capacidad: 12 pies cúbicos (223.10 L / 7.88 ft³).", "Temperatura de operación: 5 °C ± 3 °C.", "Tipo de refrigerante: R134a.", "Iluminación: LED.", "Color del gabinete: Blanco.", "Parrillas: 2.", "Compresor: Hermético.", "Alimentación eléctrica: 115 V / 60 Hz.", "Potencia: 425.5 W.", "Corriente nominal: 3.7 A.", "Construcción: Lámina prepintada y espumado con ciclopentano de alta calidad.", "Tolva: Fabricada en ABS color blanco.", "Nivelación: Patas ajustables.", "Certificación: NOM-022.", "No incluye: Graficador de temperatura ni rodamiento."],
    },
    en: {
      name: "12 cubic feet vertical medical refrigerator with LED Light model VMC-12M1",
      category: "Laboratory" as Category,
      blurb: "12 cubic feet vertical medical refrigerator with LED lighting.",
      description: "Vertical refrigerator designed to preserve medicines, reagents or biological samples at controlled temperature. Its refrigeration system with ecological gas and its internal LED lighting guarantee optimal visibility and efficient operation in clinical or laboratory environments.",
      features: ["Capacity: 12 cubic feet (223.10 L / 7.88 ft³).", "Operating temperature: 5 °C ± 3 °C.", "Refrigerant type: R134a.", "Lighting: LED.", "Cabinet color: White.", "Shelves: 2.", "Compressor: Hermetic.", "Power supply: 115 V / 60 Hz.", "Power: 425.5 W.", "Nominal current: 3.7 A.", "Construction: Pre-painted sheet and high quality cyclopentane foaming.", "Hopper: Made of white ABS.", "Leveling: Adjustable legs.", "Certification: NOM-022.", "Does not include: Temperature recorder or casters."],
    }
  },
  {
    id: 53,
    slug: "scooter-electrico-ortopedico-todoterreno-4-ruedas",
    price: 15138.0,
    image: "https://m.media-amazon.com/images/I/61-E0GEwrbL._AC_UF1000,1000_QL80_.jpg",
    es: {
      name: "Scooter eléctrico ortopédico todoterreno de 4 ruedas",
      category: "Rehabilitación" as Category,
      blurb: "Scooter eléctrico ortopédico diseñado para proporcionar movilidad cómoda.",
      description: "El Scooter eléctrico ortopédico OT8C37 está diseñado para proporcionar una movilidad cómoda y segura en interiores y exteriores. Su estructura resistente, combinada con un diseño ergonómico, lo hace ideal para personas que requieren asistencia en sus desplazamientos diarios.",
      features: ["Estructura resistente: Fabricado en acero con chasis de policarbonato.", "Movilidad segura: Ruedas texturizadas y ruedas antivuelco para mayor estabilidad.", "Asiento ergonómico: Giratorio a 360°, ajustable a 3 alturas, con funda de vinil.", "Capacidad de carga: Soporta hasta 120 kg.", "Diseño práctico: Incluye bolsa portaobjetos en el asiento y canasta desmontable con asa.", "Descansabrazos ajustables: Plegables y ajustables para mayor comodidad.", "Manubrio ajustable: Permite distintas inclinaciones para mejor control.", "Panel de control intuitivo: Interruptor de llave, Dial de ajuste de velocidad, Indicador de encendido, Botón de luz LED frontal, Bocina de advertencia, Palancas direccionales."],
    },
    en: {
      name: "4-wheel all-terrain orthopedic electric scooter",
      category: "Rehabilitation" as Category,
      blurb: "Orthopedic electric scooter designed to provide comfortable mobility.",
      description: "The OT8C37 orthopedic electric scooter is designed to provide comfortable and safe mobility indoors and outdoors. Its robust structure, combined with an ergonomic design, makes it ideal for people who require assistance in their daily commutes.",
      features: ["Sturdy structure: Made of steel with polycarbonate chassis.", "Safe mobility: Textured wheels and anti-tip wheels for greater stability.", "Ergonomic seat: 360° swivel, adjustable to 3 heights, with vinyl cover.", "Load capacity: Supports up to 120 kg.", "Practical design: Includes storage bag on the seat and removable basket with handle.", "Adjustable armrests: Folding and adjustable for greater comfort.", "Adjustable handlebar: Allows different inclinations for better control.", "Intuitive control panel: Key switch, Speed adjustment dial, Power indicator, Front LED light button, Warning horn, Directional levers."],
    }
  },
  {
    id: 54,
    slug: "silla-comodo-multifuncional-ajustable",
    price: 2514.07,
    image: "https://m.media-amazon.com/images/I/61MShRVe1HL._AC_UF894,1000_QL80_.jpg",
    es: {
      name: "Silla comodo multifuncional y ajustable",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Silla cómodo multifuncional y ajustable.",
      description: "Silla cómodo diseñada para facilitar la higiene y comodidad del usuario, con estructura ajustable y materiales resistentes para un uso seguro y duradero.",
      features: ["Estructura de aluminio anodizado, resistente y de alta durabilidad.", "Asiento acolchonado de PVC en color azul, con diseño ergonómico para mayor comodidad.", "Descansabrazos fijos con cubierta acolchonada de espuma EVA.", "Regatones antideslizantes para máxima estabilidad y agarre.", "Ajuste de anchura con seguro tipo C, configurable en 6 niveles.", "Ajuste de altura en 7 niveles, de 70 a 85 cm.", "Tecnología KD (Knock Down) para fácil ensamble y almacenamiento."],
    },
    en: {
      name: "Multifunctional and adjustable commode chair",
      category: "Hospital Furniture" as Category,
      blurb: "Multifunctional and adjustable commode chair.",
      description: "Commode chair designed to facilitate user hygiene and comfort, with adjustable structure and resistant materials for safe and long-lasting use.",
      features: ["Anodized aluminum structure, resistant and highly durable.", "Padded PVC seat in blue color, with ergonomic design for greater comfort.", "Fixed armrests with padded EVA foam cover.", "Non-slip tips for maximum stability and grip.", "Width adjustment with C-type lock, configurable in 6 levels.", "Height adjustment in 7 levels, from 70 to 85 cm.", "KD (Knock Down) technology for easy assembly and storage."],
    }
  },
  {
    id: 55,
    slug: "silla-ruedas-traslado-plegable-ultraligera",
    price: 4014.6,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_UENHnOlJ9_aWpN0HglNSaOsz74InQrUIZhx8CCfymrBtQCIsKyDTKRs&s=10",
    es: {
      name: "Silla de ruedas de traslado plegable ultraligera, capacidad de carga 110 kg",
      category: "Rehabilitación" as Category,
      blurb: "Silla de ruedas de traslado plegable ultraligera.",
      description: "Silla de ruedas de traslado plegable ultraligera diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Ultralight folding transport wheelchair, 110 kg load capacity",
      category: "Rehabilitation" as Category,
      blurb: "Ultralight folding transport wheelchair.",
      description: "Ultralight folding transport wheelchair designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 56,
    slug: "silla-ruedas-electrica-16-100kg",
    price: 22202.4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwZ1BCqmHpLoNufq2NnAY9b06iMFLaVK-XUgvNe8h-CKOcZeElPOAOnmKq&s=10",
    es: {
      name: "Silla de ruedas eléctrica de 16\" soporta hasta 100 kg",
      category: "Rehabilitación" as Category,
      blurb: "Silla de ruedas eléctrica de 16\".",
      description: "Silla de ruedas eléctrica de 16\" soporta hasta 100 kg diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "16\" electric wheelchair supports up to 100 kg",
      category: "Rehabilitation" as Category,
      blurb: "16\" electric wheelchair.",
      description: "16\" electric wheelchair supports up to 100 kg designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 57,
    slug: "silla-toma-muestra-cajon",
    price: 12876.0,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/3/8/7/9/2/38792.jpg",
    es: {
      name: "Silla para toma de muestra con cajón",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Silla para toma de muestra con cajón integrado.",
      description: "Silla para toma de muestra con cajón diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Blood drawing chair with drawer",
      category: "Hospital Furniture" as Category,
      blurb: "Blood drawing chair with integrated drawer.",
      description: "Blood drawing chair with drawer designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 58,
    slug: "sillon-hospitalario-multiposicion-accesorios",
    price: 103103.35,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/4/0/6/1/7/40617-home_default.jpg",
    es: {
      name: "Sillón hospitalario multiposición con accesorios incluidos",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Sillón hospitalario multiposición.",
      description: "Sillón hospitalario multiposición con accesorios incluidos diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Multiposition hospital recliner with accessories included",
      category: "Hospital Furniture" as Category,
      blurb: "Multiposition hospital recliner.",
      description: "Multiposition hospital recliner with accessories included designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 59,
    slug: "sillon-reclinable-electrico-tres-posiciones",
    price: 25979.36,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/4/1/8/2/9/41829-large_default.jpg",
    es: {
      name: "Sillón reclinable eléctrico, tres posiciones",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Sillón reclinable eléctrico de tres posiciones.",
      description: "Sillón reclinable eléctrico diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Electric recliner chair, three positions",
      category: "Hospital Furniture" as Category,
      blurb: "Three-position electric recliner chair.",
      description: "Electric recliner chair designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 60,
    slug: "soporte-parcial-peso-ajuste-altura-manual",
    price: 129773.55,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrf2pIlUwPUtntJsOdfEFEew5XjYwyutnwUZGAkg7XVfL6cv_JnLjrids&s=10",
    es: {
      name: "Soporte parcial de peso con ajuste de altura manual",
      category: "Rehabilitación" as Category,
      blurb: "Soporte parcial de peso con ajuste de altura.",
      description: "Soporte parcial de peso con ajuste de altura manual diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Partial weight bearing support with manual height adjustment",
      category: "Rehabilitation" as Category,
      blurb: "Partial weight bearing support with height adjustment.",
      description: "Partial weight bearing support with manual height adjustment designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 61,
    slug: "termo-hielera-coleman-vacunas-9qt",
    price: 2893.97,
    image: "https://http2.mlstatic.com/D_NQ_NP_921262-MLM75530150000_042024-O.webp",
    es: {
      name: "Termo hielera Coleman para transporte de vacunas con capacidad de 9 qt",
      category: "Insumos" as Category,
      blurb: "Termo hielera Coleman para vacunas 9 qt.",
      description: "Termo hielera Coleman para transporte de vacunas con capacidad de 9 qt diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Coleman 9 qt vaccine transport cooler",
      category: "Supplies" as Category,
      blurb: "Coleman 9 qt vaccine cooler.",
      description: "Coleman 9 qt vaccine transport cooler designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 62,
    slug: "termo-hielera-vacunas-120-litros",
    price: 10019.5,
    image: "https://www.beracahmedica.mx/web/image/product.product/2634/image_1920?unique=7d4c0a8",
    es: {
      name: "Termo hielera para vacunas de 120 litros",
      category: "Laboratorio" as Category,
      blurb: "Termo hielera para vacunas de gran capacidad (120L).",
      description: "Termo hielera para vacunas de 120 litros diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "120 liter vaccine cooler",
      category: "Laboratory" as Category,
      blurb: "Large capacity vaccine cooler (120L).",
      description: "120 liter vaccine cooler designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 63,
    slug: "termograficador-refrigerador-refrimed",
    price: 37434.65,
    image: "https://i0.wp.com/www.delca.com.mx/wp-content/uploads/2019/09/DSC_0859-copy.jpg?resize=627%2C451&ssl=1",
    es: {
      name: "Termograficador para refrigerador marca Refrimed",
      category: "Laboratorio" as Category,
      blurb: "Termograficador para refrigerador clínico.",
      description: "Termograficador para refrigerador marca Refrimed diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Temperature recorder for refrigerator Refrimed brand",
      category: "Laboratory" as Category,
      blurb: "Temperature recorder for clinical refrigerator.",
      description: "Temperature recorder for refrigerator Refrimed brand designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 64,
    slug: "termometro-flexible-10-segundos",
    price: 304.11,
    image: "https://catalogomedicomx.s3.amazonaws.com/produccion/img/p/3/5/6/0/0/35600-large_default.jpg",
    es: {
      name: "Termómetro flexible tecnología 10 segundos",
      category: "Equipo Médico" as Category,
      blurb: "Termómetro flexible rápido de 10 segundos.",
      description: "Termómetro flexible tecnología 10 segundos diseñado para uso profesional en entornos clínicos y hospitalarios. Ofrece un funcionamiento confiable, materiales de alta calidad y un diseño orientado a facilitar las labores del personal de salud, mejorando la seguridad, eficiencia y comodidad durante su utilización.",
      features: ["Construcción resistente.", "Diseño ergonómico y de fácil limpieza.", "Uso profesional y larga vida útil.", "Aplicaciones: Hospitales, clínicas, consultorios especializados y centros de atención médica."],
    },
    en: {
      name: "Flexible thermometer 10 seconds technology",
      category: "Medical Equipment" as Category,
      blurb: "Fast 10 seconds flexible thermometer.",
      description: "Flexible thermometer 10 seconds technology designed for professional use in clinical and hospital environments. It offers reliable operation, high-quality materials and a design aimed at facilitating the work of health personnel, improving safety, efficiency and comfort during its use.",
      features: ["Sturdy construction.", "Ergonomic and easy-to-clean design.", "Professional use and long service life.", "Applications: Hospitals, clinics, specialized practices and medical care centers."],
    }
  },
  {
    id: 65,
    slug: "termometro-pediatrico-flexible-rana-pato",
    price: 236.15,
    image: "https://http2.mlstatic.com/D_NQ_NP_771754-MLU71572672410_092023-O.webp",
    es: {
      name: "Termómetro pediátrico flexible de Rana o Pato tecnología 30 segundos",
      category: "Equipo Médico" as Category,
      blurb: "Termómetro pediátrico flexible con diseño de rana o pato.",
      description: "Termómetro pediátrico flexible de Rana o Pato tecnología 30 segundos para evaluación clínica infantil.",
      features: [],
    },
    en: {
      name: "Pediatric flexible Frog or Duck thermometer 30 seconds technology",
      category: "Medical Equipment" as Category,
      blurb: "Flexible pediatric thermometer with frog or duck design.",
      description: "Pediatric flexible Frog or Duck thermometer 30 seconds technology for children's clinical evaluation.",
      features: [],
    }
  },
  {
    id: 66,
    slug: "termometro-rigido-pluma-60-segundos",
    price: 170.9,
    image: "https://m.media-amazon.com/images/I/31-7v1tGtkL.jpg",
    es: {
      name: "Termómetro rígido tipo pluma tecnología 60 segundos",
      category: "Equipo Médico" as Category,
      blurb: "Termómetro rígido de 60 segundos tipo pluma.",
      description: "Termómetro rígido tipo pluma tecnología 60 segundos para uso general.",
      features: ["Medición en 60 segundos", "Punta “Gold Tip” – anti-alergénica", "A prueba de agua", "Beeper y Alarma de fiebre", "Memoria y Apagado automático", "Auto-test automático e Indicador de pila baja"],
    },
    en: {
      name: "Pen-type rigid thermometer 60 seconds technology",
      category: "Medical Equipment" as Category,
      blurb: "60 seconds pen-type rigid thermometer.",
      description: "Pen-type rigid thermometer 60 seconds technology for general use.",
      features: ["Measurement in 60 seconds", "“Gold Tip” - anti-allergenic", "Waterproof", "Beeper and fever alarm", "Memory and automatic shutdown", "Automatic self-test and low battery indicator"],
    }
  },
  {
    id: 67,
    slug: "videolaringoscopio-vs-10",
    price: 90773.0,
    image: "https://www.visionheart.eu/wp-content/uploads/2025/05/Bildschirm-mit-Touchscreen-2.png",
    es: {
      name: "Videolaringoscopio con bateria y pantalla tactil integrada VS-10",
      category: "Equipo Médico" as Category,
      blurb: "Videolaringoscopio VS-10 con pantalla táctil y batería.",
      description: "Videolaringoscopio con bateria y pantalla tactil integrada VS-10 para equipos de diagnóstico clínico.",
      features: ["Tamaño mas pequeño, vision mas grande.", "Pantalla táctil sensible y facil de usar.", "Con sistema inteligente de administracion de energía.", "Camara de alta definicion.", "Batería de litio recargable con puerto USB.", "Capacidad de restauracion de color no menor del nivel 4.", "Pantalla con angulos de rotacion vertical y horizontal.", "Pantalla con ajuste de brillo automatica y ajustable.", "Memoria para 1,000 fotografias o dos horas de video. (No menos de 5GB)"],
    },
    en: {
      name: "Video laryngoscope with integrated battery and touch screen VS-10",
      category: "Medical Equipment" as Category,
      blurb: "VS-10 video laryngoscope with touch screen and battery.",
      description: "Video laryngoscope with integrated battery and touch screen VS-10 for clinical diagnostic equipment.",
      features: ["Smaller size, larger vision.", "Sensitive and easy-to-use touch screen.", "Intelligent power management system.", "High definition camera.", "Rechargeable lithium battery with USB port.", "Color restoration capacity no less than level 4.", "Screen with vertical and horizontal rotation angles.", "Automatic and adjustable brightness screen.", "Memory for 1,000 photos or two hours of video. (No less than 5GB)"],
    }
  },
  {
    id: 68,
    slug: "videolaringoscopio-vs-10-copia",
    price: 90773.0,
    image: "https://medivital.com.ec/wp-content/uploads/2025/09/Diapositiva2-1.png",
    es: {
      name: "Videolaringoscopio con bateria y pantalla tactil integrada VS-10 (copia)",
      category: "Equipo Médico" as Category,
      blurb: "Videolaringoscopio VS-10 con pantalla táctil y batería (Copia).",
      description: "Videolaringoscopio con bateria y pantalla tactil integrada VS-10 para equipos de diagnóstico clínico (copia).",
      features: ["Tamaño mas pequeño, vision mas grande.", "Pantalla táctil sensible y facil de usar.", "Con sistema inteligente de administracion de energía.", "Camara de alta definicion.", "Batería de litio recargable con puerto USB.", "Capacidad de restauracion de color no menor del nivel 4.", "Pantalla con angulos de rotacion vertical y horizontal.", "Pantalla con ajuste de brillo automatica y ajustable.", "Memoria para 1,000 fotografias o dos horas de video. (No menos de 5GB)"],
    },
    en: {
      name: "Video laryngoscope with integrated battery and touch screen VS-10 (copy)",
      category: "Medical Equipment" as Category,
      blurb: "VS-10 video laryngoscope with touch screen and battery (Copy).",
      description: "Video laryngoscope with integrated battery and touch screen VS-10 for clinical diagnostic equipment (copy).",
      features: ["Smaller size, larger vision.", "Sensitive and easy-to-use touch screen.", "Intelligent power management system.", "High definition camera.", "Rechargeable lithium battery with USB port.", "Color restoration capacity no less than level 4.", "Screen with vertical and horizontal rotation angles.", "Automatic and adjustable brightness screen.", "Memory for 1,000 photos or two hours of video. (No less than 5GB)"],
    }
  },
  {
    id: 69,
    slug: "vitrina-90cm-contra-muro",
    price: 10543.14,
    image: "https://www.blesmed.com.mx/wp-content/uploads/2018/06/Vitrina-Contramuro-Blesmed-mx.jpg",
    es: {
      name: "Vitrina de 90 cm contra muro",
      category: "Mobiliario Hospitalario" as Category,
      blurb: "Vitrina de 90 cm diseñada para instalar contra muro.",
      description: "Vitrina de 90 cm contra muro ideal para almacenamiento de instrumental y medicamentos en consultorios o clínicas.",
      features: ["Fabricado en cuerpo de lamina de acero en calibre 20, acabado esmaltado.", "Con canaletas de aluminio para sujetar las puertas.", "Cremalleras de lámina de acero inoxidable en calibre 20 acabado pulido.", "Con ménsulas para graduar la altura.", "Puertas corredizas de vidrio de 6 mm de espesor.", "Sin filos y jaladeras integradas.", "Entrepaño de 3 mm con cantos pulidos y sin filos.", "Incluye llave"],
    },
    en: {
      name: "90 cm wall-mounted display cabinet",
      category: "Hospital Furniture" as Category,
      blurb: "90 cm display cabinet designed for wall mounting.",
      description: "90 cm wall-mounted display cabinet ideal for storing instruments and medications in clinics.",
      features: ["Body made of 20-gauge steel sheet, enameled finish.", "With aluminum channels to hold the doors.", "20-gauge stainless steel sheet racks, polished finish.", "With brackets to adjust height.", "6 mm thick sliding glass doors.", "Smooth edges and integrated handles.", "3 mm shelf with polished and smooth edges.", "Includes lock"],
    }
  },
];

// 2. FUSIÓN AUTOMÁTICA
export const products: Record<"es" | "en", Product[]> = {
  es: rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    price: p.price,
    image: p.image,
    ...p.es
  })),
  en: rawProducts.map((p) => ({
    id: p.id,
    slug: p.slug,
    price: p.price,
    image: p.image,
    ...p.en
  })),
};

export function getProductBySlug(slug: string, lang: "es" | "en" = "es"): Product | undefined {
  return products[lang].find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, lang: "es" | "en" = "es", count = 4): Product[] {
  const catalog = products[lang];
  const sameCategory = catalog.filter((p) => p.category === product.category && p.id !== product.id);
  const others = catalog.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...sameCategory, ...others].slice(0, count);
}

export function getFeaturedProducts(lang: "es" | "en" = "es", count = 8): Product[] {
  const catalog = products[lang];
  const badged = catalog.filter((p) => p.badge);
  const rest = catalog.filter((p) => !p.badge);
  return [...badged, ...rest].slice(0, count);
}