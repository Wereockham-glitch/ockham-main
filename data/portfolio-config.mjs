// Local editorial mapping. Replace category/visibility with verified CMS fields
// when the taxonomy is available. This module is only used at build time.
export const portfolioConfig = [
  { id: "cG9zdDo0MjE=", key: "conde-duque", title: "Conde Duque", category: "campaigns", visible: true,
    main: [1.8, 40, 37.3], stills: [[0, 45.8, 34.7, 11.4, "06"], [1, 67.2, 43.7, 9.8, "02"], [4, 53.3, 67.4, 10.7, "05"]], previewTop: 27,
    description: "An audiovisual piece presenting the vibrant programme of Condeduque Contemporary Culture Centre: a dynamic meeting point for theatre, cinema, music, exhibitions and contemporary thought. Through an evocative and engaging visual language, the video will capture the centre’s multidisciplinary spirit, showcasing it as a space for artistic experimentation, critical reflection and dialogue—a place where creators, audiences and new ideas come together.",
    descriptionSource: "LUAR WEB - NEW.pdf, page 5",
    team: [
      { role: "Directed by", names: "LUAR" },
      { role: "Production", names: "Production Company: Garlic\nExecutive Producer: Álvaro Gorospe & Irene Nuñez\nProducer: Silvia Argüello" },
      { role: "", names: "Production Coordinator: Marianela Knaus\nProduction Assistant: Ángela Pérez-Sevilla" },
      { role: "", names: "Cinematography: David Lázaro\n1st AC: Antonio Albalate\nCamera Assistant: Pablo Tuche" },
      { role: "", names: "Art Director: Cora Patiño\nArt Assistant: Andrea Corbacho" },
      { role: "", names: "Colorist: Marc Morató - Metropolitana\nEditing: Lucas Couto" },
      { role: "Music + Sound Design", names: "Alberto de Miguel" },
      { role: "1st AD", names: "Fran Azorín" },
      { role: "Casting Director", names: "Alexis Ocón" },
      { role: "", names: "Stylist: Atenea Martínez\nStyling Assistant: Mikel Andrés" },
      { role: "Hair & Make Up", names: "Celia Bañares" },
      { role: "Soundman", names: "Javier Sánchez" },
      { role: "Gaffer", names: "Juan Castillo" },
      { role: "", names: "Electrician: Guillermo Encinas\nElectrician: Arnold Oré\nCamera Equipment: ILL Camara" },
      { role: "Steadicam Operator", names: "Alejandro Lázar" },
      { role: "Lighting", names: "Enfoco" },
      { role: "Voice over", names: "Guillermo González" },
      { role: "Starring", names: "Carmen García Rego, Gabriel Samaniego Barreto, Angela Zhang Lin, Dana Sevillano López, Adassa Navarro Benito, María Martínez, Alassane Dialy Ndiaye Mane, Guillermo González Lanchares" },
      { role: "Special thanks to", names: "Conde Duque, Carlo Rho, Raul Machado, Jose, Ire Gallarza, Oscar Rivas, Alex Umansky, Sara Palacios, Camper, Bershka, Ttarrago." },
    ] },
  { id: "cG9zdDozOQ==", key: "timberland", title: "Timberland", category: "campaigns", visible: true,
    main: [2, 36.8, 38.1], stills: [[0, 47.4, 47.2, 11.3, "06"], [1, 66.3, 31.8, 9.6, "05"], [3, 62, 66.8, 12.4, "07"]], previewTop: 34,
    description: null, team: null },
  { id: "cG9zdDo0NjQ=", key: "razer", title: "Razer x Retro Super Futurę", category: "campaigns", visible: true,
    main: [1.9, 29.3, 28.2], stills: [[0, 38.9, 41, 10, "06"], [1, 67.8, 35.2, 5.6, "02"], [3, 58.3, 65.5, 8.7, "07"]], previewTop: 24,
    description: null, team: null },
  { id: "cG9zdDo0NTI=", key: "melia", title: "Hotel Melia", category: "campaigns", visible: true,
    main: [1.9, 36.2, 35.2], stills: [[5, 43.7, 38.5, 12, "04"], [0, 71, 47.3, 9.9, "05"], [4, 56.3, 69, 11.4, "06"]], previewTop: 22,
    description: null, team: null },
];

// No CMS ID or media are invented for the unannounced project. This record must
// never be serialized to page props, even when a category contains no projects.
export const reservedShort = { title: "Outlined Against The Sky", category: "short", visible: false };
