import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-05 (examen físico del aparato digestivo). EF Digestivo partes 1 y 2.
export const escenas: Escena[] = [
  {
    tipo: 'lista',
    id: 'orden',
    titulo: 'El orden cambia: inspección, auscultación, percusión, palpación',
    items: [
      { t: '1 · Inspección', d: 'Estática (forma, ombligo, piel) y dinámica (saque y hunda la panza)', tono: 'sky' },
      { t: '2 · Auscultación', d: 'Antes de tocar: ruidos hidroaéreos, soplos, frotes', tono: 'lilac' },
      { t: '3 · Percusión', d: 'Sin rebote, radiada: timpanismo, matidez, Traube, ascitis', tono: 'peach' },
      { t: '4 · Palpación', d: 'Superficial y profunda: la más preguntada', tono: 'rose' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'El profe avisa: el examen del abdomen es, junto con el respiratorio, el examen físico más preguntado. Siempre en decúbito dorsal, relajado, cabeza sin almohada. Primero se inspecciona.',
        retener: ['Decúbito dorsal, relajado'],
      },
      {
        hasta: 1,
        di: 'Acá está la diferencia con el tórax: después de inspeccionar se ausculta, y recién después se palpa. ¿Por qué? Porque al palpar modificás los ruidos hidroaéreos espontáneos.',
        retener: ['Auscultar ANTES de palpar', 'Palpar modifica los RHA'],
      },
      {
        hasta: 2,
        di: 'La percusión del abdomen se hace sin rebote: un solo golpe por punto, de forma radiada desde el xifoides hacia abajo. Todo es timpánico, salvo el hígado y el bazo.',
        retener: ['Un solo golpe, radiada'],
      },
      {
        hasta: 3,
        di: 'Y al final la palpación: la técnica más importante, y según el profe la parte más preguntada, en la que más se bocha.',
        retener: ['Palpación = la más preguntada'],
      },
    ],
  },
  {
    tipo: 'abdomen',
    id: 'ascitis',
    titulo: 'Ascitis: dónde está la matidez',
    pasos: [
      {
        tono: 'sky',
        regiones: ['fd', 'fi', 'fid', 'hipo', 'fii'],
        nota: { t: 'Concavidad superior', d: 'Paciente acostado: el líquido cae a los flancos y abajo. Matidez con límite cóncavo hacia arriba.' },
        di: 'En la ascitis, con el paciente acostado, el líquido cae a los flancos y a la parte baja; el intestino, con gas, flota en el centro. Al percutir de forma radiada, la matidez queda con un límite cóncavo hacia arriba.',
        retener: ['Ascitis = matidez cóncava'],
      },
      {
        tono: 'peach',
        regiones: ['umb', 'hipo'],
        nota: { t: 'Convexidad superior', d: 'Una masa central empuja el intestino a los costados: embarazo, globo vesical, quiste de ovario, mioma.' },
        di: 'Si la matidez es convexa hacia arriba, la causa está en el centro y empuja las asas hacia los costados: un embarazo, el globo vesical, un quiste de ovario o un mioma grande.',
        retener: ['Convexa = embarazo, vejiga, tumor'],
      },
      {
        tono: 'sky',
        regiones: ['fi', 'fii', 'hi'],
        nota: { t: 'Matidez desplazable', d: 'En decúbito lateral el líquido va al lado declive y el límite mate se mueve. La maniobra más sensible.' },
        di: 'Para confirmarla: matidez desplazable. Se pone al paciente de costado; el líquido cae al lado de abajo y la matidez se corre. Es la maniobra de mayor sensibilidad y especificidad.',
        retener: ['Matidez desplazable: la más sensible'],
      },
      {
        tono: 'lilac',
        regiones: ['fd', 'umb', 'fi'],
        nota: { t: 'Onda ascítica', d: 'Golpeteo en un flanco; la otra mano siente la onda. El borde de una mano en la línea media bloquea la pared.' },
        di: 'Onda ascítica: una mano en un flanco, golpeteás el flanco opuesto, y alguien apoya el borde de la mano en la línea media para frenar la onda de la pared. Si hay líquido, la onda llega.',
        retener: ['Onda ascítica'],
      },
      {
        tono: 'gold',
        regiones: ['fid', 'hd'],
        nota: { t: 'Si no se desplaza…', d: 'Líquido tabicado = plastrón. Matideces en parches por todo el abdomen = abdomen en damero (peritonitis tuberculosa).' },
        di: 'Si el líquido no se mueve porque está encapsulado, no es ascitis libre: es un plastrón. Y si hay matideces en parches por todo el abdomen, es el abdomen en damero, típico de la peritonitis tuberculosa.',
        retener: ['Tabicado = plastrón', 'Damero = peritonitis TBC'],
      },
    ],
  },
];
