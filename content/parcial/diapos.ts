// Diapositivas propias del parcial: lo que Ortega agregó en el repaso del 11/11 (pizarras y audio),
// el estado de conciencia completo y las maniobras de SOMA. Mismo formato que las de los capítulos
// (se ven en el mismo visor, paso a paso, con la explicación debajo) y se narran con la misma voz.
// En los temas se citan como { cap: 'parcial', ids: [...] }.
import type { SourceRef } from '@/types';
import type { BloqueDiapo, Diapositiva, Mazo } from '@/clase/tipos';
import { maneuverById } from '../maneuvers';

const R = (t: string): SourceRef => ({ src: 'repaso-1111', t });
const PZ: SourceRef = { src: 'pizarra-repaso' };
const FOTO = (note: string): SourceRef => ({ src: 'pizarra', note });
const LIBRO = (p?: string): SourceRef => (p ? { src: 'libro', p } : { src: 'libro' });

const SECCIONES: Mazo['secciones'] = [
  { id: 'ictericia', label: 'Ictericia: lo del repaso' },
  { id: 'abdomen-agudo', label: 'Abdomen agudo: los cinco tipos' },
  { id: 'hemorragia', label: 'Hemorragia: lo que aclaró' },
  { id: 'cirrosis', label: 'Complicaciones de la cirrosis' },
  { id: 'funciones-renales', label: 'Funciones del riñón' },
  { id: 'nefrotico', label: 'Nefrótico: el razonamiento' },
  { id: 'nefritico', label: 'Nefrítico: la cadena' },
  { id: 'ira', label: 'IRA: pre, renal y pos' },
  { id: 'erc', label: 'ERC: KDIGO y AEIOU' },
  { id: 'conciencia', label: 'Estado de conciencia' },
  { id: 'piramidal', label: 'Pizarra de motilidad' },
  { id: 'funciones-superiores', label: 'Sensibilidad, praxia y lenguaje' },
  { id: 'soma-columna', label: 'Columna' },
  { id: 'soma-mmss', label: 'Miembro superior' },
  { id: 'soma-mmii', label: 'Miembro inferior' },
];

