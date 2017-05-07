//// Foldaway Forest //// 0.0.* //// May 2017 //// goo.gl/x7TRpd ///////////////

!function (ROOT) { 'use strict'

//// Initialise the namespace, if it doesn’t already exist.
const FOLDF = ROOT.FOLDF = ROOT.FOLDF || {}

FOLDF.VERSION  = '0.0.8'
FOLDF.NAME     = 'Foldaway Forest'
FOLDF.HOMEPAGE = 'http://foldawayforest.loop.coop/'

FOLDF.apps     = []

//// Adds an instance of the app to the `apps` array.
FOLDF.init = (config) => {
    console.log(`${FOLDF.NAME} ${FOLDF.VERSION}`)

    //// Ensure all components have loaded.
    if (! FOLDF.Dev)            throw Error('Class `Dev` not found')
    if (! FOLDF.Scene)          throw Error('Class `Scene` not found')
    if (! FOLDF.Shape)          throw Error('Class `Shape` not found')
    if (! FOLDF.Sheet)          throw Error('Class `Sheet` not found')
    if (! window.$)             throw Error('jQuery ($) not found')
    if (! window.THREE)         throw Error('THREE not found')
    if (! window.THREEx)        throw Error('THREEx not found')
    if (! THREE.OrbitControls)  throw Error('OrbitControls not found')

    //// Enable developer-mode, the first time `init()` is called.
    if (! FOLDF.dev) FOLDF.dev = new FOLDF.Dev({ keypress:'§' }, this)

    //// Create an App instance.
    const appId = FOLDF.apps.length
    FOLDF.apps[appId] = new FOLDF.App(config, appId)
    return FOLDF.apps[appId]


}


//// `App`
FOLDF.App = class {

    constructor (config, id) {

        //// Record configuration.
        for (let key in config) this[key] = config[key]

        //// Record this App instance’s ID.
        this.id = id

        //// Containers for Sheets and Shapes.
        this.sheets = []
        this.shapes = []

        //// Initialise the 3D scene.
        this.scene = new FOLDF.Scene(config, this)

        //// Create the Sheet instances - these will create the Shape instances.
        for (let sheetId=0; sheetId<(config.sheetTally||1); sheetId++) {
            const sheetId = this.sheets.length
            this.sheets[sheetId] = new FOLDF.Sheet(config, sheetId, this)
        }
    }

}




//// PRIVATE FUNCTIONS


////
function NOOP () {}


}( 'object' == typeof global ? global : this ) // `window` in a browser
