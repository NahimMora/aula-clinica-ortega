import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-15 (pancreatitis aguda). Clases Pancreatitis 1–2 + libro p. 409–410.
export const escenas: Escena[] = [
  {
    tipo: 'biliar',
    id: 'autodigestion',
    titulo: 'Por qué el páncreas se digiere a sí mismo',
    pasos: [
      {
        tono: 'gold',
        luz: ['ampolla', 'wirsung', 'coledoco'],
        calculo: 'ampolla',
        nota: { t: '1 · Cálculo en la ampolla', d: 'La causa más frecuente (sobre todo en la mujer): la bilis refluye hacia el Wirsung.' },
        di: 'Las enzimas del páncreas no se activan solas: las activa la bilis. Causa número uno, sobre todo en la mujer: un cálculo enclavado en la ampolla de Vater. La bilis no puede salir al duodeno y refluye hacia el conducto de Wirsung.',
        retener: ['Litiasis: causa n.º 1 (mujer)'],
      },
      {
        tono: 'lilac',
        luz: ['ampolla', 'wirsung', 'coledoco'],
        nota: { t: '2 · Alcohol', d: 'La segunda causa (sobre todo en el hombre): contrae el esfínter de Oddi y la bilis vuelve.' },
        di: 'La segunda causa, sobre todo en el hombre, es el alcohol: contrae el esfínter de Oddi, la bilis no sale y también refluye al páncreas. Entre los cálculos y el alcohol explican el 80 % de las pancreatitis agudas.',
        retener: ['Alcohol: causa n.º 2 (hombre)', 'Juntas: 80 %'],
      },
      {
        tono: 'red',
        luz: ['pancreas', 'wirsung'],
        nota: { t: '3 · Autodigestión', d: 'La bilis activa las enzimas DENTRO del páncreas: se «come» la glándula y daña órganos vecinos.' },
        di: 'La bilis activa las enzimas pancreáticas dentro del propio páncreas, y las enzimas empiezan a comerse la glándula: autodigestión. Pueden dañar órganos vecinos y, por la sangre, órganos a distancia.',
        retener: ['Autodigestión'],
      },
      {
        tono: 'red',
        luz: ['pancreas'],
        dilata: ['coledoco'],
        nota: { t: 'Edematosa o necrohemorrágica', d: 'Edematosa: 90–95 %, edema del intersticio. Necrohemorrágica: necrosis y hemorragia, grave.' },
        di: 'La mayoría, un 90 a 95 %, es edematosa: inflamación con edema. La necrohemorrágica es la grave: hay necrosis y hemorragia dentro del páncreas, con gran repercusión sistémica.',
        retener: ['Edematosa 90–95 %', 'Necrohemorrágica: grave'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'sistemica',
    titulo: 'De la inflamación local a la falla multiorgánica',
    nodos: [
      { id: 'pa', x: 480, y: 70, t: 'Pancreatitis aguda (autodigestión)', w: 320, tono: 'red' },
      { id: 'liq', x: 130, y: 225, t: 'Pierde líquido: deshidratación', w: 230, tono: 'sky' },
      { id: 'hto', x: 135, y: 380, t: 'Hemoconcentración ↑ hematocrito', w: 250, tono: 'sky' },
      { id: 'ira', x: 135, y: 530, t: 'IRA prerrenal, hipotensión, shock', w: 250, tono: 'sky' },
      { id: 'pleura', x: 382, y: 225, t: 'Derrame pleural IZQUIERDO', w: 220, tono: 'lilac' },
      { id: 'cid', x: 390, y: 380, t: 'Trombosis, CID', w: 200, tono: 'lilac' },
      { id: 'ileo', x: 615, y: 225, t: 'Íleo regional: asa centinela', w: 220, tono: 'peach' },
      { id: 'nec', x: 845, y: 225, t: 'Necrosis: islotes y grasa', w: 220, tono: 'gold' },
      { id: 'met', x: 835, y: 380, t: 'Hiperglucemia e hipocalcemia', w: 230, tono: 'gold' },
    ],
    lazos: [
      { a: 'pa', b: 'liq' },
      { a: 'liq', b: 'hto' },
      { a: 'hto', b: 'ira' },
      { a: 'pa', b: 'pleura' },
      { a: 'hto', b: 'cid' },
      { a: 'pa', b: 'ileo' },
      { a: 'pa', b: 'nec' },
      { a: 'nec', b: 'met' },
    ],
    pasos: [
      {
        ver: ['pa', 'liq', 'hto', 'ira'],
        di: 'El paciente pierde muchísimo líquido: se deshidrata. Pero queda hemoconcentrado, con más glóbulos rojos que plasma: el hematocrito sube. El profe dice que esto lo pueden preguntar en el parcial y en el oral. La deshidratación lleva a la insuficiencia renal prerrenal, la hipotensión y el shock hipovolémico.',
        retener: ['Hemoconcentración', 'IRA prerrenal'],
      },
      {
        ver: ['pa', 'liq', 'hto', 'ira', 'pleura', 'cid'],
        di: 'La cola del páncreas irrita el diafragma izquierdo y la pleura: derrame pleural izquierdo. Y la sangre concentrada favorece la trombosis y la coagulación intravascular diseminada.',
        retener: ['Derrame pleural izquierdo'],
      },
      {
        ver: ['pa', 'liq', 'hto', 'ira', 'pleura', 'cid', 'ileo', 'nec', 'met'],
        di: 'Al lado del páncreas, la inflamación paraliza un asa de intestino: íleo regional, el asa centinela que se ve en la radiografía. Y la necrosis daña los islotes, con hiperglucemia, y la grasa vecina, que al saponificarse consume calcio: hipocalcemia.',
        retener: ['Hiperglucemia', 'Hipocalcemia', 'Asa centinela'],
      },
    ],
  },
];
