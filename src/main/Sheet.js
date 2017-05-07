//// Foldaway Forest //// 0.0.* //// May 2017 //// goo.gl/x7TRpd ///////////////

!function (ROOT) { 'use strict'

//// Initialise the namespace, if it doesn’t already exist.
const FOLDF = ROOT.FOLDF = ROOT.FOLDF || {}


FOLDF.Sheet = class {

    constructor (config, id, app) {

        //// Record configuration.
        for (let key in config) this[key] = config[key]

        //// Record this Shape instance’s ID, and a reference to its parent App.
        this.id  = id
        this.app = app

        //// Containers for Shapes.
        this.shapes = []


        //// Create the Shape instances. References are kept in the App’s
        //// `shapes` array (for re-using THREE resources after a Sheet is
        //// deleted), and also in this Shape’s local `shapes` array.
        for (let i=0; i<(config.shapeTally||24); i++) {
            const shapeId = this.app.shapes.length
            const shape = new FOLDF.EquilateralTriangle(config, shapeId, this)
            this.app.shapes[shapeId] = shape
            this.shapes[shapeId] = shape
        }
    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
