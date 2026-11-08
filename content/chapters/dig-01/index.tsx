import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';
import video from './video.json';

/*
 * dig-01 · Vómitos, disfagia y dispepsia.
 * Prioridad = lo que dice el profe (transcripciones) + preguntas de examen bien remarcadas;
 * del libro SOLO la fisiopatología (para defender el «por qué»); sin relleno.
 * Estructura por pasos (modelo farmaco-flor): Sabete esto · Teoría · Video · Cuadros · Choice · Desarrollo · Repaso.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M1 = (t: string) => r('mc-dig-1', t);
const M2 = (t: string) => r('mc-dig-2', t);
const HD = (t: string) => r('hd-1', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-01',
  systemId: 'digestivo',
  title: 'Vómitos, disfagia y dispepsia',
  subtitle: 'Lo que pregunta el profe en los motivos de consulta del tubo digestivo alto, con el porqué para defenderlo.',
  estimatedMinutes: 45,
  sources: [M1('00:00–35:13'), M2('00:00–32:03'), HD('07:33–17:10'), L('75, 368–369, 375–377, 389–390')],

  /* ───────── Sabete esto ───────── */
  esencial: {
    objetivo: 'Digestivo es **una de las unidades más preguntadas** en parciales y finales. De este tema se toman sobre todo **los tipos de vómito**, **el cuadro hematemesis vs hemoptisis**, **la tríada de Mallory-Weiss** y **la acalasia**.',
    avisos: [
      { text: 'En la grabación se escucha «la hematemesis tiene pH alcalino», pero el cuadro del libro del profe (p. 75) dice que la **alcalina es la hemoptisis**. Respondé con el libro.', refs: [HD('08:00'), L('75')] },
    ],
    bloques: [
      {
        titulo: 'Hematemesis vs hemoptisis',
        tono: 'rose',
        prio: 'P0',
        puntos: [
          { k: 'Sale con', v: 'el **vómito** (náuseas) · la **tos**' },
          { k: 'Aspecto', v: '**borra de café** · **roja rutilante, espumosa**' },
          { k: 'Reacción', v: '**ácida** · **alcalina**' },
          { k: 'Después', v: '**melena** · sin melena' },
        ],
      },
      {
        titulo: 'Vómito',
        tono: 'sky',
        prio: 'P1',
        puntos: [
          { k: 'Qué es', v: 'Expulsión **violenta** por la boca del contenido gastroduodenal. Sin esfuerzo = **regurgitación**' },
          { k: 'Contenido', v: 'Alimenticio → **esófago** · ácido → **estómago** · bilioso → **duodeno** · hemático · fecaloide → **obstrucción baja**' },
          { k: 'Horario', v: 'Matinal: **embarazo, alcohol, HTE** · varias horas: **píloro** · en chorro sin náuseas: **HTE**' },
        ],
      },
      {
        titulo: 'Complicaciones del vómito',
        tono: 'peach',
        prio: 'P1',
        puntos: [
          { k: 'Se pierden HCl, agua y K⁺', v: '**Alcalosis metabólica**, **hipopotasemia**, **deshidratación**' },
          { k: 'Aspiración', v: 'Neumonitis química → **neumonía aspirativa**' },
          { k: 'Tríada de Mallory-Weiss', v: '**Alcoholismo → vómitos → hematemesis** (desgarro de la mucosa)' },
          { k: 'Boerhaave', v: 'Rotura de **todo el espesor**: emergencia' },
        ],
      },
      {
        titulo: 'Disfagia',
        tono: 'lilac',
        prio: 'P0',
        puntos: [
          { k: 'Acalasia', v: '**Sólidos y líquidos, lenta y progresiva, regurgitación** · pico de pájaro' },
          { k: 'Alta vs baja', v: 'Transferencia (tos, ahogo, nariz) · transporte (retroesternal)' },
          { k: 'Muro vs motor', v: 'Mecánica: **solo sólidos** · motora: **sólidos y líquidos**' },
        ],
      },
      {
        titulo: 'Dispepsia',
        tono: 'mint',
        prio: 'P2',
        puntos: [
          { k: 'Roma', v: 'Plenitud · saciedad precoz · dolor · ardor epigástrico (3 meses, inicio ≥ 6)' },
          { k: 'Regla del profe', v: 'Las **2 D y la P**: dolor, distensión, pirosis' },
          { k: 'Alarma', v: '**VIDA que PESA → VEDA**' },
        ],
      },
    ],
  },

  /* ───────── Teoría paso a paso (mismas escenas que el video) ───────── */
  escenas,

  /* ───────── Cuadros de consulta (tapables para practicar) ───────── */
  cuadros: [
    {
      id: 'hemat-hemop',
      titulo: 'Hematemesis vs hemoptisis',
      prio: 'P0',
      quote: { text: '«…pregunta de parcial… ese cuadrito tienen que sabérselo»', refs: [HD('08:08'), HD('08:24')] },
      head: ['', 'Hematemesis', 'Hemoptisis'],
      rows: [
        ['Sale con', 'El **vómito** (precedida de náuseas)', 'La **tos** (cosquilleo laríngeo)'],
        ['Aspecto', 'Oscura, **borra de café**, coágulos, restos de comida', '**Roja rutilante, espumosa**'],
        ['Reacción', '**Ácida**', '**Alcalina**'],
        ['Después', '**Melena**', 'Esputo hemoptoico, sin melena'],
        ['Antecedentes', 'Digestivos', 'Respiratorios'],
      ],
      porque: 'El ácido del estómago transforma la hemoglobina en **hematina ácida**: por eso es oscura. La sangre de la vía aérea viene mezclada con **aire**: por eso es espumosa. La sangre que pasa al intestino se digiere y sale como **melena** (libro, p. 75).',
      nota: 'En la grabación se escucha «la hematemesis tiene pH alcalino»; el cuadro del libro asigna la reacción **alcalina a la hemoptisis**. Respondé con el libro.',
      refs: [HD('08:08'), L('75')],
    },
    {
      id: 'tipos-vomito',
      titulo: 'Tipos de vómito según el contenido',
      prio: 'P1',
      quote: { text: '«…la clasificación por tipo de vómito les pueden preguntar»', refs: [M2('15:51')] },
      head: ['Tipo', 'Aspecto', 'De dónde viene / pensar en'],
      rows: [
        ['**Alimenticio**', 'Comida casi entera, sin ácido', '**Esófago**'],
        ['**Parcialmente digerido**', 'Ácido, con restos', '**Estómago**: gastroparesia, obstrucción pilórica'],
        ['**Bilioso**', 'Amarillo verdoso, **amargo**', '**Duodeno** (refluye bilis). El síndrome pilórico **no** da biliosos'],
        ['**Hemático**', '**Rojo** = sangrado activo · **borra de café** = sangre digerida', 'Sangrado alto: primero descartar **úlcera**; várices, Mallory-Weiss, cáncer'],
        ['**Fecaloide**', 'Marrón, olor fecal', '**Obstrucción intestinal baja** · fístula gastrocólica'],
      ],
      porque: 'En una obstrucción, el contenido no avanza y refluye desde el nivel obstruido: los vómitos son **alimentarios → biliosos → fecaloides** a medida que el obstáculo está más abajo (libro, p. 377).',
      refs: [M2('15:51'), M2('17:13'), M2('18:33'), L('377')],
    },
    {
      id: 'horario',
      titulo: 'Horario del vómito',
      prio: 'P1',
      head: ['Cuándo', 'Pensar en'],
      rows: [
        ['Matinal, en ayunas', '**Embarazo**, **alcohol** la noche anterior, **hipertensión endocraneana**'],
        ['≈ 1 hora después de comer', 'Estómago'],
        ['Varias horas después', '**Píloro**: alimentos retenidos'],
        ['En chorro, sin náuseas', '**Hipertensión endocraneana** (con cefalea)'],
        ['Calma el dolor al vomitar', 'Úlcera'],
      ],
      porque: 'En el **síndrome pilórico** el estómago no se vacía: el vómito aparece **4 a 6 horas después de comer**, con alimentos retenidos (libro, p. 375).',
      refs: [M2('19:13'), M2('21:54'), M2('22:35'), L('375')],
    },
    {
      id: 'complicaciones',
      titulo: 'Complicaciones del vómito',
      prio: 'P1',
      quote: { text: 'Las complicaciones del vómito se preguntan en la cátedra', refs: [M2('23:15')] },
      head: ['Complicación', 'Por qué'],
      rows: [
        ['**Alcalosis metabólica**', 'Se pierde **ácido clorhídrico**; en el vómito gástrico predomina la pérdida de cloro'],
        ['**Hipopotasemia**', 'Se pierde **potasio**'],
        ['**Deshidratación**', 'Se pierde **agua**: taquicardia, hipotensión'],
        ['**Neumonía aspirativa**', 'Aspira el vómito → **neumonitis química**'],
        ['**Mallory-Weiss**', 'Desgarro de la **mucosa** por el esfuerzo → hematemesis'],
        ['**Boerhaave**', 'Rotura de **todo el espesor** → mediastino · emergencia'],
      ],
      porque: 'Vómitos repetidos → pérdida de agua, cloro (HCl) y potasio → **deshidratación, hipopotasemia y alcalosis**. Si se pierden sobre todo líquidos intestinales (alcalinos), puede haber acidosis (libro, p. 377).',
      refs: [M2('23:15'), M2('23:55'), M2('24:37'), L('377')],
    },
    {
      id: 'mallory',
      titulo: 'Mallory-Weiss vs Boerhaave',
      prio: 'P1',
      quote: { text: '«…hay una tríada característica: hematemesis, vómito y alcoholismo»', refs: [HD('16:48')] },
      head: ['', 'Mallory-Weiss', 'Boerhaave'],
      rows: [
        ['Qué se rompe', 'Desgarro **lineal de la mucosa** de la unión esofagogástrica', 'Rotura de **todo el espesor** del esófago'],
        ['Cómo se presenta', '**Hematemesis** después de vómitos', 'Paso al **mediastino**: emergencia'],
        ['Tríada (y cronología)', '**Alcoholismo → vómitos → hematemesis**', '—'],
      ],
      refs: [HD('16:48'), M2('24:37'), L('390')],
    },
    {
      id: 'disfagia',
      titulo: 'Disfagia: orofaríngea vs esofágica',
      prio: 'P1',
      quote: { text: '«Estas características no pueden olvidarse»', refs: [M1('03:42')] },
      head: ['', 'Orofaríngea', 'Esofágica'],
      rows: [
        ['Otro nombre', 'Alta · **de transferencia**', 'Baja · **de transporte**'],
        ['Qué refiere', 'No puede **iniciar** la deglución; señala la garganta', 'Traga bien y **después** se atasca detrás del esternón'],
        ['Síntomas', '**Tos, ahogo, regurgitación nasal**, disfonía', 'Atascamiento **retroesternal**'],
        ['Más difícil con', '**Líquidos**', 'Depende: mecánica o motora'],
        ['Causa n.º 1', '**ACV** (≈ 75 % neuromusculares)', '**Estenosis péptica** (mecánica)'],
      ],
      refs: [M1('03:00'), M1('03:42'), M1('05:47')],
    },
    {
      id: 'mecanica-motora',
      titulo: 'Disfagia esofágica: mecánica vs motora',
      prio: 'P0',
      quote: { text: 'Acalasia: «…lo que siempre suelen preguntar»', refs: [M1('21:30')] },
      head: ['', 'Mecánica (muro)', 'Motora (motor)'],
      rows: [
        ['Alimentos', '**Solo sólidos**', '**Sólidos y líquidos**'],
        ['Evolución', 'Continua y **progresiva**', '**Intermitente**'],
        ['Causas', 'Estenosis péptica (n.º 1), cáncer', '**Acalasia**, espasmo difuso, esclerodermia'],
        ['Esofagograma', '**Manzana mordida** (cáncer → endoscopía con biopsia)', '**Pico de pájaro** (acalasia; manometría confirma)'],
      ],
      porque: '**Acalasia:** se altera el **plexo mientérico de Auerbach** (idiopática o **Chagas**) → **aperistalsis** y el esfínter esofágico inferior **no se relaja** → el esófago se dilata (dolicomegaesófago): disfagia para sólidos y líquidos, regurgitación, dolor torácico (libro, p. 369).',
      refs: [M1('12:48'), M1('13:28'), M1('21:30'), M1('24:50'), M1('25:31'), L('368'), L('369')],
    },
    {
      id: 'dispepsia',
      titulo: 'Dispepsia',
      prio: 'P2',
      quote: { text: '«Siempre digo las dos D y la P»', refs: [M2('07:34')] },
      head: ['Qué', 'Dato'],
      rows: [
        ['Dónde', '«Boca del estómago»: siempre **del ombligo para arriba**'],
        ['Roma (4 síntomas)', 'Plenitud posprandial · saciedad precoz · dolor epigástrico · ardor epigástrico'],
        ['Tiempo', 'Últimos **3 meses**, con inicio **≥ 6 meses** antes; sin lesión estructural'],
        ['Clínica', 'Las **2 D y la P**: **D**olor · **D**istensión · **P**irosis'],
        ['Tipos', 'Funcional **60 %** · orgánica 40 % (**úlcera péptica** n.º 1)'],
        ['Alarma → VEDA', 'Vómitos persistentes, ictericia, disfagia progresiva, anemia, pérdida de peso, edad > 55, sangrado, AINEs o antecedentes de cáncer'],
        ['Sin alarma (joven)', 'Test no invasivo de *H. pylori*: + → tratar · − → IBP · sin respuesta → VEDA'],
      ],
      nota: 'Mnemotecnia propia para la alarma: **una VIDA que PESA lleva a la VEDA** (Vómitos, Ictericia, Disfagia, Anemia · Pérdida de peso, Edad, Sangrado, AINEs).',
      refs: [M1('27:32'), M1('30:52'), M1('34:10'), M2('07:34'), M2('08:14'), M2('10:54')],
    },
  ],

  /* ───────── Preguntas de examen resueltas (preguntero + lo que el profe dice que toma) ───────── */
  developments: [
    {
      id: 'dig01-d01',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      cuadro: 'hemat-hemop',
      question: '¿Cuál es el diagnóstico diferencial entre hematemesis y hemoptisis?',
      quote: { text: '«…pregunta de parcial… ese cuadrito tienen que sabérselo»', refs: [HD('08:08')] },
      answer: [
        {
          t: 'table',
          head: ['', 'Hematemesis', 'Hemoptisis'],
          rows: [
            ['Sale con', 'El **vómito** (precedida de náuseas)', 'La **tos** (cosquilleo laríngeo)'],
            ['Aspecto', 'Oscura, **borra de café**, coágulos, restos alimentarios', '**Roja rutilante, espumosa**'],
            ['Reacción', 'Ácida', '**Alcalina**'],
            ['Después', '**Melena**', 'Esputo hemoptoico, sin melena'],
            ['Antecedentes', 'Digestivos', 'Respiratorios'],
          ],
        },
        { t: 'p', text: '**Porqué:** el ácido gástrico convierte la hemoglobina en hematina ácida (oscura); la sangre de la vía aérea viene con aire (espuma).' },
      ],
      refs: [HD('08:08'), L('75')],
    },
    {
      id: 'dig01-d02',
      prio: 'P1',
      priority: 'imprescindible',
      cuadro: 'tipos-vomito',
      question: '¿Qué es el vómito? ¿Qué es la náusea? ¿Cómo se clasifican los vómitos?',
      quote: { text: '«…la clasificación… les pueden preguntar»', refs: [M2('15:51')] },
      answer: [
        { t: 'p', text: '**Vómito:** expulsión activa por la boca del contenido gastroduodenal. **Náusea:** deseo de vomitar. No confundir con la **regurgitación** (sin esfuerzo).' },
        { t: 'list', items: ['**Por contenido:** alimenticio (esófago) · parcialmente digerido/ácido (estómago) · bilioso (pancreático, hepático, biliar) · hemático (rojo = activo; borra de café = digerido) · fecaloide (obstrucción baja).', '**Por horario:** matinal en ayunas → embarazo, alcohol, HTE · 1 h después de comer → estómago · varias horas → píloro · nocturno → orgánico.', 'En **chorro sin náuseas** → HTE.'] },
      ],
      refs: [M2('14:31'), M2('15:51'), M2('19:13')],
    },
    {
      id: 'dig01-d03',
      prio: 'P1',
      priority: 'imprescindible',
      cuadro: 'mallory',
      question: '¿Qué es el síndrome de Mallory-Weiss? Mencione su tríada.',
      quote: { text: '«…hay una tríada característica: hematemesis, vómito y alcoholismo»', refs: [HD('16:48')] },
      answer: [
        { t: 'p', text: 'Desgarro **lineal de la mucosa de la unión esofagogástrica** por vómitos o arcadas intensas. **Tríada (y cronología): alcoholismo → vómitos → hematemesis.**' },
        { t: 'p', text: 'No confundir con **Boerhaave**: rotura de **todo el espesor** del esófago, con paso al mediastino.' },
      ],
      refs: [HD('16:48'), M2('24:37'), L('390')],
    },
    {
      id: 'dig01-d04',
      prio: 'P1',
      priority: 'imprescindible',
      cuadro: 'complicaciones',
      question: '¿Cuáles son las complicaciones del vómito y por qué se producen?',
      quote: { text: 'Complicaciones del vómito: se preguntan en la cátedra', refs: [M2('23:15')] },
      answer: [
        { t: 'list', items: ['**Hipopotasemia y alcalosis metabólica:** se pierden potasio y ácido clorhídrico (predomina la pérdida de cloro).', '**Deshidratación:** taquicardia, hipotensión.', '**Neumonitis química → neumonía aspirativa** si aspira el vómito.', '**Mallory-Weiss** (desgarro mucoso, hematemesis) y **Boerhaave** (rotura transmural).'] },
      ],
      refs: [M2('23:15'), L('377')],
    },
    {
      id: 'dig01-d05',
      prio: 'P0',
      priority: 'imprescindible',
      emphasis: true,
      cuadro: 'mecanica-motora',
      question: 'Disfagia intermitente y lentamente progresiva para sólidos y líquidos, con regurgitación: ¿qué sospecha y por qué?',
      quote: { text: '«…lo que siempre suelen preguntar»', refs: [M1('21:30')] },
      answer: [
        { t: 'p', text: '**Acalasia** (disfagia esofágica **motora**). Sólidos y líquidos porque falla el peristaltismo, no hay un obstáculo.' },
        { t: 'p', text: '**Porqué:** alteración del plexo de Auerbach (idiopática o Chagas) → aperistalsis y EEI que no se relaja → dolicomegaesófago. **Esofagograma:** pico de pájaro; **manometría** confirma.' },
      ],
      refs: [M1('21:30'), M1('24:50'), L('369')],
    },
    {
      id: 'dig01-d06',
      prio: 'P1',
      priority: 'muy-importante',
      cuadro: 'disfagia',
      question: 'Diferencie disfagia orofaríngea de esofágica.',
      quote: { text: '“Estas características no pueden olvidarse”', refs: [M1('03:42')] },
      answer: [
        { t: 'p', text: '**Orofaríngea (alta, de transferencia):** no puede iniciar la deglución, señala la garganta, regurgita por boca o nariz, tos y ahogo; más con líquidos; ACV n.º 1.' },
        { t: 'p', text: '**Esofágica (baja, de transporte):** traga y luego se traba detrás del esternón. **Mecánica:** solo sólidos, progresiva (estenosis péptica n.º 1). **Motora:** sólidos y líquidos, intermitente.' },
      ],
      refs: [M1('03:00'), M1('03:42'), M1('10:06'), M1('12:48')],
    },
    {
      id: 'dig01-d07',
      prio: 'P1',
      priority: 'muy-importante',
      cuadro: 'dispepsia',
      question: 'Defina dispepsia y mencione sus signos de alarma.',
      quote: { text: '“Siempre digo las dos D y la P”', refs: [M2('07:34')] },
      answer: [
        { t: 'p', text: 'Dolor o malestar del **abdomen superior** con plenitud posprandial, saciedad precoz, dolor o ardor epigástrico (Roma: 3 meses, inicio ≥ 6 meses). Funcional 60 %, orgánica 40 % (úlcera n.º 1). Clínica: **dolor, distensión, pirosis**.' },
        { t: 'p', text: '**Alarma (→ endoscopía):** > 55 años, pérdida de peso, hematemesis, vómitos persistentes, disfagia progresiva, ictericia, anemia, AINEs, antecedentes de cáncer.' },
      ],
      refs: [M1('27:32'), M1('30:52'), M2('07:34'), M2('08:14')],
    },
  ],

  /* ───────── Choice (temas de examen) ───────── */
  mcq: [
    {
      id: 'dig01-q01', topic: 'Hematemesis vs hemoptisis', difficulty: 1, emphasis: true,
      stem: 'Sangre roja rutilante y espumosa expulsada con la tos, de reacción alcalina, corresponde a:',
      options: [
        { text: 'Hematemesis.', why: 'La hematemesis sale con el vómito, oscura y ácida.' },
        { text: 'Hemoptisis.', why: 'Correcto: viene de la vía aérea, con aire (espuma) y reacción alcalina.' },
        { text: 'Melena.', why: 'Es sangre digerida en la materia fecal.' },
        { text: 'Epistaxis.', why: 'Sale por la nariz, sin tos.' },
      ],
      answer: 1, refs: [HD('08:08'), L('75')],
    },
    {
      id: 'dig01-q02', topic: 'Hematemesis', difficulty: 1,
      stem: 'Un vómito en **borra de café** indica:',
      options: [
        { text: 'Sangrado activo arterial.', why: 'Eso es sangre roja.' },
        { text: 'Sangre ya digerida por el ácido gástrico.', why: 'Correcto: la hemoglobina se convirtió en hematina ácida.' },
        { text: 'Origen colónico.', why: 'La hematemesis es siempre alta.' },
        { text: 'Siempre hemoptisis deglutida.', why: 'Puede ocurrir, pero la borra de café indica sangre digerida en el estómago.' },
      ],
      answer: 1, refs: [M2('17:13'), L('75')],
    },
    {
      id: 'dig01-q03', topic: 'Tipos de vómito', difficulty: 2, emphasis: true,
      stem: 'Vómito de alimentos ingeridos varias horas antes, con chapoteo gástrico:',
      options: [
        { text: 'Gastroenteritis.', why: 'No explica la retención.' },
        { text: 'Síndrome pilórico.', why: 'Correcto: el estómago no vacía (vómito 4–6 h después).' },
        { text: 'Hipertensión endocraneana.', why: 'Da vómito en chorro sin náuseas.' },
        { text: 'Embarazo.', why: 'Da vómito matinal.' },
      ],
      answer: 1, refs: [M2('19:53'), M2('29:19'), L('375')],
    },
    {
      id: 'dig01-q04', topic: 'Horario del vómito', difficulty: 1,
      stem: 'Vómito matinal en ayunas. Las tres causas que remarca el profe son:',
      options: [
        { text: 'Úlcera, gastritis y pancreatitis.', why: 'No son las del vómito matinal.' },
        { text: 'Embarazo, alcohol la noche anterior e hipertensión endocraneana.', why: 'Correcto.' },
        { text: 'Síndrome pilórico, íleo y apendicitis.', why: 'No son las del vómito matinal.' },
        { text: 'Ménière, migraña y cinetosis.', why: 'No son las que da el profe.' },
      ],
      answer: 1, refs: [M2('19:13')],
    },
    {
      id: 'dig01-q05', topic: 'Vómito en chorro', difficulty: 2,
      stem: 'Vómito en chorro, sin náuseas, con cefalea intensa: hay que pensar en',
      options: [
        { text: 'Síndrome pilórico.', why: 'Es de retención.' },
        { text: 'Hipertensión endocraneana.', why: 'Correcto.' },
        { text: 'Úlcera péptica.', why: 'No explica el chorro sin náuseas.' },
        { text: 'Gastroenteritis.', why: 'Suele haber náuseas y diarrea.' },
      ],
      answer: 1, refs: [M2('21:54')],
    },
    {
      id: 'dig01-q06', topic: 'Mallory-Weiss', difficulty: 1, emphasis: true,
      stem: 'La tríada de Mallory-Weiss es:',
      options: [
        { text: 'Dolor, vómitos y fiebre.', why: 'Es la tríada de Murphy (apendicitis).' },
        { text: 'Alcoholismo, vómitos y hematemesis.', why: 'Correcto (y es su cronología).' },
        { text: 'Disfagia, pérdida de peso y anemia.', why: 'Sugiere cáncer.' },
        { text: 'Dolor torácico, enfisema subcutáneo y vómitos.', why: 'Orienta a Boerhaave.' },
      ],
      answer: 1, refs: [HD('16:48'), L('390')],
    },
    {
      id: 'dig01-q07', topic: 'Complicaciones', difficulty: 2, emphasis: true,
      stem: 'Alteración esperable en un paciente con vómitos profusos:',
      options: [
        { text: 'Acidosis metabólica con hiperpotasemia.', why: 'Se pierde ácido y potasio, no se ganan.' },
        { text: 'Alcalosis metabólica con hipopotasemia.', why: 'Correcto: pérdida de cloro (HCl) y potasio.' },
        { text: 'Acidosis respiratoria.', why: 'No es la alteración primaria.' },
        { text: 'Hipernatremia aislada.', why: 'No es lo característico.' },
      ],
      answer: 1, refs: [M2('23:15'), L('377')],
    },
    {
      id: 'dig01-q08', topic: 'Mallory-Weiss vs Boerhaave', difficulty: 2,
      stem: '¿Qué diferencia a Mallory-Weiss de Boerhaave?',
      options: [
        { text: 'Mallory-Weiss es transmural.', why: 'Es al revés.' },
        { text: 'Mallory-Weiss: desgarro de la mucosa; Boerhaave: rotura de todo el espesor.', why: 'Correcto.' },
        { text: 'Boerhaave no ocurre por vómitos.', why: 'Justamente es una rotura por vómitos.' },
        { text: 'Mallory-Weiss nunca sangra.', why: 'Se manifiesta con hematemesis.' },
      ],
      answer: 1, refs: [M2('23:55'), M2('24:37')],
    },
    {
      id: 'dig01-q09', topic: 'Disfagia', difficulty: 1,
      stem: 'La disfagia orofaríngea también se llama:',
      options: [
        { text: 'Baja o de transporte.', why: 'Esa es la esofágica.' },
        { text: 'Alta o de transferencia.', why: 'Correcto.' },
        { text: 'Odinofagia.', why: 'Es dolor al tragar.' },
        { text: 'Globo histérico.', why: 'Sensación de cuerpo extraño sin relación con la ingesta.' },
      ],
      answer: 1, refs: [M1('03:00')],
    },
    {
      id: 'dig01-q10', topic: 'Disfagia', difficulty: 2,
      stem: 'Disfagia esofágica **solo para sólidos**, continua y progresiva: orienta a',
      options: [
        { text: 'Causa mecánica (obstructiva).', why: 'Correcto: un obstáculo deja pasar líquidos pero no sólidos.' },
        { text: 'Trastorno motor.', why: 'El motor es para sólidos y líquidos.' },
        { text: 'Disfagia orofaríngea.', why: 'No puede iniciar la deglución.' },
        { text: 'Globo histérico.', why: 'No se relaciona con la ingesta.' },
      ],
      answer: 0, refs: [M1('12:48')],
    },
    {
      id: 'dig01-q11', topic: 'Acalasia', difficulty: 2, emphasis: true,
      stem: 'Disfagia lentamente progresiva para sólidos y líquidos con regurgitación, en un paciente con Chagas:',
      options: [
        { text: 'Cáncer de esófago.', why: 'Es obstructivo: al principio solo sólidos.' },
        { text: 'Acalasia.', why: 'Correcto: “lo que siempre suelen preguntar”.' },
        { text: 'Estenosis péptica.', why: 'Es mecánica, con pirosis crónica.' },
        { text: 'Disfagia orofaríngea.', why: 'Traga bien: es esofágica.' },
      ],
      answer: 1, refs: [M1('21:30')],
    },
    {
      id: 'dig01-q12', topic: 'Dispepsia', difficulty: 2,
      stem: '¿Cuál es un signo de alarma en dispepsia?',
      options: [
        { text: 'Eructos.', why: 'Forma parte de la clínica habitual.' },
        { text: 'Anemia.', why: 'Correcto: puede indicar cáncer o sangrado.' },
        { text: 'Pirosis ocasional.', why: 'Es la “P” de la clínica habitual.' },
        { text: 'Tener 30 años.', why: 'La edad es alarma por encima de 55.' },
      ],
      answer: 1, refs: [M2('08:14')],
    },
    {
      id: 'dig01-x01', topic: 'Integración', difficulty: 2, integration: true,
      stem: 'Paciente alcohólico que tras vómitos repetidos presenta vómito con sangre. ¿Qué tríada cumple?',
      options: [
        { text: 'Murphy.', why: 'Dolor, vómitos y fiebre (apendicitis).' },
        { text: 'Mallory-Weiss.', why: 'Correcto: alcoholismo, vómitos, hematemesis.' },
        { text: 'Charcot.', why: 'Es de la colangitis (otro capítulo).' },
        { text: 'Ninguna: es una hemoptisis.', why: 'Sale con el vómito: es hematemesis.' },
      ],
      answer: 1, refs: [HD('16:48')],
    },
    {
      id: 'dig01-x02', topic: 'Integración', difficulty: 2, integration: true,
      stem: 'Sangre oscura con restos alimentarios, precedida de náuseas, y melena al día siguiente:',
      options: [
        { text: 'Hemoptisis.', why: 'Sería roja, espumosa, con tos.' },
        { text: 'Hematemesis.', why: 'Correcto.' },
        { text: 'Epistaxis.', why: 'Sangre roja nasal, sin náuseas.' },
        { text: 'Gingivorragia.', why: 'Sangre roja de las encías.' },
      ],
      answer: 1, refs: [L('75')],
    },
    {
      id: 'dig01-x03', topic: 'Integración', difficulty: 1,
      stem: '“Las dos D y la P” de la dispepsia son:',
      options: [
        { text: 'Disfagia, diarrea, pirosis.', why: 'No.' },
        { text: 'Dolor epigástrico, distensión, pirosis.', why: 'Correcto.' },
        { text: 'Dolor, deshidratación, pérdida de peso.', why: 'No.' },
        { text: 'Distensión, disfonía, plenitud.', why: 'No.' },
      ],
      answer: 1, refs: [M2('07:34')],
    },
  ],

  /* ───────── Memoria activa ───────── */
  memory: [
    {
      id: 'dig01-m01',
      title: 'Hematemesis vs hemoptisis',
      purpose: 'El cuadro que el profe pide de memoria.',
      evaluates: [{ t: 'table', head: ['', 'Hematemesis', 'Hemoptisis'], rows: [['Sale con', 'Vómito', 'Tos'], ['Color', 'Oscura / borra de café', 'Roja, espumosa'], ['pH', 'Ácido', 'Alcalino'], ['Después', 'Melena', '—']] }],
      interpret: 'Náuseas, restos de comida y después melena: digestivo. Tos y espuma: respiratorio.',
      mnemonic: { hook: 'Hemat-EMESIS = vómito · Hemop-TISIS = pulmón.', explain: 'El nombre te dice de dónde viene: emesis es vómito; tisis remite al pulmón.' },
      recall: { q: '¿De qué color y pH es la hemoptisis?', a: 'Roja rutilante, espumosa, alcalina.' },
    },
    {
      id: 'dig01-m02',
      title: 'Tríada de Mallory-Weiss',
      purpose: 'Responder la pregunta del preguntero en una línea.',
      evaluates: [{ t: 'list', items: ['**A**lcoholismo', '**V**ómitos', '**H**ematemesis', 'Lesión: desgarro lineal de la mucosa esofagogástrica'] }],
      interpret: 'Es también la cronología: primero el alcohol, después los vómitos, al final la sangre.',
      mnemonic: { hook: 'A-V-H: Alcohol → Vómito → Hemorragia.', explain: 'En ese orden ocurren los hechos.' },
      recall: { q: '¿Qué capa se rompe en Mallory-Weiss y cuál en Boerhaave?', a: 'Mallory-Weiss: la mucosa. Boerhaave: todo el espesor.' },
    },
    {
      id: 'dig01-m03',
      title: 'Tipos y horario del vómito',
      purpose: 'Clasificar un vómito como lo pide el profe.',
      evaluates: [{ t: 'list', items: ['Contenido: **Entero → Ácido → Amargo → Fecal** (esófago → estómago → bilis → intestino bajo).', 'Rojo = ahora; borra de café = antes.', 'Matinal: **E**mbarazo, **A**lcohol, **H**TE · varias horas: píloro · chorro sin náuseas: HTE.'] }],
      interpret: 'Cuanto más “procesado” llega el contenido, más lejos se originó.',
      mnemonic: { hook: '“¡EAH, qué mañana!”', explain: 'Vómito matinal = Embarazo, Alcohol, HTE.' },
      recall: { q: '¿Por qué un síndrome pilórico no da vómitos biliosos?', a: 'Porque con el píloro obstruido la bilis del duodeno no llega al estómago.' },
    },
    {
      id: 'dig01-m04',
      title: 'Disfagia: dónde y con qué',
      purpose: 'Las dos preguntas que ordenan la disfagia.',
      evaluates: [{ t: 'list', items: ['**Alta (transferencia):** se atraganta — tos, ahogo, nariz.', '**Baja (transporte):** se atasca detrás del esternón.', '**Solo sólidos** = mecánica · **sólidos + líquidos** = motora (acalasia).'] }],
      interpret: 'Primero el tramo, después el mecanismo.',
      mnemonic: { hook: 'Arriba se ATRAGANTA, abajo se ATASCA · MURO o MOTOR.', explain: 'Un muro deja pasar el agua pero no la piedra; un motor roto no empuja nada.' },
      recall: { q: 'Sólidos y líquidos, lenta y progresiva, con regurgitación: ¿diagnóstico?', a: 'Acalasia.' },
    },
    {
      id: 'dig01-m05',
      title: 'Dispepsia: 2 D + P y alarma',
      purpose: 'Clínica y conducta en dos reglas.',
      evaluates: [{ t: 'list', items: ['**D**olor · **D**istensión · **P**irosis (regla del profe).', 'Alarma: **VIDA que PESA → VEDA**: Vómitos, Ictericia, Disfagia, Anemia · Pérdida de peso, Edad > 55, Sangrado, AINEs/Antecedentes → endoscopía.'] }],
      interpret: 'Con cualquier signo de alarma, endoscopía digestiva alta.',
      mnemonic: { hook: 'Una VIDA que PESA → VEDA', explain: 'Mnemotecnia propia para los signos de alarma.' },
      recall: { q: '¿Qué significan las dos D y la P?', a: 'Dolor epigástrico, distensión y pirosis.' },
    },
  ],

  trampas: [
    'Decir que la hematemesis es alcalina: en el cuadro del libro la **alcalina es la hemoptisis**.',
    'Confundir la tríada de **Mallory-Weiss** con la de **Murphy** (dolor, vómitos, fiebre).',
    'Llamar «de transferencia» a la disfagia esofágica: transferencia = **orofaríngea**.',
    'Decir que la disfagia motora es solo para líquidos: es para **sólidos y líquidos**.',
    'Asociar vómito bilioso al síndrome pilórico: con el píloro cerrado la bilis no llega al estómago.',
  ],

  links: [
    { chapterId: 'dig-12', text: '[[dig-12|Hemorragias digestivas]]: hematemesis, melena y Mallory-Weiss en profundidad.' },
    { chapterId: 'dig-08', text: '[[dig-08|Síndrome pilórico e íleo]]: el vómito de retención y los vómitos fecaloides.' },
    { chapterId: 'dig-06', text: '[[dig-06|Síndrome esofágico]]: acalasia, ERGE y cáncer.' },
    { chapterId: 'dig-07', text: '[[dig-07|Síndrome ulceroso]]: la causa n.º 1 de dispepsia orgánica.' },
  ],

  maneuvers: {
    ids: ['bazuqueo-gastrico', 'boca-orofaringe', 'ganglios-supraclaviculares'],
    note: 'Las maniobras del examen físico que usa este tema.',
  },

  video,
};

export default chapter;
