import type { SourceRef } from '@/types';
import type { CasoClase, Diapositiva, Mazo, PlanClase } from '@/clase/tipos';
import video from './clase-video.json';

/*
 * ren-01: clase visual de los motivos de consulta nefrourológicos.
 *  1. Clases de Ortega: «Motivos de consulta de renal parte 1» (00:01–36:10) y «parte 2» (00:03–32:45).
 *  2. Libro de Clínica Médica de Ortega (p. 445–454): edema renal, dolor lumbar, obstrucción (algoritmo p. 448),
 *     poliuria, hematuria, Fasset.
 *  3. Preguntero: «Urinario — MC: edema, dolor, micción y alteraciones urinarias».
 * Ver content/traceability/ren-01.md.
 */
const r = (src: string, t?: string, p?: string): SourceRef => ({ src, t, p });
const M1 = (t: string) => r('mc-ren-1', t);
const M2 = (t: string) => r('mc-ren-2', t);
const L = (p: string) => r('libro', undefined, p);

const GRAL = 'Fisiología general, no se da en la clase.';

/* ═══════════════════════════ FISIOPATOLOGÍA ═══════════════════════════ */

const diapoFisio: Diapositiva[] = [
  {
    id: 'f-edemas',
    sec: 'edema',
    titulo: 'Tres maneras de hacer edema',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'glomerulo', vistas: ['nefrotico', 'nefritico', 'normal'] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Nefrótico', tono: 'gold', text: 'Se pierde **albúmina** por la orina → baja la **presión oncótica**: el líquido se va a los tejidos.' },
      { t: 'def', term: 'Nefrítico', tono: 'red', en: 1, text: 'El glomérulo inflamado **filtra menos** y los capilares se vuelven **más permeables**: se retienen sal y agua.' },
      { t: 'def', term: 'Insuficiencia renal', tono: 'sky', en: 2, text: 'Cae el **filtrado**: se retiene líquido y sube la **presión hidrostática**.' },
    ],
    voz: [
      'El profesor quiere que se sepa que el edema renal se produce por tres cosas diferentes. En el síndrome nefrótico, el glomérulo deja pasar la albúmina, que se pierde por la orina; baja la presión oncótica, y el líquido se va a los tejidos.',
      'En el síndrome nefrítico, el glomérulo está inflamado: filtra menos, y los capilares se vuelven más permeables. El cuerpo retiene sal y agua.',
      'Y en la insuficiencia renal, cae el filtrado: el líquido que no se elimina se queda en los vasos, sube la presión hidrostática, y sale a los tejidos.',
    ],
    refs: [M1('01:26'), M1('01:42'), M1('02:09'), M1('02:51'), L('p445')],
  },
  {
    id: 'f-capsula',
    sec: 'edema',
    titulo: 'Por qué duele el riñón',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['rinon-d'], dilata: ['rinon-d'], tone: 'sky', nota: 'La cápsula se distiende', notaTone: 'sky' }, { luz: ['pelvis-d', 'ureter-d'], calculo: 'ureter-d', dilata: ['pelvis-d'], irradia: true, tone: 'red', nota: 'El uréter lucha contra el cálculo', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'clave', text: 'El **parénquima no duele**: duele la **cápsula** cuando el riñón crece y la estira.' },
      { t: 'texto', en: 1, text: 'En el **cólico**, el uréter se contrae contra un cálculo y se distiende arriba: dolor **fluctuante** que baja hacia los genitales.' },
    ],
    voz: [
      'El riñón en sí no duele. Lo que duele es su cápsula, cuando el riñón aumenta de tamaño y la estira, igual que pasa con el hígado. Por eso una pielonefritis o un tumor dan dolor lumbar.',
      'En el cólico renoureteral, un cálculo frena la orina: el uréter se contrae con fuerza contra el obstáculo, y la vía de arriba se distiende. El dolor va y viene, y baja por el flanco hacia la fosa ilíaca y los genitales.',
    ],
    refs: [M1('04:15'), M1('04:56'), M1('05:44'), M1('06:28'), L('p445')],
  },
  {
    id: 'f-obstruccion',
    sec: 'obstruccion',
    titulo: 'Obstrucción: la orina vuelve atrás',
    etapas: ['alteracion', 'mecanismo', 'signo'],
    fig: { f: 'urinario', vistas: [{ luz: ['prostata', 'vejiga'], dilata: ['prostata', 'vejiga'], tone: 'lilac', nota: 'Infravesical: globo vesical', notaTone: 'lilac' }, { luz: ['ureter-d', 'ureter-i', 'pelvis-d', 'pelvis-i'], dilata: ['ureter-d', 'ureter-i', 'pelvis-d', 'pelvis-i'], tone: 'red', nota: 'Supravesical: hidronefrosis', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      {
        t: 'cadena',
        pasos: [
          { k: 'alteracion', text: 'Algo tapa la vía urinaria, de los túbulos a la uretra.' },
          { k: 'mecanismo', text: 'La orina se acumula y la **presión sube hacia atrás**: vejiga distendida o **hidronefrosis**.' },
          { k: 'signo', text: 'Con presión alta en el túbulo, el glomérulo **deja de filtrar**: **IRA posrenal**, oliguria o anuria.' },
        ],
      },
    ],
    aclara: { text: 'La presión retrógrada en el túbulo se opone a la filtración: por eso la obstrucción baja el filtrado.', origen: GRAL },
    voz: [
      'Cualquier obstrucción, desde los túbulos colectores hasta la uretra, tiene la misma consecuencia. Si la obstrucción está debajo de la vejiga, como en la hiperplasia de próstata, la vejiga se llena y no se vacía: el globo vesical.',
      'Si está arriba, en los uréteres, la orina se acumula en la pelvis y los cálices: la hidronefrosis. En los dos casos la presión sube hacia atrás, hasta el túbulo.',
      'Y con el túbulo a presión, el glomérulo ya no puede filtrar: cae el filtrado, el paciente orina poco o nada, y aparece una insuficiencia renal aguda posrenal.',
    ],
    refs: [M1('19:23'), M1('20:44'), M1('21:24'), M1('22:04'), L('p447')],
  },
  {
    id: 'f-poliuria',
    sec: 'volumen',
    titulo: 'Poliuria osmótica o acuosa',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'nefrona', vistas: [{ luz: ['proximal'], fuga: ['glucosa', 'agua'], tone: 'gold', nota: 'Osmótica: un soluto arrastra agua', notaTone: 'gold' }, { luz: ['colector'], fuga: ['agua'], tone: 'sky', nota: 'Acuosa: el colector no reabsorbe agua', notaTone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Osmótica (> 300 mOsm/l)', tono: 'gold', text: 'Sobra **soluto** en el túbulo (glucosa en la diabetes, urea, diuréticos) y **arrastra agua**.' },
      { t: 'def', term: 'Acuosa (< 200 mOsm/l)', tono: 'sky', en: 1, text: 'Sobra **agua**: falta la ADH o el riñón no le responde (**diabetes insípida**), o se toma demasiada (potomanía).' },
    ],
    aclara: { text: 'Por qué la osmolaridad urinaria separa los dos tipos: en la osmótica la orina lleva mucho soluto; en la acuosa, mucha agua libre.', origen: GRAL },
    voz: [
      'La poliuria, más de tres litros por día, tiene dos mecanismos. En la osmótica, sobra algún soluto en el túbulo, como la glucosa del diabético, y ese soluto arrastra agua con él. La orina sale concentrada: más de trescientos miliosmoles.',
      'En la acuosa, lo que sobra es agua: porque falta la hormona antidiurética, o el riñón no le responde, la diabetes insípida; o porque la persona toma muchísima agua. La orina sale diluida: menos de doscientos.',
    ],
    refs: [M2('02:08'), M2('02:48'), M2('03:30'), M2('06:16'), L('p449')],
  },
  {
    id: 'f-hematuria',
    sec: 'hematuria',
    titulo: 'Dos orígenes de la hematuria',
    etapas: ['mecanismo', 'signo'],
    fig: { f: 'nefrona', vistas: [{ luz: ['glomerulo'], fuga: ['hematies'], tone: 'red', nota: 'Glomerular: dismórficos y cilindros', notaTone: 'red' }, { luz: ['colector'], marca: 'colector', fuga: ['hematies'], tone: 'sky', nota: 'Vía urinaria: isomórficos y coágulos', notaTone: 'sky' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'def', term: 'Glomerular', tono: 'red', text: 'El glóbulo rojo atraviesa la pared dañada y todo el túbulo: se **deforma** (dismórfico, acantocito) y queda moldeado en **cilindros hemáticos**.' },
      { t: 'def', term: 'De la vía urinaria', tono: 'sky', en: 1, text: 'Sangra después del túbulo (cálculo, infección, tumor): eritrocitos **isomórficos**; puede haber **coágulos**.' },
    ],
    voz: [
      'La hematuria tiene dos orígenes, y la orina lo delata. Si la sangre viene del glomérulo, el glóbulo rojo tiene que atravesar la pared dañada y después recorrer todo el túbulo, con sus cambios de concentración: se deforma, y sale dismórfico, como el acantocito. Y como entró antes del túbulo, queda atrapado en moldes de proteína: los cilindros hemáticos.',
      'Si la sangre viene de la vía urinaria, del colector hacia abajo, por un cálculo, una infección o un tumor, el glóbulo no pasó por ese recorrido: sale con su forma normal, isomórfico, y puede formar coágulos.',
    ],
    refs: [M1('13:56'), M1('14:36'), M2('17:09'), M2('17:49'), L('p453')],
  },
];

export const fisio: Mazo = {
  id: 'fisio',
  secciones: [
    { id: 'edema', label: 'Edema y dolor' },
    { id: 'obstruccion', label: 'Obstrucción' },
    { id: 'volumen', label: 'Poliuria' },
    { id: 'hematuria', label: 'Hematuria' },
  ],
  diapos: diapoFisio,
};

/* ═══════════════════════════ TEORÍA ═══════════════════════════ */

const diapoTeoria: Diapositiva[] = [
  {
    id: 't-edema',
    sec: 'edema',
    titulo: 'Los tres edemas renales',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Nefrótico', 'Nefrítico', 'Insuficiencia renal'],
        filas: [
          ['Mecanismo', '↓ **presión oncótica**', '↑ permeabilidad, retención', '↓ **filtrado** → ↑ hidrostática'],
          ['Cómo es', 'Blando, palpebral y genital; puede llegar a **anasarca**', '**Matinal**, periorbitario', '**Generalizado**; piel amarillenta, rascado'],
        ],
      },
      { t: 'prof', en: 1, text: 'Yo quiero que ustedes sepan esto: los edemas renales se producen por tres cosas diferentes.', ref: M1('01:42') },
    ],
    examen: { origen: 'preguntero', texto: '¿Por qué mecanismos se produce el edema de origen renal?' },
    voz: [
      'Los tres edemas renales, en un cuadro. El nefrótico, por baja presión oncótica: blando, en los párpados y los genitales, y puede llegar a la anasarca. El nefrítico, por retención y permeabilidad: matinal y alrededor de los ojos. Y el de la insuficiencia renal, por caída del filtrado: generalizado, con una piel amarillenta y lesiones de rascado por el prurito.',
    ],
    refs: [M1('01:26'), M1('02:09'), M1('02:51'), M1('03:32'), L('p445')],
  },
  {
    id: 't-dolor',
    sec: 'edema',
    titulo: 'Dolor lumbar',
    amplio: true,
    bloques: [
      {
        t: 'comparar',
        cols: [
          { titulo: 'Agudo', tono: 'red', items: ['**Cálculo**: cólico renoureteral', '**Pielonefritis**: con fiebre, náuseas, disuria', 'Infarto renal'] },
          { titulo: 'Crónico', tono: 'lilac', items: ['**Tumor** renal', 'Gravativo, pesado, por el aumento de tamaño'] },
        ],
      },
      { t: 'texto', en: 1, text: 'Moverse lo agrava: contractura del **psoas** (signo del psoas).' },
    ],
    voz: [
      'El dolor lumbar es un motivo de consulta frecuente, y su antigüedad orienta. Si es agudo, se piensa en tres cosas: un cálculo, una pielonefritis, que viene con fiebre, náuseas y disuria, o un infarto renal. Si es crónico, gravativo y pesado, en un tumor que agrandó el riñón.',
      'Moverse lo agrava, y a veces el psoas se contractura: es el signo del psoas.',
    ],
    refs: [M1('04:15'), M1('04:56'), M1('05:26'), M1('06:28'), M1('07:09'), L('p445')],
  },
  {
    id: 't-colico',
    sec: 'edema',
    titulo: 'Cólico renoureteral',
    fig: { f: 'urinario', vistas: [{ luz: ['pelvis-d', 'ureter-d'], calculo: 'ureter-d', dilata: ['pelvis-d'], irradia: true, tone: 'red' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', tono: 'red', text: 'Agudo, **cólico** (fluctuante), desde la fosa lumbar hacia el **flanco**, la **fosa ilíaca**, el hipogastrio y los **genitales**.' },
      { t: 'texto', en: 1, text: 'Con **hematuria**, inquietud (no encuentra posición), náuseas y vómitos.' },
    ],
    examen: { origen: 'preguntero', texto: 'Describa el dolor lumbar de origen renal y el cólico renoureteral.' },
    voz: [
      'El cólico renoureteral es agudo y de tipo cólico: sube y baja, siete sobre diez, después tres, después ocho. Empieza en la fosa lumbar y baja por el flanco hacia la fosa ilíaca, el hipogastrio y los genitales, siguiendo el recorrido del uréter.',
      'Se acompaña de hematuria, y el paciente está inquieto: no encuentra ninguna posición que lo alivie, a diferencia del abdomen agudo peritoneal.',
    ],
    refs: [M1('07:49'), M1('08:34'), M1('09:54'), L('p445')],
  },
  {
    id: 't-obstruccion',
    sec: 'obstruccion',
    titulo: 'El paciente con obstrucción urinaria',
    fig: { f: 'urinario', vistas: [{ luz: ['prostata', 'vejiga'], dilata: ['prostata', 'vejiga'], tone: 'lilac' }] },
    anchoFig: 'chica',
    bloques: [
      { t: 'clave', text: 'Cualquier obstrucción, de los **túbulos colectores a la uretra**, puede llevar a una **IRA posrenal**.' },
      { t: 'texto', en: 1, text: 'Sospecharla ante **oliguria o anuria** con dificultad para orinar.' },
    ],
    examen: { origen: 'ortega', texto: 'El paciente con obstrucción urinaria.', cita: 'Estos pacientes que tienen una obstrucción urinaria: esto es pregunta de parcial.', ref: M1('25:22') },
    voz: [
      'El paciente con obstrucción urinaria es pregunta de parcial. Cualquier obstrucción que afecte cualquier sector de la vía urinaria, desde los túbulos colectores hasta la uretra, puede llevar a una insuficiencia renal aguda posrenal.',
      'Se sospecha en un paciente que orina poco o nada, y que tiene dificultad para orinar.',
    ],
    refs: [M1('19:23'), M1('20:44'), M1('25:22'), L('p447')],
  },
  {
    id: 't-obstruccion-causas',
    sec: 'obstruccion',
    titulo: 'Dónde está la obstrucción',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['Sitio', 'Causas'],
        filas: [
          ['Próstata y uretra', '**Hiperplasia de próstata** (la más frecuente en el hombre, ≈ 77 %); cálculo o coágulo en la uretra'],
          ['Vejiga', '**Vejiga neurogénica**: hipotónica (diabético), espástica (después de un ACV)'],
          ['Uréteres (bilateral)', 'Tumores pelvianos, fibrosis retroperitoneal: **sin globo vesical**'],
          ['Dentro del riñón', 'Túbulo colector: **mieloma** (Bence Jones), cristales de **ácido úrico**'],
        ],
      },
    ],
    voz: [
      'Las causas, según el sitio. Debajo de la vejiga, la más frecuente en el hombre es la hiperplasia de próstata, alrededor del setenta y siete por ciento; también un cálculo o un coágulo en la uretra. En la vejiga, la vejiga neurogénica: hipotónica en el diabético con neuropatía, o espástica después de un ACV.',
      'Arriba de la vejiga tiene que ser bilateral para dar insuficiencia, como un tumor pelviano o una fibrosis retroperitoneal; ahí no hay globo vesical. Y dentro del riñón, en el túbulo colector, el mieloma múltiple o los cristales de ácido úrico.',
    ],
    refs: [M1('20:44'), M1('21:24'), M1('22:04'), M1('27:26'), L('p447')],
  },
  {
    id: 't-obstruccion-conducta',
    sec: 'obstruccion',
    titulo: 'Qué hacer: el globo vesical',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Hay globo vesical', tono: 'peach', text: 'Obstrucción **infravesical** → **cateterismo vesical** (sonda): ¿mejora la función renal?' },
      { t: 'def', term: 'No hay globo', tono: 'sky', en: 1, text: 'Obstrucción **supravesical** → **ecografía renal**: con hidronefrosis, estudiar la vía (TAC, urología); sin hidronefrosis, obstrucción improbable.' },
      { t: 'texto', en: 2, soloWeb: true, text: 'Rx de abdomen: el 80–90 % de los cálculos son de oxalato de calcio y se ven; la TAC sin contraste es el estándar para localizarlos.' },
    ],
    voz: [
      'La conducta arranca por el examen: se palpa y se percute arriba del pubis. Si hay globo vesical, la obstrucción está debajo de la vejiga, y se coloca una sonda vesical: si la función renal mejora, se confirma.',
      'Si no hay globo, la obstrucción está arriba, y se pide una ecografía renal. Si muestra hidronefrosis, se sigue estudiando la vía con tomografía y urología; si no la muestra, la obstrucción es improbable, y hay que buscar otra causa.',
    ],
    refs: [M1('28:46'), M1('29:27'), M1('30:47'), L('p448')],
  },
  {
    id: 't-volumen',
    sec: 'volumen',
    titulo: 'Cuánto orina',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['En 24 horas', 'Nombre', 'Pensar en'],
        filas: [
          ['< 50–100 ml', '**Anuria**', 'Obstrucción completa, IRA, causa vascular'],
          ['< 500 ml', '**Oliguria**', 'Prerrenal (deshidratación), renal o posrenal'],
          ['1–2 l', 'Normal', ''],
          ['> 3 l', '**Poliuria**', 'Osmótica o acuosa'],
        ],
      },
      {
        t: 'cuadro',
        en: 1,
        head: ['De noche', ''],
        filas: [
          ['**Nicturia**', 'Se levanta varias veces a orinar'],
          ['**Nocturia**', 'Orina más volumen de noche que de día (inversión del ritmo)'],
          ['**Enuresis**', 'Micción involuntaria durante el sueño (niños)'],
        ],
      },
    ],
    voz: [
      'El volumen. Lo normal es uno a dos litros por día. Menos de quinientos mililitros es oliguria, que puede ser prerrenal, por deshidratación, renal, o posrenal, por obstrucción. Menos de cincuenta a cien es anuria. Y más de tres litros, poliuria.',
      'Y de noche: la nicturia es levantarse varias veces a orinar; la nocturia, orinar más volumen de noche que de día; y la enuresis, orinarse dormido, típica de los chicos.',
    ],
    refs: [M1('32:48'), M1('34:50'), M1('35:30'), M2('09:41'), M2('11:04'), M2('11:46'), L('p449')],
  },
  {
    id: 't-poliuria',
    sec: 'volumen',
    titulo: 'Cómo se estudia la poliuria',
    amplio: true,
    bloques: [
      {
        t: 'arbol',
        raiz: {
          t: '**Poliuria** → osmolaridad urinaria',
          hijos: [
            {
              t: '**> 300**: osmótica',
              tono: 'gold',
              hijos: [
                { t: 'Glucosuria +', d: 'Glucemia alta: **diabetes**; normal: Fanconi' },
                { t: 'Glucosuria −', d: 'Urea alta: IRA, posobstructiva; normal: **diuréticos**' },
              ],
            },
            {
              t: '**< 200**: acuosa',
              tono: 'sky',
              hijos: [
                { t: 'Natremia normal', d: '**Potomanía**' },
                { t: 'Natremia alta', d: '**Diabetes insípida**: ADH → responde = central; no = nefrogénica' },
              ],
            },
          ],
        },
      },
    ],
    examen: { origen: 'ortega', texto: 'El cuadro de la poliuria.', cita: 'Este cuadrito lo pregunta… se lo sabe en sangre.', ref: M2('08:38') },
    voz: [
      'Y cómo se estudia, un cuadro que se pregunta. Se arranca por la osmolaridad urinaria. Si es mayor de trescientos, la diuresis es osmótica: si hay glucosa en la orina y la glucemia está alta, es una diabetes; si la glucemia es normal, un defecto del túbulo. Sin glucosuria, si la urea está alta, una insuficiencia renal o una poliuria posobstructiva; si es normal, los diuréticos.',
      'Si la osmolaridad es menor de doscientos, la diuresis es acuosa. Con el sodio normal, la persona toma demasiada agua: potomanía. Con el sodio alto, una diabetes insípida; se da hormona antidiurética: si responde, es central; si no responde, nefrogénica.',
    ],
    refs: [M2('02:08'), M2('02:48'), M2('03:30'), M2('06:16'), M2('07:37'), M2('08:38'), L('p449'), L('p450')],
  },
  {
    id: 't-aspecto',
    sec: 'hematuria',
    titulo: 'Aspecto de la orina',
    amplio: true,
    bloques: [
      { t: 'def', term: 'Normal', tono: 'gold', text: 'Amarillo ámbar (urocromos), **límpida**, poca espuma que desaparece.' },
      { t: 'def', term: 'Mucha espuma que no se va', tono: 'sky', en: 1, text: 'Pensar en **proteinuria**: el problema es del glomérulo.' },
      { t: 'def', term: 'Roja sin glóbulos', tono: 'red', en: 2, text: '**Seudohematuria**: remolacha, rifampicina, hemoglobinuria. Se confirma con el sedimento.' },
    ],
    examen: { origen: 'ortega', texto: 'Interpretar las características de la orina.', cita: 'Esto es importante, porque es pregunta de parcial… es importante empezar a interpretar las características de la orina.', ref: M2('12:14') },
    voz: [
      'Interpretar la orina es pregunta de parcial, y sirve para toda la vida. La orina normal es amarillo ámbar por los urocromos, límpida, y la poca espuma que hace se va enseguida.',
      'Si hace mucha espuma que no se va, hay que pensar en proteínas: el problema viene del glomérulo.',
      'Y no todo lo rojo es sangre: la remolacha, algunos fármacos como la rifampicina, o la hemoglobina libre colorean la orina. Si el sedimento no muestra glóbulos rojos, es una seudohematuria.',
    ],
    refs: [M2('12:08'), M2('12:27'), M2('13:07'), L('p451')],
  },
  {
    id: 't-hematuria',
    sec: 'hematuria',
    titulo: 'Hematuria',
    amplio: true,
    bloques: [
      { t: 'clave', tono: 'red', text: 'Sangre en la orina. **Macroscópica** (se ve) o **microscópica** (más de **3 eritrocitos por campo**).' },
      { t: 'lista', en: 1, items: ['Persistente o **transitoria** (ejercicio, fiebre, actividad sexual, traumatismo).', 'Se estudia con el **sedimento fresco**: cuántos, qué forma, cilindros.'] },
    ],
    examen: { origen: 'ortega', texto: 'El paciente con hematuria.', cita: 'Es una pregunta de parcial, pregunta de final, pregunta para todos.', ref: M2('14:33') },
    voz: [
      'La hematuria es pregunta de parcial, de final, pregunta para todos. Es la presencia de sangre en la orina: macroscópica, cuando se ve, o microscópica, cuando el sedimento muestra más de tres eritrocitos por campo.',
      'Puede ser persistente o transitoria, después del ejercicio, la fiebre, la actividad sexual o un traumatismo. Se estudia con un sedimento de orina fresco: cuántos glóbulos hay, qué forma tienen, y si hay cilindros.',
    ],
    refs: [M2('11:46'), M2('14:27'), M2('14:33'), M2('15:07'), M2('15:47'), L('p451')],
  },
  {
    id: 't-hematuria-origen',
    sec: 'hematuria',
    titulo: 'Glomerular o de la vía urinaria',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Tipo I · glomerular', 'Tipo II · no glomerular'],
        filas: [
          ['Eritrocitos', '**Dismórficos** (acantocito); > 80 % = glomerular', '**Isomórficos**'],
          ['Acompaña', '**Cilindros hemáticos**, proteinuria', '**Coágulos**'],
          ['Causas', 'Glomerulonefritis', '**Infecciones, litiasis**, tumores, quistes'],
        ],
      },
    ],
    examen: { origen: 'ortega', texto: 'Hematuria isomórfica y dismórfica.', cita: 'Y obviamente eso tiene que saber, si no para el parcial, porque es pregunta de parcial.', ref: M1('14:54') },
    voz: [
      'Lo que se pide sí o sí es la clasificación por el origen. La hematuria glomerular, o tipo uno, tiene eritrocitos dismórficos, sobre todo acantocitos; si más del ochenta por ciento están deformados, es glomerular. Se acompaña de cilindros hemáticos y proteinuria, y la causa son las glomerulonefritis.',
      'La no glomerular, o tipo dos, viene de la vía urinaria: eritrocitos isomórficos, a veces coágulos, y las causas más frecuentes son las infecciones y la litiasis; también tumores y quistes.',
    ],
    refs: [M1('13:56'), M1('14:36'), M1('14:54'), M2('17:09'), M2('17:49'), M2('19:49'), L('p453')],
  },
  {
    id: 't-tres-vasos',
    sec: 'hematuria',
    titulo: 'Prueba de los tres vasos',
    fig: { f: 'urinario', vistas: [{ luz: ['uretra', 'prostata'], vasos: [true, false, false], tone: 'lilac', nota: 'Inicial: uretra o próstata', notaTone: 'lilac' }, { luz: ['vejiga'], vasos: [false, false, true], tone: 'peach', nota: 'Terminal: vejiga', notaTone: 'peach' }, { luz: ['rinon-d', 'rinon-i'], vasos: [true, true, true], tone: 'red', nota: 'Total: riñón', notaTone: 'red' }] },
    anchoFig: 'media',
    bloques: [
      { t: 'texto', text: 'El paciente orina en **tres vasos** seguidos.' },
      { t: 'def', term: 'Inicial', tono: 'lilac', en: 0, text: 'Solo el 1.º: **uretra o próstata**.' },
      { t: 'def', term: 'Terminal', tono: 'peach', en: 1, text: 'Solo el 3.º: **vejiga**.' },
      { t: 'def', term: 'Total', tono: 'red', en: 2, text: 'Los tres: **riñón**.' },
    ],
    examen: { origen: 'ortega', texto: 'La prueba de los tres vasos.', cita: 'Si es al principio, al final o en los tres vasitos, con la prueba de los tres vasos: pregunta de parcial.', ref: M2('20:13') },
    voz: [
      'Y la prueba de los tres vasos, pregunta de parcial. El paciente orina en tres vasos seguidos, de principio a fin. Si solo el primero tiene sangre y después se aclara, la sangre viene de la uretra o la próstata: la arrastra el primer chorro.',
      'Si los dos primeros salen limpios y el último con sangre, viene de la vejiga, que se exprime al final de la micción.',
      'Y si los tres tienen sangre de principio a fin, la sangre viene de arriba, del riñón, y está mezclada con toda la orina.',
    ],
    refs: [M2('18:29'), M2('18:51'), M2('19:09'), M2('20:13'), L('p452')],
  },
  {
    id: 't-miccion',
    sec: 'miccion',
    titulo: 'Trastornos de la micción',
    amplio: true,
    bloques: [
      {
        t: 'cuadro',
        head: ['', 'Qué es', 'Pensar en'],
        filas: [
          ['**Disuria**', 'Dolor o ardor al orinar', '**Infección urinaria baja** (90 %)'],
          ['**Estranguria**', 'Micción lenta, difícil y dolorosa, gota a gota', 'Hiperplasia de próstata'],
          ['**Polaquiuria**', 'Orina **muchas veces y poco**', 'Inflamación de vejiga o uretra'],
          ['**Tenesmo vesical**', 'Sigue con ganas después de vaciar', 'Cistitis, obstrucción'],
          ['**Retención**', 'No puede vaciar: **globo vesical**', 'Próstata (hombre); infecciones (mujer)'],
        ],
      },
      { t: 'texto', en: 1, text: '**Polaquiuria ≠ poliuria**: una es frecuencia, la otra es volumen.' },
    ],
    voz: [
      'Y los trastornos de la micción. La disuria es el dolor o ardor al orinar: en el noventa por ciento, una infección urinaria baja. La estranguria, una micción lenta, difícil y dolorosa, gota a gota, típica de la hiperplasia de próstata. La polaquiuria, orinar muchas veces y poco. El tenesmo vesical, quedar con ganas después de vaciar. Y la retención, no poder vaciar la vejiga, con un globo vesical.',
      'Y una confusión clásica: la polaquiuria es frecuencia, muchas veces poco; la poliuria es volumen, mucho en total.',
    ],
    refs: [M1('15:16'), M1('15:57'), M1('16:37'), M1('17:17'), M1('17:57')],
  },
];

