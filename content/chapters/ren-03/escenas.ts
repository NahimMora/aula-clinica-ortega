import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de ren-03 (síndrome nefrítico). Clase «Síndrome nefrítico» (Ortega) + libro p. 442–444.
export const escenas: Escena[] = [
  {
    tipo: 'nefrona',
    id: 'glomerulo',
    titulo: 'Qué le pasa al glomérulo',
    pasos: [
      {
        tono: 'peach',
        luz: ['glomerulo'],
        nota: { t: '1 · Llegan los inmunocomplejos', d: 'Una o dos semanas después de una faringitis o un impétigo por estreptococo: se depositan en los capilares glomerulares.' },
        di: 'La causa más frecuente es la glomerulonefritis postestreptocócica. Después de una faringoamigdalitis o una infección de piel por estreptococo beta hemolítico del grupo A, se forman inmunocomplejos que viajan por la sangre y se depositan en los capilares del glomérulo.',
        retener: ['Postestreptocócica', 'Inmunocomplejos'],
      },
      {
        tono: 'red',
        luz: ['glomerulo'],
        fuga: ['hematies', 'proteinas'],
        nota: { t: '2 · Se rompen los capilares', d: 'Pasan glóbulos rojos (hematuria GLOMERULAR, con cilindros hemáticos) y algo de proteínas (< 3,5 g/día).' },
        di: 'Se inflaman y se rompen los capilares glomerulares. A diferencia del nefrótico, acá no solo aumenta la permeabilidad: hay rotura. Por eso pasan glóbulos rojos, una hematuria glomerular con cilindros hemáticos, y también proteínas, pero menos de 3,5 gramos por día.',
        retener: ['Rotura capilar → hematuria', 'Proteinuria < 3,5 g'],
      },
      {
        tono: 'sky',
        luz: ['glomerulo', 'distal', 'colector'],
        marca: 'glomerulo',
        nota: { t: '3 · Filtra menos', d: 'Los capilares colapsan y cae el filtrado. El túbulo sigue reabsorbiendo agua y sal: OLIGURIA y retención (FENa < 1 %).' },
        di: 'Los capilares inflamados colapsan y cae el filtrado glomerular. Pero el túbulo sigue funcionando y reabsorbe agua y sodio: el paciente orina poco, oliguria, con una excreción fraccional de sodio menor al 1 por ciento. Esa retención es la que explica el resto.',
        retener: ['↓ FG → oliguria', 'FENa < 1 %'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'cascada',
    titulo: 'De la rotura del glomérulo a las complicaciones',
    nodos: [
      { id: 'ic', x: 480, y: 60, t: 'Inmunocomplejos en el glomérulo', w: 330, tono: 'peach' },
      { id: 'rot', x: 160, y: 200, t: 'Rotura de capilares', w: 240, tono: 'red' },
      { id: 'hem', x: 165, y: 345, t: 'HEMATURIA con cilindros · proteinuria < 3,5 g', w: 290, tono: 'red' },
      { id: 'fg', x: 560, y: 200, t: '↓ Filtrado: oliguria', w: 240, tono: 'sky' },
      { id: 'ret', x: 560, y: 330, t: 'Retención de agua y sal', w: 250, tono: 'sky' },
      { id: 'vol', x: 560, y: 460, t: 'Hipervolemia', w: 200, tono: 'sky' },
      { id: 'hta', x: 330, y: 540, t: 'HTA + edema', w: 200, tono: 'gold' },
      { id: 'comp', x: 820, y: 522, t: 'IC, EAP, encefalopatía hipertensiva', w: 280, tono: 'red' },
      { id: 'azo', x: 845, y: 300, t: 'Hiperazoemia (↑ urea, creatinina, K): IRA', w: 210, tono: 'lilac' },
    ],
    lazos: [
      { a: 'ic', b: 'rot' },
      { a: 'rot', b: 'hem' },
      { a: 'ic', b: 'fg' },
      { a: 'fg', b: 'ret' },
      { a: 'ret', b: 'vol' },
      { a: 'vol', b: 'hta' },
      { a: 'vol', b: 'comp' },
      { a: 'fg', b: 'azo' },
    ],
    pasos: [
      {
        ver: ['ic', 'rot', 'hem'],
        di: 'De un lado, la rotura de los capilares: hematuria glomerular con cilindros hemáticos y una proteinuria que no llega al rango nefrótico.',
        retener: ['Hematuria glomerular'],
      },
      {
        ver: ['ic', 'rot', 'hem', 'fg', 'ret', 'vol', 'hta'],
        di: 'Del otro, cae el filtrado: el paciente orina poco y retiene agua y sal. Queda hipervolémico, y la sobrecarga de volumen da la hipertensión arterial y el edema, que es leve, en párpados y tobillos.',
        retener: ['Oliguria → hipervolemia', 'HTA volumen dependiente'],
      },
      {
        ver: ['ic', 'rot', 'hem', 'fg', 'ret', 'vol', 'hta', 'azo', 'comp'],
        di: 'Como no puede eliminar los desechos, retiene urea y creatinina: hiperazoemia, y potasio. Es el camino hacia la insuficiencia renal aguda. Y la hipervolemia con hipertensión puede terminar en insuficiencia cardíaca, edema agudo de pulmón o encefalopatía hipertensiva.',
        retener: ['Hiperazoemia → IRA', 'IC, EAP, encefalopatía'],
      },
    ],
  },
];
