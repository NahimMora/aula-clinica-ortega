import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';
import { clase } from './clase';

/*
 * ren-06 — Infección urinaria. Fuente: clases «Infección urinaria» 1–2 (Ortega) + resumen al final de la clase
 * «Síndrome nefrítico» (22:01–30:33). Preguntas de parcial que marca el profe: microorganismos causales, vías de
 * infección, cómo llega a la guardia la ITU baja y la alta, factores de riesgo de ITU complicada y recaída vs reinfección.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const U1 = (t: string) => r('itu-1', t);
const U2 = (t: string) => r('itu-2', t);
const N = (t: string) => r('nefritico', t);

const chapter: Chapter = {
  id: 'ren-06',
  systemId: 'renal',
  title: 'Infección urinaria',
  subtitle: 'Bacteriuria y leucocituria, la vía ascendente, los gérmenes (E. coli, Proteus, Pseudomonas), cistitis vs pielonefritis, ITU complicada, recaída vs reinfección y diagnóstico.',
  estimatedMinutes: 35,
  sources: [U1('00:03–33:39'), U2('00:00–16:32'), N('22:42–30:33')],

  map: {
    center: 'Infección urinaria',
    why: 'Lo que preguntan en el parcial: la **vía ascendente** y **E. coli** («si esas dos cosas no le saben responder a los profesores, están bochados»), **cómo llega a la guardia** la cistitis y la pielonefritis, los **factores de riesgo** («como el Padre Nuestro») y **recaída vs reinfección**.',
    prereqs: [
      { label: 'Motivos de consulta (ren-01)', detail: 'Disuria, polaquiuria, tenesmo; hematuria isomórfica.', chapterId: 'ren-01' },
      { label: 'Examen físico renal (ren-02)', detail: 'Puñopercusión y puntos renoureterales.', chapterId: 'ren-02' },
    ],
    branches: [
      { id: 'definicion', label: 'Qué es', tone: 'sky', items: ['≥ 10⁵ UFC/ml', '> 5 leucocitos/campo', 'Vía ascendente 80 %'] },
      { id: 'germenes', label: 'Gérmenes ★', tone: 'red', items: ['E. coli 90–95 %', 'Proteus: orina alcalina', 'Pseudomonas: hospital'] },
      { id: 'clinica', label: 'Baja vs alta ★', tone: 'lilac', items: ['Cistitis: disuria', 'Pielonefritis: fiebre + lumbar', 'Bacteriuria asintomática'] },
      { id: 'complicada', label: 'Complicada ★', tone: 'peach', items: ['Factores de riesgo', 'Recaída vs reinfección'] },
      { id: 'diagnostico', label: 'Diagnóstico', tone: 'mint', items: ['Orina completa', 'Urocultivo', 'Ecografía'] },
    ],
    outcomes: [
      'Definir **bacteriuria significativa** y **leucocituria**.',
      'Nombrar la vía y los **gérmenes** más frecuentes (ambulatorio y hospital).',
      'Diferenciar en la guardia una **cistitis** de una **pielonefritis**.',
      'Reconocer la **ITU complicada** y distinguir **recaída** de **reinfección**.',
    ],
  },

  theory: [
    {
      id: 'definicion',
      kicker: 'Definición',
      title: 'Qué es una infección urinaria y cómo llega la bacteria',
      priority: 'imprescindible',
      summary: 'Microorganismos que colonizan y se multiplican en la vía urinaria. Urocultivo ≥ 10⁵ UFC/ml y > 5 leucocitos por campo.',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Urocultivo', title: '≥ 10⁵ UFC/ml', text: '**Bacteriuria significativa**. En la mujer, 10²–10⁴ puede valer (uretra corta, contaminación); en el hombre, desde 10³.', tone: 'red' },
            { tag: 'Orina completa', title: '> 5 leucocitos/campo', text: '**Leucocituria** (en niños, > 10–15). No es lo mismo que bacteriuria.', tone: 'sky' },
            { tag: 'Epidemiología', title: 'Mujer', text: '8–9 de cada 10. En neonatos y lactantes predomina el varón.', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Las dos que no pueden fallar', text: 'La **vía ascendente** es la más frecuente y **Escherichia coli** el microorganismo más frecuente: «si esas dos cosas no le saben responder a los profesores, **están bochados**».', refs: [N('24:42')] },
        { t: 'anim', id: 'ascendente' },
        {
          t: 'scale',
          title: 'Vías de infección (pregunta de examen)',
          items: [
            { k: '≈ 80 %', t: 'Ascendente', d: 'Desde el meato: uretra → vejiga → uréteres → riñón.', tone: 'red' },
            { k: '10–20 %', t: 'Hematógena', tone: 'peach' },
            { k: '1–5 %', t: 'Por contigüidad', tone: 'gold' },
            { k: '< 0,01 %', t: 'Linfática', d: 'Muy rara.', tone: 'mint' },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Las dos puertas', title: 'Reflujo vesicoureteral y obstrucción', text: 'Las grandes causas de ITU (el reflujo, sobre todo en niños).', tone: 'gold' },
            { tag: 'Mujer', title: 'Uretra corta, relaciones, espermicidas, diafragma', text: 'Y el **déficit de estrógenos** de la menopausia.', tone: 'lilac' },
            { tag: 'Hábitos', title: '«Me la aguanto»', text: 'Vaciado incompleto: la presión vesical fuerza el esfínter y abre la puerta.', tone: 'sky' },
          ],
        },
      ],
      refs: [U1('01:29'), U1('02:12'), U1('02:53'), U1('04:19'), U1('07:46'), U1('08:28'), U1('10:31'), U1('11:52'), U1('12:34'), U1('13:16')],
    },
    {
      id: 'germenes',
      kicker: 'Clave',
      title: 'Los gérmenes',
      priority: 'imprescindible',
      summary: 'E. coli (90–95 %); Proteus y Klebsiella (orina alcalina); Pseudomonas (intrahospitalaria).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Preguntan de examen', text: '«Los microorganismos causales **casi siempre preguntan de parcial**. Así que eso tienen que sabérselo.»', refs: [U1('14:39'), U1('15:19')] },
        { t: 'anim', id: 'germenes' },
        {
          t: 'compare',
          title: 'Orina ácida vs orina alcalina',
          cols: [
            { title: 'E. coli', tone: 'red', items: ['El más frecuente (90–95 %)', 'Orina **ácida** (pH normal 4–8, media 5,5–6)'] },
            { title: 'Proteus / Klebsiella', tone: 'lilac', items: ['Desdobladores de **urea**', 'Orina **alcalina** (pH 7)', 'Proteus: hombre; cálculos de estruvita'] },
          ],
        },
      ],
      refs: [U1('15:59'), U1('16:40'), U1('17:20'), U1('18:00'), U1('18:42'), U1('19:25'), N('24:42'), N('25:22')],
    },
    {
      id: 'clinica',
      kicker: 'Clave',
      title: 'Cómo llega a la guardia: baja vs alta',
      priority: 'imprescindible',
      summary: 'Baja (70 %): disuria, sin fiebre. Alta (30 %): mal estado general, fiebre, dolor lumbar + todo lo de la baja.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«¿Cómo se presenta en la guardia? Y esto es **pregunta de parcial**.» En la cistitis, «el síntoma cardinal es la **disuria**. No se olviden de eso».', refs: [U1('21:27'), U1('22:48')] },
        {
          t: 'urinario',
          title: 'Dónde está la infección',
          items: [
            { id: 'uretritis', t: 'Uretritis', d: 'Muchas veces es una **infección de transmisión sexual**: se trata distinto.', tone: 'peach', luz: ['uretra'] },
            { id: 'cistitis', t: 'Cistitis (ITU baja)', d: 'La más frecuente. **Disuria**, polaquiuria, tenesmo, urgencia, dolor suprapúbico, hematuria isomórfica. **Sin fiebre**.', tone: 'lilac', luz: ['vejiga', 'uretra'] },
            { id: 'prostatitis', t: 'Prostatitis', d: 'ITU baja propia del hombre.', tone: 'gold', luz: ['prostata'] },
            { id: 'pielo', t: 'Pielonefritis aguda (ITU alta)', d: '**Mal estado general**, fiebre, escalofríos, náuseas, vómitos, **dolor lumbar**, más los síntomas de la baja. Puñopercusión positiva.', tone: 'red', luz: ['rinon-d', 'pelvis-d'] },
          ],
        },
        {
          t: 'cuadro',
          title: 'ITU baja vs ITU alta (tapalo)',
          cols: [
            { t: 'Baja (cistitis)', tone: 'lilac' },
            { t: 'Alta (pielonefritis)', tone: 'red' },
          ],
          rows: [
            { k: 'Frecuencia', v: ['≈ 70 %', '≈ 30 %'] },
            { k: 'Estado general', v: ['**Bueno**', '**Malo** (2 o más días de evolución)'] },
            { k: 'Fiebre', v: ['**No**', '**Sí**, con escalofríos'] },
            { k: 'Dolor', v: ['Suprapúbico (hipogastrio)', '**Lumbar** (fosa lumbar)'] },
            { k: 'Síntomas urinarios', v: ['Disuria, polaquiuria, tenesmo, urgencia', 'Los mismos de la baja'] },
            { k: 'Examen', v: ['Dolor a la presión suprapúbica', '**Puñopercusión** y puntos costovertebral y costomuscular'] },
            { k: 'Riesgo', v: ['Bajo', 'Bacteriemia, sepsis: es una ITU **complicada**'] },
          ],
          refs: [U1('23:28'), U1('24:09'), U1('24:50'), U1('25:31'), U2('08:17'), U2('08:59')],
        },
        { t: 'callout', kind: 'note', title: 'Bacteriuria asintomática', text: 'Urocultivo positivo (≥ 10⁵) **sin síntomas y sin leucocitos**: los leucocitos son los que producen los síntomas. Se repite la muestra (puede ser contaminación) y en pacientes de alto riesgo se trata.', refs: [U1('26:52'), U1('30:15'), U1('31:38'), U1('33:39')] },
      ],
      refs: [U1('20:06'), U1('20:46'), U1('22:08'), U1('26:12'), N('26:04'), N('26:47')],
    },
    {
      id: 'complicada',
      kicker: 'Clave',
      title: 'ITU complicada, recaída y reinfección',
      priority: 'imprescindible',
      summary: 'Complicada: con factores de riesgo o clínica de pielonefritis. Recaída: mismo germen. Reinfección: otro germen.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Como el Padre Nuestro', text: 'Los factores de riesgo de una ITU complicada «como si fuese el **Padre Nuestro** lo tienen que saber, es **pregunta de parcial**».', refs: [U2('04:11')] },
        {
          t: 'cards',
          cols: 4,
          items: [
            { tag: 'Vía urinaria', title: 'Obstrucción, reflujo, anomalías', text: 'Uropatía obstructiva (litiasis), alteraciones anatómicas o funcionales.', tone: 'gold' },
            { tag: 'Instrumentos', title: 'Sonda, catéter, cirugía', text: 'Instrumentación reciente; infección intrahospitalaria.', tone: 'peach' },
            { tag: 'Huésped', title: 'Embarazo, diabetes, inmunosupresión', text: 'VIH, cáncer, trasplante, enfermedades crónicas.', tone: 'red' },
            { tag: 'Paciente', title: 'Varón, lactante, > 65 años', text: 'ITU previas o a repetición, síntomas > 7 días, antibióticos recientes, espermicidas.', tone: 'lilac' },
          ],
        },
        {
          t: 'compare',
          title: 'Recaída vs reinfección (pregunta de examen)',
          cols: [
            { title: 'Recaída', tone: 'peach', items: ['Vuelve la infección poco después de terminar el tratamiento (≈ 2–3 semanas)', 'Con el **mismo germen**'] },
            { title: 'Reinfección', tone: 'sky', items: ['Se curó y vuelve a infectarse', 'Con **otro germen**'] },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Le van a preguntar', text: '«Eso es pregunta de examen. **Recaída y reinfección** le van a preguntar en el parcial.»', refs: [U2('06:56')] },
      ],
      refs: [U2('00:00'), U2('01:24'), U2('03:31'), U2('04:53'), U2('05:36'), U2('06:16'), N('29:03')],
    },
    {
      id: 'diagnostico',
      kicker: 'Diagnóstico',
      title: 'Cómo se diagnostica y se previene',
      priority: 'muy-importante',
      summary: 'Clínica + orina completa + urocultivo (confirma y da el germen). Se trata empíricamente hasta el resultado.',
      blocks: [
        {
          t: 'flow',
          root: {
            label: 'Sospecha clínica (baja o alta) → tomar la muestra con buena higiene',
            tone: 'ink',
            children: [
              { label: '**Orina completa** (≈ 3 h): leucocitos > 5/campo, nitritos, pH', tone: 'sky', children: [{ label: 'Positiva → **tratamiento empírico**', tone: 'sky' }] },
              { label: '**Urocultivo** (24–48 h): ≥ 10⁵ UFC/ml', tone: 'red', star: true, children: [{ label: 'Confirma y dice **qué germen** → ajustar el antibiótico', tone: 'red' }] },
            ],
          },
          caption: 'El urocultivo tiene valor diagnóstico y terapéutico.',
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Ojo', title: 'Leucocituria que falta', text: 'En la **obstrucción**, la **neutropenia** o la orina **alcalina** (los leucocitos se desintegran).', tone: 'gold' },
            { tag: 'Ojo', title: 'Leucocituria «estéril»', text: 'Nefritis intersticial, **tuberculosis**, **litiasis**.', tone: 'peach' },
            { tag: 'Imágenes', title: 'Ecografía renal', text: 'La n.º 1 (sobre todo en la ITU alta). Urograma excretor, cistouretrografía miccional (reflujo en niños), uretrocistoscopia en adultos.', tone: 'mint' },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Prevención', text: 'Orinar después de cada relación sexual, tomar mucho líquido, no aguantarse las ganas, evitar diafragma y espermicidas, higiene perineal correcta (de adelante hacia atrás).', refs: [U2('15:49'), U2('16:32')] },
      ],
      refs: [U2('06:56'), U2('07:36'), U2('09:42'), U2('10:23'), U2('11:03'), U2('11:44'), U2('12:25'), U2('13:05'), U2('13:46')],
    },
  ],

  developments: [
    {
      id: 'ren06-d01',
      origen: 'preguntero',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'definicion',
      question: 'Defina infección urinaria. ¿Cuál es la vía de infección y el germen más frecuente?',
      quote: { text: '«Si esas dos cosas no le saben responder a los profesores, están bochados»', refs: [N('24:42')] },
      answer: [
        { t: 'p', text: 'Colonización y multiplicación de microorganismos en la vía urinaria (normalmente estéril salvo el tramo final de la uretra). Diagnóstico: **urocultivo ≥ 10⁵ UFC/ml** (bacteriuria significativa) con **leucocituria > 5 por campo**.' },
        { t: 'p', text: '**Vía:** ascendente (≈ 80 %), hematógena (10–20 %), contigüidad (1–5 %), linfática (rarísima). **Germen:** **Escherichia coli** (90–95 %); después Proteus y Klebsiella (orina alcalina); intrahospitalaria: **Pseudomonas**.' },
      ],
      refs: [U1('02:12'), U1('10:31'), U1('11:11'), U1('15:19'), U1('18:42')],
    },
    {
      id: 'ren06-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'clinica',
      question: '¿Cómo se presenta en la guardia una ITU baja y una pielonefritis aguda?',
      quote: { text: '«¿Cómo se presenta en la guardia? Y esto es pregunta de parcial»', refs: [U1('22:48')] },
      answer: [
        { t: 'p', text: '**ITU baja (cistitis):** síntoma cardinal la **disuria**; polaquiuria, tenesmo, urgencia, dolor suprapúbico, hematuria isomórfica; **sin fiebre** y con buen estado general.' },
        { t: 'p', text: '**ITU alta (pielonefritis aguda):** **mal estado general**, **fiebre** con escalofríos, náuseas, vómitos, **dolor lumbar**, más los síntomas de la baja. Puñopercusión y puntos costovertebral y costomuscular positivos. Es una ITU complicada (riesgo de bacteriemia y sepsis).' },
      ],
      refs: [U1('23:28'), U1('24:09'), U1('24:50'), U2('01:24'), U2('08:17')],
    },
    {
      id: 'ren06-d03',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'complicada',
      question: '¿Qué es una ITU complicada? Nombre los factores de riesgo.',
      quote: { text: '«…como si fuese el Padre Nuestro lo tienen que saber, es pregunta de parcial»', refs: [U2('04:11')] },
      answer: [
        { t: 'p', text: 'ITU sintomática con **factores de riesgo** o con clínica de pielonefritis (que en sí es complicada).' },
        { t: 'p', text: '**Factores:** sondas y catéteres o instrumentación reciente, ITU previas o a repetición, varón (sobre todo lactante), mayores de 65 años, trasplante, **uropatía obstructiva** y reflujo, anomalías anatómicas o funcionales, síntomas > 7 días, antibióticos recientes, espermicidas o diafragma, infección intrahospitalaria, **embarazo**, **diabetes**, inmunosupresión, litiasis.' },
      ],
      refs: [U2('01:24'), U2('03:31'), U2('04:53'), U2('05:36')],
    },
    {
      id: 'ren06-d04',
      origen: 'clase',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'complicada',
      question: 'Diferencie recaída de reinfección.',
      quote: { text: '«Recaída y reinfección le van a preguntar en el parcial»', refs: [U2('06:56')] },
      answer: [{ t: 'p', text: '**Recaída:** la infección vuelve poco después de terminar el tratamiento (≈ 2–3 semanas) con el **mismo germen**. **Reinfección:** se curó y vuelve a infectarse con **otro germen**.' }],
      refs: [U2('06:16'), N('29:03')],
    },
    {
      id: 'ren06-d05',
      origen: 'practica',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'diagnostico',
      question: '¿Cómo se diagnostica una infección urinaria?',
      quote: { text: '«El urocultivo es el que me va a confirmar el diagnóstico… qué germen tengo»', refs: [U2('10:23')] },
      answer: [{ t: 'p', text: 'Clínica y examen físico (puñopercusión, puntos). **Orina completa** (leucocituria > 5/campo; resultado en horas) y **urocultivo** (≥ 10⁵ UFC/ml; confirma y identifica el germen en 24–48 h): se trata empíricamente y se ajusta con el cultivo. La leucocituria puede faltar en obstrucción, neutropenia u orina alcalina. Imágenes: **ecografía renal** (la principal), urograma excretor, cistouretrografía miccional (niños), uretrocistoscopia (adultos).' }],
      refs: [U2('09:42'), U2('11:03'), U2('11:44'), U2('13:05')],
    },
  ],

  mcq: [
    {
      id: 'ren06-q01',
      origen: 'practica',
      topic: 'Gérmenes',
      difficulty: 1,
      emphasis: true,
      stem: 'El germen más frecuente de infección urinaria ambulatoria es:',
      options: [
        { text: 'Escherichia coli.', why: 'Correcto (90–95 %).' },
        { text: 'Pseudomonas.', why: 'Es la intrahospitalaria.' },
        { text: 'Proteus mirabilis.', why: 'Es el segundo.' },
        { text: 'Staphylococcus aureus.', why: 'No.' },
      ],
      answer: 0,
      refs: [U1('15:19')],
    },
    {
      id: 'ren06-q02',
      origen: 'practica',
      topic: 'Vías',
      difficulty: 1,
      emphasis: true,
      stem: 'La vía de infección urinaria más frecuente es:',
      options: [
        { text: 'Ascendente.', why: 'Correcto (≈ 80 %).' },
        { text: 'Hematógena.', why: '10–20 %.' },
        { text: 'Linfática.', why: 'Rarísima.' },
        { text: 'Por contigüidad.', why: '1–5 %.' },
      ],
      answer: 0,
      refs: [U1('10:31'), U1('11:11')],
    },
    {
      id: 'ren06-q03',
      origen: 'practica',
      topic: 'Gérmenes',
      difficulty: 2,
      emphasis: true,
      stem: 'Infección urinaria con orina de pH 7,5. Sospechás:',
      options: [
        { text: 'Proteus (desdoblador de urea).', why: 'Correcto: alcaliniza la orina.' },
        { text: 'E. coli.', why: 'Da orina ácida.' },
        { text: 'Bacteriuria asintomática.', why: 'No depende del pH.' },
        { text: 'Tuberculosis.', why: 'No.' },
      ],
      answer: 0,
      refs: [U1('15:59'), U1('16:40')],
    },
    {
      id: 'ren06-q04',
      origen: 'practica',
      topic: 'Gérmenes',
      difficulty: 2,
      stem: 'Paciente internado con sonda vesical desde hace 6 días y fiebre: el germen más probable es:',
      options: [
        { text: 'Pseudomonas.', why: 'Correcto: la más frecuente intrahospitalaria.' },
        { text: 'E. coli comunitaria.', why: 'Es la ambulatoria.' },
        { text: 'Bacteroides.', why: 'Típico de la menopausia.' },
        { text: 'Streptococcus pyogenes.', why: 'No.' },
      ],
      answer: 0,
      refs: [U1('18:00'), U1('18:42')],
    },
    {
      id: 'ren06-q05',
      origen: 'practica',
      topic: 'Clínica',
      difficulty: 1,
      emphasis: true,
      stem: 'El síntoma cardinal de la cistitis es:',
      options: [
        { text: 'La disuria.', why: 'Correcto.' },
        { text: 'La fiebre.', why: 'Es de la alta.' },
        { text: 'El dolor lumbar.', why: 'Es de la alta.' },
        { text: 'La oliguria.', why: 'No.' },
      ],
      answer: 0,
      refs: [U1('22:48')],
    },
    {
      id: 'ren06-q06',
      origen: 'practica',
      topic: 'Clínica',
      difficulty: 2,
      emphasis: true,
      stem: 'Mujer con fiebre de 39 °C, escalofríos, dolor lumbar derecho y disuria. Pensás en:',
      options: [
        { text: 'Pielonefritis aguda.', why: 'Correcto: ITU alta.' },
        { text: 'Cistitis.', why: 'No daría fiebre ni dolor lumbar.' },
        { text: 'Uretritis.', why: 'No.' },
        { text: 'Bacteriuria asintomática.', why: 'Tiene síntomas.' },
      ],
      answer: 0,
      refs: [U1('24:50')],
    },
    {
      id: 'ren06-q07',
      origen: 'practica',
      topic: 'Definición',
      difficulty: 1,
      stem: 'Se habla de bacteriuria significativa con un urocultivo de:',
      options: [
        { text: '≥ 10⁵ UFC/ml.', why: 'Correcto.' },
        { text: '≥ 10² UFC/ml siempre.', why: 'Solo puede valer en ciertos casos.' },
        { text: '> 5 leucocitos por campo.', why: 'Eso es leucocituria.' },
        { text: 'Cualquier bacteria.', why: 'No.' },
      ],
      answer: 0,
      refs: [U1('02:12')],
    },
    {
      id: 'ren06-q08',
      origen: 'practica',
      topic: 'Complicada',
      difficulty: 2,
      stem: 'Una infección urinaria que vuelve a las 2 semanas de terminar el tratamiento, con el **mismo** germen, es una:',
      options: [
        { text: 'Recaída.', why: 'Correcto.' },
        { text: 'Reinfección.', why: 'Sería con otro germen.' },
        { text: 'Bacteriuria asintomática.', why: 'No.' },
        { text: 'Contaminación.', why: 'No.' },
      ],
      answer: 0,
      refs: [U2('06:16')],
    },
    {
      id: 'ren06-q09',
      origen: 'practica',
      topic: 'Complicada',
      difficulty: 2,
      stem: '¿Cuál de estos **no** es un factor de ITU complicada?',
      options: [
        { text: 'Mujer joven sana con primera cistitis.', why: 'Correcto: es la ITU no complicada típica.' },
        { text: 'Embarazo.', why: 'Sí lo es.' },
        { text: 'Sonda vesical.', why: 'Sí lo es.' },
        { text: 'Diabetes.', why: 'Sí lo es.' },
      ],
      answer: 0,
      refs: [U2('00:00'), U2('05:36')],
    },
    {
      id: 'ren06-q10',
      origen: 'practica',
      topic: 'Diagnóstico',
      difficulty: 2,
      stem: 'El estudio que confirma la infección urinaria e identifica el germen es:',
      options: [
        { text: 'El urocultivo.', why: 'Correcto.' },
        { text: 'La orina completa.', why: 'Orienta (leucocituria).' },
        { text: 'La ecografía.', why: 'Busca complicaciones.' },
        { text: 'La puñopercusión.', why: 'Es examen físico.' },
      ],
      answer: 0,
      refs: [U2('10:23')],
    },
    {
      id: 'ren06-q11',
      origen: 'practica',
      topic: 'Diagnóstico',
      difficulty: 3,
      stem: 'La leucocituria puede **faltar** en una infección urinaria cuando hay:',
      options: [
        { text: 'Obstrucción, neutropenia u orina alcalina.', why: 'Correcto.' },
        { text: 'Fiebre alta.', why: 'No.' },
        { text: 'Cistitis típica.', why: 'Suele haber leucocituria.' },
        { text: 'E. coli.', why: 'No.' },
      ],
      answer: 0,
      refs: [U2('11:44')],
    },
  ],

  memory: [
    {
      id: 'ren06-m01',
      title: 'Las dos que no pueden fallar',
      purpose: '«Están bochados».',
      evaluates: [{ t: 'list', items: ['Vía ascendente (80 %)', 'E. coli (90–95 %)'] }],
      interpret: 'Proteus: orina alcalina. Pseudomonas: hospital.',
      mnemonic: { hook: 'Sube y es Coli.', explain: 'Vía ascendente, E. coli.' },
      recall: { q: '¿Cuál es la vía y el germen más frecuentes de la ITU?', a: 'Vía ascendente (≈ 80 %) y Escherichia coli (90–95 %).' },
    },
    {
      id: 'ren06-m02',
      title: 'Baja vs alta',
      purpose: '«Cómo llega a la guardia».',
      evaluates: [{ t: 'list', items: ['Baja: disuria, sin fiebre', 'Alta: fiebre, lumbar, mal estado + lo de la baja'] }],
      interpret: 'La alta es complicada.',
      mnemonic: { hook: 'Arde abajo, quema arriba.', explain: 'Cistitis: ardor al orinar. Pielonefritis: fiebre y dolor lumbar.' },
      recall: { q: '¿Qué diferencia clínicamente la cistitis de la pielonefritis?', a: 'La cistitis tiene disuria sin fiebre y buen estado general; la pielonefritis, fiebre, escalofríos, dolor lumbar y mal estado general, más los síntomas de la baja.' },
    },
    {
      id: 'ren06-m03',
      title: 'Recaída vs reinfección',
      purpose: 'Pregunta de examen.',
      evaluates: [{ t: 'list', items: ['Recaída: mismo germen', 'Reinfección: otro germen'] }],
      interpret: 'La recaída aparece poco después del tratamiento.',
      mnemonic: { hook: 'REcaída = REpite el mismo; REinfección = REcién llegado.', explain: 'Mismo germen vs germen nuevo.' },
      recall: { q: '¿Qué diferencia una recaída de una reinfección urinaria?', a: 'La recaída es con el mismo germen, poco después de terminar el tratamiento; la reinfección, con otro germen.' },
    },
  ],

  maneuvers: {
    ids: ['punopercusion-lumbar', 'puntos-renoureterales'],
    note: 'La puñopercusión y los puntos costovertebral y costomuscular orientan a la ITU alta.',
  },

  closing: {
    map: {
      center: 'Infección urinaria en una mirada',
      nodes: [
        { label: 'Qué es', tone: 'sky', items: ['≥ 10⁵ UFC/ml', '> 5 leucocitos', 'Ascendente 80 %'] },
        { label: 'Gérmenes ★', tone: 'red', items: ['E. coli', 'Proteus (alcalina)', 'Pseudomonas (hospital)'] },
        { label: 'Baja vs alta ★', tone: 'lilac', items: ['Disuria sin fiebre', 'Fiebre + lumbar', 'Puñopercusión'] },
        { label: 'Complicada ★', tone: 'peach', items: ['Factores de riesgo', 'Recaída ≠ reinfección'] },
      ],
    },
    essentials: [
      'Bacteriuria significativa **≥ 10⁵ UFC/ml**; leucocituria **> 5/campo**. 8–9 de cada 10 son mujeres.',
      'Vía **ascendente** (≈ 80 %). Puertas: **reflujo vesicoureteral** y **obstrucción**.',
      '**E. coli** (90–95 %); **Proteus/Klebsiella** (orina alcalina); **Pseudomonas** (intrahospitalaria, sondas).',
      'Cistitis: **disuria**, polaquiuria, tenesmo, dolor suprapúbico, sin fiebre. Pielonefritis: **fiebre**, escalofríos, **dolor lumbar**, mal estado general + lo de la baja.',
      'Complicada: con factores de riesgo (sonda, obstrucción, embarazo, diabetes, inmunosupresión, varón, > 65…) o pielonefritis.',
      '**Recaída** = mismo germen; **reinfección** = otro germen.',
      'Orina completa + **urocultivo** (confirma y da el germen); tratamiento empírico; ecografía.',
    ],
    links: [
      { chapterId: 'ren-01', text: '[[ren-01|Motivos de consulta]]: disuria y hematuria isomórfica.' },
      { chapterId: 'ren-02', text: '[[ren-02|Examen físico]]: puñopercusión y puntos.' },
      { chapterId: 'ren-07', text: '[[ren-07|Litiasis]]: la obstrucción que favorece la infección (y Proteus que forma cálculos).' },
    ],
    pitfalls: [
      'Confundir bacteriuria (bacterias) con leucocituria (leucocitos).',
      'Poner fiebre en la cistitis no complicada.',
      'Olvidar que Proteus alcaliniza la orina.',
      'Invertir recaída y reinfección.',
    ],
    miniExam: [
      {
        id: 'ren06-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Mujer de 25 años, sin antecedentes, con ardor al orinar, polaquiuria y dolor suprapúbico desde ayer; afebril. Orina completa: 20 leucocitos por campo. Conducta:',
        options: [
          { text: 'Cistitis no complicada: urocultivo y tratamiento empírico.', why: 'Correcto.' },
          { text: 'Internación por pielonefritis.', why: 'No hay fiebre ni dolor lumbar.' },
          { text: 'No tratar: es bacteriuria asintomática.', why: 'Tiene síntomas.' },
          { text: 'Biopsia renal.', why: 'No.' },
        ],
        answer: 0,
        refs: [U1('22:48'), U2('00:41'), U2('11:03')],
      },
    ],
  },

  escenas,
  clase,
  diagrams: {},
};

export default chapter;
