import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-08 (síndrome pilórico e íleo). Clases Sd. pilórico e Íleo + libro p. 375–377.
export const escenas: Escena[] = [
  {
    tipo: 'organos',
    id: 'pilorico',
    titulo: 'Síndrome pilórico: el estómago que no se vacía',
    pasos: [
      {
        tono: 'peach',
        organos: ['piloro'],
        marca: 'piloro',
        nota: { t: 'Se tapa el píloro', d: 'Úlcera duodenal fibrosada (la causa más frecuente), tumor, inflamación vecina o estenosis congénita.' },
        di: 'El síndrome pilórico es la obstrucción del píloro, la puerta de salida del estómago. En el adulto la causa más frecuente es una úlcera duodenal que se fibrosa; en el recién nacido, la estenosis hipertrófica congénita.',
        retener: ['Obstrucción del píloro'],
      },
      {
        tono: 'peach',
        organos: ['estomago', 'piloro'],
        marca: 'piloro',
        nota: { t: 'Retención gástrica', d: 'Pasan más de 4 horas y el estómago sigue lleno, distendido.' },
        di: 'El estómago no se puede vaciar: pasan más de cuatro horas desde la comida y sigue lleno, distendido, con saciedad precoz.',
        retener: ['Más de 4 horas lleno'],
      },
      {
        tono: 'rose',
        organos: ['estomago', 'esofago'],
        marca: 'piloro',
        nota: { t: 'El síntoma cardinal: el vómito', d: 'Alimenticio, 4 a 6 h después de comer, muchas veces sin náuseas, en chorro.' },
        di: 'Como el contenido no puede salir por abajo, sale por arriba: el vómito es el síntoma cardinal. Es alimenticio, con comida sin digerir, cuatro a seis horas después de comer, muchas veces sin náuseas.',
        retener: ['Vómito alimenticio tardío'],
      },
      {
        tono: 'red',
        organos: ['estomago'],
        marca: 'piloro',
        nota: { t: 'Pierde peso y electrolitos', d: 'Vómito + pérdida de peso: lo más característico. Deshidratación, desnutrición, hipopotasemia y alcalosis.' },
        di: 'Al vomitar no absorbe nutrientes ni líquido: pérdida de peso, deshidratación y desnutrición. Se pierden ácido y potasio: hipopotasemia y alcalosis metabólica.',
        retener: ['Vómito + pérdida de peso'],
      },
      {
        tono: 'gold',
        organos: ['estomago', 'piloro'],
        nota: { t: 'Al examen', d: 'Distensión del abdomen superior, bazuqueo gástrico; en el lactante, la oliva pilórica.' },
        di: 'En el examen: abdomen superior distendido y bazuqueo o chapoteo gástrico. En el lactante se puede palpar la oliva pilórica, el píloro hipertrofiado, unos centímetros por debajo del xifoides.',
        retener: ['Bazuqueo', 'Oliva pilórica (lactante)'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'ileo',
    titulo: 'Íleo paralítico vs mecánico',
    nodos: [
      { id: 'ileo', x: 480, y: 80, t: 'ÍLEO = parálisis del tránsito intestinal', w: 340, tono: 'lilac' },
      { id: 'par', x: 200, y: 220, t: 'Paralítico: todo el intestino se detiene', w: 300, tono: 'sky' },
      { id: 'sil', x: 200, y: 360, t: 'SILENCIO abdominal · distendido, timpánico', w: 300, tono: 'sky' },
      { id: 'mec', x: 760, y: 220, t: 'Mecánico: hay un obstáculo', w: 300, tono: 'peach' },
      { id: 'lucha', x: 760, y: 360, t: 'Arriba LUCHA (RHA ↑, cólico) · abajo parálisis', w: 300, tono: 'peach' },
      { id: 'comun', x: 480, y: 520, t: 'Ambos: no elimina gases ni heces, distensión, vómitos, ↓ K⁺', w: 420, tono: 'rose' },
    ],
    lazos: [
      { a: 'ileo', b: 'par' },
      { a: 'ileo', b: 'mec' },
      { a: 'par', b: 'sil' },
      { a: 'mec', b: 'lucha' },
      { a: 'sil', b: 'comun' },
      { a: 'lucha', b: 'comun' },
    ],
    pasos: [
      {
        ver: ['ileo'],
        di: 'El íleo es la parálisis del tránsito intestinal. El profe avisa que se pregunta en el parcial, en el choice y en el oral. Hay dos tipos.',
        retener: ['Íleo = parálisis del tránsito'],
      },
      {
        ver: ['ileo', 'par', 'sil'],
        di: 'En el íleo paralítico o adinámico no hay obstáculo: todo el intestino deja de moverse. Al examen: abdomen distendido, timpánico y con silencio abdominal, sin ruidos hidroaéreos.',
        retener: ['Paralítico = silencio'],
      },
      {
        ver: ['ileo', 'par', 'sil', 'mec', 'lucha'],
        di: 'En el mecánico u obstructivo hay un obstáculo. Por arriba, el intestino lucha: peristaltismo aumentado, ruidos hidroaéreos de lucha y dolor cólico. Por debajo, parálisis. Si la obstrucción dura, el músculo se cansa y también se paraliza.',
        retener: ['Mecánico = RHA de lucha'],
      },
      {
        ver: ['ileo', 'par', 'sil', 'mec', 'lucha', 'comun'],
        di: 'En los dos: no elimina gases ni materia fecal, meteorismo y distensión, vómitos que pasan de alimenticios a biliosos y fecaloides, e hipopotasemia con alcalosis por lo que pierde al vomitar. Y una regla: todo íleo es secundario, siempre hay que buscar la causa.',
        retener: ['Sin gases ni heces', 'Todo íleo es secundario'],
      },
    ],
  },
];
