
jsonMode = "v4";

function _parseJson(jsoncontent) {

    if (jsoncontent.length == 0) {
        jsoncontent = "{}";
    }
    try {
        content = JSON.parse(jsoncontent);
        console.log(content);
    } catch (e) {
        alert(e);
        console.error(e);
    }


    let pkeys = ["inbounds", "outbounds", "log", "transport", "dns", "policy"];
    for (let p = 0; p < pkeys.length; p++) {
        if (typeof content[pkeys[p]] != "object") {
            if(p >= 2) {
                content[pkeys[p]] = {};
            } else {
                content[pkeys[p]] = [];
            }
        }
    }
    if(typeof content["routing"] != "object") {
        content["routing"] = {
            "domainStrategy": "AsIs",
            "rules": []
        }
    }

    if(typeof content["inbounds"][0] != "undefined") {
        if(typeof content["inbounds"][0]["tag"] != "string") {
            content["inbounds"][0]["tag"] = "default";
        }
    }
    if(typeof content["outbounds"][0] != "undefined") {
        if(typeof content["outbounds"][0]["tag"] != "string") {
            content["outbounds"][0]["tag"] = "default";
        }
    }

    _applyContents();
}

function _parsePageUI() {
    //$('ul.nav-tabs a.tabs-click:first').click();
    $.get("prototmpl.html").done(function(data) {
        $('div.proto_tmpl_container').html(data);
        _applyI18N();
        $('code#domainName').text(location.host);
        $('div.loading-overlay').css("opacity", 0);
        setTimeout(function() { $('div.loading-overlay').remove(); }, 300);
    }).error(function(data) {
        alert("Failed to load protocol templates, terminating...");
        document.clear();
    });

    Object.keys(document.forms).forEach(function(k) {
        document.forms[k].reset();
    });
    $("ul.nav.nav-tabs a.tabs-click").click(function() {
        this.blur();
    });
    document.body.onselectstart = document.body.ondragstart = function(e) {
        return false;
        /*if(e.srcElement.nodeName == "#text") {
            return false;
        } else {
            console.log("selectstart elem: " + e.srcElement);
        }*/
    }
}

function _copyJsonContent() {
    $('textarea.jsonContent').focus().select();
    document.execCommand("copy");
    $('textarea.jsonContent').blur();
}

function _jsonFormat() {
    let currentJson = $('textarea.jsonContent').val();
    try {
        currentJson = JSON.parse(currentJson);
        $('textarea.jsonContent').val(JSON.stringify(currentJson, null, 2)).change();
    } catch (e) {
        alert(e);
        console.error(e);
    }
}

function _globalCommit() {
    return onContentModified()
}

function _serializeForm(obj) {
    let form = obj.serializeArray();
    let formKeys = Object.keys(form);
    let formKv = {};
    for (var v = 0; v < formKeys.length; v++) {
        formKv[form[v].name] = form[v].value;
    }
    return formKv;
}

function onContentModified() {
    /*let defaultInbound = _getDetourIndex(content["inboundDetour"], "default");
    delete content["inboundDetour"][defaultInbound].default;
    if(defaultInbound == -1) {
        if(typeof content["inboundDetour"][0] != "undefined") {
            content["inbound"] = content["inboundDetour"][0];
        }
    } else {
        content["inbound"] = content["inboundDetour"][defaultInbound];
        content["inboundDetour"].splice(defaultInbound, 1);
    }

    let defaultOutbound = _getDetourIndex(content["outboundDetour"], "default");
    delete content["outboundDetour"][defaultOutbound].default;
    if(defaultOutbound == -1) {
        if(typeof content["outboundDetour"][0] != "undefined") {
            content["outbound"] = content["outboundDetour"][0];
        }
    } else {
        content["outbound"] = content["outboundDetour"][defaultOutbound];
        content["outboundDetour"].splice(defaultOutbound, 1);
    }*/

    $('textarea.jsonContent').val(JSON.stringify(content, null, 2)).change();
    alert(i18N[using_language]["Configuration updated."]);
    _parseJson($('textarea.jsonContent').val());
}

function _getDetourIndex(detours, tagname) {
    let tagindex = -1;
    Object.keys(detours).forEach(function(v) {
        if (detours[v].tag == tagname) {
            tagindex = v;
        } else {
            if(detours[v].default) {
                tagindex = v;
            }
        }
    });
    return tagindex;
}

function _removeDetour(page, tagname) {
    Object.keys(content[page+"s"]).forEach(function (k) {
        if (content[page+"s"][k].tag == tagname) {
            console.log("Remove " + page + ": [" + k + "]" + tagname);
            content[page+"s"].splice(k, 1);
            onContentModified();
        }
    });
}

function _setDefaultDetour(page, tagname) {
    /*let renameDefault = prompt(i18N[using_language]["Reset the tag of original default detour to: "]);
    if (renameDefault != null) {
        if (renameDefault.trim().length != 0) {
            let defaultDetour = _getDetourIndex(content[page + "Detour"], "default");
            content[page + "Detour"][defaultDetour].tag = renameDefault;
            delete content[page+"Detour"][defaultDetour].default;
            let targetDetour = _getDetourIndex(content[page + "Detour"], tagname);
            content[page + "Detour"][targetDetour].tag = "default";
            onContentModified();
        } else {
            alert(i18N[using_language]["Invalid tag supplied."]);
        }
    }*/
    let detourIndex = _getDetourIndex(content[page]+"s", tagname);
    let detourInfo = content[page][detourIndex];
    content[page].splice(detourIndex, 1);
    content[page].unshift(detourInfo);
}