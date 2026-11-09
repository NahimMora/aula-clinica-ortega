import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';
import { clase } from './clase';

/*
 * dig-06 — Síndrome esofágico. Fuente: clase «Sd. esofágico» (Ortega) + libro p. 368–369 (porqué).
 * Preguntero: bloque «Síndromes: esofágico, ulceroso y gastritis», P1–P2.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S = (t: string) => r('sd-esof', t);
const M1 = (t: string) => r('mc-dig-1', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-06',
  systemId: 'digestivo',
  title: 'Síndrome esofágico',
  subtitle: 'Los cinco síntomas, el cuadro de etiologías, del reflujo al Barrett y cómo se estudia el esófago.',
  estimatedMinutes: 30,
  sources: [S('00:02–24:24'), M1('00:49'), L('368–369')],

  map: {
    center: 'Síndrome esofágico',
    why: 'Abre el bloque de síndromes: para entenderlo hay que tener **motivos de consulta** y **examen físico**. El preguntero pide los **cinco síntomas** y el **cuadro de etiologías** con ejemplos.',
    prereqs: [
      { label: 'Disfagia (dig-01)', detail: 'Orofaríngea vs esofágica, mecánica vs motora, acalasia.', chapterId: 'dig-01' },
      { label: 'Histología del esófago', detail: 'Epitelio plano estratificado no queratinizado: no soporta el ácido.' },
    ],
    branches: [
      { id: 'sintomas', label: '5 síntomas', tone: 'sky', items: ['Disfagia · pirosis', 'Regurgitación (la más frecuente)', 'Odinofagia · dolor torácico'] },
      { id: 'etiologias', label: 'Etiologías', tone: 'lilac', items: ['Inflamatorias · motoras', 'Tumorales · mecánicas', 'Cuadro con ejemplos'] },
      { id: 'erge', label: 'ERGE y Barrett', tone: 'peach', items: ['Esfínter incompetente', 'Metaplasia', 'Adenocarcinoma'] },
      { id: 'diagnostico', label: 'Diagnóstico', tone: 'rose', items: ['Esofagograma primero', 'Manometría · endoscopía', 'pH-metría'] },
    ],
    outcomes: [
      'Nombrar los **5 síntomas** y saber cuál es el más frecuente.',
      'Armar el **cuadro de etiologías** con un ejemplo de cada grupo.',
      'Explicar **por qué** el reflujo crónico lleva al **Barrett** y al adenocarcinoma.',
      'Elegir el **estudio** correcto: esofagograma, manometría, endoscopía o pH-metría.',
    ],
  },

  theory: [
    {
      id: 'sintomas',
      kicker: 'Clínica',
      title: 'Los cinco síntomas',
      priority: 'imprescindible',
      summary: 'Disfagia, pirosis, regurgitación, odinofagia y dolor torácico.',
      blocks: [
        { t: 'anim', id: 'sintomas' },
        {
          t: 'mnemo',
          word: 'D-P-R-O-D',
          tone: 'sky',
          items: [
            { l: 'D', t: '**D**isfagia' },
            { l: 'P', t: '**P**irosis' },
            { l: 'R', t: '**R**egurgitación (la más frecuente)' },
            { l: 'O', t: '**O**dinofagia' },
            { l: 'D', t: '**D**olor torácico' },
          ],
          note: 'Acompañantes: eructos, halitosis, rumiación, sialorrea, sabor amargo y la sensación de globo.',
        },
        { t: 'callout', kind: 'prof', title: 'Lo que más van a ver', text: '«La regurgitación es lo **más frecuente**… se van a topar con ella»; va **asociada a pirosis en más del 90 %** de los casos. Es espontánea, sin esfuerzo, sobre todo de noche.', refs: [S('05:40'), S('06:23'), S('07:05')] },
        {
          t: 'compare',
          title: 'No confundir',
          cols: [
            { title: 'Odinofagia', tone: 'rose', items: ['**Dolor** al tragar', 'Patología **orgánica**', 'Causa n.º 1: **faringoamigdalitis** → revisar la garganta', 'También esofagitis (Cándida, fármacos)'] },
            { title: 'Globo histérico', tone: 'lilac', items: ['Sensación de algo atorado', 'Patología **funcional** / psicológica', 'Antecedentes de ansiedad, depresión, estrés'] },
          ],
        },
        {
          t: 'cards',
          cols: 2,
          items: [
            { tag: 'Agravan la pirosis', title: 'Café, mate, grasas, ejercicio, acostarse', text: 'Aumentan el contenido gástrico o la presión abdominal (abdominales después de comer), o se pierde la gravedad.', tone: 'peach' },
            { tag: 'Calman la pirosis', title: 'Antiácidos, IBP, alimentos alcalinos', text: 'En el ERGE, que desaparezca con antiácidos ayuda al diagnóstico.', tone: 'mint' },
          ],
        },
      ],
      refs: [S('01:26'), S('02:09'), S('02:49'), S('04:57'), S('07:49'), S('09:56'), L('368')],
    },
    {
      id: 'etiologias',
      kicker: 'Lo que toma',
      title: 'El cuadro de etiologías',
      priority: 'imprescindible',
      summary: 'Inflamatorias, motoras, tumorales y mecánicas/estructurales.',
      blocks: [
        {
          t: 'cuadro',
          title: 'Etiologías del síndrome esofágico',
          cols: [
            { t: 'Ejemplos', tone: 'lilac' },
            { t: 'Pista', tone: 'gold' },
          ],
          rows: [
            { k: 'Inflamatorias', v: ['**ERGE** (causa n.º 1 de esofagitis), eosinofílica, cáusticos, radiación, infecciones (Cándida, CMV, herpes)', 'Pirosis, **odinofagia** (síntoma cardinal de la esofagitis)'] },
            { k: 'Motoras', v: ['**Acalasia** (idiopática o **Chagas**), espasmo difuso, esclerodermia', 'Disfagia para sólidos **y** líquidos, intermitente'] },
            { k: 'Tumorales', v: ['**Epidermoide** (1/3 medio) · **adenocarcinoma** (1/3 inferior, sobre Barrett)', 'Disfagia **progresiva**, tardía (2/3 de la luz)'] },
            { k: 'Mecánicas', v: ['Estenosis péptica, anillo de **Schatzki**, **Plummer-Vinson**, divertículos (**Zenker**, epifrénico, tracción)', 'Disfagia solo para sólidos'] },
            { k: 'Otras', v: ['**Várices esofágicas** (hipertensión portal), traumatismos: Mallory-Weiss, perforación, cuerpo extraño', '—'] },
          ],
          refs: [S('11:19'), S('14:48'), S('20:57'), L('368'), L('369')],
        },
        {
          t: 'cuadro',
          title: 'Cáncer de esófago: los dos tipos',
          cols: [
            { t: 'Epidermoide (escamoso)', tone: 'rose' },
            { t: 'Adenocarcinoma', tone: 'gold' },
          ],
          rows: [
            { k: 'Frecuencia', v: ['El más frecuente (**90 %**)', 'En aumento: hoy se equipara'] },
            { k: 'Dónde', v: ['**Tercio medio**', '**Tercio inferior** (y cardias)'] },
            { k: 'Se asocia a', v: ['**Tabaco y alcohol**', '**Barrett** y ERGE'] },
            { k: 'Quién', v: ['Hombres (4:1), adultos', 'Hombres (4:1), adultos'] },
          ],
          refs: [S('12:44'), L('368')],
        },
      ],
      refs: [S('11:19'), L('368')],
    },
    {
      id: 'erge',
      kicker: 'Fisiopatología',
      title: 'ERGE, esofagitis y esófago de Barrett',
      priority: 'imprescindible',
      summary: 'El esfínter inferior falla, el ácido daña la mucosa y el epitelio se transforma para resistir.',
      blocks: [
        { t: 'anim', id: 'barrett' },
        { t: 'callout', kind: 'prof', title: 'Barrett', text: 'Metaplasia del **tercio inferior**: el epitelio **plano estratificado** se cambia por **cilíndrico simple** para soportar la acidez. Es un factor **preneoplásico**: sobre él aparece el **adenocarcinoma**.', refs: [S('13:25'), S('14:05')] },
        {
          t: 'accordion',
          items: [
            {
              title: '¿Por qué falla el esfínter? (libro p. 369)',
              blocks: [
                { t: 'chain', items: [{ label: '**Relajaciones transitorias** del esfínter inferior, **hernia hiatal**, trastornos del peristaltismo', kind: 'cause' }, { label: 'El contenido gástrico refluye y no se aclara', kind: 'mech' }, { label: 'Pirosis (el síntoma más común), regurgitación, esofagitis', kind: 'sign' }] },
                { t: 'p', text: 'La asociación con **disfagia** es un síntoma de **alarma** por su relación con la estenosis péptica y el adenocarcinoma.' },
              ],
            },
          ],
        },
        { t: 'callout', kind: 'note', text: 'La clasificación de **Los Ángeles** del reflujo existe, pero el profe aclara que no la tienen que saber ahora (es de medicina interna).', refs: [S('16:55')] },
      ],
      refs: [S('15:30'), S('16:12'), L('369')],
    },
    {
      id: 'acalasia',
      kicker: 'Motora',
      title: 'Acalasia en un minuto',
      priority: 'muy-importante',
      summary: 'Aperistalsis + esfínter inferior que no se relaja → dolicomegaesófago.',
      blocks: [
        { t: 'chain', items: [{ label: 'Falta el plexo de **Auerbach**: idiopática (la más frecuente) o **Chagas**', kind: 'cause' }, { label: '**Aperistalsis** + el esfínter inferior **no se relaja** (tono aumentado)', kind: 'mech' }, { label: 'La comida se estanca: **dolicomegaesófago**; disfagia esofágica, regurgitación, dolor torácico', kind: 'sign' }] },
        { t: 'callout', kind: 'tip', text: 'En el Chagas, el *Trypanosoma cruzi* se aloja en las células del plexo mientérico (esófago, colon, corazón) y las destruye: la acalasia aparece años después. Profundizado en [[dig-01|dig-01]].', refs: [S('19:37'), S('20:17')] },
      ],
      refs: [S('16:55'), S('17:36'), S('18:17'), S('18:57'), L('369')],
    },
    {
      id: 'diagnostico',
      kicker: 'Estudios',
      title: 'Cómo se estudia el esófago',
      priority: 'imprescindible',
      summary: 'Clínica y examen físico dan la presunción; las imágenes, la certeza.',
      blocks: [
        { t: 'anim', id: 'imagenes' },
        {
          t: 'timeline',
          title: 'En orden',
          items: [
            { k: '1', t: 'Esofagograma', d: 'El más útil y **no invasivo**: pico de pájaro, manzana mordida.', tone: 'sky' },
            { k: '2', t: 'Manometría', d: '**Gold standard de la acalasia** (mide la presión del esfínter).', tone: 'lilac' },
            { k: '3', t: 'Endoscopía + biopsia', d: 'Certeza del **cáncer**, esofagitis, várices. Invasiva.', tone: 'rose' },
            { k: '4', t: 'pH-metría ambulatoria', d: 'La más confiable para el **reflujo**, sobre todo con síntomas atípicos.', tone: 'peach' },
          ],
        },
      ],
      refs: [S('21:38'), S('22:21'), S('23:01'), S('23:42'), L('369')],
    },
  ],

  developments: [
    {
      id: 'dig06-d01',
      origen: 'preguntero',
      prio: 'P1',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'sintomas',
      question: 'Defina síndrome esofágico. ¿Cuáles son los cinco síntomas asociados?',
      quote: { text: '«La regurgitación es lo más frecuente, chicos, que van a ver»', refs: [S('06:23')] },
      answer: [
        { t: 'p', text: 'Conjunto de manifestaciones originadas en el esófago, que se expresa por **cinco síntomas** solos o asociados: **disfagia**, **pirosis**, **regurgitación** (la más frecuente, con pirosis en > 90 %), **odinofagia** y **dolor torácico** de origen esofágico.' },
        { t: 'p', text: 'Otros: eructos, halitosis, rumiación, sialorrea y globo histérico.' },
      ],
      refs: [S('01:26'), S('06:23'), L('368')],
    },
    {
      id: 'dig06-d02',
      origen: 'preguntero',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'etiologias',
      question: 'Realice un cuadro de las etiologías del síndrome esofágico con ejemplos.',
      answer: [
        {
          t: 'table',
          head: ['Grupo', 'Ejemplos'],
          rows: [
            ['Inflamatorias', 'ERGE (causa n.º 1), eosinofílica, cáusticos, radiación, infecciosas'],
            ['Motoras', 'Acalasia (idiopática o Chagas), espasmo difuso, esclerodermia'],
            ['Tumorales', 'Epidermoide (1/3 medio, 90 %), adenocarcinoma (1/3 inferior, Barrett)'],
            ['Mecánicas', 'Estenosis péptica, Schatzki, Plummer-Vinson, Zenker, compresión extrínseca'],
            ['Otras', 'Várices esofágicas, traumatismos (Mallory-Weiss, perforación)'],
          ],
        },
      ],
      refs: [S('11:19'), L('368'), L('369')],
    },
    {
      id: 'dig06-d03',
      origen: 'practica',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'erge',
      question: '¿Qué es el esófago de Barrett y por qué es importante?',
      answer: [{ t: 'p', text: 'Metaplasia del **tercio inferior** del esófago: el epitelio plano estratificado se reemplaza por **cilíndrico** para soportar el reflujo ácido crónico (ERGE). Es **preneoplásico**: predispone al **adenocarcinoma** del tercio inferior, más frecuente en hombres.' }],
      refs: [S('13:25'), S('14:05'), S('16:12')],
    },
    {
      id: 'dig06-d04',
      origen: 'practica',
      prio: 'P2',
      priority: 'muy-importante',
      ficha: 'diagnostico',
      question: '¿Qué estudios solicita ante un síndrome esofágico y qué aporta cada uno?',
      answer: [{ t: 'p', text: '**Esofagograma** (primero, no invasivo: pico de pájaro en acalasia, manzana mordida en cáncer); **manometría** (gold standard de acalasia); **endoscopía con biopsia** (certeza de cáncer, esofagitis, várices); **pH-metría ambulatoria** (la más confiable para reflujo).' }],
      refs: [S('21:38'), S('23:01'), S('23:42'), L('369')],
    },
    {
      id: 'dig06-d05',
      origen: 'practica',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'sintomas',
      question: 'Diferencie odinofagia de globo histérico.',
      answer: [{ t: 'p', text: '**Odinofagia:** dolor al tragar, orgánico; causa más frecuente faringoamigdalitis (también esofagitis por Cándida o fármacos). **Globo histérico:** sensación de cuerpo extraño en la garganta, funcional, en pacientes ansiosos o deprimidos.' }],
      refs: [S('07:49'), S('09:56'), S('10:39')],
    },
  ],

  mcq: [
    {
      id: 'dig06-q01',
      origen: 'practica',
      topic: 'Síntomas',
      difficulty: 1,
      emphasis: true,
      stem: 'El síntoma **más frecuente** del síndrome esofágico, según el profe, es:',
      options: [
        { text: 'Disfagia.', why: 'Es central, pero no la más frecuente.' },
        { text: 'Regurgitación.', why: 'Correcto: asociada a pirosis en más del 90 %.' },
        { text: 'Dolor torácico.', why: 'Es poco frecuente como consulta.' },
        { text: 'Odinofagia.', why: 'No.' },
      ],
      answer: 1,
      refs: [S('06:23')],
    },
    {
      id: 'dig06-q02',
      origen: 'practica',
      topic: 'Síntomas',
      difficulty: 1,
      stem: 'La causa más frecuente de **odinofagia** es:',
      options: [
        { text: 'Esofagitis por reflujo.', why: 'Causa odinofagia, pero no es la más frecuente.' },
        { text: 'Faringoamigdalitis.', why: 'Correcto: por eso primero se revisa la garganta.' },
        { text: 'Cáncer de esófago.', why: 'No.' },
        { text: 'Acalasia.', why: 'No.' },
      ],
      answer: 1,
      refs: [S('07:49'), L('368')],
    },
    {
      id: 'dig06-q03',
      origen: 'practica',
      topic: 'Etiologías',
      difficulty: 1,
      stem: 'La causa más frecuente de **esofagitis** es:',
      options: [
        { text: 'Cáusticos.', why: 'No es la más frecuente.' },
        { text: 'Enfermedad por reflujo gastroesofágico.', why: 'Correcto.' },
        { text: 'Cándida.', why: 'Es una causa infecciosa.' },
        { text: 'Radiación.', why: 'No.' },
      ],
      answer: 1,
      refs: [S('14:48')],
    },
    {
      id: 'dig06-q04',
      origen: 'practica',
      topic: 'Cáncer',
      difficulty: 2,
      emphasis: true,
      stem: 'El cáncer epidermoide de esófago se ubica típicamente en:',
      options: [
        { text: 'El tercio medio.', why: 'Correcto (90 %, tabaco y alcohol).' },
        { text: 'El tercio inferior, sobre Barrett.', why: 'Ese es el adenocarcinoma.' },
        { text: 'El esfínter superior.', why: 'No.' },
        { text: 'El cardias exclusivamente.', why: 'No.' },
      ],
      answer: 0,
      refs: [S('12:44'), L('368')],
    },
    {
      id: 'dig06-q05',
      origen: 'practica',
      topic: 'Barrett',
      difficulty: 2,
      emphasis: true,
      stem: 'El esófago de Barrett es:',
      options: [
        { text: 'Una displasia del tercio medio por alcohol.', why: 'No.' },
        { text: 'La metaplasia del tercio inferior a epitelio cilíndrico por reflujo crónico.', why: 'Correcto.' },
        { text: 'Un divertículo faringoesofágico.', why: 'Eso es Zenker.' },
        { text: 'La dilatación del esófago en la acalasia.', why: 'Eso es dolicomegaesófago.' },
      ],
      answer: 1,
      refs: [S('14:05')],
    },
    {
      id: 'dig06-q06',
      origen: 'practica',
      topic: 'ERGE',
      difficulty: 2,
      stem: 'Paciente con pirosis de años que comienza con **disfagia**. Esto es:',
      options: [
        { text: 'Esperable y benigno.', why: 'No: es alarma.' },
        { text: 'Un síntoma de alarma (estenosis péptica o adenocarcinoma).', why: 'Correcto.' },
        { text: 'Globo histérico.', why: 'No.' },
        { text: 'Signo de acalasia.', why: 'No es lo primero a pensar.' },
      ],
      answer: 1,
      refs: [L('369')],
    },
    {
      id: 'dig06-q07',
      origen: 'practica',
      topic: 'Diagnóstico',
      difficulty: 1,
      stem: '¿Qué estudio se pide **primero** ante un síndrome esofágico?',
      options: [
        { text: 'Endoscopía.', why: 'Es invasiva; se hace después.' },
        { text: 'Esofagograma con bario.', why: 'Correcto: el más útil y no invasivo.' },
        { text: 'Manometría.', why: 'Para confirmar acalasia.' },
        { text: 'Tomografía.', why: 'No es lo primero.' },
      ],
      answer: 1,
      refs: [S('22:21')],
    },
    {
      id: 'dig06-q08',
      origen: 'practica',
      topic: 'Diagnóstico',
      difficulty: 2,
      stem: 'El **gold standard** para diagnosticar acalasia es:',
      options: [
        { text: 'pH-metría.', why: 'Es para reflujo.' },
        { text: 'Manometría esofágica.', why: 'Correcto.' },
        { text: 'Esofagograma.', why: 'Sugiere (pico de pájaro) pero no confirma.' },
        { text: 'Biopsia.', why: 'No.' },
      ],
      answer: 1,
      refs: [S('23:01')],
    },
    {
      id: 'dig06-q09',
      origen: 'practica',
      topic: 'Acalasia',
      difficulty: 2,
      stem: 'En Argentina, una causa **secundaria** frecuente de acalasia es:',
      options: [
        { text: 'Chagas.', why: 'Correcto: destruye el plexo mientérico.' },
        { text: 'Helicobacter pylori.', why: 'No.' },
        { text: 'Reflujo.', why: 'No.' },
        { text: 'Alcohol.', why: 'No.' },
      ],
      answer: 0,
      refs: [S('19:37')],
    },
    {
      id: 'dig06-q10',
      origen: 'practica',
      topic: 'Diagnóstico',
      difficulty: 2,
      stem: 'Esofagograma con imagen en **manzana mordida**. El paso siguiente es:',
      options: [
        { text: 'Manometría.', why: 'No es para el cáncer.' },
        { text: 'Endoscopía con biopsia.', why: 'Correcto: extensión y diagnóstico de certeza.' },
        { text: 'pH-metría.', why: 'No.' },
        { text: 'Control en 6 meses.', why: 'No.' },
      ],
      answer: 1,
      refs: [S('23:42')],
    },
  ],

  memory: [
    {
      id: 'dig06-m01',
      title: 'Los 5 síntomas',
      purpose: 'Pregunta del preguntero.',
      evaluates: [{ t: 'list', items: ['Disfagia', 'Pirosis', 'Regurgitación', 'Odinofagia', 'Dolor torácico'] }],
      interpret: 'La regurgitación es la más frecuente.',
      mnemonic: { hook: 'D-P-R-O-D: «De Pronto Regurgito, Oh, Dolor».', explain: 'Una frase con los cinco en orden.' },
      recall: { q: 'Nombrá los 5 síntomas del síndrome esofágico y el más frecuente.', a: 'Disfagia, pirosis, regurgitación (la más frecuente), odinofagia, dolor torácico.' },
    },
    {
      id: 'dig06-m02',
      title: 'Epidermoide vs adenocarcinoma',
      purpose: 'Diferenciar los cánceres.',
      evaluates: [{ t: 'list', items: ['Epidermoide: 1/3 medio, tabaco y alcohol, 90 %', 'Adeno: 1/3 inferior, Barrett'] }],
      interpret: 'El adenocarcinoma sigue al reflujo; el epidermoide, al tabaco y al alcohol.',
      mnemonic: { hook: 'ADENO = ABAJO.', explain: 'El adenocarcinoma está en el tercio inferior.' },
      recall: { q: '¿Dónde se ubica cada cáncer de esófago y a qué se asocia?', a: 'Epidermoide: tercio medio, tabaco y alcohol. Adenocarcinoma: tercio inferior, Barrett/ERGE.' },
    },
    {
      id: 'dig06-m03',
      title: 'Qué estudio para qué',
      purpose: 'Responder diagnóstico.',
      evaluates: [{ t: 'list', items: ['Esofagograma: primero', 'Manometría: acalasia', 'Endoscopía: biopsia', 'pH-metría: reflujo'] }],
      interpret: 'De lo menos invasivo a lo que da certeza.',
      mnemonic: { hook: 'Foto → presión → mirar y cortar → medir ácido.', explain: 'Esofagograma, manometría, endoscopía con biopsia, pH-metría.' },
      recall: { q: '¿Cuál es el gold standard de la acalasia?', a: 'La manometría esofágica.' },
    },
  ],

  closing: {
    map: {
      center: 'Síndrome esofágico en una mirada',
      nodes: [
        { label: 'Síntomas', tone: 'sky', items: ['D-P-R-O-D', 'Regurgitación: la más frecuente', 'Odinofagia → garganta'] },
        { label: 'Etiologías', tone: 'lilac', items: ['Inflamatorias: ERGE', 'Motoras: acalasia', 'Tumorales · mecánicas'] },
        { label: 'Barrett', tone: 'peach', items: ['Metaplasia 1/3 inferior', 'Preneoplásico', 'Pirosis + disfagia = alarma'] },
        { label: 'Estudios', tone: 'rose', items: ['Esofagograma', 'Manometría', 'Endoscopía · pH-metría'] },
      ],
    },
    essentials: [
      '**5 síntomas**: disfagia, pirosis, **regurgitación** (la más frecuente), odinofagia, dolor torácico.',
      'Odinofagia: causa n.º 1 **faringoamigdalitis**; globo histérico = funcional.',
      'Etiologías: inflamatorias (**ERGE** n.º 1), motoras (**acalasia**), tumorales, mecánicas.',
      'Epidermoide: **1/3 medio**, tabaco y alcohol. Adenocarcinoma: **1/3 inferior**, sobre **Barrett**.',
      'Esofagograma primero; **manometría** = gold standard de acalasia; endoscopía con biopsia; pH-metría para reflujo.',
    ],
    links: [
      { chapterId: 'dig-01', text: '[[dig-01|Vómitos, disfagia y dispepsia]]: disfagia y acalasia en detalle.' },
      { chapterId: 'dig-07', text: '[[dig-07|Síndrome ulceroso y gastritis]]: el estómago, el siguiente tramo.' },
      { chapterId: 'dig-13', text: '[[dig-13|Cirrosis e hipertensión portal]]: las várices esofágicas.' },
    ],
    pitfalls: [
      'Decir que la disfagia es el síntoma más frecuente (es la **regurgitación**).',
      'Ubicar el epidermoide en el tercio inferior.',
      'Pedir endoscopía antes del esofagograma sin motivo.',
      'Confundir odinofagia (orgánica) con globo histérico (funcional).',
    ],
    miniExam: [
      {
        id: 'dig06-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Hombre de 60 años, «acidez toda la vida», ahora disfagia progresiva y pérdida de peso. Pensás en:',
        options: [
          { text: 'Adenocarcinoma del tercio inferior sobre Barrett.', why: 'Correcto.' },
          { text: 'Globo histérico.', why: 'No.' },
          { text: 'Epidermoide del tercio medio por Chagas.', why: 'No corresponde.' },
          { text: 'Faringoamigdalitis.', why: 'No.' },
        ],
        answer: 0,
        refs: [S('14:05'), S('14:48')],
      },
    ],
  },

  escenas,
  clase,
  diagrams: {},
};

export default chapter;
