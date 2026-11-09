import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-10: clase visual de la peritonitis.
 *  1. Clases de Ortega: «Peritonitis parte 1» (00:02–24:27) y «parte 2» (00:00–05:51).
 *  2. Libro de Clínica Médica de Ortega (p. 383–384): definición, plastrón, fisiopatogenia, clínica y examen físico.
 *  3. Preguntero: «Cuadro de diferenciación de peritonitis primaria, secundaria y terciaria» y «Blumberg y Gueneau de Mussy».
 * Correcciones sin atribuir (ver content/traceability/dig-10.md): peritonitis aséptica = química; la pancreatitis no da
 * peritonitis primaria; tratamiento de la secundaria = quirúrgico; neutrófilos por mm³.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P1 = (t: string) => r('perit-1', t);
const P2 = (t: string) => r('perit-2', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-normal',
    sec: 'extension',
    titulo: 'El peritoneo normal',
    etapas: ['normal'],
    fig: { f: 'peritoneo', vistas: ['normal'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'normal', text: '**Parietal**: tapiza la pared. Tiene inervación somática: su dolor es **intenso y localizado**.' },
          { k: 'normal', text: '**Visceral**: cubre los órganos. Su dolor es sordo y difuso.' },
          { k: 'normal', text: 'Entre las dos, una cavidad **virtual y estéril**.' },
        ],
      },
    ],
    aclara: { text: 'La diferencia de inervación entre las dos hojas explica por qué el dolor a la descompresión indica irritación parietal.', origen: GRAL },
    voz: [
      'Para entender la peritonitis, primero el peritoneo normal, en un corte del abdomen. La hoja parietal tapiza por dentro la pared abdominal. Tiene la misma inervación que la pared, y por eso, cuando se irrita, duele mucho y en un punto preciso.',
      'La hoja visceral envuelve a los órganos: el hígado, el estómago, cada asa intestinal. Su dolor es sordo y mal localizado.',
      'Entre las dos hojas queda una cavidad virtual, con apenas una película de líquido, y estéril. Peritonitis es la inflamación de esa serosa.',
    ],
    refs: [P1('00:02'), P1('01:29'), P1('02:58'), L('383')],
  },
  {
    id: 'f-plastron',
    sec: 'extension',
    titulo: 'Plastrón: localizada',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'peritoneo', vistas: ['plastron'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Un órgano se inflama: por ejemplo, un **apéndice** supurado o gangrenoso.' },
          { k: 'mecanismo', text: 'Toca el peritoneo visceral, que irrita al **parietal** de la pared anterior. El proceso queda encapsulado.' },
          { k: 'signo', text: 'Dolor **en un solo punto**: Blumberg positivo ahí.' },
        ],
      },
    ],
    voz: [
      'El ejemplo de la clase: un compañero con una apendicitis supurada o gangrenosa, en la fosa ilíaca derecha.',
      'El apéndice inflamado toca el peritoneo visceral, que irrita al parietal, y el parietal a la pared anterior del abdomen. El proceso queda como encapsulado ahí.',
      'Entonces duele en ese punto solo. Eso es el plastrón: una peritonitis localizada, en contacto con la pared anterior.',
    ],
    refs: [P1('00:44'), P1('01:29'), P1('02:13'), L('383')],
  },
  {
    id: 'f-generalizada',
    sec: 'extension',
    titulo: 'Generalizada: todo el peritoneo',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'peritoneo', vistas: ['generalizada'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La infección alcanza **toda la serosa**.' },
          { k: 'mecanismo', text: 'Todo el parietal irritado: la pared se contrae para protegerse; el intestino deja de moverse.' },
          { k: 'signo', text: 'Dolor **difuso** que empeora al moverse o toser · **abdomen en tabla** · RHA ausentes (**íleo paralítico**).' },
        ],
      },
    ],
    voz: [
      'Si la infección alcanza toda la serosa, la peritonitis es generalizada.',
      'Todo el peritoneo parietal está irritado: la musculatura de la pared se contrae para protegerlo, y el intestino, bañado en inflamación, deja de moverse.',
      'El dolor es intenso y difuso, empeora con los movimientos, la tos y el estornudo, y el paciente flexiona las piernas para no estirar el peritoneo. El abdomen está en tabla y no se escuchan ruidos: es un íleo paralítico.',
    ],
    refs: [P1('02:13'), P1('22:15'), P1('23:39'), L('383'), L('384')],
  },
  {
    id: 'f-pbe',
    sec: 'tipos',
    titulo: 'PBE: sin perforación',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'peritoneo', vistas: ['pbe'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Cirrosis** con hipertensión portal: las venas del intestino se congestionan y hay **ascitis**.' },
          { k: 'mecanismo', text: 'Bacterias de la flora atraviesan la pared y llegan a la ascitis por la linfa o la sangre: **traslocación bacteriana**.' },
          { k: 'signo', text: 'Ascitis infectada por **un solo germen** (E. coli). Tratamiento **médico**.' },
        ],
      },
    ],
    aclara: { text: 'La pared intestinal congestiva se vuelve más permeable, y el hígado cirrótico depura peor las bacterias que llegan a la sangre.', origen: GRAL },
    voz: [
      'La peritonitis primaria, o bacteriana espontánea. El paciente es un cirrótico: el hígado duro aumenta la presión en la vena porta, las venas del intestino se congestionan, y se acumula ascitis.',
      'La pared del intestino congestiva se vuelve más permeable, y bacterias de la flora normal la atraviesan, pasan a la linfa o a la sangre, y llegan al líquido ascítico. Eso es la traslocación bacteriana: no hay ninguna perforación.',
      'El resultado es una ascitis infectada por un solo germen, en general Escherichia coli. Y como no hay nada perforado, se trata con antibióticos, sin cirugía.',
    ],
    refs: [P1('06:49'), P1('07:35'), P1('08:21'), P1('10:37'), P1('11:20'), P1('12:06'), L('383')],
  },
  {
    id: 'f-perforacion',
    sec: 'tipos',
    titulo: 'Secundaria: se perfora una víscera',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'peritoneo', vistas: ['perforacion'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Se perfora una víscera hueca: apéndice, estómago, intestino.' },
          { k: 'mecanismo', text: 'Sale su contenido, con **muchas bacterias** y **aire**, a la cavidad.' },
          { k: 'signo', text: 'Peritonitis **polimicrobiana**, de comienzo brusco. Tratamiento **quirúrgico**.' },
        ],
      },
    ],
    voz: [
      'La peritonitis secundaria, la más frecuente. Se perfora una víscera hueca: el apéndice, el estómago por una úlcera, el intestino.',
      'Por el agujero sale el contenido, con muchísimas bacterias distintas, y también aire.',
      'La infección es polimicrobiana, el dolor empieza de golpe, y hay que operar para cerrar la perforación.',
    ],
    refs: [P1('15:43'), P1('16:23'), P1('17:52'), L('383')],
  },
  {
    id: 'f-jobert',
    sec: 'clinica',
    titulo: 'El aire libre: signo de Jobert',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'peritoneo', vistas: ['jobert'] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'El aire sube a lo más alto: con el paciente acostado, adelante, entre la pared y el **hígado**.' },
          { k: 'signo', text: 'Donde se percutía **matidez hepática**, ahora hay **timpanismo**: signo de Jobert.' },
          { k: 'signo', text: 'En la Rx de pie: aire bajo el diafragma (**neumoperitoneo**).' },
        ],
      },
    ],
    voz: [
      'Ese aire que escapa de la víscera perforada sube a lo más alto. Con el paciente acostado, lo más alto es adelante: se ubica entre la pared y el hígado.',
      'Normalmente, sobre el hígado se percute matidez. Ahora el aire se interpone, y se percute timpanismo. Eso es el signo de Jobert.',
      'Y en la radiografía de pie, el aire se ve debajo del diafragma: es el neumoperitoneo.',
    ],
    refs: [P1('22:56'), P2('02:08'), L('384')],
  },
  {
    id: 'f-descompresion',
    sec: 'clinica',
    titulo: 'Por qué duele al soltar',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'peritoneo', vistas: ['plastron', 'generalizada'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Al comprimir se mueve el visceral; al **soltar de golpe**, la pared rebota y sacude el **parietal**: si está inflamado, duele.' },
      { t: 'def', term: 'Blumberg', tono: 'peach', en: 0, text: 'Dolor a la descompresión **localizado**: plastrón.' },
      { t: 'def', term: 'Gueneau de Mussy', tono: 'red', en: 1, text: 'Dolor a la descompresión **generalizado**: peritonitis difusa.' },
    ],
    voz: [
      'Y la palpación tiene su porqué. Al hundir la mano lentamente, se comprime el peritoneo visceral. Al soltar de golpe, la pared rebota y sacude al peritoneo parietal: si está inflamado, el dolor aparece o empeora. Si ese dolor es localizado, es el signo de Blumberg, el del plastrón.',
      'Si el dolor a la descompresión aparece en todo el abdomen, es el signo de Gueneau de Mussy: la peritonitis está generalizada.',
    ],
    refs: [P1('23:39'), L('384')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'extension', label: 'Localizada o generalizada' },
    { id: 'tipos', label: 'Primaria y secundaria' },
    { id: 'clinica', label: 'Los signos' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'extension',
    titulo: 'Peritonitis',
    fig: { f: 'peritoneo', vistas: ['normal'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'Inflamación de la **serosa peritoneal**, sea cual sea la causa. En la práctica, casi siempre es una **infección**.' },
      { t: 'texto', en: 1, text: '**Generalizada**: todo el peritoneo. **Localizada**: el plastrón.' },
    ],
    examen: { origen: 'ortega', texto: 'Peritonitis: en el parcial, el oral y el final.', cita: 'La peritonitis es muy preguntada, tienen que saber peritonitis sí o sí; la van a preguntar muchísimo en el parcial.', ref: P1('00:02') },
    voz: [
      'La peritonitis es la inflamación de la serosa peritoneal, sea cual sea su causa, aunque en la práctica casi siempre es una infección. El profesor avisa que se pregunta muchísimo: en el parcial, en el oral y en el final.',
      'Puede ser generalizada, cuando se inflama todo el peritoneo, o localizada: el plastrón.',
    ],
    refs: [P1('00:02'), P1('00:44'), L('383')],
  },
  {
    id: 't-plastron',
    sec: 'extension',
    titulo: 'Plastrón',
    fig: { f: 'peritoneo', vistas: ['plastron'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'peach', text: 'Peritonitis **localizada**, en contacto con la **pared anterior** del abdomen.' },
      { t: 'texto', en: 1, text: 'Ejemplo: una apendicitis supurada o gangrenosa en la fosa ilíaca derecha. Duele solo en ese punto.' },
    ],
    examen: { origen: 'ortega', texto: 'El plastrón, en general dentro de un caso clínico.', cita: 'Es una peritonitis localizada y es pregunta de parcial; siempre suelen poner algún caso clínico donde habla sobre el plastrón.', ref: P1('02:19') },
    voz: [
      'El plastrón es una peritonitis localizada, en contacto con la pared anterior del abdomen. Es pregunta de parcial, y suele venir dentro de un caso clínico.',
      'El ejemplo típico es una apendicitis supurada o gangrenosa: el apéndice irrita el peritoneo de la fosa ilíaca derecha, el proceso queda encapsulado, y duele solo ahí.',
    ],
    refs: [P1('00:44'), P1('01:29'), P1('02:13'), P1('02:19'), L('383')],
  },
  {
    id: 't-clasificacion',
    sec: 'extension',
    titulo: 'Clasificación',
    amplio: true,
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: '**Peritonitis**',
          tono: 'red',
          hijos: [
            { t: 'Por localización', tono: 'peach', hijos: [{ t: 'Generalizada' }, { t: 'Localizada: **plastrón**', examen: true }] },
            { t: 'Por etiología', tono: 'lilac', hijos: [{ t: 'Aséptica', d: 'Sin gérmenes: irritación química' }, { t: 'Séptica', d: 'Primaria · secundaria · terciaria', examen: true }] },
          ],
        },
      },
    ],
    aclara: { text: 'La aséptica es una irritación química del peritoneo: bilis, jugo pancreático, sangre o contenido gástrico en las primeras horas.', origen: GRAL },
    voz: [
      'Se clasifica de dos maneras. Por su localización: generalizada o localizada, que es el plastrón.',
      'Y por su etiología: aséptica, sin gérmenes, cuando lo que irrita al peritoneo es una sustancia química, como la bilis o el jugo pancreático; o séptica, con infección, que se divide en primaria, secundaria y terciaria.',
    ],
    refs: [P1('02:58'), P1('03:45'), P1('04:38')],
  },
  {
    id: 't-tres',
    sec: 'tipos',
    titulo: 'Primaria, secundaria y terciaria',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Primaria (PBE)', 'Secundaria', 'Terciaria'],
        filas: [
          ['Causa', '**Sin perforación**: traslocación bacteriana', '**Perforación** de víscera hueca o infección de un órgano', '**Iatrogénica**: cirugía, trauma abierto'],
          ['Paciente', '**Cirrótico** con ascitis; síndrome nefrótico', 'Abdomen agudo perforativo', 'Operado o herido'],
          ['Gérmenes', '**Monomicrobiana** (E. coli)', '**Polimicrobiana**', 'Desde el exterior'],
          ['Frecuencia', '', '**La más frecuente**', ''],
          ['Tratamiento', '**Médico**: antibióticos', '**Quirúrgico**', 'Quirúrgico'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'El plastrón y las peritonitis primaria, secundaria y terciaria.', cita: 'La que le van a preguntar a ustedes obviamente es plastrón y obviamente estos tres: sí o sí me tienen que saber.', ref: P1('06:17') },
    voz: [
      'La peritonitis séptica tiene tres formas, que el profesor pide sí o sí junto con el plastrón. La primaria, o bacteriana espontánea: no hay perforación, se produce por traslocación bacteriana, en un cirrótico con ascitis o en un síndrome nefrótico; la produce un solo germen, Escherichia coli, y se trata con antibióticos.',
      'La secundaria, la más frecuente: una perforación de víscera hueca o la infección de un órgano, como una apendicitis o una colecistitis. Es polimicrobiana y quirúrgica.',
      'Y la terciaria es iatrogénica: los gérmenes llegan desde afuera, en una cirugía o un traumatismo abierto del abdomen.',
    ],
    refs: [P1('04:38'), P1('05:24'), P1('06:17'), P1('12:48'), P1('16:23'), P1('17:09'), L('383')],
  },
  {
    id: 't-pbe',
    sec: 'tipos',
    titulo: 'Peritonitis bacteriana espontánea',
    fig: { f: 'peritoneo', vistas: ['pbe'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'sky', text: 'Infección de la **ascitis** sin perforación: **urgencia médica**.' },
      { t: 'lista', en: 1, items: ['**Cirrosis avanzada** con hipertensión portal (80–90 %); también el **síndrome nefrótico**.', '**Monomicrobiana**: E. coli.', 'Tratamiento **médico**: cefalosporinas de 3.ª o 4.ª generación.'] },
    ],
    voz: [
      'La peritonitis bacteriana espontánea es la infección del líquido ascítico sin ninguna perforación, y es una urgencia médica.',
      'Si escuchan PBE, piensen en un cirrótico: la cirrosis avanzada con hipertensión portal explica el ochenta a noventa por ciento. También puede darla el síndrome nefrótico, que pierde proteínas, hace edema generalizado y puede acumular ascitis. Es monomicrobiana, por Escherichia coli, y se trata con cefalosporinas de tercera o cuarta generación.',
    ],
    refs: [P1('06:49'), P1('12:48'), P1('13:34'), P1('14:16'), P1('15:43'), L('383')],
  },
  {
    id: 't-secundaria',
    sec: 'tipos',
    titulo: 'Secundaria y terciaria',
    fig: { f: 'peritoneo', vistas: ['perforacion'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Secundaria', tono: 'red', text: 'Perforación de víscera hueca (apéndice, úlcera, intestino) o infección de un órgano (apendicitis, colecistitis). **Polimicrobiana**, **quirúrgica**.' },
      { t: 'def', term: 'Terciaria', tono: 'lilac', en: 1, text: 'El germen llega **desde el exterior**: cirugía (una perforación accidental), heridas o traumatismos abiertos.' },
    ],
    voz: [
      'La secundaria aparece cuando se perfora el apéndice, una úlcera o el intestino, o cuando se infecta un órgano como la vesícula. Pasan muchos microorganismos a la cavidad, y la solución es quirúrgica.',
      'Y la terciaria es la que llega desde afuera: durante una cirugía en la que se perfora un órgano o se derrama un absceso, o por una herida abierta del abdomen.',
    ],
    refs: [P1('15:43'), P1('16:23'), P1('17:09'), L('383')],
  },
  {
    id: 't-clinica',
    sec: 'clinica',
    titulo: 'Clínica',
    amplio: true,
    bloques: [
      { t: 'clave', text: '**Dolor abdominal**: el síntoma predominante. Generalizado: intenso, difuso, empeora con los movimientos y la tos.' },
      { t: 'lista', en: 1, items: ['**Fiebre** (80 %).', 'Náuseas y vómitos.', 'El paciente **flexiona las piernas**.'] },
      { t: 'def', term: 'En la PBE', tono: 'sky', en: 2, text: 'Más **solapada**: dolor menos intenso, puede no haber fiebre; vómitos raros.' },
    ],
    voz: [
      'La clínica es la de un abdomen agudo perforativo. El síntoma predominante es el dolor; cuando la peritonitis se generaliza, es intenso, difuso, y empeora con los movimientos, la tos y el estornudo.',
      'Se acompaña de fiebre, en el ochenta por ciento, náuseas y vómitos, y el paciente flexiona las piernas.',
      'En la peritonitis bacteriana espontánea, en cambio, el cuadro es más solapado: lo infectado es el líquido, el dolor es menos intenso, puede no haber fiebre, y los vómitos son raros.',
    ],
    refs: [P1('17:09'), P1('17:52'), P1('18:37'), P1('19:23'), L('383')],
  },
  {
    id: 't-facies',
    sec: 'clinica',
    titulo: 'Anamnesis y aspecto general',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Anamnesis', tono: 'peach', text: '¿Cirrosis, **alcohol**, síndrome nefrótico? (PBE). ¿Enfermedad abdominal previa? Semiología completa del **dolor**.' },
      { t: 'def', term: 'Aspecto', tono: 'red', en: 1, text: 'Facies **pálida y dolorosa**, ojos hundidos, **taquicardia**, deshidratación e **hipotensión**.' },
    ],
    voz: [
      'En la anamnesis se busca la causa. Si se sospecha una PBE, se pregunta por la cirrosis: el alcohol, desde cuándo, los antecedentes familiares. Si se sospecha una perforación, se hace una semiología completa del dolor.',
      'Al examen general, el paciente tiene la facies pálida y dolorosa, los ojos hundidos, taquicardia, y signos de deshidratación e hipotensión: es la repercusión de la infección y del dolor.',
    ],
    refs: [P1('20:06'), P1('20:48'), L('383')],
  },
  {
    id: 't-examen',
    sec: 'clinica',
    titulo: 'Examen del abdomen: PBE o perforación',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'PBE', 'Secundaria (perforación)'],
        filas: [
          ['Inspección', 'Abdomen **globoso** (ascitis)', 'Abdomen **en tabla**, no se mueve con la respiración'],
          ['Auscultación', 'RHA presentes', 'RHA **ausentes** (íleo paralítico)'],
          ['Percusión', '**Matidez** (líquido)', '**Timpanismo**; Jobert'],
          ['Palpación', 'Dolor leve', '**Contractura**; Blumberg o Gueneau de Mussy'],
        ],
      },
    ],
    voz: [
      'En el abdomen, las dos peritonitis se diferencian. Inspección: en la PBE el abdomen está globoso, por la ascitis; en la perforación está plano, en tabla, y no acompaña la respiración.',
      'Auscultación: en la PBE el intestino sigue moviéndose; en la perforación hay íleo paralítico y no hay ruidos. Percusión: matidez por el líquido en la PBE; timpanismo, y el signo de Jobert, en la perforación. Y a la palpación, la perforación da contractura y dolor a la descompresión.',
    ],
    refs: [P1('20:06'), P1('21:32'), P1('22:15'), P1('23:39'), L('384')],
  },
  {
    id: 't-jobert',
    sec: 'clinica',
    titulo: 'Signo de Jobert',
    fig: { f: 'peritoneo', vistas: ['jobert'] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', tono: 'peach', text: 'Desaparece la **matidez hepática** y se percute **timpanismo**: el aire de una víscera perforada se interpone sobre el hígado.' },
      { t: 'texto', en: 1, text: 'En la Rx de tórax de pie: aire subdiafragmático (**neumoperitoneo**).' },
    ],
    examen: { origen: 'ortega', texto: 'El signo de Jobert.', cita: '¿Recuerdan cuál era el signo de Jobert? Pregunta de parcial.', ref: P1('23:05') },
    voz: [
      'El signo de Jobert, pregunta de parcial: al percutir el área hepática, donde debería haber matidez, hay timpanismo. Es el aire que escapó de una víscera hueca perforada y se interpuso sobre el hígado.',
      'En la radiografía de tórax de pie, ese mismo aire se ve debajo del diafragma: el neumoperitoneo.',
    ],
    refs: [P1('22:56'), P1('23:05'), P2('02:08'), L('384')],
  },
  {
    id: 't-blumberg',
    sec: 'clinica',
    titulo: 'Blumberg y Gueneau de Mussy',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Los dos son **dolor a la descompresión**: irritación del **peritoneo parietal**.' },
      { t: 'def', term: 'Blumberg', tono: 'peach', en: 1, text: '**Localizado**: plastrón (fosa ilíaca derecha en la apendicitis).' },
      { t: 'def', term: 'Gueneau de Mussy', tono: 'red', en: 1, text: '**Generalizado**: peritonitis difusa.' },
      { t: 'texto', en: 2, text: '**Contractura**: involuntaria, abdomen en tabla. **Defensa**: voluntaria.' },
    ],
    examen: { origen: 'preguntero', texto: '¿Qué es el signo de Blumberg y el de Gueneau de Mussy?' },
    voz: [
      'Blumberg y Gueneau de Mussy son el mismo fenómeno: dolor al descomprimir, que indica irritación del peritoneo parietal.',
      'La diferencia es la extensión. Blumberg es localizado, como en el plastrón de la apendicitis. Gueneau de Mussy es generalizado, el de la peritonitis difusa.',
      'Y no hay que confundir contractura con defensa: la contractura es involuntaria, el abdomen en tabla; la defensa es voluntaria.',
    ],
    refs: [P1('23:39'), L('384')],
  },
  {
    id: 't-lab',
    sec: 'estudios',
    titulo: 'Laboratorio',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Qué se busca', 'Qué aparece'],
        filas: [
          ['Infección', '**Leucocitosis** > 15.000/mm³ con desviación a la izquierda (neutrófilos); ↑ **PCR** y eritrosedimentación'],
          ['Sangrado', 'Hematocrito bajo, si hay hemorragia intraabdominal'],
          ['Riñón y medio interno', 'Función renal, electrolitos; **acidosis metabólica** con alcalosis respiratoria compensadora'],
          ['Páncreas', '**Amilasa**, si se sospecha una pancreatitis'],
        ],
      },
    ],
    voz: [
      'Los complementarios son tres: laboratorio, imágenes y punción abdominal. En el laboratorio, la infección da leucocitosis de más de quince mil, con predominio de neutrófilos, y aumentan los reactantes de fase aguda, la PCR y la eritrosedimentación. Si cae el hematocrito, hay que pensar en una hemorragia intraabdominal.',
      'Se controla la función renal, que puede alterarse, los electrolitos y el estado ácido base: suele haber una acidosis metabólica, compensada con una alcalosis respiratoria. Y la amilasa, si se sospecha una pancreatitis.',
    ],
    refs: [P2('00:00'), P2('00:42'), P2('01:24')],
  },
  {
    id: 't-imagenes',
    sec: 'estudios',
    titulo: 'Imágenes',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Rx de tórax y abdomen', tono: 'lilac', text: 'Buscan la **perforación**: aire bajo el diafragma.' },
      { t: 'def', term: 'Ecografía', tono: 'mint', en: 1, text: 'La **más usada** (accesible y barata): **líquido libre** y el órgano comprometido (apéndice, vesícula, estómago).' },
      { t: 'def', term: 'Tomografía', tono: 'sky', en: 1, soloWeb: true, text: 'Útil en casos dudosos.' },
    ],
    voz: [
      'En imágenes, la radiografía simple de abdomen y la de tórax buscan una perforación: el aire debajo del diafragma, el mismo aire que da el signo de Jobert.',
      'La más usada es la ecografía, porque es accesible y barata: muestra el líquido libre y, muchas veces, el órgano comprometido, como el apéndice, la vesícula o el estómago.',
    ],
    refs: [P2('02:08'), P2('02:55')],
  },
  {
    id: 't-paracentesis',
    sec: 'estudios',
    titulo: 'Paracentesis',
    fig: { f: 'peritoneo', vistas: ['pbe'] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'gold', text: 'Punción abdominal: **diagnóstica y terapéutica** (drena el líquido).' },
      { t: 'def', term: 'Neutroascitis', tono: 'red', en: 1, text: '**Más de 250 neutrófilos por mm³** en el líquido ascítico: diagnóstico de certeza de **PBE**.' },
      { t: 'prof', en: 1, text: 'Eso es necesario que lo sepan; se lo pueden preguntar en el oral o en el choice.', ref: P2('05:22') },
    ],
    examen: { origen: 'ortega', texto: 'La paracentesis y el número de neutrófilos.', cita: 'Tienen que sabérsela como si fuese el Padre Nuestro a lo que es la paracentesis.', ref: P2('04:13') },
    voz: [
      'Y la punción abdominal, la paracentesis, que el profesor pide como el Padre Nuestro. Cumple dos funciones: diagnóstica, porque confirma que la ascitis está infectada, y terapéutica, porque drena el líquido.',
      'El número que hay que saber: más de doscientos cincuenta neutrófilos por milímetro cúbico en el líquido ascítico. Eso se llama neutroascitis, y da el diagnóstico de certeza de peritonitis bacteriana espontánea.',
    ],
    refs: [P2('03:42'), P2('04:13'), P2('04:25'), P2('05:09'), P2('05:22')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'extension', label: 'Qué es y plastrón' },
    { id: 'tipos', label: 'Primaria, secundaria, terciaria' },
    { id: 'clinica', label: 'Clínica y examen' },
    { id: 'estudios', label: 'Complementarios' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'clase',
    titulo: 'El compañero con apendicitis',
    texto: 'Joven con apendicitis de varios días, supurada. Ahora tiene dolor intenso pero solo en la fosa ilíaca derecha, con dolor a la descompresión en ese punto. El resto del abdomen es blando.',
    pregunta: '¿Qué complicación tiene?',
    opciones: [
      { text: 'Un plastrón: peritonitis localizada contra la pared anterior.', why: 'El dolor queda en un punto: Blumberg localizado.' },
      { text: 'Una peritonitis generalizada.', why: 'El resto del abdomen está blando.' },
      { text: 'Una peritonitis bacteriana espontánea.', why: 'No tiene cirrosis ni ascitis.' },
      { text: 'Una peritonitis terciaria.', why: 'No fue operado.' },
    ],
    correcta: 0,
    razonamiento: 'El apéndice inflamado irrita el peritoneo parietal de la pared anterior y el proceso queda encapsulado: plastrón.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Cirrótico con fiebre',
    texto: 'Hombre de 58 años, alcohólico, con cirrosis y ascitis. Consulta por fiebre y dolor abdominal leve. Abdomen globoso, con matidez en los flancos y ruidos hidroaéreos presentes. Paracentesis: 600 neutrófilos/mm³.',
    pregunta: '¿Qué tiene y qué se hace?',
    opciones: [
      { text: 'PBE: antibióticos (cefalosporinas), sin cirugía.', why: 'Más de 250 neutrófilos/mm³ en un cirrótico con ascitis.' },
      { text: 'Peritonitis secundaria: cirugía de urgencia.', why: 'No hay tabla ni signos de perforación.' },
      { text: 'Ascitis no infectada: solo drenar.', why: 'Supera los 250 neutrófilos/mm³.' },
      { text: 'Plastrón: observación.', why: 'No es una inflamación localizada.' },
    ],
    correcta: 0,
    razonamiento: 'Cirrosis + ascitis + neutroascitis: peritonitis bacteriana espontánea, monomicrobiana, de tratamiento médico.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Dolor brusco en un ulceroso',
    texto: 'Mujer con antecedente de úlcera duodenal que hace dos horas sintió un dolor epigástrico brusco, «como una puñalada», que se extendió a todo el abdomen. Abdomen en tabla, no se mueve con la respiración, ruidos ausentes, timpanismo en el área hepática.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Peritonitis secundaria por perforación: cirugía.', why: 'Tabla, silencio y Jobert: perforación de víscera hueca.' },
      { text: 'PBE.', why: 'No es cirrótica y hay perforación.' },
      { text: 'Plastrón.', why: 'El dolor es generalizado.' },
      { text: 'Íleo mecánico.', why: 'Daría ruidos de lucha, no tabla.' },
    ],
    correcta: 0,
    razonamiento: 'El aire libre tapa la matidez hepática (Jobert). Peritonitis secundaria, polimicrobiana y quirúrgica.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Fiebre después de una cirugía',
    texto: 'A los cinco días de una cirugía abdominal, un paciente presenta fiebre, dolor abdominal difuso y dolor a la descompresión en todo el abdomen.',
    pregunta: '¿Cómo se clasifica?',
    opciones: [
      { text: 'Peritonitis terciaria (iatrogénica), generalizada: Gueneau de Mussy.', why: 'El germen llegó durante la cirugía; el dolor a la descompresión es difuso.' },
      { text: 'Peritonitis primaria.', why: 'No es espontánea.' },
      { text: 'Plastrón.', why: 'Es generalizada.' },
      { text: 'Peritonitis aséptica.', why: 'Hay fiebre: es infecciosa.' },
    ],
    correcta: 0,
    razonamiento: 'Posquirúrgica = terciaria. Dolor a la descompresión en todo el abdomen = Gueneau de Mussy.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'loc',
        label: 'Por localización',
        tone: 'peach',
        examen: true,
        nota: 'Inflamación de la serosa peritoneal',
        hijos: [
          { id: 'gen', label: 'Generalizada', tone: 'red', nota: 'Dolor difuso · tabla · íleo paralítico · **Gueneau de Mussy**' },
          { id: 'pla', label: 'Plastrón', tone: 'peach', examen: true, nota: 'Localizada contra la pared anterior · **Blumberg**' },
        ],
      },
      {
        id: 'sep',
        label: 'Séptica',
        tone: 'red',
        examen: true,
        nota: 'Primaria, secundaria y terciaria',
        hijos: [
          { id: 'pbe', label: 'Primaria (PBE)', tone: 'sky', examen: true, nota: 'Cirrosis con ascitis · traslocación · **monomicrobiana** · médica · **> 250 neutrófilos/mm³**' },
          { id: 'sec', label: 'Secundaria', tone: 'red', examen: true, nota: '**La más frecuente** · perforación · **polimicrobiana** · quirúrgica · **Jobert**' },
          { id: 'ter', label: 'Terciaria', tone: 'lilac', nota: 'Iatrogénica: cirugía, trauma abierto' },
        ],
      },
    ],
    nexos: ['**Abdomen globoso y matidez:** pensar en PBE (ascitis).', '**Tabla, silencio y timpanismo hepático:** perforación.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig10-d01', 'dig10-d02', 'dig10-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    extension: { tab: 'teoria', seccion: 'extension' },
    tipos: { tab: 'teoria', seccion: 'tipos' },
    clinica: { tab: 'teoria', seccion: 'clinica' },
    estudios: { tab: 'teoria', seccion: 'estudios' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
