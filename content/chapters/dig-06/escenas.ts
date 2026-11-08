import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-06 (síndrome esofágico). Clase «Sd. esofágico» + libro p. 368–369.
export const escenas: Escena[] = [
  {
    tipo: 'lista',
    id: 'sintomas',
    titulo: 'Los cinco síntomas del síndrome esofágico',
    items: [
      { t: 'Disfagia', d: 'Dificultad para tragar: orofaríngea o esofágica', tono: 'sky' },
      { t: 'Pirosis', d: 'Ardor retroesternal por reflujo ácido; calma con antiácidos', tono: 'peach' },
      { t: 'Regurgitación', d: 'Sube sin esfuerzo; la MÁS frecuente, con pirosis en > 90 %', tono: 'gold' },
      { t: 'Odinofagia', d: 'Dolor al tragar; causa más frecuente: faringoamigdalitis', tono: 'rose' },
      { t: 'Dolor torácico', d: 'Difícil de separar del cardíaco: siempre diagnóstico diferencial', tono: 'lilac' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'El síndrome esofágico es el conjunto de manifestaciones que salen del esófago, y se expresa con cinco síntomas, solos o asociados. El primero es la disfagia, que ya conocés: orofaríngea o esofágica.',
        retener: ['5 síntomas', 'Disfagia'],
      },
      {
        hasta: 1,
        di: 'La pirosis es el ardor retroesternal por el contenido ácido que sube desde el estómago. Empeora con café, mate, grasas, ejercicio o al acostarse, y mejora con antiácidos.',
        retener: ['Pirosis = ardor retroesternal'],
      },
      {
        hasta: 2,
        di: 'La regurgitación: el contenido sube a la boca solo, sin esfuerzo, muchas veces de noche. El profe dice que es lo que más van a ver, y que se asocia a pirosis en más del 90 % de los casos.',
        retener: ['Regurgitación: la más frecuente'],
      },
      {
        hasta: 3,
        di: 'La odinofagia es dolor al tragar. Su causa más frecuente es la faringoamigdalitis: por eso, lo primero es revisar la boca y la garganta.',
        retener: ['Odinofagia → revisar la garganta'],
      },
      {
        hasta: 4,
        di: 'Y el dolor torácico de origen esofágico, poco frecuente como consulta, porque se confunde con el cardíaco: siempre hay que hacer el diagnóstico diferencial.',
        retener: ['Dolor torácico: descartar corazón'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'barrett',
    titulo: 'Del reflujo al adenocarcinoma: el esófago de Barrett',
    nodos: [
      { id: 'eei', x: 165, y: 110, t: 'Esfínter esofágico inferior incompetente', w: 270, tono: 'lilac' },
      { id: 'acido', x: 485, y: 110, t: 'El ácido sube una y otra vez', w: 250, tono: 'peach' },
      { id: 'sint', x: 800, y: 110, t: 'Pirosis + regurgitación', w: 250, tono: 'peach' },
      { id: 'esof', x: 800, y: 290, t: 'Esofagitis (ERGE: la causa n.º 1)', w: 260, tono: 'rose' },
      { id: 'meta', x: 485, y: 290, t: 'Metaplasia: plano → cilíndrico', w: 250, tono: 'gold' },
      { id: 'barr', x: 165, y: 290, t: 'Esófago de BARRETT', w: 240, tono: 'gold' },
      { id: 'adeno', x: 165, y: 470, t: 'Adenocarcinoma del 1/3 inferior', w: 260, tono: 'red' },
      { id: 'alarma', x: 560, y: 470, t: 'Pirosis + disfagia = ALARMA', w: 270, tono: 'red' },
    ],
    lazos: [
      { a: 'eei', b: 'acido' },
      { a: 'acido', b: 'sint' },
      { a: 'sint', b: 'esof' },
      { a: 'esof', b: 'meta' },
      { a: 'meta', b: 'barr' },
      { a: 'barr', b: 'adeno' },
    ],
    pasos: [
      {
        ver: ['eei', 'acido', 'sint'],
        di: 'En la enfermedad por reflujo, el esfínter esofágico inferior no cierra bien: se relaja cuando no debe. El contenido ácido sube una y otra vez, y aparecen pirosis y regurgitación.',
        retener: ['ERGE: falla el esfínter inferior'],
      },
      {
        ver: ['eei', 'acido', 'sint', 'esof'],
        di: 'El ácido inflama la mucosa: esofagitis. La causa más frecuente de esofagitis es justamente el reflujo.',
        retener: ['Esofagitis: ERGE es la causa n.º 1'],
      },
      {
        ver: ['eei', 'acido', 'sint', 'esof', 'meta', 'barr'],
        di: 'El epitelio del esófago es plano estratificado y no soporta el ácido. Para defenderse, el tercio inferior cambia a un epitelio cilíndrico, como el del estómago: esa metaplasia es el esófago de Barrett. Es el paciente que dice «toda mi vida viví con acidez».',
        retener: ['Barrett = metaplasia del 1/3 inferior'],
      },
      {
        ver: ['eei', 'acido', 'sint', 'esof', 'meta', 'barr', 'adeno'],
        di: 'Barrett es una lesión preneoplásica: sobre él se desarrolla el adenocarcinoma del tercio inferior del esófago, más frecuente en hombres.',
        retener: ['Barrett → adenocarcinoma'],
      },
      {
        ver: ['eei', 'acido', 'sint', 'esof', 'meta', 'barr', 'adeno', 'alarma'],
        luz: ['alarma'],
        di: 'Por eso, si un paciente con pirosis empieza con disfagia, es un síntoma de alarma: puede ser una estenosis péptica o un adenocarcinoma.',
        retener: ['Pirosis + disfagia = alarma'],
      },
    ],
  },
  {
    tipo: 'paneles',
    id: 'imagenes',
    titulo: 'Esofagograma: lo primero que se pide',
    pasos: [
      {
        paneles: [{ f: 'pico', t: 'Pico de pájaro', d: 'Acalasia: esófago dilatado que termina afinado.', tono: 'sky' }],
        di: 'El esofagograma con bario es el estudio más útil y se pide primero porque no es invasivo. En la acalasia muestra el esófago dilatado que termina en punta: pico de pájaro o cola de ratón.',
        retener: ['Acalasia = pico de pájaro'],
      },
      {
        paneles: [{ f: 'manzana', t: 'Manzana mordida', d: 'Cáncer: estrechez irregular y abrupta.', tono: 'red' }],
        di: 'En el cáncer de esófago muestra una estrechez irregular, como una manzana mordida. Después se hace la endoscopía para ver la extensión y tomar la biopsia.',
        retener: ['Cáncer = manzana mordida'],
      },
      {
        paneles: [
          { f: 'pico', t: 'Manometría', d: 'Gold standard de la acalasia.', tono: 'sky' },
          { f: 'manzana', t: 'Endoscopía + biopsia', d: 'Certeza del cáncer (es invasiva).', tono: 'red' },
        ],
        di: 'Para confirmar: la manometría es el estándar de oro de la acalasia, porque mide la presión del esfínter. La endoscopía con biopsia da la certeza del cáncer. Y la pH-metría ambulatoria es la más confiable para el reflujo.',
        retener: ['Manometría: acalasia', 'Endoscopía: biopsia', 'pH-metría: reflujo'],
      },
    ],
  },
];
