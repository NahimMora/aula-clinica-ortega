import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-12 (hemorragias digestivas). Clases Hemorragias 1–2 + libro p. 389–390.
export const escenas: Escena[] = [
  {
    tipo: 'organos',
    id: 'treitz',
    titulo: 'Alta o baja: el ángulo de Treitz',
    treitz: true,
    pasos: [
      {
        tono: 'red',
        organos: ['esofago', 'estomago', 'duodeno'],
        nota: { t: 'Hemorragia digestiva ALTA', d: 'Del esfínter esofágico superior al ángulo de Treitz. La más frecuente y la más grave.' },
        di: 'El límite es el ángulo de Treitz, al final de la cuarta porción del duodeno. Por arriba, esófago, estómago y duodeno, es la hemorragia digestiva alta: la más frecuente y la más grave.',
        retener: ['Alta = hasta Treitz', 'Más frecuente y más grave'],
      },
      {
        tono: 'red',
        organos: ['estomago', 'duodeno'],
        marca: 'duodeno',
        nota: { t: 'Causa n.º 1: úlcera péptica', d: 'Úlcera 60 % · gastritis 8 % · várices 6 % · Mallory-Weiss 4 % · neoplasias 2 %.' },
        di: 'El profe lo marca como pregunta de parcial: la causa más frecuente de hemorragia digestiva alta es la úlcera péptica. Le siguen la gastritis erosiva, las várices esofágicas de la hipertensión portal y el Mallory-Weiss.',
        retener: ['HDA: «tiene que decir úlceras»'],
      },
      {
        tono: 'sky',
        organos: ['yeyuno', 'ileon', 'colon', 'recto'],
        nota: { t: 'Hemorragia digestiva BAJA', d: 'Del Treitz al ano. Menos frecuente, menos grave; suele estar estable.' },
        di: 'Por debajo del Treitz, yeyuno, íleon, colon, recto y ano, es la hemorragia digestiva baja: menos frecuente, menos grave, y muchas veces pasa desapercibida porque el paciente está estable.',
        retener: ['Baja = del Treitz al ano'],
      },
      {
        tono: 'sky',
        organos: ['recto'],
        marca: 'recto',
        nota: { t: 'Causa n.º 1: hemorroides y fisuras', d: 'Después: divertículos, angiodisplasia, cáncer, enfermedad inflamatoria, colitis isquémica.' },
        di: 'Y otra pregunta de parcial que muchos confunden: la causa más frecuente de hemorragia baja no es el cáncer ni los divertículos, son las hemorroides y las fisuras.',
        retener: ['HDB: hemorroides y fisuras'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'formas',
    titulo: 'Cómo se manifiesta el sangrado',
    items: [
      { t: 'Hematemesis', d: 'Vómito de sangre (roja o borra de café): siempre ALTA', tono: 'red' },
      { t: 'Melena', d: 'Heces negras, fétidas, sangre digerida: 85 % alta (< 15 % baja con tránsito lento)', tono: 'lilac' },
      { t: 'Hematoquecia', d: 'Sangre roja con las heces: 85 % baja (alta si > 1000 ml o tránsito rápido)', tono: 'rose' },
      { t: 'Sangre oculta', d: 'No se ve: anemia ferropénica → buscarla en heces → colonoscopía', tono: 'gold' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'La hematemesis es el vómito de sangre: roja o en borra de café, con coágulos. Siempre indica un sangrado alto.',
        retener: ['Hematemesis = alta'],
      },
      {
        hasta: 1,
        di: 'La melena es la materia fecal negra y fétida: sangre digerida. En el 85 % viene del tubo alto; menos del 15 % viene de abajo, y para eso el tránsito tiene que ser lento.',
        retener: ['Melena: 85 % alta'],
      },
      {
        hasta: 2,
        di: 'La hematoquecia es sangre roja con las heces: 85 % baja. Puede venir de arriba si se pierden más de mil mililitros o el tránsito es muy rápido.',
        retener: ['Hematoquecia: 85 % baja'],
      },
      {
        hasta: 3,
        di: 'Y la sangre oculta: el paciente no ve nada, pero tiene anemia ferropénica. Toda hemorragia digestiva termina en anemia. Ahí se busca sangre oculta en materia fecal y se hace colonoscopía.',
        retener: ['Sangre oculta → colonoscopía'],
      },
    ],
  },
];
