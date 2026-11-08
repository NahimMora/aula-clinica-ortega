import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-09 (malabsorción e intestino irritable). Clases Malabsorción 1–2 y SII + libro p. 378–382.
export const escenas: Escena[] = [
  {
    tipo: 'organos',
    id: 'fases',
    titulo: 'Las tres fases: dónde falla la absorción',
    pasos: [
      {
        tono: 'peach',
        organos: ['pancreas', 'higado', 'vesicula', 'duodeno'],
        nota: { t: '1 · Fase intraluminal', d: 'Digestión en el duodeno: faltan jugo pancreático o sales biliares. La más frecuente.' },
        di: 'La fase intraluminal es la digestión dentro del duodeno. Ahí llegan el jugo pancreático y la bilis. Si el páncreas no secreta enzimas, no se digieren proteínas ni grasas; si faltan sales biliares, no se digieren las grasas ni las vitaminas liposolubles.',
        retener: ['Intraluminal = páncreas, bilis, hígado'],
      },
      {
        tono: 'peach',
        organos: ['pancreas', 'vesicula'],
        nota: { t: 'Causas intraluminales', d: 'Pancreatitis crónica, fibrosis quística, cáncer de páncreas; obstrucción biliar, hepatopatías.' },
        di: 'Causas: insuficiencia pancreática, como la pancreatitis crónica, la fibrosis quística o el cáncer de páncreas; y déficit de sales biliares, por obstrucción de la vía biliar o enfermedad del hígado.',
        retener: ['Pancreatitis crónica', 'Obstrucción biliar'],
      },
      {
        tono: 'lilac',
        organos: ['yeyuno', 'ileon'],
        nota: { t: '2 · Fase mucosa', d: 'Absorción en yeyuno e íleon: la mucosa está dañada. Ejemplo: enfermedad celíaca.' },
        di: 'La fase mucosa es la absorción, en el yeyuno y el íleon. Los nutrientes ya llegaron digeridos, pero la mucosa no los absorbe. El ejemplo clásico es la celíaca: anticuerpos activados por el gluten destruyen las vellosidades.',
        retener: ['Mucosa = yeyuno-íleon', 'Celíaca'],
      },
      {
        tono: 'sky',
        organos: ['ileon'],
        nota: { t: '3 · Fase absortiva (linfática)', d: 'No salen los quilomicrones hacia la linfa: esteatorrea y enteropatía perdedora de proteínas. Rara.' },
        di: 'La tercera fase es el transporte por la linfa: si el drenaje linfático falla, no salen los quilomicrones ni las lipoproteínas, y se pierden grasas y proteínas. Es rara. Las que el profe quiere que sepan son la intraluminal y la mucosa.',
        retener: ['Absortiva = linfa (rara)'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'deficits',
    titulo: 'No absorbo… entonces tengo',
    items: [
      { t: 'Grasas', d: 'Esteatorrea: heces grasosas, espumosas, que flotan + distensión y flatulencia', tono: 'gold' },
      { t: 'Proteínas', d: 'Pérdida de masa muscular; hipoalbuminemia → edema', tono: 'peach' },
      { t: 'Hierro · B12 · fólico', d: 'Anemia ferropénica (microcítica) o megaloblástica (macrocítica)', tono: 'red' },
      { t: 'Calcio · vitamina D', d: 'Tetania (Trousseau, Chvostek), raquitismo, osteomalacia', tono: 'sky' },
      { t: 'Vitamina K', d: 'Fenómenos hemorrágicos: faltan factores de coagulación', tono: 'rose' },
      { t: 'Vitamina A', d: 'Ceguera nocturna, xeroftalmia', tono: 'lilac' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'El profe pide estudiarlo razonando: no absorbo esto, entonces tengo esto. Si no absorbo grasas, aparece la esteatorrea: heces pastosas, amarillentas, grasosas, espumosas, que flotan, con distensión y flatulencia.',
        retener: ['Grasas → esteatorrea'],
      },
      {
        hasta: 1,
        di: 'Si no absorbo proteínas, pierdo masa muscular, y la hipoalbuminemia baja la presión oncótica: edema.',
        retener: ['Proteínas → edema'],
      },
      {
        hasta: 2,
        di: 'Sin hierro, anemia ferropénica, microcítica. Sin vitamina B12 o ácido fólico, anemia megaloblástica, macrocítica; la falta de B12 además da el síndrome neuroanémico.',
        retener: ['Fe → microcítica', 'B12 / fólico → macrocítica'],
      },
      {
        hasta: 3,
        di: 'Sin calcio ni vitamina D: tetania, con los signos de Trousseau y Chvostek, raquitismo en el niño y osteomalacia en el adulto.',
        retener: ['Ca / vit. D → tetania, huesos'],
      },
      {
        hasta: 5,
        di: 'Sin vitamina K, el hígado no fabrica factores de coagulación: sangrados. Y sin vitamina A, ceguera nocturna y sequedad ocular.',
        retener: ['Vit. K → sangrado', 'Vit. A → ojos'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'xilosa',
    titulo: 'Test de la D-xilosa: ¿páncreas o mucosa?',
    nodos: [
      { id: 'est', x: 480, y: 80, t: 'Ya sé que tiene esteatorrea (Van de Kamer +)', w: 360, tono: 'gold' },
      { id: 'xil', x: 480, y: 210, t: 'Toma 25 g de D-xilosa', w: 260, tono: 'lilac' },
      { id: 'abs', x: 480, y: 330, t: 'Se absorbe SIN enzimas pancreáticas', w: 300, tono: 'lilac' },
      { id: 'mas', x: 200, y: 480, t: '> 5 g en orina de 5 h: mucosa sana → INTRALUMINAL (páncreas)', w: 330, tono: 'peach' },
      { id: 'menos', x: 760, y: 480, t: '< 5 g: mucosa enferma → MUCOSA (celíaca)', w: 330, tono: 'sky' },
    ],
    lazos: [
      { a: 'est', b: 'xil' },
      { a: 'xil', b: 'abs' },
      { a: 'abs', b: 'mas' },
      { a: 'abs', b: 'menos' },
    ],
    pasos: [
      {
        ver: ['est'],
        di: 'Primero se confirma la esteatorrea con el Van de Kamer. La siguiente pregunta es dónde está el problema: ¿en la digestión, el páncreas, o en la absorción, la mucosa?',
        retener: ['Esteatorrea confirmada'],
      },
      {
        ver: ['est', 'xil', 'abs'],
        di: 'Se le da al paciente D-xilosa, un azúcar que se absorbe directamente por la mucosa, sin necesidad de enzimas pancreáticas, y se mide cuánto elimina por orina en cinco horas.',
        retener: ['D-xilosa: no necesita páncreas'],
      },
      {
        ver: ['est', 'xil', 'abs', 'mas', 'menos'],
        di: 'Si orina más de 5 gramos, la mucosa absorbe bien: el problema es intraluminal, del páncreas. Si orina menos de 5 gramos, la mucosa no absorbe: el problema está en el intestino delgado, como en la celíaca.',
        retener: ['> 5 g: páncreas', '< 5 g: mucosa'],
      },
    ],
  },
];
