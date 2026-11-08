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
      ch('digestivo', 'dig-03', 'Diarrea, constipación y trastornos anorrectales', 'MC III · Tubo digestivo bajo', 'Diarrea alta y baja, síndrome disentérico, criterios de Roma, escala de Bristol, pujo y tenesmo.', 'MC Digestivo 5–6'),
      ch('digestivo', 'dig-04', 'Ictericia', 'Repaso clave', 'Metabolismo de la bilirrubina e ictericias pre, intra y poshepáticas: el profesor insiste en repasarla.', 'MC Digestivo 6 · Libro p10–15'),
      ch('digestivo', 'dig-05', 'Examen físico del aparato digestivo', 'Examen físico', 'Topografía, inspección, auscultación, percusión y palpación; maniobras de hígado, bazo y vesícula.', 'EF Digestivo 1–2 · Libro p356–367 · Pizarras'),
      ch('digestivo', 'dig-06', 'Síndrome esofágico', 'Tubo digestivo', 'Disfagia, pirosis, ERGE, acalasia y cáncer de esófago.', 'Clase Sd. esofágico · Libro p368–372'),
      ch('digestivo', 'dig-07', 'Síndrome ulceroso y gastritis', 'Tubo digestivo', 'Úlcera péptica, Helicobacter pylori, AINEs y gastritis.', 'Clases Sd. ulceroso 1–3'),
      ch('digestivo', 'dig-08', 'Síndrome pilórico e íleo', 'Tubo digestivo', 'Obstrucción del vaciamiento gástrico e íleo mecánico y paralítico.', 'Clases Sd. pilórico · Íleo'),
      ch('digestivo', 'dig-09', 'Malabsorción e intestino irritable', 'Tubo digestivo', 'Síndrome de malabsorción, enfermedad celíaca y síndrome de intestino irritable.', 'Clases Malabsorción 1–2 · SII'),
      ch('digestivo', 'dig-10', 'Peritonitis', 'Emergencias', 'Peritonitis primaria, secundaria y terciaria; semiología de la irritación peritoneal.', 'Clases Peritonitis 1–2'),
      ch('digestivo', 'dig-11', 'Síndromes vesiculares', 'Vías biliares', 'Litiasis biliar, cólico biliar, colecistitis y colangitis.', 'Clase Síndromes vesiculares'),
      ch('digestivo', 'dig-12', 'Hemorragias digestivas', 'Emergencias', 'Hemorragia digestiva alta y baja, clasificaciones y conducta.', 'Clases Hemorragias 1–2'),
      ch('digestivo', 'dig-13', 'Cirrosis e hipertensión portal', 'Hígado', 'Fisiopatología de la cirrosis, Child-Pugh y manifestaciones de la hipertensión portal.', 'Clases Cirrosis 1–2 · HTP 1–2'),
      ch('digestivo', 'dig-14', 'Insuficiencia hepática', 'Hígado', 'Insuficiencia hepática aguda y crónica, encefalopatía y estigmas.', 'Clase Insuficiencia hepática'),
      ch('digestivo', 'dig-15', 'Pancreatitis aguda', 'Páncreas', 'Etiología, clínica, criterios diagnósticos y de gravedad.', 'Clases Pancreatitis 1–2'),
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
      ch('renal', 'ren-01', 'Motivos de consulta nefrourológicos', 'Motivos de consulta', 'Edema, alteraciones de la diuresis y del aspecto de la orina, dolor y síntomas miccionales.', 'MC Renal 1–2 · Libro p445–458'),
      ch('renal', 'ren-02', 'Examen físico nefrourológico', 'Examen físico', 'Palpación renal (Guyon, Israel, Montenegro), puntos ureterales y puñopercusión.', 'MC Renal 3 · Libro p459–460'),
      ch('renal', 'ren-03', 'Síndrome nefrítico', 'Síndromes', 'Inflamación glomerular: hematuria, HTA, edema y oliguria.', 'Clase Sd. nefrítico'),
      ch('renal', 'ren-04', 'Síndrome nefrótico', 'Síndromes', 'Barrera de filtración, proteinuria masiva, hipoalbuminemia, edema y dislipemia.', 'Clase Sd. nefrótico · Libro p440–444'),
      ch('renal', 'ren-05', 'Insuficiencia renal', 'Síndromes', 'Insuficiencia renal aguda y crónica: causas, estadios y manifestaciones.', 'Clases IR 1–3 · Libro p429–439'),
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
