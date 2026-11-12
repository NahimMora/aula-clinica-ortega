import type { SourceRef } from '@/types';
import type { SistemaParcial, TemaParcial } from './tipos';

/** Repaso del 11/11: minuto de la grabación. */
const R = (t: string, note?: string): SourceRef => ({ src: 'repaso-1111', t, note });
/** Pizarras del repaso. */
const PZ: SourceRef = { src: 'pizarra-repaso' };
const ORAL: SourceRef = { src: 'oral-1011' };

export const FECHA_PARCIAL = 'lunes 16/11';

export const SISTEMAS_PARCIAL: { id: SistemaParcial; titulo: string; corto: string; tono: string; icono: string }[] = [
  { id: 'digestivo', titulo: 'Aparato digestivo', corto: 'Digestivo', tono: 'rose', icono: 'stomach' },
  { id: 'renal', titulo: 'Aparato renal', corto: 'Renal', tono: 'sky', icono: 'kidney' },
  { id: 'neuro', titulo: 'Sistema nervioso', corto: 'Neurología', tono: 'lilac', icono: 'brain' },
  { id: 'soma', titulo: 'SOMA', corto: 'SOMA', tono: 'peach', icono: 'bone' },
];

/** Cómo quiere que se responda (repaso del 11/11 y oral del 10/11). */
export const COMO_RESPONDER = {
  reglas: [
    { t: 'Empezá siempre por la definición', d: '«Siempre comiencen por una definición… es imperdonable que no sepan definir algo.» Si definís bien, demostrás que sabés dónde estás parado.', ref: R('07:39') },
    { t: 'Después: clasificación, etiologías y clínica', d: 'Es el orden que escribió en la pizarra de renal: **Definición · Clasificación · Etiologías · Clínica**. De las etiologías, la **más frecuente**.', ref: PZ },
    { t: 'No hables de cualquier cosa', d: '«Que sepan dónde están parados, que no empiecen a hablar de cualquier cosa.» Lo que agregás de más abre preguntas que quizás no sabés contestar y te pone nervioso.', ref: R('11:44') },
    { t: 'Es Semiología: nada de tratamiento', d: '«Ustedes están viendo semiología: no quiero que se me vayan a meter en cómo hacer un diagnóstico y tratamiento de la enfermedad.» Signos, síntomas, mecanismo y examen físico.', ref: R('07:05') },
    { t: 'Sabé la fisiología para explicar la clínica', d: '«Para saber la clínica tienen que saber cuáles son las funciones normales.» Si te repregunta «¿por qué?», la respuesta está en qué función se perdió.', ref: R('23:25') },
    { t: 'Las preguntas son puntuales', d: 'En el oral del 10/11 pidió tríadas, causas más frecuentes y maniobras **con su nombre**. «Cosas puntuales, cosas de clase.»', ref: R('00:28') },
  ],
  niveles: [
    { n: 1, t: 'Respuesta oral directa', d: 'Una o dos frases, solo lo que preguntó: si pide una definición, la definición; si pide la causa más frecuente, la causa.' },
    { n: 2, t: 'Fundamento', d: 'Si dice «¿por qué?», «¿cómo se produce?» o «¿de dónde viene?»: el mecanismo (fisiología → qué se altera → qué signo aparece).' },
    { n: 3, t: 'Repreguntas e integración', d: 'Hacia dónde puede llevarte: la complicación, el otro síndrome con el que se compara, el signo del examen físico y la maniobra.' },
  ],
};

/** Lo que dijo que no toma o que quedó fuera de la pizarra del parcial. */
export const EXCLUIDOS: { sistema: SistemaParcial; temas: string[]; nota: string; ref?: SourceRef }[] = [
  {
    sistema: 'digestivo',
    temas: ['Vómitos y náuseas', 'Dispepsia', 'Diarrea, constipación y anorrectal', 'Síndrome pilórico e íleo', 'Malabsorción e intestino irritable', 'Síndrome esofágico como síndrome completo', 'Insuficiencia hepática como tema propio'],
    nota: 'No están en la pizarra de digestivo del repaso. Sí quedan como base: la hematemesis (dentro de hemorragia), la acalasia (dentro de disfagia), la encefalopatía hepática y la PBE (complicaciones de la cirrosis) y la estenosis pilórica (complicación de la úlcera).',
    ref: PZ,
  },
  {
    sistema: 'renal',
    temas: ['Infección urinaria', 'Litiasis renoureteral', 'Motivos de consulta renales (poliuria, hematuria, tres vasos) como tema propio', 'Diagnóstico y tratamiento'],
    nota: 'La pizarra de renal tiene solo nefrótico, nefrítico, IRA y ERC. La hematuria y la proteinuria se estudian dentro de los síndromes; el examen físico renal (Guyon, puñopercusión, puntos) entra por maniobras.',
    ref: PZ,
  },
  {
    sistema: 'neuro',
    temas: ['Otros motivos de consulta: deterioro cognitivo, mareo y vértigo, movimientos involuntarios, debilidad, convulsiones, trastornos del sueño'],
    nota: 'De los motivos de consulta dejó solo **cefalea** y **estado de conciencia**. El resto de la pizarra es examen físico (pares craneales, motilidad, reflejos) y síndromes: piramidal, extrapiramidal, HTE, meníngeo y cerebeloso. El temblor y la rigidez entran dentro del extrapiramidal y el cerebeloso.',
    ref: PZ,
  },
  {
    sistema: 'soma',
    temas: ['Teoría de enfermedades osteoarticulares'],
    nota: 'SOMA es solo examen físico: maniobras de columna, miembro superior y miembro inferior.',
    ref: R('03:54'),
  },
];

