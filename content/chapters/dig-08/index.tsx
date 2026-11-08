import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-08 — Síndrome pilórico e íleo. Fuente: clases «Síndrome pilórico» e «Íleo» (Ortega) + libro p. 375–377.
 * Preguntero: «Síndromes: pilórico, íleo y malabsorción», P1–P7.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P = (t: string) => r('sd-pil', t);
const I = (t: string) => r('ileo', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-08',
  systemId: 'digestivo',
  title: 'Síndrome pilórico e íleo',
  subtitle: 'El estómago que no se vacía y el intestino que no avanza: causas, clínica, examen y diagnóstico.',
  estimatedMinutes: 35,
  sources: [P('00:00–16:18'), I('00:01–17:03'), L('375–377')],

  map: {
    center: 'Pilórico e íleo',
    why: 'Del **pilórico**, el profe dice que en el choice casi no aparece, «pero **sí lo van a preguntar en el oral**»: definición, causas, clínica y diagnóstico. El **íleo** «es preguntado en el **parcial, choice y oral**».',
    prereqs: [
      { label: 'Úlcera péptica (dig-07)', detail: 'La estenosis pilórica es una de sus tres complicaciones.', chapterId: 'dig-07' },
      { label: 'Examen físico (dig-05)', detail: 'Bazuqueo gástrico y ruidos hidroaéreos.', chapterId: 'dig-05' },
    ],
    branches: [
      { id: 'pilorico', label: 'Pilórico', tone: 'peach', items: ['Obstrucción del píloro', 'Úlcera, tumor, congénita', 'Reversible vs irreversible'] },
      { id: 'clinica-pilorica', label: 'Clínica y diagnóstico', tone: 'rose', items: ['Vómito + pérdida de peso ★', 'Bazuqueo · oliva', 'SNG 300/200 · VEDA'] },
      { id: 'ileo', label: 'Íleo ★', tone: 'sky', items: ['Paralítico vs mecánico', 'Silencio vs lucha', 'Todo íleo es secundario'] },
      { id: 'causas-ileo', label: 'Causas de íleo', tone: 'lilac', items: ['Posoperatorio ★', 'Asa centinela', 'Bridas · vólvulo · invaginación'] },
    ],
    outcomes: [
      'Definir el **síndrome pilórico** y nombrar sus causas.',
      'Reconocer su clínica (**vómito y pérdida de peso**) y cómo se diagnostica.',
      'Diferenciar **íleo paralítico** de **mecánico** por el examen.',
      'Saber que la causa más frecuente de íleo paralítico es el **posoperatorio**.',
    ],
  },

  theory: [
    {
      id: 'pilorico',
      kicker: 'Síndrome pilórico',
      title: 'Qué es y por qué se produce',
      priority: 'muy-importante',
      summary: 'Obstrucción del píloro que impide el vaciamiento gástrico (más de 4 horas).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Lo que hay que saber', text: '«En el choice nunca he visto que lo preguntaran, pero **sí lo van a preguntar en el oral**»: la **definición**, las **principales patologías** y, sobre todo, la **clínica y el diagnóstico**.', refs: [P('04:59')] },
        {
          t: 'cuadro',
          title: 'Causas',
          cols: [
            { t: 'Ejemplos', tone: 'peach' },
          ],
          rows: [
            { k: 'Obstrucción de la luz', v: ['**Úlcera péptica** (duodenal 95 %), tumores gástricos o pancreáticos, inflamación vecina (colecistitis, pancreatitis, duodenitis), cáusticos'] },
            { k: 'Congénita', v: ['**Estenosis hipertrófica del píloro** del recién nacido (menos de 1 mes): «muy frecuente»'] },
            { k: 'Sin obstrucción (funcional)', v: ['Neuropatía **diabética**, fármacos anticolinérgicos, cirugías gástricas, anorexia nerviosa, esclerodermia'] },
          ],
          refs: [P('01:24'), P('02:09'), P('02:52'), L('375')],
        },
        {
          t: 'compare',
          title: 'Reversible o irreversible',
          cols: [
            { title: 'Reversible', tone: 'mint', items: ['**Inflamación** y edema alrededor de una úlcera activa, espasmo', 'Cede sola o con tratamiento médico'] },
            { title: 'Irreversible', tone: 'red', items: ['**Fibrosis** cicatrizal que deforma el píloro; atonía gástrica', '70–90 % de las obstructivas: **cirugía**'] },
          ],
        },
      ],
      refs: [P('00:42'), P('03:32'), P('04:17'), L('375')],
    },
    {
      id: 'clinica-pilorica',
      kicker: 'Lo que toma (oral)',
      title: 'Clínica, examen y diagnóstico del pilórico',
      priority: 'imprescindible',
      summary: 'Vómito alimenticio tardío + pérdida de peso. Bazuqueo. SNG con más de 300 ml a las 4 h.',
      blocks: [
        { t: 'anim', id: 'pilorico' },
        {
          t: 'scale',
          title: 'Síntomas (frecuencia, libro p. 375)',
          items: [
            { k: '> 90 %', t: 'Vómito', d: '**El síntoma cardinal**: alimenticio, 4–6 h después de comer.', tone: 'red' },
            { k: '87 %', t: 'Dolor epigástrico', d: 'Quemazón, pesadez; más en el adulto con úlcera.', tone: 'rose' },
            { k: '65 %', t: 'Pérdida de peso', tone: 'peach' },
            { k: '60 %', t: 'Saciedad precoz', tone: 'gold' },
            { k: '50 %', t: 'Constipación', d: 'No llegan nutrientes al intestino.', tone: 'sky' },
            { k: '40 %', t: 'Náuseas', d: 'Muchas veces el vómito es **sin náuseas**.', tone: 'mint' },
          ],
        },
        { t: 'triad', title: 'El lactante con estenosis pilórica (menos de 1 mes)', items: ['Vómitos', 'Llanto', 'No sube de peso'], center: 'Píloro', tone: 'peach', note: 'Al examen, la **oliva pilórica**: el píloro hipertrofiado palpable unos 3–4 cm por debajo del xifoides (70–90 % de los lactantes).', refs: [P('08:28'), P('13:29'), L('376')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Examen', title: 'Bazuqueo + distensión', text: 'Abdomen superior distendido y **chapoteo gástrico**; peristaltismo gástrico visible al inicio; deshidratación (20 %), desnutrición.', tone: 'gold' },
            { tag: 'Sonda nasogástrica', title: '> 300 ml a las 4 h', text: 'O **> 200 ml en ayunas** (lo normal es menos de 50–100 ml): diagnóstico muy probable.', tone: 'sky' },
            { tag: 'Gold standard', title: 'Endoscopía alta', text: 'Ve la causa. Píloro normal: 15–20 mm; si no pasa el endoscopio (≈ 10–12 mm), hay estenosis. Rx contrastada: estómago dilatado con bario retenido.', tone: 'lilac' },
          ],
        },
      ],
      refs: [P('05:43'), P('07:47'), P('10:38'), P('12:03'), P('14:12'), P('15:36'), P('16:18'), L('376')],
    },
    {
      id: 'ileo',
      kicker: 'Íleo ★',
      title: 'Íleo paralítico vs mecánico',
      priority: 'imprescindible',
      summary: 'Parálisis del tránsito intestinal. Paralítico = silencio. Mecánico = lucha arriba, parálisis abajo.',
      blocks: [
        { t: 'callout', kind: 'prof', text: '«Íleo es preguntado en el **parcial, choice y oral**… todos los doctores pueden preguntar esto.»', refs: [I('02:11')] },
        { t: 'anim', id: 'ileo' },
        {
          t: 'cuadro',
          title: 'El examen que te piden',
          cols: [
            { t: 'Paralítico', tone: 'sky' },
            { t: 'Mecánico', tone: 'peach' },
          ],
          rows: [
            { k: 'Obstáculo', v: ['No', '**Sí**'] },
            { k: 'Inspección', v: ['Distendido (en tabla si hay peritonitis)', '**Distendido**, ondas peristálticas'] },
            { k: 'Auscultación', v: ['**Silencio** (RHA ausentes)', 'RHA **de lucha** (arriba de la obstrucción)'] },
            { k: 'Percusión', v: ['Timpanismo', 'Timpanismo'] },
            { k: 'Dolor', v: ['Constante si hay peritonitis', '**Cólico**: sube, baja y vuelve'] },
          ],
          refs: [I('01:28'), I('13:38'), I('14:19')],
        },
      ],
      refs: [I('00:01'), I('00:43'), L('376')],
    },
    {
      id: 'causas-ileo',
      kicker: 'Etiología',
      title: 'Causas de íleo',
      priority: 'imprescindible',
      summary: 'Paralítico: posoperatorio (la más frecuente). Mecánico: simple o por estrangulación.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«¿Cuál es la causa más frecuente de íleo paralítico? El **íleo posoperatorio**»: después de una cirugía abdominal el intestino se paraliza **48 a 72 horas**. «Ese no se tiene que olvidar nunca.»', refs: [I('02:54'), I('05:05')] },
        {
          t: 'flow',
          root: {
            label: '**Íleo**',
            tone: 'lilac',
            children: [
              {
                label: '**Paralítico**',
                tone: 'sky',
                children: [
                  { label: '**Posoperatorio**', tone: 'sky', star: true, note: 'La causa más frecuente (48–72 h)' },
                  { label: 'Peritonitis / perforación', tone: 'sky', note: 'Íleo generalizado' },
                  { label: 'Inflamatorio', tone: 'sky', note: 'Regional: **asa centinela** (apendicitis, pancreatitis)' },
                  { label: 'Vascular, tóxico, hipopotasemia, reflejo', tone: 'sky', note: 'Isquemia, uremia, opiáceos, cólico biliar o renal' },
                ],
              },
              {
                label: '**Mecánico**',
                tone: 'peach',
                children: [
                  { label: 'Simple', tone: 'peach', note: '**Íleo biliar** (cálculo en la válvula ileocecal), fecaloma, bezoar, áscaris, tumor' },
                  { label: 'Estrangulación', tone: 'red', star: true, note: 'Hernia atascada, **bridas**, **vólvulo** de sigmoides, **invaginación** (niños): riesgo de isquemia → cirugía' },
                ],
              },
            ],
          },
          caption: 'Invaginación intestinal en el niño: heces con sangre en «jalea de grosella».',
        },
        { t: 'callout', kind: 'key', title: 'Todo íleo es secundario', text: 'El íleo es la consecuencia: siempre hay que buscar qué lo produjo (peritonitis, pancreatitis, brida…). Laboratorio completo con **amilasa**, ionograma (hipopotasemia, alcalosis) y radiografía o tomografía.', refs: [I('15:01'), I('15:41'), I('16:22')] },
      ],
      refs: [I('02:54'), I('03:37'), I('04:20'), I('05:51'), I('06:32'), I('07:56'), I('08:38'), L('376')],
    },
  ],

  developments: [
    {
      id: 'dig08-d01',
      prio: 'P1',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'pilorico',
      question: '¿Qué es el síndrome pilórico? Mencione su etiología (obstructiva y no obstructiva).',
      quote: { text: '«…en el choice nunca he visto que lo preguntaran, pero sí lo van a preguntar en el oral»', refs: [P('04:59')] },
      answer: [
        { t: 'p', text: 'Conjunto de signos y síntomas por **obstrucción del píloro** que impide el vaciamiento gástrico (más de 4 horas).' },
        { t: 'p', text: '**Obstructivas:** úlcera péptica (duodenal 95 %), tumores, inflamación vecina, estenosis hipertrófica congénita del lactante. **No obstructivas:** neuropatía diabética, anticolinérgicos, cirugías gástricas, anorexia nerviosa, esclerodermia.' },
      ],
      refs: [P('00:42'), P('02:09'), L('375')],
    },
    {
      id: 'dig08-d02',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'clinica-pilorica',
      question: 'Manifestaciones clínicas del síndrome pilórico y maniobra que se puede realizar.',
      answer: [
        { t: 'p', text: '**Vómito** (síntoma cardinal, > 90 %): alimenticio, 4–6 h después de comer, a menudo sin náuseas; **pérdida de peso**, saciedad precoz, dolor epigástrico, constipación, deshidratación y alcalosis. Lactante: vómitos, llanto y no sube de peso; **oliva pilórica**.' },
        { t: 'p', text: '**Maniobra:** **bazuqueo o chapoteo gástrico**. **Diagnóstico:** SNG con > 300 ml a las 4 h o > 200 ml en ayunas; **VEDA** (gold standard).' },
      ],
      refs: [P('05:43'), P('10:38'), P('14:12'), P('15:36'), L('375')],
    },
    {
      id: 'dig08-d03',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'ileo',
      question: '¿Qué es un íleo? Diferencie íleo paralítico de mecánico.',
      quote: { text: '«Íleo es preguntado en el parcial, choice y tanto en el oral»', refs: [I('02:11')] },
      answer: [
        { t: 'p', text: '**Íleo:** parálisis del tránsito intestinal. **Paralítico (adinámico):** sin obstáculo, todo el intestino se detiene: abdomen distendido, timpánico, **silencio abdominal**. **Mecánico (obstructivo):** obstáculo: arriba peristaltismo de **lucha** (RHA aumentados, dolor cólico), abajo parálisis.' },
        { t: 'p', text: 'En ambos: no elimina gases ni heces, distensión, vómitos, hipopotasemia y alcalosis. **Todo íleo es secundario.**' },
      ],
      refs: [I('00:01'), I('01:28'), I('09:19'), I('13:38')],
    },
    {
      id: 'dig08-d04',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'causas-ileo',
      question: 'Etiología del íleo paralítico y del íleo mecánico.',
      quote: { text: '«¿Cuál es la causa más frecuente de íleo paralítico? El íleo posoperatorio»', refs: [I('02:54')] },
      answer: [
        { t: 'p', text: '**Paralítico:** **posoperatorio** (la más frecuente, 48–72 h), peritonitis (perforativo), inflamatorio regional (**asa centinela**, pancreatitis), vascular, tóxico (uremia, opiáceos), hipopotasemia, reflejo, neurológico.' },
        { t: 'p', text: '**Mecánico simple:** íleo biliar, fecaloma, bezoar, áscaris, neoplasias. **Por estrangulación:** hernia atascada, bridas, vólvulo de sigmoides, invaginación (niños): riesgo de isquemia, cirugía.' },
      ],
      refs: [I('02:54'), I('04:20'), I('05:51'), I('07:56'), L('376')],
    },
  ],

  mcq: [
    {
      id: 'dig08-q01',
      topic: 'Pilórico',
      difficulty: 1,
      stem: 'El síntoma **cardinal** del síndrome pilórico es:',
      options: [
        { text: 'El vómito.', why: 'Correcto (> 90 %).' },
        { text: 'La diarrea.', why: 'Hay constipación.' },
        { text: 'La ictericia.', why: 'No.' },
        { text: 'La hematemesis.', why: 'No.' },
      ],
      answer: 0,
      refs: [P('05:43'), L('375')],
    },
    {
      id: 'dig08-q02',
      topic: 'Pilórico',
      difficulty: 2,
      stem: 'El vómito del síndrome pilórico es típicamente:',
      options: [
        { text: 'Bilioso, inmediato.', why: 'No: el píloro está antes de la papila.' },
        { text: 'Alimenticio, 4 a 6 horas después de comer.', why: 'Correcto.' },
        { text: 'Fecaloide.', why: 'Eso es obstrucción baja.' },
        { text: 'Hemático.', why: 'No.' },
      ],
      answer: 1,
      refs: [L('375')],
    },
    {
      id: 'dig08-q03',
      topic: 'Pilórico',
      difficulty: 1,
      stem: 'La causa más frecuente de síndrome pilórico en el adulto es:',
      options: [
        { text: 'Úlcera péptica (duodenal).', why: 'Correcto.' },
        { text: 'Estenosis congénita.', why: 'Es del recién nacido.' },
        { text: 'Hernia hiatal.', why: 'No.' },
        { text: 'Acalasia.', why: 'No.' },
      ],
      answer: 0,
      refs: [P('02:09'), L('375')],
    },
    {
      id: 'dig08-q04',
      topic: 'Pilórico',
      difficulty: 2,
      emphasis: true,
      stem: 'Por sonda nasogástrica, ¿qué volumen hace muy probable un síndrome pilórico **en ayunas**?',
      options: [
        { text: '> 50 ml.', why: 'Es normal.' },
        { text: '> 200 ml.', why: 'Correcto (o > 300 ml a las 4 h de comer).' },
        { text: '> 1000 ml.', why: 'No es el corte.' },
        { text: 'Cualquier volumen.', why: 'No.' },
      ],
      answer: 1,
      refs: [P('14:56'), L('376')],
    },
    {
      id: 'dig08-q05',
      topic: 'Pilórico',
      difficulty: 2,
      stem: 'Lactante de 3 semanas con vómitos en chorro, llanto y que no sube de peso. Al palpar el epigastrio encontrás:',
      options: [
        { text: 'Oliva pilórica.', why: 'Correcto: píloro hipertrofiado.' },
        { text: 'Signo de Murphy.', why: 'No.' },
        { text: 'Signo de Jobert.', why: 'No.' },
        { text: 'Cabeza de medusa.', why: 'No.' },
      ],
      answer: 0,
      refs: [P('12:47'), L('376')],
    },
    {
      id: 'dig08-q06',
      topic: 'Íleo',
      difficulty: 1,
      emphasis: true,
      stem: 'La causa **más frecuente** de íleo paralítico es:',
      options: [
        { text: 'Peritonitis.', why: 'Es una causa, no la más frecuente.' },
        { text: 'El posoperatorio de cirugía abdominal.', why: 'Correcto (48–72 h).' },
        { text: 'Hipopotasemia.', why: 'Causa menos frecuente.' },
        { text: 'Bridas.', why: 'Dan íleo mecánico.' },
      ],
      answer: 1,
      refs: [I('02:54')],
    },
    {
      id: 'dig08-q07',
      topic: 'Íleo',
      difficulty: 1,
      emphasis: true,
      stem: 'Abdomen distendido, timpánico y con **silencio abdominal**:',
      options: [
        { text: 'Íleo paralítico.', why: 'Correcto.' },
        { text: 'Íleo mecánico.', why: 'Daría RHA de lucha.' },
        { text: 'Síndrome pilórico.', why: 'No.' },
        { text: 'Normal.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('13:38')],
    },
    {
      id: 'dig08-q08',
      topic: 'Íleo',
      difficulty: 2,
      stem: 'En el íleo **mecánico**, los ruidos hidroaéreos:',
      options: [
        { text: 'Están ausentes en todo el abdomen.', why: 'Eso es el paralítico.' },
        { text: 'Están aumentados (de lucha) por arriba de la obstrucción.', why: 'Correcto.' },
        { text: 'Son normales siempre.', why: 'No.' },
        { text: 'Solo se escuchan en el epigastrio.', why: 'No.' },
      ],
      answer: 1,
      refs: [I('00:43'), I('01:28')],
    },
    {
      id: 'dig08-q09',
      topic: 'Íleo',
      difficulty: 2,
      stem: 'El íleo paralítico localizado que acompaña a una pancreatitis o apendicitis se llama:',
      options: [
        { text: 'Asa centinela.', why: 'Correcto.' },
        { text: 'Íleo biliar.', why: 'Es mecánico, por un cálculo.' },
        { text: 'Vólvulo.', why: 'Es mecánico.' },
        { text: 'Megacolon.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('04:20')],
    },
    {
      id: 'dig08-q10',
      topic: 'Íleo',
      difficulty: 3,
      stem: 'El **íleo biliar** es:',
      options: [
        { text: 'Un íleo paralítico por cólico biliar.', why: 'El cólico biliar da íleo reflejo, pero no es el íleo biliar.' },
        { text: 'Una obstrucción mecánica por un cálculo impactado, en general en la válvula ileocecal.', why: 'Correcto.' },
        { text: 'Una ictericia por obstrucción del colédoco.', why: 'No.' },
        { text: 'Un vólvulo de vesícula.', why: 'No.' },
      ],
      answer: 1,
      refs: [I('06:32')],
    },
  ],

  memory: [
    {
      id: 'dig08-m01',
      title: 'Síndrome pilórico',
      purpose: 'Para el oral.',
      evaluates: [{ t: 'list', items: ['Obstrucción del píloro (> 4 h)', 'Vómito alimenticio tardío + pérdida de peso', 'Bazuqueo · SNG > 300 ml / > 200 ml ayuno · VEDA'] }],
      interpret: 'Adulto: úlcera duodenal. Lactante: estenosis congénita (oliva).',
      mnemonic: { hook: '«3-4-200-300»: más de 4 horas lleno; 200 ml en ayunas, 300 ml a las 4 h.', explain: 'Los números de la sonda nasogástrica.' },
      recall: { q: '¿Cuál es el síntoma cardinal del síndrome pilórico y qué maniobra lo evidencia?', a: 'El vómito (alimenticio, tardío); el bazuqueo o chapoteo gástrico.' },
    },
    {
      id: 'dig08-m02',
      title: 'Paralítico vs mecánico',
      purpose: 'Lo más preguntado del íleo.',
      evaluates: [{ t: 'list', items: ['Paralítico: silencio, sin obstáculo', 'Mecánico: lucha arriba, parálisis abajo'] }],
      interpret: 'Escuchar el abdomen te da el tipo.',
      mnemonic: { hook: 'Paralítico = Paz (silencio) · Mecánico = Motor que lucha.', explain: 'Silencio vs ruidos de lucha.' },
      recall: { q: '¿Qué escuchás en un íleo paralítico y qué en uno mecánico?', a: 'Paralítico: ausencia de RHA (silencio). Mecánico: RHA aumentados, de lucha, por arriba de la obstrucción.' },
    },
    {
      id: 'dig08-m03',
      title: 'Causa n.º 1 de íleo paralítico',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['Posoperatorio (48–72 h)'] }],
      interpret: 'Después de toda cirugía abdominal el intestino se detiene unos días.',
      mnemonic: { hook: 'Lo operaron → 2 o 3 días «dormido».', explain: '48 a 72 horas de parálisis.' },
      recall: { q: '¿Cuál es la causa más frecuente de íleo paralítico y cuánto dura?', a: 'El posoperatorio de cirugía abdominal, 48 a 72 horas.' },
    },
  ],

  closing: {
    map: {
      center: 'Pilórico e íleo en una mirada',
      nodes: [
        { label: 'Pilórico', tone: 'peach', items: ['Píloro obstruido', 'Úlcera · congénita', 'Reversible / irreversible'] },
        { label: 'Clínica pilórica', tone: 'rose', items: ['Vómito + peso ★', 'Bazuqueo · oliva', 'SNG · VEDA'] },
        { label: 'Íleo ★', tone: 'sky', items: ['Paralítico: silencio', 'Mecánico: lucha', 'Siempre secundario'] },
        { label: 'Causas', tone: 'lilac', items: ['Posoperatorio ★', 'Asa centinela', 'Estrangulación → cirugía'] },
      ],
    },
    essentials: [
      '**Pilórico**: obstrucción del píloro (> 4 h); adulto: úlcera duodenal; lactante: estenosis hipertrófica.',
      'Clínica: **vómito alimenticio tardío** (síntoma cardinal) + **pérdida de peso**; bazuqueo; oliva pilórica.',
      'Diagnóstico: SNG **> 300 ml a las 4 h** o **> 200 ml en ayunas**; **VEDA** gold standard.',
      '**Íleo**: paralítico (silencio, sin obstáculo) vs mecánico (lucha arriba, parálisis abajo).',
      'Causa n.º 1 de íleo paralítico: **posoperatorio** (48–72 h). Mecánico por estrangulación: cirugía.',
    ],
    links: [
      { chapterId: 'dig-07', text: '[[dig-07|Úlcera péptica]]: la causa del pilórico del adulto.' },
      { chapterId: 'dig-02', text: '[[dig-02|Abdomen agudo]]: el obstructivo y el perforativo.' },
      { chapterId: 'dig-10', text: '[[dig-10|Peritonitis]]: la causa del íleo paralítico generalizado.' },
    ],
    pitfalls: [
      'Decir que el vómito pilórico es bilioso (es **alimenticio**).',
      'Confundir el íleo biliar (mecánico, cálculo) con un íleo paralítico.',
      'Decir que el íleo es una enfermedad en sí: **todo íleo es secundario**.',
      'Olvidar los cortes de la sonda nasogástrica.',
    ],
    miniExam: [
      {
        id: 'dig08-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente operado de apendicitis hace 24 h: abdomen distendido, sin ruidos hidroaéreos, no elimina gases. Lo más probable es:',
        options: [
          { text: 'Íleo paralítico posoperatorio.', why: 'Correcto.' },
          { text: 'Vólvulo.', why: 'No es lo más probable.' },
          { text: 'Síndrome pilórico.', why: 'No.' },
          { text: 'Íleo biliar.', why: 'No.' },
        ],
        answer: 0,
        refs: [I('02:54')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
