import type { Inline } from '@/types';

/**
 * Lo que tomó Ortega en los orales, según el relato de compañeras que rindieron.
 * `rel` marca en la lista general las preguntas del contenido que coinciden (id «capítulo:diapositiva» de citas.json).
 * Las respuestas son breves y salen de las diapositivas enlazadas.
 */
export interface PreguntaOral {
  q: Inline;
  /** Respuesta esperada, en una o dos líneas. */
  a: Inline;
  /** Lo que pasó en la mesa (si alguien no la supo, si la remarcó). */
  nota?: Inline;
  sistema: 'digestivo' | 'renal' | 'neuro' | 'soma';
  link: string;
  rel?: string[];
}

export interface Oral {
  id: string;
  fecha: string;
  titulo: string;
  resumen: Inline;
  teorico: PreguntaOral[];
  practico: PreguntaOral[];
}

export const ORALES: Oral[] = [
  {
    id: 'oral-2026-11-10',
    fecha: '2026-11-10',
    titulo: 'Oral del martes 10/11',
    resumen: 'Preguntas puntuales, de las que se sabe que le gustan: **tríadas**, **causas más frecuentes** y maniobras **con su nombre**. En el práctico, a varios los bochó por no saber el **XI par**.',
    teorico: [
      {
        q: '¿Cuál es la tríada del Parkinson?',
        a: '**Bradicinesia**, **rigidez** y **temblor**. Núcleo lesionado: sustancia negra.',
        sistema: 'neuro',
        link: '/capitulo/neu-05?t=teoria&d=t-triada-parkinson',
        rel: ['neu-05:t-triada-parkinson'],
      },
      {
        q: '¿Qué tipo de temblor tiene el Parkinson?',
        a: 'Temblor **de reposo**, lento y grosero (no el intencional, que es cerebeloso).',
        sistema: 'neuro',
        link: '/capitulo/neu-02?t=teoria&d=t-temblor',
        rel: ['neu-02:t-temblor'],
      },
      {
        q: '¿Cómo es la rigidez del Parkinson?',
        a: 'Hipertonía rígida con signo de la **rueda dentada**, porque es una afección **extrapiramidal** (la piramidal es espástica, en **navaja**).',
        nota: 'Una compañera no supo la característica de la rigidez; la siguiente la respondió y estuvo bien.',
        sistema: 'neuro',
        link: '/capitulo/neu-05?t=teoria&d=t-navaja',
      },
      {
        q: 'Motilidad.',
        a: 'Repasar el examen de la motilidad: trofismo, tono, fuerza (maniobras deficitarias, Mingazzini), reflejos y coordinación; y cómo cambia en el síndrome piramidal.',
        nota: 'Nadie la supo responder.',
        sistema: 'neuro',
        link: '/capitulo/neu-05?t=teoria&d=t-piramidal',
        rel: ['neu-05:t-piramidal'],
      },
      {
        q: 'Hemorragia digestiva alta.',
        a: 'Sangrado **proximal al ángulo de Treitz**; se presenta como hematemesis o melena. Causa más frecuente: la **úlcera péptica**.',
        nota: 'La respondió completa: «excelente».',
        sistema: 'digestivo',
        link: '/capitulo/dig-12?t=teoria&d=t-hda-causas',
        rel: ['dig-12:t-hda-causas'],
      },
      {
        q: '¿Qué es el síndrome de Zollinger-Ellison?',
        a: 'Un **gastrinoma** (tumor pancreático) produce gastrina sin control → **hiperclorhidria** → úlceras pépticas **múltiples**.',
        nota: 'La pidió como «enfermedad rara» después de la HDA; la compañera no se acordaba.',
        sistema: 'digestivo',
        link: '/capitulo/dig-07?t=fisio&d=f-zollinger',
        rel: ['dig-07:t-otras-causas'],
      },
      {
        q: 'Estoy en el campo y un paciente vomitó sangre hace dos horas; no tengo endoscopía ni otro estudio. ¿Cómo sé si sigue sangrando?',
        a: 'Con la **sonda nasogástrica**: sangre **roja** = sangrado **activo**; **borra de café** = ya paró; aspirado claro **no lo descarta**; si sale bilis, el origen está por debajo del Treitz.',
        sistema: 'digestivo',
        link: '/capitulo/dig-12?t=teoria&d=t-examen',
      },
      {
        q: '¿Cuál es la tríada del síndrome nefrítico?',
        a: 'Las **3 H**: **hematuria**, **hipertensión arterial** e **hiperazoemia**.',
        sistema: 'renal',
        link: '/capitulo/ren-03?t=teoria&d=t-tres-h',
        rel: ['ren-03:t-tres-h'],
      },
      {
        q: '¿Y la del síndrome nefrótico?',
        a: '**Proteinuria > 3,5 g/24 h**, **hipoalbuminemia < 3 g/dl** y **edema** (± hiperlipidemia y lipiduria).',
        sistema: 'renal',
        link: '/capitulo/ren-04?t=teoria&d=t-def',
        rel: ['ren-04:t-def'],
      },
      {
        q: '¿Cuál es la causa principal del síndrome nefrítico?',
        a: 'La **glomerulonefritis postestreptocócica** (preguntar por una infección 1–2 semanas antes).',
        sistema: 'renal',
        link: '/capitulo/ren-03?t=teoria&d=t-postestreptococica',
        rel: ['ren-03:t-postestreptococica'],
      },
      {
        q: '¿Cuál es la causa primaria principal del síndrome nefrótico?',
        a: 'Depende de la edad: en el niño, **cambios mínimos**; en el adulto, la **membranosa**.',
        sistema: 'renal',
        link: '/capitulo/ren-04?t=teoria&d=t-causas',
        rel: ['ren-04:t-causas'],
      },
      {
        q: 'Escala de Glasgow.',
        a: 'Mide el **nivel de conciencia**: apertura **ocular** (1–4), respuesta **verbal** (1–5) y **motora** (1–6); va de **3 a 15**. ≤ 8 = coma.',
        nota: 'Muchos no la sabían. Los valores son los de la escala estándar: en clase solo se menciona.',
        sistema: 'neuro',
        link: '/capitulo/neu-01?t=teoria&d=t-conciencia',
      },
      {
        q: '¿Cuál es la tríada de la hipertensión endocraneana?',
        a: '**Cefalea** holocraneana, **vómito en chorro** (sin náuseas) y **edema de papila**.',
        sistema: 'neuro',
        link: '/capitulo/neu-06?t=teoria&d=t-triada',
        rel: ['neu-06:t-triada'],
      },
      {
        q: '¿Cuál es la tríada de Cushing?',
        a: '**Hipertensión arterial**, **bradicardia** y **alteración respiratoria**. No es el síndrome de Cushing.',
        sistema: 'neuro',
        link: '/capitulo/neu-06?t=fisio&d=f-cushing',
        rel: ['neu-06:t-otros-signos'],
      },
      {
        q: '¿Qué par craneal se afecta en la hipertensión endocraneana?',
        a: 'El **VI par** (motor ocular externo): diplopía y estrabismo convergente.',
        sistema: 'neuro',
        link: '/capitulo/neu-06?t=teoria&d=t-otros-signos',
        rel: ['neu-06:t-otros-signos'],
      },
    ],
    practico: [
      {
        q: 'En el maniquí: maniobras de hígado pedidas por nombre, una detrás de otra.',
        a: 'Saber hacerlas **y nombrarlas**: monomanual y en cuchara; bimanuales de **Chauffard** (peloteo), **Mathieu** (enganche) y **Gilbert**.',
        nota: 'En la grabación los nombres no se entienden bien (parece decir «Mathieu»): repasar todas las del hígado.',
        sistema: 'digestivo',
        link: '/maniobras?m=higado-bimanual',
      },
      {
        q: '«Vos, cualquier maniobra de hígado. Vos, cualquiera de riñón. Vos, cualquiera de bazo.»',
        a: 'Hígado: Chauffard, Mathieu, Gilbert. Riñón: **Guyon** (peloteo), Montenegro, Israel, Glenard, puñopercusión. Bazo: decúbito dorsal o **Schuster** (Naegeli, Merlo).',
        sistema: 'digestivo',
        link: '/maniobras?sistema=digestivo&grupo=bazo',
      },
      {
        q: 'Cualquier maniobra lumbar.',
        a: '**Goldthwait**: una mano bajo la columna lumbar (en las apófisis espinosas) y la otra levanta la pierna extendida. Hasta 70° la columna no se mueve; si duele **antes**, orienta a simulación; si duele cuando la columna ya se mueve, la lesión es lumbar.',
        nota: 'Explicó la técnica y las causas, y le pidió el nombre: «Si se da un examen así tiene 10, váyase».',
        sistema: 'soma',
        link: '/maniobras?m=goldthwait',
      },
      {
        q: '¿Cómo se llama el XI par y cómo se explora?',
        a: '**Espinal** (accesorio). Motor del **esternocleidomastoideo** (girar y flexionar la cabeza contra la mano) y del **trapecio** (elevar los hombros contra resistencia).',
        nota: 'Bochó a varios porque no sabían el nombre ni cómo se explora.',
        sistema: 'neuro',
        link: '/maniobras?m=espinal',
        rel: [],
      },
    ],
  },
];
