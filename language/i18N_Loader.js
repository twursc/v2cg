i18N = {};
using_language = $('html').attr('lang');

function _applyI18N() {
    if (typeof i18N[using_language] != "undefined") {
        $('*').each(function (v, k) {
            if (typeof i18N[using_language][k.innerHTML] == "string") {
                k.innerHTML = i18N[using_language][k.innerHTML];
            }
        });
    }
}