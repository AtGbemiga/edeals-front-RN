export type State = {
  label: string;
  value: string;
};

export type City = {
  label: string;
  value: string;
};

export const getCitiesForState = (stateValue: string): City[] => {
  switch (stateValue) {
    case "lagos":
      return lagosCities;
    case "abia":
      return abiaCities;
    case "abuja":
      return abujaCities;
    case "adamawa":
      return adamawaCities;
    case "akwaIbom":
      return akwaIbomCities;
    case "anambra":
      return anambraCities;
    case "bauchi":
      return bauchiCities;
    case "benue":
      return benueCities;
    case "borno":
      return bornoCities;
    case "crossRiver":
      return riversCities;
    case "delta":
      return deltaCities;
    case "ebonyi":
      return ebonyiCities;
    case "edo":
      return edoCities;
    case "ekitiCities":
      return ekitiCities;
    case "enugu":
      return enuguCities;
    case "gombe":
      return gombeCities;
    case "imo":
      return imoCities;
    case "jigawa":
      return jigawaCities;
    case "kaduna":
      return kadunaCities;
    case "kano":
      return kanoCities;
    case "kastina":
      return katsinaCities;
    case "kebbi":
      return kebbiCities;
    case "kogi":
      return kogiCities;
    case "kwara":
      return kwaraCities;
    case "lagos":
      return lagosCities;
    case "nasarawa":
      return nasarawaCities;
    case "niger":
      return nigerCities;
    case "ogun":
      return ogunCities;
    case "ondo":
      return ondoCities;
    case "osun":
      return osunCities;
    case "oyo":
      return oyoCities;
    case "plateau":
      return plateauCities;
    case "riversCities":
      return riversCities;
    case "sokotoCities":
      return sokotoCities;
    case "taraba":
      return tarabaCities;
    case "yobe":
      return yobeCities;
    case "zamfara":
      return zamfaraCities;
    default:
      return [];
  }
};

export const ngStates = [
  { label: "Abia", value: "abia" },
  { label: "Abuja", value: "abuja" },
  { label: "Adamawa", value: "adamawa" },
  { label: "Akwa Ibom", value: "akwaIbom" },
  { label: "Anambra", value: "anambra" },
  { label: "Bauchi", value: "bauchi" },
  { label: "Bayelsa", value: "bayelsa" },
  { label: "Benue", value: "benue" },
  { label: "Borno", value: "borno" },
  { label: "Cross River", value: "crossRiver" },
  { label: "Delta", value: "delta" },
  { label: "Ebonyi", value: "ebonyi" },
  { label: "Ekiti", value: "ekiti" },
  { label: "Enugu", value: "enugu" },
  { label: "Gombe", value: "gombe" },
  { label: "Imo", value: "imo" },
  { label: "Jigawa", value: "jigawa" },
  { label: "Kaduna", value: "kaduna" },
  { label: "Kano", value: "kano" },
  { label: "Kastina", value: "kastina" },
  { label: "Kebbi", value: "kebbi" },
  { label: "Kogi", value: "kogi" },
  { label: "Kwara", value: "kwara" },
  { label: "Lagos", value: "lagos" },
  { label: "Nasarawa", value: "nasarawa" },
  { label: "Niger", value: "niger" },
  { label: "Ogun", value: "ogun" },
  { label: "Ondo", value: "ondo" },
  { label: "Osun", value: "osun" },
  { label: "Oyo", value: "oyo" },
  { label: "Plateau", value: "plateau" },
  { label: "Rivers", value: "rivers" },
  { label: "Sokoto", value: "sokoto" },
  { label: "Taraba", value: "taraba" },
  { label: "Yobe", value: "yobe" },
  { label: "Zamfara", value: "zamfara" },
];

export const abiaCities = [
  { label: "Abia", value: "Abia" },
  { label: "Aba", value: "Aba" },
  { label: "Umuahia", value: "Umuahia" },
  { label: "Ikwuano", value: "Ikwuano" },
  { label: "Umu-Nneochi", value: "Umu-Nneochi" },
];

export const adamawaCities = [
  { label: "Yola", value: "Yola" },
  { label: "Demsa", value: "Demsa" },
  { label: "Ilorin", value: "Ilorin" },
];

export const akwaIbomCities = [
  { label: "Uyo", value: "Uyo" },
  { label: "Abakaliki", value: "Abakaliki" },
  { label: "Oshogbo", value: "Oshogbo" },
];

export const anambraCities = [
  { label: "Awka", value: "Awka" },
  { label: "Anambra", value: "Anambra" },
  { label: "Onitsha", value: "Onitsha" },
];

export const bauchiCities = [
  { label: "Bauchi", value: "Bauchi" },
  { label: "Gombe", value: "Gombe" },
  { label: "Dutse", value: "Dutse" },
];

export const bayelsaCities = [
  { label: "Yenagoa", value: "Yenagoa" },
  { label: "Brass", value: "Brass" },
  { label: "Bama", value: "Bama" },
];

export const benueCities = [
  { label: "Makurdi", value: "Makurdi" },
  { label: "Awka", value: "Awka" },
  { label: "Enugu", value: "Enugu" },
];

export const bornoCities = [
  { label: "Yola", value: "Yola" },
  { label: "Jos", value: "Jos" },
  { label: "Jos", value: "Jos" },
];

export const crossRiverCities = [
  { label: "Calabar", value: "Calabar" },
  { label: "Calabar", value: "Calabar" },
  { label: "Calabar", value: "Calabar" },
];

