import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';
import { clase } from './clase';

/*
 * dig-10 — Peritonitis. Fuente: clases Peritonitis 1 y 2 (Ortega) + libro p. 383.
 * Preguntero: «Peritonitis, hemorragias digestivas y vesiculares», P1–P3.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const P1 = (t: string) => r('perit-1', t);
const P2 = (t: string) => r('perit-2', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-10',
  systemId: 'digestivo',
  title: 'Peritonitis',
  subtitle: 'Plastrón y peritonitis generalizada; primaria (PBE), secundaria y terciaria; cómo se reconoce y se confirma.',
  estimatedMinutes: 30,
  sources: [P1('00:02–24:27'), P2('00:00–05:51'), L('383')],

  map: {
    center: 'Peritonitis',
    why: '«La peritonitis es **muy preguntada**: en el parcial, en los orales y en el final.» Lo que pide **sí o sí**: el **plastrón** y las **tres** peritonitis (primaria, secundaria, terciaria).',
    prereqs: [
      { label: 'Abdomen agudo (dig-02)', detail: 'El perforativo es la peritonitis secundaria.', chapterId: 'dig-02' },
      { label: 'Ascitis (dig-05)', detail: 'Sin ascitis no hay peritonitis bacteriana espontánea.', chapterId: 'dig-05' },
    ],
    branches: [
      { id: 'extension', label: 'Extensión', tone: 'peach', items: ['Plastrón (localizada) ★', 'Generalizada', 'Blumberg vs Gueneau'] },
      { id: 'tipos', label: 'Las tres ★', tone: 'red', items: ['Primaria: PBE', 'Secundaria: perforación', 'Terciaria: iatrogénica'] },
      { id: 'pbe', label: 'PBE', tone: 'sky', items: ['Cirrosis + ascitis', 'Traslocación', '> 250 PMN'] },
      { id: 'clinica', label: 'Clínica y estudios', tone: 'lilac', items: ['Globoso vs tabla', 'Jobert · Popper', 'Paracentesis'] },
    ],
    outcomes: [
      'Definir **peritonitis** y **plastrón**.',
      'Hacer el **cuadro** de peritonitis primaria, secundaria y terciaria.',
      'Explicar la **traslocación bacteriana** y el criterio de **250 neutrófilos**.',
      'Diferenciar en el examen una **PBE** de una **perforación**.',
    ],
  },

  theory: [
    {
      id: 'extension',
      kicker: 'Definición',
      title: 'Qué es, plastrón y peritonitis generalizada',
      priority: 'imprescindible',
      summary: 'Inflamación de la serosa peritoneal, casi siempre por infección. Localizada = plastrón.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Plastrón: pregunta de parcial', text: 'El **plastrón** es una **peritonitis localizada en contacto con la pared anterior del abdomen**. «Es pregunta de parcial, siempre suelen poner algún caso clínico donde habla sobre el plastrón.»', refs: [P1('00:44'), P1('02:13')] },
        { t: 'anim', id: 'extension' },
        {
          t: 'flow',
          root: {
            label: '**Peritonitis**',
            tone: 'red',
            children: [
              { label: 'Por localización', tone: 'peach', children: [{ label: 'Generalizada', tone: 'red' }, { label: 'Localizada = **plastrón**', tone: 'peach', star: true }] },
              {
                label: 'Por etiología',
                tone: 'lilac',
                children: [
                  { label: 'Aséptica', tone: 'mint', note: 'Sin gérmenes: irritación química (bilis, jugo pancreático, sangre)' },
                  { label: 'Séptica', tone: 'red', star: true, note: 'Primaria · secundaria · terciaria' },
                ],
              },
            ],
          },
        },
      ],
      refs: [P1('00:02'), P1('02:58'), P1('03:45'), L('383')],
    },
    {
      id: 'tipos',
      kicker: 'Clasificación',
      title: 'Primaria, secundaria y terciaria',
      priority: 'imprescindible',
      summary: '«El plastrón y estos tres, sí o sí me tienen que saber.»',
      blocks: [
        { t: 'callout', kind: 'prof', text: '«Lo que le van a preguntar a ustedes es **plastrón** y obviamente **estos tres**: sí o sí me tienen que saber la primaria, secundaria y terciaria.»', refs: [P1('06:05')] },
        {
          t: 'cuadro',
          title: 'El cuadro (tapalo y reconstruilo)',
          cols: [
            { t: 'Primaria (PBE)', tone: 'sky' },
            { t: 'Secundaria', tone: 'red' },
            { t: 'Terciaria', tone: 'lilac' },
          ],
          rows: [
            { k: 'Causa', v: ['**Sin perforación**: traslocación bacteriana', '**Perforación de víscera hueca** o infección de un órgano (apendicitis, colecistitis)', '**Iatrogénica**: cirugía, trauma abierto'] },
            { k: 'Paciente', v: ['**Cirrótico** con ascitis (80–90 %); síndrome nefrótico', 'Abdomen agudo perforativo', 'Posquirúrgico'] },
            { k: 'Gérmenes', v: ['**Monomicrobiana** (E. coli)', '**Polimicrobiana**', 'Desde el exterior'] },
            { k: 'Frecuencia', v: ['—', '**La más frecuente**', '—'] },
            { k: 'Tratamiento', v: ['**Médico**: cefalosporinas 3.ª–4.ª', '**Quirúrgico**', 'Quirúrgico'] },
          ],
          refs: [P1('04:38'), P1('06:49'), P1('12:48'), P1('15:43'), P1('16:23'), L('383')],
        },
        { t: 'anim', id: 'pbe' },
      ],
      refs: [P1('06:05'), P1('15:43'), L('383')],
    },
    {
      id: 'clinica',
      kicker: 'Clínica y examen',
      title: 'Cómo se ve: PBE vs perforación',
      priority: 'imprescindible',
      summary: 'Secundaria = abdomen agudo perforativo. PBE = ascitis infectada, dolor menor.',
      blocks: [
        {
          t: 'cuadro',
          title: 'Al examen',
          cols: [
            { t: 'PBE (primaria)', tone: 'sky' },
            { t: 'Secundaria (perforación)', tone: 'red' },
          ],
          rows: [
            { k: 'Dolor', v: ['Menos intenso; puede no haber dolor brusco', '**Brusco**, intenso, no calma'] },
            { k: 'Inspección', v: ['Abdomen **globoso** (ascitis)', 'Abdomen **en tabla**, no se mueve con la respiración'] },
            { k: 'Auscultación', v: ['RHA arriba de la ascitis; ausentes abajo', 'RHA **ausentes** (íleo paralítico)'] },
            { k: 'Percusión', v: ['**Matidez** (líquido)', 'Timpanismo; **Jobert**'] },
            { k: 'Palpación', v: ['Dolor a la compresión y descompresión', 'Defensa, **contractura**; Blumberg (plastrón) o Gueneau de Mussy'] },
            { k: 'Acompaña', v: ['Fiebre variable; vómitos raros', 'Fiebre (80 %), náuseas y vómitos, deshidratación'] },
          ],
          refs: [P1('17:52'), P1('19:23'), P1('20:06'), P1('21:32'), P1('22:15'), P1('22:56')],
        },
        { t: 'callout', kind: 'clinic', title: 'Facies', text: 'Pálida, dolorosa, con **ojos hundidos** (deshidratación), taquicárdico e hipotenso. El paciente flexiona las piernas para no estirar el peritoneo.', refs: [P1('20:48'), L('383')] },
      ],
      refs: [P1('17:09'), L('383')],
    },
    {
      id: 'estudios',
      kicker: 'Complementarios',
      title: 'Laboratorio, imágenes y paracentesis',
      priority: 'imprescindible',
      summary: 'Más de 250 neutrófilos por mm³ en el líquido ascítico = diagnóstico de certeza de PBE.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Como el Padre Nuestro', text: '«Tienen que sabérsela como si fuese el Padre Nuestro a lo que es la paracentesis.» La **paracentesis** es **diagnóstica y terapéutica**. **Más de 250 neutrófilos por mm³** en el líquido ascítico (neutroascitis) = **diagnóstico de certeza de PBE**: «se lo pueden preguntar en el oral o en el choice».', refs: [P2('03:42'), P2('04:25'), P2('05:09')] },
        {
          t: 'timeline',
          title: 'Qué pedir',
          items: [
            { k: 'Laboratorio', t: 'Infección', d: 'Leucocitosis > 15.000 con desviación a la izquierda, ↑ PCR y VSG; acidosis metabólica; función renal; amilasa.', tone: 'sky' },
            { k: 'Rx tórax y abdomen', t: 'Neumoperitoneo', d: '**Popper** (aire subdiafragmático) si hay perforación.', tone: 'lilac' },
            { k: 'Ecografía', t: 'La más usada', d: 'Líquido libre y el órgano que se perforó (apéndice, vesícula, estómago).', tone: 'mint' },
            { k: 'Paracentesis', t: '> 250 PMN/mm³', d: 'Certeza de PBE.', tone: 'gold' },
          ],
        },
        { t: 'callout', kind: 'note', title: 'Para saber que existe', text: 'Los **criterios de Alvarado** (apendicitis) suman 10 puntos: hasta 4 se va a la casa, 5–6 observación, 7 o más cirugía. El profe aclara que no hace falta saber el nombre.', refs: [P2('05:09'), P2('05:51')] },
      ],
      refs: [P2('00:00'), P2('00:42'), P2('02:08'), P2('02:55')],
    },
  ],

  developments: [
    {
      id: 'dig10-d01',
      origen: 'preguntero',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'tipos',
      question: '¿Qué es la peritonitis? Cuadro de diferenciación de peritonitis primaria, secundaria y terciaria.',
      quote: { text: '«…plastrón y obviamente estos tres el sí o sí me tienen que saber: la primaria, secundaria, terciaria»', refs: [P1('06:05')] },
      answer: [
        { t: 'p', text: 'Inflamación de la serosa peritoneal, casi siempre infecciosa. Puede ser **generalizada** o **localizada (plastrón**: en contacto con la pared anterior del abdomen).' },
        {
          t: 'table',
          head: ['', 'Primaria (PBE)', 'Secundaria', 'Terciaria'],
          rows: [
            ['Causa', 'Traslocación bacteriana, sin perforación', 'Perforación de víscera hueca', 'Iatrogénica / trauma'],
            ['Contexto', 'Cirrosis con ascitis, nefrótico', 'La más frecuente', 'Posquirúrgica'],
            ['Gérmenes', 'Monomicrobiana (E. coli)', 'Polimicrobiana', 'Exterior'],
            ['Tratamiento', 'Médico (cefalosporinas)', 'Quirúrgico', 'Quirúrgico'],
          ],
        },
      ],
      refs: [P1('00:44'), P1('04:38'), P1('12:48'), P1('16:23'), L('383')],
    },
    {
      id: 'dig10-d02',
      origen: 'clase',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'estudios',
      question: '¿Cómo se diagnostica la peritonitis bacteriana espontánea?',
      quote: { text: '«…tienen que sabérsela como si fuese el Padre Nuestro a lo que es la paracentesis»', refs: [P2('03:42')] },
      answer: [{ t: 'p', text: 'Paciente cirrótico con ascitis, fiebre y dolor abdominal: **paracentesis** (diagnóstica y terapéutica). **Más de 250 neutrófilos por mm³** en el líquido ascítico = diagnóstico de certeza. Se trata con cefalosporinas de 3.ª–4.ª generación, sin cirugía.' }],
      refs: [P2('03:42'), P2('04:25'), P1('12:48')],
    },
    {
      id: 'dig10-d03',
      origen: 'preguntero',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'extension',
      question: '¿Qué es el signo de Blumberg y el de Gueneau de Mussy?',
      quote: { text: '«…puede ser localizada como un plastrón y ser signo de Blumberg o puede ser generalizada»', refs: [P1('23:39')] },
      answer: [{ t: 'p', text: 'Ambos son **dolor a la descompresión** (irritación del peritoneo parietal): **Blumberg** = localizado (plastrón, FID en la apendicitis); **Gueneau de Mussy** = generalizado (peritonitis difusa). No confundir contractura (involuntaria, tabla) con defensa (voluntaria).' }],
      refs: [P1('23:39'), P1('22:56')],
    },
  ],

  mcq: [
    {
      id: 'dig10-q01',
      origen: 'practica',
      topic: 'Plastrón',
      difficulty: 1,
      emphasis: true,
      stem: 'El **plastrón** es:',
      options: [
        { text: 'Una peritonitis localizada en contacto con la pared anterior del abdomen.', why: 'Correcto.' },
        { text: 'Una peritonitis generalizada.', why: 'No.' },
        { text: 'La ascitis infectada.', why: 'Eso es la PBE.' },
        { text: 'Un tipo de hernia.', why: 'No.' },
      ],
      answer: 0,
      refs: [P1('00:44'), L('383')],
    },
    {
      id: 'dig10-q02',
      origen: 'practica',
      topic: 'Tipos',
      difficulty: 1,
      emphasis: true,
      stem: 'La peritonitis **más frecuente** es:',
      options: [
        { text: 'Primaria.', why: 'No.' },
        { text: 'Secundaria (perforación de víscera hueca).', why: 'Correcto.' },
        { text: 'Terciaria.', why: 'No.' },
        { text: 'Aséptica.', why: 'No.' },
      ],
      answer: 1,
      refs: [P1('15:43'), L('383')],
    },
    {
      id: 'dig10-q03',
      origen: 'practica',
      topic: 'PBE',
      difficulty: 2,
      emphasis: true,
      stem: 'La peritonitis bacteriana espontánea se produce por:',
      options: [
        { text: 'Perforación de una víscera hueca.', why: 'Esa es la secundaria.' },
        { text: 'Traslocación bacteriana desde el intestino hacia la ascitis.', why: 'Correcto.' },
        { text: 'Contaminación quirúrgica.', why: 'Esa es la terciaria.' },
        { text: 'Una pancreatitis.', why: 'No es el mecanismo.' },
      ],
      answer: 1,
      refs: [P1('10:37'), P1('11:20')],
    },
    {
      id: 'dig10-q04',
      origen: 'practica',
      topic: 'PBE',
      difficulty: 2,
      stem: 'La PBE es típicamente:',
      options: [
        { text: 'Monomicrobiana (E. coli) y de tratamiento médico.', why: 'Correcto.' },
        { text: 'Polimicrobiana y quirúrgica.', why: 'Esa es la secundaria.' },
        { text: 'Viral.', why: 'No.' },
        { text: 'Aséptica.', why: 'No.' },
      ],
      answer: 0,
      refs: [P1('12:06'), P1('12:48')],
    },
    {
      id: 'dig10-q05',
      origen: 'practica',
      topic: 'PBE',
      difficulty: 2,
      emphasis: true,
      stem: 'El diagnóstico de certeza de PBE es un líquido ascítico con:',
      options: [
        { text: '> 250 neutrófilos por mm³.', why: 'Correcto.' },
        { text: '> 25 leucocitos por mm³.', why: 'No es el corte.' },
        { text: 'GASA > 1,1.', why: 'Indica hipertensión portal, no infección.' },
        { text: 'Proteínas > 3 g/dl.', why: 'No es el criterio.' },
      ],
      answer: 0,
      refs: [P2('04:25')],
    },
    {
      id: 'dig10-q06',
      origen: 'practica',
      topic: 'PBE',
      difficulty: 1,
      stem: 'La causa más frecuente de PBE es:',
      options: [
        { text: 'Cirrosis con ascitis.', why: 'Correcto (80–90 %).' },
        { text: 'Apendicitis.', why: 'Da secundaria.' },
        { text: 'Úlcera perforada.', why: 'Da secundaria.' },
        { text: 'Cirugía abdominal.', why: 'Da terciaria.' },
      ],
      answer: 0,
      refs: [P1('14:16')],
    },
    {
      id: 'dig10-q07',
      origen: 'practica',
      topic: 'Clínica',
      difficulty: 2,
      stem: 'Abdomen en tabla, timpanismo en el área hepática y RHA ausentes. ¿Qué peritonitis?',
      options: [
        { text: 'Secundaria por perforación.', why: 'Correcto: Jobert + tabla + íleo paralítico.' },
        { text: 'PBE.', why: 'Daría abdomen globoso con matidez.' },
        { text: 'Aséptica.', why: 'No.' },
        { text: 'Plastrón.', why: 'Sería localizado.' },
      ],
      answer: 0,
      refs: [P1('22:15'), P1('22:56')],
    },
    {
      id: 'dig10-q08',
      origen: 'practica',
      topic: 'Signos',
      difficulty: 1,
      stem: 'Dolor a la descompresión **generalizado**:',
      options: [
        { text: 'Gueneau de Mussy.', why: 'Correcto.' },
        { text: 'Blumberg.', why: 'Es localizado.' },
        { text: 'Murphy.', why: 'No.' },
        { text: 'Jobert.', why: 'Es timpanismo hepático.' },
      ],
      answer: 0,
      refs: [P1('23:39')],
    },
    {
      id: 'dig10-q09',
      origen: 'practica',
      topic: 'Tratamiento',
      difficulty: 2,
      stem: 'El tratamiento de la peritonitis **secundaria** es:',
      options: [
        { text: 'Quirúrgico.', why: 'Correcto.' },
        { text: 'Solo antibióticos.', why: 'Eso es la PBE.' },
        { text: 'Paracentesis evacuadora.', why: 'No.' },
        { text: 'Dieta.', why: 'No.' },
      ],
      answer: 0,
      refs: [P1('16:23')],
    },
  ],

  memory: [
    {
      id: 'dig10-m01',
      title: 'Las tres peritonitis',
      purpose: 'Sí o sí.',
      evaluates: [{ t: 'list', items: ['Primaria: PBE, cirrosis, mono, médica', 'Secundaria: perforación, poli, quirúrgica, la más frecuente', 'Terciaria: iatrogénica'] }],
      interpret: 'Cuántos gérmenes y si se opera.',
      mnemonic: { hook: '1-2-3: «Uno solo (mono), Dos o más (poli), Tres = el cirujano».', explain: 'Primaria monomicrobiana; secundaria polimicrobiana; terciaria iatrogénica.' },
      recall: { q: '¿Qué diferencia a la peritonitis primaria de la secundaria?', a: 'Primaria: sin perforación, traslocación, monomicrobiana, tratamiento médico. Secundaria: perforación, polimicrobiana, la más frecuente, quirúrgica.' },
    },
    {
      id: 'dig10-m02',
      title: 'PBE: el número',
      purpose: 'Oral y choice.',
      evaluates: [{ t: 'list', items: ['Paracentesis', '> 250 neutrófilos/mm³'] }],
      interpret: 'Certeza de PBE.',
      mnemonic: { hook: '«250 soldados en el líquido = infección».', explain: 'Más de 250 PMN por mm³.' },
      recall: { q: '¿Cuál es el criterio diagnóstico de PBE?', a: 'Más de 250 neutrófilos por mm³ en el líquido ascítico obtenido por paracentesis.' },
    },
    {
      id: 'dig10-m03',
      title: 'Plastrón',
      purpose: 'Caso clínico de parcial.',
      evaluates: [{ t: 'list', items: ['Peritonitis localizada', 'En contacto con la pared anterior', 'Blumberg'] }],
      interpret: 'El proceso queda encapsulado.',
      mnemonic: { hook: 'PLASTRÓN = parche pegado a la pared.', explain: 'Localizado, contra la pared anterior.' },
      recall: { q: '¿Qué es un plastrón?', a: 'Una peritonitis localizada en contacto con la pared anterior del abdomen.' },
    },
  ],

  maneuvers: {
    ids: ['descompresion-blumberg', 'palpacion-superficial-tension', 'abd-auscultacion-rha', 'ascitis-maniobras'],
    note: 'Dolor a la descompresión, contractura, silencio abdominal y ascitis.',
  },

  closing: {
    map: {
      center: 'Peritonitis en una mirada',
      nodes: [
        { label: 'Extensión', tone: 'peach', items: ['Plastrón ★', 'Generalizada', 'Blumberg / Gueneau'] },
        { label: 'Las tres ★', tone: 'red', items: ['Primaria: PBE', 'Secundaria: la más frecuente', 'Terciaria: iatrogénica'] },
        { label: 'PBE', tone: 'sky', items: ['Cirrosis + ascitis', 'Traslocación · E. coli', 'Cefalosporinas'] },
        { label: 'Estudios', tone: 'lilac', items: ['Leucocitosis', 'Popper · eco', '> 250 PMN'] },
      ],
    },
    essentials: [
      '**Peritonitis**: inflamación de la serosa peritoneal; **plastrón** = localizada contra la pared anterior.',
      '**Primaria (PBE)**: cirrosis con ascitis, traslocación, monomicrobiana (E. coli), tratamiento médico.',
      '**Secundaria**: perforación de víscera hueca, la más frecuente, polimicrobiana, quirúrgica. **Terciaria**: iatrogénica.',
      'Examen: PBE = abdomen globoso con matidez; perforación = tabla, Jobert, RHA ausentes.',
      '**Paracentesis**: > 250 neutrófilos/mm³ = certeza de PBE.',
    ],
    links: [
      { chapterId: 'dig-02', text: '[[dig-02|Abdomen agudo]]: perforativo, Jobert y Popper.' },
      { chapterId: 'dig-13', text: '[[dig-13|Cirrosis e hipertensión portal]]: ascitis, GASA y PBE.' },
      { chapterId: 'dig-08', text: '[[dig-08|Íleo]]: el íleo paralítico de la peritonitis.' },
    ],
    pitfalls: [
      'Operar una PBE: es de tratamiento **médico**.',
      'Decir que la PBE es polimicrobiana.',
      'Confundir el criterio de 250 neutrófilos con el GASA.',
      'Llamar Blumberg al dolor generalizado.',
    ],
    miniExam: [
      {
        id: 'dig10-x01',
        origen: 'practica',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Cirrótico alcohólico con ascitis, fiebre y dolor abdominal leve. Paracentesis: 600 neutrófilos/mm³. Conducta:',
        options: [
          { text: 'Antibióticos (cefalosporinas de 3.ª generación), sin cirugía.', why: 'Correcto: PBE.' },
          { text: 'Laparotomía de urgencia.', why: 'No es secundaria.' },
          { text: 'Solo diuréticos.', why: 'Hay infección.' },
          { text: 'Esperar el cultivo sin tratar.', why: 'Es una urgencia médica.' },
        ],
        answer: 0,
        refs: [P1('12:48'), P2('04:25')],
      },
    ],
  },

  escenas,
  clase,
  diagrams: {},
};

export default chapter;
