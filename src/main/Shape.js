//// Foldaway Forest //// 0.0.* //// May 2017 //// goo.gl/x7TRpd ///////////////

!function (ROOT) { 'use strict'

//// Initialise the namespace, if it doesn’t already exist.
const FOLDF = ROOT.FOLDF = ROOT.FOLDF || {}


FOLDF.Shape = class {

    constructor (config, id, sheet) {

        //// Record configuration.
        for (let key in config) this[key] = config[key]

        //// Record this Shape’s ID, and a reference to its parent Sheet.
        this.id    = id
        this.sheet = sheet

    }

}


FOLDF.Triangle = class extends FOLDF.Shape {

    constructor (config, id, sheet) {
        super(config, id, sheet)
    }

}


FOLDF.EquilateralTriangle = class extends FOLDF.Triangle {

    constructor (config, id, sheet) {
        super(config, id, sheet)

        this.points = {
            basic: [ 0,100,  50,13.396,  100,100 ]
          , dev:   [ 93.977,90, 50,13.83, 6.023,90, 10,90, 10,99.566, 90,99.566, 90,90 ]
        }

        // sheet.scene.add()
    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