export const TEMAS: TemaParcial[] = [
  /* ═══════════════════════ DIGESTIVO ═══════════════════════ */
  {
    id: 'ictericia',
    sistema: 'digestivo',
    titulo: 'Ictericia',
    prioridad: 'critico',
    porque: 'Está en la pizarra del parcial y es el primer ejemplo que dio de cómo pregunta: «la definición de ictericia». En el repaso volvió sobre la clasificación (pre, hepática y poshepática), el **marcador de laboratorio de cada tipo** y el **síndrome de Gilbert**. Hay que saberla de memoria: metabolismo, clasificación, causas, laboratorio y examen.',
    fuentes: [PZ, R('00:36'), R('42:53'), R('54:34', 'Marcadores por tipo'), R('55:44', 'Gilbert')],
    pide: [
      '**Definición** y valor de corte (bilirrubina > 2 mg/dl).',
      '**Metabolismo** de la bilirrubina: indirecta → hepatocito → directa → bilis.',
      '**Clasificación** pre, intra y poshepática con la bilirrubina que sube en cada una.',
      '**Causas** de cada tipo; las hereditarias: Gilbert, Crigler-Najjar, Dubin-Johnson y Rotor.',
      '**Laboratorio**: patrón hepatocelular (GPT/GOT) frente a colestásico (FAL, GGT).',
      'Síndrome coledociano, Courvoisier-Terrier y examen físico.',
    ],
    diapos: [
      { cap: 'dig-04', ids: ['f-circuito', 'f-coluria', 'f-escleras', 'f-pre', 'f-hepatica', 'f-post', 'f-courvoisier', 'f-koller'] },
      { cap: 'dig-04', ids: ['t-definicion', 't-pseudo', 't-indirecta-directa'] },
      { cap: 'parcial', ids: ['p-ict-metabolismo'] },
      { cap: 'dig-04', ids: ['t-kernicterus', 't-clasificacion', 't-causas-pre'] },
      { cap: 'parcial', ids: ['p-ict-hereditarias'] },
      { cap: 'dig-04', ids: ['t-causas-post', 't-acompanantes', 't-tinte', 't-examen', 't-coledociano', 't-courvoisier', 't-marcadores'] },
      { cap: 'parcial', ids: ['p-ict-patron'] },
      { cap: 'dig-04', ids: ['t-koller'] },
      { cap: 'dig-11', ids: ['f-sin-ictericia', 't-ictericia-dolor'] },
    ],
    maniobras: ['higado-monomanual-cuchara', 'higado-bimanual', 'hepatometria', 'vesicula-murphy'],
    memoria: [
      { gancho: 'Pre = indirecta · Pos = directa', explica: 'Lo que pasa **antes** del hepatocito sube la que todavía no se conjugó; lo que pasa **después**, la que ya se conjugó.' },
      { gancho: 'Coluria = directa', explica: 'Solo la directa es hidrosoluble y se filtra: si hay coluria, hay bilirrubina **directa** alta (hepática o poshepática).' },
      { gancho: 'Gilbert capta · Crigler conjuga · Dubin y Rotor excretan', explica: 'Ordenadas como los pasos del metabolismo.' },
    ],
    quedate: [
      'Ictericia: coloración **amarilla de piel y mucosas** por bilirrubina **> 2 mg/dl** (normal hasta 1).',
      'Prehepática (hemólisis) → **indirecta**, sin coluria, heces hipercólicas.',
      'Hepática → indirecta o directa, **transaminasas** altas.',
      'Poshepática (obstrucción) → **directa**, **coluria**, **acolia**, prurito, **FAL y GGT** altas.',
      'Síndrome coledociano: **ictericia + coluria + acolia**.',
    ],
    capitulos: ['dig-04', 'dig-11'],
  },
  {
    id: 'abdomen-agudo',
    sistema: 'digestivo',
    titulo: 'Abdomen agudo: los cinco tipos',
    prioridad: 'critico',
    porque: '«La pregunta más fácil: los cinco tipos de abdomen agudo.» Y no alcanza con nombrarlos: pidió **qué es cada uno**, sus causas y el examen físico. Advirtió que no se confunda con el dolor abdominal.',
    fuentes: [PZ, R('40:00'), R('41:04'), R('42:10'), R('43:24')],
    pide: [
      '**Definición** de abdomen agudo y diferencia con dolor abdominal.',
      'Los **cinco tipos**: inflamatorio, obstructivo, perforativo, hemorrágico y vascular (isquémico).',
      'Para cada uno: **qué es**, **causas** (tres de cada uno, la más frecuente primero), **mecanismo** y **examen físico**.',
      'Signos: Blumberg, Gueneau de Mussy, Rovsing, psoas, Jobert, Cullen y Grey-Turner, matidez.',
    ],
    diapos: [
      { cap: 'dig-02', ids: ['f-hojas', 'f-apendicitis', 'f-maniobra', 'f-contractura', 'f-lucha', 'f-paralitico', 'f-aire', 'f-peritonitis', 'f-sangre', 'f-hipovolemia', 'f-isquemia'] },
      { cap: 'parcial', ids: ['p-aa-def'] },
      { cap: 'dig-02', ids: ['t-sindrome', 't-clasificacion', 't-cinco', 't-cuadro5', 't-itis', 't-cronologia', 't-triada', 't-estadios', 't-colecistitis', 't-examen-inflamatorio', 't-blumberg'] },
      { cap: 'parcial', ids: ['p-aa-inflamatorio'] },
      { cap: 'dig-02', ids: ['t-obstructivo', 't-obstructivo-clinica', 't-mecanico-paralitico'] },
      { cap: 'parcial', ids: ['p-aa-obstructivo'] },
      { cap: 'dig-02', ids: ['t-perforativo', 't-perforativo-clinica', 't-contractura', 't-jobert', 't-popper'] },
      { cap: 'parcial', ids: ['p-aa-perforativo'] },
      { cap: 'dig-02', ids: ['t-hemorragico', 't-matidez', 't-cullen', 't-aire-sangre'] },
      { cap: 'parcial', ids: ['p-aa-hemorragico'] },
      { cap: 'dig-02', ids: ['t-vascular', 't-hora-oro'] },
      { cap: 'parcial', ids: ['p-aa-vascular'] },
    ],
    maniobras: ['puntos-dolorosos-abdomen', 'descompresion-blumberg', 'palpacion-superficial-tension', 'abd-percusion-traube', 'abd-auscultacion-rha', 'abd-inspeccion-estatica-dinamica'],
    memoria: [
      { gancho: 'I-O-P-H-V', explica: '**I**nflamatorio, **O**bstructivo, **P**erforativo, **H**emorrágico, **V**ascular. Del más frecuente (inflamatorio) al más letal (vascular).' },
      { gancho: 'Aire → Jobert · Sangre → matidez', explica: 'Si hay aire libre desaparece la matidez del hígado; si hay sangre libre aparece matidez en flancos.' },
    ],
    quedate: [
      'Abdomen agudo: **síndrome** de dolor abdominal agudo que suele requerir **cirugía de urgencia**.',
      'Cinco tipos: **inflamatorio** (apendicitis), **obstructivo** (bridas, hernias, tumores), **perforativo** (úlcera perforada), **hemorrágico** (ectópico, aneurisma) y **vascular** (embolia mesentérica).',
      'Inflamatorio: Blumberg · obstructivo: RHA de lucha · perforativo: tabla y Jobert · hemorrágico: hipovolemia y matidez · vascular: dolor que no calma.',
    ],
    capitulos: ['dig-02', 'dig-10'],
  },
  {
    id: 'dolor-abdominal',
    sistema: 'digestivo',
    titulo: 'Dolor abdominal',
    prioridad: 'obligatorio',
    porque: 'Está en la pizarra junto con el abdomen agudo («Dolor abd. + AA»), pero avisó: «el dolor abdominal no es lo mismo que el abdomen agudo, no se confundan».',
    fuentes: [PZ, R('43:24')],
    pide: ['Tipos de dolor: **visceral**, **somático (parietal)** y **referido**, con su mecanismo.', 'Cómo se semiografía el dolor (**ALICIA**).', 'Diferencia con el abdomen agudo.'],
    diapos: [
      { cap: 'dig-02', ids: ['f-via', 'f-fibras', 'f-visceral', 'f-bilateral', 'f-somatico', 'f-referido', 't-visceral', 't-somatico', 't-rebote', 't-referido', 't-tres', 't-duracion', 't-ecg', 't-alicia', 't-acompanantes', 't-regiones'] },
    ],
    maniobras: ['puntos-dolorosos-abdomen', 'palpacion-superficial-tension'],
    quedate: [
      'Visceral: fibras **C**, mal localizado, en la línea media, con síntomas vegetativos.',
      'Somático: fibras **A-delta**, del peritoneo parietal, bien localizado, aumenta con el movimiento.',
      'Referido: lejos del órgano, porque las aferencias **convergen** en el mismo segmento medular.',
      'Dolor supraumbilical agudo: **ECG** (infarto de cara inferior).',
    ],
    capitulos: ['dig-02'],
  },
  {
    id: 'hemorragia',
    sistema: 'digestivo',
    titulo: 'Hemorragia digestiva e hipovolemia',
    prioridad: 'obligatorio',
    porque: 'En la pizarra. En el oral del 10/11 la tomó («excelente» a la que la respondió completa) y en el repaso volvió: «hemorragia digestiva alta, decime tres causas», cómo saber si sigue sangrando sin endoscopía y el cuadro de hipovolemia, que «no es para la hemorragia digestiva, es para explicar la hipovolemia: son dos cosas muy diferentes».',
    fuentes: [PZ, ORAL, R('44:05'), R('44:44'), R('45:02')],
    pide: [
      '**Definición**; alta o baja según el **ángulo de Treitz**.',
      '**Causas** de HDA (úlcera péptica primero) y de HDB.',
      'Manifestaciones: hematemesis, melena, hematoquecia, enterorragia.',
      '**Hipovolemia**: el cuadro de clases I a IV (pérdida, FC, PA, FR, diuresis, estado mental) y el **ortostatismo**.',
      'Sin endoscopía: la **sonda nasogástrica**.',
    ],
    diapos: [
      { cap: 'dig-12', ids: ['f-compensa', 'f-ortostatismo', 'f-melena', 'f-hematocrito', 'f-urea', 't-intro', 't-treitz', 't-hda-causas', 't-hdb-causas', 't-hematemesis', 't-melena-hq', 't-formas-baja', 't-comparar', 't-tabla', 't-hipovolemia', 't-ortostatismo', 't-examen', 't-lab', 't-endoscopia', 't-forrest'] },
      { cap: 'parcial', ids: ['p-hd-aclaro'] },
      { cap: 'dig-01', ids: ['t-hemat-hemop', 't-mallory'] },
    ],
    maniobras: ['tacto-rectal'],
    memoria: [{ gancho: 'I-II-III-IV ≈ 15-30-40 %', explica: 'Pérdida < 15 %, 15–30 %, 30–40 % y > 40 % del volumen. La PA recién cae en la clase **III**: antes compensa la taquicardia.' }],
    quedate: [
      'Alta: proximal al **ángulo de Treitz** → hematemesis o melena. Causa más frecuente: **úlcera péptica**.',
      'Baja: distal al Treitz → hematoquecia o enterorragia.',
      'Hipovolemia: clase I < 15 % · II 15–30 % (taquicardia) · III 30–40 % (**hipotensión**) · IV > 40 %.',
      'Ortostatismo positivo: cae la TAS > 20 o la TAD > 10 mmHg, o sube la FC > 30, al pararse.',
    ],
    capitulos: ['dig-12'],
  },
  {
    id: 'cirrosis',
    sistema: 'digestivo',
    titulo: 'Cirrosis e hipertensión portal',
    prioridad: 'obligatorio',
    porque: 'En la pizarra («Cirrosis e HTP»). En el repaso: «cirrosis e hipertensión portal, **completito**, todo lo que yo tengo, completito», y la relacionó con la PBE del nefrótico: «al igual que la cirrosis». En sus clases avisó que Child-Pugh se sabe «como el Padre Nuestro… el que no se sepa esto, lo bochan».',
    fuentes: [PZ, R('47:37'), R('31:35'), { src: 'cirr-2', t: '07:14' }],
    pide: [
      '**Definición** (fibrosis + nódulos de regeneración que alteran la arquitectura).',
      '**Etiologías**: alcohol, hepatitis B y C, hígado graso, autoinmunes.',
      'Las tres manifestaciones: **insuficiencia hepática**, **hipertensión portal** y estigmas.',
      '**Child-Pugh** (BATEA).',
      'Hipertensión portal: definición, causas pre/intra/poshepáticas, **circulación colateral**, **várices**, **ascitis** y **esplenomegalia**.',
      'Complicaciones: HDA por várices, **PBE**, encefalopatía.',
    ],
    diapos: [
      { cap: 'dig-13', ids: ['f-porta', 'f-cirrosis', 'f-funcion', 'f-colaterales', 'f-ascitis', 'f-bazo', 'f-direccion', 't-def', 't-tres', 't-etiologia', 't-alcoholica', 't-compensada', 't-piel', 't-chvostek', 't-child', 't-child-grados', 't-htp-def', 't-htp-causas', 't-colaterales', 't-varices', 't-direccion', 't-bazo', 't-ascitis', 't-ascitis-examen', 't-paracentesis', 't-liquido'] },
      { cap: 'parcial', ids: ['p-cir-complicaciones'] },
      { cap: 'dig-14', ids: ['f-amonio', 't-encefalopatia', 't-grados'] },
      { cap: 'dig-10', ids: ['f-pbe', 't-pbe'] },
    ],
    maniobras: ['ascitis-maniobras', 'abd-inspeccion-estatica-dinamica', 'higado-bimanual', 'higado-monomanual-cuchara', 'hepatometria', 'bazo-decubito-dorsal', 'bazo-schuster', 'abd-percusion-traube'],
    memoria: [{ gancho: 'BATEA', explica: '**B**ilirrubina, **A**lbúmina, **T**iempo de protrombina, **E**ncefalopatía, **A**scitis. 5–6 puntos = A · 7–9 = B · 10–15 = C.' }],
    quedate: [
      'Cirrosis: fibrosis difusa con **nódulos de regeneración** que destruye la arquitectura del hígado; **irreversible**.',
      'Causa más frecuente: **alcohol** (y las hepatitis virales B y C).',
      'HTP: presión portal > 10–12 mmHg; da **colaterales, várices, ascitis y esplenomegalia**.',
      'Child-Pugh: **BATEA**.',
    ],
    capitulos: ['dig-13', 'dig-14'],
  },
  {
    id: 'peritonitis',
    sistema: 'digestivo',
    titulo: 'Peritonitis',
    prioridad: 'obligatorio',
    porque: 'En la pizarra. En el repaso: «otro tema que estoy preguntando: peritonitis», completa (definición y clasificación). En clase: «plastrón y estos tres, sí o sí me tienen que saber».',
    fuentes: [PZ, R('46:55'), { src: 'perit-1', t: '06:17' }],
    pide: ['**Definición**.', '**Clasificación**: localizada (plastrón) o generalizada; **primaria (PBE)**, **secundaria** y **terciaria**.', 'Clínica y examen físico: Blumberg, Gueneau de Mussy, Jobert.', 'Paracentesis: > 250 neutrófilos.'],
    diapos: [
      { cap: 'dig-10', ids: ['f-normal', 'f-plastron', 'f-generalizada', 'f-pbe', 'f-perforacion', 'f-jobert', 'f-descompresion', 't-def', 't-plastron', 't-clasificacion', 't-tres', 't-pbe', 't-secundaria', 't-clinica', 't-facies', 't-examen', 't-jobert', 't-blumberg', 't-paracentesis'] },
    ],
    maniobras: ['descompresion-blumberg', 'palpacion-superficial-tension', 'abd-percusion-traube', 'ascitis-maniobras'],
    quedate: [
      'Peritonitis: **inflamación del peritoneo**, casi siempre infecciosa.',
      'Primaria (PBE): **sin perforación**, monomicrobiana, en el **cirrótico** con ascitis (y en el nefrótico); > 250 neutrófilos.',
      'Secundaria (la más frecuente): **perforación** o infección de una víscera; polimicrobiana; quirúrgica.',
      'Terciaria: persistente o **iatrogénica** (postoperatoria).',
    ],
    capitulos: ['dig-10'],
  },
  {
    id: 'ulcera-gastritis',
    sistema: 'digestivo',
    titulo: 'Úlcera péptica y gastritis',
    prioridad: 'obligatorio',
    porque: 'En la pizarra («Úlcera péptica – Gastritis»). En el repaso contó que preguntó la **causa más frecuente** de la úlcera («ante la duda, siempre es esta»: el H. pylori) y aclaró que **Forrest es de la úlcera**, no de la hemorragia digestiva. En el oral del 10/11 pidió Zollinger-Ellison.',
    fuentes: [PZ, R('45:40'), R('46:01'), R('46:30'), ORAL],
    pide: ['Úlcera: **definición**, localización, las dos causas más frecuentes (**H. pylori** y **AINE**) y su mecanismo.', '**Complicaciones**: hemorragia (la más frecuente), perforación, estenosis pilórica.', 'Gastritis: definición, aguda/crónica, **tipo A y tipo B**.', 'Zollinger-Ellison.'],
    diapos: [
      { cap: 'dig-07', ids: ['f-defensa', 'f-aine', 'f-hp', 'f-ulcera', 'f-zollinger', 'f-autoinmune', 't-clasificacion', 't-localizacion', 't-etiologia', 't-otras-causas', 't-clinica', 't-gastrica-duodenal', 't-diagnostico', 't-complicaciones', 't-gastritis', 't-ab', 't-gastritis-clinica'] },
    ],
    maniobras: ['puntos-dolorosos-abdomen', 'bazuqueo-gastrico'],
    quedate: [
      'Úlcera: pérdida de sustancia de la mucosa que **atraviesa la muscular de la mucosa** (la erosión no la atraviesa).',
      'Causas: **H. pylori** y **AINE** (inhiben las prostaglandinas que protegen la mucosa).',
      'Complicación más frecuente: **hemorragia digestiva alta**; después perforación y estenosis pilórica.',
      'Gastritis A: **autoinmune**, fondo y cuerpo, anemia perniciosa · B: **H. pylori**, antro.',
    ],
    capitulos: ['dig-07'],
  },
  {
    id: 'pancreatitis',
    sistema: 'digestivo',
    titulo: 'Pancreatitis aguda',
    prioridad: 'obligatorio',
    porque: 'No está en la pizarra, pero cuando se la preguntaron en el repaso la confirmó: **qué es** la pancreatitis y **la causa más frecuente**, y avisó que se mezcla con la colecistitis y el signo de Murphy («estas cosas se pueden mezclar»).',
    fuentes: [R('51:59'), R('53:20'), { src: 'pa-1', t: '01:56' }],
    pide: ['**Definición** (autodigestión).', '**Causas más frecuentes**: litiasis biliar y alcohol.', 'Clínica: dolor en **hemicinturón**, vómitos, Cullen y Grey-Turner.', 'Criterios: **Ranson** (y Balthazar, tomográfico).'],
    diapos: [
      { cap: 'dig-15', ids: ['f-acino', 'f-causas', 'f-difusion', 'f-hemoconcentracion', 'f-calcio', 't-def', 't-causas', 't-formas', 't-dolor', 't-vomitos-abdomen', 't-cullen', 't-sistemicas', 't-lab', 't-ranson', 't-balthazar'] },
      { cap: 'dig-11', ids: ['t-pancreatitis-ampolla'] },
    ],
    maniobras: ['puntos-dolorosos-abdomen'],
    quedate: [
      'Pancreatitis aguda: inflamación del páncreas por **activación precoz de sus enzimas** (autodigestión).',
      'Causas: **litiasis biliar** (1.ª) y **alcohol** (2.ª): el 80 %.',
      'Dolor epigástrico en **hemicinturón** o en barra, irradiado a la espalda; vómitos.',
      'Cullen y Grey-Turner: sangrado **retroperitoneal** (no son patognomónicos).',
    ],
    capitulos: ['dig-15'],
  },
  {
    id: 'disfagia',
    sistema: 'digestivo',
    titulo: 'Disfagia',
    prioridad: 'obligatorio',
    porque: 'Es el primer motivo de consulta de la pizarra de digestivo del parcial.',
    fuentes: [PZ],
    pide: ['**Definición** (dificultad para tragar) y lo que no es disfagia (odinofagia, globo).', 'Clasificación: **orofaríngea** y **esofágica**; la esofágica, **mecánica** o **motora**.', 'Causas de cada una; **acalasia**.', 'Examen físico de la disfagia.'],
    diapos: [
      { cap: 'dig-01', ids: ['f-deglucion', 'f-orofaringea', 'f-muro-motor', 'f-acalasia', 't-disfagia', 't-dos-disfagias', 't-orofaringea', 't-orofaringea-causas', 't-esofagica', 't-mecanica-motora', 't-causas-esofagicas', 't-diferencial', 't-acalasia', 't-examen-disfagia', 't-estudios-disfagia', 't-algoritmo'] },
    ],
    maniobras: ['boca-orofaringe', 'ganglios-supraclaviculares'],
    quedate: [
      'Disfagia: **dificultad** para el paso del bolo de la boca al estómago.',
      'Orofaríngea (no lo puede pasar de la boca; tos, regurgitación nasal: **neurológica**) o esofágica (se le traba después).',
      'Mecánica: primero **sólidos**, progresiva (cáncer) · motora: **sólidos y líquidos** desde el inicio (acalasia).',
    ],
    capitulos: ['dig-01', 'dig-06'],
  },
  {
    id: 'ef-digestivo',
    sistema: 'digestivo',
    titulo: 'Examen físico digestivo y puntos dolorosos',
    prioridad: 'critico',
    porque: 'En el repaso: «la idea es pasar y decirme qué punto doloroso es este» en el maniquí; nombró los cinco apendiculares y preguntó los pancreáticos y biliares. En el oral del 10/11 pidió maniobras de hígado, bazo y riñón **por su nombre**. En clase: los apendiculares «como la palma de la mano».',
    fuentes: [R('37:31'), R('37:59'), R('38:30'), PZ, ORAL, { src: 'ef-dig-2', t: '19:27' }],
    pide: ['Reconocer en el maniquí los **puntos apendiculares** (McBurney, Cope, Morris, Lanz, Lecene) y los **pancreáticos y biliares**.', 'Signos: **Blumberg**, **Gueneau de Mussy**, **Rovsing**, **psoas**.', 'Maniobras de **hígado** (Chauffard, Güemes, Mathieu, Gilbert), **bazo** (Schuster, Naegeli, Merlo, Galambos) y **vesícula** (Murphy).'],
    fisioJunto: true,
    diapos: [
      { cap: 'dig-05', ids: ['t-topografia', 't-orden', 'f-orden', 't-apendiculares', 't-pancreaticos', 't-otros-puntos', 't-tension', 'f-inspiracion', 't-higado', 't-higado-como', 'f-bazo', 't-bazo', 't-vesicula', 't-ascitis', 't-maniobras-ascitis', 't-traube', 't-chapoteo'] },
    ],
    maniobras: ['puntos-dolorosos-abdomen', 'descompresion-blumberg', 'higado-monomanual-cuchara', 'higado-bimanual', 'hepatometria', 'bazo-decubito-dorsal', 'bazo-schuster', 'vesicula-murphy', 'ascitis-maniobras', 'abd-percusion-traube', 'bazuqueo-gastrico'],
    quedate: [
      'McBurney: línea **ombligo–espina ilíaca anterosuperior derecha**, unión del **tercio externo** con los dos tercios internos.',
      'Blumberg: dolor a la **descompresión** brusca, **localizado** · Gueneau de Mussy: **generalizado**.',
      'Hígado bimanual: **Chauffard** (peloteo), **Güemes** (sostén), **Mathieu** (enganche), **Gilbert**.',
      'Murphy: el dolor **corta la inspiración** profunda (colecistitis).',
    ],
    capitulos: ['dig-05'],
  },

  /* ═══════════════════════ RENAL ═══════════════════════ */
  {
    id: 'funciones-renales',
    sistema: 'renal',
    titulo: 'Funciones normales del riñón (la base de la clínica)',
    prioridad: 'obligatorio',
    porque: '«Para saber la clínica tienen que saber cuáles son las funciones normales… si saben las funciones normales van a saber las funciones alteradas.» Las repasó una por una: eritropoyetina, calcio-fósforo, vitamina D, presión arterial (renina), agua, sodio, potasio y pH.',
    fuentes: [R('23:25'), R('24:31'), R('25:25'), R('27:27'), R('28:23'), R('29:00'), R('33:43')],
    pide: ['Cada función y **qué pasa cuando se pierde** (es la clínica de la insuficiencia renal).', 'Cómo se estima el filtrado glomerular (fórmulas).'],
    diapos: [
      { cap: 'parcial', ids: ['p-ren-funciones-1', 'p-ren-funciones-2'] },
      { cap: 'ren-05', ids: ['f-consecuencias', 'f-anemia', 'f-hueso', 't-calcio', 't-anemia'] },
    ],
    quedate: [
      'Cada signo de la insuficiencia renal es **una función que se perdió**.',
      'Sin eritropoyetina → anemia · sin vitamina D activa → hipocalcemia → hiperparatiroidismo secundario.',
      'Sin eliminar potasio → **hiperpotasemia** (lo más peligroso: arritmias).',
      'Sin eliminar H⁺ → **acidosis metabólica**.',
    ],
    capitulos: ['ren-05'],
  },
  {
    id: 'nefrotico',
    sistema: 'renal',
    titulo: 'Síndrome nefrótico',
    prioridad: 'critico',
    porque: 'Primero en la pizarra de renal. En el repaso: «¿qué complicaciones puede tener un paciente con síndrome nefrótico? **Una pregunta que yo le voy a hacer en el examen**», y dedicó varios minutos al razonamiento: por qué pierde proteínas, por qué se infecta (IgG y complemento), por qué hace **trombosis** (antitrombina III) y la causa más frecuente según la edad. En el oral del 10/11 preguntó su tríada y la causa primaria principal.',
    fuentes: [PZ, R('11:52'), R('13:13'), R('29:20'), R('30:42'), R('32:36'), ORAL],
    pide: [
      '**Definición** (proteinuria > 3,5 g/24 h + hipoalbuminemia + edema; ± hiperlipidemia y lipiduria).',
      'Primario o **secundario** y qué significa cada uno.',
      '**Causa más frecuente**: en general la **diabetes**; primaria en el niño **cambios mínimos**, en el adulto **membranosa**.',
      'Fisiopatología del **edema**.',
      '**Complicaciones** con su porqué: infecciones (PBE), trombosis, aterosclerosis.',
    ],
    diapos: [
      { cap: 'ren-04', ids: ['f-barrera', 'f-circulo', 'f-trombosis', 'f-infecciones', 't-def', 't-primarias', 't-causas', 't-diabetes', 't-fisio'] },
      { cap: 'parcial', ids: ['p-nefrotico-razon'] },
      { cap: 'ren-04', ids: ['t-clinica', 't-complicaciones'] },
      { cap: 'parcial', ids: ['p-nefrotico-complicaciones'] },
      { cap: 'ren-03', ids: ['t-vs-nefrotico'] },
    ],
    maniobras: ['rinon-guyon', 'punopercusion-lumbar'],
    memoria: [{ gancho: 'Nefr-ÓTICO = PROTEÍNAS', explica: 'Nefrótico: se escapan proteínas (> 3,5 g). Nefrítico: se rompe el capilar y pasa **sangre** (hematuria).' }],
    quedate: [
      'Nefrótico: **proteinuria > 3,5 g/24 h**, **hipoalbuminemia < 3 g/dl**, **edema**, ± hiperlipidemia y lipiduria.',
      'Causa más frecuente: **diabetes** (secundaria). Primaria: niño **cambios mínimos**, adulto **membranosa**.',
      'Se infecta porque pierde **IgG y complemento** (PBE) y se trombosa porque pierde **antitrombina III**.',
    ],
    capitulos: ['ren-04'],
  },
  {
    id: 'nefritico',
    sistema: 'renal',
    titulo: 'Síndrome nefrítico',
    prioridad: 'obligatorio',
    porque: 'En la pizarra. Lo usó para mostrar cómo encadena preguntas (tríada → «¿qué más tiene además de las 3 H?» → «el paciente no está orinando bien… ¿de dónde viene?»). «Al nefrítico siempre pregunto la definición, la causa más frecuente y la complicación más severa»: la **postestreptocócica** (niños) y la **insuficiencia renal aguda**. En el oral del 10/11 preguntó la tríada y la causa principal.',
    fuentes: [PZ, R('08:07'), R('09:23'), R('11:31'), R('13:13'), R('31:35'), ORAL],
    pide: ['**Definición** (inflamación glomerular: el capilar se rompe).', 'La tríada: **hematuria, HTA, hiperazoemia** (las 3 H) con edema y oliguria.', 'Causa más frecuente: **glomerulonefritis postestreptocócica** (niño; 1–3 semanas después de una faringitis o impétigo).', '**Complicaciones**.', 'Diferencias con el nefrótico.'],
    diapos: [
      { cap: 'ren-03', ids: ['f-inmuno', 'f-pared', 'f-cascada', 't-def', 't-tres-h'] },
      { cap: 'parcial', ids: ['p-nefritico-cadena'] },
      { cap: 'ren-03', ids: ['t-clinica', 't-vs-nefrotico', 't-postestreptococica', 't-causas', 't-lab', 't-complicaciones'] },
    ],
    maniobras: ['rinon-guyon', 'punopercusion-lumbar'],
    quedate: [
      'Nefrítico: **inflamación glomerular** con rotura de capilares.',
      'Las **3 H**: **hematuria**, **hipertensión** e **hiperazoemia** (+ oliguria y edema).',
      'Causa más frecuente: **postestreptocócica**, en **niños**.',
      'Complicación más severa (lo que él pide): la **insuficiencia renal aguda**, por la oliguria. Además, edema agudo de pulmón y encefalopatía hipertensiva.',
    ],
    capitulos: ['ren-03'],
  },
  {
    id: 'ira',
    sistema: 'renal',
    titulo: 'Insuficiencia (lesión) renal aguda',
    prioridad: 'critico',
    porque: 'En la pizarra con sus criterios: «**RIFLE / AKIN**» y «**Pre / Renal / Post**», y debajo **Definición · Clasificación · Etiologías · Clínica**. Preguntó: «¿cuál es la causa más frecuente? La prerrenal». En sus clases: «criterios que siempre deben saber… para toda su vida como médico».',
    fuentes: [PZ, R('14:57'), R('21:13'), R('21:25'), { src: 'ir-1', t: '12:23' }],
    pide: ['**Definición** (caída brusca del filtrado: horas o días, reversible).', '**Clasificación**: prerrenal, renal y posrenal.', '**Etiologías** de cada una; la **más frecuente: prerrenal**.', '**Criterios RIFLE y AKIN** con sus valores.', 'Clínica (oliguria, azoemia, hiperpotasemia, acidosis, sobrecarga).'],
    diapos: [
      { cap: 'ren-05', ids: ['f-donde', 'f-sodio', 'f-consecuencias', 't-def', 't-rifle', 't-akin', 't-causas'] },
      { cap: 'parcial', ids: ['p-ira-donde'] },
      { cap: 'ren-05', ids: ['t-sodio', 't-episodio', 't-ira-clinica', 't-aguda-cronica'] },
    ],
    maniobras: ['punopercusion-lumbar', 'puntos-renoureterales'],
    memoria: [{ gancho: 'RIFLE = Riesgo · Injuria · Fallo · Loss · End', explica: 'Los tres primeros por creatinina ×1,5 / ×2 / ×3 (o diuresis < 0,5 ml/kg/h por 6 y 12 h, < 0,3 por 24 h); Loss > 4 semanas; End > 3 meses.' }],
    quedate: [
      'IRA: caída **brusca** (horas o días) del filtrado, con retención de urea y creatinina; potencialmente **reversible**.',
      'Pre (la **más frecuente**: hipoperfusión) · renal (NTA) · pos (obstrucción).',
      'RIFLE: creatinina ×1,5 / ×2 / ×3; AKIN: estadios 1–3 (sube ≥ 0,3 mg/dl en 48 h).',
    ],
    capitulos: ['ren-05'],
  },
  {
    id: 'erc',
    sistema: 'renal',
    titulo: 'Enfermedad renal crónica e indicaciones de diálisis',
    prioridad: 'critico',
    porque: 'En la pizarra con los valores: **FG > 120 ml/min** normal, **G1 > 90 · G2 60–90 · G3a 45–60 · G3b 30–45 · G4 15–30 · G5 < 15 → HD**, y al lado las indicaciones de diálisis **A-E-I-O-U** con sus números. Lo dictó en clase y preguntó «¿cuánto es el filtrado normal?».',
    fuentes: [PZ, R('15:15'), R('15:56'), R('17:53'), R('18:35'), R('19:00'), R('20:16')],
    pide: ['**Definición** (> 3 meses, irreversible).', '**Clasificación KDIGO** por filtrado, con el **3a y 3b**.', 'Filtrado normal (≈ 120 ml/min).', 'Causas: **diabetes**, HTA, glomerulopatías.', '**Indicaciones de hemodiálisis (AEIOU)** con sus valores y el porqué de cada una.', 'Complicaciones: anemia, hueso, hiperpotasemia, acidosis, uremia.'],
    fisioJunto: true,
    diapos: [
      { cap: 'ren-05', ids: ['t-irc', 't-estadios'] },
      { cap: 'parcial', ids: ['p-erc-kdigo'] },
      { cap: 'ren-05', ids: ['t-irc-clinica', 'f-hueso', 't-calcio', 'f-anemia', 't-anemia', 't-aguda-cronica'] },
      { cap: 'parcial', ids: ['p-erc-aeiou'] },
    ],
    memoria: [
      { gancho: '90 · 60 · 45 · 30 · 15', explica: 'Los cortes de los estadios, de G1 a G5. El 3 se parte en **45**.' },
      { gancho: 'A-E-I-O-U', explica: 'Acidosis (pH < 7,1 · HCO₃ < 15) · Electrolitos (K > 7) · Intoxicación · Overload refractario · Uremia (urea > 200).' },
    ],
    quedate: [
      'ERC: pérdida **progresiva e irreversible** de la función renal por **más de 3 meses**.',
      'Causas: **nefropatía diabética** (1.ª) y **hipertensiva** (2.ª).',
      'KDIGO: G1 > 90 · G2 60–90 · **G3a 45–60 · G3b 30–45** · G4 15–30 · **G5 < 15 (diálisis)**.',
      'Diálisis de urgencia: **AEIOU**.',
    ],
    capitulos: ['ren-05'],
  },
  {
    id: 'ef-renal',
    sistema: 'renal',
    titulo: 'Examen físico renal y puntos dolorosos',
    prioridad: 'obligatorio',
    porque: 'En el oral del 10/11 pidió «cualquier maniobra de riñón» en el maniquí. En el repaso, los puntos dolorosos entran en la misma consigna: «¿qué punto doloroso es este?».',
    fuentes: [ORAL, R('37:41'), { src: 'ef-ren' }],
    pide: ['Palpación renal: **Guyon** (peloteo), **Montenegro**, **Israel**, **Glenard**.', '**Puñopercusión** (Giordano).', 'Puntos **renoureterales**: ureteral superior y medio; renales posteriores **costovertebral** y **costomuscular**.'],
    fisioJunto: true,
    diapos: [
      { cap: 'ren-02', ids: ['f-guyon', 't-guyon', 't-otras', 't-percusion', 't-general'] },
    ],
    maniobras: ['rinon-guyon', 'rinon-montenegro', 'rinon-israel', 'rinon-glenard', 'punopercusion-lumbar', 'puntos-renoureterales'],
    quedate: [
      'Guyon: una mano en la fosa lumbar empuja (peloteo) y la otra, adelante, recibe el riñón en la **inspiración**.',
      'Puñopercusión positiva: dolor → **pielonefritis**, litiasis, hidronefrosis.',
      'Costovertebral: ángulo de la **12.ª costilla con la columna**. Costomuscular: 12.ª costilla con el **borde externo de los músculos lumbares**.',
    ],
    capitulos: ['ren-02'],
  },

  /* ═══════════════════════ NEUROLOGÍA ═══════════════════════ */
  {
    id: 'pares',
    sistema: 'neuro',
    titulo: 'Pares craneales I a XII',
    prioridad: 'critico',
    porque: 'En el repaso, dentro del examen físico («el examen físico, todo»): de cada par, «¿cómo se llama? ¿cuál es su función?», su **origen** y cómo se explora. Preguntó qué par se afecta en el **síndrome piramidal** (el VII) y cómo se evalúa el **campo visual**. En el oral del 10/11 **bochó a varios** por no saber el XI. En sus clases: «es un par para bochar al alumno» (VIII), «lo van a bochar de una» (IV).',
    fuentes: [R('01:03:30'), R('01:03:55'), R('01:07:17'), R('01:08:07'), ORAL, { src: 'pc-3', t: '09:49' }, { src: 'pc-5', t: '01:02' }],
    pide: ['Para cada par: **nombre · función · tipo · origen real y aparente · examen físico · alteraciones**.', '¿Qué par se afecta en el **síndrome piramidal**? El **VII** (parálisis facial central). ¿Y en la **HTE**? El **VI**.', 'Vía óptica y **campimetría** por confrontación; músculos del III, IV y VI.', 'Parálisis facial central y periférica; Weber y Rinne; signo de la cortina; desviación de la lengua.'],
    fisioJunto: true,
    diapos: [
      { cap: 'neu-03', ids: ['t-clasif', 't-origen', 'f-olfato', 't-olfatorio', 't-olfato-alt', 't-optico', 'f-via', 't-via', 'f-campos', 't-hemianopsias', 't-cuadrantes', 't-explora-ii', 't-musculos', 'f-iii', 't-iii', 't-iv-vi', 't-diplopia', 'f-fotomotor', 't-pupila', 't-nistagmo'] },
      { cap: 'neu-04', ids: ['t-trigemino', 't-trigemino-nucleos', 'f-facial', 't-facial', 't-paralisis-facial', 't-viii', 'f-weber', 't-hipoacusia', 't-vestibular', 't-ix-x', 'f-lengua', 't-xi-xii'] },
    ],
    maniobras: ['par-olfatorio', 'campo-visual-confrontacion', 'fondo-de-ojo', 'motilidad-ocular', 'reflejos-pupilares', 'trigemino-sensibilidad', 'reflejo-corneano', 'facial-mimica', 'weber-rinne', 'glosofaringeo-vago', 'espinal', 'hipogloso'],
    memoria: [
      { gancho: 'Motores: III, IV, VI, XI, XII · Sensoriales: I, II, VIII · Mixtos: V, VII, IX, X', explica: 'Los oculomotores, el espinal y el hipogloso son puramente motores.' },
      { gancho: 'Origen: I-II hemisferios · III-IV mesencéfalo · V-VIII protuberancia · IX-XII bulbo', explica: 'De a pares bajando por el tronco (el VI, VII y VIII salen por el surco bulboprotuberancial).' },
      { gancho: 'LR6 SO4', explica: 'Recto lateral (externo) → VI; oblicuo superior → IV; el resto → III.' },
    ],
    quedate: [
      'El **I** es el único sensorial que no pasa por el tálamo.',
      'III: ojo **abajo y afuera**, ptosis y midriasis · IV: ojo alto, diplopía al bajar escaleras · VI: ojo **adentro** (el par de la **HTE**).',
      'VII central respeta la **frente**; periférico (Bell) paraliza toda la hemicara.',
      'X: úvula hacia el lado **sano** · XII: lengua hacia el lado **lesionado** · XI: ECM y trapecio contra resistencia.',
    ],
    capitulos: ['neu-03', 'neu-04'],
  },
  {
    id: 'conciencia',
    sistema: 'neuro',
    titulo: 'Estado de conciencia y escala de Glasgow',
    prioridad: 'critico',
    porque: 'En la pizarra («Estado de conciencia» con los rangos **15/15 · 13–14 · 11–12 · 9–10 · < 8**). En el oral del 10/11 preguntó Glasgow y «muchos no la sabían». En el repaso lo explicó largo: nivel y contenido, vigil no es lúcido.',
    fuentes: [PZ, ORAL, R('58:07'), R('58:45'), R('59:03'), R('01:00:01'), R('01:02:02'), R('01:02:36')],
    pide: ['**Definición** de estado de conciencia y sus dos partes: **nivel** y **contenido**.', 'Escala de **Glasgow**: componentes, puntajes (3 a 15) e interpretación.', 'Grados del nivel: vigil, somnolencia, obnubilación, estupor, coma, y cómo responde a los estímulos.', 'Contenido: orientación en **tiempo, espacio y persona**; **lucidez** y **confusión**.'],
    diapos: [
      { cap: 'parcial', ids: ['p-conc-def', 'p-conc-sraa', 'p-conc-glasgow', 'p-conc-rangos', 'p-conc-lucido'] },
      { cap: 'neu-01', ids: ['t-conciencia'] },
      { cap: 'dig-14', ids: ['t-grados'] },
    ],
    memoria: [{ gancho: 'O4 · V5 · M6', explica: 'Ojos hasta 4, verbal hasta 5, motor hasta 6: 4 + 5 + 6 = 15. El mínimo es 3 (1 + 1 + 1), nunca 0.' }],
    quedate: [
      'Conciencia = **nivel** (despierto: Glasgow) + **contenido** (orientado en tiempo, espacio y persona).',
      'Glasgow: ocular 4 + verbal 5 + motor 6 → **3 a 15**; **≤ 8 = coma**.',
      'Pizarra: 15 vigil · 13–14 somnoliento · 11–12 obnubilado · 9–10 estupor · < 8 coma.',
      '**Vigil no es lúcido**: lúcido = vigil y orientado.',
    ],
    capitulos: ['neu-01'],
  },
  {
    id: 'cefalea',
    sistema: 'neuro',
    titulo: 'Cefalea',
    prioridad: 'obligatorio',
    porque: 'Es el **único motivo de consulta** neurológico que dejó en la pizarra del parcial. En el repaso pidió las características de la **tensional**, la **migraña con y sin aura** y las otras cefaleas primarias.',
    fuentes: [PZ, R('01:13:20')],
    pide: ['**Definición** y por dónde viaja el dolor (trigémino → tálamo).', 'Clasificación: **primarias** y **secundarias**.', 'Migraña (con y sin aura; más frecuente en mujeres), tensional, en racimos; neuralgia del trigémino.', 'Signos de alarma: cefalea secundaria (HTE, meningitis, hemorragia).'],
    fisioJunto: true,
    diapos: [
      { cap: 'neu-01', ids: ['t-cefalea', 'f-via', 'f-talamo', 't-talamo', 't-clasif', 'f-migrana', 't-migrana', 't-migrana-mujer', 't-aura', 't-tensional', 't-tensional-formas', 'f-cluster', 't-racimos', 't-neuralgia', 't-comparar'] },
    ],
    quedate: [
      'Cefalea: dolor en el cráneo; el cerebro no duele: duelen **meninges, vasos y nervios** (trigémino).',
      'Primarias: **migraña** (hemicraneal, pulsátil, con náuseas, fotofobia; mujeres), **tensional** (la más frecuente, en casco), **en racimos** (hombres, periorbitaria, con lagrimeo).',
      'Secundarias: síntoma de otra enfermedad (HTE, meningitis, hemorragia subaracnoidea, tumor).',
    ],
    capitulos: ['neu-01'],
  },
  {
    id: 'piramidal',
    sistema: 'neuro',
    titulo: 'Motilidad y síndrome piramidal',
    prioridad: 'obligatorio',
    porque: 'En la pizarra (Sd. piramidal). En el repaso: «¿qué se encuentra al examen físico en un paciente con síndrome piramidal?… tienen que saber la motilidad», las maniobras de oposición (fuerza) y los traveses de dedo (tono). En el oral del 10/11 preguntó **motilidad** y «nadie la supo responder».',
    fuentes: [PZ, R('01:06:42'), R('01:06:53'), R('01:09:17'), ORAL],
    pide: ['Examen de la motilidad según su pizarra: **activa** (voluntaria: fuerza; involuntaria: movimientos automáticos medulares y reflejos) y **pasiva** (tono y trofismo).', 'Síndrome piramidal: qué encontrás al examen; 1.ª y 2.ª motoneurona; Babinski, clonus, hiperreflexia, espasticidad en navaja.', '¿Qué par craneal se afecta en el piramidal? El **VII** (parálisis facial central).', 'La tabla comparativa de los síndromes motores.'],
    fisioJunto: true,
    diapos: [
      { cap: 'parcial', ids: ['p-mot-pizarra'] },
      { cap: 'neu-05', ids: ['t-piramidal', 'f-via-piramidal', 't-piramidal-signos', 't-navaja', 'f-espasticidad', 't-hemiplejias', 't-topografia', 'f-alterna', 't-weber', 't-segunda', 't-mononeuropatias'] },
      { cap: 'neu-02', ids: ['f-motoneurona', 't-debilidad', 't-decusacion', 'f-guillain', 't-guillain'] },
      { cap: 'parcial', ids: ['p-mot-tabla-1', 'p-mot-tabla-2'] },
    ],
    maniobras: ['trofismo-tono', 'fuerza-mingazzini', 'reflejos-osteotendinosos', 'reflejo-plantar-babinski', 'clonus'],
    quedate: [
      '1.ª motoneurona (piramidal): **hipertonía espástica** (en navaja), **hiperreflexia**, **Babinski**, clonus, sin atrofia.',
      '2.ª motoneurona: **hipotonía**, **hiporreflexia o arreflexia**, **atrofia** y fasciculaciones («triple A»).',
      'Lesión aguda: primero fláccida (shock), después espástica.',
    ],
    capitulos: ['neu-05', 'neu-02'],
  },
  {
    id: 'funciones-superiores',
    sistema: 'neuro',
    titulo: 'Sensibilidad, praxia, gnosia y lenguaje',
    prioridad: 'complementario',
    porque: 'Son parte del examen físico neurológico («todos son físicos, chicos»). En el repaso contó que preguntó **apraxia ideomotora** y **apraxia ideacional**, y una afasia (en el audio no se entiende cuál). La sensibilidad y la estereognosia están en sus pizarras de neurología.',
    fuentes: [R('01:09:50'), R('01:09:56'), { src: 'pizarra', note: 'Pizarra de sensibilidad y gnosia' }, { src: 'pc-1', t: '05:02' }],
    pide: ['**Sensibilidad** superficial y profunda, con sus nombres.', '**Gnosia** táctil: **estereognosia**.', '**Praxia**: qué es la apraxia; ideomotora e ideatoria (ideacional).', '**Lenguaje**: afasia de Broca y de Wernicke.'],
    diapos: [
      { cap: 'neu-06', ids: ['t-sensibilidad'] },
      { cap: 'parcial', ids: ['p-sens', 'p-praxia', 'p-afasias'] },
    ],
    maniobras: ['sensibilidad-superficial', 'sensibilidad-profunda'],
    quedate: [
      'Superficial: tacto grueso, dolor y temperatura · profunda: tacto fino, presión (barestesia), peso (barognosia), posición (batiestesia) y vibración (palestesia).',
      'Estereognosia: reconocer un objeto por el tacto (forma y material).',
      'Apraxia **ideomotora**: no ejecuta el gesto a la orden · **ideatoria**: pierde el plan del acto.',
      'Broca: comprende pero no puede hablar · Wernicke: habla pero no comprende.',
    ],
    capitulos: ['neu-06'],
  },
  {
    id: 'extrapiramidal',
    sistema: 'neuro',
    titulo: 'Síndrome extrapiramidal (Parkinson)',
    prioridad: 'obligatorio',
    porque: 'En la pizarra. En el oral del 10/11 preguntó la **tríada del Parkinson**, el tipo de temblor y cómo es la rigidez.',
    fuentes: [PZ, ORAL],
    pide: ['Definición (ganglios de la base).', 'Tríada: **bradicinesia, rigidez y temblor**; núcleo lesionado: **sustancia negra**.', 'Temblor **de reposo**; rigidez en **rueda dentada** (plástica).', 'Diferencia con el piramidal.'],
    fisioJunto: true,
    diapos: [
      { cap: 'neu-05', ids: ['t-extrapiramidal', 'f-parkinson', 't-triada-parkinson', 't-parkinson-clinica', 't-navaja'] },
      { cap: 'neu-02', ids: ['f-nucleos', 't-temblor', 't-temblor-tipos'] },
    ],
    maniobras: ['trofismo-tono'],
    quedate: [
      'Parkinson: se pierden las neuronas dopaminérgicas de la **sustancia negra**.',
      'Tríada: **bradicinesia**, **rigidez** (rueda dentada) y **temblor de reposo**.',
      'Piramidal = espasticidad en **navaja** · extrapiramidal = rigidez en **rueda dentada**.',
    ],
    capitulos: ['neu-05'],
  },
  {
    id: 'cerebeloso',
    sistema: 'neuro',
    titulo: 'Síndrome cerebeloso',
    prioridad: 'obligatorio',
    porque: 'En la pizarra. En el repaso: «decime 4 o 5 características de los signos del cerebelo», «¿cuál es la alteración estática o dinámica?» y cómo se diferencia del cordonal posterior con el cuadro de las ataxias: dismetría, adiadococinesia, temblor intencional, marcha, nistagmo, hipotonía, **sin trastorno de la sensibilidad**.',
    fuentes: [PZ, R('01:11:32'), R('01:11:54'), R('01:12:03'), R('01:12:42')],
    pide: ['Definición y causas.', '**Examen físico**: ataxia (marcha de ebrio), **dismetría** (índice-nariz, talón-rodilla), **adiadococinesia**, **temblor intencional**, **nistagmo**, **hipotonía**, disartria (palabra escandida), asinergia.', 'Romberg **negativo** (a diferencia del cordonal posterior).'],
    fisioJunto: true,
    diapos: [
      { cap: 'neu-05', ids: ['t-cerebeloso', 'f-cerebelo', 't-ataxia', 't-cordonal'] },
      { cap: 'neu-01', ids: ['f-romberg', 't-romberg'] },
    ],
    maniobras: ['indice-nariz', 'talon-rodilla', 'romberg', 'trofismo-tono'],
    quedate: [
      'El cerebelo **coordina**: sin él los movimientos son torpes y desmedidos.',
      'Al examen: **dismetría**, **adiadococinesia**, **temblor intencional**, **marcha de ebrio**, **nistagmo**, **hipotonía**, palabra escandida.',
      'Romberg **negativo**: el paciente es inestable con los ojos abiertos y cerrados (no depende de la vista).',
    ],
    capitulos: ['neu-05'],
  },
  {
    id: 'hte',
    sistema: 'neuro',
    titulo: 'Hipertensión endocraneana',
    prioridad: 'obligatorio',
    porque: 'En la pizarra (HTE). En el oral del 10/11 preguntó la tríada, la tríada de Cushing y qué par se afecta.',
    fuentes: [PZ, ORAL],
    pide: ['Definición (Monro-Kellie).', 'Tríada: **cefalea, vómito en chorro, edema de papila**.', 'Par afectado: **VI**.', 'Tríada de **Cushing**: HTA, bradicardia, alteración respiratoria.', 'Contraindicación de la punción lumbar.'],
    diapos: [
      { cap: 'neu-06', ids: ['f-componentes', 'f-cushing', 'f-hernias', 'f-puncion', 't-hte', 't-triada', 't-papila', 't-otros-signos', 't-diagnostico-hte', 't-contraindicaciones'] },
    ],
    maniobras: ['fondo-de-ojo', 'motilidad-ocular'],
    quedate: [
      'Tríada: **cefalea** holocraneana, **vómito en chorro** (sin náuseas) y **edema de papila**.',
      'Par más afectado: el **VI** (largo trayecto intracraneal): estrabismo convergente y diplopía.',
      'Cushing: **HTA + bradicardia + alteración respiratoria**.',
    ],
    capitulos: ['neu-06'],
  },
  {
    id: 'meningeo',
    sistema: 'neuro',
    titulo: 'Síndrome meníngeo',
    prioridad: 'obligatorio',
    porque: 'En la pizarra. En el repaso, sobre la meningitis: «pregunta de examen… esas son las primeras tres definiciones» (meningitis, meningismo, reacción meníngea), y la relacionó con la alteración de la conciencia. En sus clases: «Kernig y Brudzinski como el Padre Nuestro».',
    fuentes: [PZ, R('01:14:32'), R('01:14:49'), { src: 'sn-6', t: '33:28' }, { src: 'neu-rec-1026', t: '32:15' }],
    pide: ['**Definición** de meningitis, meningismo y reacción meníngea.', 'Tríada de la meningitis: **fiebre, cefalea, rigidez de nuca** (± alteración de la conciencia).', 'Signos: **rigidez de nuca**, **Kernig**, **Brudzinski**.', 'LCR en meningitis bacteriana, viral y tuberculosa.'],
    diapos: [
      { cap: 'neu-06', ids: ['f-meningitis', 't-definiciones', 't-causas', 't-triada-meningitis', 't-signos-meningeos', 't-lcr'] },
    ],
    maniobras: ['rigidez-nuca', 'kernig-brudzinski'],
    quedate: [
      'Síndrome meníngeo: **irritación de las meninges** (infección, sangre).',
      'Meningitis: clínica **y** LCR alterado · meningismo: clínica con LCR **normal** · reacción meníngea: LCR alterado **sin** clínica.',
      'Signos: rigidez de nuca, **Kernig** (no extiende la rodilla), **Brudzinski** (flexiona las rodillas al flexionar la nuca).',
    ],
    capitulos: ['neu-06'],
  },

  /* ═══════════════════════ SOMA ═══════════════════════ */
  {
    id: 'soma-columna',
    sistema: 'soma',
    titulo: 'Columna: cervical, dorsal, lumbar y sacroilíaca',
    prioridad: 'obligatorio',
    porque: 'En el repaso: «SOMA es examen físico: son maniobras… todo lo que es columna, miembro superior e inferior». En el oral del 10/11 pidió «cualquier maniobra lumbar» y, por explicar Goldthwait con su nombre, «tiene 10, váyase».',
    fuentes: [R('03:54'), R('04:22'), ORAL, { src: 'pizarra' }],
    pide: ['**Cervical**: Spurling, Valsalva, Naffziger-Jones, Adson.', '**Dorsal**: Adams.', '**Lumbar**: Schober, Goldthwait, Lasègue, Bragard (Lasègue reforzado), Neri y Neri reforzado, Lasègue invertido.', '**Sacroilíaca**: Volkmann (apertura), Erichsen (cierre), FABERE o del 4 (Patrick), Gaenslen.'],
    diapos: [
      { cap: 'parcial', ids: ['p-soma-columna-spurling', 'p-soma-columna-valsalva-cervical', 'p-soma-columna-naffziger', 'p-soma-columna-adson', 'p-soma-columna-adams', 'p-soma-columna-schober', 'p-soma-columna-goldthwait', 'p-soma-columna-lasegue', 'p-soma-columna-bragard', 'p-soma-columna-neri', 'p-soma-columna-lasegue-invertido', 'p-soma-columna-volkmann', 'p-soma-columna-erichsen', 'p-soma-columna-patrick-fabere', 'p-soma-columna-gaenslen'] },
    ],
    maniobras: ['spurling', 'valsalva-cervical', 'naffziger', 'adson', 'adams', 'schober', 'goldthwait', 'lasegue', 'bragard', 'neri', 'lasegue-invertido', 'volkmann', 'erichsen', 'patrick-fabere', 'gaenslen'],
    quedate: [
      'Cervical → **Spurling** (compresión radicular).',
      'Dorsal → **Adams** (escoliosis estructural o funcional).',
      'Lumbar → **Goldthwait** (¿real o simulada?), **Lasègue** y **Bragard** (ciático), **Schober** (movilidad).',
      'Sacroilíaca → **Volkmann** (abre), **Erichsen** (cierra), **FABERE**, **Gaenslen**.',
    ],
    capitulos: ['soma-01'],
  },
  {
    id: 'soma-mmss',
    sistema: 'soma',
    titulo: 'Miembro superior: hombro, codo y muñeca',
    prioridad: 'critico',
    porque: 'En la clase de osteoarticular avisó: «miembros superiores: donde está el círculo azul es lo que yo le voy a preguntar». En la pizarra quedaron encerrados codo de **tenista** y de **golfista**, **Tinel**, **túnel carpiano** y **Phalen**. En el repaso volvió a nombrar el codo de tenista.',
    fuentes: [{ src: 'meningeo-osteo', t: '39:46' }, { src: 'meningeo-osteo', t: '43:04' }, R('04:38'), { src: 'pizarra' }],
    pide: ['**Hombro**: prueba de la caída del brazo (supraespinoso).', '**Codo**: codo de tenista (epicondilitis) y de golfista (epitrocleitis).', '**Muñeca**: Tinel, percusión del túnel carpiano y Phalen (nervio mediano).'],
    diapos: [
      { cap: 'parcial', ids: ['p-soma-mmss-caida-brazo', 'p-soma-mmss-codo-tenista', 'p-soma-mmss-codo-golfista', 'p-soma-mmss-tinel', 'p-soma-mmss-tunel-carpiano-percusion', 'p-soma-mmss-phalen'] },
    ],
    maniobras: ['caida-brazo', 'codo-tenista', 'codo-golfista', 'tinel', 'tunel-carpiano-percusion', 'phalen'],
    quedate: [
      'Tenista = **epicóndilo** (extensores; dolor al extender la muñeca contra resistencia).',
      'Golfista = **epitróclea** (flexores; dolor al flexionar contra resistencia).',
      'Tinel, túnel carpiano y Phalen → **nervio mediano** (síndrome del túnel carpiano).',
      'Caída del brazo → **supraespinoso** (manguito rotador).',
    ],
    capitulos: ['soma-01'],
  },
  {
    id: 'soma-mmii',
    sistema: 'soma',
    titulo: 'Miembro inferior: cadera, rodilla y tobillo',
    prioridad: 'obligatorio',
    porque: 'En la clase de osteoarticular: «las maniobras para las rodillas son las maniobras que van a preguntar en el examen». En la pizarra quedaron encerrados **cajón**, **bostezo** y **Apley**.',
    fuentes: [{ src: 'meningeo-osteo', t: '46:17' }, { src: 'pizarra' }, R('04:38')],
    pide: ['**Rodilla**: ligamentos **cruzados** → cajón anterior y posterior; **laterales** → bostezo; **meniscos** → Apley y McMurray; derrame → choque rotuliano.', '**Cadera**: Patrick (FABERE), Thomas.', '**Tobillo**: Thompson (Aquiles).'],
    diapos: [
      { cap: 'parcial', ids: ['p-soma-mmii-cajon-rodilla', 'p-soma-mmii-bostezo-rodilla', 'p-soma-mmii-apley', 'p-soma-mmii-mcmurray', 'p-soma-mmii-choque-rotuliano', 'p-soma-mmii-patrick-fabere', 'p-soma-mmii-thomas', 'p-soma-mmii-thompson'] },
    ],
    maniobras: ['cajon-rodilla', 'bostezo-rodilla', 'apley', 'mcmurray', 'choque-rotuliano', 'patrick-fabere', 'thomas', 'thompson'],
    quedate: [
      'Cruzados → **cajón** (anterior: LCA; posterior: LCP).',
      'Laterales → **bostezo** (valgo: lateral interno; varo: lateral externo).',
      'Meniscos → **Apley** (decúbito ventral, compresión y rotación) y **McMurray**.',
    ],
    capitulos: ['soma-01'],
  },
];

