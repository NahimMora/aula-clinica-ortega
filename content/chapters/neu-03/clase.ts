import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * neu-03: clase visual de los pares craneales I (generalidades, I, II, III, IV y VI).
 *  1. Clases de Ortega: «Pares craneales parte 1» (00:01–31:31), «parte 2» (00:02–35:52) y «parte 3» (00:04–34:29).
 * Ver content/traceability/neu-03.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P1 = (t: string) => r('pc-1', t);
const P2 = (t: string) => r('pc-2', t);
const P3 = (t: string) => r('pc-3', t);

const GRAL = 'Fisiología general, no se da en la clase.';
const BIBLIO = 'Precisión de la bibliografía, no se da así en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-olfato',
    sec: 'olfatorio',
    titulo: 'El olfato no pasa por el tálamo',
    etapas: ['normal', 'mecanismo', 'signo'],
    fig: {
      f: 'encefalo',
      vistas: [
        { luz: ['olfatorio'], tone: 'mint', nota: 'Mucosa olfatoria → bulbo olfatorio', notaTone: 'mint' },
        { luz: ['olfatorio', 'temporal'], etiquetas: ['talamo'], vias: ['olfato'], tone: 'mint', nota: 'Bulbo → uncus del hipocampo, sin tálamo', notaTone: 'mint' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: '**1.ª neurona**: la mucosa olfatoria («mancha amarilla»), bajo la lámina cribosa del etmoides.' },
          { k: 'mecanismo', text: '**2.ª neurona**: los filetes atraviesan la lámina y forman el **bulbo olfatorio**.' },
          { k: 'signo', text: '**3.ª**: el **uncus del hipocampo** (área periamigdalina), **sin pasar por el tálamo**.' },
        ],
      },
    ],
    voz: [
      'El primer par, el olfatorio. Su primera neurona está en la mucosa olfatoria, la mancha amarilla, debajo de la lámina cribosa del etmoides.',
      'Los filetes nerviosos atraviesan los agujeros de la lámina cribosa y forman el bulbo olfatorio, la segunda neurona.',
      'Y de ahí la vía va directo al uncus del hipocampo, el área periamigdalina, en el lóbulo temporal. Es el único par sensorial que no hace sinapsis en el tálamo.',
    ],
    refs: [P1('10:33'), P1('11:13'), P1('11:53'), P1('12:33'), P1('13:55')],
  },
  {
    id: 'f-via',
    sec: 'optico',
    titulo: 'La vía óptica: quién cruza y quién no',
    etapas: ['normal', 'mecanismo', 'signo'],
    fig: { f: 'via-optica', vistas: [{ fibras: true, nota: 'Las fibras nasales cruzan en el quiasma' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Cada retina tiene una mitad **nasal** y una **temporal**. La retina nasal ve el **campo temporal**; la temporal, el **campo nasal**.' },
          { k: 'mecanismo', text: 'En el **quiasma** se cruzan **solo las fibras nasales**; las temporales siguen del mismo lado.' },
          { k: 'signo', text: 'Cada **cintilla** lleva la mitad opuesta del campo de los dos ojos → **geniculado** del tálamo → **radiaciones** → **occipital**.' },
        ],
      },
    ],
    voz: [
      'La vía óptica. Cada retina tiene una mitad nasal y una mitad temporal, y el campo se invierte: la retina nasal ve el campo temporal, y la retina temporal ve el campo nasal.',
      'En el quiasma óptico se cruzan solamente las fibras nasales, las que ven los campos temporales. Las temporales siguen por el mismo lado.',
      'Así, cada cintilla óptica lleva la mitad opuesta del campo visual de los dos ojos. Hace sinapsis en el cuerpo geniculado del tálamo, sigue por las radiaciones ópticas y termina en la cisura calcarina del lóbulo occipital.',
    ],
    refs: [P1('24:42'), P1('25:23'), P1('26:03'), P1('26:43'), P1('27:24'), P2('00:02'), P2('00:45')],
  },
  {
    id: 'f-campos',
    sec: 'optico',
    titulo: 'Dónde está la lesión, qué campo se pierde',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'via-optica',
      vistas: [
        { lesion: 'nervio', nota: 'Nervio óptico: ceguera (amaurosis) de ese ojo', notaTone: 'red' },
        { lesion: 'quiasma', nota: 'Quiasma: hemianopsia bitemporal (heterónima)', notaTone: 'red' },
        { lesion: 'cintilla', nota: 'Cintilla izquierda: hemianopsia homónima derecha', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Nervio óptico', tono: 'red', text: 'Se pierden todas las fibras de un ojo: **ceguera o amaurosis** homolateral.' },
      { t: 'def', term: 'Quiasma', tono: 'peach', en: 1, text: 'Se cortan las fibras que cruzan, las que ven los campos temporales: **hemianopsia bitemporal** (heterónima).' },
      { t: 'def', term: 'Retroquiasmática', tono: 'lilac', en: 2, text: 'Se pierde la misma mitad en los dos ojos: **hemianopsia homónima**, del lado opuesto a la lesión.' },
    ],
    voz: [
      'Con esto se entienden las lesiones. Si se lesiona el nervio óptico, se pierden todas las fibras de ese ojo: ceguera, o amaurosis, del mismo lado.',
      'Si se lesiona el quiasma, se cortan las fibras que cruzan, las nasales, que son las que ven los campos temporales: el paciente pierde los dos campos temporales. Es una hemianopsia bitemporal, heterónima, porque se pierden mitades distintas.',
      'Y si la lesión es por detrás del quiasma, por ejemplo en la cintilla izquierda, se pierde la misma mitad del campo en los dos ojos, la derecha: una hemianopsia homónima, del lado opuesto a la lesión.',
    ],
    refs: [P2('05:03'), P2('05:45'), P2('06:28'), P2('07:17'), P2('08:46'), P2('09:28')],
  },
  {
    id: 'f-fotomotor',
    sec: 'oculomotores',
    titulo: 'El reflejo fotomotor',
    etapas: ['normal', 'mecanismo', 'signo'],
    fig: { f: 'via-optica', vistas: [{ fibras: false, fotomotor: true, nota: 'II aferente → Edinger-Westphal → III eferente' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: '**Estímulo**: la luz. **Vía aferente**: el **II par**, que a la altura de la cintilla manda una fibra al mesencéfalo.' },
          { k: 'mecanismo', text: '**Centro**: el núcleo de **Edinger-Westphal**, parasimpático, que activa el núcleo del III.' },
          { k: 'signo', text: '**Vía eferente**: las fibras parasimpáticas del **III par**. **Respuesta**: **miosis**, en los dos ojos (consensual).' },
        ],
      },
    ],
    voz: [
      'El reflejo fotomotor tiene cinco componentes. El estímulo es la luz. La vía aferente es el segundo par: a la altura de la cintilla óptica, el nervio manda una fibra hacia el mesencéfalo.',
      'El centro es el núcleo de Edinger-Westphal, un núcleo parasimpático, que se comunica con el núcleo del tercer par.',
      'La vía eferente son las fibras parasimpáticas que viajan dentro del tercer par, y la respuesta es la contracción de la pupila, la miosis. Como la información llega a los dos lados, también se contrae la pupila del otro ojo: el reflejo consensual.',
    ],
    refs: [P2('30:02'), P2('30:48'), P2('31:34'), P2('32:17'), P2('33:48'), P3('33:03'), P3('33:48')],
  },
  {
    id: 'f-iii',
    sec: 'oculomotores',
    titulo: 'Por qué el ojo del III se va abajo y afuera',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'oculomotores', vistas: ['musculos', 'iii'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El III mueve el ojo **arriba, abajo y adentro**, levanta el **párpado** y contrae la **pupila**.' },
          { k: 'mecanismo', text: 'Si se paraliza, quedan solos el **recto externo** (VI) y el **oblicuo superior** (IV).' },
          { k: 'signo', text: 'Ojo **afuera y abajo**, **ptosis** y **midriasis**.' },
        ],
      },
    ],
    aclara: { text: 'El ojo se desvía porque los músculos sanos (recto externo y oblicuo superior) ya no tienen oponente.', origen: GRAL },
    voz: [
      'Un ejemplo para entender las parálisis. El tercer par mueve el ojo hacia arriba, hacia abajo y hacia adentro; además levanta el párpado y contrae la pupila.',
      'Si se paraliza, quedan funcionando solos el recto externo, del sexto par, y el oblicuo superior, del cuarto. Sin oponente, tiran el ojo hacia afuera y hacia abajo. Y como ya no levanta el párpado ni contrae la pupila, hay ptosis y midriasis.',
    ],
    refs: [P3('05:05'), P3('06:32'), P3('07:16'), P3('29:32')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'olfatorio', label: 'El olfato' },
    { id: 'optico', label: 'La vía óptica' },
    { id: 'oculomotores', label: 'Pupila y músculos' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-repaso',
    sec: 'generalidades',
    titulo: 'El examen físico neurológico',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'El **examen físico** es «lo que más preguntan en el parcial»: con él se sabe casi el 80 % de los síndromes.' },
      { t: 'lista', en: 1, items: ['Repasar del primer parcial: **facies** (parálisis facial central y periférica, parkinsoniana, miasténica, **Claude Bernard-Horner**, Pourfour du Petit), **actitud** y **marcha**.', 'Repasar el **estado de conciencia** y el **coma**.', 'Lo nuevo: **pares craneales**, motilidad, sensibilidad, gnosia, praxia, lenguaje y taxia.'] },
    ],
    voz: [
      'El examen físico del sistema nervioso es lo que más se pregunta en el parcial: los síndromes neurológicos son casi puro examen físico.',
      'Hay que repasar del primer parcial las facies, sobre todo la parálisis facial central y periférica, la parkinsoniana, la miasténica, la de Claude Bernard-Horner y su contraria, la de Pourfour du Petit; la actitud, la marcha, el estado de conciencia y el coma. Y lo nuevo: los pares craneales, la motilidad, la sensibilidad, la gnosia, la praxia, el lenguaje y la taxia.',
    ],
    refs: [P1('01:31'), P1('02:13'), P1('02:53'), P1('03:39'), P1('04:19')],
  },
  {
    id: 't-clasif',
    sec: 'generalidades',
    titulo: 'Doce pares: motores, sensoriales y mixtos',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Tipo', 'Pares', 'Qué hacen'],
        filas: [
          ['**Motores**', 'III, IV, VI, XI, XII', 'Ojo (III, IV, VI), cuello y hombro (XI), lengua (XII)'],
          ['**Sensoriales**', 'I, II, VIII', 'Olfato, visión, audición'],
          ['**Mixtos**', 'V, VII, IX, X', 'Motores y sensitivos o sensoriales'],
          ['**Parasimpáticos**', 'III, VII, IX, X', 'Llevan fibras vegetativas'],
        ],
      },
      { t: 'texto', en: 1, text: '**Sensitivo** es el tacto; **sensorial**, los órganos de los sentidos. El gusto está repartido en varios pares.' },
    ],
    voz: [
      'Los doce pares se clasifican en motores, sensoriales y mixtos. Motores: los oculomotores, el tercero, el cuarto y el sexto; el undécimo, el espinal, que mueve el cuello y el hombro; y el duodécimo, el hipogloso, que mueve la lengua.',
      'Sensoriales: el primero, el olfatorio; el segundo, el óptico; y el octavo, el auditivo. Mixtos: el quinto, el séptimo, el noveno y el décimo. Y llevan fibras parasimpáticas el tercero, el séptimo, el noveno y el décimo. Sensitivo se refiere al tacto; sensorial, a los órganos de los sentidos.',
    ],
    refs: [P1('05:42'), P1('06:23'), P1('07:03'), P1('07:44'), P1('08:25')],
  },
  {
    id: 't-origen',
    sec: 'generalidades',
    titulo: 'Dónde nace cada par',
    fig: { f: 'tronco-pares', vistas: [{ luz: [3, 4], nivel: ['mesencefalo'] }, { luz: [5, 6, 7, 8], nivel: ['protuberancia'] }, { luz: [9, 10, 11, 12], nivel: ['bulbo'] }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'I y II', tono: 'mint', text: '**No nacen del tronco**: son intracraneales.' },
      { t: 'def', term: 'III y IV', tono: 'gold', text: '**Mesencéfalo**.' },
      { t: 'def', term: 'V a VIII', tono: 'gold', en: 1, text: '**Protuberancia** (el VI, el VII y el VIII, en el surco bulboprotuberancial).' },
      { t: 'def', term: 'IX a XII', tono: 'gold', en: 2, text: '**Bulbo**.' },
      { t: 'texto', en: 2, text: '**Origen real**: el núcleo donde se forman las fibras. **Aparente**: donde el par sale del tronco.' },
    ],
    aclara: { text: 'En la grabación se agrupa el VIII con el bulbo; su origen aparente es el surco bulboprotuberancial, junto al VII.', origen: BIBLIO },
    voz: [
      'Dónde nace cada par. El origen real es el núcleo donde se forman sus fibras; el aparente, el lugar donde sale del tronco. El profesor aclara que no se pregunta en el parcial, aunque algunos docentes lo preguntan.',
      'El primero y el segundo no nacen del tronco: son intracraneales. El tercero y el cuarto nacen en el mesencéfalo. Del quinto al octavo, en la protuberancia; el sexto, el séptimo y el octavo, en el surco entre la protuberancia y el bulbo.',
      'Y del noveno al duodécimo, en el bulbo.',
    ],
    refs: [P1('08:25'), P1('09:07'), P1('09:47')],
  },
  {
    id: 't-olfatorio',
    sec: 'olfatorio',
    titulo: 'I par: olfatorio',
    fig: { f: 'encefalo', vistas: [{ luz: ['olfatorio', 'temporal'], etiquetas: ['talamo'], vias: ['olfato'], tone: 'mint' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'mint', text: 'Mucosa olfatoria → **bulbo olfatorio** → **uncus del hipocampo**.' },
      { t: 'texto', en: 0, text: 'Es el **único par sensorial que no hace sinapsis en el tálamo**.' },
      { t: 'texto', en: 1, text: 'Exploración: ojos cerrados, **una narina por vez**, con una sustancia no irritante.' },
    ],
    examen: { origen: 'ortega', texto: 'El olfatorio es el único que no hace sinapsis en el tálamo.', cita: 'Pregunta de parcial: es el único nervio sensorial que no hace escala en el tálamo.', ref: P1('14:33') },
    voz: [
      'El primer par, el olfatorio: de la mucosa olfatoria al bulbo olfatorio, y de ahí al uncus del hipocampo. Pregunta de parcial: es el único nervio sensorial que no hace escala en el tálamo.',
      'Se explora con los ojos cerrados, tapando una narina por vez, con una sustancia que no irrite la mucosa, y el paciente tiene que reconocerla.',
    ],
    refs: [P1('12:33'), P1('13:13'), P1('13:55'), P1('14:35'), P1('15:17')],
  },
  {
    id: 't-olfato-alt',
    sec: 'olfatorio',
    titulo: 'Alteraciones del olfato',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Cuantitativas', tono: 'sky', text: '**Hiperosmia**, **hiposmia**, **anosmia**.' },
      { t: 'def', term: 'Cualitativas', tono: 'lilac', en: 0, text: '**Parosmia** (olor distorsionado), **cacosmia** (olores desagradables), **alucinaciones** (olor sin estímulo).' },
      { t: 'def', term: 'Alucinación olfatoria', tono: 'red', en: 1, text: 'Lesión del **área** (el uncus), no del nervio: **crisis uncinadas**.' },
      { t: 'def', term: 'Causas', tono: 'gold', en: 2, text: 'La más frecuente: el **resfrío**. Traumatismos, fractura de la base del cráneo, tumores, **Parkinson** (atrofia del bulbo olfatorio). Bilateral e inflamatoria (covid): **reversible**.' },
    ],
    voz: [
      'Las alteraciones del olfato pueden ser cuantitativas: hiperosmia, hiposmia o anosmia. O cualitativas: la parosmia, un olor distorsionado; la cacosmia, sentir olores desagradables, frecuente en el embarazo; y las alucinaciones, sentir un olor sin estímulo.',
      'Toda alucinación indica una lesión del área de ese sentido, no del nervio: las alucinaciones olfatorias son del uncus del hipocampo, y se llaman crisis uncinadas.',
      'La causa más frecuente de alteración del olfato es el resfrío. También los traumatismos, la fractura de la base del cráneo, los tumores, y el Parkinson, que atrofia el bulbo olfatorio. Cuando es bilateral y por una inflamación, como en el covid, se recupera.',
    ],
    refs: [P1('15:57'), P1('16:37'), P1('17:17'), P1('17:57'), P1('18:37'), P1('19:17'), P1('19:58'), P1('20:40')],
  },
  {
    id: 't-optico',
    sec: 'optico',
    titulo: 'II par: óptico',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'sky', text: 'Uno de los pares **más preguntados**. Origen real: las **células ganglionares** de la retina. Aparente: el **quiasma**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Porción del recorrido', 'Dónde'],
        filas: [
          ['Intraocular', 'Dentro del globo'],
          ['Intraorbitaria', 'En la órbita'],
          ['Intracanalicular', 'En el agujero óptico'],
          ['Intracraneal', 'Hasta el quiasma'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'El recorrido del nervio óptico.', cita: 'Estas cuatro porciones me forman el nervio óptico, y esto es pregunta de parcial por todos los doctores.', ref: P1('23:53') },
    voz: [
      'El segundo par, el óptico, uno de los más preguntados. Su origen real son las células ganglionares de la retina, y su origen aparente, el quiasma óptico.',
      'Y su recorrido, pregunta de parcial para todos los docentes, tiene cuatro porciones: intraocular, dentro del globo; intraorbitaria, en la órbita; intracanalicular, en el agujero óptico; e intracraneal, hasta el quiasma.',
    ],
    refs: [P1('21:20'), P1('22:01'), P1('22:41'), P1('23:21'), P1('24:01')],
  },
  {
    id: 't-via',
    sec: 'optico',
    titulo: 'La vía óptica, como el Padre Nuestro',
    fig: { f: 'via-optica', vistas: [{ fibras: true }] },
    anchoFig: 'media',
    bloques: [
      { t: 'lista', items: ['Retina: **conos y bastones** → bipolares → **ganglionares**.', '**Nervio óptico** → **quiasma** (cruzan las nasales).', '**Cintillas** → **geniculado externo** del tálamo.', '**Radiaciones ópticas** (superiores e inferiores) → **cisura calcarina** (áreas 17, 18 y 19).'] },
      { t: 'texto', en: 1, text: '**Prequiasmático**: globo y nervio óptico. **Retroquiasmático**: cintillas, radiaciones y corteza.' },
    ],
    examen: { origen: 'ortega', texto: 'La vía óptica.', cita: 'La vía óptica es importantísima, chicos, la tienen que saber como si fuese el Padre Nuestro.', ref: P1('24:42') },
    aclara: { text: 'Las neuronas de la retina son, en orden, los fotorreceptores (conos y bastones), las bipolares y las ganglionares, cuyos axones forman el nervio; la siguiente sinapsis es el cuerpo geniculado. Las áreas visuales 17, 18 y 19 son de Brodmann.', origen: BIBLIO },
    voz: [
      'La vía óptica hay que saberla como el Padre Nuestro. Empieza en la retina, con los conos y los bastones, que pasan el estímulo a las células bipolares y a las ganglionares, cuyos axones forman el nervio óptico.',
      'En el quiasma se cruzan las fibras nasales. Siguen las cintillas ópticas hasta el cuerpo geniculado externo del tálamo, y de ahí las radiaciones ópticas, superiores e inferiores, llegan a la cisura calcarina del lóbulo occipital. Por delante del quiasma está la parte prequiasmática: el globo y el nervio; por detrás, la retroquiasmática.',
    ],
    refs: [P1('24:42'), P1('25:23'), P1('26:03'), P1('28:04'), P1('29:26'), P1('30:08'), P2('00:45'), P2('01:27')],
  },
  {
    id: 't-hemianopsias',
    sec: 'optico',
    titulo: 'Hemianopsias',
    fig: { f: 'via-optica', vistas: [{ lesion: 'nervio', fibras: true }, { lesion: 'quiasma', fibras: true }, { lesion: 'cintilla', fibras: true }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Nervio óptico', tono: 'red', text: '**Amaurosis** (ceguera) homolateral: la lesión prequiasmática más común.' },
      { t: 'def', term: 'Quiasma', tono: 'peach', en: 1, text: '**Heterónima bitemporal**: se pierden mitades distintas.' },
      { t: 'def', term: 'Cintilla', tono: 'lilac', en: 2, text: '**Homónima**: la misma mitad en los dos ojos. Toda lesión retroquiasmática es homónima.' },
    ],
    examen: { origen: 'ortega', texto: 'Las hemianopsias.', cita: 'Hemianopsia, pregunta de parcial: no pueden no conocer hemianopsia, por lo general lo van a preguntar siempre en el parcial.', ref: P2('10:33') },
    aclara: { text: 'La hemianopsia homónima se nombra por el campo que se pierde: la lesión de la cintilla izquierda da una hemianopsia homónima derecha. En la grabación se la nombra por el lado de la cintilla.', origen: BIBLIO },
    voz: [
      'Las hemianopsias se preguntan siempre. La lesión del nervio óptico, la prequiasmática más común, da ceguera, o amaurosis, del mismo ojo.',
      'La lesión del quiasma da una hemianopsia heterónima bitemporal: se pierden los dos campos temporales, mitades distintas.',
      'Y la lesión de la cintilla da una hemianopsia homónima: la misma mitad del campo en los dos ojos, del lado opuesto. Toda lesión por detrás del quiasma es homónima.',
    ],
    refs: [P2('05:03'), P2('06:28'), P2('10:11'), P2('10:56'), P2('11:39'), P2('12:25'), P2('13:55'), P2('14:35')],
  },
  {
    id: 't-cuadrantes',
    sec: 'optico',
    titulo: 'Cuadrantanopsias',
    fig: { f: 'via-optica', vistas: [{ lesion: 'radiacion-inf', fibras: true, nota: 'Radiaciones inferiores: se pierde el cuadrante superior', notaTone: 'red' }, { lesion: 'radiacion-sup', fibras: true, nota: 'Radiaciones superiores: se pierde el cuadrante inferior', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Las radiaciones **inferiores** ven el **campo superior**; las **superiores**, el **campo inferior**.' },
      { t: 'texto', en: 1, text: 'Lesión de las radiaciones: **cuadrantanopsia homónima** del lado opuesto (superior o inferior).' },
    ],
    voz: [
      'Las radiaciones ópticas se dividen en superiores e inferiores, y otra vez el campo se invierte: las inferiores ven el campo superior, y las superiores, el inferior.',
      'Si se lesionan las radiaciones, se pierde un solo cuadrante, el mismo en los dos ojos: una cuadrantanopsia homónima. Si se lesionan las inferiores, el paciente pierde el cuadrante superior; si se lesionan las superiores, el inferior.',
    ],
    refs: [P2('15:16'), P2('18:28'), P2('19:13'), P2('20:04'), P2('20:45'), P2('23:50'), P2('24:30')],
  },
  {
    id: 't-explora-ii',
    sec: 'optico',
    titulo: 'Cómo se explora el II par',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Agudeza visual', tono: 'sky', text: 'Lejos: **Snellen**; cerca: **Jaeger**. Si está baja: **ambliopía**.' },
      { t: 'def', term: 'Colores', tono: 'gold', en: 0, text: 'Láminas de **Ishihara**. **Discromatopsia**; la más conocida, el **daltonismo** (rojo y verde).' },
      { t: 'def', term: 'Campimetría', tono: 'lilac', en: 1, text: 'Por **confrontación** en el consultorio.' },
      { t: 'def', term: 'Fondo de ojo', tono: 'red', en: 1, text: 'Con oftalmoscopio; casi siempre lo hace el oftalmólogo.' },
    ],
    voz: [
      'El segundo par se explora con cuatro cosas. La agudeza visual: de lejos con la tabla de Snellen, de cerca con la de Jaeger; si está disminuida, hablamos de ambliopía. Los colores, con las láminas de Ishihara: la alteración es la discromatopsia, y la más conocida, el daltonismo, que afecta el rojo y el verde.',
      'La campimetría, que en el consultorio se hace por confrontación. Y el fondo de ojo, con el oftalmoscopio, que casi siempre lo hace el oftalmólogo.',
    ],
    refs: [P3('00:04'), P3('00:46'), P3('01:29'), P3('02:10'), P3('02:57'), P3('03:37')],
  },
  {
    id: 't-musculos',
    sec: 'oculomotores',
    titulo: 'III, IV y VI: qué músculo inerva cada uno',
    fig: { f: 'oculomotores', vistas: ['musculos'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'III motor ocular común', tono: 'sky', text: 'Rectos **superior**, **inferior** e **interno**, **oblicuo inferior** y **elevador del párpado**. Y la pupila (miosis).' },
      { t: 'def', term: 'IV patético', tono: 'gold', en: 1, text: '**Oblicuo superior**: lleva el ojo **abajo y adentro**.' },
      { t: 'def', term: 'VI motor ocular externo', tono: 'peach', en: 1, text: '**Recto externo**: lleva el ojo **afuera**.' },
    ],
    examen: { origen: 'ortega', texto: 'Qué músculo inerva el III, el IV y el VI.', cita: 'Lo que sí le pueden llegar a preguntar es qué músculo del ojo inerva el tercer par, el cuarto par y el sexto par. Eso es pregunta de parcial, y eso sí lo tienen que saber.', ref: P3('10:54') },
    aclara: { text: 'El III inerva el oblicuo inferior (menor) y el IV el oblicuo superior (mayor); en la clase hubo una confusión de nombres con el apunte que quedó sin resolver.', origen: BIBLIO },
    voz: [
      'Pregunta de parcial: qué músculo inerva cada par oculomotor. El tercer par, el motor ocular común, inerva los rectos superior, inferior e interno, el oblicuo inferior, y el elevador del párpado superior; además contrae la pupila.',
      'El cuarto, el patético, inerva el oblicuo superior, que lleva el ojo hacia abajo y hacia adentro, a mirar la punta de la nariz. Y el sexto, el motor ocular externo, inerva el recto externo, que lleva el ojo hacia afuera.',
    ],
    refs: [P3('03:37'), P3('04:19'), P3('10:54'), P3('12:23'), P3('13:09'), P3('17:30'), P3('18:53')],
  },
  {
    id: 't-iii',
    sec: 'oculomotores',
    titulo: 'Parálisis del III par',
    fig: { f: 'oculomotores', vistas: ['iii', 'iii-parcial'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Completa', tono: 'red', text: 'Ojo **afuera y abajo**, **ptosis** palpebral y **midriasis**.' },
      { t: 'def', term: 'Parcial', tono: 'peach', en: 1, text: 'Todo menos la pupila: **responde al fotomotor**.' },
    ],
    examen: { origen: 'ortega', texto: 'La función del III par y qué le pasa al paciente si se lesiona.', cita: 'Eso es lo que le tienen que responder en el parcial, que le preguntan cuál es la función del tercer par y qué es lo que le hace al paciente.', ref: P3('07:57') },
    voz: [
      'La parálisis del tercer par, lo que tienen que responder en el parcial. Si es completa, el ojo se va hacia afuera y hacia abajo, hay ptosis palpebral, y la pupila queda dilatada, en midriasis.',
      'Si es parcial, está todo afectado menos la pupila: responde al reflejo fotomotor.',
    ],
    refs: [P3('06:32'), P3('07:16'), P3('07:57'), P3('08:43'), P3('29:32'), P3('30:14')],
  },
  {
    id: 't-iv-vi',
    sec: 'oculomotores',
    titulo: 'Parálisis del IV y del VI',
    fig: { f: 'oculomotores', vistas: ['iv', 'vi'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'IV par', tono: 'gold', text: 'El ojo ya no baja hacia adentro: queda **alto**; diplopía al mirar abajo (al bajar una escalera). Signo de **Bielschowsky**.' },
      { t: 'def', term: 'VI par', tono: 'peach', en: 1, text: 'El ojo no va hacia afuera: queda **desviado hacia adentro**.' },
    ],
    examen: { origen: 'ortega', texto: 'La parálisis del IV par.', cita: 'No pueden no saber nervioso, lo van a bochar de una.', ref: P3('09:49') },
    aclara: { text: 'En la parálisis del IV el ojo afectado queda más alto y el paciente ve doble al mirar hacia abajo y adentro; el signo de Bielschowsky es que la diplopía empeora al inclinar la cabeza hacia el lado afectado.', origen: BIBLIO },
    voz: [
      'Si se paraliza el cuarto par, el ojo ya no puede bajar hacia adentro, y queda más alto: el paciente ve doble al mirar hacia abajo, por ejemplo al bajar una escalera. Es el signo de Bielschowsky, que algunos docentes preguntan: con el sistema nervioso no se puede ir a rendir sin saberlo.',
      'Si se paraliza el sexto par, el ojo ya no puede ir hacia afuera, y queda desviado hacia adentro.',
    ],
    refs: [P3('08:43'), P3('09:26'), P3('10:14'), P3('30:14')],
  },
  {
    id: 't-diplopia',
    sec: 'oculomotores',
    titulo: 'Diplopía y estrabismo',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Lo primero que se ve: **estrabismo** (el ojo desviado) y **diplopía** (visión doble).' },
      { t: 'lista', en: 1, items: ['La diplopía **aparece o empeora al mirar hacia el lado del músculo paralizado**.', 'Puede ser **horizontal** (imágenes una al lado de la otra) o **vertical** (una arriba de la otra).', 'La motilidad se explora dibujando una **H** con el dedo.'] },
    ],
    voz: [
      'Lo principal que se ve en la motilidad ocular es el estrabismo, el ojo desviado, junto con la diplopía, la visión doble. La diplopía aparece o empeora cuando el paciente intenta mirar hacia el lado del músculo paralizado.',
      'Puede ser horizontal, con las imágenes una al lado de la otra, o vertical, una arriba de la otra. La motilidad se explora pidiéndole que siga el dedo, dibujando una hache.',
    ],
    refs: [P3('22:20'), P3('23:04'), P3('23:45'), P3('26:42')],
  },
  {
    id: 't-nistagmo',
    sec: 'oculomotores',
    titulo: 'Nistagmo',
    fig: { f: 'oculomotores', vistas: ['nistagmo'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Movimientos **oscilatorios** de los ojos: horizontales, verticales o rotatorios. Fisiológico (provocado) o patológico.' },
      { t: 'def', term: 'Central', tono: 'red', en: 1, text: '**Cerebelo**: horizontal o **vertical**.' },
      { t: 'def', term: 'Periférico', tono: 'sky', en: 1, text: '**Vestíbulo**: horizontal-rotatorio.' },
      { t: 'texto', en: 2, text: 'Se describe por su sentido, fase, dirección, frecuencia e intensidad (grado 1 a 3).' },
    ],
    examen: { origen: 'ortega', texto: 'El nistagmo.', cita: 'Esto es pregunta de parcial, por favor, chicos, no me pueden no saber… [un docente] le encanta preguntar nistagmo, tanto en el parcial como en los finales.', ref: P3('22:14') },
    aclara: { text: 'El nistagmo vertical es central; el vestibular periférico es horizontal-rotatorio.', origen: BIBLIO },
    voz: [
      'El nistagmo es pregunta de parcial y de final. Son movimientos oscilatorios de los ojos, horizontales, verticales o rotatorios. Puede ser fisiológico, provocado, o patológico.',
      'El patológico indica una lesión del cerebelo o del vestíbulo. El central, cerebeloso, puede ser horizontal o vertical. El periférico, vestibular, es horizontal y rotatorio. Los que se preguntan son el vestibular y el cerebeloso.',
      'Se describe por su sentido, su fase, su dirección, su frecuencia y su intensidad, de grado uno a tres.',
    ],
    refs: [P3('22:14'), P3('23:45'), P3('24:30'), P3('25:20'), P3('26:01'), P3('27:25'), P3('28:06'), P3('28:51')],
  },
  {
    id: 't-pupila',
    sec: 'oculomotores',
    titulo: 'La pupila y sus reflejos',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'La motilidad **intrínseca** (la pupila) depende solo del **III par**.' },
      { t: 'lista', en: 1, items: ['**Miosis**: pupila chica. **Midriasis**: grande. **Anisocoria**: distintas. **Hippus**: oscila con la luz.', 'Lesión del **mesencéfalo**: se pierde la contracción → midriasis.'] },
      {
        t: 'cuadro',
        en: 2,
        head: ['Reflejo', 'Cómo'],
        filas: [
          ['**Fotomotor**', 'Luz → II → Edinger-Westphal → III → miosis'],
          ['**Consensual**', 'Se ilumina un ojo y se contrae también el otro'],
          ['**Acomodación-convergencia**', 'Mirar un objeto cercano: convergen y se contraen'],
        ],
      },
    ],
    voz: [
      'La pupila es la motilidad intrínseca, y depende solo del tercer par. Miosis es la pupila chica; midriasis, grande; anisocoria, distintas entre sí; y el hippus, pequeñas oscilaciones con la luz. Si se lesiona el mesencéfalo, se pierde la contracción y aparece midriasis.',
      'Los reflejos: el fotomotor, con la luz, el segundo par, el núcleo de Edinger-Westphal y el tercer par; el consensual, se ilumina un ojo y también se contrae el otro; y el de acomodación y convergencia, al mirar un objeto cercano.',
    ],
    refs: [P3('31:37'), P3('32:20'), P3('33:03'), P3('33:48'), P3('34:29')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'generalidades', label: 'Generalidades' },
    { id: 'olfatorio', label: 'I olfatorio' },
    { id: 'optico', label: 'II óptico' },
    { id: 'oculomotores', label: 'III, IV y VI' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Se choca con las puertas',
    texto: 'Mujer de 40 años con cefalea que se choca con los marcos de las puertas de los dos lados. En la campimetría por confrontación no ve los objetos que vienen desde afuera, en ninguno de los dos ojos.',
    pregunta: '¿Qué defecto tiene y dónde está la lesión?',
    opciones: [
      { text: 'Hemianopsia bitemporal: quiasma.', why: 'Se pierden los dos campos temporales: las fibras nasales que cruzan.' },
      { text: 'Hemianopsia homónima: cintilla.', why: 'Perdería la misma mitad en los dos ojos.' },
      { text: 'Amaurosis: nervio óptico.', why: 'Perdería todo un ojo.' },
      { text: 'Cuadrantanopsia: radiaciones.', why: 'Perdería un solo cuadrante.' },
    ],
    correcta: 0,
    razonamiento: 'Los campos temporales los ven las fibras nasales, que cruzan en el quiasma.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Un párpado caído y la pupila grande',
    texto: 'Paciente con el párpado derecho caído; al levantarlo, el ojo derecho mira hacia afuera y hacia abajo y la pupila está dilatada y no responde a la luz.',
    pregunta: '¿Qué par está afectado y cómo?',
    opciones: [
      { text: 'III par, parálisis completa.', why: 'Ptosis, ojo afuera y abajo, midriasis arreactiva.' },
      { text: 'III par, parálisis parcial.', why: 'En la parcial la pupila responde.' },
      { text: 'VI par.', why: 'Daría el ojo desviado hacia adentro.' },
      { text: 'IV par.', why: 'Daría el ojo alto y diplopía al mirar abajo.' },
    ],
    correcta: 0,
    razonamiento: 'El III levanta el párpado, mueve el ojo arriba, abajo y adentro y contrae la pupila.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'No siente olores',
    texto: 'Hombre de 70 años con temblor de reposo, que cuenta que hace años dejó de sentir el olor de la comida. No tiene resfrío.',
    pregunta: '¿Qué explica la anosmia?',
    opciones: [
      { text: 'Atrofia del bulbo olfatorio en el Parkinson.', why: 'El Parkinson cursa con hiposmia o anosmia.' },
      { text: 'Una lesión del tálamo.', why: 'El olfato no pasa por el tálamo.' },
      { text: 'Una lesión del quiasma.', why: 'Daría un defecto visual.' },
      { text: 'Alucinaciones olfatorias.', why: 'Son percepciones sin estímulo, no pérdida.' },
    ],
    correcta: 0,
    razonamiento: 'El Parkinson atrofia el bulbo olfatorio.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'pc',
        label: 'Pares craneales I',
        tone: 'gold',
        nota: 'Motores, sensoriales y mixtos · I y II intracraneales · III y IV mesencéfalo',
        hijos: [
          { id: 'olf', label: 'I olfatorio', tone: 'mint', examen: true, nota: 'Bulbo olfatorio → uncus · **único sin tálamo**' },
          { id: 'opt', label: 'II óptico', tone: 'sky', examen: true, nota: 'Recorrido · **vía óptica** · **hemianopsias** · cuadrantanopsias' },
          { id: 'ocu', label: 'III, IV y VI', tone: 'peach', examen: true, nota: '**Qué músculo inerva cada uno** · parálisis · diplopía · **nistagmo**' },
          { id: 'pup', label: 'Pupila', tone: 'lilac', nota: 'Fotomotor: II → Edinger-Westphal → III · consensual' },
        ],
      },
    ],
    nexos: ['**Las fibras nasales cruzan y ven el campo temporal.**', '**III: afuera y abajo, ptosis, midriasis.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['neu03-d01', 'neu03-d02', 'neu03-d03', 'neu03-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    generalidades: { tab: 'teoria', seccion: 'generalidades' },
    olfatorio: { tab: 'teoria', seccion: 'olfatorio' },
    optico: { tab: 'teoria', seccion: 'optico' },
    oculomotores: { tab: 'teoria', seccion: 'oculomotores' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
