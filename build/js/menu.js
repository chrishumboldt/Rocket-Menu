/*
Author: Chris Humboldt
*/
// Extend Rocket
Rocket.defaults.menu = {
    closeText: 'close',
    reveal: 'left',
    type: 'slide'
};
// Module
var RockMod_Menu;
(function (RockMod_Menu) {
    // Variables
    var _RD = Rocket.defaults.menu;
    var reveals = ['_r-left', '_r-right'];
    var types = ['_t-mini', '_t-slide'];
    // Functions
    var menu = {
        close: function (callback, overlayHide) {
            if (callback === void 0) { callback = null; }
            if (overlayHide === void 0) { overlayHide = true; }
            var openMenu = Rocket.dom.element('.rocket-menu._reveal');
            Rocket.classes.remove(Rocket.dom.html, 'rme-reveal');
            if (Rocket.exists(openMenu) && Rocket.is.element(openMenu)) {
                if (overlayHide) {
                    Rocket.overlay.hide();
                }
                ;
                Rocket.classes.remove(openMenu, '_reveal');
            }
            if (Rocket.is.function(callback)) {
                return callback();
            }
        },
        globalSetup: function () {
            Rocket.event.add(Rocket.dom.element('#rocket-overlay'), 'click', menu.close);
        },
        setup: function (options) {
            var thisMenu = Rocket.dom.element(options.target);
            var triggers = Rocket.dom.select(options.triggers);
            // Catch
            if (!Rocket.is.element(thisMenu) || triggers.length < 1 || types.indexOf("_t-" + options.type) < 0) {
                return false;
            }
            // Continue
            function menuShow(event) {
                if (event === void 0) { event = null; }
                if (event) {
                    event.preventDefault();
                }
                var openMenu = Rocket.dom.element('.rocket-menu._reveal');
                if (thisMenu !== openMenu) {
                    menu.close(function () {
                        Rocket.overlay.show();
                        Rocket.classes.add(Rocket.dom.html, 'rme-reveal');
                        Rocket.classes.add(thisMenu, '_reveal');
                    }, false);
                }
                else {
                    menu.close();
                }
            }
            Rocket.classes.remove(thisMenu, reveals.concat(types));
            switch (options.type) {
                case 'mini':
                    Rocket.classes.add(thisMenu, "rocket-menu _t-" + options.type);
                    // Close link
                    if (!Rocket.exists(thisMenu.querySelector('a.rme-close-link'))) {
                        var closeUL = document.createElement('ul');
                        var closeLI = document.createElement('li');
                        var closeLink = document.createElement('a');
                        Rocket.classes.add(closeUL, 'close-list');
                        Rocket.classes.add(closeLink, 'rme-close-link');
                        closeLink.href = '';
                        closeLink.innerHTML = options.closeText;
                        closeLI.appendChild(closeLink);
                        closeUL.appendChild(closeLI);
                        thisMenu.appendChild(closeUL);
                    }
                    break;
                case 'slide':
                    Rocket.classes.add(thisMenu, "rocket-menu _t-" + options.type + " _r-" + options.reveal);
                    // Close link
                    if (!Rocket.exists(thisMenu.querySelector('a.rme-close-link'))) {
                        var closeLink = document.createElement('a');
                        Rocket.classes.add(closeLink, 'rme-close-link');
                        closeLink.href = '';
                        closeLink.innerHTML = options.closeText;
                        thisMenu.appendChild(closeLink);
                    }
                    break;
            }
            // Menu links
            var menuLinks = thisMenu.querySelectorAll('a');
            for (var _i = 0, menuLinks_1 = menuLinks; _i < menuLinks_1.length; _i++) {
                var menuLink = menuLinks_1[_i];
                Rocket.event.add(menuLink, 'click', function (event) {
                    if (Rocket.has.class(event.currentTarget, 'rme-close-link')) {
                        event.preventDefault();
                    }
                    menu.close();
                });
            }
            for (var _a = 0, triggers_1 = triggers; _a < triggers_1.length; _a++) {
                var trigger = triggers_1[_a];
                Rocket.event.add(trigger, 'click', menuShow);
            }
            return {
                close: menu.close,
                menu: thisMenu,
                show: menuShow
            };
        }
    };
    // Initialiser
    function init(uOptions) {
        // Options
        if (!Rocket.is.object(uOptions)) {
            uOptions = {};
        }
        var options = {
            closeText: Rocket.helper.setDefault(uOptions.closeText, _RD.closeText),
            reveal: Rocket.helper.setDefault(uOptions.reveal, _RD.reveal),
            triggers: Rocket.helper.setDefault(uOptions.triggers, ''),
            target: Rocket.helper.setDefault(uOptions.target, ''),
            type: Rocket.helper.setDefault(uOptions.type, _RD.type)
        };
        return menu.setup(options);
    }
    RockMod_Menu.init = init;
    // Menu setup
    menu.globalSetup();
})(RockMod_Menu || (RockMod_Menu = {}));
// Bind to Rocket
Rocket.menu = RockMod_Menu.init;
