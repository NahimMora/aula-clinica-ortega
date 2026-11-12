/**
 * Registro de fuentes. Solo contiene rótulos y metadatos: los archivos originales
 * (grabaciones, transcripciones, libro, fotos) NO se publican y viven en `sources/` (fuera de Git).
 * La correspondencia exacta archivo ↔ id está en docs/progress/SOURCES.md.
 */
export interface SourceInfo {
  id: string;
  label: string;
  kind: 'clase' | 'libro' | 'pizarra' | 'video-maniobras';
  system?: string;
}

const clase = (id: string, label: string, system: string): SourceInfo => ({ id, label, kind: 'clase', system });

export const SOURCES: Record<string, SourceInfo> = Object.fromEntries(
  [
    // Digestivo — motivos de consulta y examen físico
    clase('mc-dig-1', 'Clase MC Digestivo · parte 1', 'digestivo'),
    clase('mc-dig-2', 'Clase MC Digestivo · parte 2', 'digestivo'),
    clase('mc-dig-3', 'Clase MC Digestivo · parte 3', 'digestivo'),
    clase('mc-dig-4', 'Clase MC Digestivo · parte 4', 'digestivo'),
    clase('mc-dig-5', 'Clase MC Digestivo · parte 5', 'digestivo'),
    clase('mc-dig-6', 'Clase MC Digestivo · parte 6', 'digestivo'),
    clase('ef-dig-1', 'Clase Examen físico digestivo · parte 1', 'digestivo'),
    clase('ef-dig-2', 'Clase Examen físico digestivo · parte 2', 'digestivo'),
    // Digestivo — síndromes del tubo digestivo
    clase('sd-esof', 'Clase Síndrome esofágico', 'digestivo'),
    clase('sd-ulc-1', 'Clase Síndrome ulceroso y gastritis · parte 1', 'digestivo'),
    clase('sd-ulc-2', 'Clase Síndrome ulceroso y gastritis · parte 2', 'digestivo'),
    clase('sd-ulc-3', 'Clase Síndrome ulceroso y gastritis · parte 3', 'digestivo'),
    clase('sd-pil', 'Clase Síndrome pilórico', 'digestivo'),
    clase('ileo', 'Clase Íleo', 'digestivo'),
    clase('malabs-1', 'Clase Síndrome de malabsorción · parte 1', 'digestivo'),
    clase('malabs-2', 'Clase Síndrome de malabsorción · parte 2', 'digestivo'),
    clase('sii', 'Clase Síndrome de intestino irritable', 'digestivo'),
    // Digestivo — hígado, páncreas, vías biliares, emergencias
    clase('perit-1', 'Clase Peritonitis · parte 1', 'digestivo'),
    clase('perit-2', 'Clase Peritonitis · parte 2', 'digestivo'),
    clase('vesic', 'Clase Síndromes vesiculares', 'digestivo'),
    clase('hd-1', 'Clase Hemorragias digestivas · parte 1', 'digestivo'),
    clase('hd-2', 'Clase Hemorragias digestivas · parte 2', 'digestivo'),
    clase('cirr-1', 'Clase Cirrosis · parte 1', 'digestivo'),
    clase('cirr-2', 'Clase Cirrosis · parte 2', 'digestivo'),
    clase('htp-1', 'Clase Hipertensión portal · parte 1', 'digestivo'),
    clase('htp-2', 'Clase Hipertensión portal · parte 2', 'digestivo'),
    clase('ih', 'Clase Insuficiencia hepática', 'digestivo'),
    clase('pa-1', 'Clase Pancreatitis aguda · parte 1', 'digestivo'),
    clase('pa-2', 'Clase Pancreatitis aguda · parte 2', 'digestivo'),
    // Nefrourológico
    clase('mc-ren-1', 'Clase MC Renal · parte 1', 'renal'),
    clase('mc-ren-2', 'Clase MC Renal · parte 2', 'renal'),
    clase('ef-ren', 'Clase MC Renal · parte 3 (examen físico)', 'renal'),
    clase('nefritico', 'Clase Síndrome nefrítico', 'renal'),
    clase('nefrotico', 'Clase Síndrome nefrótico', 'renal'),
    clase('ir-1', 'Clase Insuficiencia renal · parte 1', 'renal'),
    clase('ir-2', 'Clase Insuficiencia renal · parte 2', 'renal'),
    clase('ir-3', 'Clase Insuficiencia renal · parte 3', 'renal'),
    clase('itu-1', 'Clase Infección urinaria · parte 1', 'renal'),
    clase('itu-2', 'Clase Infección urinaria · parte 2', 'renal'),
    clase('lit-1', 'Clase Litiasis renoureteral · parte 1', 'renal'),
    clase('lit-2', 'Clase Litiasis renoureteral · parte 2', 'renal'),
    // Sistema nervioso
    clase('mc-neu-1', 'Clase MC Neurología · parte 1', 'neuro'),
    clase('mc-neu-2', 'Clase MC Neurología · parte 2', 'neuro'),
    clase('mc-neu-3', 'Clase MC Neurología · parte 3', 'neuro'),
    clase('mc-neu-4', 'Clase MC Neurología · parte 4', 'neuro'),
    clase('pc-1', 'Clase Pares craneales · parte 1', 'neuro'),
    clase('pc-2', 'Clase Pares craneales · parte 2', 'neuro'),
    clase('pc-3', 'Clase Pares craneales · parte 3', 'neuro'),
    clase('pc-4', 'Clase Pares craneales · parte 4', 'neuro'),
    clase('pc-5', 'Clase Pares craneales · parte 5', 'neuro'),
    clase('pc-6', 'Clase Pares craneales · parte 6', 'neuro'),
    clase('sn-1', 'Clase Síndromes del SN · parte 1', 'neuro'),
    clase('sn-2', 'Clase Síndromes del SN · parte 2', 'neuro'),
    clase('sn-3', 'Clase Síndromes del SN · parte 3', 'neuro'),
    clase('sn-4', 'Clase Síndromes del SN · parte 4', 'neuro'),
    clase('sn-5', 'Clase Síndromes del SN · parte 5', 'neuro'),
    clase('sn-6', 'Clase Síndromes del SN · parte 6', 'neuro'),
    clase('sn-7', 'Clase Síndromes del SN · parte 7', 'neuro'),
    clase('neu-rec-1026', 'Grabación neurología (26/10)', 'neuro'),
    clase('neu-meet-1024', 'Grabación neurología (24/10, Meet)', 'neuro'),
    clase('meningeo-osteo', 'Clase signos meníngeos y osteoarticular (audio)', 'soma'),
    clase('repaso-pato', 'Clase de repaso', 'general'),
    clase('repaso-1111', 'Clase de repaso para el parcial (11/11)', 'general'),
    { id: 'pizarra-repaso', label: 'Pizarras del repaso (11/11)', kind: 'pizarra' },
    clase('oral-1011', 'Oral del martes 10/11 (relato de compañeras)', 'general'),
    // Otras fuentes
    { id: 'libro', label: 'Libro Clínica Médica I (2023) — L. Ortega', kind: 'libro' },
    { id: 'pizarra', label: 'Fotos de pizarra (clases prácticas)', kind: 'pizarra' },
    { id: 'argente', label: 'Video de maniobras — Semiología Médica (Argente-Álvarez)', kind: 'video-maniobras' },
    { id: 'argente-libro', label: 'Argente-Álvarez, Semiología Médica', kind: 'libro' },
  ].map((s): [string, SourceInfo] => [s.id, s as SourceInfo]),
);

export function sourceLabel(id: string): string {
  return SOURCES[id]?.label ?? id;
}
