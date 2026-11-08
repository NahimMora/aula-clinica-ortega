import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de ren-04 (síndrome nefrótico). Clase «Síndrome nefrótico» (Ortega) + libro p. 440–442.
export const escenas: Escena[] = [
  {
    tipo: 'nefrona',
    id: 'barrera',
    titulo: 'La membrana basal que deja pasar proteínas',
    pasos: [
      {
        tono: 'mint',
        luz: ['glomerulo'],
        nota: { t: 'Normal', d: 'La membrana basal del capilar glomerular frena a la albúmina: se pierde menos de 150 mg por día.' },
        di: 'Normalmente, la membrana basal del capilar glomerular funciona como un filtro que no deja pasar a la albúmina: se pierden menos de 150 miligramos de proteína por día.',
        retener: ['Normal < 150 mg/día'],
      },
      {
        tono: 'gold',
        luz: ['glomerulo'],
        fuga: ['proteinas'],
        nota: { t: 'Nefrótico', d: 'Aumenta la permeabilidad (no se rompe): más de 3,5 g por día, 80–90 % ALBÚMINA. Orina espumosa.' },
        di: 'En el síndrome nefrótico la membrana basal se vuelve permeable. No se rompen los capilares como en el nefrítico: deja pasar proteínas. Más de 3,5 gramos por día, y entre el 80 y el 90 por ciento es albúmina: es una proteinuria selectiva. La orina sale espumosa.',
        retener: ['> 3,5 g/24 h', 'Selectiva: albúmina'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'circulo',
    titulo: 'El círculo del edema nefrótico',
    nodos: [
      { id: 'perm', x: 480, y: 62, t: '↑ Permeabilidad de la membrana basal', w: 360, tono: 'gold' },
      { id: 'prot', x: 480, y: 178, t: 'Proteinuria > 3,5 g/día', w: 300, tono: 'gold' },
      { id: 'alb', x: 480, y: 290, t: 'Hipoalbuminemia < 3 g/dl', w: 300, tono: 'gold' },
      { id: 'onc', x: 170, y: 290, t: '↓ Presión oncótica', w: 230, tono: 'sky' },
      { id: 'edema', x: 170, y: 430, t: 'EDEMA (fóvea) → anasarca', w: 230, tono: 'sky' },
      { id: 'vol', x: 480, y: 430, t: '↓ Volumen efectivo', w: 240, tono: 'sky' },
      { id: 'sraa', x: 480, y: 545, t: 'SRAA: retiene agua y sodio', w: 300, tono: 'peach' },
      { id: 'hig', x: 805, y: 290, t: 'Hígado: más síntesis de lipoproteínas', w: 260, tono: 'lilac' },
      { id: 'lip', x: 805, y: 440, t: 'Hiperlipidemia: xantelasmas, aterosclerosis', w: 260, tono: 'lilac' },
    ],
    lazos: [
      { a: 'perm', b: 'prot' },
      { a: 'prot', b: 'alb' },
      { a: 'alb', b: 'onc' },
      { a: 'onc', b: 'edema' },
      { a: 'onc', b: 'vol' },
      { a: 'vol', b: 'sraa' },
      { a: 'sraa', b: 'edema' },
      { a: 'alb', b: 'hig' },
      { a: 'hig', b: 'lip' },
    ],
    pasos: [
      {
        ver: ['perm', 'prot', 'alb'],
        di: 'El profe pide entender la fisiopatología, porque con eso se entiende todo. La membrana permeable deja escapar proteínas: más de 3,5 gramos por día. Baja la albúmina en sangre, por debajo de 3 gramos por decilitro.',
        retener: ['Proteinuria → hipoalbuminemia'],
      },
      {
        ver: ['perm', 'prot', 'alb', 'onc', 'edema', 'vol', 'sraa'],
        di: 'Sin albúmina baja la presión oncótica y el agua se va al intersticio: edema. Pero entonces queda menos volumen dentro de los vasos. El riñón lo detecta, se activa el sistema renina angiotensina aldosterona y retiene agua y sodio… que vuelven a salir al intersticio. Es un círculo que lleva a la anasarca.',
        retener: ['↓ Oncótica → edema', 'SRAA → más edema'],
      },
      {
        ver: ['perm', 'prot', 'alb', 'onc', 'edema', 'vol', 'sraa', 'hig', 'lip'],
        di: 'Y el hígado, estimulado por la falta de proteínas, fabrica más, entre ellas lipoproteínas: sube el colesterol y los triglicéridos. Esa hiperlipidemia da xantomas, xantelasmas y aterosclerosis, y cuando se descompensa aparece lipiduria.',
        retener: ['Hiperlipidemia ± lipiduria'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'perdidas',
    titulo: 'Todo lo que se pierde por la orina (y lo que provoca)',
    items: [
      { t: 'Albúmina', d: '↓ oncótica → EDEMA', tono: 'gold' },
      { t: 'Inmunoglobulina G y complemento', d: 'Sin opsonización → INFECCIONES (la más frecuente: PBE)', tono: 'red' },
      { t: 'Antitrombina III', d: '+ hemoconcentración → TROMBOSIS', tono: 'lilac' },
      { t: 'Transferrina', d: 'Anemia ferropénica', tono: 'peach' },
      { t: 'Transportadoras (vitamina D, tiroideas, cobre, zinc)', d: 'Déficits de lo que transportan', tono: 'sky' },
    ],
    pasos: [
      {
        hasta: 1,
        di: 'No se pierde solo albúmina. El profe pide razonar qué pasa con cada proteína que se va. Sin albúmina, edema. Sin inmunoglobulina G ni complemento, el paciente no puede opsonizar las bacterias: infecciones, y la más frecuente es la peritonitis bacteriana espontánea.',
        retener: ['Sin IgG ni complemento → infecciones', 'PBE'],
      },
      {
        hasta: 2,
        di: 'Se pierde la antitrombina tres, que frena la coagulación. Sumada a la hemoconcentración, porque el líquido se fue a los edemas, el paciente tiende a la trombosis.',
        retener: ['↓ Antitrombina III → trombosis'],
      },
      {
        hasta: 4,
        di: 'Y se pierden proteínas transportadoras: la transferrina, con anemia ferropénica, y las que llevan vitamina D, hormonas tiroideas, cobre y zinc.',
        retener: ['Transferrina → anemia'],
      },
    ],
  },
];
