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
        if ( /\?dev|\?.*&dev/.test(location.search) ) $('body').addClass('dev')

        //// Listen for the developer-mode toggler keypress.
        $(window).on('keypress', e => {
            if (e.originalEvent && this.keypressCode === e.originalEvent.charCode) {
                e.preventDefault()
                e.stopPropagation()
                $('body').toggleClass('dev')
            }
        })

        //// Display the current app version.
        $('#dev-version').text(FOLDF.VERSION)

    }

}


}( 'object' == typeof global ? global : this ) // `window` in a browser
