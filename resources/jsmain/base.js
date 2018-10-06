
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


    let pkeys = ["log", "inbound", "outbound", "routing", "transport", "policy"];
    for (var p = 0; p <= pkeys.length; p++) {
        if (typeof content[pkeys[p]] != "object") {
            content[pkeys[p]] = {};
        }
    }

    if (typeof content["inbound"] != "undefined") {
        if (typeof content["inbound"].tag == "undefined") {
            content["inbound"].tag = "default";
        } else {
            content["inbound"].default = true;
        }
        if (typeof content["inboundDetour"] == "undefined") {
            content["inboundDetour"] = [content["inbound"]];
        } else {
            let detourIndex = parseInt(_getDetourIndex(content["inboundDetour"], "default"));
            if (detourIndex == -1) {
                content["inboundDetour"].unshift(content["inbound"]);
            } else {
                content["inboundDetour"][detourIndex] = content["inbound"];
            }
        }
    }
    if (typeof content["outbound"] != "undefined") {
        if (typeof content["outbound"].tag == "undefined") {
            content["outbound"].tag = "default";
        } else {
            content["outbound"].default = true;
        }
        if (typeof content["outboundDetour"] == "undefined") {
            content["outboundDetour"] = [content["outbound"]];
        } else {
            let detourIndex = parseInt(_getDetourIndex(content["outboundDetour"], "default"));
            if (detourIndex == -1) {
                content["outboundDetour"].unshift(content["outbound"]);
            } else {
                content["outboundDetour"][detourIndex] = content["outbound"];
            }
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
    let defaultInbound = _getDetourIndex(content["inboundDetour"], "default");
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
    }

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
    Object.keys(content[page+"Detour"]).forEach(function (k) {
        if (content[page+"Detour"][k].tag == tagname) {
            console.log("Remove " + page + "Detour: [" + k + "]" + tagname);
            content[page+"Detour"].splice(k, 1);
            onContentModified();
        }
    });
}

function _setDefaultDetour(page, tagname) {
    let renameDefault = prompt(i18N[using_language]["Reset the tag of original default detour to: "]);
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
    }
}