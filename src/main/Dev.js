//// Foldaway Forest //// 0.0.* //// May 2017 //// goo.gl/x7TRpd ///////////////

!function (ROOT) { 'use strict'

//// Initialise the namespace, if it doesn’t already exist.
const FOLDF = ROOT.FOLDF = ROOT.FOLDF || {}


FOLDF.Dev = class {

    constructor (config, app) {

        //// Record configuration and apply defaults.
        for (let key in config) this[key] = config[key]
        this.keypress = this.keypress || '§'
        this.keypressCode = this.keypress.charCodeAt(0)

        //// Record a reference to the parent App.
        this.app = app

        //// Enable developer-mode if the URL query-string contains ‘dev’.
        if ( /\?dev|\?.*&dev/.test(location.search) ) {
            this.enabled = 1
            $('body').addClass('dev')
        } else {
            this.enabled = 0
        }

        //// Listen for the developer-mode toggler keypress.
        $(window).on('keypress', e => {
            if (e.originalEvent && this.keypressCode === e.originalEvent.charCode) {
                e.preventDefault()
                e.stopPropagation()
                this.enabled ^= 1 // toggle, http://stackoverflow.com/a/16784323
                $('body').toggleClass('dev')
                $(window).trigger('FOLDF-toggle-dev')
            }
        })

        //// Display the current app version.
        $('#dev-version').text(FOLDF.VERSION)

        //// Initialise the stats panels.
        this.stats = new Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        this.stats.dom.id = 'dev-stats'
        $(this.stats.dom).addClass('dev-show')
        document.body.appendChild(this.stats.dom);

        this.rendererStats = new THREEx.RendererStats()
        this.rendererStats.domElement.id = 'dev-rendererstats'
        $(this.rendererStats.domElement).addClass('dev-show')
        document.body.appendChild(this.rendererStats.domElement)

    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
