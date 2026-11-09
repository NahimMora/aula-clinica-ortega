import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * neu-02: clase visual de los motivos de consulta neurológicos II.
 *  1. Clases de Ortega: «MC Neurología parte 3» (00:00–36:38) y «parte 4» (00:01–30:15).
 *  2. Libro del profesor (p. 508: causas de polineuropatía).
 * Ver content/traceability/neu-02.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M3 = (t: string) => r('mc-neu-3', t);
const M4 = (t: string) => r('mc-neu-4', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';
const BIBLIO = 'Precisión de la bibliografía, no se da así en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-nucleos',
    sec: 'movimientos',
    titulo: 'Dopamina contra acetilcolina',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: {
      f: 'nucleos',
      vistas: [
        { luz: ['caudado', 'putamen', 'negra'], dopamina: 'normal', tone: 'gold', nota: 'Equilibrio: dopamina y acetilcolina', notaTone: 'gold' },
        { lesion: ['negra'], luz: ['caudado', 'putamen'], dopamina: 'baja', tone: 'lilac', nota: 'Parkinson: falta dopamina → hipocinesia', notaTone: 'lilac' },
        { lesion: ['caudado', 'putamen'], tone: 'red', nota: 'Corea: faltan acetilcolina y GABA → hipercinesia', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: 'Los **núcleos de la base** regulan el tono y los movimientos con un equilibrio de **dopamina**, **acetilcolina** y **GABA**.' },
          { k: 'alteracion', text: '**Parkinson**: la sustancia negra deja de mandar dopamina; sobra acetilcolina → **pocos movimientos** (hipocinesia).' },
          { k: 'signo', text: '**Corea**: en el cuerpo estriado bajan la acetilcolina y el GABA; la dopamina queda en exceso → **movimientos de más**.' },
        ],
      },
    ],
    voz: [
      'Los movimientos involuntarios anormales salen de una alteración de los núcleos de la base, en la profundidad del cerebro. Estos núcleos regulan el tono y los movimientos con un equilibrio de neurotransmisores: la dopamina, la acetilcolina y el GABA.',
      'En el Parkinson, la sustancia negra deja de mandar dopamina al cuerpo estriado, y la acetilcolina queda en exceso. El resultado son pocos movimientos, y lentos: la hipocinesia.',
      'En la corea pasa lo contrario: en el cuerpo estriado bajan la acetilcolina y el GABA, la dopamina queda en exceso, y aparecen movimientos de más. Por eso un paciente que toma mucha levodopa puede hacer una corea.',
    ],
    refs: [M3('00:43'), M3('01:24'), M3('11:12'), M3('11:52'), M3('13:57')],
  },
  {
    id: 'f-motoneurona',
    sec: 'debilidad',
    titulo: 'Primera o segunda motoneurona',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'motora',
      vistas: [
        { lesion: 'capsula', cuerpo: 'hemi', tone: 'sky', nota: '1.ª motoneurona: espástica', notaTone: 'sky' },
        { lesion: 'asta', cuerpo: 'ninguno', tone: 'sky', nota: '2.ª motoneurona: fláccida', notaTone: 'mint' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: '1.ª motoneurona', tono: 'sky', text: 'La segunda queda **sin el freno de arriba**: hipertonía, **hiperreflexia**, **Babinski**; parálisis **espástica**.' },
      { t: 'def', term: '2.ª motoneurona', tono: 'mint', en: 1, text: 'El músculo queda **sin nervio**: hipotonía, **arreflexia**, **atrofia** y **fasciculaciones**; parálisis **fláccida**.' },
    ],
    aclara: { text: 'El porqué (la vía piramidal frena el arco reflejo; el músculo sin nervio se atrofia) es fisiología general; los signos de cada una los da la clase.', origen: GRAL },
    voz: [
      'La debilidad depende de dónde está la lesión. Si se lesiona la primera motoneurona, la de la vía piramidal, la segunda motoneurona sigue viva pero pierde el control de arriba: el reflejo queda suelto. Hay hipertonía, los reflejos están exaltados, aparece el Babinski, y la parálisis es espástica.',
      'Si se lesiona la segunda motoneurona, en el asta anterior o en el nervio, el músculo se queda sin nervio. Hay hipotonía, los reflejos desaparecen, el músculo se atrofia y aparecen fasciculaciones. La parálisis es fláccida.',
    ],
    refs: [M3('23:08'), M3('23:55'), M3('25:20'), M3('26:00')],
  },
  {
    id: 'f-guillain',
    sec: 'snp',
    titulo: 'Guillain-Barré: el sistema inmune ataca la mielina',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'motora',
      vistas: [
        { lesion: 'nervio', cuerpo: 'ninguno', tone: 'sky', nota: 'Infección previa → anticuerpos contra la mielina', notaTone: 'red' },
        { lesion: 'nervio', cuerpo: 'ascendente', tone: 'sky', nota: 'Parálisis ascendente', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Días después de una **infección** respiratoria o intestinal, el sistema inmune ataca la **mielina** de los nervios periféricos.' },
          { k: 'mecanismo', text: 'Sin mielina el impulso no conduce: debilidad que **asciende** desde las piernas.' },
          { k: 'signo', text: '**Arreflexia**, hipotonía; pares craneales (el **facial**); riesgo de **insuficiencia respiratoria**.' },
        ],
      },
    ],
    voz: [
      'El síndrome de Guillain-Barré es una polirradiculoneuropatía. Pocos días después de una infección respiratoria o una gastroenteritis, el propio sistema inmune ataca la vaina de mielina de los nervios periféricos.',
      'Sin mielina el impulso no conduce bien. Empiezan parestesias, dolor y pérdida de fuerza en las piernas, que va subiendo, hasta poder afectar los cuatro miembros: es una parálisis ascendente.',
      'Los reflejos desaparecen, hay hipotonía, pueden afectarse los pares craneales, sobre todo el facial, y si llega a los músculos respiratorios, el paciente puede hacer una insuficiencia respiratoria.',
    ],
    refs: [M3('31:01'), M3('31:46'), M3('32:28'), M3('33:10')],
  },
  {
    id: 'f-miastenia',
    sec: 'snp',
    titulo: 'Miastenia gravis: la placa no recibe el mensaje',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: {
      f: 'motora',
      vistas: [
        { lesion: 'placa', cuerpo: 'ninguno', tone: 'sky', nota: 'Anticuerpos contra el receptor de acetilcolina', notaTone: 'red' },
        { lesion: 'placa', cuerpo: 'ocular', tone: 'sky', nota: 'Ptosis de los dos párpados', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Anticuerpos** destruyen el **receptor nicotínico** de la placa neuromuscular.' },
          { k: 'mecanismo', text: 'La **acetilcolina** se libera pero no encuentra dónde unirse.' },
          { k: 'signo', text: 'El músculo se **fatiga**: **ptosis bilateral**, debilidad que empeora con el uso.' },
        ],
      },
    ],
    voz: [
      'La miastenia gravis es una enfermedad de la placa neuromuscular. Hay anticuerpos que destruyen el receptor nicotínico donde se une la acetilcolina.',
      'El nervio libera la acetilcolina, pero no encuentra dónde unirse, y el mensaje no pasa bien al músculo. El músculo se fatiga: el ejemplo típico es la caída de los dos párpados.',
    ],
    refs: [M3('35:58'), M3('36:38')],
  },
  {
    id: 'f-convulsion',
    sec: 'crisis',
    titulo: 'Qué pasa en una convulsión',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'crisis', vistas: [['aura'], ['aura', 'tonica', 'clonica'], ['aura', 'tonica', 'clonica', 'postictal']] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Una **descarga neuronal excesiva**, espontánea y sincrónica, activa muchas neuronas a la vez.' },
          { k: 'mecanismo', text: 'Las neuronas **gastan sus reservas** de oxígeno y glucosa: a los minutos se vacían.' },
          { k: 'signo', text: 'Por eso lo primero es **oxigenar**; más de 30 minutos, o crisis que se repiten sin recuperarse, es un **estado de mal epiléptico**.' },
        ],
      },
    ],
    voz: [
      'En una convulsión hay una descarga neuronal excesiva: espontánea, que activa en sincronía a muchísimas neuronas. Eso se manifiesta como movimientos involuntarios, casi siempre generalizados, y después la pérdida de la conciencia.',
      'Durante la crisis, las neuronas consumen sus reservas de oxígeno y glucosa. Si la convulsión se prolonga unos minutos, esas reservas se vacían.',
      'Por eso, ante una convulsión, lo primero es oxigenar. Y si la crisis dura más de treinta minutos, o se repite una y otra vez sin que el paciente se recupere entre ellas, es un estado de mal epiléptico.',
    ],
    refs: [M4('03:36'), M4('05:39'), M4('06:19'), M4('07:02')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'movimientos', label: 'Núcleos de la base' },
    { id: 'debilidad', label: 'Las motoneuronas' },
    { id: 'snp', label: 'Nervio y placa' },
    { id: 'crisis', label: 'La convulsión' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-mov',
    sec: 'movimientos',
    titulo: 'Movimientos involuntarios anormales',
    fig: { f: 'nucleos', vistas: [{ luz: ['caudado', 'putamen', 'palido', 'subtalamico', 'negra'], tone: 'lilac' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Disfunción de los **núcleos de la base**: movimientos **de más** (hipercinesia) o **de menos** (hipocinesia).' },
      { t: 'lista', en: 1, items: ['Alteran el **tono** (hiper, hipo o distonía).', 'Los movimientos **voluntarios**, **automáticos** y **asociados**.'] },
    ],
    examen: { origen: 'ortega', texto: 'Los movimientos involuntarios anormales.', cita: 'Movimientos involuntarios anormales, otro de los temas que son muy preguntados en los parciales.', ref: M3('00:00') },
    voz: [
      'Los movimientos involuntarios anormales son muy preguntados en los parciales. Son disfunciones de los núcleos de la base: un exceso de movimientos, la hipercinesia, o una falta, la hipocinesia.',
      'Cuando se alteran los núcleos de la base, se altera el tono muscular, y se alteran los movimientos voluntarios, los automáticos y los asociados.',
    ],
    refs: [M3('00:00'), M3('00:43'), M3('01:24'), M3('02:05')],
  },
  {
    id: 't-temblor',
    sec: 'movimientos',
    titulo: 'El temblor',
    fig: { f: 'temblor', vistas: [['reposo', 'postural', 'intencional']] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Oscilaciones **rítmicas** de un segmento del cuerpo. El movimiento involuntario **más frecuente**. **Desaparece con el sueño**.' },
      { t: 'lista', en: 1, items: ['Velocidad: rápido, mediano o lento.', 'Amplitud: fino o grosero.', 'Momento: **de reposo**, **postural** o **intencional**.', 'Localizado o generalizado; casi siempre en las **manos**.'] },
    ],
    examen: { origen: 'ortega', texto: 'El temblor.', cita: 'El temblor usted tiene que conocerlo… porque se lo van a preguntar.', ref: M3('02:48') },
    voz: [
      'El temblor se lo van a preguntar: hay que conocerlo bien. Es el movimiento involuntario más frecuente: oscilaciones rítmicas de un segmento o de varias partes del cuerpo, casi siempre las manos. Y desaparece con el sueño.',
      'Se clasifica por su velocidad, rápido, mediano o lento; por su amplitud, fino o grosero; y sobre todo por el momento en que aparece: en reposo, al mantener una postura, o al hacer un movimiento intencional.',
    ],
    refs: [M3('02:48'), M3('03:32'), M3('04:13'), M3('04:56')],
  },
  {
    id: 't-temblor-tipos',
    sec: 'movimientos',
    titulo: 'Cada temblor y su enfermedad',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Temblor', 'Cuándo', 'Cómo', 'Pista'],
        filas: [
          ['**Parkinson**', '**Reposo**', 'Lento, grosero', 'Empieza **unilateral**; «cuenta monedas»'],
          ['Fisiológico', 'Postural', 'Fino, rápido', 'Ansiedad, frío: **adrenalina**'],
          ['**Cerebeloso**', '**Intencional**', 'Aumenta al acercarse al objetivo', 'Síndrome cerebeloso'],
          ['Esencial', 'Postural', 'Manos, cabeza, voz', '**Hereditario**; alcohol y estrés'],
          ['Wilson', 'Postural', 'Grueso, **proximal**', 'Depósito de **cobre** en los núcleos de la base'],
        ],
      },
    ],
    aclara: { text: 'El temblor esencial suele aliviarse transitoriamente con el alcohol.', origen: GRAL },
    voz: [
      'Cada temblor tiene su pista. El del Parkinson es de reposo, lento y grosero, empieza de un lado y después se hace bilateral: el famoso temblor en cuenta monedas.',
      'El fisiológico es postural, fino y rápido, y aparece con la ansiedad o el frío, por la adrenalina. El cerebeloso es intencional: aumenta cuando el paciente se acerca al objetivo.',
      'El esencial es postural, hereditario, afecta las manos, la cabeza y la voz, y se relaciona con el alcohol y el estrés. Y el de la enfermedad de Wilson, por depósito de cobre en los núcleos de la base, es grueso y proximal.',
    ],
    refs: [M3('05:38'), M3('06:18'), M3('06:59'), M3('07:42'), M3('08:23'), M3('09:06')],
  },
  {
    id: 't-corea',
    sec: 'movimientos',
    titulo: 'Corea',
    fig: { f: 'nucleos', vistas: [{ lesion: ['caudado', 'putamen'], tone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Movimientos **rápidos, irregulares, arrítmicos**, que pasan de una parte del cuerpo a otra; desaparecen con el sueño.' },
      { t: 'texto', en: 1, text: 'Lesión del **cuerpo estriado**: bajan la acetilcolina y el GABA; la dopamina queda en exceso.' },
      { t: 'def', term: 'Huntington', tono: 'lilac', en: 2, text: 'Hereditaria, adultos, con **deterioro cognitivo**; **irreversible**.' },
      { t: 'def', term: 'Sydenham', tono: 'gold', en: 2, text: '**Niños**, después de una faringitis por **estreptococo** (fiebre reumática); **reversible**.' },
      { t: 'def', term: 'Farmacológica', tono: 'sky', en: 2, text: 'Por exceso de **levodopa**.' },
    ],
    voz: [
      'La corea, la que le sigue en frecuencia al temblor: movimientos rápidos, desordenados, irregulares y arrítmicos, que fluyen de una parte del cuerpo a otra, como la marcha del payaso. También desaparece con el sueño.',
      'La lesión está en el cuerpo estriado: bajan la acetilcolina y el GABA, y la dopamina queda en exceso, lo contrario del Parkinson.',
      'La de Huntington es hereditaria, del adulto, con deterioro cognitivo, e irreversible. La de Sydenham es de los niños, después de una faringitis por estreptococo, en la fiebre reumática, y es reversible. Y está la corea farmacológica, por exceso de levodopa.',
    ],
    refs: [M3('09:48'), M3('10:29'), M3('11:12'), M3('11:52'), M3('12:33'), M3('13:15'), M3('13:57')],
  },
  {
    id: 't-balismo',
    sec: 'movimientos',
    titulo: 'Hemibalismo',
    fig: { f: 'nucleos', vistas: [{ lesion: ['subtalamico'], unLado: true, tone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Como una corea, pero de **la mitad del cuerpo**: movimientos amplios de **lanzamiento** del brazo.' },
      { t: 'texto', en: 1, text: 'Lesión, casi siempre **vascular**, del **núcleo subtalámico de Luys**.' },
    ],
    voz: [
      'El balismo es casi lo mismo que una corea, pero afecta la mitad del cuerpo, por eso se lo llama hemibalismo: el paciente hace movimientos amplios del brazo, como si quisiera lanzar algo.',
      'Se debe casi siempre a una lesión vascular de un núcleo de la base: el núcleo subtalámico de Luys, del lado opuesto.',
    ],
    refs: [M3('14:38'), M3('15:18')],
  },
  {
    id: 't-otros',
    sec: 'movimientos',
    titulo: 'Atetosis, mioclonías, distonías y tics',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Atetosis', tono: 'lilac', text: 'Movimientos **lentos**, distónicos, de las **manos**.' },
      { t: 'def', term: 'Mioclonías', tono: 'gold', en: 1, text: 'Contracciones bruscas. Una negativa: el **flapping** (asterixis) de la encefalopatía **hepática** o **urémica**.' },
      { t: 'def', term: 'Distonías', tono: 'sky', en: 1, text: 'Contracciones **sostenidas**: tortícolis, blefaroespasmo.' },
      { t: 'def', term: 'Tics', tono: 'peach', en: 2, text: 'Cortos, bruscos, repetitivos; se pueden **contener** un rato. Niños; **Gilles de la Tourette**.' },
    ],
    examen: { origen: 'ortega', texto: 'Los movimientos involuntarios más preguntados.', cita: 'Yo quiero que ustedes sepan los movimientos involuntarios: temblor, corea, el hemibalismo, la atetosis y los tics, que son por lo general lo más preguntado de todos.', ref: M3('22:02') },
    voz: [
      'Lo más preguntado: el temblor, la corea, el hemibalismo, la atetosis y los tics. La atetosis son movimientos lentos y distónicos de las manos.',
      'Las mioclonías son contracciones bruscas; una mioclonía negativa es el flapping, o asterixis, de la encefalopatía hepática o urémica. Las distonías son contracciones sostenidas, como la tortícolis o el blefaroespasmo.',
      'Y los tics son movimientos cortos, bruscos y repetitivos, que el paciente puede contener por un rato pero no controlar del todo; son de los niños, y el ejemplo es el síndrome de Gilles de la Tourette.',
    ],
    refs: [M3('16:02'), M3('16:43'), M3('17:26'), M3('18:07'), M3('18:47'), M3('19:28'), M3('22:02')],
  },
  {
    id: 't-fasciculacion',
    sec: 'movimientos',
    titulo: 'Fasciculaciones e hipocinesia',
    fig: { f: 'motora', vistas: [{ lesion: 'asta', tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Fasciculación', tono: 'mint', text: 'Contracciones **espontáneas** de un grupo de fibras, visibles bajo la piel, en reposo. Típicas de la **segunda motoneurona**, con hipotonía.' },
      { t: 'def', term: 'Hipocinesia', tono: 'lilac', en: 1, text: 'Pocos movimientos y **lentos** (bradicinesia): el **Parkinson**.' },
    ],
    examen: { origen: 'ortega', texto: 'La fasciculación.', cita: 'La fasciculación, pregunta de parcial: es típica en los pacientes que tienen hipotonía, y sobre todo el síndrome de la segunda motoneurona.', ref: M3('21:06') },
    voz: [
      'La fasciculación, pregunta de parcial: son contracciones espontáneas de un grupo de fibras musculares, que se ven bajo la piel, en reposo. Es típica de los pacientes con hipotonía, sobre todo en el síndrome de la segunda motoneurona.',
      'Y del otro lado, la hipocinesia, o bradicinesia: pocos movimientos, y lentos. Es lo más característico del Parkinson.',
    ],
    refs: [M3('20:53'), M3('21:06'), M3('21:38')],
  },
  {
    id: 't-debilidad',
    sec: 'debilidad',
    titulo: 'Debilidad: primera y segunda motoneurona',
    amplio: true,
    bloques: [
      { t: 'clave', text: '**Paresia**: menos fuerza. **Plejía**: sin fuerza.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['', '1.ª motoneurona (piramidal)', '2.ª motoneurona'],
        filas: [
          ['Parálisis', '**Espástica**', '**Fláccida**'],
          ['Tono', 'Hipertonía (navaja)', 'Hipotonía o atonía'],
          ['Reflejos', '**Hiperreflexia**', 'Hipo o **arreflexia**'],
          ['Babinski', '**Sí**', 'No'],
          ['Atrofia', 'No (solo por desuso)', '**Sí**'],
          ['Fasciculaciones', 'No', '**Sí**'],
        ],
      },
    ],
    voz: [
      'La debilidad muscular: paresia es la disminución de la fuerza, y plejía es la ausencia. Lo que hay que saber es si la lesión es de la primera o de la segunda motoneurona.',
      'La primera motoneurona es el síndrome piramidal: parálisis espástica, hipertonía en navaja, hiperreflexia y Babinski, sin atrofia salvo por desuso. La segunda motoneurona da una parálisis fláccida: hipotonía, arreflexia, atrofia y fasciculaciones.',
    ],
    refs: [M3('22:21'), M3('23:08'), M3('23:55'), M3('25:20'), M3('26:00'), M3('26:44')],
  },
  {
    id: 't-decusacion',
    sec: 'debilidad',
    titulo: 'Arriba o abajo de la decusación',
    fig: {
      f: 'motora',
      vistas: [
        { lesion: 'capsula', cuerpo: 'hemi', tone: 'sky', nota: 'Arriba de la decusación: lado opuesto', notaTone: 'sky' },
        { lesion: 'medula', cuerpo: 'hemi', tone: 'sky', nota: 'Abajo: el mismo lado de la lesión', notaTone: 'sky' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Arriba del bulbo', tono: 'sky', text: 'La vía todavía no cruzó: la debilidad es **contralateral** a la lesión.' },
      { t: 'def', term: 'Abajo del bulbo', tono: 'mint', en: 1, text: 'La vía ya cruzó: la debilidad es del **mismo lado** de la lesión.' },
    ],
    voz: [
      'La vía piramidal se cruza en el bulbo, en la decusación. Si la lesión está por arriba, por ejemplo en la cápsula interna del hemisferio izquierdo, la vía todavía no cruzó, y la debilidad aparece del lado opuesto, el derecho.',
      'Si la lesión está por debajo del bulbo, en la médula, la vía ya cruzó: la debilidad aparece del mismo lado de la lesión.',
    ],
    refs: [M3('23:55'), M3('24:36')],
  },
  {
    id: 't-neuropatias',
    sec: 'snp',
    titulo: 'Neuropatías',
    fig: { f: 'motora', vistas: [{ lesion: 'nervio', cuerpo: 'distal', tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Mononeuropatía', tono: 'sky', text: 'Un solo nervio: **radial** (mano caída), **mediano** (mano del predicador), **cubital** (mano en garra).' },
      { t: 'def', term: 'Mononeuropatía múltiple', tono: 'lilac', en: 0, text: 'Varios nervios aislados (cubital izquierdo y radial derecho).' },
      { t: 'def', term: 'Polineuropatía', tono: 'red', en: 1, text: 'Muchos nervios, **distal**, casi siempre **simétrica**, a predominio de los **miembros inferiores**.' },
    ],
    examen: { origen: 'ortega', texto: 'Las características de las neuropatías.', cita: 'Esto es pregunta de parcial, lo que les puse en el cuadrito.', ref: M3('29:36') },
    voz: [
      'La lesión del sistema nervioso periférico. La mononeuropatía afecta un solo nervio: el radial da la mano caída, el mediano la mano del predicador, el cubital la mano en garra. Si hay varios nervios afectados por separado, por ejemplo el cubital izquierdo y el radial derecho, es una mononeuropatía múltiple.',
      'La polineuropatía afecta muchos nervios a la vez: es distal, casi siempre simétrica, y predomina en los miembros inferiores. Sus características son pregunta de parcial.',
    ],
    refs: [M3('26:44'), M3('27:31'), M3('28:11'), M3('28:53'), M3('29:36')],
  },
  {
    id: 't-poli',
    sec: 'snp',
    titulo: 'La polineuropatía',
    amplio: true,
    bloques: [
      { t: 'lista', items: ['**Distal**: antebrazos y manos, piernas y pies.', 'Paresia o parálisis, **hipo o atonía**, **hipo o arreflexia**, **atrofia**, fasciculaciones.', 'Piel atrófica; dolor con **alodinia** (duele lo que no debería doler).', 'Líquido cefalorraquídeo, esfínteres y pares craneales **normales** (salvo la diabética, que puede tocar pares).'] },
      { t: 'def', term: 'Las tres que hay que conocer', tono: 'gold', en: 1, text: '**Diabética**, **alcohólica** (tóxica) y el **síndrome de Guillain-Barré**.' },
    ],
    voz: [
      'La polineuropatía es distal: los antebrazos y las manos, las piernas y los pies. Hay paresia o parálisis, hipotonía o atonía, reflejos disminuidos o abolidos, atrofia y fasciculaciones. La piel se vuelve atrófica, y aparece la alodinia: duele un estímulo que no debería doler.',
      'El líquido cefalorraquídeo, los esfínteres y los pares craneales son normales, salvo en la neuropatía diabética, que puede tocar los pares. Las tres que hay que conocer: la diabética, la alcohólica, y el síndrome de Guillain-Barré.',
    ],
    refs: [M3('27:31'), M3('29:36'), M3('30:20'), M3('31:01'), L('p508')],
  },
  {
    id: 't-guillain',
    sec: 'snp',
    titulo: 'Síndrome de Guillain-Barré',
    fig: { f: 'motora', vistas: [{ lesion: 'nervio', cuerpo: 'ascendente', tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Polirradiculoneuropatía **desmielinizante** autoinmune, días después de una **infección**.' },
      { t: 'lista', en: 1, items: ['Parálisis **ascendente** (de Landry): de las piernas a los cuatro miembros.', 'Arreflexia, hipotonía; pares craneales (el **facial**).', 'Riesgo: **insuficiencia respiratoria**.', 'LCR: **disociación albúmino-citológica**: **proteínas altas** con **células normales**.'] },
    ],
    aclara: { text: 'La disociación albúmino-citológica es proteínas elevadas con un recuento de células normal.', origen: BIBLIO },
    voz: [
      'El síndrome de Guillain-Barré es una polirradiculoneuropatía desmielinizante, autoinmune, que aparece días después de una infección respiratoria o intestinal.',
      'La parálisis es ascendente, la de Landry: empieza en las piernas y sube hasta los cuatro miembros. Hay arreflexia e hipotonía, puede afectar los pares craneales, sobre todo el facial, y el riesgo es la insuficiencia respiratoria.',
      'En la punción lumbar se encuentra la disociación albúmino-citológica: las proteínas están altas, y las células, normales.',
    ],
    refs: [M3('31:01'), M3('31:46'), M3('32:28'), M3('33:10')],
  },
  {
    id: 't-miopatia',
    sec: 'snp',
    titulo: 'Miopatías y miastenia',
    fig: { f: 'motora', vistas: [{ lesion: 'musculo', cuerpo: 'proximal', tone: 'sky' }, { lesion: 'placa', cuerpo: 'ocular', tone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Al revés de la neuropatía: **proximal** (cinturas escapular y pelviana) y **simétrica**.' },
      { t: 'lista', en: 0, items: ['Sin compromiso **sensitivo**; reflejos poco alterados; **sin fasciculaciones**.', 'Seudohipertrofia; escápulas aladas, hiperlordosis, marcha de pato.', '**CPK elevada**.'] },
      { t: 'def', term: 'Miastenia gravis', tono: 'lilac', en: 1, text: 'De la **placa**: anticuerpos contra el receptor de acetilcolina; **ptosis bilateral** y fatiga.' },
    ],
    aclara: { text: 'En la miastenia gravis la CPK es normal: el músculo no está dañado, falla la transmisión en la placa.', origen: GRAL },
    voz: [
      'Las miopatías son al revés de la neuropatía: afectan la parte proximal, las cinturas escapular y pelviana, y de forma simétrica. No hay compromiso sensitivo, los reflejos casi no se alteran y no hay fasciculaciones, porque no es un trastorno del nervio.',
      'Puede haber seudohipertrofia, un músculo grande pero lleno de grasa, escápulas aladas, hiperlordosis, y la marcha de pato. Y la enzima que se pide es la CPK, que está elevada. La miastenia gravis, en cambio, es de la placa neuromuscular: anticuerpos contra el receptor de acetilcolina, ptosis de los dos párpados y fatiga.',
    ],
    refs: [M3('33:10'), M3('33:52'), M3('34:34'), M3('35:17'), M3('35:58'), M3('36:38')],
  },
  {
    id: 't-convulsion',
    sec: 'crisis',
    titulo: 'La convulsión',
    fig: { f: 'crisis', vistas: [['aura', 'tonica', 'clonica', 'postictal']] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Movimientos involuntarios, casi siempre **generalizados**, seguidos de **pérdida de la conciencia**.' },
      { t: 'lista', en: 1, items: ['La más común: **tónico-clónica** (gran mal).', 'Descarga neuronal **excesiva** y sincrónica.', '**Estado de mal epiléptico**: más de 30 minutos, o crisis repetidas sin recuperación.'] },
    ],
    voz: [
      'La convulsión son movimientos involuntarios, casi siempre generalizados, seguidos de una pérdida de la conciencia. La más común es la tónico-clónica, la crisis de gran mal, por una descarga neuronal excesiva y sincrónica.',
      'Si dura más de treinta minutos, o las crisis se repiten sin que el paciente se recupere, es un estado de mal epiléptico. El profesor aclara que convulsiones y sueño se preguntan poco, y solo algunos docentes.',
    ],
    refs: [M4('00:01'), M4('00:43'), M4('01:27'), M4('03:36'), M4('06:19'), M4('07:02')],
  },
  {
    id: 't-fases',
    sec: 'crisis',
    titulo: 'Las fases de la crisis',
    fig: { f: 'crisis', vistas: [['aura'], ['tonica'], ['clonica'], ['postictal']] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Aura', tono: 'gold', text: 'Alucinaciones, mareo, adormecimiento, emociones.' },
      { t: 'def', term: 'Tónica', tono: 'red', en: 1, text: 'El cuerpo se pone **rígido** y se arquea; puede orinarse.' },
      { t: 'def', term: 'Clónica', tono: 'peach', en: 2, text: '**Sacudidas**, saliva por la boca.' },
      { t: 'def', term: 'Postictal', tono: 'sky', en: 3, text: 'Débil, **atónico**, con la conciencia perdida o confusa.' },
    ],
    voz: [
      'Las fases de la crisis. Primero, el aura: alucinaciones, mareo, adormecimiento o emociones que avisan.',
      'Después, la fase tónica: el cuerpo se pone rígido y se arquea, y el paciente puede orinarse encima.',
      'Luego, la fase clónica: el paciente se sacude con fuerza y larga saliva por la boca.',
      'Y por último, la fase postictal: el paciente queda débil, atónico, con la conciencia perdida o confusa.',
    ],
    refs: [M4('15:25'), M4('16:08'), M4('16:54')],
  },
  {
    id: 't-todd',
    sec: 'crisis',
    titulo: 'Parálisis de Todd',
    fig: { f: 'crisis', vistas: [['postictal']] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'sky', text: '**Paresia postictal**: debilidad **transitoria** después de la crisis convulsiva.' },
      { t: 'texto', en: 0, text: 'Casi siempre de **un lado** del cuerpo; dura minutos u horas y se va sola (hasta 48 horas).' },
    ],
    examen: { origen: 'ortega', texto: 'La parálisis de Todd.', cita: 'Pregunta de parcial… pregunta siempre qué es la parálisis de Todd o la paresia postictal.', ref: M4('17:25') },
    aclara: { text: 'La parálisis de Todd suele ser focal (una hemiparesia del lado opuesto al foco) y se resuelve en menos de 48 horas.', origen: BIBLIO },
    voz: [
      'Una pregunta que algunos docentes hacen siempre: qué es la parálisis de Todd, o paresia postictal. Es una debilidad transitoria que aparece después de la crisis convulsiva, casi siempre de un lado del cuerpo, que dura minutos u horas y desaparece sola, en general antes de las cuarenta y ocho horas.',
    ],
    refs: [M4('17:25'), M4('17:38')],
  },
  {
    id: 't-epilepsia',
    sec: 'crisis',
    titulo: 'Convulsión no es epilepsia',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Convulsión', tono: 'peach', items: ['La **manifestación** clínica: tónico-clónica', 'Causa puntual (fiebre, fármacos): se va si se retira'] },
          { titulo: 'Epilepsia', tono: 'lilac', items: ['Una **condición** permanente y recurrente', 'Lesión del SNC (lóbulo temporal, un TEC)', 'Puede **no** convulsionar: la **ausencia**'] },
        ],
      },
      { t: 'texto', en: 1, text: 'Crisis **parciales** (simples sin pérdida de conciencia, complejas con pérdida, o con generalización secundaria) y **generalizadas** (ausencias, tónico-clónicas). Idiopática, criptogénica o sintomática.' },
    ],
    voz: [
      'Convulsión no es lo mismo que epilepsia. La convulsión es la manifestación clínica, la crisis tónico-clónica, y puede tener una causa puntual, como la fiebre: si se retira la causa, deja de convulsionar.',
      'La epilepsia es una condición permanente y recurrente, por una lesión del sistema nervioso central, como en el lóbulo temporal o después de un traumatismo. Y puede no convulsionar: en la crisis de ausencia, el chico desaparece unos segundos, deja de escribir, y vuelve.',
      'Las crisis son parciales, simples si no hay pérdida de conciencia, complejas si la hay, o con generalización secundaria; o generalizadas. Y según la causa, idiopáticas, criptogénicas o sintomáticas.',
    ],
    refs: [M4('07:02'), M4('07:44'), M4('08:24'), M4('13:13'), M4('13:56'), M4('18:21'), M4('19:05'), M4('21:15')],
  },
  {
    id: 't-diferenciales',
    sec: 'crisis',
    titulo: 'Con qué no confundirla',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Síncope', tono: 'sky', text: 'Baja el flujo al cerebro: pierde la conciencia y la **recupera enseguida**.' },
      { t: 'def', term: 'Crisis psicógena', tono: 'lilac', en: 0, text: 'Ansiosos que **hiperventilan**: movimientos bruscos, sin una fase tónica verdadera.' },
      { t: 'def', term: 'Drogas o abstinencia', tono: 'peach', en: 1, text: 'Alcohol, suspensión brusca de sustancias.' },
      { t: 'def', term: 'Crisis aguda sintomática', tono: 'gold', en: 1, text: 'La más importante: la **convulsión febril** del niño; no depende de cuánta fiebre.' },
    ],
    aclara: { text: 'La hiperventilación baja el dióxido de carbono en sangre (hipocapnia): de ahí los hormigueos y las contracciones.', origen: GRAL },
    voz: [
      'Los diagnósticos diferenciales. El síncope: baja el flujo de sangre al cerebro, el paciente pierde la conciencia y la recupera enseguida. La crisis psicógena: pacientes ansiosos que hiperventilan, con movimientos bruscos pero sin una verdadera fase tónica.',
      'Las crisis por drogas o por abstinencia, como al suspender bruscamente el alcohol. Y la crisis aguda sintomática más importante: la convulsión febril del niño, que no depende de cuánta fiebre tenga, sino de cada chico.',
    ],
    refs: [M4('09:05'), M4('09:46'), M4('10:30'), M4('11:11'), M4('11:51')],
  },
  {
    id: 't-sueno',
    sec: 'sueno',
    titulo: 'Quién regula el sueño',
    fig: { f: 'encefalo', vistas: [{ luz: ['hipotalamo', 'protuberancia'], tone: 'lilac' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Hipotálamo posterior', tono: 'lilac', text: 'Su lesión da **hipersomnia**.' },
      { t: 'def', term: 'Hipotálamo anterior', tono: 'sky', en: 0, text: 'Su lesión da **insomnio**.' },
      { t: 'def', term: 'Formación reticular', tono: 'gold', en: 1, text: 'Del tronco. El **simpático** acentúa la **vigilia**; el **parasimpático** profundiza el **sueño**.' },
    ],
    voz: [
      'El sueño. Casi siempre, un trastorno del sueño es una lesión del hipotálamo. Si se lesiona el hipotálamo posterior, el paciente duerme mucho: hipersomnia. Si se lesiona el anterior, insomnio.',
      'El ciclo de vigilia y sueño lo regula la formación reticular del tronco, muy ligada al sistema autónomo: el simpático acentúa la vigilia, y el parasimpático profundiza el sueño.',
    ],
    refs: [M4('25:28'), M4('26:09'), M4('26:49')],
  },
  {
    id: 't-etapas',
    sec: 'sueno',
    titulo: 'Las etapas del sueño',
    fig: { f: 'sueno', vistas: [['n1', 'n2'], ['n34'], ['rem']] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'No REM 1 y 2', tono: 'sky', text: 'Sueño **superficial**: entre dormido y despierto; se despierta fácil.' },
      { t: 'def', term: 'No REM 3 y 4', tono: 'sky', en: 1, text: 'Sueño **profundo**: predomina el **parasimpático**; bajan la frecuencia cardíaca y la presión.' },
      { t: 'def', term: 'REM', tono: 'lilac', en: 2, text: 'Una hora y media después: **sueña**; movimientos oculares rápidos, músculos **atónicos**; ondas en dientes de sierra.' },
    ],
    examen: { origen: 'ortega', texto: 'Las etapas del sueño.', cita: 'Lo que le van a preguntar en sí, y característicamente, son las fases o las etapas del sueño.', ref: M4('27:28') },
    aclara: { text: 'En el sueño REM la frecuencia cardíaca y la presión se vuelven irregulares; la caída sostenida es del sueño profundo no REM.', origen: BIBLIO },
    voz: [
      'Y lo que se pregunta del sueño son sus etapas. Las etapas uno y dos del sueño no REM son el sueño superficial: el paciente está entre dormido y despierto, y se despierta fácilmente.',
      'Las etapas tres y cuatro son el sueño profundo: predomina el parasimpático, bajan la frecuencia cardíaca y la presión, y aparecen los ronquidos.',
      'Y alrededor de una hora y media después de dormirse llega el sueño REM: es cuando el paciente sueña, con movimientos oculares rápidos y los músculos atónicos, y en el electroencefalograma aparecen las ondas en dientes de sierra.',
    ],
    refs: [M4('27:30'), M4('28:13'), M4('28:53'), M4('29:35'), M4('30:15')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'movimientos', label: 'Movimientos involuntarios' },
    { id: 'debilidad', label: 'Debilidad' },
    { id: 'snp', label: 'Nervio, placa y músculo' },
    { id: 'crisis', label: 'Convulsiones' },
    { id: 'sueno', label: 'Sueño' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'La mano que tiembla quieta',
    texto: 'Hombre de 68 años con temblor de la mano derecha que aparece con la mano apoyada en la pierna y se va cuando agarra el vaso. Es lento, amplio, como si contara monedas. Camina con pasos cortos y se mueve poco.',
    pregunta: '¿Qué temblor es y de dónde sale?',
    opciones: [
      { text: 'De reposo, por Parkinson: falta dopamina de la sustancia negra.', why: 'Reposo, lento, grosero, unilateral al inicio, con hipocinesia.' },
      { text: 'Intencional, cerebeloso.', why: 'Aumentaría al acercarse al objetivo.' },
      { text: 'Fisiológico, por adrenalina.', why: 'Es fino, rápido y postural.' },
      { text: 'Esencial.', why: 'Es postural, no de reposo.' },
    ],
    correcta: 0,
    razonamiento: 'El temblor de reposo, lento y grosero, que cede al moverse, es el del Parkinson.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Debilidad que sube',
    texto: 'Mujer de 30 años que tuvo diarrea hace una semana. Hace 3 días empezó con hormigueos y debilidad en los pies, que hoy le llega a los muslos y los brazos. Los reflejos están abolidos. La punción lumbar muestra proteínas altas con células normales.',
    pregunta: '¿Qué tiene y qué hay que vigilar?',
    opciones: [
      { text: 'Guillain-Barré: vigilar la función respiratoria.', why: 'Parálisis ascendente posinfecciosa, arreflexia, disociación albúmino-citológica.' },
      { text: 'Miastenia gravis: vigilar la CPK.', why: 'La miastenia da ptosis y fatiga, con reflejos normales.' },
      { text: 'Lesión de la cápsula interna.', why: 'Daría espasticidad e hiperreflexia de un lado.' },
      { text: 'Miopatía.', why: 'Sería proximal, sin hormigueos, con CPK alta.' },
    ],
    correcta: 0,
    razonamiento: 'Infección previa + debilidad ascendente + arreflexia + proteínas altas con células normales = Guillain-Barré; el riesgo es la insuficiencia respiratoria.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Después de la crisis',
    texto: 'Hombre que tuvo una crisis tónico-clónica. Al recuperarse, no puede mover bien el brazo y la pierna izquierdos. Seis horas después la fuerza volvió por completo.',
    pregunta: '¿Qué fue esa debilidad?',
    opciones: [
      { text: 'Parálisis de Todd (paresia postictal).', why: 'Debilidad transitoria después de la crisis, que se va sola.' },
      { text: 'Un accidente cerebrovascular.', why: 'No se resolvería en horas sin secuelas en este contexto.' },
      { text: 'Guillain-Barré.', why: 'Es ascendente y de días.' },
      { text: 'Un síncope.', why: 'No da debilidad focal.' },
    ],
    correcta: 0,
    razonamiento: 'Debilidad transitoria posterior a una convulsión: parálisis de Todd.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'mc2',
        label: 'Motivos de consulta II',
        tone: 'lilac',
        nota: 'Movimientos involuntarios · debilidad · convulsiones · sueño',
        hijos: [
          { id: 'mov', label: 'Movimientos', tone: 'lilac', examen: true, nota: '**Temblor** · corea · hemibalismo · atetosis · tics · **fasciculación**' },
          { id: 'deb', label: 'Debilidad', tone: 'sky', nota: '1.ª motoneurona (espástica) o 2.ª (fláccida) · arriba o abajo de la decusación' },
          { id: 'snp', label: 'Periférico', tone: 'mint', examen: true, nota: 'Mono y **polineuropatía** · Guillain-Barré · miopatía · miastenia' },
          { id: 'cri', label: 'Convulsiones', tone: 'peach', examen: true, nota: 'Fases · **Todd** · convulsión vs epilepsia' },
          { id: 'sue', label: 'Sueño', tone: 'sky', nota: 'Hipotálamo · **etapas** no REM y REM' },
        ],
      },
    ],
    nexos: ['**Parkinson: falta dopamina. Corea: faltan acetilcolina y GABA.**', '**Neuropatía distal; miopatía proximal.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['neu02-d01', 'neu02-d02', 'neu02-d03', 'neu02-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    movimientos: { tab: 'teoria', seccion: 'movimientos' },
    debilidad: { tab: 'teoria', seccion: 'debilidad' },
    snp: { tab: 'teoria', seccion: 'snp' },
    crisis: { tab: 'teoria', seccion: 'crisis' },
    sueno: { tab: 'teoria', seccion: 'sueno' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
