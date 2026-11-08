import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-10 (peritonitis). Clases Peritonitis 1–2 + libro p. 383.
export const escenas: Escena[] = [
  {
    tipo: 'abdomen',
    id: 'extension',
    titulo: 'Localizada (plastrón) o generalizada',
    pasos: [
      {
        tono: 'peach',
        regiones: ['fid'],
        puntos: ['mcburney'],
        nota: { t: 'Plastrón', d: 'Peritonitis LOCALIZADA en contacto con la pared anterior del abdomen.' },
        di: 'Un apéndice inflamado toca el peritoneo visceral, después el parietal y la pared anterior. Si el proceso queda encapsulado en esa zona, es una peritonitis localizada: el plastrón. El dolor está en un solo punto: Blumberg.',
        retener: ['Plastrón = peritonitis localizada', 'Blumberg'],
      },
      {
        tono: 'red',
        regiones: ['hd', 'epi', 'hi', 'fd', 'umb', 'fi', 'fid', 'hipo', 'fii'],
        nota: { t: 'Generalizada', d: 'Todo el peritoneo inflamado: dolor difuso, abdomen en tabla, Gueneau de Mussy.' },
        di: 'Si la infección se extiende a todo el peritoneo, es generalizada: dolor intenso y difuso que empeora con el movimiento y la tos, abdomen en tabla y dolor a la descompresión en todo el abdomen, el signo de Gueneau de Mussy.',
        retener: ['Generalizada = Gueneau de Mussy', 'Abdomen en tabla'],
      },
      {
        tono: 'sky',
        regiones: ['fd', 'fi', 'fid', 'hipo', 'fii'],
        nota: { t: 'PBE: el líquido infectado', d: 'Abdomen GLOBOSO por ascitis, dolor menos intenso, matidez en flancos.' },
        di: 'En la peritonitis bacteriana espontánea lo que se infecta es la ascitis: el abdomen está globoso, no en tabla, el dolor es menos intenso y a la percusión hay matidez por el líquido.',
        retener: ['PBE: globoso, matidez'],
      },
    ],
  },
  {
    tipo: 'flujo',
    id: 'pbe',
    titulo: 'Peritonitis bacteriana espontánea: la translocación',
    nodos: [
      { id: 'cir', x: 165, y: 100, t: 'Cirrosis (o síndrome nefrótico)', w: 260, tono: 'lilac' },
      { id: 'htp', x: 485, y: 100, t: 'Hipertensión portal + ASCITIS', w: 260, tono: 'lilac' },
      { id: 'ven', x: 800, y: 100, t: 'Venas intestinales dilatadas', w: 250, tono: 'peach' },
      { id: 'tras', x: 800, y: 270, t: 'Bacterias de la flora escapan: TRASLOCACIÓN', w: 270, tono: 'peach' },
      { id: 'inf', x: 485, y: 270, t: 'Se infecta el líquido ascítico', w: 250, tono: 'red' },
      { id: 'mono', x: 165, y: 270, t: 'MONOmicrobiana (E. coli)', w: 240, tono: 'red' },
      { id: 'dx', x: 300, y: 460, t: 'Paracentesis: > 250 neutrófilos/mm³', w: 300, tono: 'gold' },
      { id: 'tto', x: 720, y: 460, t: 'Tratamiento MÉDICO: cefalosporinas 3.ª–4.ª', w: 300, tono: 'mint' },
    ],
    lazos: [
      { a: 'cir', b: 'htp' },
      { a: 'htp', b: 'ven' },
      { a: 'ven', b: 'tras' },
      { a: 'tras', b: 'inf' },
      { a: 'inf', b: 'mono' },
      { a: 'mono', b: 'dx' },
      { a: 'dx', b: 'tto' },
    ],
    pasos: [
      {
        ver: ['cir', 'htp'],
        di: 'La peritonitis primaria o bacteriana espontánea aparece casi siempre en un cirrótico avanzado con hipertensión portal y ascitis. Otra causa es el síndrome nefrótico, que también da ascitis.',
        retener: ['PBE = cirrótico con ascitis'],
      },
      {
        ver: ['cir', 'htp', 'ven', 'tras'],
        di: 'La hipertensión portal dilata las venas del intestino: es como si se abrieran los poros. Las bacterias de la flora intestinal pasan por las venas y los linfáticos hacia el líquido: eso es la traslocación bacteriana. No hay ninguna perforación.',
        retener: ['Traslocación bacteriana', 'Sin perforación'],
      },
      {
        ver: ['cir', 'htp', 'ven', 'tras', 'inf', 'mono'],
        di: 'Se infecta el líquido ascítico, y por un solo germen: es monomicrobiana, casi siempre Escherichia coli.',
        retener: ['Monomicrobiana: E. coli'],
      },
      {
        ver: ['cir', 'htp', 'ven', 'tras', 'inf', 'mono', 'dx', 'tto'],
        di: 'El diagnóstico de certeza es la paracentesis: más de 250 neutrófilos por milímetro cúbico en el líquido ascítico. Y el tratamiento es médico, con antibióticos como las cefalosporinas de tercera o cuarta generación. No se opera.',
        retener: ['> 250 PMN/mm³', 'Médico, no quirúrgico'],
      },
    ],
  },
];
