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

        //// Create the mesh.
        this.createMesh(
            0x999999
          , FOLDF.dev.enabled ? this.coords.dev : this.coords.basic
          , 100, 100
        )

        //// Set Mesh properties.
        this.setProperties()

        //// Add the new Mesh to the Scene.
        this.sheet.app.scene.scene.add(this.mesh)
    }

    setProperties () {
        this.mesh.rotation.x = Math.PI / 2
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true

        if (this.z % 2) {
            this.mesh.position.x = this.x
            this.mesh.position.z = this.z * (0.433)
        } else {
            this.mesh.rotation.z = Math.PI
            this.mesh.position.x = this.x + 0.5
            this.mesh.position.z = (this.z + 1) * (0.433)
        }
    }


    setMaterial (color) {
        let materialStr = color+''
        if (! (this.material = this.cache.materials[materialStr]) ) {
            this.material = this.cache.materials[materialStr] =
                FOLDF.Shape.prototype.material = new THREE.MeshPhongMaterial({
                    color:     color
                  , wireframe: false
                })
        }
    }


    setGeometry (coords, width, height) {
        let geometryStr = coords.join(',') // SHA-1 would be nicer :-)
        if (! (this.geometry = this.cache.geometries[geometryStr]) ) {

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

            //// Extrude and cache the Geometry.
            this.geometry = this.cache.geometries[geometryStr] =
                new THREE.ExtrudeGeometry(
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
        }
    }


    createMesh (color, coords, width, height) {

        //// Use cached Material, if available.
        this.setMaterial(color)

        //// Use cached Geometry, if available.
        this.setGeometry(coords, width, height)

        //// Create the Mesh.
        this.mesh = new THREE.Mesh(
            this.geometry
          , new THREE.MultiMaterial([
               this.material // face material
             , this.material // edge material
            ])
        )

    }


    updateGeometry (coords, width, height) {

        //// Use cached Geometry, if available.
        this.setGeometry(coords, width, height)

        //// Remove the Mesh from the Scene.
        this.sheet.app.scene.scene.remove(this.mesh) //@TODO dispose of Mesh?

        //// Recreate the Mesh.
        this.mesh = new THREE.Mesh(
            this.geometry
          , new THREE.MultiMaterial([
               this.material // face material
             , this.material // edge material
            ])
        )

        //// Set Mesh properties.
        this.setProperties()

        //// Restore the updated Mesh to the Scene.
        this.sheet.app.scene.scene.add(this.mesh)

    }


}

//// Initialise a cache with shared instance scope.
FOLDF.Shape.prototype.cache = {
    materials:  {}
  , geometries: {}
}


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
