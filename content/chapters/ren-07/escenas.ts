import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de ren-07 (litiasis renoureteral). Clases «Litiasis renoureteral» 1–2 (Ortega).
export const escenas: Escena[] = [
  {
    tipo: 'lista',
    id: 'formacion',
    titulo: 'Cómo se forma un cálculo (y quién lo impide)',
    items: [
      { t: 'Sobresaturación', d: 'Mucho soluto y poca agua: poca ingesta de líquidos, gaseosas, dieta.', tono: 'gold' },
      { t: 'Nucleación → cristales → agregación', d: 'Los núcleos se unen, crecen y forman el cálculo.', tono: 'peach' },
      { t: 'pH de la orina', d: 'Ácido: ácido úrico. Alcalino (infección por Proteus): estruvita.', tono: 'lilac' },
      { t: 'Protectores: MAGNESIO y CITRATO', d: 'Frenan la nucleación. Si faltan (hipomagnesuria, hipocitraturia), más cálculos.', tono: 'mint' },
    ],
    pasos: [
      {
        hasta: 1,
        di: 'Un cálculo se forma cuando la orina está sobresaturada: mucho soluto y poca agua. Empieza la nucleación: se forman núcleos que se unen, crecen como cristales y se agregan hasta formar el cálculo.',
        retener: ['Sobresaturación', 'Nucleación'],
      },
      {
        hasta: 2,
        di: 'El pH importa: en una orina ácida precipita el ácido úrico; en una orina alcalina, como la de una infección por Proteus, los de estruvita.',
        retener: ['Ácido → úrico; alcalino → estruvita'],
      },
      {
        hasta: 3,
        di: 'Y lo que el profe quiere que sepan sí o sí: el magnesio y el citrato de la orina son protectores, frenan la nucleación. Si faltan, el paciente forma más cálculos. Por eso se miden en orina y se pueden dar como tratamiento.',
        retener: ['Magnesio y citrato: protectores'],
      },
    ],
  },
  {
    tipo: 'urinario',
    id: 'colico',
    titulo: 'El viaje del cálculo: del riñón a la vejiga',
    pasos: [
      {
        tono: 'gold',
        luz: ['pelvis-d', 'rinon-d'],
        calculo: 'pelvis-d',
        nota: { t: '1 · En la pelvis renal', d: 'Puede ser asintomático mientras no obstruya.' },
        di: 'El cálculo se forma en los cálices o en la pelvis renal. Mientras no obstruya, puede no dar ningún síntoma.',
        retener: ['Puede ser asintomático'],
      },
      {
        tono: 'red',
        luz: ['pelvis-d', 'ureter-d'],
        calculo: 'ureter-d',
        dilata: ['pelvis-d', 'ureter-d'],
        irradia: true,
        estrecheces: true,
        nota: { t: '2 · Se traba: CÓLICO', d: 'Se impacta en una de las 3 estrecheces del uréter: la orina se acumula (hidronefrosis), se distiende la cápsula y aparece el cólico renoureteral.' },
        di: 'Cuando baja y se traba en una de las tres estrecheces del uréter, la unión pieloureteral, el cruce de los vasos ilíacos o la unión con la vejiga, la orina se acumula arriba: hidronefrosis. Se distiende la cápsula y aparece el cólico renoureteral: brusco, fluctuante, desde la fosa lumbar hacia el flanco, la fosa ilíaca y los genitales.',
        retener: ['3 estrecheces', 'Hidronefrosis → cólico'],
      },
      {
        tono: 'peach',
        luz: ['ureter-d', 'vejiga'],
        calculo: 'ureter-d',
        dilata: ['ureter-d'],
        nota: { t: '3 · Lo que acompaña', d: 'Hematuria ISOMÓRFICA (con coágulos), náuseas y vómitos, disuria; paciente inquieto. Puñopercusión +.' },
        di: 'Lo acompañan una hematuria isomórfica, a veces con coágulos, náuseas y vómitos, disuria, y un paciente inquieto que no encuentra posición. La puñopercusión y los puntos ureterales duelen. Si la obstrucción persiste, puede infectarse o llevar a una insuficiencia renal.',
        retener: ['Hematuria isomórfica', 'Complicación: infección, IR'],
      },
      {
        tono: 'mint',
        luz: ['vejiga'],
        calculo: 'vejiga',
        nota: { t: '4 · Llega a la vejiga', d: 'Se alivia el dolor. Los menores de 5 mm suelen eliminarse solos; de los mayores, solo un 20 %.' },
        di: 'Cuando el cálculo pasa a la vejiga, el dolor se alivia. Los cálculos menores de 5 milímetros suelen eliminarse solos; de los mayores, solo un 20 por ciento, y el resto necesita tratamiento: médico, litotricia extracorpórea o cirugía.',
        retener: ['< 5 mm: se elimina solo'],
      },
    ],
  },
];
