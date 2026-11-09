import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-05: clase visual de la insuficiencia renal aguda y crónica.
 *  1. Clases de Ortega: «Insuficiencia renal parte 1» (00:02–34:29), «parte 2» (00:02–32:47) y «parte 3» (00:02–14:10).
 *  2. Libro de Clínica Médica de Ortega (p. 429–439): RIFLE, causas prerrenales, renales y posrenales, índices urinarios,
 *     IRC, estadios, manifestaciones y diferencias con la aguda.
 *  3. Preguntero: bloque urinario (insuficiencia renal).
 * Ver content/traceability/ren-05.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const I1 = (t: string) => r('ir-1', t);
const I2 = (t: string) => r('ir-2', t);
const I3 = (t: string) => r('ir-3', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-donde',
    sec: 'aguda',
    titulo: 'Dónde falla: antes, dentro o después del riñón',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'nefrona', vistas: [{ luz: ['arteriola'], isquemia: true, tone: 'sky', nota: 'Prerrenal: llega poca sangre', notaTone: 'sky' }, { luz: ['proximal'], marca: 'proximal', tone: 'red', nota: 'Renal: se daña el túbulo (NTA)', notaTone: 'red' }, { luz: ['colector'], marca: 'colector', tone: 'lilac', nota: 'Posrenal: la orina no sale', notaTone: 'lilac' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Prerrenal (la más frecuente)', tono: 'sky', text: 'Llega **poca sangre**: hipovolemia, hemorragia, deshidratación, insuficiencia cardíaca. El riñón está sano.' },
      { t: 'def', term: 'Renal o parenquimatosa', tono: 'red', en: 1, text: 'Se daña el **tejido renal**: sobre todo la **necrosis tubular aguda** (isquemia prolongada o tóxicos).' },
      { t: 'def', term: 'Posrenal', tono: 'lilac', en: 2, text: 'La orina **no puede salir**: hiperplasia de próstata, cálculos, tumores.' },
    ],
    voz: [
      'La insuficiencia renal aguda se entiende preguntando dónde está el problema. Prerrenal, la más frecuente: al riñón le llega poca sangre, por una hipovolemia, una hemorragia, una deshidratación o una insuficiencia cardíaca. El riñón en sí está sano.',
      'Renal o parenquimatosa: se daña el propio tejido. La causa principal es la necrosis tubular aguda, por una isquemia que se prolongó o por tóxicos.',
      'Y posrenal: el riñón filtra, pero la orina no puede salir, por una próstata grande, cálculos o tumores.',
    ],
    refs: [I1('18:23'), I1('19:03'), I1('23:04'), I1('24:25'), I1('25:45'), L('p430')],
  },
  {
    id: 'f-sodio',
    sec: 'aguda',
    titulo: 'Por qué la prerrenal retiene sodio',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'nefrona', vistas: [{ luz: ['arteriola', 'proximal'], isquemia: true, tone: 'sky', nota: 'Túbulo sano: reabsorbe sodio', notaTone: 'sky' }, { luz: ['proximal'], marca: 'proximal', tone: 'red', nota: 'Túbulo dañado: el sodio se pierde', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Prerrenal', tono: 'sky', text: 'Los túbulos están **sanos**: reabsorben todo el sodio que pueden para defender el volumen. **Na urinario < 20**, FENa < 1 %.' },
      { t: 'def', term: 'Necrosis tubular aguda', tono: 'red', en: 1, text: 'Los túbulos están **dañados**: no reabsorben. **Na urinario > 40**, FENa > 2 %; cilindros granulosos.' },
    ],
    voz: [
      'Y la forma de separarlas, que es pregunta de parcial: el sodio en la orina. En la prerrenal, los túbulos están sanos. Como el cuerpo está defendiendo un volumen bajo, reabsorben todo el sodio que pueden, y en la orina aparece poco: menos de veinte, con una fracción excretada menor del uno por ciento.',
      'En la necrosis tubular aguda, los túbulos están dañados y ya no pueden reabsorber. El sodio se pierde por la orina, más de cuarenta, aunque el paciente orine poco; y en el sedimento aparecen cilindros granulosos.',
    ],
    refs: [I2('19:02'), I2('20:22'), I2('21:03'), I2('21:43'), L('p434')],
  },
  {
    id: 'f-consecuencias',
    sec: 'clinica-ira',
    titulo: 'Lo que el riñón deja de hacer',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['El riñón ya no…', 'Aparece'],
        filas: [
          ['Elimina **urea y creatinina**', 'Azoemia → **síndrome urémico**'],
          ['Elimina **agua y sal**', 'Edema, **HTA**, insuficiencia cardíaca'],
          ['Elimina **potasio**', '**Hiperpotasemia**: arritmias'],
          ['Elimina **hidrogeniones**', '**Acidosis metabólica**'],
          ['Elimina **fósforo** ni activa la **vitamina D**', '**Hipocalcemia**, hiperfosfatemia, PTH alta'],
          ['Fabrica **eritropoyetina**', '**Anemia** (en la crónica)'],
        ],
      },
    ],
    voz: [
      'Para entender la clínica, el profesor parte de las funciones del riñón. Si ya no elimina la urea y la creatinina, se acumulan: el síndrome urémico. Si no elimina agua y sal, aparecen edema, hipertensión e insuficiencia cardíaca. Si no elimina potasio, hiperpotasemia y arritmias. Si no elimina hidrogeniones, acidosis metabólica.',
      'Si no elimina el fósforo ni activa la vitamina D, baja el calcio y sube la parathormona. Y si deja de fabricar eritropoyetina, aparece la anemia, pero eso tarda.',
    ],
    refs: [I1('06:18'), I1('07:44'), I2('07:51'), I2('08:35'), I2('09:17'), I2('09:57'), I2('10:42'), I2('11:27')],
  },
  {
    id: 'f-anemia',
    sec: 'clinica-ira',
    titulo: 'Por qué la anemia llega tarde',
    etapas: ['mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'mecanismo', text: 'El riñón fabrica **eritropoyetina**, que estimula a la médula a hacer glóbulos rojos.' },
          { k: 'mecanismo', text: 'Si cae la eritropoyetina, la médula fabrica menos, pero los glóbulos que ya circulan **duran unos 120 días**.' },
          { k: 'signo', text: 'En la **aguda** no hay anemia al comienzo (aparece después de 7–10 días); en la **crónica**, anemia **normocítica normocrómica**.' },
        ],
      },
    ],
    aclara: { text: 'La vida media del glóbulo rojo explica por qué la anemia tarda en aparecer.', origen: GRAL },
    voz: [
      'Y la anemia, que sirve para diferenciar la aguda de la crónica. El riñón fabrica eritropoyetina, la hormona que le dice a la médula ósea que produzca glóbulos rojos.',
      'Si el riñón falla, cae la eritropoyetina y la médula produce menos. Pero los glóbulos rojos que ya están circulando viven unos cuatro meses, así que la caída tarda en notarse.',
      'Por eso, en la insuficiencia aguda no hay anemia al comienzo: aparece si el cuadro dura más de siete a diez días. En la crónica, en cambio, hay anemia, normocítica y normocrómica.',
    ],
    refs: [I2('12:52'), I2('13:33'), I3('03:52'), L('p438')],
  },
  {
    id: 'f-hueso',
    sec: 'clinica-irc',
    titulo: 'El hueso del renal crónico',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    amplio: true,
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'El riñón no elimina **fósforo** ni activa la **vitamina D** (1,25-dihidroxi).' },
          { k: 'mecanismo', text: 'Baja la absorción de calcio: **hipocalcemia**. Fósforo alto y calcio bajo estimulan la **PTH** (hiperparatiroidismo secundario).' },
          { k: 'signo', text: 'La PTH saca calcio del hueso: **osteodistrofia** (cráneo en sal y pimienta, falanges reabsorbidas).' },
        ],
      },
    ],
    voz: [
      'El hueso del paciente renal crónico. El riñón enfermo no elimina el fósforo, y tampoco activa la vitamina D.',
      'Sin vitamina D activa, el intestino absorbe poco calcio, y el calcio baja. El fósforo alto y el calcio bajo estimulan a la paratiroides: es el hiperparatiroidismo secundario, y eso es otra pregunta de los parciales.',
      'La parathormona saca calcio del hueso, y el hueso se deteriora: la osteodistrofia renal, con el cráneo en sal y pimienta y las falanges reabsorbidas en la radiografía.',
    ],
    refs: [I2('11:27'), I2('11:36'), I2('12:09'), I3('05:16'), L('p438')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'aguda', label: 'Aguda: dónde falla' },
    { id: 'clinica-ira', label: 'Consecuencias' },
    { id: 'clinica-irc', label: 'Crónica: el hueso' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-def',
    sec: 'definicion',
    titulo: 'Insuficiencia renal',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Pérdida de la función renal: retiene productos nitrogenados y falla en **todas sus funciones**.' },
      {
        t: 'cuadro',
        en: 1,
        head: ['Forma', 'Tiempo', 'Evolución'],
        filas: [
          ['**Aguda**', 'Horas o días (< 1 mes)', 'Reversible en más del 80 %'],
          ['Rápidamente progresiva', '1 a 3 meses', 'La aguda que no se recuperó'],
          ['**Crónica**', '**> 3 meses**', '**Irreversible**'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Insuficiencia renal.', cita: 'Insuficiencia renal es uno de los muy preguntados en el parcial y lo deben saber.', ref: I1('00:02') },
    voz: [
      'La insuficiencia renal es uno de los temas más preguntados del parcial. Es la pérdida de la función del riñón: retiene los productos nitrogenados, y falla en todo lo demás que el riñón hace.',
      'Según el tiempo: aguda, de horas o días, reversible en más del ochenta por ciento; rápidamente progresiva, la aguda que no se recuperó en uno a tres meses; y crónica, de más de tres meses, irreversible.',
    ],
    refs: [I1('00:02'), I1('06:18'), I1('09:08'), I1('09:51'), I1('10:34')],
  },
  {
    id: 't-rifle',
    sec: 'aguda',
    titulo: 'Criterios RIFLE',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Creatinina o filtrado', 'Diuresis'],
        filas: [
          ['**R**iesgo', 'Creatinina × 1,5 o FG ↓ > 25 %', '< 0,5 ml/kg/h por 6 h'],
          ['**I**njuria (lesión)', '× 2 o FG ↓ > 50 %', '< 0,5 ml/kg/h por 12 h'],
          ['**F**allo', '× 3 o FG ↓ > 75 %', '< 0,3 ml/kg/h por 24 h o anuria 12 h'],
          ['**L**oss (pérdida)', 'IRA que persiste **> 4 semanas**', ''],
          ['**E**nd (terminal)', 'Más de **3 meses**', ''],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Los criterios RIFLE y AKIN.', cita: 'Criterios que ustedes van a preguntar en el parcial, criterios que siempre lo deben saber, criterios que deben conocer para toda su vida como médico.', ref: I1('12:23') },
    voz: [
      'Para diagnosticar y graduar la insuficiencia aguda hay dos criterios que el profesor pide para toda la vida: RIFLE y AKIN. Los dos usan la creatinina y la diuresis.',
      'RIFLE: riesgo, cuando la creatinina sube una vez y media o la diuresis cae por debajo de medio mililitro por kilo por hora durante seis horas. Injuria, cuando la creatinina se duplica o esa diuresis dura doce horas. Fallo, cuando se triplica, o la diuresis es menor de cero coma tres por veinticuatro horas, o hay anuria. Y después, pérdida de la función si dura más de cuatro semanas, y enfermedad terminal si pasa los tres meses.',
    ],
    refs: [I1('12:12'), I1('12:23'), I1('12:29'), I1('15:37'), L('p429')],
  },
  {
    id: 't-akin',
    sec: 'aguda',
    titulo: 'Criterios AKIN',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Estadio', 'Creatinina', 'Diuresis'],
        filas: [
          ['**1**', '↑ ≥ 0,3 mg/dl o × 1,5–2', '< 0,5 ml/kg/h por > 6 h'],
          ['**2**', '× 2–3', '< 0,5 ml/kg/h por > 12 h'],
          ['**3**', '× 3 o más (o ≥ 4 mg/dl)', '< 0,3 ml/kg/h por 24 h o anuria 12 h'],
        ],
      },
      { t: 'texto', en: 1, text: 'Un ejemplo de la clase: creatinina basal 0,9 → «fallo» si pasa de **2,7** (0,9 × 3).' },
    ],
    aclara: { text: 'Los cortes de diuresis son los estándar de las clasificaciones.', origen: 'Bibliografía.' },
    voz: [
      'AKIN es casi igual, en tres estadios. Estadio uno: la creatinina sube cero coma tres o más, o una vez y media a dos veces, o la diuresis cae por debajo de cero coma cinco durante más de seis horas. Estadio dos: se duplica o triplica, o esa diuresis dura más de doce horas. Estadio tres: se triplica o más, o la diuresis es menor de cero coma tres por veinticuatro horas, o hay anuria.',
      'El ejemplo de la clase: una mujer con una creatinina basal de cero coma nueve está en fallo si pasa de dos coma siete, el triple.',
    ],
    refs: [I1('15:37'), I1('16:18')],
  },
  {
    id: 't-causas',
    sec: 'aguda',
    titulo: 'Causas de insuficiencia renal aguda',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Tipo', 'Causas'],
        filas: [
          ['**Prerrenal** (la más frecuente)', 'Hipovolemia (hemorragia, vómitos, diarrea, quemaduras, diuréticos), shock, **insuficiencia cardíaca**, sepsis, AINE'],
          ['**Renal**', '**Necrosis tubular aguda** (isquemia prolongada; tóxicos: aminoglucósidos, contrastes; mioglobina), glomerulonefritis, nefritis intersticial'],
          ['**Posrenal**', '**Hiperplasia de próstata**, cálculos, tumores, vejiga neurogénica'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Las causas de insuficiencia renal aguda.', cita: 'Y aquí es donde suelen preguntar mucho: ¿cuáles son las causas de insuficiencia renal aguda?', ref: I1('18:23') },
    voz: [
      'Las causas son lo que más se pregunta. Prerrenal, la más frecuente: todo lo que baje la sangre que llega al riñón, como una hemorragia, vómitos y diarreas, quemaduras, diuréticos, un shock, una insuficiencia cardíaca, una sepsis, o antiinflamatorios.',
      'Renal: sobre todo la necrosis tubular aguda, por una isquemia que se prolongó o por tóxicos como los aminoglucósidos, los contrastes o la mioglobina; también las glomerulonefritis y las nefritis intersticiales.',
      'Y posrenal: la hiperplasia de próstata, los cálculos, los tumores, la vejiga neurogénica.',
    ],
    refs: [I1('18:23'), I1('19:03'), I1('23:04'), I1('24:25'), I1('25:45'), I1('30:27'), I1('32:27'), L('p430'), L('p431')],
  },
  {
    id: 't-sodio',
    sec: 'aguda',
    titulo: 'Prerrenal o necrosis tubular',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Prerrenal', 'NTA'],
        filas: [
          ['Sodio urinario', '**< 20 mEq/l**', '**> 40 mEq/l**'],
          ['FENa', '< 1 %', '> 2 %'],
          ['U/P urea', '> 8', '< 3'],
          ['U/P creatinina', '> 40', '< 20'],
          ['Sedimento', 'Normal', 'Cilindros granulosos y epiteliales'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Por qué la prerrenal elimina menos sodio y la renal más.', cita: 'Esto es pregunta de parcial: ¿por qué elimina más sodio la etiología renal o parenquimatosa y por qué elimina menos sodio la prerrenal?', ref: I2('21:00') },
    voz: [
      'Y el cuadro que las separa. La prerrenal tiene sodio urinario menor de veinte y fracción excretada menor del uno por ciento: el túbulo sano lo reabsorbe. Concentra bien la orina: el cociente urinario y plasmático de urea es mayor de ocho, y el de creatinina mayor de cuarenta. Y el sedimento es normal.',
      'La necrosis tubular tiene sodio urinario mayor de cuarenta, fracción mayor del dos por ciento, cocientes bajos porque el túbulo ya no concentra, y cilindros granulosos en el sedimento.',
    ],
    refs: [I2('19:02'), I2('20:22'), I2('21:00'), I2('21:43'), I2('22:23'), L('p434')],
  },
  {
    id: 't-episodio',
    sec: 'aguda',
    titulo: 'La aguda es un episodio',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Siempre hay una **enfermedad de base**: corregirla revierte la IRA.' },
      { t: 'texto', en: 1, text: 'Ejemplo: una **hemorragia** con shock (más del 40 % de la volemia) da una IRA prerrenal; si se repone el volumen, el riñón vuelve a filtrar.' },
      { t: 'prof', en: 1, text: 'Es lo que le pueden llegar a preguntar en los parciales.', ref: I2('03:55') },
    ],
    voz: [
      'Algo que el profesor quiere que se entienda: la insuficiencia aguda es un episodio, siempre secundario a una enfermedad de base. Si se corrige esa causa, se revierte.',
      'Por ejemplo, un paciente con una hemorragia que pierde más del cuarenta por ciento de la volemia entra en shock y hace una insuficiencia renal prerrenal. Si se repone el volumen a tiempo, el riñón vuelve a filtrar.',
    ],
    refs: [I2('02:59'), I2('03:40'), I2('03:55')],
  },
  {
    id: 't-ira-clinica',
    sec: 'clinica-ira',
    titulo: 'Clínica de la insuficiencia aguda',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Qué aparece'],
        filas: [
          ['Diuresis', '**Oliguria** (< 500 ml/día) o anuria'],
          ['Urea', 'Normal 10–50 mg/dl; **> 100**: náuseas, vómitos, aliento urémico, sangrado, encefalopatía; > 200: derrames, pericarditis'],
          ['Volumen', 'HTA, edema, insuficiencia cardíaca'],
          ['Potasio', '**> 5,5 mEq/l**: T picuda, QRS ancho, arritmias'],
          ['Ácido-base', '**Acidosis metabólica**'],
        ],
      },
    ],
    voz: [
      'La clínica de la insuficiencia aguda. El paciente orina poco, menos de quinientos mililitros por día, o nada. La urea sube: normal es de diez a cincuenta; por encima de cien aparecen náuseas, vómitos, aliento urémico, sangrados y encefalopatía; por encima de doscientos, derrames y pericarditis.',
      'La sobrecarga de volumen da hipertensión, edema e insuficiencia cardíaca. El potasio sube, y por encima de cinco y medio aparecen las alteraciones del electro y las arritmias. Y hay acidosis metabólica.',
    ],
    refs: [I2('07:51'), I2('08:35'), I2('09:17'), I2('09:57'), I2('10:42')],
  },
  {
    id: 't-calcio',
    sec: 'clinica-ira',
    titulo: 'Calcio y fósforo',
    amplio: true,
    bloques: [
      { t: 'clave', text: '**Hipocalcemia**: el riñón no activa la vitamina D (1,25-dihidroxicolecalciferol).' },
      { t: 'texto', en: 1, text: '**Hiperfosfatemia**: no la elimina. Las dos activan la PTH: **hiperparatiroidismo secundario**. Calcio bajo: tetania, calambres.' },
    ],
    examen: { origen: 'ortega', texto: 'Por qué hay hipocalcemia en la insuficiencia renal.', cita: 'Hay una pregunta que le hacen los parciales: la hipocalcemia, ¿por qué? Principalmente porque no se sintetiza vitamina D.', ref: I2('11:36') },
    voz: [
      'Y una pregunta de los parciales: ¿por qué hay hipocalcemia? Porque el riñón es el que activa la vitamina D, y sin vitamina D activa el intestino no absorbe calcio.',
      'Además el riñón no elimina el fósforo, que sube. El calcio bajo y el fósforo alto activan la paratiroides: un hiperparatiroidismo secundario. Y el calcio bajo puede dar calambres y tetania.',
    ],
    refs: [I2('11:27'), I2('11:36'), I2('12:09')],
  },
  {
    id: 't-anemia',
    sec: 'clinica-ira',
    titulo: 'La anemia: aguda o crónica',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'En la **aguda** no hay anemia **al comienzo**: tarda **más de 7 a 10 días** en caer la eritropoyetina.' },
      { t: 'texto', en: 1, text: 'En la **crónica**: anemia **normocítica normocrómica**. Si la aguda no se resuelve, también puede anemizarse.' },
    ],
    examen: { origen: 'ortega', texto: 'La anemia en la insuficiencia renal aguda.', cita: 'La anemia, pregunta de parcial: los pacientes que tienen insuficiencia renal aguda no tienen anemia al comienzo.', ref: I2('12:52') },
    voz: [
      'Y la otra pregunta de parcial: la anemia. Los pacientes con insuficiencia renal aguda no tienen anemia al comienzo, porque tienen que pasar más de siete a diez días para que caiga la eritropoyetina.',
      'Ojo con el matiz: no es que la aguda nunca tenga anemia. Si el cuadro no se resuelve, el paciente puede empezar a anemizarse. Pero al comienzo, no; y la crónica sí tiene anemia.',
    ],
    refs: [I2('12:52'), I2('13:33')],
  },
  {
    id: 't-irc',
    sec: 'cronica',
    titulo: 'Insuficiencia renal crónica',
    amplio: true,
    bloques: [
      { t: 'clave', text: 'Pérdida **progresiva e irreversible** de la función por **más de 3 meses**.' },
      { t: 'lista', en: 1, items: ['1.ª: **nefropatía diabética**.', '2.ª: **nefropatía hipertensiva**.', 'Después: **glomerulopatías** primarias.'] },
    ],
    examen: { origen: 'ortega', texto: 'La causa más frecuente de insuficiencia renal crónica.', cita: 'Pregunta de parcial: ¿cuáles son las etiologías más frecuentes de la insuficiencia renal crónica? La nefropatía diabética… No le dicen eso, los bochan.', ref: I2('27:05') },
    voz: [
      'La insuficiencia renal crónica es la pérdida progresiva e irreversible de la función, durante más de tres meses.',
      'Y la pregunta de parcial: ¿cuál es la causa más frecuente? La nefropatía diabética. El que no lo dice, lo bochan. Le sigue la nefropatía hipertensiva, y después las glomerulopatías primarias.',
    ],
    refs: [I2('25:55'), I2('27:05'), I2('27:13'), I2('27:21'), I2('27:58'), L('p436')],
  },
  {
    id: 't-estadios',
    sec: 'cronica',
    titulo: 'Estadios por filtrado',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Estadio', 'FG (ml/min/1,73 m²)', 'Qué pasa'],
        filas: [
          ['**G1**', '≥ 90', 'Daño con filtrado normal; asintomático'],
          ['**G2**', '60–89', 'Descenso leve: HTA, proteinuria'],
          ['**G3**', '30–59', 'Ya es IRC: **anemia**, calcio y fósforo alterados'],
          ['**G4**', '15–29', 'Acidosis, náuseas, vómitos, edemas'],
          ['**G5**', '< 15', '**Síndrome urémico**: diálisis o trasplante'],
        ],
      },
      { t: 'texto', en: 1, text: 'FG normal ≈ 120 ml/min; desde los 30 años se pierde ≈ 1 ml/min por año. Se estima con **Cockcroft-Gault**.' },
      { t: 'texto', en: 1, soloWeb: true, text: 'Diálisis de urgencia (preguntero, **A-E-I-O-U**): **A**cidosis, **E**lectrolitos (hiperpotasemia), **I**ntoxicaciones, **O**verload (sobrecarga de volumen), **U**remia.' },
    ],
    voz: [
      'La crónica se clasifica por el filtrado glomerular. G uno, filtrado normal o alto, con algún daño: no da síntomas. G dos, entre sesenta y noventa: hipertensión, proteinuria. G tres, entre treinta y sesenta: ya es una insuficiencia, y aparecen la anemia y las alteraciones del calcio y el fósforo. G cuatro, entre quince y treinta: acidosis, náuseas, vómitos, edemas. Y G cinco, menos de quince: el síndrome urémico, con diálisis o trasplante.',
      'El filtrado normal ronda los ciento veinte mililitros por minuto, se pierde alrededor de uno por año desde los treinta, y se estima con la fórmula de Cockcroft-Gault.',
    ],
    refs: [I2('28:40'), I2('29:21'), I2('30:44'), I2('32:06'), I3('00:02'), I3('02:26'), L('p436')],
  },
  {
    id: 't-irc-clinica',
    sec: 'clinica-irc',
    titulo: 'El paciente renal crónico',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Qué aparece'],
        filas: [
          ['Sangre', '**Anemia** normocítica normocrómica; diátesis hemorrágica (plaquetas urémicas)'],
          ['Hueso', '**Osteodistrofia**: cráneo en sal y pimienta, falanges reabsorbidas'],
          ['Piel', 'Pálida y terrosa, **escarcha urémica**, prurito, aliento urémico'],
          ['Nervios', '**Polineuropatía** (en el diabético, casi seguro)'],
          ['Corazón', '**HTA**; con urea > 200, pericarditis'],
        ],
      },
    ],
    voz: [
      'El paciente renal crónico. En la sangre, anemia normocítica normocrómica, lo que más lo caracteriza, y tendencia a sangrar porque la urea altera las plaquetas. En el hueso, la osteodistrofia. En la piel, palidez terrosa, y hasta la escarcha urémica, urea que se cristaliza con el sudor, prurito y aliento urémico.',
      'En los nervios, una polineuropatía: si la causa es la diabetes, casi seguro la tiene, y el profesor avisa que en el parcial pueden combinar los temas. Y en el corazón, hipertensión, y con la urea muy alta, pericarditis.',
    ],
    refs: [I3('03:52'), I3('05:16'), I3('06:39'), I3('07:20'), I3('08:42'), I3('10:06'), L('p438')],
  },
  {
    id: 't-aguda-cronica',
    sec: 'clinica-irc',
    titulo: 'Aguda o crónica',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Aguda', 'Crónica'],
        filas: [
          ['Tiempo', 'Horas o días', '> 3 meses'],
          ['Reversible', 'Sí (> 80 %)', 'No'],
          ['Anemia', '**No al comienzo**', '**Sí**'],
          ['**Ecografía**', 'Riñones **normales o grandes**', 'Riñones **chicos y granulares**'],
          ['Hueso', 'Normal', 'Osteodistrofia'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'La ecografía en la insuficiencia renal aguda y crónica.', cita: 'En la insuficiencia renal crónica el riñón está disminuido de tamaño y de aspecto granular, y en la aguda suele estar aumentado de tamaño. Pregunta de parcial.', ref: I3('11:53') },
    voz: [
      'Y cómo se diferencian. La aguda dura horas o días y suele revertir; la crónica dura más de tres meses y no revierte. La aguda no tiene anemia al comienzo; la crónica sí. La crónica tiene osteodistrofia.',
      'Y lo que el profesor marca como pregunta de parcial: la ecografía. En la crónica, los riñones están chicos y de aspecto granular; en la aguda, de tamaño normal o aumentados.',
    ],
    refs: [I2('12:52'), I3('11:25'), I3('11:53'), I3('12:06'), I3('13:28'), L('p439')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'definicion', label: 'Qué es' },
    { id: 'aguda', label: 'Aguda' },
    { id: 'clinica-ira', label: 'Clínica de la aguda' },
    { id: 'cronica', label: 'Crónica' },
    { id: 'clinica-irc', label: 'Clínica de la crónica' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Diarrea de tres días',
    texto: 'Anciana con diarrea de tres días que orina muy poco. Creatinina 2,4 (basal 0,9). Sodio urinario 12 mEq/l, sedimento normal.',
    pregunta: '¿Qué tipo de insuficiencia es?',
    opciones: [
      { text: 'IRA prerrenal: túbulo sano que retiene sodio.', why: 'Hipovolemia, Na urinario < 20, sedimento normal.' },
      { text: 'Necrosis tubular aguda.', why: 'Daría Na urinario > 40 y cilindros granulosos.' },
      { text: 'IRA posrenal.', why: 'No hay datos de obstrucción.' },
      { text: 'Insuficiencia renal crónica.', why: 'Hay una creatinina basal normal: es aguda.' },
    ],
    correcta: 0,
    razonamiento: 'La deshidratación baja la perfusión; el túbulo sano reabsorbe todo el sodio que puede.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Diabético con creatinina alta',
    texto: 'Diabético de 20 años de evolución, con anemia normocítica normocrómica, creatinina 4 mg/dl y polineuropatía. La ecografía muestra riñones chicos y granulares.',
    pregunta: '¿Aguda o crónica?',
    opciones: [
      { text: 'Insuficiencia renal crónica por nefropatía diabética.', why: 'Anemia, riñones chicos y la causa más frecuente de IRC.' },
      { text: 'IRA prerrenal.', why: 'No tendría anemia al comienzo ni riñones chicos.' },
      { text: 'Necrosis tubular aguda.', why: 'Los riñones serían normales o grandes.' },
      { text: 'IRA posrenal.', why: 'Daría hidronefrosis.' },
    ],
    correcta: 0,
    razonamiento: 'Riñones chicos y granulares + anemia = crónica; la diabetes es la causa más frecuente.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Contar RIFLE',
    texto: 'Paciente internado con creatinina basal 1,0 que sube a 2,2 mg/dl en 48 h, con diuresis de 0,4 ml/kg/h durante 14 horas.',
    pregunta: '¿En qué categoría de RIFLE está?',
    opciones: [
      { text: 'Injuria (lesión).', why: 'Creatinina más del doble o diuresis < 0,5 ml/kg/h por 12 h.' },
      { text: 'Riesgo.', why: 'Supera los criterios de riesgo.' },
      { text: 'Fallo.', why: 'No llega al triple ni a < 0,3 ml/kg/h por 24 h.' },
      { text: 'No es IRA.', why: 'La creatinina subió más del 50 % y la diuresis cayó.' },
    ],
    correcta: 0,
    razonamiento: '× 2,2 de creatinina y 14 h con < 0,5 ml/kg/h: injuria.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'agu',
        label: 'Insuficiencia aguda',
        tone: 'red',
        examen: true,
        nota: 'Horas o días · reversible',
        hijos: [
          { id: 'rif', label: 'RIFLE y AKIN', tone: 'red', examen: true, nota: 'Creatinina y diuresis (< 0,5 ml/kg/h)' },
          { id: 'cau', label: 'Causas', tone: 'peach', examen: true, nota: '**Prerrenal** (la más frecuente) · renal (**NTA**) · posrenal (próstata)' },
          { id: 'sod', label: 'Sodio urinario', tone: 'sky', examen: true, nota: 'Prerrenal < 20 (túbulo sano) · NTA > 40 (túbulo dañado)' },
          { id: 'ane', label: 'Anemia', tone: 'rose', examen: true, nota: '**No al comienzo** (7–10 días)' },
        ],
      },
      {
        id: 'cro',
        label: 'Insuficiencia crónica',
        tone: 'lilac',
        examen: true,
        nota: '> 3 meses · irreversible',
        hijos: [
          { id: 'ccau', label: 'Causas', tone: 'lilac', examen: true, nota: '**Nefropatía diabética** · hipertensiva · glomerulopatías' },
          { id: 'est', label: 'Estadios', tone: 'sky', nota: 'G1 ≥ 90 … G5 < 15 (síndrome urémico)' },
          { id: 'cli', label: 'Clínica', tone: 'gold', nota: 'Anemia · osteodistrofia · escarcha urémica · polineuropatía' },
          { id: 'eco', label: 'Ecografía', tone: 'red', examen: true, nota: 'Riñones **chicos y granulares**' },
        ],
      },
    ],
    nexos: ['**Calcio bajo:** el riñón no activa la vitamina D.', '**Aguda vs crónica:** anemia y tamaño renal.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren05-d01', 'ren05-d02', 'ren05-d03', 'ren05-d04', 'ren05-d05', 'ren05-d06'],
  anclas: {
    ubicate: { tab: 'mapa' },
    definicion: { tab: 'teoria', seccion: 'definicion' },
    aguda: { tab: 'teoria', seccion: 'aguda' },
    'clinica-ira': { tab: 'teoria', seccion: 'clinica-ira' },
    cronica: { tab: 'teoria', seccion: 'cronica' },
    'clinica-irc': { tab: 'teoria', seccion: 'clinica-irc' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    integracion: { tab: 'cierre' },
  },
};
