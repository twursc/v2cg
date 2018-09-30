
function _parseJson(jsoncontent) {
    if(jsoncontent.length == 0) {
        jsoncontent = "{}";
    }
    try {
        content = JSON.parse(jsoncontent);
        console.log(content);
    } catch (e) {
        alert(e);
        console.error(e);
    }
    if(typeof content["inbound"] != "undefined") {
        if(typeof content["inbound"].tag == "undefined") {
            content["inbound"].tag = "default";
        }
        if (typeof content["inboundDetour"] == "undefined") {
            content["inboundDetour"] = [content["inbound"]];
        } else {
            content["inboundDetour"].push(content["inbound"]);
        }
    }
    if(typeof content["outbound"] != "undefined") {
        if(typeof content["outbound"].tag == "undefined") {
            content["outbound"].tag = "default";
        }
        if (typeof content["outboundDetour"] == "undefined") {
            content["outboundDetour"] = [content["outbound"]];
        } else {
            content["outboundDetour"].push(content["outbound"]);
        }
    }
    console.log("Inbound", content.inbound);
}

function onContentModified() {
    $('textarea.jsonContent').val(JSON.stringify(content, null, 4)).change();
    alert(i18N[using_language]["Configuration updated."]);
}
