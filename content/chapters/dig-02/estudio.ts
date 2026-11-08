import type { SourceRef } from '@/types';
import type { PlanEstudio } from '@/estudio/tipos';

/*
 * dig-02 organizado por pestañas (piloto Aula Clínica 2.0).
 * Los cuadros, escenas, choice, desarrollos y memoria se toman de index.tsx y escenas.ts.
 * Lo nuevo es la fisiopatología explicativa, verificada en las clases y en el libro.
 * Marca ★: el profesor lo señala como de examen o está en el preguntero.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M2 = (t: string) => r('mc-dig-2', t);
const M3 = (t: string) => r('mc-dig-3', t);
const M4 = (t: string) => r('mc-dig-4', t);
const EF1 = (t: string) => r('ef-dig-1', t);
const L = (p: string) => r('libro', undefined, p);

const FISIO = 'Fisiología general, no se da en la clase.';

export const estudio: PlanEstudio = {
  mapa: [
    { id: 'dolor', label: 'Tipos de dolor', tone: 'sky', items: ['Visceral y somático', 'Compresión y descompresión', 'Referido'], tab: 'e01' },
    { id: 'clasificacion', label: 'Clasificación', tone: 'lilac', items: ['Agudo: menos de 7 días', 'Médico, quirúrgico, inespecífico', 'Supraumbilical: ECG'], tab: 'e02' },
    { id: 'cinco', label: 'Los 5 quirúrgicos ★', tone: 'rose', items: ['Inflamatorio, obstructivo', 'Perforativo, hemorrágico', 'Vascular: el más letal'], tab: 'e03' },
    { id: 'murphy', label: 'Apendicitis y Murphy ★', tone: 'gold', items: ['Cronología: el recorrido', 'Tríada: la secuencia', 'Colecistitis aguda'], tab: 'e04' },
    { id: 'signos', label: 'Signos y exploración ★', tone: 'peach', items: ['Blumberg, Gueneau de Mussy', 'Jobert, Popper', 'Cullen, Grey-Turner'], tab: 'e05' },
  ],

  anclas: {
    ubicate: { tab: 'e00' },
    dolor: { tab: 'e01' },
    clasificacion: { tab: 'e02' },
    cinco: { tab: 'e03', seccion: 'general' },
    inflamatorio: { tab: 'e04' },
    obstructivo: { tab: 'e03', seccion: 'obstructivo' },
    perforativo: { tab: 'e03', seccion: 'perforativo' },
    hemorragico: { tab: 'e03', seccion: 'hemorragico' },
    vascular: { tab: 'e03', seccion: 'vascular' },
    regiones: { tab: 'e05', seccion: 'regiones' },
    estudio: { tab: 'e05', seccion: 'interrogatorio' },
    radar: { tab: 'e06', seccion: 'desarrollos' },
    choice: { tab: 'e06', seccion: 'simulacro' },
    desarrollos: { tab: 'e06', seccion: 'desarrollos' },
    memoria: { tab: 'e06', seccion: 'memoria' },
    integracion: { tab: 'e06' },
  },

  pestanas: [
    {
      id: 'e00',
      n: '00',
      label: 'Mapa',
      titulo: 'Mapa general',
      bloques: [{ t: 'ir', tab: 'e06', text: 'Al final, 06: casos clínicos y simulacro con corrección' }],
    },

    /* ───────────────────────── 01 ───────────────────────── */
    {
      id: 'e01',
      n: '01',
      label: 'Tipos de dolor',
      titulo: 'Tipos de dolor',
      fuentes: [M2('32:03–36:07'), M3('00:40–05:13'), M4('24:07–24:48'), L('2–3')],
      bloques: [
        { t: 'p', text: 'En realidad son dos: **visceral** y **somático**. El **referido** es un dolor de origen visceral que se percibe lejos del órgano. Toda la clasificación depende de qué hoja del peritoneo está irritada.' },
        {
          t: 'par',
          ancho: 'a',
          a: [{ t: 'figura', id: 'peritoneo-mano' }],
          b: [
            { t: 'regla', text: 'Duele al comprimir: peritoneo visceral. Duele más al soltar: peritoneo parietal.' },
            { t: 'p', text: 'Ese dolor mayor al soltar es el **signo del rebote** ★. Si duele al comprimir y también al descomprimir, están comprometidas las dos hojas.' },
            { t: 'p', text: 'Rebote es el nombre general: **localizado** es Blumberg y **generalizado** es Gueneau de Mussy ★.' },
          ],
        },
        {
          t: 'mecanismo',
          titulo: 'Dolor visceral',
          pasos: [
            { k: 'causa', text: 'El órgano se **distiende** (cólico), sufre **isquemia** o se **inflama**, e irrita el peritoneo visceral.' },
            { k: 'mecanismo', text: 'La señal viaja por **fibras C**: amielínicas, delgadas y lentas.' },
            { k: 'signo', text: 'Dolor sordo, vago, tardío y **mal localizado**. Duele a la compresión.' },
          ],
        },
        {
          t: 'mecanismo',
          titulo: 'Dolor somático',
          pasos: [
            { k: 'causa', text: 'La inflamación del peritoneo visceral alcanza secundariamente al **parietal**.' },
            { k: 'mecanismo', text: 'La señal viaja por **fibras Aδ**: mielínicas y rápidas, con límites precisos.' },
            { k: 'signo', text: 'Dolor agudo, punzante y **bien localizado**: el paciente lo señala. Duele a la descompresión.' },
          ],
        },
        {
          t: 'mecanismo',
          titulo: 'Dolor referido',
          pasos: [
            { k: 'causa', text: 'Un órgano está comprometido, pero el dolor aparece **lejos del sitio de origen**.' },
            { k: 'consecuencia', text: 'Hay una confusión sobre el origen del dolor: se detecta en otra zona.' },
            { k: 'signo', text: 'Apendicitis que empieza en el **epigastrio**. Infarto de **cara inferior** que simula úlcera, gastritis o pancreatitis.' },
          ],
        },
        { t: 'precision', extra: true, text: 'El mecanismo aceptado es la **convergencia**: aferencias viscerales y somáticas entran al mismo segmento medular, y la corteza atribuye la señal a la zona somática de ese segmento.', origen: FISIO },
        { t: 'desde', ficha: 'dolor', tipo: 'cuadro', titulo: 'Los tres dolores' },
        {
          t: 'par',
          extra: true,
          a: [{ t: 'clip', src: 'media/dig-02/clips/descompresion.mp4', poster: 'media/dig-02/clips/descompresion.jpg', titulo: 'Dolor a la descompresión', duracion: '17 s' }],
          b: [{ t: 'maniobras', ids: ['descompresion-blumberg'] }],
        },
        { t: 'practica', choice: ['dig02-q01'], desarrollos: ['dig02-d08'] },
      ],
    },

    /* ───────────────────────── 02 ───────────────────────── */
    {
      id: 'e02',
      n: '02',
      label: 'Clasificación',
      titulo: 'Clasificación del abdomen agudo',
      fuentes: [M2('32:03'), M3('05:55–17:02'), L('3')],
      bloques: [
        { t: 'p', text: 'El abdomen agudo es un **síndrome** cuyo síntoma cardinal es el **dolor abdominal**, con o sin otros signos y síntomas. No incluye la exacerbación aguda de un dolor crónico, como el de un cáncer de páncreas.' },
        {
          t: 'tabla',
          titulo: 'Por duración',
          head: ['', 'Tiempo', 'Qué implica'],
          rows: [
            ['Agudo', 'Menos de **7 días**', 'Puede ser médico o quirúrgico. Todo abdomen agudo lleva **interconsulta con cirugía**.'],
            ['Crónico', 'Más de **7 días**', 'Dispepsia, intestino irritable, úlcera, enfermedad biliar, pancreatitis crónica. Rara vez es quirúrgico.'],
          ],
        },
        { t: 'precision', extra: true, text: 'El libro define el dolor agudo en general hasta 4 semanas. Para abdomen agudo, el corte que usa el profesor es de 7 días: ese es el que se responde.', origen: 'Libro p. 3 y clase, min 05:55.' },
        {
          t: 'tabla',
          titulo: 'Por etiología ★',
          head: ['', 'Qué incluye', 'Conducta'],
          rows: [
            ['Médico', 'Gastroenteritis, pielonefritis aguda, gastritis, úlcera, cólico biliar, cetoacidosis diabética. También causas extraabdominales: infarto, pericarditis.', 'Tratamiento médico, ambulatorio o con internación.'],
            ['Quirúrgico ★', 'Los cinco grandes: inflamatorio, obstructivo, perforativo, hemorrágico y vascular.', 'Evaluación quirúrgica. Se desarrollan en la pestaña 03.'],
            ['Inespecífico', 'Dolor generalizado sin signos que lo definan, frecuente en mujeres jóvenes. Es un **diagnóstico por exclusión**.', 'Se escribe «abdomen agudo inespecífico» y, entre paréntesis, lo que sospechás. Estudios y seguimiento.'],
          ],
        },
        { t: 'h', text: 'La regla que no se negocia ★' },
        {
          t: 'mecanismo',
          pasos: [
            { k: 'causa', text: 'Un infarto de cara inferior puede dar dolor en epigastrio o hipocondrios (dolor referido).' },
            { k: 'consecuencia', text: 'Parece un cuadro digestivo, y más aún en un paciente hipertenso, diabético o tabaquista.' },
            { k: 'signo', text: 'Todo dolor abdominal agudo **por arriba del ombligo** lleva **electrocardiograma**.' },
          ],
        },
        { t: 'prof', text: 'Todo abdomen agudo lleva interconsulta con cirugía, «porque a veces nos podemos estar comiendo un cuadro quirúrgico».', refs: [M3('07:22')] },
        { t: 'practica', choice: ['dig02-q10'], desarrollos: ['dig02-d09'] },
      ],
    },

    /* ───────────────────────── 03 ───────────────────────── */
    {
      id: 'e03',
      n: '03',
      label: 'Los cinco',
      titulo: 'Los cinco abdómenes agudos quirúrgicos',
      fuentes: [M3('17:02–35:10'), M4('00:01–16:32'), M4('25:28'), L('86, 136, 360, 377')],
      bloques: [
        {
          t: 'secciones',
          id: 'cinco',
          items: [
            {
              id: 'general',
              label: 'Cuadro general ★',
              bloques: [
                { t: 'prof', text: '«Esto es pregunta de parcial… hay cinco grandes abdómenes agudos quirúrgicos que se tienen que saber como el Padre Nuestro.» ★', refs: [M3('17:02')] },
                { t: 'desde', ficha: 'cinco', tipo: 'cuadro', titulo: 'Causa, dolor y examen' },
                { t: 'regla', mem: 'dig02-m01' },
                { t: 'practica', choice: ['dig02-q04'], desarrollos: ['dig02-d01'] },
              ],
            },
            {
              id: 'inflamatorio',
              label: 'Inflamatorio',
              bloques: [
                { t: 'p', text: 'El más frecuente: todo lo que termina en **-itis**. Apendicitis, colecistitis (la segunda causa), pancreatitis, diverticulitis, adenitis mesentérica.' },
                { t: 'p', text: 'Apendicitis y colecistitis aguda se operan en cerca del **97 %** de los casos. La pancreatitis aguda y la diverticulitis pueden empezar con tratamiento médico.' },
                {
                  t: 'mecanismo',
                  titulo: 'Por qué se detiene el tránsito',
                  pasos: [
                    { k: 'causa', text: 'El órgano inflamado irrita el peritoneo visceral y compromete el intestino vecino.' },
                    { k: 'mecanismo', text: 'Se detiene el peristaltismo en ese segmento: **íleo paralítico localizado**.' },
                    { k: 'consecuencia', text: 'No elimina gases ni materia fecal; los gases distienden las asas.' },
                    { k: 'signo', text: '**Asa centinela**, RHA normales o disminuidos, timpanismo. Con reacción peritoneal: rebote (Blumberg si es localizado).' },
                  ],
                },
                { t: 'ir', tab: 'e04', text: 'Apendicitis, Murphy y colecistitis en la pestaña 04' },
              ],
            },
            {
              id: 'obstructivo',
              label: 'Obstructivo',
              bloques: [
                { t: 'p', text: 'Hay un **obstáculo real**: dentro de la luz (tumor), en la pared (neoplasia infiltrante), o por **bridas** de cirugías previas, **hernias**, vólvulos e invaginación (de 2 meses a 6 años).' },
                {
                  t: 'mecanismo',
                  titulo: 'Por arriba del obstáculo',
                  pasos: [
                    { k: 'causa', text: 'El bolo no pasa y aumenta la presión intraluminal.' },
                    { k: 'mecanismo', text: 'El intestino aumenta el peristaltismo para **vencer la obstrucción**.' },
                    { k: 'signo', text: 'Dolor **cólico** (visceral, va y viene) y **RHA de lucha**.' },
                  ],
                },
                {
                  t: 'mecanismo',
                  titulo: 'Lo que no puede bajar, sube',
                  pasos: [
                    { k: 'causa', text: 'El contenido se acumula y refluye desde el nivel de la obstrucción.' },
                    { k: 'signo', text: '**Vómitos**: alimentarios, luego biliosos y por último fecaloides.' },
                    { k: 'consecuencia', text: 'Las pérdidas llevan a deshidratación e hipopotasemia.' },
                  ],
                },
                {
                  t: 'mecanismo',
                  titulo: 'Por debajo del obstáculo',
                  pasos: [
                    { k: 'causa', text: 'No llega contenido al segmento distal.' },
                    { k: 'signo', text: '**No elimina gases ni heces**, RHA disminuidos por debajo.' },
                    { k: 'consecuencia', text: 'El gas retenido da **distensión** y **timpanismo**.' },
                  ],
                },
                {
                  t: 'par',
                  extra: true,
                  a: [{ t: 'clip', src: 'media/dig-02/clips/obstructivo.mp4', poster: 'media/dig-02/clips/obstructivo.jpg', titulo: 'El intestino lucha contra el obstáculo', duracion: '19 s' }],
                  b: [{ t: 'imagen', src: 'media/dig-02/img/rx-obstruccion.jpg', alt: 'Radiografía de abdomen de pie con asas intestinales dilatadas y niveles hidroaéreos', pie: 'Rx de abdomen: asas dilatadas por encima de la obstrucción.', credito: 'James Heilman, MD. CC BY-SA 3.0, recortada.' }],
                },
                { t: 'p', extra: true, text: 'Si la distensión supera la resistencia de la pared, el dolor se vuelve continuo. Cuando se compromete la irrigación (estrangulación) aparecen signos peritoneales.' },
                { t: 'desde', ficha: 'obstructivo', tipo: 'compare', titulo: 'No confundir: mecánico y paralítico' },
                { t: 'practica', choice: ['dig02-q08'], desarrollos: ['dig02-d03'] },
              ],
            },
            {
              id: 'perforativo',
              label: 'Perforativo',
              bloques: [
                { t: 'p', text: 'Se perfora una **víscera hueca**, sobre todo por **úlcera** o **apendicitis**. Dolor súbito, intenso, permanente y generalizado: el paciente queda **inmóvil**. Es quirúrgico de entrada.' },
                { t: 'prof', text: 'Signo de Jobert ★: «Si no saben este signo, los mandan a su casa.»', refs: [M4('05:09')] },
                {
                  t: 'par',
                  ancho: 'b',
                  a: [
                    { t: 'imagen', src: 'media/dig-02/img/rx-neumoperitoneo.jpg', alt: 'Radiografía de tórax de pie con una banda de aire entre el diafragma derecho y el hígado', pie: 'Rx de pie: la media luna de aire bajo el diafragma derecho, **signo de Popper**.', credito: 'Bill Rhodes. CC BY 2.0, recortada.', marcas: [{ x: 37, y: 46 }] },
                  ],
                  b: [
                    {
                      t: 'mecanismo',
                      titulo: 'El aire: Jobert y Popper',
                      pasos: [
                        { k: 'causa', text: 'El aire del tubo digestivo escapa a la cavidad peritoneal.' },
                        { k: 'mecanismo', text: 'Como es gas, **asciende** y se ubica bajo el diafragma, sobre el hígado.' },
                        { k: 'signo', text: '**Timpanismo donde debería haber matidez hepática**: signo de Jobert ★, por neumoperitoneo.' },
                      ],
                    },
                  ],
                },
                {
                  t: 'mecanismo',
                  titulo: 'El contenido: la peritonitis',
                  pasos: [
                    { k: 'causa', text: 'El contenido intestinal llega al peritoneo: **peritonitis secundaria**, polimicrobiana.' },
                    { k: 'mecanismo', text: 'El peritoneo parietal irritado provoca contractura muscular **involuntaria**.' },
                    { k: 'consecuencia', text: 'Se detiene todo el tránsito: íleo paralítico generalizado. Vómitos, deshidratación, taquicardia e hipotensión.' },
                    { k: 'signo', text: '**Abdomen en tabla**, Gueneau de Mussy y **RHA ausentes**.' },
                  ],
                },
                {
                  t: 'par',
                  a: [{ t: 'desde', ficha: 'perforativo', tipo: 'compare', titulo: 'Contractura y defensa' }],
                  b: [{ t: 'clip', extra: true, src: 'media/dig-02/clips/jobert.mp4', poster: 'media/dig-02/clips/jobert.jpg', titulo: 'Signo de Jobert', duracion: '24 s' }],
                },
                { t: 'practica', choice: ['dig02-q05', 'dig02-q12'], desarrollos: ['dig02-d04'] },
              ],
            },
            {
              id: 'hemorragico',
              label: 'Hemorrágico',
              bloques: [
                { t: 'p', text: 'El paciente **se desangra dentro del abdomen**. La causa más frecuente es ginecológica, el **embarazo ectópico**; también la rotura de un aneurisma de aorta y el trauma de hígado o vasos.' },
                {
                  t: 'mecanismo',
                  pasos: [
                    { k: 'causa', text: 'Se rompe un vaso o un órgano y la sangre sale a la cavidad.' },
                    { k: 'consecuencia', text: '**Hipovolemia**: taquicardia, hipotensión, frialdad, sudoración, oliguria y alteración de la conciencia.' },
                    { k: 'mecanismo', text: 'La sangre cae a las partes **declives** y reemplaza al aire.' },
                    { k: 'signo', text: '**Matidez** a la percusión ★, abdomen distendido, doloroso pero **blando**.' },
                  ],
                },
                { t: 'p', extra: true, text: 'Los ruidos hidroaéreos suelen estar conservados y no hay fiebre: el paciente tiende a la hipotermia.' },
                { t: 'regla', mem: 'dig02-m03' },
                { t: 'desde', ficha: 'hemorragico', tipo: 'compare', titulo: '«Lo que no quiero que se olviden son dos» ★' },
                { t: 'h', text: 'Cullen y Grey-Turner ★' },
                { t: 'p', text: 'Si la sangre llega al retroperitoneo aparecen equimosis: **periumbilical** (Cullen) y **en los flancos** (Grey-Turner).' },
                {
                  t: 'par',
                  a: [{ t: 'imagen', src: 'media/dig-02/img/signo-cullen.jpg', alt: 'Equimosis periumbilical en la pared abdominal', pie: 'Signo de Cullen.', credito: 'Herbert L. Fred y Hendrik A. van Dijk. CC BY 2.0.' }],
                  b: [{ t: 'imagen', src: 'media/dig-02/img/signo-grey-turner.jpg', alt: 'Equimosis extensas en el flanco', pie: 'Signo de Grey-Turner.', credito: 'Herbert L. Fred y Hendrik A. van Dijk. CC BY 2.0.' }],
                },
                { t: 'desde', ficha: 'hemorragico', tipo: 'callout', titulo: 'No son patognomónicos' },
                {
                  t: 'par',
                  extra: true,
                  a: [{ t: 'clip', src: 'media/dig-02/clips/hemorragico.mp4', poster: 'media/dig-02/clips/hemorragico.jpg', titulo: 'Matidez y abdomen blando', duracion: '24 s' }],
                  b: [{ t: 'clip', src: 'media/dig-02/clips/cullen-grey-turner.mp4', poster: 'media/dig-02/clips/cullen-grey-turner.jpg', titulo: 'Dónde aparece cada equimosis', duracion: '22 s' }],
                },
                { t: 'practica', choice: ['dig02-q07', 'dig02-q06'], desarrollos: ['dig02-d05', 'dig02-d07'] },
              ],
            },
            {
              id: 'vascular',
              label: 'Vascular',
              bloques: [
                { t: 'p', text: 'Poco frecuente, pero **el más letal**. Pensalo en el paciente mayor, tabaquista, diabético, hipertenso o que toma anticonceptivos orales.' },
                {
                  t: 'mecanismo',
                  pasos: [
                    { k: 'causa', text: 'Una oclusión mesentérica (trombosis o embolia) reduce el flujo al intestino.' },
                    { k: 'signo', text: 'Dolor que empieza leve, **progresa**, se generaliza y **no calma con ningún analgésico** ★. Examen casi normal al principio.' },
                    { k: 'mecanismo', text: 'Sin flujo, el intestino se infarta: los RHA primero se conservan y después **desaparecen**.' },
                    { k: 'consecuencia', text: 'El intestino muerto deja escapar las bacterias: **shock séptico** y falla multiorgánica.' },
                  ],
                },
                { t: 'prof', text: '«Tiempo que pasa, minuto que pasa, intestino que muere»: la hora de oro. Se pide lactato: mayor a 2 indica mala perfusión.', refs: [M4('14:29'), M4('16:32')] },
                { t: 'precision', extra: true, text: 'El lactato no es específico y un valor normal no descarta una isquemia temprana. Ante la sospecha clínica no se espera al laboratorio.', origen: FISIO },
                { t: 'p', extra: true, text: 'El libro describe la **angina abdominal** por ateromatosis mesentérica: dolor de máxima intensidad en epigastrio y zona periumbilical que no se alivia con analgésicos.' },
                { t: 'practica', choice: ['dig02-q09'], desarrollos: ['dig02-d06'] },
              ],
            },
          ],
        },
      ],
    },

    /* ───────────────────────── 04 ───────────────────────── */
    {
      id: 'e04',
      n: '04',
      label: 'Apendicitis y Murphy',
      titulo: 'Apendicitis y Murphy',
      fuentes: [M3('20:25–27:59'), M4('19:19'), L('360')],
      bloques: [
        {
          t: 'secciones',
          id: 'apendicitis',
          items: [
            {
              id: 'apendicitis',
              label: 'Apendicitis y Murphy ★',
              bloques: [
                { t: 'prof', text: '«Hay dos cosas importantes que quiero que diferencien: cronología de Murphy y tríada de Murphy.» ★', refs: [M3('20:25')] },
                {
                  t: 'tabla',
                  head: ['', 'Qué describe', 'Qué es'],
                  rows: [
                    ['Cronología de Murphy ★', 'El **recorrido del dolor**', 'Epigastrio, luego periumbilical, y termina en fosa ilíaca derecha.'],
                    ['Tríada de Murphy ★', 'La **secuencia de síntomas**', 'Dolor, vómitos y fiebre, en ese orden.'],
                    ['Signo de Murphy', 'Una **maniobra** sobre la vesícula', 'Detención de la inspiración al palpar la vesícula: colecistitis. Es otro concepto.'],
                  ],
                },
                { t: 'regla', mem: 'dig02-m02' },
                { t: 'escena', id: 'murphy', titulo: 'El recorrido, paso a paso' },
                {
                  t: 'par',
                  ancho: 'b',
                  a: [
                    { t: 'imagen', src: 'media/dig-02/img/apendice-blausen.jpg', alt: 'Ilustración del intestino grueso con el apéndice en la fosa ilíaca derecha', fondo: 'claro', credito: 'Blausen.com staff (2014). CC BY 4.0, recortada.' },
                    { t: 'p', text: 'El **punto de McBurney** está en la línea que va del ombligo a la espina ilíaca anterosuperior derecha, en la unión de los dos tercios internos con el tercio externo.' },
                  ],
                  b: [
                    {
                      t: 'mecanismo',
                      titulo: 'Por qué el dolor migra',
                      pasos: [
                        { k: 'causa', text: 'Un **fecalito** obstruye la luz del apéndice, que se distiende y se inflama.' },
                        { k: 'mecanismo', text: 'Solo está irritado el peritoneo **visceral**: fibras C, dolor mal localizado.' },
                        { k: 'signo', text: 'El dolor se siente en **epigastrio** y después alrededor del ombligo.' },
                        { k: 'mecanismo', text: 'La inflamación alcanza el peritoneo **parietal**: fibras Aδ.' },
                        { k: 'signo', text: 'Se localiza en la **fosa ilíaca derecha**: McBurney y Blumberg ★' },
                      ],
                    },
                    { t: 'precision', extra: true, text: 'El profesor lo llama dolor referido. En sentido estricto, es dolor visceral en la línea media: el apéndice deriva del intestino medio y sus aferencias entran alrededor de T10.', origen: FISIO },
                  ],
                },
                {
                  t: 'par',
                  a: [
                    { t: 'desde', ficha: 'inflamatorio', tipo: 'triad', n: 0 },
                    { t: 'desde', ficha: 'inflamatorio', tipo: 'timeline', titulo: 'Evolución de la apendicitis' },
                  ],
                  b: [{ t: 'clip', extra: true, src: 'media/dig-02/clips/murphy.mp4', poster: 'media/dig-02/clips/murphy.jpg', titulo: 'Tríada y cronología de Murphy', duracion: '23 s' }],
                },
                { t: 'practica', choice: ['dig02-q02', 'dig02-q03'], desarrollos: ['dig02-d02'] },
              ],
            },
            {
              id: 'colecistitis',
              label: 'Colecistitis aguda',
              bloques: [
                { t: 'p', text: 'La segunda causa de abdomen agudo inflamatorio. Es más frecuente en mujeres y se relaciona con la ingesta de alimentos colecistocinéticos.' },
                {
                  t: 'par',
                  a: [
                    { t: 'desde', ficha: 'inflamatorio', tipo: 'triad', n: 1, titulo: 'La tríada, que puede ser tétrada' },
                    {
                      t: 'mecanismo',
                      titulo: 'Por qué aparece la ictericia',
                      pasos: [
                        { k: 'causa', text: 'Si solo está inflamada la vesícula, la ictericia es rara.' },
                        { k: 'mecanismo', text: 'Un cálculo se escapa y se aloja en el **colédoco**.' },
                        { k: 'signo', text: 'Ictericia de tipo **obstructivo**: pasa de tríada a tétrada.' },
                      ],
                    },
                  ],
                  b: [{ t: 'maniobras', extra: true, ids: ['vesicula-murphy'], titulo: 'Maniobra de Murphy' }],
                },
                { t: 'ir', tab: 'e03', seccion: 'inflamatorio', text: 'Volver al abdomen agudo inflamatorio' },
              ],
            },
          ],
        },
      ],
    },

    /* ───────────────────────── 05 ───────────────────────── */
    {
      id: 'e05',
      n: '05',
      label: 'Signos y exploración',
      titulo: 'Signos y exploración clínica',
      fuentes: [M4('17:54–33:35'), EF1('02:14–05:00'), L('3, 86, 360, 409')],
      bloques: [
        {
          t: 'tabla',
          titulo: 'Los signos en una mirada',
          head: ['Signo', 'Qué encontrás', 'Qué indica'],
          rows: [
            ['Rebote', 'Duele más al soltar que al comprimir', 'Compromiso del peritoneo parietal'],
            ['Blumberg ★', 'Rebote **localizado**', 'Irritación parietal localizada: apendicitis en FID'],
            ['Gueneau de Mussy ★', 'Rebote **generalizado**', 'Peritonitis difusa'],
            ['Abdomen en tabla', 'Rigidez involuntaria', 'Perforación, peritonitis'],
            ['Jobert ★', 'Timpanismo sobre el área hepática', 'Neumoperitoneo: víscera hueca perforada'],
            ['Popper', 'Rx de pie: aire bajo el diafragma, en media luna', 'Neumoperitoneo'],
            ['Cullen ★', 'Equimosis periumbilical', 'Sangrado retroperitoneal de cualquier causa'],
            ['Grey-Turner ★', 'Equimosis en los flancos', 'Sangrado retroperitoneal de cualquier causa'],
            ['Asa centinela', 'Íleo paralítico localizado', 'Abdomen agudo inflamatorio'],
          ],
        },
        {
          t: 'secciones',
          id: 'exploracion',
          items: [
            {
              id: 'interrogatorio',
              label: 'Interrogatorio',
              bloques: [
                { t: 'desde', ficha: 'estudio', tipo: 'mnemo', titulo: 'ALICIA: cómo se semiografía el dolor' },
                { t: 'p', text: 'Preguntá antecedentes: alcoholismo, antiinflamatorios y **cirugías abdominales previas**.' },
                { t: 'p', text: '**La fiebre importa por cuándo aparece.** Antes del dolor orienta a gastroenteritis; después del dolor, a un abdomen agudo inflamatorio. En el hemorrágico no hay fiebre.' },
              ],
            },
            {
              id: 'inspeccion',
              label: 'Inspección',
              bloques: [
                {
                  t: 'par',
                  ancho: 'a',
                  a: [
                    {
                      t: 'tabla',
                      head: ['Hallazgo', 'Orienta a'],
                      rows: [
                        ['Paciente inmóvil', 'Irritación peritoneal: todo movimiento duele'],
                        ['Cicatrices quirúrgicas', '**Bridas**'],
                        ['Distensión generalizada', 'Obstrucción, ascitis'],
                        ['Distensión localizada', 'Plastrón, absceso'],
                        ['Ondas peristálticas visibles', 'Obstrucción: lucha por encima del obstáculo'],
                        ['Equimosis ★', 'Cullen y Grey-Turner'],
                      ],
                    },
                    { t: 'p', text: 'Signos vitales: temperatura (fiebre o hipotermia en las hemorragias), frecuencia cardíaca, tensión arterial y frecuencia respiratoria.' },
                  ],
                  b: [{ t: 'maniobras', extra: true, ids: ['abd-inspeccion-estatica-dinamica'] }],
                },
              ],
            },
            {
              id: 'auscultacion',
              label: 'Auscultación',
              bloques: [
                {
                  t: 'par',
                  ancho: 'a',
                  a: [{ t: 'desde', ficha: 'estudio', tipo: 'scale', titulo: 'Qué te dicen los ruidos hidroaéreos' }],
                  b: [{ t: 'maniobras', extra: true, ids: ['abd-auscultacion-rha'] }],
                },
              ],
            },
            {
              id: 'percusion',
              label: 'Percusión',
              bloques: [
                {
                  t: 'par',
                  ancho: 'a',
                  a: [
                    {
                      t: 'tabla',
                      head: ['Sonido', 'Mecanismo', 'Cuadro'],
                      rows: [
                        ['Timpanismo', 'Gas retenido en asas distendidas', 'Obstrucción, íleo'],
                        ['Sin matidez hepática ★', 'Aire libre interpuesto', 'Perforación: **Jobert**'],
                        ['Matidez ★', 'La sangre reemplaza al aire', 'Hemorrágico'],
                      ],
                    },
                    { t: 'p', text: 'Matidez de **concavidad superior**: líquido libre (ascitis, hemoperitoneo). De **convexidad superior**: embarazo o tumores.' },
                  ],
                  b: [{ t: 'maniobras', extra: true, ids: ['abd-percusion-traube'] }],
                },
              ],
            },
            {
              id: 'palpacion',
              label: 'Palpación',
              bloques: [
                {
                  t: 'par',
                  ancho: 'a',
                  a: [
                    {
                      t: 'tabla',
                      head: ['Hallazgo', 'Qué significa'],
                      rows: [
                        ['Dolor profundo, sin contractura ni defensa', 'Cólico biliar, cólico renal, gastroenteritis'],
                        ['Dolor a la compresión', 'Peritoneo visceral'],
                        ['Dolor a la descompresión ★', 'Peritoneo parietal'],
                        ['Doloroso pero blando', 'Hemoperitoneo'],
                      ],
                    },
                    { t: 'p', extra: true, text: 'Con un dolor generalizado, el **tacto rectal** ayuda a localizarlo. El tacto vaginal se suma ante un cuadro ginecológico.' },
                  ],
                  b: [{ t: 'maniobras', extra: true, ids: ['palpacion-superficial-tension', 'puntos-dolorosos-abdomen', 'descompresion-blumberg'] }],
                },
              ],
            },
            {
              id: 'regiones',
              label: 'Regiones',
              bloques: [{ t: 'desde', ficha: 'regiones', tipo: 'abdomen', titulo: 'Dónde duele y qué hay debajo' }],
            },
            {
              id: 'estudios',
              label: 'Estudios',
              bloques: [
                {
                  t: 'tabla',
                  head: ['Estudio', 'Para qué'],
                  rows: [
                    ['Ecografía', '**Lo primero**: la más barata y rápida. Apéndice, vía biliar, páncreas, vía urinaria.'],
                    ['Rx de tórax y abdomen de pie', 'Aire subdiafragmático (**Popper**); asas dilatadas en la obstrucción.'],
                    ['Tomografía de abdomen y pelvis', 'Si a las 24 horas no hay diagnóstico.'],
                    ['Laboratorio', 'Hemograma, glucemia, urea, amilasa, hepatograma, ionograma, orina y **test de embarazo**. Troponina si el ECG está alterado.'],
                  ],
                },
                { t: 'precision', extra: true, text: 'La amilasa no es exclusiva de pancreatitis: también sube en úlcera perforada, colecistitis, embarazo ectópico y obstrucción intestinal.', origen: 'Libro p. 409 y clase, min 29:32.' },
              ],
            },
          ],
        },
        { t: 'practica', choice: ['dig02-q11'], desarrollos: ['dig02-d10'] },
      ],
    },

    /* ───────────────────────── 06 ───────────────────────── */
    {
      id: 'e06',
      n: '06',
      label: 'Integración',
      titulo: 'Integración y evaluación',
      fuentes: [M3('10:15–11:36'), M3('25:18'), M4('10:18–11:43'), M4('25:28')],
      bloques: [
        {
          t: 'secciones',
          id: 'integracion',
          items: [
            {
              id: 'casos',
              label: 'Casos',
              bloques: [
                {
                  t: 'casos',
                  items: [
                    {
                      id: 'c1',
                      origen: 'practica',
                      titulo: 'Varón de 19 años',
                      texto: 'Hace 14 horas empezó con dolor en la boca del estómago. Después bajó alrededor del ombligo y ahora lo señala con un dedo en la fosa ilíaca derecha. Primero vomitó y recién después tuvo 38 °C. Al soltar bruscamente la FID le duele más que al comprimir.',
                      pregunta: '¿Qué significa que el dolor ahora esté localizado?',
                      opciones: [
                        { text: 'La inflamación alcanzó el peritoneo parietal.', why: 'El dolor pasó de visceral (fibras C, mal localizado) a somático (fibras Aδ, preciso).' },
                        { text: 'El apéndice cambió de lugar.', why: 'El apéndice no se mueve: lo que cambia es la hoja del peritoneo irritada.' },
                        { text: 'Se perforó el apéndice.', why: 'La perforación da dolor súbito y generalizado, no un dolor que se localiza.' },
                        { text: 'El dolor sigue siendo visceral, pero más intenso.', why: 'El dolor visceral no se puede señalar con un dedo.' },
                      ],
                      correcta: 0,
                      razonamiento: 'Cronología de Murphy más tríada en orden (dolor, vómitos, fiebre) más Blumberg: abdomen agudo inflamatorio por apendicitis.',
                    },
                    {
                      id: 'c2',
                      origen: 'practica',
                      titulo: 'Hombre de 58 años con úlcera conocida',
                      texto: 'Dolor brusco, intenso y generalizado. Está inmóvil, con el abdomen duro y RHA ausentes. A la percusión hay timpanismo sobre el área hepática.',
                      pregunta: '¿Qué estudio muestra directamente el mecanismo que sospechás?',
                      opciones: [
                        { text: 'Radiografía de tórax de pie.', why: 'Muestra el aire subdiafragmático (Popper), la consecuencia directa de la perforación.' },
                        { text: 'Electrocardiograma.', why: 'Lo llevaría igual por tener dolor supraumbilical, pero no muestra la perforación.' },
                        { text: 'Tomografía a las 24 horas.', why: 'Es quirúrgico de entrada: no se esperan 24 horas.' },
                        { text: 'Amilasa.', why: 'Puede subir en la úlcera perforada, pero es inespecífica.' },
                      ],
                      correcta: 0,
                      razonamiento: 'Aire libre que asciende (Jobert, Popper) más peritonitis secundaria (tabla, RHA ausentes): abdomen agudo perforativo.',
                    },
                    {
                      id: 'c3',
                      origen: 'clase',
                      titulo: 'Mujer de 22 años en la guardia',
                      texto: 'Dolor abdominal generalizado y vómitos biliosos. Presión 90/50, taquicárdica, saturando 93 %, con fiebre y sin ictericia. El signo de Murphy era positivo, pero no del todo manifiesto.',
                      pregunta: '¿Cómo se escribe el diagnóstico presuntivo?',
                      opciones: [
                        { text: 'Abdomen agudo inespecífico (¿colecistitis?).', why: 'Sin evidencia suficiente, se deja constancia del síndrome y, entre paréntesis, de lo que se sospecha.' },
                        { text: 'Colecistitis aguda, sin más estudios.', why: 'Falta evidencia: hay que pedir los estudios antes de afirmarlo.' },
                        { text: 'Abdomen agudo perforativo.', why: 'No hay tabla ni timpanismo hepático descriptos.' },
                        { text: 'Gastroenteritis aguda.', why: 'No explica el compromiso hemodinámico ni el Murphy positivo.' },
                      ],
                      correcta: 0,
                      razonamiento: 'Es un diagnóstico por exclusión que obliga a estudiar y seguir. En este caso, la paciente tenía cálculos en la vía biliar y se operó a la mañana siguiente.',
                      refs: [M3('10:15'), M3('11:36'), M3('25:18')],
                    },
                    {
                      id: 'c4',
                      origen: 'clase',
                      titulo: 'Paciente con aterosclerosis y equimosis en los flancos',
                      texto: 'Dolor abdominal, desorientado y deshidratado. Tenía aterosclerosis y le habían colocado un stent hacía poco. Algunos atribuyeron las equimosis a un problema de plaquetas.',
                      pregunta: '¿Qué hay que pensar primero?',
                      opciones: [
                        { text: 'Rotura de aneurisma de aorta con sangrado retroperitoneal.', why: 'Las equimosis en los flancos (Grey-Turner) indican sangre en el retroperitoneo.' },
                        { text: 'Pancreatitis necrohemorrágica, porque el signo es patognomónico.', why: 'Es el error que advierte el profesor: no son patognomónicos.' },
                        { text: 'Trastorno de las plaquetas.', why: 'Fue la interpretación que demoró el diagnóstico: revisá siempre el abdomen.' },
                        { text: 'Abdomen agudo obstructivo.', why: 'La obstrucción no produce equimosis.' },
                      ],
                      correcta: 0,
                      razonamiento: 'Abdomen agudo hemorrágico: sangre en el retroperitoneo, equimosis e hipovolemia con mala perfusión cerebral. En el caso que cuenta el profesor, el paciente murió porque no se actuó a tiempo.',
                      refs: [M4('10:18'), M4('11:02')],
                    },
                  ],
                },
              ],
            },
            {
              id: 'simulacro',
              label: 'Simulacro',
              bloques: [{ t: 'practica', titulo: 'Preguntas de integración', choice: ['dig02-x01', 'dig02-x02', 'dig02-x03'] }],
            },
            {
              id: 'desarrollos',
              label: 'Desarrollos',
              bloques: [
                {
                  t: 'practica',
                  titulo: 'Desarrollos del capítulo',
                  desarrollos: ['dig02-d01', 'dig02-d02', 'dig02-d03', 'dig02-d04', 'dig02-d05', 'dig02-d06', 'dig02-d07', 'dig02-d08', 'dig02-d09', 'dig02-d10'],
                },
              ],
            },
            {
              id: 'repaso',
              label: 'Repaso en video',
              bloques: [
                { t: 'p', text: 'Cómo responder «hábleme de abdomen agudo» en un oral, de la definición a los estudios.' },
                {
                  t: 'video',
                  titulo: 'Repaso de abdomen agudo',
                  video: {
                    src: 'media/dig-02/repaso-abdomen-agudo.mp4',
                    poster: 'media/dig-02/repaso-abdomen-agudo.jpg',
                    duration: '5:29',
                    chapters: [
                      { t: 0, label: 'Definición y dolor' },
                      { t: 39, label: 'Tipos de dolor' },
                      { t: 61, label: 'Clasificación' },
                      { t: 76, label: 'Los cinco quirúrgicos' },
                      { t: 117, label: 'Perforativo y hemorrágico' },
                      { t: 151, label: 'Cullen y Grey-Turner' },
                      { t: 175, label: 'Blumberg y Gueneau de Mussy' },
                      { t: 205, label: 'Peritonitis' },
                      { t: 246, label: 'Causas por cuadrante' },
                      { t: 281, label: 'Examen físico y estudios' },
                    ],
                    script: [],
                  },
                },
              ],
            },
            {
              id: 'memoria',
              label: 'Memoria',
              bloques: [{ t: 'memoria', ids: ['dig02-m01', 'dig02-m02', 'dig02-m03', 'dig02-m04', 'dig02-m05'] }],
            },
            {
              id: 'cierre',
              label: 'Lo esencial',
              bloques: [
                { t: 'h', text: 'Lo imprescindible ★' },
                { t: 'cierre' },
                { t: 'h', text: 'Errores que se penalizan' },
                { t: 'errores' },
                { t: 'h', text: 'Sigue en' },
                { t: 'conexiones' },
                { t: 'h', text: 'Lo que todavía tenés que repasar' },
                { t: 'pendientes' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
