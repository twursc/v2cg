
function _protoDetailsCommit(page) {
    let detourIndex = -1;
    let detourDetails = {};
    let tagname = $('div#' + page + '-config #'+page+'Tag').val();
    let listenAddr = $('div#' + page + '-config #'+page+'-listenAddr').val();
    let listenPort = $('div#' + page + '-config #'+page+'-listenPort').val();
    let sendThrough = $('div#' + page + '-config #'+page+'-sendThrough').val();
    let outboundProxy = $('div#' + page + '-config #'+page+'-outboundProxy').val();
    let muxConcurrency = $('div#' + page + '-config #'+page+'-mux').val();
    let protoname = $('div#' + page + '-config #'+page+'-protocol').val();
    let protodetails = {};
    let sniffingEnabled = false; //TODO: inbound/outbound Sniffing support
    let protodetails_form = $('form').serializeArray();

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

        if(page == "inbound") {
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
        }
        if(page == "outbound") {
            detourDetails = {
                "tag": tagname,
                "protocol": protoname,
                "streamSettings": {},
                "settings": protodetails,
                "mux": { "enabled": false }
            };

            if(sendThrough.length == 0) {
                detourDetails['sendThrough'] = sendThrough;
            }
            if(!isNaN(parseInt(muxConcurrency))) {
                if(parseInt(muxConcurrency) >= 1 && parseInt(muxConcurrency) <= 1024) {
                    detourDetails["mux"]["enabled"] = true;
                    detourDetails["mux"]["concurrency"] = parseInt(muxConcurrency);
                }
            }
            if(typeof outboundProxy == "string") {
                if(outboundProxy.length > 0) {
                    detourDetails["proxySettings"] = [];
                    detourDetails["proxySettings"]["tag"] = outboundProxy;
                }
            }
        }

        console.log("Saving "+page+" (tag: '"+tagname+"')", detourDetails);

        if (detourIndex == -1) {
            content[page + "Detour"].push(detourDetails)
        } else {
            content[page + "Detour"][detourIndex] = detourDetails;
        }

        _globalCommit();
    }, 75);
}