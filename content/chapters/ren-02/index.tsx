import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * ren-02 — Examen físico nefrourológico y el paciente con proteinuria. Fuente: clase «MC Renal» parte 3 (Ortega)
 * + libro p. 459–460 + video Argente (Guyon y puñopercusión, verificados por fotogramas).
 * El profe cierra los motivos de consulta con la proteinuria («hay proteinuria, el problema es el glomérulo») y después
 * da el examen físico. Puntos ureterales: los clásicos de semiología (el libro remite al apunte de abdomen).
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const E = (t: string) => r('ef-ren', t);
const L = (p: string) => r('libro', undefined, p);
const A = (t: string) => r('argente', t);

const chapter: Chapter = {
  id: 'ren-02',
  systemId: 'renal',
  title: 'Examen físico nefrourológico',
  subtitle: 'El paciente con proteinuria (cuánto, de dónde, cómo se mide), el color de la orina y el examen: Guyon, Montenegro, Israel, Glenard, puñopercusión y puntos ureterales.',
  estimatedMinutes: 35,
  sources: [E('00:00–31:53'), L('p459–460'), A('3:02:39–3:04:33')],

  map: {
    center: 'Examen nefrourológico',
    why: 'Dos cosas que el profe marca: «**hay proteinuria, el problema es el glomérulo**» (y cómo se mide: tiras reactivas y proteinuria de 24 horas, «eso le preguntan en el parcial»), y la **maniobra de Guyon**, que «**siempre la preguntan**».',
    prereqs: [
      { label: 'Motivos de consulta renales (ren-01)', detail: 'Espuma = proteinuria; hematuria glomerular.', chapterId: 'ren-01' },
      { label: 'Puntos dolorosos del abdomen (dig-05)', detail: 'El libro remite ahí para los puntos renoureterales.', chapterId: 'dig-05' },
    ],
    branches: [
      { id: 'proteinuria', label: 'Proteinuria ★', tone: 'gold', items: ['> 300 mg/24 h', '> 3,5 g = nefrótico', 'Glomerular · tubular · sobrecarga'] },
      { id: 'orina', label: 'Color de la orina', tone: 'red', items: ['Coluria', 'Porfiria', 'Olor y espuma'] },
      { id: 'general', label: 'Examen general', tone: 'sky', items: ['Edema', 'Piel de la IRC', 'Tensión arterial'] },
      { id: 'region', label: 'Región renal ★', tone: 'lilac', items: ['Guyon', 'Puñopercusión', 'Puntos ureterales'] },
    ],
    outcomes: [
      'Clasificar una proteinuria por **cantidad** y por **origen**.',
      'Elegir el método: **tiras**, **24 horas** o **electroforesis**.',
      'Interpretar los colores de la orina (coluria, porfiria, hematuria).',
      'Hacer **Guyon**, Montenegro, Israel, Glenard, la **puñopercusión** y los **puntos ureterales**.',
    ],
  },

  theory: [
    {
      id: 'proteinuria',
      kicker: 'Lo que toma ★',
      title: 'El paciente con proteinuria',
      priority: 'imprescindible',
      summary: 'Normal: menos de 150 mg en 24 horas. Proteinuria: más de 300 mg. Más de 3,5 g: rango nefrótico.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Póngalo en la cabeza', text: '«Hay proteinuria, **el problema es el glomérulo**, nada más.»', refs: [E('05:45')] },
        {
          t: 'scale',
          title: 'Cuánta proteína en 24 horas',
          items: [
            { k: '< 150 mg', t: 'Fisiológico', d: 'Algunos libros: < 30 mg.', tone: 'mint' },
            { k: '30–300 mg', t: 'Microalbuminuria', d: 'Típica del **diabético** con más de 5 años de evolución.', tone: 'sky' },
            { k: '300 mg–1 g', t: 'Proteinuria leve', tone: 'gold' },
            { k: '1–3,5 g', t: 'Moderada', tone: 'peach' },
            { k: '> 3,5 g', t: 'Severa: rango nefrótico', d: 'Pensá en **síndrome nefrótico**.', tone: 'red' },
          ],
          ends: ['Menos', 'Más'],
        },
        { t: 'anim', id: 'proteinuria' },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Semicuantitativo', title: 'Tiras reactivas', text: 'Rápidas, aproximadas, en cruces (de + a ++++; ++++ = más de 3 g). Lo primero en la guardia.', tone: 'sky' },
            { tag: 'Cuantitativo ★', title: 'Proteinuria de 24 horas', text: 'La **más fidedigna**: dice con certeza cuánto pierde. Se junta toda la orina del día.', tone: 'gold' },
            { tag: 'Cualitativo', title: 'Electroforesis', text: 'Qué proteína es. La **inmunoelectroforesis** (anti kappa y anti lambda) detecta la de **Bence Jones**.', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'prof', title: 'Los métodos', text: 'Tiras reactivas y proteinuria de 24 horas son «las que más se usan… **eso le preguntan en el parcial**». El índice proteína/creatinina se usa en la insuficiencia renal crónica.', refs: [E('20:58'), E('23:06')] },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Sedimento', title: 'Hematíes + cilindros hemáticos + proteinuria', text: 'Lesión **glomerular activa**.', tone: 'red' },
            { tag: 'Sedimento', title: 'Cilindros grasos', text: 'El profe los asocia a la glomerulopatía de **cambios mínimos** (síndrome nefrótico).', tone: 'gold' },
            { tag: 'Ritmo', title: 'Persistente o intermitente', text: 'Persistente: enfermedad glomerular activa. Intermitente: ejercicio, fiebre, insuficiencia cardíaca, diabetes inicial.', tone: 'mint' },
          ],
        },
      ],
      refs: [E('08:08'), E('09:42'), E('11:06'), E('13:11'), E('13:55'), E('15:25'), E('16:45'), E('18:09'), E('19:34'), E('20:16')],
    },
    {
      id: 'orina',
      kicker: 'Aspecto de la orina',
      title: 'Los colores de la orina',
      priority: 'muy-importante',
      summary: 'Rojo: hematuria (o hemoglobinuria). Pardo «Coca-Cola»: coluria. Normal que se pone roja al sol: porfiria.',
      blocks: [
        {
          t: 'scale',
          title: 'De qué color y por qué',
          items: [
            { k: 'Ámbar', t: 'Normal', d: 'Urocromos; más concentrada a la mañana.', tone: 'gold' },
            { k: 'Rojo', t: 'Hematuria', d: 'Rojo vivo = sangre fresca. También hemoglobinuria (sin eritrocitos en el sedimento).', tone: 'red' },
            { k: 'Pardo', t: 'Coluria', d: 'Color «Coca-Cola»: bilirrubina directa en la orina (problema biliar).', tone: 'peach' },
            { k: 'Al sol', t: 'Porfiria', d: 'La orina sale normal y, expuesta al sol, vira a **rojo parduzco**.', tone: 'lilac' },
            { k: 'Turbia', t: 'Olor fuerte', d: 'Sospechá infección urinaria.', tone: 'mint' },
            { k: 'Espuma', t: 'Proteinuria', d: 'Si no desaparece; se confirma con laboratorio.', tone: 'sky' },
          ],
        },
        { t: 'callout', kind: 'tip', title: 'Un caso del profe', text: 'Hombre con **dolor abdominal** sin causa, **fiebre** y **vómitos**; la orina parece normal, pero al dejarla al sol se vuelve rojo parduzca: **porfiria** (las porfirinas reaccionan a la luz).', refs: [E('03:33'), E('04:19')] },
      ],
      refs: [E('02:09'), E('02:49'), E('03:33'), E('05:01')],
    },
    {
      id: 'general',
      kicker: 'Examen físico',
      title: 'Examen general del paciente renal',
      priority: 'muy-importante',
      summary: 'Edema, piel, estado nutricional y tensión arterial.',
      blocks: [
        {
          t: 'cuadro',
          title: 'El edema según el síndrome (tapalo)',
          cols: [
            { t: 'Nefrítico', tone: 'red' },
            { t: 'Nefrótico', tone: 'gold' },
          ],
          rows: [
            { k: 'Magnitud', v: ['**Leve**', '**Mayor**; puede llegar a anasarca'] },
            { k: 'Dónde', v: ['**Periorbitario**', 'Miembros inferiores y zonas declives'] },
            { k: 'Cómo', v: ['Matinal, blando', '**Pálido, blando, con fóvea** (Godet)'] },
            { k: 'Proteinuria', v: ['< 3,5 g/24 h', '**> 3,5 g/24 h**'] },
          ],
          refs: [E('26:30'), L('p459')],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'IRC', title: 'Piel pálida amarillenta', text: '**Anemia** por déficit de eritropoyetina + pigmentos retenidos. Prurito con lesiones de rascado.', tone: 'gold' },
            { tag: 'Uremia', title: 'Petequias y equimosis', text: 'Las plaquetas funcionan mal: **trombocitopatía urémica**.', tone: 'red' },
            { tag: 'Siempre', title: 'Tensión arterial', text: 'La HTA puede ser causa (nefroangioesclerosis) o consecuencia (estenosis de la arteria renal, nefropatías crónicas).', tone: 'sky' },
          ],
        },
      ],
      refs: [E('26:30'), E('27:10'), E('27:50'), L('p459')],
    },
    {
      id: 'region',
      kicker: 'Lo que toma ★',
      title: 'Examen de la región renal',
      priority: 'imprescindible',
      summary: 'Inspección casi muda, palpación con Guyon (la más preguntada), puñopercusión y puntos ureterales; auscultar si hay HTA refractaria.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Siempre la preguntan', text: 'Hay tres maniobras de palpación renal: «la maniobra de **Guyon**, que **siempre la preguntan**»; la de **Montenegro**, que es la misma pero en decúbito ventral; y la de **Israel**, en decúbito lateral.', refs: [E('29:11'), E('29:51')] },
        { t: 'anim', id: 'examen' },
        {
          t: 'cuadro',
          title: 'Las maniobras de palpación (tapalo)',
          cols: [
            { t: 'Posición', tone: 'sky' },
            { t: 'Qué se siente', tone: 'lilac' },
          ],
          rows: [
            { k: 'Guyon ★', v: ['**Decúbito dorsal**; mano posterior en el ángulo costomuscular, anterior por fuera de los rectos', '**Peloteo renal** en la espiración'] },
            { k: 'Montenegro', v: ['**Decúbito ventral**', 'El **choque** del riñón contra la mano lumbar'] },
            { k: 'Israel', v: ['**Decúbito lateral contrario** al riñón explorado', 'El riñón cae hacia la mano anterior'] },
            { k: 'Glenard', v: ['Pinza con la mano izquierda bajo el reborde costal', '**Ptosis renal**: el riñón no se escapa en la espiración'] },
          ],
          refs: [E('29:11'), L('p459–460')],
        },
        {
          t: 'abdomen',
          title: 'Puntos dolorosos renoureterales',
          items: [
            { id: 'sup', t: 'Ureteral superior', d: 'A la altura del **ombligo**, en el **borde externo del recto** anterior (de los dos lados).', tone: 'sky', puntos: ['ureteral-sup'] },
            { id: 'med', t: 'Ureteral medio', d: 'Sobre la **línea biespinosa**, en la unión del tercio medio con el externo.', tone: 'lilac', puntos: ['ureteral-med'] },
            { id: 'post', t: 'Posteriores', d: '**Costovertebral** (12.ª costilla y columna) y **costomuscular** (12.ª costilla y masa lumbar). El ureteral **inferior** se explora por tacto rectal o vaginal.', tone: 'peach', puntos: ['renal-d', 'renal-i'] },
          ],
          caption: 'Puntos clásicos de semiología (el libro remite al apunte de abdomen). Dolor: distensión o inflamación de la vía urinaria (litiasis, pielonefritis).',
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Percusión', title: 'Puñopercusión de Murphy', text: 'Con el **puño** cerrado sobre la fosa lumbar.', tone: 'red' },
            { tag: 'Percusión', title: 'Puñopercusión de Giordano', text: 'Con el **borde cubital** de la mano. En los niños, sobre la otra mano apoyada.', tone: 'peach' },
            { tag: 'Auscultación', title: 'Soplo periumbilical o lumbar', text: '**Estenosis de la arteria renal**: sospechala si la HTA no baja con 3 o 4 antihipertensivos.', tone: 'lilac' },
          ],
        },
        { t: 'callout', kind: 'note', title: 'Normal', text: 'La puñopercusión es **indolora**. En personas delgadas puede palparse el tercio inferior del riñón derecho o el polo inferior del izquierdo: elástico, profundo, desciende en la inspiración.', refs: [L('p460'), A('3:03:39')] },
      ],
      refs: [E('28:30'), E('29:11'), E('29:51'), E('30:33'), E('31:13'), E('31:53'), L('p459–460'), A('3:02:39'), A('3:03:57')],
    },
  ],

  developments: [
    {
      id: 'ren02-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'proteinuria',
      question: '¿Cómo valora a un paciente con proteinuria? Clasificación y métodos.',
      quote: { text: '«Hay proteinuria, el problema es el glomérulo, nada más»', refs: [E('05:45')] },
      answer: [
        { t: 'p', text: '**Clínica:** orina con **espuma** que no desaparece; lo certero es el **laboratorio**.' },
        { t: 'p', text: '**Cantidad (24 h):** normal < 150 mg; **microalbuminuria** 30–300 mg; proteinuria > 300 mg: **leve** hasta 1 g, **moderada** 1–3,5 g, **severa o rango nefrótico > 3,5 g**.' },
        { t: 'p', text: '**Métodos:** semicuantitativo con **tiras reactivas** (cruces); cuantitativo con la **proteinuria de 24 horas** (la más fidedigna); cualitativo con **electroforesis / inmunoelectroforesis** (anti kappa y anti lambda para Bence Jones).' },
        { t: 'p', text: '**Origen:** **glomerular** (la más frecuente; selectiva: albúmina > 80 %), **tubular** (proximal, Fanconi) y **por sobrecarga** (Bence Jones del mieloma).' },
      ],
      refs: [E('08:57'), E('11:48'), E('13:11'), E('16:45'), E('18:52'), E('20:16'), E('24:27')],
    },
    {
      id: 'ren02-d02',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'region',
      question: 'Describa la maniobra de Guyon y las otras maniobras de palpación renal.',
      quote: { text: '«…la maniobra de Guyon, que esta maniobra siempre la preguntan»', refs: [E('29:11')] },
      answer: [
        { t: 'p', text: '**Guyon:** paciente en decúbito dorsal; mano posterior transversal con los dedos en el **ángulo costomuscular**; mano anterior paralela a la línea media, **por fuera de los rectos**, que avanza desde la fosa ilíaca. En la espiración, la mano posterior empuja y la anterior percibe el **peloteo renal**.' },
        { t: 'p', text: '**Montenegro:** lo mismo en **decúbito ventral** (la mano lumbar siente el choque). **Israel:** **decúbito lateral** contrario al riñón explorado. **Glenard:** pinza bajo el reborde costal para la **ptosis renal**.' },
        { t: 'p', text: 'Normal: el riñón no se palpa (en delgados, el polo inferior). Agrandado: hidronefrosis, poliquistosis, tumor.' },
      ],
      refs: [E('29:51'), L('p459–460'), A('3:02:39')],
    },
    {
      id: 'ren02-d03',
      prio: 'P1',
      priority: 'muy-importante',
      ficha: 'region',
      question: '¿Cómo se hace la puñopercusión lumbar y qué significa que sea positiva?',
      quote: { text: '«…para ver si el paciente tiene dolor en esa zona»', refs: [E('30:33')] },
      answer: [{ t: 'p', text: 'Se percuten las dos fosas lumbares con el **puño** (**Murphy**) o con el **borde cubital** (**Giordano**); en niños, sobre la otra mano apoyada. Normalmente es indolora. **Positiva** (dolor): distensión o inflamación de la cápsula renal: **pielonefritis**, **litiasis** (cólico renoureteral), tumor.' }],
      refs: [E('31:13'), L('p460'), A('3:03:57')],
    },
    {
      id: 'ren02-d04',
      prio: 'P2',
      priority: 'complementario',
      ficha: 'proteinuria',
      question: '¿Qué es la proteinuria por sobrecarga y cómo se detecta?',
      quote: { text: '«…la proteinuria por sobrecarga, por lo general es cuando el paciente tiene una enfermedad en sangre»', refs: [E('18:09')] },
      answer: [{ t: 'p', text: 'Exceso de proteínas en la **sangre** que terminan filtrándose: la proteína de **Bence Jones** (cadenas livianas) del **mieloma múltiple**, la causa más frecuente. No la detectan las tiras: se usa la **inmunoelectroforesis** con antisuero anti kappa y anti lambda. El profe aclara que es una pregunta de la Dra. González.' }],
      refs: [E('18:52'), E('19:34')],
    },
  ],

  mcq: [
    {
      id: 'ren02-q01',
      topic: 'Proteinuria',
      difficulty: 1,
      emphasis: true,
      stem: 'Proteinuria en **rango nefrótico** es más de:',
      options: [
        { text: '3,5 g en 24 horas.', why: 'Correcto.' },
        { text: '300 mg en 24 horas.', why: 'Es el límite de la proteinuria.' },
        { text: '150 mg en 24 horas.', why: 'Es el límite fisiológico.' },
        { text: '1 g en 24 horas.', why: 'Es el límite entre leve y moderada.' },
      ],
      answer: 0,
      refs: [E('09:42'), E('11:48')],
    },
    {
      id: 'ren02-q02',
      topic: 'Proteinuria',
      difficulty: 2,
      stem: 'La microalbuminuria corresponde a:',
      options: [
        { text: '30–300 mg/24 h.', why: 'Correcto.' },
        { text: '300 mg–1 g/24 h.', why: 'Es proteinuria leve.' },
        { text: '> 3,5 g/24 h.', why: 'Es rango nefrótico.' },
        { text: '< 30 mg/24 h.', why: 'Es normal.' },
      ],
      answer: 0,
      refs: [E('10:22'), E('16:05')],
    },
    {
      id: 'ren02-q03',
      topic: 'Proteinuria',
      difficulty: 2,
      emphasis: true,
      stem: 'El método **más fidedigno** para saber cuánta proteína pierde un paciente es:',
      options: [
        { text: 'La proteinuria de 24 horas.', why: 'Correcto.' },
        { text: 'La tira reactiva.', why: 'Es aproximada (semicuantitativa).' },
        { text: 'La espuma de la orina.', why: 'Orienta, no mide.' },
        { text: 'La electroforesis.', why: 'Es cualitativa: dice qué proteína es.' },
      ],
      answer: 0,
      refs: [E('20:58'), E('25:08')],
    },
    {
      id: 'ren02-q04',
      topic: 'Proteinuria',
      difficulty: 3,
      stem: 'La proteína de Bence Jones del mieloma múltiple se detecta mejor con:',
      options: [
        { text: 'Inmunoelectroforesis (anti kappa y anti lambda).', why: 'Correcto.' },
        { text: 'Tiras reactivas.', why: 'No la detectan bien.' },
        { text: 'Sedimento urinario.', why: 'No.' },
        { text: 'Urocultivo.', why: 'No.' },
      ],
      answer: 0,
      refs: [E('19:34'), E('23:06')],
    },
    {
      id: 'ren02-q05',
      topic: 'Proteinuria',
      difficulty: 2,
      stem: 'La proteinuria glomerular de **alta selectividad** se caracteriza por:',
      options: [
        { text: 'Pérdida predominante de albúmina (> 80 %).', why: 'Correcto.' },
        { text: 'Pérdida de cadenas livianas.', why: 'Es la de sobrecarga.' },
        { text: 'Pérdida de proteínas pequeñas por falla del proximal.', why: 'Es la tubular.' },
        { text: 'Ausencia de albúmina.', why: 'No.' },
      ],
      answer: 0,
      refs: [E('13:11'), E('13:55')],
    },
    {
      id: 'ren02-q06',
      topic: 'Orina',
      difficulty: 2,
      stem: 'Orina de aspecto normal que, expuesta al sol, se vuelve rojo parduzca. Pensás en:',
      options: [
        { text: 'Porfiria.', why: 'Correcto.' },
        { text: 'Coluria.', why: 'Es pardo desde el inicio (bilirrubina).' },
        { text: 'Hematuria.', why: 'Sería roja desde el inicio.' },
        { text: 'Infección urinaria.', why: 'Da turbidez y olor.' },
      ],
      answer: 0,
      refs: [E('03:33'), E('04:19')],
    },
    {
      id: 'ren02-q07',
      topic: 'Palpación',
      difficulty: 1,
      emphasis: true,
      stem: 'La maniobra de **Montenegro** es igual a la de Guyon pero con el paciente en:',
      options: [
        { text: 'Decúbito ventral.', why: 'Correcto.' },
        { text: 'Decúbito lateral.', why: 'Esa es Israel.' },
        { text: 'De pie.', why: 'No.' },
        { text: 'Sentado.', why: 'No.' },
      ],
      answer: 0,
      refs: [E('29:11')],
    },
    {
      id: 'ren02-q08',
      topic: 'Palpación',
      difficulty: 2,
      stem: 'En la maniobra de Guyon, la mano posterior se apoya en:',
      options: [
        { text: 'El ángulo costomuscular.', why: 'Correcto: entre la 12.ª costilla y la masa lumbar.' },
        { text: 'La fosa ilíaca.', why: 'Ahí arranca la mano anterior.' },
        { text: 'El ombligo.', why: 'No.' },
        { text: 'El reborde costal anterior.', why: 'No.' },
      ],
      answer: 0,
      refs: [L('p459'), A('3:03:13')],
    },
    {
      id: 'ren02-q09',
      topic: 'Palpación',
      difficulty: 2,
      stem: 'La maniobra de Glenard sirve para diagnosticar:',
      options: [
        { text: 'La ptosis renal.', why: 'Correcto.' },
        { text: 'La pielonefritis.', why: 'Se sospecha con la puñopercusión.' },
        { text: 'La estenosis de la arteria renal.', why: 'Se ausculta un soplo.' },
        { text: 'El globo vesical.', why: 'Se percute el hipogastrio.' },
      ],
      answer: 0,
      refs: [L('p460')],
    },
    {
      id: 'ren02-q10',
      topic: 'Percusión',
      difficulty: 1,
      stem: 'La puñopercusión lumbar con el **borde cubital** de la mano se llama de:',
      options: [
        { text: 'Giordano.', why: 'Correcto. Con el puño: Murphy.' },
        { text: 'Murphy.', why: 'Es con el puño cerrado.' },
        { text: 'Guyon.', why: 'Es de palpación.' },
        { text: 'Israel.', why: 'Es de palpación.' },
      ],
      answer: 0,
      refs: [L('p460')],
    },
    {
      id: 'ren02-q11',
      topic: 'Auscultación',
      difficulty: 2,
      stem: 'Un soplo periumbilical en un paciente con HTA que no baja con 4 antihipertensivos sugiere:',
      options: [
        { text: 'Estenosis de la arteria renal.', why: 'Correcto.' },
        { text: 'Pielonefritis.', why: 'No da soplo.' },
        { text: 'Litiasis.', why: 'No.' },
        { text: 'Ptosis renal.', why: 'No.' },
      ],
      answer: 0,
      refs: [E('31:53'), L('p460')],
    },
  ],

  memory: [
    {
      id: 'ren02-m01',
      title: 'Proteinuria en números',
      purpose: '«El problema es el glomérulo».',
      evaluates: [{ t: 'list', items: ['< 150 mg normal', '30–300 microalbuminuria', '> 300 proteinuria', '> 3,5 g nefrótico'] }],
      interpret: 'Leve hasta 1 g, moderada hasta 3,5 g.',
      mnemonic: { hook: '150 – 300 – 1 – 3,5', explain: 'Normal, proteinuria, leve/moderada, rango nefrótico (en 24 horas).' },
      recall: { q: '¿Cómo se clasifica la proteinuria por cantidad?', a: 'Normal < 150 mg/24 h; microalbuminuria 30–300 mg; proteinuria > 300 mg: leve hasta 1 g, moderada 1–3,5 g, rango nefrótico > 3,5 g.' },
    },
    {
      id: 'ren02-m02',
      title: 'Las maniobras renales',
      purpose: 'Guyon «siempre la preguntan».',
      evaluates: [{ t: 'list', items: ['Guyon: dorsal, peloteo', 'Montenegro: ventral, choque', 'Israel: lateral', 'Glenard: ptosis'] }],
      interpret: 'Normal: el riñón no se palpa.',
      mnemonic: { hook: 'Guyon boca arriba, Montenegro boca abajo, Israel de costado, Glenard pinza.', explain: 'La posición define la maniobra.' },
      recall: { q: '¿En qué posición se hacen Guyon, Montenegro e Israel?', a: 'Guyon en decúbito dorsal, Montenegro en decúbito ventral, Israel en decúbito lateral contrario al riñón explorado.' },
    },
    {
      id: 'ren02-m03',
      title: 'Puñopercusión',
      purpose: 'Percusión renal.',
      evaluates: [{ t: 'list', items: ['Murphy: puño', 'Giordano: borde cubital', 'Positiva: pielonefritis, litiasis, tumor'] }],
      interpret: 'Normal: indolora.',
      mnemonic: { hook: 'Murphy = Mano cerrada (puño). Giordano = Golpe de canto.', explain: 'Puño vs borde cubital.' },
      recall: { q: '¿Qué indica una puñopercusión lumbar positiva?', a: 'Distensión o inflamación de la cápsula renal: pielonefritis, litiasis (cólico renoureteral) o tumor.' },
    },
  ],

  maneuvers: {
    ids: ['rinon-guyon', 'punopercusion-lumbar', 'rinon-montenegro', 'rinon-israel', 'rinon-glenard', 'puntos-renoureterales'],
    note: 'Guyon y la puñopercusión tienen el fragmento exacto del video de Argente. Todas están en **Examen físico › Renal**.',
  },

  closing: {
    map: {
      center: 'Examen nefrourológico en una mirada',
      nodes: [
        { label: 'Proteinuria ★', tone: 'gold', items: ['150 · 300 · 3,5 g', 'Tiras · 24 h · electroforesis', 'Glomerular · tubular · sobrecarga'] },
        { label: 'Orina', tone: 'red', items: ['Rojo: hematuria', 'Pardo: coluria', 'Al sol: porfiria'] },
        { label: 'General', tone: 'sky', items: ['Edema', 'Piel de la IRC', 'TA'] },
        { label: 'Región renal ★', tone: 'lilac', items: ['Guyon', 'Puñopercusión', 'Puntos ureterales'] },
      ],
    },
    essentials: [
      '**Proteinuria = glomérulo.** Normal < 150 mg/24 h; microalbuminuria 30–300; > 300 proteinuria; **> 3,5 g rango nefrótico**.',
      'Métodos: **tiras** (semicuantitativo), **24 horas** (cuantitativo, el más fidedigno), **electroforesis** (cualitativo; Bence Jones).',
      'Glomerular selectiva (albúmina > 80 %), tubular (proximal, Fanconi), sobrecarga (mieloma).',
      'Orina: rojo = hematuria; pardo = coluria; normal que vira al sol = porfiria; espuma = proteinuria.',
      'Edema leve periorbitario = nefrítico; mayor, con fóvea, declive = nefrótico.',
      '**Guyon** (dorsal, peloteo) · Montenegro (ventral) · Israel (lateral) · Glenard (ptosis).',
      'Puñopercusión: Murphy (puño), Giordano (borde cubital). Soplo + HTA refractaria = estenosis de la arteria renal.',
    ],
    links: [
      { chapterId: 'ren-01', text: '[[ren-01|Motivos de consulta]]: hematuria, espuma y obstrucción.' },
      { chapterId: 'ren-04', text: '[[ren-04|Síndrome nefrótico]]: la proteinuria > 3,5 g.' },
      { chapterId: 'ren-06', text: '[[ren-06|Infección urinaria]]: la puñopercusión de la pielonefritis.' },
    ],
    pitfalls: [
      'Confundir Montenegro (ventral) con Israel (lateral).',
      'Pedir tiras para buscar Bence Jones (no la detectan).',
      'Creer que el riñón normal se palpa siempre.',
      'Confundir la coluria (pardo desde el inicio) con la porfiria (vira al sol).',
    ],
    miniExam: [
      {
        id: 'ren02-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Mujer con fiebre, escalofríos y disuria; la puñopercusión lumbar derecha es muy dolorosa. Pensás en:',
        options: [
          { text: 'Pielonefritis aguda derecha.', why: 'Correcto.' },
          { text: 'Cistitis simple.', why: 'No da puñopercusión positiva ni fiebre alta.' },
          { text: 'Ptosis renal.', why: 'No.' },
          { text: 'Síndrome nefrótico.', why: 'No.' },
        ],
        answer: 0,
        refs: [E('30:33'), L('p460')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