export const teoria: Mazo = {
  id: 'teoria',
  secciones: [
    { id: 'edema', label: 'Edema y dolor' },
    { id: 'obstruccion', label: 'Obstrucción' },
    { id: 'volumen', label: 'Volumen' },
    { id: 'hematuria', label: 'Orina y hematuria' },
    { id: 'miccion', label: 'Micción' },
  ],
  diapos: diapoTeoria,
};

/* ═══════════════════════════ CASOS ═══════════════════════════ */

const casos: CasoClase[] = [
  {
    id: 'c1',
    origen: 'practica',
    titulo: 'Hombre de 75 años que casi no orina',
    texto: 'Desde hace meses orina con chorro débil y goteo. Hace un día casi no orina, tiene dolor suprapúbico y se palpa una masa mate arriba del pubis. La creatinina está alta.',
    pregunta: '¿Qué tiene y qué se hace primero?',
    opciones: [
      { text: 'Obstrucción infravesical por próstata con globo vesical: sonda vesical.', why: 'IRA posrenal; si la función mejora con la sonda, se confirma.' },
      { text: 'Insuficiencia prerrenal: hidratar.', why: 'El globo vesical indica obstrucción.' },
      { text: 'Glomerulonefritis: biopsia.', why: 'No hay datos glomerulares.' },
      { text: 'Ecografía renal antes de tocarlo.', why: 'Con globo vesical, primero se sondea.' },
    ],
    correcta: 0,
    razonamiento: 'Hiperplasia de próstata, la causa más frecuente en el hombre; globo vesical = infravesical → cateterismo.',
  },
  {
    id: 'c2',
    origen: 'practica',
    titulo: 'Orina roja con coágulos',
    texto: 'Hombre de 65 años, fumador, con hematuria macroscópica indolora y coágulos. Sedimento: eritrocitos isomórficos, sin cilindros.',
    pregunta: '¿De dónde viene la sangre?',
    opciones: [
      { text: 'De la vía urinaria (no glomerular): estudiar con urología.', why: 'Isomórficos y coágulos.' },
      { text: 'Del glomérulo.', why: 'Daría dismórficos y cilindros.' },
      { text: 'Seudohematuria.', why: 'Hay eritrocitos en el sedimento.' },
      { text: 'Es transitoria, no requiere estudio.', why: 'Indolora y con coágulos en un fumador: hay que buscar un tumor.' },
    ],
    correcta: 0,
    razonamiento: 'Hematuria tipo II: el glóbulo no atravesó el glomérulo; los coágulos son siempre urológicos.',
  },
  {
    id: 'c3',
    origen: 'practica',
    titulo: 'Orina mucho y tiene sed',
    texto: 'Joven que orina 6 litros por día. Osmolaridad urinaria 120 mOsm/l, sodio en sangre alto. Con la ADH, la orina se concentra.',
    pregunta: '¿Qué tiene?',
    opciones: [
      { text: 'Diabetes insípida central.', why: 'Poliuria acuosa con sodio alto que responde a la ADH.' },
      { text: 'Diabetes mellitus.', why: 'Daría poliuria osmótica (> 300) con glucosuria.' },
      { text: 'Potomanía.', why: 'El sodio sería normal o bajo.' },
      { text: 'Diabetes insípida nefrogénica.', why: 'No respondería a la ADH.' },
    ],
    correcta: 0,
    razonamiento: 'Osmolaridad < 200 = acuosa; natremia alta = diabetes insípida; responde a la ADH = central.',
  },
];

