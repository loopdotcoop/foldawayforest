//// Foldaway Forest //// 0.0.* //// May 2017 //// goo.gl/x7TRpd ///////////////

!function (ROOT) { 'use strict'

//// Initialise the namespace, if it doesn’t already exist.
const FOLDF = ROOT.FOLDF = ROOT.FOLDF || {}


FOLDF.Scene = class {

    constructor (config, app) {

        //// Record configuration.
        for (let key in config) this[key] = config[key]

        //// Record a reference to this Scene’s parent App.
        this.app = app

        //// Create the THREE.js scene and camera.
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 0.5, 1000)
        this.camera.position.set(0, 0.7, 2)

        //// Create the renderer, and a <CANVAS> element to display it.
        this.renderer = new THREE.WebGLRenderer({ antialias:true })
        this.renderer.setSize(innerWidth, innerHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        document.body.appendChild(this.renderer.domElement)

        //// Add an ambient light.
        this.ambientLight = new THREE.AmbientLight(0xFFCC99, 0.5)
        this.scene.add(this.ambientLight)

        //// Add a spotlight.
        this.light_1 = new THREE.SpotLight(0xFFFFFF, 1, 40, Math.PI/3, 0.5)
        this.light_1.castShadow = true
        this.light_1.position.set(0,3,0)
        this.light_1.lookAt( new THREE.Vector3(0,0,0) )
        this.light_1.shadow.camera.near = 0.5
        this.light_1.shadow.mapSize.width = 2048
        this.light_1.shadow.mapSize.height = 2048
        this.scene.add(this.light_1)

        //// Add the floor.
        this.floor = new THREE.Mesh(
            new THREE.BoxGeometry(10,0.1,10)
          , new THREE.MeshPhongMaterial({ color:0x80FF80 })
        );
        this.floor.position.set(0, -0.7, 0)
        this.floor.rotation.set(0, 0.3, -0.02)
        this.floor.castShadow = true
        this.floor.receiveShadow = true
        this.scene.add(this.floor)

        //// Add a rotating box.
        this.box = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1)
          , new THREE.MeshPhongMaterial({ color:0xFFFFFF })
        );
        this.box.position.set(0, 0, -2)
        this.box.castShadow = true
        this.box.receiveShadow = true
        this.scene.add(this.box)

        //// Resize the canvas when the window resizes.
        THREEx.WindowResize(this.renderer, this.camera)

        //// Create mouse controls (rotate, pan and zoom).
        this.controls = new THREE.OrbitControls(this.camera)

        //// Begin rendering the scene.
        this.render()
    }


    render () {
        requestAnimationFrame( () => this.render() )
        if (FOLDF.dev.enabled) FOLDF.dev.stats.begin()

        this.box.rotation.y += 0.01
        this.renderer.render(this.scene, this.camera)

        if (FOLDF.dev.enabled) {
            FOLDF.dev.stats.end()
            FOLDF.dev.rendererStats.update(this.renderer)
        }
    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
