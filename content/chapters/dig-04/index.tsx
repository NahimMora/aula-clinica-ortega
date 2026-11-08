import type { Chapter, SourceRef } from '@/types';
import { escenas } from './escenas';

/*
 * dig-04 — Ictericia.
 * No hay una clase grabada específica: el profe remite al apunte de motivos de consulta (libro p. 10–15, del propio Dr. Ortega)
 * y avisa en MC Digestivo parte 6 (16:23) que se pregunta mucho. Todo el contenido sale de ese apunte.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M6 = (t: string) => r('mc-dig-6', t);
const L = (p: string) => r('libro', undefined, p);

const chapter: Chapter = {
  id: 'dig-04',
  systemId: 'digestivo',
  title: 'Ictericia',
  subtitle: 'El circuito de la bilirrubina y dónde se rompe: pre, intra o poshepática. Orina, heces, tinte y laboratorio para saber cuál es.',
  estimatedMinutes: 35,
  sources: [M6('15:42–16:23'), L('10–15')],

  map: {
    center: 'Ictericia',
    why: 'El profe es tajante: «ictericia preguntan muchísimo… **no me saben ictericia para el tercer parcial, los van a bochar**». Todo sale del apunte de motivos de consulta (libro p. 10–15).',
    prereqs: [
      { label: 'Metabolismo de la hemoglobina', detail: 'De dónde sale la bilirrubina.' },
      { label: 'Anatomía de la vía biliar', detail: 'Para ubicar dónde se tapa en la obstructiva.' },
    ],
    branches: [
      { id: 'metabolismo', label: 'El circuito', tone: 'sky', items: ['Indirecta vs directa', 'Coluria y acolia', 'Kernicterus'] },
      { id: 'clasificacion', label: 'Clasificación ★', tone: 'gold', items: ['Pre · hepática · post', 'Qué bilirrubina sube', 'Orina, heces, tinte'] },
      { id: 'semiologia', label: 'Semiología', tone: 'rose', items: ['Edad y sexo', 'Flavínica → melánica', 'Courvoisier'] },
      { id: 'laboratorio', label: 'Laboratorio', tone: 'lilac', items: ['Hemólisis · necrosis · colestasis', 'GPT vs GOT', 'Prueba de Koller'] },
    ],
    outcomes: [
      'Explicar por qué **solo la directa** da **coluria** y por qué hay **acolia**.',
      'Clasificar una ictericia en **pre, intra o poshepática** con la orina, las heces y el tinte.',
      'Enunciar la **ley de Courvoisier-Terrier** y el **síndrome coledociano**.',
      'Elegir los **marcadores** de hemólisis, necrosis y colestasis.',
    ],
  },

  theory: [
    {
      id: 'definicion',
      kicker: 'Definición',
      title: 'Qué es, valores y pseudoictericia',
      priority: 'muy-importante',
      summary: 'Coloración amarilla de piel y mucosas cuando la bilirrubina supera los 2 mg/dl.',
      blocks: [
        { t: 'callout', kind: 'prof', title: 'Aviso del profe', text: '«Ictericia preguntan muchísimo… vuelvan a repasar… **no me saben ictericia para el tercer parcial, los van a bochar**.»', refs: [M6('15:42'), M6('16:23')] },
        {
          t: 'scale',
          title: 'Bilirrubina total (mg/dl)',
          ends: ['Normal', 'Ictericia visible'],
          items: [
            { k: '0,3–1', t: 'Normal', d: 'Total 0,3–1 · **directa 0,1–0,4** · **indirecta 0,2–0,9** mg/dl.', tone: 'mint' },
            { k: '1–2', t: 'Subclínica', d: '**Hiperbilirrubinemia subclínica**: está alta pero todavía no se ve.', tone: 'gold' },
            { k: '> 2', t: 'Ictericia', d: 'Se ve primero en **escleróticas**, conjuntiva y **frenillo de la lengua** (más perfundidos y con fibras elásticas). Mirar con **luz natural**.', tone: 'peach' },
          ],
        },
        {
          t: 'compare',
          title: 'No confundir',
          cols: [
            { title: 'Ictericia', tone: 'gold', items: ['Bilirrubina > 2 mg/dl', 'Tiñe las **escleróticas**', 'Piel y mucosas'] },
            { title: 'Pseudoictericia', tone: 'peach', items: ['Bilirrubina **normal**', '**Respeta la esclerótica**', 'Palmas: carotenos (zanahoria, zapallo, cítricos), IRC, fármacos'] },
          ],
        },
      ],
      refs: [L('10'), L('12')],
    },
    {
      id: 'metabolismo',
      kicker: 'Fisiopatología',
      title: 'El circuito: indirecta, directa, coluria y acolia',
      priority: 'imprescindible',
      summary: 'Indirecta = antes del hígado, pegada a la albúmina. Directa = conjugada, hidrosoluble: la única que pasa a la orina.',
      blocks: [
        { t: 'anim', id: 'ciclo' },
        {
          t: 'cuadro',
          title: 'Indirecta vs directa',
          cols: [
            { t: 'Indirecta (no conjugada)', tone: 'peach' },
            { t: 'Directa (conjugada)', tone: 'gold' },
          ],
          rows: [
            { k: 'Dónde está', v: ['**Antes** del hepatocito', 'Ya **conjugada** con ácido glucurónico'] },
            { k: 'Solubilidad', v: ['Liposoluble', '**Hidrosoluble**'] },
            { k: 'Transporte', v: ['Firmemente unida a la **albúmina**', 'Libre'] },
            { k: 'Orina', v: ['**No** se filtra: sin coluria', 'Se filtra: **coluria**'] },
            { k: 'Sistema nervioso', v: ['En el neonato puede ir a los núcleos de la base: **kernicterus**', '—'] },
          ],
          refs: [L('10'), L('11')],
        },
        { t: 'callout', kind: 'warn', title: 'Kernicterus', text: 'La bilirrubina **indirecta** se acumula en los **núcleos de la base** del recién nacido cuando la barrera hematoencefálica no está formada o está alterada: daño cerebral irreversible. La ictericia del neonato es **fisiológica** si dura 2–3 días.', refs: [L('11')] },
      ],
      refs: [L('10'), L('11')],
    },
    {
      id: 'clasificacion',
      kicker: 'Lo que toma ★',
      title: 'Pre, intra y poshepática',
      priority: 'imprescindible',
      summary: 'Antes del hígado sobra bilirrubina; en el hígado falla el hepatocito; después del hígado no sale la bilis.',
      blocks: [
        { t: 'anim', id: 'tipos' },
        {
          t: 'cuadro',
          title: 'El resumen del apunte (tapalo y reconstruilo)',
          cols: [
            { t: 'Prehepática', tone: 'peach' },
            { t: 'Hepática', tone: 'lilac' },
            { t: 'Poshepática', tone: 'gold' },
          ],
          rows: [
            { k: 'Causas', v: ['Hemólisis, eritroblastosis fetal, paludismo, reabsorción de hematomas', 'Gilbert, Crigler-Najjar, Dubin-Johnson / Rotor; hepatitis, cirrosis, alcohol, fármacos', 'Coledocolitiasis, cáncer de cabeza de páncreas, ampuloma, Mirizzi'] },
            { k: 'Bilirrubina', v: ['**Indirecta**', 'Indirecta **o** directa', '**Directa**'] },
            { k: 'Orina', v: ['Parda (sin coluria)', '**Coluria**', '**Coluria**'] },
            { k: 'Heces', v: ['**Hipercólicas**', 'Normocólicas', 'Hipocólicas / **acólicas**'] },
            { k: 'Tinte', v: ['Flavínica', 'Rubínica', 'Verdínica'] },
            { k: 'Marcadores', v: ['LDH ↑, reticulocitos ↑, haptoglobina ↓', 'GPT, GOT ↑; albúmina ↓; TP prolongado', 'FA, GGT, 5′-nucleotidasa ↑'] },
          ],
          refs: [L('11'), L('15')],
        },
        {
          t: 'flow',
          root: {
            label: '**Hepática**: ¿qué paso falla?',
            tone: 'lilac',
            children: [
              { label: '**Captación**', tone: 'peach', note: 'Síndrome de **Gilbert** (el más común) → indirecta' },
              { label: '**Conjugación**', tone: 'peach', note: '**Crigler-Najjar** → indirecta' },
              { label: '**Excreción**', tone: 'gold', note: '**Dubin-Johnson**, Rotor, hepatitis → directa' },
            ],
          },
        },
      ],
      refs: [L('11'), L('15')],
    },
    {
      id: 'semiologia',
      kicker: 'Semiología',
      title: 'Qué preguntar y qué mirar',
      priority: 'muy-importante',
      blocks: [
        {
          t: 'timeline',
          title: 'La edad orienta',
          items: [
            { k: 'Neonato', t: 'Fisiológica', d: '2–3 días; si se prolonga → kernicterus', tone: 'sky' },
            { k: 'Niño', t: 'Hepatitis A', tone: 'mint' },
            { k: 'Adolescente', t: 'Hepatitis B', tone: 'lilac' },
            { k: 'Adulto joven', t: 'Colecistitis, alcohol, hepatitis B', tone: 'peach' },
            { k: '> 45 años', t: 'Litiasis, cirrosis, cáncer de páncreas', tone: 'rose' },
            { k: '> 60 años', t: 'Cáncer (75 %)', d: 'Cirrosis alcohólica, litiasis', tone: 'red' },
          ],
          caption: 'A cualquier edad: **fármacos**. Mujer: litiasis (4 F), cirrosis biliar primaria. Hombre: cirrosis alcohólica, neoplasias.',
        },
        {
          t: 'scale',
          title: 'Grado de ictericia (tinte)',
          items: [
            { k: 'Flavínica', t: 'Amarillo pálido', d: '**Hemólisis** (prehepática).', tone: 'gold' },
            { k: 'Rubínica', t: 'Amarillo rojizo', d: '**Lesión hepatocelular**.', tone: 'peach' },
            { k: 'Verdínica', t: 'Verde aceituna', d: '**Colestasis** (obstructiva).', tone: 'mint' },
            { k: 'Melánica', t: 'Negruzca', d: '**Obstructivas crónicas**.', tone: 'lilac' },
          ],
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Comienzo', title: 'Brusco vs insidioso', text: 'Brusco: hepatitis viral, drogas, litiasis. Lento: cirrosis, **cáncer de cabeza de páncreas**, ampuloma.', tone: 'sky' },
            { tag: 'Estado general', title: '«Más ictérico que enfermo»', text: 'La **obstructiva**. La hepatocelular tiene ictericia leve y más compromiso general.', tone: 'gold' },
            { tag: 'Piel', title: 'Rascado = colestasis', text: 'El **prurito** (sales biliares) deja lesiones de rascado. Pérdida de peso: pensar en cáncer de páncreas.', tone: 'rose' },
          ],
        },
        { t: 'triad', title: 'Síndrome hemolítico', items: ['Bilirrubina indirecta', 'Ictericia flavínica', 'Anemia', 'Esplenomegalia'], center: 'Hemólisis', tone: 'peach', refs: [L('13')] },
        { t: 'callout', kind: 'clinic', title: 'Dolor tipo cólico biliar (ALICIA)', text: 'Agudo · hipocondrio derecho y epigastrio · irradia a dorso y hombro derecho · cólico · intensidad 3–10/10 · desencadenado por alimentos colecistoquinéticos: **colelitiasis**, la causa más frecuente.', refs: [L('11')] },
      ],
      refs: [L('11'), L('12'), L('13')],
    },
    {
      id: 'obstructiva',
      kicker: 'Poshepática',
      title: 'Síndrome coledociano y ley de Courvoisier',
      priority: 'imprescindible',
      summary: 'Cálculo = vesícula que no se distiende. Tumor = vesícula grande e indolora.',
      blocks: [
        { t: 'anim', id: 'obstructiva' },
        { t: 'triad', title: 'Síndrome coledociano', items: ['Ictericia obstructiva', 'Coluria', 'Hipocolia / acolia'], plus: ['Prurito'], plusLabel: 'Agregar el prurito', center: 'Coledociano', tone: 'gold', note: 'Es la traducción clínica de una **obstrucción del colédoco**.', refs: [L('13')] },
        { t: 'callout', kind: 'key', title: 'Ley de Courvoisier-Terrier', text: '«Toda ictericia **progresiva** de varios meses de evolución con **vesícula palpable no dolorosa** y **pérdida de peso** importante es **cáncer de la cabeza del páncreas** hasta que se demuestre lo contrario.» La obstrucción **litiásica** no distiende la vesícula porque su pared está fibrosada.', refs: [L('13')] },
        { t: 'callout', kind: 'note', title: 'Signo de Bard y Pick', text: 'Vesícula palpable **no dolorosa** en un paciente ictérico, por obstrucción mecánica de la vía biliar.', refs: [L('13')] },
      ],
      refs: [L('13')],
    },
    {
      id: 'laboratorio',
      kicker: 'Complementarios',
      title: 'Laboratorio e imágenes',
      priority: 'muy-importante',
      blocks: [
        {
          t: 'cuadro',
          title: 'Tres grupos de marcadores',
          cols: [
            { t: 'Qué piden', tone: 'lilac' },
            { t: 'Por qué', tone: 'sky' },
          ],
          rows: [
            { k: 'Hemólisis', v: ['LDH ↑, bilirrubina indirecta ↑, **reticulocitos ↑**, **haptoglobina ↓**', 'Se destruyen glóbulos rojos y la médula compensa'] },
            { k: 'Necrosis hepatocelular', v: ['**GPT (ALT)**, más específica; GOT (AST)', '**GPT > GOT**: hepatitis viral · **GOT > GPT**: alcohólica'] },
            { k: 'Colestasis', v: ['**FA**, **GGT**, 5′-nucleotidasa, bilirrubina directa, colesterol', 'La bilis no sale'] },
            { k: 'Función', v: ['Albúmina ↓, tiempo de protrombina prolongado', 'El hígado deja de sintetizar'] },
          ],
          refs: [L('13'), L('14')],
        },
        {
          t: 'flow',
          root: {
            label: 'Ictérico con **tiempo de protrombina prolongado**',
            tone: 'lilac',
            children: [
              {
                label: '**Prueba de Koller**',
                note: 'Vitamina K 10 mg/día IM durante 3 días',
                tone: 'sky',
                children: [
                  { label: '**Corrige** → colestasis', tone: 'gold', note: 'Faltaba vitamina K (no se absorbe sin bilis)' },
                  { label: '**No corrige** → lesión hepatocelular', tone: 'red', note: 'El hígado no fabrica los factores II, VII, IX y X' },
                ],
              },
            ],
          },
          caption: 'Los factores II, VII, IX y X se sintetizan en el hígado y necesitan vitamina K, que es liposoluble y se absorbe con la bilis.',
        },
        {
          t: 'cards',
          cols: 3,
          items: [
            { tag: 'Primero', title: 'Ecografía', text: 'Accesible, barata y de alto rédito: ¿vía biliar dilatada? → obstructiva.', tone: 'mint' },
            { tag: 'Vía biliar', title: 'Colangiorresonancia · CPRE', text: 'La CPRE además permite tratar (sacar el cálculo).', tone: 'sky' },
            { tag: 'Hepatitis', title: 'Marcadores virales', text: 'IgM VHA, HBsAg, IgM VHB, VHC; Epstein-Barr, CMV.', tone: 'lilac' },
          ],
        },
      ],
      refs: [L('13'), L('14')],
    },
  ],

  developments: [
    {
      id: 'dig04-d01',
      prio: 'P1',
      priority: 'imprescindible',
      emphasis: true,
      ficha: 'clasificacion',
      question: 'Clasifique la ictericia y mencione etiologías prehepáticas, hepáticas y poshepáticas. ¿Qué bilirrubina aumenta en cada una?',
      quote: { text: '«No me saben ictericia para el tercer parcial, los van a bochar»', refs: [M6('16:23')] },
      answer: [
        {
          t: 'table',
          head: ['', 'Prehepática', 'Hepática', 'Poshepática'],
          rows: [
            ['Mecanismo', 'Hemólisis', 'Falla del hepatocito', 'Obstrucción biliar'],
            ['Causas', 'Anemias hemolíticas, eritroblastosis fetal, paludismo', 'Gilbert, Crigler-Najjar, Dubin-Johnson; hepatitis, cirrosis, fármacos', 'Coledocolitiasis, cáncer de cabeza de páncreas, ampuloma'],
            ['Bilirrubina', '**Indirecta**', 'Indirecta o directa', '**Directa**'],
            ['Orina / heces', 'Parda / hipercólicas', 'Coluria / normocólicas', 'Coluria / acólicas'],
          ],
        },
      ],
      refs: [L('11'), L('15')],
    },
    {
      id: 'dig04-d02',
      prio: 'P1',
      priority: 'imprescindible',
      ficha: 'metabolismo',
      question: 'Realice una tabla de diferenciación entre bilirrubina indirecta y directa. ¿Qué es el kernicterus?',
      answer: [
        { t: 'p', text: '**Indirecta (no conjugada):** antes del hepatocito, liposoluble, unida a la albúmina; **no se filtra** → sin coluria. **Directa (conjugada):** con ácido glucurónico, hidrosoluble, se filtra → **coluria**.' },
        { t: 'p', text: '**Kernicterus:** la indirecta se acumula en los **núcleos de la base** del neonato (barrera hematoencefálica inmadura o alterada): daño cerebral irreversible.' },
      ],
      refs: [L('10'), L('11')],
    },
    {
      id: 'dig04-d03',
      prio: 'P2',
      priority: 'muy-importante',
      ficha: 'definicion',
      question: '¿Qué es la ictericia? Valores normales, hiperbilirrubinemia subclínica y pseudoictericia.',
      answer: [
        { t: 'p', text: '**Ictericia:** coloración amarilla de piel y mucosas con bilirrubina **> 2 mg/dl**. Normal: total 0,3–1 · directa 0,1–0,4 · indirecta 0,2–0,9 mg/dl.' },
        { t: 'p', text: '**Subclínica:** 1–2 mg/dl, sin color visible. **Pseudoictericia:** color amarillo (palmas) con bilirrubina **normal** que **respeta la esclerótica**: carotenos, IRC, neoplasias, fármacos.' },
      ],
      refs: [L('10')],
    },
    {
      id: 'dig04-d04',
      prio: 'P2',
      priority: 'muy-importante',
      ficha: 'semiologia',
      question: 'Semiológicamente, ¿qué rasgos clínicos orientan en un paciente ictérico?',
      answer: [
        { t: 'p', text: '**Tinte:** flavínico (hemólisis), rubínico (hepatocelular), verdínico (colestasis), melánico (obstructiva crónica). **Orina:** coluria = directa. **Heces:** acolia = obstrucción. **Prurito** con rascado = colestasis.' },
        { t: 'p', text: '**Signos acompañantes:** esplenomegalia y anemia (hemólisis); ascitis + ictericia = cirrosis; vesícula palpable indolora (**Courvoisier**) = cáncer de cabeza de páncreas; obstructiva: «más ictérico que enfermo».' },
      ],
      refs: [L('12'), L('13')],
    },
    {
      id: 'dig04-d05',
      prio: 'P2',
      priority: 'muy-importante',
      ficha: 'laboratorio',
      question: '¿Qué marcadores de laboratorio solicita en un paciente ictérico?',
      answer: [
        { t: 'p', text: '**Bilirrubina total y fraccionada.** **Hemólisis:** LDH, reticulocitos ↑, haptoglobina ↓. **Necrosis:** GPT (más específica) y GOT; GPT > GOT viral, GOT > GPT alcohólica. **Colestasis:** FA, GGT, 5′-nucleotidasa. **Función:** albúmina, tiempo de protrombina (prueba de Koller).' },
        { t: 'p', text: '**Imágenes:** ecografía primero (vía biliar dilatada = obstructiva), colangiorresonancia, CPRE.' },
      ],
      refs: [L('13'), L('14')],
    },
  ],

  mcq: [
    {
      id: 'dig04-q01',
      topic: 'Metabolismo',
      difficulty: 1,
      emphasis: true,
      stem: '¿Cuál bilirrubina produce **coluria**?',
      options: [
        { text: 'La indirecta, porque es liposoluble.', why: 'La indirecta está unida a la albúmina y no se filtra.' },
        { text: 'La directa, porque es hidrosoluble y se filtra.', why: 'Correcto.' },
        { text: 'Ambas por igual.', why: 'No.' },
        { text: 'Ninguna: la coluria es por urobilina.', why: 'La coluria es por bilirrubina directa.' },
      ],
      answer: 1,
      refs: [L('10')],
    },
    {
      id: 'dig04-q02',
      topic: 'Clasificación',
      difficulty: 2,
      emphasis: true,
      stem: 'Ictericia con **orina parda sin coluria**, heces **hipercólicas**, anemia y esplenomegalia:',
      options: [
        { text: 'Prehepática (hemolítica).', why: 'Correcto: ↑ indirecta.' },
        { text: 'Hepatocelular.', why: 'Daría coluria.' },
        { text: 'Poshepática.', why: 'Daría coluria y acolia.' },
        { text: 'Pseudoictericia.', why: 'La bilirrubina sería normal.' },
      ],
      answer: 0,
      refs: [L('13'), L('15')],
    },
    {
      id: 'dig04-q03',
      topic: 'Clasificación',
      difficulty: 1,
      stem: 'Coluria + acolia + prurito orientan a ictericia:',
      options: [
        { text: 'Prehepática.', why: 'No da coluria ni acolia.' },
        { text: 'Poshepática (obstructiva).', why: 'Correcto: síndrome coledociano.' },
        { text: 'Por Gilbert.', why: 'Eleva la indirecta.' },
        { text: 'Fisiológica del neonato.', why: 'No.' },
      ],
      answer: 1,
      refs: [L('13')],
    },
    {
      id: 'dig04-q04',
      topic: 'Clasificación',
      difficulty: 2,
      stem: 'El síndrome de **Gilbert** altera:',
      options: [
        { text: 'La captación: sube la indirecta.', why: 'Correcto: es la forma hereditaria más común.' },
        { text: 'La excreción: sube la directa.', why: 'Eso es Dubin-Johnson / Rotor.' },
        { text: 'La conjugación grave del neonato.', why: 'Eso es Crigler-Najjar.' },
        { text: 'El colédoco.', why: 'No.' },
      ],
      answer: 0,
      refs: [L('11')],
    },
    {
      id: 'dig04-q05',
      topic: 'Courvoisier',
      difficulty: 2,
      emphasis: true,
      stem: 'Hombre de 68 años, ictericia progresiva de meses, pérdida de peso y **vesícula palpable no dolorosa**. Según Courvoisier-Terrier:',
      options: [
        { text: 'Coledocolitiasis.', why: 'La litiasis no distiende la vesícula.' },
        { text: 'Cáncer de cabeza de páncreas hasta que se demuestre lo contrario.', why: 'Correcto.' },
        { text: 'Hepatitis A.', why: 'No.' },
        { text: 'Síndrome de Gilbert.', why: 'No.' },
      ],
      answer: 1,
      refs: [L('13')],
    },
    {
      id: 'dig04-q06',
      topic: 'Courvoisier',
      difficulty: 3,
      stem: '¿Por qué la obstrucción **litiásica** no distiende la vesícula?',
      options: [
        { text: 'Porque el cálculo es pequeño.', why: 'No es la razón.' },
        { text: 'Porque la pared vesicular está fibrosada y no se dilata.', why: 'Correcto.' },
        { text: 'Porque la bilis se reabsorbe.', why: 'No.' },
        { text: 'Porque no hay obstrucción real.', why: 'Sí la hay.' },
      ],
      answer: 1,
      refs: [L('13')],
    },
    {
      id: 'dig04-q07',
      topic: 'Semiología',
      difficulty: 1,
      stem: 'La **pseudoictericia** se diferencia porque:',
      options: [
        { text: 'Tiñe las escleróticas.', why: 'Al revés: las respeta.' },
        { text: 'Respeta la esclerótica y la bilirrubina es normal.', why: 'Correcto.' },
        { text: 'Da coluria.', why: 'No.' },
        { text: 'Es siempre por hemólisis.', why: 'No: carotenos, IRC, fármacos.' },
      ],
      answer: 1,
      refs: [L('10')],
    },
    {
      id: 'dig04-q08',
      topic: 'Semiología',
      difficulty: 2,
      stem: 'Tinte **verdínico** (verde aceituna) orienta a:',
      options: [
        { text: 'Hemólisis.', why: 'Es flavínico.' },
        { text: 'Lesión hepatocelular.', why: 'Es rubínico.' },
        { text: 'Colestasis.', why: 'Correcto.' },
        { text: 'Pseudoictericia.', why: 'No.' },
      ],
      answer: 2,
      refs: [L('12')],
    },
    {
      id: 'dig04-q09',
      topic: 'Laboratorio',
      difficulty: 2,
      stem: 'Transaminasas con **GOT > GPT** sugieren:',
      options: [
        { text: 'Hepatitis viral.', why: 'Ahí GPT > GOT.' },
        { text: 'Hepatitis alcohólica.', why: 'Correcto.' },
        { text: 'Hemólisis.', why: 'No eleva así las transaminasas.' },
        { text: 'Colestasis pura.', why: 'Los marcadores son FA y GGT.' },
      ],
      answer: 1,
      refs: [L('14')],
    },
    {
      id: 'dig04-q10',
      topic: 'Laboratorio',
      difficulty: 3,
      stem: 'Paciente ictérico con tiempo de protrombina prolongado que **corrige** con vitamina K (Koller). Indica:',
      options: [
        { text: 'Lesión hepatocelular grave.', why: 'No corregiría.' },
        { text: 'Colestasis (falta de absorción de vitamina K).', why: 'Correcto.' },
        { text: 'Hemólisis.', why: 'No.' },
        { text: 'Síndrome de Gilbert.', why: 'No altera la coagulación.' },
      ],
      answer: 1,
      refs: [L('14')],
    },
    {
      id: 'dig04-q11',
      topic: 'Laboratorio',
      difficulty: 2,
      stem: 'Son marcadores de **colestasis**:',
      options: [
        { text: 'LDH, reticulocitos, haptoglobina.', why: 'Son de hemólisis.' },
        { text: 'Fosfatasa alcalina, GGT y 5′-nucleotidasa.', why: 'Correcto.' },
        { text: 'GPT y GOT.', why: 'Son de necrosis.' },
        { text: 'Amilasa y lipasa.', why: 'Son pancreáticas.' },
      ],
      answer: 1,
      refs: [L('14')],
    },
    {
      id: 'dig04-q12',
      topic: 'Metabolismo',
      difficulty: 2,
      stem: 'El **kernicterus** se produce por:',
      options: [
        { text: 'Bilirrubina directa en el riñón.', why: 'No.' },
        { text: 'Bilirrubina indirecta en los núcleos de la base del neonato.', why: 'Correcto.' },
        { text: 'Bilirrubina directa en el hígado.', why: 'No.' },
        { text: 'Carotenos en la piel.', why: 'Eso es pseudoictericia.' },
      ],
      answer: 1,
      refs: [L('11')],
    },
  ],

  memory: [
    {
      id: 'dig04-m01',
      title: 'Coluria y acolia',
      purpose: 'Entender sin memorizar.',
      evaluates: [{ t: 'list', items: ['Coluria = directa en la orina', 'Acolia = no llega bilis al intestino'] }],
      interpret: 'Coluria + acolia = obstrucción.',
      mnemonic: { hook: 'La Directa va Derecho a la orina.', explain: 'Solo la directa (hidrosoluble) se filtra; la indirecta viaja pegada a la albúmina.' },
      recall: { q: '¿Por qué la ictericia hemolítica no tiene coluria?', a: 'Porque sube la indirecta, que está unida a la albúmina y no se filtra por el riñón.' },
    },
    {
      id: 'dig04-m02',
      title: 'Los tres tipos',
      purpose: 'La pregunta que más se toma.',
      evaluates: [{ t: 'list', items: ['Pre: indirecta, hipercólicas, flavínica', 'Hepática: mixta, coluria, rubínica', 'Post: directa, coluria + acolia, verdínica'] }],
      interpret: 'Las heces se aclaran a medida que avanzás por el circuito.',
      mnemonic: { hook: 'Heces: OSCURAS → normales → BLANCAS.', explain: 'Pre (más pigmento) · hepática · post (sin bilis).' },
      recall: { q: '¿Cómo son las heces en la ictericia pre, hepática y poshepática?', a: 'Hipercólicas, normocólicas e hipocólicas/acólicas.' },
    },
    {
      id: 'dig04-m03',
      title: 'Grado de ictericia',
      purpose: 'Reconocer el tinte.',
      evaluates: [{ t: 'list', items: ['Flavínica: hemólisis', 'Rubínica: hepatocelular', 'Verdínica: colestasis', 'Melánica: obstructiva crónica'] }],
      interpret: 'Del amarillo pálido al negruzco, según cuánto tiempo y cuánta directa.',
      mnemonic: { hook: 'F-R-V-M: Flavo (amarillo), Rubí (rojo), Verde, Melano (negro).', explain: 'Los nombres son colores en latín/griego.' },
      recall: { q: '¿Qué tinte tiene la ictericia por colestasis?', a: 'Verdínico (verde aceituna).' },
    },
    {
      id: 'dig04-m04',
      title: 'Courvoisier-Terrier',
      purpose: 'Ley clásica de examen.',
      evaluates: [{ t: 'list', items: ['Ictericia progresiva', 'Vesícula palpable no dolorosa', 'Pérdida de peso', '= cáncer de cabeza de páncreas'] }],
      interpret: 'La litiasis no distiende la vesícula (pared fibrosada).',
      mnemonic: { hook: 'Vesícula GRANDE y TRANQUILA = tumor.', explain: 'Grande (distendida) y sin dolor.' },
      recall: { q: 'Enunciá la ley de Courvoisier-Terrier.', a: 'Ictericia progresiva de meses + vesícula palpable no dolorosa + pérdida de peso = cáncer de cabeza de páncreas hasta que se demuestre lo contrario.' },
    },
    {
      id: 'dig04-m05',
      title: 'Marcadores',
      purpose: 'Pedir bien el laboratorio.',
      evaluates: [{ t: 'list', items: ['Hemólisis: LDH, reticulocitos, haptoglobina ↓', 'Necrosis: GPT, GOT', 'Colestasis: FA, GGT, 5′N'] }],
      interpret: 'GPT > GOT viral; GOT > GPT alcohólica.',
      mnemonic: { hook: 'GOT > GPT: «G-O-T = Gin, Otro Trago».', explain: 'Cuando la GOT gana, pensá en alcohol.' },
      recall: { q: '¿Qué marcadores pedís para colestasis?', a: 'Fosfatasa alcalina, GGT y 5′-nucleotidasa (y bilirrubina directa).' },
    },
  ],

  closing: {
    map: {
      center: 'Ictericia en una mirada',
      nodes: [
        { label: 'Circuito', tone: 'sky', items: ['Indirecta + albúmina', 'Captación · conjugación · excreción', 'Directa → coluria'] },
        { label: 'Tipos ★', tone: 'gold', items: ['Pre: indirecta', 'Hepática: mixta', 'Post: directa + acolia'] },
        { label: 'Clínica', tone: 'rose', items: ['F-R-V-M', 'Rascado = colestasis', 'Courvoisier'] },
        { label: 'Laboratorio', tone: 'lilac', items: ['Hemólisis · necrosis · colestasis', 'GOT > GPT = alcohol', 'Koller'] },
      ],
    },
    essentials: [
      'Ictericia: bilirrubina **> 2 mg/dl**; se ve primero en escleróticas y frenillo, con luz natural.',
      '**Indirecta**: unida a albúmina, no da coluria; **directa**: hidrosoluble, da **coluria**.',
      '**Pre** (hemólisis): indirecta, orina parda, heces hipercólicas. **Hepática**: mixta, coluria. **Post**: directa, coluria + **acolia**, prurito.',
      'Tinte: **flavínico, rubínico, verdínico, melánico**.',
      '**Síndrome coledociano**: ictericia + coluria + hipocolia/acolia. **Courvoisier**: vesícula palpable indolora = cáncer de cabeza de páncreas.',
      'Marcadores: hemólisis (LDH, reticulocitos, haptoglobina ↓), necrosis (GPT, GOT), colestasis (FA, GGT, 5′N). Koller.',
    ],
    links: [
      { chapterId: 'dig-11', text: '[[dig-11|Síndromes vesiculares]]: coledocolitiasis, colangitis (Charcot) y Mirizzi.' },
      { chapterId: 'dig-13', text: '[[dig-13|Cirrosis e hipertensión portal]]: ictericia + ascitis.' },
      { chapterId: 'dig-14', text: '[[dig-14|Insuficiencia hepática]]: ictericia, encefalopatía y coagulopatía.' },
    ],
    pitfalls: [
      'Decir que la indirecta produce coluria.',
      'Confundir pseudoictericia (respeta escleras) con ictericia.',
      'Pensar que la litiasis distiende la vesícula (eso es **Courvoisier**: tumor).',
      'Confundir marcadores de colestasis con los de necrosis.',
    ],
    miniExam: [
      {
        id: 'dig04-x01',
        topic: 'Integración',
        difficulty: 2,
        stem: 'Ictericia con coluria, heces normales y GPT de 1800 (GPT > GOT):',
        options: [
          { text: 'Hepatocelular, probable hepatitis viral.', why: 'Correcto.' },
          { text: 'Hemolítica.', why: 'No daría coluria ni transaminasas tan altas.' },
          { text: 'Obstructiva por tumor.', why: 'Daría acolia y FA/GGT altas.' },
          { text: 'Pseudoictericia.', why: 'No.' },
        ],
        answer: 0,
        refs: [L('14'), L('15')],
      },
      {
        id: 'dig04-x02',
        topic: 'Integración',
        difficulty: 2,
        stem: 'El síndrome coledociano está formado por:',
        options: [
          { text: 'Ictericia + coluria + hipocolia/acolia.', why: 'Correcto (± prurito).' },
          { text: 'Fiebre + ictericia + dolor (Charcot).', why: 'Eso es colangitis.' },
          { text: 'Anemia + esplenomegalia + ictericia flavínica.', why: 'Eso es el hemolítico.' },
          { text: 'Ascitis + esplenomegalia + várices.', why: 'Eso es hipertensión portal.' },
        ],
        answer: 0,
        refs: [L('13')],
      },
    ],
  },

  escenas,
  diagrams: {},
};

export default chapter;