const DIAPOS: Diapositiva[] = [
  /* ═══════════════ ICTERICIA ═══════════════ */
  {
    id: 'p-ict-metabolismo',
    sec: 'ictericia',
    titulo: 'El metabolismo de la bilirrubina en cinco pasos',
    bloques: [
      { t: 'def', term: '1. Producción', tono: 'red', text: 'El **bazo** destruye los glóbulos rojos viejos (120 días): hemo → biliverdina → **bilirrubina indirecta** (no conjugada, liposoluble).' },
      { t: 'def', term: '2. Transporte', tono: 'peach', en: 1, text: 'Viaja **unida a la albúmina**: no se filtra en el riñón (no da coluria) y en el neonato puede pasar al cerebro (kernicterus).' },
      { t: 'def', term: '3. Captación', tono: 'gold', en: 2, text: 'La capta el **hepatocito** (falla en el **Gilbert**).' },
      { t: 'def', term: '4. Conjugación', tono: 'mint', en: 3, text: 'La **glucuroniltransferasa** la une al ácido glucurónico → **bilirrubina directa** (hidrosoluble). Falla en el **Crigler-Najjar**.' },
      { t: 'def', term: '5. Excreción', tono: 'sky', en: 4, text: 'Pasa a la bilis (falla en **Dubin-Johnson** y **Rotor**) → intestino → **urobilinógeno** y **estercobilina**, que da el color a la materia fecal.' },
    ],
    voz: [
      'El metabolismo de la bilirrubina hay que poder recitarlo en cinco pasos. Primero, la producción: el bazo destruye los glóbulos rojos viejos, que viven unos ciento veinte días. El hemo se transforma en biliverdina y después en bilirrubina indirecta, que es liposoluble.',
      'Segundo, el transporte: como es liposoluble, la indirecta viaja en la sangre pegada a la albúmina. Por eso no se filtra en el riñón y no da coluria. En el recién nacido puede atravesar la barrera y llegar al cerebro: es el kernicterus.',
      'Tercero, la captación: el hepatocito la toma de la sangre. Esto es lo que falla en el síndrome de Gilbert.',
      'Cuarto, la conjugación: una enzima, la glucuroniltransferasa, la une al ácido glucurónico. Así se forma la bilirrubina directa, que ahora es hidrosoluble. Esta enzima es la que falta o funciona poco en el Crigler-Najjar.',
      'Y quinto, la excreción: la directa pasa a la bilis, y esto es lo que falla en el Dubin-Johnson y el Rotor. En el intestino las bacterias la transforman en urobilinógeno y estercobilina, que es lo que le da el color a la materia fecal.',
    ],
    refs: [LIBRO('10')],
  },
  {
    id: 'p-ict-hereditarias',
    sec: 'ictericia',
    titulo: 'Hiperbilirrubinemias hereditarias',
    bloques: [
      {
        t: 'cuadro',
        head: ['Síndrome', 'Qué falla', 'Sube la', 'Clave'],
        filas: [
          ['**Gilbert**', 'Captación', 'Indirecta', 'La **más frecuente**, benigna: ictericia leve con ayuno o estrés'],
          ['**Crigler-Najjar**', 'Conjugación (glucuroniltransferasa)', 'Indirecta', 'El tipo I es grave en el recién nacido'],
          ['**Dubin-Johnson**', 'Excreción a la bilis', 'Directa', 'Hígado **negro**; benigna'],
          ['**Rotor**', 'Excreción / almacenamiento', 'Directa', 'Como el Dubin-Johnson, sin pigmento'],
        ],
      },
      { t: 'clave', en: 1, text: 'Las dos primeras fallan **antes de conjugar** (sube la indirecta); las dos últimas, **después** (sube la directa).' },
    ],
    voz: [
      'En el repaso nombró las hiperbilirrubinemias hereditarias. Gilbert es la más frecuente y es benigna: falla la captación, y el paciente se pone un poco amarillo con el ayuno o el estrés. Crigler-Najjar: falla la conjugación, y el tipo uno es grave en el recién nacido. Dubin-Johnson y Rotor: falla la excreción de la directa hacia la bilis.',
      'La regla para no confundirse: Gilbert y Crigler-Najjar fallan antes de conjugar, así que sube la indirecta. Dubin-Johnson y Rotor fallan después de conjugar, así que sube la directa.',
    ],
    refs: [R('55:32'), LIBRO('12')],
  },
  {
    id: 'p-ict-patron',
    sec: 'ictericia',
    titulo: 'Patrón hepatocelular o colestásico',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Hepatocelular: se rompe el hepatocito', tono: 'lilac', items: ['**GPT** y **GOT** muy altas (salen de adentro del hepatocito)', 'GPT > GOT: **viral** · GOT > GPT: **alcohol**', 'FAL y GGT normales o poco elevadas'] },
          { titulo: 'Colestásico: la bilis no sale', tono: 'gold', items: ['**FAL** y **GGT** muy altas (membrana del canalículo)', 'La GGT confirma que la FAL es **hepática**', '**Bilirrubina directa** alta'] },
        ],
      },
      { t: 'clave', en: 1, text: 'Transaminasas = **daño** · FAL + GGT = **colestasis** · albúmina y protrombina = **función**.' },
    ],
    voz: [
      'El laboratorio separa dos patrones. Hepatocelular: se rompe el hepatocito y salen las enzimas que tiene adentro, las transaminasas, GPT y GOT, muy altas. Si predomina la GPT pensá en una hepatitis viral; si la GOT duplica a la GPT, en el alcohol. Colestásico: la bilis no sale, y suben la fosfatasa alcalina y la gama glutamil transpeptidasa, que están en la membrana del canalículo biliar. La GGT confirma que esa fosfatasa alcalina viene del hígado y no del hueso.',
      'Resumido en una línea: las transaminasas miden daño, la fosfatasa alcalina y la GGT miden colestasis, y la albúmina y la protrombina miden función, porque son lo que el hígado fabrica.',
    ],
    refs: [R('54:34'), LIBRO('14')],
  },

  /* ═══════════════ ABDOMEN AGUDO ═══════════════ */
  {
    id: 'p-aa-def',
    sec: 'abdomen-agudo',
    titulo: 'Dolor abdominal no es abdomen agudo',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Dolor abdominal', tono: 'sky', text: 'Un **síntoma**: puede ser crónico, funcional o venir de afuera del abdomen.' },
      { t: 'def', term: 'Abdomen agudo', tono: 'red', en: 1, text: 'Un **síndrome**: dolor abdominal **agudo** (menos de 48–72 h, hasta una semana) que suele requerir **cirugía urgente**.' },
      { t: 'clave', en: 2, text: 'Cinco tipos: **inflamatorio · obstructivo · perforativo · hemorrágico · vascular**.' },
    ],
    voz: [
      'Lo primero que aclaró: dolor abdominal es un síntoma, y puede ser crónico, funcional, o incluso venir de afuera del abdomen.',
      'Abdomen agudo, en cambio, es un síndrome: un dolor abdominal agudo, de menos de cuarenta y ocho a setenta y dos horas, y que en general necesita una resolución quirúrgica urgente.',
      'Y tiene cinco tipos: inflamatorio, obstructivo, perforativo, hemorrágico y vascular. Vamos uno por uno: qué es, por qué pasa y qué encontrás.',
    ],
    refs: [R('43:24')],
  },
  {
    id: 'p-aa-inflamatorio',
    sec: 'abdomen-agudo',
    titulo: '1. Inflamatorio: el más frecuente',
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'peach', text: 'Inflamación aguda de una víscera (todo lo que termina en **-itis**) que llega a irritar el peritoneo. **Apendicitis** (la más frecuente), colecistitis, diverticulitis, pancreatitis.' },
      { t: 'def', term: 'Mecanismo', tono: 'lilac', en: 1, text: 'Se obstruye la luz → la víscera se distiende e infecta → dolor **visceral** periumbilical → al llegar al **peritoneo parietal**, dolor **somático** localizado (FID).' },
      { t: 'def', term: 'Clínica y examen', tono: 'red', en: 2, text: 'Dolor que migra, anorexia, vómitos y **fiebre después del dolor** (Murphy). Puntos dolorosos, **Blumberg**, Rovsing, psoas; si se generaliza, **Gueneau de Mussy**.' },
    ],
    voz: [
      'El inflamatorio es el más frecuente: es la inflamación aguda de una víscera, todo lo que termina en itis, hasta que irrita el peritoneo. La apendicitis es la causa más frecuente; también la colecistitis, la diverticulitis y la pancreatitis.',
      'El mecanismo: se obstruye la luz, por ejemplo con un fecalito, la víscera se distiende y se infecta. Al principio duele como dolor visceral, mal localizado, alrededor del ombligo. Cuando la inflamación llega al peritoneo parietal, el dolor se vuelve somático y se localiza: en la apendicitis, en la fosa ilíaca derecha.',
      'En la clínica, el dolor migra, hay anorexia y vómitos, y la fiebre aparece después del dolor: es la cronología de Murphy. Al examen, los puntos dolorosos, el Blumberg, el Rovsing y el psoas. Si la peritonitis se generaliza, el Gueneau de Mussy.',
    ],
    refs: [{ src: 'mc-dig-3', t: '17:02' }, LIBRO('2')],
  },
  {
    id: 'p-aa-obstructivo',
    sec: 'abdomen-agudo',
    titulo: '2. Obstructivo',
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'peach', text: 'Algo impide el tránsito intestinal (íleo **mecánico**): **bridas** (la más frecuente en el delgado), **hernias atascadas**, **tumores**, vólvulo, fecaloma.' },
      { t: 'def', term: 'Mecanismo', tono: 'lilac', en: 1, text: 'Arriba del obstáculo el intestino **lucha** y se **distiende** → vómitos (alimentarios → biliosos → **fecaloides**) → se pierde líquido: **deshidratación**.' },
      { t: 'def', term: 'Clínica y examen', tono: 'red', en: 2, text: '**Dolor cólico, vómitos, distensión y falta de eliminación de gases y heces**. Timpanismo y **ruidos de lucha** (metálicos); buscar cicatrices y hernias.' },
    ],
    voz: [
      'El obstructivo: algo impide el tránsito del contenido intestinal. Es un íleo mecánico. Las causas: bridas, que son adherencias de una cirugía previa y la causa más frecuente en el intestino delgado; hernias atascadas, tumores como el cáncer de colon, el vólvulo o un fecaloma.',
      'Por arriba del obstáculo el intestino lucha para pasar el contenido, y se distiende con gas y líquido. Aparecen vómitos, primero alimentarios, después biliosos y al final fecaloides. Y como el líquido queda secuestrado en la luz, el paciente se deshidrata.',
      'La clínica son cuatro cosas: dolor cólico, vómitos, distensión y falta de eliminación de gases y materia fecal. Al examen, el abdomen está distendido y timpánico, y se auscultan ruidos de lucha, metálicos. Siempre hay que buscar cicatrices y hernias.',
    ],
    refs: [LIBRO('2')],
  },
  {
    id: 'p-aa-perforativo',
    sec: 'abdomen-agudo',
    titulo: '3. Perforativo',
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'peach', text: 'Se perfora una **víscera hueca** y su contenido cae al peritoneo → **peritonitis**. La causa más frecuente: **úlcera péptica perforada**.' },
      { t: 'def', term: 'Mecanismo', tono: 'lilac', en: 1, text: 'El contenido irrita el peritoneo (química, después bacteriana) → dolor somático intenso y **contractura refleja**. El **aire libre** sube y se pone entre el hígado y la pared.' },
      { t: 'def', term: 'Clínica y examen', tono: 'red', en: 2, text: 'Dolor **súbito, en puñalada**, que se generaliza; paciente **inmóvil**. **Abdomen en tabla**, Gueneau de Mussy, **Jobert** (desaparece la matidez hepática).' },
    ],
    voz: [
      'El perforativo: se perfora una víscera hueca, y lo que tiene adentro, aire, ácido, bilis o materia fecal, cae en la cavidad peritoneal y produce una peritonitis. La causa más frecuente es la úlcera péptica perforada.',
      'El contenido irrita el peritoneo, primero en forma química y después se infecta. El peritoneo parietal inflamado da un dolor somático muy intenso y una contractura refleja de los músculos de la pared. Además, el aire libre sube y se interpone entre el hígado y la pared del abdomen.',
      'Por eso la clínica es un dolor súbito, como una puñalada, que se generaliza, y el paciente queda inmóvil porque cualquier movimiento le duele. Al examen, abdomen en tabla, Gueneau de Mussy, y el signo de Jobert: desaparece la matidez del hígado porque ahora hay aire adelante.',
    ],
    refs: [LIBRO('2')],
  },
  {
    id: 'p-aa-hemorragico',
    sec: 'abdomen-agudo',
    titulo: '4. Hemorrágico',
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'peach', text: 'Sangrado **dentro de la cavidad peritoneal**: **embarazo ectópico roto**, **aneurisma de aorta** roto, traumatismo de bazo o hígado.' },
      { t: 'def', term: 'Mecanismo', tono: 'lilac', en: 1, text: 'Se pierde volumen → **hipovolemia** (taquicardia, hipotensión, palidez, shock). La sangre irrita poco: el abdomen suele estar **blando**.' },
      { t: 'def', term: 'Examen', tono: 'red', en: 2, text: '**Matidez** en flancos; **Cullen** (periumbilical) y **Grey-Turner** (flancos) si sangra el retroperitoneo.' },
    ],
    voz: [
      'El hemorrágico es un sangrado dentro de la cavidad peritoneal. Las causas: un embarazo ectópico roto, la ruptura de un aneurisma de aorta, o un traumatismo de bazo o de hígado.',
      'Lo que domina es la pérdida de volumen: el paciente entra en hipovolemia, con taquicardia, hipotensión, palidez y hasta shock. La sangre irrita mucho menos que el ácido, así que el abdomen suele estar blando, aunque duela.',
      'Al examen hay matidez en los flancos por el líquido, y si sangra el retroperitoneo aparecen el signo de Cullen, una equimosis alrededor del ombligo, y el de Grey-Turner, en los flancos.',
    ],
    refs: [LIBRO('2')],
  },
  {
    id: 'p-aa-vascular',
    sec: 'abdomen-agudo',
    titulo: '5. Vascular o isquémico: el más letal',
    bloques: [
      { t: 'def', term: 'Qué es', tono: 'peach', text: 'Se corta la irrigación del intestino y se **necrosa**. La causa más frecuente: **embolia de la mesentérica superior** (fibrilación auricular).' },
      { t: 'def', term: 'Mecanismo', tono: 'lilac', en: 1, text: 'Sin oxígeno se necrosa la mucosa → **acidosis láctica** → pasan bacterias → necrosis transmural, perforación y peritonitis.' },
      { t: 'def', term: 'Clínica', tono: 'red', en: 2, text: 'Dolor **intenso, desproporcionado al examen** y que no calma con analgésicos, en un paciente **añoso con FA**. Al principio el abdomen está casi normal; **lactato** alto.' },
    ],
    voz: [
      'El vascular o isquémico es el más letal: se interrumpe la irrigación del intestino y el intestino se muere. La causa más frecuente es una embolia en la arteria mesentérica superior, en un paciente con fibrilación auricular.',
      'Sin oxígeno, primero se necrosa la mucosa y aparece acidosis láctica. Después se rompe la barrera, pasan bacterias, la necrosis atraviesa toda la pared y el intestino se perfora.',
      'Lo característico es un dolor muy intenso, desproporcionado para lo poco que encontrás al examen, y que no calma con analgésicos, en un paciente mayor con fibrilación auricular o aterosclerosis. Por eso es traicionero: al principio el abdomen parece casi normal. El lactato elevado ayuda.',
    ],
    refs: [LIBRO('2')],
  },

  /* ═══════════════ HEMORRAGIA ═══════════════ */
  {
    id: 'p-hd-aclaro',
    sec: 'hemorragia',
    titulo: 'Lo que aclaró sobre la hemorragia digestiva',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Clasificación', tono: 'sky', text: 'La hemorragia digestiva se clasifica en **alta o baja**, según el **ángulo de Treitz**.' },
      { t: 'def', term: 'Clases I a IV', tono: 'gold', en: 1, text: 'No clasifican la hemorragia: estiman **cuánto volumen perdió** el paciente (**hipovolemia**), por cualquier causa.' },
      { t: 'def', term: 'Forrest', tono: 'red', en: 2, text: 'Es la clasificación **endoscópica de la úlcera** que sangra. «No se metan ahí.»' },
    ],
    examen: { origen: 'ortega', texto: 'La clasificación de la hemorragia digestiva: alta o baja.', ref: R('45:40') },
    voz: [
      'Lo que aclaró en el repaso: si te pregunta cómo se clasifica la hemorragia digestiva, la respuesta es alta o baja, según el ángulo de Treitz.',
      'El cuadro de clases uno a cuatro no clasifica la hemorragia digestiva: sirve para estimar cuánto volumen perdió el paciente, es decir, la hipovolemia, sea por sangrado, vómitos, diarrea o quemaduras.',
      'Y la clasificación de Forrest es endoscópica, de la úlcera que sangra, para el riesgo de resangrado. Él dijo que no se metan ahí: lo que va a preguntar es la clasificación de la hemorragia digestiva.',
    ],
    refs: [R('45:02'), R('45:40'), R('45:57')],
  },

  /* ═══════════════ CIRROSIS ═══════════════ */
  {
    id: 'p-cir-complicaciones',
    sec: 'cirrosis',
    titulo: 'Complicaciones de la cirrosis y su porqué',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Complicación', 'Por qué aparece'],
        filas: [
          ['**Hemorragia por várices**', 'Hipertensión portal → colaterales → **várices esofágicas** de pared fina que se rompen'],
          ['**Ascitis**', 'Presión portal + **albúmina baja** + vasodilatación esplácnica → se activa el SRAA y retiene sodio y agua'],
          ['**PBE**', 'Ascitis + traslocación bacteriana + pocas defensas: infección **sin perforación** (> 250 neutrófilos)'],
        ],
      },
      {
        t: 'cuadro',
        compacto: true,
        en: 1,
        head: ['Complicación', 'Por qué aparece'],
        filas: [
          ['**Encefalopatía**', 'El hígado no convierte el **amoníaco** en urea y la sangre pasa por las colaterales sin depurarse → **asterixis**, confusión, coma'],
          ['**Hepatorrenal**', 'Vasodilatación esplácnica → el riñón se vasocontrae: IRA **funcional** en un riñón sano'],
          ['**Hepatocarcinoma**', 'Regeneración continua en nódulos'],
        ],
      },
    ],
    voz: [
      'Cada complicación de la cirrosis tiene su porqué. La hemorragia: la hipertensión portal obliga a la sangre a buscar colaterales, y se forman várices esofágicas de pared fina que se rompen. La ascitis: se suman la presión portal alta, la albúmina baja, que no retiene el agua en los vasos, y la vasodilatación, que activa el sistema renina angiotensina y retiene sodio y agua. Y la peritonitis bacteriana espontánea: ascitis, bacterias que pasan desde el intestino y pocas defensas, sin que nada se perfore.',
      'La encefalopatía: el hígado no transforma el amoníaco en urea, y además la sangre del intestino pasa por las colaterales sin depurarse, así que el amoníaco llega al cerebro: confusión, asterixis y coma. El síndrome hepatorrenal: el riñón se vasocontrae y falla aunque esté sano. Y el hepatocarcinoma, por la regeneración continua en nódulos.',
    ],
    refs: [LIBRO()],
  },

  /* ═══════════════ FUNCIONES RENALES ═══════════════ */
  {
    id: 'p-ren-funciones-1',
    sec: 'funciones-renales',
    titulo: 'Función normal → qué pasa si se pierde (1)',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Función normal', 'Si se pierde'],
        filas: [
          ['**Filtrar** urea y creatinina', 'Se acumulan → **síndrome urémico** (náuseas, prurito, encefalopatía, pericarditis)'],
          ['Fabricar **eritropoyetina**', '**Anemia** normocítica normocrómica (en la crónica)'],
        ],
      },
      {
        t: 'cuadro',
        compacto: true,
        en: 1,
        head: ['Función normal', 'Si se pierde'],
        filas: [
          ['**Activar la vitamina D** (calcitriol)', '**Hipocalcemia**'],
          ['Retener calcio y **eliminar fósforo**', 'Hiperfosfatemia + hipocalcemia → **hiperparatiroidismo secundario** → osteodistrofia renal'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Para saber la clínica hay que saber las funciones normales del riñón.', ref: R('23:25') },
    voz: [
      'Ortega insistió: para saber la clínica, tienen que saber las funciones normales. El riñón filtra, y elimina la urea y la creatinina: si falla, se acumulan y aparece el síndrome urémico, con náuseas, prurito, encefalopatía y pericarditis. Además fabrica eritropoyetina, que estimula a la médula ósea: si falta, aparece la anemia del renal crónico.',
      'El riñón activa la vitamina D, y sin vitamina D activa no se absorbe calcio: hipocalcemia. Y normalmente retiene calcio y elimina fósforo; cuando falla se invierte, sube el fósforo y baja el calcio, la paratiroides se estimula y saca calcio del hueso: hiperparatiroidismo secundario y osteodistrofia renal.',
    ],
    refs: [R('23:25'), R('24:31'), R('25:25')],
  },
  {
    id: 'p-ren-funciones-2',
    sec: 'funciones-renales',
    titulo: 'Función normal → qué pasa si se pierde (2)',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Función normal', 'Si se pierde'],
        filas: [
          ['Regular la **presión** (renina → angiotensina → aldosterona)', '**HTA**'],
          ['Manejar **agua y sodio**', '**Edema**, HTA, edema agudo de pulmón'],
        ],
      },
      {
        t: 'cuadro',
        compacto: true,
        en: 1,
        head: ['Función normal', 'Si se pierde'],
        filas: [
          ['Eliminar **potasio**', '**Hiperpotasemia**: arritmias, **paro cardíaco**'],
          ['Eliminar **ácidos** y generar bicarbonato', '**Acidosis metabólica**: respiración de Kussmaul'],
        ],
      },
      { t: 'clave', en: 2, text: 'El filtrado se estima con la **creatinina** (Cockcroft-Gault, MDRD, CKD-EPI). Normal ≈ **120 ml/min**.' },
    ],
    voz: [
      'El riñón regula la presión arterial con el sistema renina angiotensina aldosterona, y maneja el agua y el sodio. Si falla, retiene agua y sal: hipertensión, edema, y en el extremo, edema agudo de pulmón.',
      'También es la vía principal para eliminar el potasio: si se acumula, la hiperpotasemia produce arritmias y paro cardíaco. Y elimina los ácidos y genera bicarbonato: si falla, aparece la acidosis metabólica, con la respiración profunda de Kussmaul.',
      'El filtrado glomerular se estima con fórmulas a partir de la creatinina, y lo normal es alrededor de ciento veinte mililitros por minuto.',
    ],
    refs: [R('27:27'), R('28:23'), R('29:00'), R('34:24')],
  },

  /* ═══════════════ NEFRÓTICO ═══════════════ */
  {
    id: 'p-nefrotico-razon',
    sec: 'nefrotico',
    titulo: 'Nefrótico: de la membrana al edema',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'La membrana basal pierde su **carga negativa** y se agrandan los poros' },
          { k: 'mecanismo', text: 'Pasan **todas** las proteínas a la orina: **hipoproteinemia**' },
          { k: 'mecanismo', text: 'Albúmina baja → baja la **presión oncótica**' },
          { k: 'signo', text: '**Edema** blando, matinal, en párpados → anasarca' },
        ],
      },
    ],
    voz: [
      'El razonamiento que pidió: en el síndrome nefrótico la membrana basal del glomérulo pierde su carga negativa y sus poros se agrandan.',
      'Entonces pasan a la orina todas las proteínas, no solamente la albúmina, y el paciente queda con hipoproteinemia. Sin albúmina baja la presión oncótica, que es la que mantiene el agua dentro de los vasos, y el agua sale al intersticio: edema blando, a predominio matinal en los párpados, que puede llegar a la anasarca.',
    ],
    refs: [R('30:23'), R('31:28')],
  },
  {
    id: 'p-nefrotico-complicaciones',
    sec: 'nefrotico',
    titulo: 'Por qué se infecta y por qué hace trombosis',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Infecciones', tono: 'sky', items: ['Pierde **IgG** y **complemento** (C3) por la orina', 'Sin complemento no hay **opsonización**', 'Típica: **peritonitis bacteriana espontánea**, como en la cirrosis'] },
          { titulo: 'Trombosis', tono: 'red', items: ['Pierde **antitrombina III**', 'Sin ella la trombina queda **sin freno**', 'El hígado fabrica más factores · típica: **trombosis de la vena renal**'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Complicaciones del síndrome nefrótico: por qué se infecta y por qué hace trombosis.', ref: R('32:48') },
    voz: [
      'Las complicaciones salen de lo que se pierde por la orina. Se infecta porque pierde anticuerpos y fracciones del complemento. Sin complemento no hay opsonización, y las bacterias encapsuladas no se destruyen. La infección típica es la peritonitis bacteriana espontánea, igual que en la cirrosis.',
      'Y hace trombosis porque pierde antitrombina tres, que es chica y se filtra. La antitrombina inactiva a la trombina: sin ella la coagulación queda sin freno. Además el hígado, estimulado por la albúmina baja, fabrica más fibrinógeno y factores. La trombosis típica es la de la vena renal.',
    ],
    refs: [R('32:48'), R('33:00')],
  },

  /* ═══════════════ NEFRÍTICO ═══════════════ */
  {
    id: 'p-nefritico-cadena',
    sec: 'nefritico',
    titulo: 'Nefrítico: la cadena del repaso',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: '**Estreptococo** → anticuerpos → **inmunocomplejos** en el glomérulo' },
          { k: 'mecanismo', text: 'Inflamación → se **rompen los capilares**' },
          { k: 'mecanismo', text: 'Pasan **glóbulos rojos** y **baja el filtrado**' },
          { k: 'signo', text: '**Oliguria** → edema e **HTA** · retiene urea → **hiperazoemia**' },
        ],
      },
      { t: 'def', term: 'Primaria o secundaria', tono: 'lilac', en: 1, text: '**Primaria**: la lesión está solo en el riñón. **Secundaria**: una enfermedad sistémica afecta al riñón (lupus, vasculitis, endocarditis).' },
    ],
    voz: [
      'Así lo encadenó: después de una infección por estreptococo se forman anticuerpos e inmunocomplejos que se depositan en el glomérulo. La inflamación daña y rompe los capilares glomerulares, y por eso pasan glóbulos rojos a la orina: hematuria. Al mismo tiempo baja el filtrado: el paciente orina poco, retiene agua y sal, y aparecen el edema y la hipertensión; y como retiene urea, la hiperazoemia.',
      'Y la diferencia entre primaria y secundaria: primaria es cuando la lesión está solamente en el riñón; secundaria, cuando una enfermedad sistémica, como el lupus, una vasculitis o una endocarditis, afecta secundariamente al riñón.',
    ],
    refs: [R('09:16'), R('12:14'), R('13:33')],
  },

  /* ═══════════════ IRA ═══════════════ */
  {
    id: 'p-ira-donde',
    sec: 'ira',
    titulo: 'Pre, renal y pos: dónde está el problema',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Prerrenal', 'Renal', 'Posrenal'],
        filas: [
          ['**Dónde**', 'Antes: llega poca sangre', 'En el riñón', 'Después: la orina no sale'],
          ['**Ejemplos**', 'Deshidratación, hemorragia, **insuficiencia cardíaca**, shock', '**Necrosis tubular aguda**, glomerulonefritis', '**Hiperplasia prostática**, cálculos, tumores'],
          ['**El riñón**', 'Sano: ahorra sodio (**Na urinario < 20**)', 'Lesionado: pierde sodio (> 40)', 'Hidronefrosis'],
        ],
      },
      { t: 'clave', en: 1, text: 'La **prerrenal** es la más frecuente. Para la aguda: **RIFLE y AKIN**; KDIGO quedó en la pizarra para la **crónica**.' },
    ],
    voz: [
      'Para la insuficiencia renal aguda, preguntate dónde está el problema. Prerrenal: antes del riñón, le llega poca sangre, por deshidratación, hemorragia, insuficiencia cardíaca o shock; el riñón está sano y ahorra sodio. Renal: el daño está en el riñón, como la necrosis tubular aguda, y el túbulo lesionado pierde sodio. Posrenal: la orina no puede salir, por ejemplo por una hiperplasia de próstata.',
      'La prerrenal es la más frecuente. Y en la pizarra, para la aguda dejó los criterios RIFLE y AKIN; KDIGO lo escribió para la enfermedad renal crónica.',
    ],
    refs: [R('21:25'), R('22:04'), PZ],
  },

  /* ═══════════════ ERC ═══════════════ */
  {
    id: 'p-erc-kdigo',
    sec: 'erc',
    titulo: 'Estadios KDIGO (como en la pizarra)',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Estadio', 'Filtrado (ml/min)', 'Qué pasa'],
        filas: [
          ['Normal', '**> 120**', '—'],
          ['**G1**', '**> 90**', 'Daño renal con filtrado normal'],
          ['**G2**', '**60–90**', 'Descenso leve'],
          ['**G3a**', '**45–60**', 'Empiezan la anemia y el calcio-fósforo'],
          ['**G3b**', '**30–45**', 'Moderado a grave'],
          ['**G4**', '**15–30**', 'Grave: acidosis, hiperpotasemia'],
          ['**G5**', '**< 15**', '**Falla renal** → **hemodiálisis**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Estadios de la enfermedad renal crónica (KDIGO, en la pizarra).', ref: PZ },
    voz: [
      'Los estadios KDIGO, como los escribió en la pizarra. Lo normal es un filtrado mayor de ciento veinte. G uno, mayor de noventa: hay daño renal, como proteinuria, con filtrado normal. G dos, de sesenta a noventa.',
      'G tres se divide en dos: tres a, de cuarenta y cinco a sesenta, y tres b, de treinta a cuarenta y cinco. G cuatro, de quince a treinta. Y G cinco, menos de quince: es la falla renal, y la flecha de la pizarra lleva a la hemodiálisis. El riesgo aumenta a medida que bajás en la tabla.',
    ],
    refs: [PZ, R('16:06')],
  },
  {
    id: 'p-erc-aeiou',
    sec: 'erc',
    titulo: 'Indicaciones de hemodiálisis: A-E-I-O-U',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Indicación', 'Por qué'],
        filas: [
          ['**A**', '**Acidosis**: pH < 7,1 o bicarbonato < 15', 'La acidez deprime el corazón'],
          ['**E**', '**Electrolitos**: potasio > 7', 'Arritmias y paro'],
          ['**I**', '**Intoxicaciones** dializables', 'Metanol, litio, salicilatos'],
          ['**O**', '**Overload**: sobrecarga refractaria a diuréticos', 'Edema agudo de pulmón'],
          ['**U**', '**Uremia**: urea > 200', 'Encefalopatía, pericarditis'],
        ],
      },
      { t: 'clave', en: 1, text: 'Con **un** criterio ya hay indicación. Dejar de orinar, **sin otro criterio**, no es indicación por sí solo.' },
    ],
    examen: { origen: 'ortega', texto: 'Indicaciones de hemodiálisis (AEIOU) con los valores de la pizarra.', ref: PZ },
    aclara: { text: 'En la pizarra quedó potasio > 7. En la bibliografía suele usarse > 6,5 mEq/l o hiperpotasemia refractaria con cambios en el ECG: lo que importa es que sea **grave o refractaria**.' },
    voz: [
      'Las indicaciones de hemodiálisis se recuerdan con las vocales. A, acidosis grave: pH menor de siete coma uno o bicarbonato menor de quince. E, electrolitos: potasio mayor de siete, porque produce arritmias y paro. I, intoxicaciones por sustancias que se pueden dializar, como el metanol, el litio o los salicilatos. O, de overload: sobrecarga de volumen que no responde a los diuréticos. Y U, uremia: urea mayor de doscientos, o síntomas como encefalopatía o pericarditis.',
      'Lo que aclaró: con un solo criterio ya hay indicación. Pero un paciente que deja de orinar, si no tiene ningún otro criterio, no se dializa solo por eso.',
    ],
    refs: [PZ, R('18:10'), R('18:35'), R('20:28')],
  },

  /* ═══════════════ ESTADO DE CONCIENCIA ═══════════════ */
  {
    id: 'p-conc-def',
    sec: 'conciencia',
    titulo: 'Estado de conciencia: nivel y contenido',
    bloques: [
      { t: 'def', term: 'Estado de conciencia', tono: 'sky', text: 'Estado en el que la persona **se da cuenta de sí misma y de su entorno** y puede responder a los estímulos.' },
      {
        t: 'comparar',
        en: 1,
        cols: [
          { titulo: 'Nivel: cuán despierto', tono: 'sky', items: ['Vigil → somnolencia → obnubilación → estupor → **coma**', 'Se mide con la **escala de Glasgow**'] },
          { titulo: 'Contenido: qué sabe', tono: 'lilac', items: ['Orientación en **tiempo, espacio y persona**', 'Alterado: **confusión**, desorientación'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Definición de estado de conciencia y sus dos partes: nivel y contenido.', ref: R('58:31') },
    voz: [
      'Empezá siempre por la definición. El estado de conciencia es el estado en el que la persona se da cuenta de sí misma y de su entorno, y puede responder a los estímulos.',
      'Tiene dos partes. El nivel es cuán despierto está: vigil, somnoliento, obnubilado, estuporoso o en coma, y se mide con la escala de Glasgow. El contenido es lo que sabe de sí y del entorno: se explora preguntándole quién es, dónde está y en qué fecha estamos, o sea, la orientación en persona, espacio y tiempo.',
    ],
    refs: [R('58:31'), R('58:45')],
  },
  {
    id: 'p-conc-sraa',
    sec: 'conciencia',
    titulo: 'Fisiopatología: qué nos mantiene despiertos',
    fig: {
      f: 'encefalo',
      vistas: [
        { luz: ['mesencefalo', 'protuberancia'], tone: 'sky', nota: 'Sistema reticular activador (tronco)', notaTone: 'sky' },
        { luz: ['mesencefalo', 'protuberancia', 'talamo', 'frontal', 'parietal', 'temporal', 'occipital'], tone: 'sky', nota: 'Activa la corteza de los dos hemisferios', notaTone: 'sky' },
        { lesion: ['mesencefalo', 'protuberancia'], luz: ['frontal', 'parietal'], tone: 'red', nota: 'Lesión del tronco o daño difuso → baja el nivel', notaTone: 'red' },
      ],
    },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Nivel', tono: 'sky', text: 'Lo mantiene el **sistema reticular activador ascendente** del tronco, que proyecta a la corteza.' },
      { t: 'def', term: 'Contenido', tono: 'lilac', en: 1, text: 'Depende de la **corteza cerebral** de los dos hemisferios.' },
      { t: 'clave', en: 2, text: 'Baja el nivel si se lesiona el **tronco** o si se afectan **los dos hemisferios** en forma difusa (hipoglucemia, tóxicos).' },
    ],
    voz: [
      'Para entender por qué un paciente se duerme o entra en coma, hay que saber qué nos mantiene despiertos. Es el sistema reticular activador ascendente, un grupo de neuronas en el tronco encefálico.',
      'Este sistema sube y activa la corteza de los dos hemisferios. El nivel depende del tronco; el contenido, de la corteza.',
      'Por eso baja el nivel de conciencia cuando se lesiona el tronco, o cuando se afectan los dos hemisferios en forma difusa, como en la hipoglucemia o una intoxicación. Una lesión chica en un solo hemisferio, en cambio, no te deja en coma.',
    ],
    refs: [R('58:45')],
  },
  {
    id: 'p-conc-glasgow',
    sec: 'conciencia',
    titulo: 'Escala de Glasgow',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Ocular (O)', 'Verbal (V)', 'Motora (M)'],
        filas: [
          ['4 · Espontánea', '5 · Orientada', '6 · Obedece órdenes'],
          ['3 · A la voz', '4 · Confusa', '5 · Localiza el dolor'],
          ['2 · Al dolor', '3 · Palabras inapropiadas', '4 · Retira al dolor'],
          ['1 · No abre', '2 · Sonidos incomprensibles', '3 · Flexión anormal (**decorticación**)'],
          ['', '1 · No hay', '2 · Extensión (**descerebración**)'],
          ['', '', '1 · No hay'],
        ],
      },
      { t: 'clave', en: 1, text: '**O4 · V5 · M6**: máximo **15**, mínimo **3** (nunca 0).' },
    ],
    examen: { origen: 'ortega', texto: 'Escala de Glasgow: la tomó en el oral del 10/11.', ref: { src: 'oral-1011' } },
    voz: [
      'La escala de Glasgow mide el nivel de conciencia con tres respuestas. La apertura ocular, de uno a cuatro: espontánea, a la voz, al dolor o no abre. La respuesta verbal, de uno a cinco: orientada, confusa, palabras inapropiadas, sonidos incomprensibles o nada. Y la motora, de uno a seis: obedece órdenes, localiza el dolor, se retira, flexión anormal, que es la decorticación, extensión, que es la descerebración, o nada.',
      'Para acordarte: ojos cuatro, verbal cinco, motor seis. Cuatro más cinco más seis da quince, el máximo. El mínimo es tres, uno en cada una: nunca cero.',
    ],
    refs: [R('59:03'), { src: 'oral-1011' }],
  },
  {
    id: 'p-conc-rangos',
    sec: 'conciencia',
    titulo: 'Glasgow y nivel de conciencia (pizarra)',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['Glasgow', 'Nivel', 'Cómo responde'],
        filas: [
          ['**15**', '**Vigil**', 'Despierto, responde normal'],
          ['**13–14**', '**Somnolencia**', 'Parece dormido; se despierta con la **voz** y se vuelve a dormir'],
          ['**11–12**', '**Obnubilación**', 'Necesita estímulos más intensos; respuestas lentas'],
          ['**9–10**', '**Estupor**', 'No responde a la voz; sí al **dolor**'],
          ['**≤ 8**', '**Coma**', 'No responde ni a la voz ni al dolor'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los rangos de la pizarra: 15 · 13–14 · 11–12 · 9–10 · ≤ 8.', ref: PZ },
    aclara: { text: 'Los rangos numéricos son los de la pizarra. Los nombres de 13–14 (somnolencia) y 11–12 (obnubilación) se reconstruyeron del audio, que en ese tramo se entiende mal.' },
    voz: [
      'En la pizarra escribió los rangos. Quince es vigil: despierto, responde normal. Trece o catorce, somnolencia: parece dormido, se despierta con la voz, responde y se vuelve a dormir. Once o doce, obnubilación: necesita estímulos más fuertes y responde lento.',
      'Nueve o diez es el estupor: ya no responde a la voz, solamente al estímulo doloroso. Y ocho o menos es coma: no responde ni a la voz ni al dolor. Con ocho o menos además hay que proteger la vía aérea.',
    ],
    refs: [PZ, R('01:00:01'), R('01:01:20')],
  },
  {
    id: 'p-conc-lucido',
    sec: 'conciencia',
    titulo: 'Vigil no es lúcido',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Vigil', tono: 'sky', text: 'Despierto: Glasgow **15/15**. Habla del **nivel**.' },
      { t: 'def', term: 'Lúcido', tono: 'mint', en: 1, text: 'Vigil **y orientado** en tiempo, espacio y persona: une el **nivel** y el **contenido**.' },
      { t: 'clave', en: 2, text: 'Un paciente 15/15, con los ojos abiertos, que dice cosas sin sentido está **vigil pero confuso**: no es lúcido.' },
    ],
    voz: [
      'Una trampa que remarcó: vigil no es lo mismo que lúcido. Vigil quiere decir despierto, Glasgow quince; habla solamente del nivel.',
      'Lúcido es vigil y además orientado en tiempo, espacio y persona: junta el nivel y el contenido.',
      'Entonces, un paciente con Glasgow quince, con los ojos abiertos, pero que dice cosas sin sentido, está vigil pero confuso. No está lúcido.',
    ],
    refs: [R('01:02:36'), R('01:03:16')],
  },

  /* ═══════════════ MOTILIDAD (PIZARRA) ═══════════════ */
  {
    id: 'p-mot-pizarra',
    sec: 'piramidal',
    titulo: 'La pizarra de motilidad',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Activa voluntaria: fuerza', tono: 'sky', items: ['Maniobras **de oposición**', 'Deficitarias: **Barré** y **Mingazzini**'] },
          { titulo: 'Activa involuntaria', tono: 'lilac', items: ['Automáticos medulares: **clonus** y **sincinesias**', 'Reflejos **superficiales** y **profundos**'] },
          { titulo: 'Pasiva: tono y trofismo', tono: 'gold', items: ['Hipertonía: **navaja** (piramidal), **rueda dentada** (extrapiramidal)', 'Hipotonía: **André-Thomas**, **Stewart-Holmes**', 'Trofismo: masas musculares'] },
        ],
      },
    ],
    voz: [
      'La pizarra de motilidad la divide en tres. La motilidad activa voluntaria es la fuerza: se explora con maniobras de oposición, el paciente empuja contra tu mano, y con las maniobras deficitarias de Barré y Mingazzini, donde el miembro débil no sostiene la posición y cae.',
      'La activa involuntaria son los movimientos automáticos medulares, el clonus y las sincinesias, y los reflejos superficiales y profundos.',
      'Y la pasiva es el tono y el trofismo: movilizás vos el miembro. Si hay hipertonía, en la piramidal es en navaja y en la extrapiramidal en rueda dentada. Si hay hipotonía, se busca con las maniobras de André-Thomas y de Stewart-Holmes. Y el trofismo son las masas musculares.',
    ],
    refs: [FOTO('Pizarra de motilidad'), R('01:09:17')],
  },
  {
    id: 'p-mot-tabla-1',
    sec: 'piramidal',
    titulo: 'Síndromes motores: tono, trofismo y fuerza',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Tono', 'Trofismo', 'Fuerza'],
        filas: [
          ['**Miopatía**', 'Hipotonía **proximal**', 'Atrofia por desuso', '+/−'],
          ['**1.ª motoneurona**', 'Fláccido → **espástico**', 'Por desuso', '**Hemiparesia / plejía**'],
          ['**2.ª motoneurona**', 'Hipotonía / atonía', '**Atrofia** propia', 'Paraparesia / plejía'],
          ['**Extrapiramidal**', 'Hipertonía **rígida**', 'Por desuso', 'Normal'],
          ['**Cerebeloso**', 'Hipotonía **generalizada**', 'Por desuso', 'Normal'],
          ['**Neuropatía**', 'Hipotonía **distal**', 'Por desuso', '+/−'],
        ],
      },
    ],
    voz: [
      'Esta es la tabla de síndromes motores de la pizarra, por filas. El tono: la miopatía da hipotonía proximal, la neuropatía distal y el cerebeloso generalizada. La primera motoneurona es fláccida al principio y después espástica, con hipertonía. La segunda motoneurona da hipotonía o atonía, y el Parkinson, hipertonía rígida.',
      'El trofismo: la atrofia es por desuso en todos, salvo en la segunda motoneurona, donde la atrofia es propia de la lesión. Y la fuerza: hemiparesia o hemiplejía en la primera motoneurona, paraparesia según el nivel en la segunda, y normal en el extrapiramidal y el cerebeloso.',
    ],
    refs: [FOTO('Pizarra «Motilidad»')],
  },
  {
    id: 'p-mot-tabla-2',
    sec: 'piramidal',
    titulo: 'Síndromes motores: reflejos y marcha',
    bloques: [
      {
        t: 'cuadro',
        compacto: true,
        head: ['', 'Reflejos', 'Marcha'],
        filas: [
          ['**Miopatía**', 'Normales', '**Del pato**'],
          ['**1.ª motoneurona**', '**Hiperreflexia**, **Babinski**, sin cutaneoabdominales; **clonus**', '**Helicópoda** (en guadaña)'],
          ['**2.ª motoneurona**', '**Arreflexia**; Babinski bilateral', '**En tijeras**'],
          ['**Extrapiramidal**', 'Reflejo **palmomentoniano**', '**Parkinsoniana**'],
          ['**Cerebeloso**', 'Normales', '**Del ebrio**'],
          ['**Neuropatía**', 'Normales en la pizarra', '**Escarbante** (steppage)'],
        ],
      },
    ],
    voz: [
      'Los reflejos: en la primera motoneurona hay hiperreflexia profunda, Babinski, se pierden los reflejos cutaneoabdominales y aparecen el clonus y las sincinesias. En la segunda motoneurona, arreflexia. En el Parkinson, el reflejo palmomentoniano.',
      'Y la marcha, que siempre pregunta: miopatía, marcha del pato; primera motoneurona, helicópoda o en guadaña; la que figura en tijeras en la pizarra; Parkinson, marcha parkinsoniana; cerebeloso, marcha del ebrio; y neuropatía, marcha escarbante o en steppage.',
    ],
    aclara: { text: 'Transcripta de la foto de la pizarra. En la columna de la neuropatía, la pizarra pone reflejos normales; en la bibliografía suelen estar disminuidos en las zonas distales.' },
    refs: [FOTO('Pizarra «Motilidad»')],
  },

  /* ═══════════════ SENSIBILIDAD, PRAXIA, LENGUAJE ═══════════════ */
  {
    id: 'p-sens',
    sec: 'funciones-superiores',
    titulo: 'Sensibilidad superficial y profunda',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Superficial', tono: 'sky', items: ['Tacto **grueso**, **dolor**, **temperatura**', 'Vía **espinotalámica** (cruza en la médula)'] },
          { titulo: 'Profunda', tono: 'lilac', items: ['Tacto **fino**, presión (**barestesia**), peso (**barognosia**)', 'Posición (**batiestesia**), vibración (**palestesia**)', '**Cordones posteriores** (cruza en el bulbo)'] },
        ],
      },
      { t: 'def', term: 'Estereognosia', tono: 'gold', en: 1, text: 'Reconocer un objeto **solo por el tacto**: forma y material. Si se pierde con la sensibilidad conservada: **astereognosia** (lóbulo **parietal**).' },
    ],
    voz: [
      'La sensibilidad superficial es el tacto grueso, el dolor y la temperatura, y va por la vía espinotalámica, que cruza en la médula. La profunda es el tacto fino, la presión, que es la barestesia, el peso, que es la barognosia, la posición, que es la batiestesia, y la vibración con el diapasón, que es la palestesia. Va por los cordones posteriores y cruza en el bulbo.',
      'La gnosia táctil, o estereognosia, es reconocer un objeto con los ojos cerrados solo por el tacto: su forma y su material. Si la sensibilidad está bien pero no lo reconoce, es una astereognosia, por una lesión del lóbulo parietal.',
    ],
    refs: [FOTO('Pizarra de sensibilidad y gnosia')],
  },
  {
    id: 'p-praxia',
    sec: 'funciones-superiores',
    titulo: 'Apraxia ideomotora e ideatoria',
    bloques: [
      { t: 'def', term: 'Apraxia', tono: 'sky', text: 'No puede hacer un **acto motor aprendido** aunque entiende la orden y **no tiene parálisis** que lo explique.' },
      {
        t: 'comparar',
        en: 1,
        cols: [
          { titulo: 'Ideomotora', tono: 'lilac', items: ['Sabe **qué** hacer pero no ejecuta el gesto a la orden', '«Hágame la señal de la cruz», «salude»'] },
          { titulo: 'Ideatoria', tono: 'gold', items: ['Pierde el **plan**: la secuencia y el uso de los objetos', 'Le das una vela y fósforos: no sabe encenderla'] },
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Apraxia ideomotora e ideatoria (la preguntó).', ref: R('01:09:50') },
    voz: [
      'Apraxia es no poder hacer un acto motor aprendido, aunque el paciente entiende la orden y no tiene una parálisis ni un trastorno sensitivo que lo explique.',
      'En la ideomotora sabe qué tiene que hacer, pero no puede ejecutar el gesto cuando se lo pedís, aunque lo haga en forma automática: le decís que haga la señal de la cruz o que salude, y no puede. En la ideatoria pierde el plan del acto: no sabe la secuencia ni para qué sirven los objetos. Le das una vela y fósforos, y no sabe encenderla.',
    ],
    refs: [R('01:09:50'), LIBRO()],
  },
  {
    id: 'p-afasias',
    sec: 'funciones-superiores',
    titulo: 'Afasia de Broca y de Wernicke',
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Broca: motora', tono: 'peach', items: ['Área **44–45** (frontal inferior)', '**Comprende**, pero habla poco, con esfuerzo, telegráfico', 'Suele tener hemiparesia derecha'] },
          { titulo: 'Wernicke: sensitiva', tono: 'sky', items: ['Área **22** (temporal superior)', '**No comprende**; habla fluido pero sin sentido', 'No se da cuenta de su error'] },
        ],
      },
    ],
    voz: [
      'Las dos afasias clásicas. La de Broca es motora, de expresión: la lesión está en las áreas cuarenta y cuatro y cuarenta y cinco, en el lóbulo frontal. El paciente comprende, pero habla poco, con esfuerzo, como un telegrama, y suele tener una hemiparesia derecha.',
      'La de Wernicke es sensitiva, de comprensión: la lesión está en el área veintidós, en el lóbulo temporal. El paciente no comprende, habla fluido pero sin sentido, y no se da cuenta de que se equivoca.',
    ],
    refs: [R('01:09:56'), LIBRO()],
  },
];

