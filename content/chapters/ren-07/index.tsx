import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';
import { clase } from './clase';

/*
 * ren-07 — Litiasis renoureteral. Fuente: clases «Litiasis renoureteral» 1–2 (Ortega) + resumen al final de la clase
 * «Síndrome nefrítico» (30:33–33:23) + cólico renoureteral de MC Renal 1 + libro p. 448 (TAC sin contraste).
 * Preguntas de examen que marca el profe: tipos de cálculos y el más frecuente («de cajón»), factores predisponentes
 * (del PowerPoint de la Dra. González), magnesio y citrato («sí o sí»). Los porcentajes de cada tipo son aproximados
 * (estándar); el profe da el orden y que la cistina es < 2 %.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const T1 = (t: string) => r('lit-1', t);
const T2 = (t: string) => r('lit-2', t);
const N = (t: string) => r('nefritico', t);
const M1 = (t: string) => r('mc-ren-1', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'ren-07',
  systemId: 'renal',
  title: 'Litiasis renoureteral',
  subtitle: 'Cómo se forma un cálculo (y el magnesio y el citrato que lo impiden), los tipos de cálculos, el cólico renoureteral y cómo se estudia.',
  estimatedMinutes: 30,
  sources: [T1('00:02–17:13'), T2('00:00–24:02'), N('30:33–33:23'), M1('09:54–12:36'), L('p448')],

  map: {
    center: 'Litiasis renoureteral',
    why: 'Lo que preguntan: «¿Qué es la litiasis? ¿En qué sexo es más frecuente? ¿**Cuáles son los cálculos más frecuentes**?» Los tipos de cálculos son «**pregunta de examen y de cajón**». Y lo que el profe quiere que sepan «sí o sí»: el **magnesio** y el **citrato** como protectores.',
    prereqs: [
      { label: 'Dolor lumbar y cólico (ren-01)', detail: 'El riñón no duele: duele la cápsula.', chapterId: 'ren-01' },
      { label: 'Infección urinaria (ren-06)', detail: 'Proteus alcaliniza la orina: cálculos de estruvita.', chapterId: 'ren-06' },
    ],
    branches: [
      { id: 'formacion', label: 'Cómo se forma', tone: 'gold', items: ['Sobresaturación', 'pH', 'Magnesio y citrato'] },
      { id: 'tipos', label: 'Tipos ★', tone: 'red', items: ['Oxalato de calcio (n.º 1)', 'Ácido úrico: radiolúcido', 'Estruvita: infección'] },
      { id: 'clinica', label: 'Cólico', tone: 'peach', items: ['Fosa lumbar → genitales', 'Hematuria isomórfica', 'Puñopercusión'] },
      { id: 'diagnostico', label: 'Diagnóstico', tone: 'sky', items: ['Rx y ecografía', 'TAC sin contraste', '< 5 mm sale solo'] },
    ],
    outcomes: [
      'Explicar la formación del cálculo y el papel del **magnesio** y el **citrato**.',
      'Nombrar los **tipos** de cálculos, el más frecuente y cuál es **radiolúcido**.',
      'Reconocer el **cólico renoureteral** y sus acompañantes.',
      'Elegir el estudio por imagen y anticipar si el cálculo saldrá solo.',
    ],
  },

  theory: [
    {
      id: 'formacion',
      kicker: 'Fisiopatología',
      title: 'Qué es y cómo se forma',
      priority: 'muy-importante',
      summary: 'Cálculos en la vía urinaria. 5–12 % de la población, más en el hombre, pico entre los 30 y 60 años, muy recurrente.',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Frecuencia', title: '3.ª consulta urinaria', text: 'Afecta al 5–12 % de la población; **más en el hombre**; pico entre los **30 y 60 años** (cada vez más jóvenes); **alta recurrencia**.', tone: 'sky' },
            { tag: 'Factores (pregunta de parcial)', title: 'Predisponentes', text: 'Edad, sexo masculino, alteraciones metabólicas (calcio, fósforo), dieta, **poca agua**, gaseosas, clima, **infecciones** por desdobladores de urea, pH y volumen urinario.', tone: 'gold' },
            { tag: 'Consecuencia', title: 'Obstrucción', text: 'El cálculo obstruye la vía urinaria: dolor, infección e insuficiencia renal.', tone: 'red' },
          ],
        },
        { t: 'anim', id: 'formacion' },
        { t: 'callout', kind: 'prof', title: 'Sí o sí', text: '«Lo que yo quiero que sepan es esto sí o sí»: el **magnesio** y el **citrato** «me destruyen el proceso de nucleación». Con hipomagnesuria o hipocitraturia hay más tendencia a formar cálculos: por eso se miden en orina y se pueden indicar magnesio o citrato de potasio por vía oral.', refs: [T1('05:34'), T1('06:17'), T1('07:00')] },
      ],
      refs: [T1('00:02'), T1('00:43'), T1('01:23'), T1('02:04'), T1('02:44'), T1('03:29'), T1('04:09'), N('31:15')],
    },
    {
      id: 'tipos',
      kicker: 'Clave',
      title: 'Los tipos de cálculos',
      priority: 'imprescindible',
      summary: 'Cálcicos (oxalato, el más frecuente; fosfato), ácido úrico (radiolúcido), estruvita (infección), cistina (hereditaria).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'De cajón', text: '«Con respecto a la clasificación de los tipos, esto es **pregunta de examen y de cajón**. Le van a preguntar cuáles son los tipos de cálculos que existen y **cuál es el más frecuente**.»', refs: [T1('07:00'), T1('07:44')] },
        {
          t: 'scale',
          title: 'De más a menos frecuente (porcentajes aproximados)',
          items: [
            { k: '≈ 70–80 %', t: 'Cálcicos', d: '**Oxalato de calcio** (el más frecuente: chicos y duros) y fosfato de calcio (más grandes y blandos). **Radiopacos**.', tone: 'gold' },
            { k: '≈ 10–15 %', t: 'Estruvita', d: 'Fosfato amónico magnésico: **infección** por Proteus o Klebsiella, orina alcalina. Coraliformes («asta de ciervo»). Radiopacos.', tone: 'lilac' },
            { k: '≈ 5–10 %', t: 'Ácido úrico', d: 'Los únicos **radiolúcidos**: chicos, amarillos, duros. Orina ácida.', tone: 'peach' },
            { k: '< 2 %', t: 'Cistina', d: 'Enfermedad **autosómica recesiva**; niños y jóvenes. Poco radiopacos.', tone: 'sky' },
          ],
          caption: '«De 10 pacientes que he visto en guardia, 8 o 9 tenían cálculos de calcio.»',
        },
        {
          t: 'cuadro',
          title: 'Cada cálculo y su pista (tapalo)',
          cols: [
            { t: 'Rx simple', tone: 'sky' },
            { t: 'Pista y causa', tone: 'gold' },
          ],
          rows: [
            { k: 'Oxalato de calcio ★', v: ['**Radiopaco**', '**Hipercalciuria** (intestinal, renal o por hiperparatiroidismo); oxalato alto por causas **intestinales**, espinaca, chocolate, café'] },
            { k: 'Fosfato de calcio', v: ['Radiopaco', 'Hipercalciuria; más grandes y blandos (se rompen con litotricia)'] },
            { k: 'Ácido úrico', v: ['**Radiolúcido** (no se ve)', 'Orina **ácida**; gota, dieta rica en proteínas, mieloproliferativos, diuréticos. Se trata alcalinizando'] },
            { k: 'Estruvita', v: ['Radiopaco', '**Infección** por desdobladores de urea (**Proteus**), orina **alcalina**; coraliformes, casi siempre quirúrgicos'] },
            { k: 'Cistina', v: ['Poco radiopaco', 'Hereditaria (autosómica recesiva); jóvenes'] },
          ],
          refs: [T1('07:44'), T1('08:26'), T1('15:48'), T2('00:00'), T2('02:52'), T2('05:01'), T2('05:46'), T2('07:59'), N('32:00'), N('32:41'), N('33:23')],
        },
        { t: 'callout', kind: 'tip', title: 'Hipercalciuria: ¿de dónde viene el calcio?', text: '**Absortiva**: el intestino absorbe de más. **Renal**: el riñón pierde calcio. **Resortiva**: la paratiroides (adenoma) saca calcio del hueso y además activa la vitamina D. Ante un cálculo cálcico, medí calcio en sangre y en orina.', refs: [T1('09:11'), T1('10:38'), T1('12:03'), T2('20:37')] },
      ],
      refs: [T1('11:19'), T2('10:53')],
    },
    {
      id: 'clinica',
      kicker: 'Clínica',
      title: 'El cólico renoureteral',
      priority: 'imprescindible',
      summary: 'Dolor brusco, cólico y fluctuante desde la fosa lumbar hacia el flanco, la fosa ilíaca y los genitales; hematuria isomórfica.',
      blocks: [
        { t: 'anim', id: 'colico' },
        {
          t: 'urinario',
          title: 'Dónde está el cálculo',
          items: [
            { id: 'pelvis', t: 'En la pelvis renal', d: 'Puede ser asintomático; si obstruye la unión pieloureteral, **hidronefrosis**.', tone: 'gold', luz: ['pelvis-d'], calculo: 'pelvis-d', dilata: ['pelvis-d'] },
            { id: 'ureter', t: 'En el uréter (3 estrecheces)', d: 'Unión pieloureteral, cruce de los ilíacos, unión ureterovesical. **Cólico** con irradiación a la fosa ilíaca y los genitales.', tone: 'red', luz: ['ureter-d'], calculo: 'ureter-d', dilata: ['ureter-d', 'pelvis-d'], irradia: true, estrecheces: true },
            { id: 'vejiga', t: 'En la vejiga', d: 'Disuria, hematuria; el dolor lumbar se alivia.', tone: 'mint', luz: ['vejiga'], calculo: 'vejiga' },
            { id: 'coraliforme', t: 'Coraliforme (estruvita)', d: 'Ocupa la pelvis y los cálices como un molde («asta de ciervo»): infección por **Proteus**.', tone: 'lilac', luz: ['pelvis-d', 'rinon-d'], calculo: 'pelvis-d' },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Dolor', title: 'Cólico y fluctuante', text: '7/10, después 3/10, después 8/10… Brusco; el paciente está **inquieto**.', tone: 'red' },
            { tag: 'Acompañantes', title: 'Hematuria isomórfica', text: 'Con coágulos; náuseas, vómitos, disuria; oliguria si obstruye.', tone: 'peach' },
            { tag: 'Examen', title: 'Puñopercusión +', text: 'Y puntos ureterales dolorosos.', tone: 'sky' },
          ],
        },
        { t: 'callout', kind: 'warn', title: 'Diferenciales', text: 'Ante un dolor en la fosa lumbar, lo primero: **infección urinaria alta o cálculo**. También: infarto renal (muy doloroso), torsión del cordón espermático, causas digestivas, vasculares (aneurisma), traumáticas, herpes zóster.', refs: [T2('15:03'), T2('23:22'), T2('24:02')] },
      ],
      refs: [T2('10:53'), T2('11:36'), T2('12:19'), T2('13:00'), T2('13:40'), M1('09:54'), M1('10:35'), M1('11:15')],
    },
    {
      id: 'diagnostico',
      kicker: 'Diagnóstico',
      title: 'Cómo se estudia y qué pasa con el cálculo',
      priority: 'muy-importante',
      summary: 'Imágenes: Rx (radiopacos), ecografía (sombra acústica, dilatación), urograma, TAC sin contraste (estándar de oro). Laboratorio metabólico.',
      blocks: [
        {
          t: 'compare',
          title: 'Las imágenes',
          cols: [
            { title: 'Rx directa de abdomen', tone: 'gold', items: ['Ve los **radiopacos** (calcio, estruvita)', '**No** ve el ácido úrico'] },
            { title: 'Ecografía', tone: 'sky', items: ['**Sombra acústica**', 'Muestra la **dilatación** del uréter y la hidronefrosis'] },
            { title: 'Urograma / TAC', tone: 'lilac', items: ['Urograma: el contraste delinea el radiolúcido y la obstrucción', '**TAC sin contraste**: estándar de oro (cara, radiación)'] },
          ],
        },
        {
          t: 'flow',
          root: {
            label: 'Cálculo confirmado → **tamaño**',
            tone: 'ink',
            children: [
              { label: '**< 5 mm**: suele eliminarse solo', tone: 'mint' },
              { label: '**> 5 mm**: solo ≈ 20 % sale solo', tone: 'red', children: [{ label: 'Tratamiento médico → litotricia extracorpórea → cirugía', tone: 'red' }] },
            ],
          },
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Sangre', title: 'Función renal y metabolismo', text: 'Urea, creatinina, FG; calcio, fósforo, ácido úrico; fosfatasa alcalina; leucocitos.', tone: 'sky' },
            { tag: 'Orina', title: 'pH, sedimento, urocultivo', text: 'Hematuria, cristales, leucocitos; **magnesio y citrato**; calcio en orina de 24 h.', tone: 'gold' },
            { tag: 'Siempre', title: 'Buscar la causa', text: 'Calcio muy alto en sangre y orina → paratiroides, intestino o riñón.', tone: 'peach' },
          ],
        },
      ],
      refs: [T2('15:45'), T2('16:25'), T2('17:07'), T2('17:50'), T2('18:32'), T2('19:15'), T2('19:56'), T2('21:18'), L('p448')],
    },
  ],

  developments: [
    {
      id: 'ren07-d01',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'tipos',
      question: '¿Cuáles son los tipos de cálculos urinarios y cuál es el más frecuente?',
      quote: { text: '«…esto es pregunta de examen y de cajón. Le van a preguntar cuáles son los tipos de cálculos que existen y cuál es el más frecuente»', refs: [T1('07:00')] },
      answer: [
        { t: 'p', text: '**Cálcicos** (los más frecuentes): **oxalato de calcio** (el más frecuente de todos) y fosfato de calcio; radiopacos; por hipercalciuria (absortiva, renal o resortiva).' },
        { t: 'p', text: '**Estruvita** (fosfato amónico magnésico): por **infección** con desdobladores de urea (Proteus, Klebsiella), orina alcalina, coraliformes, radiopacos. **Ácido úrico**: los únicos **radiolúcidos**, orina ácida (gota, dieta proteica). **Cistina**: hereditaria autosómica recesiva, < 2 %.' },
      ],
      refs: [T1('07:44'), T2('00:00'), T2('05:01'), T2('07:59'), N('32:41')],
    },
    {
      id: 'ren07-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'formacion',
      question: '¿Qué es la litiasis urinaria? Epidemiología, factores predisponentes y mecanismo de formación.',
      quote: { text: '«…esto puede ser pregunta de parcial… las principales factores epidemiológicos, factores predisponentes»', refs: [T1('01:23')] },
      answer: [
        { t: 'p', text: 'Formación de **cálculos** en la vía urinaria. 3.ª causa de consulta urinaria, 5–12 % de la población, **más en el hombre**, pico **30–60 años**, alta recurrencia.' },
        { t: 'p', text: '**Factores:** edad, sexo masculino, alteraciones metabólicas, dieta, poca ingesta de agua, gaseosas, clima, infecciones por desdobladores de urea, pH y volumen urinario.' },
        { t: 'p', text: '**Mecanismo:** **sobresaturación** (exceso de soluto, déficit de agua) → nucleación → crecimiento de cristales → agregación. **Protectores:** **magnesio** y **citrato**; su déficit favorece los cálculos.' },
      ],
      refs: [T1('00:43'), T1('02:04'), T1('03:29'), T1('06:17')],
    },
    {
      id: 'ren07-d03',
      origen: 'preguntero',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'clinica',
      question: 'Describa el cólico renoureteral y cómo se confirma el diagnóstico.',
      quote: { text: '«Tiene una infección urinaria o tiene un cálculo. Es lo primero que tienen que pasar por la cabeza»', refs: [T2('15:03')] },
      answer: [
        { t: 'p', text: 'Dolor **brusco**, de tipo **cólico** y **fluctuante**, en la fosa lumbar, irradiado al flanco, la fosa ilíaca, el hipogastrio y los genitales; paciente inquieto; náuseas, vómitos; **hematuria isomórfica** (con coágulos), disuria; oliguria si obstruye. **Puñopercusión** y puntos ureterales positivos.' },
        { t: 'p', text: '**Estudios:** orina (pH, hematuria, leucocitos), urocultivo, función renal; **Rx** (radiopacos), **ecografía** (sombra acústica, dilatación), urograma, **TAC sin contraste** (estándar de oro). < 5 mm suele eliminarse solo.' },
      ],
      refs: [T2('11:36'), T2('12:19'), T2('16:25'), T2('17:07'), L('p448')],
    },
  ],

  mcq: [
    {
      id: 'ren07-q01',
      origen: 'practica',
      topic: 'Tipos',
      difficulty: 1,
      emphasis: true,
      stem: 'El tipo de cálculo urinario más frecuente es el de:',
      options: [
        { text: 'Oxalato de calcio.', why: 'Correcto.' },
        { text: 'Ácido úrico.', why: 'Es menos frecuente.' },
        { text: 'Estruvita.', why: 'Es el de la infección.' },
        { text: 'Cistina.', why: 'Es < 2 %.' },
      ],
      answer: 0,
      refs: [T1('07:44')],
    },
    {
      id: 'ren07-q02',
      origen: 'practica',
      topic: 'Tipos',
      difficulty: 2,
      emphasis: true,
      stem: 'El único cálculo **radiolúcido** (no se ve en la Rx simple) es el de:',
      options: [
        { text: 'Ácido úrico.', why: 'Correcto.' },
        { text: 'Oxalato de calcio.', why: 'Es radiopaco.' },
        { text: 'Estruvita.', why: 'Es radiopaco.' },
        { text: 'Fosfato de calcio.', why: 'Es radiopaco.' },
      ],
      answer: 0,
      refs: [T2('00:00'), N('32:41')],
    },
    {
      id: 'ren07-q03',
      origen: 'practica',
      topic: 'Tipos',
      difficulty: 2,
      stem: 'Un cálculo coraliforme («asta de ciervo») con orina alcalina y urocultivo con Proteus es de:',
      options: [
        { text: 'Estruvita (fosfato amónico magnésico).', why: 'Correcto.' },
        { text: 'Ácido úrico.', why: 'Da orina ácida.' },
        { text: 'Cistina.', why: 'No.' },
        { text: 'Oxalato de calcio puro.', why: 'No es el de la infección.' },
      ],
      answer: 0,
      refs: [T2('05:01'), T2('05:46')],
    },
    {
      id: 'ren07-q04',
      origen: 'practica',
      topic: 'Formación',
      difficulty: 2,
      emphasis: true,
      stem: 'Los factores **protectores** de la orina contra la formación de cálculos son:',
      options: [
        { text: 'Magnesio y citrato.', why: 'Correcto.' },
        { text: 'Calcio y oxalato.', why: 'Son formadores.' },
        { text: 'Urea y ácido úrico.', why: 'No.' },
        { text: 'Sodio y potasio.', why: 'No.' },
      ],
      answer: 0,
      refs: [T1('06:17')],
    },
    {
      id: 'ren07-q05',
      origen: 'practica',
      topic: 'Epidemiología',
      difficulty: 1,
      stem: 'La litiasis urinaria es más frecuente en:',
      options: [
        { text: 'Hombres de 30 a 60 años.', why: 'Correcto.' },
        { text: 'Mujeres en edad fértil.', why: 'Esa es la ITU.' },
        { text: 'Niños.', why: 'Salvo la cistinuria.' },
        { text: 'Ancianos exclusivamente.', why: 'No.' },
      ],
      answer: 0,
      refs: [T1('00:43')],
    },
    {
      id: 'ren07-q06',
      origen: 'practica',
      topic: 'Clínica',
      difficulty: 2,
      stem: 'La hematuria de un cólico renoureteral es típicamente:',
      options: [
        { text: 'Isomórfica, a veces con coágulos.', why: 'Correcto: viene de la vía urinaria.' },
        { text: 'Dismórfica con cilindros hemáticos.', why: 'Es glomerular.' },
        { text: 'Siempre microscópica.', why: 'Puede ser macro.' },
        { text: 'Inexistente.', why: 'Es frecuente.' },
      ],
      answer: 0,
      refs: [T2('12:19')],
    },
    {
      id: 'ren07-q07',
      origen: 'practica',
      topic: 'Diagnóstico',
      difficulty: 2,
      stem: 'En la ecografía, el cálculo se reconoce por:',
      options: [
        { text: 'La sombra acústica (y la dilatación por encima).', why: 'Correcto.' },
        { text: 'Ser radiolúcido.', why: 'Eso es en Rx.' },
        { text: 'El realce con contraste.', why: 'No se usa contraste.' },
        { text: 'No se ve nunca.', why: 'Sí se ve.' },
      ],
      answer: 0,
      refs: [T2('18:32')],
    },
    {
      id: 'ren07-q08',
      origen: 'practica',
      topic: 'Conducta',
      difficulty: 2,
      stem: 'Un cálculo ureteral de 3 mm:',
      options: [
        { text: 'Suele eliminarse espontáneamente.', why: 'Correcto (< 5 mm).' },
        { text: 'Requiere siempre cirugía.', why: 'No.' },
        { text: 'Nunca se elimina solo.', why: 'Al revés.' },
        { text: 'Requiere litotricia de entrada.', why: 'No en general.' },
      ],
      answer: 0,
      refs: [T2('16:25')],
    },
    {
      id: 'ren07-q09',
      origen: 'practica',
      topic: 'Tipos',
      difficulty: 3,
      stem: 'Ante un cálculo de calcio con calcemia muy alta, la causa que buscás primero es:',
      options: [
        { text: 'Hiperparatiroidismo (hipercalciuria resortiva).', why: 'Correcto.' },
        { text: 'Infección por Proteus.', why: 'Da estruvita.' },
        { text: 'Gota.', why: 'Da ácido úrico.' },
        { text: 'Cistinuria.', why: 'No.' },
      ],
      answer: 0,
      refs: [T1('12:03'), T2('20:37')],
    },
  ],

  memory: [
    {
      id: 'ren07-m01',
      title: 'Tipos de cálculos',
      purpose: '«De cajón».',
      evaluates: [{ t: 'list', items: ['Oxalato de calcio: n.º 1, radiopaco', 'Estruvita: infección, alcalina', 'Ácido úrico: radiolúcido, ácida', 'Cistina: hereditaria'] }],
      interpret: 'Calcio = radiopaco; úrico = no se ve.',
      mnemonic: { hook: 'Calcio se ve, Úrico se esconde, Estruvita infecta, Cistina se hereda.', explain: 'La pista de cada cálculo.' },
      recall: { q: '¿Cuál es el cálculo más frecuente y cuál es radiolúcido?', a: 'El más frecuente es el de oxalato de calcio (radiopaco); el radiolúcido es el de ácido úrico.' },
    },
    {
      id: 'ren07-m02',
      title: 'Protectores',
      purpose: '«Sí o sí».',
      evaluates: [{ t: 'list', items: ['Magnesio', 'Citrato'] }],
      interpret: 'Si faltan, más cálculos.',
      mnemonic: { hook: 'MC: Magnesio y Citrato, los «Matacálculos».', explain: 'Frenan la nucleación.' },
      recall: { q: '¿Qué componentes de la orina protegen contra los cálculos?', a: 'El magnesio y el citrato: frenan la nucleación; su déficit favorece la litiasis.' },
    },
  ],

  maneuvers: {
    ids: ['punopercusion-lumbar', 'puntos-renoureterales', 'rinon-montenegro'],
    note: 'Puñopercusión y puntos ureterales positivos en el cólico renoureteral.',
  },

  closing: {
    map: {
      center: 'Litiasis en una mirada',
      nodes: [
        { label: 'Cómo se forma', tone: 'gold', items: ['Sobresaturación', 'pH', 'Mg y citrato'] },
        { label: 'Tipos ★', tone: 'red', items: ['Oxalato de calcio', 'Úrico: radiolúcido', 'Estruvita: Proteus'] },
        { label: 'Cólico', tone: 'peach', items: ['Lumbar → genitales', 'Fluctuante', 'Hematuria isomórfica'] },
        { label: 'Diagnóstico', tone: 'sky', items: ['Rx · eco · TAC', '< 5 mm sale solo'] },
      ],
    },
    essentials: [
      '5–12 % de la población, **más en el hombre**, 30–60 años, recurrente.',
      'Sobresaturación → nucleación → cristales → cálculo. **Magnesio y citrato** protegen.',
      '**Oxalato de calcio** (el más frecuente, radiopaco); estruvita (infección por **Proteus**, alcalina, coraliforme); **ácido úrico** (radiolúcido, ácida); cistina (hereditaria).',
      'Cólico renoureteral: brusco, fluctuante, fosa lumbar → flanco → fosa ilíaca → genitales; **hematuria isomórfica**; puñopercusión +.',
      'Rx (radiopacos), **ecografía** (sombra acústica, dilatación), urograma, **TAC sin contraste** (estándar de oro).',
      '< 5 mm suele salir solo; > 5 mm solo 20 %.',
    ],
    links: [
      { chapterId: 'ren-01', text: '[[ren-01|Motivos de consulta]]: el cólico y la obstrucción.' },
      { chapterId: 'ren-06', text: '[[ren-06|Infección urinaria]]: Proteus y la estruvita.' },
      { chapterId: 'ren-05', text: '[[ren-05|Insuficiencia renal]]: la IRA posrenal.' },
    ],
    pitfalls: [
      'Decir que el ácido úrico se ve en la Rx simple.',
      'Olvidar que la estruvita es un cálculo de infección.',
      'Confundir la hematuria del cálculo (isomórfica) con la glomerular.',
      'Olvidar el magnesio y el citrato.',
    ],
    miniExam: [
      {
        id: 'ren07-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Hombre de 40 años con dolor lumbar izquierdo brusco que va a la ingle, inquieto, con hematuria; la Rx de abdomen no muestra nada y la ecografía muestra una imagen con sombra acústica e hidronefrosis. El cálculo probable es de:',
        options: [
          { text: 'Ácido úrico (radiolúcido).', why: 'Correcto: no se ve en la Rx pero sí en la ecografía.' },
          { text: 'Oxalato de calcio.', why: 'Se vería en la Rx.' },
          { text: 'Estruvita.', why: 'Se vería en la Rx.' },
          { text: 'No es un cálculo.', why: 'La ecografía lo muestra.' },
        ],
        answer: 0,
        refs: [T2('00:00'), T2('17:07'), T2('18:32')],
      },
    ],
  },

  escenas,
  clase,
  diagrams: {},
};

export default chapter;
