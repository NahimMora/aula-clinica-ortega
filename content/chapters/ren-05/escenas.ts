import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de ren-05 (insuficiencia renal). Clases «Insuficiencia renal» 1–3 (Ortega) + libro p. 429–439.
export const escenas: Escena[] = [
  {
    tipo: 'nefrona',
    id: 'donde',
    titulo: 'IRA: ¿dónde está el problema?',
    pasos: [
      {
        tono: 'sky',
        luz: ['arteriola'],
        isquemia: true,
        nota: { t: 'Prerrenal (60–70 %)', d: 'No llega sangre: hemorragia, deshidratación, quemaduras, insuficiencia cardíaca. El riñón está SANO: reabsorbe sodio (Na urinario < 20).' },
        di: 'La causa más frecuente de insuficiencia renal aguda es la prerrenal, entre el 60 y el 70 por ciento: al riñón no le llega sangre. Hemorragias, deshidratación, vómitos, diarrea, quemaduras, insuficiencia cardíaca. El riñón no está dañado: los túbulos están sanos y reabsorben todo el sodio que pueden.',
        retener: ['Prerrenal: hipoperfusión', 'Túbulo sano: Na u < 20'],
      },
      {
        tono: 'red',
        luz: ['arteriola', 'proximal'],
        isquemia: true,
        marca: 'proximal',
        nota: { t: 'Renal: necrosis tubular aguda', d: 'Si la isquemia persiste, el túbulo se necrosa: sus células se desprenden y TAPAN la luz. Ya no reabsorbe sodio (Na urinario > 40).' },
        di: 'Si la hipoperfusión persiste, el túbulo, muy sensible a la falta de oxígeno, se necrosa: es la necrosis tubular aguda isquémica, la causa renal más frecuente. Las células muertas se desprenden, caen a la luz y la tapan. Y como el túbulo está dañado, ya no reabsorbe sodio: el sodio urinario sube por encima de 40.',
        retener: ['NTA isquémica = prerrenal que persiste', 'Túbulo dañado: Na u > 40'],
      },
      {
        tono: 'peach',
        luz: ['distal', 'colector'],
        marca: 'distal',
        nota: { t: 'NTA tóxica', d: 'Exógena: aminoglucósidos, contraste, AINE. Endógena: hemoglobina, mioglobina, ácido úrico, Bence Jones forman CILINDROS que obstruyen el túbulo.' },
        di: 'La necrosis tubular tóxica puede ser exógena, por fármacos como los aminoglucósidos, los contrastes o los antiinflamatorios, o endógena: la hemoglobina de una hemólisis, la mioglobina de una rabdomiólisis, el ácido úrico o la proteína de Bence Jones se unen a la proteína de Tamm-Horsfall y forman cilindros que obstruyen el túbulo.',
        retener: ['Aminoglucósidos, contraste', 'Mioglobina, hemoglobina → cilindros'],
      },
      {
        tono: 'lilac',
        luz: ['colector'],
        marca: 'colector',
        nota: { t: 'Posrenal (obstructiva)', d: 'La orina no sale: cualquier obstrucción del colector a la uretra. La más frecuente: HIPERPLASIA DE PRÓSTATA.' },
        di: 'Y la posrenal u obstructiva: la orina se forma pero no puede salir, por una obstrucción desde el túbulo colector hasta la uretra. La causa más frecuente es la hiperplasia benigna de próstata.',
        retener: ['Posrenal: HPB'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'cronica',
    titulo: 'IRC: el círculo de la hiperfiltración',
    nodos: [
      { id: 'dano', x: 480, y: 62, t: 'Daño crónico: diabetes, HTA, glomerulopatías', w: 400, tono: 'red' },
      { id: 'perd', x: 480, y: 185, t: 'Se pierden nefronas (fibrosis)', w: 300, tono: 'red' },
      { id: 'hiper', x: 800, y: 300, t: 'Las sanas HIPERFILTRAN (fase poliúrica)', w: 250, tono: 'gold' },
      { id: 'sobre', x: 480, y: 330, t: 'Sobrecarga: se dañan también', w: 280, tono: 'peach' },
      { id: 'g60', x: 160, y: 300, t: 'FG < 60: insuficiencia renal crónica', w: 250, tono: 'lilac' },
      { id: 'g15', x: 160, y: 470, t: 'FG < 15: síndrome urémico', w: 250, tono: 'red' },
      { id: 'dial', x: 480, y: 500, t: 'Diálisis o trasplante', w: 260, tono: 'sky' },
    ],
    lazos: [
      { a: 'dano', b: 'perd' },
      { a: 'perd', b: 'hiper' },
      { a: 'hiper', b: 'sobre' },
      { a: 'sobre', b: 'perd' },
      { a: 'perd', b: 'g60' },
      { a: 'g60', b: 'g15' },
      { a: 'g15', b: 'dial' },
    ],
    pasos: [
      {
        ver: ['dano', 'perd'],
        di: 'La insuficiencia renal crónica es la pérdida progresiva e irreversible de nefronas, que mueren y se fibrosan. Las causas más frecuentes: la nefropatía diabética, después la hipertensiva y después las glomerulopatías primarias.',
        retener: ['Pérdida de nefronas', 'Diabetes, HTA'],
      },
      {
        ver: ['dano', 'perd', 'hiper', 'sobre'],
        di: 'Las nefronas que quedan compensan: hiperfiltran, y el paciente pasa por una fase poliúrica. Pero esa sobrecarga las termina dañando a ellas también, y se pierden más. Es un círculo que avanza a lo largo de los años.',
        retener: ['Hiperfiltración compensadora', 'Fase poliúrica'],
      },
      {
        ver: ['dano', 'perd', 'hiper', 'sobre', 'g60', 'g15', 'dial'],
        di: 'El filtrado normal es de unos 120 mililitros por minuto. Por debajo de 60 hablamos de insuficiencia renal crónica, con anemia y alteraciones del calcio y el fósforo. Por debajo de 15 aparece el síndrome urémico y el paciente necesita diálisis o trasplante.',
        retener: ['FG < 60 = IRC', 'FG < 15 = urémico'],
      },
    ],
  },
];
