export const LEVELS = [
    {
        id: 1,
        naziv: "Matematika",
        trajanje: 90,
        broj_ucenika: 8,
        eventi: [],
        opis: "Prvi čas - uvod u haos!"
    },
    {
        id: 2,
        naziv: "Likovno",
        trajanje: 90,
        broj_ucenika: 10,
        eventi: ["poplava_flomastera"],
        opis: "Umjetnici prave probleme"
    },
    {
        id: 3,
        naziv: "Informatika",
        trajanje: 90,
        broj_ucenika: 10,
        eventi: ["hakiranje_dnevnika"],
        opis: "Tehnološki haos!"
    }
];

export const THRESHOLDS = {
    zlato: { disciplina: 70, skor: 800 },
    srebro: { disciplina: 50, skor: 500 },
    bronza: { disciplina: 30, skor: 300 }
};
