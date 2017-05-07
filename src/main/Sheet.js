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
        for (let x=-3; x<=3; x++) {
            for (let z=-5; z<3; z++) {
                config.x = x
                config.z = z
                const shapeId = this.app.shapes.length
                const shape = new FOLDF.EquilateralTriangle(config, shapeId, this)
                this.app.shapes[shapeId] = shape
                this.shapes[shapeId] = shape
            }
        }

        //// Deal with developer-mode being enabled or disabled.
        $(window).on('FOLDF-toggle-dev', e => {
            for (let i=0,shape; shape=this.shapes[i++];) {
                shape.updateGeometry(
                    FOLDF.dev.enabled ? shape.coords.dev : shape.coords.basic
                  , 100, 100
                )
            }
        })

    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
