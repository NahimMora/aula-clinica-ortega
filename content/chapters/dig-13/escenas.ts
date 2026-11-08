import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-13 (cirrosis e hipertensión portal). Clases Cirrosis 1–2 y HTP 1–2.
export const escenas: Escena[] = [
  {
    tipo: 'flujo',
    id: 'htp',
    titulo: 'Hipertensión portal: la sangre busca otra salida',
    nodos: [
      { id: 'cir', x: 480, y: 70, t: 'Cirrosis: hígado fibroso y duro', w: 300, tono: 'lilac' },
      { id: 'pres', x: 480, y: 190, t: 'Presión portal > 12 mmHg', w: 280, tono: 'red' },
      { id: 'esof', x: 130, y: 340, t: 'Gastroesofágicas → VÁRICES', w: 230, tono: 'red' },
      { id: 'umb', x: 360, y: 340, t: 'Paraumbilical → cabeza de medusa', w: 220, tono: 'peach' },
      { id: 'rect', x: 640, y: 340, t: 'Rectales → hemorroides', w: 220, tono: 'gold' },
      { id: 'bazo', x: 860, y: 340, t: 'Bazo → esplenomegalia', w: 190, tono: 'sky' },
      { id: 'hda', x: 130, y: 500, t: 'Hemorragia: causa de muerte', w: 240, tono: 'red' },
      { id: 'hiper', x: 845, y: 500, t: 'Hiperesplenismo: pancitopenia', w: 220, tono: 'sky' },
      { id: 'asc', x: 490, y: 500, t: 'ASCITIS', w: 200, tono: 'mint' },
    ],
    lazos: [
      { a: 'cir', b: 'pres' },
      { a: 'pres', b: 'esof' },
      { a: 'pres', b: 'umb' },
      { a: 'pres', b: 'rect' },
      { a: 'pres', b: 'bazo' },
      { a: 'esof', b: 'hda' },
      { a: 'bazo', b: 'hiper' },
      { a: 'pres', b: 'asc' },
    ],
    pasos: [
      {
        ver: ['cir', 'pres'],
        di: 'En la cirrosis el hígado se fibrosa y se endurece: la sangre de la vena porta no puede atravesarlo. La presión del sistema porta sube por encima de 12 milímetros de mercurio: eso es la hipertensión portal, y la cirrosis es su causa más frecuente.',
        retener: ['HTP > 12 mmHg', 'Causa n.º 1: cirrosis'],
      },
      {
        ver: ['cir', 'pres', 'esof', 'hda'],
        di: 'La sangre vuelve para atrás y busca otros caminos hacia la vena cava: las circulaciones colaterales portocava. La más peligrosa es la gastroesofágica: aparecen las várices esofágicas, que pueden sangrar. Es una causa de muerte muy frecuente en estos pacientes.',
        retener: ['Várices esofágicas', 'Colateral profunda'],
      },
      {
        ver: ['cir', 'pres', 'esof', 'hda', 'umb', 'rect'],
        di: 'Otra se abre en el ombligo, por la vena paraumbilical: la cabeza de medusa, que es la colateral superficial que ves en la piel. Y otra en el recto: las hemorroides.',
        retener: ['Cabeza de medusa: superficial', 'Hemorroides'],
      },
      {
        ver: ['cir', 'pres', 'esof', 'hda', 'umb', 'rect', 'bazo', 'hiper'],
        di: 'La sangre también se estanca en el bazo: esplenomegalia. Ese bazo grande trabaja de más, hiperesplenismo, y destruye las células de la sangre: anemia, leucopenia y plaquetopenia.',
        retener: ['Esplenomegalia', 'Hiperesplenismo: pancitopenia'],
      },
      {
        ver: ['cir', 'pres', 'esof', 'hda', 'umb', 'rect', 'bazo', 'hiper', 'asc'],
        di: 'Y por el aumento de presión sale líquido a la cavidad peritoneal: ascitis. El profe lo pide como pregunta de examen: hipertensión portal es várices, ascitis, esplenomegalia y circulación colateral.',
        retener: ['Várices · ascitis · esplenomegalia · colaterales'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'ascitis',
    titulo: 'Por qué se forma la ascitis (y por qué se perpetúa)',
    nodos: [
      { id: 'alb', x: 165, y: 90, t: 'No fabrica albúmina → ↓ presión oncótica', w: 280, tono: 'peach' },
      { id: 'port', x: 480, y: 90, t: '↑ presión portal → ↑ presión hidrostática', w: 280, tono: 'red' },
      { id: 'lin', x: 800, y: 90, t: 'Bloqueo linfático', w: 230, tono: 'lilac' },
      { id: 'asc', x: 480, y: 250, t: 'Líquido a la cavidad: ASCITIS', w: 300, tono: 'sky' },
      { id: 'vol', x: 165, y: 410, t: '↓ volemia efectiva', w: 230, tono: 'gold' },
      { id: 'sraa', x: 480, y: 410, t: 'Riñón: renina-angiotensina-aldosterona + simpático', w: 300, tono: 'gold' },
      { id: 'ret', x: 800, y: 410, t: 'Retiene sodio y agua', w: 230, tono: 'mint' },
    ],
    lazos: [
      { a: 'alb', b: 'asc' },
      { a: 'port', b: 'asc' },
      { a: 'lin', b: 'asc' },
      { a: 'asc', b: 'vol' },
      { a: 'vol', b: 'sraa' },
      { a: 'sraa', b: 'ret' },
      { a: 'ret', b: 'asc', t: 'más líquido' },
    ],
    pasos: [
      {
        ver: ['alb', 'port', 'lin', 'asc'],
        di: 'Tres mecanismos se suman: el hígado no fabrica albúmina, baja la presión oncótica; la hipertensión portal sube la presión hidrostática de los capilares; y la linfa no drena. El líquido pasa a la cavidad peritoneal: ascitis.',
        retener: ['↓ oncótica · ↑ hidrostática · linfa'],
      },
      {
        ver: ['alb', 'port', 'lin', 'asc', 'vol', 'sraa'],
        di: 'Pero ese líquido se fue del vaso: baja la volemia efectiva. El riñón lo detecta y activa el sistema renina-angiotensina-aldosterona y el simpático.',
        retener: ['SRAA + simpático'],
      },
      {
        ver: ['alb', 'port', 'lin', 'asc', 'vol', 'sraa', 'ret'],
        di: 'El riñón retiene sodio y agua, y ese líquido extra vuelve a salir a la cavidad. Es un círculo vicioso: por eso la ascitis del cirrótico se perpetúa. La causa más frecuente de ascitis es la hipertensión portal.',
        retener: ['Círculo vicioso', 'Ascitis: causa n.º 1 HTP'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'paracentesis',
    titulo: 'Paracentesis: infección y GASA',
    nodos: [
      { id: 'par', x: 480, y: 80, t: 'Paracentesis: diagnóstica y terapéutica', w: 340, tono: 'lilac' },
      { id: 'rec', x: 220, y: 230, t: 'Recuento celular', w: 240, tono: 'sky' },
      { id: 'gasa', x: 740, y: 230, t: 'Albúmina sérica − ascítica = GASA', w: 300, tono: 'gold' },
      { id: 'pbe', x: 220, y: 400, t: '> 250 neutrófilos/mm³ = PBE', w: 260, tono: 'red' },
      { id: 'si', x: 620, y: 420, t: '≥ 1,1: HAY hipertensión portal', w: 240, tono: 'peach' },
      { id: 'no', x: 870, y: 530, t: '< 1,1: otra causa', w: 200, tono: 'mint' },
    ],
    lazos: [
      { a: 'par', b: 'rec' },
      { a: 'par', b: 'gasa' },
      { a: 'rec', b: 'pbe' },
      { a: 'gasa', b: 'si' },
      { a: 'gasa', b: 'no' },
    ],
    pasos: [
      {
        ver: ['par'],
        di: 'Ante toda ascitis, el primer estudio es la paracentesis: sirve para diagnosticar y para tratar, porque drena el líquido. Lo básico que se pide: recuento celular, albúmina y proteínas totales.',
        retener: ['Recuento · albúmina · proteínas'],
      },
      {
        ver: ['par', 'rec', 'pbe'],
        di: 'El recuento dice si hay infección: más de 250 neutrófilos por milímetro cúbico es peritonitis bacteriana espontánea. Si predominan los linfocitos, pensá en tuberculosis o carcinomatosis.',
        retener: ['> 250 PMN = PBE'],
      },
      {
        ver: ['par', 'rec', 'pbe', 'gasa', 'si', 'no'],
        di: 'Y con la albúmina se calcula el GASA: albúmina del suero menos albúmina del líquido. Si es mayor o igual a 1,1 gramos por decilitro, hay hipertensión portal: cirrosis, causa cardíaca, Budd-Chiari. Si es menor a 1,1, el sistema porta está bien: carcinomatosis, tuberculosis, pancreatitis, nefrótico. El profe lo pide como el Padre Nuestro.',
        retener: ['GASA ≥ 1,1 = HTP', 'GASA < 1,1 = otra causa'],
      },
    ],
  },
];