export const temaById = (id: string) => TEMAS.find((t) => t.id === id);
/** Temas del parcial que se estudian en un capítulo (para el aviso en la página del capítulo). */
export const temasDelCapitulo = (cap: string) => TEMAS.filter((t) => t.capitulos.includes(cap) || t.diapos.some((d) => d.cap === cap && d.ids.length >= 3));
/** Lo escribió en las pizarras del repaso (o en las fotos de pizarra de neurología): se destaca. */
export const enPizarra = (t: TemaParcial) => t.fuentes.some((f) => f.src === 'pizarra-repaso' || f.src === 'pizarra');
/** Mismo orden que la web: primero los motivos de consulta, después el examen físico y los síndromes (orden de los capítulos). */
const posicion = (t: TemaParcial) => {
  // dig-04 → 4: el número del capítulo es su lugar en la web.
  const i = Number(t.capitulos[0]?.split('-')[1] ?? 99);
  // En el capítulo de dolor abdominal, primero el dolor y después el abdomen agudo.
  return i * 10 + (t.id === 'abdomen-agudo' ? 1 : 0);
};
export const temasDe = (s: SistemaParcial) =>
  TEMAS.map((t, i) => ({ t, i }))
    .filter((x) => x.t.sistema === s)
    .sort((a, b) => posicion(a.t) - posicion(b.t) || a.i - b.i)
    .map((x) => x.t);
