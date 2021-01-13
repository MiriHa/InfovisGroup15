// Lables
const ANALOG = "analog"
const DIGITAL = "digital"
const HEALTH = "health"
const NEWS = "news"
const FREETIME = "freetime"
const SPORT = "sport"

const COLOR_ANALOG = "#e28743"
const COLOR_DIGITAL = "#1e81b0"

// Where to find csv
const PATH_ANALOG_SPORT = "data/analog/month/data_month_zeitschrif_klettern.csv"
const PATH_ANALOG_NEWS = "data/analog/month/data_month_zeitung_sz.csv"
const PATH_ANALOG_HEALTH = "data/analog/month/data_month_zeitschrift_ApothekenUmschau.csv"
const PATH_ANALOG_FREETIME = "data/analog/month/data_month_zeitschrift_burdaStyle.csv"

const SOURCE_ANALOG = "https://www.ivw.eu/aw/print/qa/titel/"
const SOURCE_DIGITAL = "Informationsgemeinschaft zur Feststellung der Verbreitung von Werbeträgern e.V. (IVW)"

const PATH_DIGITAL_SPORT = "data/digital/format/digital_bergsteiger.CSV"
const PATH_DIGITAL_NEWS = "data/digital/format/digital_welt.CSV"
const PATH_DIGITAL_HEALTH = "data/digital/format/digital_apothekenUmschau.CSV"
const PATH_DIGITAL_FREETIME = "data/digital/format/digital_burdaStyle.CSV"


var radius = [
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
]

