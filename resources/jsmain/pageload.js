

function _showconn(page, tagname) {

    Object.keys(content[page + "s"]).forEach(function (v) {
        v = content[page + "s"][v];
        if (v.tag == tagname) {
            if(page == "inbound") {
                if (typeof v['listen'] == "undefined") {
                    v['listen'] = "0.0.0.0";
                }
                $('div#' + page + '-config').attr("data-" + page + "tag", tagname);
                $('div#' + page + '-config #' + page + 'Tag').val(tagname).change();
                $('div#' + page + '-config #' + page + '-listenAddr').val(v['listen']);
                $('div#' + page + '-config #' + page + '-listenPort').val(v['port']);
                $('div#' + page + '-config #' + page + '-protocol').val("null").val(v['protocol']).change();
            }
            if(page == "outbound") {
                $('div#' + page + '-config').attr("data-" + page + "tag", tagname);
                $('div#' + page + '-config #' + page + 'Tag').val(tagname).change();
                $('div#' + page + '-config #' + page + '-sendThrough').val(v['sendThrough']);
                $('div#' + page + '-config #' + page + '-protocol').val("null").val(v['protocol']).change();
                if(typeof v['mux'] == "object") {
                    if(v['mux']['enabled'] == true) {
                        if(typeof v['mux']['concurrency'] == "number") {
                            $('div#' + page + '-config #' + page + '-mux').val(v['mux']['concurrency']);
                        } else {
                            $('div#' + page + '-config #' + page + '-mux').val(8);
                        }
                    } else {
                        $('div#' + page + '-config #' + page + '-mux').val(0);
                    }
                } else {
                    $('div#' + page + '-config #' + page + '-mux').val(0);
                }
            }
        }
    });
}

function _showproto(page, protoname, tagname) {

    let container = $('div#' + page + '-config div.panel-body.protodetails');
    if(protoname.length != 0 && protoname != "null") {
        let tmpl = $('div.proto_tmpl_container > .proto_tmpl_' + page + '#' + page.substr(0,1) + "-" + protoname);
        console.log('div.proto_tmpl_container > .proto_tmpl_' + page + '#' + page.substr(0,1) + "-" + protoname);
        if (tmpl.length == 1) {
            container.html(tmpl.html());
            Object.keys(content[page+"s"]).forEach(function(v) {
                v = content[page+"s"][v];
                //console.log(v);
                if(v.tag == tagname && v.protocol == protoname) {
                    if(typeof v.settings != "undefined") {
                        _protoDetailsDisplay(page, protoname, v.settings);
                    }
                }
            });
        } else {
            container.html(i18N[clientLang]["No configurable options."]);
        }
    } else {
        container.html(i18N[clientLang]["Please select a protocol."]);
    }
}

function _showtransport(page, transport, tagname) {
    //TODO: Show transport
}

function _formReset(page) {
    document.forms[page+'-config-form'].reset();
    $('form#'+page+'-config-form select#'+page+'-protocol').val("null").change();
    //setTimeout(function() { document.forms[page + '-config-form'].reset(); }, 10);
}