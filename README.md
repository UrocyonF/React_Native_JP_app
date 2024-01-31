# 🛑 Work in progress 🛑


# Preview current state :

v1.0 => 01/2023 - 04/2023\
v1.1 => 05/2023 - 12/2023\
v1.2 => 2024

## [```Main screen (App)```](./APPJPN/App.tsx)
<img src="./README_img/v1.1/main_screen.png" alt="main screen" width="220"/>v1.1
<img src="./README_img/v1.2/main_screen.png" alt="main screen" width="220"/>v1.2


## [```Dico screen```](./APPJPN/components/DicoScreen.tsx)
<img src="./README_img/v1.1/dico_screen.png" alt="dico screen" width="220"/>v1.1
<img src="./README_img/v1.2/dico_screen.png" alt="dico screen" width="220"/>v1.2

### [```Dico category screen```](./APPJPN/components/dico/DicoCategoryScreen.tsx)   ("verbe" category selected)
<img src="./README_img/v1.1/dico_category_screen.png" alt="dico screen" width="220"/>v1.1
<img src="./README_img/v1.2/dico_category_screen.png" alt="dico screen" width="220"/>v1.2

### [```Dico search screen```](./APPJPN/components/dico/DicoSearchScreen.tsx)   (search "u" here)
<img src="./README_img/v1.1/dico_search_screen.png" alt="dico screen" width="220"/>v1.1
<img src="./README_img/v1.2/dico_search_screen.png" alt="dico screen" width="220"/>v1.2

### [```Dico add screen```](./APPJPN/components/dico/DicoAddScreen.tsx)
<img src="./README_img/v1.1/dico_add_screen.png" alt="dico screen" width="220"/>v1.1
<img src="./README_img/v1.2/dico_add_screen.png" alt="dico screen" width="220"/>v1.2


## [```Traduction screen```](./APPJPN/components/TradScreen.tsx)
<img src="./README_img/v1.1/trad_screen.png" alt="trad screen" width="220"/>v1.1
<img src="./README_img/v1.2/trad_screen.png" alt="trad screen" width="220"/>v1.2


## [```Kana screen```](./APPJPN/components/KanaScreen.tsx)
<img src="./README_img/v1.1/kana_screen.png" alt="kana screen" width="220"/>v1.1
<img src="./README_img/v1.2/kana_screen.png" alt="kana screen" width="220"/>v1.2


## [```Kanji screen```](./APPJPN/components/KanjiScreen.tsx)   (here asking for "ame 雨")
<img src="./README_img/v1.1/kanji_screen1.png" alt="kanji screen" width="220"/>v1.1
<img src="./README_img/v1.2/kanji_screen1.png" alt="kanji screen" width="220"/>v1.2

### [```Kanji answer screen```](./APPJPN/components/KanjiScreen.tsx)
<img src="./README_img/v1.1/kanji_screen2.png" alt="kanji screen" width="220"/>v1.1
<img src="./README_img/v1.2/kanji_screen2.png" alt="kanji screen" width="220"/>v1.2


# Data location :

Static data are located in [```constants```](./APPJPN/constants/) folder, and organized like this :\
├── lesson\
│   ├── [```_lessonsName_.json```](./APPJPN/constants/lesson/_lessonsName_.json)\
│   ├── [```1_verb.json```](./APPJPN/constants/lesson/1_verb.json)\
│   └── . . .\
└── [```kanji.json```](./APPJPN/constants/kanji.json)

Dynamic data are located in [```assets```](./APPJPN/android/app/src/main/assets/) folder, and organized like this :\
└── [```dico.json```](./APPJPN/android/app/src/main/assets/dico.json)