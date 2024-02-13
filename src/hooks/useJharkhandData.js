import { useTranslation } from "react-i18next";

function useJharkhandData() {
  const { t } = useTranslation();



  const levelWiseRole = [
    {
      label: t('FRC'),
      value: '1',
      roleData: [
        {
          label: t('President'),
          value: '1',
        },
        {
          label: t('Secretary'),
          value: '2',
        },
        {
          label: t('Member'),
          value: '3',
        },
      ],
    },
    {
      label: t('SDLC'),
      value: '2',
      roleData: [
        {
          label: t('Subdivisonal Officer'),
          value: '1',
        },
        {
          label: t('Tehsildar'),
          value: '2',
        },
        {
          label: t('Forest Range Officer'),
          value: '3',
        },
        {
          label: t('Member'),
          value: '4',
        },
      ],
    },
    {
      label: t('DLC'),
      value: '3',
      roleData: [
        {
          label: 'District Collector',
          value: '1',
        },
        {
          label: 'District Forest Officer',
          value: '2',
        },
        {
          label: 'Officer-in-Charge (Tribal Affairs)',
          value: '3',
        },
        {
          label: 'Member',
          value: '4',
        },
      ],
    },
  ];


  const states = [
    {
      label: t("Jharkhand"),
      value: "1",
      Districts: [
        {
          label: t("Samdega"),
          value: "1",
          Tehsils: [
            {
              label: t("Bano"),
              value: "1",
              Panchayats: [
                {
                  label: t("Bano"),
                  value: "1",
                },
                {
                  label: t("Simhatu"),
                  value: "2",
                },
                {
                  label: t("Konsode"),
                  value: "3",
                },
                {
                  label: t("Bintuka"),
                  value: "4",
                },
                {
                  label: t("Kanarowan"),
                  value: "5",
                },
                {
                  label: t("Pabura"),
                  value: "6",
                },
                {
                  label: t("Soy"),
                  value: "7",
                },
                {
                  label: t("Beraergi"),
                  value: "9",
                },
                {
                  label: t("Banki"),
                  value: "10",
                },
                {
                  label: t("Barkaduel"),
                  value: "11",
                },
                {
                  label: t("Ukauli"),
                  value: "12",
                },
                {
                  label: t("Dumariya"),
                  value: "13",
                },
                {
                  label: t("Sahubera"),
                  value: "14",
                },
                {
                  label: t("Jamtai"),
                  value: "15",
                },
                {
                  label: t("Raikera"),
                  value: "16",
                },
                {
                  label: t("Genmer"),
                  value: "17",
                },
              ],
              Villages: [
                {
                  label: t("Bano"),
                  value: "1",
                },
                {
                  label: t("Samdega"),
                  value: "1",
                },
                {
                  label: t("Karkatta"),
                  value: "4",
                },
                {
                  label: t("Bintuka"),
                  value: "4",
                },
                {
                  label: t("Jamursoya"),
                  value: "4",
                },
                {
                  label: t("Kewetang"),
                  value: "4",
                },
                {
                  label: t("Turyu"),
                  value: "4",
                },
                {
                  label: t("Pangur"),
                  value: "4",
                },
                {
                  label: t("Jarakel"),
                  value: "5",
                },
                {
                  label: t("Baromda"),
                  value: "5",
                },
                {
                  label: t("Jambera"),
                  value: "5",
                },
                {
                  label: t("Barbera"),
                  value: "5",
                },
                {
                  label: t("Bumbalda"),
                  value: "6",
                },
                {
                  label: t("Jamang"),
                  value: "6",
                },
                {
                  label: t("Pabura"),
                  value: "6",
                },
                {
                  label: t("Soy"),
                  value: "7",
                },
                {
                  label: t("Barbera"),
                  value: "7",
                },
                {
                  label: t("Ella"),
                  value: "7",
                },
                {
                  label: t("Kauwajor"),
                  value: "7",
                },
                {
                  label: t("Mahabuang"),
                  value: "7",
                },
                {
                  label: t("Sijang"),
                  value: "7",
                },
                {
                  label: t("Unikel"),
                  value: "7",
                },
                {
                  label: t("Bujaga"),
                  value: "3",
                },
                {
                  label: t("Kuruchdega"),
                  value: "3",
                },
                {
                  label: t("Chhotketunga"),
                  value: "3",
                },
                {
                  label: t("Jaldega"),
                  value: "3",
                },
                {
                  label: t("Virta"),
                  value: "3",
                },
                {
                  label: t("Bandu"),
                  value: "2",
                },
                {
                  label: t("Boroseta"),
                  value: "2",
                },
                {
                  label: t("Jamtoli"),
                  value: "2",
                },
                {
                  label: t("Ketka"),
                  value: "2",
                },
                {
                  label: t("Simhatu"),
                  value: "2",
                },
                {
                  label: t("Beraergi"),
                  value: "9",
                },
                {
                  label: t("Buruergi"),
                  value: "9",
                },
                {
                  label: t("Olhan"),
                  value: "9",
                },
                {
                  label: t("Sumingbera"),
                  value: "9",
                },
                {
                  label: t("Vinjhamarcha"),
                  value: "9",
                },
                {
                  label: t("Rabbai"),
                  value: "9",
                },
                {
                  label: t("Sutriuli"),
                  value: "9",
                },
                {
                  label: t("Helgara"),
                  value: "10",
                },
                {
                  label: t("Banki"),
                  value: "10",
                },
                {
                  label: t("Kanaroya"),
                  value: "10",
                },
                {
                  label: t("Pado"),
                  value: "10",
                },
                {
                  label: t("Badkaduel"),
                  value: "11",
                },
                {
                  label: t("Barerpa"),
                  value: "11",
                },
                {
                  label: t("Chhotkaduel"),
                  value: "11",
                },
                {
                  label: t("Kudrum"),
                  value: "11",
                },
                {
                  label: t("Lamgarh"),
                  value: "11",
                },
                {
                  label: t("Maimsora"),
                  value: "11",
                },
                {
                  label: t("Navagaon"),
                  value: "11",
                },
                {
                  label: t("Chaklabasa"),
                  value: "12",
                },
                ,
                {
                  label: t("Chaklabasa"),
                  value: "12",
                },
                {
                  label: t("Sora"),
                  value: "12",
                },
                {
                  label: t("Buruhonjar"),
                  value: "12",
                },
                {
                  label: t("Chorbandu"),
                  value: "12",
                },
                {
                  label: t("Sotasoya"),
                  value: "13",
                },
                {
                  label: t("Sahubera"),
                  value: "14",
                },
                {
                  label: t("Jamtai"),
                  value: "15",
                },
                {
                  label: t("Bokamara"),
                  value: "14",
                },
                {
                  label: t("Hurda"),
                  value: "15",
                },
                {
                  label: t("Kohipath"),
                  value: "15",
                },
                {
                  label: t("Kewengutu"),
                  value: "15",
                },
                {
                  label: t("Jorobari"),
                  value: "15",
                },
                {
                  label: t("Jorponda"),
                  value: "15",
                },
                {
                  label: t("Birhuli"),
                  value: "16",
                },
                {
                  label: t("Kanta"),
                  value: "16",
                },
                {
                  label: t("Marani"),
                  value: "16",
                },
                {
                  label: t("Raikera"),
                  value: "16",
                },
                {
                  label: t("Tembro"),
                  value: "16",
                },

                {
                  label: t("Genmer"),
                  value: "17",
                },

                {
                  label: t("Chandsai"),
                  value: "17",
                },
                {
                  label: t("Gerda"),
                  value: "17",
                },
                {
                  label: t("Khijurbahar"),
                  value: "17",
                },
                {
                  label: t("Toniya"),
                  value: "17",
                },
              ],
            },
            {
              label: t("Jaldega"),
              value: "2",
              Panchayats: [
                {
                  label: t("Jaldega"),
                  value: "18",
                },
                {
                  label: t("Kutungiya"),
                  value: "19",
                },
                // {
                //     label: t('Kharwagarha'),
                //     value: '20'
                // },
                {
                  label: t("Konmerla"),
                  value: "21",
                },
                ,
                //  {
                //     label: t('Lamboi'),
                //     value: '22'
                // }
                {
                  label: t("Lamdega"),
                  value: "23",
                },
                {
                  label: t("Tingina"),
                  value: "24",
                },
                {
                  label: t("Orga"),
                  value: "25",
                },
                {
                  label: t("Parba"),
                  value: "26",
                },
                {
                  label: t("Tati"),
                  value: "27",
                },
              ],
              Villages: [
                {
                  label: t("Jamtoli"),
                  value: "18",
                },
                {
                  label: t("Pahantoli"),
                  value: "18",
                },
                {
                  label: t("Mahomdega"),
                  value: "18",
                },
                {
                  label: t("Sawanjara"),
                  value: "18",
                },
                {
                  label: t("Ramjari"),
                  value: "19",
                },
                {
                  label: t("Minjurgarha"),
                  value: "19",
                },
                {
                  label: t("Minjurgarha"),
                  value: "19",
                },
                {
                  label: t("Kharwagarha"),
                  value: "20",
                },
                {
                  label: t("Gattigarha"),
                  value: "20",
                },
                {
                  label: t("Kinirkela"),
                  value: "20",
                },
                {
                  label: t("Patiamba"),
                  value: "20",
                },
                {
                  label: t("Dumarbera"),
                  value: "21",
                },
                {
                  label: t("Gangutoli"),
                  value: "21",
                },
                {
                  label: t("Badkitanger"),
                  value: "21",
                },
                {
                  label: t("Konmerla"),
                  value: "21",
                },
                {
                  label: t("Kolomdega"),
                  value: "21",
                },
                {
                  label: t("Tilaijara"),
                  value: "22",
                },
                {
                  label: t("Harrapnai"),
                  value: "22",
                },
                {
                  label: t("Karmapani"),
                  value: "22",
                },
                {
                  label: t("Bendojara"),
                  value: "22",
                },
                {
                  label: t("Lomboi Mahua Toli"),
                  value: "22",
                },
                {
                  label: t("Basaer"),
                  value: "22",
                },
                {
                  label: t("Mama Bhagina"),
                  value: "22",
                },
                {
                  label: t("Bhitbuna"),
                  value: "23",
                },
                {
                  label: t("Baraibera"),
                  value: "23",
                },
                {
                  label: t("Hututuwa"),
                  value: "23",
                },
                {
                  label: t("Lamdega"),
                  value: "23",
                },
                {
                  label: t("Parba lamdega"),
                  value: "23",
                },
                {
                  label: t("Dhorhibahar"),
                  value: "24",
                },
                {
                  label: t("Tikra"),
                  value: "24",
                },
                {
                  label: t("Silinga"),
                  value: "24",
                },
                {
                  label: t("Dhelsera"),
                  value: "25",
                },
                {
                  label: t("Dhelsera"),
                  value: "25",
                },
                {
                  label: t("Orga"),
                  value: "25",
                },
                {
                  label: t("Sarubahar"),
                  value: "25",
                },
                {
                  label: t("Parba"),
                  value: "26",
                },
                {
                  label: t("Dhingurpani"),
                  value: "26",
                },
                {
                  label: t("Dhouranhan"),
                  value: "26",
                },
                {
                  label: t("Kouwadarha"),
                  value: "26",
                },
                {
                  label: t("Lachhanpur"),
                  value: "26",
                },
                {
                  label: t("Siharmunda"),
                  value: "26",
                },
                {
                  label: t("Sukhajhariya"),
                  value: "26",
                },
                {
                  label: t("Mangaspur"),
                  value: "26",
                },
                {
                  label: t("Bendosera"),
                  value: "26",
                },
                {
                  label: t("Janoda"),
                  value: "26",
                },
                {
                  label: t("Jundih"),
                  value: "26",
                },
                {
                  label: t("Bhanvarchawa"),
                  value: "26",
                },
                {
                  label: t("Tati"),
                  value: "27",
                },
                {
                  label: t("Hutubada"),
                  value: "27",
                },
                {
                  label: t("Turupdega"),
                  value: "27",
                },
                {
                  label: t("Barbera"),
                  value: "27",
                },
                {
                  value: t("Toniya"),
                  value: "27",
                },
              ],
            },
            {
              label: t("Kolebira"),
              value: "3",
              Panchayats: [
                {
                  label: t("Ransiya"),
                  value: "28",
                },
                {
                  label: t("Shapur"),
                  value: "29",
                },
                {
                  label: t("Agharma"),
                  value: "30",
                },
                {
                  label: t("Kolebira"),
                  value: "31",
                },
                {
                  label: t("Nawatoli"),
                  value: "32",
                },
                {
                  label: t("Domtoli"),
                  value: "33",
                },
                {
                  label: t("Bandarchuan"),
                  value: "34",
                },
                {
                  label: t("Tutikel"),
                  value: "35",
                },
                {
                  label: t("Eidega"),
                  value: "36",
                },
                {
                  label: t("Barsloya"),
                  value: "37",
                },
                {
                  label: t("Lachragarh"),
                  value: "38",
                },
              ],
              Villages: [
                {
                  label: t("Bokba"),
                  value: "28",
                },
                {
                  label: t("Bongram"),
                  value: "28",
                },
                {
                  label: t("Keyondpani"),
                  value: "28",
                },
                {
                  label: t("Kinbira"),
                  value: "28",
                },
                {
                  label: t("Sirikonde Kera"),
                  value: "28",
                },
                {
                  label: t("Takba"),
                  value: "28",
                },
                {
                  label: t("Shapur"),
                  value: "29",
                },
                {
                  label: t("Kombakera"),
                  value: "29",
                },
                {
                  label: t("Konjoba"),
                  value: "29",
                },
                {
                  label: t("Dumardih"),
                  value: "30",
                },
                {
                  label: t("Jurkela"),
                  value: "30",
                },
                {
                  label: t("Karamtoli"),
                  value: "30",
                },
                {
                  label: t("Larba"),
                  value: "30",
                },
                {
                  label: t("Shivnathpur"),
                  value: "30",
                },
                {
                  label: t("Tangertoli"),
                  value: "30",
                },
                {
                  label: t("Jamtoli"),
                  value: "31",
                },
                {
                  label: t("Kunderdega"),
                  value: "31",
                },
                {
                  label: t("Bhanwarpahari"),
                  value: "32",
                },
                {
                  label: t("Bhanwarpahari"),
                  value: "32",
                },
                {
                  label: t("Nawatoli"),
                  value: "32",
                },
                {
                  label: t("Saraipani"),
                  value: "32",
                },
                {
                  label: t("Sarangapani"),
                  value: "32",
                },
                {
                  label: t("Machka"),
                  value: "32",
                },
                {
                  label: t("Sundratoli"),
                  value: "32",
                },
                {
                  label: t("Barwadih"),
                  value: "33",
                },
                {
                  label: t("Ghansilari"),
                  value: "33",
                },
                {
                  label: t("Tainsera"),
                  value: "33",
                },
                {
                  label: t("Bandarchuwan"),
                  value: "34",
                },
                {
                  label: t("Besrajara"),
                  label: "34",
                },
                {
                  label: t("Selsoya"),
                  label: "34",
                },
                {
                  label: t("Setasoya"),
                  value: "34",
                },
                {
                  label: t("Sardhatoli"),
                  value: "35",
                },
                {
                  label: t("Jhapla"),
                  value: "35",
                },
                {
                  label: t("Sokorla"),
                  value: "35",
                },
                {
                  label: t("Tutikel"),
                  value: "35",
                },
                ,
                {
                  label: t("Eidega"),
                  value: "36",
                },
                {
                  label: t("Kudabera"),
                  value: "36",
                },
                {
                  label: t("Kalhatoli"),
                  value: "36",
                },
                {
                  label: t("Pogloya"),
                  value: "36",
                },
                {
                  label: t("Ramjari"),
                  value: "36",
                },
                {
                  label: t("Barasloya"),
                  value: "37",
                },
                {
                  label: t("Barketunga"),
                  value: "37",
                },
                {
                  label: t("Kulasoya"),
                  value: "37",
                },
                {
                  label: t("Sijang"),
                  value: "37",
                },
                {
                  label: t("Kombakra"),
                  value: "38",
                },
                {
                  label: t("Lachragarh"),
                  value: "38",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const panchayatToVillageMapping = {
    [t("Bano")]: [
      {
        label: t("Bano"),
        value: "1",
      },
      {
        label: t("Samdega"),
        value: "2",
      },
    ],
    [t("Bintuka")]: [
      {
        label: t("Karkatta"),
        value: "3",
      },
      {
        label: t("Bintuka"),
        value: "4",
      },
      {
        label: t("Jamursoya"),
        value: "5",
      },
      {
        label: t("Kewetang"),
        value: "6",
      },
      {
        label: t("Turyu"),
        value: "7",
      },
      {
        label: t("Pangur"),
        value: "8",
      },
    ],
    [t("Kanarowan")]: [
      {
        label: t("Jarakel"),
        value: "5",
      },
      {
        label: t("Baromda"),
        value: "5",
      },
      {
        label: t("Jambera"),
        value: "5",
      },
      {
        label: t("Barbera"),
        value: "5",
      },
      {
        label: t("Kanarowan"),
        value: "6",
      },
    ],
    [t("Pabura")]: [
      {
        label: t("Bamulda"),
        value: "6",
      },

      {
        label: t("Nitmur"),
        value: "6",
      },
      {
        label: t("Jamang"),
        value: "6",
      },
      {
        label: t("Pabura"),
        value: "7",
      },
      {
        label: t("Kenduda"),
        value: "7",
      },
      {
        label: t("Chodordah"),
        value: "7",
      },
    ],

    [t("Soy")]: [
      {
        label: t("Soy"),
        value: "7",
      },
      {
        label: t("Barbera"),
        value: "7",
      },
      {
        label: t("Ela"),
        value: "7",
      },
      {
        label: t("Kauwajor"),
        value: "7",
      },
      {
        label: t("Mahabuang"),
        value: "7",
      },
      {
        label: t("Sijang"),
        value: "7",
      },
      {
        label: t("Unikel"),
        value: "7",
      },
    ],
    [t("Konsode")]: [
      {
        label: t("Bujaga"),
        value: "8",
      },
      {
        label: t("Kuruchdega"),
        value: "8",
      },
      {
        label: t("Chhotketunga"),
        value: "8",
      },
      {
        label: t("Jaldega"),
        value: "8",
      },
      {
        label: t("Virta"),
        value: "8",
      },
    ],

    [t("Semhatu")]: [
      {
        label: t("Bandu"),
        value: "2",
      },
      {
        label: t("Boroseta"),
        value: "2",
      },
      {
        label: t("Jamtoli"),
        value: "2",
      },
      {
        label: t("Ketka"),
        value: "2",
      },
      {
        label: t("Simhatu"),
        value: "2",
      },
    ],
    [t("Simhatu")]: [
      {
        label: t("Bandu"),
        value: "2",
      },
      {
        label: t("Boroseta"),
        value: "2",
      },
      {
        label: t("Jamtoli"),
        value: "2",
      },
      {
        label: t("Ketka"),
        value: "2",
      },
      {
        label: t("Simhatu"),
        value: "2",
      },
    ],
    [t("Beraergi")]: [
      {
        label: t("Beraergi"),
        value: "9",
      },
      {
        label: t("Buruergi"),
        value: "9",
      },
      {
        label: t("Olhan"),
        value: "9",
      },
      {
        label: t("Sumingbera"),
        value: "9",
      },
      {
        label: t("Vinjhamarcha"),
        value: "9",
      },
      {
        label: t("Rabbai"),
        value: "9",
      },
      {
        label: t("Sutriuli"),
        value: "9",
      },
    ],
    [t("Banki")]: [
      {
        label: t("Helgara"),
        value: "10",
      },
      {
        label: t("Banki"),
        value: "10",
      },
      {
        label: t("Kanaroya"),
        value: "10",
      },
      {
        label: t("Pado"),
        value: "10",
      },
    ],

    [t("Ukauli")]: [
      ,
      {
        label: t("Chaklabasa"),
        value: "12",
      },
      {
        label: t("Sora"),
        value: "12",
      },
      {
        label: t("Buruhonjar"),
        value: "12",
      },
      {
        label: t("Chorbandu"),
        value: "12",
      },
    ],
    [t("Dumariya")]: [
      {
        label: t("Sotasoya"),
        value: "13",
      },
    ],
    [t("Sahubera")]: [
      {
        label: t("Sahubera"),
        value: "14",
      },
      {
        label: t("Bokamara"),
        value: "14",
      },
    ],
    [t("Jamtai")]: [
      {
        label: t("Jamtai"),
        value: "15",
      },
      {
        label: t("Hurda"),
        value: "15",
      },
      {
        label: t("Kohipath"),
        value: "15",
      },
      {
        label: t("Kewengutu"),
        value: "15",
      },
      {
        label: t("Jorobari"),
        value: "15",
      },
      {
        label: t("Jorponda"),
        value: "15",
      },
    ],
    [t("Raikera")]: [
      {
        label: t("Birhuli"),
        value: "16",
      },
      {
        label: t("Kanta"),
        value: "16",
      },
      {
        label: t("Marani"),
        value: "16",
      },
      {
        label: t("Raikera"),
        value: "16",
      },
      {
        label: t("Tembro"),
        value: "16",
      },
    ],
    [t("Genmer")]: [
      {
        label: t("Chandsai"),
        value: "17",
      },
      {
        label: t("Genmer"),
        value: "17",
      },

      {
        label: t("Gerda"),
        value: "17",
      },
      {
        label: t("Khijurbahar"),
        value: "17",
      },
      {
        label: t("Toniya"),
        value: "17",
      },
    ],
    [t("Badkaduel")]: [
      {
        label: t("Badkaduel"),
        value: "1",
      },
      {
        label: t("Barerpa"),
        value: "2",
      },
      {
        label: t("Chhotkaduel"),
        value: "3",
      },
      {
        label: t("Kudrum"),
        value: "4",
      },
      {
        label: t("Lamgarh"),
        value: "5",
      },
      {
        label: t("Maimsora"),
        value: "6",
      },
      {
        label: t("Navagaon"),
        value: "7",
      },
    ],

    // KOLIBERA

    [t("Ransiya")]: [
      {
        label: t("Bokba"),
        value: "28",
      },
      {
        label: t("Bongram"),
        value: "28",
      },
      {
        label: t("Keyondpani"),
        value: "28",
      },
      {
        label: t("Kinbira"),
        value: "28",
      },
      {
        label: t("Sirikonde Kera"),
        value: "28",
      },
      {
        label: t("Takba"),
        value: "28",
      },
    ],

    [t("Shapur")]: [
      {
        label: t("Kombakera"),
        value: "29",
      },
      {
        label: t("Konjoba"),
        value: "29",
      },
      {
        label: t("Shahpur Kondekera"),
        value: "20",
      },
    ],

    [t("Agharma")]: [
      {
        label: t("Dumardih"),
        value: "30",
      },
      {
        label: t("Jurkela"),
        value: "30",
      },
      {
        label: t("Karamtoli"),
        value: "30",
      },
      {
        label: t("Larba"),
        value: "30",
      },
      {
        label: t("Shivnathpur"),
        value: "30",
      },
      {
        label: t("Tangertoli"),
        value: "30",
      },
    ],

    [t("Kolebira")]: [
      {
        label: t("Jamtoli"),
        value: "31",
      },
      {
        label: t("Kunderdega"),
        value: "31",
      },
    ],

    [t("Nawatoli")]: [
      {
        label: t("Bhanwarpahari"),
        value: "32",
      },
      {
        label: t("Bhanwarpahari"),
        value: "32",
      },
      {
        label: t("Saraipani"),
        value: "32",
      },
      {
        label: t("Sarangapani"),
        value: "32",
      },
      {
        label: t("Machka"),
        value: "32",
      },
      {
        label: t("Sundratoli"),
        value: "32",
      },
    ],

    [t("Domtoli")]: [
      {
        label: t("Barwadih"),
        value: "33",
      },
      {
        label: t("Ghansilari"),
        value: "33",
      },
      {
        label: t("Tainsera"),
        value: "33",
      },
    ],

    [t("Bandarchuwan")]: [
      {
        label: t("Bandarchuwan"),
        value: "34",
      },
      {
        label: t("Besrajara"),
        value: "34",
      },
      {
        label: t("Selsoya"),
        value: "34",
      },
      {
        label: t("Setasoya"),
        value: "34",
      },
    ],

    [t("Tutikel")]: [
      {
        label: t("Sardhatoli"),
        value: "35",
      },
      {
        label: t("Jhapla"),
        value: "35",
      },
      {
        label: t("Sokorla"),
        value: "35",
      },
      {
        label: t("Tutikel"),
        value: "35",
      },
    ],

    [t("Eidega")]: [
      ,
      {
        label: t("Eidega"),
        value: "36",
      },
      {
        label: t("Kudabera"),
        value: "36",
      },
      {
        label: t("Kalhatoli"),
        value: "36",
      },
      {
        label: t("Pogloya"),
        value: "36",
      },
      {
        label: t("Ramjari"),
        value: "36",
      },
    ],

    [t("Barasloya")]: [
      {
        label: t("Barasloya"),
        value: "37",
      },
      {
        label: t("Barketunga"),
        value: "37",
      },
      {
        label: t("Kulasoya"),
        value: "37",
      },
      {
        label: t("Sijang"),
        value: "37",
      },
    ],

    [t("Lachragarh")]: [
      ,
      {
        label: t("Kombakra"),
        value: "38",
      },
      {
        label: t("Lachragarh"),
        value: "38",
      },
    ],

    // JALDEGA

    [t("Jaldega")]: [
      {
        label: t("Jamtoli"),
        value: "18",
      },
      {
        label: t("Pahantoli"),
        value: "18",
      },
      {
        label: t("Mahomdega"),
        value: "18",
      },
      {
        label: t("Sawanjara"),
        value: "18",
      },
    ],

    [t("Kutungiya")]: [
      {
        label: t("Menjurgara"),
        value: "20",
      },
      {
        label: t("Ramjari"),
        value: "19",
      },
      {
        label: t("Dumarmunda"),
        value: "20",
      },
    ],

    [t("Patiamba")]: [
      {
        label: t("Kharwagarha"),
        value: "12",
      },

      {
        label: t("Gattigarha"),
        value: "20",
      },
      {
        label: t("Kinirkela"),
        value: "20",
      },
      {
        label: t("Patiamba"),
        value: "20",
      },
    ],

    [t("Konmerla")]: [
      {
        label: t("Dumarbera"),
        value: "21",
      },
      {
        label: t("Gangutoli"),
        value: "21",
      },
      {
        label: t("Badkitanger"),
        value: "21",
      },
      {
        label: t("Konmerla"),
        value: "21",
      },
      {
        label: t("Kolomdega"),
        value: "21",
      },
      {
        label: t("Baldega"),
        value: "23",
      },
    ],

    [t("Lamdega")]: [
      {
        label: t("Baraibera"),
        value: "23",
      },

      {
        label: t("Bhitbuna"),
        value: "23",
      },

      {
        label: t("Hututuwa"),
        value: "23",
      },
      {
        label: t("Lamdega"),
        value: "23",
      },
      {
        label: t("Parba lamdega"),
        value: "23",
      },
    ],

    [t("Tingina")]: [
      {
        label: t("Dhorhibahar"),
        value: "24",
      },
      {
        label: t("Tikra"),
        value: "24",
      },

      {
        label: t("Tingina"),
        value: "23",
      },
      {
        label: t("Silinga"),
        value: "24",
      },
    ],

    [t("Orga")]: [
      {
        label: t("Dhelsera"),
        value: "25",
      },
      {
        label: t("Orga"),
        value: "25",
      },
      {
        label: t("Sarubahar"),
        value: "25",
      },
    ],

    [t("Parba")]: [
      {
        label: t("Dhingurpani"),
        value: "26",
      },
      {
        label: t("Dhouranjan"),
        value: "28",
      },
      {
        label: t("Kouwadarha"),
        value: "26",
      },
      {
        label: t("Lachhanpur"),
        value: "26",
      },
      {
        label: t("Siharmunda"),
        value: "26",
      },
      {
        label: t("Sukhajhariya"),
        value: "26",
      },
      {
        label: t("Mangaspur"),
        value: "26",
      },
      {
        label: t("Bendosera"),
        value: "26",
      },
      {
        label: t("Janoda"),
        value: "26",
      },
    ],

    [t("Tati")]: [
      {
        label: t("Hutubda"),
        value: "29",
      },
      {
        label: t("Turupdega"),
        value: "27",
      },
      {
        label: t("Barbera"),
        value: "27",
      },
      {
        label: t("Phirka"),
        value: "27",
      },
      {
        label: t("Tati"),
        value: "28",
      },
      {
        label: t("Torian"),
        value: "29",
      },

      // {
      //     value: t('Toniya'),
      //     value: '27'
      // },

      // {
      //     label: t('Tilaijara'),
      //     value: '22'
      // }, {
      //     label: t('Harrapnai'),
      //     value: '22'
      // }, {
      //     label: t('Karmapani'),
      //     value: '22'
      // }, {
      //     label: t('Bendojara'),
      //     value: '22'
      // }, {
      //     label: t('Lomboi Mahua Toli'),
      //     value: '22'
      // },
      // {
      //     label: t('Basaer'),
      //     value: '22'
      // }, {
      //     label: t('Mama Bhagina'),
      //     value: '22'
      // },
      // {
      //     label: t('Jundih'),
      //     value: '26'
      // }, {
      //     label: t('Hutubada'),
      //     value: '27'
      // },

      // {
      //     label: t('Bhanvarchawa'),
      //     value: '26'
      // },
    ],
  };

  return [states,panchayatToVillageMapping,levelWiseRole];
}

export default useJharkhandData;
