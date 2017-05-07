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

        this.createMesh(this.coords.basic, 100, 100)
        this.mesh.rotation.x = Math.PI / 2
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

    }

    createMesh (coords, width, height) {

        //// Convert each coord-pair to a two-value point.
        const points = []
        for (let i=0,coord; i<coords.length; i+=2) {
            points.push(
                new THREE.Vector2(
                      coords[i]   / width - 0.5 // center the origin
                  , - coords[i+1] / width + 1   // reverse the Y-direction
                )
            )
        }

        //// Extrude the shape and create the Mesh.
        this.mesh = new THREE.Mesh(
            new THREE.ExtrudeGeometry( //@TODO use cached Geometry, if available
                new THREE.Shape(points)
              , {
                    amount          : 0.02
                  , steps           : 1
                  , material        : 0
                  , extrudeMaterial : 1
                  , bevelEnabled    : false
                  , bevelThickness  : 0.1
                  , bevelSize       : 0.2
                  , bevelSegments   : 1
                }
            )
          , new THREE.MultiMaterial([
               this.material // face material
             , this.material // edge material
            ])
        )

    }

}

FOLDF.Shape.prototype.material = new THREE.MeshPhongMaterial({
    color:     0x999999
  , wireframe: false
})


FOLDF.Triangle = class extends FOLDF.Shape {

    constructor (config, id, sheet) {
        super(config, id, sheet)
    }

}


FOLDF.EquilateralTriangle = class extends FOLDF.Triangle {

    constructor (config, id, sheet) {
        super(config, id, sheet)
    }

}
FOLDF.EquilateralTriangle.prototype.coords = {
    basic: [ 0,100,  50,13.396,  100,100 ]
  , dev:   [ 93.977,90, 50,13.83, 6.023,90, 10,90, 10,99.566, 90,99.566, 90,90 ]
}




}( 'object' == typeof global ? global : this ) // `window` in a browser
