import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-03: clase visual. Jerarquía de fuentes:
 *  1. Clases de Ortega: MC Digestivo 5 (diarrea y constipación) y 6 (constipación, Bristol, trastornos anorrectales).
 *  2. Libro de Clínica Médica de Ortega (p. 379): aclaraciones sobre la esteatorrea.
 *  3. Argente-Álvarez (cap. 39-5 p. 654–655; 39-6 p. 658): solo los mecanismos que la clase no explica.
 *  4. Preguntero: bloque «MC diarrea, constipación y defecación» (P1–P12).
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M5 = (t: string) => r('mc-dig-5', t);
const M6 = (t: string) => r('mc-dig-6', t);
const L = (p: string) => r('libro', undefined, p);
const A = (p: string) => r('argente-libro', undefined, p);

const ARG = 'Argente-Álvarez';
const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  /* ──────── El intestino normal ──────── */
  {
    id: 'f-absorcion',
    sec: 'normal',
    titulo: 'Absorber y secretar: un equilibrio',
    etapas: ['normal'],
    fig: { f: 'mucosa', modo: 'normal' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'Las **vellosidades** del delgado multiplican la superficie: por ahí pasa a la sangre casi toda el agua.' },
      { t: 'texto', en: 1, text: 'El **colon** termina de secar la materia fecal.' },
      { t: 'clave', en: 2, text: 'La diarrea es la **ruptura del equilibrio** entre absorción y secreción.' },
    ],
    voz: [
      'Empecemos por lo normal. En el intestino delgado, las vellosidades multiplican la superficie, y por ahí pasa a la sangre casi toda el agua que llega.',
      'Lo poco que queda llega al colon, que termina de secar la materia fecal.',
      'Toda diarrea, sea cual sea su causa, es lo mismo: se rompe el equilibrio entre lo que se absorbe y lo que se secreta.',
    ],
    refs: [A('655')],
  },
  {
    id: 'f-alta-baja',
    sec: 'normal',
    titulo: 'Por qué una es voluminosa y la otra frecuente',
    etapas: ['mecanismo', 'signo'],
    fig: {
      f: 'tracto',
      vistas: [
        { luz: { duodeno: 'sky', yeyuno: 'sky', ileon: 'sky' }, nota: 'Alta: delgado', notaTone: 'sky' },
        { luz: { colon: 'rose', recto: 'rose' }, nota: 'Baja: colon', notaTone: 'rose' },
      ],
    },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Alta', tono: 'sky', text: 'Falla el **delgado**, que maneja casi todo el líquido: mucho **volumen**, acuosa.' },
      { t: 'def', term: 'Baja', tono: 'rose', en: 1, text: 'Se inflama el **colon**: el recto irritado pide evacuar con poco contenido. Mucha **frecuencia**, con moco, pus o sangre.' },
    ],
    aclara: { text: 'El recto inflamado se estimula con muy poco contenido: por eso la diarrea baja es frecuente, escasa y con urgencia.', origen: GRAL },
    voz: [
      'Esto explica la diferencia entre la diarrea alta y la baja. Si falla el intestino delgado, que es el que maneja casi todo el líquido, la diarrea es acuosa y de gran volumen.',
      'Si lo que se inflama es el colon, el recto irritado pide evacuar con muy poco contenido. Entonces el paciente va muchas veces, poca cantidad, y con moco, pus o sangre.',
    ],
    refs: [M5('02:50'), M5('03:31'), M5('04:12')],
  },

  /* ──────── Las toxinas ──────── */
  {
    id: 'f-enterotoxina',
    sec: 'toxinas',
    titulo: 'Enterotoxina: saca agua a la luz',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'secretora' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Agua o comida contaminada: cólera, **E. coli enterotoxigénica**, rotavirus.' },
          { k: 'mecanismo', text: 'La toxina activa la **secreción** de cloro y agua hacia la luz, **sin destruir** la mucosa.' },
          { k: 'signo', text: 'Diarrea **acuosa y voluminosa**: alta. Riesgo de deshidratación.' },
        ],
      },
    ],
    voz: [
      'Las diarreas agudas se entienden por sus toxinas. La primera es la enterotoxina: la traen el cólera, la Escherichia coli enterotoxigénica o el rotavirus, con el agua o la comida.',
      'La toxina no destruye la mucosa: lo que hace es activar la secreción de cloro y de agua hacia la luz.',
      'El resultado es una diarrea acuosa, de gran volumen, y el riesgo es la deshidratación.',
    ],
    refs: [M5('15:42'), M5('16:22'), A('655')],
  },
  {
    id: 'f-neurotoxina',
    sec: 'toxinas',
    titulo: 'Neurotoxina: acelera el intestino',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'motora' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Staphylococcus aureus** en huevo o mayonesa: la toxina ya viene formada.' },
          { k: 'mecanismo', text: 'Actúa sobre el **sistema nervioso autónomo** del intestino: aumenta el peristaltismo.' },
          { k: 'signo', text: '**Vómitos** y diarrea a las pocas horas; deshidratación.' },
        ],
      },
    ],
    aclara: { text: 'Como la toxina ya está formada en el alimento, los síntomas empiezan muy rápido: por eso, cuando además vomita, pensá en una toxina.', origen: `Vómitos y toxinas: clase, min 23:04. Toxina preformada: ${GRAL}` },
    voz: [
      'La segunda es la neurotoxina, y el ejemplo clásico es el estafilococo dorado, en el huevo o la mayonesa.',
      'Esta toxina actúa sobre el sistema nervioso autónomo del intestino y aumenta el peristaltismo.',
      'El paciente vomita y tiene diarrea pocas horas después de comer, y puede deshidratarse mucho.',
    ],
    refs: [M5('16:22'), M5('17:02'), M5('23:04')],
  },
  {
    id: 'f-citotoxina',
    sec: 'toxinas',
    titulo: 'Citotoxina: destruye la mucosa',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'inflamatoria' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Shigella**, **E. coli enterohemorrágica**; Clostridium difficile después de un antibiótico.' },
          { k: 'mecanismo', text: 'La toxina **daña la mucosa** del colon: sangra y se llena de leucocitos.' },
          { k: 'signo', text: 'Diarrea **disentérica**: moco, pus y sangre, fiebre, pujo y tenesmo.' },
        ],
      },
    ],
    voz: [
      'La tercera es la citotoxina. La producen la Shigella y la Escherichia coli enterohemorrágica, y también el Clostridium difficile cuando un antibiótico, como la clindamicina, altera la flora.',
      'Esta toxina sí destruye la mucosa del colon: la mucosa sangra y se llena de leucocitos.',
      'Por eso la diarrea trae moco, pus y sangre, con fiebre, pujo y tenesmo. Es la diarrea disentérica.',
    ],
    refs: [M5('08:57'), M5('09:40'), M5('17:42')],
  },
  {
    id: 'f-suh',
    sec: 'toxinas',
    titulo: 'Si la verotoxina pasa a la sangre',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La **verotoxina** de Shigella o E. coli O157 atraviesa la mucosa dañada.' },
          { k: 'mecanismo', text: 'Lesiona el **endotelio**, sobre todo del riñón: se forman microtrombos.' },
          { k: 'signo', text: '**Síndrome urémico hemolítico**: insuficiencia renal aguda, anemia hemolítica, plaquetas bajas.' },
        ],
      },
    ],
    aclara: { text: 'En clase se destaca la insuficiencia renal aguda. La anemia hemolítica y la plaquetopenia completan la tríada del síndrome.', origen: `Insuficiencia renal: clase, min 13:02. Mecanismo y tríada: ${GRAL}` },
    voz: [
      'Y la complicación que hay que conocer. La verotoxina de la Shigella o de la Escherichia coli O ciento cincuenta y siete puede atravesar la mucosa dañada y pasar a la sangre.',
      'Ahí lesiona el endotelio de los vasos, sobre todo en el riñón, y se forman pequeños trombos.',
      'Es el síndrome urémico hemolítico: insuficiencia renal aguda, con anemia hemolítica y plaquetas bajas.',
    ],
    refs: [M5('13:02'), M5('13:42')],
  },

  /* ──────── Diarrea crónica ──────── */
  {
    id: 'f-osmotica',
    sec: 'cronica',
    titulo: 'Osmótica: el soluto que arrastra agua',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'osmotica' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Falta la **lactasa**: la lactosa no se absorbe.' },
          { k: 'mecanismo', text: 'El azúcar en la luz **retiene agua**.' },
          { k: 'signo', text: 'Diarrea que **cede con el ayuno**, al dejar la leche.' },
        ],
      },
    ],
    voz: [
      'Pasemos a la diarrea crónica, que tiene cinco mecanismos. El primero es el osmótico. El ejemplo es el déficit de lactasa: la lactosa de la leche no se absorbe.',
      'Ese azúcar queda en la luz y retiene agua.',
      'La clave para reconocerla: si el paciente deja de tomar leche, o ayuna, la diarrea se va.',
    ],
    refs: [M5('19:44'), M5('20:24'), A('655')],
  },
  {
    id: 'f-secretora',
    sec: 'cronica',
    titulo: 'Secretora: el intestino que no para',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'secretora' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un tumor que secreta hormonas: **VIPoma**, Zollinger-Ellison; o laxantes.' },
          { k: 'mecanismo', text: 'Las criptas secretan líquido **activamente**.' },
          { k: 'signo', text: 'Acuosa, voluminosa, y **persiste en ayunas**.' },
        ],
      },
    ],
    voz: [
      'El segundo es el secretor. Un tumor que produce hormonas, como el VIPoma o el gastrinoma del Zollinger-Ellison, o el uso de laxantes...',
      'hace que las criptas secreten líquido de forma activa.',
      'La diferencia con la osmótica es que esta no depende de lo que se come: persiste aunque el paciente ayune.',
    ],
    refs: [M5('20:24'), A('655')],
  },
  {
    id: 'f-inflamatoria',
    sec: 'cronica',
    titulo: 'Inflamatoria: la mucosa dañada',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'inflamatoria' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Enfermedad inflamatoria intestinal**: Crohn, colitis ulcerosa.' },
          { k: 'mecanismo', text: 'Se daña el epitelio y se liberan **citocinas**: la mucosa exuda.' },
          { k: 'signo', text: 'Fiebre, dolor y **sangre** en la materia fecal.' },
        ],
      },
    ],
    voz: [
      'El tercero es el inflamatorio, como en la enfermedad de Crohn o la colitis ulcerosa.',
      'El epitelio se daña y se liberan sustancias inflamatorias, y la mucosa pierde líquido hacia la luz.',
      'Por eso hay fiebre, dolor, y sangre en la materia fecal.',
    ],
    refs: [M5('20:24'), M5('21:04'), A('655')],
  },
  {
    id: 'f-malabsortiva',
    sec: 'cronica',
    titulo: 'Malabsortiva: la grasa que flota',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'malabsortiva' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Celíaca** (vellosidades atróficas), giardiasis crónica, falta de enzimas pancreáticas.' },
          { k: 'mecanismo', text: 'No se absorben **las grasas**, y con ellas proteínas, hierro y vitaminas.' },
          { k: 'signo', text: '**Esteatorrea**: heces brillantes que flotan; pérdida de peso, anemia, hipoalbuminemia.' },
        ],
      },
    ],
    voz: [
      'El cuarto, el que el profesor pide que aprendas, es el malabsortivo. En la celíaca, por ejemplo, las vellosidades se atrofian.',
      'Sin superficie, no se absorben las grasas, y tampoco las proteínas, el hierro ni las vitaminas.',
      'La grasa sale con las heces: son brillantes, abundantes y flotan en el agua. Es la esteatorrea. Y el paciente adelgaza, se anemiza y baja la albúmina.',
    ],
    refs: [M5('21:04'), M5('21:44'), M5('25:04'), L('379')],
  },
  {
    id: 'f-motora',
    sec: 'cronica',
    titulo: 'Motora: no da tiempo a absorber',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'mucosa', modo: 'motora' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Hipertiroidismo**, intestino irritable.' },
          { k: 'mecanismo', text: 'El tránsito se **acelera**: el contenido pasa sin tiempo de contacto.' },
          { k: 'signo', text: 'Diarrea sin lesión de la mucosa.' },
        ],
      },
    ],
    voz: [
      'Y el quinto es el motor, como en el hipertiroidismo o el intestino irritable.',
      'El tránsito se acelera, y el contenido pasa tan rápido que no hay tiempo para absorberlo.',
      'La mucosa está sana: el problema es la velocidad.',
    ],
    refs: [M5('22:24'), M5('28:28'), A('655')],
  },

  /* ──────── Defecar ──────── */
  {
    id: 'f-defecacion',
    sec: 'defecacion',
    titulo: 'La defecación normal',
    etapas: ['normal'],
    fig: { f: 'defecacion', modo: 'normal' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Llenado', tono: 'sky', text: 'La materia fecal **distiende el recto**: aparece el deseo.' },
      { t: 'def', term: 'Reflejo', tono: 'mint', en: 1, text: 'El **esfínter interno**, involuntario, se relaja.' },
      { t: 'def', term: 'Voluntad', tono: 'lilac', en: 2, text: 'Al pujar se relajan el **puborrectal** y el **esfínter externo**: se abre el ángulo y sale.' },
    ],
    aclara: { text: 'El puborrectal es un cabestrillo que tira del recto hacia adelante y mantiene el ángulo cerrado: así se contiene. Para evacuar, tiene que relajarse.', origen: GRAL },
    voz: [
      'Para entender la constipación, veamos la defecación normal. La materia fecal llega al recto, lo distiende, y aparece el deseo de evacuar.',
      'Por reflejo, el esfínter anal interno, que es involuntario, se relaja.',
      'Y al pujar, el paciente relaja voluntariamente el músculo puborrectal y el esfínter externo. El ángulo entre el recto y el ano se abre, y la materia fecal sale.',
    ],
    refs: [A('658')],
  },
  {
    id: 'f-bristol',
    sec: 'defecacion',
    titulo: 'Por qué la forma dice el tránsito',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'bristol' },
    anchoFig: 'media',
    bloques: [
      { t: 'texto', text: 'Cuanto **más tiempo** pasa la materia fecal en el colon, **más agua** pierde.' },
      { t: 'def', term: 'Tránsito lento', tono: 'peach', text: 'Bolitas duras: **tipos 1 y 2**.' },
      { t: 'def', term: 'Tránsito rápido', tono: 'sky', en: 2, text: 'Pastosa o líquida: **tipos 6 y 7**.' },
    ],
    voz: [
      'La forma de la materia fecal refleja cuánto tiempo estuvo en el colon. Cuanto más tiempo pasa, más agua se absorbe.',
      'Si el tránsito es normal, la forma es la de una salchicha.',
      'Y si es muy rápido, no hay tiempo de secarla: sale pastosa o líquida.',
    ],
    refs: [M6('01:43'), A('658')],
  },
  {
    id: 'f-constipacion',
    sec: 'defecacion',
    titulo: 'Tres maneras de constiparse',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'defecacion', modo: 'anismo' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Tránsito lento', tono: 'peach', text: 'Falla el **plexo mientérico** del colon; en el extremo, Hirschsprung.' },
      { t: 'def', term: 'Piso pélvico', tono: 'red', en: 1, text: 'Al pujar, el puborrectal **se contrae** en lugar de relajarse: **anismo**.' },
      { t: 'def', term: 'Secundaria', tono: 'gold', en: 1, text: 'El colon está sano: dieta pobre, fármacos, hipotiroidismo.' },
    ],
    aclara: { text: 'Por eso el **test de expulsión del balón** sirve: si el paciente no puede expulsarlo, el piso pélvico no se relaja.', origen: 'Clase, min 04:59.' },
    voz: [
      'La constipación crónica puede tener tres mecanismos. En el tránsito lento, falla la inervación del colon, y el contenido avanza despacio.',
      'En la disfunción del piso pélvico, el paciente puja, pero el puborrectal se contrae en lugar de relajarse. Es el anismo: la materia fecal no sale. Y en las secundarias el colon está sano, y la causa está afuera: la dieta, un fármaco o el hipotiroidismo.',
    ],
    refs: [M5('33:50'), M5('34:30'), M5('35:11'), M6('04:59'), A('658')],
  },
  {
    id: 'f-tenesmo',
    sec: 'defecacion',
    titulo: 'Por qué aparecen pujo y tenesmo',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'defecacion', modo: 'tenesmo' },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El **recto se inflama**: diarrea disentérica.' },
          { k: 'mecanismo', text: 'Los receptores de distensión se activan **aunque el recto esté vacío**.' },
          { k: 'signo', text: '**Pujo**: dolor y deseo sin lograr evacuar. **Tenesmo**: evacuó y sigue sintiendo el recto ocupado.' },
        ],
      },
    ],
    aclara: { text: 'Por eso son típicos de la diarrea **baja**: la inflamación está justo donde se genera el deseo de evacuar.', origen: `Asociación con la disentérica: clase, min 12:52. Mecanismo: ${GRAL}` },
    voz: [
      'Y por qué la diarrea disentérica da pujo y tenesmo. Porque el recto está inflamado.',
      'Sus receptores de distensión se activan aunque esté vacío.',
      'Entonces el paciente siente dolor y ganas de evacuar sin lograrlo, que es el pujo; o evacua y sigue sintiendo el recto ocupado, que es el tenesmo.',
    ],
    refs: [M6('12:11'), M6('12:52')],
  },
  {
    id: 'f-sangrado',
    sec: 'defecacion',
    titulo: 'De dónde viene la sangre',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'defecacion', modo: 'hemorroides' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Gotas al final', tono: 'rose', text: 'La sangre fresca del **canal anal** cae después de las heces: hemorroides internas o fisura.' },
      { t: 'def', term: 'Bañada en sangre', tono: 'red', en: 1, text: 'La sangre del **colon** se mezcla con la materia fecal en su recorrido.' },
    ],
    voz: [
      'Y la sangre. Si sangra el canal anal, por hemorroides internas o una fisura, la sangre fresca cae al final, en gotas, después de la materia fecal.',
      'Si sangra el colon, la sangre se mezcla con las heces en su recorrido, y la materia fecal sale bañada en sangre.',
    ],
    refs: [M6('08:36'), M6('09:17'), M6('10:01')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'normal', label: 'El intestino normal' },
    { id: 'toxinas', label: 'Las toxinas' },
    { id: 'cronica', label: 'Cinco mecanismos' },
    { id: 'defecacion', label: 'Defecar' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  /* ──────── Diarrea ──────── */
  {
    id: 't-definicion',
    sec: 'diarrea',
    titulo: 'Diarrea: qué es',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Disminución de la **consistencia** de las heces con aumento de la **frecuencia** y del **volumen**.' },
      { t: 'texto', en: 1, text: 'Con o sin náuseas, vómitos, fiebre o dolor abdominal, que son muy comunes.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la diarrea? Definición.' },
    voz: [
      'Vamos con la teoría. La diarrea es la disminución de la consistencia de las heces, con aumento de la frecuencia y del volumen de las deposiciones.',
      'Puede acompañarse de náuseas, vómitos, fiebre o dolor abdominal, que son muy frecuentes.',
    ],
    refs: [M5('00:00'), M5('00:45')],
  },
  {
    id: 't-evolucion',
    sec: 'diarrea',
    titulo: 'Por su evolución',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Aguda', tono: 'sky', items: ['Menos de **2 semanas**', 'Casi siempre **intoxicación alimentaria**', 'Infecciones, toxinas, fármacos (**clindamicina**)'] },
          { titulo: 'Persistente', tono: 'lilac', items: ['De **2 a 4 semanas**', 'Empieza como aguda', '**Parásitos**; si no, E. coli'] },
          { titulo: 'Crónica', tono: 'rose', items: ['Más de **4 semanas**', 'En general **orgánica**', 'Específica: **celíaca** · inespecífica: **intestino irritable**'] },
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: '¿Cómo se clasifica la diarrea?' },
    voz: [
      'La clasificación más común es por su evolución. La aguda dura menos de dos semanas y casi siempre es una intoxicación alimentaria. También puede deberse a un fármaco, como la clindamicina.',
      'La persistente dura de dos a cuatro semanas. Empieza como una aguda, y las causas más comunes son los parásitos.',
      'Y la crónica dura más de cuatro semanas, y casi siempre es orgánica. Entre las específicas, la más común es la enfermedad celíaca; entre las inespecíficas, el intestino irritable.',
    ],
    refs: [M5('01:28'), M5('02:09'), M5('19:03')],
  },
  {
    id: 't-alta-baja',
    sec: 'diarrea',
    titulo: 'Alta o baja',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Alta', 'Baja'],
        filas: [
          ['Dónde', 'Intestino **delgado**', '**Colon**'],
          ['Predomina', 'El **volumen**: 3 o 4 veces, mucho líquido', 'La **frecuencia**: hasta 10 veces, poquito'],
          ['Aspecto', 'Acuosa, voluminosa, clara', 'Más oscura, con **moco, pus o sangre**'],
          ['Nombre', '**Acuosa**', '**Disentérica**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Diarrea alta frente a diarrea baja.', cita: 'Es importante que la conozcan.', ref: M5('03:09') },
    voz: [
      'Hay otra clasificación que el profesor pide conocer: alta o baja. La alta afecta el intestino delgado; la baja, el colon.',
      'En la alta predomina el volumen: el paciente va tres o cuatro veces, pero mucho líquido. En la baja predomina la frecuencia: puede ir diez veces al día, pero poquito.',
      'La alta es acuosa y clara. La baja es más oscura, porque trae moco, pus o sangre.',
      'Por eso a la alta se la llama acuosa, y a la baja, disentérica.',
    ],
    refs: [M5('02:50'), M5('03:09'), M5('03:31'), M5('04:12')],
  },
  {
    id: 't-acuosa-disenterica',
    sec: 'diarrea',
    titulo: 'Acuosa y disentérica: quién las produce',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Diarrea aguda',
          tono: 'sky',
          hijos: [
            { t: 'Acuosa (alta)', d: 'virus, bacterias, parásitos · enterotoxinas', tono: 'sky' },
            { t: 'Disentérica (baja)', d: 'siempre bacteriana · verotoxina', tono: 'rose', examen: true },
          ],
        },
      },
      { t: 'texto', en: 1, text: 'Lo importante de la etiología son **las toxinas** que producen.' },
    ],
    examen: { origen: 'ortega', texto: 'Diarrea acuosa y disentérica.', cita: 'Esto no se lo puse en el apunte, pero usted lo tiene que conocer.', ref: M5('07:05') },
    voz: [
      'Según su fisiopatogenia, la diarrea aguda puede ser acuosa, que es la alta, o disentérica, que es la baja. La acuosa la producen virus, bacterias o parásitos, a través de sus toxinas.',
      'La disentérica, en cambio, siempre es bacteriana. Y lo que importa de la etiología es la toxina que cada germen produce.',
    ],
    refs: [M5('06:14'), M5('06:55'), M5('07:05'), M5('08:16')],
  },
  {
    id: 't-disentericas',
    sec: 'diarrea',
    titulo: 'Las dos bacterias de la disentérica',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        items: [
          { ico: 'lab', t: 'Shigella', tono: 'rose' },
          { ico: 'lab', t: 'E. coli enterohemorrágica', d: 'cepa O157', tono: 'red' },
        ],
      },
      { t: 'texto', en: 1, text: 'Producen **verotoxina**. Pus, sangre y **leucocitos** en la materia fecal; fiebre; pujo y tenesmo.' },
      { t: 'clave', en: 2, tono: 'red', text: 'Complicación: **síndrome urémico hemolítico**, con insuficiencia renal aguda.' },
    ],
    examen: { origen: 'ortega', texto: 'Las bacterias de la diarrea disentérica.', cita: 'Y yo siempre digo dos… Nunca no olvidemos estas.', ref: M5('09:22') },
    voz: [
      'Las bacterias de la disentérica son dos, y el profesor dice que no se olvidan: la Shigella y la Escherichia coli enterohemorrágica, la cepa O ciento cincuenta y siete.',
      'Las dos producen verotoxina. El paciente tiene pus, sangre y leucocitos en la materia fecal, fiebre, pujo y tenesmo.',
      'Y la complicación grave es el síndrome urémico hemolítico, con insuficiencia renal aguda.',
    ],
    refs: [M5('08:57'), M5('09:22'), M5('12:22'), M5('13:02')],
  },
  {
    id: 't-toxinas',
    sec: 'diarrea',
    titulo: 'Las toxinas y sus ejemplos',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Toxina', 'Ejemplo', 'Qué hace'],
        filas: [
          ['Enterotoxina', 'Cólera, E. coli enterotoxigénica, rotavirus', 'Saca **agua a la luz**: acuosa'],
          ['Neurotoxina', '**S. aureus**: huevo, mayonesa', 'Aumenta el **peristaltismo**; vómitos'],
          ['Citotoxina', 'Salmonella, **C. difficile** tras clindamicina', '**Daña** la mucosa'],
          ['Enteroadherentes', 'Parásitos', 'Se adhieren sin invadir'],
        ],
      },
      { t: 'texto', en: 3, text: 'Los **fármacos** producen una diarrea **acuosa**.' },
    ],
    examen: { origen: 'ortega', texto: 'Fármacos y diarrea acuosa.', cita: '…los fármacos producen una diarrea acuosa, no hay que olvidarse…', ref: M5('18:47') },
    voz: [
      'Las toxinas, con sus ejemplos. La enterotoxina del cólera, de la Escherichia coli enterotoxigénica o del rotavirus saca agua a la luz.',
      'La neurotoxina del estafilococo dorado, típica del huevo y la mayonesa, aumenta el peristaltismo y da vómitos.',
      'La citotoxina de la Salmonella o del Clostridium difficile daña la mucosa.',
      'Y los gérmenes enteroadherentes, como los parásitos, se adhieren sin invadir. Y no te olvides: los fármacos producen una diarrea acuosa.',
    ],
    refs: [M5('15:42'), M5('16:22'), M5('17:02'), M5('17:42'), M5('18:47')],
  },
  {
    id: 't-viajero',
    sec: 'diarrea',
    titulo: 'Diarrea del viajero y grupos de riesgo',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Diarrea del viajero', tono: 'sky', text: 'Viajes al Caribe, Latinoamérica o África, por el agua. **E. coli enterotoxigénica** y **Vibrio cholerae**. Acuosa, sin fiebre, autolimitada: **menos de una semana**.' },
      { t: 'def', term: 'Grupos de riesgo', tono: 'lilac', en: 1, text: 'Viajeros, homosexuales, inmunodeprimidos, pacientes que reciben tratamientos.' },
    ],
    voz: [
      'Un caso particular es la diarrea del viajero: el paciente viaja al Caribe o a África, toma el agua, y se contagia Escherichia coli enterotoxigénica o el vibrión del cólera. Es acuosa, sin fiebre, y se resuelve sola en menos de una semana.',
      'Los grupos de riesgo para las diarreas infecciosas son los viajeros, los homosexuales y los inmunodeprimidos.',
    ],
    refs: [M5('11:01'), M5('11:42'), M5('12:22')],
  },
  {
    id: 't-persistente',
    sec: 'diarrea',
    titulo: 'Diarrea persistente',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          'Dura de **2 a 4 semanas**: empieza como una aguda.',
          'También llamada **posgastroenterítica**.',
          'La mayoría son **pediátricos**.',
          'Causa más común: **parásitos**; si no, E. coli.',
          'Puede no tener síntomas generales.',
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es la diarrea persistente?' },
    voz: [
      'La diarrea persistente dura de dos a cuatro semanas. Empieza siendo aguda y se prolonga.',
      'También se la llama posgastroenterítica.',
      'La mayoría de los pacientes son niños.',
      'Y la causa más común son los parásitos; si no, la Escherichia coli.',
      'Puede no tener síntomas generales.',
    ],
    refs: [M5('18:22'), M5('19:03')],
  },
  {
    id: 't-cronica',
    sec: 'diarrea',
    titulo: 'Diarrea crónica: cinco mecanismos',
    bloques: [
      {
        t: 'cuadro',
        head: ['Mecanismo', 'Ejemplo', 'Pista'],
        filas: [
          ['Osmótica', 'Déficit de **lactasa**', '**Cede** con el ayuno'],
          ['Secretora', '**VIPoma**, Zollinger-Ellison, laxantes', '**Persiste** en ayunas'],
          ['Inflamatoria', 'Enfermedad inflamatoria intestinal', 'Sangre, fiebre, dolor'],
          ['**Malabsortiva**', '**Celíaca**, giardiasis crónica', '**Esteatorrea**'],
          ['Motora', 'Hipertiroidismo, intestino irritable', 'Tránsito acelerado'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La diarrea malabsortiva.', cita: 'La que yo quiero que ustedes se aprendan… y preguntan en el final.', ref: M5('21:26') },
    aclara: { text: 'La esteatorrea se confirma con **Van de Kamer**: más de **6 g/día** de grasa en heces, con una dieta de 100 g/día durante 72 horas. Se profundiza en [[dig-09|Malabsorción]].', origen: 'Libro, p. 379.' },
    voz: [
      'La diarrea crónica tiene cinco mecanismos. Osmótica: el déficit de lactasa; cede con el ayuno.',
      'Secretora: el VIPoma, el Zollinger-Ellison o los laxantes; persiste en ayunas.',
      'Inflamatoria: la enfermedad inflamatoria intestinal, con sangre, fiebre y dolor.',
      'Malabsortiva, la que el profesor dice que preguntan en el final: la celíaca o la giardiasis crónica, con esteatorrea.',
      'Y motora: el hipertiroidismo o el intestino irritable, por tránsito acelerado.',
    ],
    refs: [M5('19:44'), M5('20:24'), M5('21:04'), M5('21:26'), M5('21:44'), M5('22:24')],
  },
  {
    id: 't-funcional-organica',
    sec: 'diarrea',
    titulo: 'Diarrea crónica: ¿funcional u orgánica?',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Funcional', tono: 'mint', items: ['Aparece **por la mañana**', 'Sin pérdida de peso', 'Diagnóstico por exclusión: intestino irritable'] },
          { titulo: 'Orgánica', tono: 'red', items: ['Deposiciones **nocturnas**', '**Pérdida de peso**', 'Malabsorción: **anemia**, hipoalbuminemia'] },
        ],
      },
    ],
    voz: [
      'Ante una diarrea crónica, hay que distinguir si es funcional u orgánica. La funcional aparece por la mañana, el paciente no adelgaza, y se diagnostica por exclusión, como el intestino irritable.',
      'La orgánica da deposiciones nocturnas y pérdida de peso, y como la mayoría se debe a malabsorción, aparecen anemia e hipoalbuminemia.',
    ],
    refs: [M5('23:04'), M5('25:04'), M5('25:44')],
  },

  /* ──────── Cómo se estudia ──────── */
  {
    id: 't-anamnesis',
    sec: 'estudio',
    titulo: 'Anamnesis de la diarrea',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          '¿Aumentó la **frecuencia** o el **volumen**? ¿Tiene moco, pus, sangre, alimentos?',
          'Color, consistencia, forma; **qué comió**.',
          '¿De **mañana** (funcional) o de **noche** (orgánica)?',
          '¿Vomitó? Pensá en **toxinas** como la del S. aureus.',
          'Viajes, familiares con lo mismo, **antibióticos**, agua.',
        ],
      },
    ],
    voz: [
      'En la anamnesis, preguntá si aumentó la frecuencia o el volumen, y si trae moco, pus, sangre o restos de alimentos.',
      'El color, la consistencia, y qué estuvo comiendo.',
      'Si aparece por la mañana, suele ser funcional; si aparece de noche, orgánica.',
      'Si además vomita, pensá en una toxina, como la del estafilococo.',
      'Y los antecedentes: viajes, familiares con el mismo cuadro, antibióticos, el agua que toma.',
    ],
    refs: [M5('22:24'), M5('23:04'), M5('23:44')],
  },
  {
    id: 't-cuando-estudiar',
    sec: 'estudio',
    titulo: 'La aguda: cuándo estudiarla',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Diarrea aguda',
          d: 'autolimitada: 3 a 7 días',
          tono: 'sky',
          hijos: [
            { t: 'Sin alarma', d: 'no se estudia · hidratación oral y dieta', tono: 'mint' },
            { t: 'Sangre, fiebre, dolor intenso, deshidratación o más de 1 semana', d: 'laboratorio · materia fecal · coprocultivo', tono: 'red', examen: true },
          ],
        },
      },
      { t: 'texto', en: 1, text: 'La **endoscopia** casi nunca: solo si no hay diagnóstico después de dos semanas.' },
    ],
    voz: [
      'La diarrea aguda es autolimitada: dura de tres a siete días, y en general no se estudia. Se indica hidratación oral y una dieta astringente. Pero si tiene sangre, fiebre, dolor muy intenso, deshidratación, o dura más de una semana, sí: laboratorio, una muestra de materia fecal para buscar leucocitos y hematíes, y coprocultivo.',
      'La endoscopia casi nunca se pide, salvo que después de dos semanas no haya diagnóstico.',
    ],
    refs: [M5('23:44'), M5('24:24'), M5('26:26')],
  },
  {
    id: 't-examen-diarrea',
    sec: 'estudio',
    titulo: 'Examen y laboratorio',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Aguda', tono: 'sky', text: 'Buscar **deshidratación**: estado mental, hipotensión, taquicardia; dolor abdominal.' },
      { t: 'def', term: 'Crónica', tono: 'rose', en: 1, text: 'Signos de **malabsorción**: anemia, déficit de vitaminas, ácido fólico y hierro.' },
      { t: 'texto', en: 2, text: 'Laboratorio: hemograma, ionograma, hepatograma, **hormonas tiroideas**, coprocultivo; grasas en heces.' },
    ],
    voz: [
      'En el examen físico de la aguda, lo que más importa es la deshidratación: el estado mental, la presión y la frecuencia cardíaca.',
      'En la crónica, buscá los signos de malabsorción: anemia y déficit de vitaminas, de ácido fólico y de hierro.',
      'Y el laboratorio es lo primero que se pide: hemograma, ionograma, hepatograma, hormonas tiroideas por el hipertiroidismo, y el coprocultivo.',
    ],
    refs: [M5('25:44'), M5('27:06'), M5('27:46'), M5('28:28')],
  },

  /* ──────── Constipación ──────── */
  {
    id: 't-roma',
    sec: 'constipacion',
    titulo: 'Constipación: criterios de Roma III',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          'Dos o más: **esfuerzo**, heces **duras**, evacuación **incompleta**, **bloqueo** anorrectal, maniobras manuales (en el 25 % de las deposiciones).',
          '**Menos de 3** evacuaciones por semana.',
          'Durante **3 meses en 6**: 90 días.',
          'Heces blandas raras **sin laxantes**, y **sin criterios** de intestino irritable.',
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Definición de constipación por criterios de Roma.', cita: '…esto no se tiene que olvidar, estas [son] preguntas [de] parciales.', ref: M5('29:27') },
    aclara: { text: 'La sensación de evacuación incompleta es lo que en clase se llama tenesmo. Las **maniobras manuales** completan la lista de Roma III.', origen: `Clase, min 30:29; ${ARG}, p. 658.` },
    voz: [
      'La constipación se define por los criterios de Roma, y el profesor avisa que esto no se olvida y es pregunta de parcial. Dos o más de estos: esfuerzo para evacuar, heces duras, sensación de evacuación incompleta, sensación de bloqueo, o maniobras manuales, en al menos una de cada cuatro deposiciones.',
      'O menos de tres evacuaciones por semana.',
      'Durante tres meses en seis: noventa días, aunque no sean seguidos.',
      'Las heces blandas son raras sin laxantes, y no se cumplen los criterios de intestino irritable.',
    ],
    refs: [M5('29:09'), M5('29:27'), M5('29:49'), M5('30:29'), M5('31:09'), A('658')],
  },
  {
    id: 't-clasif-constipacion',
    sec: 'constipacion',
    titulo: 'Cómo se clasifica',
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: 'Constipación crónica',
          tono: 'peach',
          hijos: [
            { t: 'Primaria o funcional', d: 'colon o piso pélvico: tránsito normal, lento, disfunción del piso pélvico', tono: 'lilac' },
            { t: 'Secundaria o extracolónica', d: 'colon sano: **dieta** (la más frecuente), fármacos, hipotiroidismo', tono: 'gold', examen: true },
            { t: 'Mecánica', d: 'rara: algo obstruye', tono: 'rose' },
          ],
        },
      },
      { t: 'texto', en: 1, soloWeb: true, text: 'La **aguda** es benigna y autolimitada: un cambio de dieta o un fármaco la resuelven.' },
    ],
    aclara: { text: 'El **intestino irritable** con constipación es un trastorno funcional emparentado: por definición de Roma, la constipación funcional se diagnostica cuando **no** se cumplen sus criterios. El **hipotiroidismo** es causa secundaria: el colon está sano.', origen: `${ARG}, p. 658; clase parte 6, min 00:44.` },
    voz: [
      'La constipación aguda es benigna y se resuelve con un cambio de dieta. La crónica se clasifica en tres. La primaria o funcional, donde el problema está en el colon o en el piso pélvico: tránsito normal, tránsito lento o disfunción del piso pélvico. La secundaria o extracolónica, donde el colon está sano y la causa está afuera: la dieta, que es la causa más frecuente del mundo, los fármacos o el hipotiroidismo. Y la mecánica, que es rara.',
      'La disfunción del piso pélvico también se llama anismo: el paciente no puede relajar los músculos del periné.',
    ],
    refs: [M5('31:49'), M5('32:30'), M5('33:10'), M5('35:11'), M5('35:53'), M6('00:44'), M6('01:25')],
  },
  {
    id: 't-alarma',
    sec: 'constipacion',
    titulo: 'La constipación que avisa',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'Constipación con **pérdida de peso**, **anemia** y **más de 50 años**: colonoscopía.' },
      { t: 'prof', en: 1, text: '«…háganle una colonoscopía, no se tenga un cáncer por ahí.»', ref: M6('02:07') },
    ],
    voz: [
      'Y ojo: la constipación puede avisar de un problema maligno. Un paciente de más de cincuenta años, constipado, que pierde peso y está anémico, lleva una colonoscopía.',
      'Como dice el profesor: no vaya a tener un cáncer por ahí.',
    ],
    refs: [M6('02:07'), M6('04:14')],
  },
  {
    id: 't-bristol',
    sec: 'constipacion',
    titulo: 'Escala de Bristol',
    fig: { f: 'bristol' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Tipos 1 y 2', tono: 'peach', text: 'Bolitas duras · salchicha con grumos: **constipación**.' },
      { t: 'def', term: 'Tipos 3 y 4', tono: 'mint', en: 1, text: 'Salchicha con grietas · lisa y blanda: **normales**.' },
      { t: 'def', term: 'Tipos 5, 6 y 7', tono: 'sky', en: 2, text: 'Trozos blandos · pastosa · líquida: **diarrea**.' },
    ],
    examen: { origen: 'ortega', texto: 'Los siete tipos de la escala de Bristol.', cita: '…una escala importantísima… que preguntan en los parciales, que se llama escala de Bristol, que son siete tipos.', ref: M6('01:43') },
    voz: [
      'Para describir la materia fecal se usa la escala de Bristol, que el profesor dice que preguntan en los parciales. Son siete tipos. El uno y el dos son de constipación.',
      'El tres y el cuatro son normales.',
      'Y del cinco al siete, diarrea.',
    ],
    refs: [M6('01:25'), M6('01:43'), M6('02:50')],
  },
  {
    id: 't-estudios-constipacion',
    sec: 'constipacion',
    titulo: 'Examen y estudios',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Estudio', 'Para qué'],
        filas: [
          ['Examen anorrectal', 'Fisuras, hemorroides, prolapso, reflejo anal'],
          ['Tacto rectal: **maniobra del descenso**', 'Puja y expulsa el dedo: buena prensa abdominal'],
          ['Colon por enema', 'Causas estructurales, cáncer'],
          ['**Colonoscopía**', 'Más de 50 años, pérdida de peso, anemia, sangre'],
          ['**Test de expulsión del balón**', 'Si no lo expulsa: disfunción del piso pélvico'],
          ['Manometría anorrectal · defecografía', 'Esfínteres; piso pélvico'],
        ],
      },
    ],
    voz: [
      'El diagnóstico es clínico. En el examen anorrectal se buscan fisuras, hemorroides o prolapso.',
      'En el tacto rectal se hace la maniobra del descenso: le pedís que puje, y debería expulsar el dedo.',
      'El colon por enema muestra causas estructurales.',
      'La colonoscopía se indica en el mayor de cincuenta años que adelgaza o está anémico.',
      'El test de expulsión del balón: se coloca un balón con agua en el recto y el paciente puja. Si no lo expulsa, el piso pélvico no se relaja.',
      'Y la manometría y la defecografía las hace el especialista.',
    ],
    refs: [M6('02:50'), M6('03:33'), M6('04:14'), M6('04:59'), M6('05:41')],
  },

  /* ──────── Anorrectal ──────── */
  {
    id: 't-dolor-anal',
    sec: 'anorrectal',
    titulo: 'El dolor anorrectal',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Trastorno', 'Cómo duele'],
        filas: [
          ['Hemorroides', 'Duelen **al** defecar'],
          ['Fisura anal', 'Duele **después** de defecar, «como un vidrio»'],
          ['Fístula', '**No duele**, salvo que se abscede'],
          ['Proctalgia fugaz, proctitis', 'Dolor e inflamación anorrectal'],
        ],
      },
    ],
    aclara: { text: 'Según el profesor, es raro que lo pregunten en los parciales, pero son consultas que vas a ver toda la vida.', origen: 'Clase, min 06:22 y 14:18.' },
    voz: [
      'Los trastornos anorrectales. La defecación no debería doler. Las hemorroides duelen en el momento de defecar.',
      'La fisura anal duele después, y el paciente lo describe como si le pasaran un vidrio.',
      'La fístula, en cambio, no duele, salvo que se forme un absceso.',
      'También están la proctalgia fugaz y la proctitis.',
    ],
    refs: [M6('06:22'), M6('07:05')],
  },
  {
    id: 't-fournier',
    sec: 'anorrectal',
    titulo: 'Gangrena de Fournier',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'Infección **necrotizante** del periné: dolor, ampollas, pus, piel que se decolora.' },
      { t: 'texto', en: 1, text: 'Típica del **diabético** o inmunodeprimido. Es una **emergencia** con alta mortalidad.' },
    ],
    voz: [
      'Una emergencia: la gangrena de Fournier, una infección necrotizante del periné, con dolor, ampollas, pus y una piel que se decolora.',
      'Aparece sobre todo en diabéticos e inmunodeprimidos, y tiene alta mortalidad.',
    ],
    refs: [M6('07:49')],
  },
  {
    id: 't-sangrado',
    sec: 'anorrectal',
    titulo: 'El sangrado: gotas o bañada',
    fig: { f: 'defecacion', modo: 'hemorroides' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Gotas al final', tono: 'rose', text: 'Sangre **roja brillante** que cae después de defecar: **hemorroides internas** o **fisura**.' },
      { t: 'def', term: 'Heces bañadas en sangre', tono: 'red', en: 1, text: 'Oscura o fresca: origen **colónico**. Colonoscopía, más si tiene más de 40 o 50 años.' },
    ],
    aclara: { text: 'Las hemorroides también pueden sangrar mucho: el profesor cuenta un paciente que llegó a la guardia hipotenso y taquicárdico y hubo que internarlo.', origen: 'Clase, min 10:45.' },
    voz: [
      'El sangrado tiene una regla simple. Si el paciente termina de defecar y caen gotas de sangre roja brillante, pensá en hemorroides internas o en una fisura.',
      'Si la materia fecal sale bañada en sangre, oscura o fresca, el origen es el colon, y hay que hacer una colonoscopía, sobre todo si tiene más de cuarenta o cincuenta años.',
    ],
    refs: [M6('08:36'), M6('09:17'), M6('10:01'), M6('10:45')],
  },
  {
    id: 't-otros',
    sec: 'anorrectal',
    titulo: 'Otros signos anorrectales',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Signo', 'Pensar en'],
        filas: [
          ['Secreción de moco o pus', 'Abscesos y fístulas; enfermedad de **Crohn**'],
          ['Masa anorrectal', 'Condiloma, cáncer, hemorroide, prolapso, absceso'],
          ['**Prurito**', 'La 2.ª manifestación anorrectal más común'],
          ['Bolo fecal', 'Materia fecal seca y dura que no se puede eliminar'],
          ['Incontinencia fecal', 'Pérdida involuntaria: falla esfinteriana'],
        ],
      },
    ],
    voz: [
      'Otros signos. La secreción de moco o pus aparece en abscesos y fístulas, sobre todo en la enfermedad de Crohn.',
      'Una masa puede ser un condiloma, un cáncer, una hemorroide, un prolapso o un absceso.',
      'El prurito es la segunda manifestación anorrectal más común.',
      'El bolo fecal es la materia fecal seca y dura que no se puede eliminar.',
      'Y la incontinencia, todo lo contrario: la pérdida involuntaria por una falla de los esfínteres.',
    ],
    refs: [M6('11:26'), M6('12:11'), M6('12:52')],
  },
  {
    id: 't-pujo-tenesmo',
    sec: 'anorrectal',
    titulo: 'Pujo y tenesmo',
    fig: { f: 'defecacion', modo: 'tenesmo' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Pujo', tono: 'rose', text: '**Dolor abdominal** con deseo de evacuar, **sin lograrlo**.' },
      { t: 'def', term: 'Tenesmo', tono: 'lilac', en: 1, text: '**Ya evacuó** y sigue sintiendo **necesidad** de evacuar: el recto «todavía ocupado».' },
      { t: 'clave', en: 2, text: 'Aparecen en las **diarreas disentéricas**.' },
    ],
    examen: { origen: 'ortega', texto: 'Qué es el pujo y qué es el tenesmo.', cita: '…eso es pregunta de parcial y eso aparece en las diarreas disentéricas.', ref: M6('12:52') },
    voz: [
      'Y esto es pregunta de parcial. El pujo es el dolor abdominal con deseo de evacuar, sin poder hacerlo.',
      'El tenesmo es cuando el paciente ya evacuó, y sigue sintiendo la necesidad de evacuar, como si el recto estuviera todavía ocupado.',
      'Los dos aparecen en las diarreas disentéricas.',
    ],
    refs: [M6('12:11'), M6('12:18'), M6('12:52')],
  },
  {
    id: 't-guante',
    sec: 'anorrectal',
    titulo: 'Diagnóstico: inspección, tacto y guante',
    amplio: true,
    bloques: [
      {
        t: 'lista',
        items: [
          'Interrogar dolor, prurito, pujo y tenesmo.',
          '**Inspección**: úlceras, verrugas, fisuras, masas, hemorroides.',
          '**Tacto rectal**: no en neutropénicos.',
          '**Signo del guante**: guante blanco; al retirar el dedo, rojo = sangre, **negro = melena**, amarillento = pus.',
          'Anoscopía.',
        ],
      },
    ],
    examen: { origen: 'preguntero', texto: '¿Cómo se realiza la prueba del guante?' },
    voz: [
      'Para el diagnóstico, se interroga el dolor, el prurito, el pujo y el tenesmo.',
      'En la inspección se buscan úlceras, verrugas, fisuras, masas o hemorroides.',
      'El tacto rectal es fundamental, pero no se hace en pacientes neutropénicos.',
      'Y el signo del guante: se hace el tacto con un guante blanco, y al retirar el dedo se mira el color. Rojo es sangre, negro es melena, amarillento es pus.',
      'Y la anoscopía completa el estudio. Con esto, tenés el capítulo. Ahora a practicar.',
    ],
    refs: [M6('13:35'), M6('14:58'), M6('15:42')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'diarrea', label: 'Diarrea' },
    { id: 'estudio', label: 'Cómo se estudia' },
    { id: 'constipacion', label: 'Constipación' },
    { id: 'anorrectal', label: 'Anorrectal' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS (simulacro) ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Niño de 5 años',
    texto: 'Desde hace tres días tiene diarrea con sangre y moco, muchas veces por día y en poca cantidad, con fiebre, pujo y tenesmo. Hoy orina muy poco y está pálido.',
    pregunta: '¿Qué complicación sospechás?',
    opciones: [
      { text: 'Síndrome urémico hemolítico por verotoxina.', why: 'Diarrea disentérica (Shigella o E. coli O157) seguida de oliguria y palidez.' },
      { text: 'Deshidratación por diarrea acuosa.', why: 'La diarrea es disentérica, y la palidez no la explica.' },
      { text: 'Intolerancia a la lactosa.', why: 'Es osmótica y no da sangre.' },
      { text: 'Diarrea del viajero.', why: 'Es acuosa y autolimitada.' },
    ],
    correcta: 0,
    razonamiento: 'Diarrea baja con sangre: siempre bacteriana. La verotoxina pasa a la sangre y puede dar insuficiencia renal aguda.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Mujer de 28 años',
    texto: 'Hace meses tiene diarrea acuosa y distensión después de tomar leche o comer helado. Cuando deja los lácteos, mejora.',
    pregunta: '¿Qué mecanismo explica su diarrea?',
    opciones: [
      { text: 'Osmótico.', why: 'La lactosa no absorbida retiene agua en la luz; cede al suspenderla.' },
      { text: 'Secretor.', why: 'Persistiría en ayunas.' },
      { text: 'Inflamatorio.', why: 'Daría sangre, fiebre y dolor.' },
      { text: 'Malabsortivo por celíaca.', why: 'Daría esteatorrea y pérdida de peso.' },
    ],
    correcta: 0,
    razonamiento: 'Déficit de lactasa: diarrea osmótica, que cede con el ayuno o al retirar el alimento.',
  },
  {
    id: 'c3',
    origen: 'clase',
    titulo: 'Paciente con hemorroides en la guardia',
    texto: 'Consulta porque después de evacuar no paraba de sangrar: sangre roja que gotea al final de la defecación. Está hipotenso y taquicárdico.',
    pregunta: '¿De dónde viene la sangre?',
    opciones: [
      { text: 'Del canal anal: hemorroides internas.', why: 'Las gotas de sangre roja al final de la defecación orientan a hemorroides o fisura.' },
      { text: 'Del colon derecho.', why: 'La sangre del colon se mezcla con las heces: salen bañadas en sangre.' },
      { text: 'Del estómago.', why: 'Daría melena.' },
      { text: 'De una fístula perianal.', why: 'Las fístulas supuran moco o pus.' },
    ],
    correcta: 0,
    razonamiento: 'Gotas al final: canal anal. Y aunque sean hemorroides, pueden sangrar tanto como para descompensar al paciente, como en el caso que cuenta el profesor.',
    refs: [M6('10:45')],
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Hombre de 62 años',
    texto: 'Desde hace cuatro meses está constipado; antes evacuaba todos los días. Perdió 6 kg y tiene hemoglobina de 9.',
    pregunta: '¿Qué estudio pedís?',
    opciones: [
      { text: 'Colonoscopía.', why: 'Constipación con pérdida de peso, anemia y más de 50 años: descartar cáncer de colon.' },
      { text: 'Test de expulsión del balón.', why: 'Evalúa el piso pélvico; acá hay signos de alarma.' },
      { text: 'Solo dieta con fibra.', why: 'Con signos de alarma no se puede esperar.' },
      { text: 'Escala de Bristol.', why: 'Describe la materia fecal, pero no descarta un cáncer.' },
    ],
    correcta: 0,
    razonamiento: 'La constipación también puede avisar de un problema maligno.',
  },
  {
    id: 'c5',
    origen: 'practica',
    titulo: 'Mujer de 35 años',
    texto: 'Constipación crónica: siente que la materia fecal queda trabada y a veces necesita ayudarse con los dedos. En el test de expulsión del balón no logra expulsarlo.',
    pregunta: '¿Qué tipo de constipación es?',
    opciones: [
      { text: 'Primaria por disfunción del piso pélvico (anismo).', why: 'Al pujar, el puborrectal no se relaja.' },
      { text: 'Secundaria por hipotiroidismo.', why: 'El colon y el piso pélvico estarían sanos.' },
      { text: 'Mecánica por un tumor.', why: 'Nada sugiere una obstrucción.' },
      { text: 'Aguda por cambio de dieta.', why: 'Es crónica.' },
    ],
    correcta: 0,
    razonamiento: 'El test del balón evalúa el piso pélvico: si no lo expulsa, el piso pélvico no se relaja.',
  },
  {
    id: 'c6',
    origen: 'practica',
    titulo: 'Varios invitados de una fiesta',
    texto: 'Dos a cuatro horas después de comer ensalada con mayonesa casera, varios invitados empiezan con vómitos y diarrea.',
    pregunta: '¿Qué toxina sospechás?',
    opciones: [
      { text: 'Neurotoxina del Staphylococcus aureus.', why: 'Toxina preformada: síntomas en pocas horas, con vómitos.' },
      { text: 'Verotoxina de Shigella.', why: 'Daría diarrea disentérica, no un cuadro tan rápido con vómitos.' },
      { text: 'Enterotoxina del cólera.', why: 'Se asocia al agua y a viajes, con diarrea acuosa profusa.' },
      { text: 'Citotoxina de Clostridium difficile.', why: 'Aparece después de antibióticos.' },
    ],
    correcta: 0,
    razonamiento: 'Cuando además hay vómitos, pensá en toxinas como la del estafilococo dorado.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'dia',
        label: 'Diarrea',
        tone: 'sky',
        nota: 'Menos consistencia, más frecuencia y volumen',
        hijos: [
          {
            id: 'ag',
            label: 'Aguda',
            n: '< 2 sem',
            tone: 'sky',
            nota: 'Intoxicación alimentaria, infecciones, fármacos',
            hijos: [
              { id: 'acu', label: 'Acuosa (alta)', tone: 'sky', examen: true, nota: 'Delgado · volumen · enterotoxinas' },
              { id: 'dis', label: 'Disentérica (baja)', tone: 'rose', examen: true, nota: 'Colon · frecuencia · Shigella, E. coli O157 → SUH' },
            ],
          },
          { id: 'per', label: 'Persistente', n: '2–4 sem', tone: 'lilac', nota: 'Posgastroenterítica · parásitos' },
          { id: 'cro', label: 'Crónica', n: '> 4 sem', tone: 'rose', examen: true, nota: 'Osmótica · secretora · inflamatoria · **malabsortiva** · motora' },
        ],
      },
      {
        id: 'con',
        label: 'Constipación',
        tone: 'peach',
        nota: 'Criterios de Roma III: 2 o más, 3 meses en 6',
        hijos: [
          { id: 'pri', label: 'Primaria', tone: 'lilac', nota: 'Colon o piso pélvico: tránsito normal, lento, anismo' },
          { id: 'sec', label: 'Secundaria', tone: 'gold', nota: 'Colon sano: dieta (la más frecuente), fármacos, hipotiroidismo' },
          { id: 'bri', label: 'Bristol', tone: 'peach', examen: true, nota: '1–2 constipación · 3–4 normal · 5–7 diarrea' },
        ],
      },
      {
        id: 'ano',
        label: 'Anorrectal',
        tone: 'rose',
        nota: 'Dolor, sangrado, secreción, prurito',
        hijos: [
          { id: 'pt', label: 'Pujo y tenesmo', tone: 'rose', examen: true, nota: 'Recto inflamado · diarrea disentérica' },
          { id: 'san', label: 'Sangrado', tone: 'red', nota: 'Gotas al final: hemorroides, fisura · bañada: colon' },
          { id: 'dol', label: 'Dolor', tone: 'lilac', nota: 'Hemorroides: al defecar · fisura: después · fístula: no duele' },
        ],
      },
    ],
    nexos: ['**Constipación + pérdida de peso + anemia + más de 50 años:** colonoscopía.', '**Diarrea nocturna** con pérdida de peso: orgánica.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig03-d01', 'dig03-d04', 'dig03-d05'],
  anclas: {
    ubicate: { tab: 'mapa' },
    definicion: { tab: 'teoria', seccion: 'diarrea' },
    'alta-baja': { tab: 'teoria', seccion: 'diarrea' },
    toxinas: { tab: 'teoria', seccion: 'diarrea' },
    cronica: { tab: 'teoria', seccion: 'diarrea' },
    constipacion: { tab: 'teoria', seccion: 'constipacion' },
    bristol: { tab: 'teoria', seccion: 'constipacion' },
    anorrectal: { tab: 'teoria', seccion: 'anorrectal' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