/* ═══════════════ SOMA: una diapositiva por maniobra ═══════════════ */

const SOMA: Record<string, string[]> = {
  'soma-columna': ['spurling', 'valsalva-cervical', 'naffziger', 'adson', 'adams', 'schober', 'goldthwait', 'lasegue', 'bragard', 'neri', 'lasegue-invertido', 'volkmann', 'erichsen', 'patrick-fabere', 'gaenslen'],
  'soma-mmss': ['caida-brazo', 'codo-tenista', 'codo-golfista', 'tinel', 'tunel-carpiano-percusion', 'phalen'],
  'soma-mmii': ['cajon-rodilla', 'bostezo-rodilla', 'apley', 'mcmurray', 'choque-rotuliano', 'patrick-fabere', 'thomas', 'thompson'],
};

/** Texto para la voz: sin marcas de formato. */
const limpio = (s: string) => s.replace(/\*\*|==|\[([^\]]+)\]\([^)]*\)/g, (_, a) => a ?? '').replace(/\s+/g, ' ').trim();
const punto = (s: string) => (/[.!?…»]$/.test(s) ? s : `${s}.`);

function diapoManiobra(sec: string, id: string): Diapositiva | null {
  const m = maneuverById(id);
  if (!m) return null;
  const bloques: BloqueDiapo[] = [
    { t: 'def', term: 'Explora', tono: 'sky', text: m.explores },
    { t: 'lista', en: 1, items: m.technique },
    { t: 'def', term: 'Positivo', tono: 'red', en: 2, text: m.pathologic },
    { t: 'def', term: 'Significa', tono: 'lilac', en: 2, text: m.interpretation },
  ];
  return {
    id: `p-${sec}-${id}`,
    sec,
    titulo: m.name,
    bloques,
    voz: [
      punto(`${limpio(m.name)}. Explora ${limpio(m.explores).replace(/^[A-ZÁÉÍÓÚ]/, (c) => c.toLowerCase())}`),
      `Cómo se hace: ${m.technique.map((x) => punto(limpio(x))).join(' ')}`,
      `Es positiva si ${punto(limpio(m.pathologic).replace(/^[A-ZÁÉÍÓÚ]/, (c) => c.toLowerCase()))} ${punto(limpio(m.interpretation))}`,
    ],
    refs: m.refs ?? [],
  };
}

for (const [sec, ids] of Object.entries(SOMA)) for (const id of ids) {
  const d = diapoManiobra(sec, id);
  if (d) DIAPOS.push(d);
}

/** Mazo de las diapositivas del parcial (se cita como cap: 'parcial'). */
export const MAZO_PARCIAL: Mazo = { id: 'parcial', secciones: SECCIONES, diapos: DIAPOS };
export const diapoParcial = (id: string) => DIAPOS.find((d) => d.id === id);
export const DIAPOS_SOMA = SOMA;
