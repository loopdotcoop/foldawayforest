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
                const shapeId = this.app.shapes.length
                const shape = new FOLDF.EquilateralTriangle(config, shapeId, this)
                this.app.shapes[shapeId] = shape
                this.shapes[shapeId] = shape
                this.app.scene.scene.add(shape.mesh)
                if (z % 2) {
                    shape.mesh.position.x = x
                    shape.mesh.position.z = z * (0.433)
                } else {
                    shape.mesh.rotation.z = Math.PI
                    shape.mesh.position.x = x + 0.5
                    shape.mesh.position.z = (z + 1) * (0.433)
                }
            }
        }
    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
