import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * ren-03 — Síndrome nefrítico. Fuente: clase «Síndrome nefrítico» (Ortega) + libro p. 442–444.
 * Lo que marca el profe: la tríada de las 3 H (pregunta de parcial), la causa más frecuente (postestreptocócica) y el
 * antecedente de infección de garganta o piel («pregunta de parcial»). Mecanismo del descenso del filtrado y de la HTA:
 * se sigue el libro (colapso capilar con reabsorción tubular conservada; HTA volumen dependiente con SRAA reducido).
 * Patrones de biopsia: los del libro (lineal = anti-MBG, Goodpasture).
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const N = (t: string) => r('nefritico', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'ren-03',
  systemId: 'renal',
  title: 'Síndrome nefrítico',
  subtitle: 'Capilares glomerulares que se rompen: hematuria, HTA e hiperazoemia (las 3 H), oliguria y edema; la glomerulonefritis postestreptocócica y sus complicaciones.',
  estimatedMinutes: 35,
  sources: [N('00:02–22:01'), L('p442–444')],

  map: {
    center: 'Síndrome nefrítico',
    why: 'Dos preguntas de parcial que el profe marca: la **tríada de las 3 H** (hematuria, hipertensión, hiperazoemia) y el **antecedente de infección de garganta o de piel** de una o dos semanas antes (la **postestreptocócica**, la causa más frecuente).',
    prereqs: [
      { label: 'Hematuria glomerular (ren-01)', detail: 'Dismórfica, acantocitos, cilindros hemáticos.', chapterId: 'ren-01' },
      { label: 'Edema por permeabilidad (ren-01)', detail: 'El segundo mecanismo del edema renal.', chapterId: 'ren-01' },
    ],
    branches: [
      { id: 'mecanismo', label: 'Mecanismo', tone: 'red', items: ['Inmunocomplejos', 'Rotura capilar', '↓ Filtrado'] },
      { id: 'clinica', label: 'Las 3 H ★', tone: 'gold', items: ['Hematuria', 'Hipertensión', 'Hiperazoemia'] },
      { id: 'causa', label: 'Postestreptocócica ★', tone: 'peach', items: ['Faringitis o impétigo', '1–2 semanas antes', 'ASTO ↑, C3 ↓'] },
      { id: 'diagnostico', label: 'Diagnóstico y complicaciones', tone: 'sky', items: ['FENa < 1 %', 'Biopsia', 'IC, EAP, IRA'] },
    ],
    outcomes: [
      'Explicar por qué el nefrítico da **hematuria** y el nefrótico **proteinuria masiva**.',
      'Recitar la **tríada de las 3 H** y deducir el edema y la oliguria.',
      'Reconocer la **glomerulonefritis postestreptocócica** por el antecedente.',
      'Pedir los estudios y anticipar las **complicaciones**.',
    ],
  },

  theory: [
    {
      id: 'mecanismo',
      kicker: 'Fisiopatología',
      title: 'Capilares que se rompen',
      priority: 'imprescindible',
      summary: 'Nefrítico: rotura de capilares → hematuria y caída del filtrado → IRA. Nefrótico: ↑ permeabilidad → proteinuria masiva → IRC.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Hermano del nefrótico', text: 'En el nefrótico «hay un aumento de la permeabilidad de la membrana basal, no es que se me rompan los capilares». En el nefrítico, una infección o una causa inmunológica **destruye los capilares**: «si se rompen los capilares, pierde sangre». Y evolucionan distinto: el nefrítico hacia la **insuficiencia renal aguda**; el nefrótico, hacia la **crónica**.', refs: [N('00:42'), N('01:24'), N('02:04')] },
        { t: 'anim', id: 'glomerulo' },
        {
          t: 'cuadro',
          title: 'Nefrítico vs nefrótico (tapalo)',
          cols: [
            { t: 'Nefrítico', tone: 'red' },
            { t: 'Nefrótico', tone: 'gold' },
          ],
          rows: [
            { k: 'Lesión', v: ['**Rotura** de capilares (inflamación)', '↑ **permeabilidad** de la membrana basal'] },
            { k: 'Orina', v: ['**Hematuria** glomerular + cilindros hemáticos', '**Proteinuria** masiva, orina espumosa'] },
            { k: 'Proteinuria', v: ['**< 3,5 g/24 h**', '**> 3,5 g/24 h**'] },
            { k: 'Edema', v: ['Leve (párpados, tobillos), por **retención**', 'Importante, con fóvea, por ↓ **oncótica**'] },
            { k: 'Tensión arterial', v: ['**Alta** (volumen dependiente)', 'Normal o baja'] },
            { k: 'Evolución', v: ['**IRA**', '**IRC**'] },
          ],
          refs: [N('00:42'), N('02:04'), N('07:01'), L('p442')],
        },
      ],
      refs: [N('01:24'), N('13:49'), L('p443')],
    },
    {
      id: 'clinica',
      kicker: 'Lo que toma ★',
      title: 'La clínica: las 3 H',
      priority: 'imprescindible',
      summary: 'Hematuria, hipertensión e hiperazoemia; más oliguria, edema leve y proteinuria < 3,5 g.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«¿Cuál es la tríada característica del síndrome nefrítico? Son **las tres H**: **hematuria, hipertensión arterial, hiperazoemia**.» La hiperazoemia es la retención de productos nitrogenados: sube la **urea** y la **creatinina**.', refs: [N('03:30'), N('04:14')] },
        {
          t: 'triad',
          title: 'Síndrome nefrítico',
          items: ['Hematuria', 'Hipertensión arterial', 'Hiperazoemia'],
          plus: ['Edema', 'Oliguria'],
          plusLabel: 'Agregar edema y oliguria',
          center: '3 H',
          tone: 'red',
          note: 'El profe aclara que antes la tríada se decía con el **edema**; él la pide con la **hiperazoemia**, porque marca la evolución a la insuficiencia renal aguda.',
          refs: [N('04:14'), N('17:13')],
        },
        { t: 'anim', id: 'cascada' },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Orina', title: 'Oscura, amarronada', text: 'Poca (**oliguria**) y con sangre glomerular: rojizo amarronada, «Coca-Cola». Microscópica en el 70 %, macroscópica en el 30 %.', tone: 'red' },
            { tag: 'Edema', title: 'Leve', text: 'En **párpados** y maléolos, por retención de agua y sal; puede generalizarse si evoluciona rápido.', tone: 'sky' },
            { tag: 'HTA', title: 'La complicación más temida', text: '**Volumen dependiente** (la retención hidrosalina); cuesta bajarla rápido.', tone: 'gold' },
          ],
        },
      ],
      refs: [N('04:54'), N('05:36'), N('06:18'), N('07:42'), N('15:49'), N('16:31'), L('p443')],
    },
    {
      id: 'causa',
      kicker: 'Lo que toma ★',
      title: 'La causa más frecuente: postestreptocócica',
      priority: 'imprescindible',
      summary: 'Glomerulopatía primaria postinfecciosa (endocapilar, proliferativa) por estreptococo beta hemolítico del grupo A.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«Todo paciente que tiene un síndrome nefrítico… tienen que preguntar **si hace una semana o dos semanas tuvieron una infección**»: una **faringoamigdalitis** estreptocócica o una infección de **piel** (impétigo). Si dice que sí, hay un **80 %** de probabilidad de que sea postestreptocócica.', refs: [N('09:04'), N('09:45')] },
        {
          t: 'timeline',
          title: 'La historia típica',
          items: [
            { k: 'Día 0', t: 'Faringitis o impétigo', d: 'Estreptococo beta hemolítico del grupo A (*S. pyogenes*).', tone: 'peach' },
            { k: '1–2 semanas', t: 'Inmunocomplejos', d: 'Antígeno + anticuerpo circulan y se depositan en los capilares glomerulares.', tone: 'gold' },
            { k: 'Después', t: 'Síndrome nefrítico', d: 'Orina oscura, edema palpebral, HTA, oliguria.', tone: 'red' },
            { k: 'Evolución', t: 'Autolimitada', d: 'En general se resuelve; vigilar IRA y complicaciones.', tone: 'mint' },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Primarias', title: 'Postinfecciosa ★', text: 'También llamada **endocapilar** o proliferativa. Otras: por IgA (Berger), mesangiocapilar, con semilunas (rápidamente progresiva).', tone: 'peach' },
            { tag: 'Secundarias', title: 'Enfermedades sistémicas', text: '**Lupus**, vasculitis (PAN, granulomatosis con poliangeítis), Goodpasture, Schönlein-Henoch.', tone: 'lilac' },
            { tag: 'Por qué el riñón', title: 'Inmunocomplejos', text: 'Circulantes (de una infección lejana) o **in situ** (se forman en el glomérulo). Activan el complemento: **C3 bajo**.', tone: 'gold' },
          ],
        },
      ],
      refs: [N('07:42'), N('08:22'), N('10:25'), N('11:06'), N('12:29'), N('13:09'), L('p443')],
    },
    {
      id: 'diagnostico',
      kicker: 'Diagnóstico',
      title: 'Estudios y complicaciones',
      priority: 'muy-importante',
      summary: 'Sedimento nefrítico (hematuria dismórfica + cilindros hemáticos), FENa < 1 %, ASTO ↑ y C3 ↓.',
      blocks: [
        {
          t: 'scale',
          title: 'El laboratorio',
          items: [
            { k: 'Proteinuria 24 h', t: '< 3,5 g', d: 'No es rango nefrótico.', tone: 'gold' },
            { k: 'Sedimento', t: 'Nefrítico', d: 'Hematuria **dismórfica**, acantocitos y **cilindros hemáticos** (patognomónicos).', tone: 'red' },
            { k: 'Función renal', t: 'Urea y creatinina ↑', d: 'De leve deterioro a IRA (criterios RIFLE y AKIN).', tone: 'lilac' },
            { k: 'FENa', t: '< 1 %', d: 'No elimina sodio: lo está reteniendo.', tone: 'sky' },
            { k: 'Etiológico', t: 'ASTO ↑ · C3 ↓', d: 'Antiestreptolisinas altas e hipocomplementemia.', tone: 'peach' },
          ],
        },
        {
          t: 'cuadro',
          title: 'Biopsia: patrón de inmunofluorescencia (tapalo)',
          cols: [
            { t: 'Patrón', tone: 'lilac' },
            { t: 'Pensá en', tone: 'gold' },
          ],
          rows: [
            { k: 'Granular (70 %)', v: ['Depósitos con hipocomplementemia', '**Postinfecciosa**, lupus, glomerulopatías primarias'] },
            { k: 'Lineal (1 %)', v: ['Anticuerpos anti membrana basal', '**Goodpasture**'] },
            { k: 'Pauciinmune (30 %)', v: ['Sin depósitos, ANCA +', 'Wegener (granulomatosis con poliangeítis), PAN'] },
          ],
          caption: 'Biopsia si la hipocomplementemia persiste, hay IRA rápidamente progresiva, sospecha de enfermedad sistémica o el cuadro dura más de 4 semanas.',
          refs: [N('20:01'), N('20:41'), L('p444')],
        },
        {
          t: 'cards',
          cols: 4,
          items: [
            { tag: 'Volumen', title: 'Insuficiencia cardíaca', text: 'La hipervolemia sobrecarga al corazón: ingurgitación yugular.', tone: 'red' },
            { tag: 'Volumen', title: 'Edema agudo de pulmón', text: 'En los casos graves.', tone: 'peach' },
            { tag: 'HTA', title: 'Encefalopatía hipertensiva', text: 'Por la HTA severa.', tone: 'gold' },
            { tag: 'Riñón', title: 'IRA e hiperpotasemia', text: 'No excreta potasio: «va de la mano de la IRA».', tone: 'lilac' },
          ],
        },
      ],
      refs: [N('18:37'), N('19:19'), N('21:21'), N('22:01'), L('p444')],
    },
  ],

  developments: [
    {
      id: 'ren03-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'clinica',
      question: 'Defina síndrome nefrítico y nombre su tríada característica.',
      quote: { text: '«¿Cuál es la tríada característica del síndrome nefrítico? Son las tres H»', refs: [N('03:30')] },
      answer: [
        { t: 'p', text: 'Conjunto de signos y síntomas por **inflamación y lesión de los capilares glomerulares**, que colapsan y se rompen: cae el filtrado (reducción aguda o subaguda de la función renal).' },
        { t: 'p', text: '**Tríada (3 H):** **hematuria** glomerular (con cilindros hemáticos), **hipertensión arterial** (volumen dependiente) e **hiperazoemia** (↑ urea y creatinina). Además: **oliguria**, **edema** leve palpebral y maleolar, **proteinuria < 3,5 g/24 h**.' },
      ],
      refs: [N('04:14'), N('07:01'), L('p442')],
    },
    {
      id: 'ren03-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'causa',
      question: '¿Cuál es la causa más frecuente de síndrome nefrítico y cuál es su fisiopatología?',
      quote: { text: '«…tienen que preguntar si hace una semana o dos semanas tuvieron una infección»', refs: [N('09:04')] },
      answer: [
        { t: 'p', text: 'La **glomerulonefritis postinfecciosa** (endocapilar), sobre todo **postestreptocócica**: 1–2 semanas después de una **faringoamigdalitis** o un **impétigo** por estreptococo beta hemolítico del grupo A.' },
        { t: 'p', text: 'Se forman **inmunocomplejos** (circulantes o in situ) que se depositan en los capilares glomerulares y activan el complemento (**C3 bajo**). La inflamación rompe los capilares (**hematuria**, proteinuria leve) y los colapsa: cae el **filtrado**, el túbulo sigue reabsorbiendo agua y sal (**oliguria**, FENa < 1 %), hay **hipervolemia** con **HTA** y **edema**, y se retienen urea y creatinina (**hiperazoemia**).' },
      ],
      refs: [N('09:45'), N('11:06'), N('13:49'), N('14:29'), L('p443')],
    },
    {
      id: 'ren03-d03',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'mecanismo',
      question: 'Diferencie el síndrome nefrítico del nefrótico.',
      quote: { text: '«…no es que se me rompe los capilares, hay un aumento de la permeabilidad»', refs: [N('01:24')] },
      answer: [{ t: 'p', text: '**Nefrítico:** rotura capilar → hematuria glomerular, proteinuria < 3,5 g, HTA, oliguria, edema leve por retención; evoluciona a **IRA**. **Nefrótico:** ↑ permeabilidad de la membrana basal → proteinuria > 3,5 g, hipoalbuminemia, edema importante por ↓ oncótica, dislipemia; TA normal; evoluciona a **IRC**.' }],
      refs: [N('00:42'), N('02:04')],
    },
    {
      id: 'ren03-d04',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'diagnostico',
      question: '¿Qué estudios pide y qué complicaciones puede tener el síndrome nefrítico?',
      quote: { text: '«…la proteinuria, la orina completa, la evaluación de la función renal, la excreción fraccional del sodio, el hemograma»', refs: [N('18:37')] },
      answer: [
        { t: 'p', text: '**Estudios:** proteinuria de 24 h (< 3,5 g), orina completa (hematuria dismórfica, **cilindros hemáticos**), función renal (urea, creatinina), **FENa < 1 %**, hemograma (hemodilución); etiológicos: **ASTO ↑**, **C3 ↓**; biopsia en casos seleccionados.' },
        { t: 'p', text: '**Complicaciones:** insuficiencia cardíaca, edema agudo de pulmón, **IRA**, encefalopatía hipertensiva, hiperpotasemia.' },
      ],
      refs: [N('19:19'), N('20:01'), N('21:21'), L('p444')],
    },
  ],

  mcq: [
    {
      id: 'ren03-q01',
      topic: 'Tríada',
      difficulty: 1,
      emphasis: true,
      stem: 'La tríada de las «3 H» del síndrome nefrítico es:',
      options: [
        { text: 'Hematuria, hipertensión, hiperazoemia.', why: 'Correcto.' },
        { text: 'Hipoalbuminemia, hiperlipemia, hematuria.', why: 'Mezcla nefrótico.' },
        { text: 'Hematuria, hipotensión, hipocalcemia.', why: 'No.' },
        { text: 'Hiperglucemia, hipertensión, hematuria.', why: 'No.' },
      ],
      answer: 0,
      refs: [N('04:14')],
    },
    {
      id: 'ren03-q02',
      topic: 'Etiología',
      difficulty: 1,
      emphasis: true,
      stem: 'La causa más frecuente de síndrome nefrítico es:',
      options: [
        { text: 'La glomerulonefritis postestreptocócica.', why: 'Correcto.' },
        { text: 'La nefropatía diabética.', why: 'Da proteinuria/nefrótico.' },
        { text: 'La litiasis renal.', why: 'Da hematuria no glomerular.' },
        { text: 'La pielonefritis.', why: 'Es una infección urinaria.' },
      ],
      answer: 0,
      refs: [N('08:22'), N('09:04')],
    },
    {
      id: 'ren03-q03',
      topic: 'Etiología',
      difficulty: 2,
      emphasis: true,
      stem: 'Ante un síndrome nefrítico, el antecedente que siempre hay que preguntar es:',
      options: [
        { text: 'Faringitis o infección de piel 1–2 semanas antes.', why: 'Correcto.' },
        { text: 'Consumo de alcohol.', why: 'No.' },
        { text: 'Cirugía abdominal reciente.', why: 'No.' },
        { text: 'Viaje a zona endémica de malaria.', why: 'Es una causa rara.' },
      ],
      answer: 0,
      refs: [N('09:04'), N('18:37')],
    },
    {
      id: 'ren03-q04',
      topic: 'Mecanismo',
      difficulty: 2,
      stem: 'La lesión glomerular del síndrome nefrítico se diferencia de la del nefrótico porque hay:',
      options: [
        { text: 'Rotura de los capilares glomerulares.', why: 'Correcto.' },
        { text: 'Solo aumento de la permeabilidad a proteínas.', why: 'Es el nefrótico.' },
        { text: 'Obstrucción del túbulo colector.', why: 'No.' },
        { text: 'Lesión del túbulo proximal.', why: 'No.' },
      ],
      answer: 0,
      refs: [N('01:24')],
    },
    {
      id: 'ren03-q05',
      topic: 'Laboratorio',
      difficulty: 2,
      stem: 'El hallazgo del sedimento más característico del síndrome nefrítico es:',
      options: [
        { text: 'Cilindros hemáticos.', why: 'Correcto: patognomónicos.' },
        { text: 'Cilindros grasos.', why: 'Son del nefrótico.' },
        { text: 'Coágulos.', why: 'Son de la hematuria urológica.' },
        { text: 'Cristales de ácido úrico.', why: 'No.' },
      ],
      answer: 0,
      refs: [N('13:49'), L('p444')],
    },
    {
      id: 'ren03-q06',
      topic: 'Laboratorio',
      difficulty: 2,
      stem: 'En la glomerulonefritis postestreptocócica esperás encontrar:',
      options: [
        { text: 'ASTO elevado y C3 disminuido.', why: 'Correcto.' },
        { text: 'ASTO normal y C3 elevado.', why: 'Al revés.' },
        { text: 'Anticuerpos anti membrana basal.', why: 'Son de Goodpasture.' },
        { text: 'Proteinuria > 3,5 g.', why: 'Es < 3,5 g.' },
      ],
      answer: 0,
      refs: [N('20:01'), L('p444')],
    },
    {
      id: 'ren03-q07',
      topic: 'Laboratorio',
      difficulty: 3,
      stem: 'La excreción fraccional de sodio en el síndrome nefrítico es:',
      options: [
        { text: 'Menor al 1 % (retiene sodio).', why: 'Correcto.' },
        { text: 'Mayor al 3 %.', why: 'No.' },
        { text: 'Siempre normal.', why: 'No.' },
        { text: 'No se puede medir.', why: 'Sí se mide.' },
      ],
      answer: 0,
      refs: [N('15:09'), N('19:19')],
    },
    {
      id: 'ren03-q08',
      topic: 'Clínica',
      difficulty: 2,
      stem: 'La hipertensión arterial del síndrome nefrítico se debe principalmente a:',
      options: [
        { text: 'La retención de agua y sal (hipervolemia).', why: 'Correcto: volumen dependiente.' },
        { text: 'La hipoalbuminemia.', why: 'No.' },
        { text: 'El dolor.', why: 'No.' },
        { text: 'La deshidratación.', why: 'Al revés.' },
      ],
      answer: 0,
      refs: [N('06:18'), N('16:31'), L('p443')],
    },
    {
      id: 'ren03-q09',
      topic: 'Complicaciones',
      difficulty: 2,
      stem: '¿Cuál **no** es una complicación típica del síndrome nefrítico?',
      options: [
        { text: 'Hipoglucemia.', why: 'Correcto: no es típica.' },
        { text: 'Edema agudo de pulmón.', why: 'Sí lo es.' },
        { text: 'Encefalopatía hipertensiva.', why: 'Sí lo es.' },
        { text: 'Hiperpotasemia.', why: 'Sí lo es.' },
      ],
      answer: 0,
      refs: [N('21:21'), L('p444')],
    },
    {
      id: 'ren03-q10',
      topic: 'Evolución',
      difficulty: 2,
      stem: 'El síndrome nefrítico tiende a evolucionar hacia:',
      options: [
        { text: 'La insuficiencia renal aguda.', why: 'Correcto.' },
        { text: 'La insuficiencia renal crónica, siempre.', why: 'Es lo típico del nefrótico.' },
        { text: 'La litiasis.', why: 'No.' },
        { text: 'La poliuria.', why: 'Hay oliguria.' },
      ],
      answer: 0,
      refs: [N('02:04')],
    },
  ],

  memory: [
    {
      id: 'ren03-m01',
      title: 'Las 3 H',
      purpose: '«Pregunta de parcial».',
      evaluates: [{ t: 'list', items: ['Hematuria', 'Hipertensión', 'Hiperazoemia'] }],
      interpret: 'Más oliguria, edema leve y proteinuria < 3,5 g.',
      mnemonic: { hook: 'Sangre, presión y urea: las 3 H del que se rompe.', explain: 'Hematuria, HTA, hiperazoemia.' },
      recall: { q: '¿Cuál es la tríada del síndrome nefrítico?', a: 'Hematuria, hipertensión arterial e hiperazoemia (las 3 H).' },
    },
    {
      id: 'ren03-m02',
      title: 'Postestreptocócica',
      purpose: 'La causa más frecuente.',
      evaluates: [{ t: 'list', items: ['Faringitis o impétigo', '1–2 semanas antes', 'ASTO ↑, C3 ↓'] }],
      interpret: 'Inmunocomplejos en los capilares glomerulares.',
      mnemonic: { hook: 'Garganta o piel hace 2 semanas → orina Coca-Cola hoy.', explain: 'El antecedente que hay que preguntar.' },
      recall: { q: '¿Qué antecedente buscás ante un síndrome nefrítico y qué laboratorio lo confirma?', a: 'Faringoamigdalitis o infección de piel estreptocócica 1–2 semanas antes; ASTO elevado y C3 bajo.' },
    },
    {
      id: 'ren03-m03',
      title: 'Nefrítico vs nefrótico',
      purpose: 'El diferencial de siempre.',
      evaluates: [{ t: 'list', items: ['Rotura vs permeabilidad', 'Hematuria vs proteinuria > 3,5 g', 'IRA vs IRC'] }],
      interpret: 'La HTA es del nefrítico.',
      mnemonic: { hook: 'nefrÍtico = Inflamación (rotura, sangre). nefrÓtico = Oncótica (proteínas).', explain: 'La vocal distinta guía el mecanismo.' },
      recall: { q: '¿Qué diferencia la lesión del nefrítico de la del nefrótico?', a: 'En el nefrítico se rompen los capilares (hematuria); en el nefrótico aumenta la permeabilidad de la membrana basal (proteinuria masiva).' },
    },
  ],

  closing: {
    map: {
      center: 'Síndrome nefrítico en una mirada',
      nodes: [
        { label: 'Mecanismo', tone: 'red', items: ['Inmunocomplejos', 'Rotura capilar', '↓ FG, oliguria'] },
        { label: 'Las 3 H ★', tone: 'gold', items: ['Hematuria', 'HTA', 'Hiperazoemia'] },
        { label: 'Postestreptocócica ★', tone: 'peach', items: ['Garganta o piel', '1–2 semanas', 'ASTO ↑ C3 ↓'] },
        { label: 'Complicaciones', tone: 'sky', items: ['IC, EAP', 'Encefalopatía HTA', 'IRA, ↑ K'] },
      ],
    },
    essentials: [
      'Inflamación con **rotura** de los capilares glomerulares (no solo ↑ permeabilidad como en el nefrótico).',
      '**3 H**: hematuria glomerular (cilindros hemáticos), hipertensión, hiperazoemia. Más oliguria, edema leve, proteinuria < 3,5 g.',
      'Cae el filtrado y el túbulo retiene agua y sal (**FENa < 1 %**) → hipervolemia → HTA volumen dependiente y edema.',
      'Causa más frecuente: **postestreptocócica** (faringitis o impétigo 1–2 semanas antes). ASTO ↑, **C3 ↓**.',
      'Biopsia: granular (postinfecciosa, lupus), lineal (Goodpasture), pauciinmune (ANCA).',
      'Complicaciones: IC, EAP, **IRA**, encefalopatía hipertensiva, hiperpotasemia.',
    ],
    links: [
      { chapterId: 'ren-04', text: '[[ren-04|Síndrome nefrótico]]: el hermano, con proteinuria masiva.' },
      { chapterId: 'ren-05', text: '[[ren-05|Insuficiencia renal]]: hacia donde evoluciona el nefrítico.' },
      { chapterId: 'ren-01', text: '[[ren-01|Motivos de consulta]]: la hematuria glomerular.' },
    ],
    pitfalls: [
      'Poner el edema en lugar de la hiperazoemia en la tríada que pide el profe.',
      'Decir que la proteinuria es de rango nefrótico.',
      'Olvidar preguntar por la infección de garganta o piel.',
      'Confundir el patrón lineal (Goodpasture) con el granular (postinfecciosa).',
    ],
    miniExam: [
      {
        id: 'ren03-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Niño de 8 años con párpados hinchados, orina color Coca-Cola y TA 150/95; tuvo una angina hace 2 semanas. Pensás en:',
        options: [
          { text: 'Glomerulonefritis postestreptocócica (síndrome nefrítico).', why: 'Correcto.' },
          { text: 'Síndrome nefrótico por cambios mínimos.', why: 'No tendría HTA ni hematuria.' },
          { text: 'Infección urinaria.', why: 'No explica la HTA ni el edema.' },
          { text: 'Litiasis renal.', why: 'No.' },
        ],
        answer: 0,
        refs: [N('09:04'), N('04:14'), L('p444')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
