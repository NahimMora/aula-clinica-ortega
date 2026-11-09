import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-07: clase visual de la litiasis renoureteral.
 *  1. Clases de Ortega: «Litiasis renoureteral parte 1» (00:02–17:13) y «parte 2» (00:00–24:02); repaso en «Síndrome
 *     nefrítico» (30:33–33:23) y cólico en «Motivos de consulta de renal parte 1» (09:54–12:36).
 *  2. Libro de Clínica Médica de Ortega (p. 448).
 * Ver content/traceability/ren-07.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const T1 = (t: string) => r('lit-1', t);
const T2 = (t: string) => r('lit-2', t);
const N = (t: string) => r('nefritico', t);
const M1 = (t: string) => r('mc-ren-1', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-formacion',
    sec: 'formacion',
    titulo: 'Cómo nace un cálculo',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['pelvis-d'], tone: 'gold', nota: 'Orina concentrada', notaTone: 'gold' }, { luz: ['pelvis-d'], calculo: 'pelvis-d', tone: 'gold', nota: 'Los cristales se agregan', notaTone: 'gold' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La orina se **sobresatura** (poca agua, mucho calcio, oxalato o ácido úrico).' },
          { k: 'mecanismo', text: 'Se forma un núcleo de cristal (**nucleación**) que crece y se **agrega** con otros.' },
          { k: 'signo', text: 'Aparece el **cálculo**. El **citrato** y el **magnesio** frenan la nucleación: si faltan, más cálculos.' },
        ],
      },
    ],
    voz: [
      'Un cálculo nace en una orina sobresaturada: poca agua, o demasiado calcio, oxalato o ácido úrico disueltos.',
      'Los cristales se forman alrededor de un núcleo, la nucleación, y después crecen y se agregan unos con otros.',
      'Así aparece el cálculo. Lo que el profesor pide sí o sí: la orina tiene inhibidores, el citrato y el magnesio, que frenan la nucleación. Si faltan en la orina, hay más tendencia a formar cálculos; por eso se miden y se pueden reponer.',
    ],
    refs: [T1('03:29'), T1('04:09'), T1('05:42'), T1('06:01'), T1('07:29')],
  },
  {
    id: 'f-colico',
    sec: 'clinica',
    titulo: 'Por qué duele así el cólico',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['ureter-d'], calculo: 'ureter-d', tone: 'red' }, { luz: ['ureter-d', 'pelvis-d'], calculo: 'ureter-d', dilata: ['pelvis-d', 'ureter-d'], tone: 'red' }, { luz: ['ureter-d', 'pelvis-d'], calculo: 'ureter-d', dilata: ['pelvis-d', 'ureter-d'], irradia: true, tone: 'red', nota: 'Irradia hacia los genitales', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El cálculo baja y se **traba en el uréter**.' },
          { k: 'mecanismo', text: 'La vía de arriba se **distiende** y el uréter se contrae con fuerza contra el obstáculo: dolor que **va y viene**.' },
          { k: 'signo', text: 'Baja hacia la fosa ilíaca y los **genitales**; el roce da **hematuria**.' },
        ],
      },
    ],
    aclara: { text: 'La irradiación a los genitales se explica porque el uréter y los genitales comparten la inervación de los mismos segmentos medulares.', origen: GRAL },
    voz: [
      'El cólico renoureteral aparece cuando el cálculo baja y se traba en el uréter.',
      'La orina se acumula detrás, la vía de arriba se distiende de golpe, y el uréter se contrae con fuerza contra el obstáculo, en ondas: por eso el dolor va y viene, y el paciente no encuentra posición.',
      'A medida que el cálculo baja, el dolor se corre hacia la fosa ilíaca y los genitales. Y el cálculo, al rozar la mucosa, la hace sangrar: hematuria.',
    ],
    refs: [T2('10:53'), T2('11:36'), T2('12:19'), M1('09:54'), M1('10:35')],
  },
  {
    id: 'f-ph',
    sec: 'tipos',
    titulo: 'El pH decide qué cristal se forma',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      { t: 'def', term: 'Orina ácida', tono: 'peach', text: 'Precipita el **ácido úrico** (gota, mucha proteína). Por eso se trata **alcalinizando** la orina.' },
      { t: 'def', term: 'Orina alcalina', tono: 'lilac', en: 1, text: 'Proteus desdobla la urea: precipita la **estruvita** (fosfato amónico magnésico).' },
      { t: 'def', term: 'Rayos X', tono: 'gold', en: 2, text: 'El **calcio** es **radiopaco** (se ve); el **ácido úrico** es **radiolúcido** (no se ve).' },
    ],
    voz: [
      'El pH de la orina decide qué cristal se forma. En una orina ácida precipita el ácido úrico, como en la gota o en una dieta con mucha proteína; por eso esos cálculos se tratan alcalinizando la orina.',
      'En una orina alcalina, la que producen gérmenes como Proteus al desdoblar la urea, precipita la estruvita.',
      'Y en la radiografía, el calcio es radiopaco: se ve. El ácido úrico es radiolúcido: no se ve en la placa simple.',
    ],
    refs: [T1('11:29'), T2('05:10'), T2('05:46'), T2('07:59'), N('32:00')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'formacion', label: 'Formación' },
    { id: 'tipos', label: 'El pH' },
    { id: 'clinica', label: 'El cólico' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'formacion',
    titulo: 'Litiasis renoureteral',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Cálculos en la vía urinaria: **3.ª consulta urinaria**.' },
      { t: 'lista', en: 1, items: ['5–12 % de la población; **más en el hombre**.', 'Pico entre los **30 y 60 años** (cada vez más jóvenes).', '**Muy recurrente**.', 'Consecuencia: **obstrucción**, con dolor, infección e insuficiencia renal.'] },
    ],
    voz: [
      'La litiasis renoureteral es la presencia de cálculos en la vía urinaria, y es la tercera consulta urinaria en frecuencia.',
      'Afecta al cinco a doce por ciento de la población, más a los hombres, con un pico entre los treinta y los sesenta años, aunque cada vez aparece en gente más joven, y vuelve con frecuencia. Su consecuencia es la obstrucción, que trae dolor, infección e insuficiencia renal.',
    ],
    refs: [T1('00:02'), T1('00:43'), T1('01:23')],
  },
  {
    id: 't-factores',
    sec: 'formacion',
    titulo: 'Factores predisponentes',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Factor', 'Por qué'],
        filas: [
          ['**Poca agua**, clima caluroso', 'Orina concentrada'],
          ['Dieta, gaseosas', 'Más soluto (calcio, oxalato, proteínas)'],
          ['Alteraciones metabólicas', 'Calcio, fósforo, ácido úrico altos'],
          ['**Infecciones** por desdobladores de urea', 'Orina alcalina: estruvita'],
          ['Sexo masculino, edad', ''],
          ['Pocos **inhibidores**', 'Hipocitraturia, hipomagnesuria'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los factores predisponentes de la litiasis.', cita: 'Esto puede ser pregunta de parcial, lo anotan ahí: los principales factores epidemiológicos, factores predisponentes.', ref: T1('01:37') },
    voz: [
      'Los factores predisponentes, que pueden ser pregunta de parcial. Tomar poca agua, o vivir en un clima caluroso, concentra la orina. La dieta y las gaseosas aportan soluto. Las alteraciones metabólicas suben el calcio, el fósforo o el ácido úrico. Las infecciones por gérmenes que desdoblan la urea alcalinizan la orina. Y además pesan el sexo masculino, la edad, y la falta de inhibidores como el citrato y el magnesio.',
    ],
    refs: [T1('01:37'), T1('01:47'), T1('02:04'), T1('02:44')],
  },
  {
    id: 't-inhibidores',
    sec: 'formacion',
    titulo: 'Citrato y magnesio',
    fig: { f: 'urinario', vistas: [{ luz: ['pelvis-d'], calculo: 'pelvis-d', tone: 'gold' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'El **magnesio** y el **citrato** destruyen el proceso de **nucleación**.' },
      { t: 'texto', en: 1, text: 'Con **hipomagnesuria** o **hipocitraturia** hay más tendencia a formar cálculos: se miden en orina y se pueden reponer.' },
    ],
    examen: { origen: 'ortega', texto: 'Los inhibidores de la formación de cálculos.', cita: 'Esto puede ser pregunta de parcial, pero no me interesa ser pregunta de parcial o no: lo que yo quiero que sepan es esto sí o sí.', ref: T1('06:01') },
    voz: [
      'Lo que el profesor pide sí o sí: la orina tiene inhibidores naturales, el magnesio y el citrato, que destruyen el proceso de nucleación.',
      'Si el paciente tiene poco magnesio o poco citrato en la orina, forma cálculos con más facilidad. Por eso se miden en la orina, y se pueden reponer para prevenir.',
    ],
    refs: [T1('05:42'), T1('06:01'), T1('06:10'), T1('07:29')],
  },
  {
    id: 't-tipos',
    sec: 'tipos',
    titulo: 'Los tipos de cálculos',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Tipo', 'Frecuencia', 'Rx simple'],
        filas: [
          ['**Cálcicos** (oxalato, fosfato)', '**≈ 70–80 %**', 'Radiopacos'],
          ['**Estruvita**', '≈ 10–15 %', 'Radiopacos'],
          ['**Ácido úrico**', '≈ 5–10 %', '**Radiolúcidos**'],
          ['**Cistina**', '< 2 %', 'Poco radiopacos'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los tipos de cálculos y el más frecuente.', cita: 'Esto es pregunta de examen y de cajón. Le van a preguntar cuáles son los tipos de cálculos que existen y cuál es el más frecuente.', ref: T1('07:39') },
    voz: [
      'Los tipos de cálculos, pregunta de examen y de cajón: cuáles son y cuál es el más frecuente. Los cálcicos, de oxalato o de fosfato de calcio, son la gran mayoría, setenta a ochenta por ciento; el profesor cuenta que de diez pacientes que vio en la guardia, ocho o nueve tenían cálculos de calcio.',
      'Le siguen la estruvita, el ácido úrico y, muy rara, la cistina. Los cálcicos y la estruvita se ven en la radiografía; el ácido úrico no.',
    ],
    refs: [T1('07:39'), T1('07:44'), T1('08:26'), T2('10:56'), L('p448')],
  },
  {
    id: 't-calcicos',
    sec: 'tipos',
    titulo: 'Los cálcicos',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Oxalato de calcio', tono: 'gold', text: 'El **más frecuente**: chicos y duros. Oxalato alto por causas intestinales, espinaca, chocolate, café.' },
      { t: 'def', term: 'Fosfato de calcio', tono: 'peach', en: 0, text: 'Más grandes y blandos.' },
      { t: 'def', term: 'Hipercalciuria', tono: 'sky', en: 1, text: '**Absortiva** (el intestino absorbe de más), **renal** (el riñón pierde calcio) o **resortiva** (la paratiroides saca calcio del hueso).' },
    ],
    examen: { origen: 'ortega', texto: 'El cálculo más frecuente y cómo se ve.', cita: 'Sí o sí es pregunta de parcial: cuál es uno de los cálculos más frecuentes… Recordemos que el calcio es radiopaco.', ref: T1('11:29') },
    voz: [
      'Los cálculos de calcio. El de oxalato de calcio es el más frecuente: chico y duro. El oxalato sube por causas intestinales o por alimentos como la espinaca, el chocolate o el café. El de fosfato de calcio es más grande y más blando. Y los dos son radiopacos.',
      'Detrás suele haber una hipercalciuria: absortiva, porque el intestino absorbe calcio de más; renal, porque el riñón lo pierde; o resortiva, porque una paratiroides hiperactiva saca calcio del hueso.',
    ],
    refs: [T1('08:26'), T1('11:19'), T1('11:29'), T1('15:48')],
  },
  {
    id: 't-otros',
    sec: 'tipos',
    titulo: 'Estruvita, ácido úrico y cistina',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Estruvita', tono: 'lilac', text: 'Fosfato amónico magnésico. **Infección** por desdobladores de urea (**Proteus**), orina **alcalina**. **Coraliformes** («asta de ciervo»), casi siempre quirúrgicos.' },
      { t: 'def', term: 'Ácido úrico', tono: 'peach', en: 1, text: 'Orina **ácida**: gota, dieta rica en proteínas, enfermedades mieloproliferativas, diuréticos. **Radiolúcidos**. Se tratan alcalinizando.' },
      { t: 'def', term: 'Cistina', tono: 'sky', en: 2, text: 'Hereditaria (**autosómica recesiva**); niños y jóvenes.' },
    ],
    examen: { origen: 'ortega', texto: 'Los cálculos de estruvita y de ácido úrico.', cita: 'Y faltan dos cálculos más, que es importante tener en cuenta, y esta es pregunta del examen: litiasis por fosfato amónico magnésico, los famosos cálculos de estruvita.', ref: T2('05:10') },
    voz: [
      'Y los otros, también pregunta de examen. La estruvita, o fosfato amónico magnésico, es el cálculo de la infección: Proteus desdobla la urea, alcaliniza la orina, y el cálculo crece hasta ocupar la pelvis y los cálices como un molde, el coraliforme en asta de ciervo. Casi siempre requiere cirugía.',
      'El de ácido úrico se forma en orina ácida: la gota, una dieta rica en proteínas, algunas enfermedades de la sangre, los diuréticos. No se ve en la radiografía y se trata alcalinizando la orina. Y el de cistina es hereditario, de chicos y jóvenes.',
    ],
    refs: [T2('00:00'), T2('02:52'), T2('05:01'), T2('05:10'), T2('05:46'), T2('07:59'), N('32:41')],
  },
  {
    id: 't-colico',
    sec: 'clinica',
    titulo: 'El cólico renoureteral',
    fig: { f: 'urinario', vistas: [{ luz: ['ureter-d', 'pelvis-d'], calculo: 'ureter-d', dilata: ['pelvis-d', 'ureter-d'], irradia: true, tone: 'red' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Brusco, **cólico y fluctuante**, de la fosa lumbar al flanco, la fosa ilíaca y los **genitales**.' },
      { t: 'lista', en: 1, items: ['Paciente **inquieto**.', '**Hematuria isomórfica**, náuseas, vómitos, disuria.', '**Puñopercusión** positiva, puntos ureterales dolorosos.'] },
    ],
    examen: { origen: 'preguntero', texto: 'Defina el cólico renoureteral.' },
    voz: [
      'El cólico renoureteral empieza de golpe, es cólico y fluctuante, y va de la fosa lumbar al flanco, la fosa ilíaca y los genitales. El paciente está inquieto: se mueve todo el tiempo.',
      'Se acompaña de hematuria con glóbulos de forma normal, náuseas, vómitos y disuria. Al examen, la puñopercusión es positiva y duelen los puntos ureterales.',
    ],
    refs: [T2('10:53'), T2('11:36'), T2('12:19'), T2('13:00'), T2('13:40'), M1('09:54'), M1('10:35'), M1('11:15')],
  },
  {
    id: 't-donde',
    sec: 'clinica',
    titulo: 'Dónde está el cálculo',
    fig: { f: 'urinario', vistas: [{ luz: ['ureter-d'], estrecheces: true, tone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Pelvis renal', tono: 'gold', text: 'Puede ser asintomático; si tapa la unión pieloureteral, **hidronefrosis**.' },
      { t: 'def', term: 'Uréter: 3 estrecheces', tono: 'red', en: 0, text: 'Unión **pieloureteral**, **cruce de los ilíacos**, unión **ureterovesical**: ahí se traba.' },
      { t: 'def', term: 'Vejiga', tono: 'mint', en: 0, text: 'Disuria y hematuria; el dolor lumbar se alivia.' },
    ],
    voz: [
      'Dónde está el cálculo cambia el cuadro. En la pelvis renal puede no dar síntomas, o dar una hidronefrosis si tapa la salida. En el uréter se traba en sus tres estrecheces: la unión con la pelvis, el cruce con los vasos ilíacos y la entrada a la vejiga. Y cuando llega a la vejiga, el dolor lumbar se alivia y quedan la disuria y la hematuria.',
    ],
    refs: [T2('11:36'), T2('12:19'), T2('13:00')],
  },
  {
    id: 't-diferenciales',
    sec: 'clinica',
    titulo: 'Dolor lumbar: en qué más pensar',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Primero: **infección urinaria alta** o **cálculo**.' },
      { t: 'lista', en: 1, items: ['Infarto renal (muy doloroso).', 'Torsión del cordón espermático.', 'Causas digestivas, vasculares (aneurisma de aorta), traumáticas.', 'Herpes zóster.'] },
    ],
    voz: [
      'Ante un dolor en la fosa lumbar, lo primero es pensar en una infección urinaria alta o en un cálculo. Pero hay otros diagnósticos: el infarto renal, muy doloroso; la torsión del cordón espermático; causas digestivas, vasculares como un aneurisma de aorta, traumáticas; y el herpes zóster, antes de que aparezcan las vesículas.',
    ],
    refs: [T2('13:40'), T2('14:21')],
  },
  {
    id: 't-imagenes',
    sec: 'diagnostico',
    titulo: 'Imágenes',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Estudio', 'Qué muestra'],
        filas: [
          ['Rx directa de abdomen', 'Los **radiopacos** (calcio, estruvita); **no** el ácido úrico'],
          ['**Ecografía**', '**Sombra acústica** y la dilatación (hidronefrosis)'],
          ['Urograma excretor', 'El contraste delinea el radiolúcido y la obstrucción'],
          ['**TAC sin contraste**', 'El **estándar de oro** (cara, radiación)'],
        ],
      },
    ],
    voz: [
      'Las imágenes. La radiografía simple de abdomen muestra los cálculos radiopacos, los de calcio y estruvita, pero no los de ácido úrico. La ecografía muestra la sombra acústica del cálculo y la dilatación de la vía. El urograma excretor, con contraste, delinea hasta los radiolúcidos. Y la tomografía sin contraste es el estándar de oro, aunque es cara y da radiación.',
    ],
    refs: [T2('15:45'), T2('16:25'), T2('17:07'), T2('17:50'), L('p448')],
  },
  {
    id: 't-tamano',
    sec: 'diagnostico',
    titulo: 'Tamaño y laboratorio',
    amplio: true,
    bloques: [
      { t: 'def', term: '< 5 mm', tono: 'mint', text: 'Suele **eliminarse solo**.' },
      { t: 'def', term: '> 5 mm', tono: 'red', en: 0, text: 'Solo el **20 %** sale solo: tratamiento médico → **litotricia** → cirugía.' },
      { t: 'def', term: 'Laboratorio', tono: 'sky', en: 1, text: 'Función renal; calcio, fósforo, ácido úrico en sangre. Orina: pH, sedimento, urocultivo, **calcio en 24 h**, **citrato y magnesio**.' },
    ],
    voz: [
      'El tamaño decide la conducta. Un cálculo de menos de cinco milímetros suele eliminarse solo. Uno de más de cinco sale solo apenas en el veinte por ciento: se intenta el tratamiento médico, después la litotricia extracorpórea, y si no, la cirugía.',
      'Y el laboratorio busca la causa: la función renal, el calcio, el fósforo y el ácido úrico en sangre; y en la orina, el pH, el sedimento, el urocultivo, el calcio de veinticuatro horas, y el citrato y el magnesio.',
    ],
    refs: [T2('18:32'), T2('19:15'), T2('19:56'), T2('21:18')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'formacion', label: 'Qué es y cómo se forma' },
    { id: 'tipos', label: 'Tipos' },
    { id: 'clinica', label: 'El cólico' },
    { id: 'diagnostico', label: 'Diagnóstico' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'Ocho de cada diez en la guardia',
    texto: 'Hombre de 40 años en la guardia con dolor lumbar derecho brusco, que va y viene, irradiado a la ingle, con hematuria. La radiografía simple muestra una imagen radiopaca en el trayecto ureteral.',
    pregunta: '¿Qué tipo de cálculo es lo más probable?',
    opciones: [
      { text: 'Oxalato de calcio.', why: 'El más frecuente y radiopaco.' },
      { text: 'Ácido úrico.', why: 'Es radiolúcido: no se vería.' },
      { text: 'Cistina.', why: 'Rara; poco radiopaca.' },
      { text: 'Estruvita.', why: 'Radiopaca, pero menos frecuente y asociada a infección.' },
    ],
    correcta: 0,
    razonamiento: 'El profesor cuenta que de diez pacientes que vio en la guardia, ocho o nueve tenían cálculos de calcio.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Cálculo que no se ve',
    texto: 'Paciente con gota y cólico renoureteral. La radiografía simple es normal, pero la ecografía muestra un cálculo con sombra acústica e hidronefrosis. El pH urinario es 5.',
    pregunta: '¿Qué cálculo es y cómo se trata?',
    opciones: [
      { text: 'Ácido úrico: alcalinizar la orina.', why: 'Radiolúcido, orina ácida, gota.' },
      { text: 'Oxalato de calcio: dieta sin espinaca.', why: 'Se vería en la Rx.' },
      { text: 'Estruvita: antibióticos.', why: 'Se forma en orina alcalina.' },
      { text: 'No hay cálculo: la Rx es normal.', why: 'La ecografía lo muestra.' },
    ],
    correcta: 0,
    razonamiento: 'El ácido úrico no se ve en la Rx y precipita en orina ácida.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Infecciones a repetición y un cálculo grande',
    texto: 'Mujer con infecciones urinarias a repetición por Proteus. La orina es alcalina y la imagen muestra un cálculo que ocupa toda la pelvis y los cálices.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Cálculo coraliforme de estruvita.', why: 'Proteus desdobla la urea y alcaliniza la orina.' },
      { text: 'Cálculo de cistina.', why: 'Es hereditario, sin relación con Proteus.' },
      { text: 'Cálculo de ácido úrico.', why: 'Se forma en orina ácida.' },
      { text: 'Tumor renal.', why: 'La imagen es de un cálculo que moldea la vía.' },
    ],
    correcta: 0,
    razonamiento: 'Infección por desdobladores de urea → orina alcalina → estruvita en asta de ciervo.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'lit',
        label: 'Litiasis renoureteral',
        tone: 'gold',
        examen: true,
        nota: 'Orina sobresaturada → nucleación → cálculo · citrato y magnesio la frenan',
        hijos: [
          { id: 'tip', label: 'Tipos', tone: 'gold', examen: true, nota: '**Cálcicos** (oxalato, el más frecuente) · estruvita (Proteus) · ácido úrico (radiolúcido) · cistina' },
          { id: 'fac', label: 'Factores', tone: 'peach', examen: true, nota: 'Poca agua · dieta · metabólicos · infecciones · pocos inhibidores' },
          { id: 'col', label: 'Cólico', tone: 'red', nota: 'Fluctuante, de la fosa lumbar a los genitales · hematuria isomórfica · inquieto' },
          { id: 'dx', label: 'Diagnóstico', tone: 'sky', nota: 'Rx (radiopacos) · ecografía · **TAC sin contraste** · < 5 mm sale solo' },
        ],
      },
    ],
    nexos: ['**El calcio se ve; el ácido úrico, no.**', '**Proteus + orina alcalina = estruvita coraliforme.**'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren07-d01', 'ren07-d02', 'ren07-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    formacion: { tab: 'teoria', seccion: 'formacion' },
    tipos: { tab: 'teoria', seccion: 'tipos' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    diagnostico: { tab: 'teoria', seccion: 'diagnostico' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
