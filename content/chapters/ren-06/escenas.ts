import type { Escena } from '@/escenas/tipos';

// Explicaciones animadas de ren-06 (infección urinaria). Clases «Infección urinaria» 1–2 (Ortega).
export const escenas: Escena[] = [
  {
    tipo: 'urinario',
    id: 'ascendente',
    titulo: 'La vía ascendente: de la uretra al riñón',
    pasos: [
      {
        tono: 'peach',
        luz: ['uretra'],
        nota: { t: '1 · Entra por la uretra', d: 'La vía urinaria es estéril salvo el tramo final de la uretra. La mujer la tiene corta (4–5 cm): 8 o 9 de cada 10 ITU son mujeres.' },
        di: 'Toda la vía urinaria es estéril, salvo el tramo final de la uretra, que tiene flora. La vía de infección más frecuente, el 80 por ciento, es la ascendente: las bacterias, sobre todo Escherichia coli, suben desde el meato. La mujer tiene la uretra corta, de 4 o 5 centímetros: por eso de cada 10 infecciones urinarias, 8 o 9 son en mujeres.',
        retener: ['Vía ascendente: 80 %', 'Mujer: uretra corta'],
      },
      {
        tono: 'lilac',
        luz: ['uretra', 'vejiga'],
        nota: { t: '2 · Cistitis (ITU baja)', d: 'La más frecuente. DISURIA (síntoma cardinal), polaquiuria, tenesmo, dolor suprapúbico. Sin fiebre, buen estado general.' },
        di: 'Si llega a la vejiga, es una cistitis, la infección urinaria baja más frecuente. El síntoma cardinal es la disuria, con polaquiuria, tenesmo, urgencia y dolor suprapúbico; puede haber hematuria isomórfica. El paciente no tiene fiebre y está en buen estado general.',
        retener: ['Cistitis: disuria', 'Sin fiebre'],
      },
      {
        tono: 'gold',
        luz: ['vejiga', 'ureter-d'],
        dilata: ['ureter-d'],
        nota: { t: '3 · Sube por el uréter', d: 'Lo facilitan el REFLUJO vesicoureteral y la OBSTRUCCIÓN urinaria: las dos grandes puertas.' },
        di: 'Dos situaciones facilitan que la infección suba: el reflujo vesicoureteral, más frecuente en los niños, y la obstrucción urinaria a cualquier nivel. Aguantarse las ganas de orinar también suma: la presión de la vejiga fuerza el esfínter.',
        retener: ['Reflujo vesicoureteral', 'Obstrucción'],
      },
      {
        tono: 'red',
        luz: ['ureter-d', 'pelvis-d', 'rinon-d'],
        nota: { t: '4 · Pielonefritis (ITU alta)', d: 'Mal estado general, FIEBRE, escalofríos, dolor lumbar… más los síntomas de la baja. Puñopercusión positiva.' },
        di: 'Si llega al riñón es una pielonefritis aguda, la infección urinaria alta. El paciente llega mal: fiebre, escalofríos, náuseas, vómitos y dolor lumbar, más los síntomas de la cistitis. La puñopercusión y los puntos costovertebral y costomuscular duelen. Puede complicarse con bacteriemia y sepsis.',
        retener: ['Pielonefritis: fiebre + dolor lumbar', 'Puñopercusión +'],
      },
    ],
  },
  {
    tipo: 'lista',
    id: 'germenes',
    titulo: 'Los gérmenes que preguntan',
    items: [
      { t: 'Escherichia coli', d: 'El más frecuente: 90–95 % de las ITU ambulatorias. Orina ácida.', tono: 'red' },
      { t: 'Proteus mirabilis y Klebsiella', d: 'Desdobladores de urea: ORINA ALCALINA (pH 7). Proteus: frecuente en el hombre.', tono: 'lilac' },
      { t: 'Pseudomonas', d: 'La más frecuente INTRAHOSPITALARIA: sondas por más de 3 días, punciones, internación.', tono: 'peach' },
      { t: 'Otros', d: 'Staphylococcus saprophyticus, Enterobacter, Serratia; Bacteroides en la menopausia.', tono: 'sky' },
    ],
    pasos: [
      {
        hasta: 0,
        di: 'El profe avisa que los microorganismos causales casi siempre se preguntan en el parcial. El primero, por lejos: Escherichia coli, entre el 90 y el 95 por ciento de los casos.',
        retener: ['E. coli: 90–95 %'],
      },
      {
        hasta: 1,
        di: 'Después, Proteus mirabilis y Klebsiella. Son desdobladores de urea y alcalinizan la orina: una infección urinaria con pH de 7 te hace pensar en ellos. En el hombre, de cada diez infecciones, unas cuatro son por Proteus.',
        retener: ['Proteus: orina alcalina'],
      },
      {
        hasta: 3,
        di: 'Y si el paciente está internado, con una sonda por más de tres días, el germen más frecuente es Pseudomonas, mucho más virulento.',
        retener: ['Intrahospitalaria: Pseudomonas'],
      },
    ],
  },
];
