import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * neu-01: clase visual de los motivos de consulta neurológicos I.
 *  1. Clases de Ortega: «MC Neurología parte 1» (00:02–31:37) y «parte 2» (00:00–35:29).
 * Ver content/traceability/neu-01.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M1 = (t: string) => r('mc-neu-1', t);
const M2 = (t: string) => r('mc-neu-2', t);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-via',
    sec: 'cefalea',
    titulo: 'Por dónde viaja el dolor de cabeza',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'encefalo',
      vistas: [
        { luz: ['gasser'], vias: ['trigemino'], tone: 'gold', nota: '1.ª neurona: ganglio de Gasser', notaTone: 'gold' },
        { luz: ['gasser', 'protuberancia'], vias: ['trigemino'], tone: 'gold', nota: '2.ª neurona: protuberancia', notaTone: 'gold' },
        { luz: ['gasser', 'protuberancia', 'talamo', 'parietal'], vias: ['trigemino'], tone: 'gold', nota: '3.ª neurona: tálamo → corteza', notaTone: 'gold' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un estímulo irrita los **vasos**, las **meninges** o los **músculos** de la cabeza: se liberan **sustancia P**, **CGRP** y **neuroquinina A**.' },
          { k: 'mecanismo', text: 'Las tres ramas del **trigémino** llevan el estímulo al **ganglio de Gasser** y de ahí a la **protuberancia**.' },
          { k: 'signo', text: 'El **tálamo** lo recibe y la **corteza** lo interpreta como dolor.' },
        ],
      },
    ],
    voz: [
      'Empecemos por el dolor. Cuando algo irrita los vasos, las meninges o los músculos de la cabeza, las terminaciones nerviosas liberan neurotransmisores: la sustancia P, el péptido relacionado con el gen de la calcitonina, y la neuroquinina A.',
      'Ese estímulo viaja por las tres ramas del quinto par, el trigémino: la oftálmica, la maxilar superior y la maxilar inferior. Las tres se juntan en el ganglio de Gasser, la primera neurona, y de ahí pasan a la protuberancia, la segunda.',
      'La tercera neurona está en el tálamo, que manda el estímulo a la corteza: ahí se interpreta como dolor, sea pulsátil, opresivo o lancinante.',
    ],
    refs: [M1('15:56'), M1('16:37'), M1('17:17'), M1('17:58'), M1('19:18')],
  },
  {
    id: 'f-talamo',
    sec: 'cefalea',
    titulo: 'El tálamo: la estación de todas las sensaciones',
    fig: {
      f: 'encefalo',
      vistas: [
        { luz: ['talamo', 'medula'], vias: ['sensitiva'], tone: 'sky', nota: 'Vías sensitivas de la médula → tálamo', notaTone: 'sky' },
        { luz: ['talamo', 'ojo', 'occipital'], vias: ['vision'], tone: 'sky', nota: 'La vista también hace escala en el tálamo', notaTone: 'sky' },
        { luz: ['olfatorio', 'temporal'], etiquetas: ['talamo'], vias: ['olfato'], tone: 'mint', nota: 'El olfato llega a la corteza sin pasar por el tálamo', notaTone: 'mint' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Sensitivas', tono: 'sky', text: 'Las **espinotalámicas**, los **cordones posteriores** (Goll y Burdach) y el **trigémino** llegan al tálamo.' },
      { t: 'def', term: 'Sensoriales', tono: 'sky', en: 1, text: 'También la **vista**, la **audición** y el **gusto**.' },
      { t: 'def', term: 'La excepción', tono: 'mint', en: 2, text: '**El olfato**: va a la corteza sin escala en el tálamo.' },
    ],
    voz: [
      'El tálamo es la gran estación sensitiva. Le llegan las vías espinotalámicas, la del dolor y la temperatura, los cordones posteriores de Goll y Burdach, con la sensibilidad profunda, y el trigémino.',
      'Y también las sensoriales: la vista, la audición y el gusto. El tálamo reconoce qué tipo de estímulo es y lo manda a su área de la corteza.',
      'Hay una sola excepción: el olfato. La vía olfatoria llega a la corteza sin hacer escala en el tálamo.',
    ],
    refs: [M1('17:58'), M1('18:38'), M1('20:40'), M1('21:21')],
  },
  {
    id: 'f-migrana',
    sec: 'primarias',
    titulo: 'Migraña: del aura al dolor',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'cabeza', vistas: ['normal', 'aura', 'hemicraneal'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Una **descarga** en ciertas regiones del cerebro libera **serotonina** e **histamina**.' },
          { k: 'mecanismo', text: 'La despolarización que avanza por la corteza da el **aura** (escotomas, destellos, parestesias).' },
          { k: 'signo', text: 'El **sistema trigeminovascular** libera vasodilatadores: los vasos se dilatan y aparece el **dolor pulsátil hemicraneal**.' },
        ],
      },
    ],
    aclara: { text: 'Es una hipótesis: la causa de la migraña no está demostrada con certeza.', origen: 'Lo aclara la clase.' },
    voz: [
      'La migraña. Su causa no está demostrada; la teoría más aceptada empieza con una descarga en ciertas regiones del sistema nervioso, que libera neurotransmisores como la serotonina y la histamina.',
      'Esa despolarización eléctrica, que avanza por la corteza, explica el aura: el paciente ve destellos o manchas, o siente hormigueos, minutos antes del dolor.',
      'Después se activa el sistema trigeminovascular: el trigémino libera sustancias vasodilatadoras, los vasos del cerebro se dilatan, y aparece el dolor, pulsátil y de media cabeza.',
    ],
    refs: [M1('29:33'), M1('30:15'), M1('30:56'), M1('31:37')],
  },
  {
    id: 'f-cluster',
    sec: 'primarias',
    titulo: 'Cefalea en racimos: un ojo que se llena de parasimpático',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'encefalo',
      vistas: [
        { luz: ['hipotalamo'], tone: 'red', nota: 'Se activa el hipotálamo posterior', notaTone: 'red' },
        { luz: ['hipotalamo', 'gasser', 'ojo'], vias: ['hipotalamo'], tone: 'red', nota: 'Trigémino y descarga parasimpática', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se activa el **hipotálamo posterior**, que estimula el sistema trigeminal.' },
          { k: 'mecanismo', text: '**Descarga parasimpática** con hipofunción simpática: **vasodilatación** alrededor del ojo.' },
          { k: 'signo', text: 'Dolor **periorbitario unilateral**, ojo rojo, **lagrimeo**, congestión nasal, **ptosis** y **miosis**.' },
        ],
      },
    ],
    voz: [
      'La cefalea en racimos, o de Horton, tiene otro mecanismo. Se activa el hipotálamo posterior, que estimula el sistema trigeminal.',
      'Eso provoca una descarga parasimpática, con el simpático disminuido: los vasos alrededor del ojo se dilatan y las glándulas secretan de más.',
      'Por eso el dolor es de un solo lado, alrededor del ojo, y viene con el ojo rojo, lagrimeo, congestión nasal y rinorrea, el párpado caído y la pupila chica.',
    ],
    refs: [M2('09:00'), M2('09:40'), M2('11:00'), M2('11:42'), M2('12:24')],
  },
  {
    id: 'f-equilibrio',
    sec: 'vertigo',
    titulo: 'Qué nos mantiene en equilibrio',
    fig: {
      f: 'encefalo',
      vistas: [
        { luz: ['ojo'], vias: ['vision'], tone: 'sky', nota: 'La vista', notaTone: 'sky' },
        { luz: ['ojo', 'laberinto'], vias: ['vision', 'vestibular'], tone: 'sky', nota: 'El vestíbulo (oído interno)', notaTone: 'sky' },
        { luz: ['ojo', 'laberinto', 'medula'], vias: ['vision', 'vestibular', 'sensitiva'], tone: 'sky', nota: 'La sensibilidad profunda (cordones posteriores)', notaTone: 'sky' },
        { luz: ['ojo', 'laberinto', 'medula', 'cerebelo', 'parietal'], vias: ['vision', 'vestibular', 'sensitiva', 'cerebelo'], tone: 'sky', nota: 'El cerebelo, y todo se integra en la corteza', notaTone: 'sky' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'La vista', tono: 'sky', text: 'Dónde estoy respecto del camino.' },
      { t: 'def', term: 'El vestíbulo', tono: 'sky', en: 1, text: 'En el oído interno: la posición y el giro de la cabeza.' },
      { t: 'def', term: 'Sensibilidad profunda', tono: 'lilac', en: 2, text: 'Por los cordones posteriores de **Goll y Burdach**.' },
      { t: 'def', term: 'El cerebelo', tono: 'peach', en: 3, text: 'Coordina; y todo se comunica con la **corteza cerebral**.' },
    ],
    voz: [
      'Para entender el vértigo hay que saber qué mantiene el equilibrio. Primero, la vista: para mantener el equilibrio hay que poder ver dónde estamos respecto del camino.',
      'Segundo, el vestíbulo, en el oído interno, que informa la posición y los giros de la cabeza.',
      'Tercero, la sensibilidad profunda, que sube por los cordones posteriores de Goll y Burdach y nos dice dónde están las articulaciones sin mirarlas.',
      'Y cuarto, el cerebelo, que coordina. Todos se comunican con la corteza cerebral, que mantiene constante el equilibrio del cuerpo.',
    ],
    refs: [M2('21:16'), M2('21:57'), M2('22:39')],
  },
  {
    id: 'f-romberg',
    sec: 'vertigo',
    titulo: 'Por qué el Romberg separa al cerebeloso',
    fig: {
      f: 'encefalo',
      vistas: [
        { lesion: ['laberinto'], etiquetas: ['ojo'], tone: 'sky', nota: 'Vestibular: la vista compensaba', notaTone: 'red' },
        { lesion: ['medula'], etiquetas: ['ojo'], tone: 'sky', nota: 'Cordonal posterior: la vista compensaba', notaTone: 'red' },
        { lesion: ['cerebelo'], tone: 'sky', nota: 'Cerebeloso: inestable aun con los ojos abiertos', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Vestibular', tono: 'sky', text: 'Falla el vestíbulo; **la vista compensa**. Al cerrar los ojos, cae: **Romberg positivo**.' },
      { t: 'def', term: 'Cordonal posterior', tono: 'lilac', en: 1, text: 'Falla la sensibilidad profunda; también la compensa la vista: **Romberg positivo**.' },
      { t: 'def', term: 'Cerebeloso', tono: 'peach', en: 2, text: 'Ya es inestable con los ojos abiertos; cerrarlos no lo empeora: **Romberg negativo**.' },
    ],
    aclara: { text: 'El porqué (la vista compensa al vestíbulo o a la sensibilidad profunda, pero no al cerebelo) es fisiología general; el resultado de cada uno lo da la clase.', origen: GRAL },
    voz: [
      'El Romberg: paciente de pie, con los pies juntos, y le pedimos que cierre los ojos. Si falla el vestíbulo, mientras tiene los ojos abiertos la vista compensa; al cerrarlos pierde esa ayuda y cae. Romberg positivo.',
      'Lo mismo en la lesión de los cordones posteriores: sin sensibilidad profunda, solo la vista le dice dónde están sus pies. Al cerrar los ojos, cae. También positivo.',
      'En el cerebeloso, en cambio, la inestabilidad ya está con los ojos abiertos: el que coordina es el cerebelo, y la vista no lo reemplaza. Cerrar los ojos no lo empeora: el Romberg es negativo.',
    ],
    refs: [M2('29:26'), M2('30:06')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'cefalea', label: 'La vía del dolor' },
    { id: 'primarias', label: 'Migraña y racimos' },
    { id: 'vertigo', label: 'El equilibrio' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-deterioro',
    sec: 'mc',
    titulo: 'Deterioro cognitivo',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'La **demencia**: deterioro de la **memoria** y de otras funciones cognitivas (afasia, apraxia, agnosia, funciones ejecutivas).' },
      { t: 'def', term: 'Causa más frecuente', tono: 'gold', en: 1, text: '**Alzheimer**: degenerativo, senil e irreversible.' },
      { t: 'def', term: 'Primarias', tono: 'lilac', en: 1, text: 'Degenerativas (corticales o subcorticales): causa desconocida.' },
      { t: 'def', term: 'Secundarias', tono: 'sky', en: 1, text: 'Causa conocida: vascular, tóxico-metabólica, infecciosa, traumática, psiquiátrica. Pueden ser **reversibles**.' },
      { t: 'texto', en: 2, text: 'Diagnóstico por **anamnesis**, muchas veces **indirecta** (un familiar), examen físico **completo** e imágenes (atrofia frontotemporal en el Alzheimer).' },
    ],
    voz: [
      'El primer motivo de consulta es el deterioro cognitivo. El profesor aclara que, salvo lo fundamental, no se pregunta en el parcial. La demencia es el deterioro de la memoria y de otras funciones cognitivas: el lenguaje, las praxias, el reconocimiento, las funciones ejecutivas.',
      'La causa más frecuente es el Alzheimer, una enfermedad degenerativa, senil e irreversible. Las demencias primarias son las degenerativas, corticales o subcorticales, de causa desconocida; las secundarias tienen causa conocida, vascular, tóxico-metabólica, infecciosa o traumática, y pueden revertir.',
      'El diagnóstico es por anamnesis, muchas veces con un familiar porque el paciente olvida, un examen físico completo y las imágenes, que en el Alzheimer muestran atrofia frontotemporal.',
    ],
    refs: [M1('01:27'), M1('02:09'), M1('03:34'), M1('04:16'), M1('04:58'), M1('05:40'), M1('08:24')],
  },
  {
    id: 't-hakim',
    sec: 'mc',
    titulo: 'Tríada de Hakim-Adams',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'lilac', text: '**Demencia** + **incontinencia** de esfínteres + **trastorno de la marcha**.' },
      { t: 'texto', en: 1, text: 'Orienta a una **hidrocefalia normotensiva**: sobra líquido cefalorraquídeo, pero la presión intracraneal es **normal**.' },
    ],
    voz: [
      'Una tríada que les va a servir: demencia, incontinencia de esfínteres y trastorno de la marcha. Es la tríada de Hakim-Adams.',
      'Orienta a una hidrocefalia normotensiva: hay un exceso de líquido cefalorraquídeo, pero la presión dentro del cráneo es normal.',
    ],
    refs: [M1('06:22'), M1('07:03')],
  },
  {
    id: 't-conciencia',
    sec: 'mc',
    titulo: 'Pérdida del conocimiento',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Repasar el **estado de conciencia** del primer parcial.' },
      {
        t: 'comparar',
        cols: [
          { titulo: 'Nivel', tono: 'sky', items: ['Vigil → obnubilado → estupor → coma', 'Escala de **Glasgow**'] },
          { titulo: 'Contenido', tono: 'lilac', items: ['Orientación en **tiempo, espacio y persona**', 'Lo psíquico'] },
        ],
        en: 1,
      },
      { t: 'def', term: 'Brusca', tono: 'red', en: 2, text: '**Síncope**.' },
      { t: 'def', term: 'Progresiva', tono: 'peach', en: 2, text: 'Confusión → somnolencia → obnubilación → estupor → coma (por ejemplo, la **hipoglucemia**: sin glucosa la neurona no tiene energía).' },
    ],
    examen: { origen: 'ortega', texto: 'El síncope.', cita: 'El síncope lo tienen que conocer… pregunta de parcial… Síncope pregunta muchísimo.', ref: M1('12:08') },
    voz: [
      'Pérdida del conocimiento es pérdida del estado de conciencia, y hay que repasar lo del primer parcial. El nivel de conciencia dice si el paciente está vigil, obnubilado, estuporoso o en coma, y se mide con la escala de Glasgow. El contenido es lo psíquico: si está orientado en tiempo, espacio y persona.',
      'La pérdida puede ser brusca, y eso es el síncope, que se pregunta muchísimo: hay que repasarlo de cardiología. O progresiva: confusión, somnolencia, obnubilación, estupor y coma. Un ejemplo es la hipoglucemia: sin glucosa la neurona no tiene energía, y el paciente se vuelve lento, se apaga.',
    ],
    refs: [M1('09:47'), M1('10:29'), M1('11:11'), M1('11:52'), M1('12:32'), M1('13:13')],
  },
  {
    id: 't-cefalea',
    sec: 'cefalea',
    titulo: 'Cefalea',
    fig: { f: 'encefalo', vistas: [{ luz: ['gasser', 'protuberancia', 'talamo', 'parietal'], vias: ['trigemino'], tone: 'gold' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'El **motivo de consulta neurológico más frecuente**: dolor o molestia en cualquier parte de la cabeza.' },
      { t: 'lista', en: 1, items: ['Duele lo que rodea al cerebro: **vasos, músculos, cuero cabelludo, pares craneales**.', 'Vía aferente: el **trigémino** → **Gasser** → **protuberancia** → **tálamo** → corteza.', 'Neurotransmisores: **sustancia P**, **CGRP**, **neuroquinina A**.'] },
    ],
    voz: [
      'La cefalea es el motivo de consulta neurológico más frecuente: un dolor o una molestia en cualquier parte de la cabeza.',
      'Duele lo que rodea al cerebro: los vasos, los músculos, el cuero cabelludo y los pares craneales. La vía es la del trigémino: ganglio de Gasser, protuberancia, tálamo y corteza. Y los neurotransmisores son la sustancia P, el péptido relacionado con el gen de la calcitonina y la neuroquinina A.',
    ],
    refs: [M1('13:54'), M1('14:34'), M1('15:56'), M1('16:37'), M1('17:17')],
  },
  {
    id: 't-talamo',
    sec: 'cefalea',
    titulo: 'El tálamo tiene muchas funciones',
    fig: { f: 'encefalo', vistas: [{ luz: ['talamo'], etiquetas: ['olfatorio'], vias: ['sensitiva', 'vision'], tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Núcleo sensitivo donde hacen escala **todas las vías sensitivas y sensoriales, menos la olfatoria**.' },
      { t: 'lista', en: 1, items: ['Espinotalámicas anterior y lateral; cordones posteriores (Goll y Burdach); trigémino.', 'Vía óptica, auditiva y gustativa.', 'Además: **movimiento**, **sueño-vigilia** y **vida emocional**.'] },
    ],
    examen: { origen: 'ortega', texto: 'Las funciones del tálamo y la vía que no hace escala en él.', cita: 'El tálamo tiene muchas funciones, y esto fue la pregunta de parcial de algunos doctores.', ref: M1('20:18') },
    voz: [
      'Lo que sí hay que saber, porque fue pregunta de parcial: el tálamo tiene muchas funciones. Es el núcleo donde hacen escala todas las vías sensitivas y sensoriales antes de llegar a la corteza, menos la olfatoria.',
      'Le llegan las espinotalámicas, los cordones posteriores, el trigémino, y las vías óptica, auditiva y gustativa. Y además participa del movimiento, del ciclo de sueño y vigilia, y de la vida emocional.',
    ],
    refs: [M1('19:59'), M1('20:40'), M1('21:21')],
  },
  {
    id: 't-clasif',
    sec: 'cefalea',
    titulo: 'Primarias y secundarias',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Primarias ★', tono: 'red', items: ['**No** se conoce la causa', '**Migraña** y **tensional**: las más frecuentes', 'Racimos (Horton)'] },
          { titulo: 'Secundarias', tono: 'sky', items: ['**Se conoce** la causa', 'La que hay que conocer: la **neuralgia del trigémino**'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las cefaleas primarias.', cita: 'Las cefaleas primarias son las cefaleas que deben conocer para el parcial… porque le van a preguntar eso en el parcial.', ref: M1('22:39') },
    aclara: { text: 'En la clasificación internacional, la neuralgia del trigémino figura entre las neuralgias craneales; se estudia aparte de las primarias porque tiene una causa identificable.', origen: 'Precisión de la clasificación, no se da en la clase.' },
    voz: [
      'La clasificación es grande, pero lo que se pregunta en el parcial son las cefaleas primarias. Primarias son las que no tienen una causa conocida; secundarias, las que sí.',
      'Entre las primarias, las más frecuentes en la guardia son dos: la migraña y la cefalea tensional; y además está la cefalea en racimos. Fuera de las primarias, la que el profesor quiere que conozcan es la neuralgia del trigémino.',
    ],
    refs: [M1('22:01'), M1('22:42'), M1('23:23')],
  },
  {
    id: 't-migrana',
    sec: 'primarias',
    titulo: 'Migraña',
    fig: { f: 'cabeza', vistas: ['hemicraneal'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: '**Hemicraneal**, **pulsátil**, **moderada a severa**; empeora con la actividad.' },
      { t: 'lista', en: 1, items: ['Con **náuseas o vómitos**, o **fotofobia y sonofobia**.', 'Dura hasta **2–3 días**; más de 3 días: **estado migrañoso**.', 'Desencadenantes: chocolate, alcohol, cambios de sueño y hormonales (la menstruación), estrés.', '**Antecedente familiar**.'] },
    ],
    voz: [
      'La migraña es un dolor hemicraneal, de media cabeza, que puede irradiar a la cara; pulsátil, de intensidad moderada a severa, y que empeora con la actividad física. El paciente no lo soporta.',
      'Se acompaña de náuseas o vómitos, o de fotofobia y sonofobia. Empieza gradual, a veces en las primeras horas de la mañana, y dura hasta dos o tres días; si pasa de tres días, es un estado migrañoso.',
      'Lo desencadenan el chocolate, el alcohol, los cambios del ritmo de sueño, los cambios hormonales, como la menstruación, y el estrés. Y suele haber antecedentes familiares: si los padres tuvieron migraña, el hijo tiene predisposición.',
    ],
    refs: [M1('23:23'), M1('24:04'), M1('24:45'), M1('25:27'), M1('26:07'), M1('28:53'), M1('29:33')],
  },
  {
    id: 't-migrana-mujer',
    sec: 'primarias',
    titulo: 'Más frecuente en mujeres',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'La migraña es **más frecuente en mujeres**, sobre todo adolescentes y jóvenes.' },
      { t: 'texto', en: 1, text: 'En los **niños** es más frecuente en **varones**. Puede aparecer a cualquier edad.' },
    ],
    examen: { origen: 'ortega', texto: 'En qué sexo es más frecuente la migraña.', cita: 'Es más frecuente en mujeres. Y esto es pregunta de parcial, y esto lo dan en clases.', ref: M2('03:37') },
    voz: [
      'Un dato que es pregunta de parcial y que se confunde mucho: la migraña es más frecuente en las mujeres, sobre todo adolescentes y jóvenes. En los niños, en cambio, es más frecuente en los varones. Y puede aparecer a cualquier edad, desde la infancia hasta la vejez.',
    ],
    refs: [M1('24:45'), M2('03:25')],
  },
  {
    id: 't-aura',
    sec: 'primarias',
    titulo: 'Sin aura y con aura',
    fig: { f: 'cabeza', vistas: ['aura'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Sin aura (común)', tono: 'sky', text: 'La más frecuente. Al menos **5 crisis** de **4 a 72 horas**.' },
      { t: 'def', term: 'Con aura (clásica)', tono: 'gold', en: 1, text: 'Al menos 2 crisis. **Aura reversible**: escotomas, destellos, parestesias, disfasia, diplopía, debilidad, confusión.' },
      { t: 'prof', en: 2, text: '«El aura tiene que durar más de 5 minutos, sí o sí»: cada síntoma, de 5 a 60 minutos; la cefalea sigue dentro de los 60 minutos.', ref: M2('02:45') },
    ],
    voz: [
      'La migraña puede ser sin aura, la común y la más frecuente, o con aura, la clásica. Sin aura: al menos cinco crisis de cuatro a setenta y dos horas, con las características que vimos.',
      'Con aura: el cuerpo avisa. Antes del dolor aparecen síntomas reversibles: escotomas, destellos de luz, hormigueos, dificultad para hablar, visión doble, debilidad o confusión.',
      'Y lo que el profesor remarca sí o sí: el aura dura más de cinco minutos. Cada síntoma dura de cinco a sesenta minutos, y la cefalea aparece dentro de los sesenta minutos.',
    ],
    refs: [M1('26:51'), M1('27:31'), M1('28:12'), M2('00:00'), M2('00:41'), M2('01:22'), M2('02:03'), M2('02:45')],
  },
  {
    id: 't-tensional',
    sec: 'primarias',
    titulo: 'Cefalea tensional',
    fig: { f: 'cabeza', vistas: ['vincha'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'peach', text: 'En **vincha**: fronto-temporo-occipital, **bilateral**, **opresiva**, **leve a moderada**.' },
      { t: 'lista', en: 1, items: ['**No empeora** con la actividad.', '**Sin náuseas ni vómitos**; puede haber fotofobia **o** sonofobia (una sola).', 'De 30 minutos a 7 días; calma con reposo, sueño y antiinflamatorios.', 'Sin carácter hereditario; tensión de los músculos cervicales y pericraneales.'] },
    ],
    voz: [
      'La cefalea tensional, junto con la migraña, la más frecuente. Su forma es la de una vincha: frontal, temporal y occipital, de los dos lados, opresiva, y de intensidad leve a moderada.',
      'No empeora con la actividad física. No tiene náuseas ni vómitos; puede tener fotofobia o sonofobia, pero una sola. Dura de treinta minutos a siete días, y calma con el reposo, el sueño y los antiinflamatorios.',
      'No es hereditaria, como la migraña, y se la relaciona con la tensión de los músculos del cuello y del cráneo.',
    ],
    refs: [M2('02:45'), M2('04:05'), M2('04:49'), M2('05:31'), M2('06:14'), M2('06:55')],
  },
  {
    id: 't-tensional-formas',
    sec: 'primarias',
    titulo: 'Formas de la tensional',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Forma', 'Frecuencia'],
        filas: [
          ['Episódica infrecuente', 'Menos de 1 día por mes (menos de 12 al año)'],
          ['Episódica frecuente', '1 a 14 días por mes, durante más de 3 meses'],
          ['**Crónica**', '**15 días o más por mes**, durante más de 3 meses'],
        ],
      },
    ],
    voz: [
      'Según cuántas veces aparece, la tensional es episódica infrecuente, menos de un día por mes; episódica frecuente, de uno a catorce días por mes durante más de tres meses; o crónica, quince días o más por mes durante más de tres meses.',
    ],
    refs: [M2('07:35'), M2('08:16')],
  },
  {
    id: 't-racimos',
    sec: 'primarias',
    titulo: 'Cefalea en racimos (Horton)',
    fig: { f: 'cabeza', vistas: ['periorbitario'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: '**Hombre**, dolor **periorbitario** (o temporal) **unilateral**, hasta 3 horas, **de noche**.' },
      { t: 'lista', en: 1, items: ['Inyección conjuntival, **lagrimeo**, congestión nasal, **rinorrea**, edema palpebral, sudoración facial.', '**Ptosis y miosis**: Horner parcial.', '**Sin** náuseas, vómitos, fotofobia ni sonofobia.', 'Se asocia al tabaco y al alcohol.'] },
      { t: 'def', term: 'Hemicránea paroxística', tono: 'lilac', en: 2, text: 'Igual que el racimo, pero en **mujeres** y con crisis cortas, de **minutos**.' },
    ],
    voz: [
      'La cefalea en racimos, o de Horton, es típica del hombre. El dolor es de un solo lado, alrededor del ojo o en la sien, dura hasta tres horas, y aparece de noche, durante el sueño, en racimos de crisis.',
      'El ojo se pone rojo y lagrimea, la nariz se congestiona y gotea, el párpado se hincha, la cara transpira; y aparecen la ptosis y la miosis, un Horner parcial. No tiene náuseas, vómitos, fotofobia ni sonofobia. Se asocia al tabaco y al alcohol.',
      'La hemicránea paroxística se parece, pero es de mujeres, y sus crisis son cortas: duran minutos.',
    ],
    refs: [M2('08:16'), M2('09:00'), M2('10:20'), M2('11:00'), M2('11:42'), M2('12:24'), M2('13:05')],
  },
  {
    id: 't-neuralgia',
    sec: 'primarias',
    titulo: 'Neuralgia del trigémino',
    fig: { f: 'cabeza', vistas: ['trigemino'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'gold', text: 'Dolor **lancinante**, como una **descarga eléctrica**, **unilateral**, de segundos a minutos.' },
      { t: 'lista', en: 1, items: ['Rama más afectada: **V2** (maxilar superior), después V3 y por último V1.', 'Lo dispara tocar la cara: hablar, masticar, cepillarse, afeitarse, el viento.', 'Causas: compresión, tumores, desmielinización del V par.'] },
    ],
    voz: [
      'La neuralgia del trigémino es un dolor intensísimo, que aparece y desaparece de golpe, como una descarga eléctrica o un flechazo, de un solo lado de la cara, y dura de segundos a minutos.',
      'La rama más afectada es la segunda, la maxilar superior; le siguen la tercera y, por último, la primera. Lo dispara cualquier estímulo de la cara: hablar, masticar, cepillarse los dientes, afeitarse, el viento.',
      'Puede deberse a una compresión o un tumor, o a una enfermedad desmielinizante del quinto par.',
    ],
    refs: [M2('13:05'), M2('13:46'), M2('14:26'), M2('15:08'), M2('15:48')],
  },
  {
    id: 't-comparar',
    sec: 'primarias',
    titulo: 'Las tres primarias, lado a lado',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Migraña', 'Tensional', 'Racimos'],
        filas: [
          ['Dónde', 'Hemicraneal', 'Bilateral, en vincha', 'Periorbitaria, unilateral'],
          ['Cómo', '**Pulsátil**', '**Opresiva**', 'Intensa'],
          ['Intensidad', 'Moderada a severa', 'Leve a moderada', 'Severa'],
          ['Actividad', 'Empeora', 'No empeora', '—'],
          ['Acompañan', 'Náuseas, vómitos, foto y sonofobia', 'Fotofobia **o** sonofobia', 'Lagrimeo, rinorrea, ptosis, miosis'],
          ['Quién', '**Mujer** joven, familiar', 'Cualquiera', '**Hombre**'],
        ],
      },
    ],
    voz: [
      'Las tres, lado a lado. La migraña: hemicraneal, pulsátil, moderada a severa, empeora con la actividad, con náuseas, vómitos, fotofobia y sonofobia, en mujeres jóvenes con antecedentes familiares.',
      'La tensional: bilateral, en vincha, opresiva, leve a moderada, no empeora con la actividad, y a lo sumo fotofobia o sonofobia. Y el racimo: periorbitario, de un lado, intenso, con lagrimeo, rinorrea, ptosis y miosis, en el hombre.',
    ],
    refs: [M2('06:55'), M2('08:16'), M2('11:42')],
  },
  {
    id: 't-mareo',
    sec: 'vertigo',
    titulo: 'Mareo y vértigo',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Mareo', tono: 'sky', items: ['Cabeza **liviana**, que flota', '**Sin ilusión de movimiento**', 'Ansiedad, depresión, fármacos, anemia, hipotensión, cervical', 'Examen neurológico y vestibular **normal**'] },
          { titulo: 'Vértigo', tono: 'red', items: ['**Ilusión de movimiento**', '**Subjetivo**: me muevo yo; **objetivo**: se mueven las cosas', 'Náuseas, vómitos, **nistagmo**, desequilibrio', 'Brusco, intermitente, con desencadenantes'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Mareo, vértigo y trastornos del equilibrio.', cita: 'Hay cosas que yo acá le voy a hablar que deben conocer para el parcial, principalmente mareo y vértigo y trastorno del equilibrio.', ref: M2('16:57') },
    voz: [
      'Mareo y vértigo, que hay que conocer para el parcial. El mareo es la sensación de cabeza liviana, que flota, como a punto de caerse, pero sin ilusión de movimiento. Se ve en la ansiedad, la depresión, con fármacos, en la anemia, la hipotensión o los problemas cervicales, y el examen neurológico y vestibular es normal.',
      'El vértigo, en cambio, es una ilusión de movimiento. Es subjetivo si el paciente siente que él se mueve respecto de los objetos, y objetivo si ve que los objetos se mueven a su alrededor. Es brusco e intermitente, tiene desencadenantes, y se acompaña de náuseas, vómitos, nistagmo y desequilibrio.',
    ],
    refs: [M2('16:30'), M2('17:12'), M2('17:54'), M2('18:35'), M2('19:15'), M2('22:39'), M2('23:19'), M2('24:01')],
  },
  {
    id: 't-equilibrio',
    sec: 'vertigo',
    titulo: 'Los elementos del equilibrio',
    fig: { f: 'encefalo', vistas: [{ luz: ['ojo', 'laberinto', 'medula', 'cerebelo', 'parietal'], vias: ['vision', 'vestibular', 'sensitiva', 'cerebelo'], tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'lista', items: ['La **vista**.', 'El **vestíbulo** (oído interno).', 'La **sensibilidad profunda**: cordones posteriores de **Goll y Burdach**.', 'El **cerebelo**.', 'Todos se comunican con la **corteza cerebral**.'] },
    ],
    examen: { origen: 'ortega', texto: 'Los elementos anatomofuncionales que mantienen el equilibrio.', cita: 'Cuando están en la evaluación, yo les pregunto a ustedes cuáles son los elementos anatomofuncionales que mantienen el equilibrio de la persona.', ref: M2('22:14') },
    voz: [
      'Si en la evaluación les preguntan cuáles son los elementos anatomofuncionales que mantienen el equilibrio, la respuesta es: la vista, el vestíbulo del oído interno, la sensibilidad profunda por los cordones posteriores de Goll y Burdach, y el cerebelo, todos comunicados con la corteza cerebral.',
    ],
    refs: [M2('21:16'), M2('21:57'), M2('22:39')],
  },
  {
    id: 't-perif-central',
    sec: 'vertigo',
    titulo: 'Vértigo periférico y central',
    fig: { f: 'encefalo', vistas: [{ lesion: ['laberinto'], etiquetas: ['cerebelo', 'protuberancia'], tone: 'sky' }, { lesion: ['cerebelo', 'protuberancia'], etiquetas: ['laberinto'], tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Periférico', tono: 'sky', text: 'Se afecta la **vía vestibular**: laberintitis, neuronitis vestibular, **vértigo posicional paroxístico benigno**, enfermedad de **Ménière**, colesteatoma, otosclerosis, fístula perilinfática.' },
      { t: 'def', term: 'Central', tono: 'red', en: 1, text: 'Se afectan el **tronco** y el **cerebelo**: tumor del ángulo pontocerebeloso, insuficiencia vertebrobasilar, migraña basilar, **esclerosis múltiple**.' },
    ],
    aclara: { text: 'El vértigo central depende del tronco encefálico y del cerebelo; la lesión de los cordones posteriores da ataxia (desequilibrio con Romberg positivo), no vértigo.', origen: GRAL },
    voz: [
      'Hay dos tipos de vértigo. En el periférico se afecta la vía vestibular: la laberintitis aguda, la neuronitis vestibular, el vértigo posicional paroxístico benigno, la enfermedad de Ménière, que es un aumento de la presión de la endolinfa, el colesteatoma, la otosclerosis o la fístula perilinfática.',
      'En el central se afectan el tronco encefálico y el cerebelo: un tumor del ángulo pontocerebeloso, la insuficiencia vertebrobasilar, la migraña basilar o la esclerosis múltiple.',
    ],
    refs: [M2('24:42'), M2('25:23'), M2('26:03'), M2('26:45')],
  },
  {
    id: 't-perif-cuadro',
    sec: 'vertigo',
    titulo: 'Cómo distinguirlos',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Periférico (vestibular)', 'Central'],
        filas: [
          ['Vértigo', 'Intenso, brusco', 'Menos intenso, persistente'],
          ['Náuseas y vómitos', '**Intensos**', 'Leves'],
          ['Audición', 'Puede haber **hipoacusia**', 'Conservada'],
          ['Nistagmo', 'Horizontal, con **latencia**, se agota', 'Puede ser vertical, no se agota'],
          ['Otros signos neurológicos', 'No', '**Sí** (pares, cerebelo)'],
        ],
      },
    ],
    aclara: { text: 'La clase muestra el cuadro comparativo y nombra sus filas (equilibrio, náuseas, vómitos, audición, latencia de la maniobra, reflejo oculocefálico); los valores de cada casilla son los estándar de la bibliografía.', origen: 'Completado con la bibliografía.' },
    voz: [
      'Para distinguirlos, el cuadro comparativo. El periférico es intenso y brusco, con náuseas y vómitos intensos, a veces con hipoacusia, y su nistagmo es horizontal, aparece con latencia y se agota; no hay otros signos neurológicos.',
      'El central es menos intenso pero persistente, con náuseas leves y la audición conservada; el nistagmo puede ser vertical y no se agota, y aparecen otros signos neurológicos, de los pares craneales o del cerebelo.',
    ],
    refs: [M2('34:49'), M2('35:29')],
  },
  {
    id: 't-romberg',
    sec: 'vertigo',
    titulo: 'Marchas y Romberg',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Lesión', 'Marcha', 'Romberg'],
        filas: [
          ['Vestibular', 'En **estrella** (Babinski)', '**Positivo**'],
          ['Cordonal posterior', '**Taloneante** (tabética)', '**Positivo**'],
          ['Cerebelosa', '**Zigzagueante** (de ebrio)', '**Negativo**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'En qué lesiones el Romberg es positivo y en cuál es negativo.', cita: 'Prueba de Romberg es positiva en vestibular y cordonal posterior, y es negativa en el cerebeloso. Eso no se olviden, porque es pregunta de parcial.', ref: M2('29:56') },
    voz: [
      'Pregunta de parcial: las marchas y el Romberg. En la lesión vestibular, la marcha es en estrella de Babinski y el Romberg es positivo. En la lesión cordonal posterior, la marcha es taloneante, tabética, y el Romberg también es positivo.',
      'En la lesión cerebelosa, la marcha es zigzagueante, de ebrio, y el Romberg es negativo.',
    ],
    refs: [M2('28:46'), M2('29:26'), M2('30:06')],
  },
  {
    id: 't-examen-vertigo',
    sec: 'vertigo',
    titulo: 'Examen del paciente con vértigo',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['**Tensión arterial** (corazón y carótidas).', '**Marcha** y **Romberg**.', 'Pares craneales: **VIII**, y también **V** y **VII** (la protuberancia y el cerebelo comparten irrigación).', '**Nistagmo**.', 'Audición y oídos; prueba rotatoria (sillón de **Bárány**); imágenes.'] },
      { t: 'texto', en: 1, text: 'El vértigo posicional benigno aparece con los cambios de posición: maniobra de Dix-Hallpike (no se pregunta).' },
    ],
    examen: { origen: 'ortega', texto: 'El nistagmo.', cita: 'La presencia de nistagmo también es importante… nistagmo con mayúscula… es pregunta de parcial. Lo tienen que conocer.', ref: M2('30:52') },
    voz: [
      'Al examinar al paciente con vértigo: la tensión arterial, por el corazón y las carótidas; la estabilidad, con la marcha y el Romberg; los pares craneales, el octavo, y también el quinto y el séptimo, porque la protuberancia y el cerebelo comparten la irrigación.',
      'Y el nistagmo, que es pregunta de parcial: hay que conocerlo. Se completa con la audición y los oídos, la prueba rotatoria en el sillón de Bárány, y las imágenes. El vértigo posicional benigno aparece al cambiar de posición, y se busca con la maniobra de Dix-Hallpike, que no se pregunta.',
    ],
    refs: [M2('28:46'), M2('30:06'), M2('30:46'), M2('32:06'), M2('32:47'), M2('33:29')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'mc', label: 'Cognición y conciencia' },
    { id: 'cefalea', label: 'Cefalea' },
    { id: 'primarias', label: 'Las primarias' },
    { id: 'vertigo', label: 'Mareo y vértigo' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Media cabeza y la luz que molesta',
    texto: 'Mujer de 22 años con cefalea del lado derecho, pulsátil, que no la deja trabajar y empeora al subir escaleras. Vomitó dos veces y pide que apaguen la luz. Su madre tiene dolores parecidos. Media hora antes vio destellos en zigzag.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Migraña con aura.', why: 'Hemicraneal, pulsátil, con vómitos y fotofobia, antecedente familiar y aura visual previa.' },
      { text: 'Cefalea tensional.', why: 'Sería bilateral, opresiva, sin vómitos y no empeoraría con la actividad.' },
      { text: 'Cefalea en racimos.', why: 'Es de hombres, periorbitaria, con lagrimeo y rinorrea.' },
      { text: 'Neuralgia del trigémino.', why: 'Son descargas de segundos en la cara.' },
    ],
    correcta: 0,
    razonamiento: 'Hemicraneal + pulsátil + empeora con la actividad + vómitos + fotofobia, con aura visual: migraña con aura.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Despierta de noche con el ojo rojo',
    texto: 'Hombre de 35 años, fumador, que hace dos semanas se despierta de noche con un dolor terrible alrededor del ojo izquierdo, que dura una hora. Ese ojo lagrimea y está rojo, le gotea la nariz, y el párpado cae.',
    pregunta: '¿Qué cefalea es y por qué tiene esos signos?',
    opciones: [
      { text: 'Cefalea en racimos: descarga parasimpática.', why: 'Hombre, nocturna, periorbitaria, con lagrimeo, rinorrea y Horner parcial.' },
      { text: 'Migraña sin aura.', why: 'No da lagrimeo ni rinorrea, y es más de mujeres.' },
      { text: 'Hemicránea paroxística.', why: 'Es de mujeres y las crisis duran minutos.' },
      { text: 'Hipertensión endocraneana.', why: 'Daría cefalea holocraneana, vómitos y edema de papila.' },
    ],
    correcta: 0,
    razonamiento: 'El hipotálamo posterior activa el trigémino y una descarga parasimpática: vasodilatación, lagrimeo, rinorrea, ptosis y miosis.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Cierra los ojos y se cae',
    texto: 'Paciente con vértigo rotatorio brusco, vómitos intensos y nistagmo horizontal. Con los pies juntos y los ojos abiertos se mantiene; al cerrarlos, cae siempre hacia el mismo lado. El resto del examen neurológico es normal.',
    pregunta: '¿Dónde está la lesión?',
    opciones: [
      { text: 'Vestíbulo: vértigo periférico.', why: 'Vértigo intenso, vómitos, nistagmo horizontal, Romberg positivo y sin otros signos.' },
      { text: 'Cerebelo.', why: 'El Romberg sería negativo y habría otros signos cerebelosos.' },
      { text: 'Tálamo.', why: 'No da vértigo con este cuadro.' },
      { text: 'Es un mareo, no un vértigo.', why: 'Hay ilusión de movimiento y nistagmo.' },
    ],
    correcta: 0,
    razonamiento: 'Romberg positivo en la lesión vestibular y cordonal posterior; negativo en la cerebelosa. Con vértigo y nistagmo, el vestíbulo.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'mc',
        label: 'Motivos de consulta',
        tone: 'lilac',
        nota: 'Deterioro cognitivo (Alzheimer) · pérdida del conocimiento (**síncope**) · cefalea · mareo y vértigo',
        hijos: [
          { id: 'cef', label: 'Cefalea', tone: 'red', examen: true, nota: 'Trigémino → Gasser → protuberancia → **tálamo** → corteza' },
          { id: 'pri', label: 'Primarias', tone: 'red', examen: true, nota: '**Migraña** (mujer, pulsátil) · **tensional** (vincha) · racimos (hombre) · neuralgia del trigémino (V2)' },
          { id: 'ver', label: 'Vértigo', tone: 'sky', examen: true, nota: 'Ilusión de movimiento · periférico (vestíbulo) o central (tronco y cerebelo)' },
          { id: 'equ', label: 'Equilibrio', tone: 'sky', examen: true, nota: 'Vista · vestíbulo · cordones posteriores · cerebelo → corteza · **Romberg**' },
        ],
      },
    ],
    nexos: ['**Todas las vías sensitivas hacen escala en el tálamo, menos el olfato.**', '**Romberg positivo: vestibular y cordonal posterior; negativo: cerebeloso.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['neu01-d01', 'neu01-d02', 'neu01-d03', 'neu01-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    mc: { tab: 'teoria', seccion: 'mc' },
    cefalea: { tab: 'teoria', seccion: 'cefalea' },
    primarias: { tab: 'teoria', seccion: 'primarias' },
    vertigo: { tab: 'teoria', seccion: 'vertigo' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
