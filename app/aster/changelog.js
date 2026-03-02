export const ASTER_VERSION = 'v1.01';

export const changelog = [
  {
    version: 'v1.01',
    date: '2026-03-02',
    changes: [
      'Backend prebačen na SQLite bazu (Goldenboy server) — podaci dijeljeni na svim uređajima',
      'Admin panel: CRUD operacije sada se čuvaju u bazu, ne u localStorage',
      'Obavijesti vidljive na svim uređajima',
      'Raspored: klikabilni filteri za grupe (klik na grupu da je sakrijete/prikažete)',
      'Raspored: dugme "Prikaži sve" kad su filteri aktivni',
      'Nasihin trening prebačen na subotu (12h)',
      'Uklonjen nedjeljni trening iz rasporeda',
    ],
  },
  {
    version: 'v1.00',
    date: '2026-03-01',
    changes: [
      'Inicijalni release Aster plesnog kluba',
      'Sedmični raspored sa datumima i navigacijom po sedmicama',
      'Lista članica sa pretragom i filterima po kategoriji/grupi',
      'Kalendar takmičenja (24 eventa u 2026) sa filterima WDSF/IDO',
      'Individualne stranice za svaku članicu (/aster/member/[id])',
      'Admin panel na /aster/admin (login: admin/admin)',
      'CRUD za članice, trenere, grupe, raspored, takmičenja',
      'Sistem obavijesti za roditelje',
      'Responsive dizajn (desktop + mobitel)',
      'Dark tema sa Aster bojama (narandžasta/pink/ljubičasta)',
      'Podaci importovani iz Google Sheets-a (9 sheetova)',
    ],
  },
];
