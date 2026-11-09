import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * neu-04: clase visual de los pares craneales II (V, VII, VIII, IX, X, XI y XII).
 *  1. Clases de Ortega: «Pares craneales parte 4» (00:02–28:27), «parte 5» (00:06–26:43) y «parte 6» (00:02–20:14).
 * Ver content/traceability/neu-04.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P4 = (t: string) => r('pc-4', t);
const P5 = (t: string) => r('pc-5', t);
const P6 = (t: string) => r('pc-6', t);

const GRAL = 'Fisiología general, no se da en la clase.';
const BIBLIO = 'Precisión de la bibliografía, no se da así en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-facial',
    sec: 'facial',
    titulo: 'Por qué la parálisis central respeta la frente',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'cabeza', vistas: ['normal', 'facial-central', 'facial-periferica'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'El núcleo del facial que mueve la **frente** recibe órdenes de **las dos cortezas**; el de la **mitad inferior**, solo de la **opuesta**.' },
          { k: 'alteracion', text: '**Central** (corteza o vía): la frente sigue recibiendo la otra corteza → se paraliza **solo la mitad inferior**, del lado opuesto.' },
          { k: 'signo', text: '**Periférica** (núcleo o nervio): se pierde todo → **toda la hemicara** del mismo lado, frente incluida; no cierra el ojo (**Bell**).' },
        ],
      },
    ],
    aclara: { text: 'La doble inervación cortical de la frente es la explicación clásica; la clase aclara que el porqué no se pregunta, y que sí se pregunta cómo es cada parálisis.', origen: GRAL },
    voz: [
      'El séptimo par mueve los músculos de la cara. Su núcleo tiene dos partes: la que mueve la frente recibe órdenes de las dos cortezas, y la que mueve la mitad inferior de la cara, solo de la corteza del lado opuesto.',
      'Si la lesión es central, en la corteza o en la vía que baja, la frente sigue recibiendo órdenes de la otra corteza: se paraliza solamente la mitad inferior de la cara, del lado opuesto a la lesión.',
      'Si la lesión es periférica, en el núcleo o en el nervio, se pierde todo: se paraliza toda la hemicara del mismo lado, frente incluida, y el ojo no cierra. Al intentarlo, el globo gira hacia arriba: el signo de Bell.',
    ],
    refs: [P4('22:22'), P4('23:02'), P4('23:42'), P4('24:22')],
  },
  {
    id: 'f-weber',
    sec: 'vestibulococlear',
    titulo: 'Weber: hacia dónde se va el sonido',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'cabeza', vistas: ['normal', 'weber-conduccion', 'weber-percepcion'] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'El diapasón en el vértice hace vibrar el hueso: la **vía ósea** llega directo al **oído interno** de los dos lados.' },
          { k: 'alteracion', text: '**Conducción** (oído externo o medio): el oído interno está sano y no le entra el ruido ambiente → se oye **más del lado enfermo**.' },
          { k: 'signo', text: '**Percepción** (oído interno o nervio): ese lado no capta → se oye **más del lado sano**.' },
        ],
      },
    ],
    aclara: { text: 'Que el oído con hipoacusia de conducción oiga más por vía ósea porque no lo enmascara el ruido ambiente es fisiología general.', origen: GRAL },
    voz: [
      'La prueba de Weber. El diapasón apoyado en el vértice del cráneo hace vibrar el hueso, y esa vía ósea llega directamente al oído interno de los dos lados. Normalmente se oye en el medio.',
      'En la hipoacusia de conducción, el problema está en el oído externo o medio, pero el oído interno está sano: capta la vibración del hueso, y como no le entra el ruido ambiente, la oye más fuerte. El sonido se lateraliza hacia el oído enfermo.',
      'En la hipoacusia de percepción, el oído interno o el nervio están dañados: ese lado no capta la vibración, y el sonido se lateraliza hacia el oído sano.',
    ],
    refs: [P5('09:23'), P5('10:09'), P5('10:52'), P5('11:33')],
  },
  {
    id: 'f-lengua',
    sec: 'bajos',
    titulo: 'Cómo está inervada la lengua',
    etapas: ['normal', 'mecanismo', 'signo'],
    fig: { f: 'boca', vistas: ['inervacion'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Dos tercios anteriores', tono: 'sky', text: 'Tacto: **V** (rama maxilar inferior). Gusto: **VII**.' },
      { t: 'def', term: 'Tercio posterior', tono: 'gold', en: 1, text: 'Tacto y gusto: **IX**.' },
      { t: 'def', term: 'Motora', tono: 'mint', en: 2, text: '**XII** (todos los músculos menos el palatogloso, que es del X).' },
    ],
    voz: [
      'Una pregunta que se hace siempre en el parcial: cómo está inervada la lengua. En los dos tercios anteriores, el tacto lo lleva el quinto par, por la rama maxilar inferior, y el gusto, el séptimo.',
      'En el tercio posterior, el tacto y el gusto los lleva el noveno par, el glosofaríngeo.',
      'Y la parte motora es del duodécimo, el hipogloso, que mueve todos los músculos de la lengua menos uno, el palatogloso, que depende del vago.',
    ],
    refs: [P4('07:02'), P4('07:44'), P6('00:56'), P6('03:47')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'facial', label: 'El facial' },
    { id: 'vestibulococlear', label: 'La audición' },
    { id: 'bajos', label: 'La lengua' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-trigemino',
    sec: 'trigemino',
    titulo: 'V par: trigémino',
    fig: { f: 'cabeza', vistas: ['trigemino'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'gold', text: 'Mixto. **Motor**: los músculos de la **masticación**. **Sensitivo**: toda la **cara**, por tres ramas.' },
      { t: 'lista', en: 1, items: ['**V1 oftálmica**: frente, cuero cabelludo, órbita, nariz.', '**V2 maxilar superior**: mejilla, ala de la nariz, labio superior.', '**V3 maxilar inferior**: mandíbula, labio inferior, **dos tercios anteriores de la lengua** (tacto).'] },
      { t: 'texto', en: 2, text: 'Las tres ramas forman el **ganglio de Gasser** (1.ª neurona) → protuberancia (2.ª) → **tálamo** (3.ª).' },
    ],
    voz: [
      'El quinto par, el trigémino, es mixto. Su parte motora mueve los músculos de la masticación: el temporal, el masetero y los pterigoideos. Su parte sensitiva lleva la sensibilidad de toda la cara, por tres ramas.',
      'La oftálmica, para la frente, el cuero cabelludo, la órbita y la nariz; la maxilar superior, para la mejilla, el ala de la nariz y el labio superior; y la maxilar inferior, para la mandíbula, el labio inferior y el tacto de los dos tercios anteriores de la lengua.',
      'Las tres ramas forman el ganglio de Gasser, la primera neurona; la segunda está en la protuberancia, y la tercera en el tálamo.',
    ],
    refs: [P4('00:47'), P4('05:39'), P4('06:20'), P4('09:50'), P4('10:32'), P4('11:14')],
  },
  {
    id: 't-trigemino-nucleos',
    sec: 'trigemino',
    titulo: 'Los núcleos del trigémino y cómo se explora',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Núcleo', 'Dónde', 'Qué hace'],
        filas: [
          ['Mesencefálico', 'Mesencéfalo', 'Sensibilidad **profunda**'],
          ['Motor', 'Protuberancia', '**Masticación**'],
          ['Sensitivo principal', 'Protuberancia', '**Tacto**'],
          ['Espinal', 'Bulbo', '**Dolor y temperatura**'],
        ],
      },
      { t: 'texto', en: 1, text: 'Sensibilidad: **pincel** (tacto), aguja y **tubo** frío o caliente (termoalgésica), **diapasón** (vibración). Motora: abrir la boca contra resistencia. Reflejos: **corneano**, superciliar, nasopalpebral, **maseterino**.' },
    ],
    voz: [
      'El trigémino tiene cuatro núcleos. El mesencefálico, para la sensibilidad profunda; en la protuberancia, el núcleo motor de la masticación y el sensitivo principal, del tacto; y en el bulbo, el núcleo espinal, del dolor y la temperatura.',
      'Se explora la sensibilidad con el pincel para el tacto, la aguja y un tubo frío o caliente para el dolor y la temperatura, y el diapasón para la vibración, siempre comparando las tres ramas de los dos lados. La fuerza, pidiendo abrir la boca contra resistencia. Y los reflejos: el corneano, útil en el coma, el superciliar, el nasopalpebral y el maseterino.',
    ],
    refs: [P4('02:50'), P4('03:32'), P4('08:27'), P4('09:07'), P4('11:55'), P4('12:35'), P4('13:58'), P4('14:39')],
  },
  {
    id: 't-facial',
    sec: 'facial',
    titulo: 'VII par: facial',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'sky', text: 'Mixto. **Motor de la cara** (la sensibilidad de la cara es del V). **Gusto** de los dos tercios anteriores de la lengua. **Secreción** lagrimal y salival.' },
      { t: 'lista', en: 1, items: ['Nace en la **protuberancia**; sale por el surco bulboprotuberancial.', 'Se explora con **mímicas**: arrugar la frente, cerrar los ojos, inflar las mejillas, mostrar los dientes.', 'Gusto: **ageusia**, **hipogeusia**, **parageusia**.'] },
    ],
    examen: { origen: 'ortega', texto: 'El séptimo par.', cita: 'Otro par muy importante, otro par que pregunta muchísimo.', ref: P4('17:53') },
    aclara: { text: 'Cada sabor se percibe en toda la lengua; separar dulce y salado adelante y amargo y ácido atrás, como en la clase, sirve solo como guía de exploración.', origen: BIBLIO },
    voz: [
      'El séptimo par, el facial, uno de los que más se pregunta. Es mixto: mueve los músculos de la cara, porque la sensibilidad de la cara es del quinto; lleva el gusto de los dos tercios anteriores de la lengua; y estimula la secreción lagrimal y salival.',
      'Nace en la protuberancia y sale por el surco entre la protuberancia y el bulbo. Se explora con mímicas: arrugar la frente, cerrar los ojos, inflar las mejillas, mostrar los dientes. Y el gusto puede perderse, la ageusia, disminuir, la hipogeusia, o alterarse, la parageusia.',
    ],
    refs: [P4('17:25'), P4('18:08'), P4('19:32'), P4('21:35'), P4('25:44'), P4('26:25'), P4('27:05'), P4('28:27')],
  },
  {
    id: 't-paralisis-facial',
    sec: 'facial',
    titulo: 'Parálisis facial central y periférica',
    fig: { f: 'cabeza', vistas: ['facial-central', 'facial-periferica'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Central', tono: 'lilac', text: 'Lesión en la **corteza** o la vía: **solo la mitad inferior** de la cara, del **lado opuesto**; la frente se arruga. Signo del **fumador de pipa**.' },
      { t: 'def', term: 'Periférica', tono: 'red', en: 1, text: 'Lesión del **núcleo o el nervio**: **toda la hemicara** del mismo lado; frente lisa, no cierra el ojo. Signos de **Bell** y de **Negro**.' },
    ],
    examen: { origen: 'ortega', texto: 'La parálisis facial central y periférica.', cita: 'Lo que sí quiero que estudien, por favor, es parálisis facial central, parálisis facial periférica: no me pueden no saber eso.', ref: P4('25:06') },
    voz: [
      'Lo que no se puede no saber: la parálisis facial central y la periférica. En la central, la lesión está en la corteza o en la vía que baja: se paraliza solo la mitad inferior de la cara, del lado opuesto, y el paciente puede arrugar la frente. Al respirar, la mejilla se infla pasivamente: el signo del fumador de pipa.',
      'En la periférica, la lesión está en el núcleo o en el nervio: se paraliza toda la hemicara del mismo lado. La frente queda lisa, el ojo no cierra, y al intentarlo el globo gira hacia arriba: el signo de Bell. Al mirar hacia arriba, el ojo del lado paralizado sube más: el signo de Negro. Esos signos también son preguntas de parcial.',
    ],
    refs: [P4('23:42'), P4('24:22'), P4('25:02'), P4('28:27')],
  },
  {
    id: 't-viii',
    sec: 'vestibulococlear',
    titulo: 'VIII par: vestibulococlear',
    fig: { f: 'encefalo', vistas: [{ luz: ['laberinto'], vias: ['vestibular'], tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'sky', text: 'Dos ramas: **coclear** (audición, del **órgano de Corti**) y **vestibular** (equilibrio, de los conductos semicirculares, el utrículo y el sáculo: ganglio de **Scarpa**).' },
      { t: 'lista', en: 1, items: ['Sale por el surco bulboprotuberancial, junto al VII.', 'Síntomas: **anacusia** (sordera), **hipoacusia**, hiperacusia, paracusia, **acúfenos**, **vértigo**.'] },
    ],
    examen: { origen: 'ortega', texto: 'El VIII par.', cita: 'Es un par craneal que es directamente para bochar al alumno, entonces es un par que tienen que estudiarlo bien.', ref: P5('01:02') },
    voz: [
      'El octavo par, que el profesor define como un par para bochar al alumno: hay que estudiarlo bien. Tiene dos ramas: la coclear, de la audición, que nace en el órgano de Corti, y la vestibular, del equilibrio, que nace en los conductos semicirculares, el utrículo y el sáculo, a través del ganglio de Scarpa.',
      'Sale del tronco por el surco bulboprotuberancial, al lado del séptimo. Sus síntomas son la sordera o anacusia, la hipoacusia, la hiperacusia, la paracusia, los acúfenos y el vértigo.',
    ],
    refs: [P5('00:47'), P5('01:31'), P5('02:16'), P5('02:59'), P5('04:26'), P5('05:10')],
  },
  {
    id: 't-hipoacusia',
    sec: 'vestibulococlear',
    titulo: 'Hipoacusia: Weber, Rinne y Schwabach',
    fig: { f: 'cabeza', vistas: ['weber-conduccion', 'weber-percepcion'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Conducción', tono: 'gold', text: 'Oído **externo o medio** (vía aérea). **Weber**: hacia el oído **enfermo**. **Rinne negativo**: se oye mejor por hueso que por aire.' },
      { t: 'def', term: 'Percepción', tono: 'sky', en: 1, text: 'Oído **interno** o nervio. **Weber**: hacia el oído **sano**. Rinne positivo (aire mejor que hueso, los dos disminuidos).' },
      { t: 'texto', en: 1, text: 'Otras: Schwabach, audiometría, potenciales evocados, otoscopia.' },
    ],
    examen: { origen: 'ortega', texto: 'Las pruebas para evaluar la vía auditiva.', cita: 'La prueba de Weber es la prueba que más tienen que conocer… le pueden llegar a preguntar, y no se tienen que olvidar de eso.', ref: P5('11:21') },
    aclara: { text: 'Rinne positivo es lo normal (se oye mejor por aire que por hueso) y se mantiene en la hipoacusia de percepción; Rinne negativo indica conducción. En la grabación se mezcla la interpretación.', origen: BIBLIO },
    voz: [
      'Si hay hipoacusia, hay que definir si es de conducción o de percepción, y la prueba que más hay que conocer es la de Weber. En la de conducción, el problema está en el oído externo o medio, en la vía aérea: el Weber se lateraliza hacia el oído enfermo, y el Rinne es negativo: se oye mejor por el hueso que por el aire.',
      'En la de percepción, el problema está en el oído interno o en el nervio: el Weber se lateraliza hacia el oído sano, y el Rinne sigue positivo, aire mejor que hueso, aunque los dos estén disminuidos. Se completan con el Schwabach, la audiometría, los potenciales evocados y la otoscopia.',
    ],
    refs: [P5('06:35'), P5('07:17'), P5('08:00'), P5('08:40'), P5('11:33'), P5('14:23'), P5('15:44'), P5('16:26')],
  },
  {
    id: 't-vestibular',
    sec: 'vestibulococlear',
    titulo: 'Cómo se explora la rama vestibular',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Ojos de muñeca', tono: 'sky', text: 'Reflejo oculocefálico: al girar la cabeza, los ojos se desvían al lado contrario y siguen mirando al frente. Integra **VIII, III y VI**; útil en el **coma**.' },
      { t: 'def', term: 'Romberg', tono: 'gold', en: 1, text: 'Positivo en el **vestibular** y el **cordonal posterior**; negativo en el **cerebeloso**.' },
      { t: 'def', term: 'Marcha y nistagmo', tono: 'lilac', en: 1, text: 'Marcha **en estrella** de Babinski. Índices. **Nistagmo** espontáneo y provocado (rotatorio, sillón de Bárány).' },
      { t: 'def', term: 'Prueba calórica', tono: 'peach', en: 2, text: 'Agua en el conducto auditivo para estimular el vestíbulo cuando los ojos de muñeca no responden.' },
    ],
    aclara: { text: 'En la prueba calórica con agua fría, en el paciente en coma con el tronco sano, los ojos se desvían hacia el oído irrigado.', origen: BIBLIO },
    voz: [
      'La rama vestibular se explora con los ojos de muñeca, o reflejo oculocefálico: al girar la cabeza, los ojos se desvían al lado contrario y siguen mirando al frente. Ese reflejo integra el octavo, el tercero y el sexto par, y es muy útil en el coma para saber si el tronco está sano.',
      'También con el Romberg, positivo en el síndrome vestibular y en el cordonal posterior y negativo en el cerebeloso; la marcha en estrella de Babinski; la prueba de los índices; y el nistagmo, espontáneo o provocado con la prueba rotatoria. Y cuando los ojos de muñeca no responden, la prueba calórica: se coloca agua en el conducto auditivo para estimular el vestíbulo.',
    ],
    refs: [P5('17:07'), P5('17:47'), P5('18:28'), P5('19:09'), P5('20:33'), P5('21:14'), P5('21:57'), P5('24:40'), P5('25:21')],
  },
  {
    id: 't-ix-x',
    sec: 'bajos',
    titulo: 'IX glosofaríngeo y X vago',
    fig: { f: 'boca', vistas: ['velo', 'cortina'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'IX', tono: 'gold', text: 'Constrictor **superior** de la faringe; sensibilidad de la faringe y del **tercio posterior de la lengua** (tacto y gusto); seno carotídeo; parótida.' },
      { t: 'def', term: 'X', tono: 'sky', en: 0, text: 'Constrictores medio e inferior, **velo del paladar**, **laringe** (la voz); parasimpático de las vísceras del tórax y del abdomen.' },
      { t: 'def', term: 'Signo de la cortina', tono: 'red', en: 1, text: 'Al decir «ah», el lado paralizado no sube y la **úvula se va hacia el lado sano**.' },
      { t: 'texto', en: 1, text: 'Reflejo **nauseoso**; prueba del vaso de agua (regurgitación nasal); voz bitonal o disfonía.' },
    ],
    aclara: { text: 'La lesión del vago quita el freno parasimpático: menos peristaltismo y secreciones, y taquicardia (no bradicardia).', origen: GRAL },
    voz: [
      'El noveno y el décimo se exploran juntos. El glosofaríngeo mueve el constrictor superior de la faringe y lleva la sensibilidad de la faringe y del tercio posterior de la lengua, el tacto y el gusto; también inerva el seno carotídeo y la parótida.',
      'El vago mueve los constrictores medio e inferior, el velo del paladar y la laringe, de donde sale la voz, y es el gran nervio parasimpático del tórax y del abdomen. Se explora pidiendo que diga «ah»: si un lado está paralizado, no sube, y la úvula se va hacia el lado sano. Es el signo de la cortina. Se completa con el reflejo nauseoso y la prueba del vaso de agua.',
    ],
    refs: [P6('00:02'), P6('00:56'), P6('04:45'), P6('05:47'), P6('07:17'), P6('08:02'), P6('11:06'), P6('12:36')],
  },
  {
    id: 't-xi-xii',
    sec: 'bajos',
    titulo: 'XI espinal y XII hipogloso',
    fig: { f: 'boca', vistas: ['xii'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'XI espinal', tono: 'gold', text: 'Motor del **esternocleidomastoideo** (girar y flexionar la cabeza) y del **trapecio** (elevar los hombros). Se explora contra resistencia.' },
      { t: 'def', term: 'XII hipogloso', tono: 'mint', en: 1, text: 'Motor de la **lengua**. Nace en el bulbo y sale por el agujero condíleo anterior.' },
      { t: 'def', term: 'Parálisis del XII', tono: 'red', en: 2, text: 'Atrofia, fasciculaciones; al sacar la lengua, la **punta se desvía hacia el lado paralizado**. Disartria y disfagia.' },
    ],
    aclara: { text: 'La lengua se desvía hacia el lado de la lesión porque el geniogloso sano la empuja hacia adelante y hacia el lado débil.', origen: BIBLIO },
    voz: [
      'El undécimo, el espinal, y el duodécimo, el hipogloso, son puramente motores. El espinal mueve el esternocleidomastoideo, para girar y flexionar la cabeza, y el trapecio, para elevar los hombros; se explora contra resistencia.',
      'El hipogloso mueve la lengua. Si se paraliza, ese lado se atrofia y fascicula, y al sacar la lengua la punta se desvía hacia el lado paralizado, porque el lado sano la empuja. El paciente tiene dificultad para articular y para tragar.',
    ],
    refs: [P6('15:25'), P6('16:05'), P6('17:29'), P6('18:10'), P6('18:52'), P6('19:34')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'trigemino', label: 'V trigémino' },
    { id: 'facial', label: 'VII facial' },
    { id: 'vestibulococlear', label: 'VIII' },
    { id: 'bajos', label: 'IX a XII' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'No puede cerrar el ojo',
    texto: 'Paciente que amaneció con la cara torcida: no puede arrugar la frente del lado izquierdo, el ojo izquierdo no cierra y, al intentarlo, el globo gira hacia arriba. La comisura izquierda cae.',
    pregunta: '¿Qué parálisis tiene?',
    opciones: [
      { text: 'Facial periférica izquierda.', why: 'Toda la hemicara, frente incluida, con signo de Bell.' },
      { text: 'Facial central derecha.', why: 'Respetaría la frente.' },
      { text: 'Lesión del V par.', why: 'El V es la sensibilidad y la masticación.' },
      { text: 'Lesión del III par.', why: 'Daría ptosis, no un ojo que no cierra.' },
    ],
    correcta: 0,
    razonamiento: 'Frente lisa + no cierra el ojo + Bell = lesión del núcleo o del nervio facial, del mismo lado.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'El diapasón suena del lado malo',
    texto: 'Paciente con hipoacusia del oído derecho después de una otitis. En el Weber oye más fuerte del lado derecho, y en el Rinne derecho oye mejor el diapasón apoyado en la mastoides que frente al oído.',
    pregunta: '¿Qué tipo de hipoacusia es?',
    opciones: [
      { text: 'De conducción.', why: 'Weber al oído enfermo y Rinne negativo.' },
      { text: 'De percepción.', why: 'El Weber iría al oído sano.' },
      { text: 'Mixta por definición.', why: 'No.' },
      { text: 'No hay hipoacusia.', why: 'Sí la hay.' },
    ],
    correcta: 0,
    razonamiento: 'En la conducción el oído interno está sano: capta la vía ósea mejor que la aérea.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'La lengua se va de lado',
    texto: 'Al sacar la lengua, la punta se desvía hacia la derecha; la mitad derecha está atrófica y con fasciculaciones.',
    pregunta: '¿Qué nervio está lesionado?',
    opciones: [
      { text: 'El XII derecho.', why: 'La lengua se desvía hacia el lado paralizado.' },
      { text: 'El XII izquierdo.', why: 'Se desviaría a la izquierda.' },
      { text: 'El IX derecho.', why: 'Es sensitivo de la lengua.' },
      { text: 'El X derecho.', why: 'Daría el signo de la cortina.' },
    ],
    correcta: 0,
    razonamiento: 'El geniogloso sano empuja la lengua hacia el lado débil.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'pc2',
        label: 'Pares craneales II',
        tone: 'gold',
        nota: 'V trigémino · VII facial · VIII · IX, X, XI y XII',
        hijos: [
          { id: 'v', label: 'V trigémino', tone: 'gold', nota: 'Masticación · sensibilidad de la cara (V1, V2, V3) · Gasser' },
          { id: 'vii', label: 'VII facial', tone: 'sky', examen: true, nota: '**Parálisis facial central y periférica** · Bell · gusto' },
          { id: 'viii', label: 'VIII', tone: 'lilac', examen: true, nota: '**Weber** · Rinne · conducción o percepción · ojos de muñeca' },
          { id: 'len', label: 'La lengua', tone: 'mint', examen: true, nota: '**V y VII** adelante · **IX** atrás · **XII** motor' },
          { id: 'baj', label: 'IX a XII', tone: 'peach', nota: 'Cortina · espinal · hipogloso' },
        ],
      },
    ],
    nexos: ['**Central respeta la frente; periférica, no.**', '**Weber: conducción al enfermo, percepción al sano.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['neu04-d01', 'neu04-d02', 'neu04-d03', 'neu04-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    trigemino: { tab: 'teoria', seccion: 'trigemino' },
    facial: { tab: 'teoria', seccion: 'facial' },
    vestibulococlear: { tab: 'teoria', seccion: 'vestibulococlear' },
    bajos: { tab: 'teoria', seccion: 'bajos' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
