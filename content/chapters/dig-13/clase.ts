import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-13: clase visual de la cirrosis y la hipertensión portal.
 *  1. Clases de Ortega: «Cirrosis parte 1» (00:01–25:20), «parte 2» (00:01–09:08), «HTP parte 1» (00:02–20:41) y
 *     «parte 2» (00:00–26:32); aviso de las cuatro manifestaciones de la HTP en «Peritonitis parte 1» (09:03).
 *  2. Libro de Clínica Médica de Ortega (p. 393–401): definición, etiologías, alcohólica, compensada y descompensada,
 *     estigmas, Child-Pugh, HTP > 12 mmHg, colaterales, várices, ascitis, GASA, esplenomegalia y diagnóstico.
 *  3. Preguntero: «Cirrosis, hipertensión portal e insuficiencia hepática», P1–P11.
 * Correcciones sin atribuir: ver content/traceability/dig-13.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const C1 = (t: string) => r('cirr-1', t);
const C2 = (t: string) => r('cirr-2', t);
const H1 = (t: string) => r('htp-1', t);
const H2 = (t: string) => r('htp-2', t);
const PE = (t: string) => r('perit-1', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-porta',
    sec: 'cirrosis',
    titulo: 'El sistema porta normal',
    etapas: ['normal'],
    fig: { f: 'portal', vistas: ['normal'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'La **vena porta** junta la sangre del intestino (mesentérica) y del bazo (esplénica).' },
          { k: 'normal', text: 'La lleva al **hígado**, que procesa lo absorbido y la limpia.' },
          { k: 'normal', text: 'Sale por las **suprahepáticas** a la cava inferior. Presión normal: **8–10 mmHg**.' },
        ],
      },
    ],
    voz: [
      'Para entender la cirrosis y la hipertensión portal, primero el circuito normal. La vena porta junta la sangre que viene del intestino, por la mesentérica, y del bazo, por la esplénica.',
      'La lleva al hígado, que procesa lo que absorbimos, fabrica proteínas y limpia sustancias tóxicas.',
      'Y la sangre sale por las venas suprahepáticas a la cava inferior y al corazón. La presión normal en la porta es de ocho a diez milímetros de mercurio.',
    ],
    refs: [H1('04:10'), H1('04:54'), H1('05:39'), L('397')],
  },
  {
    id: 'f-cirrosis',
    sec: 'cirrosis',
    titulo: 'Qué hace la cirrosis',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'portal', vistas: ['normal', 'cirrosis'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se destruyen hepatocitos: **fibrosis** y **nódulos** de regeneración.' },
          { k: 'mecanismo', text: 'Dos problemas: el hígado **funciona menos** y **frena el paso** de la sangre portal.' },
          { k: 'signo', text: 'Insuficiencia hepática progresiva e **hipertensión portal** (> 12 mmHg).' },
        ],
      },
    ],
    voz: [
      'En la cirrosis se van destruyendo hepatocitos, y el hígado los reemplaza por fibrosis y nódulos de regeneración que desarman su arquitectura.',
      'Eso trae dos problemas. Primero, quedan menos hepatocitos, y el hígado funciona cada vez menos: el profesor la piensa como una pre insuficiencia hepática. Segundo, el hígado duro frena el paso de la sangre que llega por la porta.',
      'Así aparecen las dos caras de la cirrosis: la insuficiencia hepática progresiva, y la hipertensión portal, con más de doce milímetros de mercurio.',
    ],
    refs: [C1('00:49'), C1('01:31'), C1('02:15'), H1('04:54'), L('393'), L('397')],
  },
  {
    id: 'f-funcion',
    sec: 'estigmas',
    titulo: 'Lo que el hígado deja de hacer',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['El hígado normal…', 'Si falla'],
        filas: [
          ['Fabrica **albúmina**', 'Baja la presión oncótica: **edema, ascitis**, uñas de Terry'],
          ['Fabrica **factores de coagulación**', 'Tiempo de Quick prolongado: **equimosis, epistaxis**'],
          ['Elimina la **bilirrubina**', '**Ictericia**, prurito por colestasis'],
          ['Degrada **estrógenos**', 'Ginecomastia, **arañas vasculares**, eritema palmar'],
          ['Depura el **amonio**', 'Asterixis, confusión: **encefalopatía**'],
        ],
      },
    ],
    aclara: { text: 'El aumento de estrógenos explica las arañas vasculares y el eritema palmar; el amonio es la principal toxina de la encefalopatía.', origen: GRAL },
    voz: [
      'El profesor insiste: para entender la clínica, hay que saber qué hace el hígado normal. Si deja de fabricar albúmina, baja la presión oncótica y aparecen edemas y ascitis. Si deja de fabricar factores de coagulación, el paciente sangra: moretones, sangrado de nariz.',
      'Si no puede eliminar la bilirrubina, ictericia y prurito. Si no degrada los estrógenos, aparecen la ginecomastia, las arañas vasculares y el eritema palmar. Y si no depura el amonio, ese tóxico llega al cerebro: temblor, confusión, la encefalopatía.',
    ],
    refs: [C1('02:55'), C1('03:36'), C1('04:18'), C2('00:01'), C2('03:36'), L('395'), L('396')],
  },
  {
    id: 'f-colaterales',
    sec: 'htp',
    titulo: 'La sangre busca otro camino',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'portal', vistas: ['cirrosis', 'colaterales'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La sangre no pasa por el hígado y la porta **no tiene válvulas**.' },
          { k: 'mecanismo', text: 'Vuelve atrás y se abren comunicaciones **porto-cava** que estaban cerradas.' },
          { k: 'signo', text: '**Várices esofágicas** · **cabeza de medusa** · hemorroides.' },
        ],
      },
    ],
    voz: [
      'Con el hígado bloqueado, la sangre de la porta no puede seguir. Y como el sistema porta no tiene válvulas, la sangre vuelve hacia atrás.',
      'Busca llegar a la cava por otros caminos: se abren comunicaciones entre la porta y la cava que normalmente estaban casi cerradas.',
      'Hacia el esófago, por la vena coronaria estomáquica, aparecen las várices esofágicas. Hacia el ombligo, por la vena paraumbilical, la cabeza de medusa. Y hacia el recto, por la mesentérica inferior, las hemorroides.',
    ],
    refs: [H1('04:54'), H1('05:39'), H1('07:43'), H1('09:15'), H1('09:59'), L('397')],
  },
  {
    id: 'f-ascitis',
    sec: 'ascitis',
    titulo: 'Cómo se forma la ascitis',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'portal', vistas: ['colaterales', 'ascitis'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Presión portal alta** (más presión hidrostática) + **poca albúmina** (menos oncótica) + linfa desbordada.' },
          { k: 'mecanismo', text: 'Se pierde líquido al peritoneo; el riñón «ve» poca volemia: **renina-angiotensina-aldosterona**, simpático, ADH.' },
          { k: 'signo', text: 'Retiene agua y sodio, que vuelven a escaparse: la **ascitis crece**.' },
        ],
      },
    ],
    aclara: { text: 'La vasodilatación esplácnica de la cirrosis también reduce la volemia efectiva y sostiene la retención.', origen: 'Libro, p. 398.' },
    voz: [
      'La ascitis tiene tres causas que se suman. La presión portal alta empuja líquido fuera de los vasos; la albúmina baja ya no lo retiene adentro; y la linfa del hígado desborda lo que los linfáticos pueden drenar.',
      'Ese líquido que se va al peritoneo deja menos volumen en los vasos. El riñón lo detecta y activa el sistema renina angiotensina aldosterona, el simpático y la hormona antidiurética.',
      'Entonces retiene agua y sodio; pero ese líquido vuelve a escaparse al peritoneo, y la ascitis sigue creciendo. Es un círculo.',
    ],
    refs: [H1('17:09'), H1('17:50'), H1('18:35'), H1('19:17'), H1('19:58'), L('398')],
  },
  {
    id: 'f-bazo',
    sec: 'htp',
    titulo: 'Esplenomegalia e hiperesplenismo',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'portal', vistas: ['bazo'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La sangre del bazo tampoco puede salir: el bazo se **congestiona y crece**.' },
          { k: 'mecanismo', text: 'Un bazo grande **destruye más** células de la sangre: hiperesplenismo.' },
          { k: 'signo', text: '**Pancitopenia**: anemia, leucopenia, **plaquetopenia** (más sangrado).' },
        ],
      },
    ],
    voz: [
      'El bazo también drena a la porta. Con la presión alta, su sangre no puede salir, y el bazo se congestiona y crece: es la esplenomegalia, que casi siempre acompaña a la hipertensión portal.',
      'Un bazo grande trabaja de más, y destruye más células de la sangre: es el hiperesplenismo.',
      'El resultado es una pancitopenia: anemia, pocos glóbulos blancos y pocas plaquetas, que se suman a la falta de factores de coagulación y hacen sangrar más al paciente.',
    ],
    refs: [C1('21:19'), C1('21:59'), C2('02:11'), H2('20:55'), L('400')],
  },
  {
    id: 'f-direccion',
    sec: 'htp',
    titulo: 'Hacia dónde va la sangre',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'colateral', vistas: ['porto', 'cava'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Se comprime la vena con un dedo: **río abajo se vacía**, río arriba queda ingurgitada.' },
      { t: 'def', term: 'Porto-cava', tono: 'peach', en: 0, text: 'Desde el **ombligo** hacia afuera: arriba asciende, abajo desciende.' },
      { t: 'def', term: 'Cava-cava', tono: 'sky', en: 1, text: 'Obstrucción de la cava inferior: todo **asciende** desde abajo.' },
    ],
    voz: [
      'Y una pregunta clásica: ¿cómo sé hacia dónde va la sangre en una vena dilatada del abdomen? Se la comprime con el dedo. El tramo que está río abajo se vacía, y el que está río arriba queda lleno. Si debajo del dedo queda ingurgitada y arriba se vacía, la sangre sube. En la circulación porto cava, la sangre sale del ombligo hacia afuera: en el abdomen superior sube, y en el inferior baja.',
      'En cambio, si está obstruida la cava inferior, la circulación es cava cava, y toda la sangre sube desde abajo.',
    ],
    refs: [H1('12:56'), H1('13:38'), H1('14:21'), H1('15:02'), H1('15:45'), L('397')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'cirrosis', label: 'La cirrosis' },
    { id: 'estigmas', label: 'Lo que falla' },
    { id: 'htp', label: 'Hipertensión portal' },
    { id: 'ascitis', label: 'Ascitis' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'cirrosis',
    titulo: 'Cirrosis',
    fig: { f: 'portal', vistas: ['cirrosis'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Hepatopatía **crónica, progresiva e irreversible**: **fibrosis** y **nódulos** de regeneración que distorsionan la arquitectura.' },
      { t: 'texto', en: 1, text: 'Al principio el hígado crece; después **se achica**. Puede ser asintomática mucho tiempo.' },
    ],
    examen: { origen: 'ortega', texto: 'Cirrosis e hipertensión portal: en el oral, el parcial y el final.', cita: 'Es importante que cirrosis se lo sepan como la palma de su mano… lo preguntan muchísimo.', ref: C1('00:15') },
    voz: [
      'La cirrosis es un tema importantísimo, que el profesor pide saber como la palma de la mano. Es una hepatopatía crónica, progresiva e irreversible, con fibrosis y nódulos de regeneración, micro o macronodulares, que distorsionan la arquitectura del hígado.',
      'Al principio el hígado puede estar agrandado; después, a medida que se pierden hepatocitos y avanza la fibrosis, se achica. Y durante mucho tiempo puede no dar síntomas.',
    ],
    refs: [C1('00:01'), C1('00:15'), C1('00:49'), L('393')],
  },
  {
    id: 't-tres',
    sec: 'cirrosis',
    titulo: 'Las tres manifestaciones',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Manifestación', 'Qué es'],
        filas: [
          ['**Hipertensión portal**', 'Aumento de la presión portal: ascitis, várices'],
          ['**Encefalopatía hepática**', 'Sustancias no metabolizadas que llegan al cerebro por las colaterales; aparece tarde'],
          ['**Insuficiencia hepática**', 'El estadio final: no metaboliza, no sintetiza, no desintoxica'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: '¿Cuáles son las tres manifestaciones clínicas de la cirrosis?' },
    voz: [
      'La cirrosis se manifiesta de tres formas. La hipertensión portal, el aumento de la presión en la porta, con ascitis y várices. La encefalopatía hepática, por sustancias que el hígado no metabolizó y que llegan al cerebro por las colaterales; aparece tarde, y algunos la consideran ya el comienzo de la insuficiencia. Y la insuficiencia hepática, el estadio final, cuando el hígado ya no puede metabolizar, sintetizar ni desintoxicar.',
    ],
    refs: [C1('04:18'), C1('05:00'), C1('05:42'), L('393')],
  },
  {
    id: 't-etiologia',
    sec: 'cirrosis',
    titulo: 'Causas',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Grupo', 'Causas'],
        filas: [
          ['Tóxicas', '**Alcohol** (la más frecuente), fármacos'],
          ['Virales', 'Hepatitis **B y C**'],
          ['Metabólica', '**Hígado graso no alcohólico** (obesidad)'],
          ['Autoinmunes y colestásicas', 'Cirrosis biliar primaria (mujeres, **antimitocondriales**), hepatitis autoinmune'],
          ['Genéticas', 'Hemocromatosis (**hierro**), Wilson (**cobre**), déficit de alfa-1-antitripsina'],
          ['Retorno venoso', 'Insuficiencia cardíaca, **Budd-Chiari**, pericarditis constrictiva'],
          ['Criptogénica', '10–15 %: no se encuentra la causa'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Etiologías de la cirrosis.' },
    voz: [
      'Las causas. La más frecuente es el alcohol; le siguen el hígado graso no alcohólico, por la obesidad, y las hepatitis virales B y C. Hay causas autoinmunes, como la cirrosis biliar primaria, de mujeres, con anticuerpos antimitocondriales, y la hepatitis autoinmune.',
      'Genéticas, como la hemocromatosis, que deposita hierro, la enfermedad de Wilson, que deposita cobre, y el déficit de alfa uno antitripsina. Las que obstruyen el retorno venoso, como la insuficiencia cardíaca o el Budd-Chiari. Y en un diez a quince por ciento no se encuentra la causa: la cirrosis criptogénica.',
    ],
    refs: [C1('06:24'), C1('07:05'), C1('08:26'), C1('16:31'), C1('18:32'), L('393'), L('394'), L('395')],
  },
  {
    id: 't-alcoholica',
    sec: 'cirrosis',
    titulo: 'Cirrosis alcohólica',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Cirrosis de **Laennec**: hígado graso → hepatitis alcohólica → cirrosis.' },
      { t: 'texto', en: 1, text: 'Pesan la **cantidad y la duración** del consumo, el sexo, las **hepatitis B o C** previas y la nutrición.' },
      { t: 'lista', en: 2, items: ['Desnutrición: neuritis, glositis, anemias.', '**Hipertrofia parotídea** bilateral, ginecomastia.', 'Náuseas **matutinas**, contractura de **Dupuytren**.', '**Pancreatitis crónica** (el alcohol es su causa más frecuente).', 'Falta de memoria, insomnio, hepatoesplenomegalia.'] },
    ],
    voz: [
      'La cirrosis alcohólica, o de Laennec, pasa por etapas: primero hígado graso, después hepatitis alcohólica, y finalmente cirrosis.',
      'Importan la cantidad y los años de consumo: cuanto más se toma, más rápido. También el sexo, las hepatitis B o C previas, y la nutrición. El ejemplo de la clase: un bebedor que de joven tuvo una hepatitis B puede llegar a la cirrosis años antes que otro.',
      'Al cuadro hepático se suman los signos del alcoholismo: desnutrición con neuritis y glositis, hipertrofia de las parótidas, ginecomastia, náuseas por la mañana, la contractura de Dupuytren en la palma, la pancreatitis crónica, de la que el alcohol es la causa más frecuente, la falta de memoria y el insomnio.',
    ],
    refs: [C1('08:26'), C1('09:46'), C1('11:06'), C1('12:26'), C1('14:29'), C1('15:09'), L('393'), L('394')],
  },
  {
    id: 't-compensada',
    sec: 'estigmas',
    titulo: 'Compensada y descompensada',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Compensada', tono: 'mint', items: ['Latente por años: **asintomática** o síntomas inespecíficos', 'Certeza: **biopsia**', 'Laboratorio: pancitopenia, Quick bajo, transaminasas y gammaglobulinas altas, albúmina y colesterol bajos'] },
          { titulo: 'Descompensada', tono: 'red', items: ['Todo lo anterior **acentuado**', '**+ hipertensión portal**: ascitis, várices', 'Febrícula, desnutrición, aliento hepático, ictericia, prurito'] },
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Manifestaciones clínicas de cirrosis compensada y descompensada.' },
    voz: [
      'La cirrosis compensada puede quedar latente por años: el paciente está asintomático o tiene síntomas inespecíficos, y el diagnóstico de certeza lo da la biopsia. El laboratorio va cambiando: pancitopenia por el bazo, tiempo de protrombina prolongado, transaminasas y gammaglobulinas altas, y albúmina y colesterol bajos.',
      'La descompensada tiene todo eso acentuado, y algo que el profesor pide no olvidar: se le agrega la hipertensión portal. Además, febrícula, desnutrición, ictericia y prurito. Alrededor del sesenta por ciento se descompensa a los diez años del diagnóstico.',
    ],
    refs: [C1('19:18'), C1('20:38'), C1('21:59'), C1('23:20'), C1('24:00'), L('395')],
  },
  {
    id: 't-piel',
    sec: 'estigmas',
    titulo: 'Estigmas en la piel',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Estigma', 'Dato'],
        filas: [
          ['**Arañas vasculares**', 'En el territorio de la cava superior; no confundir con estrías'],
          ['**Eritema palmar**', 'Eminencias tenar e hipotenar; no es patognomónico (embarazo, hipertiroidismo)'],
          ['**Uñas de Terry**', 'Proximal blanca, distal roja: **hipoalbuminemia**'],
          ['Equimosis, epistaxis', 'Faltan factores de coagulación y plaquetas'],
          ['Hiperpigmentación, xantelasmas', 'Colestasis'],
          ['**Ictericia**', 'No elimina la bilirrubina'],
        ],
      },
    ],
    voz: [
      'Los estigmas en la piel. Las arañas vasculares, pequeños capilares dilatados en el territorio de la cava superior, que no hay que confundir con estrías. El eritema palmar, en las eminencias tenar e hipotenar, que no es patognomónico: aparece también en el embarazo o el hipertiroidismo.',
      'Las uñas de Terry, blancas en la parte proximal y rojas en la distal, por la albúmina baja. Moretones y sangrado de nariz, por falta de factores de coagulación y de plaquetas. La hiperpigmentación y los xantelasmas, por la colestasis. Y la ictericia.',
    ],
    refs: [C2('00:01'), C2('00:43'), C2('01:29'), C2('02:11'), C2('02:51'), L('395')],
  },
  {
    id: 't-chvostek',
    sec: 'estigmas',
    titulo: 'Hábito de Chvostek y otras alteraciones',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Hábito de Chvostek', tono: 'lilac', text: 'En el hombre: **más estrógenos, menos andrógenos** → ginecomastia bilateral, atrofia testicular, vello de distribución femenina.' },
      { t: 'def', term: 'Neurológicas', tono: 'sky', en: 1, text: 'Alteración de la conciencia, temblor, **asterixis** (flapping) → encefalopatía y coma.' },
      { t: 'def', term: 'Circulatorias', tono: 'peach', en: 1, text: 'Vasodilatación generalizada: **taquicardia e hipotensión**.' },
      { t: 'texto', en: 2, soloWeb: true, text: 'Síndromes hepatopulmonar y hepatorrenal: funcionales; en clase se aclara que no se preguntan.' },
    ],
    voz: [
      'En el hombre cirrótico, el hígado deja de degradar los estrógenos y bajan los andrógenos: es el hábito de Chvostek, con ginecomastia bilateral, atrofia testicular y vello de distribución femenina.',
      'En los estadios avanzados aparecen las alteraciones neurológicas: cambios en la conciencia, temblor, y el asterixis, ese aleteo de las manos, que anuncian la encefalopatía. Y alteraciones circulatorias: una vasodilatación generalizada, con taquicardia e hipotensión.',
    ],
    refs: [C1('13:08'), C1('13:49'), C2('03:36'), C2('04:19'), C2('05:00'), L('396')],
  },
  {
    id: 't-child',
    sec: 'child',
    titulo: 'Clasificación de Child-Pugh',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['BATEA', '1 punto', '2 puntos', '3 puntos'],
        filas: [
          ['**B**ilirrubina (mg/dl)', '< 2', '2–3', '> 3'],
          ['**A**lbúmina (g/dl)', '> 3,5', '2,8–3,5', '< 2,8'],
          ['**T**iempo de Quick (%)', '> 70', '40–70', '< 40'],
          ['**E**ncefalopatía', 'Ausente', 'I–II', 'III–IV'],
          ['**A**scitis', 'Ausente', 'Leve', 'Moderada'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La clasificación de Child-Pugh.', cita: 'Pregunta de parcial, como el Padre Nuestro me tienen que saber la clasificación de Child-Pugh. El que no se sepa esto… lo bochan directamente.', ref: C2('07:14') },
    voz: [
      'La clasificación de Child-Pugh, que el profesor pide como el Padre Nuestro: el que no la sabe, lo bochan. Mide el pronóstico y la sobrevida. Se recuerda con la palabra BATEA: bilirrubina, albúmina, tiempo de Quick, encefalopatía y ascitis.',
      'Cada uno suma de uno a tres puntos. Bilirrubina: menos de dos, uno; de dos a tres, dos; más de tres, tres. Albúmina: más de tres y medio, uno; de dos ocho a tres y medio, dos; menos de dos ocho, tres. Quick: más de setenta, uno; de cuarenta a setenta, dos; menos de cuarenta, tres. Encefalopatía y ascitis: ausentes, uno; leves, dos; graves, tres.',
    ],
    refs: [C2('07:04'), C2('07:14'), C2('07:47'), L('396')],
  },
  {
    id: 't-child-grados',
    sec: 'child',
    titulo: 'Child A, B y C',
    amplio: true,
    bloques: [
      { t: 'def', term: 'A · 5 a 6 puntos', tono: 'mint', text: 'Cirrosis **compensada**.' },
      { t: 'def', term: 'B · 7 a 9 puntos', tono: 'gold', en: 1, text: 'Descompensada, todavía **reversible**.' },
      { t: 'def', term: 'C · 10 a 15 puntos', tono: 'red', en: 2, text: 'Descompensada: se recomienda el **trasplante** hepático.' },
    ],
    voz: [
      'Y la suma da el grado. Child A, de cinco a seis puntos: una cirrosis compensada.',
      'Child B, de siete a nueve: descompensada, pero todavía puede revertirse a compensada.',
      'Y Child C, de diez a quince: descompensada, y lo que le salva la vida es el trasplante de hígado.',
    ],
    refs: [C2('07:47'), C2('08:28'), L('396')],
  },
  {
    id: 't-htp-def',
    sec: 'htp',
    titulo: 'Hipertensión portal',
    fig: { f: 'portal', vistas: ['colaterales'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Presión portal **> 12 mmHg** (normal 8–10). Causa más frecuente: la **cirrosis**.' },
      { t: 'lista', en: 1, items: ['**Várices** esofágicas.', '**Ascitis**.', '**Esplenomegalia**.', '**Circulación colateral**.'] },
      { t: 'prof', en: 1, text: 'Las várices, la ascitis, la esplenomegalia y la circulación colateral caracterizan al paciente con hipertensión portal: esto es pregunta de examen.', ref: PE('09:08') },
    ],
    examen: { origen: 'ortega', texto: 'Qué es la hipertensión portal.', cita: 'La hipertensión portal es pregunta de parcial.', ref: H1('00:14') },
    voz: [
      'La hipertensión portal, pregunta de parcial, es el aumento de la presión en el sistema porta por encima de doce milímetros de mercurio, cuando lo normal es de ocho a diez. La causa más frecuente es la cirrosis, y aparece cuando ya está descompensada.',
      'Y la caracterizan cuatro cosas, que el profesor también marcó como pregunta de examen: las várices esofágicas, la ascitis, la esplenomegalia y la circulación colateral.',
    ],
    refs: [H1('00:02'), H1('00:14'), PE('09:03'), PE('09:08'), L('397')],
  },
  {
    id: 't-htp-causas',
    sec: 'htp',
    titulo: 'Causas según el sitio',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Sitio', 'Causas'],
        filas: [
          ['**Prehepática**', 'Trombosis de la vena porta o de la esplénica'],
          ['**Hepática**', '**Cirrosis** (sinusoidal): la más frecuente'],
          ['**Suprahepática**', '**Budd-Chiari** (suprahepáticas), cava inferior, insuficiencia cardíaca derecha, pericarditis constrictiva'],
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: 'Clasificación prehepática, hepática y poshepática de la HTP. Etiologías.' },
    voz: [
      'Según dónde está el obstáculo, la hipertensión portal es prehepática, por una trombosis de la porta o de la esplénica; hepática, y la más frecuente de todas es la cirrosis, a nivel sinusoidal; o suprahepática: el síndrome de Budd-Chiari, que obstruye las suprahepáticas, una obstrucción de la cava inferior, o un problema del corazón, como la insuficiencia cardíaca derecha o la pericarditis constrictiva, que aumenta la presión hacia atrás.',
    ],
    refs: [H1('00:44'), H1('01:25'), H1('02:06'), H1('02:47'), H1('03:29'), H1('04:10'), L('397')],
  },
  {
    id: 't-colaterales',
    sec: 'htp',
    titulo: 'Circulación colateral',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Profunda', tono: 'lilac', items: ['**Várices esofágicas**: coronaria estomáquica → ácigos (la más importante)', 'Hemorroides: mesentérica inferior → rectales', 'Retroperitoneales (poco frecuentes)'] },
          { titulo: 'Superficial', tono: 'peach', items: ['**Porto-cava** por la vena paraumbilical', 'Desde el ombligo hacia la base del tórax', '**Cabeza de medusa**'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Cuáles son las circulaciones colaterales.', cita: 'Pregunta de parcial: ¿cuáles son las circulaciones venosas colaterales? ¿Cuántas hay?', ref: H1('06:12') },
    voz: [
      'La circulación colateral, pregunta de parcial, puede ser profunda o superficial. La profunda: las várices esofágicas, la más importante, por la vena coronaria estomáquica hacia las ácigos; las hemorroides, por la mesentérica inferior hacia las venas rectales; y las retroperitoneales, poco frecuentes.',
      'La superficial es la porto cava, por la vena paraumbilical: venas dilatadas que salen del ombligo hacia la base del tórax, y que cuando son muy marcadas forman la cabeza de medusa.',
    ],
    refs: [H1('05:39'), H1('06:12'), H1('07:43'), H1('09:15'), H1('10:43'), H1('12:09'), L('397')],
  },
  {
    id: 't-varices',
    sec: 'htp',
    titulo: 'Várices esofágicas',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: '**30 %** de las compensadas y **60 %** de las descompensadas. Su sangrado es una **emergencia**: muere el 20 %.' },
      { t: 'lista', en: 1, items: ['Diagnóstico: **endoscopía digestiva alta**.', 'Más riesgo de sangrar: **> 5 mm**, signo rojo, peor función hepática.'] },
    ],
    examen: { origen: 'ortega', texto: 'Las várices esofágicas.', cita: 'La profunda, las várices esofágicas, es la que yo sí o sí quiero que sepan.', ref: H1('12:09') },
    voz: [
      'De la circulación profunda, lo que el profesor pide sí o sí son las várices esofágicas. Están en el treinta por ciento de las cirrosis compensadas y en el sesenta por ciento de las descompensadas, y su sangrado es una emergencia, una causa muy frecuente de muerte en estos pacientes.',
      'Se diagnostican con una endoscopía digestiva alta. Sangran más cuando miden más de cinco milímetros, tienen signo rojo, o la función del hígado es peor.',
    ],
    refs: [H1('10:43'), H1('11:26'), H1('12:09'), L('397')],
  },
  {
    id: 't-direccion',
    sec: 'htp',
    titulo: '¿Ascendente o descendente?',
    fig: { f: 'colateral', vistas: ['porto'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Se comprime la vena: queda **ingurgitada antes** del dedo y se **vacía después**.' },
      { t: 'lista', en: 1, items: ['Llena **abajo** y vacía **arriba**: la sangre **sube**.', 'Llena **arriba** y vacía **abajo**: la sangre **baja**.'] },
    ],
    examen: { origen: 'ortega', texto: 'Cómo se determina si la circulación es ascendente o descendente.', cita: 'Pregunta de parcial… lo preguntan en el oral y lo preguntan en el final: ¿cómo diferencio yo si una circulación es ascendente o descendente?', ref: H1('12:56') },
    voz: [
      'Y la maniobra que se pregunta en el parcial, en el oral y en el final: ¿cómo sé si la circulación es ascendente o descendente? Se busca la vena dilatada y se la comprime con un dedo. Las venas son blandas y se cierran fácil. Antes del dedo la sangre se acumula, y después del dedo la vena se vacía.',
      'Si queda llena por debajo del dedo y se vacía por arriba, la sangre estaba subiendo. Si queda llena por arriba y se vacía por debajo, estaba bajando.',
    ],
    refs: [H1('12:56'), H1('13:38'), H1('14:21'), H1('15:02'), H1('15:45')],
  },
  {
    id: 't-bazo',
    sec: 'htp',
    titulo: 'Esplenomegalia',
    fig: { f: 'portal', vistas: ['bazo'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Casi siempre acompaña a la hipertensión portal: un signo muy importante para el diagnóstico.' },
      { t: 'texto', en: 1, text: '**Hiperesplenismo** → **pancitopenia**: anemia, leucopenia, trombocitopenia.' },
    ],
    voz: [
      'La esplenomegalia casi siempre acompaña a la hipertensión portal, así que es un signo muy importante para pensarla.',
      'Y el bazo grande produce hiperesplenismo: destruye glóbulos rojos, glóbulos blancos y plaquetas, y aparece una pancitopenia.',
    ],
    refs: [C1('21:19'), H2('20:55'), L('400')],
  },
  {
    id: 't-ascitis',
    sec: 'ascitis',
    titulo: 'Ascitis',
    fig: { f: 'portal', vistas: ['ascitis'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'sky', text: 'Acumulación de líquido en la **cavidad peritoneal**. En el **80 %**, por **hipertensión portal**.' },
      { t: 'texto', en: 1, text: 'Consultan por **aumento del diámetro abdominal y del peso**, digestiones pesadas, hernias, disnea. Con edemas: síndrome **ascítico-edematoso**.' },
    ],
    examen: { origen: 'ortega', texto: 'La ascitis.', cita: 'Ascitis pregunta muchísimo. Muy preguntado. Cuando fui a rendir el final de clínica médica, a mí me preguntaron ascitis.', ref: H1('16:27') },
    voz: [
      'La ascitis, que el profesor marca como muy preguntada: a él mismo se la tomaron en el final de clínica médica. Es la acumulación de líquido en la cavidad peritoneal, y en el ochenta por ciento la causa es la hipertensión portal.',
      'El paciente consulta porque le aumentó el diámetro del abdomen y el peso, tiene digestiones pesadas, hernias o le falta el aire. Si además tiene edemas, es un síndrome ascítico edematoso.',
    ],
    refs: [H1('16:27'), H1('16:46'), H2('00:00'), H2('06:38'), L('398')],
  },
  {
    id: 't-ascitis-examen',
    sec: 'ascitis',
    titulo: 'Examen físico de la ascitis',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Paso', 'Hallazgo'],
        filas: [
          ['Inspección', 'Abdomen globoso, **ombligo evertido**, flancos abombados (batracio), circulación colateral, estigmas'],
          ['Auscultación', 'RHA **ausentes** en la zona del líquido'],
          ['Percusión', '**Matidez de concavidad superior**, **matidez desplazable** (> 1000 ml), onda ascítica, témpano'],
          ['Palpación', 'Hepato o esplenomegalia; suele ser indolora'],
        ],
      },
      { t: 'prof', en: 1, text: 'Lo que sí o sí tienen que leer es percusión; eso sí o sí tienen que saber hacerlo.', ref: H2('11:54') },
    ],
    voz: [
      'En el examen físico de la ascitis: a la inspección, un abdomen globoso, con el ombligo hacia afuera, los flancos abombados como un batracio, y a veces circulación colateral y estigmas de cirrosis. A la auscultación, no hay ruidos donde está el líquido.',
      'La percusión es lo que el profesor pide saber hacer sí o sí: matidez de concavidad superior con el paciente boca arriba, matidez que se desplaza al girarlo, que indica más de un litro, y con más líquido, la onda ascítica y el signo del témpano. A la palpación se busca el hígado y el bazo.',
    ],
    refs: [H2('08:54'), H2('09:36'), H2('10:19'), H2('11:46'), H2('11:54'), L('399')],
  },
  {
    id: 't-paracentesis',
    sec: 'ascitis',
    titulo: 'Paracentesis y GASA',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El **primer estudio** ante toda ascitis: diagnóstico y evacuador. Imprescindibles: **recuento celular, albúmina y proteínas totales**.' },
      { t: 'def', term: 'GASA ≥ 1,1 g/dl', tono: 'red', en: 1, text: 'Hay **hipertensión portal**: cirrosis, insuficiencia cardíaca, Budd-Chiari, metástasis hepáticas.' },
      { t: 'def', term: 'GASA < 1,1 g/dl', tono: 'sky', en: 1, text: 'No hay HTP: carcinomatosis peritoneal, tuberculosis, pancreatitis, síndrome nefrótico.' },
    ],
    examen: { origen: 'ortega', texto: 'El gradiente de albúmina sero-ascítico (GASA).', cita: 'Utilizamos un gradiente, pregunta de parcial: ¿cómo se llama ese gradiente? Gradiente albúmina sero-ascítica.', ref: H2('17:10') },
    voz: [
      'Ante toda ascitis, el primer estudio es la paracentesis, que diagnostica y a la vez drena. Lo que no puede faltar en el líquido es el recuento celular, la albúmina y las proteínas totales.',
      'Con la albúmina se calcula el gradiente de albúmina sero ascítico, el GASA, pregunta de parcial: la albúmina de la sangre menos la del líquido. Si es mayor o igual a uno coma uno gramos por decilitro, hay hipertensión portal: cirrosis, insuficiencia cardíaca, Budd-Chiari. Si es menor, la ascitis tiene otra causa, que no afecta a la porta: una carcinomatosis, una tuberculosis, una pancreatitis o un síndrome nefrótico.',
    ],
    refs: [H2('12:28'), H2('15:57'), H2('16:40'), H2('17:10'), H2('17:49'), H2('18:49'), L('399'), L('400')],
  },
  {
    id: 't-liquido',
    sec: 'ascitis',
    titulo: 'El líquido ascítico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Hallazgo', 'Pensar en'],
        filas: [
          ['Transparente', 'Normal (trasudado)'],
          ['Opalescente; lechoso con TG > 200 mg/dl', 'Obstrucción linfática: **ascitis quilosa**; PBE, TBC'],
          ['Rosa claro o hemático', 'Cirrosis, neoplasia, TBC, pancreatitis, trauma'],
          ['**≥ 250 neutrófilos/mm³**', '**PBE** (E. coli, traslocación bacteriana)'],
          ['Predominio de linfocitos', '**Tuberculosis** o carcinomatosis'],
        ],
      },
      { t: 'prof', en: 1, text: '¿Cómo sabemos si el paciente tiene una infección del líquido ascítico? Eso es pregunta de parcial.', ref: H2('05:25') },
    ],
    voz: [
      'Y el aspecto y las células del líquido. Transparente es lo normal. Opalescente o lechoso, con triglicéridos por encima de doscientos, indica una obstrucción linfática: la ascitis quilosa. Rosado o con sangre, una cirrosis, una neoplasia, una tuberculosis o un traumatismo.',
      'Y la pregunta de parcial: ¿cómo sé si el líquido está infectado? Con doscientos cincuenta neutrófilos o más por milímetro cúbico: es una peritonitis bacteriana espontánea, por traslocación, en general por Escherichia coli. Si predominan los linfocitos, hay que pensar en tuberculosis o carcinomatosis.',
    ],
    refs: [H2('05:10'), H2('05:25'), H2('13:10'), H2('13:52'), H2('14:33'), H2('15:13'), L('399'), L('400')],
  },
  {
    id: 't-dx',
    sec: 'diagnostico',
    titulo: 'Diagnóstico',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Anamnesis', tono: 'peach', text: '**Alcohol**; fármacos hepatotóxicos (metildopa, isoniazida, amiodarona, metotrexato); contagio de hepatitis (transfusiones, drogas, tatuajes, sexual); familiares.' },
      { t: 'def', term: 'Laboratorio', tono: 'lilac', en: 1, text: 'Necrosis: **GOT, GPT** · colestasis: bilirrubina directa, **FA, GGT, 5′-nucleotidasa** · función: **Quick** prolongado, albúmina < 3,5, seudocolinesterasa baja, hipergammaglobulinemia.' },
      { t: 'def', term: 'Imágenes', tono: 'sky', en: 2, text: '**Ecografía** con Doppler (hígado, bazo, ascitis, porta); **endoscopía** para várices. **Biopsia**: certeza y causa.' },
    ],
    voz: [
      'Para el diagnóstico, la anamnesis busca el alcohol, los fármacos tóxicos para el hígado, las vías de contagio de las hepatitis y los antecedentes familiares.',
      'El laboratorio separa tres cosas: la necrosis, con las transaminasas; la colestasis, con la bilirrubina directa, la fosfatasa alcalina, la gamma GT y la cinco prima nucleotidasa; y la función, con el tiempo de Quick prolongado, la albúmina baja y la seudocolinesterasa baja. El hemograma puede mostrar anemia o pancitopenia, y hay pruebas para cada causa.',
      'En imágenes, la ecografía con Doppler muestra el hígado, el bazo, la ascitis y la porta; la endoscopía busca las várices. Y la biopsia da el diagnóstico de certeza y, muchas veces, la causa.',
    ],
    refs: [H2('20:55'), H2('21:37'), H2('22:20'), H2('23:04'), H2('25:10'), H2('26:32'), L('400'), L('401')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'cirrosis', label: 'Cirrosis' },
    { id: 'estigmas', label: 'Clínica' },
    { id: 'child', label: 'Child-Pugh' },
    { id: 'htp', label: 'Hipertensión portal' },
    { id: 'ascitis', label: 'Ascitis' },
    { id: 'diagnostico', label: 'Diagnóstico' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'El bebedor que tuvo hepatitis B',
    texto: 'Un hombre que bebe mucho desde joven tuvo una hepatitis B a los 20 años. A los 35 ya tiene una cirrosis, cuando otros bebedores tardan décadas.',
    pregunta: '¿Qué explica la evolución rápida?',
    opciones: [
      { text: 'La hepatitis viral previa potencia el daño del alcohol.', why: 'Un factor que acelera la progresión, junto con la cantidad, la duración y la nutrición.' },
      { text: 'La edad joven protege al hígado.', why: 'No explica la progresión.' },
      { text: 'La cirrosis alcohólica es siempre rápida.', why: 'Depende de cantidad, duración y factores asociados.' },
      { text: 'Es una cirrosis criptogénica.', why: 'Tiene dos causas claras.' },
    ],
    correcta: 0,
    razonamiento: 'El ejemplo de la clase: el antecedente de hepatitis B o C acorta el camino hacia la cirrosis en un bebedor.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Calcular el Child',
    texto: 'Cirrótico con bilirrubina 2,5 mg/dl, albúmina 3,0 g/dl, Quick 50 %, sin encefalopatía y con ascitis leve.',
    pregunta: '¿Qué Child tiene?',
    opciones: [
      { text: 'Child B (9 puntos).', why: 'Bilirrubina 2 + albúmina 2 + Quick 2 + encefalopatía 1 + ascitis 2 = 9.' },
      { text: 'Child A (6 puntos).', why: 'Suma más de 6.' },
      { text: 'Child C (11 puntos).', why: 'Suma 9.' },
      { text: 'No se puede calcular.', why: 'Están los cinco parámetros: BATEA.' },
    ],
    correcta: 0,
    razonamiento: 'BATEA: 2 + 2 + 2 + 1 + 2 = 9 → Child B, descompensada todavía reversible.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Ascitis y GASA',
    texto: 'Mujer con ascitis. Albúmina sérica 3,2 g/dl; albúmina del líquido 2,8 g/dl. Recuento: predominio de linfocitos.',
    pregunta: '¿Qué indica?',
    opciones: [
      { text: 'GASA 0,4 (< 1,1): sin hipertensión portal; pensar en tuberculosis o carcinomatosis.', why: 'Gradiente bajo y linfocitos.' },
      { text: 'Hipertensión portal por cirrosis.', why: 'Daría GASA ≥ 1,1.' },
      { text: 'Peritonitis bacteriana espontánea.', why: 'Requiere ≥ 250 neutrófilos.' },
      { text: 'Insuficiencia cardíaca.', why: 'Da GASA ≥ 1,1.' },
    ],
    correcta: 0,
    razonamiento: 'GASA = 3,2 − 2,8 = 0,4: la porta no está comprometida; los linfocitos orientan a TBC o carcinomatosis.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Venas en el abdomen',
    texto: 'Cirrótico con venas dilatadas alrededor del ombligo. Al comprimir una vena del abdomen superior, queda llena por debajo del dedo y se vacía por arriba.',
    pregunta: '¿Qué tipo de circulación es?',
    opciones: [
      { text: 'Porto-cava superficial, ascendente en el abdomen superior.', why: 'La sangre sale del ombligo hacia el tórax.' },
      { text: 'Cava-cava descendente.', why: 'La sangre sube.' },
      { text: 'Circulación profunda: várices.', why: 'Las várices no se ven en la pared.' },
      { text: 'Normal.', why: 'Las venas no se ven dilatadas normalmente.' },
    ],
    correcta: 0,
    razonamiento: 'Llena abajo y vacía arriba: la sangre sube. En la porto-cava sale del ombligo hacia afuera.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'cir',
        label: 'Cirrosis',
        tone: 'peach',
        examen: true,
        nota: 'Crónica, progresiva, irreversible: fibrosis y nódulos',
        hijos: [
          { id: 'cau', label: 'Causas', tone: 'peach', nota: '**Alcohol** · hígado graso · virus B y C · autoinmunes · genéticas · retorno venoso' },
          { id: 'com', label: 'Compensada / descompensada', tone: 'gold', nota: 'Descompensada = todo acentuado **+ HTP**' },
          { id: 'chi', label: 'Child-Pugh', tone: 'red', examen: true, nota: '**BATEA** · A 5–6 · B 7–9 · C 10–15 (trasplante)' },
        ],
      },
      {
        id: 'htp',
        label: 'Hipertensión portal',
        tone: 'lilac',
        examen: true,
        nota: '> 12 mmHg · la cirrosis es la causa más frecuente',
        hijos: [
          { id: 'var', label: 'Colaterales', tone: 'lilac', examen: true, nota: '**Várices esofágicas** · cabeza de medusa · hemorroides · dirección del flujo' },
          { id: 'asc', label: 'Ascitis', tone: 'sky', examen: true, nota: 'Paracentesis · **GASA ≥ 1,1** = HTP · ≥ 250 neutrófilos = PBE' },
          { id: 'baz', label: 'Esplenomegalia', tone: 'rose', nota: 'Hiperesplenismo → pancitopenia' },
        ],
      },
    ],
    nexos: ['**Las cuatro de la HTP:** várices, ascitis, esplenomegalia, circulación colateral.', '**Si el hígado no hace algo, aparece su signo:** albúmina, coagulación, bilirrubina, estrógenos, amonio.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig13-d01', 'dig13-d02', 'dig13-d03', 'dig13-d04', 'dig13-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    cirrosis: { tab: 'teoria', seccion: 'cirrosis' },
    estigmas: { tab: 'teoria', seccion: 'estigmas' },
    child: { tab: 'teoria', seccion: 'child' },
    htp: { tab: 'teoria', seccion: 'htp' },
    ascitis: { tab: 'teoria', seccion: 'ascitis' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
