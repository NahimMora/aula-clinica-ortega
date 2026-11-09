import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-14: clase visual de la insuficiencia hepática.
 *  1. Clase de Ortega: «Insuficiencia hepática» (00:02–50:39).
 *  2. Libro de Clínica Médica de Ortega (p. 402–406): definición, Trey-Davidson, Bernuau, O'Grady, etiologías, manifestaciones,
 *     encefalopatía, edema cerebral, metabólicas, laboratorio, encefalopatía crónica y cuadro aguda vs crónica.
 *  3. Preguntero: «Cirrosis, hipertensión portal e insuficiencia hepática», P12–P15.
 * Correcciones sin atribuir (mecanismo de la encefalopatía, aliento hepático, ácido-base): ver content/traceability/dig-14.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const I = (t: string) => r('ih', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-amonio',
    sec: 'encefalopatia',
    titulo: 'El camino del amonio',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'amonio', vistas: ['normal', 'falla', 'falla'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Las bacterias del intestino producen **amonio**; la porta lo lleva al hígado, que lo transforma en **urea**, y el riñón la elimina.' },
          { k: 'alteracion', text: 'El hígado insuficiente no lo transforma, y por las colaterales el amonio **se saltea el hígado**.' },
          { k: 'signo', text: 'El amonio llega al **cerebro**: encefalopatía hepática.' },
        ],
      },
    ],
    voz: [
      'Empecemos por el amonio, que el profesor señala como el gran culpable. Las bacterias del intestino lo producen al digerir proteínas; la porta lo lleva al hígado, que lo transforma en urea, una sustancia que el riñón elimina sin problema.',
      'Si el hígado está insuficiente, ya no puede transformarlo. Y si además hay colaterales, la sangre del intestino directamente se saltea el hígado.',
      'Entonces el amonio, que es tóxico, se acumula en la sangre y llega al cerebro. Eso es la encefalopatía hepática.',
    ],
    refs: [I('02:47'), I('04:52'), I('19:02'), I('19:43'), L('403'), L('405')],
  },
  {
    id: 'f-edema',
    sec: 'encefalopatia',
    titulo: 'Por qué se hincha el cerebro',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'amonio', vistas: ['cerebro'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'En el cerebro, el **astrocito** neutraliza el amonio uniéndolo al glutamato: forma **glutamina**.' },
          { k: 'mecanismo', text: 'La glutamina se acumula y **atrae agua**: el astrocito se hincha.' },
          { k: 'signo', text: '**Edema cerebral** e **hipertensión endocraneana**: la causa más frecuente de muerte en la falla fulminante.' },
        ],
      },
    ],
    aclara: { text: 'En la clase se aclara que el mecanismo no se pregunta; acá se da la versión fisiológica (glutamina y edema de los astrocitos).', origen: 'Libro, p. 403; ' + GRAL },
    voz: [
      'Y por qué ese amonio hincha el cerebro. En el cerebro no hay ciclo de la urea: lo que hace el astrocito, una célula de sostén de las neuronas, es unir el amonio al glutamato y formar glutamina.',
      'La glutamina se acumula dentro del astrocito, y como atrae agua por ósmosis, el astrocito se hincha.',
      'Con millones de astrocitos hinchados aparece el edema cerebral y la hipertensión endocraneana, que es la causa más frecuente de muerte en la falla hepática fulminante.',
    ],
    refs: [I('20:23'), I('23:56'), I('27:18'), L('403')],
  },
  {
    id: 'f-sistemicas',
    sec: 'sistemicas',
    titulo: 'Lo que falla en todo el cuerpo',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['El hígado ya no…', 'Aparece'],
        filas: [
          ['Fabrica **factores de coagulación**', '**Hemorragias** (digestivas altas), cuadro tipo CID'],
          ['Fabrica proteínas, anticuerpos, complemento', '**Infecciones**: paciente inmunocomprometido'],
          ['Guarda glucógeno ni hace gluconeogénesis', '**Hipoglucemia**'],
          ['Fabrica albúmina', 'Edemas, menos volemia'],
          ['Degrada estrógenos', 'Ginecomastia, atrofia testicular'],
        ],
      },
    ],
    voz: [
      'Y el resto se entiende con la misma lógica: lo que el hígado ya no hace. Sin factores de coagulación, el paciente sangra, sobre todo del tubo digestivo alto, y puede hacer un cuadro parecido a una coagulación intravascular diseminada.',
      'Sin proteínas, anticuerpos ni complemento, queda inmunocomprometido y se infecta. Sin glucógeno ni gluconeogénesis, hace hipoglucemia. Sin albúmina, edemas y menos volumen en los vasos. Y sin degradar estrógenos, aparecen la ginecomastia y la atrofia testicular.',
    ],
    refs: [I('27:58'), I('29:19'), I('31:23'), I('34:46'), L('403'), L('404')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'encefalopatia', label: 'Amonio y cerebro' },
    { id: 'sistemicas', label: 'Todo el cuerpo' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'funciones',
    titulo: 'Insuficiencia hepática',
    fig: { f: 'amonio', vistas: ['falla'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Alteración grave de **todas las funciones** del hígado: se perdió más del 80–90 %.' },
      { t: 'lista', en: 1, items: ['Infrecuente, **mortalidad 40–80 %**.', 'Única opción si no se recupera: el **trasplante**.', 'Aguda o crónica, según el tiempo.'] },
    ],
    examen: { origen: 'preguntero', texto: 'Defina insuficiencia hepática aguda.' },
    voz: [
      'La insuficiencia hepática es la pérdida grave de todas las funciones del hígado: se perdió más del ochenta o noventa por ciento. Para entenderla, el profesor propone pensar al revés: todo lo que hace un hígado normal, el insuficiente deja de hacerlo.',
      'Es infrecuente, pero muy grave: la mortalidad va del cuarenta al ochenta por ciento, y si el hígado no se recupera, la única salida es el trasplante. Se divide en aguda y crónica, según el tiempo.',
    ],
    refs: [I('00:42'), I('04:11'), I('06:14'), I('06:55'), I('07:35'), L('402')],
  },
  {
    id: 't-ogrady',
    sec: 'aguda',
    titulo: 'Insuficiencia aguda: O’Grady',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Se clasifica según **cuándo aparece la encefalopatía**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['O’Grady', 'Encefalopatía'],
        filas: [
          ['**Hiperaguda**', '< 8 días'],
          ['**Aguda**', '8 a 28 días'],
          ['**Subaguda**', '4 a 24 semanas'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La clasificación de O’Grady.', cita: 'Tienen que saber sí o sí la de O’Grady… esta no me pueden no saber.', ref: I('08:30') },
    voz: [
      'La insuficiencia hepática aguda tiene varias clasificaciones, y el profesor pide una sí o sí: la de O’Grady. Lo que la define es cuándo aparece la encefalopatía.',
      'Si aparece en menos de ocho días, es hiperaguda. Entre ocho y veintiocho días, aguda. Y entre cuatro y veinticuatro semanas, subaguda.',
    ],
    refs: [I('08:15'), I('08:30'), I('08:48'), I('08:55'), I('09:35'), L('402')],
  },
  {
    id: 't-bernuau',
    sec: 'aguda',
    titulo: 'Bernuau y Trey-Davidson',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Bernuau · fulminante', tono: 'red', text: 'Encefalopatía **dentro de las 2 semanas** del inicio de la **ictericia**.' },
      { t: 'def', term: 'Bernuau · subfulminante', tono: 'peach', en: 0, text: 'Encefalopatía entre las **2 y 12 semanas** de la ictericia.' },
      { t: 'def', term: 'Trey y Davidson', tono: 'sky', en: 1, soloWeb: true, text: 'Fulminante: encefalopatía dentro de las 8 semanas del inicio de los síntomas en alguien sano; de comienzo tardío: 8 a 24 semanas.' },
    ],
    examen: { origen: 'preguntero', texto: 'Clasificación de insuficiencia hepática aguda.' },
    voz: [
      'La otra que hay que entender es la de Bernuau, que cuenta desde la ictericia. Si la encefalopatía aparece dentro de las dos semanas de empezada la ictericia, es una falla hepática fulminante. Si aparece entre las dos y las doce semanas, subfulminante.',
    ],
    refs: [I('09:35'), I('10:15'), I('10:55'), L('402')],
  },
  {
    id: 't-causas',
    sec: 'aguda',
    titulo: 'Causas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Grupo', 'Ejemplos'],
        filas: [
          ['Virales', 'Hepatitis A, B, C, D, E; otros virus'],
          ['Fármacos y tóxicos', '**Paracetamol**, amanita, tetracloruro de carbono; isoniazida, halotano'],
          ['Metabólicas', 'Wilson, hemocromatosis neonatal, alfa-1-antitripsina, tirosinemia, galactosemia'],
          ['Embarazo', 'Esteatosis gravídica, síndrome **HELLP**'],
          ['Otras', 'Neoplasias, Budd-Chiari, hepatitis autoinmune; criptogénica'],
        ],
      },
      { t: 'texto', en: 1, text: '**Paracetamol**: dosis máxima 4 g/día; superarla de forma repetida puede dar una **falla fulminante**.' },
    ],
    voz: [
      'Las causas son casi las mismas que las de la cirrosis, y alcanza con nombrarlas: virales, fármacos y tóxicos, metabólicas como el Wilson, las del embarazo como el síndrome HELLP, neoplasias y otras.',
      'Y el profesor advierte especialmente sobre el paracetamol, que muchos toman como si fuera un caramelo. La dosis máxima es de cuatro gramos por día; superarla, sobre todo varios días seguidos, puede producir una falla hepática fulminante.',
    ],
    refs: [I('12:15'), I('12:56'), I('13:36'), I('14:16'), I('14:56'), L('402')],
  },
  {
    id: 't-hepaticas',
    sec: 'sistemicas',
    titulo: 'Manifestaciones de lesión hepática',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          '**Ictericia temprana**, de predominio **directo**.',
          'Hígado que **se achica**.',
          'Transaminasas **muy altas al inicio**, que **caen** en el estadio final.',
          '**Seudocolinesterasa** muy baja.',
          'Bajan los **factores de coagulación** y la albúmina.',
        ],
      },
    ],
    voz: [
      'Las manifestaciones de la lesión del hígado. Ictericia temprana, de predominio directo. Un hígado que se achica. Transaminasas muy altas al principio, que caen al final porque ya no queda hígado que las libere. La seudocolinesterasa muy baja, un marcador fiel de insuficiencia. Y bajan los factores de coagulación y la albúmina.',
    ],
    refs: [I('15:37'), I('16:19'), I('16:59'), I('17:41'), I('18:21'), L('403')],
  },
  {
    id: 't-encefalopatia',
    sec: 'encefalopatia',
    titulo: 'Encefalopatía hepática',
    fig: { f: 'amonio', vistas: ['falla'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'lilac', text: 'El **amonio** que el hígado no transforma en urea llega al cerebro.' },
      { t: 'clave', en: 1, text: '**Ictericia + alteración de la conciencia + asterixis**: encefalopatía hasta que se demuestre lo contrario.' },
      { t: 'texto', en: 2, text: '**Asterixis** (flapping): temblor aleteante de las manos con los brazos extendidos.' },
    ],
    examen: { origen: 'ortega', texto: 'La encefalopatía hepática.', cita: 'Pregunta de parcial, choice, oral y en el final: si no saben encefalopatía hepática, lo van a bochar; tienen que sabérselo sí o sí.', ref: I('19:08') },
    voz: [
      'La encefalopatía hepática es pregunta de parcial, de choice, del oral y del final: el que no la sabe, lo bochan. Se produce porque el amonio que el hígado ya no transforma en urea llega al cerebro.',
      'Y hay una combinación que la delata: un paciente con ictericia, que tiene alterada la conciencia, confuso, somnoliento o estuporoso, y con alteraciones motoras. Hay que pensar en una encefalopatía hepática hasta que se demuestre lo contrario.',
      'La alteración motora más característica es el asterixis, o flapping: con los brazos extendidos y las manos hacia atrás, las manos aletean.',
    ],
    refs: [I('19:02'), I('19:08'), I('24:37'), I('25:17'), I('25:57'), I('26:37'), L('403'), L('405')],
  },
  {
    id: 't-grados',
    sec: 'encefalopatia',
    titulo: 'Grados de encefalopatía (West Haven)',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Grado', 'Cómo está'],
        filas: [
          ['0 · subclínica', 'Sin síntomas: solo pruebas psicométricas o EEG'],
          ['I', 'Euforia o ansiedad, poca atención, **inversión del sueño**'],
          ['II', 'Letargo, desorientación, **asterixis** evidente'],
          ['III', 'Somnolencia, **estupor**, confusión marcada'],
          ['IV', '**Coma**'],
        ],
      },
      { t: 'texto', en: 1, text: 'Grados I–II pueden evolucionar bien; **III–IV**, pronóstico ominoso.' },
    ],
    aclara: { text: 'En la clase se nombran el estadio subclínico y los grados I a IV; la descripción de cada grado es de la bibliografía (West Haven).', origen: 'Clase, min 24:37; bibliografía.' },
    examen: { origen: 'preguntero', texto: 'Clasificación de West Haven para encefalopatía hepática y para qué sirve.' },
    voz: [
      'La encefalopatía se gradúa de cero a cuatro. El grado cero, subclínico, no da síntomas: solo se detecta con pruebas. En el grado uno aparecen euforia o ansiedad, poca atención, y el paciente invierte el sueño: duerme de día y está despierto de noche. En el dos, letargo, desorientación, y el asterixis se hace evidente. En el tres, somnolencia, estupor y confusión marcada. Y en el cuatro, coma.',
      'Sirve para el pronóstico: los grados uno y dos pueden evolucionar bien; el tres y el cuatro tienen un pronóstico muy malo a corto plazo.',
    ],
    refs: [I('24:37'), L('403')],
  },
  {
    id: 't-edema',
    sec: 'encefalopatia',
    titulo: 'Hipertensión endocraneana',
    fig: { f: 'amonio', vistas: ['cerebro'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Edema cerebral por **edema de los astrocitos**: la **causa más frecuente de muerte** en la falla fulminante.' },
      { t: 'texto', en: 1, text: 'Cambios pupilares, **bradicardia, hipertensión** e hiperventilación; rigidez, convulsiones; paro respiratorio.' },
    ],
    voz: [
      'La complicación más temida es la hipertensión endocraneana por edema cerebral, que se debe al edema de los astrocitos. Es la causa más frecuente de muerte en la falla hepática fulminante: la mayoría de los que llegan a ese punto se mueren.',
      'Se anuncia con cambios en las pupilas, bradicardia, hipertensión arterial e hiperventilación; después rigidez, convulsiones, y puede terminar en paro respiratorio.',
    ],
    refs: [I('26:37'), I('27:18'), L('403')],
  },
  {
    id: 't-sistemicas',
    sec: 'sistemicas',
    titulo: 'Infecciones, coagulación y circulación',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Infecciones', tono: 'mint', text: 'Menos opsonización, más traslocación bacteriana: paciente **inmunocomprometido**. Causa importante de muerte.' },
      { t: 'def', term: 'Coagulopatía', tono: 'red', en: 0, text: 'Faltan factores: **hemorragias**, sobre todo digestivas altas; cuadro similar a una CID.' },
      { t: 'def', term: 'Hemodinamia', tono: 'sky', en: 1, text: 'Vasodilatación con gasto cardíaco alto: **hipotensión**, hipoperfusión, acidosis láctica.' },
      { t: 'def', term: 'Riñón', tono: 'peach', en: 1, text: 'Insuficiencia renal en más de la mitad (prerrenal, hepatorrenal). La urea no la refleja: el hígado fabrica poca.' },
    ],
    voz: [
      'Las manifestaciones sistémicas. Las infecciones: el paciente no fabrica bien el complemento ni las proteínas de defensa, y pasan más bacterias desde el intestino: es un inmunocomprometido, y las infecciones son una causa importante de muerte.',
      'La coagulopatía: sin factores de coagulación, sangra, sobre todo del tubo digestivo alto.',
      'La circulación se vuelve hiperdinámica, con vasodilatación e hipotensión; y más de la mitad hace una insuficiencia renal, por hipoperfusión o por síndrome hepatorrenal. Ojo, la urea no sube tanto, porque el hígado enfermo fabrica poca.',
    ],
    refs: [I('27:58'), I('28:39'), I('29:19'), I('30:01'), I('35:31'), L('403'), L('404')],
  },
  {
    id: 't-metabolicas',
    sec: 'sistemicas',
    titulo: 'Alteraciones metabólicas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Alteración', 'Por qué'],
        filas: [
          ['**Hipoglucemia**', 'Sin glucógeno ni gluconeogénesis'],
          ['**Hipopotasemia**', 'Diuréticos, contracción de volumen'],
          ['**Hiponatremia**', 'ADH y SRAA activados: retiene agua'],
          ['Alcalosis respiratoria → **acidosis metabólica**', 'Al principio hiperventila; después, ácido láctico: mal pronóstico'],
          ['Aliento hepático', 'Mercaptanos en el aliento'],
          ['Más estrógenos', 'Ginecomastia, atrofia testicular; amenorrea'],
        ],
      },
    ],
    voz: [
      'Y las alteraciones metabólicas. Hipoglucemia, porque se agotó el glucógeno y no hay gluconeogénesis. Hipopotasemia, por los diuréticos. Hiponatremia, porque la hormona antidiurética y la aldosterona retienen agua.',
      'En el equilibrio ácido base, al principio el paciente hiperventila y hace una alcalosis respiratoria; a medida que avanza aparece una acidosis metabólica por ácido láctico, que es de muy mal pronóstico. El aliento hepático, un olor característico, se debe a los mercaptanos. Y el exceso de estrógenos da ginecomastia y atrofia testicular en el hombre.',
    ],
    refs: [I('31:23'), I('32:03'), I('32:43'), I('33:23'), I('34:04'), I('34:46'), L('404')],
  },
  {
    id: 't-dx',
    sec: 'sistemicas',
    titulo: 'Diagnóstico',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Anamnesis', tono: 'peach', text: 'Casi siempre **indirecta**: el paciente llega confuso o en coma; se busca la causa con la familia.' },
      { t: 'def', term: 'Examen físico', tono: 'sky', en: 0, text: 'Completo: es una enfermedad **sistémica**. Ictericia, encefalopatía; el hígado a veces no se palpa.' },
      {
        t: 'lista',
        en: 1,
        items: ['**Glucemia** (hipoglucemia).', '**Bilirrubina** directa muy alta.', '**Tiempo de protrombina** prolongado: la alteración más temprana.', 'pH: la **acidosis** es de mal pronóstico.', 'Albúmina baja (tardía); transaminasas altas que luego caen.'],
      },
    ],
    voz: [
      'Para el diagnóstico, la anamnesis casi siempre es indirecta: el paciente llega confuso o en coma, y es la familia la que cuenta qué tomó o qué tenía. El examen físico tiene que ser completo, porque la enfermedad afecta todo el cuerpo.',
      'En el laboratorio: la glucemia, por la hipoglucemia; la bilirrubina, sobre todo directa; el tiempo de protrombina, que se prolonga antes que nada; el pH, porque la acidosis es de mal pronóstico; la albúmina, que baja más tarde; y las transaminasas.',
    ],
    refs: [I('36:13'), I('36:54'), I('37:37'), I('38:19'), L('404')],
  },
  {
    id: 't-cronica',
    sec: 'cronica',
    titulo: 'Insuficiencia hepática crónica',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El estadio final de la **cirrosis**. Lo que predomina es la **encefalopatía hepática crónica**: un síndrome neuropsiquiátrico.' },
      { t: 'lista', en: 1, items: ['Alteraciones de la **conciencia** (inversión del sueño, somnolencia → coma), la **personalidad** y el **intelecto**.', '**Asterixis**, signos **extrapiramidales** (rueda dentada), convulsiones tardías.'] },
      { t: 'texto', en: 2, text: '**Precipitantes**: hemorragia digestiva, infecciones, diuréticos (hipopotasemia), constipación, sedantes, insuficiencia renal, dieta hiperproteica.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la insuficiencia hepática crónica?' },
    voz: [
      'La insuficiencia hepática crónica es el estadio final de la cirrosis. Tiene lo mismo que la aguda, pero lo que predomina es la encefalopatía hepática crónica, un síndrome neuropsiquiátrico.',
      'El paciente altera su conciencia, empezando por el sueño, cambia su personalidad, como si fuera bipolar, y se deteriora intelectualmente. En lo motor, el asterixis y signos extrapiramidales, como la rigidez en rueda dentada.',
      'Y suele empeorar por un precipitante: una hemorragia digestiva, que aporta proteínas al intestino; una infección; los diuréticos; la constipación; los sedantes.',
    ],
    refs: [I('38:19'), I('39:01'), I('42:30'), I('43:11'), I('43:52'), I('45:53'), L('405'), L('406')],
  },
  {
    id: 't-aguda-cronica',
    sec: 'cronica',
    titulo: 'Aguda o crónica: el cuadro',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Aguda', 'Crónica'],
        filas: [
          ['Encefalopatía', '**Súbita**, progresiva', '**Gradual**, fluctuante'],
          ['Edema cerebral', '**Sí**', 'No'],
          ['Hígado', 'Necrosis masiva', '**Cirrosis**'],
          ['Shunts portosistémicos', 'No', '**Sí**'],
          ['Falla multiorgánica', 'Común', 'Inusual'],
          ['Precipitantes', 'No', '**Comunes**'],
          ['Pronóstico', 'Malo', 'Mejor'],
        ],
      },
      { t: 'texto', en: 1, text: 'El dato del examen que las separa: el **síndrome extrapiramidal** es de la **crónica**.' },
    ],
    examen: { origen: 'ortega', texto: 'Diferencia entre la insuficiencia hepática aguda y la crónica.', cita: 'Es un diagnóstico diferencial, pregunta de examen puede ser: la insuficiencia hepática aguda se diferencia de la crónica porque en esta última hay un síndrome extrapiramidal.', ref: I('48:03') },
    voz: [
      'Y el diagnóstico diferencial, que puede ser pregunta de examen. La aguda aparece de golpe y progresa; la crónica es gradual y fluctúa. La aguda hace edema cerebral; la crónica, no. En la aguda hay necrosis masiva; en la crónica, una cirrosis con shunts portosistémicos. La falla multiorgánica es común en la aguda e inusual en la crónica, que en cambio suele tener un precipitante. Y el pronóstico es peor en la aguda.',
      'Y un dato del examen físico que las separa: los signos extrapiramidales, parecidos a un Parkinson, son de la crónica.',
    ],
    refs: [I('47:55'), I('48:03'), I('49:16'), I('49:58'), I('50:39'), L('406')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'funciones', label: 'Qué es' },
    { id: 'aguda', label: 'Aguda' },
    { id: 'encefalopatia', label: 'Encefalopatía' },
    { id: 'sistemicas', label: 'Clínica y diagnóstico' },
    { id: 'cronica', label: 'Crónica' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Paracetamol como caramelos',
    texto: 'Una joven se automedica con paracetamol de 1 g por un dolor dental: toma más de 6 g por día durante tres días. Al cuarto día está ictérica y a los cinco días se la nota confusa y somnolienta.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Insuficiencia hepática aguda hiperaguda (O’Grady) por paracetamol: falla fulminante.', why: 'Encefalopatía en menos de 8 días, a días de la ictericia.' },
      { text: 'Cirrosis compensada.', why: 'Es un cuadro agudo en un hígado sano.' },
      { text: 'Encefalopatía hepática crónica.', why: 'No hay cirrosis ni shunts.' },
      { text: 'Hepatitis leve sin riesgo.', why: 'La encefalopatía define la insuficiencia.' },
    ],
    correcta: 0,
    razonamiento: 'Como advierte la clase, superar la dosis de paracetamol varios días puede dar una falla fulminante; la encefalopatía en menos de 8 días la hace hiperaguda.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Cirrótico que se pone raro',
    texto: 'Cirrótico conocido, internado por melena. Al segundo día invierte el sueño, está desorientado y, con los brazos extendidos, las manos aletean.',
    pregunta: '¿Qué tiene y qué lo precipitó?',
    opciones: [
      { text: 'Encefalopatía hepática grado II precipitada por la hemorragia digestiva.', why: 'La sangre en el intestino aporta proteínas y amonio.' },
      { text: 'Accidente cerebrovascular.', why: 'El asterixis y el contexto orientan a encefalopatía.' },
      { text: 'Hipoglucemia aislada.', why: 'No explica el asterixis.' },
      { text: 'Encefalopatía grado IV.', why: 'No está en coma.' },
    ],
    correcta: 0,
    razonamiento: 'Desorientación + asterixis = grado II; la hemorragia digestiva es un precipitante clásico.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Pupilas que cambian',
    texto: 'Paciente con falla hepática fulminante en coma. Aparecen bradicardia, hipertensión arterial y cambios pupilares.',
    pregunta: '¿Qué está pasando?',
    opciones: [
      { text: 'Hipertensión endocraneana por edema cerebral (edema de los astrocitos).', why: 'La causa más frecuente de muerte en la falla fulminante.' },
      { text: 'Síndrome extrapiramidal.', why: 'Es de la encefalopatía crónica.' },
      { text: 'Hipopotasemia.', why: 'No explica la bradicardia con hipertensión.' },
      { text: 'Mejoría espontánea.', why: 'Son signos de gravedad.' },
    ],
    correcta: 0,
    razonamiento: 'La glutamina acumulada en los astrocitos los hincha: edema cerebral e hipertensión endocraneana.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'agu',
        label: 'Aguda',
        tone: 'red',
        examen: true,
        nota: 'Hígado sano que falla: necrosis masiva, mortalidad 40–80 %',
        hijos: [
          { id: 'ogr', label: 'O’Grady', tone: 'red', examen: true, nota: 'Hiperaguda < 8 días · aguda 8–28 días · subaguda 4–24 semanas' },
          { id: 'ber', label: 'Bernuau', tone: 'peach', nota: 'Desde la ictericia: fulminante < 2 semanas · subfulminante 2–12' },
          { id: 'ede', label: 'Edema cerebral', tone: 'red', nota: 'Causa más frecuente de muerte' },
        ],
      },
      {
        id: 'enc',
        label: 'Encefalopatía hepática',
        tone: 'lilac',
        examen: true,
        nota: 'Amonio que no se transforma en urea y llega al cerebro',
        hijos: [
          { id: 'tri', label: 'Sospecha', tone: 'lilac', examen: true, nota: 'Ictericia + alteración de la conciencia + **asterixis**' },
          { id: 'gra', label: 'Grados', tone: 'sky', nota: '0 subclínica · I sueño · II asterixis · III estupor · IV coma' },
        ],
      },
      {
        id: 'cro',
        label: 'Crónica',
        tone: 'peach',
        examen: true,
        nota: 'Estadio final de la cirrosis',
        hijos: [
          { id: 'ext', label: 'Lo distintivo', tone: 'peach', examen: true, nota: 'Encefalopatía crónica fluctuante · **extrapiramidal** · precipitantes' },
        ],
      },
    ],
    nexos: ['**Lo que el hígado hacía, ahora falta:** coagulación, glucosa, albúmina, defensas, amonio.', '**Extrapiramidal:** crónica.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig14-d01', 'dig14-d02', 'dig14-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    funciones: { tab: 'teoria', seccion: 'funciones' },
    aguda: { tab: 'teoria', seccion: 'aguda' },
    encefalopatia: { tab: 'teoria', seccion: 'encefalopatia' },
    sistemicas: { tab: 'teoria', seccion: 'sistemicas' },
    cronica: { tab: 'teoria', seccion: 'cronica' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
