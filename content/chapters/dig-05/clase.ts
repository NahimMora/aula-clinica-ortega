import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * dig-05: clase visual del examen físico del aparato digestivo.
 *  1. Teórico de Ortega: EF Digestivo 1 y 2. La práctica de maniobras (sábado) no está grabada: sus nombres salen
 *     de las fotos de pizarra (hígado, bazo, vesícula) y su técnica del apunte del profesor (libro p. 356–367).
 *  2. Libro de Clínica Médica de Ortega (p. 359–367): técnica de cada maniobra y valores.
 *  3. Preguntero: el bloque de digestivo no trae preguntas propias de examen físico; los avisos son los de la clase.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const E1 = (t: string) => r('ef-dig-1', t);
const E2 = (t: string) => r('ef-dig-2', t);
const L = (p: string) => r('libro', undefined, p);
const PZ = r('pizarra');

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-sonidos',
    sec: 'bases',
    titulo: 'Por qué suena hueco o suena mate',
    etapas: ['normal'],
    fig: { f: 'perfil-liquido' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Timpanismo', tono: 'sky', text: 'Debajo hay **gas**: casi todo el abdomen, por las asas.' },
      { t: 'def', term: 'Matidez', tono: 'peach', en: 1, text: 'Debajo hay algo **sólido o líquido**: el hígado, el bazo, un tumor, ascitis.' },
      { t: 'texto', en: 1, text: 'La **forma** del límite mate dice qué es: cóncava = líquido libre; convexa = una masa.' },
    ],
    voz: [
      'Empecemos por la física del examen. Cuando percutís sobre gas, la pared vibra y suena hueco: es el timpanismo, que ocupa casi todo el abdomen por el aire de las asas.',
      'Cuando debajo hay algo sólido o líquido, la vibración se apaga: es la matidez. Así suenan el hígado y el bazo, un tumor o la ascitis. Y la forma del límite te dice qué es: el líquido libre deja un borde cóncavo hacia arriba; una masa, un borde convexo.',
    ],
    refs: [E2('00:49'), E2('04:58'), E2('05:42')],
  },
  {
    id: 'f-orden',
    sec: 'bases',
    titulo: 'Por qué se ausculta antes de palpar',
    etapas: ['normal'],
    fig: { f: 'intestino', modo: 'normal' },
    anchoFig: 'grande',
    bloques: [
      { t: 'clave', text: 'Palpar **estimula** el peristaltismo y cambia los ruidos hidroaéreos.' },
      { t: 'texto', en: 1, text: 'Por eso en el abdomen el orden es **inspección, auscultación, percusión y palpación**.' },
    ],
    voz: [
      'Y por qué en el abdomen el orden cambia respecto del tórax. Si primero palpás, movés las asas, estimulás el peristaltismo y modificás los ruidos que querías escuchar.',
      'Por eso se ausculta antes: inspección, auscultación, percusión y, al final, palpación.',
    ],
    refs: [E1('05:00'), E1('05:42')],
  },
  {
    id: 'f-ascitis',
    sec: 'liquido',
    titulo: 'Ascitis: el líquido cae, las asas flotan',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'ascitis' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Boca arriba', tono: 'peach', text: 'El líquido va a los **flancos**; las asas con gas flotan arriba: matidez de **concavidad superior**.' },
      { t: 'def', term: 'De costado', tono: 'sky', en: 1, text: 'El líquido libre **se corre** al lado declive: es la **matidez desplazable**.' },
    ],
    aclara: { text: 'Si el líquido está **encapsulado** no se mueve: eso no es ascitis libre, es un **plastrón**.', origen: 'Clase, min 07:14.' },
    voz: [
      'Ahora, la ascitis, que el profesor exige. El líquido libre cae por gravedad a los flancos, y las asas, que tienen gas, flotan arriba. Por eso, con el paciente boca arriba, el centro suena timpánico y los flancos suenan mates, con un límite cóncavo hacia arriba.',
      'Si lo ponés de costado, el líquido se va hacia el lado de abajo, y la matidez se corre con él. Eso es la matidez desplazable.',
    ],
    refs: [E2('06:31'), E2('07:14'), E2('04:58')],
  },
  {
    id: 'f-onda',
    sec: 'liquido',
    titulo: 'La onda ascítica',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'ascitis', vistas: ['onda'] },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'Un golpe en un flanco genera una **onda** que atraviesa el líquido y llega al otro flanco.' },
      { t: 'texto', en: 1, text: 'El borde de una mano en la línea media **frena** la vibración de la pared: lo que llega es la onda del líquido.' },
    ],
    voz: [
      'La onda ascítica usa el mismo principio. Si golpeás suavemente un flanco, la onda viaja por el líquido y la sentís con la otra mano en el flanco opuesto.',
      'El borde de una mano, apoyado en la línea media, frena la vibración que podría transmitir la pared, y así te asegurás de que lo que llega es la onda del líquido.',
    ],
    refs: [E2('07:59'), E2('08:40'), E2('09:21')],
  },
  {
    id: 'f-ombligo',
    sec: 'liquido',
    titulo: 'Por qué el ombligo se evierte',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'perfil-liquido' },
    anchoFig: 'media',
    amplio: true,
    bloques: [
      { t: 'texto', text: 'Lo que distiende **desde adentro** aumenta la presión intraabdominal y empuja el ombligo hacia afuera: **dedo de guante**.' },
      { t: 'def', term: 'Ombligo afuera', tono: 'peach', en: 1, text: '**Ascitis** o **embarazo**.' },
      { t: 'def', term: 'Ombligo adentro', tono: 'sky', en: 1, text: '**Obesidad** o meteorismo: la grasa de la pared lo rodea.' },
    ],
    aclara: { text: 'La relación entre presión intraabdominal y ombligo evertido es una explicación de fisiología general.', origen: GRAL },
    voz: [
      'Y por qué el ombligo cambia. Cuando algo distiende el abdomen desde adentro, como la ascitis o un embarazo, la presión empuja el ombligo hacia afuera: queda en dedo de guante.',
      'En cambio, en la obesidad, la grasa de la pared rodea el ombligo y lo hunde. Por eso un abdomen globoso con el ombligo hacia adentro orienta a obesidad o meteorismo.',
    ],
    refs: [E1('07:46'), E1('08:30')],
  },
  {
    id: 'f-colateral',
    sec: 'piel',
    titulo: 'La sangre busca otro camino',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'colateral' },
    anchoFig: 'grande',
    bloques: [
      { t: 'def', term: 'Portocava', tono: 'sky', text: 'La **porta** está trabada (hipertensión portal): la sangre vuelve a la cava por las venas del ombligo. **Cabeza de medusa**.' },
      { t: 'def', term: 'Cavocava', tono: 'lilac', en: 1, text: 'Está trabada la **cava**: la sangre sube por la pared hacia la cava superior. Venas **ascendentes**.' },
    ],
    voz: [
      'En la piel, la circulación colateral aparece cuando una vena grande está obstruida y la sangre busca otro camino. En la hipertensión portal, la sangre de la porta vuelve a la cava por las venas que rodean el ombligo, y se ve la cabeza de medusa.',
      'Si lo que está obstruido es la cava inferior, la sangre sube por las venas de la pared hacia la cava superior: son venas que ascienden desde el pubis hacia el tórax.',
    ],
    refs: [E1('13:29'), E1('14:12')],
  },
  {
    id: 'f-chvostek',
    sec: 'piel',
    titulo: 'El hígado y las hormonas',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Hepatopatía crónica: **cirrosis**.' },
          { k: 'mecanismo', text: 'Aumentan los **estrógenos** y disminuyen los **andrógenos**.' },
          { k: 'signo', text: 'En el hombre: vello pubiano **ginecoide**, ginecomastia, atrofia testicular: **hábito de Chvostek**.' },
        ],
      },
    ],
    voz: [
      'Otro signo de piel con mecanismo hormonal. En la cirrosis...',
      'aumentan los estrógenos y disminuyen los andrógenos.',
      'Y el hombre se feminiza: el vello pubiano toma una distribución triangular, como en la mujer, aparece ginecomastia y atrofia testicular. Es el hábito de Chvostek.',
    ],
    refs: [E1('17:11'), E1('17:53'), E1('18:42')],
  },
  {
    id: 'f-chapoteo',
    sec: 'visceras',
    titulo: 'Por qué chapotea el estómago',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'estomago', vistas: [['vaciamiento']] },
    anchoFig: 'grande',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El estómago **no se vacía**: síndrome pilórico.' },
          { k: 'mecanismo', text: 'Queda **líquido y aire** juntos; al hundir rápido, se mueven.' },
          { k: 'signo', text: '**Chapoteo** o bazuqueo, como palmadas sobre el agua.' },
        ],
      },
    ],
    aclara: { text: 'Es normal hasta unas **6 horas** después de comer; más tarde indica retención gástrica.', origen: 'Libro, p. 364.' },
    voz: [
      'El chapoteo gástrico. Cuando el píloro está obstruido, el estómago no se vacía.',
      'Adentro queda líquido mezclado con aire, y cuando hundís la pared con golpes rápidos, se mueven.',
      'Se escucha y se siente como cuando le das palmadas al agua de una pileta.',
    ],
    refs: [E2('17:14'), E2('17:57'), L('364')],
  },
  {
    id: 'f-inspiracion',
    sec: 'visceras',
    titulo: 'Por qué se palpa en inspiración',
    etapas: ['normal'],
    fig: { f: 'inspiracion', organo: 'higado' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'En la inspiración el **diafragma baja** y empuja el hígado hacia abajo.' },
      { t: 'texto', en: 1, text: 'El borde normal baja **1 a 2 cm**, y **3 a 4 cm** en inspiración profunda: la mano lo espera.' },
    ],
    voz: [
      'Y por qué se le pide al paciente que inspire. Con la inspiración el diafragma baja y empuja hacia abajo al hígado y al bazo.',
      'El borde del hígado desciende uno o dos centímetros, y hasta cuatro en una inspiración profunda. Por eso la mano lo espera quieta, debajo del reborde costal.',
    ],
    refs: [L('365')],
  },
  {
    id: 'f-bazo',
    sec: 'visceras',
    titulo: 'Por qué el bazo se busca desde la fosa ilíaca derecha',
    etapas: ['normal', 'alteracion', 'signo'],
    fig: { f: 'inspiracion', organo: 'bazo' },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'El bazo normal está **debajo de las costillas** y no se palpa.' },
      { t: 'texto', en: 1, text: 'Sigue la dirección de las últimas costillas: cuando crece, avanza **hacia abajo y adentro**.' },
      { t: 'texto', en: 2, text: 'Por eso se empieza **lejos**, en la fosa ilíaca derecha: si se empieza en el reborde, la mano queda encima del polo.' },
    ],
    aclara: { text: 'Que haya que empezar en la fosa ilíaca derecha está en la pizarra de la práctica; la dirección del crecimiento, en el apunte.', origen: 'Pizarra; libro, p. 366.' },
    voz: [
      'Con el bazo pasa algo parecido. El bazo normal está escondido debajo de las costillas, y no se palpa.',
      'Sigue la dirección de las últimas costillas, así que cuando crece, avanza hacia abajo y hacia adentro, en dirección a la fosa ilíaca derecha.',
      'Por eso se empieza a buscar lejos, en la fosa ilíaca derecha. Si arrancás en el reborde costal, podés tener la mano encima del bazo y no sentir el borde.',
    ],
    refs: [L('366'), PZ],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'bases', label: 'Bases físicas' },
    { id: 'liquido', label: 'Líquido libre' },
    { id: 'piel', label: 'La piel' },
    { id: 'visceras', label: 'Vísceras' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  /* ──────── Antes de empezar ──────── */
  {
    id: 't-importancia',
    sec: 'orden',
    titulo: 'Un examen de los más preguntados',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Junto con el respiratorio, el examen físico **más preguntado**.' },
      { t: 'lista', en: 1, items: ['Paciente en **decúbito dorsal**, relajado.', 'Cabeza sin almohada o con una baja; brazos al costado.', 'A veces se le hace flexionar las piernas para relajar la pared.'] },
    ],
    voz: [
      'Vamos con la teoría. El profesor avisa que el examen físico del abdomen es, junto con el respiratorio, de los más preguntados.',
      'Se hace con el paciente en decúbito dorsal, relajado, con los brazos al costado; a veces se le flexionan las piernas para aflojar la pared.',
    ],
    refs: [E1('01:05'), E1('01:28')],
  },
  {
    id: 't-topografia',
    sec: 'orden',
    titulo: 'Cuatro cuadrantes o nueve regiones',
    fig: { f: 'abdomen', idp: 't-top', vistas: [{ luz: { hd: 'sky', epi: 'rose', hi: 'lilac', fd: 'peach', umb: 'peach', fi: 'peach', fid: 'red', hipo: 'mint', fii: 'mint' } }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Cuatro cuadrantes', tono: 'sky', text: 'Una línea vertical y otra horizontal que pasan por el **ombligo**.' },
      { t: 'def', term: 'Nueve regiones', tono: 'lilac', en: 1, text: 'Horizontales: a nivel de la **10.ª costilla** y de las **espinas ilíacas** anterosuperiores. Verticales: continuación de las **medioclaviculares**.' },
      { t: 'texto', en: 2, text: 'Cada región tiene sus órganos: epigastrio → estómago, lóbulo izquierdo del hígado, páncreas; fosa ilíaca derecha → ciego, apéndice, ovario.' },
    ],
    voz: [
      'Para describir lo que encontrás, el abdomen se divide. En cuatro cuadrantes, con dos líneas que se cruzan en el ombligo.',
      'O en nueve regiones, con dos líneas horizontales, a la altura de la décima costilla y de las espinas ilíacas, y dos verticales, que continúan las medioclaviculares. El profesor acepta cualquiera de las dos.',
      'Y cada región tiene sus órganos, que tenés que conocer de anatomía.',
    ],
    refs: [E1('02:14'), E1('02:56'), E1('03:37'), E1('04:20'), E1('05:00')],
  },
  {
    id: 't-orden',
    sec: 'orden',
    titulo: 'El orden cambia',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'ojo', t: 'Inspección', tono: 'lilac' },
          { ico: 'oreja', t: 'Auscultación', tono: 'sky' },
          { ico: 'mano', t: 'Percusión', tono: 'peach' },
          { ico: 'mano', t: 'Palpación', tono: 'rose' },
        ],
      },
      { t: 'clave', en: 1, text: 'Se ausculta antes de palpar para no **modificar los ruidos hidroaéreos**.' },
    ],
    voz: [
      'Y el orden: en el tórax era inspección, palpación, percusión y auscultación. En el abdomen se invierte: inspección, auscultación, percusión y palpación.',
      'Si te preguntan por qué: porque palpar modifica los ruidos hidroaéreos espontáneos.',
    ],
    refs: [E1('05:00'), E1('05:42')],
  },

  /* ──────── Inspección ──────── */
  {
    id: 't-forma',
    sec: 'inspeccion',
    titulo: 'Inspección estática: la forma',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Forma', 'Cómo se ve', 'Pensar en'],
        filas: [
          ['Normal', 'Plano arriba, apenas elevado abajo', 'Varía con la edad y el sexo'],
          ['**Globoso**', 'Distendido en forma generalizada', 'Obesidad, meteorismo, ascitis, embarazo'],
          ['**En batracio**', 'Acostado, el líquido cae a los flancos', '**Ascitis**'],
          ['Excavado', 'Retraído, hundido', 'Desnutrición, caquexia, infecciones crónicas'],
          ['**En tabla**', 'Rígido, contractura involuntaria', '**Peritonitis**'],
          ['En delantal', 'Cae sobre el pubis', 'Obesidad mórbida'],
          ['Abovedamiento asimétrico', 'Bulto localizado', 'Tumor, hernia, visceromegalia'],
        ],
      },
    ],
    voz: [
      'La inspección puede ser estática o dinámica. En la estática, lo primero es la forma. El abdomen normal es plano arriba y apenas elevado abajo.',
      'El globoso está distendido en forma generalizada: obesidad, meteorismo, ascitis o embarazo.',
      'El abdomen en batracio aparece cuando el paciente con ascitis se acuesta: el líquido cae a los flancos, como en un sapo.',
      'El excavado está retraído: desnutrición, caquexia.',
      'El abdomen en tabla está rígido por la contractura involuntaria de la peritonitis.',
      'El abdomen en delantal, en la obesidad mórbida.',
      'Y el abovedamiento asimétrico es un bulto localizado: un tumor, una hernia o un órgano agrandado.',
    ],
    refs: [E1('07:05'), E1('07:46'), E1('09:57'), E1('10:38'), E1('11:22'), E1('12:45')],
  },
  {
    id: 't-ombligo',
    sec: 'inspeccion',
    titulo: 'El ombligo en un abdomen distendido',
    fig: { f: 'perfil-liquido' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Ombligo hacia adentro', tono: 'sky', text: '**Obesidad** o **meteorismo**.' },
      { t: 'def', term: 'Ombligo hacia afuera, en dedo de guante', tono: 'peach', en: 1, text: '**Embarazo** o **ascitis**.' },
      { t: 'texto', en: 2, text: 'Distensión solo de la parte superior: después de comer, dispepsia, bebidas con gas. Localizada: embarazo, globo vesical, quiste de ovario, tumores.' },
    ],
    examen: { origen: 'ortega', texto: 'Abdomen distendido: ombligo hacia adentro u hacia afuera.', cita: 'Esto lo tienen que saber como el padre nuestro.', ref: E1('08:39') },
    voz: [
      'Y algo que el profesor pide saber como el Padre Nuestro. Un abdomen distendido con el ombligo hacia adentro: pensá en obesidad o meteorismo.',
      'Con el ombligo hacia afuera, en dedo de guante: embarazo o ascitis.',
      'Si solo está distendida la parte de arriba, puede ser algo que comió o tomó. Y si la distensión es localizada, un embarazo, un globo vesical o un tumor.',
    ],
    refs: [E1('07:46'), E1('08:30'), E1('08:39'), E1('09:13')],
  },
  {
    id: 't-piel',
    sec: 'inspeccion',
    titulo: 'La piel: circulación y estrías',
    fig: { f: 'colateral' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Portocava', tono: 'sky', text: 'Desde el ombligo, en **cabeza de medusa**: hipertensión portal.' },
      { t: 'def', term: 'Cavocava', tono: 'lilac', en: 1, text: 'Venas **ascendentes**, del pubis o del ombligo hacia el tórax.' },
      { t: 'def', term: 'Estrías', tono: 'rose', en: 1, text: '**Rojo vinosas**: Cushing. **Nacaradas**: secuela de embarazos o de adelgazar.' },
    ],
    voz: [
      'En la piel se busca la circulación colateral. La portocava sale del ombligo y forma la cabeza de medusa: hipertensión portal.',
      'La cavocava es ascendente: las venas suben desde el pubis o el ombligo hacia el tórax. Y las estrías: rojo vinosas en el síndrome de Cushing; nacaradas, como secuela de embarazos o de una gran pérdida de peso.',
    ],
    refs: [E1('13:29'), E1('14:12'), E1('14:55'), E1('15:40')],
  },
  {
    id: 't-cicatrices',
    sec: 'inspeccion',
    titulo: 'Cicatrices: abdomen asimétrico',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Todo paciente operado, con cicatriz en el abdomen, tiene un **abdomen asimétrico**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Incisión', 'Para qué'],
        filas: [
          ['Kocher', 'Vesícula'],
          ['Mediana', 'Exploración amplia'],
          ['McBurney · Rocky-Davis', 'Apendicitis'],
          ['Pfannenstiel', 'Cesárea'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Cicatriz quirúrgica = abdomen asimétrico.', cita: 'Es un abdomen asimétrico, eso no se olviden nunca.', ref: E1('16:05') },
    voz: [
      'Las cicatrices. El profesor insiste: todo paciente que fue operado y tiene una cicatriz, tiene un abdomen asimétrico. No te lo olvides nunca.',
      'Las más comunes: la de Kocher, para la vesícula; la mediana, para una exploración amplia; la de McBurney, para la apendicitis; y la de Pfannenstiel, para la cesárea.',
    ],
    refs: [E1('15:40'), E1('16:05'), E1('16:24')],
  },
  {
    id: 't-chvostek',
    sec: 'inspeccion',
    titulo: 'Vello: el hábito de Chvostek',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Hepatopatía crónica: más **estrógenos**, menos **andrógenos**.' },
      { t: 'lista', en: 1, items: ['Vello pubiano de distribución **triangular**, como en la mujer.', '**Ginecomastia** y **atrofia testicular**.', 'Junto con ictericia, circulación colateral y ascitis: **cirrosis**.'] },
    ],
    examen: { origen: 'ortega', texto: 'El hábito de Chvostek.', cita: 'Esos hábitos de Chvostek lo van a volver a preguntar ahora y lo tienen que saber.', ref: E1('17:15') },
    voz: [
      'El vello pubiano. En la hepatopatía crónica aumentan los estrógenos y bajan los andrógenos.',
      'El hombre pierde la distribución romboidal del vello y adopta la triangular de la mujer, con ginecomastia y atrofia testicular. Es el hábito de Chvostek, que el profesor avisa que se pregunta, y que junto con la ictericia, la circulación colateral y la ascitis orienta a cirrosis.',
    ],
    refs: [E1('17:11'), E1('17:15'), E1('17:53'), E1('18:42')],
  },
  {
    id: 't-cullen',
    sec: 'inspeccion',
    titulo: 'Equimosis: Cullen y Grey-Turner',
    fig: { f: 'abdomen', idp: 't-cg', vistas: [{ puntos: [{ p: 'cullen', tone: 'lilac' }, { p: 'greyturner', tone: 'peach' }] }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Cullen', tono: 'lilac', text: 'Equimosis **periumbilical**.' },
      { t: 'def', term: 'Grey-Turner', tono: 'peach', en: 1, text: 'Equimosis en los **flancos**.' },
      { t: 'clave', en: 2, tono: 'red', text: 'Hemorragia retroperitoneal en cualquier abdomen agudo hemorrágico: **no** son patognomónicos de pancreatitis.' },
    ],
    examen: { origen: 'ortega', texto: 'Cullen y Grey-Turner no son patognomónicos de pancreatitis.', cita: 'Ustedes dicen eso, lo van a bochar conmigo.', ref: E1('20:18') },
    voz: [
      'Las equimosis. El signo de Cullen es periumbilical.',
      'El de Grey-Turner, en los flancos.',
      'Indican sangre en el retroperitoneo: ectópico roto, pancreatitis necrohemorrágica, aneurisma de aorta o trauma. Y el profesor avisa: si decís que son patognomónicos de pancreatitis, te bocha.',
    ],
    refs: [E1('18:42'), E1('19:26'), E1('20:07'), E1('20:18')],
  },
  {
    id: 't-ombligo-latidos',
    sec: 'inspeccion',
    titulo: 'Ombligo, latidos y ondas',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Ombligo', tono: 'rose', text: 'Hernia umbilical. Nódulo de la **hermana María José**: metástasis de estómago, páncreas o intestino.' },
      { t: 'def', term: 'Latidos', tono: 'red', en: 1, text: 'Arriba y a la izquierda del ombligo, la **aorta**; muy intensos: **aneurisma**.' },
      { t: 'def', term: 'Ondas peristálticas', tono: 'peach', en: 2, text: 'Normales en delgados; intensas y **dolorosas**: obstrucción.' },
    ],
    voz: [
      'En el ombligo se busca una hernia, o el nódulo de la hermana María José, que es una metástasis de un tumor de estómago, de páncreas o de intestino.',
      'Arriba y a la izquierda del ombligo puede verse el latido de la aorta, sobre todo en personas delgadas. Si es muy intenso, pensá en un aneurisma.',
      'Y las ondas peristálticas pueden verse en personas delgadas; si son intensas y dolorosas, indican una obstrucción.',
    ],
    refs: [E1('20:49'), E1('21:32'), E1('22:16')],
  },
  {
    id: 't-dinamica',
    sec: 'inspeccion',
    titulo: 'Inspección dinámica y maniobra del esfuerzo',
    amplio: true,
    bloques: [
      { t: 'texto', text: '«Saque la panza… húndala»: aparecen **hernias**, eventraciones, visceromegalias.' },
      { t: 'def', term: 'Maniobra del esfuerzo', tono: 'lilac', en: 1, text: 'Levanta la **cabeza** contra la mano del médico, o brazos y piernas: aumenta la tensión de la pared.' },
      { t: 'def', term: 'Diástasis de los rectos', tono: 'peach', en: 2, text: 'Los rectos se **separan** sobre la línea alba; frecuente después de embarazos.' },
    ],
    aclara: { text: 'La maniobra también sirve para saber si un bulto está en la **pared** (se palpa mejor) o **dentro** del abdomen (desaparece).', origen: 'Libro, p. 360.' },
    voz: [
      'En la inspección dinámica, se le pide al paciente que saque la panza y que la hunda. Así aparecen hernias, eventraciones o un órgano agrandado.',
      'La maniobra del esfuerzo: el paciente levanta la cabeza contra tu mano, o levanta brazos y piernas, y aumenta la tensión de la pared.',
      'Así se evidencia la diástasis de los rectos: los rectos se separan sobre la línea alba, algo frecuente después de varios embarazos.',
    ],
    refs: [E1('22:57'), E1('23:41'), E1('24:23'), E1('25:47'), L('360')],
  },

  /* ──────── Auscultación ──────── */
  {
    id: 't-auscultacion',
    sec: 'auscultacion',
    titulo: 'Ruidos hidroaéreos',
    fig: { f: 'rha', todas: true },
    anchoFig: 'grande',
    bloques: [
      { t: 'texto', text: 'Con **membrana**, sin haber palpado. Recorrido: FII → hipocondrio izquierdo → hipocondrio derecho → FID → hipogastrio → mesogastrio.' },
      { t: 'def', term: 'Aumentados', tono: 'peach', en: 1, text: 'De **lucha**: íleo mecánico.' },
      { t: 'def', term: 'Ausentes', tono: 'red', en: 2, text: '**Silencio**: íleo paralítico. Localizado: asa centinela (inflamatorio); generalizado: perforativo.' },
    ],
    voz: [
      'La auscultación se hace con la membrana, sin haber palpado antes. Se empieza en la fosa ilíaca izquierda, se sube al hipocondrio izquierdo, se cruza al derecho, se baja a la fosa ilíaca derecha, y se termina en el hipogastrio y el mesogastrio. Los ruidos hidroaéreos, o borborigmos, son continuos y no duelen.',
      'Si están aumentados, son ruidos de lucha: el intestino hace fuerza contra un obstáculo. Íleo mecánico.',
      'Si están ausentes, hay silencio abdominal: íleo paralítico. Localizado, es el asa centinela del abdomen inflamatorio; generalizado, el de la perforación.',
    ],
    refs: [E1('26:35'), E1('27:21'), E1('28:05'), E1('28:46')],
  },
  {
    id: 't-soplos',
    sec: 'auscultacion',
    titulo: 'Soplos, frotes y murmullo',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Hallazgo', 'Dónde', 'Pensar en'],
        filas: [
          ['Soplo **aórtico**', 'Arriba y a la izquierda del ombligo', '**Aneurisma de aorta**'],
          ['Soplo renal', 'Paraumbilical', 'HTA **renovascular** en un joven'],
          ['Soplo mesentérico', 'Mesogastrio', 'Abdomen agudo isquémico'],
          ['Frote', 'Sobre hígado o bazo', 'Inflamación de la cápsula'],
          ['Murmullo venoso', 'Umbilical', 'Hipertensión portal avanzada'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los soplos del abdomen; el más importante, el del aneurisma de aorta.', cita: 'Eso no se tiene que olvidar.', ref: E1('29:31') },
    voz: [
      'Y los soplos, que el profesor dice que no se olvidan. El más importante, el del aneurisma de aorta, por arriba y a la izquierda del ombligo.',
      'El de las arterias renales, en un joven con hipertensión renovascular.',
      'El de las mesentéricas, en el abdomen agudo isquémico.',
      'Los frotes, sobre la cápsula inflamada del hígado o el bazo.',
      'Y el murmullo venoso, en una hipertensión portal muy avanzada.',
    ],
    refs: [E1('29:31'), E1('30:13')],
  },

  /* ──────── Percusión ──────── */
  {
    id: 't-percusion',
    sec: 'percusion',
    titulo: 'Percusión del abdomen',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'A diferencia del tórax: **sin rebote**, en forma **radiada**, un golpe y se baja.' },
      { t: 'lista', en: 1, items: ['Todo el abdomen es **timpánico**, salvo el hígado y el bazo.', 'Timpanismo generalizado: **meteorismo**.', 'Matidez: líquido, tumor o víscera agrandada.'] },
    ],
    voz: [
      'La percusión del abdomen es distinta de la del tórax: no se percute con rebote, se hace en forma radiada, y se da un golpe y se baja, no tres.',
      'Todo el abdomen suena timpánico, salvo el hígado y el bazo. El timpanismo generalizado indica meteorismo; la matidez, líquido, un tumor o una víscera agrandada.',
    ],
    refs: [E2('00:03'), E2('00:49'), E2('02:55'), E2('03:35')],
  },
  {
    id: 't-traube',
    sec: 'percusion',
    titulo: 'Espacio semilunar de Traube',
    amplio: true,
    bloques: [
      { t: 'texto', text: 'Base del hemitórax izquierdo, **timpánico** por la cámara gástrica. Limita con el corazón arriba, el lóbulo izquierdo del hígado adentro, el **bazo** afuera y el reborde costal abajo.' },
      { t: 'def', term: 'Traube mate', tono: 'peach', en: 1, text: '**Esplenomegalia**, derrame pleural izquierdo, cardiomegalia, hepatomegalia izquierda, tumor gástrico.' },
    ],
    voz: [
      'El espacio semilunar de Traube está en la base del hemitórax izquierdo, y suena timpánico por el aire del estómago. Arriba está el corazón, adentro el lóbulo izquierdo del hígado, afuera el bazo y abajo el reborde costal.',
      'Si ese espacio se vuelve mate, algo lo tapa: una esplenomegalia, un derrame pleural izquierdo, una cardiomegalia, el hígado agrandado o un tumor del estómago.',
    ],
    refs: [E2('00:49'), E2('01:31'), E2('02:12'), E2('02:55')],
  },
  {
    id: 't-ascitis',
    sec: 'percusion',
    titulo: 'Ascitis: matidez de concavidad superior',
    fig: { f: 'ascitis', vistas: ['dorsal'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Concavidad superior', tono: 'peach', text: 'Líquido libre: **ascitis** o hemoperitoneo. No se auscultan RHA donde hay líquido.' },
      { t: 'def', term: 'Convexidad superior', tono: 'lilac', en: 1, text: '**Embarazo**, tumor, quiste de ovario, mioma, globo vesical.' },
    ],
    examen: { origen: 'ortega', texto: 'Ascitis.', cita: 'Tienen que sabérselo como la palma de su mano… no me saben ascitis, lo van a bochar.', ref: E2('04:10') },
    voz: [
      'Y la ascitis, que el profesor pide saber como la palma de la mano: si no la sabés, te bochan. El líquido libre cae a la parte baja del abdomen, y al percutir encontrás una matidez de concavidad superior. Donde hay líquido, no se escuchan ruidos hidroaéreos.',
      'En cambio, un embarazo, un tumor, un quiste de ovario o un mioma dan una matidez de convexidad superior.',
    ],
    refs: [E2('03:35'), E2('04:10'), E2('04:58'), E2('05:42')],
  },
  {
    id: 't-maniobras-ascitis',
    sec: 'percusion',
    titulo: 'Tres maniobras para la ascitis',
    fig: { f: 'ascitis', vistas: ['lateral', 'onda'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Matidez desplazable', tono: 'sky', text: 'En decúbito lateral, la matidez se corre al lado declive: el líquido es **libre**.' },
      { t: 'def', term: 'Onda ascítica', tono: 'lilac', en: 1, text: 'Golpeteo en un flanco, se percibe en el otro, con una mano en la línea media.' },
      { t: 'def', term: 'Témpano', tono: 'mint', en: 1, text: 'Ascitis a tensión: al hundir, el hígado **rebota** como si flotara.' },
    ],
    aclara: { text: 'Si el líquido está **encapsulado** y no se mueve, es un **plastrón**. Si hay matidez y timpanismo alternados por todo el abdomen, es el **abdomen en damero** de la peritonitis tuberculosa.', origen: 'Clase, min 07:14 y 09:21.' },
    voz: [
      'Para confirmarla hay tres maniobras. La matidez desplazable: ponés al paciente de costado, y si la matidez se corre al lado de abajo, el líquido es libre.',
      'La onda ascítica: golpeás un flanco y sentís la onda en el otro, con el borde de una mano en la línea media. Y el témpano: en una ascitis a tensión, al hundir la mano, el hígado rebota como un hielo que flota en el agua.',
    ],
    refs: [E2('06:31'), E2('07:14'), E2('07:59'), E2('08:40'), E2('09:21'), E2('10:07')],
  },

  /* ──────── Palpación ──────── */
  {
    id: 't-palpacion',
    sec: 'palpacion',
    titulo: 'Palpación: la parte más preguntada',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'La técnica semiológica **más importante** del abdomen.' },
      { t: 'lista', en: 1, items: ['**Digital o en pinza**: edema de la pared (signo de Godet en los flancos).', 'Monomanual o bimanual; con una mano **activa** que palpa y otra **pasiva** que relaja: Galambos, Obrastzov.', 'Superficial (la pared) y profunda (las vísceras).'] },
    ],
    aclara: { text: '«No se van a acordar de todos los nombres, pero lo importante es que lo **sepan realizar**.»', origen: 'Clase, min 10:56–11:41.' },
    voz: [
      'La palpación es, según el profesor, la parte más preguntada y en la que más se bocha. Es la técnica más importante del examen abdominal.',
      'Puede ser digital o en pinza, por ejemplo para buscar el signo de Godet en el edema de los flancos; monomanual o bimanual, con una mano que palpa y otra que relaja la pared, como en las maniobras de Galambos u Obrastzov; y superficial o profunda.',
    ],
    refs: [E2('10:56'), E2('11:15'), E2('11:41'), E2('12:23'), E2('13:04')],
  },
  {
    id: 't-superficial',
    sec: 'palpacion',
    titulo: 'Palpación superficial: la secuencia',
    amplio: true,
    bloques: [
      {
        t: 'secuencia',
        flechas: true,
        items: [
          { ico: 'mano', t: 'Mano del escultor', d: 'sensibilidad, temperatura, bultos', tono: 'sky' },
          { ico: 'mano', t: 'Esfuerzo', d: '¿el bulto está en la pared?', tono: 'lilac' },
          { ico: 'mano', t: 'Tensión abdominal', d: 'de abajo hacia arriba', tono: 'peach' },
          { ico: 'dolor', t: 'Compresión y descompresión', tono: 'rose' },
        ],
      },
      { t: 'texto', en: 2, text: 'Tensión: flexiones de las metacarpofalángicas, desde las fosas ilíacas hacia arriba, comparando lados. Es mayor **arriba** y a la **derecha**.' },
    ],
    voz: [
      'La palpación superficial sigue una secuencia. Primero la mano del escultor: pasás la mano plana por todo el abdomen y buscás sensibilidad, temperatura y bultos.',
      'Si encontrás un bulto, la maniobra del esfuerzo te dice si está en la pared.',
      'Después la tensión abdominal: con flexiones rítmicas de los dedos, desde las fosas ilíacas hacia arriba, comparando un lado con el otro. Normalmente la tensión es mayor arriba y a la derecha, por el hígado.',
      'Y por último la compresión y la descompresión.',
    ],
    refs: [E2('13:44'), E2('14:26'), E2('15:10'), E2('15:51'), L('360')],
  },
  {
    id: 't-tension',
    sec: 'palpacion',
    titulo: 'Abdomen tenso y doloroso',
    fig: { f: 'pared', mano: true, fases: ['reposo', 'comprimir', 'soltar'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Contractura', tono: 'red', text: '**Involuntaria**: irritación peritoneal, peritonitis. Abdomen en tabla.' },
      { t: 'def', term: 'Defensa', tono: 'mint', en: 1, text: '**Voluntaria**: el paciente saca la mano.' },
      { t: 'def', term: 'Rebote', tono: 'gold', en: 2, text: 'Localizado: **Blumberg**. Generalizado: **Gueneau de Mussy**.' },
    ],
    examen: { origen: 'ortega', texto: 'Blumberg (localizado) y Gueneau de Mussy (generalizado).', cita: 'Si es localizada se llama signo de Blumberg, eso no se olvide.', ref: E2('16:50') },
    voz: [
      'Si el abdomen está muy tenso, puede ser una contractura, involuntaria, por irritación peritoneal: la peritonitis, el abdomen en tabla.',
      'O una defensa, voluntaria: el paciente te saca la mano.',
      'Y la compresión y descompresión: si duele al comprimir, peritoneo visceral; si duele al soltar, parietal. Localizado, es el signo de Blumberg, que no se olvida; generalizado, el de Gueneau de Mussy. La tensión disminuida es rara: ancianos, caquécticos, desnutridos.',
    ],
    refs: [E2('15:51'), E2('16:32'), E2('16:50'), E2('17:14')],
  },
  {
    id: 't-chapoteo',
    sec: 'palpacion',
    titulo: 'Chapoteo o bazuqueo gástrico',
    fig: { f: 'estomago', vistas: [['vaciamiento']] },
    anchoFig: 'media',
    bloques: [
      { t: 'texto', text: 'Mucha tensión en epigastrio e hipocondrio izquierdo. Al hundir con golpes rápidos: **ruido de palmadas sobre el agua**.' },
      { t: 'clave', en: 1, text: 'Signo característico del **síndrome pilórico**.' },
    ],
    examen: { origen: 'ortega', texto: 'Chapoteo gástrico: síndrome pilórico.', cita: 'Chapoteo gástrico o bazuqueo gástrico, pregunta de parcial.', ref: E2('18:12') },
    voz: [
      'Y otra pregunta de parcial: el chapoteo o bazuqueo gástrico. El paciente tiene mucha tensión en el epigastrio y el hipocondrio izquierdo, y al hundir con golpes rápidos con la punta de los dedos, escuchás y sentís como palmadas sobre el agua.',
      'Es el signo característico del síndrome pilórico: el estómago retiene líquido.',
    ],
    refs: [E2('17:14'), E2('17:57'), E2('18:12')],
  },

  /* ──────── Puntos dolorosos ──────── */
  {
    id: 't-apendiculares',
    sec: 'puntos',
    titulo: 'Puntos apendiculares',
    fig: { f: 'abdomen', idp: 't-ap', colon: true, vistas: [{ luz: { fid: 'red' }, puntos: [{ p: 'mcburney', tone: 'red' }] }] },
    anchoFig: 'chica',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Punto', 'Dónde'],
        filas: [
          ['**McBurney**', 'Línea ombligo–espina ilíaca derecha: unión del 1/3 externo con los 2/3 internos'],
          ['Morris', 'La misma línea: unión del 1/3 interno con los 2/3 externos (4 cm del ombligo)'],
          ['Cope', 'Punto medio de esa línea'],
          ['Lanz', 'Línea biilíaca: unión del 1/3 derecho con los 2/3 izquierdos'],
          ['Lecene', 'Dos traveses por encima y detrás de la espina ilíaca (retrocecal)'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los puntos apendiculares.', cita: 'Puntos apendiculares como si fuese la palma de su mano, me lo tienen que saber.', ref: E2('19:27') },
    voz: [
      'Los puntos dolorosos. Los apendiculares, el profesor los pide como la palma de la mano. El más importante, el de McBurney: en la línea que une el ombligo con la espina ilíaca anterosuperior derecha, en la unión del tercio externo con los dos tercios internos. El de Morris está en la misma línea, más cerca del ombligo; el de Cope, en el medio; el de Lanz, en la línea entre las dos espinas ilíacas; y el de Lecene, atrás, para el apéndice retrocecal.',
    ],
    refs: [E2('19:24'), E2('19:27'), L('360')],
  },
  {
    id: 't-pancreaticos',
    sec: 'puntos',
    titulo: 'Puntos pancreáticos y biliares',
    fig: { f: 'abdomen', idp: 't-pb', vistas: [{ luz: { hd: 'gold', epi: 'peach', hi: 'peach' }, puntos: [{ p: 'murphy', tone: 'gold' }], ruta: ['epi', 'hi'], rutaTone: 'peach' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'def', term: 'Cístico y de Murphy', tono: 'gold', text: 'Reborde costal derecho y borde externo del recto: **colecistitis**.' },
      { t: 'def', term: 'Zona de Chauffard · Desjardins', tono: 'peach', en: 1, text: 'Cabeza del páncreas y colédoco, arriba y a la derecha del ombligo.' },
      { t: 'def', term: 'Hemicinturón', tono: 'red', en: 1, text: 'Dolor del **epigastrio** al **hipocondrio izquierdo** y a la espalda (D10–D12): **pancreatitis**.' },
    ],
    examen: { origen: 'ortega', texto: 'Puntos pancreáticos y biliares.', cita: '…y los puntos pancreáticos biliares, me lo saben todos.', ref: E2('21:06') },
    voz: [
      'Los pancreáticos y biliares también se saben todos. El punto cístico, o de Murphy, en el reborde costal derecho, en el borde externo del recto: duele en la colecistitis.',
      'La zona coledocopancreática de Chauffard y el punto de Desjardins, arriba y a la derecha del ombligo, proyectan la cabeza del páncreas. Y el dolor en hemicinturón, que empieza en el epigastrio, va al hipocondrio izquierdo y sigue a la espalda: pancreatitis.',
    ],
    refs: [E2('20:45'), E2('21:06'), E2('21:27'), L('361'), L('362')],
  },
  {
    id: 't-otros-puntos',
    sec: 'puntos',
    titulo: 'Los demás puntos',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Grupo', 'Lo que importa'],
        filas: [
          ['Paracentesis', 'Como McBurney, pero a la **izquierda**; duele en la diverticulitis'],
          ['Gastrointestinales', 'Epigástrico: gastritis, úlcera · xifoideo. Casi nunca se preguntan'],
          ['Mesentéricos', 'No se preguntan'],
          ['Ureterales', 'Superior y medio se palpan; el inferior, por tacto rectal o vaginal'],
          ['Renales', 'Para el parcial, los **posteriores**: costovertebral y costomuscular'],
          ['Vesical', 'Sitio de punción vesical'],
        ],
      },
    ],
    voz: [
      'Los demás puntos. Los de paracentesis están donde el de McBurney, pero del lado izquierdo, y duelen en la diverticulitis.',
      'Los gastrointestinales casi nunca se preguntan; el más usado es el epigástrico, en la gastritis o la úlcera.',
      'Los mesentéricos no se preguntan.',
      'De los ureterales, el superior y el medio se palpan; el inferior solo por tacto rectal o vaginal.',
      'De los renales, para el parcial importan los posteriores: el costovertebral y el costomuscular.',
      'Y el vesical, que marca el sitio de una punción de la vejiga.',
    ],
    refs: [E2('20:04'), E2('21:27'), E2('22:07'), E2('22:48'), E2('22:58'), E2('23:28')],
  },

  /* ──────── Palpación profunda ──────── */
  {
    id: 't-higado',
    sec: 'profunda',
    titulo: 'Hígado: monomanual y bimanual',
    fig: { f: 'inspiracion', organo: 'higado' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Monomanual', tono: 'sky', text: '**Simple** (desde la FID hacia el reborde) · **en cuchara**.' },
      { t: 'def', term: 'Bimanual', tono: 'lilac', en: 1, text: '**Chauffard** (peloteo desde atrás) · **Güemes** (mano de sostén) · **Mathieu** (enganche) · **Gilbert**.' },
      { t: 'texto', en: 1, text: 'Borde normal: no más de 1 cm bajo el reborde. **Hepatometría**: 9 a 12 cm.' },
    ],
    voz: [
      'La palpación profunda se vio en la práctica, y en la pizarra quedaron las maniobras. Para el hígado, las monomanuales: la simple, que empieza en la fosa ilíaca derecha y sube hasta el reborde, y la mano en cuchara.',
      'Y las bimanuales: la de Chauffard, que pelotea el hígado desde atrás; la de Güemes, con una mano de sostén en la espalda; la de Mathieu, de enganche; y la de Gilbert. El borde normal no pasa más de un centímetro el reborde, y la hepatometría normal es de nueve a doce centímetros.',
    ],
    refs: [PZ, L('365'), L('366'), E2('26:14')],
  },
  {
    id: 't-higado-como',
    sec: 'profunda',
    titulo: 'Cómo es el hígado que palpás',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Hígado', 'Pensar en'],
        filas: [
          ['Firme, borde filoso, micronodular', '**Cirrosis**'],
          ['Grande, blando, doloroso', '**Hepatitis aguda**'],
          ['Pétreo, macronodular, doloroso', '**Metástasis**'],
        ],
      },
      { t: 'texto', en: 2, text: 'La matidez hepática desaparece con aire interpuesto: **Jobert** (perforación) o, rara vez, colon por delante (**Chilaiditi**).' },
    ],
    voz: [
      'Y lo que palpás también orienta. Un hígado firme, de borde filoso y micronodular, es el de la cirrosis.',
      'Grande, blando y doloroso, el de la hepatitis aguda.',
      'Pétreo y macronodular, el de las metástasis. Y al percutir, si desaparece la matidez hepática, hay aire interpuesto: el signo de Jobert de la perforación.',
    ],
    refs: [L('12'), L('366')],
  },
  {
    id: 't-bazo',
    sec: 'profunda',
    titulo: 'Bazo: a la derecha y a la izquierda del paciente',
    fig: { f: 'inspiracion', organo: 'bazo' },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'A la derecha', tono: 'sky', text: 'Monomanual **simple** · bimanual **propiamente dicha** · **Galambos**.' },
      { t: 'def', term: 'A la izquierda', tono: 'lilac', en: 1, text: 'Monomanual **en cuchara** · **Naegeli** (posición de **Schuster**, 45°) · **Merlo**.' },
      { t: 'texto', en: 2, text: 'Normal: no se palpa. Percusión: matidez entre la 9.ª y 11.ª costilla; **Castell** timpánico.' },
    ],
    voz: [
      'Para el bazo, la pizarra separa las maniobras según dónde te ubicás. A la derecha del paciente: la monomanual simple, la bimanual propiamente dicha y la de Galambos.',
      'A la izquierda: la mano en cuchara, la de Naegeli, con el paciente en posición de Schuster, a cuarenta y cinco grados, y la de Merlo.',
      'El bazo normal no se palpa. A la percusión, su matidez está entre la novena y la undécima costilla, y el punto de Castell, en el último espacio intercostal, debe ser timpánico.',
    ],
    refs: [PZ, L('366'), L('367')],
  },
  {
    id: 't-vesicula',
    sec: 'profunda',
    titulo: 'Vesícula: la maniobra de Murphy',
    fig: { f: 'abdomen', idp: 't-ve', vistas: [{ luz: { hd: 'gold' }, puntos: [{ p: 'murphy', tone: 'gold' }] }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'texto', text: 'Pulgares bajo el reborde costal derecho, en el borde externo del recto, y se pide una **inspiración profunda**.' },
      { t: 'clave', en: 1, tono: 'gold', text: 'Positivo: el dolor **corta la inspiración**: colecistitis.' },
      { t: 'texto', en: 2, text: 'Vesícula palpable **indolora** en un ictérico: **Bard y Pick**; con pérdida de peso, **Courvoisier-Terrier**.' },
    ],
    voz: [
      'La vesícula se explora con la maniobra de Murphy: los pulgares debajo del reborde costal derecho, en el borde externo del recto, y se le pide al paciente que inspire profundo.',
      'Si el dolor le corta la inspiración, el signo es positivo: colecistitis.',
      'Y si la vesícula se palpa grande e indolora en un paciente ictérico, es el signo de Bard y Pick, y con pérdida de peso, la ley de Courvoisier-Terrier.',
    ],
    refs: [PZ, L('366'), L('13')],
  },

  /* ──────── Pared ──────── */
  {
    id: 't-hernias',
    sec: 'pared',
    titulo: 'Hernias y eventraciones',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Hernia', tono: 'sky', items: ['El contenido sale por un orificio **anatómico que ya existía**', 'Inguinal, crural, umbilical'] },
          { titulo: 'Eventración', tono: 'peach', items: ['Sale por un orificio **patológico**', 'Una **cicatriz** que no cerró bien'] },
        ],
      },
      { t: 'texto', en: 1, text: '**Reductible**: se vuelve a meter · **coercible**: una vez reducida, no vuelve a salir · **incoercible**: vuelve a salir.' },
    ],
    voz: [
      'Y la pared. En la hernia, el contenido abdominal sale por un orificio anatómico que ya existía, como el inguinal o el umbilical. En la eventración, sale por un orificio patológico: una cicatriz que no cerró bien.',
      'La hernia es reductible si se puede volver a meter con el dedo. Coercible, si una vez reducida no vuelve a salir; incoercible, si vuelve a salir. Con esto, tenés todo el examen. Ahora a practicar, y mirá las maniobras en video.',
    ],
    refs: [E2('23:28'), E2('24:10'), E2('24:51'), E2('25:33')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'orden', label: 'Antes de empezar' },
    { id: 'inspeccion', label: 'Inspección' },
    { id: 'auscultacion', label: 'Auscultación' },
    { id: 'percusion', label: 'Percusión y ascitis' },
    { id: 'palpacion', label: 'Palpación' },
    { id: 'puntos', label: 'Puntos dolorosos' },
    { id: 'profunda', label: 'Hígado, bazo y vesícula' },
    { id: 'pared', label: 'Hernias' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS (simulacro) ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Hombre de 55 años, bebedor',
    texto: 'Abdomen globoso con el ombligo evertido. Acostado, los flancos caen hacia los costados. A la percusión, centro timpánico y flancos mates.',
    pregunta: '¿Qué maniobra confirma que el líquido es libre?',
    opciones: [
      { text: 'Matidez desplazable.', why: 'En decúbito lateral el líquido libre se corre al lado declive.' },
      { text: 'Maniobra de Murphy.', why: 'Explora la vesícula.' },
      { text: 'Chapoteo gástrico.', why: 'Busca retención gástrica.' },
      { text: 'Signo de Blumberg.', why: 'Explora irritación peritoneal.' },
    ],
    correcta: 0,
    razonamiento: 'Abdomen en batracio, ombligo en dedo de guante y matidez de concavidad superior: ascitis. La matidez desplazable confirma que el líquido no está encapsulado.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Mujer de 50 años con vómitos',
    texto: 'Vomita alimentos que comió el día anterior. En la palpación del epigastrio, con golpes rápidos, se siente un ruido como de palmadas sobre el agua.',
    pregunta: '¿Qué signo es y qué sugiere?',
    opciones: [
      { text: 'Chapoteo gástrico: síndrome pilórico.', why: 'El estómago retiene líquido y aire.' },
      { text: 'Onda ascítica: ascitis.', why: 'La onda se busca en los flancos.' },
      { text: 'Ruidos de lucha: íleo mecánico.', why: 'Se auscultan, no se provocan palpando.' },
      { text: 'Témpano: hepatomegalia.', why: 'Es una maniobra para el hígado en ascitis.' },
    ],
    correcta: 0,
    razonamiento: 'El bazuqueo alejado de las comidas indica retención gástrica: síndrome pilórico.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Hombre de 60 años con cirrosis',
    texto: 'Tiene ictericia, vello pubiano de distribución triangular, ginecomastia y venas que salen del ombligo en forma radiada.',
    pregunta: '¿Qué indican las venas periumbilicales?',
    opciones: [
      { text: 'Circulación colateral portocava por hipertensión portal.', why: 'La sangre de la porta vuelve a la cava por las venas del ombligo: cabeza de medusa.' },
      { text: 'Circulación cavocava por obstrucción de la cava.', why: 'Sería ascendente, del pubis hacia el tórax.' },
      { text: 'Estrías rojo vinosas.', why: 'Son lesiones de la piel, no venas.' },
      { text: 'Hernia umbilical.', why: 'No explica las venas radiadas.' },
    ],
    correcta: 0,
    razonamiento: 'Hábito de Chvostek y cabeza de medusa en un cirrótico: hipertensión portal.',
  },
  {
    id: 'c4',
    origen: 'practica',
    titulo: 'Paciente operado de vesícula',
    texto: 'Al pedirle que levante la cabeza contra la mano del médico, aparece un bulto sobre la cicatriz subcostal derecha.',
    pregunta: '¿Qué es?',
    opciones: [
      { text: 'Una eventración: sale por un orificio patológico, la cicatriz.', why: 'La hernia sale por un orificio anatómico preexistente.' },
      { text: 'Una hernia umbilical.', why: 'Está sobre la cicatriz, no en el ombligo.' },
      { text: 'Diástasis de los rectos.', why: 'Es una separación sobre la línea alba.' },
      { text: 'Una vesícula de Courvoisier.', why: 'El paciente ya no tiene vesícula.' },
    ],
    correcta: 0,
    razonamiento: 'La maniobra del esfuerzo pone en evidencia hernias y eventraciones; además, todo abdomen operado es asimétrico.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'ins',
        label: 'Inspección',
        tone: 'lilac',
        nota: 'Estática y dinámica',
        hijos: [
          { id: 'for', label: 'Forma y ombligo', tone: 'lilac', examen: true, nota: 'Ombligo afuera: embarazo o ascitis · adentro: obesidad, meteorismo' },
          { id: 'pie', label: 'Piel', tone: 'sky', examen: true, nota: 'Colateral portocava y cavocava · Chvostek · Cullen y Grey-Turner · cicatrices' },
          { id: 'din', label: 'Dinámica', tone: 'peach', nota: 'Esfuerzo: hernias, eventraciones, diástasis' },
        ],
      },
      {
        id: 'aus',
        label: 'Auscultación',
        tone: 'sky',
        nota: 'Antes de palpar',
        hijos: [
          { id: 'rha', label: 'Ruidos hidroaéreos', tone: 'sky', nota: 'Lucha: íleo mecánico · silencio: paralítico' },
          { id: 'sop', label: 'Soplos', tone: 'red', examen: true, nota: 'Aorta: aneurisma · renal · mesentérico' },
        ],
      },
      {
        id: 'per',
        label: 'Percusión',
        tone: 'peach',
        nota: 'Sin rebote, radiada',
        hijos: [
          { id: 'tra', label: 'Traube', tone: 'peach', nota: 'Mate: esplenomegalia, derrame, cardiomegalia' },
          { id: 'asc', label: 'Ascitis', tone: 'gold', examen: true, nota: 'Concavidad superior · desplazable · onda · témpano' },
        ],
      },
      {
        id: 'pal',
        label: 'Palpación',
        tone: 'rose',
        examen: true,
        nota: 'La más preguntada',
        hijos: [
          { id: 'sup', label: 'Superficial', tone: 'rose', examen: true, nota: 'Tensión · Blumberg y Gueneau de Mussy · chapoteo gástrico' },
          { id: 'pun', label: 'Puntos', tone: 'red', examen: true, nota: 'Apendiculares · pancreáticos y biliares · renales posteriores' },
          { id: 'pro', label: 'Profunda', tone: 'lilac', nota: 'Hígado: Chauffard, Mathieu, Gilbert · bazo: Naegeli, Schuster · Murphy' },
        ],
      },
    ],
    nexos: ['**Orden:** inspección, auscultación, percusión, palpación.', '**Ascitis** + ictericia + Chvostek + cabeza de medusa: cirrosis.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['dig05-d01', 'dig05-d02', 'dig05-d03'],
  anclas: {
    ubicate: { tab: 'mapa' },
    orden: { tab: 'teoria', seccion: 'orden' },
    inspeccion: { tab: 'teoria', seccion: 'inspeccion' },
    auscultacion: { tab: 'teoria', seccion: 'auscultacion' },
    percusion: { tab: 'teoria', seccion: 'percusion' },
    palpacion: { tab: 'teoria', seccion: 'palpacion' },
    puntos: { tab: 'teoria', seccion: 'puntos' },
    visceras: { tab: 'teoria', seccion: 'profunda' },
    hernias: { tab: 'teoria', seccion: 'pared' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
