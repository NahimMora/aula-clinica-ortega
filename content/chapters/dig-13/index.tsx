import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-13 — Cirrosis e hipertensión portal. Fuente: clases Cirrosis 1–2 y HTP 1–2 (Ortega).
 * Preguntero: «Cirrosis, hipertensión portal e insuficiencia hepática», P1–P11.
 * Child-Pugh: el profe da la mnemotecnia BATEA y los cortes de puntaje; los valores de cada parámetro son los estándar.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const C1 = (t: string) => r('cirr-1', t);
const C2 = (t: string) => r('cirr-2', t);
const H1 = (t: string) => r('htp-1', t);
const H2 = (t: string) => r('htp-2', t);
const P1 = (t: string) => r('perit-1', t);

const chapter: Chapter = {
  id: 'dig-13',
  systemId: 'digestivo',
  title: 'Cirrosis e hipertensión portal',
  subtitle: 'La «preinsuficiencia hepática», sus estigmas y el Child-Pugh; la hipertensión portal, sus colaterales, la ascitis y el GASA.',
  estimatedMinutes: 50,
  sources: [C1('00:01–25:20'), C2('00:01–09:08'), H1('00:02–20:41'), H2('00:00–26:32')],

  map: {
    center: 'Cirrosis e hipertensión portal',
    why: '«Tema **importantísimo**, muy preguntado en los orales sobre todo, y en el parcial y en el final… **como la palma de su mano**.» Lo que marca como Padre Nuestro: **Child-Pugh** (BATEA), **GASA**, la **hipertensión portal** y la **ascitis**.',
    prereqs: [
      { label: 'Ictericia (dig-04)', detail: 'Hábito de Chvostek, marcadores hepáticos, Koller.', chapterId: 'dig-04' },
      { label: 'Ascitis en el examen (dig-05)', detail: 'Matidez desplazable, onda ascítica.', chapterId: 'dig-05' },
    ],
    branches: [
      { id: 'cirrosis', label: 'Cirrosis', tone: 'lilac', items: ['Crónica, irreversible, fibrosis', 'Causas: alcohol n.º 1', 'Compensada vs descompensada'] },
      { id: 'child', label: 'Child-Pugh ★', tone: 'gold', items: ['BATEA', 'A 5–6 · B 7–9 · C 10–15', 'C = trasplante'] },
      { id: 'htp', label: 'Hipertensión portal ★', tone: 'red', items: ['> 12 mmHg', 'Pre · intra · posthepática', 'Colaterales'] },
      { id: 'ascitis', label: 'Ascitis y GASA ★', tone: 'sky', items: ['Fisiopatología', 'Paracentesis', 'GASA ≥ 1,1'] },
    ],
    outcomes: [
      'Definir **cirrosis** y nombrar sus causas y estigmas.',
      'Calcular e interpretar el **Child-Pugh** (BATEA).',
      'Definir **hipertensión portal**, clasificarla y explicar sus **colaterales**.',
      'Explicar la **ascitis** y usar el **GASA**.',
    ],
  },

  theory: [
    {
      id: 'cirrosis',
      kicker: 'Cirrosis',
      title: 'Qué es: la «preinsuficiencia hepática»',
      priority: 'imprescindible',
      summary: 'Hepatopatía crónica, progresiva e irreversible: fibrosis y nódulos que destruyen la arquitectura del hígado.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Cómo pensarla', text: '«La cirrosis yo la tomo como una **preinsuficiencia hepática**»: se pierden hepatocitos y, con ellos, lo que hace el hígado. Si no fabrica **proteínas** → edema; si no fabrica **factores de coagulación** → hemorragias. Al principio el hígado está grande; después se achica.', refs: [C1('00:49'), C1('01:31'), C1('02:55'), C1('04:18')] },
        {
          t: 'cuadro',
          title: 'Causas',
          cols: [{ t: 'Qué hay que saber', tone: 'lilac' }],
          rows: [
            { k: 'Alcohólica', v: ['**La más frecuente**: esteatosis → hepatitis alcohólica → cirrosis (Laennec). Más alcohol, más rápido.'] },
            { k: 'No alcohólica (NASH)', v: ['Obesidad, diabetes, dislipemia: hígado graso → esteatohepatitis'] },
            { k: 'Virales', v: ['Hepatitis **B** y **C** (aceleran la cirrosis del bebedor)'] },
            { k: 'Autoinmunes', v: ['**Biliar primaria**: mujeres, antimitocondriales, prurito, melanosis · hepatitis autoinmune'] },
            { k: 'Metabólicas', v: ['**Hemocromatosis** (hierro), **Wilson** (cobre), déficit de α1-antitripsina'] },
            { k: 'Vasculares', v: ['Insuficiencia cardíaca, **Budd-Chiari**, pericarditis constrictiva'] },
          ],
          refs: [C1('06:24'), C1('07:05'), C1('08:26'), C1('16:31')],
        },
        { t: 'callout', kind: 'note', title: 'Tres etapas', text: '**Hipertensión portal** → **encefalopatía** (al final) → **insuficiencia hepática** (etapa final).', refs: [C1('05:00'), C1('05:42')] },
      ],
      refs: [C1('00:01'), C1('00:49')],
    },
    {
      id: 'estigmas',
      kicker: 'Clínica',
      title: 'Estigmas, compensada y descompensada',
      priority: 'imprescindible',
      summary: 'Compensada: casi asintomática. Descompensada: todo acentuado + hipertensión portal.',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Hormonal', title: 'Hábito de Chvostek', text: '↑ estrógenos / ↓ andrógenos: **ginecomastia**, atrofia testicular, vello pubiano ginecoide.', tone: 'lilac' },
            { tag: 'Piel', title: 'Arañas vasculares', text: '**Spiders**: dilatación de capilares superficiales (no confundir con estrías).', tone: 'rose' },
            { tag: 'Manos', title: 'Eritema palmar · Dupuytren', text: 'Eritema tenar e hipotenar (no patognomónico). Contractura de la aponeurosis palmar.', tone: 'peach' },
            { tag: 'Uñas', title: 'Uñas de Terry', text: 'Blancas proximales, rojas distales: **hipoalbuminemia**.', tone: 'sky' },
            { tag: 'Sangrado', title: 'Equimosis, epistaxis', text: 'Faltan factores de coagulación + plaquetopenia por hiperesplenismo.', tone: 'red' },
            { tag: 'Neuro', title: 'Asterixis', text: 'Encefalopatía hepática: alteración de la conciencia, temblor aleteante, coma.', tone: 'gold' },
          ],
        },
        {
          t: 'cuadro',
          title: 'Compensada vs descompensada',
          cols: [
            { t: 'Compensada', tone: 'mint' },
            { t: 'Descompensada', tone: 'red' },
          ],
          rows: [
            { k: 'Clínica', v: ['Asintomática o inespecífica; hepatoesplenomegalia, arañas, ginecomastia', 'Todo **acentuado** + **hipertensión portal** + insuficiencia hepática'] },
            { k: 'Signos', v: ['Eritema palmar, Dupuytren, parótidas', '**Ascitis**, várices, **ictericia**, encefalopatía, infecciones, desnutrición'] },
            { k: 'Laboratorio', v: ['Hiperesplenismo, ↑ transaminasas, ↑ γ-globulinas, ↓ albúmina, ↓ protrombina', 'Lo mismo, más marcado'] },
          ],
          refs: [C1('19:18'), C1('20:38'), C1('21:19'), C1('23:20'), C1('24:00')],
        },
      ],
      refs: [C1('12:26'), C1('13:08'), C2('00:01'), C2('00:43'), C2('01:29'), C2('02:11'), C2('03:36')],
    },
    {
      id: 'child',
      kicker: 'Lo que toma ★',
      title: 'Child-Pugh (BATEA)',
      priority: 'imprescindible',
      summary: 'Pronóstico: A 5–6 compensada · B 7–9 descompensada reversible · C 10–15 irreversible (trasplante).',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Para no bochar', text: '«Pregunta de parcial, **como el Padre Nuestro**, me tienen que saber la clasificación de Child-Pugh: **el que no se sepa esto, lo bochan directamente**.» Mnemotecnia: **BATEA**.', refs: [C2('07:04'), C2('07:47')] },
        {
          t: 'mnemo',
          word: 'BATEA',
          tone: 'gold',
          items: [
            { l: 'B', t: '**B**ilirrubina' },
            { l: 'A', t: '**A**lbúmina' },
            { l: 'T', t: '**T**iempo de protrombina (Quick / RIN)' },
            { l: 'E', t: '**E**ncefalopatía' },
            { l: 'A', t: '**A**scitis' },
          ],
          refs: [C2('07:47')],
        },
        {
          t: 'calc',
          title: 'Calculá el Child-Pugh',
          criterios: [
            { k: 'Bilirrubina (mg/dl)', ops: [{ t: '< 2', pts: 1 }, { t: '2–3', pts: 2 }, { t: '> 3', pts: 3 }] },
            { k: 'Albúmina (g/dl)', ops: [{ t: '> 3,5', pts: 1 }, { t: '2,8–3,5', pts: 2 }, { t: '< 2,8', pts: 3 }] },
            { k: 'Tiempo de protrombina (RIN)', ops: [{ t: '< 1,7', pts: 1 }, { t: '1,7–2,3', pts: 2 }, { t: '> 2,3', pts: 3 }] },
            { k: 'Encefalopatía', ops: [{ t: 'Ausente', pts: 1 }, { t: 'Grado I–II', pts: 2 }, { t: 'Grado III–IV', pts: 3 }] },
            { k: 'Ascitis', ops: [{ t: 'Ausente', pts: 1 }, { t: 'Leve', pts: 2 }, { t: 'Moderada-severa', pts: 3 }] },
          ],
          bandas: [
            { min: 5, max: 6, t: 'Child A', d: 'Cirrosis **compensada**.', tone: 'mint' },
            { min: 7, max: 9, t: 'Child B', d: '**Descompensada**, pero puede revertirse.', tone: 'gold' },
            { min: 10, max: 15, t: 'Child C', d: 'Descompensada **irreversible**: pensar en **trasplante hepático**.', tone: 'red' },
          ],
          note: 'Los cortes A/B/C y su significado los da el profe; los valores de cada parámetro son los estándar de la clasificación.',
        },
      ],
      refs: [C2('07:04'), C2('08:28')],
    },
    {
      id: 'htp',
      kicker: 'Lo que toma ★',
      title: 'Hipertensión portal: definición, causas y colaterales',
      priority: 'imprescindible',
      summary: 'Presión portal > 12 mmHg. Causa n.º 1: cirrosis. La sangre vuelve y abre colaterales portocava.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de parcial', text: '«La hipertensión portal es **pregunta de parcial**»: aumento de la presión del sistema porta **por encima de 12 mmHg** (normal ≈ 8–10). «Lo que más quiero que sepan es la **clínica**: es todo relacionar.»', refs: [H1('00:02'), H1('04:10')] },
        { t: 'anim', id: 'htp' },
        { t: 'triad', title: 'Hipertensión portal (pregunta de examen)', items: ['Várices esofágicas', 'Ascitis', 'Esplenomegalia', 'Circulación colateral'], center: 'HTP', tone: 'red', note: 'Las cuatro manifestaciones que el profe lista como pregunta de examen.', refs: [P1('09:03')] },
        {
          t: 'flow',
          root: {
            label: '**Hipertensión portal**: ¿dónde está el obstáculo?',
            tone: 'red',
            children: [
              { label: '**Prehepática**', tone: 'sky', note: 'Sistema porta: trombosis de la porta o de la esplénica' },
              { label: '**Hepática**', tone: 'lilac', star: true, note: '**Cirrosis** (la más frecuente, sinusoidal)' },
              { label: '**Suprahepática**', tone: 'peach', note: 'Budd-Chiari, insuficiencia cardíaca derecha, pericarditis constrictiva' },
            ],
          },
        },
        {
          t: 'cuadro',
          title: 'Circulaciones colaterales portocava (pregunta de parcial)',
          cols: [
            { t: 'Dónde', tone: 'red' },
            { t: 'Qué produce', tone: 'gold' },
          ],
          rows: [
            { k: 'Gastroesofágica (profunda)', v: ['Coronaria estomáquica ↔ ácigos', '**Várices esofágicas**: 30 % en la compensada, 60–70 % en la descompensada; causa de muerte frecuente. Se ven por **endoscopía**'] },
            { k: 'Paraumbilical (superficial)', v: ['Paraumbilical ↔ epigástricas', '**Cabeza de medusa**'] },
            { k: 'Rectal', v: ['Hemorroidal superior ↔ media e inferior', '**Hemorroides**'] },
            { k: 'Retroperitoneal', v: ['Mesentéricas ↔ retroperitoneales', 'Poco frecuente'] },
          ],
          refs: [H1('05:39'), H1('07:43'), H1('09:15'), H1('09:59'), H1('10:43'), H1('11:26')],
        },
        {
          t: 'timeline',
          title: 'Maniobra: ¿la vena sube o baja? (pregunta de la Dra. González)',
          items: [
            { k: '1', t: 'Comprimir la vena', d: 'Con el dedo, se detiene el flujo en ese punto.', tone: 'sky' },
            { k: '2', t: 'Mirar dónde se llena', d: 'Se ingurgita del lado del que **viene** la sangre.', tone: 'lilac' },
            { k: '3', t: 'Interpretar', d: 'Ingurgitada **por debajo** del dedo = **ascendente**; **por arriba** = **descendente**.', tone: 'red' },
          ],
          caption: 'La portocava típica parte del ombligo hacia la base del tórax.',
        },
      ],
      refs: [H1('00:44'), H1('01:25'), H1('02:06'), H1('12:56'), H1('13:38'), H1('15:45')],
    },
    {
      id: 'ascitis',
      kicker: 'Lo que toma ★',
      title: 'Ascitis, paracentesis y GASA',
      priority: 'imprescindible',
      summary: 'Causa n.º 1: hipertensión portal. Paracentesis: recuento (> 250 PMN = PBE) y GASA (≥ 1,1 = HTP).',
      blocks: [
        { t: 'callout', kind: 'prof', text: '«Ascitis **pregunta muchísimo**. Muy preguntado. Cuando fui a rendir el final de clínica médica, a mí me preguntaron ascitis.»', refs: [H1('16:27')] },
        { t: 'anim', id: 'ascitis' },
        { t: 'anim', id: 'paracentesis' },
        {
          t: 'cuadro',
          title: 'GASA (como el Padre Nuestro)',
          cols: [
            { t: 'GASA ≥ 1,1 g/dl', tone: 'red' },
            { t: 'GASA < 1,1 g/dl', tone: 'mint' },
          ],
          rows: [
            { k: 'Significa', v: ['**Hay hipertensión portal**', 'El sistema porta **no** está afectado'] },
            { k: 'Causas', v: ['**Cirrosis**, causa cardíaca, Budd-Chiari, metástasis hepáticas, hepatitis alcohólica, trombosis portal', '**Carcinomatosis peritoneal**, tuberculosis, pancreatitis, síndrome nefrótico'] },
          ],
          refs: [H2('16:40'), H2('17:23'), H2('18:06'), H2('18:49')],
        },
        { t: 'callout', kind: 'prof', title: 'Child-Pugh y GASA', text: '«Esto me lo estudian como si fuese el **Padre Nuestro**… el **Child-Pugh** con la mnemotecnia BATEA y el **GASA** preguntan muchísimo.»', refs: [H2('18:49'), H2('19:31')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Aspecto', title: 'Transparente', text: 'Trasudado: ↓ oncótica o ↑ hidrostática (cirrosis).', tone: 'sky' },
            { tag: 'Aspecto', title: 'Turbio', text: 'Infección (PBE) o quilosa (triglicéridos > 200 mg/dl, linfa).', tone: 'gold' },
            { tag: 'Aspecto', title: 'Hemático', text: 'Neoplasia, tuberculosis, pancreatitis, traumatismo.', tone: 'red' },
          ],
        },
        { t: 'callout', kind: 'note', title: 'Examen y esplenomegalia', text: 'Abdomen globoso, ombligo evertido, RHA ausentes donde hay líquido, **matidez desplazable**, onda ascítica, témpano: «lo que sí o sí tienen que saber hacer es la percusión». La causa más frecuente de **esplenomegalia** es la hipertensión portal (con hiperesplenismo).', refs: [H2('08:54'), H2('10:19'), H2('11:46'), H2('20:55')] },
      ],
      refs: [H1('16:27'), H1('17:09'), H2('00:40'), H2('05:10'), H2('12:28'), H2('15:13')],
    },
    {
      id: 'diagnostico',
      kicker: 'Diagnóstico',
      title: 'Cómo se estudia',
      priority: 'muy-importante',
      blocks: [
        {
          t: 'timeline',
          items: [
            { k: 'Anamnesis', t: 'Causa', d: 'Alcohol (cuánto, desde cuándo), hepatitis B y C, fármacos hepatotóxicos (paracetamol, metildopa, isoniazida), antecedentes familiares.', tone: 'lilac' },
            { k: 'Laboratorio', t: 'Hepatograma completo', d: 'Transaminasas, colestasis, albúmina, protrombina, hemograma (anemia, pancitopenia), autoanticuerpos.', tone: 'sky' },
            { k: 'Imágenes', t: 'Eco · endoscopía', d: 'Diámetro de la vena porta, ascitis; **VEDA** para várices.', tone: 'gold' },
            { k: 'Certeza', t: 'Biopsia hepática', d: 'Diagnóstico y etiología.', tone: 'red' },
          ],
        },
      ],
      refs: [H2('20:55'), H2('22:20'), H2('23:48'), H2('25:10'), H2('26:32')],
    },
  ],

  developments: [
    {
      id: 'dig13-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'child',
      question: 'Parámetros de la clasificación de Child-Pugh y su interpretación.',
      quote: { text: '«…el que no se sepa esto, chicos, lo bochan directamente»', refs: [C2('07:04')] },
      answer: [
        { t: 'p', text: '**BATEA**: Bilirrubina, Albúmina, Tiempo de protrombina, Encefalopatía, Ascitis; cada uno suma 1, 2 o 3 puntos.' },
        {
          t: 'table',
          head: ['', '1', '2', '3'],
          rows: [
            ['Bilirrubina', '< 2', '2–3', '> 3'],
            ['Albúmina', '> 3,5', '2,8–3,5', '< 2,8'],
            ['RIN', '< 1,7', '1,7–2,3', '> 2,3'],
            ['Encefalopatía', 'No', 'I–II', 'III–IV'],
            ['Ascitis', 'No', 'Leve', 'Moderada-severa'],
          ],
        },
        { t: 'p', text: '**A (5–6):** compensada. **B (7–9):** descompensada, reversible. **C (10–15):** irreversible → trasplante.' },
      ],
      refs: [C2('07:47'), C2('08:28')],
    },
    {
      id: 'dig13-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'ascitis',
      question: 'Mencione la clasificación de GASA.',
      quote: { text: '«…esto me lo estudian como si fuese el Padre Nuestro… lo preguntan en el parcial»', refs: [H2('18:49')] },
      answer: [{ t: 'p', text: '**GASA = albúmina sérica − albúmina del líquido ascítico** (por paracentesis). **≥ 1,1 g/dl:** hipertensión portal (cirrosis, cardíaca, Budd-Chiari, metástasis hepáticas). **< 1,1 g/dl:** sin hipertensión portal (carcinomatosis peritoneal, tuberculosis, pancreatitis, nefrótico). Además: **> 250 neutrófilos/mm³** = PBE.' }],
      refs: [H2('16:40'), H2('17:23'), H2('15:13')],
    },
    {
      id: 'dig13-d03',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'htp',
      question: '¿Qué es la hipertensión portal? Clasificación, etiologías y hallazgos semiológicos.',
      quote: { text: '«La hipertensión portal es pregunta de parcial»', refs: [H1('00:02')] },
      answer: [
        { t: 'p', text: 'Aumento de la presión del sistema porta **> 12 mmHg**. **Prehepática** (trombosis portal o esplénica), **hepática** (**cirrosis**, la más frecuente), **suprahepática** (Budd-Chiari, IC derecha, pericarditis constrictiva).' },
        { t: 'p', text: '**Hallazgos:** **várices esofágicas**, **ascitis**, **esplenomegalia** (hiperesplenismo) y **circulación colateral** (cabeza de medusa, hemorroides).' },
      ],
      refs: [H1('00:02'), H1('00:44'), H1('05:39'), P1('09:03')],
    },
    {
      id: 'dig13-d04',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'cirrosis',
      question: 'Definición de cirrosis, etiologías y manifestaciones de la cirrosis compensada y descompensada.',
      quote: { text: '«Cirrosis… se la sepan como la palma de su mano… lo preguntan muchísimo»', refs: [C1('00:01')] },
      answer: [
        { t: 'p', text: 'Hepatopatía **crónica, progresiva e irreversible**, con fibrosis y nódulos que alteran la arquitectura hepática («preinsuficiencia hepática»).' },
        { t: 'p', text: '**Causas:** alcohol (n.º 1), NASH, virus B y C, autoinmunes (biliar primaria, hepatitis autoinmune), hemocromatosis, Wilson, déficit de α1-antitripsina, vasculares (Budd-Chiari, IC).' },
        { t: 'p', text: '**Compensada:** asintomática o inespecífica (arañas, eritema palmar, ginecomastia, hepatoesplenomegalia). **Descompensada:** todo acentuado + hipertensión portal (ascitis, várices), ictericia, encefalopatía, infecciones.' },
      ],
      refs: [C1('00:49'), C1('06:24'), C1('19:18'), C1('23:20')],
    },
    {
      id: 'dig13-d05',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'htp',
      question: '¿Cuáles son las circulaciones colaterales de la hipertensión portal y cómo se determina la dirección del flujo?',
      quote: { text: '«Pregunta de parcial: ¿cuáles son las circulaciones venosas colaterales?»', refs: [H1('05:39')] },
      answer: [
        { t: 'p', text: '**Portocava:** gastroesofágica (várices esofágicas, profunda, se ven por endoscopía), paraumbilical (cabeza de medusa, superficial), rectal (hemorroides) y retroperitoneal.' },
        { t: 'p', text: '**Dirección:** comprimir la vena con el dedo y ver de qué lado se ingurgita: por debajo del dedo = ascendente; por arriba = descendente.' },
      ],
      refs: [H1('09:15'), H1('11:26'), H1('12:56'), H1('15:45')],
    },
  ],

  mcq: [
    {
      id: 'dig13-q01',
      topic: 'Cirrosis',
      difficulty: 1,
      stem: 'La causa más frecuente de cirrosis es:',
      options: [
        { text: 'El alcohol.', why: 'Correcto.' },
        { text: 'La hepatitis A.', why: 'No cronifica.' },
        { text: 'La enfermedad de Wilson.', why: 'Rara.' },
        { text: 'La hemocromatosis.', why: 'Rara.' },
      ],
      answer: 0,
      refs: [C1('06:24')],
    },
    {
      id: 'dig13-q02',
      topic: 'Child-Pugh',
      difficulty: 1,
      emphasis: true,
      stem: 'La mnemotecnia BATEA del Child-Pugh incluye:',
      options: [
        { text: 'Bilirrubina, albúmina, tiempo de protrombina, encefalopatía, ascitis.', why: 'Correcto.' },
        { text: 'Bilirrubina, amilasa, transaminasas, edad, ascitis.', why: 'No.' },
        { text: 'BUN, albúmina, temperatura, edema, anemia.', why: 'No.' },
        { text: 'Bazo, ascitis, tórax, encefalopatía, aliento.', why: 'No.' },
      ],
      answer: 0,
      refs: [C2('07:47')],
    },
    {
      id: 'dig13-q03',
      topic: 'Child-Pugh',
      difficulty: 2,
      emphasis: true,
      stem: 'Un Child-Pugh de **11 puntos** corresponde a:',
      options: [
        { text: 'Clase A, compensada.', why: 'A es 5–6.' },
        { text: 'Clase B, reversible.', why: 'B es 7–9.' },
        { text: 'Clase C: irreversible, considerar trasplante.', why: 'Correcto (10–15).' },
        { text: 'No clasificable.', why: 'No.' },
      ],
      answer: 2,
      refs: [C2('07:47')],
    },
    {
      id: 'dig13-q04',
      topic: 'HTP',
      difficulty: 1,
      emphasis: true,
      stem: 'Se habla de hipertensión portal cuando la presión portal supera:',
      options: [
        { text: '5 mmHg.', why: 'Es normal.' },
        { text: '12 mmHg.', why: 'Correcto.' },
        { text: '40 mmHg.', why: 'No.' },
        { text: '120 mmHg.', why: 'No.' },
      ],
      answer: 1,
      refs: [H1('00:02')],
    },
    {
      id: 'dig13-q05',
      topic: 'HTP',
      difficulty: 2,
      stem: 'El síndrome de Budd-Chiari produce hipertensión portal:',
      options: [
        { text: 'Prehepática.', why: 'No.' },
        { text: 'Hepática sinusoidal.', why: 'No.' },
        { text: 'Suprahepática (obstrucción de las venas suprahepáticas).', why: 'Correcto.' },
        { text: 'No produce.', why: 'Sí produce.' },
      ],
      answer: 2,
      refs: [H1('02:06')],
    },
    {
      id: 'dig13-q06',
      topic: 'HTP',
      difficulty: 2,
      stem: 'La colateral portocava **profunda** más importante, causa frecuente de muerte, es:',
      options: [
        { text: 'Las várices esofágicas.', why: 'Correcto.' },
        { text: 'La cabeza de medusa.', why: 'Es superficial.' },
        { text: 'Las hemorroides.', why: 'No es la más grave.' },
        { text: 'Las retroperitoneales.', why: 'Poco frecuentes.' },
      ],
      answer: 0,
      refs: [H1('10:43'), H1('11:26')],
    },
    {
      id: 'dig13-q07',
      topic: 'HTP',
      difficulty: 3,
      stem: 'Comprimís una vena colateral del abdomen y se ingurgita **por debajo** del dedo. El flujo es:',
      options: [
        { text: 'Ascendente.', why: 'Correcto: la sangre viene de abajo.' },
        { text: 'Descendente.', why: 'Se llenaría por arriba.' },
        { text: 'No se puede saber.', why: 'Sí se puede.' },
        { text: 'Arterial.', why: 'No.' },
      ],
      answer: 0,
      refs: [H1('15:45')],
    },
    {
      id: 'dig13-q08',
      topic: 'Ascitis',
      difficulty: 2,
      emphasis: true,
      stem: 'GASA de 1,8 g/dl indica:',
      options: [
        { text: 'Hipertensión portal (p. ej., cirrosis).', why: 'Correcto (≥ 1,1).' },
        { text: 'Carcinomatosis peritoneal.', why: 'Daría < 1,1.' },
        { text: 'Peritonitis tuberculosa.', why: 'Daría < 1,1.' },
        { text: 'Infección del líquido.', why: 'Eso lo dice el recuento de neutrófilos.' },
      ],
      answer: 0,
      refs: [H2('17:23')],
    },
    {
      id: 'dig13-q09',
      topic: 'Ascitis',
      difficulty: 2,
      stem: 'En la ascitis del cirrótico, el riñón retiene sodio y agua porque:',
      options: [
        { text: 'Baja la volemia efectiva y se activan el SRAA y el simpático.', why: 'Correcto.' },
        { text: 'Aumenta la albúmina.', why: 'Disminuye.' },
        { text: 'Hay insuficiencia renal siempre.', why: 'No.' },
        { text: 'Por exceso de proteínas.', why: 'No.' },
      ],
      answer: 0,
      refs: [H1('18:35'), H1('19:17')],
    },
    {
      id: 'dig13-q10',
      topic: 'Estigmas',
      difficulty: 2,
      stem: 'La ginecomastia y la atrofia testicular del cirrótico se deben a:',
      options: [
        { text: 'Aumento de estrógenos y disminución de andrógenos.', why: 'Correcto (hábito de Chvostek).' },
        { text: 'Hipoalbuminemia.', why: 'No.' },
        { text: 'Hiperesplenismo.', why: 'No.' },
        { text: 'Colestasis.', why: 'No.' },
      ],
      answer: 0,
      refs: [C1('13:49')],
    },
    {
      id: 'dig13-q11',
      topic: 'HTP',
      difficulty: 2,
      stem: 'La causa más frecuente de esplenomegalia es:',
      options: [
        { text: 'La hipertensión portal.', why: 'Correcto (las infecciosas son la segunda).' },
        { text: 'La leucemia.', why: 'No es la más frecuente.' },
        { text: 'El trauma.', why: 'No.' },
        { text: 'La anemia ferropénica.', why: 'No.' },
      ],
      answer: 0,
      refs: [H2('20:55')],
    },
  ],

  memory: [
    {
      id: 'dig13-m01',
      title: 'Child-Pugh',
      purpose: '«Lo bochan directamente».',
      evaluates: [{ t: 'list', items: ['BATEA', 'A 5–6', 'B 7–9', 'C 10–15 → trasplante'] }],
      interpret: 'Mide cuánto hígado queda funcionando.',
      mnemonic: { hook: 'BATEA: «una batea para lavar el hígado».', explain: 'Bilirrubina, Albúmina, Tiempo de protrombina, Encefalopatía, Ascitis.' },
      recall: { q: '¿Qué parámetros tiene el Child-Pugh y cuáles son las clases?', a: 'Bilirrubina, albúmina, tiempo de protrombina, encefalopatía y ascitis. A 5–6, B 7–9, C 10–15.' },
    },
    {
      id: 'dig13-m02',
      title: 'GASA',
      purpose: '«Como el Padre Nuestro».',
      evaluates: [{ t: 'list', items: ['Albúmina sérica − ascítica', '≥ 1,1: HTP', '< 1,1: otra causa'] }],
      interpret: 'Gradiente alto = en el líquido hay poca albúmina comparada con la sangre: salió empujado por la presión portal, no por inflamación del peritoneo.',
      mnemonic: { hook: 'Uno-uno: «arriba de 1,1, la porta está alta».', explain: '≥ 1,1 g/dl = hipertensión portal.' },
      recall: { q: '¿Qué significa un GASA ≥ 1,1 g/dl?', a: 'Que la ascitis se debe a hipertensión portal (cirrosis, causa cardíaca, Budd-Chiari).' },
    },
    {
      id: 'dig13-m03',
      title: 'Hipertensión portal',
      purpose: 'Pregunta de parcial.',
      evaluates: [{ t: 'list', items: ['> 12 mmHg', 'Várices, ascitis, esplenomegalia, colaterales', 'Pre · hepática (cirrosis) · supra'] }],
      interpret: 'Toda la clínica es «la sangre que vuelve para atrás».',
      mnemonic: { hook: '«VACE»: Várices, Ascitis, Circulación colateral, Esplenomegalia.', explain: 'Las cuatro manifestaciones.' },
      recall: { q: '¿Cuáles son las manifestaciones de la hipertensión portal?', a: 'Várices esofágicas, ascitis, esplenomegalia y circulación colateral.' },
    },
  ],

  closing: {
    map: {
      center: 'Cirrosis e HTP en una mirada',
      nodes: [
        { label: 'Cirrosis', tone: 'lilac', items: ['Crónica, irreversible', 'Alcohol n.º 1', 'Chvostek, arañas, Terry'] },
        { label: 'Child-Pugh ★', tone: 'gold', items: ['BATEA', 'A · B · C', 'C = trasplante'] },
        { label: 'HTP ★', tone: 'red', items: ['> 12 mmHg', 'VACE', 'Colaterales'] },
        { label: 'Ascitis ★', tone: 'sky', items: ['Círculo SRAA', 'Paracentesis', 'GASA ≥ 1,1'] },
      ],
    },
    essentials: [
      '**Cirrosis**: hepatopatía crónica, progresiva, irreversible (fibrosis + nódulos); alcohol n.º 1.',
      '**Child-Pugh (BATEA)**: A 5–6 compensada · B 7–9 reversible · C 10–15 irreversible (trasplante).',
      '**HTP**: > 12 mmHg; pre (trombosis portal), hepática (**cirrosis**), supra (Budd-Chiari, IC derecha).',
      'Manifestaciones: **várices esofágicas**, **ascitis**, **esplenomegalia**, **circulación colateral** (cabeza de medusa, hemorroides).',
      '**Ascitis**: ↓ albúmina + ↑ presión portal + linfa → SRAA → retiene Na y agua. Paracentesis: > 250 PMN = PBE; **GASA ≥ 1,1** = HTP.',
    ],
    links: [
      { chapterId: 'dig-10', text: '[[dig-10|Peritonitis]]: la PBE del cirrótico.' },
      { chapterId: 'dig-12', text: '[[dig-12|Hemorragias digestivas]]: las várices que sangran.' },
      { chapterId: 'dig-14', text: '[[dig-14|Insuficiencia hepática]]: la etapa final y la encefalopatía.' },
      { chapterId: 'dig-05', text: '[[dig-05|Examen físico]]: ascitis y circulación colateral.' },
    ],
    pitfalls: [
      'Confundir los cortes del Child-Pugh.',
      'Interpretar al revés el GASA.',
      'Decir que la cabeza de medusa es una colateral profunda.',
      'Confundir arañas vasculares con estrías.',
    ],
    miniExam: [
      {
        id: 'dig13-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Cirrótico con bilirrubina 2,5, albúmina 3,0, RIN 1,5, sin encefalopatía y ascitis leve. Child-Pugh:',
        options: [
          { text: '8 puntos: clase B.', why: 'Correcto: 2 + 2 + 1 + 1 + 2.' },
          { text: '5 puntos: clase A.', why: 'No.' },
          { text: '11 puntos: clase C.', why: 'No.' },
          { text: '6 puntos: clase A.', why: 'No.' },
        ],
        answer: 0,
        refs: [C2('07:47')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
