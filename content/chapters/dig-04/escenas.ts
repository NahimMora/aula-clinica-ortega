import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-04 (ictericia). Fuente: apunte del profe (libro p. 10–15).
export const escenas: Escena[] = [
  {
    tipo: 'flujo',
    id: 'ciclo',
    titulo: 'El circuito de la bilirrubina',
    nodos: [
      { id: 'gr', x: 150, y: 100, t: 'Glóbulos rojos viejos', w: 240, tono: 'rose' },
      { id: 'bi', x: 150, y: 290, t: 'B. INDIRECTA pegada a la albúmina', w: 250, tono: 'peach' },
      { id: 'cap', x: 480, y: 100, t: 'Hígado: 1 · captación', w: 250, tono: 'lilac' },
      { id: 'conj', x: 480, y: 235, t: '2 · conjugación (glucurónico)', w: 250, tono: 'lilac' },
      { id: 'exc', x: 480, y: 370, t: '3 · excreción a la bilis', w: 250, tono: 'lilac' },
      { id: 'bd', x: 810, y: 370, t: 'B. DIRECTA (hidrosoluble)', w: 250, tono: 'gold' },
      { id: 'int', x: 810, y: 525, t: 'Intestino: estercobilina = color de las heces', w: 270, tono: 'mint' },
      { id: 'ori', x: 480, y: 525, t: 'Riñón: si la directa sube → coluria', w: 260, tono: 'sky' },
    ],
    lazos: [
      { a: 'gr', b: 'bi' },
      { a: 'bi', b: 'cap' },
      { a: 'cap', b: 'conj' },
      { a: 'conj', b: 'exc' },
      { a: 'exc', b: 'bd' },
      { a: 'bd', b: 'int' },
      { a: 'bd', b: 'ori' },
    ],
    pasos: [
      {
        ver: ['gr', 'bi'],
        di: 'Todo empieza con la hemoglobina de los glóbulos rojos viejos: se transforma en bilirrubina indirecta, no conjugada, que viaja firmemente unida a la albúmina. Por eso no se filtra en el riñón: no tiñe la orina.',
        retener: ['Indirecta = no conjugada', 'Unida a albúmina: sin coluria'],
      },
      {
        ver: ['gr', 'bi', 'cap', 'conj', 'exc'],
        di: 'En el hepatocito pasan tres cosas: la capta, la conjuga con ácido glucurónico y la excreta a la bilis. Cada uno de esos pasos puede fallar.',
        retener: ['Captación · conjugación · excreción'],
      },
      {
        ver: ['gr', 'bi', 'cap', 'conj', 'exc', 'bd'],
        di: 'Conjugada, es bilirrubina directa: hidrosoluble. Si se acumula en sangre, el riñón la filtra libremente.',
        retener: ['Directa = conjugada, hidrosoluble'],
      },
      {
        ver: ['gr', 'bi', 'cap', 'conj', 'exc', 'bd', 'int'],
        di: 'Por la bilis llega al intestino. Las bacterias la convierten en estercobilinógeno y estercobilina, que le dan el color a la materia fecal. Si no llega bilis, las heces salen blancas: acolia.',
        retener: ['Sin bilis al intestino = acolia'],
      },
      {
        ver: ['gr', 'bi', 'cap', 'conj', 'exc', 'bd', 'int', 'ori'],
        di: 'Y cuando la directa sube en sangre, pasa a la orina: coluria, una orina color caoba. Solo la directa da coluria.',
        retener: ['Solo la directa da coluria'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'tipos',
    titulo: 'Dónde se rompe el circuito',
    items: [
      { t: 'Prehepática (hemolítica)', d: 'Sobra bilirrubina → ↑ INDIRECTA · orina parda · heces hipercólicas · flavínica', tono: 'peach' },
      { t: 'Hepática (hepatocelular)', d: 'Falla el hepatocito → indirecta o directa · coluria · heces normocólicas · rubínica', tono: 'lilac' },
      { t: 'Poshepática (obstructiva)', d: 'No sale la bilis → ↑ DIRECTA · coluria + acolia · prurito · verdínica', tono: 'gold' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'Prehepática: el hígado está bien, pero llega más bilirrubina de la que puede procesar, por hemólisis. Sube la indirecta: no hay coluria, y las heces son hipercólicas, más oscuras, porque llega más pigmento.',
        retener: ['Pre: ↑ indirecta, sin coluria'],
      },
      {
        hasta: 1,
        di: 'Hepática: falla el hepatocito, en la captación, la conjugación o la excreción. Puede subir la indirecta, como en el Gilbert, o la directa, como en la hepatitis. Hay coluria y el tinte es rubínico.',
        retener: ['Hepática: mixta', 'Gilbert = captación (indirecta)'],
      },
      {
        hasta: 2,
        di: 'Poshepática u obstructiva: la bilis no puede salir. Sube la directa: coluria; no llega bilis al intestino: acolia; y las sales biliares en la piel dan prurito.',
        retener: ['Post: ↑ directa, coluria + acolia', 'Prurito'],
      },
    ],
  },
  {
    tipo: 'biliar',
    id: 'obstructiva',
    titulo: 'Ictericia obstructiva: cálculo o tumor',
    pasos: [
      {
        tono: 'gold',
        luz: ['coledoco'],
        calculo: 'coledoco',
        dilata: ['hepatico'],
        nota: { t: 'Coledocolitiasis', d: 'Un cálculo tapa el colédoco: la bilis se acumula arriba y no llega al intestino.' },
        di: 'La causa más frecuente de ictericia obstructiva es un cálculo en el colédoco. La bilis se acumula por arriba del obstáculo y no llega al duodeno.',
        retener: ['Coledocolitiasis'],
      },
      {
        tono: 'gold',
        luz: ['coledoco', 'hepatico'],
        calculo: 'coledoco',
        dilata: ['hepatico', 'coledoco'],
        nota: { t: 'Síndrome coledociano', d: 'Ictericia + coluria + hipocolia o acolia (± prurito).' },
        di: 'Eso da el síndrome coledociano: ictericia obstructiva, coluria e hipocolia o acolia, muchas veces con prurito por las sales biliares.',
        retener: ['Ictericia + coluria + acolia'],
      },
      {
        tono: 'red',
        luz: ['pancreas', 'vesicula', 'coledoco'],
        tumor: 'pancreas',
        dilata: ['vesicula', 'coledoco', 'hepatico'],
        nota: { t: 'Ley de Courvoisier-Terrier', d: 'Ictericia progresiva + vesícula palpable NO dolorosa + pérdida de peso = cáncer de cabeza de páncreas, hasta que se demuestre lo contrario.' },
        di: 'Ahora un tumor de la cabeza del páncreas: la obstrucción es lenta y la vesícula, sana, se distiende. Ley de Courvoisier-Terrier: ictericia progresiva, vesícula palpable no dolorosa y pérdida de peso es cáncer de cabeza de páncreas hasta que se demuestre lo contrario.',
        retener: ['Courvoisier: vesícula palpable indolora'],
      },
      {
        tono: 'peach',
        luz: ['vesicula'],
        calculo: 'vesicula',
        nota: { t: '¿Y en la litiasis?', d: 'La vesícula NO se distiende: su pared fibrosada por la inflamación crónica no se dilata.' },
        di: '¿Por qué en la litiasis no pasa? Porque la vesícula con cálculos tiene la pared fibrosada por la inflamación crónica y no se puede dilatar. Por eso una vesícula grande e indolora orienta a tumor.',
        retener: ['Litiasis: no distiende la vesícula'],
      },
    ],
  },
];
