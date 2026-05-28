/* ═══════════════════════════════════════════════════════════════
   data/motos.js — Catálogo Yamaha Motos del Socorro
   Rutas de imagen: /images/motos/{slug}/{archivo}
   Iconos:          /images/icons/{tech}.svg|png
═══════════════════════════════════════════════════════════════ */

const precio = (valor, nota = "IVA incluido") => ({ valor, nota });

export const CATEGORIAS = [
  { slug: "deportiva",       label: "Deportivas"       },
  { slug: "naked",           label: "Urbana / Naked"   },
  { slug: "automatica",      label: "Automáticas"      },
  { slug: "semi-automatica", label: "Semi automáticas" },
  { slug: "doble-proposito", label: "Doble Propósito"  },
];

export const motos = [
  // ── Deportivas ──────────────────────────────────────────────
  {
    id: 1, slug: "r15-v4",
    nombre: "R15 V4", categoria: "deportiva",
    cilindrada: "155cc", transmision: "Manual 6 velocidades",
    tagline: "Tecnología de pista en cada calle",
    descripcion:
      "La R15 V4 nació en los circuitos y llegó a las calles con todo: chasis deltabox, horquilla invertida, postura de pilotaje agresiva y un carácter que no se disimula. Si lo que quieres es emoción con cada acelerada, esta es tu moto.",
    banner:  "/images/motos/r15-v4/banner.png",
    imagen:  "/images/motos/r15-v4/icono.png",
    galeria: ["/images/motos/r15-v4/galeria-1.jpg","/images/motos/r15-v4/galeria-2.jpg","/images/motos/r15-v4/galeria-3.jpg","/images/motos/r15-v4/galeria-4.jpg","/images/motos/r15-v4/galeria-5.jpg","/images/motos/r15-v4/galeria-6.jpg","/images/motos/r15-v4/galeria-7.jpg","/images/motos/r15-v4/galeria-8.jpg","/images/motos/r15-v4/galeria-9.jpg","/images/motos/r15-v4/galeria-10.jpg","/images/motos/r15-v4/galeria-11.jpg","/images/motos/r15-v4/galeria-12.jpg"],
    destacada: true,
    tecnologias: ["vva","abs","full-led","fi"],
    precio: precio(14500000),
    colores: [{nombre:"Azul Racing",hex:"#1A3A6E"},{nombre:"Negro mate",hex:"#1A1A1A"}],
    manual: null,
    porQueElegir: [
      { icono:"zap",   titulo:"Postura de pilotaje",   beneficio:"La posición inclinada y los estribos trasladados te dan el control total. Sientes cada curva como si estuvieras en un circuito." },
      { icono:"star",  titulo:"Carenado aerodinámico", beneficio:"Diseño inspirado en la YZR-M1 de MotoGP. Presencia visual que se impone y reduce la resistencia al viento en carretera." },
      { icono:"road",  titulo:"Confianza en curvas",   beneficio:"Chasis deltabox rígido y estable. Trazas con precisión en vía urbana o carretera de montaña." },
      { icono:"users", titulo:"Cómoda en ciudad",      beneficio:"A pesar de su ADN deportivo, la R15 V4 se maneja con facilidad en tráfico. Compacta, ágil y directa." },
    ],
    experiencia: [
      { titulo:"Pista",      descripcion:"Una moto pensada desde el asfalto del circuito. Cada componente fue afinado para quienes buscan sensaciones puras." },
      { titulo:"Adrenalina", descripcion:"19.3 HP y un chasis que responde al instante. La R15 V4 entrega lo que promete en cada giro del acelerador." },
      { titulo:"Dominio",    descripcion:"Horquilla invertida, frenos ABS y chasis deltabox: las herramientas para sentirte en control en cualquier condición." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, VVA", Potencia:"19.3 HP @ 10,000 rpm",
      Torque:"14.7 Nm @ 7,500 rpm", Peso:"141 kg", Tanque:"11 L", Frenos:"Doble disco con ABS",
    },
  },

  // ── Naked / Urbana ───────────────────────────────────────────
  {
    id: 3, slug: "mt-15-v2",
    nombre: "MT-15 V2", categoria: "naked",
    cilindrada: "155cc", transmision: "Manual 6 velocidades",
    tagline: "El maestro del torque domina la ciudad",
    descripcion:
      "La MT-15 V2 no pide permiso. Diseño muscular, postura erguida y un carácter naked que se impone en cada semáforo. Tiene la presencia de una moto grande y la agilidad de una compacta.",
    banner:  "/images/motos/mt-15-v2/banner.jpg",
    imagen:  "/images/motos/mt-15-v2/icono.png",
    galeria: ["/images/motos/mt-15-v2/galeria-1.jpg","/images/motos/mt-15-v2/galeria-2.jpg","/images/motos/mt-15-v2/galeria-3.jpg","/images/motos/mt-15-v2/galeria-4.jpg","/images/motos/mt-15-v2/galeria-5.jpg","/images/motos/mt-15-v2/galeria-6.jpg"],
    destacada: true,
    tecnologias: ["vva","fi","abs","full-led"],
    precio: precio(14500000),
    colores: [{nombre:"Azul Cibernético",hex:"#1E5FA8"},{nombre:"Gris Hielo",hex:"#8A8A9A"},{nombre:"Negro",hex:"#1A1A1A"}],
    manual: null,
    porQueElegir: [
      { icono:"city",   titulo:"Agilidad en tráfico",  beneficio:"Postura erguida y manillar ancho para ver más lejos y maniobrar con soltura." },
      { icono:"star",   titulo:"Diseño MT imponente",  beneficio:"Las líneas angulares y el chasis expuesto transmiten actitud antes de encender el motor." },
      { icono:"shield", titulo:"Control al frenar",    beneficio:"Frenos de disco delantero y trasero con ABS que dan confianza en las frenadas más exigentes." },
      { icono:"zap",    titulo:"Respuesta inmediata",  beneficio:"Torque disponible desde bajas rpm. Sin esperas, sin demoras: la moto va cuando tú dices." },
    ],
    experiencia: [
      { titulo:"Ciudad",  descripcion:"Diseñada para dominar el asfalto urbano. Ágil en cruces, cómoda en atascos e intimidante en recta." },
      { titulo:"Estilo",  descripcion:"El ADN de la familia MT en formato 155cc. Líneas agresivas y acabados que comunican carácter." },
      { titulo:"Actitud", descripcion:"La MT-15 V2 no es solo transporte. Es una declaración. Cada viaje se convierte en algo que merece la pena." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, VVA", Potencia:"18.4 HP @ 10,000 rpm",
      Torque:"14.1 Nm @ 7,500 rpm", Peso:"138 kg", Tanque:"10 L", Frenos:"Doble disco con ABS",
    },
  },
  {
    id: 9, slug: "mt-03",
    nombre: "MT-03", categoria: "naked",
    cilindrada: "321cc", transmision: "Manual 6 velocidades",
    tagline: "Dos cilindros. Actitud naked sin filtros",
    descripcion:
      "La MT-03 lleva el corazón bicilíndrico de la R3 en un cuerpo naked sin carenado. Más ligera, más ágil y con una entrega de potencia que se disfruta más en la calle que en el circuito.",
    banner:  "/images/motos/mt-03/banner.jpg",
    imagen:  "/images/motos/mt-03/icono.jpg",
    galeria: ["/images/motos/mt-03/galeria-1.jpg","/images/motos/mt-03/galeria-2.jpg","/images/motos/mt-03/galeria-3.jpg","/images/motos/mt-03/galeria-4.jpg","/images/motos/mt-03/galeria-5.jpg","/images/motos/mt-03/galeria-6.jpg","/images/motos/mt-03/galeria-7.jpg","/images/motos/mt-03/galeria-8.jpg"],
    destacada: true,
    tecnologias: ["abs","full-led","fi"],
    precio: precio(21500000),
    colores: [{nombre:"Gris oscuro",hex:"#3A3A3A"},{nombre:"Negro",hex:"#111111"}],
    manual: null,
    porQueElegir: [
      { icono:"zap",   titulo:"Bicilíndrico suave",    beneficio:"321cc y dos cilindros que entregan potencia progresiva y sin vibraciones. Cada kilómetro se disfruta más." },
      { icono:"star",  titulo:"Diseño naked puro",     beneficio:"Sin carenado, sin escondites. El motor y el chasis son parte del diseño. Una moto que se ve diferente y lo sabe." },
      { icono:"city",  titulo:"Ágil en cualquier vía", beneficio:"Más liviana que muchas deportivas de su cilindrada. Se mueve con naturalidad en ciudad y en curvas abiertas." },
      { icono:"road",  titulo:"Para rutas de fin de semana", beneficio:"Cómoda en postura erguida para trayectos largos, pero con el carácter suficiente para que no se sienta aburrida." },
    ],
    experiencia: [
      { titulo:"Potencia", descripcion:"42 HP en un cuerpo naked sin restricciones. La MT-03 entrega lo que tiene sin disculpas y sin complicaciones." },
      { titulo:"Fluidez",  descripcion:"El bicilíndrico no tiene picos bruscos. La potencia llega suave y constante, haciendo cada salida de curva placentera." },
      { titulo:"Carácter", descripcion:"La MT-03 tiene personalidad propia. Es el resultado de tomar lo mejor de la R3 y darle forma de moto de calle sin límites." },
    ],
    especificaciones: {
      Motor:"Bicilíndrico 4T, DOHC", Potencia:"42 HP @ 10,750 rpm",
      Torque:"29.6 Nm @ 9,000 rpm", Peso:"168 kg", Tanque:"14 L", Frenos:"Doble disco con ABS",
    },
  },
  {
    id: 4, slug: "fz-3-0",
    nombre: "FZ 3.0", categoria: "naked",
    cilindrada: "149cc", transmision: "Manual 5 velocidades",
    tagline: "Eficiencia y estilo para el día a día",
    descripcion:
      "La FZ 3.0 lleva años siendo la naked preferida de Colombia. Asiento cómodo, postura natural, manejo intuitivo y un diseño que envejece bien.",
    banner:  "/images/motos/fz-3-0/banner.jpg",
    imagen:  "/images/motos/fz-3-0/icono.png",
    galeria: ["/images/motos/fz-3-0/galeria-1.jpg","/images/motos/fz-3-0/galeria-2.jpg","/images/motos/fz-3-0/galeria-3.jpg","/images/motos/fz-3-0/galeria-4.jpg","/images/motos/fz-3-0/galeria-5.jpg","/images/motos/fz-3-0/galeria-6.jpg","/images/motos/fz-3-0/galeria-7.jpg","/images/motos/fz-3-0/galeria-8.jpg","/images/motos/fz-3-0/galeria-9.jpg","/images/motos/fz-3-0/galeria-10.jpg","/images/motos/fz-3-0/galeria-11.jpg"],
    destacada: true,
    tecnologias: ["blue-core","fi","abs"],
    precio: precio(11700000),
    colores: [{nombre:"Negro mate",hex:"#1A1A1A"},{nombre:"Azul metálico",hex:"#1E3A5F"}],
    manual: null,
    porQueElegir: [
      { icono:"eco",   titulo:"Bajo costo de uso",     beneficio:"Motor optimizado para rendir más kilómetros por galón. Menos paradas al surtidor y menos gasto mensual." },
      { icono:"users", titulo:"Asiento cómodo",        beneficio:"Sillín dual bien acolchado y posición erguida que cuida la espalda en trayectos largos." },
      { icono:"clock", titulo:"Confiable y comprobada",beneficio:"Miles de usuarios en Colombia la eligen año tras año. Sin sorpresas: funciona y aguanta." },
      { icono:"city",  titulo:"Perfecta para El Socorro", beneficio:"Peso manejable y potencia adecuada para moverse con fluidez por el centro y las vías de Santander." },
    ],
    experiencia: [
      { titulo:"Eficiencia", descripcion:"Cada gota de combustible bien aprovechada. Más kilómetros por tanque para pensar menos en el surtidor." },
      { titulo:"Comodidad",  descripcion:"Postura erguida, sillín amplio y manillar bien posicionado. Una moto que cuida tu cuerpo en los trayectos diarios." },
      { titulo:"Confianza",  descripcion:"Frenada precisa, motor predecible y manejo intuitivo. Llegas tranquilo a donde vas, sin importar el tráfico." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, Blue Core", Potencia:"12.2 HP @ 7,250 rpm",
      Torque:"13.3 Nm @ 5,500 rpm", Peso:"136 kg", Tanque:"13 L", Frenos:"Disco ABS del., disco tras.",
    },
  },
  {
    id: 10, slug: "fz25-abs",
    nombre: "FZ25 ABS", categoria: "naked",
    cilindrada: "249cc", transmision: "Manual 5 velocidades",
    tagline: "El siguiente nivel de la calle",
    descripcion:
      "La FZ25 ABS da el salto a 249cc sin perder la esencia naked. Motor monocilíndrico de cuatro válvulas, frenos ABS de doble canal y una postura agresiva que se siente natural desde el primer kilómetro.",
    banner:  "/images/motos/fz25-abs/banner.jpg",
    imagen:  "/images/motos/fz25-abs/icono.png",
    galeria: ["/images/motos/fz25-abs/galeria-1.jpg","/images/motos/fz25-abs/galeria-2.jpg","/images/motos/fz25-abs/galeria-3.jpg","/images/motos/fz25-abs/galeria-4.jpg","/images/motos/fz25-abs/galeria-5.jpg","/images/motos/fz25-abs/galeria-6.jpg","/images/motos/fz25-abs/galeria-7.jpg","/images/motos/fz25-abs/galeria-8.jpg"],
    destacada: false,
    tecnologias: ["abs","fi","full-led"],
    precio: precio(16500000),
    colores: [{nombre:"Azul oscuro",hex:"#1A2A4A"},{nombre:"Negro mate",hex:"#1A1A1A"}],
    manual: null,
    porQueElegir: [
      { icono:"zap",    titulo:"249cc con carácter",   beneficio:"Motor de 249cc con potencia usable en todo el rango. Más presencia en carretera y mayor comodidad en cruces." },
      { icono:"road",   titulo:"Para rutas más largas",beneficio:"La cilindrada extra hace que los recorridos entre municipios se sientan cómodos y seguros a velocidades de ruta." },
      { icono:"star",   titulo:"Diseño maduro",        beneficio:"Líneas más adultas que la FZ 3.0 sin perder el carácter naked. Comunica seriedad y estilo a la vez." },
      { icono:"shield", titulo:"Frenada segura",       beneficio:"ABS de doble canal para detener la moto con control total. Mayor confianza en descensos y superficies irregulares." },
    ],
    experiencia: [
      { titulo:"Potencia",    descripcion:"249cc que se sienten en cada salida de curva. Los recorridos de Santander se disfrutan de verdad." },
      { titulo:"Presencia",   descripcion:"Una naked con porte. La FZ25 ABS ocupa bien su espacio en la vía y transmite seguridad al piloto." },
      { titulo:"Versatilidad",descripcion:"Cómoda en ciudad y capaz en carretera. Se adapta a lo que el día pida sin quejarse ni exigir nada." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, 4 válvulas", Potencia:"20.6 HP @ 8,000 rpm",
      Torque:"20.1 Nm @ 6,000 rpm", Peso:"153 kg", Tanque:"14 L", Frenos:"Doble disco con ABS",
    },
  },

  // ── Automáticas ─────────────────────────────────────────────
  {
    id: 5, slug: "nmax-155",
    nombre: "NMAX 155", categoria: "automatica",
    cilindrada: "155cc", transmision: "Automática CVT",
    tagline: "La ciudad a tu ritmo, con tecnología premium",
    descripcion:
      "El NMAX 155 redefine lo que significa moverse en ciudad. Espacio bajo el asiento para tu casco, pantalla TFT conectada al celular, arranque sin llave y frenos ABS de doble canal.",
    banner:  "/images/motos/nmax-155/banner.jpg",
    imagen:  "/images/motos/nmax-155/icono.png",
    galeria: ["/images/motos/nmax-155/galeria-1.jpg","/images/motos/nmax-155/galeria-2.jpg","/images/motos/nmax-155/galeria-3.jpg","/images/motos/nmax-155/galeria-4.jpg","/images/motos/nmax-155/galeria-5.jpg"],
    destacada: true,
    tecnologias: ["blue-core","abs","y-connect","smart-key","full-led"],
    precio: precio(17900000),
    colores: [{nombre:"Plata metálico",hex:"#A8A8A8"},{nombre:"Negro",hex:"#1A1A1A"},{nombre:"Azul oscuro",hex:"#1A2A4A"}],
    manual: null,
    porQueElegir: [
      { icono:"users",  titulo:"Almacenamiento real",   beneficio:"El baúl bajo el asiento tiene capacidad para casco integral. Olvídate de maletines." },
      { icono:"city",   titulo:"Fluidez en tráfico",    beneficio:"CVT automático: solo aceleras y frenas. Ideal para tráfico denso, llegas fresco al destino." },
      { icono:"star",   titulo:"Acabados premium",      beneficio:"Panel TFT a color, llantas de aleación y carrocería de calidad. Detalles visibles en cada parte." },
      { icono:"road",   titulo:"Estable en curvas",     beneficio:"Base ancha y centro de gravedad bajo. Confianza en rotondas, curvas y cambios de carril." },
    ],
    experiencia: [
      { titulo:"Fluidez",   descripcion:"Sin cambios manuales, sin embrague. Solo tú, el acelerador y el camino. La ciudad fluye diferente." },
      { titulo:"Conexión",  descripcion:"Tu celular integrado al tablero. Notificaciones y datos de la moto en tiempo real. Movilidad inteligente." },
      { titulo:"Comodidad", descripcion:"Asiento amplio, postura erguida y espacio generoso. Viajar juntos también puede ser un placer." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, Blue Core", Potencia:"15.1 HP @ 8,000 rpm",
      Torque:"13.9 Nm @ 6,000 rpm", Peso:"132 kg", Tanque:"7.1 L", Frenos:"Doble disco con ABS",
    },
  },
  {
    id: 6, slug: "aerox-155",
    nombre: "Aerox 155", categoria: "automatica",
    cilindrada: "155cc", transmision: "Automática CVT",
    tagline: "Scooter deportivo sin compromisos",
    descripcion:
      "El Aerox 155 combina la comodidad de un automático con el carácter de una deportiva. Líneas agresivas, aerodinámica deportiva y acabados de calidad lo ponen en otra categoría.",
    banner:  "/images/motos/aerox-155/banner.jpg",
    imagen:  "/images/motos/aerox-155/icono.png",
    galeria: ["/images/motos/aerox-155/galeria-1.jpg","/images/motos/aerox-155/galeria-2.jpg","/images/motos/aerox-155/galeria-3.jpg","/images/motos/aerox-155/galeria-4.jpg","/images/motos/aerox-155/galeria-5.jpg","/images/motos/aerox-155/galeria-6.jpg","/images/motos/aerox-155/galeria-7.jpg"],
    destacada: false,
    tecnologias: ["vva","abs","full-led","smart-key"],
    precio: precio(17500000),
    colores: [{nombre:"Neon Cian",hex:"#00CDD4"},{nombre:"Negro mate",hex:"#1A1A1A"}],
    manual: null,
    porQueElegir: [
      { icono:"star",  titulo:"Diseño aerodinámico",   beneficio:"Carenado deportivo con líneas tensas y colores que se ven distintos. Llama la atención antes de arrancar." },
      { icono:"zap",   titulo:"Aceleración progresiva",beneficio:"El CVT entrega potencia de forma suave y constante. Sin escalones, respuesta inmediata y aceleración natural." },
      { icono:"users", titulo:"Postura deportiva",     beneficio:"Más inclinado que un scooter convencional, da conducción más activa sin sacrificar la comodidad." },
      { icono:"road",  titulo:"Ágil en cualquier vía", beneficio:"Suspensión deportiva y buena mordida de frenos para moverse con confianza en ciudad y carretera." },
    ],
    experiencia: [
      { titulo:"Velocidad", descripcion:"VVA y CVT juntos para aceleración suave y potente. El Aerox te lleva rápido sin que tengas que pedírselo." },
      { titulo:"Estilo",    descripcion:"Colores cian y negro hacen al Aerox 155 inconfundible. Una moto que se nota en cualquier calle." },
      { titulo:"Libertad",  descripcion:"Automático, ágil y con carácter. La libertad de moverte sin pensar en marchas, con actitud de quien sabe adónde va." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, VVA", Potencia:"15.1 HP @ 8,000 rpm",
      Torque:"13.9 Nm @ 6,500 rpm", Peso:"132 kg", Tanque:"5.5 L", Frenos:"Doble disco con ABS",
    },
  },

  // ── Semi automáticas ────────────────────────────────────────
  {
    id: 7, slug: "crypton-finn",
    nombre: "Crypton Finn", categoria: "semi-automatica",
    cilindrada: "110cc", transmision: "Semi automática 4 velocidades",
    tagline: "Confiable donde más se necesita",
    descripcion:
      "La Crypton Finn es la moto de quien trabaja. Ligera, económica, fácil de manejar y construida para aguantar el uso intenso día tras día en las vías de Santander.",
    banner:  "/images/motos/crypton-finn/banner.jpg",
    imagen:  "/images/motos/crypton-finn/icono.jpg",
    galeria: ["/images/motos/crypton-finn/galeria-1.jpg","/images/motos/crypton-finn/galeria-2.jpg","/images/motos/crypton-finn/galeria-3.jpg","/images/motos/crypton-finn/galeria-4.jpg","/images/motos/crypton-finn/galeria-5.jpg","/images/motos/crypton-finn/galeria-6.jpg","/images/motos/crypton-finn/galeria-7.jpg","/images/motos/crypton-finn/galeria-8.jpg","/images/motos/crypton-finn/galeria-9.jpg","/images/motos/crypton-finn/galeria-10.jpg","/images/motos/crypton-finn/galeria-11.jpg","/images/motos/crypton-finn/galeria-12.jpg","/images/motos/crypton-finn/galeria-13.jpg"],
    destacada: false,
    tecnologias: ["fi","blue-core"],
    precio: precio(7900000),
    colores: [{nombre:"Verde",hex:"#2D6A2D"},{nombre:"Rojo",hex:"#C8001A"},{nombre:"Negro",hex:"#1A1A1A"}],
    manual: null,
    porQueElegir: [
      { icono:"eco",   titulo:"Máximo rendimiento",    beneficio:"Motor de 110cc optimizado para hacer más con menos. Más kilómetros por tanque y menos gasto mensual." },
      { icono:"clock", titulo:"Mantenimiento sencillo",beneficio:"Diseño simple y componentes accesibles. El mantenimiento es rápido y económico en cualquier taller Yamaha." },
      { icono:"road",  titulo:"Campo y ciudad",        beneficio:"Peso ligero para moverse por El Socorro o las vías rurales de los municipios cercanos." },
      { icono:"tool",  titulo:"Alta durabilidad",      beneficio:"Construida para el uso intensivo. Aguanta miles de kilómetros de trabajo diario con mantenimiento básico." },
    ],
    experiencia: [
      { titulo:"Trabajo",      descripcion:"Hecha para los que necesitan una moto que funcione todos los días, sin excusas. La Crypton Finn no falla." },
      { titulo:"Durabilidad",  descripcion:"Motor robusto, chasis sólido y componentes de calidad Yamaha. Una inversión que se paga sola con kilómetros." },
      { titulo:"Rentabilidad", descripcion:"El menor costo operativo de su categoría. Menos gasolina, menos mantenimiento y mayor disponibilidad." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, FI", Potencia:"8.5 HP @ 8,000 rpm",
      Torque:"8.1 Nm @ 5,500 rpm", Peso:"104 kg", Tanque:"4.2 L", Frenos:"Tambor del. y tras.",
    },
  },

  // ── Doble Propósito ─────────────────────────────────────────
  {
    id: 8, slug: "xtz-150",
    nombre: "XTZ 150", categoria: "doble-proposito",
    cilindrada: "150cc", transmision: "Manual 5 velocidades",
    tagline: "Hecha para las rutas de Santander",
    descripcion:
      "La XTZ 150 fue diseñada para ir donde otras motos no pueden. Suspensión de largo recorrido, postura alta y motor confiable en cualquier condición.",
    banner:  "/images/motos/xtz-150/banner.jpg",
    imagen:  "/images/motos/xtz-150/icono.jpg",
    galeria: ["/images/motos/xtz-150/galeria-1.jpg","/images/motos/xtz-150/galeria-2.jpg","/images/motos/xtz-150/galeria-3.jpg","/images/motos/xtz-150/galeria-4.jpg","/images/motos/xtz-150/galeria-5.jpg","/images/motos/xtz-150/galeria-6.jpg","/images/motos/xtz-150/galeria-7.jpg"],
    destacada: true,
    tecnologias: ["fi","abs"],
    precio: precio(9800000),
    colores: [{nombre:"Azul ABS",hex:"#1E4A8C"},{nombre:"Negro mate",hex:"#1A1A1A"}],
    manual: null,
    porQueElegir: [
      { icono:"road",  titulo:"Suspensión de aventura",beneficio:"Horquilla de largo recorrido y amortiguador trasero ajustable. Absorbe baches y caminos sin pavimentar." },
      { icono:"zap",   titulo:"Postura alta y visible",beneficio:"La altura del asiento da visibilidad total del camino. En vías con obstáculos, ver más lejos marca la diferencia." },
      { icono:"star",  titulo:"Diseño trail robusto",  beneficio:"Guardamotor, protectores laterales y llantas con tacos. Se ve como lo que es: preparada para cualquier ruta." },
      { icono:"clock", titulo:"Confiable en el campo", beneficio:"Motor probado en las condiciones más exigentes de Colombia. Llega donde la necesitas." },
    ],
    experiencia: [
      { titulo:"Aventura",     descripcion:"La XTZ 150 va donde el camino se acaba. Cada bache es una invitación a seguir explorando más allá." },
      { titulo:"Versatilidad", descripcion:"Por la mañana en El Socorro, en la tarde por las vías destapadas. La XTZ 150 se adapta a todo." },
      { titulo:"Exploración",  descripcion:"Santander tiene rutas que solo se descubren desde una moto de doble propósito. Esta es la ideal." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC", Potencia:"13.5 HP @ 8,500 rpm",
      Torque:"12.4 Nm @ 6,500 rpm", Peso:"124 kg", Tanque:"12 L", Frenos:"Disco ABS del., tambor tras.",
    },
  },
  {
    id: 11, slug: "xtz250",
    nombre: "XTZ 250", categoria: "doble-proposito",
    cilindrada: "249cc", transmision: "Manual 5 velocidades",
    tagline: "Aventura sin límites en Santander",
    descripcion:
      "La XTZ 250 sube la apuesta en doble propósito. Con 249cc y motor de alto torque, tiene la potencia para los recorridos exigentes entre municipios de Santander sin perder la versatilidad en ciudad.",
    banner:  "/images/motos/xtz250/banner.jpg",
    imagen:  "/images/motos/xtz250/icono.png",
    galeria: ["/images/motos/xtz250/galeria-1.jpg","/images/motos/xtz250/galeria-2.jpg","/images/motos/xtz250/galeria-3.jpg","/images/motos/xtz250/galeria-4.jpg","/images/motos/xtz250/galeria-5.jpg","/images/motos/xtz250/galeria-6.jpg","/images/motos/xtz250/galeria-7.jpg","/images/motos/xtz250/galeria-8.jpg","/images/motos/xtz250/galeria-9.jpg"],
    destacada: true,
    tecnologias: ["fi","abs","full-led"],
    precio: precio(13500000),
    colores: [{nombre:"Azul aventura",hex:"#1A3A6E"},{nombre:"Blanco",hex:"#E8E8E8"}],
    manual: null,
    porQueElegir: [
      { icono:"road",  titulo:"249cc para terreno duro",   beneficio:"La cilindrada extra marca la diferencia en subidas largas y terrenos pesados. Torque suficiente para no quedarse atrás." },
      { icono:"star",  titulo:"Equipamiento completo",     beneficio:"Full LED, frenos ABS e inyección en una doble propósito. Tecnología que normalmente se reserva para motos más costosas." },
      { icono:"eco",   titulo:"Larga autonomía",           beneficio:"Tanque amplio para recorridos entre municipios sin preocupaciones. Planifica la ruta, no las paradas al surtidor." },
      { icono:"clock", titulo:"Para el trabajo y la aventura", beneficio:"Igual lleva un encargo en el centro que enfrenta los caminos sin pavimentar de los municipios de Santander." },
    ],
    experiencia: [
      { titulo:"Aventura",    descripcion:"249cc listos para los caminos más difíciles. La XTZ 250 no te pide que elijas entre comodidad y rendimiento." },
      { titulo:"Potencia",    descripcion:"Torque desde bajas rpm para arranques en pendiente y maniobras en terreno suelto. Potencia cuando la necesitas." },
      { titulo:"Exploración", descripcion:"Con la XTZ 250 los límites del mapa dejan de existir. Cada camino sin asfaltar es una oportunidad, no un obstáculo." },
    ],
    especificaciones: {
      Motor:"Monocilíndrico 4T, SOHC, FI", Potencia:"23.0 HP @ 8,000 rpm",
      Torque:"22.0 Nm @ 6,000 rpm", Peso:"136 kg", Tanque:"12 L", Frenos:"Doble disco con ABS",
    },
  },
];

export const getMotoBySlug       = (slug) => motos.find((m) => m.slug === slug);
export const getMotosDestacadas  = ()     => motos.filter((m) => m.destacada);
export const getMotosByCategoria = (slug) => motos.filter((m) => m.categoria === slug);
export const contarPorCategoria  = (slug) => motos.filter((m) => m.categoria === slug).length;
export const formatCOP = (n) =>
  n ? new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n) : null;