export const deltaCities = [
  { label: "Asaba", value: "Asaba" },
  { label: "Warri", value: "Warri" },
  { label: "Ughelli", value: "Ughelli" },
];

export const ebonyiCities = [
  { label: "Abakaliki", value: "Abakaliki" },
  { label: "Ezza", value: "Ezza" },
  { label: "Ezza", value: "Ezza" },
];

export const edoCities = [
  { label: "Benin City", value: "Benin City" },
  { label: "Edo", value: "Edo" },
  { label: "Port Harcourt", value: "Port Harcourt" },
];

export const ekitiCities = [
  { label: "Ado Ekiti", value: "Ado Ekiti" },
  { label: "Ekiti", value: "Ekiti" },
  { label: "Ijero", value: "Ijero" },
];

export const enuguCities = [
  { label: "Aninri", value: "aninri" },
  { label: "Awgu", value: "awgu" },
  { label: "Enugu East", value: "enuguEast" },
];

export const abujaCities = [
  { label: "Kwali", value: "kwali" },
  { label: "Kuje", value: "kuje" },
  { label: "Gwagwalada", value: "gwagwalada" },
];

export const gombeCities = [
  { label: "Akko", value: "akko" },
  { label: "Balanga", value: "balanga" },
  { label: "Billiri", value: "billiri" },
];

export const imoCities = [
  { label: "Aboh Mbaise", value: "abohMbaise" },
  { label: "Ahiazu Mbaise", value: "ahiazuMbaise" },
  { label: "Ehime Mbano", value: "ehimeMban" },
];

export const jigawaCities = [
  { label: "Garki", value: "garki" },
  { label: "Kafin Hausa", value: "kafinHausa" },
  { label: "Kazaure", value: "kazaure" },
];

export const kadunaCities = [
  { label: "Birnin Gwari", value: "birninGwari" },
  { label: "Chikun", value: "chikun" },
  { label: "Giwa", value: "giwa" },
];

export const kanoCities = [
  { label: "Fagge", value: "fagge" },
  { label: "Dala", value: "dala" },
  { label: "Gwale", value: "gwale" },
];

export const katsinaCities = [
  { label: "Bakori", value: "bakori" },
  { label: "Batagarawa", value: "batagarawa" },
  { label: "Batsari", value: "batsari" },
];

export const kebbiCities = [
  { label: "Birnin Kebbi", value: "birninKebbi" },
  { label: "Gwandu", value: "gwandu" },
  { label: "Jega", value: "jega" },
];

export const kogiCities = [
  { label: "Lokoja", value: "lokoja" },
  { label: "Ijebu-Ode", value: "ijebuOde" },
  { label: "Ode", value: "ode" },
];

export const kwaraCities = [
  { label: "Ilorin", value: "ilorin" },
  { label: "Offa", value: "offa" },
  { label: "Edu", value: "edu" },
];

export const lagosCities = [
  { label: "Agege", value: "agege" },
  { label: "Ajeromi-Ifelodun", value: "ajeromiIfelodun" },
  { label: "Alimosho", value: "alimosho" },
];

export const nasarawaCities = [
  { label: "Lafia", value: "lafia" },
  { label: "Wamakko", value: "wamakko" },
  { label: "Yenagoa", value: "yenagoa" },
];

export const nigerCities = [
  { label: "Minna", value: "minna" },
  { label: "Shagamu", value: "shagamu" },
  { label: "Agaie", value: "agaie" },
];

export const ogunCities = [
  { label: "Irepodun", value: "irepodun" },
  { label: "Ogbomosho North", value: "ogbomoshoNorth" },
  { label: "Ogbomosho South", value: "ogbomoshoSouth" },
];

export const ondoCities = [
  { label: "Akure", value: "akure" },
  { label: "Ondo East", value: "ondoEast" },
  { label: "Ondo West", value: "ondoWest" },
];

export const osunCities = [
  { label: "Oshogbo", value: "oshogbo" },
  { label: "Oyo East", value: "oyoEast" },
  { label: "Oyo West", value: "oyoWest" },
];

export const oyoCities = [
  { label: "Ibadan North", value: "ibadanNorth" },
  { label: "Ibadan North East", value: "ibadanNorthEast" },
  { label: "Ibadan North West", value: "ibadanNorthWest" },
];

export const plateauCities = [
  { label: "Jos East", value: "josEast" },
  { label: "Jos North", value: "josNorth" },
  { label: "Jos South", value: "josSouth" },
];

export const riversCities = [
  { label: "Abua", value: "abua" },
  { label: "Ahoada East", value: "ahoadaEast" },
  { label: "Ahoada West", value: "ahoadaWest" },
];

export const sokotoCities = [
  { label: "Sokoto North", value: "sokotoNorth" },
  { label: "Sokoto South", value: "sokotoSouth" },
  { label: "Sokoto South West", value: "sokotoSouthWest" },
];

export const tarabaCities = [
  { label: "Ardo Kola", value: "ardoKola" },
  { label: "Bali", value: "bali" },
  { label: "Donga", value: "donga" },
];

export const yobeCities = [
  { label: "Bade", value: "bade" },
  { label: "Gashaka", value: "gashaka" },
  { label: "Gassol", value: "gassol" },
];

export const zamfaraCities = [
  { label: "Katsina", value: "katsina" },
  { label: "Makurdi", value: "makurdi" },
  { label: "Zamfara", value: "zamfara" },
];
