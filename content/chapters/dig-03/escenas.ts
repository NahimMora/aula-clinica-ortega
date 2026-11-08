import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-03 (diarrea, constipación, trastornos anorrectales). MC Digestivo partes 5 y 6.
export const escenas: Escena[] = [
  {
    tipo: 'organos',
    id: 'altabaja',
    titulo: 'Diarrea alta (acuosa) vs baja (disentérica)',
    pasos: [
      {
        tono: 'sky',
        organos: ['yeyuno', 'ileon'],
        nota: { t: 'Alta = acuosa', d: 'Intestino delgado: voluminosa, acuosa y clara. Predomina el volumen sobre la frecuencia.' },
        di: 'La diarrea alta viene del intestino delgado: va tres o cuatro veces al baño, pero mucho volumen y muy líquido. Predomina el volumen sobre la frecuencia.',
        retener: ['Alta = delgado', 'Predomina el volumen'],
      },
      {
        tono: 'sky',
        organos: ['yeyuno', 'ileon'],
        nota: { t: 'Quién la produce', d: 'Virus, bacterias, parásitos y sus toxinas. Del viajero: E. coli enterotoxigénica y cólera.' },
        di: 'La producen virus, bacterias y parásitos, sobre todo por sus toxinas. La diarrea del viajero, por E. coli enterotoxigénica o cólera, es acuosa y se va sola en menos de una semana.',
        retener: ['Viajero: E. coli enterotoxigénica, cólera'],
      },
      {
        tono: 'rose',
        organos: ['colon', 'recto'],
        nota: { t: 'Baja = disentérica', d: 'Colon: hasta 10 veces por día, poquito cada vez, con moco, pus o sangre. Pujo y tenesmo.' },
        di: 'La diarrea baja viene del colon: puede ir hasta diez veces por día, pero poquito. Trae moco, pus o sangre, y se acompaña de pujo y tenesmo: es la diarrea disentérica.',
        retener: ['Baja = colon', 'Moco, pus, sangre', 'Pujo y tenesmo'],
      },
      {
        tono: 'red',
        organos: ['colon', 'recto'],
        nota: { t: 'Siempre bacteriana', d: 'Shigella y E. coli enterohemorrágica O157 (verotoxina) → síndrome urémico hemolítico.' },
        di: 'El profe lo repite: la disentérica siempre es bacteriana. Shigella y E. coli enterohemorrágica O157, que producen verotoxina y pueden llevar al síndrome urémico hemolítico.',
        retener: ['Shigella · E. coli O157', 'Verotoxina → SUH'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'toxinas',
    titulo: 'Diarrea aguda: cómo actúa cada toxina',
    items: [
      { t: 'Enterotoxina', d: 'Saca agua hacia la luz → acuosa y voluminosa. Rotavirus, E. coli enterotoxigénica, cólera', tono: 'sky' },
      { t: 'Neurotoxina', d: 'Acelera el peristaltismo → vómitos + diarrea. S. aureus (huevo, mayonesa)', tono: 'peach' },
      { t: 'Citotoxina', d: 'Daña la mucosa. Clostridium difficile activado por antibióticos (clindamicina)', tono: 'rose' },
      { t: 'Enteroadherente', d: 'Se pega sin invadir la mucosa. Parásitos', tono: 'lilac' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'Casi toda diarrea aguda es infecciosa o tóxica, y lo importante es la toxina. La enterotoxina hace que el intestino saque agua hacia la luz: diarrea acuosa y voluminosa.',
        retener: ['Enterotoxina = agua a la luz'],
      },
      {
        hasta: 1,
        di: 'La neurotoxina actúa sobre el sistema nervioso del intestino y acelera el peristaltismo: vómitos y diarrea a las pocas horas. El ejemplo es el Staphylococcus aureus de los huevos y la mayonesa.',
        retener: ['S. aureus: vómitos + diarrea'],
      },
      {
        hasta: 2,
        di: 'La citotoxina daña la mucosa. Ejemplo: el Clostridium difficile, que se activa cuando el paciente toma antibióticos como la clindamicina.',
        retener: ['C. difficile tras clindamicina'],
      },
      {
        hasta: 3,
        di: 'Y los enteroadherentes se pegan a la mucosa sin invadirla, como los parásitos. Si la diarrea dura de dos a cuatro semanas es persistente, y casi siempre es por parásitos.',
        retener: ['Persistente: 2–4 semanas, parásitos'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'osmotica',
    titulo: 'Osmótica vs secretora: la prueba del ayuno',
    nodos: [
      { id: 'lact', x: 165, y: 120, t: 'Lactosa sin digerir (falta lactasa)', w: 270, tono: 'peach' },
      { id: 'arr', x: 485, y: 120, t: 'El azúcar arrastra agua a la luz', w: 260, tono: 'peach' },
      { id: 'osm', x: 800, y: 120, t: 'Diarrea OSMÓTICA', w: 250, tono: 'peach' },
      { id: 'cede', x: 800, y: 255, t: 'Cede al retirar la leche', w: 270, tono: 'mint' },
      { id: 'vip', x: 165, y: 400, t: 'VIPoma, Zollinger-Ellison, laxantes', w: 270, tono: 'lilac' },
      { id: 'sec', x: 485, y: 400, t: 'El intestino secreta líquido sin parar', w: 260, tono: 'lilac' },
      { id: 'secr', x: 800, y: 400, t: 'Diarrea SECRETORA', w: 250, tono: 'lilac' },
      { id: 'sigue', x: 800, y: 535, t: 'Persiste en ayunas', w: 270, tono: 'red' },
    ],
    lazos: [
      { a: 'lact', b: 'arr' },
      { a: 'arr', b: 'osm' },
      { a: 'osm', b: 'cede' },
      { a: 'vip', b: 'sec' },
      { a: 'sec', b: 'secr' },
      { a: 'secr', b: 'sigue' },
    ],
    pasos: [
      {
        ver: ['lact', 'arr', 'osm'],
        di: 'Diarrea osmótica: el paciente con déficit de lactasa toma leche, la lactosa no se absorbe y, como es un azúcar, arrastra agua hacia la luz del intestino.',
        retener: ['Osmótica: el soluto arrastra agua'],
      },
      {
        ver: ['lact', 'arr', 'osm', 'cede'],
        di: 'Por eso cede cuando se retira el alimento: si deja de tomar leche, deja de tener diarrea.',
        retener: ['Cede con el ayuno'],
      },
      {
        ver: ['lact', 'arr', 'osm', 'cede', 'vip', 'sec', 'secr'],
        di: 'Diarrea secretora: algo hace que el intestino secrete líquido todo el tiempo, como un tumor llamado VIPoma, el Zollinger-Ellison o los laxantes.',
        retener: ['Secretora: VIPoma, Zollinger, laxantes'],
      },
      {
        ver: ['lact', 'arr', 'osm', 'cede', 'vip', 'sec', 'secr', 'sigue'],
        luz: ['cede', 'sigue'],
        di: 'Como no depende de lo que come, la secretora persiste aunque el paciente esté en ayunas. Esa es la diferencia clave entre las dos.',
        retener: ['Secretora persiste en ayunas'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'roma',
    titulo: 'Constipación: criterios de Roma',
    items: [
      { t: 'Esfuerzo', d: 'Hace fuerza para evacuar', tono: 'peach' },
      { t: 'Heces duras', d: 'Duras o en bolitas (Bristol 1–2)', tono: 'peach' },
      { t: 'Evacuación incompleta', d: 'Sensación de que quedó algo', tono: 'rose' },
      { t: 'Bloqueo anorrectal', d: 'Sensación de obstrucción', tono: 'rose' },
      { t: 'Maniobras manuales', d: 'Necesita ayudarse para evacuar', tono: 'lilac' },
      { t: '< 3 por semana', d: 'Menos de tres evacuaciones semanales', tono: 'lilac' },
    ],
    pasos: [
      {
        hasta: 1,
        di: 'El profe avisa: los criterios de Roma son pregunta de parcial. Constipación es tener dos o más de seis manifestaciones. Las dos primeras: esfuerzo para evacuar y heces duras o en bolitas.',
        retener: ['≥ 2 de 6 criterios'],
      },
      {
        hasta: 3,
        di: 'Después, sensación de evacuación incompleta y sensación de obstrucción o bloqueo anorrectal, en al menos una de cada cuatro deposiciones.',
        retener: ['En ≥ 25 % de las deposiciones'],
      },
      {
        hasta: 5,
        di: 'Y por último, maniobras manuales para evacuar y menos de tres evacuaciones por semana.',
        retener: ['< 3 evacuaciones por semana'],
      },
      {
        hasta: 5,
        luz: [],
        di: 'Requisitos: tres meses de síntomas dentro de seis, el profe lo cuenta como noventa días en seis meses; heces blandas raras sin laxantes; y no cumplir criterios de intestino irritable.',
        retener: ['90 días en 6 meses', 'Sin laxantes · no SII'],
      },
    ],
  },
];
