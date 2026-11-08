import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de dig-11 (síndromes vesiculares). Clase «Síndromes vesiculares» + libro p. 385–387.
export const escenas: Escena[] = [
  {
    tipo: 'biliar',
    id: 'camino',
    titulo: 'El viaje del cálculo: de la vesícula a la ampolla',
    pasos: [
      {
        tono: 'mint',
        luz: ['vesicula'],
        calculo: 'vesicula',
        nota: { t: 'Colelitiasis', d: 'Cálculos en la vesícula. Si no se impactan, asintomática. NO da ictericia.' },
        di: 'Colelitiasis es tener cálculos en la vesícula. Mientras no se impacten, el paciente puede no tener nada: litiasis asintomática. Y no da ictericia, porque la vesícula solo almacena bilis: la bilis sigue bajando por el colédoco.',
        retener: ['Colelitiasis', 'No da ictericia'],
      },
      {
        tono: 'gold',
        luz: ['vesicula', 'cistico'],
        calculo: 'cistico',
        nota: { t: 'Cólico biliar', d: 'Un cálculo se traba un rato en el cístico: dolor en HD que se irradia al hombro, sin fiebre.' },
        di: 'Si un cálculo se traba un momento en el cístico y el peristaltismo lo libera, aparece el cólico biliar: dolor en hipocondrio derecho y epigastrio que se irradia al dorso y al hombro derecho, después de comidas grasas. Es el síntoma cardinal.',
        retener: ['Cólico biliar: transitorio, sin fiebre'],
      },
      {
        tono: 'red',
        luz: ['vesicula', 'cistico'],
        calculo: 'cistico',
        dilata: ['vesicula'],
        nota: { t: 'Colecistitis aguda', d: 'El cálculo queda IMPACTADO en el cístico: la vesícula se inflama. Dolor + fiebre + Murphy positivo.' },
        di: 'Si el cálculo queda impactado en el cístico, sube la presión dentro de la vesícula y se inflama: colecistitis aguda. Dolor más intenso y persistente, fiebre, vómitos y signo de Murphy positivo.',
        retener: ['Colecistitis = cálculo impactado en el cístico', 'Murphy +'],
      },
      {
        tono: 'peach',
        luz: ['vesicula', 'cistico', 'hepatico'],
        calculo: 'cistico',
        dilata: ['vesicula'],
        nota: { t: 'Síndrome de Mirizzi', d: 'La vesícula inflamada y el cálculo comprimen el hepático común: aparece ictericia.' },
        di: 'Una complicación: la vesícula agrandada y el cálculo del cístico comprimen el hepático común. La bilis no baja y aparece ictericia. Es el síndrome de Mirizzi.',
        retener: ['Mirizzi: comprime el hepático'],
      },
      {
        tono: 'gold',
        luz: ['coledoco', 'hepatico'],
        calculo: 'coledoco',
        dilata: ['hepatico', 'coledoco'],
        nota: { t: 'Coledocolitiasis', d: 'La complicación más frecuente: un cálculo en el colédoco. Síndrome coledociano: ictericia + coluria + acolia.' },
        di: 'Si el cálculo escapa y se impacta en el colédoco, es la coledocolitiasis, la complicación más frecuente de la litiasis. Ahora sí hay ictericia: síndrome coledociano, con ictericia, coluria e hipocolia o acolia.',
        retener: ['Coledocolitiasis', 'Síndrome coledociano'],
      },
      {
        tono: 'red',
        luz: ['coledoco', 'hepatico'],
        calculo: 'coledoco',
        dilata: ['hepatico', 'coledoco'],
        nota: { t: 'Colangitis', d: 'La bilis estancada se infecta: tríada de Charcot = dolor + fiebre + ictericia. Emergencia.' },
        di: 'Con la bilis estancada, suben bacterias desde el duodeno y la infectan: colangitis. Su tríada es la de Charcot: dolor en hipocondrio derecho, fiebre e ictericia. Es una emergencia médica.',
        retener: ['Colangitis = Charcot'],
      },
      {
        tono: 'lilac',
        luz: ['ampolla', 'pancreas', 'wirsung'],
        calculo: 'ampolla',
        nota: { t: 'Pancreatitis biliar', d: 'El cálculo se enclava en la ampolla de Vater y obstruye también el Wirsung.' },
        di: 'Y si el cálculo baja hasta la ampolla de Vater y se enclava, obstruye también la salida del jugo pancreático: pancreatitis biliar, la otra gran complicación de la coledocolitiasis.',
        retener: ['Cálculo en la ampolla → pancreatitis'],
      },
    ],
  },
];
