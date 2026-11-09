import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * neu-05: clase visual de la motilidad y los síndromes motores.
 *  1. Clases de Ortega: «Síndromes del SN» partes 1 a 4 y la clase por Meet del 24/10 (síndromes neurológicos).
 *  2. Libro del profesor (p. 493: Parkinson; p. 505–506: síndrome cerebeloso).
 * Ver content/traceability/neu-05.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const S1 = (t: string) => r('sn-1', t);
const S2 = (t: string) => r('sn-2', t);
const S3 = (t: string) => r('sn-3', t);
const S4 = (t: string) => r('sn-4', t);
const MT = (t: string) => r('neu-meet-1024', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';
const BIBLIO = 'Precisión de la bibliografía, no se da así en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-via-piramidal',
    sec: 'piramidal',
    titulo: 'El camino de la vía piramidal',
    etapas: ['normal', 'mecanismo', 'signo'],
    fig: {
      f: 'motora',
      vistas: [
        { tone: 'sky', nota: 'Célula de Betz → cápsula interna → tronco', notaTone: 'sky' },
        { tone: 'sky', nota: 'En el bulbo cruza la mayoría (80–90 %)', notaTone: 'sky' },
        { tone: 'sky', nota: 'Asta anterior → nervio → músculo', notaTone: 'mint' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Nace en la **célula de Betz** de la corteza motora (frontal) y baja por la **cápsula interna**, el pedúnculo, la protuberancia y el bulbo.' },
          { k: 'mecanismo', text: 'En el bulbo, el **80–90 %** de las fibras **cruza** (decusación piramidal); el resto sigue del mismo lado.' },
          { k: 'signo', text: 'Hace sinapsis con la **2.ª motoneurona** del asta anterior, que llega al músculo por el nervio.' },
        ],
      },
    ],
    voz: [
      'La vía piramidal es la vía motora. Nace en la corteza motora, en la célula de Betz, y baja por la cápsula interna, el pedúnculo cerebral, la protuberancia y el bulbo.',
      'En el bulbo, la mayoría de sus fibras, un ochenta a noventa por ciento, se cruzan al otro lado: es la decusación piramidal. Por eso el hemisferio izquierdo maneja el lado derecho del cuerpo.',
      'Las fibras bajan por la médula y hacen sinapsis con la segunda motoneurona, en el asta anterior, que llega al músculo a través del nervio periférico.',
    ],
    refs: [S2('24:58'), S2('27:38'), S2('28:18'), MT('01:35'), MT('02:18')],
  },
  {
    id: 'f-espasticidad',
    sec: 'piramidal',
    titulo: 'Fláccida primero, espástica después',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'motora', vistas: [{ lesion: 'capsula', cuerpo: 'hemi', tone: 'sky', nota: 'Primer mes: hipotonía (fláccida)', notaTone: 'sky' }, { lesion: 'capsula', cuerpo: 'hemi', tone: 'sky', nota: 'Después: hipertonía (espástica)', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se corta la vía en la cápsula: **debilidad** del lado opuesto.' },
          { k: 'mecanismo', text: 'En el **primer mes** el lado paralizado está **hipotónico**: hemiplejía **fláccida**.' },
          { k: 'signo', text: 'Después se libera el reflejo: **espasticidad** (navaja), **hiperreflexia**, **Babinski**, clonus.' },
        ],
      },
    ],
    aclara: { text: 'La hipotonía inicial se atribuye al «shock» de la lesión; la espasticidad posterior, a la pérdida del control inhibidor de la vía sobre el arco reflejo.', origen: GRAL },
    voz: [
      'Si la vía piramidal se corta, por ejemplo en la cápsula interna, el síntoma principal es la debilidad, del lado opuesto.',
      'Al principio, en el primer mes, el lado paralizado está flojo, hipotónico: es una hemiplejía fláccida.',
      'Después el arco reflejo queda sin el control de arriba y aparece la espasticidad, con el signo de la navaja, los reflejos exaltados, el Babinski y el clonus: la hemiplejía espástica.',
    ],
    refs: [S1('28:33'), S1('29:13'), S2('01:32'), S2('29:39'), S3('02:13')],
  },
  {
    id: 'f-alterna',
    sec: 'alternas',
    titulo: 'Hemiplejía alterna: el par de un lado, el cuerpo del otro',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'motora',
      vistas: [
        { lesion: 'tronco', cuerpo: 'hemi', tone: 'sky', nota: 'Lesión en el tronco, antes de cruzar', notaTone: 'red' },
        { lesion: 'tronco', cuerpo: 'alterna-iii', tone: 'sky', nota: 'Weber: III del lado de la lesión', notaTone: 'red' },
        { lesion: 'tronco', cuerpo: 'alterna-vii', tone: 'sky', nota: 'Millard-Gubler: VII del lado de la lesión', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La lesión está en el **tronco**: la vía piramidal **todavía no cruzó** → hemiplejía del lado **opuesto**.' },
          { k: 'mecanismo', text: 'En el mismo lugar está el **núcleo de un par craneal**, que ya salió → se afecta del **mismo lado**.' },
          { k: 'signo', text: '**Weber** (mesencéfalo): III homolateral. **Millard-Gubler** (protuberancia): VII periférico homolateral.' },
        ],
      },
    ],
    voz: [
      'La hemiplejía alterna se entiende con el dibujo. La lesión está en el tronco encefálico, donde la vía piramidal todavía no se cruzó: por eso el brazo y la pierna se paralizan del lado opuesto.',
      'Pero en el mismo lugar del tronco está el núcleo de un par craneal, que no se cruza: ese par se paraliza del mismo lado de la lesión.',
      'Si la lesión es en el mesencéfalo, con el tercer par, es el síndrome de Weber. Si es en la protuberancia, con el séptimo, es el de Millard-Gubler.',
    ],
    refs: [S3('07:10'), S3('07:54'), S3('08:37'), S3('10:51'), S3('13:46'), S3('14:29')],
  },
  {
    id: 'f-parkinson',
    sec: 'extrapiramidal',
    titulo: 'Parkinson: se apaga la sustancia negra',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'nucleos',
      vistas: [
        { luz: ['caudado', 'putamen', 'negra'], dopamina: 'normal', tone: 'gold', nota: 'La sustancia negra manda dopamina al estriado', notaTone: 'gold' },
        { lesion: ['negra'], dopamina: 'baja', tone: 'lilac', nota: 'Cuerpos de Lewy: mueren sus neuronas', notaTone: 'red' },
        { lesion: ['negra'], luz: ['caudado', 'putamen'], dopamina: 'baja', tone: 'lilac', nota: 'Sin dopamina: bradicinesia, rigidez, temblor', notaTone: 'lilac' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se acumulan **α-sinucleína** y **cuerpos de Lewy** en la **sustancia negra** (pars compacta).' },
          { k: 'mecanismo', text: 'Mueren sus neuronas: falta **dopamina** en el estriado y predomina la **acetilcolina**.' },
          { k: 'signo', text: 'Cuesta **iniciar** el movimiento: **bradicinesia**, **rigidez** en rueda dentada y **temblor de reposo**.' },
        ],
      },
    ],
    voz: [
      'La enfermedad de Parkinson es neurodegenerativa y de causa desconocida. En las neuronas de la sustancia negra se acumulan la alfa-sinucleína y los cuerpos de Lewy.',
      'Esas neuronas mueren, y el cuerpo estriado se queda sin dopamina; la acetilcolina queda en exceso.',
      'La dopamina es la que facilita iniciar el movimiento voluntario: sin ella aparecen la lentitud, la bradicinesia; la rigidez en rueda dentada; y el temblor de reposo.',
    ],
    refs: [S3('26:34'), S3('28:01'), S3('29:25'), S3('30:08'), MT('01:02:37'), L('p493')],
  },
  {
    id: 'f-cerebelo',
    sec: 'cerebeloso',
    titulo: 'Qué hace el cerebelo, y qué pasa sin él',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'encefalo', vistas: [{ luz: ['cerebelo'], vias: ['cerebelo'], tone: 'peach', nota: 'El cerebelo mide y coordina', notaTone: 'peach' }, { lesion: ['cerebelo'], tone: 'peach', nota: 'Lesión: dismetría, asinergia, adiadococinesia', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Eumetría', tono: 'peach', text: 'Medir el movimiento: sin ella, **dismetría** (se pasa o no llega).' },
      { t: 'def', term: 'Isostenia', tono: 'peach', en: 0, text: 'La fuerza justa.' },
      { t: 'def', term: 'Sinergia', tono: 'gold', en: 1, text: 'Agonistas y antagonistas juntos: sin ella, **asinergia**.' },
      { t: 'def', term: 'Diadococinesia', tono: 'gold', en: 1, text: 'Movimientos alternantes rápidos: sin ella, **adiadococinesia**.' },
      { t: 'def', term: 'Tono', tono: 'sky', en: 1, text: 'Lo regula: la lesión da **hipotonía**.' },
    ],
    voz: [
      'El cerebelo coordina. Sus funciones normales: la eumetría, medir exactamente el movimiento; la isostenia, usar la fuerza justa; la sinergia, que agonistas y antagonistas trabajen juntos; la diadococinesia, hacer movimientos alternantes rápidos; y regular el tono.',
      'Cuando se lesiona, aparece lo contrario: la dismetría, el paciente se pasa o no llega; la asinergia; la adiadococinesia; y la hipotonía. Una docente preguntó exactamente eso: cuáles son las funciones normales del cerebelo.',
    ],
    refs: [S4('15:37'), S4('16:18'), S4('16:59'), L('p505')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'piramidal', label: 'La vía piramidal' },
    { id: 'alternas', label: 'Hemiplejía alterna' },
    { id: 'extrapiramidal', label: 'Parkinson' },
    { id: 'cerebeloso', label: 'El cerebelo' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-ataxia',
    sec: 'equilibrio',
    titulo: 'Trastorno del equilibrio: tres síndromes',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Ante un trastorno del equilibrio (**ataxia**), pensar en tres: **vestibular**, **cerebeloso** y **cordonal posterior**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['', 'Vestibular', 'Cerebeloso', 'Cordonal posterior'],
        filas: [
          ['Marcha', '**En estrella** (Babinski)', '**De ebrio**', '**Taloneante**, mirando los pies'],
          ['Vértigo', 'Sí (**periférico**)', 'Sí (**central**)', '**No**'],
          ['Nistagmo', 'Horizontal', 'Vertical o rotatorio', 'No'],
          ['Romberg', '**Positivo**', '**Negativo**', '**Positivo**'],
          ['Lo propio', '—', '**Hipotonía**', 'Pierde la **sensibilidad profunda**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'El síndrome cordonal posterior y los trastornos del equilibrio.', cita: 'Pregunta de final: [a una docente] le gusta preguntar «hablame sobre el síndrome cordonal posterior».', ref: S1('03:28') },
    voz: [
      'Ante un paciente con trastorno del equilibrio, la palabra que tiene que aparecer es ataxia, y hay que pensar en tres síndromes: el vestibular, el cerebeloso y el cordonal posterior de Goll y Burdach.',
      'El vestibular camina en estrella, tiene vértigo periférico, nistagmo horizontal y Romberg positivo. El cerebeloso camina como un ebrio, tiene vértigo central, nistagmo vertical o rotatorio, Romberg negativo e hipotonía. El cordonal posterior camina taloneando y mirándose los pies, no tiene vértigo ni nistagmo, su Romberg es positivo, y pierde la sensibilidad profunda.',
    ],
    refs: [S1('02:48'), S1('04:09'), S1('09:54'), S1('10:36'), S1('12:24'), S1('13:47'), S1('14:28'), S1('15:53'), S1('17:20'), S1('18:00')],
  },
  {
    id: 't-piramidal',
    sec: 'piramidal',
    titulo: 'Síndrome piramidal',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Signos y síntomas por lesión de la **vía piramidal**; el síntoma cardinal es la **debilidad muscular**.' },
      { t: 'lista', en: 1, items: ['**1.ª motoneurona** (síndrome piramidal propiamente dicho): célula de Betz y su vía.', '**2.ª motoneurona**: asta anterior y nervio.', 'Causas: congénitas (parálisis cerebral infantil) o adquiridas: **vasculares** (ACV), traumatismos, tumores.'] },
      { t: 'def', term: 'Nomenclatura', tono: 'sky', en: 2, text: '**Paresia**: menos fuerza. **Plejía**: sin fuerza. Mono, hemi, para, cuadri.' },
    ],
    examen: { origen: 'ortega', texto: 'El examen físico del paciente con síndrome piramidal.', cita: 'Todo eso es pregunta de examen… Si yo le pregunto el examen físico de un paciente que tiene un síndrome piramidal, me tienen que decir todo eso.', ref: MT('13:57') },
    voz: [
      'El síndrome piramidal es el conjunto de signos y síntomas que aparecen por una lesión de la vía piramidal, y el síntoma cardinal es la debilidad muscular. Puede ser de la primera motoneurona, el síndrome piramidal propiamente dicho, o de la segunda.',
      'Sus causas pueden ser congénitas, como la parálisis cerebral infantil, o adquiridas, sobre todo vasculares, como el accidente cerebrovascular, los traumatismos o los tumores. Paresia es menos fuerza; plejía, ninguna; y según dónde, monoplejía, hemiplejía, paraplejía o cuadriplejía.',
    ],
    refs: [S1('24:12'), S1('26:25'), S1('27:09'), S2('24:58'), S2('26:18'), MT('00:52')],
  },
  {
    id: 't-piramidal-signos',
    sec: 'piramidal',
    titulo: 'Qué se encuentra al examen',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Qué se explora', 'Síndrome piramidal (1.ª motoneurona)'],
        filas: [
          ['Fuerza', '**Paresia o plejía contralateral** (si la lesión está arriba del bulbo)'],
          ['Tono', '**Espasticidad** con signo de la **navaja** (hipotonía el primer mes)'],
          ['Trofismo', 'Sin atrofia (solo por desuso)'],
          ['Reflejos profundos', '**Hiperreflexia**'],
          ['Reflejos superficiales', '**Abolición** de los cutaneoabdominales y el cremasteriano'],
          ['Patológicos', '**Babinski** (y Oppenheim, Gordon, Schaeffer), **clonus**'],
          ['Movimientos asociados', '**Sincinesias**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los signos del síndrome piramidal.', cita: 'El síndrome piramidal… es pregunta de examen.', ref: MT('21:12') },
    voz: [
      'Al examen: la fuerza está disminuida o ausente, del lado opuesto si la lesión está por arriba del bulbo. El tono está aumentado, con espasticidad y el signo de la navaja, aunque el primer mes hay hipotonía. No hay atrofia, salvo por desuso.',
      'Los reflejos profundos están exaltados, y los superficiales, los cutaneoabdominales y el cremasteriano, abolidos. Aparecen el signo de Babinski y sus sucedáneos, Oppenheim, Gordon y Schaeffer, el clonus, y las sincinesias.',
    ],
    refs: [S2('28:59'), S2('29:39'), S2('30:19'), S2('31:01'), S2('31:41'), MT('25:39')],
  },
  {
    id: 't-navaja',
    sec: 'piramidal',
    titulo: 'Navaja o rueda dentada',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Espasticidad (piramidal)', tono: 'sky', items: ['Signo de la **navaja**: resiste y de golpe cede', 'Hiperreflexia, Babinski'] },
          { titulo: 'Rigidez (extrapiramidal)', tono: 'lilac', items: ['Signo de la **rueda dentada**: cede a saltos', 'Reflejos normales, sin Babinski'] },
        ],
      },
    ],
    voz: [
      'Hay dos síndromes con hipertonía, y se distinguen al estirar el codo. En el piramidal, la espasticidad tiene el signo de la navaja: el brazo resiste y de golpe cede, como una navaja que se cierra.',
      'En el extrapiramidal, el Parkinson, la rigidez tiene el signo de la rueda dentada: cede a saltos, tac, tac, tac, como un engranaje. Y en el Parkinson los reflejos son normales.',
    ],
    refs: [S2('14:39'), S2('15:19'), S4('02:47')],
  },
  {
    id: 't-hemiplejias',
    sec: 'piramidal',
    titulo: 'Hemiplejía fláccida y espástica',
    fig: { f: 'motora', vistas: [{ lesion: 'capsula', cuerpo: 'hemi', tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Fláccida', tono: 'sky', text: 'El primer mes: **hipotonía**; signo de **Revilliod**.' },
      { t: 'def', term: 'Espástica', tono: 'red', en: 1, text: 'La más característica: brazo pegado al cuerpo, marcha **en guadaña** (del segador); hiperreflexia, Babinski, clonus, sincinesias; **parálisis facial central**.' },
      { t: 'def', term: 'En el coma', tono: 'lilac', en: 2, text: 'Cabeza y ojos **mirando hacia el lado de la lesión**; signo de la **pipa**.' },
    ],
    examen: { origen: 'ortega', texto: 'La hemiplejía espástica.', cita: 'El más común y el más característico, y el que le van a preguntar a ustedes en los exámenes… es la hemiplejía espástica.', ref: MT('27:11') },
    voz: [
      'La hemiplejía puede ser fláccida, el primer mes, con hipotonía. La que se pregunta en los exámenes es la espástica: el brazo pegado al cuerpo, la marcha en guadaña, o del segador, la hiperreflexia, el Babinski, el clonus, las sincinesias y la parálisis facial central del mismo lado del cuerpo.',
      'Y el paciente en coma con una hemiplejía tiene la cabeza y los ojos desviados, mirando hacia el lado de la lesión, y el signo del fumador de pipa.',
    ],
    refs: [S2('33:01'), S2('33:41'), S3('00:00'), S3('02:13'), S3('02:53'), MT('27:11')],
  },
  {
    id: 't-topografia',
    sec: 'alternas',
    titulo: 'Dónde está la lesión',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Hemiplejía directa', tono: 'sky', text: 'Brazo, pierna **y cara** del mismo lado (opuesto a la lesión): cortical, **capsular**, talámica. La más frecuente: la **cápsula interna**.' },
      { t: 'def', term: 'Hemiplejía alterna', tono: 'red', en: 1, text: 'Lesión del **tronco**: un **par craneal del lado de la lesión** y el cuerpo del lado opuesto.' },
      { t: 'def', term: 'Paraplejía y cuadriplejía', tono: 'gold', en: 2, text: 'Lesión **medular**: alta (cervical) da cuadriplejía; por debajo de D2, paraplejía.' },
    ],
    examen: { origen: 'ortega', texto: 'La topografía del síndrome piramidal.', cita: 'Esta pregunta es de final… le van a decir dónde es lo más frecuente que se lesione en un paciente que tiene un síndrome piramidal: en la cápsula interna.', ref: S3('04:21') },
    voz: [
      'La topografía, pregunta de final. La hemiplejía directa toma el brazo, la pierna y la cara del mismo lado, opuesto a la lesión, y la lesión puede ser cortical, capsular o talámica. La más frecuente es la de la cápsula interna.',
      'La hemiplejía alterna es la de la lesión del tronco: un par craneal del lado de la lesión y el cuerpo del lado opuesto. Y la lesión medular da cuadriplejía si es alta, cervical, o paraplejía si es por debajo de la segunda dorsal.',
    ],
    refs: [S3('04:21'), S3('05:02'), S3('05:44'), S3('06:28'), S3('15:10'), S3('15:53')],
  },
  {
    id: 't-weber',
    sec: 'alternas',
    titulo: 'Weber y Millard-Gubler',
    fig: { f: 'tronco-pares', vistas: [{ luz: [3], nivel: ['mesencefalo'], tone: 'red', nota: 'Weber: mesencéfalo + III' }, { luz: [6, 7], nivel: ['protuberancia'], tone: 'red', nota: 'Millard-Gubler: protuberancia + VI y VII' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Weber', tono: 'red', text: '**Mesencéfalo**: parálisis del **III del lado de la lesión** (ojo afuera y abajo, ptosis) + hemiplejía **contralateral**.' },
      { t: 'def', term: 'Millard-Gubler', tono: 'peach', en: 1, text: '**Protuberancia**: parálisis facial **periférica** (y del VI) **del lado de la lesión** + hemiplejía **contralateral**.' },
    ],
    examen: { origen: 'ortega', texto: 'Las hemiplejías alternas.', cita: 'Si es hemiplejía alterna o síndrome piramidal alterno, significa que la lesión de la vía piramidal está en el tronco encefálico. No se olviden, porque es pregunta de examen.', ref: MT('33:12') },
    aclara: { text: 'El Millard-Gubler clásico incluye el VI par además del VII.', origen: BIBLIO },
    voz: [
      'Las dos hemiplejías alternas que se preguntan. El síndrome de Weber: lesión del mesencéfalo, con parálisis del tercer par del mismo lado, ojo afuera y abajo con ptosis, y hemiplejía del lado opuesto.',
      'Y el de Millard-Gubler: lesión de la protuberancia, con parálisis facial periférica, y también del sexto par, del mismo lado, y hemiplejía del lado opuesto.',
    ],
    refs: [S3('07:10'), S3('09:24'), S3('10:51'), S3('12:15'), S3('12:55'), S3('13:46'), S3('14:29'), MT('33:12')],
  },
  {
    id: 't-segunda',
    sec: 'segunda',
    titulo: 'Segunda motoneurona: la triple A',
    fig: { f: 'motora', vistas: [{ lesion: 'asta', tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'mint', text: '**Atonía, arreflexia, atrofia**: la triple A. Más **fasciculaciones**.' },
      { t: 'texto', en: 1, text: 'Lesión del **asta anterior** (célula alfa) o del **nervio**. Parálisis **fláccida**, sin Babinski.' },
    ],
    examen: { origen: 'ortega', texto: 'La diferencia entre la primera y la segunda motoneurona.', cita: 'La pregunta que siempre hacen en los finales es cuál es la diferencia entre el síndrome piramidal de la primera motoneurona y de la segunda motoneurona.', ref: S3('16:34') },
    voz: [
      'La pregunta de siempre en los finales: la diferencia entre la primera y la segunda motoneurona. La segunda motoneurona tiene la triple A: atonía, arreflexia y atrofia, y además fasciculaciones.',
      'La lesión está en el asta anterior de la médula o en el nervio, y la parálisis es fláccida, sin Babinski.',
    ],
    refs: [S1('30:37'), S3('16:34'), S3('17:16'), S3('17:57'), MT('01:30:24')],
  },
  {
    id: 't-mononeuropatias',
    sec: 'segunda',
    titulo: 'Las manos y el pie caído',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Nervio', 'Qué se ve'],
        filas: [
          ['**Radial**', '**Mano caída** (no extiende la muñeca)'],
          ['**Mediano**', '**Mano del predicador** (no flexiona índice y pulgar)'],
          ['**Cubital**', '**Mano en garra**'],
          ['**Ciático poplíteo externo**', 'Pie caído: **marcha en steppage** (diabetes, alcohol, Guillain-Barré)'],
        ],
      },
      { t: 'texto', en: 1, text: 'La facies de **Claude Bernard-Horner** (ptosis, miosis, enoftalmos) indica lesión de la vía **simpática** cervical.' },
    ],
    examen: { origen: 'ortega', texto: 'Las mononeuropatías de la mano y el Claude Bernard-Horner.', cita: 'El síndrome de Claude Bernard-Horner esto sí pregunto yo, la facies sobre todo.', ref: MT('53:06') },
    voz: [
      'Las mononeuropatías que preguntan los profesores. La lesión del radial da la mano caída, porque no puede extender la muñeca. La del mediano, la mano del predicador, porque no flexiona el índice ni el pulgar. La del cubital, la mano en garra. Y la del ciático poplíteo externo, el pie caído, con la marcha en steppage, típica de la neuropatía diabética, alcohólica y del Guillain-Barré.',
      'Y una facies que el profesor sí pregunta: la de Claude Bernard-Horner, con ptosis, miosis y enoftalmos, por lesión de la vía simpática cervical.',
    ],
    refs: [S3('18:40'), S3('19:22'), S3('20:05'), S3('20:48'), S3('21:33'), MT('52:42'), MT('53:06')],
  },
  {
    id: 't-extrapiramidal',
    sec: 'extrapiramidal',
    titulo: 'Síndrome extrapiramidal',
    fig: { f: 'nucleos', vistas: [{ luz: ['caudado', 'putamen', 'palido', 'subtalamico', 'negra'], tone: 'lilac' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Lesión de los **núcleos de la base**: caudado, lenticular (putamen y pálido), subtalámico de Luys, sustancia negra.' },
      { t: 'lista', en: 1, items: ['**Hipertonía** (rigidez) y **movimientos involuntarios**.', 'Pierde los movimientos **automáticos y asociados**: la mímica, el balanceo de los brazos.', 'El más frecuente: el **Parkinson**.'] },
    ],
    examen: { origen: 'ortega', texto: 'La clínica del síndrome extrapiramidal.', cita: 'Lo más importante y lo que suelen preguntar siempre en el final es la clínica.', ref: S4('00:01') },
    voz: [
      'El síndrome extrapiramidal es la lesión de los núcleos de la base: el caudado, el núcleo lenticular, formado por el putamen y el pálido, el subtalámico de Luys y la sustancia negra. Lo que se pregunta siempre en el final es su clínica.',
      'Tiene hipertonía, una rigidez, y movimientos involuntarios; y el paciente pierde los movimientos automáticos y asociados, como la mímica y el balanceo de los brazos al caminar. El más frecuente es el Parkinson.',
    ],
    refs: [S3('22:25'), S3('23:08'), S3('23:49'), S3('24:31'), S3('25:12'), S4('00:01')],
  },
  {
    id: 't-triada-parkinson',
    sec: 'extrapiramidal',
    titulo: 'La tríada del Parkinson',
    fig: { f: 'nucleos', vistas: [{ lesion: ['negra'], dopamina: 'baja', tone: 'lilac' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'lista', items: ['**Bradicinesia**: lentitud y dificultad para iniciar el movimiento.', '**Rigidez** con signo de la **rueda dentada**.', '**Temblor de reposo**, lento y grosero.'] },
      { t: 'texto', en: 0, text: 'Núcleo lesionado: la **sustancia negra** (pars compacta), por cuerpos de Lewy.' },
    ],
    examen: { origen: 'ortega', texto: 'La tríada del Parkinson y el núcleo lesionado.', cita: 'Siempre yo le pregunto cuál es la tríada de Parkinson… y eso es pregunta de examen: no me saben tríadas del Parkinson, es para bochazo.', ref: MT('01:07:15') },
    voz: [
      'Lo que el profesor pregunta siempre: la tríada del Parkinson. Bradicinesia, la lentitud y la dificultad para iniciar el movimiento; rigidez, con el signo de la rueda dentada; y temblor de reposo, lento y grosero. No saberla es para bochazo.',
      'Y la otra pregunta: qué núcleo está lesionado. La sustancia negra, en su porción compacta, por la acumulación de cuerpos de Lewy.',
    ],
    refs: [MT('01:02:37'), MT('01:07:15'), MT('01:07:43'), S3('28:01')],
  },
  {
    id: 't-parkinson-clinica',
    sec: 'extrapiramidal',
    titulo: 'Cómo se ve un parkinsoniano',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['Facies **inexpresiva** («de jugador de póker», «en pomada»).', 'Marcha a **pequeños pasos**, gira **en bloque**; **retropulsión** (maniobra del empujón).', '**Micrografía**; el espiral sale temblado.', 'Reflejo glabelar que **no se agota**; reflejos osteotendinosos **normales**.', 'Alteraciones vegetativas: seborrea, sialorrea, sudoración; **hiposmia**.'] },
      { t: 'def', term: 'Parkinsonismo', tono: 'gold', en: 1, text: 'El mismo cuadro con **causa conocida**, sobre todo **fármacos** (antipsicóticos) e intoxicaciones (manganeso, monóxido de carbono); a diferencia del Parkinson, puede ser **reversible**.' },
    ],
    aclara: { text: 'La seborrea, la sialorrea y la hipotensión ortostática son parte de la disautonomía del Parkinson; no se explican por la acetilcolina del estriado.', origen: GRAL },
    voz: [
      'El paciente parkinsoniano tiene la cara inexpresiva, de jugador de póker. Camina a pequeños pasos, gira en bloque, y si se lo empuja levemente tiende a caerse hacia atrás. Escribe cada vez más chico, la micrografía, y el espiral le sale temblado.',
      'El reflejo glabelar no se agota: parpadea una y otra vez. Los reflejos osteotendinosos son normales. Tiene seborrea, sialorrea, sudoración, y suele perder el olfato.',
      'El parkinsonismo es el mismo cuadro, pero con una causa conocida, sobre todo fármacos, como los antipsicóticos, o intoxicaciones, como el manganeso o el monóxido de carbono. A diferencia del Parkinson, puede revertir.',
    ],
    refs: [S4('03:31'), S4('04:12'), S4('07:02'), S4('07:44'), S4('08:27'), S4('09:56'), S4('10:39'), S4('11:19'), S4('12:43'), S4('13:29')],
  },
  {
    id: 't-cerebeloso',
    sec: 'cerebeloso',
    titulo: 'Síndrome cerebeloso',
    fig: { f: 'encefalo', vistas: [{ lesion: ['cerebelo'], tone: 'peach' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Tríada', tono: 'red', text: '**Vértigo central**, **cefalea** holocraneana y **vómitos** (en chorro).' },
      { t: 'def', term: 'Causas', tono: 'gold', en: 0, text: 'Sobre todo **hemorragias** y **tumores**.' },
      { t: 'def', term: 'Estático', tono: 'peach', en: 1, text: 'Ataxia con **Romberg negativo**, **temblor de actitud**, **hipotonía**.' },
      { t: 'def', term: 'Cinético', tono: 'lilac', en: 2, text: '**Dismetría**, **asinergia**, **adiadococinesia**, temblor **intencional**, marcha de **ebrio**, **nistagmo**.' },
    ],
    examen: { origen: 'ortega', texto: 'La tríada y la semiología del síndrome cerebeloso.', cita: 'Pregunta de examen: tríadas del síndrome cerebeloso… vértigo de tipo central, cefalea holocraneana y vómitos.', ref: MT('01:17:55') },
    voz: [
      'El síndrome cerebeloso. Su tríada, pregunta de examen: vértigo central, cefalea holocraneana y vómitos en chorro. Las causas más frecuentes son las hemorragias y los tumores.',
      'En la posición, el paciente es atáxico, con la base de sustentación amplia, pero no se cae al cerrar los ojos: Romberg negativo. Tiene temblor de actitud, desviaciones al caminar e hipotonía.',
      'En el movimiento: dismetría en la prueba índice-nariz y talón-rodilla, asinergia, adiadococinesia, temblor intencional, marcha de ebrio, letra grande o megalografía, palabra escandida y nistagmo.',
    ],
    refs: [S4('14:55'), S4('17:40'), S4('18:21'), S4('19:01'), S4('19:43'), S4('20:24'), S4('21:05'), S4('25:09'), S4('25:50'), MT('01:17:55'), MT('01:19:07'), L('p505')],
  },
  {
    id: 't-cordonal',
    sec: 'cerebeloso',
    titulo: 'Síndrome cordonal posterior',
    fig: { f: 'encefalo', vistas: [{ lesion: ['medula'], etiquetas: ['parietal'], vias: ['sensitiva'], tone: 'lilac' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'lilac', text: 'Lesión de los **cordones posteriores de Goll y Burdach**: se pierde la **sensibilidad profunda**.' },
      { t: 'lista', en: 1, items: ['Pierde la **palestesia** (vibración), la **batiestesia** (posición) y la **barestesia** (presión).', '**Ataxia** con **Romberg positivo**: la vista compensa.', 'Marcha **taloneante**, mirando los pies; **sin vértigo**.'] },
    ],
    voz: [
      'El síndrome cordonal posterior es la lesión de los cordones posteriores de Goll y Burdach: el paciente pierde la sensibilidad profunda, la vibración, la posición y la presión.',
      'Por eso es atáxico, pero la vista lo compensa: con los ojos cerrados se cae, Romberg positivo. Camina taloneando y mirándose los pies, y no tiene vértigo.',
    ],
    refs: [S1('03:28'), S4('25:50'), S4('26:30')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'equilibrio', label: 'Equilibrio' },
    { id: 'piramidal', label: 'Piramidal' },
    { id: 'alternas', label: 'Topografía' },
    { id: 'segunda', label: '2.ª motoneurona' },
    { id: 'extrapiramidal', label: 'Extrapiramidal' },
    { id: 'cerebeloso', label: 'Cerebeloso y cordonal' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Un ojo y el otro lado del cuerpo',
    texto: 'Paciente con un infarto del tronco: el ojo izquierdo está desviado hacia afuera y hacia abajo, con ptosis y midriasis, y el brazo y la pierna derechos están paralizados, con hiperreflexia y Babinski.',
    pregunta: '¿Dónde está la lesión y cómo se llama el síndrome?',
    opciones: [
      { text: 'Mesencéfalo izquierdo: síndrome de Weber.', why: 'III homolateral + hemiplejía contralateral.' },
      { text: 'Protuberancia izquierda: Millard-Gubler.', why: 'Daría parálisis facial periférica, no del III.' },
      { text: 'Cápsula interna derecha.', why: 'La hemiplejía sería izquierda y sin par craneal homolateral.' },
      { text: 'Médula cervical.', why: 'No afecta el III.' },
    ],
    correcta: 0,
    razonamiento: 'Par craneal del lado de la lesión y cuerpo del lado opuesto: hemiplejía alterna; con el III, es mesencefálica.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Lento, rígido y tembloroso',
    texto: 'Hombre de 68 años que tarda en abotonarse la camisa, camina a pequeños pasos y gira en bloque. Al estirarle el codo, cede a saltos. Tiene temblor de la mano en reposo que se va al tomar el vaso. Los reflejos son normales.',
    pregunta: '¿Qué síndrome es y qué núcleo está lesionado?',
    opciones: [
      { text: 'Extrapiramidal (Parkinson): sustancia negra.', why: 'Bradicinesia, rigidez en rueda dentada y temblor de reposo.' },
      { text: 'Piramidal: cápsula interna.', why: 'Daría espasticidad en navaja e hiperreflexia.' },
      { text: 'Cerebeloso.', why: 'El temblor sería intencional.' },
      { text: 'Hemibalismo: núcleo de Luys.', why: 'Son movimientos amplios de lanzamiento.' },
    ],
    correcta: 0,
    razonamiento: 'La tríada del Parkinson orienta a la sustancia negra.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Camina como un ebrio y no se cae',
    texto: 'Paciente con cefalea holocraneana, vómitos en chorro y vértigo. Camina con la base amplia y se desvía a los costados; con los pies juntos y los ojos cerrados no se cae. En la prueba índice-nariz se pasa del objetivo.',
    pregunta: '¿Qué síndrome es?',
    opciones: [
      { text: 'Cerebeloso.', why: 'Tríada, ataxia con Romberg negativo y dismetría.' },
      { text: 'Cordonal posterior.', why: 'El Romberg sería positivo y no tendría vértigo.' },
      { text: 'Vestibular periférico.', why: 'El Romberg sería positivo.' },
      { text: 'Piramidal.', why: 'Daría debilidad e hiperreflexia.' },
    ],
    correcta: 0,
    razonamiento: 'Romberg negativo con ataxia y dismetría: cerebelo.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'mot',
        label: 'Síndromes motores',
        tone: 'sky',
        nota: 'Debilidad · hipertonía · movimientos involuntarios · ataxia',
        hijos: [
          { id: 'pir', label: 'Piramidal', tone: 'sky', examen: true, nota: 'Debilidad contralateral · **espasticidad** · hiperreflexia · **Babinski** · cápsula interna' },
          { id: 'alt', label: 'Alternas', tone: 'red', examen: true, nota: '**Weber** (III) · **Millard-Gubler** (VII)' },
          { id: 'seg', label: '2.ª motoneurona', tone: 'mint', examen: true, nota: 'Triple A + fasciculaciones' },
          { id: 'ext', label: 'Extrapiramidal', tone: 'lilac', examen: true, nota: '**Tríada del Parkinson** · sustancia negra · rueda dentada' },
          { id: 'cer', label: 'Cerebeloso', tone: 'peach', examen: true, nota: '**Tríada** · dismetría · **Romberg negativo**' },
        ],
      },
    ],
    nexos: ['**Navaja = piramidal; rueda dentada = Parkinson.**', '**Romberg negativo: solo el cerebeloso.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['neu05-d01', 'neu05-d02', 'neu05-d03', 'neu05-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    equilibrio: { tab: 'teoria', seccion: 'equilibrio' },
    piramidal: { tab: 'teoria', seccion: 'piramidal' },
    alternas: { tab: 'teoria', seccion: 'alternas' },
    segunda: { tab: 'teoria', seccion: 'segunda' },
    extrapiramidal: { tab: 'teoria', seccion: 'extrapiramidal' },
    cerebeloso: { tab: 'teoria', seccion: 'cerebeloso' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
