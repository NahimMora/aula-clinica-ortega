import type { Chapter, ChapterMeta, SystemMeta } from '@/types';

/**
 * Programa completo de la plataforma. El orden sigue la secuencia pedagógica de las clases.
 * `status: 'published'` solo se usa cuando el capítulo está completo, probado y desplegado.
 * Los capítulos se cargan de forma diferida desde content/chapters/<id>/index.tsx.
 */
const ch = (
  systemId: string,
  id: string,
  title: string,
  short: string,
  blurb: string,
  sourcesLabel: string,
  status: ChapterMeta['status'] = 'soon',
): ChapterMeta => ({ id, systemId, title, short, blurb, sourcesLabel, status });

export const SYSTEMS: SystemMeta[] = [
  {
    id: 'digestivo',
    title: 'Sistema digestivo',
    subtitle: 'Motivos de consulta, examen físico y grandes síndromes',
    tone: 'rose',
    icon: 'stomach',
    description:
      'La unidad que el profesor define como una de las más preguntadas en parciales y finales: motivos de consulta, examen físico, síndromes del tubo digestivo, hígado, páncreas, vías biliares y emergencias.',
    pdf: 'pdf/manual-digestivo.pdf',
    chapters: [
      ch('digestivo', 'dig-01', 'Vómitos, disfagia y dispepsia', 'MC I · Tubo digestivo alto', 'Tipos de vómito, hematemesis vs hemoptisis, Mallory-Weiss, acalasia y signos de alarma: lo que toma el profe.', 'MC Digestivo 1–2 · Hemorragias 1 · Libro', 'published'),
      ch('digestivo', 'dig-02', 'Dolor abdominal y abdomen agudo', 'MC II · Dolor abdominal', 'Dolor visceral, somático y referido; los cinco abdómenes agudos quirúrgicos, Murphy, Jobert, Cullen y Grey-Turner.', 'MC Digestivo 2–4', 'published'),
      ch('digestivo', 'dig-03', 'Diarrea, constipación y trastornos anorrectales', 'MC III · Tubo digestivo bajo', 'Diarrea alta y baja, síndrome disentérico, criterios de Roma, escala de Bristol, pujo y tenesmo.', 'MC Digestivo 5–6', 'published'),
      ch('digestivo', 'dig-04', 'Ictericia', 'Repaso clave', 'Metabolismo de la bilirrubina e ictericias pre, intra y poshepáticas: el profesor insiste en repasarla.', 'MC Digestivo 6 · Libro p10–15', 'published'),
      ch('digestivo', 'dig-05', 'Examen físico del aparato digestivo', 'Examen físico', 'Topografía, inspección, auscultación, percusión y palpación; ascitis, puntos dolorosos, hígado, bazo y vesícula con video.', 'EF Digestivo 1–2 · Pizarras · Video Argente', 'published'),
      ch('digestivo', 'dig-06', 'Síndrome esofágico', 'Tubo digestivo', 'Los cinco síntomas, etiologías, ERGE y Barrett, acalasia, cáncer y cómo se estudia el esófago.', 'Clase Sd. esofágico · Libro p368–369', 'published'),
      ch('digestivo', 'dig-07', 'Síndrome ulceroso y gastritis', 'Tubo digestivo', 'Úlcera péptica, Helicobacter pylori y AINE, complicaciones y gastritis A vs B.', 'Clases Sd. ulceroso 1–3 · Libro p370–372', 'published'),
      ch('digestivo', 'dig-08', 'Síndrome pilórico e íleo', 'Tubo digestivo', 'Obstrucción del vaciamiento gástrico (vómito, bazuqueo, SNG, VEDA) e íleo paralítico vs mecánico.', 'Clases Sd. pilórico · Íleo · Libro p375–377', 'published'),
      ch('digestivo', 'dig-09', 'Malabsorción e intestino irritable', 'Tubo digestivo', 'Fases de la malabsorción, esteatorrea, Van de Kamer y D-xilosa; intestino irritable y criterios de Roma.', 'Clases Malabsorción 1–2 · SII · Libro p378–382', 'published'),
      ch('digestivo', 'dig-10', 'Peritonitis', 'Emergencias', 'Plastrón, peritonitis primaria (PBE), secundaria y terciaria; paracentesis y más de 250 neutrófilos.', 'Clases Peritonitis 1–2 · Libro p383', 'published'),
      ch('digestivo', 'dig-11', 'Síndromes vesiculares', 'Vías biliares', 'El viaje del cálculo: litiasis, cólico, colecistitis, Mirizzi, coledocolitiasis, Charcot y pancreatitis biliar.', 'Clase Síndromes vesiculares · Libro p385–387', 'published'),
      ch('digestivo', 'dig-12', 'Hemorragias digestivas', 'Emergencias', 'Clases I a IV, ortostatismo, alta vs baja (úlcera vs hemorroides), melena, hematoquecia y estudios.', 'Clases Hemorragias 1–2 · Libro p389–390', 'published'),
      ch('digestivo', 'dig-13', 'Cirrosis e hipertensión portal', 'Hígado', 'Cirrosis, estigmas y Child-Pugh (BATEA); hipertensión portal, colaterales, ascitis y GASA.', 'Clases Cirrosis 1–2 · HTP 1–2', 'published'),
      ch('digestivo', 'dig-14', 'Insuficiencia hepática', 'Hígado', 'Qué deja de hacer el hígado, O’Grady, encefalopatía hepática (amoníaco, asterixis) y aguda vs crónica.', 'Clase Insuficiencia hepática', 'published'),
      ch('digestivo', 'dig-15', 'Pancreatitis aguda', 'Páncreas', 'La bilis que vuelve: causas, hemicinturón, Cullen y Grey-Turner, hemoconcentración, Ranson y Balthazar.', 'Clases Pancreatitis 1–2', 'published'),
    ],
  },
  {
    id: 'renal',
    title: 'Sistema nefrourológico',
    subtitle: 'Motivos de consulta, examen físico y síndromes renales',
    tone: 'sky',
    icon: 'kidney',
    description: 'Del motivo de consulta al síndrome: edema, alteraciones de la orina, síndromes nefrítico y nefrótico, insuficiencia renal, infección urinaria y litiasis.',
    pdf: 'pdf/manual-renal.pdf',
    chapters: [
      ch('renal', 'ren-01', 'Motivos de consulta nefrourológicos', 'Motivos de consulta', 'Edema renal, obstrucción urinaria, poliuria, hematuria (dismórfica vs isomórfica, tres vasos) y trastornos de la micción.', 'MC Renal 1–2 · Libro p445–454', 'published'),
      ch('renal', 'ren-02', 'Examen físico nefrourológico', 'Examen físico', 'El paciente con proteinuria, los colores de la orina y el examen: Guyon, Montenegro, Israel, Glenard, puñopercusión y puntos ureterales.', 'MC Renal 3 · Libro p459–460', 'published'),
      ch('renal', 'ren-03', 'Síndrome nefrítico', 'Síndromes', 'Capilares que se rompen: las 3 H (hematuria, HTA, hiperazoemia), postestreptocócica y complicaciones.', 'Clase Sd. nefrítico · Libro p442–444', 'published'),
      ch('renal', 'ren-04', 'Síndrome nefrótico', 'Síndromes', 'Membrana basal permeable: proteinuria > 3,5 g, hipoalbuminemia, edema e hiperlipidemia; causas por edad y el círculo del edema.', 'Clase Sd. nefrótico · Libro p440–442', 'published'),
      ch('renal', 'ren-05', 'Insuficiencia renal', 'Síndromes', 'Aguda (RIFLE/AKIN, prerrenal/renal/posrenal, sodio urinario) y crónica (hiperfiltración, estadios, síndrome urémico).', 'Clases IR 1–3 · Libro p429–439', 'published'),
      ch('renal', 'ren-06', 'Infección urinaria', 'Síndromes', 'Cistitis, pielonefritis, diagnóstico y sedimento urinario.', 'Clases ITU 1–2 · Libro p420–428'),
      ch('renal', 'ren-07', 'Litiasis renoureteral', 'Síndromes', 'Cólico renal: mecanismo, clínica y diagnóstico.', 'Clases Litiasis 1–2'),
    ],
  },
  {
    id: 'neuro',
    title: 'Sistema nervioso',
    subtitle: 'Motivos de consulta, pares craneales y síndromes neurológicos',
    tone: 'lilac',
    icon: 'brain',
    description: 'Motivos de consulta neurológicos, examen de los pares craneales y los grandes síndromes: piramidal, segunda motoneurona, extrapiramidal, cerebeloso, meníngeo e hipertensión endocraneana.',
    pdf: 'pdf/manual-neuro.pdf',
    chapters: [
      ch('neuro', 'neu-01', 'Motivos de consulta neurológicos I', 'Motivos de consulta', 'Primer bloque de motivos de consulta neurológicos (orden provisional, se ajusta al analizar las clases).', 'MC Neurología 1–2'),
      ch('neuro', 'neu-02', 'Motivos de consulta neurológicos II', 'Motivos de consulta', 'Segundo bloque de motivos de consulta neurológicos.', 'MC Neurología 3–4'),
      ch('neuro', 'neu-03', 'Pares craneales I', 'Pares craneales', 'Nombre, función, origen aparente, examen y alteraciones (primeros pares).', 'Pares craneales 1–3 · Pizarras'),
      ch('neuro', 'neu-04', 'Pares craneales II', 'Pares craneales', 'Facial, vestibulococlear, glosofaríngeo, vago, espinal e hipogloso.', 'Pares craneales 4–6 · Pizarras'),
      ch('neuro', 'neu-05', 'Motilidad y síndromes motores', 'Síndromes', 'Piramidal, segunda motoneurona, extrapiramidal y cerebeloso: la tabla comparativa de la pizarra.', 'Síndromes del SN · Libro p461–509 · Pizarras'),
      ch('neuro', 'neu-06', 'Otros síndromes neurológicos', 'Síndromes', 'Sensibilidad, síndrome meníngeo e hipertensión endocraneana.', 'Síndromes del SN · Libro p481–506'),
    ],
  },
  {
    id: 'maniobras',
    title: 'Examen físico y maniobras',
    subtitle: 'Biblioteca práctica: cada maniobra en su fragmento exacto de video',
    tone: 'mint',
    icon: 'hand',
    description: 'Maniobras organizadas por aparato, región y objetivo, con el fragmento exacto del video de referencia, técnica, hallazgos e interpretación.',
    pdf: 'pdf/guia-maniobras.pdf',
    chapters: [
      ch('maniobras', 'man-dig', 'Maniobras del examen digestivo', 'Digestivo', 'Inspección, auscultación, percusión y palpación del abdomen; hígado, bazo y vesícula.', 'Video Argente 19–27 · EF Digestivo · Pizarras'),
      ch('maniobras', 'man-ren', 'Maniobras del examen renal', 'Renal', 'Palpación renal y puntos dolorosos.', 'Video Argente 28 · MC Renal 3'),
      ch('maniobras', 'man-neu', 'Maniobras del examen neurológico', 'Neurología', 'Pares craneales, motilidad, reflejos, sensibilidad, taxia y signos meníngeos.', 'Video Argente 29–35 · Pizarras'),
    ],
  },
  {
    id: 'soma',
    title: 'Soma',
    subtitle: 'Examen osteoarticulomuscular práctico',
    tone: 'peach',
    icon: 'bone',
    description: 'Enfoque esencialmente práctico: técnica, ejecución e interpretación de las maniobras osteoarticulares.',
    chapters: [
      ch('soma', 'soma-01', 'Maniobras osteoarticulares', 'Soma', 'Columna, hombro, codo, muñeca, cadera, rodilla y tobillo.', 'Video Argente 4 · Clase meníngeo y osteo · Pizarras'),
    ],
  },
];

