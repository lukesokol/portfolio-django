$(document).ready(function() {
    jQuerySetup();
    menuButton();
});
function jQuerySetup(){
    jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();
};

function menuButton(){
    const menuButton = document.getElementById("menu-button");
    const navList = document.getElementById("nav-list");

    menuButton.addEventListener("click", () => {
        const currentState = menuButton.getAttribute("data-state");

        if (!currentState || currentState === "closed") {
            menuButton.setAttribute("data-state", "opened");
            menuButton.setAttribute("aria-expanded", "true");
            navList.setAttribute("aria-expanded", "true");
        } else {
            menuButton.setAttribute("data-state", "closed");
            menuButton.setAttribute("aria-expanded", "false");
            navList.setAttribute("aria-expanded", "false");
        }
    });
};