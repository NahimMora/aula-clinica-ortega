import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-14 (insuficiencia hepática). Clase «Insuficiencia hepática» (Ortega).
export const escenas: Escena[] = [
  {
    tipo: 'lista',
    id: 'funciones',
    titulo: 'Lo que hace el hígado… y lo que pasa cuando deja de hacerlo',
    items: [
      { t: 'Fabrica proteínas (albúmina)', d: 'Si falla → ↓ presión oncótica → EDEMA, ascitis', tono: 'sky' },
      { t: 'Fabrica factores de coagulación', d: 'Si falla → HEMORRAGIAS (TP prolongado)', tono: 'red' },
      { t: 'Convierte amoníaco en urea', d: 'Si falla → amoníaco en sangre → ENCEFALOPATÍA', tono: 'lilac' },
      { t: 'Procesa y excreta la bilirrubina', d: 'Si falla → ICTERICIA de predominio directo', tono: 'gold' },
      { t: 'Guarda glucógeno, hace gluconeogénesis', d: 'Si falla → HIPOGLUCEMIA', tono: 'peach' },
      { t: 'Desintoxica y defiende', d: 'Si falla → toxinas, INFECCIONES (inmunocomprometido)', tono: 'mint' },
    ],
    pasos: [
      {
        hasta: 1,
        di: 'El profe pide pensarla así: qué hace un hígado normal, y qué pasa cuando ya no lo hace. Si no fabrica albúmina, baja la presión oncótica: edema y ascitis. Si no fabrica factores de coagulación, el paciente sangra.',
        retener: ['Sin albúmina → edema', 'Sin factores → hemorragias'],
      },
      {
        hasta: 2,
        di: 'El hígado transforma el amoníaco, que es tóxico, en urea. Si falla, el amoníaco se acumula en la sangre y llega al cerebro: encefalopatía hepática.',
        retener: ['Sin urea → amoníaco → encefalopatía'],
      },
      {
        hasta: 3,
        di: 'Si no puede excretar la bilirrubina, aparece una ictericia rápida, de predominio directo.',
        retener: ['Ictericia directa'],
      },
      {
        hasta: 5,
        di: 'Sin reservas de glucógeno ni gluconeogénesis, hipoglucemia. Y como no fabrica proteínas ni anticuerpos, es un paciente inmunocomprometido, con muchas infecciones.',
        retener: ['Hipoglucemia', 'Infecciones'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'amonio',
    titulo: 'Encefalopatía hepática: el viaje del amoníaco',
    nodos: [
      { id: 'hig', x: 165, y: 100, t: 'Hígado insuficiente: no hace urea', w: 260, tono: 'lilac' },
      { id: 'nh3', x: 485, y: 100, t: 'Amoníaco acumulado en sangre', w: 260, tono: 'peach' },
      { id: 'bhe', x: 800, y: 100, t: 'Irrita y atraviesa la barrera hematoencefálica', w: 270, tono: 'peach' },
      { id: 'glu', x: 800, y: 280, t: 'En el cerebro: glutamina (osmótica) atrae agua', w: 280, tono: 'red' },
      { id: 'ed', x: 485, y: 280, t: 'EDEMA CEREBRAL → hipertensión endocraneana', w: 280, tono: 'red' },
      { id: 'muerte', x: 165, y: 280, t: 'Causa de muerte más frecuente en la fulminante', w: 270, tono: 'red' },
      { id: 'clin', x: 485, y: 470, t: 'Conciencia alterada + ASTERIXIS + ictericia', w: 330, tono: 'gold' },
    ],
    lazos: [
      { a: 'hig', b: 'nh3' },
      { a: 'nh3', b: 'bhe' },
      { a: 'bhe', b: 'glu' },
      { a: 'glu', b: 'ed' },
      { a: 'ed', b: 'muerte' },
      { a: 'ed', b: 'clin' },
    ],
    pasos: [
      {
        ver: ['hig', 'nh3'],
        di: 'El profe la marca como pregunta de parcial, choice, oral y final: si no saben encefalopatía hepática, los van a bochar. Todo empieza en un hígado que ya no transforma el amoníaco en urea: el amoníaco se acumula en la sangre.',
        retener: ['Culpable: el amoníaco'],
      },
      {
        ver: ['hig', 'nh3', 'bhe'],
        di: 'El amoníaco primero irrita la barrera hematoencefálica, la inflama, y así la atraviesa: entra al sistema nervioso central.',
        retener: ['Atraviesa la BHE'],
      },
      {
        ver: ['hig', 'nh3', 'bhe', 'glu', 'ed', 'muerte'],
        di: 'En el cerebro se transforma en glutamina, que tiene un poder osmótico fuerte: atrae agua. Resultado: edema cerebral e hipertensión endocraneana, la causa de muerte más frecuente en la falla hepática fulminante.',
        retener: ['Glutamina → edema cerebral', 'HTE: causa de muerte'],
      },
      {
        ver: ['hig', 'nh3', 'bhe', 'glu', 'ed', 'muerte', 'clin'],
        di: 'Clínicamente: ictericia, alteración de la conciencia y alteraciones motoras, sobre todo la asterixis, el temblor aleteante de las manos. Ante esa tríada, pensá en encefalopatía hepática hasta que se demuestre lo contrario.',
        retener: ['Ictericia + conciencia + asterixis'],
      },
    ],
  },
];
