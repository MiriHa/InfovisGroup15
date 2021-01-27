// Lables
const ANALOG = "Analog"
const DIGITAL = "Digital"
const HEALTH = "Gesundheit"
const NEWS = "Nachrichten"
const FREETIME = "Freizeit"
const SPORT = "Sport"

const COLOR_ANALOG = "#e28743"
const COLOR_DIGITAL = "#1e81b0"
const COLOR_HIGHLIGTH_ANALOG = "#a84d0a" //Analog in bubbles.js zeile 303 gesetzt
const COLOR_HIGHLIGTH_DIGITAL = "#08456e" //analog in bubbles.js isn zeile 358 gestzt

// Where to find csv
const PATH_ANALOG_SPORT = "data/analog/month/data_month_zeitschrif_klettern.csv"
const PATH_ANALOG_NEWS = "data/analog/month/data_month_zeitung_sz.csv"
const PATH_ANALOG_HEALTH = "data/analog/month/data_month_zeitschrift_ApothekenUmschau.csv"
const PATH_ANALOG_FREETIME = "data/analog/month/data_month_zeitschrift_burdaStyle.csv"

const SOURCE_ANALOG = "https://www.ivw.eu/aw/print/qa/titel/"
const SOURCE_DIGITAL = "Informationsgemeinschaft zur Feststellung der Verbreitung von Werbeträgern e.V. (IVW)"

const PATH_DIGITAL_SPORT = "data/digital/format/digital_bergsteiger.CSV"
const PATH_DIGITAL_NEWS = "data/digital/format/digital_sueddeutsche.CSV"
const PATH_DIGITAL_HEALTH = "data/digital/format/digital_apothekenUmschau.CSV"
const PATH_DIGITAL_FREETIME = "data/digital/format/digital_burdaStyle.CSV"


/*var radius = [
    [0,0,0,0,0,0,0,0,0,0],
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Jan
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Feb
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Mrz
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Apr
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Mai
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Jun
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Jul
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Aug
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Sep
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100],  // Okt
    [0, 90, 90, 60, 60, 60, 60, 60, 60, 60, 60],   // Nov
    [0, 90, 90, 60, 80, 90, 60, 70, 80, 90, 100]   // Dez
]*/

var radius = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Jan
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Feb
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Mrz
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Apr
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Mai
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Jun
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Jul
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Aug
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Sep
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Okt
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Nov
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0]]  // Dez


//For the Tooltip, save the amount and title to display
var amountCollection = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Jan
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Feb
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Mrz
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Apr
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Mai
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Jun
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Jul
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Aug
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Sep
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],  // Okt
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0],   // Nov
    [0, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0]]  // Dez
var titleCollection = [0, 1, 2, 3, 4, 5 ,6 ,7, 8, 9]

//for markedBubbles
var clicked_Digital = 0;
var clicked_Analog = 0;
var sameClick = 1;
var markedBA = 0;
var markedBD = 0;
