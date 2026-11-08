import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de ren-02 (examen físico nefrourológico y proteinuria). Clase MC Renal parte 3 + libro p. 459–460.
export const escenas: Escena[] = [
  {
    tipo: 'nefrona',
    id: 'proteinuria',
    titulo: 'De dónde sale la proteína que se pierde',
    pasos: [
      {
        tono: 'gold',
        luz: ['glomerulo'],
        fuga: ['proteinas'],
        nota: { t: 'Glomerular (la más frecuente)', d: 'La membrana basal deja pasar proteínas. Alta selectividad: > 80 % es ALBÚMINA. Baja selectividad: también proteínas grandes.' },
        di: 'El profe lo resume así: si hay proteinuria, el problema es el glomérulo. La más frecuente es la glomerular: aumenta la permeabilidad de la membrana basal y se pierde sobre todo albúmina, más del 80 por ciento, la de alta selectividad. En la de baja selectividad pasan también proteínas de mayor peso molecular.',
        retener: ['Proteinuria = glomérulo', 'Selectiva: albúmina > 80 %'],
      },
      {
        tono: 'peach',
        luz: ['proximal'],
        fuga: ['proteinas'],
        marca: 'proximal',
        nota: { t: 'Tubular', d: 'Las proteínas chicas se filtran normalmente, pero el túbulo PROXIMAL lesionado no las reabsorbe (Fanconi). Leve a moderada.' },
        di: 'La tubular: las proteínas pequeñas se filtran normalmente, pero el túbulo contorneado proximal, lesionado, no las reabsorbe. El ejemplo es el síndrome de Fanconi, que además pierde glucosa y aminoácidos. Es una proteinuria leve a moderada.',
        retener: ['Tubular: falla el proximal'],
      },
      {
        tono: 'lilac',
        luz: ['arteriola', 'glomerulo'],
        fuga: ['proteinas'],
        nota: { t: 'Por sobrecarga', d: 'Sobran proteínas en la SANGRE y se filtran: la proteína de Bence Jones del mieloma múltiple. No la detectan las tiras.' },
        di: 'Y la proteinuria por sobrecarga: hay tantas proteínas en la sangre que terminan filtrándose. La causa más frecuente es el mieloma múltiple, con la proteína de Bence Jones, que son cadenas livianas. No se detecta con las tiras reactivas sino con la inmunoelectroforesis, con antisuero anti kappa y anti lambda.',
        retener: ['Sobrecarga: Bence Jones (mieloma)', 'Inmunoelectroforesis'],
      },
    ],
  },
  {
    tipo: 'urinario',
    id: 'examen',
    titulo: 'Qué busca el examen físico renal',
    pasos: [
      {
        tono: 'peach',
        luz: ['vejiga'],
        dilata: ['vejiga'],
        nota: { t: 'Inspección: hipogastrio', d: 'Los riñones son profundos y casi no se ven. Una tumoración en el hipogastrio con alteración de la diuresis = RETENCIÓN (globo vesical).' },
        di: 'La inspección aporta poco, porque los riñones son profundos y retroperitoneales. Pero una tumoración en el hipogastrio, sobre todo con dolor y alteración del ritmo diurético, sugiere una retención vesical: el globo vesical, que se confirma percutiendo.',
        retener: ['Masa en hipogastrio = globo vesical'],
      },
      {
        tono: 'sky',
        luz: ['rinon-d', 'pelvis-d'],
        dilata: ['rinon-d', 'pelvis-d'],
        nota: { t: 'Palpación: Guyon', d: 'Bimanual, con peloteo. Normal: no se palpa (o el polo inferior en los delgados). Agrandado: hidronefrosis, poliquistosis, tumor.' },
        di: 'La palpación es lo más importante. La maniobra de Guyon, que el profe dice que siempre la preguntan, es bimanual: una mano en el ángulo costomuscular empuja y la otra, por fuera de los rectos, recibe el peloteo. Normalmente el riñón no se palpa; si está agrandado, pensá en hidronefrosis, poliquistosis o tumor.',
        retener: ['Guyon: peloteo', 'Normal: no se palpa'],
      },
      {
        tono: 'red',
        luz: ['rinon-d', 'rinon-i'],
        nota: { t: 'Percusión: puñopercusión', d: 'Murphy (puño) o Giordano (borde cubital), en las dos fosas lumbares. Dolor: pielonefritis, litiasis, tumor.' },
        di: 'La percusión es la puñopercusión lumbar: con el puño, de Murphy, o con el borde cubital, de Giordano, comparando los dos lados. Normalmente no duele. Si duele, pensá en pielonefritis, litiasis o tumor renal.',
        retener: ['Puñopercusión + = pielonefritis, litiasis'],
      },
    ],
  },
];