const loaders = import.meta.glob<{ default: Chapter }>('./chapters/*/index.tsx');

export function chapterLoader(id: string): (() => Promise<{ default: Chapter }>) | undefined {
  return loaders[`./chapters/${id}/index.tsx`];
}

export const ALL_CHAPTERS: ChapterMeta[] = SYSTEMS.flatMap((s) => s.chapters);

export function findChapter(id: string): ChapterMeta | undefined {
  return ALL_CHAPTERS.find((c) => c.id === id);
}

export function findSystem(id: string): SystemMeta | undefined {
  return SYSTEMS.find((s) => s.id === id);
}

/** Un capítulo solo se ofrece como disponible si está marcado como publicado y su contenido existe. */
export function isAvailable(c: ChapterMeta): boolean {
  return c.status === 'published' && Boolean(chapterLoader(c.id));
}

export function publishedChapters(): ChapterMeta[] {
  return ALL_CHAPTERS.filter(isAvailable);
}

export function neighbours(id: string): { prev?: ChapterMeta; next?: ChapterMeta } {
  const list = ALL_CHAPTERS;
  const i = list.findIndex((c) => c.id === id);
  return { prev: i > 0 ? list[i - 1] : undefined, next: i >= 0 && i < list.length - 1 ? list[i + 1] : undefined };
}
