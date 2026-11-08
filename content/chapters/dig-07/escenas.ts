import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-07 (síndrome ulceroso y gastritis). Clases Sd. ulceroso 1–3.
export const escenas: Escena[] = [
  {
    tipo: 'flujo',
    id: 'defensa',
    titulo: 'La barrera de la mucosa gástrica',
    nodos: [
      { id: 'moco', x: 165, y: 110, t: 'Moco + bicarbonato', w: 250, tono: 'mint' },
      { id: 'flujo', x: 165, y: 260, t: 'Flujo sanguíneo local (trae HCO₃⁻)', w: 260, tono: 'mint' },
      { id: 'pg', x: 165, y: 410, t: 'Prostaglandinas (vasodilatan)', w: 250, tono: 'mint' },
      { id: 'barrera', x: 480, y: 260, t: 'BARRERA mucosa estable', w: 240, tono: 'sky' },
      { id: 'hcl', x: 800, y: 110, t: 'HCl (pH 1–2) + pepsina', w: 250, tono: 'red' },
      { id: 'hp', x: 800, y: 260, t: 'Helicobacter pylori', w: 250, tono: 'red' },
      { id: 'aine', x: 800, y: 410, t: 'AINE, aspirina, corticoides', w: 250, tono: 'red' },
      { id: 'ulcera', x: 480, y: 530, t: 'Si ganan los agresores: ÚLCERA', w: 280, tono: 'rose' },
    ],
    lazos: [
      { a: 'moco', b: 'barrera' },
      { a: 'flujo', b: 'barrera' },
      { a: 'pg', b: 'barrera' },
      { a: 'hcl', b: 'barrera' },
      { a: 'hp', b: 'barrera' },
      { a: 'aine', b: 'barrera' },
      { a: 'barrera', b: 'ulcera' },
    ],
    pasos: [
      {
        ver: ['moco', 'flujo', 'pg', 'barrera'],
        di: 'El estómago se defiende de su propio ácido con tres cosas: la capa de moco con bicarbonato, el flujo sanguíneo local que trae ese bicarbonato, y las prostaglandinas, que dilatan los vasos para que el intercambio sea mayor.',
        retener: ['Moco + HCO₃⁻', 'Flujo sanguíneo', 'Prostaglandinas'],
      },
      {
        ver: ['moco', 'flujo', 'pg', 'barrera', 'hcl', 'hp', 'aine'],
        di: 'Del otro lado están los agresores: el ácido clorhídrico, con un pH de 1 a 2, y la pepsina; el Helicobacter pylori; y los antiinflamatorios, la aspirina y los corticoides.',
        retener: ['HCl + pepsina', 'H. pylori', 'AINE'],
      },
      {
        ver: ['moco', 'flujo', 'pg', 'barrera', 'hcl', 'hp', 'aine', 'ulcera'],
        di: 'Cuando el equilibrio se rompe a favor de los agresores, se pierde sustancia más allá de la muscular de la mucosa: eso es una úlcera. Las dos causas más frecuentes son el Helicobacter y los antiinflamatorios.',
        retener: ['Causas n.º 1: H. pylori y AINE'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'hpylori',
    titulo: 'Helicobacter pylori: el círculo vicioso',
    nodos: [
      { id: 'dano', x: 165, y: 100, t: 'Mucosa dañada', w: 230, tono: 'rose' },
      { id: 'rep', x: 485, y: 100, t: 'Para repararla llega bicarbonato', w: 260, tono: 'sky' },
      { id: 'alc', x: 800, y: 100, t: 'La zona se alcaliniza', w: 240, tono: 'sky' },
      { id: 'col', x: 800, y: 260, t: 'H. pylori coloniza (le gusta el pH alto)', w: 270, tono: 'lilac' },
      { id: 'ure', x: 485, y: 260, t: 'Ureasa: proteínas → UREA', w: 250, tono: 'lilac' },
      { id: 'amo', x: 165, y: 260, t: 'Urea + HCl → amonio + bicarbonato', w: 260, tono: 'peach' },
      { id: 'tox', x: 165, y: 440, t: 'Amonio: tóxico → más daño', w: 250, tono: 'red' },
      { id: 'mas', x: 560, y: 440, t: 'Más bicarbonato → más H. pylori', w: 270, tono: 'red' },
    ],
    lazos: [
      { a: 'dano', b: 'rep' },
      { a: 'rep', b: 'alc' },
      { a: 'alc', b: 'col' },
      { a: 'col', b: 'ure' },
      { a: 'ure', b: 'amo' },
      { a: 'amo', b: 'tox' },
      { a: 'tox', b: 'mas' },
    ],
    pasos: [
      {
        ver: ['dano', 'rep', 'alc'],
        di: 'Todo empieza en una zona de mucosa dañada. El organismo la repara: manda más sangre, glóbulos blancos y bicarbonato, que alcaliniza la zona para protegerla del ácido.',
        retener: ['La reparación alcaliniza'],
      },
      {
        ver: ['dano', 'rep', 'alc', 'col'],
        di: 'Pero eso juega en contra: el Helicobacter no coloniza un medio ácido, y en esa zona alcalinizada encuentra justo su lugar.',
        retener: ['H. pylori necesita pH alto'],
      },
      {
        ver: ['dano', 'rep', 'alc', 'col', 'ure', 'amo'],
        di: 'El Helicobacter secreta ureasa, que degrada las proteínas de la comida hasta urea. La urea, en contacto con el ácido clorhídrico, se desdobla en amonio y bicarbonato.',
        retener: ['Ureasa → urea → amonio + HCO₃⁻'],
      },
      {
        ver: ['dano', 'rep', 'alc', 'col', 'ure', 'amo', 'tox', 'mas'],
        di: 'El amonio es tóxico y daña más la mucosa; el bicarbonato alcaliniza más y atrae más Helicobacter. Es un círculo vicioso que agranda la úlcera. El profe aclara: en el choice no lo toman, pero en el oral lo pueden preguntar.',
        retener: ['Amonio daña · HCO₃⁻ atrae más'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'aines',
    titulo: 'Por qué los AINE y los corticoides dan úlcera',
    nodos: [
      { id: 'cort', x: 165, y: 100, t: 'Corticoides: inhiben fosfolipasa A2', w: 270, tono: 'lilac' },
      { id: 'aine', x: 165, y: 260, t: 'AINE y aspirina: inhiben COX-1 y COX-2', w: 270, tono: 'lilac' },
      { id: 'nopg', x: 485, y: 180, t: 'No hay prostaglandinas', w: 240, tono: 'peach' },
      { id: 'vaso', x: 800, y: 180, t: 'Vasoconstricción de la mucosa', w: 260, tono: 'peach' },
      { id: 'nohco', x: 800, y: 350, t: 'No llega bicarbonato: no hay barrera', w: 270, tono: 'red' },
      { id: 'ulc', x: 485, y: 470, t: 'El ácido daña: ÚLCERA', w: 250, tono: 'rose' },
      { id: 'estres', x: 165, y: 470, t: 'Estrés crónico → cortisol', w: 240, tono: 'gold' },
    ],
    lazos: [
      { a: 'cort', b: 'nopg' },
      { a: 'aine', b: 'nopg' },
      { a: 'nopg', b: 'vaso' },
      { a: 'vaso', b: 'nohco' },
      { a: 'nohco', b: 'ulc' },
      { a: 'estres', b: 'ulc' },
    ],
    pasos: [
      {
        ver: ['aine', 'nopg'],
        di: 'Los antiinflamatorios y la aspirina inhiben la ciclooxigenasa, la COX-1 y la COX-2, que es la enzima que fabrica las prostaglandinas.',
        retener: ['AINE inhiben COX'],
      },
      {
        ver: ['aine', 'nopg', 'vaso', 'nohco'],
        di: 'Sin prostaglandinas, los vasos de la mucosa se contraen. Si el vaso está cerrado, el bicarbonato que viaja por la sangre no pasa a la mucosa, y se pierde la barrera.',
        retener: ['Sin PG: vasoconstricción', 'Sin HCO₃⁻: sin barrera'],
      },
      {
        ver: ['aine', 'nopg', 'vaso', 'nohco', 'ulc'],
        di: 'El pH baja todavía más, el ácido daña la mucosa directamente y aparece la úlcera; además, esa mucosa dañada es la que después coloniza el Helicobacter.',
        retener: ['AINE → úlcera'],
      },
      {
        ver: ['aine', 'nopg', 'vaso', 'nohco', 'ulc', 'cort', 'estres'],
        di: 'Los corticoides llegan al mismo lugar por arriba: inhiben la fosfolipasa A2, no hay ácido araquidónico ni prostaglandinas. Y el estrés crónico aumenta el cortisol, que reduce el flujo sanguíneo de la mucosa.',
        retener: ['Corticoides: fosfolipasa A2', 'Estrés: cortisol'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'gastritisA',
    titulo: 'Gastritis tipo A: de los anticuerpos a la anemia perniciosa',
    nodos: [
      { id: 'ac', x: 165, y: 110, t: 'Anticuerpos contra las células parietales', w: 270, tono: 'lilac' },
      { id: 'hcl', x: 485, y: 110, t: 'Sin ácido clorhídrico: ACLORHIDRIA', w: 260, tono: 'sky' },
      { id: 'gas', x: 800, y: 110, t: 'Se dispara la gastrina: HIPERGASTRINEMIA', w: 270, tono: 'sky' },
      { id: 'fi', x: 485, y: 290, t: 'Sin factor intrínseco de Castle', w: 260, tono: 'peach' },
      { id: 'b12', x: 800, y: 290, t: 'No se absorbe la B12 en el íleon', w: 260, tono: 'peach' },
      { id: 'anemia', x: 800, y: 460, t: 'ANEMIA PERNICIOSA (macrocítica)', w: 270, tono: 'red' },
      { id: 'atrofia', x: 165, y: 460, t: 'Atrofia gástrica → alto riesgo de adenocarcinoma', w: 280, tono: 'red' },
    ],
    lazos: [
      { a: 'ac', b: 'hcl' },
      { a: 'hcl', b: 'gas' },
      { a: 'ac', b: 'fi' },
      { a: 'fi', b: 'b12' },
      { a: 'b12', b: 'anemia' },
      { a: 'ac', b: 'atrofia' },
    ],
    pasos: [
      {
        ver: ['ac'],
        di: 'La gastritis tipo A es autoinmune: hay anticuerpos contra las células parietales del fondo y el cuerpo del estómago. Esas células fabrican dos cosas: ácido clorhídrico y factor intrínseco de Castle.',
        retener: ['Tipo A = Autoinmune', 'Fondo y cuerpo'],
      },
      {
        ver: ['ac', 'hcl', 'gas'],
        di: 'Sin células parietales no hay ácido: aclorhidria. El organismo intenta compensar fabricando más gastrina, y aparece una hipergastrinemia.',
        retener: ['Aclorhidria', 'Hipergastrinemia'],
      },
      {
        ver: ['ac', 'hcl', 'gas', 'fi', 'b12', 'anemia'],
        di: 'Y sin factor intrínseco, la vitamina B12 no se transporta ni se absorbe en el íleon terminal: anemia perniciosa, con glóbulos rojos grandes, macrocíticos.',
        retener: ['Sin B12 → anemia perniciosa'],
      },
      {
        ver: ['ac', 'hcl', 'gas', 'fi', 'b12', 'anemia', 'atrofia'],
        di: 'Con el tiempo la mucosa se atrofia, y la atrofia gástrica tiene alto riesgo de adenocarcinoma. La tipo B, en cambio, es bacteriana, por Helicobacter, en el antro, se asocia a úlcera y tiene bajo riesgo de cáncer.',
        retener: ['A: alto riesgo de cáncer', 'B: Bacteriana, antro, úlcera'],
      },
    ],
  },
];
