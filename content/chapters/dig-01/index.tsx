import type { Chapter, SourceRef } from '@/types';
import { diagrams } from './diagrams';
import video from './video.json';
import { escenas } from './escenas';

/*
 * Reescrito el 2026-11-08 según el pedido de la usuaria:
 * prioridad = lo que dice el profe (transcripciones) + preguntas de examen bien remarcadas;
 * del libro SOLO la fisiopatología (para defender el “por qué”); sin relleno.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M1 = (t: string) => r('mc-dig-1', t);
const M2 = (t: string) => r('mc-dig-2', t);
const HD = (t: string) => r('hd-1', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-01',
  systemId: 'digestivo',
  title: 'Vómitos, disfagia y dispepsia',
  subtitle: 'Lo que pregunta el profe en los motivos de consulta del tubo digestivo alto, con el porqué para defenderlo.',
  estimatedMinutes: 45,
  sources: [M1('00:00–35:13'), M2('00:00–32:03'), HD('07:33–17:10'), L('75, 368–369, 375–377, 389–390')],

  map: {
    center: 'Motivos de consulta del tubo digestivo alto',
    why: 'Según el profe, digestivo es **una de las unidades más preguntadas** en parciales y finales. De este bloque se toman sobre todo **tipos de vómito**, **hematemesis vs hemoptisis**, **Mallory-Weiss** y la **acalasia**.',
    prereqs: [
      { label: 'Hemoptisis (1.er parcial)', detail: 'El cuadro hematemesis vs hemoptisis se apoya en lo que viste en respiratorio.' },
      { label: 'Agua, potasio y ácido-base', detail: 'Para explicar las complicaciones del vómito.' },
    ],
    branches: [
      { id: 'tipos-vomito', label: 'Vómito', tone: 'sky', items: ['Definiciones', 'Tipos y horario ★', 'Hematemesis vs hemoptisis ★'] },
      { id: 'complicaciones', label: 'Complicaciones', tone: 'peach', items: ['Alcalosis + hipopotasemia', 'Mallory-Weiss (tríada) ★', 'Boerhaave'] },
      { id: 'disfagia', label: 'Disfagia', tone: 'rose', items: ['Alta vs baja', 'Mecánica vs motora', 'Acalasia ★'] },
      { id: 'dispepsia', label: 'Dispepsia', tone: 'lilac', items: ['Roma', '2 D + P', 'Signos de alarma'] },
    ],
    outcomes: [
      'Clasificar un vómito por **contenido** y **horario**.',
      'Dibujar el **cuadro hematemesis vs hemoptisis**.',
      'Decir la **tríada de Mallory-Weiss** y las complicaciones del vómito con su porqué.',
      'Reconocer la **acalasia** y los **signos de alarma** de una dispepsia.',
    ],
  },

  /* ───────── Fichas: lo mínimo que hay que saber, con el porqué ───────── */
  theory: [
    {
      id: 'vomito',
      kicker: 'Vómito · 1',
      title: 'Vómito, náusea y lo que no es vómito',
      priority: 'muy-importante',
      summary: 'Primero confirmar que es un vómito: si sube sin esfuerzo, no lo es.',
      blocks: [
        {
          t: 'table',
          head: ['Término', 'Qué es'],
          rows: [
            ['**Vómito (emesis)**', 'Expulsión **activa** por la boca del contenido gástrico o duodenal.'],
            ['**Náusea**', 'Deseo de vomitar; casi siempre precede al vómito.'],
            ['**Arcadas**', 'Contracciones del abdomen que preceden al vómito.'],
            ['**Regurgitación**', 'El contenido vuelve a la boca **sin esfuerzo**.'],
            ['**Rumiación**', 'Vuelve a la boca y el paciente **lo traga de nuevo**.'],
            ['**Hematemesis**', 'Vómito de sangre: siempre sangrado **alto** (esófago, estómago, duodeno).'],
          ],
        },
        { t: 'callout', kind: 'prof', text: 'Lo habitual es que consulten por náuseas y vómitos juntos; un vómito **sin náuseas previas** es llamativo.', refs: [M2('13:51')] },
        { t: 'anim', id: 'definiciones' },
      ],
      refs: [M2('14:31'), L('389')],
    },
    {
      id: 'tipos-vomito',
      kicker: 'Vómito · 2',
      title: 'Tipos de vómito y horario',
      priority: 'imprescindible',
      summary: 'El contenido dice de dónde viene; el horario orienta la causa.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Se pregunta', text: '«Eso es importante, la clasificación… les pueden preguntar»: cómo era el vómito y en qué momento apareció.', refs: [M2('15:51')] },
        { t: 'diagram', id: 'vomito-nivel', caption: 'Elegí un tipo para ver de qué tramo viene.' },
        {
          t: 'cuadro',
          title: 'Tipos de vómito por contenido',
          cols: [
            { t: 'Aspecto', tone: 'peach' },
            { t: 'Origen / pensar en', tone: 'sky' },
          ],
          rows: [
            { k: 'Alimenticio', v: ['Comida casi entera, poco ácido', 'Esófago'] },
            { k: 'Parcialmente digerido', v: ['Ácido, con restos', 'Estómago: gastroparesia, obstrucción pilórica'] },
            { k: 'Bilioso', v: ['Amarillo-verdoso, **amargo**', 'Causas pancreáticas, hepáticas y biliares'] },
            { k: 'Hemático', v: ['**Rojo** = sangrado activo · **borra de café** = sangre digerida', 'Primero descartar **úlcera**; várices, Mallory-Weiss, cáncer'] },
            { k: 'Fecaloide', v: ['Marrón, olor fecal', 'Obstrucción intestinal baja · fístula gastrocólica'] },
          ],
        },
        { t: 'anim', id: 'tipos-vomito' },
        { t: 'diagram', id: 'vomito-reloj', caption: 'Horario del vómito.' },
        { t: 'callout', kind: 'prof', text: 'Por la mañana en ayunas: pensar siempre en **embarazo, alcohol la noche anterior o hipertensión endocraneana**. Una hora después de comer → estómago; varias horas después → píloro. **En chorro sin náuseas** con cefalea → **HTE**. Si al vomitar **calma el dolor** → úlcera.', refs: [M2('19:13'), M2('21:54'), M2('22:35')] },
        {
          t: 'accordion',
          items: [
            {
              title: '¿Por qué? Fisiopatología (libro)',
              blocks: [
                { t: 'chain', items: [{ label: 'Obstrucción del tubo digestivo', kind: 'cause' }, { label: 'El contenido no avanza y refluye desde el nivel de la obstrucción', kind: 'mech' }, { label: 'Vómitos **alimentarios → biliosos → fecaloides** según el nivel (p. 377)', kind: 'sign' }] },
                { t: 'p', text: 'En el **síndrome pilórico** el estómago no se vacía: el vómito aparece **4 a 6 horas después de comer**, con alimentos retenidos (p. 375). Por eso “varias horas después → píloro”.' },
              ],
            },
          ],
        },
        { t: 'anim', id: 'horario' },
      ],
      refs: [M2('15:51'), M2('17:13'), M2('18:33'), M2('19:13'), L('375'), L('377')],
    },
    {
      id: 'hematemesis-hemoptisis',
      kicker: 'Vómito · 3',
      title: 'Hematemesis vs hemoptisis',
      priority: 'imprescindible',
      summary: 'El cuadro que el profe pide de memoria.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Diagnóstico diferencial con hemoptisis, pregunta de parcial… por favor ese cuadrito tienen que sabérselo.»', refs: [HD('08:08'), HD('08:24')] },
        { t: 'diagram', id: 'hemat-hemop', caption: 'El cuadro, para memorizar visualmente.' },
        {
          t: 'accordion',
          items: [
            {
              title: '¿Por qué? Fisiopatología (libro p. 75)',
              blocks: [
                { t: 'list', items: ['**Oscura en la hematemesis:** el ácido del estómago transforma la hemoglobina en **hematina ácida** (borra de café).', '**Espumosa en la hemoptisis:** la sangre viene mezclada con **aire** de la vía aérea; reacción **alcalina**.', '**Melena después de una hematemesis:** la sangre que pasa al intestino se digiere y sale con la materia fecal.'] },
                { t: 'callout', kind: 'note', text: 'En la grabación se escucha “la hematemesis tiene pH alcalino”; el cuadro del libro del profe (p. 75) asigna la reacción **alcalina a la hemoptisis**. Respondé con el cuadro del libro.', refs: [HD('08:00'), L('75')] },
              ],
            },
          ],
        },
        { t: 'anim', id: 'hemat-hemop' },
      ],
      refs: [HD('08:08'), L('75')],
    },
    {
      id: 'complicaciones',
      kicker: 'Vómito · 4',
      title: 'Complicaciones del vómito y Mallory-Weiss',
      priority: 'imprescindible',
      summary: 'Se pierden ácido, agua y potasio; el esfuerzo puede romper el esófago.',
      blocks: [
        { t: 'callout', kind: 'prof', text: 'Las complicaciones del vómito se preguntan en la cátedra: se pierde ácido y potasio —**hipopotasemia** y **alcalosis metabólica**— además de líquido.', refs: [M2('23:15')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Metabólicas', title: 'Alcalosis + hipopotasemia', text: 'Y **deshidratación** (taquicardia, hipotensión).', tone: 'sky' },
            { tag: 'Respiratoria', title: 'Neumonitis química', text: 'Aspira el vómito → **neumonía aspirativa** (puede matar).', tone: 'peach' },
            { tag: 'Esófago', title: 'Mallory-Weiss · Boerhaave', text: 'Desgarro de la **mucosa** · rotura de **todo el espesor**.', tone: 'rose' },
          ],
        },
        { t: 'triad', title: 'Tríada de Mallory-Weiss', items: ['Alcoholismo', 'Vómitos / arcadas', 'Hematemesis'], center: 'Mallory-Weiss', tone: 'rose', note: 'Desgarro **lineal de la mucosa de la unión esofagogástrica**. La tríada es también su **cronología**: toma alcohol → vomita → vomita sangre.', refs: [HD('16:48'), M2('24:37'), L('390')] },
        { t: 'diagram', id: 'vomito-complicaciones', caption: 'Arriba lo metabólico; abajo, mucosa (Mallory-Weiss) vs todo el espesor (Boerhaave).' },
        {
          t: 'accordion',
          items: [
            {
              title: '¿Por qué? Fisiopatología (libro p. 377)',
              blocks: [
                { t: 'chain', items: [{ label: 'Vómitos repetidos', kind: 'cause' }, { label: 'Pérdida de agua, cloro (HCl) y potasio', kind: 'mech' }, { label: '**Deshidratación, hipopotasemia y alcalosis** (si predomina la pérdida de cloro)', kind: 'sign' }] },
                { t: 'p', text: 'Si se pierden sobre todo líquidos alcalinos (intestinales), puede haber acidosis; en el vómito gástrico predomina la pérdida de cloro: **alcalosis**.' },
              ],
            },
          ],
        },
        { t: 'anim', id: 'complicaciones' },
        { t: 'anim', id: 'mallory-weiss' },
      ],
      refs: [M2('23:15'), M2('24:37'), HD('16:48'), L('377'), L('390')],
    },
    {
      id: 'laboratorio',
      kicker: 'Vómito · 5',
      title: 'El paciente que vomita: examen y laboratorio',
      priority: 'complementario',
      blocks: [
        {
          t: 'mnemo',
          word: 'CEUCGO',
          tone: 'sky',
          items: [
            { l: 'C', t: '**C**itológico completo' },
            { l: 'E', t: '**E**ritrosedimentación' },
            { l: 'U', t: '**U**rea' },
            { l: 'C', t: '**C**reatinina' },
            { l: 'G', t: '**G**lucemia' },
            { l: 'O', t: '**O**rina completa' },
          ],
          note: '«…pero no hay que olvidar nunca el **ionograma**» (hipopotasemia, alcalosis). En mujeres, **test de embarazo**.',
          refs: [M2('30:28'), M2('30:48')],
        },
        { t: 'list', items: ['Signos vitales y de **deshidratación**.', '**Chapoteo gástrico** a la palpación → síndrome pilórico.', 'Examen neurológico y **fondo de ojo** → hipertensión endocraneana.'] },
      ],
      refs: [M2('28:39'), M2('29:19'), M2('30:00')],
    },
    {
      id: 'disfagia',
      kicker: 'Disfagia',
      title: 'Disfagia: alta o baja, mecánica o motora',
      priority: 'muy-importante',
      summary: 'Dificultad para pasar el alimento de la boca al estómago. Primero: ¿dónde se traba? Después: ¿con qué alimento?',
      blocks: [
        { t: 'callout', kind: 'prof', text: '“Estas características no pueden olvidarse” (orofaríngea): no puede **iniciar** la deglución, **regurgita** por boca o nariz, **tos** y ahogo por aspiración, disfonía.', refs: [M1('03:42')] },
        {
          t: 'compare',
          cols: [
            { title: 'Orofaríngea = alta = de transferencia', tone: 'peach', items: ['No puede **iniciar**; señala la garganta', 'Tos, ahogo, regurgitación nasal', 'Más difícil con **líquidos**', '≈75 % neuromuscular: **ACV n.º 1**, Parkinson'] },
            { title: 'Esofágica = baja = de transporte', tone: 'sky', items: ['Traga bien y **después** se traba', 'Atascamiento **retroesternal**', '**Mecánica**: solo sólidos, progresiva (estenosis péptica n.º 1, cáncer)', '**Motora**: sólidos y líquidos, intermitente (acalasia, espasmo, esclerodermia)'] },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'La que siempre suelen preguntar', text: 'Disfagia **intermitente y lentamente progresiva para sólidos y líquidos**, con regurgitación → **acalasia**. Esofagograma: **pico de pájaro**; cáncer: **manzana mordida**.', refs: [M1('21:30'), M1('24:50'), M1('25:31')] },
        { t: 'diagram', id: 'esofagograma', caption: 'Esofagograma con bario (esquemas propios).' },
        {
          t: 'accordion',
          items: [
            {
              title: '¿Por qué? Fisiopatología de la acalasia (libro p. 369)',
              blocks: [
                { t: 'chain', items: [{ label: 'Alteración del **plexo mientérico de Auerbach** (idiopática o **Chagas**)', kind: 'cause' }, { label: '**Aperistalsis** + el EEI **no se relaja** y aumenta su tono', kind: 'mech' }, { label: 'El esófago se dilata (**dolicomegaesófago**): disfagia **primero a líquidos y luego a sólidos**, regurgitación, dolor torácico', kind: 'sign' }] },
              ],
            },
          ],
        },
        { t: 'anim', id: 'disfagia-donde' },
        { t: 'anim', id: 'muro-motor' },
        { t: 'anim', id: 'acalasia' },
      ],
      refs: [M1('00:49'), M1('03:00'), M1('05:47'), M1('10:06'), M1('12:48'), M1('13:28'), M1('16:08'), L('368'), L('369')],
    },
    {
      id: 'dispepsia',
      kicker: 'Dispepsia',
      title: 'Dispepsia: Roma, 2 D + P y signos de alarma',
      priority: 'muy-importante',
      summary: 'El “dolor de la boca del estómago”: siempre del ombligo para arriba.',
      blocks: [
        { t: 'callout', kind: 'prof', text: '“Se van a topar con dispepsia toda su vida.” Funcional (esencial, no ulcerosa) **60 %**; orgánica **40 %**, con la **úlcera péptica** como n.º 1.', refs: [M1('26:51'), M1('30:52'), M1('31:34')] },
        {
          t: 'kv',
          items: [
            { k: 'Roma (4 síntomas)', v: 'Plenitud posprandial · saciedad precoz · dolor epigástrico · ardor epigástrico' },
            { k: 'Tiempo', v: 'Últimos **3 meses**, con inicio **≥ 6 meses** antes (en clase: “90 días en 6 meses”); sin lesión estructural' },
            { k: 'Clínica: “las 2 D y la P”', v: '**D**olor epigástrico · **D**istensión · **P**irosis' },
            { k: 'Alarma → endoscopía', v: '> 55 años, pérdida de peso, hematemesis, vómitos persistentes, disfagia progresiva, ictericia, anemia, AINEs, antecedentes de cáncer' },
          ],
        },
        { t: 'mnemo', word: '2 D + P', tone: 'lilac', items: [{ l: 'D', t: '**D**olor epigástrico' }, { l: 'D', t: '**D**istensión' }, { l: 'P', t: '**P**irosis' }], note: '“Siempre digo las dos D y la P.”', refs: [M2('07:34')] },
        { t: 'diagram', id: 'dispepsia-algoritmo', caption: 'Conducta: alarma → endoscopía; joven sin alarma → H. pylori.' },
        { t: 'anim', id: 'dispepsia' },
        { t: 'anim', id: 'alarma' },
      ],
      refs: [M1('27:32'), M1('34:10'), M2('07:34'), M2('08:14'), M2('10:54')],
    },
  ],

  /* ───────── Preguntas de examen resueltas (preguntero + lo que el profe dice que toma) ───────── */
  developments: [
    {
      id: 'dig01-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'hematemesis-hemoptisis',
      question: '¿Cuál es el diagnóstico diferencial entre hematemesis y hemoptisis?',
      quote: { text: '«…pregunta de parcial… ese cuadrito tienen que sabérselo»', refs: [HD('08:08')] },
      answer: [
        {
          t: 'table',
          head: ['', 'Hematemesis', 'Hemoptisis'],
          rows: [
            ['Sale con', 'El **vómito** (precedida de náuseas)', 'La **tos** (cosquilleo laríngeo)'],
            ['Aspecto', 'Oscura, **borra de café**, coágulos, restos alimentarios', '**Roja rutilante, espumosa**'],
            ['Reacción', 'Ácida', '**Alcalina**'],
            ['Después', '**Melena**', 'Esputo hemoptoico, sin melena'],
            ['Antecedentes', 'Digestivos', 'Respiratorios'],
          ],
        },
        { t: 'p', text: '**Porqué:** el ácido gástrico convierte la hemoglobina en hematina ácida (oscura); la sangre de la vía aérea viene con aire (espuma).' },
      ],
      refs: [HD('08:08'), L('75')],
    },
    {
      id: 'dig01-d02',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'tipos-vomito',
      question: '¿Qué es el vómito? ¿Qué es la náusea? ¿Cómo se clasifican los vómitos?',
      quote: { text: '«…la clasificación… les pueden preguntar»', refs: [M2('15:51')] },
      answer: [
        { t: 'p', text: '**Vómito:** expulsión activa por la boca del contenido gastroduodenal. **Náusea:** deseo de vomitar. No confundir con la **regurgitación** (sin esfuerzo).' },
        { t: 'list', items: ['**Por contenido:** alimenticio (esófago) · parcialmente digerido/ácido (estómago) · bilioso (pancreático, hepático, biliar) · hemático (rojo = activo; borra de café = digerido) · fecaloide (obstrucción baja).', '**Por horario:** matinal en ayunas → embarazo, alcohol, HTE · 1 h después de comer → estómago · varias horas → píloro · nocturno → orgánico.', 'En **chorro sin náuseas** → HTE.'] },
      ],
      refs: [M2('14:31'), M2('15:51'), M2('19:13')],
    },
    {
      id: 'dig01-d03',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'complicaciones',
      question: '¿Qué es el síndrome de Mallory-Weiss? Mencione su tríada.',
      quote: { text: '«…hay una tríada característica: hematemesis, vómito y alcoholismo»', refs: [HD('16:48')] },
      answer: [
        { t: 'p', text: 'Desgarro **lineal de la mucosa de la unión esofagogástrica** por vómitos o arcadas intensas. **Tríada (y cronología): alcoholismo → vómitos → hematemesis.**' },
        { t: 'p', text: 'No confundir con **Boerhaave**: rotura de **todo el espesor** del esófago, con paso al mediastino.' },
      ],
      refs: [HD('16:48'), M2('24:37'), L('390')],
    },
    {
      id: 'dig01-d04',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'complicaciones',
      question: '¿Cuáles son las complicaciones del vómito y por qué se producen?',
      quote: { text: 'Complicaciones del vómito: se preguntan en la cátedra', refs: [M2('23:15')] },
      answer: [
        { t: 'list', items: ['**Hipopotasemia y alcalosis metabólica:** se pierden potasio y ácido clorhídrico (predomina la pérdida de cloro).', '**Deshidratación:** taquicardia, hipotensión.', '**Neumonitis química → neumonía aspirativa** si aspira el vómito.', '**Mallory-Weiss** (desgarro mucoso, hematemesis) y **Boerhaave** (rotura transmural).'] },
      ],
      refs: [M2('23:15'), L('377')],
    },
    {
      id: 'dig01-d05',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'disfagia',
      question: 'Disfagia intermitente y lentamente progresiva para sólidos y líquidos, con regurgitación: ¿qué sospecha y por qué?',
      quote: { text: '«…lo que siempre suelen preguntar»', refs: [M1('21:30')] },
      answer: [
        { t: 'p', text: '**Acalasia** (disfagia esofágica **motora**). Sólidos y líquidos porque falla el peristaltismo, no hay un obstáculo.' },
        { t: 'p', text: '**Porqué:** alteración del plexo de Auerbach (idiopática o Chagas) → aperistalsis y EEI que no se relaja → dolicomegaesófago. **Esofagograma:** pico de pájaro; **manometría** confirma.' },
      ],
      refs: [M1('21:30'), M1('24:50'), L('369')],
    },
    {
      id: 'dig01-d06',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'disfagia',
      question: 'Diferencie disfagia orofaríngea de esofágica.',
      quote: { text: '“Estas características no pueden olvidarse”', refs: [M1('03:42')] },
      answer: [
        { t: 'p', text: '**Orofaríngea (alta, de transferencia):** no puede iniciar la deglución, señala la garganta, regurgita por boca o nariz, tos y ahogo; más con líquidos; ACV n.º 1.' },
        { t: 'p', text: '**Esofágica (baja, de transporte):** traga y luego se traba detrás del esternón. **Mecánica:** solo sólidos, progresiva (estenosis péptica n.º 1). **Motora:** sólidos y líquidos, intermitente.' },
      ],
      refs: [M1('03:00'), M1('03:42'), M1('10:06'), M1('12:48')],
    },
    {
      id: 'dig01-d07',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'dispepsia',
      question: 'Defina dispepsia y mencione sus signos de alarma.',
      quote: { text: '“Siempre digo las dos D y la P”', refs: [M2('07:34')] },
      answer: [
        { t: 'p', text: 'Dolor o malestar del **abdomen superior** con plenitud posprandial, saciedad precoz, dolor o ardor epigástrico (Roma: 3 meses, inicio ≥ 6 meses). Funcional 60 %, orgánica 40 % (úlcera n.º 1). Clínica: **dolor, distensión, pirosis**.' },
        { t: 'p', text: '**Alarma (→ endoscopía):** > 55 años, pérdida de peso, hematemesis, vómitos persistentes, disfagia progresiva, ictericia, anemia, AINEs, antecedentes de cáncer.' },
      ],
      refs: [M1('27:32'), M1('30:52'), M2('07:34'), M2('08:14')],
    },
  ],

  /* ───────── Choice (solo temas de examen) ───────── */
  mcq: [
    {
      id: 'dig01-q01', topic: 'Hematemesis vs hemoptisis', difficulty: 1, emphasis: true,
      stem: 'Sangre roja rutilante y espumosa expulsada con la tos, de reacción alcalina, corresponde a:',
      options: [
        { text: 'Hematemesis.', why: 'La hematemesis sale con el vómito, oscura y ácida.' },
        { text: 'Hemoptisis.', why: 'Correcto: viene de la vía aérea, con aire (espuma) y reacción alcalina.' },
        { text: 'Melena.', why: 'Es sangre digerida en la materia fecal.' },
        { text: 'Epistaxis.', why: 'Sale por la nariz, sin tos.' },
      ],
      answer: 1, refs: [HD('08:08'), L('75')],
    },
    {
      id: 'dig01-q02', topic: 'Hematemesis', difficulty: 1,
      stem: 'Un vómito en **borra de café** indica:',
      options: [
        { text: 'Sangrado activo arterial.', why: 'Eso es sangre roja.' },
        { text: 'Sangre ya digerida por el ácido gástrico.', why: 'Correcto: la hemoglobina se convirtió en hematina ácida.' },
        { text: 'Origen colónico.', why: 'La hematemesis es siempre alta.' },
        { text: 'Siempre hemoptisis deglutida.', why: 'Puede ocurrir, pero la borra de café indica sangre digerida en el estómago.' },
      ],
      answer: 1, refs: [M2('17:13'), L('75')],
    },
    {
      id: 'dig01-q03', topic: 'Tipos de vómito', difficulty: 2, emphasis: true,
      stem: 'Vómito de alimentos ingeridos varias horas antes, con chapoteo gástrico:',
      options: [
        { text: 'Gastroenteritis.', why: 'No explica la retención.' },
        { text: 'Síndrome pilórico.', why: 'Correcto: el estómago no vacía (vómito 4–6 h después).' },
        { text: 'Hipertensión endocraneana.', why: 'Da vómito en chorro sin náuseas.' },
        { text: 'Embarazo.', why: 'Da vómito matinal.' },
      ],
      answer: 1, refs: [M2('19:53'), M2('29:19'), L('375')],
    },
    {
      id: 'dig01-q04', topic: 'Horario del vómito', difficulty: 1,
      stem: 'Vómito matinal en ayunas. Las tres causas que remarca el profe son:',
      options: [
        { text: 'Úlcera, gastritis y pancreatitis.', why: 'No son las del vómito matinal.' },
        { text: 'Embarazo, alcohol la noche anterior e hipertensión endocraneana.', why: 'Correcto.' },
        { text: 'Síndrome pilórico, íleo y apendicitis.', why: 'No son las del vómito matinal.' },
        { text: 'Ménière, migraña y cinetosis.', why: 'No son las que da el profe.' },
      ],
      answer: 1, refs: [M2('19:13')],
    },
    {
      id: 'dig01-q05', topic: 'Vómito en chorro', difficulty: 2,
      stem: 'Vómito en chorro, sin náuseas, con cefalea intensa: hay que pensar en',
      options: [
        { text: 'Síndrome pilórico.', why: 'Es de retención.' },
        { text: 'Hipertensión endocraneana.', why: 'Correcto.' },
        { text: 'Úlcera péptica.', why: 'No explica el chorro sin náuseas.' },
        { text: 'Gastroenteritis.', why: 'Suele haber náuseas y diarrea.' },
      ],
      answer: 1, refs: [M2('21:54')],
    },
    {
      id: 'dig01-q06', topic: 'Mallory-Weiss', difficulty: 1, emphasis: true,
      stem: 'La tríada de Mallory-Weiss es:',
      options: [
        { text: 'Dolor, vómitos y fiebre.', why: 'Es la tríada de Murphy (apendicitis).' },
        { text: 'Alcoholismo, vómitos y hematemesis.', why: 'Correcto (y es su cronología).' },
        { text: 'Disfagia, pérdida de peso y anemia.', why: 'Sugiere cáncer.' },
        { text: 'Dolor torácico, enfisema subcutáneo y vómitos.', why: 'Orienta a Boerhaave.' },
      ],
      answer: 1, refs: [HD('16:48'), L('390')],
    },
    {
      id: 'dig01-q07', topic: 'Complicaciones', difficulty: 2, emphasis: true,
      stem: 'Alteración esperable en un paciente con vómitos profusos:',
      options: [
        { text: 'Acidosis metabólica con hiperpotasemia.', why: 'Se pierde ácido y potasio, no se ganan.' },
        { text: 'Alcalosis metabólica con hipopotasemia.', why: 'Correcto: pérdida de cloro (HCl) y potasio.' },
        { text: 'Acidosis respiratoria.', why: 'No es la alteración primaria.' },
        { text: 'Hipernatremia aislada.', why: 'No es lo característico.' },
      ],
      answer: 1, refs: [M2('23:15'), L('377')],
    },
    {
      id: 'dig01-q08', topic: 'Mallory-Weiss vs Boerhaave', difficulty: 2,
      stem: '¿Qué diferencia a Mallory-Weiss de Boerhaave?',
      options: [
        { text: 'Mallory-Weiss es transmural.', why: 'Es al revés.' },
        { text: 'Mallory-Weiss: desgarro de la mucosa; Boerhaave: rotura de todo el espesor.', why: 'Correcto.' },
        { text: 'Boerhaave no ocurre por vómitos.', why: 'Justamente es una rotura por vómitos.' },
        { text: 'Mallory-Weiss nunca sangra.', why: 'Se manifiesta con hematemesis.' },
      ],
      answer: 1, refs: [M2('23:55'), M2('24:37')],
    },
    {
      id: 'dig01-q09', topic: 'Disfagia', difficulty: 1,
      stem: 'La disfagia orofaríngea también se llama:',
      options: [
        { text: 'Baja o de transporte.', why: 'Esa es la esofágica.' },
        { text: 'Alta o de transferencia.', why: 'Correcto.' },
        { text: 'Odinofagia.', why: 'Es dolor al tragar.' },
        { text: 'Globo histérico.', why: 'Sensación de cuerpo extraño sin relación con la ingesta.' },
      ],
      answer: 1, refs: [M1('03:00')],
    },
    {
      id: 'dig01-q10', topic: 'Disfagia', difficulty: 2,
      stem: 'Disfagia esofágica **solo para sólidos**, continua y progresiva: orienta a',
      options: [
        { text: 'Causa mecánica (obstructiva).', why: 'Correcto: un obstáculo deja pasar líquidos pero no sólidos.' },
        { text: 'Trastorno motor.', why: 'El motor es para sólidos y líquidos.' },
        { text: 'Disfagia orofaríngea.', why: 'No puede iniciar la deglución.' },
        { text: 'Globo histérico.', why: 'No se relaciona con la ingesta.' },
      ],
      answer: 0, refs: [M1('12:48')],
    },
    {
      id: 'dig01-q11', topic: 'Acalasia', difficulty: 2, emphasis: true,
      stem: 'Disfagia lentamente progresiva para sólidos y líquidos con regurgitación, en un paciente con Chagas:',
      options: [
        { text: 'Cáncer de esófago.', why: 'Es obstructivo: al principio solo sólidos.' },
        { text: 'Acalasia.', why: 'Correcto: “lo que siempre suelen preguntar”.' },
        { text: 'Estenosis péptica.', why: 'Es mecánica, con pirosis crónica.' },
        { text: 'Disfagia orofaríngea.', why: 'Traga bien: es esofágica.' },
      ],
      answer: 1, refs: [M1('21:30')],
    },
    {
      id: 'dig01-q12', topic: 'Dispepsia', difficulty: 2,
      stem: '¿Cuál es un signo de alarma en dispepsia?',
      options: [
        { text: 'Eructos.', why: 'Forma parte de la clínica habitual.' },
        { text: 'Anemia.', why: 'Correcto: puede indicar cáncer o sangrado.' },
        { text: 'Pirosis ocasional.', why: 'Es la “P” de la clínica habitual.' },
        { text: 'Tener 30 años.', why: 'La edad es alarma por encima de 55.' },
      ],
      answer: 1, refs: [M2('08:14')],
    },
  ],

  /* ───────── Memoria: solo tríadas, cuadros y reglas que pide el profe ───────── */
  memory: [
    {
      id: 'dig01-m01',
      title: 'Hematemesis vs hemoptisis',
      purpose: 'El cuadro que el profe pide de memoria.',
      evaluates: [{ t: 'table', head: ['', 'Hematemesis', 'Hemoptisis'], rows: [['Sale con', 'Vómito', 'Tos'], ['Color', 'Oscura / borra de café', 'Roja, espumosa'], ['pH', 'Ácido', 'Alcalino'], ['Después', 'Melena', '—']] }],
      interpret: 'Náuseas, restos de comida y después melena: digestivo. Tos y espuma: respiratorio.',
      mnemonic: { hook: 'Hemat-EMESIS = vómito · Hemop-TISIS = pulmón.', explain: 'El nombre te dice de dónde viene: emesis es vómito; tisis remite al pulmón.' },
      recall: { q: '¿De qué color y pH es la hemoptisis?', a: 'Roja rutilante, espumosa, alcalina.' },
    },
    {
      id: 'dig01-m02',
      title: 'Tríada de Mallory-Weiss',
      purpose: 'Responder la pregunta del preguntero en una línea.',
      evaluates: [{ t: 'list', items: ['**A**lcoholismo', '**V**ómitos', '**H**ematemesis', 'Lesión: desgarro lineal de la mucosa esofagogástrica'] }],
      interpret: 'Es también la cronología: primero el alcohol, después los vómitos, al final la sangre.',
      mnemonic: { hook: 'A-V-H: Alcohol → Vómito → Hemorragia.', explain: 'En ese orden ocurren los hechos.' },
      recall: { q: '¿Qué capa se rompe en Mallory-Weiss y cuál en Boerhaave?', a: 'Mallory-Weiss: la mucosa. Boerhaave: todo el espesor.' },
    },
    {
      id: 'dig01-m03',
      title: 'Tipos y horario del vómito',
      purpose: 'Clasificar un vómito como lo pide el profe.',
      evaluates: [{ t: 'list', items: ['Contenido: **Entero → Ácido → Amargo → Fecal** (esófago → estómago → bilis → intestino bajo).', 'Rojo = ahora; borra de café = antes.', 'Matinal: **E**mbarazo, **A**lcohol, **H**TE · varias horas: píloro · chorro sin náuseas: HTE.'] }],
      interpret: 'Cuanto más “procesado” llega el contenido, más lejos se originó.',
      mnemonic: { hook: '“¡EAH, qué mañana!”', explain: 'Vómito matinal = Embarazo, Alcohol, HTE.' },
      recall: { q: '¿Por qué un síndrome pilórico no da vómitos biliosos?', a: 'Porque con el píloro obstruido la bilis del duodeno no llega al estómago.' },
    },
    {
      id: 'dig01-m04',
      title: 'Disfagia: dónde y con qué',
      purpose: 'Las dos preguntas que ordenan la disfagia.',
      evaluates: [{ t: 'list', items: ['**Alta (transferencia):** se atraganta — tos, ahogo, nariz.', '**Baja (transporte):** se atasca detrás del esternón.', '**Solo sólidos** = mecánica · **sólidos + líquidos** = motora (acalasia).'] }],
      interpret: 'Primero el tramo, después el mecanismo.',
      mnemonic: { hook: 'Arriba se ATRAGANTA, abajo se ATASCA · MURO o MOTOR.', explain: 'Un muro deja pasar el agua pero no la piedra; un motor roto no empuja nada.' },
      recall: { q: 'Sólidos y líquidos, lenta y progresiva, con regurgitación: ¿diagnóstico?', a: 'Acalasia.' },
    },
    {
      id: 'dig01-m05',
      title: 'Dispepsia: 2 D + P y alarma',
      purpose: 'Clínica y conducta en dos reglas.',
      evaluates: [{ t: 'list', items: ['**D**olor · **D**istensión · **P**irosis (regla del profe).', 'Alarma: **VIDA que PESA → VEDA**: Vómitos, Ictericia, Disfagia, Anemia · Pérdida de peso, Edad > 55, Sangrado, AINEs/Antecedentes → endoscopía.'] }],
      interpret: 'Con cualquier signo de alarma, endoscopía digestiva alta.',
      mnemonic: { hook: 'Una VIDA que PESA → VEDA', explain: 'Mnemotecnia propia para los signos de alarma.' },
      recall: { q: '¿Qué significan las dos D y la P?', a: 'Dolor epigástrico, distensión y pirosis.' },
    },
  ],

  maneuvers: {
    ids: ['bazuqueo-gastrico', 'boca-orofaringe', 'ganglios-supraclaviculares'],
    note: 'Las maniobras que usa este capítulo. Todas las maniobras, por sistema y región, están en **Examen físico**.',
  },

  closing: {
    map: {
      center: 'Lo esencial para responder',
      nodes: [
        { label: 'Vómito ★', tone: 'sky', items: ['Contenido → nivel', 'Horario: EAH, píloro', 'Chorro sin náuseas → HTE'] },
        { label: 'Hematemesis vs hemoptisis ★', tone: 'rose', items: ['Vómito vs tos', 'Borra de café vs espumosa', 'Ácida vs alcalina · melena'] },
        { label: 'Complicaciones ★', tone: 'peach', items: ['Alcalosis + hipoK', 'Mallory-Weiss: A-V-H', 'Boerhaave: transmural'] },
        { label: 'Disfagia / dispepsia', tone: 'lilac', items: ['Acalasia ★', 'Alta vs baja · muro vs motor', '2 D + P · alarma → VEDA'] },
      ],
    },
    essentials: [
      '**Hematemesis vs hemoptisis**: vómito/tos · borra de café/roja espumosa · ácida/alcalina · melena (cuadro del profe).',
      '**Tipos de vómito**: alimenticio, parcialmente digerido, bilioso, hemático, fecaloide; **horario**: matinal (embarazo, alcohol, HTE), varias horas (píloro).',
      '**Mallory-Weiss**: alcoholismo + vómitos + hematemesis; desgarro de la mucosa esofagogástrica.',
      '**Complicaciones del vómito**: alcalosis metabólica, hipopotasemia, deshidratación, aspiración, Mallory-Weiss, Boerhaave.',
      '**Acalasia**: sólidos y líquidos, lenta y progresiva, regurgitación; pico de pájaro.',
      '**Dispepsia**: Roma (4 síntomas), 2 D + P, alarma → endoscopía.',
    ],
    links: [
      { chapterId: 'dig-12', text: '[[dig-12|Hemorragias digestivas]]: hematemesis, melena y Mallory-Weiss en profundidad.' },
      { chapterId: 'dig-08', text: '[[dig-08|Síndrome pilórico e íleo]]: el vómito de retención y los vómitos fecaloides.' },
      { chapterId: 'dig-06', text: '[[dig-06|Síndrome esofágico]]: acalasia, ERGE y cáncer.' },
      { chapterId: 'dig-07', text: '[[dig-07|Síndrome ulceroso]]: la causa n.º 1 de dispepsia orgánica.' },
    ],
    pitfalls: [
      'Decir que la hematemesis es alcalina: en el cuadro del libro la **alcalina es la hemoptisis**.',
      'Confundir la tríada de **Mallory-Weiss** con la de **Murphy** (dolor, vómitos, fiebre).',
      'Llamar “de transferencia” a la disfagia esofágica: transferencia = orofaríngea.',
      'Decir que la disfagia motora es solo para líquidos: es para **sólidos y líquidos**.',
      'Asociar vómito bilioso al síndrome pilórico.',
    ],
    miniExam: [
      {
        id: 'dig01-x01', topic: 'Integración', difficulty: 2, integration: true,
        stem: 'Paciente alcohólico que tras vómitos repetidos presenta vómito con sangre. ¿Qué tríada cumple?',
        options: [
          { text: 'Murphy.', why: 'Dolor, vómitos y fiebre (apendicitis).' },
          { text: 'Mallory-Weiss.', why: 'Correcto: alcoholismo, vómitos, hematemesis.' },
          { text: 'Charcot.', why: 'Es de la colangitis (otro capítulo).' },
          { text: 'Ninguna: es una hemoptisis.', why: 'Sale con el vómito: es hematemesis.' },
        ],
        answer: 1, refs: [HD('16:48')],
      },
      {
        id: 'dig01-x02', topic: 'Integración', difficulty: 2, integration: true,
        stem: 'Sangre oscura con restos alimentarios, precedida de náuseas, y melena al día siguiente:',
        options: [
          { text: 'Hemoptisis.', why: 'Sería roja, espumosa, con tos.' },
          { text: 'Hematemesis.', why: 'Correcto.' },
          { text: 'Epistaxis.', why: 'Sangre roja nasal, sin náuseas.' },
          { text: 'Gingivorragia.', why: 'Sangre roja de las encías.' },
        ],
        answer: 1, refs: [L('75')],
      },
      {
        id: 'dig01-x03', topic: 'Integración', difficulty: 1,
        stem: '“Las dos D y la P” de la dispepsia son:',
        options: [
          { text: 'Disfagia, diarrea, pirosis.', why: 'No.' },
          { text: 'Dolor epigástrico, distensión, pirosis.', why: 'Correcto.' },
          { text: 'Dolor, deshidratación, pérdida de peso.', why: 'No.' },
          { text: 'Distensión, disfonía, plenitud.', why: 'No.' },
        ],
        answer: 1, refs: [M2('07:34')],
      },
    ],
  },

  video,
  escenas,
  audioPasos: true,
  diagrams,
};

export default chapter;
