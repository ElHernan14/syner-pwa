import type { LoteModel } from '../models/lote.model'

export const lotesMock: LoteModel[] = [
  {
    id: 'lote-001',
    nombre: 'Smartphone Samsung Galaxy A56',

    descripcion:
      'Smartphone Samsung Galaxy A56 5G de 256 GB, disponible mediante compra colaborativa.',

    descripcionCorta:
      'Samsung Galaxy A56 5G de 256 GB, pensado para quienes buscan un smartphone moderno, equilibrado y con excelente capacidad de almacenamiento.',

    descripcionLarga:
      'Este lote reúne participantes interesados en adquirir el Samsung Galaxy A56 5G mediante una compra colectiva. La propuesta busca aprovechar el volumen de compra para acceder a una condición económica más conveniente que la referencia de mercado individual. El equipo combina conectividad 5G, una pantalla de gran tamaño, almacenamiento de 256 GB y un conjunto de prestaciones orientadas al uso diario, entretenimiento y productividad. La participación se realiza mediante un cupo dentro del lote y el proceso puede seguirse desde SYNER a medida que avanza el fondeo colectivo.',

    caracteristicas: [
      'Samsung Galaxy A56 5G',
      '256 GB de almacenamiento interno',
      'Conectividad 5G',
      'Pantalla Super AMOLED',
      'Diseño orientado al uso diario',
      'Equipo nuevo',
    ],

    incluye: [
      'Samsung Galaxy A56',
      'Cargador y accesorios correspondientes',
      'Embalaje original',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'La disponibilidad está sujeta a la finalización del fondeo del lote.',
      'El precio informado corresponde al valor de participación indicado.',
      'Los plazos pueden variar según el avance de la operación.',
    ],

    imagen: '/mock/lotes/samsung-galaxy-a56.webp',
    categoria: 'tecnologia',

    precioMercado: 899999,
    precioCupo: 599999,
    porcentajeAhorro: 33,

    cantidadCupos: 10,
    cuposOcupados: 7,

    fechaCreacion: '2026-08-01',
    fechaInicio: '2026-08-01',
    fechaFin: '2026-09-15',

    estado: 'fondeando',

    proveedorId: 'proveedor-001',
  },

  {
    id: 'lote-002',
    nombre: 'Notebook Lenovo IdeaPad Slim 5',

    descripcion:
      'Notebook Lenovo IdeaPad Slim 5 con procesador Ryzen 7, 16 GB de RAM y 512 GB SSD.',

    descripcionCorta:
      'Notebook orientada a productividad, estudio y trabajo, con Ryzen 7, 16 GB de RAM y almacenamiento SSD de 512 GB.',

    descripcionLarga:
      'Una propuesta pensada para quienes necesitan una notebook capaz de acompañar jornadas de trabajo, estudio y uso personal sin resignar rendimiento. El Lenovo IdeaPad Slim 5 combina un procesador Ryzen 7 con 16 GB de memoria RAM y almacenamiento SSD de 512 GB. A través del modelo colectivo de SYNER, los participantes pueden acceder a una condición de compra basada en el volumen reunido por el lote. El objetivo es facilitar el acceso a un equipo de prestaciones superiores mediante una participación previamente definida.',

    caracteristicas: [
      'Procesador AMD Ryzen 7',
      '16 GB de memoria RAM',
      '512 GB SSD',
      'Formato Slim',
      'Orientada a productividad y estudio',
      'Equipo nuevo',
    ],

    incluye: [
      'Notebook Lenovo IdeaPad Slim 5',
      'Cargador',
      'Accesorios correspondientes',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'La compra se ejecuta una vez alcanzadas las condiciones establecidas para el lote.',
      'Las especificaciones pueden estar sujetas a disponibilidad del proveedor.',
      'El plazo final depende del avance del proceso colectivo.',
    ],

    imagen: '/mock/lotes/lenovo-ideapad-slim-5.webp',
    categoria: 'tecnologia',

    precioMercado: 1499999,
    precioCupo: 999999,
    porcentajeAhorro: 33,

    cantidadCupos: 12,
    cuposOcupados: 9,

    fechaCreacion: '2026-08-05',
    fechaInicio: '2026-08-05',
    fechaFin: '2026-09-20',

    estado: 'fondeando',

    proveedorId: 'proveedor-002',
  },
  {
    id: 'lote-003',
    nombre: 'Set de herramientas Bosch Professional',

    descripcion: 'Set profesional de herramientas eléctricas para uso doméstico y profesional.',

    descripcionCorta:
      'Set de herramientas Bosch Professional pensado para trabajos de mantenimiento, reparación y proyectos de uso doméstico o profesional.',

    descripcionLarga:
      'Este lote reúne participantes interesados en adquirir un set de herramientas Bosch Professional mediante una compra colectiva. La propuesta busca aprovechar el volumen de compra para acceder a una condición económica más conveniente que la compra individual. El conjunto está orientado tanto a tareas de mantenimiento del hogar como a trabajos profesionales y proyectos personales que requieran herramientas eléctricas confiables. La participación se realiza mediante un cupo dentro del lote y permite seguir el avance del proceso colectivo desde SYNER.',

    caracteristicas: [
      'Herramientas Bosch Professional',
      'Conjunto orientado a mantenimiento y reparación',
      'Uso doméstico y profesional',
      'Herramientas eléctricas',
      'Diseño orientado a durabilidad y uso frecuente',
      'Equipo nuevo',
    ],

    incluye: [
      'Set de herramientas Bosch Professional',
      'Accesorios correspondientes',
      'Maletín o sistema de almacenamiento',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'La composición exacta del set está sujeta a la disponibilidad informada por el proveedor.',
      'La compra se ejecuta una vez alcanzadas las condiciones establecidas para el lote.',
      'Los plazos pueden variar según el avance del proceso colectivo.',
    ],

    imagen: '/mock/lotes/bosch-tools.webp',
    categoria: 'hogar',

    precioMercado: 749999,
    precioCupo: 524999,
    porcentajeAhorro: 30,

    cantidadCupos: 8,
    cuposOcupados: 4,

    fechaCreacion: '2026-08-08',
    fechaInicio: '2026-08-08',
    fechaFin: '2026-09-22',

    estado: 'fondeando',

    proveedorId: 'proveedor-003',
  },

  {
    id: 'lote-004',
    nombre: 'Zapatillas Nike Air Max',

    descripcion: 'Zapatillas Nike Air Max originales en distintos talles y colores disponibles.',

    descripcionCorta:
      'Zapatillas Nike Air Max originales, disponibles en distintos talles y colores mediante compra colaborativa.',

    descripcionLarga:
      'Una propuesta orientada a quienes buscan acceder a zapatillas Nike Air Max originales mediante una compra colectiva. El lote contempla distintas opciones de talle y color, sujetas a la disponibilidad del proveedor al momento de completar la operación. El modelo de compra colaborativa permite reunir la demanda de varios participantes para buscar una condición económica más conveniente frente al precio de referencia individual. Cada participante reserva un cupo y puede realizar el seguimiento del estado del lote desde SYNER.',

    caracteristicas: [
      'Nike Air Max originales',
      'Distintos talles disponibles',
      'Distintas opciones de color',
      'Diseño deportivo y urbano',
      'Producto nuevo',
      'Distribución sujeta a disponibilidad',
    ],

    incluye: [
      'Par de zapatillas Nike Air Max',
      'Talle y color seleccionados según disponibilidad',
      'Embalaje original',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'El talle y color están sujetos a disponibilidad al momento de concretar la compra.',
      'La disponibilidad final depende de las condiciones informadas por el proveedor.',
      'La entrega se realiza una vez completado el proceso correspondiente al lote.',
    ],

    imagen: '/mock/lotes/nike-air-max.webp',
    categoria: 'indumentaria',

    precioMercado: 599999,
    precioCupo: 359999,
    porcentajeAhorro: 40,

    cantidadCupos: 15,
    cuposOcupados: 13,

    fechaCreacion: '2026-08-10',
    fechaInicio: '2026-08-10',
    fechaFin: '2026-09-05',

    estado: 'fondeando',

    proveedorId: 'proveedor-004',
  },

  {
    id: 'lote-005',
    nombre: 'Bicicleta MTB Rodado 29',

    descripcion: 'Bicicleta de montaña rodado 29 con cuadro de aluminio y 21 velocidades.',

    descripcionCorta:
      'Bicicleta MTB rodado 29 con cuadro de aluminio y 21 velocidades, ideal para movilidad urbana y recorridos recreativos.',

    descripcionLarga:
      'Este lote propone la adquisición colectiva de una bicicleta MTB rodado 29 pensada para quienes buscan una alternativa de movilidad y recreación. Cuenta con cuadro de aluminio y un sistema de 21 velocidades que permite adaptarse a diferentes recorridos y condiciones de uso. Al reunir varios participantes, SYNER busca facilitar el acceso al producto mediante una condición económica basada en el volumen de compra. El lote ya alcanzó la totalidad de sus cupos y se encuentra en estado completado, dando paso a las siguientes etapas del proceso.',

    caracteristicas: [
      'Rodado 29',
      'Cuadro de aluminio',
      '21 velocidades',
      'Diseño MTB',
      'Orientada a movilidad y recreación',
      'Bicicleta nueva',
    ],

    incluye: [
      'Bicicleta MTB rodado 29',
      'Componentes correspondientes al modelo',
      'Accesorios incluidos por el proveedor',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'El lote alcanzó la totalidad de los cupos disponibles.',
      'La compra y entrega quedan sujetas al avance de las etapas posteriores.',
      'La configuración final puede estar sujeta a disponibilidad del proveedor.',
    ],

    imagen: '/mock/lotes/bicicleta-mtb.webp',
    categoria: 'movilidad',

    precioMercado: 679999,
    precioCupo: 475999,
    porcentajeAhorro: 30,

    cantidadCupos: 10,
    cuposOcupados: 10,

    fechaCreacion: '2026-07-15',
    fechaInicio: '2026-07-15',
    fechaFin: '2026-08-29',

    estado: 'completado',

    proveedorId: 'proveedor-005',
  },

  {
    id: 'lote-006',
    nombre: 'Aire acondicionado inverter',

    descripcion:
      'Aire acondicionado split inverter de 4500 frigorías, preparado para alta eficiencia energética.',

    descripcionCorta:
      'Aire acondicionado split inverter de 4500 frigorías, pensado para climatizar espacios de forma eficiente y confortable.',

    descripcionLarga:
      'Este lote está orientado a participantes interesados en incorporar un sistema de climatización eficiente para el hogar. El equipo cuenta con tecnología inverter y una capacidad de 4500 frigorías, ofreciendo una alternativa adecuada para climatizar ambientes de tamaño considerable. La compra colaborativa permite reunir la demanda de distintos participantes y buscar una condición económica más conveniente frente a una adquisición individual. El proceso puede seguirse desde SYNER durante las distintas etapas del lote hasta su compra y posterior entrega.',

    caracteristicas: [
      'Tecnología inverter',
      '4500 frigorías',
      'Formato split',
      'Alta eficiencia energética',
      'Orientado a climatización del hogar',
      'Equipo nuevo',
    ],

    incluye: [
      'Aire acondicionado split inverter',
      'Unidad interior y exterior',
      'Accesorios correspondientes',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'La instalación puede no estar incluida salvo que el proveedor indique lo contrario.',
      'Las condiciones de instalación dependen del espacio y ubicación del equipo.',
      'La compra se ejecuta una vez alcanzadas las condiciones establecidas para el lote.',
    ],

    imagen: '/mock/lotes/aire-acondicionado.webp',
    categoria: 'hogar',

    precioMercado: 1249999,
    precioCupo: 874999,
    porcentajeAhorro: 30,

    cantidadCupos: 10,
    cuposOcupados: 6,

    fechaCreacion: '2026-08-03',
    fechaInicio: '2026-08-03',
    fechaFin: '2026-09-17',

    estado: 'fondeando',

    proveedorId: 'proveedor-006',
  },

  {
    id: 'lote-007',
    nombre: 'Servicio de instalación de paneles solares',

    descripcion:
      'Servicio integral de instalación de sistema solar domiciliario mediante compra colaborativa.',

    descripcionCorta:
      'Servicio integral de instalación de paneles solares para hogares que buscan incorporar generación de energía renovable.',

    descripcionLarga:
      'Este lote propone contratar de manera colectiva un servicio integral de instalación de un sistema solar domiciliario. La propuesta está orientada a hogares interesados en incorporar generación de energía renovable y reducir su dependencia de la red eléctrica convencional. El servicio contempla el proceso de instalación según las características y condiciones definidas por el proveedor. Mediante la compra colaborativa, los participantes pueden acceder a una condición económica basada en el volumen reunido por el lote y realizar el seguimiento de la operación desde SYNER.',

    caracteristicas: [
      'Instalación de sistema solar domiciliario',
      'Servicio integral',
      'Generación de energía renovable',
      'Evaluación según características del domicilio',
      'Instalación realizada por proveedor especializado',
      'Orientado a viviendas particulares',
    ],

    incluye: [
      'Servicio de instalación',
      'Componentes correspondientes al sistema contratado',
      'Evaluación y coordinación previa',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'La instalación está sujeta a las condiciones técnicas del domicilio.',
      'El alcance final del sistema depende de la evaluación realizada por el proveedor.',
      'Los plazos de instalación pueden variar según disponibilidad y coordinación.',
    ],

    imagen: '/mock/lotes/paneles-solares.webp',
    categoria: 'servicios',

    precioMercado: 3499999,
    precioCupo: 2449999,
    porcentajeAhorro: 30,

    cantidadCupos: 20,
    cuposOcupados: 11,

    fechaCreacion: '2026-08-06',
    fechaInicio: '2026-08-06',
    fechaFin: '2026-10-01',

    estado: 'fondeando',

    proveedorId: 'proveedor-007',
  },

  {
    id: 'lote-008',
    nombre: 'Smart TV Samsung 65"',

    descripcion:
      'Smart TV Samsung de 65 pulgadas con resolución 4K y plataforma Smart TV integrada.',

    descripcionCorta:
      'Smart TV Samsung de 65 pulgadas con resolución 4K, ideal para entretenimiento, streaming y contenido multimedia.',

    descripcionLarga:
      'Este lote reúne participantes interesados en adquirir un Smart TV Samsung de 65 pulgadas mediante una compra colectiva. El equipo ofrece resolución 4K y una plataforma Smart TV integrada para acceder a contenidos y servicios de entretenimiento desde el propio televisor. La propuesta de SYNER busca aprovechar la compra conjunta para alcanzar una condición económica más conveniente que la referencia de mercado individual. Los participantes pueden reservar su cupo y seguir el avance del fondeo hasta completar las etapas necesarias para concretar la compra.',

    caracteristicas: [
      'Pantalla de 65 pulgadas',
      'Resolución 4K UHD',
      'Plataforma Smart TV integrada',
      'Conectividad para servicios de streaming',
      'Diseño orientado al entretenimiento',
      'Equipo nuevo',
    ],

    incluye: [
      'Smart TV Samsung de 65 pulgadas',
      'Control remoto',
      'Cable de alimentación',
      'Accesorios correspondientes',
      'Participación dentro del lote colectivo',
    ],

    consideraciones: [
      'El modelo exacto puede estar sujeto a disponibilidad del proveedor.',
      'La compra se ejecuta una vez alcanzadas las condiciones establecidas para el lote.',
      'La entrega queda sujeta a los plazos posteriores a la compra.',
    ],

    imagen: '/mock/lotes/samsung-tv-65.webp',
    categoria: 'tecnologia',

    precioMercado: 1299999,
    precioCupo: 909999,
    porcentajeAhorro: 30,

    cantidadCupos: 10,
    cuposOcupados: 8,

    fechaCreacion: '2026-07-28',
    fechaInicio: '2026-07-28',
    fechaFin: '2026-09-08',

    estado: 'fondeando',

    proveedorId: 'proveedor-002',
  },
]
