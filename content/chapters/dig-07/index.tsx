import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-07 — Síndrome ulceroso y gastritis. Fuente: clases Sd. ulceroso–gastritis 1, 2 y 3 (Ortega) + libro p. 370–372.
 * Preguntero: «Síndromes: esofágico, ulceroso y gastritis», P3–P9.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const U1 = (t: string) => r('sd-ulc-1', t);
const U2 = (t: string) => r('sd-ulc-2', t);
const U3 = (t: string) => r('sd-ulc-3', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-07',
  systemId: 'digestivo',
  title: 'Síndrome ulceroso y gastritis',
  subtitle: 'Defensa vs agresión de la mucosa, Helicobacter y AINE, úlcera duodenal vs gástrica, complicaciones y gastritis A vs B.',
  estimatedMinutes: 45,
  sources: [U1('00:03–08:11'), U2('00:03–34:23'), U3('00:00–15:58'), L('370–372')],

  map: {
    center: 'Úlcera péptica y gastritis',
    why: '«Lo más importante que vamos a ver… **pregunta muchísimo**: síndrome ulceroso y gastritis, pregunta de parcial, **tanto en el oral como en el choice**.»',
    prereqs: [
      { label: 'Dispepsia (dig-01)', detail: 'La úlcera es la causa n.º 1 de dispepsia orgánica.', chapterId: 'dig-01' },
      { label: 'Fisiología gástrica', detail: 'Células parietales (HCl, factor intrínseco) y principales (pepsinógeno).' },
    ],
    branches: [
      { id: 'definicion', label: 'Úlcera', tone: 'rose', items: ['Definición', 'Antro y duodeno ★', 'Duodenal vs gástrica'] },
      { id: 'fisiopatologia', label: 'Por qué se forma', tone: 'lilac', items: ['Barrera mucosa', 'H. pylori · AINE ★', 'Zollinger-Ellison'] },
      { id: 'diagnostico', label: 'Diagnóstico y complicaciones', tone: 'sky', items: ['VEDA = gold standard ★', 'Tests de H. pylori', 'Hemorragia · perforación · píloro ★'] },
      { id: 'gastritis', label: 'Gastritis', tone: 'peach', items: ['Erosiva vs no erosiva', 'Tipo A vs tipo B ★', 'Anemia perniciosa'] },
    ],
    outcomes: [
      'Definir **úlcera** y decir **dónde** aparece.',
      'Explicar **cómo** producen úlcera el **Helicobacter** y los **AINE**.',
      'Saber que el **gold standard** es la **endoscopía** y nombrar las **tres complicaciones**.',
      'Diferenciar **gastritis A** de **gastritis B**.',
    ],
  },

  theory: [
    {
      id: 'definicion',
      kicker: 'Definición',
      title: 'Qué es una úlcera y dónde aparece',
      priority: 'imprescindible',
      summary: 'Pérdida de sustancia que atraviesa la muscular de la mucosa: queda expuesta al ácido.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Lo más preguntado', text: '«Lo que vamos a hablar ahora es lo más importante y **pregunta muchísimo**… tanto en el **oral** como en el **choice**: úlcera péptica y gastritis.»', refs: [U1('00:03')] },
        {
          t: 'organos',
          title: 'Dónde se ubican',
          items: [
            { id: 'duo', t: 'Duodeno (1.ª y 2.ª porción)', d: 'La localización **más frecuente** (unas 5 veces más que el estómago): úlcera **duodenal**.', tone: 'rose', organos: ['duodeno'], marca: 'duodeno' },
            { id: 'antro', t: 'Antro gástrico', d: 'Curvatura menor del antro («calle gástrica»): úlcera **gástrica**.', tone: 'peach', organos: ['estomago'], marca: 'estomago' },
            { id: 'otros', t: 'Otras', d: 'Esófago, bordes de una gastroenteroanastomosis, yeyuno.', tone: 'lilac', organos: ['esofago', 'yeyuno'] },
          ],
          caption: '«Antro gástrico y primera y segunda porción del duodeno: eso sí o sí se tienen que saber.»',
        },
        {
          t: 'compare',
          title: 'Úlcera verdadera vs exulceración',
          cols: [
            { title: 'Crónica = úlcera verdadera', tone: 'rose', items: ['Atraviesa la muscular de la mucosa', 'Antro y duodeno', 'Única (o pocas), 2–4 cm', '**Fibrosis**'] },
            { title: 'Aguda = exulceración', tone: 'sky', items: ['No atraviesa la muscular de la mucosa', 'Al azar, múltiples', 'Pequeñas', 'Sin fibrosis'] },
          ],
        },
      ],
      refs: [U1('00:44'), U1('01:25'), U1('02:05'), U1('02:46'), L('370')],
    },
    {
      id: 'fisiopatologia',
      kicker: 'Fisiopatología',
      title: 'Defensa vs agresión: Helicobacter, AINE y Zollinger',
      priority: 'imprescindible',
      summary: 'Las dos causas más frecuentes: Helicobacter pylori y antiinflamatorios.',
      blocks: [
        { t: 'anim', id: 'defensa' },
        { t: 'callout', kind: 'prof', title: 'Factores de riesgo más frecuentes', text: '«Los factores de riesgo más frecuentes en todo paciente con úlcera péptica: **colonización por Helicobacter pylori** y **consumo de AINE y aspirina**.»', refs: [U2('15:41')] },
        { t: 'anim', id: 'hpylori' },
        { t: 'anim', id: 'aines' },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Tumor', title: 'Zollinger-Ellison', text: '**Gastrinoma** (páncreas) → mucha gastrina → **hiperclorhidria** (pH < 1) → epigastralgia y **úlceras múltiples**. Tratamiento: sacar el tumor.', tone: 'red' },
            { tag: 'Exógenos', title: 'Corticoides, estrés, cirugías', text: 'Corticoides (fosfolipasa A2), estrés crónico (cortisol), cirugías mayores.', tone: 'lilac' },
            { tag: 'Hábitos', title: 'Tabaco, café, mate, alcohol', text: 'Sustancias irritantes para el epitelio gástrico.', tone: 'peach' },
          ],
        },
      ],
      refs: [U1('04:48'), U1('05:28'), U2('00:44'), U2('15:01'), U2('17:08'), U2('22:51'), U2('25:12')],
    },
    {
      id: 'clinica',
      kicker: 'Clínica',
      title: 'Úlcera duodenal vs gástrica',
      priority: 'imprescindible',
      summary: 'Dolor epigástrico urente, sin irradiación. La comida lo calma en la duodenal y lo empeora en la gástrica.',
      blocks: [
        {
          t: 'cuadro',
          title: 'Duodenal vs gástrica',
          cols: [
            { t: 'Duodenal', tone: 'rose' },
            { t: 'Gástrica', tone: 'peach' },
          ],
          rows: [
            { k: 'Frecuencia', v: ['**Mucho más frecuente**', 'Menos frecuente'] },
            { k: 'Edad', v: ['Adultos **jóvenes**', '**Mayores**'] },
            { k: 'Con la comida', v: ['Suele **calmar**', '**Empeora** (estimula el ácido)'] },
            { k: 'Malignidad', v: ['Casi nunca', 'Puede ser un **cáncer ulcerado**'] },
            { k: 'Endoscopía', v: ['Diagnóstico', 'Siempre, con **biopsia**'] },
          ],
          refs: [U2('28:04'), U2('30:12'), U2('30:53'), U2('31:36')],
        },
        { t: 'callout', kind: 'clinic', title: 'El dolor (ALICIA)', text: 'Epigástrico, **urente** o quemante, **sin irradiación**, intermitente (3/10 a 10/10). Calman los antiácidos. Puede acompañarse de pirosis, eructos, náuseas y vómitos. **Pérdida de peso y anorexia** → pensar en úlcera **maligna** (más si es mayor de 50).', refs: [U2('26:39'), U2('27:21'), U2('29:30')] },
        { t: 'callout', kind: 'note', text: 'El **examen físico no revela nada** en la úlcera no complicada: lo fundamental es la anamnesis (AINE, estrés, mate, tabaco, alcohol, edad). Sirve cuando se complica (perforación).', refs: [U2('32:18')] },
      ],
      refs: [U2('26:39'), U2('32:18')],
    },
    {
      id: 'diagnostico',
      kicker: 'Lo que toma ★',
      title: 'Endoscopía y tests de Helicobacter',
      priority: 'imprescindible',
      summary: 'Gold standard: endoscopía digestiva alta con biopsia.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de choice', text: '«Preguntas de parcial, y esto lo preguntan en los choices: el **gold standard** de todo paciente con úlcera gástrica o duodenal es la **endoscopía digestiva alta**.» Ubica la úlcera, cuántas son, el tamaño y toma **biopsia**.', refs: [U2('33:00'), U2('33:43')] },
        {
          t: 'cuadro',
          title: 'Cómo se busca el Helicobacter',
          cols: [
            { t: 'Qué es', tone: 'lilac' },
            { t: 'Para qué / ojo', tone: 'gold' },
          ],
          rows: [
            { k: 'VEDA + biopsia', v: ['Invasiva: cultivo / tinción (Giemsa)', '**Gold standard** (especificidad ~100 %)'] },
            { k: 'Test de ureasa', v: ['Invasiva: urea sobre la lesión; si se desdobla, hay H. pylori', 'Rápido, durante la endoscopía'] },
            { k: 'Serología (ELISA)', v: ['No invasiva: anticuerpos', 'Poco específica: muchos falsos positivos'] },
            { k: 'PCR', v: ['No invasiva', 'Muy específica pero **cara**'] },
            { k: 'Prueba del aliento', v: ['Urea marcada (C13/C14) por boca; se mide en el aire espirado', '**Control de erradicación** después del tratamiento'] },
          ],
          refs: [U3('00:45'), U3('01:26'), U3('02:10'), U3('02:53'), U3('04:27')],
        },
        { t: 'callout', kind: 'tip', title: 'Tratamiento (triple esquema)', text: 'Inhibidor de la bomba + dos antibióticos: **OCA** (omeprazol, claritromicina, amoxicilina) u **OMA** (omeprazol, metronidazol, amoxicilina). En Zollinger: dosar **gastrina**.', refs: [U3('02:53'), U3('00:00')] },
      ],
      refs: [U3('00:00'), U3('05:11')],
    },
    {
      id: 'complicaciones',
      kicker: 'Lo que toma ★',
      title: 'Las tres complicaciones',
      priority: 'imprescindible',
      summary: 'Hemorragia (la más frecuente), perforación y síndrome pilórico.',
      blocks: [
        { t: 'callout', kind: 'prof', text: '«¿Cuáles son las complicaciones? **Preguntas de parcial**.»', refs: [U3('05:11')] },
        {
          t: 'organos',
          items: [
            { id: 'hda', t: '1 · Hemorragia digestiva alta', d: 'La **más frecuente**: hematemesis, **melena**, hipotensión ortostática, taquicardia y **anemia ferropénica**.', tone: 'red', organos: ['estomago', 'duodeno'], marca: 'duodeno' },
            { id: 'perf', t: '2 · Perforación', d: 'Abdomen agudo **perforativo** con peritonitis secundaria: abdomen en tabla, Gueneau de Mussy, **Jobert** y **Popper**.', tone: 'gold', organos: ['estomago'], marca: 'estomago' },
            { id: 'pil', t: '3 · Síndrome pilórico', d: 'Una úlcera crónica en el píloro se **fibrosa** y lo estrecha: el estómago no se vacía → **vómitos y pérdida de peso**.', tone: 'peach', organos: ['piloro', 'estomago'], marca: 'piloro' },
          ],
        },
      ],
      refs: [U3('05:11'), U3('05:55'), U3('06:43'), U3('07:25')],
    },
    {
      id: 'gastritis',
      kicker: 'Gastritis ★',
      title: 'Gastritis: erosiva, no erosiva, tipo A y tipo B',
      priority: 'imprescindible',
      summary: 'La no erosiva es «la que les van a preguntar»: tipo A (autoinmune) vs tipo B (bacteriana).',
      blocks: [
        {
          t: 'flow',
          root: {
            label: '**Gastritis**: inflamación de la mucosa gástrica',
            tone: 'peach',
            children: [
              { label: '**Erosiva**', tone: 'red', note: 'Hemorrágica: la mucosa sangra (AINE)' },
              {
                label: '**No erosiva**',
                tone: 'lilac',
                star: true,
                note: '«La que les van a preguntar»',
                children: [
                  { label: '**Tipo A**', tone: 'lilac', note: 'Autoinmune' },
                  { label: '**Tipo B**', tone: 'sky', note: 'Bacteriana (H. pylori)' },
                  { label: 'Tipo AB', tone: 'peach' },
                ],
              },
            ],
          },
          caption: 'Aguda: neutrófilos. Crónica: fibrosis, metaplasia y **atrofia**, que se relaciona con el cáncer.',
        },
        { t: 'anim', id: 'gastritisA' },
        {
          t: 'cuadro',
          title: 'Tipo A vs tipo B (tapalo)',
          cols: [
            { t: 'Tipo A', tone: 'lilac' },
            { t: 'Tipo B', tone: 'sky' },
          ],
          rows: [
            { k: 'Causa', v: ['**Autoinmune**: anticuerpos contra células parietales', '**Bacteriana**: Helicobacter pylori'] },
            { k: 'Dónde', v: ['**Fondo y cuerpo**', '**Antro**'] },
            { k: 'Ácido', v: ['**Aclorhidria**', 'Normal o aumentado'] },
            { k: 'Gastrina', v: ['**Hipergastrinemia**', '—'] },
            { k: 'B12', v: ['Sin factor intrínseco → **anemia perniciosa**', 'Normal'] },
            { k: 'Se asocia a', v: ['Atrofia gástrica', '**Úlcera**'] },
            { k: 'Cáncer', v: ['**Alto** riesgo de adenocarcinoma', 'Bajo riesgo'] },
          ],
          refs: [U3('10:21'), U3('11:42'), U3('12:25'), U3('13:10')],
        },
        {
          t: 'compare',
          title: 'Hipergastrinemia: ¿Zollinger o gastritis A?',
          cols: [
            { title: 'Zollinger-Ellison', tone: 'red', items: ['Células parietales **conservadas**', '**Hiperclorhidria**', 'Úlceras múltiples'] },
            { title: 'Gastritis tipo A', tone: 'lilac', items: ['Células parietales **destruidas**', '**Aclorhidria**', 'Anemia perniciosa (macrocítica)'] },
          ],
        },
      ],
      refs: [U3('08:13'), U3('08:58'), U3('09:38'), U3('15:17'), U3('15:58')],
    },
  ],

  developments: [
    {
      id: 'dig07-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'definicion',
      question: 'Defina úlcera péptica. ¿Cómo se clasifica?',
      quote: { text: '«…pregunta muchísimo… tanto en el oral como en el choice»', refs: [U1('00:03')] },
      answer: [
        { t: 'p', text: 'Pérdida de sustancia de la pared gastroduodenal que **atraviesa la muscular de la mucosa** y la deja expuesta al ácido clorhídrico.' },
        { t: 'p', text: '**Por evolución:** agudas (exulceraciones, múltiples, sin fibrosis) y crónicas (verdaderas, con fibrosis). **Por localización:** **duodeno** (1.ª–2.ª porción, la más frecuente) y **antro gástrico**; también esófago, anastomosis, yeyuno.' },
        { t: 'p', text: '**Duodenal:** jóvenes, calma con la comida. **Gástrica:** mayores, empeora con la comida, siempre biopsia (cáncer ulcerado).' },
      ],
      refs: [U1('00:44'), U1('02:05'), U2('30:53'), L('370')],
    },
    {
      id: 'dig07-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'fisiopatologia',
      question: 'Mencione las principales etiologías de la úlcera péptica. ¿Qué es el síndrome de Zollinger-Ellison?',
      quote: { text: '«…los factores de riesgo más frecuentes: colonización por Helicobacter pylori y las tomas de antiinflamatorios»', refs: [U2('15:41')] },
      answer: [
        { t: 'p', text: '**Helicobacter pylori** (ureasa → urea → amonio tóxico + bicarbonato que alcaliniza y atrae más bacterias) y **AINE/aspirina** (inhiben COX → sin prostaglandinas → vasoconstricción → sin bicarbonato → sin barrera). También corticoides, estrés, cirugías mayores, tabaco, alcohol.' },
        { t: 'p', text: '**Zollinger-Ellison:** gastrinoma (páncreas) → hipergastrinemia → hiperclorhidria → **úlceras múltiples** y epigastralgia. Se trata extirpando el tumor.' },
      ],
      refs: [U2('15:41'), U2('17:08'), U2('25:12')],
    },
    {
      id: 'dig07-d03',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'diagnostico',
      question: '¿Cuál es el gold standard para el diagnóstico de úlcera? ¿Cómo se diagnostica el Helicobacter pylori?',
      quote: { text: '«…lo preguntan en los choices: el gold standard… es la endoscopía alta»', refs: [U2('33:00')] },
      answer: [
        { t: 'p', text: '**Endoscopía digestiva alta con biopsia** (ubicación, número, tamaño, malignidad).' },
        { t: 'p', text: '**H. pylori:** invasivas: VEDA con biopsia (gold standard), test de ureasa. No invasivas: serología (poco específica), PCR (cara), prueba del aliento (control de erradicación).' },
      ],
      refs: [U2('33:00'), U3('00:45'), U3('02:10')],
    },
    {
      id: 'dig07-d04',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'complicaciones',
      question: '¿Cuáles son las complicaciones de la úlcera péptica?',
      quote: { text: '«¿Cuáles son las complicaciones? Preguntas de parcial»', refs: [U3('05:11')] },
      answer: [{ t: 'list', items: ['**Hemorragia digestiva alta** (la más frecuente): hematemesis, melena, hipotensión ortostática, anemia ferropénica.', '**Perforación**: abdomen agudo perforativo (tabla, Gueneau de Mussy, Jobert, Popper).', '**Síndrome pilórico**: úlcera crónica fibrosada en el píloro → vómitos y pérdida de peso.'] }],
      refs: [U3('05:55'), U3('06:43'), U3('07:25')],
    },
    {
      id: 'dig07-d05',
      prio: 'P1',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'gastritis',
      question: 'Defina gastritis, clasifíquela y diferencie gastritis tipo A y tipo B.',
      quote: { text: '«…la no erosiva es la que le van a preguntar a ustedes»', refs: [U3('09:38')] },
      answer: [
        { t: 'p', text: 'Inflamación de la mucosa gástrica, infecciosa o autoinmune. **Aguda/crónica**; **erosiva** (hemorrágica) / **no erosiva**: tipo A, B y AB.' },
        { t: 'p', text: '**Tipo A:** autoinmune (anti células parietales), fondo y cuerpo, aclorhidria, hipergastrinemia, anemia perniciosa, **alto** riesgo de adenocarcinoma. **Tipo B:** bacteriana (H. pylori), antro, asociada a úlcera, bajo riesgo.' },
      ],
      refs: [U3('08:13'), U3('09:38'), U3('10:21'), U3('13:10')],
    },
  ],

  mcq: [
    {
      id: 'dig07-q01',
      topic: 'Localización',
      difficulty: 1,
      emphasis: true,
      stem: 'La localización **más frecuente** de la úlcera péptica es:',
      options: [
        { text: 'Fondo gástrico.', why: 'No.' },
        { text: 'Primera porción del duodeno.', why: 'Correcto: unas 5 veces más que el estómago.' },
        { text: 'Esófago.', why: 'Es posible, pero menos frecuente.' },
        { text: 'Yeyuno.', why: 'Raro.' },
      ],
      answer: 1,
      refs: [U1('02:05'), L('370')],
    },
    {
      id: 'dig07-q02',
      topic: 'Etiología',
      difficulty: 1,
      emphasis: true,
      stem: 'Las dos causas más frecuentes de úlcera péptica son:',
      options: [
        { text: 'Estrés y café.', why: 'Contribuyen, pero no son las principales.' },
        { text: 'Helicobacter pylori y AINE.', why: 'Correcto.' },
        { text: 'Zollinger-Ellison y corticoides.', why: 'Son causas menos frecuentes.' },
        { text: 'Alcohol y tabaco.', why: 'No son las principales.' },
      ],
      answer: 1,
      refs: [U2('15:41')],
    },
    {
      id: 'dig07-q03',
      topic: 'AINE',
      difficulty: 2,
      stem: 'Los AINE producen úlcera porque:',
      options: [
        { text: 'Aumentan la secreción de gastrina.', why: 'Eso es Zollinger.' },
        { text: 'Inhiben la COX → sin prostaglandinas → vasoconstricción y pérdida de la barrera de bicarbonato.', why: 'Correcto.' },
        { text: 'Destruyen las células parietales.', why: 'Eso es la gastritis A.' },
        { text: 'Producen ureasa.', why: 'Eso es el H. pylori.' },
      ],
      answer: 1,
      refs: [U2('17:48'), U2('21:25')],
    },
    {
      id: 'dig07-q04',
      topic: 'H. pylori',
      difficulty: 3,
      stem: 'La **ureasa** del H. pylori daña la mucosa porque genera:',
      options: [
        { text: 'Amonio (tóxico) y bicarbonato que alcaliniza y favorece más colonización.', why: 'Correcto.' },
        { text: 'Más ácido clorhídrico.', why: 'No.' },
        { text: 'Prostaglandinas.', why: 'No.' },
        { text: 'Gastrina.', why: 'No.' },
      ],
      answer: 0,
      refs: [U2('10:37'), U2('14:17')],
    },
    {
      id: 'dig07-q05',
      topic: 'Clínica',
      difficulty: 2,
      emphasis: true,
      stem: 'Joven con dolor epigástrico urente que **calma al comer**. Pensás en úlcera:',
      options: [
        { text: 'Gástrica.', why: 'La gástrica empeora con la comida y es de mayores.' },
        { text: 'Duodenal.', why: 'Correcto.' },
        { text: 'Esofágica.', why: 'No.' },
        { text: 'Maligna.', why: 'No hay datos.' },
      ],
      answer: 1,
      refs: [U2('28:45'), U2('30:53')],
    },
    {
      id: 'dig07-q06',
      topic: 'Diagnóstico',
      difficulty: 1,
      emphasis: true,
      stem: 'El **gold standard** para el diagnóstico de úlcera péptica es:',
      options: [
        { text: 'Seriada gastroduodenal.', why: 'En desuso: falsos positivos y negativos.' },
        { text: 'Endoscopía digestiva alta con biopsia.', why: 'Correcto.' },
        { text: 'Prueba del aliento.', why: 'Es para H. pylori (control).' },
        { text: 'Serología.', why: 'No.' },
      ],
      answer: 1,
      refs: [U2('33:00')],
    },
    {
      id: 'dig07-q07',
      topic: 'H. pylori',
      difficulty: 2,
      stem: 'Para **controlar la erradicación** del H. pylori después del tratamiento se usa:',
      options: [
        { text: 'Serología.', why: 'Los anticuerpos persisten.' },
        { text: 'Prueba del aliento con urea marcada.', why: 'Correcto.' },
        { text: 'Seriada.', why: 'No.' },
        { text: 'Gastrina.', why: 'No.' },
      ],
      answer: 1,
      refs: [U3('02:53'), U3('04:27')],
    },
    {
      id: 'dig07-q08',
      topic: 'Complicaciones',
      difficulty: 1,
      emphasis: true,
      stem: 'La complicación **más frecuente** de la úlcera péptica es:',
      options: [
        { text: 'Perforación.', why: 'Es grave pero menos frecuente.' },
        { text: 'Hemorragia digestiva alta.', why: 'Correcto.' },
        { text: 'Síndrome pilórico.', why: 'Menos frecuente.' },
        { text: 'Malignización.', why: 'No.' },
      ],
      answer: 1,
      refs: [U3('05:11')],
    },
    {
      id: 'dig07-q09',
      topic: 'Complicaciones',
      difficulty: 2,
      stem: 'Paciente ulceroso con vómitos de alimentos ingeridos horas antes y pérdida de peso:',
      options: [
        { text: 'Síndrome pilórico por fibrosis de una úlcera crónica.', why: 'Correcto.' },
        { text: 'Perforación.', why: 'Daría abdomen agudo.' },
        { text: 'Gastritis tipo A.', why: 'No.' },
        { text: 'Mallory-Weiss.', why: 'No.' },
      ],
      answer: 0,
      refs: [U3('07:25')],
    },
    {
      id: 'dig07-q10',
      topic: 'Gastritis',
      difficulty: 2,
      emphasis: true,
      stem: 'La gastritis **tipo A** se caracteriza por:',
      options: [
        { text: 'H. pylori en el antro.', why: 'Eso es la tipo B.' },
        { text: 'Anticuerpos contra células parietales, aclorhidria y anemia perniciosa.', why: 'Correcto.' },
        { text: 'Hiperclorhidria y úlceras múltiples.', why: 'Eso es Zollinger.' },
        { text: 'Bajo riesgo de cáncer.', why: 'La A tiene alto riesgo.' },
      ],
      answer: 1,
      refs: [U3('10:21'), U3('11:42')],
    },
    {
      id: 'dig07-q11',
      topic: 'Gastritis',
      difficulty: 3,
      stem: 'Hipergastrinemia con **aclorhidria**. ¿Qué diagnóstico corresponde?',
      options: [
        { text: 'Zollinger-Ellison.', why: 'Tiene hiperclorhidria.' },
        { text: 'Gastritis tipo A.', why: 'Correcto: sin células parietales no hay ácido.' },
        { text: 'Gastritis tipo B.', why: 'No da aclorhidria.' },
        { text: 'Úlcera duodenal.', why: 'No.' },
      ],
      answer: 1,
      refs: [U3('15:17')],
    },
    {
      id: 'dig07-q12',
      topic: 'Zollinger',
      difficulty: 2,
      stem: 'Úlceras múltiples con pH gástrico menor a 1: pensás en:',
      options: [
        { text: 'Gastrinoma (Zollinger-Ellison).', why: 'Correcto.' },
        { text: 'Gastritis atrófica.', why: 'Da aclorhidria.' },
        { text: 'Úlcera por estrés.', why: 'No es lo típico.' },
        { text: 'Cáncer gástrico.', why: 'No es la pista.' },
      ],
      answer: 0,
      refs: [U2('25:55')],
    },
  ],

  memory: [
    {
      id: 'dig07-m01',
      title: 'Dónde aparece la úlcera',
      purpose: '«Sí o sí se tienen que saber».',
      evaluates: [{ t: 'list', items: ['Duodeno 1.ª–2.ª porción (más frecuente)', 'Antro gástrico'] }],
      interpret: 'Por eso se llaman gastroduodenales.',
      mnemonic: { hook: 'DUO-deno primero, el doble de veces.', explain: 'La duodenal es la más frecuente.' },
      recall: { q: '¿Dónde se ubican más frecuentemente las úlceras?', a: 'Primera y segunda porción del duodeno y antro gástrico.' },
    },
    {
      id: 'dig07-m02',
      title: 'Las 3 complicaciones',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['Hemorragia (la más frecuente)', 'Perforación', 'Síndrome pilórico'] }],
      interpret: 'Sangra, se rompe o se cierra.',
      mnemonic: { hook: 'Sangra, Perfora, Tapa.', explain: 'Hemorragia, perforación, estenosis pilórica.' },
      recall: { q: 'Nombrá las tres complicaciones de la úlcera y la más frecuente.', a: 'Hemorragia digestiva alta (la más frecuente), perforación y síndrome pilórico.' },
    },
    {
      id: 'dig07-m03',
      title: 'Gastritis A vs B',
      purpose: 'La no erosiva que preguntan.',
      evaluates: [{ t: 'list', items: ['A: Autoinmune, fondo-cuerpo, Anemia perniciosa, Alto riesgo de cáncer', 'B: Bacteriana, antro, úlcera'] }],
      interpret: 'Las letras ayudan.',
      mnemonic: { hook: 'A = Autoinmune, Aclorhidria, Anemia, Arriba (fondo). B = Bacteria, Bajo (antro).', explain: 'La A está arriba y la B abajo en el estómago.' },
      recall: { q: '¿Qué gastritis da anemia perniciosa y por qué?', a: 'La tipo A: los anticuerpos destruyen las células parietales y falta el factor intrínseco para absorber la B12.' },
    },
    {
      id: 'dig07-m04',
      title: 'Gold standard',
      purpose: 'Pregunta de choice.',
      evaluates: [{ t: 'list', items: ['Úlcera: VEDA + biopsia', 'H. pylori: VEDA + biopsia', 'Control: prueba del aliento'] }],
      interpret: 'La endoscopía resuelve todo.',
      mnemonic: { hook: 'Ante la duda: «mirá adentro» (VEDA).', explain: 'La endoscopía es el gold standard.' },
      recall: { q: '¿Cuál es el gold standard en la úlcera péptica?', a: 'La endoscopía digestiva alta con biopsia.' },
    },
  ],

  closing: {
    map: {
      center: 'Úlcera y gastritis en una mirada',
      nodes: [
        { label: 'Úlcera', tone: 'rose', items: ['Duodeno y antro ★', 'Duodenal: joven, calma', 'Gástrica: mayor, biopsia'] },
        { label: 'Causas', tone: 'lilac', items: ['H. pylori ★', 'AINE ★', 'Zollinger'] },
        { label: 'Diagnóstico', tone: 'sky', items: ['VEDA = gold standard ★', 'Aliento: control', 'Complicaciones ★'] },
        { label: 'Gastritis', tone: 'peach', items: ['No erosiva ★', 'A: autoinmune', 'B: bacteriana'] },
      ],
    },
    essentials: [
      'Úlcera: pérdida de sustancia que **atraviesa la muscular de la mucosa**; **duodeno** (más frecuente) y **antro**.',
      'Causas n.º 1: **H. pylori** (ureasa → amonio) y **AINE** (sin prostaglandinas, sin barrera).',
      'Duodenal: jóvenes, **calma** con la comida. Gástrica: mayores, **empeora**, biopsia.',
      'Gold standard: **VEDA con biopsia**. Prueba del aliento para control.',
      'Complicaciones: **hemorragia** (la más frecuente), **perforación**, **síndrome pilórico**.',
      'Gastritis **A**: autoinmune, aclorhidria, anemia perniciosa, alto riesgo de cáncer. **B**: H. pylori, antro, úlcera.',
    ],
    links: [
      { chapterId: 'dig-12', text: '[[dig-12|Hemorragias digestivas]]: la complicación más frecuente, Forrest.' },
      { chapterId: 'dig-08', text: '[[dig-08|Síndrome pilórico e íleo]]: la estenosis pilórica.' },
      { chapterId: 'dig-02', text: '[[dig-02|Abdomen agudo]]: la úlcera perforada.' },
    ],
    pitfalls: [
      'Decir que la úlcera gástrica es la más frecuente (es la **duodenal**).',
      'Decir que la úlcera gástrica calma con la comida.',
      'Confundir Zollinger (hiperclorhidria) con gastritis A (aclorhidria): ambos con hipergastrinemia.',
      'Usar la serología para controlar la erradicación (se usa la **prueba del aliento**).',
    ],
    miniExam: [
      {
        id: 'dig07-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Paciente que toma ibuprofeno a diario, con melena e hipotensión ortostática. La causa más probable es:',
        options: [
          { text: 'Hemorragia por úlcera péptica asociada a AINE.', why: 'Correcto.' },
          { text: 'Gastritis tipo A.', why: 'No.' },
          { text: 'Zollinger-Ellison.', why: 'No es lo más probable.' },
          { text: 'Síndrome pilórico.', why: 'No.' },
        ],
        answer: 0,
        refs: [U2('15:41'), U3('05:55')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
