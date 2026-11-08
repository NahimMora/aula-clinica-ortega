import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-14 — Insuficiencia hepática. Fuente: clase «Insuficiencia hepática» (Ortega).
 * Preguntero: P12–P15 del bloque de hígado. La tabla de grados de West Haven es estándar: el profe enumera los grados
 * (subclínico a IV) sin pedir la tabla; lo que pide es O'Grady, la encefalopatía y el diferencial aguda vs crónica.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const I = (t: string) => r('ih', t);

const chapter: Chapter = {
  id: 'dig-14',
  systemId: 'digestivo',
  title: 'Insuficiencia hepática',
  subtitle: 'Lo que el hígado deja de hacer: O’Grady, encefalopatía hepática (el amoníaco), manifestaciones sistémicas y aguda vs crónica.',
  estimatedMinutes: 35,
  sources: [I('00:02–50:00')],

  map: {
    center: 'Insuficiencia hepática',
    why: 'El profe marca tres cosas: la clasificación de **O’Grady** («esta no me la pueden no saber»), la **encefalopatía hepática** («si no la saben, **los van a bochar**») y el **diferencial aguda vs crónica** («pregunta de examen puede ser»).',
    prereqs: [
      { label: 'Cirrosis (dig-13)', detail: 'La crónica es el estadio final de la cirrosis.', chapterId: 'dig-13' },
      { label: 'Funciones del hígado', detail: '«Para entender la insuficiencia hay que saber qué hace el hígado.»' },
    ],
    branches: [
      { id: 'funciones', label: 'Qué deja de hacer', tone: 'sky', items: ['Albúmina → edema', 'Coagulación → sangrado', 'Urea → amoníaco'] },
      { id: 'aguda', label: 'Aguda ★', tone: 'peach', items: ['O’Grady', 'Bernuau', 'Paracetamol'] },
      { id: 'encefalopatia', label: 'Encefalopatía ★', tone: 'lilac', items: ['Amoníaco → glutamina', 'Edema cerebral', 'Asterixis'] },
      { id: 'cronica', label: 'Aguda vs crónica', tone: 'red', items: ['Súbita vs gradual', 'Necrosis vs cirrosis', 'Extrapiramidal'] },
    ],
    outcomes: [
      'Deducir la clínica a partir de las **funciones** que se pierden.',
      'Clasificar la insuficiencia aguda según **O’Grady**.',
      'Explicar la **encefalopatía hepática** y reconocer su **tríada**.',
      'Diferenciar insuficiencia **aguda** de **crónica**.',
    ],
  },

  theory: [
    {
      id: 'funciones',
      kicker: 'Fisiopatología',
      title: 'Qué es y qué deja de hacer el hígado',
      priority: 'imprescindible',
      summary: 'Se perdió más del 80–90 % de la función hepática. Síndrome grave, mortalidad 40–80 %: el tratamiento definitivo es el trasplante.',
      blocks: [
        { t: 'anim', id: 'funciones' },
        { t: 'callout', kind: 'prof', title: 'Cómo estudiarla', text: '«Si esto hace un hígado normal, ¿qué hace un hígado insuficiente? **Todo lo contrario**.» No fabrica proteínas ni factores de coagulación, no transforma el amoníaco en urea, no desintoxica la sangre.', refs: [I('04:11'), I('04:52'), I('05:32')] },
      ],
      refs: [I('00:42'), I('06:14'), I('06:55'), I('07:35')],
    },
    {
      id: 'aguda',
      kicker: 'Lo que toma ★',
      title: 'Insuficiencia hepática aguda: O’Grady y Bernuau',
      priority: 'imprescindible',
      summary: 'Lo que define el tipo es cuándo aparece la encefalopatía.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Sí o sí', text: '«El que ustedes tienen que saber sí o sí es el según **O’Grady**… **esta no me la pueden no saber**.» Clasifica según cuándo aparece la **encefalopatía**.', refs: [I('08:15')] },
        {
          t: 'timeline',
          title: 'O’Grady (como lo da el profe)',
          items: [
            { k: '< 8 días', t: 'Hiperaguda', d: 'Encefalopatía muy brusca.', tone: 'red' },
            { k: '8 a 28 días', t: 'Aguda', tone: 'peach' },
            { k: '4 a 24 semanas', t: 'Subaguda', tone: 'gold' },
          ],
        },
        {
          t: 'compare',
          title: 'Bernuau: desde la ictericia hasta la encefalopatía',
          cols: [
            { title: 'Fulminante', tone: 'red', items: ['Encefalopatía **dentro de las 2 semanas** de iniciada la ictericia'] },
            { title: 'Subfulminante', tone: 'peach', items: ['Encefalopatía entre las **2 y 12 semanas**'] },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Fármacos', title: 'Paracetamol', text: 'Máximo 4 g/día; más de **6 g/día** varios días puede dar una **falla hepática fulminante**.', tone: 'red' },
            { tag: 'Otras', title: 'Virus, Wilson, embarazo', text: 'Hepatitis virales, Wilson, hemocromatosis neonatal, tirosinemia; esteatosis gravídica, HELLP.', tone: 'lilac' },
            { tag: 'Pronóstico', title: 'Siempre malo', text: '«Todo paciente con insuficiencia hepática ya tiene un pronóstico malo»: alta mortalidad.', tone: 'gold' },
          ],
        },
      ],
      refs: [I('08:15'), I('08:55'), I('09:35'), I('10:15'), I('12:15'), I('12:56'), I('14:16')],
    },
    {
      id: 'encefalopatia',
      kicker: 'Lo que toma ★',
      title: 'Encefalopatía hepática',
      priority: 'imprescindible',
      summary: 'El amoníaco que el hígado no convierte en urea llega al cerebro: edema cerebral, alteración de la conciencia y asterixis.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Para no bochar', text: '«La encefalopatía hepática: pregunta de **parcial, choice, oral y final**. Si no saben encefalopatía hepática **los van a bochar**: tienen que sabérsela sí o sí.»', refs: [I('19:02')] },
        { t: 'anim', id: 'amonio' },
        { t: 'triad', title: 'Encefalopatía hepática', items: ['Ictericia', 'Alteración de la conciencia', 'Asterixis (alteraciones motoras)'], center: 'Encefalopatía', tone: 'lilac', note: '«Piensen en una encefalopatía hepática **hasta que se demuestre lo contrario**.» La asterixis es un temblor aleteante (flapping) de las manos.', refs: [I('25:17'), I('26:37')] },
        {
          t: 'scale',
          title: 'Grados (tabla de West Haven, estándar)',
          items: [
            { k: '0', t: 'Subclínica', d: 'Asintomática: solo pruebas psicométricas.', tone: 'mint' },
            { k: 'I', t: 'Leve', d: 'Euforia o ansiedad, déficit de atención, inversión del ritmo sueño-vigilia.', tone: 'sky' },
            { k: 'II', t: 'Letargo', d: 'Desorientación, **asterixis** evidente.', tone: 'gold' },
            { k: 'III', t: 'Estupor', d: 'Somnolencia, confusión marcada; responde a estímulos.', tone: 'peach' },
            { k: 'IV', t: 'Coma', tone: 'red' },
          ],
          caption: 'El profe enumera los estadios (subclínico a IV) y aclara que no hace falta memorizar la tabla: lo que se pide es entender el mecanismo y reconocer la tríada.',
        },
      ],
      refs: [I('19:02'), I('19:43'), I('20:23'), I('24:37'), I('27:18'), I('40:23'), I('41:03')],
    },
    {
      id: 'sistemicas',
      kicker: 'Clínica',
      title: 'Manifestaciones hepáticas y sistémicas',
      priority: 'muy-importante',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Hepáticas', title: 'Ictericia rápida', text: 'Predominio **directo**; transaminasas altas al inicio que caen al final; ↓ seudocolinesterasa, ↓ albúmina, ↓ factores.', tone: 'gold' },
            { tag: 'Coagulación', title: 'Hemorragias', text: 'Coagulopatía, CID; sangrado digestivo alto frecuente.', tone: 'red' },
            { tag: 'Inmunidad', title: 'Infecciones', text: 'Sin proteínas ni opsonización: paciente **inmunocomprometido**.', tone: 'mint' },
            { tag: 'Metabólicas', title: 'Hipoglucemia y electrolitos', text: 'Hipoglucemia, hipopotasemia (diuréticos), hiponatremia; **acidosis metabólica** con alcalosis respiratoria.', tone: 'peach' },
            { tag: 'Renal', title: 'Insuficiencia prerrenal', text: 'Casi la mitad: por hipoperfusión.', tone: 'sky' },
            { tag: 'Hormonal', title: '↑ estrógenos', text: 'Ginecomastia, atrofia testicular (hábito de Chvostek); aliento hepático.', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'note', title: 'Diagnóstico', text: 'El interrogatorio suele ser **indirecto** (el paciente llega confuso). Laboratorio: glucemia, bilirrubina (directa), **tiempo de protrombina prolongado**, pH (la acidosis es de muy mal pronóstico), transaminasas, amoniemia.', refs: [I('36:13'), I('37:37'), I('48:35')] },
      ],
      refs: [I('16:19'), I('17:41'), I('27:58'), I('29:19'), I('31:23'), I('33:23'), I('35:31')],
    },
    {
      id: 'cronica',
      kicker: 'Lo que toma',
      title: 'Aguda vs crónica',
      priority: 'imprescindible',
      summary: 'La crónica es el estadio final de la cirrosis: predomina la encefalopatía crónica, con síndrome extrapiramidal.',
      blocks: [
        { t: 'callout', kind: 'prof', text: '«Es un **diagnóstico diferencial**, **pregunta de examen puede ser**: la crónica se diferencia porque hay un **síndrome extrapiramidal**.»', refs: [I('47:55')] },
        {
          t: 'cuadro',
          title: 'Aguda vs crónica (tapalo)',
          cols: [
            { t: 'Aguda', tone: 'red' },
            { t: 'Crónica', tone: 'lilac' },
          ],
          rows: [
            { k: 'Instalación', v: ['**Súbita**, progresiva', '**Gradual**'] },
            { k: 'Hígado', v: ['**Necrosis** masiva', '**Cirrosis** (estadio final)'] },
            { k: 'Cerebro', v: ['**Edema cerebral** (causa de muerte)', 'Encefalopatía crónica: neuropsiquiátrica'] },
            { k: 'Signo distintivo', v: ['Ictericia + conciencia + asterixis', '**Síndrome extrapiramidal** (parkinsonismo)'] },
            { k: 'Falla multiorgánica', v: ['Masiva', 'Menor'] },
            { k: 'Desencadenante', v: ['Virus, paracetamol, tóxicos', '**Precipitantes**: hemorragia digestiva, infecciones, diuréticos, hipopotasemia'] },
          ],
          refs: [I('38:19'), I('39:01'), I('44:32'), I('49:16'), I('49:58')],
        },
        { t: 'callout', kind: 'tip', title: 'Por qué el extrapiramidal', text: 'El amoníaco (y la bilirrubina) se acumulan en los **núcleos de la base** (sustancia negra, putamen, caudado): baja la **dopamina** y aparece un cuadro tipo Parkinson. Además: cambios de personalidad, deterioro intelectual, asterixis.', refs: [I('42:30'), I('43:11'), I('44:32'), I('45:12')] },
      ],
      refs: [I('38:19'), I('47:55')],
    },
  ],

  developments: [
    {
      id: 'dig14-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'aguda',
      question: 'Defina insuficiencia hepática aguda y clasifíquela.',
      quote: { text: '«Según O’Grady… este sí o sí tienen que saber… esta no me pueden no saber»', refs: [I('08:15')] },
      answer: [
        { t: 'p', text: 'Pérdida súbita de más del 80–90 % de la función hepática, sin hepatopatía previa, con **encefalopatía**; mortalidad 40–80 %, trasplante.' },
        { t: 'p', text: '**O’Grady** (desde el inicio de los síntomas hasta la encefalopatía): **hiperaguda** < 8 días · **aguda** 8–28 días · **subaguda** 4–24 semanas. **Bernuau** (desde la ictericia): **fulminante** < 2 semanas · **subfulminante** 2–12 semanas.' },
      ],
      refs: [I('06:14'), I('08:55'), I('09:35'), I('10:15')],
    },
    {
      id: 'dig14-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'encefalopatia',
      question: '¿Qué es la encefalopatía hepática, por qué se produce y cómo se clasifica?',
      quote: { text: '«…no saben encefalopatía hepática, lo van a bochar»', refs: [I('19:02')] },
      answer: [
        { t: 'p', text: 'Síndrome neuropsiquiátrico por el **amoníaco** que el hígado insuficiente no convierte en urea: atraviesa la barrera hematoencefálica, en el cerebro se forma **glutamina** (osmótica) → **edema cerebral** e hipertensión endocraneana (principal causa de muerte en la fulminante).' },
        { t: 'p', text: '**Tríada:** ictericia + alteración de la conciencia + **asterixis**. **Grados:** 0 subclínica · I alteraciones leves y del sueño · II letargo, asterixis · III estupor · IV coma.' },
      ],
      refs: [I('19:43'), I('20:23'), I('26:37'), I('27:18'), I('41:03')],
    },
    {
      id: 'dig14-d03',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'cronica',
      question: '¿Qué es la insuficiencia hepática crónica? Diferénciela de la aguda.',
      quote: { text: '«…un diagnóstico diferencial, pregunta de examen puede ser»', refs: [I('47:55')] },
      answer: [{ t: 'p', text: 'Estadio final de la **cirrosis**: instalación gradual, predominio de la **encefalopatía crónica** (neuropsiquiátrica) con **síndrome extrapiramidal**; suele descompensarse por precipitantes (hemorragia digestiva, infecciones, diuréticos). La **aguda** es súbita, con necrosis masiva, edema cerebral y falla multiorgánica.' }],
      refs: [I('38:19'), I('39:01'), I('47:55'), I('49:16')],
    },
  ],

  mcq: [
    {
      id: 'dig14-q01',
      topic: 'O’Grady',
      difficulty: 2,
      emphasis: true,
      stem: 'Según O’Grady, una insuficiencia hepática con encefalopatía a los **5 días** del inicio es:',
      options: [
        { text: 'Hiperaguda.', why: 'Correcto (< 8 días).' },
        { text: 'Aguda.', why: 'Es de 8 a 28 días.' },
        { text: 'Subaguda.', why: 'Es de 4 a 24 semanas.' },
        { text: 'Crónica.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('08:55')],
    },
    {
      id: 'dig14-q02',
      topic: 'Encefalopatía',
      difficulty: 1,
      emphasis: true,
      stem: 'La sustancia responsable de la encefalopatía hepática es:',
      options: [
        { text: 'El amoníaco.', why: 'Correcto.' },
        { text: 'La bilirrubina indirecta.', why: 'Da kernicterus en el neonato.' },
        { text: 'La urea.', why: 'Es lo que el hígado ya no produce.' },
        { text: 'El colesterol.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('19:43'), I('20:23')],
    },
    {
      id: 'dig14-q03',
      topic: 'Encefalopatía',
      difficulty: 2,
      stem: 'El signo motor más característico de la encefalopatía hepática es:',
      options: [
        { text: 'La asterixis (temblor aleteante).', why: 'Correcto.' },
        { text: 'El temblor de reposo.', why: 'Es del Parkinson.' },
        { text: 'El signo de Babinski.', why: 'No.' },
        { text: 'La rigidez de nuca.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('24:37'), I('25:17')],
    },
    {
      id: 'dig14-q04',
      topic: 'Encefalopatía',
      difficulty: 3,
      stem: 'La causa de muerte más frecuente en la falla hepática fulminante es:',
      options: [
        { text: 'El edema cerebral con hipertensión endocraneana.', why: 'Correcto.' },
        { text: 'La ictericia.', why: 'No mata por sí misma.' },
        { text: 'La hipoglucemia.', why: 'Es grave, pero no la principal.' },
        { text: 'La ascitis.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('27:18')],
    },
    {
      id: 'dig14-q05',
      topic: 'Fisiopatología',
      difficulty: 1,
      stem: 'El paciente con insuficiencia hepática sangra porque:',
      options: [
        { text: 'El hígado no fabrica factores de coagulación.', why: 'Correcto.' },
        { text: 'Tiene demasiadas plaquetas.', why: 'No.' },
        { text: 'Hay exceso de albúmina.', why: 'Hay déficit.' },
        { text: 'Por el amoníaco.', why: 'No es la causa del sangrado.' },
      ],
      answer: 0,
      refs: [I('05:32'), I('29:19')],
    },
    {
      id: 'dig14-q06',
      topic: 'Etiología',
      difficulty: 2,
      stem: '¿Qué fármaco advierte el profe que puede producir una falla hepática fulminante por automedicación?',
      options: [
        { text: 'Paracetamol (más de 6 g/día).', why: 'Correcto.' },
        { text: 'Omeprazol.', why: 'No.' },
        { text: 'Amoxicilina.', why: 'No es el ejemplo.' },
        { text: 'Metformina.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('12:56'), I('13:36')],
    },
    {
      id: 'dig14-q07',
      topic: 'Aguda vs crónica',
      difficulty: 2,
      emphasis: true,
      stem: 'Lo que distingue a la insuficiencia hepática **crónica** de la aguda es:',
      options: [
        { text: 'El síndrome extrapiramidal.', why: 'Correcto.' },
        { text: 'La ictericia.', why: 'Está en las dos.' },
        { text: 'El edema cerebral.', why: 'Es de la aguda.' },
        { text: 'La necrosis masiva.', why: 'Es de la aguda.' },
      ],
      answer: 0,
      refs: [I('47:55')],
    },
    {
      id: 'dig14-q08',
      topic: 'Metabólicas',
      difficulty: 2,
      stem: 'El trastorno ácido-base típico de la insuficiencia hepática es:',
      options: [
        { text: 'Acidosis metabólica con alcalosis respiratoria compensadora.', why: 'Correcto.' },
        { text: 'Alcalosis metabólica pura.', why: 'No es lo típico según la clase.' },
        { text: 'Acidosis respiratoria.', why: 'No.' },
        { text: 'Ninguno.', why: 'No.' },
      ],
      answer: 0,
      refs: [I('33:23'), I('34:04')],
    },
  ],

  memory: [
    {
      id: 'dig14-m01',
      title: 'O’Grady',
      purpose: '«No me la pueden no saber».',
      evaluates: [{ t: 'list', items: ['Hiperaguda < 8 días', 'Aguda 8–28 días', 'Subaguda 4–24 semanas'] }],
      interpret: 'Se mide hasta que aparece la encefalopatía.',
      mnemonic: { hook: '«8 – 28 – 24»: una semana, un mes, medio año.', explain: 'Los cortes de O’Grady.' },
      recall: { q: '¿Cómo clasifica O’Grady la insuficiencia hepática aguda?', a: 'Hiperaguda (< 8 días), aguda (8–28 días) y subaguda (4–24 semanas), según cuándo aparece la encefalopatía.' },
    },
    {
      id: 'dig14-m02',
      title: 'Encefalopatía hepática',
      purpose: '«Los van a bochar».',
      evaluates: [{ t: 'list', items: ['Amoníaco → glutamina → edema cerebral', 'Ictericia + conciencia + asterixis'] }],
      interpret: 'El culpable es el amoníaco.',
      mnemonic: { hook: 'Amarillo, dormido y aleteando.', explain: 'Ictericia, alteración de la conciencia, asterixis.' },
      recall: { q: '¿Cuál es la tríada de la encefalopatía hepática?', a: 'Ictericia, alteración de la conciencia y asterixis.' },
    },
    {
      id: 'dig14-m03',
      title: 'Aguda vs crónica',
      purpose: 'Diferencial de examen.',
      evaluates: [{ t: 'list', items: ['Aguda: súbita, necrosis, edema cerebral', 'Crónica: gradual, cirrosis, extrapiramidal'] }],
      interpret: 'La crónica descompensa por precipitantes.',
      mnemonic: { hook: 'Crónica = Cirrosis + Caminar como Parkinson.', explain: 'Síndrome extrapiramidal en la crónica.' },
      recall: { q: '¿Qué signo distingue a la insuficiencia hepática crónica?', a: 'El síndrome extrapiramidal (parkinsonismo) por daño de los núcleos de la base.' },
    },
  ],

  closing: {
    map: {
      center: 'Insuficiencia hepática en una mirada',
      nodes: [
        { label: 'Qué deja de hacer', tone: 'sky', items: ['Albúmina → edema', 'Coagulación → sangrado', 'Urea → amoníaco'] },
        { label: 'Aguda ★', tone: 'peach', items: ['O’Grady 8 – 28 – 24', 'Bernuau', 'Paracetamol'] },
        { label: 'Encefalopatía ★', tone: 'lilac', items: ['Glutamina → edema', 'Asterixis', 'Tríada'] },
        { label: 'Crónica', tone: 'red', items: ['Fin de la cirrosis', 'Extrapiramidal', 'Precipitantes'] },
      ],
    },
    essentials: [
      'Insuficiencia hepática: pérdida > 80–90 % de la función; mortalidad 40–80 %; trasplante.',
      '**O’Grady**: hiperaguda < 8 días · aguda 8–28 días · subaguda 4–24 semanas (hasta la encefalopatía).',
      '**Encefalopatía**: amoníaco → glutamina → **edema cerebral** (causa de muerte en la fulminante). Tríada: ictericia + conciencia + **asterixis**.',
      'Sistémicas: hemorragias, infecciones, hipoglucemia, acidosis metabólica, insuficiencia renal prerrenal.',
      '**Crónica**: estadio final de la cirrosis, gradual, **extrapiramidal**, precipitantes.',
    ],
    links: [
      { chapterId: 'dig-13', text: '[[dig-13|Cirrosis e hipertensión portal]]: el camino hacia la insuficiencia crónica.' },
      { chapterId: 'dig-04', text: '[[dig-04|Ictericia]]: la ictericia hepatocelular y los marcadores.' },
      { chapterId: 'dig-12', text: '[[dig-12|Hemorragias digestivas]]: el precipitante más frecuente.' },
    ],
    pitfalls: [
      'Confundir O’Grady (desde los síntomas) con Bernuau (desde la ictericia).',
      'Atribuir la encefalopatía a la bilirrubina en vez de al amoníaco.',
      'Olvidar el extrapiramidal como signo de la crónica.',
    ],
    miniExam: [
      {
        id: 'dig14-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Cirrótico conocido que, tras una hemorragia digestiva, está ictérico, somnoliento y con asterixis. Pensás en:',
        options: [
          { text: 'Encefalopatía hepática precipitada por la hemorragia.', why: 'Correcto.' },
          { text: 'ACV.', why: 'No explica la tríada.' },
          { text: 'Hipoglucemia aislada.', why: 'No es lo más probable.' },
          { text: 'Meningitis.', why: 'No.' },
        ],
        answer: 0,
        refs: [I('26:37'), I('45:53')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
