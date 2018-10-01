
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
    if (typeof content["inbound"] != "undefined") {
        if (typeof content["inbound"].tag == "undefined") {
            content["inbound"].tag = "default";
        }
        if (typeof content["inboundDetour"] == "undefined") {
            content["inboundDetour"] = [content["inbound"]];
        } else {
            var detourIndex = parseInt(_getDetourIndex(content["inboundDetour"], "default"));
            if (detourIndex == -1) {
                content["inboundDetour"].push(content["inbound"]);
            } else {
                content["inboundDetour"][detourIndex] = content["inbound"];
            }
        }
    }
    if (typeof content["outbound"] != "undefined") {
        if (typeof content["outbound"].tag == "undefined") {
            content["outbound"].tag = "default";
        }
        if (typeof content["outboundDetour"] == "undefined") {
            content["outboundDetour"] = [content["outbound"]];
        } else {
            var detourIndex = parseInt(_getDetourIndex(content["outboundDetour"], "default"));
            if (detourIndex == -1) {
                content["outboundDetour"].push(content["outbound"]);
            } else {
                content["outboundDetour"][detourIndex] = content["outbound"];
            }
        }
    }
}

function _copyJsonContent() {
    $('textarea.jsonContent').focus().select();
    document.execCommand("copy");
    $('textarea.jsonContent').blur();
}

function onContentModified() {
    var defaultInbound = _getDetourIndex(content["inboundDetour"], "default");
    if(defaultInbound == -1) {
        if(typeof content["inboundDetour"][0] != "undefined") {
            content["inbound"] = content["inboundDetour"][0];
        }
    } else {
        content["inbound"] = content["inboundDetour"][defaultInbound];
        content["inboundDetour"].splice(defaultInbound, 1);
    }

    var defaultOutbound = _getDetourIndex(content["outboundDetour"], "default");
    if(defaultOutbound == -1) {
        if(typeof content["inboundDetour"][0] != "undefined") {
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
    var tagindex = -1;
    Object.keys(detours).forEach(function(v) {
        if (detours[v].tag == tagname) {
            tagindex = v;
        }
    });
    return tagindex;
}