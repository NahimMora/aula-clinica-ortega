import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';
import { clase } from './clase';

/*
 * dig-11 — Síndromes vesiculares. Fuente: clase «Síndromes vesiculares» (Ortega) + libro p. 385–387.
 * El profe aclara que en el parcial no se toma (es de final y de los JTP), salvo ictericia, síndrome coledociano, Murphy y Courvoisier.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const V = (t: string) => r('vesic', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-11',
  systemId: 'digestivo',
  title: 'Síndromes vesiculares',
  subtitle: 'El viaje del cálculo: litiasis, cólico biliar, colecistitis, Mirizzi, coledocolitiasis, colangitis y pancreatitis biliar.',
  estimatedMinutes: 30,
  sources: [V('00:02–29:17'), L('385–387')],

  map: {
    center: 'Síndromes vesiculares',
    why: 'El profe lo dice claro: «no es pregunta de parcial, es pregunta de **final**, y lo preguntan sus JTP». Pero hay cuatro cosas que sí: por qué la litiasis **no da ictericia**, el **síndrome coledociano** («como el Padre Nuestro»), la **maniobra de Murphy** y **Courvoisier**.',
    prereqs: [
      { label: 'Ictericia (dig-04)', detail: '«Para entender esto tienen que saber ictericia.»', chapterId: 'dig-04' },
      { label: 'Anatomía de la vía biliar', detail: 'Vesícula, cístico, hepático común, colédoco, ampolla de Vater.' },
    ],
    branches: [
      { id: 'conceptos', label: 'El cálculo', tone: 'mint', items: ['Colelitiasis vs colecistitis', '4 F', 'De la vesícula a la ampolla'] },
      { id: 'colecistitis', label: 'Cólico y colecistitis', tone: 'red', items: ['Cólico: transitorio', 'Colecistitis: impactado', 'Murphy ★'] },
      { id: 'ictericia', label: '¿Ictericia?', tone: 'gold', items: ['Litiasis: NO ★', 'Coledociano ★', 'Sin dolor = cáncer'] },
      { id: 'coledociano', label: 'Vía biliar', tone: 'lilac', items: ['Coledocolitiasis', 'Charcot', 'Pancreatitis biliar'] },
    ],
    outcomes: [
      'Diferenciar **colelitiasis**, **cólico biliar** y **colecistitis aguda**.',
      'Explicar por qué la litiasis vesicular **no da ictericia** y cuándo sí.',
      'Recitar el **síndrome coledociano** y la **tríada de Charcot**.',
      'Saber hacer e interpretar la **maniobra de Murphy**.',
    ],
  },

  theory: [
    {
      id: 'conceptos',
      kicker: 'Conceptos',
      title: 'Colelitiasis vs colecistitis y el viaje del cálculo',
      priority: 'muy-importante',
      summary: '«Muchos se confunden»: litiasis = cálculos; colecistitis = inflamación por un cálculo impactado en el cístico.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Qué se toma', text: 'Síndromes vesiculares «no es pregunta de parcial, es pregunta de **final** y lo preguntan sus JTP». «Lo que sí quiero que sepan para el parcial es **ictericia**.»', refs: [V('00:02')] },
        {
          t: 'compare',
          cols: [
            { title: 'Colelitiasis', tone: 'mint', items: ['**Cálculos** en la vesícula', 'Puede ser asintomática', 'Dolor cólico leve, que pasa rápido'] },
            { title: 'Colecistitis aguda', tone: 'red', items: ['**Inflamación** de la vesícula', 'Por un cálculo **impactado en el cístico** (casi siempre)', 'Dolor intenso, fiebre: suele terminar en cirugía'] },
          ],
        },
        { t: 'anim', id: 'camino' },
        {
          t: 'mnemo',
          word: '4 F',
          tone: 'gold',
          items: [
            { l: 'F', t: '**F**emale: mujer' },
            { l: 'F', t: '**F**at: obesa' },
            { l: 'F', t: '**F**orty: alrededor de los 40' },
            { l: 'F', t: '**F**ertile: en edad fértil' },
          ],
          note: '«Las 4 F me las tienen que saber.» Otros factores: dieta rica en colesterol y grasas, hipertrigliceridemia, fármacos, embarazo, genética. Cálculos: 80 % de colesterol.',
          refs: [V('06:46'), V('07:32')],
        },
      ],
      refs: [V('00:44'), V('01:34'), V('03:51'), V('05:19'), L('385')],
    },
    {
      id: 'colecistitis',
      kicker: 'Clínica',
      title: 'Cólico biliar, colecistitis aguda y Murphy',
      priority: 'imprescindible',
      summary: 'El cólico pasa; la colecistitis se queda, con fiebre y Murphy positivo.',
      blocks: [
        {
          t: 'cuadro',
          title: 'Cólico biliar vs colecistitis aguda',
          cols: [
            { t: 'Cólico biliar', tone: 'gold' },
            { t: 'Colecistitis aguda', tone: 'red' },
          ],
          rows: [
            { k: 'Qué pasa', v: ['El cálculo se traba un rato en el cístico y sale', 'El cálculo queda **impactado** → vesícula inflamada'] },
            { k: 'Dolor', v: ['HD y epigastrio → dorso y hombro derecho, tras grasas; calma con antiespasmódicos', 'Igual pero **más intenso y persistente**'] },
            { k: 'Fiebre', v: ['**No**', '**Sí**'] },
            { k: 'Murphy', v: ['Negativo', '**Positivo**'] },
            { k: 'Laboratorio', v: ['Normal', 'Leucocitosis con desviación a la izquierda, ↑ FA'] },
            { k: 'Ictericia', v: ['No', 'Rara: solo si complica (Mirizzi, repercusión hepática)'] },
          ],
          refs: [V('08:14'), V('08:57'), V('16:12'), V('16:52'), V('19:04')],
        },
        { t: 'triad', title: 'Colecistitis aguda', items: ['Dolor en HD (→ hombro der.)', 'Fiebre', 'Vómitos biliosos'], plus: ['Ictericia'], plusLabel: 'Agregar la ictericia (si complica)', center: 'Colecistitis', tone: 'red', note: 'Con **signo de Murphy positivo**: presión en el punto cístico + inspiración profunda → el dolor corta la inspiración. «La maniobra de Murphy la tienen que saber.»', refs: [V('18:24'), V('19:04')] },
        {
          t: 'biliar',
          title: 'Mirá dónde está el cálculo',
          items: [
            { id: 'asint', t: 'Litiasis asintomática', d: 'Cálculos que no se impactan: no duelen.', tone: 'mint', luz: ['vesicula'], calculo: 'vesicula' },
            { id: 'colico', t: 'Cólico biliar', d: 'Se traba un momento en el cístico: dolor transitorio, sin fiebre.', tone: 'gold', luz: ['vesicula', 'cistico'], calculo: 'cistico' },
            { id: 'cole', t: 'Colecistitis aguda', d: 'Impactado en el cístico: vesícula inflamada, fiebre, Murphy +.', tone: 'red', luz: ['vesicula', 'cistico'], calculo: 'cistico', dilata: ['vesicula'] },
          ],
        },
      ],
      refs: [V('16:52'), V('18:24'), L('385')],
    },
    {
      id: 'ictericia',
      kicker: 'Ictericia',
      title: '¿Por qué la litiasis vesicular no da ictericia?',
      priority: 'imprescindible',
      summary: 'La vesícula almacena bilis, no la produce: con el cálculo ahí, la bilis sigue bajando por el colédoco.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Pregunta de examen', text: '«Cuando hay cálculos en la vesícula biliar **no hay ictericia**. Hay ictericia cuando hay **obstrucción del colédoco**… eso es pregunta de examen.»', refs: [V('09:41'), V('10:26')] },
        {
          t: 'flow',
          root: {
            label: 'Paciente con litiasis: ¿tiene **ictericia**?',
            tone: 'gold',
            children: [
              { label: '**No**: cálculo en la vesícula o en el cístico', tone: 'mint', note: 'La bilis baja igual por hepático y colédoco' },
              {
                label: '**Sí**: algo obstruye la vía principal',
                tone: 'red',
                star: true,
                children: [
                  { label: 'Coledocolitiasis', tone: 'red', note: 'Cálculo en el colédoco' },
                  { label: 'Mirizzi', tone: 'peach', note: 'Comprime el hepático común' },
                  { label: 'Colecistitis con repercusión hepática', tone: 'peach' },
                ],
              },
            ],
          },
        },
        {
          t: 'compare',
          title: 'Ictericia con o sin dolor',
          cols: [
            { title: 'Ictericia CON dolor', tone: 'gold', items: ['Patología **calculosa** de la vía biliar', 'Coledocolitiasis, Mirizzi'] },
            { title: 'Ictericia SIN dolor', tone: 'red', items: ['Pensar en **cáncer de cabeza de páncreas**', 'Vesícula palpable indolora: **Bard y Pick**, **ley de Courvoisier-Terrier** (pregunta de parcial)'] },
          ],
        },
      ],
      refs: [V('11:08'), V('11:53'), V('12:36'), V('14:00'), V('14:41'), V('15:29')],
    },
    {
      id: 'coledociano',
      kicker: 'Vía biliar',
      title: 'Coledocolitiasis, síndrome coledociano y colangitis',
      priority: 'imprescindible',
      summary: 'Síndrome coledociano = ictericia + coluria + hipocolia/acolia. Colangitis = Charcot.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Como el Padre Nuestro', text: '«¿Qué es síndrome coledociano? **Pregunta de parcial**. Esto sí, sí o sí, **como si fuese el Padre Nuestro**, me lo saben.»', refs: [V('24:18'), V('25:03')] },
        { t: 'triad', title: 'Síndrome coledociano', items: ['Ictericia', 'Coluria', 'Hipocolia / acolia'], plus: ['Prurito', 'Fiebre'], plusLabel: 'Agregar prurito y fiebre', center: 'Coledociano', tone: 'gold', note: 'No es una enfermedad del colédoco: es la tríada de **cualquier obstrucción** de la vía biliar principal (cálculo, parásitos, disfunción del Oddi, cáncer de páncreas o de vesícula, adenopatías).', refs: [V('17:35'), V('24:18')] },
        {
          t: 'biliar',
          title: 'Causas de obstrucción',
          items: [
            { id: 'coledo', t: 'Coledocolitiasis', d: 'La **complicación más frecuente** de la litiasis vesicular (≈ 15 %). Colédoco > 10 mm en la ecografía.', tone: 'gold', luz: ['coledoco'], calculo: 'coledoco', dilata: ['hepatico', 'coledoco'] },
            { id: 'tumor', t: 'Cáncer de cabeza de páncreas', d: 'Ictericia **progresiva e indolora** + vesícula distendida no dolorosa + pérdida de peso: Courvoisier-Terrier.', tone: 'red', luz: ['pancreas', 'vesicula'], tumor: 'pancreas', dilata: ['vesicula', 'coledoco', 'hepatico'] },
            { id: 'ampolla', t: 'Cáncer de la ampolla de Vater', d: 'Tríada: **ictericia + dolor abdominal + hemorragia digestiva alta**.', tone: 'lilac', luz: ['ampolla'], tumor: 'ampolla', dilata: ['coledoco', 'hepatico'] },
          ],
        },
        { t: 'triad', title: 'Colangitis: tríada de Charcot', items: ['Dolor en HD', 'Fiebre (con escalofríos)', 'Ictericia'], plus: ['Shock', 'Alteración de la conciencia'], plusLabel: 'Péntada de Reynolds (bibliografía)', center: 'Charcot', tone: 'red', note: 'Infección de la bilis estancada por bacterias que ascienden desde el duodeno, con aumento de la presión en el colédoco: **emergencia médica**. La péntada de Reynolds (colangitis grave) es de la bibliografía, no la dio en clase.', refs: [V('26:30'), L('387')] },
      ],
      refs: [V('23:33'), V('25:45'), V('26:30'), V('27:12'), L('387')],
    },
    {
      id: 'estudios',
      kicker: 'Diagnóstico',
      title: 'Ecografía y laboratorio',
      priority: 'muy-importante',
      summary: 'La ecografía es el método de elección (certeza ~95 %).',
      blocks: [
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Ecografía', title: 'Cálculo = sombra acústica', text: 'Imagen con **sombra acústica** posterior. Si no hay sombra: **pólipo** o **adenocarcinoma**.', tone: 'mint' },
            { tag: 'Ecografía', title: 'Colédoco dilatado', text: 'Normal < 7–8 mm; **> 10 mm** sugiere un cálculo impactado en el colédoco.', tone: 'gold' },
            { tag: 'Laboratorio', title: 'Colestasis + inflamación', text: 'Leucocitosis con desviación a la izquierda; **FA, GGT, 5′-nucleotidasa**; enzimas hepáticas y **amilasa** (descartar pancreatitis).', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'note', text: 'La **colangiorresonancia** es el segundo estudio, cuando se sospecha el cálculo en la vía biliar.', refs: [V('21:17')] },
      ],
      refs: [V('19:46'), V('20:37'), V('21:17'), V('22:00')],
    },
    {
      id: 'otros',
      kicker: 'Para saber que existen',
      title: 'Otras patologías de la vesícula',
      priority: 'complementario',
      blocks: [
        {
          t: 'cards',
          cols: 2,
          items: [
            { tag: 'Sin cálculos', title: 'Colecistitis alitiásica', text: 'Rara, en el paciente crítico; elevada mortalidad.', tone: 'red' },
            { tag: 'Crónica', title: 'Vesícula en porcelana', text: 'Episodios repetidos → vesícula fibrosa y calcificada: **riesgo de cáncer** → colecistectomía.', tone: 'peach' },
            { tag: 'Ecografía sin sombra', title: 'Pólipos', text: 'Premalignos: se saca la vesícula.', tone: 'lilac' },
            { tag: 'Cáncer', title: 'Adenocarcinoma de vesícula', text: 'Más frecuente en el **fondo**; diagnóstico por ecografía.', tone: 'rose' },
          ],
        },
      ],
      refs: [V('22:48'), V('27:12'), V('27:56'), V('28:37')],
    },
  ],

  developments: [
    {
      id: 'dig11-d01',
      origen: 'preguntero',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'coledociano',
      question: '¿Qué es el síndrome coledociano? ¿Qué es la coledocolitiasis?',
      quote: { text: '«…síndrome coledociano, pregunta de parcial… sí o sí, como si fuese el Padre Nuestro»', refs: [V('24:18')] },
      answer: [
        { t: 'p', text: '**Síndrome coledociano:** tríada **ictericia + coluria + hipocolia/acolia** (± prurito y fiebre), por obstrucción de la vía biliar principal: cálculos, parásitos, disfunción del Oddi, cáncer de páncreas o de vesícula, adenopatías.' },
        { t: 'p', text: '**Coledocolitiasis:** cálculo impactado en el colédoco; la **complicación más frecuente** de la litiasis vesicular. Complicaciones: **colangitis** y **pancreatitis** biliar.' },
      ],
      refs: [V('24:18'), V('25:45'), L('387')],
    },
    {
      id: 'dig11-d02',
      origen: 'clase',
      prio: 'P1',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'ictericia',
      question: '¿Por qué la litiasis vesicular no produce ictericia?',
      quote: { text: '«Cuando hay cálculos en la vesícula biliar, no hay ictericia… eso es pregunta de examen»', refs: [V('09:41')] },
      answer: [{ t: 'p', text: 'Porque la vesícula **almacena** bilis, no la produce: aunque tenga cálculos (o uno en el cístico), la bilis sigue bajando por el hepático común y el colédoco. Hay ictericia cuando se **obstruye la vía principal**: coledocolitiasis, Mirizzi o colecistitis con repercusión hepática. Ictericia **sin dolor**: pensar en cáncer de cabeza de páncreas.' }],
      refs: [V('10:26'), V('11:08'), V('14:41')],
    },
    {
      id: 'dig11-d03',
      origen: 'preguntero',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'colecistitis',
      question: '¿Qué es un cólico biliar? ¿Qué es la colecistitis aguda? ¿Signo de Murphy?',
      quote: { text: '«…la maniobra de Murphy la tienen que saber»', refs: [V('18:24')] },
      answer: [
        { t: 'p', text: '**Cólico biliar:** dolor en HD/epigastrio irradiado al dorso y hombro derecho, tras comidas grasas, por un cálculo que se traba transitoriamente en el cístico; sin fiebre.' },
        { t: 'p', text: '**Colecistitis aguda:** inflamación de la vesícula por un cálculo **impactado en el cístico**: dolor persistente, fiebre, vómitos, **Murphy positivo** (± ictericia). **Murphy:** presión en el punto cístico + inspiración profunda → el dolor corta la inspiración.' },
      ],
      refs: [V('16:52'), V('18:24'), V('19:04')],
    },
    {
      id: 'dig11-d04',
      origen: 'preguntero',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'coledociano',
      question: '¿Qué es la colangitis? Tríada de Charcot.',
      answer: [{ t: 'p', text: 'Infección de la bilis estancada en una vía biliar obstruida (bacterias que ascienden desde el duodeno): **tríada de Charcot = dolor en HD + fiebre + ictericia**. Emergencia médica. (Bibliografía: péntada de Reynolds = Charcot + shock + alteración de la conciencia.)' }],
      refs: [V('26:30'), L('387')],
    },
    {
      id: 'dig11-d05',
      origen: 'preguntero',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'conceptos',
      question: 'Síndrome de Mirizzi, colecistitis crónica y litiasis asintomática.',
      answer: [{ t: 'p', text: '**Mirizzi:** cálculo en el cístico + vesícula inflamada que comprimen el hepático común → ictericia. **Crónica:** vesícula fibrosa, en porcelana, riesgo de cáncer → colecistectomía. **Asintomática:** cálculos que no se impactan.' }],
      refs: [V('13:17'), V('15:29'), V('22:48')],
    },
  ],

  mcq: [
    {
      id: 'dig11-q01',
      origen: 'practica',
      topic: 'Conceptos',
      difficulty: 1,
      stem: 'La colecistitis aguda litiásica se produce por:',
      options: [
        { text: 'Un cálculo impactado en el conducto cístico.', why: 'Correcto.' },
        { text: 'Un cálculo libre en la vesícula.', why: 'Eso es colelitiasis.' },
        { text: 'Un cálculo en la ampolla de Vater.', why: 'Da pancreatitis.' },
        { text: 'Un tumor de páncreas.', why: 'Da ictericia indolora.' },
      ],
      answer: 0,
      refs: [V('01:34')],
    },
    {
      id: 'dig11-q02',
      origen: 'practica',
      topic: 'Ictericia',
      difficulty: 2,
      emphasis: true,
      stem: '¿Por qué la litiasis vesicular **no** da ictericia?',
      options: [
        { text: 'Porque la vesícula almacena bilis y la vía principal sigue libre.', why: 'Correcto.' },
        { text: 'Porque los cálculos son de colesterol.', why: 'No es la razón.' },
        { text: 'Porque el hígado no produce bilis.', why: 'No.' },
        { text: 'Sí da ictericia siempre.', why: 'No: es pregunta de examen.' },
      ],
      answer: 0,
      refs: [V('10:26')],
    },
    {
      id: 'dig11-q03',
      origen: 'practica',
      topic: 'Coledociano',
      difficulty: 1,
      emphasis: true,
      stem: 'El síndrome coledociano está formado por:',
      options: [
        { text: 'Ictericia + coluria + hipocolia/acolia.', why: 'Correcto.' },
        { text: 'Dolor + fiebre + ictericia.', why: 'Eso es Charcot.' },
        { text: 'Dolor + vómitos + fiebre.', why: 'Eso es Murphy (apendicitis) o colecistitis.' },
        { text: 'Ascitis + esplenomegalia + várices.', why: 'Eso es hipertensión portal.' },
      ],
      answer: 0,
      refs: [V('24:18')],
    },
    {
      id: 'dig11-q04',
      origen: 'practica',
      topic: 'Coledociano',
      difficulty: 2,
      stem: 'La complicación **más frecuente** de la litiasis vesicular es:',
      options: [
        { text: 'Coledocolitiasis.', why: 'Correcto.' },
        { text: 'Cáncer de vesícula.', why: 'No.' },
        { text: 'Mirizzi.', why: 'Es menos frecuente.' },
        { text: 'Íleo biliar.', why: 'Raro.' },
      ],
      answer: 0,
      refs: [V('25:45')],
    },
    {
      id: 'dig11-q05',
      origen: 'practica',
      topic: 'Colangitis',
      difficulty: 1,
      stem: 'La tríada de **Charcot** corresponde a:',
      options: [
        { text: 'Colangitis.', why: 'Correcto: dolor + fiebre + ictericia.' },
        { text: 'Colecistitis aguda.', why: 'No.' },
        { text: 'Pancreatitis.', why: 'No.' },
        { text: 'Apendicitis.', why: 'No.' },
      ],
      answer: 0,
      refs: [V('26:30'), L('387')],
    },
    {
      id: 'dig11-q06',
      origen: 'practica',
      topic: 'Murphy',
      difficulty: 2,
      stem: 'El signo de Murphy positivo indica:',
      options: [
        { text: 'Colecistitis aguda.', why: 'Correcto.' },
        { text: 'Apendicitis.', why: 'No.' },
        { text: 'Cólico renal.', why: 'No.' },
        { text: 'Úlcera perforada.', why: 'No.' },
      ],
      answer: 0,
      refs: [V('19:04')],
    },
    {
      id: 'dig11-q07',
      origen: 'practica',
      topic: 'Clínica',
      difficulty: 2,
      stem: 'Dolor en HD tras una comida grasa que cede en 2 horas con un antiespasmódico, **sin fiebre**:',
      options: [
        { text: 'Cólico biliar.', why: 'Correcto.' },
        { text: 'Colecistitis aguda.', why: 'Tendría fiebre y dolor persistente.' },
        { text: 'Colangitis.', why: 'Tendría fiebre e ictericia.' },
        { text: 'Pancreatitis.', why: 'No.' },
      ],
      answer: 0,
      refs: [V('08:57'), V('16:12')],
    },
    {
      id: 'dig11-q08',
      origen: 'practica',
      topic: 'Ecografía',
      difficulty: 2,
      stem: 'En la ecografía, una imagen en la vesícula **sin sombra acústica** sugiere:',
      options: [
        { text: 'Pólipo o adenocarcinoma.', why: 'Correcto.' },
        { text: 'Cálculo.', why: 'Los cálculos dan sombra acústica.' },
        { text: 'Normalidad.', why: 'No.' },
        { text: 'Colangitis.', why: 'No.' },
      ],
      answer: 0,
      refs: [V('20:37'), V('21:17')],
    },
    {
      id: 'dig11-q09',
      origen: 'practica',
      topic: 'Ictericia',
      difficulty: 2,
      stem: 'Ictericia **progresiva e indolora** con vesícula palpable no dolorosa:',
      options: [
        { text: 'Cáncer de cabeza de páncreas (Courvoisier).', why: 'Correcto.' },
        { text: 'Coledocolitiasis.', why: 'Suele doler y la vesícula no se distiende.' },
        { text: 'Colecistitis aguda.', why: 'Duele.' },
        { text: 'Cólico biliar.', why: 'No.' },
      ],
      answer: 0,
      refs: [V('14:41'), V('15:29')],
    },
  ],

  memory: [
    {
      id: 'dig11-m01',
      title: 'Síndrome coledociano',
      purpose: '«Como el Padre Nuestro».',
      evaluates: [{ t: 'list', items: ['Ictericia', 'Coluria', 'Hipocolia / acolia', '± prurito, fiebre'] }],
      interpret: 'Es la firma de toda obstrucción de la vía biliar principal.',
      mnemonic: { hook: 'Amarillo afuera, oscuro en la orina, blanco en el inodoro.', explain: 'Ictericia, coluria, acolia.' },
      recall: { q: '¿Qué tríada forma el síndrome coledociano?', a: 'Ictericia, coluria e hipocolia/acolia.' },
    },
    {
      id: 'dig11-m02',
      title: 'Dónde está el cálculo',
      purpose: 'Ordenar los síndromes.',
      evaluates: [{ t: 'list', items: ['Vesícula: colelitiasis', 'Cístico (rato): cólico', 'Cístico (impactado): colecistitis', 'Colédoco: coledocolitiasis', 'Ampolla: pancreatitis'] }],
      interpret: 'A medida que baja, aparecen ictericia y complicaciones.',
      mnemonic: { hook: 'Vesícula → Cístico → Colédoco → Ampolla = Litiasis → Colecistitis → Ictericia → Páncreas.', explain: 'El viaje del cálculo.' },
      recall: { q: '¿Qué produce un cálculo enclavado en la ampolla de Vater?', a: 'Pancreatitis biliar (y síndrome coledociano).' },
    },
    {
      id: 'dig11-m03',
      title: 'Charcot',
      purpose: 'No confundir tríadas.',
      evaluates: [{ t: 'list', items: ['Dolor HD', 'Fiebre', 'Ictericia', '= colangitis'] }],
      interpret: 'Coledociano + fiebre = infección de la bilis.',
      mnemonic: { hook: 'CHARCOT = Colangitis: Calor (fiebre), Color (ictericia), Cólico (dolor).', explain: 'Tres C.' },
      recall: { q: '¿Qué es la tríada de Charcot y a qué corresponde?', a: 'Dolor en HD, fiebre e ictericia: colangitis.' },
    },
  ],

  maneuvers: {
    ids: ['vesicula-murphy', 'puntos-dolorosos-abdomen', 'higado-bimanual'],
    note: 'Murphy, punto cístico y palpación del hígado.',
  },

  closing: {
    map: {
      center: 'Síndromes vesiculares en una mirada',
      nodes: [
        { label: 'El cálculo', tone: 'mint', items: ['4 F', 'Litiasis ≠ colecistitis', 'Viaja hacia abajo'] },
        { label: 'Colecistitis', tone: 'red', items: ['Impactado en el cístico', 'Dolor + fiebre + vómitos', 'Murphy ★'] },
        { label: 'Ictericia ★', tone: 'gold', items: ['Litiasis: NO', 'Coledociano', 'Sin dolor = cáncer'] },
        { label: 'Vía biliar', tone: 'lilac', items: ['Coledocolitiasis', 'Charcot', 'Pancreatitis biliar'] },
      ],
    },
    essentials: [
      '**Colelitiasis** (cálculos) ≠ **colecistitis** (inflamación por cálculo impactado en el cístico).',
      'Cólico biliar: transitorio, sin fiebre. Colecistitis: dolor persistente, fiebre, vómitos, **Murphy +**.',
      'La litiasis vesicular **no da ictericia**; la da la obstrucción de la vía principal (coledocolitiasis, Mirizzi).',
      '**Síndrome coledociano**: ictericia + coluria + hipocolia/acolia.',
      '**Colangitis** = tríada de **Charcot**: dolor + fiebre + ictericia. Cálculo en la ampolla → **pancreatitis**.',
      'Ecografía: cálculo con **sombra acústica**; colédoco > 10 mm.',
    ],
    links: [
      { chapterId: 'dig-04', text: '[[dig-04|Ictericia]]: obstructiva, Courvoisier, marcadores de colestasis.' },
      { chapterId: 'dig-15', text: '[[dig-15|Pancreatitis aguda]]: la pancreatitis biliar.' },
      { chapterId: 'dig-02', text: '[[dig-02|Abdomen agudo]]: la colecistitis como abdomen agudo inflamatorio.' },
    ],
    pitfalls: [
      'Decir que la colelitiasis da ictericia.',
      'Confundir Charcot (colangitis) con la tríada de la colecistitis o con Murphy.',
      'Usar «colelitiasis» y «colecistitis» como sinónimos.',
      'Olvidar que la ictericia indolora orienta a cáncer.',
    ],
    miniExam: [
      {
        id: 'dig11-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Mujer de 45 años con dolor en HD, fiebre con escalofríos e ictericia. Pensás en:',
        options: [
          { text: 'Colangitis por coledocolitiasis.', why: 'Correcto: Charcot.' },
          { text: 'Cólico biliar.', why: 'No tiene fiebre ni ictericia.' },
          { text: 'Litiasis asintomática.', why: 'No.' },
          { text: 'Cáncer de páncreas.', why: 'Sería indoloro.' },
        ],
        answer: 0,
        refs: [V('26:30')],
      },
    ],
  },

  escenas,
  clase,
  diagrams: {},
};

export default chapter;
