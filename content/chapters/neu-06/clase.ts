import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * neu-06: clase visual de otros síndromes neurológicos: sensibilidad, hipertensión endocraneana y síndrome meníngeo.
 *  1. Clases de Ortega: «Síndromes del SN» partes 5, 6 y 7, la grabación del 26/10 (repaso de HTE y meningitis) y
 *     «Meningeo y osteo» (práctica de signos meníngeos); sensibilidad en «Síndromes del SN parte 2» y «MC parte 4».
 *  2. Libro del profesor (p. 499: tríada de la HTE).
 * Ver content/traceability/neu-06.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S2 = (t: string) => r('sn-2', t);
const S5 = (t: string) => r('sn-5', t);
const S6 = (t: string) => r('sn-6', t);
const S7 = (t: string) => r('sn-7', t);
const RC = (t: string) => r('neu-rec-1026', t);
const MO = (t: string) => r('meningeo-osteo', t);
const M4 = (t: string) => r('mc-neu-4', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';
const BIBLIO = 'Precisión de la bibliografía, no se da así en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-componentes',
    sec: 'hte',
    titulo: 'Tres componentes en una caja que no se estira',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'craneo', vistas: ['normal', 'componentes', 'hte'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Dentro del cráneo hay **parénquima**, **sangre** (sobre todo venosa) y **líquido cefalorraquídeo**.' },
          { k: 'alteracion', text: 'Si uno aumenta, los otros dos tienen que bajar para compensar; casi nunca alcanza.' },
          { k: 'signo', text: 'Cuando la presión supera **15 mmHg** (20 cm de agua): **hipertensión endocraneana**.' },
        ],
      },
    ],
    voz: [
      'Dentro del cráneo, que es una caja rígida, hay tres componentes: el parénquima cerebral, la sangre, sobre todo la venosa, y el líquido cefalorraquídeo.',
      'Si uno de ellos aumenta, por ejemplo por un tumor, los otros dos tienen que disminuir para que la presión no suba. Pero esa compensación es limitada: rara vez se puede bajar la sangre o el líquido lo suficiente.',
      'Cuando la presión dentro del cráneo supera los quince milímetros de mercurio, o veinte centímetros de agua, hablamos de hipertensión endocraneana. Ojo: es un aumento de la presión del líquido, no necesariamente de su cantidad.',
    ],
    refs: [S5('00:04'), S5('00:46'), S5('01:28'), S5('04:16'), S5('05:00'), S5('07:09')],
  },
  {
    id: 'f-cushing',
    sec: 'hte',
    titulo: 'El efecto Cushing',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'craneo', vistas: ['hte'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La presión comprime los vasos: **isquemia**, hipoxia e hipercapnia del tronco.' },
          { k: 'mecanismo', text: 'Se activa el centro **vasoconstrictor**: sube la presión arterial para empujar sangre al cerebro.' },
          { k: 'signo', text: 'Los **barorreceptores** frenan el corazón: **hipertensión + bradicardia + alteraciones respiratorias**.' },
        ],
      },
    ],
    aclara: { text: 'La bradicardia es la respuesta refleja de los barorreceptores a la hipertensión arterial.', origen: GRAL },
    voz: [
      'Cuando la hipertensión endocraneana es grave, comprime los vasos del cerebro: hay isquemia, falta oxígeno y se acumula dióxido de carbono en el tronco.',
      'El centro vasomotor responde con vasoconstricción: sube la presión arterial, para intentar empujar más sangre hacia el cerebro.',
      'Y los barorreceptores, ante esa hipertensión, frenan el corazón. El resultado es el efecto Cushing: hipertensión arterial, bradicardia y alteraciones de la respiración. No hay que confundirlo con el síndrome de Cushing.',
    ],
    refs: [S6('01:29'), S6('02:15'), S6('02:56'), S6('03:36'), S6('04:20'), RC('23:13'), RC('23:55')],
  },
  {
    id: 'f-hernias',
    sec: 'hte',
    titulo: 'Cuando ya no compensa: las hernias',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'craneo', vistas: ['subfalcina', 'uncal', 'amigdalina'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Subfalcina', tono: 'peach', text: 'Bajo la **hoz del cerebro**: compromete la circulación anterior.' },
      { t: 'def', term: 'Uncal (transtentorial)', tono: 'red', en: 1, text: 'La **más frecuente**: el uncus comprime el **mesencéfalo** (y el III: **midriasis**).' },
      { t: 'def', term: 'Amigdalina', tono: 'red', en: 2, text: 'Las amígdalas del cerebelo bajan por el **agujero occipital** y comprimen el **bulbo**: paro cardiorrespiratorio.' },
    ],
    voz: [
      'Cuando los mecanismos de compensación fallan, el cerebro se desplaza y se hernia. La hernia subfalcina pasa por debajo de la hoz del cerebro y compromete la circulación anterior.',
      'La transtentorial, o uncal, es la más frecuente: el uncus del lóbulo temporal pasa por la tienda del cerebelo y comprime el mesencéfalo, con el tercer par: aparece midriasis.',
      'Y la amigdalina: las amígdalas del cerebelo bajan por el agujero occipital y comprimen el bulbo, que maneja la respiración y el corazón. Es la hernia mortal. El profesor aclara que las hernias se preguntan más en un choice que en el oral.',
    ],
    refs: [S5('08:23'), S5('09:18'), S5('10:03'), S5('10:44'), S5('11:26'), S5('12:53'), S5('13:38')],
  },
  {
    id: 'f-puncion',
    sec: 'puncion',
    titulo: 'Por qué la punción lumbar puede matar',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'craneo', vistas: ['hte', 'puncion'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Hay hipertensión endocraneana con **edema de papila**.' },
          { k: 'mecanismo', text: 'Al sacar líquido por abajo, la presión de arriba **empuja el encéfalo hacia el agujero occipital**.' },
          { k: 'signo', text: 'El **bulbo se enclava**: paro respiratorio y cardíaco.' },
        ],
      },
    ],
    voz: [
      'Por eso, si el paciente tiene hipertensión endocraneana con edema de papila, ni se les ocurra hacer una punción lumbar.',
      'Al sacar líquido por abajo, la diferencia de presión empuja el encéfalo hacia abajo, hacia el agujero occipital.',
      'El bulbo se enclava, se comprime, y como maneja la respiración y la función cardiovascular, el paciente hace un paro cardiorrespiratorio.',
    ],
    refs: [S6('10:57'), S6('11:38'), S6('12:22'), S6('13:03')],
  },
  {
    id: 'f-meningitis',
    sec: 'meningeo',
    titulo: 'Cómo una infección inflama las meninges',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'meningeos', vistas: ['reposo', 'nuca'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El germen llega a las meninges, casi siempre por **vía sanguínea** (o por continuidad: sinusitis, otitis).' },
          { k: 'mecanismo', text: 'Inflamación del espacio subaracnoideo: más **permeable** la barrera, **edema**, menos flujo, se tapan las **granulaciones de Pacchioni**.' },
          { k: 'signo', text: 'Irritación meníngea (**rigidez de nuca**) e **hipertensión endocraneana** (cefalea, vómitos).' },
        ],
      },
    ],
    voz: [
      'La mayoría de las meningitis son infecciosas, y el germen llega a las meninges casi siempre por la sangre; también puede llegar por continuidad, desde una sinusitis o una otitis.',
      'En el espacio subaracnoideo se replica e inflama: la barrera hematoencefálica se vuelve permeable, hay edema, baja el flujo de sangre, y se tapan las granulaciones de Pacchioni, que son las que reabsorben el líquido cefalorraquídeo.',
      'Por eso el paciente tiene, por un lado, irritación meníngea, con rigidez de nuca; y por el otro, hipertensión endocraneana: la cefalea y los vómitos.',
    ],
    refs: [S6('22:14'), S6('22:55'), S6('23:38'), S6('24:20'), S6('25:03'), S6('25:48'), S6('26:32'), RC('49:09'), RC('49:49')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'hte', label: 'Hipertensión endocraneana' },
    { id: 'puncion', label: 'La punción' },
    { id: 'meningeo', label: 'La meningitis' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-sensibilidad',
    sec: 'sensibilidad',
    titulo: 'Las vías de la sensibilidad',
    fig: { f: 'encefalo', vistas: [{ luz: ['medula', 'talamo', 'parietal'], vias: ['sensitiva'], tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Espinotalámica anterior', tono: 'sky', text: 'Tacto **protopático** (grosero).' },
      { t: 'def', term: 'Espinotalámica lateral', tono: 'red', en: 0, text: 'Sensibilidad **termoalgésica**: dolor y temperatura.' },
      { t: 'def', term: 'Cordones posteriores', tono: 'lilac', en: 1, text: '**Goll y Burdach**: tacto **epicrítico** y sensibilidad **profunda**: palestesia (vibración), batiestesia (posición), barestesia (presión).' },
      { t: 'texto', en: 2, text: 'Neuropatía: pierde la **superficial**, distal, en **guante y bota**. Cordonal posterior: pierde la **profunda**.' },
    ],
    voz: [
      'La sensibilidad viaja por tres vías. La espinotalámica anterior lleva el tacto protopático, el tacto grosero. La espinotalámica lateral lleva la sensibilidad termoalgésica: el dolor y la temperatura.',
      'Y los cordones posteriores de Goll y Burdach llevan el tacto fino, epicrítico, y la sensibilidad profunda: la vibración, o palestesia; la posición, o batiestesia; y la presión, o barestesia.',
      'Por eso la polineuropatía pierde la sensibilidad superficial, distal, en guante y bota, y el síndrome cordonal posterior pierde la profunda.',
    ],
    refs: [S2('21:33'), S2('22:13'), S2('22:54'), S2('23:35'), S2('24:17'), S2('03:55'), M4('24:04'), M4('24:44'), M4('25:28')],
  },
  {
    id: 't-hte',
    sec: 'hte',
    titulo: 'Hipertensión endocraneana',
    fig: { f: 'craneo', vistas: ['componentes'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Aumento de la **presión** dentro del cráneo, **> 15 mmHg** (20 cm de agua), por alteración del **parénquima**, la **sangre** o el **LCR**.' },
      { t: 'def', term: 'Parénquima', tono: 'gold', en: 1, text: 'Masas: tumores, abscesos, hemorragias, quistes.' },
      { t: 'def', term: 'LCR', tono: 'sky', en: 1, text: 'Más producción o, más a menudo, **menos reabsorción** (meningitis, hidrocefalia).' },
      { t: 'def', term: 'Sangre', tono: 'red', en: 1, text: 'Sobre todo **venosa**: trombosis; encefalopatía hipertensiva.' },
      { t: 'def', term: 'Benigna (idiopática)', tono: 'lilac', en: 2, text: '**Mujeres jóvenes obesas**; trastornos hormonales, anticonceptivos, corticoides.' },
    ],
    voz: [
      'La hipertensión endocraneana es el aumento de la presión dentro del cráneo por encima de quince milímetros de mercurio, por una alteración del parénquima, de la sangre o del líquido cefalorraquídeo.',
      'Del parénquima: las masas, como tumores, abscesos, hemorragias o quistes. Del líquido: más producción, o más a menudo menos reabsorción, como en la meningitis o la hidrocefalia. De la sangre: sobre todo venosa, por una trombosis, o en la encefalopatía hipertensiva.',
      'Y una forma benigna, o idiopática, sin causa conocida, propia de mujeres jóvenes obesas, ligada a trastornos hormonales, anticonceptivos o corticoides. Casi siempre, la hipertensión endocraneana es secundaria a otra enfermedad del sistema nervioso.',
    ],
    refs: [S5('14:19'), S5('15:04'), S5('15:47'), S5('16:29'), S5('17:12'), S5('18:00'), S6('00:47'), RC('18:25')],
  },
  {
    id: 't-triada',
    sec: 'hte',
    titulo: 'La tríada',
    fig: { f: 'cabeza', vistas: ['holocraneana'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Cefalea', tono: 'red', text: 'La más frecuente. **Holocraneana**, continua, peor con la **tos**, el esfuerzo y al levantarse; **no calma con AINE**.' },
      { t: 'def', term: 'Vómito en chorro', tono: 'peach', en: 1, text: '**Sin náuseas** previas.' },
      { t: 'def', term: 'Edema de papila', tono: 'gold', en: 2, text: 'El hallazgo **más importante**; **bilateral**; se ve en el **fondo de ojo**.' },
    ],
    examen: { origen: 'ortega', texto: 'La tríada de la hipertensión endocraneana.', cita: 'La pregunta de examen más comúnmente que yo siempre suelo preguntar es: ¿cuál es la tríada de hipertensión endocraneana?', ref: RC('19:19') },
    voz: [
      'La pregunta que el profesor más hace: la tríada de la hipertensión endocraneana. Primero, la cefalea, la más frecuente: holocraneana, continua, que empeora con la tos, el esfuerzo y los movimientos, y que no calma con los antiinflamatorios.',
      'Segundo, el vómito en chorro, o en proyectil: sin náuseas previas.',
      'Y tercero, el edema de papila, el hallazgo más importante, bilateral, que se ve en el fondo de ojo. Le duele la cabeza y vomita no siempre es hipertensión endocraneana; si tiene edema de papila bilateral, sí.',
    ],
    refs: [S5('20:55'), S5('21:44'), S5('22:24'), S5('23:06'), S5('23:52'), S5('24:34'), S5('25:21'), RC('19:50'), RC('20:30'), RC('21:11'), L('p499')],
  },
  {
    id: 't-papila',
    sec: 'hte',
    titulo: 'Las fases del edema de papila',
    fig: { f: 'papila', vistas: [['normal', 'hiperemica'], ['edematosa'], ['atrofica']] },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Hiperémica', tono: 'red', text: 'Papila roja; las venas se dilatan.' },
      { t: 'def', term: 'Edematosa', tono: 'peach', en: 1, text: 'Bordes borrosos, venas muy dilatadas, arterias finas, hemorragias.' },
      { t: 'def', term: 'Atrófica', tono: 'sky', en: 2, text: 'Papila pálida: atrofia del nervio óptico.' },
    ],
    examen: { origen: 'ortega', texto: 'Las fases del edema de papila.', cita: 'Esto es pregunta de parcial: cuántas fases tiene el edema de papila. Tiene tres fases: una hiperémica, una edematosa y una atrófica.', ref: S5('26:44') },
    voz: [
      'El edema de papila tiene tres fases, pregunta de parcial. La hiperémica: la papila se pone roja y las venas empiezan a dilatarse.',
      'La edematosa: los bordes se borran, las venas están muy dilatadas y tortuosas, las arterias se afinan y aparecen hemorragias.',
      'Y la atrófica: la papila queda pálida, por atrofia del nervio óptico. Para pensar en hipertensión endocraneana, el edema tiene que ser bilateral; el unilateral sugiere otra cosa, como un tumor o un desprendimiento de retina.',
    ],
    refs: [S5('26:03'), S5('26:44'), S5('27:27'), S5('28:12'), S5('28:54'), RC('21:51')],
  },
  {
    id: 't-otros-signos',
    sec: 'hte',
    titulo: 'El VI par y el efecto Cushing',
    amplio: true,
    bloques: [
      { t: 'def', term: 'VI par', tono: 'gold', text: 'El par que **más se lesiona**: ojo desviado **hacia adentro**, diplopía.' },
      { t: 'def', term: 'Efecto Cushing', tono: 'red', en: 1, text: '**Hipertensión arterial + bradicardia + alteración respiratoria**. No es el síndrome de Cushing.' },
      { t: 'lista', en: 2, items: ['Mareos, vértigo, convulsiones, alteración de la conciencia hasta el coma.', 'Respiración de **Cheyne-Stokes** o de **Biot**.', '**Signos de foco**: déficit según la zona comprimida.', '**Foster Kennedy**: tumor frontal.'] },
    ],
    examen: { origen: 'ortega', texto: 'El par más lesionado y el efecto Cushing.', cita: '¿Cuál es el par craneal que más veces está lesionado en una hipertensión endocraneana? El par número seis. Eso es pregunta de examen. Y otra cosa más: yo le pregunto qué es el efecto Cushing.', ref: RC('22:55') },
    aclara: { text: 'El síndrome de Foster Kennedy clásico es atrofia óptica del lado del tumor frontal y edema de papila del lado opuesto.', origen: BIBLIO },
    voz: [
      'Dos preguntas de bochazo. Cuál es el par craneal que más se lesiona en la hipertensión endocraneana: el sexto, el motor ocular externo; el ojo queda desviado hacia adentro.',
      'Y qué es el efecto Cushing: hipertensión arterial, bradicardia y alteraciones de la respiración. No confundir con el síndrome de Cushing.',
      'Además puede haber mareos, vértigo, convulsiones y alteración de la conciencia hasta el coma; respiración de Cheyne-Stokes o de Biot; signos de foco, según la zona comprimida; y el síndrome de Foster Kennedy, por un tumor frontal.',
    ],
    refs: [S5('29:35'), S5('30:18'), S5('30:58'), S6('00:03'), S6('05:05'), S6('06:34'), S6('07:19'), RC('22:31'), RC('23:13'), RC('24:35')],
  },
  {
    id: 't-diagnostico-hte',
    sec: 'puncion',
    titulo: 'Diagnóstico: clínico',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El diagnóstico es **clínico**: la tríada y el fondo de ojo. Se completa con **tomografía** o **resonancia**.' },
      { t: 'texto', en: 1, text: 'La causa más frecuente en las imágenes: **edema cerebral**; también tumores y hemorragias.' },
    ],
    voz: [
      'Si les preguntan cómo se diagnostica la hipertensión endocraneana: es totalmente clínico, con la tríada y el fondo de ojo. Se completa con una tomografía o una resonancia para buscar la causa, que en las imágenes suele ser un edema cerebral, un tumor o una hemorragia. La punción lumbar, solo si no hay riesgo.',
    ],
    refs: [S6('10:13'), S6('10:57'), S6('15:09'), S6('15:52'), RC('24:35')],
  },
  {
    id: 't-contraindicaciones',
    sec: 'puncion',
    titulo: 'Contraindicaciones de la punción lumbar',
    fig: { f: 'craneo', vistas: ['puncion'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'lista',
        items: ['**Hipertensión endocraneana con edema de papila**.', 'Lesión expansiva de la **fosa posterior**.', '**Signos de foco** neurológico.', '**Hemorragia** cerebral.', '**Infección** de la piel en el sitio de punción.', '**Diátesis hemorrágica** o plaquetas bajas.'],
      },
    ],
    examen: { origen: 'ortega', texto: 'Tres contraindicaciones de la punción lumbar.', cita: 'Y yo le digo: decirme tres contraindicaciones para hacer una punción lumbar.', ref: RC('31:01') },
    aclara: { text: 'El umbral de plaquetas varía según la bibliografía (suele citarse menos de 50 000); el profesor, por criterio personal, no punzaría con menos de 100 000.', origen: BIBLIO },
    voz: [
      'Las contraindicaciones de la punción lumbar, pregunta de examen: díganme tres. La hipertensión endocraneana con edema de papila; una lesión expansiva en la fosa posterior; los signos de foco neurológico; una hemorragia cerebral; una infección de la piel en el sitio donde se va a punzar; y una diátesis hemorrágica, o plaquetas bajas.',
    ],
    refs: [S6('13:03'), S6('13:45'), S6('14:28'), S6('15:09'), RC('27:24'), RC('30:32'), RC('31:01'), S7('02:44')],
  },
  {
    id: 't-lcr',
    sec: 'puncion',
    titulo: 'El líquido cefalorraquídeo',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Normal', 'Bacteriana (supurada)', 'Viral', 'Tuberculosa'],
        filas: [
          ['Aspecto', 'Claro («agua de roca»)', '**Turbio**', 'Claro', 'Claro'],
          ['Células', 'Muy pocas', '**Polimorfonucleares**', 'Linfocitos', 'Linfocitos'],
          ['Glucosa', '≈ 60 % de la glucemia', '**Baja**', 'Normal', '**Baja**'],
          ['Proteínas', '15–45 mg/dL', '**Altas**', 'Normales o algo altas', 'Altas'],
          ['Cloruros', 'Normales', 'Normales', 'Normales', '**Bajos**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'El LCR en la meningitis bacteriana, viral y tuberculosa.', cita: 'Esto es pregunta de examen: cómo se ve el líquido cefalorraquídeo en una meningitis supurada, en una meningitis viral y en una meningitis tuberculosa.', ref: RC('41:26') },
    aclara: { text: 'En la meningitis viral las proteínas son normales o apenas elevadas (no disminuidas).', origen: BIBLIO },
    voz: [
      'El cuadro del líquido cefalorraquídeo hay que saberlo como el Padre Nuestro. El normal es claro, como agua de roca, con muy pocas células, glucosa cerca del sesenta por ciento de la glucemia y proteínas bajas.',
      'En la meningitis bacteriana, o supurada, es turbio, con polimorfonucleares, la glucosa baja, porque las bacterias la consumen, y las proteínas altas. En la viral es claro, con linfocitos y glucosa normal.',
      'Y en la tuberculosa también es claro y con linfocitos, pero la glucosa está baja y es la única con los cloruros bajos.',
    ],
    refs: [S7('03:29'), S7('04:11'), S7('04:51'), S7('05:34'), RC('41:19'), RC('42:00'), RC('42:42'), RC('43:22')],
  },
  {
    id: 't-definiciones',
    sec: 'meningeo',
    titulo: 'Meningitis, meningismo y reacción meníngea',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Clínica', 'LCR'],
        filas: [
          ['**Meningitis**', 'Sí', '**Alterado**'],
          ['**Meningismo**', 'Sí', '**Normal**'],
          ['**Reacción meníngea**', '**No**', 'Alterado'],
        ],
      },
      { t: 'texto', en: 1, text: 'Meningismo: por ejemplo, el golpe de calor. Reacción meníngea: por ejemplo, después de una punción.' },
    ],
    examen: { origen: 'ortega', texto: 'La diferencia entre meningitis, meningismo y reacción meníngea.', cita: 'Pero yo siempre pregunto esto, pregunta de examen: ¿cuál es la diferencia entre meningitis, meningismo y reacción meníngea?', ref: RC('32:15') },
    voz: [
      'Lo que el profesor siempre pregunta: la diferencia entre meningitis, meningismo y reacción meníngea. En la meningitis hay clínica, signos y síntomas, y el líquido cefalorraquídeo está alterado.',
      'En el meningismo hay clínica, pero el líquido es normal, como en un golpe de calor. Y en la reacción meníngea el líquido está alterado, pero no hay clínica, como después de una punción.',
    ],
    refs: [S6('16:33'), S6('17:14'), S6('17:56'), RC('31:41'), RC('32:21'), MO('1:10:56')],
  },
  {
    id: 't-causas',
    sec: 'meningeo',
    titulo: 'Causas de meningitis',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Inflamatorias (infecciosas)', tono: 'red', text: 'Bacterias, virus, hongos (criptococo), parásitos (cisticercosis).' },
      { t: 'def', term: 'Bacterias', tono: 'peach', en: 0, text: 'Neonatos: *S. agalactiae*, *E. coli*. Después: neumococo, meningococo, *Haemophilus*; *S. aureus*. La **tuberculosa** toma la **base** del cerebro; las otras, la convexidad.' },
      { t: 'def', term: 'No inflamatorias', tono: 'sky', en: 1, text: 'Hemorragias, neoplasias, colagenopatías.' },
      { t: 'texto', en: 1, text: 'Evolución aguda (la mayoría), subaguda o crónica (tuberculosis, sífilis).' },
    ],
    aclara: { text: 'La meningoencefalitis viral más grave, con predilección por el lóbulo temporal, es la del herpes simple tipo 1.', origen: BIBLIO },
    voz: [
      'Las causas pueden ser inflamatorias, casi siempre infecciosas: bacterias, virus, hongos como el criptococo, o parásitos como la cisticercosis. O no inflamatorias: hemorragias, neoplasias, colagenopatías.',
      'Entre las bacterias, en los recién nacidos predominan el estreptococo agalactiae y la Escherichia coli; después, el neumococo, el meningococo y el Haemophilus. La tuberculosa toma la base del cerebro; las demás, la convexidad. La mayoría son agudas; la tuberculosis y la sífilis pueden ser crónicas.',
    ],
    refs: [S6('18:36'), S6('19:22'), S6('20:04'), S6('20:48'), S6('21:28'), RC('33:02')],
  },
  {
    id: 't-triada-meningitis',
    sec: 'meningeo',
    titulo: 'La tríada de la meningitis',
    fig: { f: 'meningeos', vistas: ['nuca'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: '**Fiebre** + **rigidez de nuca** + un tercer signo según la edad.' },
      { t: 'lista', en: 1, items: ['Adulto: **cefalea** (algunos docentes: **alteración del sensorio**).', 'Niño: **convulsiones**.', 'Anciano: **caída del estado de conciencia**.'] },
      { t: 'texto', en: 2, text: 'La cefalea es leve a moderada pero persistente, holocraneana; con foto y sonofobia.' },
    ],
    aclara: { text: 'En la clase se aclara que la cefalea de la meningitis se debe a la hipertensión endocraneana que produce, y que algunos docentes toman como tríada fiebre, cefalea y alteración del sensorio.', origen: 'Lo aclara la clase.' },
    voz: [
      'La tríada de la meningitis: siempre fiebre y rigidez de nuca, y un tercer signo que cambia con la edad. En el adulto, la cefalea; algunos docentes toman, en su lugar, la alteración del sensorio. En el niño, las convulsiones. Y en el anciano, la caída del estado de conciencia.',
      'La cefalea de la meningitis es menos intensa que la de la hipertensión endocraneana, pero persistente, holocraneana, con fotofobia y sonofobia. Y se explica justamente porque la meningitis produce hipertensión endocraneana.',
    ],
    refs: [S6('27:55'), S6('28:43'), S6('29:27'), S6('30:11'), S7('00:01'), RC('33:42'), RC('35:05'), RC('39:14'), RC('44:44'), RC('50:29')],
  },
  {
    id: 't-signos-meningeos',
    sec: 'meningeo',
    titulo: 'Contractura y signos de irritación meníngea',
    fig: { f: 'meningeos', vistas: ['nuca', 'brudzinski', 'kernig'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Rigidez de nuca', tono: 'red', text: 'No toca el pecho con el mentón; abre la boca para lograrlo (**Lewinsohn**).' },
      { t: 'def', term: 'Brudzinski', tono: 'peach', en: 1, text: 'Al **flexionar la nuca**, flexiona las **rodillas**; o al flexionar una pierna, flexiona la otra.' },
      { t: 'def', term: 'Kernig', tono: 'gold', en: 2, text: 'No puede sentarse ni elevar la pierna **sin flexionar la rodilla**.' },
      { t: 'texto', en: 2, text: 'Otros: signo del **trípode**, **gatillo de fusil** (niños), **vientre en batea**.' },
    ],
    examen: { origen: 'ortega', texto: 'Los signos de irritación meníngea.', cita: 'Estas maniobras, chicos, como el Padre Nuestro, porque se la van a preguntar: signo de Kernig, signo de Brudzinski.', ref: S6('33:28') },
    voz: [
      'La contractura muscular y los signos de irritación meníngea hay que saberlos como el Padre Nuestro. La rigidez de nuca: el paciente no puede tocar el pecho con el mentón, y abre la boca para lograrlo, el signo de Lewinsohn.',
      'El signo de Brudzinski: al flexionar la nuca del paciente acostado, flexiona las rodillas; o al flexionarle una pierna, flexiona también la otra.',
      'Y el signo de Kernig: no puede sentarse, ni elevar la pierna extendida, sin flexionar la rodilla. Además, el signo del trípode, la posición en gatillo de fusil de los niños y el vientre en batea. Ojo: no toda rigidez de nuca es meningitis; también la tiene un anciano postrado o un parkinsoniano.',
    ],
    refs: [S6('30:55'), S6('31:37'), S6('32:22'), S6('33:02'), S6('33:44'), S6('34:30'), S6('35:18'), RC('36:25'), RC('37:46'), RC('38:34'), MO('59:57')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'sensibilidad', label: 'Sensibilidad' },
    { id: 'hte', label: 'Hipertensión endocraneana' },
    { id: 'puncion', label: 'Diagnóstico y punción' },
    { id: 'meningeo', label: 'Síndrome meníngeo' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Cefalea, vómitos y el fondo de ojo',
    texto: 'Hombre de 55 años con cefalea holocraneana de semanas, peor a la mañana y con la tos, que no calma con ibuprofeno. Hoy vomitó sin náuseas. En el fondo de ojo, las dos papilas tienen bordes borrosos. El ojo derecho no va hacia afuera. TA 190/100, FC 48.',
    pregunta: '¿Qué tiene y qué no hay que hacerle?',
    opciones: [
      { text: 'Hipertensión endocraneana con efecto Cushing: no hacer punción lumbar.', why: 'Tríada, VI par y HTA con bradicardia; la punción puede enclavar el bulbo.' },
      { text: 'Migraña: indicar un triptano.', why: 'No explica el edema de papila ni el VI par.' },
      { text: 'Meningitis: punción lumbar de urgencia.', why: 'Con edema de papila está contraindicada; primero imágenes.' },
      { text: 'Síndrome de Cushing.', why: 'Es otra cosa: el efecto Cushing no es el síndrome.' },
    ],
    correcta: 0,
    razonamiento: 'Cefalea + vómito en chorro + edema de papila bilateral = HTE; HTA + bradicardia = efecto Cushing; VI par = falso signo localizador.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Fiebre, nuca dura y un líquido turbio',
    texto: 'Joven de 20 años con fiebre de 39,5 °C, cefalea y rigidez de nuca; al flexionarle la nuca flexiona las rodillas. La tomografía es normal. La punción muestra un líquido turbio con polimorfonucleares, glucosa baja y proteínas altas.',
    pregunta: '¿Qué tipo de meningitis es?',
    opciones: [
      { text: 'Bacteriana (supurada).', why: 'Turbio, neutrófilos, glucosa baja, proteínas altas.' },
      { text: 'Viral.', why: 'Sería claro, con linfocitos y glucosa normal.' },
      { text: 'Tuberculosa.', why: 'Sería claro, con linfocitos y cloruros bajos.' },
      { text: 'Meningismo.', why: 'El líquido sería normal.' },
    ],
    correcta: 0,
    razonamiento: 'El líquido turbio con polimorfonucleares define la meningitis supurada.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Rigidez de nuca con líquido normal',
    texto: 'Paciente con golpe de calor que tiene rigidez de nuca y signo de Kernig. La punción lumbar es completamente normal.',
    pregunta: '¿Cómo se llama el cuadro?',
    opciones: [
      { text: 'Meningismo.', why: 'Clínica meníngea con LCR normal.' },
      { text: 'Meningitis.', why: 'El LCR estaría alterado.' },
      { text: 'Reacción meníngea.', why: 'Es LCR alterado sin clínica.' },
      { text: 'Hipertensión endocraneana.', why: 'No tiene la tríada.' },
    ],
    correcta: 0,
    razonamiento: 'Meningismo = clínica sin alteración del LCR.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'otros',
        label: 'Otros síndromes',
        tone: 'red',
        nota: 'Sensibilidad · hipertensión endocraneana · síndrome meníngeo',
        hijos: [
          { id: 'sen', label: 'Sensibilidad', tone: 'sky', nota: 'Espinotalámicas · cordones posteriores · guante y bota' },
          { id: 'hte', label: 'Hipertensión endocraneana', tone: 'red', examen: true, nota: '**Tríada** · edema de papila (3 fases) · **VI par** · **efecto Cushing**' },
          { id: 'pun', label: 'Punción lumbar', tone: 'gold', examen: true, nota: '**Contraindicaciones** · el cuadro del **LCR**' },
          { id: 'men', label: 'Síndrome meníngeo', tone: 'peach', examen: true, nota: '**Meningitis, meningismo, reacción** · tríada · **Kernig y Brudzinski**' },
        ],
      },
    ],
    nexos: ['**HTE con edema de papila: no se punza.**', '**Meningitis: clínica + LCR alterado; meningismo: clínica + LCR normal.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['neu06-d01', 'neu06-d02', 'neu06-d03', 'neu06-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    sensibilidad: { tab: 'teoria', seccion: 'sensibilidad' },
    hte: { tab: 'teoria', seccion: 'hte' },
    puncion: { tab: 'teoria', seccion: 'puncion' },
    meningeo: { tab: 'teoria', seccion: 'meningeo' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
