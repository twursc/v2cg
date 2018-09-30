
function _protoDetailsCommit(page) {
    var detourIndex = -1;
    var detourDetails = {};
    var tagname = $('div#' + page + '-config #inboundTag').val();
    var listenAddr = $('div#' + page + '-config #listenAddr').val();
    var listenPort = $('div#' + page + '-config #listenPort').val();
    var protoname = $('div#' + page + '-config #protocol').val();
    var protodetails = [];
    var sniffingEnabled = false; //TODO: inbound/outbound Sniffing support
    var protodetails_form = $('form').serializeArray();

    Object.keys(content[page + "Detour"]).forEach(function (v) {
        if (content[page + "Detour"][v].tag == tagname) {
            detourIndex = v
        }
    });

    Object.keys(protodetails_form).forEach(function (v) {
        protodetails[protodetails_form[v].name] = protodetails_form[v].value;
    });

    setTimeout(function () {
        protodetails = _protoDetailsParse(page, protoname, protodetails);

        detourDetails = {
            "tag": tagname,
            "listen": listenAddr,
            "port": parseInt(listenPort), //TODO: Port-range and multiport support
            "protocol": protoname,
            "settings": protodetails,
            "streamSettings": {},
            "sniffing": {
                "enabled": false,
                "destOverride": []
            }
        };

        console.log("Saving "+page+" (tag: '"+tagname+"')", detourDetails);

        if (detourIndex == -1) {
            content[page + "Detour"].push(detourDetails)
        } else {
            content[page + "Detour"][detourIndex] = detourDetails;
        }

        onContentModified();
    }, 75);
}