

function _showconn(page, tagname) {

    Object.keys(content[page + "Detour"]).forEach(function (v) {
        v = content[page + "Detour"][v];
        if (v.tag == tagname) {
            if (typeof v['listen'] == "undefined") {
                v['listen'] = "0.0.0.0";
            }
            $('div#' + page + '-config').attr("data-" + page + "tag", tagname);
            $('div#' + page + '-config #inboundTag').val(tagname).change();
            $('div#' + page + '-config #listenAddr').val(v['listen']);
            $('div#' + page + '-config #listenPort').val(v['port']);
            $('div#' + page + '-config #protocol').val("null").val(v['protocol']).change();
        }
    });
}

function _showproto(page, protoname, tagname) {

    var container = $('div#' + page + '-config div.panel-body.protodetails');
    if(protoname.length != 0 && protoname != "null") {
        var tmpl = $('div.proto_tmpl_container > .proto_tmpl_' + page + '#' + protoname);
        if (tmpl.length == 1) {
            container.html(tmpl.html());
            Object.keys(content[page+"Detour"]).forEach(function(v) {
                v = content[page+"Detour"][v];
                //console.log(v);
                if(v.tag == tagname && v.protocol == protoname) {
                    if(typeof v.settings != "undefined") {
                        _protoDetailsDisplay(page, protoname, v.settings);
                    }
                }
            });
        } else {
            container.html(i18N[clientLang]["Unknown Protocol."]);
        }
    } else {
        container.html(i18N[clientLang]["Please select a protocol."]);
    }
}

function _formReset(page) {
    document.forms[page+'-config-form'].reset();
    $('form#'+page+'-config-form select#protocol').val("null").change();
    //setTimeout(function() { document.forms[page + '-config-form'].reset(); }, 10);
}