import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * ren-01 — Motivos de consulta nefrourológicos. Fuente: clases «MC Renal» partes 1 y 2 (Ortega) + libro p. 445–454.
 * Lo que el profe marca como pregunta de parcial: hematuria (clasificación, dismórfica vs isomórfica, tres vasos de Guyon),
 * el paciente con obstrucción urinaria (→ IRA posrenal) y las características de la orina. El algoritmo de la poliuria
 * lo atribuye a la Dra. González («este cuadrito lo pregunta la doctora González»).
 * Nicturia/nocturia: se usan las definiciones del libro (p. 450).
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M1 = (t: string) => r('mc-ren-1', t);
const M2 = (t: string) => r('mc-ren-2', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'ren-01',
  systemId: 'renal',
  title: 'Motivos de consulta nefrourológicos',
  subtitle: 'Edema renal, dolor lumbar, obstrucción urinaria, volumen de orina (poliuria, oliguria), aspecto de la orina, hematuria y trastornos de la micción.',
  estimatedMinutes: 45,
  sources: [M1('00:01–36:10'), M2('00:03–32:45'), L('p445–454')],

  map: {
    center: 'Motivos de consulta renales',
    why: '«Lo que más preguntan del aparato nefrourológico son los **síndromes**», pero hay motivos de consulta que el profe marca como **pregunta de parcial**: la **hematuria** («pregunta de parcial, pregunta de final, pregunta para todos»), la **prueba de los tres vasos**, las **características de la orina** y el **paciente con obstrucción urinaria**.',
    prereqs: [
      { label: 'Edema discrásico (1.er parcial)', detail: '«Ya deben conocer el edema discrásico»: el edema renal es parte de él.' },
      { label: 'La nefrona', detail: 'Glomérulo → túbulo proximal → asa de Henle → distal → colector.' },
    ],
    branches: [
      { id: 'edema', label: 'Edema y dolor', tone: 'sky', items: ['3 mecanismos de edema', 'Duele la cápsula', 'Cólico'] },
      { id: 'obstruccion', label: 'Obstrucción ★', tone: 'peach', items: ['HPB', 'Globo vesical', '→ IRA posrenal'] },
      { id: 'volumen', label: 'Volumen', tone: 'gold', items: ['Poliuria > 3 l', 'Oliguria < 500 ml', 'Osmótica vs acuosa'] },
      { id: 'hematuria', label: 'Orina y hematuria ★', tone: 'red', items: ['Dismórfica vs isomórfica', 'Cilindros hemáticos', 'Tres vasos'] },
      { id: 'miccion', label: 'Micción', tone: 'lilac', items: ['Disuria', 'Polaquiuria ≠ poliuria', 'Tenesmo, retención'] },
    ],
    outcomes: [
      'Explicar los **tres mecanismos** del edema renal.',
      'Reconocer al **paciente con obstrucción urinaria** y por qué termina en **IRA posrenal**.',
      'Recorrer el algoritmo de la **poliuria** (osmótica vs acuosa).',
      'Clasificar una **hematuria** y localizarla con la **prueba de los tres vasos**.',
      'Diferenciar disuria, estranguria, polaquiuria, tenesmo y retención.',
    ],
  },

  theory: [
    {
      id: 'edema',
      kicker: 'Fisiopatología',
      title: 'Edema renal y dolor lumbar',
      priority: 'muy-importante',
      summary: 'El edema renal se produce por tres mecanismos. El riñón no duele: duele su cápsula cuando se distiende.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Tres cosas diferentes', text: '«Yo quiero que ustedes sepan esto: los edemas renales se producen por **tres cosas diferentes**»: la **pérdida de proteínas**, el **aumento de la permeabilidad capilar** y la **caída del filtrado**.', refs: [M1('01:26'), M1('02:09'), M1('02:51')] },
        { t: 'anim', id: 'edema' },
        {
          t: 'cuadro',
          title: 'Los tres edemas renales (tapalo)',
          cols: [
            { t: 'Nefrótico', tone: 'gold' },
            { t: 'Nefrítico', tone: 'red' },
            { t: 'Insuficiencia renal', tone: 'sky' },
          ],
          rows: [
            { k: 'Mecanismo', v: ['↓ **presión oncótica** (pierde proteínas)', '↑ **permeabilidad capilar** (glomérulo inflamado)', '↓ **filtrado** → retención → ↑ **hidrostática**'] },
            { k: 'Cómo es', v: ['Blando, simétrico, palpebral y genital; puede llegar a **anasarca**', '**Matinal**, periorbitario, blando', '**Generalizado**; piel amarillenta, lesiones de rascado (prurito)'] },
          ],
          refs: [M1('02:09'), M1('03:32'), L('p445')],
        },
        {
          t: 'urinario',
          title: 'Dolor lumbar: de dónde viene',
          items: [
            { id: 'capsula', t: 'El riñón no duele', d: '«Lo que duele es la **cápsula**» cuando el riñón aumenta de tamaño y la distiende (igual que el hígado).', tone: 'sky', luz: ['rinon-d'], dilata: ['rinon-d'] },
            { id: 'colico', t: 'Cálculo: cólico renoureteral', d: '**Agudo**, de tipo **cólico** (fluctuante: 7/10, después 3/10, después 8/10…). Desde la fosa lumbar irradia al **flanco**, la **fosa ilíaca**, el hipogastrio y los **genitales**. Hematuria e inquietud.', tone: 'red', luz: ['pelvis-d', 'ureter-d'], calculo: 'ureter-d', dilata: ['pelvis-d', 'ureter-d'], irradia: true },
            { id: 'pielo', t: 'Pielonefritis aguda', d: 'Agudo, con compromiso **sistémico**: fiebre, náuseas, vómitos, disuria.', tone: 'peach', luz: ['rinon-d', 'pelvis-d'] },
            { id: 'tumor', t: 'Tumor renal', d: 'Dolor **crónico**, gravativo, pesado, por el aumento de tamaño.', tone: 'lilac', luz: ['rinon-d'], tumor: 'rinon-d' },
          ],
          caption: 'Agudo: **cálculo**, **pielonefritis** o **infarto renal**. Crónico: **tumor**. Lo agrava moverse (contractura del **psoas**: signo del psoas).',
        },
      ],
      refs: [M1('04:15'), M1('04:56'), M1('05:44'), M1('06:28'), M1('07:09'), M1('07:49'), M1('08:34'), L('p445')],
    },
    {
      id: 'obstruccion',
      kicker: 'Lo que toma ★',
      title: 'El paciente con obstrucción urinaria',
      priority: 'imprescindible',
      summary: 'Cualquier obstrucción desde los túbulos colectores hasta la uretra puede llevar a una IRA posrenal.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Esto es **pregunta de parcial**»: cualquier obstrucción que afecte cualquier zona de la vía urinaria «me puede llevar a la **insuficiencia renal aguda de etiología posrenal**». Y avisa: «si no me saben insuficiencia renal, **lo van a bochar**».', refs: [M1('24:46'), M1('25:26'), M1('26:06')] },
        { t: 'anim', id: 'obstruccion' },
        {
          t: 'urinario',
          title: 'Dónde puede estar la obstrucción',
          items: [
            { id: 'hpb', t: 'Hiperplasia de próstata', d: 'La más frecuente en el hombre (**≈ 77 %**). Estranguria, chorro débil, goteo, **globo vesical**.', tone: 'lilac', luz: ['prostata', 'vejiga'], dilata: ['prostata', 'vejiga'] },
            { id: 'uretra', t: 'Cálculo o coágulo en la uretra', d: 'Obstrucción infravesical: la vejiga se llena y no se vacía.', tone: 'peach', luz: ['uretra', 'vejiga'], calculo: 'uretra', dilata: ['vejiga'] },
            { id: 'neuro', t: 'Vejiga neurogénica', d: '**Hipotónica** en el diabético con neuropatía; **espástica** después de un ACV.', tone: 'gold', luz: ['vejiga'], dilata: ['vejiga'] },
            { id: 'bilateral', t: 'Supravesical bilateral', d: 'Sin globo vesical: **ecografía** renal → **hidronefrosis** de los dos lados (tumores pelvianos, fibrosis retroperitoneal).', tone: 'red', luz: ['ureter-d', 'ureter-i', 'pelvis-d', 'pelvis-i'], dilata: ['ureter-d', 'ureter-i', 'pelvis-d', 'pelvis-i'] },
            { id: 'colector', t: 'Dentro del riñón: túbulo colector', d: '**Mieloma múltiple** (proteína de Bence Jones) y cristales de **ácido úrico** (lisis tumoral).', tone: 'sky', luz: ['rinon-d', 'rinon-i'] },
          ],
        },
        {
          t: 'flow',
          root: {
            label: '**Oliguria o anuria** con sospecha de obstrucción → palpar y percutir arriba del pubis',
            tone: 'ink',
            children: [
              {
                label: '**Vejiga distendida** (globo vesical) = obstrucción **infravesical**',
                tone: 'peach',
                children: [{ label: '**Cateterismo vesical** (sonda): ¿mejora la función renal?', tone: 'peach', star: true }],
              },
              {
                label: '**Vejiga no distendida** = obstrucción **supravesical**',
                tone: 'sky',
                children: [
                  {
                    label: '**Ecografía renal**',
                    tone: 'sky',
                    children: [
                      { label: 'Positiva (hidronefrosis): función normal → **pielografía anterógrada**; anormal → TAC y urología', tone: 'sky' },
                      { label: 'Negativa: obstrucción **improbable** (buscar causa renal o vascular)', tone: 'mint' },
                    ],
                  },
                ],
              },
            ],
          },
          caption: 'Algoritmo del libro (p. 448), el mismo que recorre el profe. Rx de abdomen: el 80–90 % de los cálculos son de oxalato de calcio y se ven; la TAC sin contraste es el estándar para localizarlos.',
        },
      ],
      refs: [M1('19:23'), M1('20:44'), M1('21:24'), M1('22:04'), M1('27:26'), M1('28:46'), M1('29:27'), M1('30:47'), L('p447–448')],
    },
    {
      id: 'volumen',
      kicker: 'Motivo de consulta',
      title: 'Volumen y ritmo de la orina',
      priority: 'muy-importante',
      summary: 'Normal 1–2 l/día. Poliuria > 3 l; oliguria < 500 ml; anuria < 50–100 ml.',
      blocks: [
        {
          t: 'scale',
          title: 'Cuánto orina en 24 horas',
          items: [
            { k: '< 50–100 ml', t: 'Anuria', d: 'Obstrucción completa, IRA; renal de origen vascular (necrosis cortical, trombosis de venas renales).', tone: 'red' },
            { k: '< 500 ml', t: 'Oliguria', d: 'Prerrenal (deshidratación, hipovolemia), renal (IRA, IRC terminal) o posrenal (obstrucción). Hoy algunos libros usan < 400 ml.', tone: 'peach' },
            { k: '1–2 l', t: 'Normal', tone: 'mint' },
            { k: '> 3 l', t: 'Poliuria', d: 'Osmótica (sobra soluto) o acuosa (sobra agua).', tone: 'sky' },
          ],
          ends: ['Menos', 'Más'],
        },
        { t: 'callout', kind: 'prof', title: 'El cuadrito de la poliuria', text: 'Se arranca por la **osmolaridad urinaria**: > 300 es **osmótica**, < 200 es **acuosa**. «Este cuadrito lo pregunta la **doctora González**.»', refs: [M2('02:08'), M2('08:18')] },
        { t: 'anim', id: 'poliuria' },
        {
          t: 'flow',
          root: {
            label: '**Poliuria** (> 3 l/día) → **osmolaridad urinaria**',
            tone: 'ink',
            children: [
              {
                label: '**> 300 mOsm/l**: diuresis **osmótica**',
                tone: 'gold',
                children: [
                  { label: 'Glucosuria +', tone: 'gold', children: [{ label: 'Glucemia alta: **diabetes mellitus**', tone: 'gold', star: true }, { label: 'Glucemia normal: defecto tubular (**Fanconi**)', tone: 'peach' }] },
                  { label: 'Glucosuria −', tone: 'peach', children: [{ label: 'Urea > 50: IRA, posobstructiva, hipercatabolismo', tone: 'peach' }, { label: 'Urea normal: **diuréticos**', tone: 'peach' }] },
                ],
              },
              {
                label: '**< 200 mOsm/l**: diuresis **acuosa**',
                tone: 'sky',
                children: [
                  { label: 'Natremia normal: **potomanía**', tone: 'mint' },
                  { label: 'Natremia alta: **diabetes insípida** → prueba de ADH', tone: 'sky', children: [{ label: 'Responde: **central**', tone: 'sky' }, { label: 'No responde: **nefrogénica**', tone: 'lilac' }] },
                ],
              },
            ],
          },
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Noche', title: 'Nicturia', text: 'Tiene que orinar **varias veces durante la noche**.', tone: 'lilac' },
            { tag: 'Noche', title: 'Nocturia', text: '**Inversión del ritmo**: orina más volumen de noche que de día.', tone: 'sky' },
            { tag: 'Noche', title: 'Enuresis', text: 'Micción **involuntaria e inconsciente** durante el sueño (típica de los niños).', tone: 'mint' },
          ],
        },
      ],
      refs: [M1('32:48'), M1('34:50'), M1('35:30'), M2('00:03'), M2('02:48'), M2('03:30'), M2('06:16'), M2('07:37'), M2('08:59'), M2('09:41'), L('p449–450')],
    },
    {
      id: 'hematuria',
      kicker: 'Lo que toma ★',
      title: 'Aspecto de la orina y hematuria',
      priority: 'imprescindible',
      summary: 'Si no estudian todo, «aunque sea la clasificación»: macro o micro, glomerular o de la vía urinaria, y los tres vasos.',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Normal', title: 'Amarillo ámbar, límpida', text: 'Color por los **urocromos**; escasa espuma que desaparece; olor *sui generis*.', tone: 'gold' },
            { tag: 'Espuma ★', title: 'Mucha espuma que no se va', text: 'Pensá en **proteinuria**: el problema viene del glomérulo.', tone: 'sky' },
            { tag: 'Rojo', title: 'Hematuria… o no', text: 'También remolacha, rifampicina (naranja), azul de metileno, hemoglobinuria. Sin eritrocitos en el sedimento = **seudohematuria**.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial y de final', text: '«El paciente con hematuria… es una **pregunta de parcial, pregunta de final, pregunta para todos**.» «Si usted no quiere estudiar todo, no lo estudie, pero **aunque sea estúdieme la clasificación**.»', refs: [M2('14:27'), M2('19:49')] },
        {
          t: 'cuadro',
          title: 'Según el origen (tapalo)',
          cols: [
            { t: 'Tipo I · glomerular (alta)', tone: 'red' },
            { t: 'Tipo II · no glomerular (baja)', tone: 'sky' },
          ],
          rows: [
            { k: 'Eritrocitos', v: ['**Dismórficos** (deformados); el más frecuente, el **acantocito**', '**Isomórficos** (forma normal)'] },
            { k: 'Acompaña', v: ['**Cilindros hemáticos**', '**Coágulos** («siempre urológica»)'] },
            { k: 'De dónde', v: ['Lesión del **glomérulo** (glomerulonefritis)', '**Vía urinaria**: del colector y la pelvis hacia la uretra'] },
            { k: 'Causas', v: ['Glomerulopatías primarias y secundarias', '**Infecciones** y **litiasis** (las más frecuentes), tumores, quistes'] },
          ],
          caption: 'Fasset: glomerular si más del 80 % de los eritrocitos son dismórficos (libro p. 453).',
          refs: [M2('17:09'), M2('17:49'), M2('21:52'), M2('24:36'), L('p451'), L('p453')],
        },
        { t: 'callout', kind: 'tip', title: 'Por qué se deforman y por qué hay cilindros', text: 'Al atravesar la pared del glomérulo dañado y después los cambios de concentración del túbulo, el glóbulo rojo se **deforma** (acantocito: anillo con «vesículas»). Y como entró **antes** del túbulo, queda atrapado en el molde de proteína del túbulo: el **cilindro hemático**. Por eso un cilindro hemático en el sedimento ubica la lesión en el glomérulo sin dudar.', refs: [M2('23:14'), M2('27:22'), M2('32:04'), L('p453')] },
        {
          t: 'urinario',
          title: 'Prueba de los tres vasos de Guyon',
          items: [
            { id: 'inicial', t: 'Inicial: solo el 1.er vaso', d: 'La sangre sale al principio y después se aclara: origen **uretral o prostático**.', tone: 'lilac', luz: ['uretra', 'prostata'], vasos: [true, false, false] },
            { id: 'terminal', t: 'Terminal: solo el último vaso', d: 'Los dos primeros limpios, el último con sangre: origen **vesical**.', tone: 'peach', luz: ['vejiga'], vasos: [false, false, true] },
            { id: 'total', t: 'Total: los tres vasos', d: 'Sangre de principio a fin: origen **renal** (parénquima).', tone: 'red', luz: ['rinon-d', 'rinon-i'], vasos: [true, true, true] },
          ],
          caption: '«Esta es **pregunta de parcial** de la doctora González»: el paciente orina en tres vasos seguidos.',
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Intensidad', title: 'Macro o micro', text: '**Macroscópica**: se ve a simple vista. **Microscópica**: más de **3 eritrocitos por campo**.', tone: 'red' },
            { tag: 'Ritmo', title: 'Persistente o transitoria', text: 'Transitoria: ejercicio, fiebre, actividad sexual, traumatismo, infección.', tone: 'gold' },
            { tag: 'Estudio', title: 'Sedimento fresco', text: 'Eritrocitos > 3/campo, **cilindros hemáticos**, morfología al microscopio; proteinuria.', tone: 'mint' },
          ],
        },
      ],
      refs: [M2('11:46'), M2('12:27'), M2('13:07'), M2('15:07'), M2('15:47'), M2('18:29'), M2('19:09'), M2('30:04'), L('p451–454')],
    },
    {
      id: 'miccion',
      kicker: 'Motivo de consulta',
      title: 'Trastornos de la micción',
      priority: 'complementario',
      summary: 'La disuria es el síntoma cardinal de la infección urinaria baja. Polaquiuria (muchas veces, poco) no es poliuria (mucho volumen).',
      blocks: [
        {
          t: 'cuadro',
          title: 'Qué es y en qué pensar (tapalo)',
          cols: [
            { t: 'Qué es', tone: 'lilac' },
            { t: 'Pensá en', tone: 'gold' },
          ],
          rows: [
            { k: 'Disuria', v: ['Dolor o ardor al orinar', '**Infección urinaria baja** (90 %): cistitis, uretritis; en el hombre, prostatitis'] },
            { k: 'Estranguria', v: ['Micción lenta, difícil y dolorosa, «estrangulada», gota a gota', '**Hiperplasia de próstata** (la más frecuente)'] },
            { k: 'Polaquiuria', v: ['Orina **muchas veces y poco** («de a chorritos»)', 'Inflamación de uretra o vejiga, obstrucción'] },
            { k: 'Tenesmo vesical', v: ['Sigue con ganas de orinar después de vaciar', 'Cistitis, obstrucción'] },
            { k: 'Retención', v: ['No puede vaciar la vejiga → **globo vesical**', 'HPB en el hombre; infecciones en la mujer'] },
          ],
          refs: [M1('15:16'), M1('15:57'), M1('16:37'), M1('17:17'), M1('17:57')],
        },
        { t: 'callout', kind: 'warn', title: 'Polaquiuria ≠ poliuria', text: '«La poliuria es una sola vez en **volumen** y la polaquiuria es muchas veces en **frecuencia**.»', refs: [M1('17:17')] },
      ],
      refs: [M1('15:16'), M1('17:17'), M1('17:57')],
    },
  ],

  developments: [
    {
      id: 'ren01-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'hematuria',
      question: 'Defina hematuria y clasifíquela. ¿Cómo diferencia una hematuria glomerular de una de la vía urinaria?',
      quote: { text: '«¿Dismórfica o isomórfica? Siempre preguntan de eso»', refs: [M2('24:36')] },
      answer: [
        { t: 'p', text: 'Presencia de sangre en la orina. **Según la intensidad:** macroscópica (se ve) o microscópica (**> 3 eritrocitos por campo**). **Según el ritmo:** persistente o transitoria. Sintomática o asintomática.' },
        { t: 'p', text: '**Según el origen:** **tipo I o glomerular (alta)**: eritrocitos **dismórficos** (el más frecuente, el **acantocito**) con **cilindros hemáticos**; **tipo II o no glomerular (baja)**: eritrocitos **isomórficos**, a veces con **coágulos**; viene de la vía urinaria (infecciones y litiasis, las más frecuentes; tumores).' },
        { t: 'p', text: '**Según la micción (tres vasos de Guyon):** inicial = uretra o próstata; terminal = vejiga; total = riñón.' },
      ],
      refs: [M2('15:07'), M2('17:09'), M2('17:49'), M2('19:09'), M2('32:04'), L('p451')],
    },
    {
      id: 'ren01-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'hematuria',
      question: '¿En qué consiste la prueba de los tres vasos de Guyon y qué indica cada resultado?',
      quote: { text: '«…esta es pregunta de parcial de la doctora González… la prueba de los tres vasos de Guyon»', refs: [M2('18:29')] },
      answer: [{ t: 'p', text: 'El paciente orina en **tres vasos** seguidos. Sangre solo en el **primero** (hematuria inicial): origen **uretral o prostático**. Solo en el **último** (terminal): origen **vesical**. En los **tres** (total): origen **renal**.' }],
      refs: [M2('19:09'), L('p451')],
    },
    {
      id: 'ren01-d03',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'obstruccion',
      question: '¿Qué es el paciente con obstrucción urinaria? Causas, clínica y conducta.',
      quote: { text: '«…esto es pregunta de parcial… me puede llevar a la insuficiencia renal aguda de etiología posrenal»', refs: [M1('24:46'), M1('25:26')] },
      answer: [
        { t: 'p', text: 'Obstrucción al flujo de orina en cualquier punto **desde los túbulos colectores hasta la uretra**, estructural o funcional. Si no se resuelve rápido lleva a la **IRA posrenal**.' },
        { t: 'p', text: '**Causas:** **hiperplasia benigna de próstata** (≈ 77 % en el hombre), cálculos y coágulos, vejiga neurogénica (diabetes, ACV); en el colector, mieloma y cristales de ácido úrico.' },
        { t: 'p', text: '**Clínica:** anuria (completa), oliguria o hasta poliuria (incompleta o unilateral compensada); dolor por **hidronefrosis** (distensión de la cápsula); náuseas, vómitos; **globo vesical**. **Conducta:** palpar y percutir arriba del pubis: vejiga distendida → **sonda vesical**; no distendida → **ecografía** renal. Al destapar: **diuresis posobstructiva**.' },
      ],
      refs: [M1('19:23'), M1('20:44'), M1('22:44'), M1('27:26'), M1('28:46'), M1('29:27'), M1('30:47'), L('p448')],
    },
    {
      id: 'ren01-d04',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'volumen',
      question: 'Defina poliuria y explique cómo se estudia.',
      quote: { text: '«Este cuadrito lo pregunta la doctora González»', refs: [M2('08:18')] },
      answer: [
        { t: 'p', text: 'Diuresis **mayor de 3 litros por día**. Se mide la **osmolaridad urinaria**.' },
        { t: 'p', text: '**> 300 mOsm/l (osmótica):** con glucosuria y glucemia alta, **diabetes mellitus** (la más frecuente); con glucemia normal, defecto tubular (**Fanconi**); sin glucosuria, urea alta (IRA, posobstructiva) o diuréticos. **< 200 mOsm/l (acuosa):** natremia normal = **potomanía**; natremia alta = **diabetes insípida** → prueba de ADH: responde = **central**; no responde = **nefrogénica** (falla la acuaporina 2).' },
      ],
      refs: [M2('02:08'), M2('02:48'), M2('03:30'), M2('06:16'), M2('06:56'), M2('07:37'), L('p450')],
    },
    {
      id: 'ren01-d05',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'edema',
      question: '¿Por qué mecanismos se produce el edema de origen renal?',
      quote: { text: '«…los edemas renales se producen por tres cosas diferentes»', refs: [M1('01:26')] },
      answer: [
        { t: 'p', text: '1) **↓ presión oncótica** por pérdida de proteínas: blando, simétrico, palpebral, puede llegar a anasarca (**síndrome nefrótico**). 2) **↑ permeabilidad capilar** por inflamación y destrucción de los capilares glomerulares: matinal, periorbitario (**síndrome nefrítico**). 3) **↓ filtrado glomerular** con retención hidrosalina e **↑ presión hidrostática**: generalizado (**insuficiencia renal**, que suma los tres).' },
      ],
      refs: [M1('02:09'), M1('02:51'), M1('03:32'), L('p445')],
    },
    {
      id: 'ren01-d06',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'edema',
      question: 'Describa el dolor lumbar de origen renal y el cólico renoureteral.',
      quote: { text: '«El riñón no duele… lo que duele es la cápsula»', refs: [M1('04:56')] },
      answer: [
        { t: 'p', text: 'Duele la **cápsula** al distenderse (y la distensión brusca de pelvis y uréteres). Agudo: **cálculo**, **pielonefritis**, **infarto renal**; crónico: **tumor**. Se localiza en la **fosa lumbar** e irradia a flancos, fosa ilíaca, hipogastrio y genitales.' },
        { t: 'p', text: '**Cólico renoureteral:** brusco, intenso, **fluctuante**; paciente **inquieto**; hematuria; náuseas y vómitos; lo agrava moverse (signo del **psoas**). Al examen: **puñopercusión** positiva y puntos ureterales dolorosos.' },
      ],
      refs: [M1('05:44'), M1('06:28'), M1('07:49'), M1('08:34'), M1('12:36'), L('p445')],
    },
  ],

  mcq: [
    {
      id: 'ren01-q01',
      topic: 'Hematuria',
      difficulty: 1,
      emphasis: true,
      stem: 'Una hematuria con eritrocitos **dismórficos** y **cilindros hemáticos** indica origen:',
      options: [
        { text: 'Glomerular.', why: 'Correcto: tipo I o alta.' },
        { text: 'Vesical.', why: 'Sería isomórfica.' },
        { text: 'Uretral.', why: 'Sería isomórfica, inicial.' },
        { text: 'Prostático.', why: 'No.' },
      ],
      answer: 0,
      refs: [M2('17:09'), M2('32:04')],
    },
    {
      id: 'ren01-q02',
      topic: 'Hematuria',
      difficulty: 2,
      emphasis: true,
      stem: 'La presencia de **coágulos** en la orina orienta a una hematuria:',
      options: [
        { text: 'De la vía urinaria (no glomerular).', why: 'Correcto: «indica siempre una hematuria de origen urológico».' },
        { text: 'Glomerular.', why: 'La glomerular tiene cilindros, no coágulos.' },
        { text: 'Por ejercicio.', why: 'No.' },
        { text: 'Seudohematuria.', why: 'No hay sangre real en la seudohematuria.' },
      ],
      answer: 0,
      refs: [M2('17:49'), L('p451')],
    },
    {
      id: 'ren01-q03',
      topic: 'Tres vasos',
      difficulty: 2,
      emphasis: true,
      stem: 'En la prueba de los tres vasos, sangre **solo en el último vaso** indica origen:',
      options: [
        { text: 'Vesical.', why: 'Correcto: hematuria terminal.' },
        { text: 'Uretral o prostático.', why: 'Es la inicial (primer vaso).' },
        { text: 'Renal.', why: 'Es la total (los tres).' },
        { text: 'Ureteral bajo.', why: 'No es la interpretación de la prueba.' },
      ],
      answer: 0,
      refs: [M2('19:09')],
    },
    {
      id: 'ren01-q04',
      topic: 'Hematuria',
      difficulty: 1,
      stem: 'Se habla de hematuria microscópica con más de:',
      options: [
        { text: '3 eritrocitos por campo.', why: 'Correcto.' },
        { text: '50 eritrocitos por campo.', why: 'Eso ya se acerca a la macroscópica.' },
        { text: '1 eritrocito por campo.', why: 'No.' },
        { text: '10 leucocitos por campo.', why: 'Eso es otra cosa.' },
      ],
      answer: 0,
      refs: [M2('15:07')],
    },
    {
      id: 'ren01-q05',
      topic: 'Obstrucción',
      difficulty: 2,
      emphasis: true,
      stem: 'La causa más frecuente de obstrucción urinaria en el hombre es:',
      options: [
        { text: 'La hiperplasia benigna de próstata.', why: 'Correcto (≈ 77 %).' },
        { text: 'La litiasis ureteral.', why: 'Le sigue.' },
        { text: 'El mieloma múltiple.', why: 'Es raro.' },
        { text: 'La vejiga neurogénica.', why: 'No es la más frecuente.' },
      ],
      answer: 0,
      refs: [M1('20:44')],
    },
    {
      id: 'ren01-q06',
      topic: 'Obstrucción',
      difficulty: 2,
      stem: 'Paciente anúrico con globo vesical palpable. El primer paso es:',
      options: [
        { text: 'Colocar una sonda vesical.', why: 'Correcto: obstrucción infravesical.' },
        { text: 'Pedir una pielografía anterógrada.', why: 'Va después, si hace falta.' },
        { text: 'Dar diuréticos.', why: 'No: está obstruido.' },
        { text: 'Hacer una biopsia renal.', why: 'No.' },
      ],
      answer: 0,
      refs: [M1('29:27'), L('p448')],
    },
    {
      id: 'ren01-q07',
      topic: 'Obstrucción',
      difficulty: 3,
      stem: 'Un cálculo que obstruye **un solo** uréter con el otro riñón sano puede dar:',
      options: [
        { text: 'Diuresis conservada o aumentada (el riñón sano compensa).', why: 'Correcto: poliuria compensatoria.' },
        { text: 'Anuria siempre.', why: 'La anuria es de la obstrucción completa (bilateral o riñón único).' },
        { text: 'Globo vesical.', why: 'Es de la obstrucción infravesical.' },
        { text: 'Hematuria glomerular.', why: 'No.' },
      ],
      answer: 0,
      refs: [M1('27:26'), M1('28:06')],
    },
    {
      id: 'ren01-q08',
      topic: 'Poliuria',
      difficulty: 2,
      stem: 'Poliuria con osmolaridad urinaria > 300 mOsm/l y glucosuria con glucemia alta. Pensás en:',
      options: [
        { text: 'Diabetes mellitus (diuresis osmótica).', why: 'Correcto: la más frecuente.' },
        { text: 'Diabetes insípida.', why: 'Da orina diluida (< 200).' },
        { text: 'Potomanía.', why: 'Orina diluida y sodio normal.' },
        { text: 'Síndrome de Fanconi.', why: 'Glucosuria con glucemia normal.' },
      ],
      answer: 0,
      refs: [M2('02:48'), M2('03:30')],
    },
    {
      id: 'ren01-q09',
      topic: 'Poliuria',
      difficulty: 3,
      stem: 'Orina diluida, sodio alto, y **no** mejora con la antidiurética. Diagnóstico:',
      options: [
        { text: 'Diabetes insípida nefrogénica.', why: 'Correcto: falla el receptor (acuaporina 2).' },
        { text: 'Diabetes insípida central.', why: 'Respondería a la ADH.' },
        { text: 'Potomanía.', why: 'El sodio sería normal.' },
        { text: 'Diabetes mellitus.', why: 'Sería osmótica.' },
      ],
      answer: 0,
      refs: [M2('07:37'), M2('08:18')],
    },
    {
      id: 'ren01-q10',
      topic: 'Edema',
      difficulty: 2,
      stem: 'El edema del síndrome **nefrótico** se debe principalmente a:',
      options: [
        { text: 'La caída de la presión oncótica por pérdida de proteínas.', why: 'Correcto.' },
        { text: 'El aumento de la permeabilidad capilar glomerular.', why: 'Es el del nefrítico.' },
        { text: 'La caída del filtrado con hipervolemia.', why: 'Es el de la insuficiencia renal.' },
        { text: 'La obstrucción linfática.', why: 'No.' },
      ],
      answer: 0,
      refs: [M1('02:09')],
    },
    {
      id: 'ren01-q11',
      topic: 'Micción',
      difficulty: 1,
      stem: 'Orinar **muchas veces y poca cantidad** se llama:',
      options: [
        { text: 'Polaquiuria.', why: 'Correcto.' },
        { text: 'Poliuria.', why: 'Es mucho volumen.' },
        { text: 'Nicturia.', why: 'Es orinar varias veces de noche.' },
        { text: 'Enuresis.', why: 'Es la micción involuntaria durante el sueño.' },
      ],
      answer: 0,
      refs: [M1('17:17')],
    },
    {
      id: 'ren01-q12',
      topic: 'Orina',
      difficulty: 1,
      stem: 'Una orina con **mucha espuma que no desaparece** sugiere:',
      options: [
        { text: 'Proteinuria.', why: 'Correcto.' },
        { text: 'Hematuria.', why: 'Daría color rojo.' },
        { text: 'Infección urinaria siempre.', why: 'No.' },
        { text: 'Orina normal.', why: 'La normal tiene escasa espuma que se va.' },
      ],
      answer: 0,
      refs: [M2('13:07'), L('p451')],
    },
  ],

  memory: [
    {
      id: 'ren01-m01',
      title: 'Hematuria por origen',
      purpose: '«Siempre preguntan de eso».',
      evaluates: [{ t: 'list', items: ['Glomerular: dismórficos (acantocito) + cilindros hemáticos', 'Vía urinaria: isomórficos + coágulos'] }],
      interpret: 'El cilindro hemático ubica la lesión en el glomérulo.',
      mnemonic: { hook: 'Deformado y en molde = glomérulo. Normal y en coágulo = cañería.', explain: 'Dismórficos con cilindros: glomérulo. Isomórficos con coágulos: vía urinaria.' },
      recall: { q: '¿Cómo diferenciás una hematuria glomerular de una de la vía urinaria?', a: 'Glomerular: eritrocitos dismórficos (acantocitos) y cilindros hemáticos. Vía urinaria: eritrocitos isomórficos y coágulos.' },
    },
    {
      id: 'ren01-m02',
      title: 'Tres vasos de Guyon',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['1.º: uretra / próstata', 'Último: vejiga', 'Los tres: riñón'] }],
      interpret: 'Donde aparece la sangre en la micción dice de dónde viene.',
      mnemonic: { hook: 'Lo primero que sale es lo último del camino.', explain: 'Al principio sale la uretra; al final, lo que exprime la vejiga; de punta a punta, el riñón.' },
      recall: { q: '¿Qué indica la hematuria inicial, la terminal y la total?', a: 'Inicial: uretra o próstata. Terminal: vejiga. Total: riñón.' },
    },
    {
      id: 'ren01-m03',
      title: 'Obstrucción urinaria',
      purpose: '«Pregunta de parcial».',
      evaluates: [{ t: 'list', items: ['HPB ≈ 77 % en el hombre', 'Globo vesical → sonda', 'Sin globo → ecografía', '→ IRA posrenal'] }],
      interpret: 'Al destapar: diuresis posobstructiva.',
      mnemonic: { hook: '¿Globo? Sonda. ¿Sin globo? Eco.', explain: 'El primer paso lo decide la vejiga.' },
      recall: { q: '¿Cuál es el primer paso ante un paciente anúrico con sospecha de obstrucción?', a: 'Palpar y percutir arriba del pubis: si hay globo vesical, sonda vesical; si no, ecografía renal (hidronefrosis).' },
    },
    {
      id: 'ren01-m04',
      title: 'Poliuria',
      purpose: '«Lo pregunta la doctora González».',
      evaluates: [{ t: 'list', items: ['> 3 l/día', '> 300 mOsm: osmótica (DM)', '< 200 mOsm: acuosa (insípida o potomanía)'] }],
      interpret: 'Prueba de ADH: responde = central.',
      mnemonic: { hook: '300 arriba: azúcar. 200 abajo: agua.', explain: 'Osmótica (diabetes mellitus) o acuosa (insípida, potomanía).' },
      recall: { q: '¿Cómo diferenciás la diabetes insípida central de la nefrogénica?', a: 'Con la prueba de ADH: si responde, central (faltaba la hormona); si no responde, nefrogénica (falla el receptor, la acuaporina 2).' },
    },
  ],

  closing: {
    map: {
      center: 'Motivos de consulta renales en una mirada',
      nodes: [
        { label: 'Edema y dolor', tone: 'sky', items: ['Oncótica · permeabilidad · filtrado', 'Duele la cápsula', 'Cólico fluctuante'] },
        { label: 'Obstrucción ★', tone: 'peach', items: ['HPB', 'Globo → sonda', 'IRA posrenal'] },
        { label: 'Volumen', tone: 'gold', items: ['> 3 l poliuria', '< 500 ml oliguria', '300 / 200 mOsm'] },
        { label: 'Hematuria ★', tone: 'red', items: ['Dismórfica + cilindros', 'Isomórfica + coágulos', 'Tres vasos'] },
      ],
    },
    essentials: [
      'Edema renal: **↓ oncótica** (nefrótico), **↑ permeabilidad** (nefrítico), **↓ filtrado** (insuficiencia renal).',
      'El riñón no duele: duele la **cápsula**. Agudo: cálculo, pielonefritis, infarto; crónico: tumor.',
      '**Obstrucción urinaria** → **IRA posrenal**. HPB ≈ 77 % en el hombre. Globo vesical → sonda; sin globo → ecografía.',
      'Poliuria > 3 l; oliguria < 500 ml; anuria < 50–100 ml. Osmolaridad > 300 osmótica (DM), < 200 acuosa (insípida, potomanía).',
      'Hematuria micro > 3 eritrocitos/campo. **Glomerular**: dismórficos (acantocito) + **cilindros hemáticos**. **Vía urinaria**: isomórficos + **coágulos**.',
      '**Tres vasos**: inicial uretra/próstata · terminal vejiga · total riñón.',
      'Disuria = infección urinaria baja (90 %). Polaquiuria (frecuencia) ≠ poliuria (volumen).',
    ],
    links: [
      { chapterId: 'ren-02', text: '[[ren-02|Examen físico nefrourológico]]: puñopercusión, puntos ureterales y palpación renal.' },
      { chapterId: 'ren-05', text: '[[ren-05|Insuficiencia renal]]: prerrenal, renal y posrenal.' },
      { chapterId: 'ren-03', text: '[[ren-03|Síndrome nefrítico]]: la hematuria glomerular y el edema por permeabilidad.' },
    ],
    pitfalls: [
      'Confundir polaquiuria con poliuria.',
      'Decir que los coágulos son de origen glomerular (son de la vía urinaria).',
      'Invertir los vasos: el primero es uretra o próstata, el último es vejiga.',
      'Olvidar que una obstrucción incompleta o unilateral puede dar diuresis normal o poliuria.',
    ],
    miniExam: [
      {
        id: 'ren01-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Hombre de 70 años con chorro débil y goteo desde hace meses; hoy no orina y tiene una masa suprapúbica mate y dolorosa. Pensás en:',
        options: [
          { text: 'Retención urinaria por hiperplasia de próstata (globo vesical): sonda.', why: 'Correcto.' },
          { text: 'Insuficiencia renal prerrenal.', why: 'No explica el globo vesical.' },
          { text: 'Síndrome nefrótico.', why: 'No.' },
          { text: 'Cólico renoureteral.', why: 'No explica el globo.' },
        ],
        answer: 0,
        refs: [M1('17:57'), M1('28:46'), M1('29:27')],
      },
      {
        id: 'ren01-x02',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Orina roja con eritrocitos isomórficos y coágulos; la sangre aparece solo al final de la micción. El origen es:',
        options: [
          { text: 'Vesical.', why: 'Correcto: isomórfica, con coágulos y terminal.' },
          { text: 'Glomerular.', why: 'Sería dismórfica con cilindros.' },
          { text: 'Uretral.', why: 'Sería inicial.' },
          { text: 'Renal parenquimatoso.', why: 'Sería total.' },
        ],
        answer: 0,
        refs: [M2('17:49'), M2('19:09')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
