import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-09 — Malabsorción e intestino irritable. Fuente: clases Malabsorción 1–2 y SII (Ortega) + libro p. 378–382 (porqué).
 * Preguntero: «Síndromes: pilórico, íleo y malabsorción», P8–P9.
 * Aclaración: en la clase, el test de la D-xilosa se interpreta bien (> 5 g páncreas, < 5 g mucosa) pero se explica con un
 * mecanismo distinto; acá se da el porqué fisiológico (la xilosa no necesita enzimas pancreáticas).
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const A1 = (t: string) => r('malabs-1', t);
const A2 = (t: string) => r('malabs-2', t);
const S = (t: string) => r('sii', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-09',
  systemId: 'digestivo',
  title: 'Malabsorción e intestino irritable',
  subtitle: 'Las tres fases de la malabsorción, la esteatorrea, Van de Kamer y la D-xilosa; el intestino irritable y sus criterios de Roma.',
  estimatedMinutes: 40,
  sources: [A1('00:01–33:42'), A2('00:00–16:31'), S('00:02–16:09'), L('378–382')],

  map: {
    center: 'Malabsorción e intestino irritable',
    why: '«Si no me dicen **diarrea crónica** en un síndrome de malabsorción, **los van a bochar**.» La **esteatorrea** se pregunta «en cualquier lado del mundo», el **Van de Kamer** «como el Padre Nuestro», y los **criterios de Roma** del intestino irritable son pregunta de parcial.',
    prereqs: [
      { label: 'Diarrea crónica (dig-03)', detail: 'La malabsortiva es uno de los cinco mecanismos.', chapterId: 'dig-03' },
      { label: 'Digestión y absorción', detail: 'Qué hacen el páncreas, la bilis y la mucosa del delgado.' },
    ],
    branches: [
      { id: 'fases', label: 'Fases', tone: 'peach', items: ['Intraluminal (páncreas, bilis)', 'Mucosa (celíaca)', 'Absortiva (linfa)'] },
      { id: 'clinica', label: 'Clínica ★', tone: 'gold', items: ['Diarrea crónica', 'Esteatorrea', 'Déficits: anemia, tetania, sangrado'] },
      { id: 'diagnostico', label: 'Diagnóstico ★', tone: 'lilac', items: ['Van de Kamer', 'Sudán', 'D-xilosa · serología celíaca'] },
      { id: 'sii', label: 'Intestino irritable', tone: 'sky', items: ['Diagnóstico por exclusión', 'Roma ★', 'Alarma → colonoscopía'] },
    ],
    outcomes: [
      'Ubicar una malabsorción en su **fase** y nombrar causas.',
      'Describir la **esteatorrea** y la **tríada** de la malabsorción.',
      'Explicar el **Van de Kamer** y la **D-xilosa**.',
      'Recitar los **criterios de Roma** del intestino irritable y sus signos de alarma.',
    ],
  },

  theory: [
    {
      id: 'fases',
      kicker: 'Fisiopatología',
      title: 'Qué es la malabsorción y sus tres fases',
      priority: 'imprescindible',
      summary: 'Alteración de la digestión y/o absorción de macro y micronutrientes.',
      blocks: [
        { t: 'anim', id: 'fases' },
        {
          t: 'cuadro',
          title: 'Causas por fase (libro p. 379)',
          cols: [
            { t: 'Qué falla', tone: 'lilac' },
            { t: 'Ejemplos', tone: 'gold' },
          ],
          rows: [
            { k: 'Intraluminal', v: ['La **digestión** en el duodeno: jugo pancreático, sales biliares (estómago < 5 %)', 'Pancreatitis crónica, fibrosis quística, cáncer de páncreas; obstrucción biliar, hepatopatías'] },
            { k: 'Mucosa', v: ['La **absorción** en yeyuno e íleon', '**Celíaca** (esprue no tropical), esprue tropical, déficit de disacaridasas (lactosa)'] },
            { k: 'Absortiva', v: ['El **transporte linfático** de quilomicrones', 'Enteropatía perdedora de proteínas (rara)'] },
          ],
          refs: [A1('03:00'), A1('05:12'), A1('10:22'), A1('26:13'), L('379')],
        },
        { t: 'callout', kind: 'clinic', title: 'Enfermedad celíaca', text: 'Autoinmune: el **gluten** (gliadina de trigo, avena, cebada, centeno) activa anticuerpos que **destruyen las vellosidades** → menos superficie de absorción. Tiene fases (aguda, silente, latente); con dieta sin gluten, los anticuerpos se «apagan».', refs: [A1('13:52'), A1('15:18'), A1('19:32')] },
      ],
      refs: [A1('00:47'), A1('02:13'), L('378')],
    },
    {
      id: 'clinica',
      kicker: 'Lo que toma ★',
      title: 'Diarrea crónica, esteatorrea y déficits',
      priority: 'imprescindible',
      summary: 'Diarrea crónica (cardinal) con esteatorrea + distensión + flatulencia ± pérdida de peso.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Para no bochar', text: '«La manifestación clínica cardinal… es la **diarrea crónica**. Si no me dicen diarrea crónica en un síndrome de malabsorción, **los van a bochar**.» Y la más frecuente es la **esteatorrea**: «pregunta de parcial, choice, final, oral, en cualquier lado del mundo».', refs: [A1('28:19'), A1('08:10')] },
        { t: 'triad', title: 'La tríada de la malabsorción', items: ['Esteatorrea', 'Distensión abdominal', 'Flatulencia'], plus: ['Pérdida de peso'], plusLabel: 'Agregar la pérdida de peso', center: 'Malabsorción', tone: 'gold', note: '«…hay que pensar en un síndrome de malabsorción **hasta que se demuestre lo contrario**.» Esteatorrea: heces malolientes, pastosas, amarillentas o arcillosas, grasosas, **espumosas, que flotan**. Creatorrea (proteínas en heces): en cuadros más crónicos, como la pancreatitis crónica.', refs: [A1('33:02'), A1('08:53'), A1('29:00')] },
        { t: 'anim', id: 'deficits' },
        {
          t: 'cuadro',
          title: 'Déficit → manifestación (tapalo)',
          cols: [{ t: 'Qué aparece', tone: 'rose' }],
          rows: [
            { k: 'Hidratos de carbono', v: ['Cansancio, astenia (falta la principal fuente de energía)'] },
            { k: 'Proteínas', v: ['Pérdida de masa muscular, emaciación; **edema** por hipoalbuminemia'] },
            { k: 'Hierro', v: ['Anemia **ferropénica**, hipocrómica microcítica; coiloniquia'] },
            { k: 'B12 / ácido fólico', v: ['Anemia **megaloblástica** macrocítica; B12: síndrome neuroanémico'] },
            { k: 'Calcio / vitamina D', v: ['**Tetania** (Trousseau, Chvostek), raquitismo, osteomalacia, osteoporosis'] },
            { k: 'Vitamina K', v: ['**Fenómenos hemorrágicos**'] },
            { k: 'Vitamina A', v: ['Ceguera nocturna, xeroftalmia, queratomalacia'] },
            { k: 'Vitaminas B y C', v: ['Piel y mucosas: pelagra, beriberi, escorbuto, queilitis, estomatitis'] },
          ],
          refs: [A2('00:43'), A2('02:49'), A2('05:44'), A2('06:27'), A2('07:13')],
        },
      ],
      refs: [A1('28:19'), A1('32:21'), A2('00:00')],
    },
    {
      id: 'diagnostico',
      kicker: 'Lo que toma ★',
      title: 'Van de Kamer, Sudán, D-xilosa y celíaca',
      priority: 'imprescindible',
      summary: 'Primero confirmar la esteatorrea; después ubicar la fase.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Como el Padre Nuestro', text: '«Test de **Van de Kamer**, pregunta de parcial… también tienen que saberlo como el Padre Nuestro.» **Cuantitativo**: heces de **72 horas** con una dieta de **100 g de grasa por día**; **más de 6 g/día** de grasa en heces = esteatorrea. **Cualitativo**: tinción con **Sudán** al microscopio.', refs: [A1('29:40'), A1('31:41'), A1('32:21'), L('379')] },
        { t: 'anim', id: 'xilosa' },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Cuantitativo', title: 'Van de Kamer', text: '72 h · 100 g de grasa/día · > 6 g/día en heces = positivo.', tone: 'gold' },
            { tag: 'Cualitativo', title: 'Sudán', text: 'Gotas de grasa teñidas al microscopio.', tone: 'peach' },
            { tag: 'Celíaca', title: 'Serología + biopsia', text: 'Anticuerpos **antitransglutaminasa** y **antiendomisio**; la **biopsia** de duodeno/yeyuno define el grado.', tone: 'lilac' },
          ],
        },
      ],
      refs: [A1('29:40'), A2('08:39'), A2('10:46'), A2('15:07')],
    },
    {
      id: 'sii',
      kicker: 'Intestino irritable',
      title: 'Síndrome de intestino irritable y criterios de Roma',
      priority: 'imprescindible',
      summary: 'Trastorno funcional (motor), crónico, diagnóstico por exclusión.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Se utilizan los **criterios de Roma** para definirlo, y esto es **pregunta de parcial**: lo que está en el cuadrito sí o sí lo tienen que estudiar.»', refs: [S('01:23')] },
        {
          t: 'calc',
          title: 'Roma para intestino irritable',
          criterios: [
            { k: 'Mejora con la defecación', ops: [{ t: 'No', pts: 0 }, { t: 'Sí', pts: 1 }] },
            { k: 'Cambio en la frecuencia de las deposiciones', ops: [{ t: 'No', pts: 0 }, { t: 'Sí', pts: 1 }] },
            { k: 'Cambio en la forma (consistencia)', ops: [{ t: 'No', pts: 0 }, { t: 'Sí', pts: 1 }] },
          ],
          bandas: [
            { min: 0, max: 1, t: 'No cumple', d: 'Hacen falta **dos** de los tres.', tone: 'mint' },
            { min: 2, max: 3, t: 'Cumple Roma', d: 'Si hay **dolor o malestar abdominal recurrente al menos 3 días por mes en los últimos 3 meses** y se descartó una causa orgánica.', tone: 'sky' },
          ],
          note: 'El dolor/malestar tiene que estar presente; los tres ítems son los asociados (se necesitan 2).',
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Hábito', title: '70–80 % constipación', text: '20–30 % diarrea; pueden alternar. Moco, evacuación incompleta, distensión.', tone: 'peach' },
            { tag: 'Mecanismo', title: 'Eje cerebro–intestino', text: 'Estrés y ansiedad (casi 90 % con trastorno psicológico) alteran la motilidad: no hay causa orgánica.', tone: 'lilac' },
            { tag: 'Tratamiento', title: 'Relajación, dieta, ejercicio', text: 'Evitar lactosa, grasas y alcohol (gluten si se sospecha celíaca). Fármacos solo si hace falta.', tone: 'mint' },
          ],
        },
        {
          t: 'compare',
          title: '¿Funcional o hay algo orgánico?',
          cols: [
            { title: 'Intestino irritable', tone: 'sky', items: ['Dolor crónico + trastorno evacuatorio', 'Empieza en la adolescencia', 'Estudios normales (99 %)'] },
            { title: 'Signos de alarma → orgánico', tone: 'red', items: ['**Pérdida de peso**, fiebre', 'Sangre (oculta o visible), grasa en heces', '**Mayor de 50** (o > 40 con antecedentes) → **colonoscopía**: adenocarcinoma de colon'] },
          ],
        },
      ],
      refs: [S('00:42'), S('02:04'), S('02:44'), S('04:44'), S('08:05'), S('12:49'), S('13:29'), S('15:29'), L('382')],
    },
  ],

  developments: [
    {
      id: 'dig09-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'clinica',
      question: '¿Qué es el síndrome de malabsorción? Fases y manifestaciones clínicas.',
      quote: { text: '«Si no me dicen diarrea crónica en un síndrome de mala absorción, lo van a bochar»', refs: [A1('28:19')] },
      answer: [
        { t: 'p', text: 'Alteración de la **digestión y/o absorción** de macro y micronutrientes. **Fases:** intraluminal (páncreas, sales biliares), mucosa (yeyuno-íleon: celíaca) y absortiva (linfática).' },
        { t: 'p', text: '**Cardinal: diarrea crónica**, la más frecuente **esteatorrea** (pastosa, grasosa, espumosa, flota). Tríada: esteatorrea + distensión + flatulencia (± pérdida de peso). Déficits: anemia (Fe, B12, fólico), tetania (Ca, vit. D), hemorragias (vit. K), ceguera nocturna (vit. A), edema (proteínas).' },
      ],
      refs: [A1('03:00'), A1('08:10'), A1('33:02'), A2('00:00')],
    },
    {
      id: 'dig09-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'diagnostico',
      question: 'Prueba de Van de Kamer y detección de grasas en heces con Sudán.',
      quote: { text: '«Test de Van de Kamer, pregunta de parcial… como si fuese el Padre Nuestro»', refs: [A1('29:40')] },
      answer: [
        { t: 'p', text: '**Van de Kamer (cuantitativo):** recolectar heces durante **72 h** con una dieta de **100 g de grasa/día**; una excreción **> 6 g/día** es anormal (esteatorrea) y orienta con alta sensibilidad a malabsorción.' },
        { t: 'p', text: '**Sudán (cualitativo):** tinción de la grasa fecal al microscopio. Para ubicar la fase: **D-xilosa** (> 5 g en orina de 5 h = páncreas; < 5 g = mucosa).' },
      ],
      refs: [A1('29:40'), A1('32:21'), A2('10:46'), L('379')],
    },
    {
      id: 'dig09-d03',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'sii',
      question: 'Defina síndrome de intestino irritable y sus criterios de Roma.',
      quote: { text: '«…los criterios de Roma es pregunta de parcial»', refs: [S('01:23')] },
      answer: [
        { t: 'p', text: 'Trastorno **funcional** (motor) del intestino, crónico, **diagnóstico por exclusión**. **Roma:** dolor o malestar abdominal recurrente **≥ 3 días por mes en los últimos 3 meses**, con **2 de 3**: mejora con la defecación, cambio en la frecuencia, cambio en la forma de las heces.' },
        { t: 'p', text: '70–80 % constipación, 20–30 % diarrea; moco, distensión. **Alarma** (pérdida de peso, fiebre, sangre, > 50 años) → descartar orgánico (colonoscopía).' },
      ],
      refs: [S('01:23'), S('02:04'), S('13:29')],
    },
  ],

  mcq: [
    {
      id: 'dig09-q01',
      topic: 'Clínica',
      difficulty: 1,
      emphasis: true,
      stem: 'La manifestación **cardinal** del síndrome de malabsorción es:',
      options: [
        { text: 'Diarrea crónica.', why: 'Correcto: «si no me dicen diarrea crónica, los van a bochar».' },
        { text: 'Constipación.', why: 'No.' },
        { text: 'Vómitos.', why: 'No.' },
        { text: 'Dolor epigástrico.', why: 'No.' },
      ],
      answer: 0,
      refs: [A1('28:19')],
    },
    {
      id: 'dig09-q02',
      topic: 'Clínica',
      difficulty: 1,
      stem: 'Heces voluminosas, pastosas, grasosas, espumosas, que **flotan**:',
      options: [
        { text: 'Esteatorrea.', why: 'Correcto.' },
        { text: 'Melena.', why: 'Es negra por sangre digerida.' },
        { text: 'Acolia.', why: 'Es la falta de color por obstrucción biliar.' },
        { text: 'Disentería.', why: 'Es con moco y sangre.' },
      ],
      answer: 0,
      refs: [A1('08:10'), L('378')],
    },
    {
      id: 'dig09-q03',
      topic: 'Fases',
      difficulty: 2,
      stem: 'La enfermedad celíaca altera la fase:',
      options: [
        { text: 'Intraluminal.', why: 'Eso es páncreas y bilis.' },
        { text: 'Mucosa.', why: 'Correcto: destruye las vellosidades del delgado.' },
        { text: 'Absortiva (linfática).', why: 'No.' },
        { text: 'Gástrica.', why: 'No.' },
      ],
      answer: 1,
      refs: [A1('13:52')],
    },
    {
      id: 'dig09-q04',
      topic: 'Fases',
      difficulty: 2,
      stem: 'Una pancreatitis crónica produce malabsorción en la fase:',
      options: [
        { text: 'Intraluminal.', why: 'Correcto: falta el jugo pancreático para la digestión.' },
        { text: 'Mucosa.', why: 'No.' },
        { text: 'Absortiva.', why: 'No.' },
        { text: 'Ninguna.', why: 'No.' },
      ],
      answer: 0,
      refs: [A1('05:12'), L('379')],
    },
    {
      id: 'dig09-q05',
      topic: 'Diagnóstico',
      difficulty: 2,
      emphasis: true,
      stem: 'En el test de **Van de Kamer**, es positivo si con una dieta de 100 g de grasa por día se eliminan:',
      options: [
        { text: 'Más de 6 g de grasa por día.', why: 'Correcto.' },
        { text: 'Más de 1 g por día.', why: 'Es normal.' },
        { text: 'Más de 50 g por día.', why: 'No es el corte.' },
        { text: 'Cualquier cantidad.', why: 'No.' },
      ],
      answer: 0,
      refs: [A1('31:41'), L('379')],
    },
    {
      id: 'dig09-q06',
      topic: 'Diagnóstico',
      difficulty: 3,
      stem: 'Test de D-xilosa con **menos de 5 g** en la orina de 5 horas. El problema está en:',
      options: [
        { text: 'El páncreas.', why: 'Si el problema fuera pancreático, la xilosa se absorbería normal (> 5 g).' },
        { text: 'La mucosa del intestino delgado.', why: 'Correcto: la mucosa no la absorbe.' },
        { text: 'La vía biliar.', why: 'No afecta la absorción de xilosa.' },
        { text: 'El estómago.', why: 'No.' },
      ],
      answer: 1,
      refs: [A2('12:14')],
    },
    {
      id: 'dig09-q07',
      topic: 'Déficits',
      difficulty: 2,
      stem: 'Un paciente con malabsorción y **tetania** (Trousseau positivo) tiene déficit de:',
      options: [
        { text: 'Calcio y vitamina D.', why: 'Correcto.' },
        { text: 'Vitamina K.', why: 'Daría sangrados.' },
        { text: 'Hierro.', why: 'Daría anemia microcítica.' },
        { text: 'Vitamina A.', why: 'Daría trastornos visuales.' },
      ],
      answer: 0,
      refs: [A2('02:49'), A2('05:44')],
    },
    {
      id: 'dig09-q08',
      topic: 'Déficits',
      difficulty: 2,
      stem: 'La malabsorción de **vitamina K** produce:',
      options: [
        { text: 'Fenómenos hemorrágicos.', why: 'Correcto.' },
        { text: 'Ceguera nocturna.', why: 'Es la vitamina A.' },
        { text: 'Raquitismo.', why: 'Es la vitamina D.' },
        { text: 'Escorbuto.', why: 'Es la vitamina C.' },
      ],
      answer: 0,
      refs: [A2('05:44')],
    },
    {
      id: 'dig09-q09',
      topic: 'SII',
      difficulty: 1,
      emphasis: true,
      stem: 'El síndrome de intestino irritable es:',
      options: [
        { text: 'Un trastorno funcional, diagnóstico por exclusión.', why: 'Correcto.' },
        { text: 'Una enfermedad inflamatoria orgánica.', why: 'No.' },
        { text: 'Una infección crónica.', why: 'No.' },
        { text: 'Una forma de celíaca.', why: 'No.' },
      ],
      answer: 0,
      refs: [S('00:42')],
    },
    {
      id: 'dig09-q10',
      topic: 'SII',
      difficulty: 2,
      stem: 'Según Roma, el dolor del intestino irritable debe asociarse a **dos** de:',
      options: [
        { text: 'Mejora con la defecación, cambio de frecuencia, cambio de forma de las heces.', why: 'Correcto.' },
        { text: 'Fiebre, pérdida de peso y sangre.', why: 'Son signos de alarma.' },
        { text: 'Vómitos, pirosis y disfagia.', why: 'No.' },
        { text: 'Esteatorrea, distensión y flatulencia.', why: 'Eso es malabsorción.' },
      ],
      answer: 0,
      refs: [S('02:04')],
    },
    {
      id: 'dig09-q11',
      topic: 'SII',
      difficulty: 2,
      stem: 'Paciente de 58 años con dolor abdominal crónico, constipación nueva y **pérdida de peso**. La conducta es:',
      options: [
        { text: 'Diagnosticar intestino irritable y tratar el estrés.', why: 'Tiene signos de alarma.' },
        { text: 'Colonoscopía para descartar cáncer de colon.', why: 'Correcto.' },
        { text: 'Test de D-xilosa.', why: 'No es lo indicado.' },
        { text: 'Solo dieta.', why: 'No.' },
      ],
      answer: 1,
      refs: [S('13:29')],
    },
  ],

  memory: [
    {
      id: 'dig09-m01',
      title: 'Tríada de la malabsorción',
      purpose: 'Reconocerla en un caso.',
      evaluates: [{ t: 'list', items: ['Esteatorrea', 'Distensión', 'Flatulencia', '± pérdida de peso'] }],
      interpret: 'Con diarrea crónica: malabsorción hasta que se demuestre lo contrario.',
      mnemonic: { hook: 'Grasa, Globo, Gases (+ Gramos de menos).', explain: 'Esteatorrea, distensión, flatulencia y pérdida de peso.' },
      recall: { q: '¿Cuál es la manifestación cardinal de la malabsorción y su tríada?', a: 'Diarrea crónica; esteatorrea + distensión abdominal + flatulencia (± pérdida de peso).' },
    },
    {
      id: 'dig09-m02',
      title: 'Van de Kamer',
      purpose: '«Como el Padre Nuestro».',
      evaluates: [{ t: 'list', items: ['72 h', '100 g de grasa/día', '> 6 g/día = positivo'] }],
      interpret: 'Es cuantitativo; Sudán es cualitativo.',
      mnemonic: { hook: '3 días · 100 g · más de 6.', explain: 'Tres números para recordar el test.' },
      recall: { q: 'Explicá el test de Van de Kamer.', a: 'Heces de 72 h con dieta de 100 g de grasa/día; más de 6 g/día de grasa fecal = esteatorrea.' },
    },
    {
      id: 'dig09-m03',
      title: 'D-xilosa',
      purpose: 'Ubicar la fase.',
      evaluates: [{ t: 'list', items: ['> 5 g: páncreas (intraluminal)', '< 5 g: mucosa'] }],
      interpret: 'La xilosa no necesita enzimas: si no se absorbe, el problema es la mucosa.',
      mnemonic: { hook: 'Poca xilosa = Pared (mucosa) enferma.', explain: 'Menos de 5 g en orina indica que la mucosa no absorbe.' },
      recall: { q: '¿Qué indica una D-xilosa urinaria menor a 5 g?', a: 'Malabsorción de la fase mucosa (intestino delgado), como la celíaca.' },
    },
    {
      id: 'dig09-m04',
      title: 'Roma del intestino irritable',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['Dolor ≥ 3 días/mes, últimos 3 meses', '2 de 3: mejora al defecar, cambia frecuencia, cambia forma'] }],
      interpret: 'Siempre después de descartar lo orgánico.',
      mnemonic: { hook: '3-3 y 2 de 3.', explain: '3 días por mes, 3 meses, 2 de 3 criterios.' },
      recall: { q: '¿Cuáles son los criterios de Roma para intestino irritable?', a: 'Dolor/malestar abdominal ≥ 3 días/mes en los últimos 3 meses con 2 de: mejora con la defecación, cambio en la frecuencia, cambio en la forma.' },
    },
  ],

  closing: {
    map: {
      center: 'Malabsorción y SII en una mirada',
      nodes: [
        { label: 'Fases', tone: 'peach', items: ['Intraluminal: páncreas, bilis', 'Mucosa: celíaca', 'Absortiva: linfa'] },
        { label: 'Clínica ★', tone: 'gold', items: ['Diarrea crónica', 'Esteatorrea + distensión + flatulencia', 'Déficits'] },
        { label: 'Diagnóstico ★', tone: 'lilac', items: ['Van de Kamer > 6 g', 'Sudán', 'D-xilosa · serología'] },
        { label: 'SII', tone: 'sky', items: ['Funcional, exclusión', 'Roma: 3-3 y 2 de 3', 'Alarma → colonoscopía'] },
      ],
    },
    essentials: [
      'Malabsorción: **diarrea crónica** (cardinal) con **esteatorrea**; tríada esteatorrea + distensión + flatulencia.',
      'Fases: **intraluminal** (páncreas, sales biliares), **mucosa** (celíaca), absortiva (linfa).',
      '**Van de Kamer**: 72 h, 100 g de grasa/día, **> 6 g/día** = positivo. Sudán: cualitativo.',
      '**D-xilosa**: > 5 g en orina = páncreas; < 5 g = mucosa.',
      'Déficits: Fe/B12/fólico → anemias; Ca/vit. D → tetania; vit. K → sangrado; vit. A → ojos; proteínas → edema.',
      '**SII**: funcional, por exclusión; **Roma**: dolor ≥ 3 días/mes en 3 meses + 2 de 3. Alarma → colonoscopía.',
    ],
    links: [
      { chapterId: 'dig-03', text: '[[dig-03|Diarrea]]: la diarrea crónica malabsortiva entre los 5 mecanismos.' },
      { chapterId: 'dig-15', text: '[[dig-15|Pancreatitis]]: la crónica da malabsorción intraluminal.' },
      { chapterId: 'dig-04', text: '[[dig-04|Ictericia]]: obstrucción biliar → faltan sales biliares (y vitamina K).' },
    ],
    pitfalls: [
      'Responder la malabsorción sin decir **diarrea crónica**.',
      'Interpretar al revés la D-xilosa.',
      'Diagnosticar intestino irritable sin descartar signos de alarma.',
      'Confundir Van de Kamer (cuantitativo) con Sudán (cualitativo).',
    ],
    miniExam: [
      {
        id: 'dig09-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Niño con diarrea crónica, distensión, pérdida de peso y anticuerpos antitransglutaminasa positivos. La fase alterada y el tratamiento:',
        options: [
          { text: 'Mucosa (celíaca): dieta sin gluten.', why: 'Correcto.' },
          { text: 'Intraluminal: enzimas pancreáticas.', why: 'No.' },
          { text: 'Absortiva: cirugía.', why: 'No.' },
          { text: 'Funcional: relajación.', why: 'No.' },
        ],
        answer: 0,
        refs: [A1('17:22'), A2('15:07')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
