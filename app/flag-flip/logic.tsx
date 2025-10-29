export type Difficulty = 0 | 1 | 2 | 3;

import { makeAutoObservable, runInAction } from "mobx";
import { countries } from "country-flag-icons";

export const countryNames: Record<string, string> = {
  AC: "Ascension Island",
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua & Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia & Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "St. Barthélemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BQ: "Caribbean Netherlands",
  BR: "Brazil",
  BS: "Bahamas",
  BT: "Bhutan",
  BV: "Bouvet Island",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "Congo - Kinshasa",
  CF: "Central African Republic",
  CG: "Congo - Brazzaville",
  CH: "Switzerland",
  CI: "Côte d’Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cape Verde",
  CW: "Curaçao",
  CX: "Christmas Island",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Western Sahara",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  EU: "European Union",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabon",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "French Guiana",
  GG: "Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "So. Georgia & So. Sandwich Isl.",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong (China)",
  HM: "Heard & McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  IC: "Canary Islands",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Comoros",
  KN: "St. Kitts & Nevis",
  KP: "North Korea",
  KR: "South Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Laos",
  LB: "Lebanon",
  LC: "St. Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "St. Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "Macedonia",
  ML: "Mali",
  MM: "Myanmar (Burma)",
  MN: "Mongolia",
  MO: "Macau (China)",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "St. Pierre & Miquelon",
  PN: "Pitcairn Islands",
  PR: "Puerto Rico",
  PS: "Palestinian Territories",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russia",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SH: "St. Helena",
  SI: "Slovenia",
  SJ: "Svalbard & Jan Mayen",
  SK: "Slovakia",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "São Tomé & Príncipe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syria",
  SZ: "Swaziland",
  TA: "Tristan da Cunha",
  TC: "Turks & Caicos Islands",
  TD: "Chad",
  TF: "French Southern Territories",
  TG: "Togo",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Turkey",
  TT: "Trinidad & Tobago",
  TV: "Tuvalu",
  TW: "Taiwan",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "U.S. Outlying Islands",
  US: "United States",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Vatican City",
  VC: "St. Vincent & Grenadines",
  VE: "Venezuela",
  VG: "British Virgin Islands",
  VI: "U.S. Virgin Islands",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis & Futuna",
  WS: "Samoa",
  XK: "Kosovo",
  YE: "Yemen",
  YT: "Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};

class MatchCard {
  id: number; // unique across games
  isFlipped: boolean;
  isMatched: boolean;
  isError: boolean;
  countryCode: string;

  constructor(id: number, countryCode: string) {
    this.id = id;
    this.isFlipped = false;
    this.isMatched = false;
    this.isError = false;
    this.countryCode = countryCode;
    makeAutoObservable(this);
  }

  setFlipped(value: boolean) {
    this.isFlipped = value;
  }

  setErrorFlash() {
    this.isError = true;
    setTimeout(() => {
      runInAction(() => {
        this.isError = false;
      });
    }, 600); // lasts 0.6s
  }

  setMatched(value: boolean) {
    this.isMatched = value;
  }
}

class FlagFlipLogic {
  cards: MatchCard[];
  comparingCards: MatchCard[] = [];
  allMatched: boolean = false;
  difficulty: Difficulty = 1;
  overlayIsOpen: boolean = false;
  version: number = 0; // increments each (re)deal so React keys change across games
  private nextId: number = 1; // unique id source for cards
  private lastPickedCountries: string[] = [];

  constructor() {
    this.cards = [];
    makeAutoObservable(this, {}, { autoBind: true });
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("flag-flip-difficulty");
      if (stored !== null) {
        const parsed = parseInt(stored, 10);
        if (parsed >= 0 && parsed <= 3) this.difficulty = parsed as Difficulty;
      }
    }
    this.dealNewGame();
  }

  setDifficulty(newDifficulty: Difficulty) {
    this.difficulty = newDifficulty;
    if (typeof window !== "undefined") {
      localStorage.setItem("flag-flip-difficulty", String(newDifficulty));
    }
  }

  private buildRandomizedCards(): MatchCard[] {
    // Make a fresh copy of all country codes
    const available = [...countries];
    // Remove the ones used in the previous game
    const filtered = available.filter(
      (c) => !this.lastPickedCountries.includes(c)
    );

    // Shuffle and pick 8 new unique countries
    const picked = filtered.sort(() => 0.5 - Math.random()).slice(0, 8);

    // Remember these for next round
    this.lastPickedCountries = picked;

    // Double them up and shuffle for card pairing
    const doubled = picked
      .flatMap((code) => [code, code])
      .sort(() => 0.5 - Math.random());

    return doubled.map((code) => new MatchCard(this.nextId++, code));
  }

  private dealNewGame() {
    this.allMatched = false;
    this.version += 1;
    this.cards = this.buildRandomizedCards();
    this.comparingCards = [];
  }

  compare(card: MatchCard) {
    if (this.comparingCards.includes(card) || card.isMatched) {
      return;
    }

    this.comparingCards.push(card);

    if (this.comparingCards.length === 2) {
      const [firstCard, secondCard] = this.comparingCards;
      if (
        firstCard.countryCode === secondCard.countryCode &&
        this.difficulty === 3
      ) {
        // In very hard mode, ask for country name
        this.overlayIsOpen = true;
      } else if (firstCard.countryCode === secondCard.countryCode) {
        this.successfulMatch();
      } else {
        this.comparingCards = [];
        setTimeout(() => {
          // trigger the visual error flash (each handles its own timeout)
          firstCard.setErrorFlash();
          secondCard.setErrorFlash();
          // then flip back inside an action
          setTimeout(() => {
            runInAction(() => {
              firstCard.setFlipped(false);
              secondCard.setFlipped(false);
            });
          }, 450);
        }, 450);
      }
    }
  }

  successfulMatch() {
    const [firstCard, secondCard] = this.comparingCards;
    firstCard.setMatched(true);
    secondCard.setMatched(true);
    this.comparingCards = [];

    if (this.cards.every((c) => c.isMatched)) {
      this.allMatched = true;
    }
  }

  resetGame() {
    this.cards.forEach((card) => card.setFlipped(false));
    this.overlayIsOpen = false;
    setTimeout(() => {
      runInAction(() => {
        this.dealNewGame();
      });
    }, 450);
  }
}

export default FlagFlipLogic;