export const clase: PlanClase = {
  mapa: {
    raices: [
      {
        id: 'ede',
        label: 'Edema y dolor',
        tone: 'gold',
        nota: 'Tres edemas renales · el riñón no duele: duele la cápsula',
        hijos: [
          { id: 'tres', label: 'Edemas', tone: 'gold', nota: 'Nefrótico (oncótica) · nefrítico (retención, permeabilidad) · IR (filtrado)' },
          { id: 'col', label: 'Cólico renoureteral', tone: 'red', nota: 'Fluctuante, de la fosa lumbar a los genitales · hematuria · inquietud' },
        ],
      },
      {
        id: 'obs',
        label: 'Obstrucción',
        tone: 'lilac',
        examen: true,
        nota: 'De los túbulos a la uretra → IRA posrenal',
        hijos: [
          { id: 'glo', label: 'Globo vesical', tone: 'lilac', examen: true, nota: 'Infravesical → sonda · sin globo → ecografía (hidronefrosis)' },
        ],
      },
      {
        id: 'ori',
        label: 'La orina',
        tone: 'red',
        examen: true,
        nota: 'Volumen, aspecto y sangre',
        hijos: [
          { id: 'pol', label: 'Poliuria', tone: 'sky', examen: true, nota: '> 300 osmótica · < 200 acuosa (DI: central o nefrogénica)' },
          { id: 'hem', label: 'Hematuria', tone: 'red', examen: true, nota: 'Glomerular: dismórficos, cilindros · vía urinaria: isomórficos, coágulos · **tres vasos**' },
          { id: 'mic', label: 'Micción', tone: 'peach', nota: 'Disuria · estranguria · polaquiuria ≠ poliuria · tenesmo · retención' },
        ],
      },
    ],
    nexos: ['**Espuma que no se va:** proteinuria (glomérulo).', '**Coágulos:** siempre urológicos.'],
  },
  fisio,
  teoria,
  video: video.src ? (video as PlanClase['video']) : undefined,
  casos,
  simulacroDesarrollos: ['ren01-d01', 'ren01-d02', 'ren01-d03', 'ren01-d04'],
  anclas: {
    ubicate: { tab: 'mapa' },
    edema: { tab: 'teoria', seccion: 'edema' },
    obstruccion: { tab: 'teoria', seccion: 'obstruccion' },
    volumen: { tab: 'teoria', seccion: 'volumen' },
    hematuria: { tab: 'teoria', seccion: 'hematuria' },
    miccion: { tab: 'teoria', seccion: 'miccion' },
    radar: { tab: 'desarrollo' },
    choice: { tab: 'choice' },
    desarrollos: { tab: 'desarrollo' },
    memoria: { tab: 'memoria' },
    maniobras: { tab: 'maniobras' },
    integracion: { tab: 'cierre' },
  },
};
