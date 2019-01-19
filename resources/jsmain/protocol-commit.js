
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
    let streamSettings = $('div#' + page + '-config #'+page+'-transport').val();
    let protodetails = {};
    let sniffingEnabled = false; //TODO: inbound/outbound Sniffing support
    let protodetails_form = $('form').serializeArray();

    Object.keys(content[page + "s"]).forEach(function (v) {
        if (content[page + "s"][v].tag == tagname) {
            detourIndex = v
        }
    });

    Object.keys(protodetails_form).forEach(function (v) {
        protodetails[protodetails_form[v].name] = protodetails_form[v].value;
    });

    try {
        streamSettings = JSON.parse(streamSettings)
    } catch(err) {
        alert("StreamSettings field encountered error, falling back to original. \n " + err.description);
        console.warn("Recovering streamSettings from " + detourIndex, content[page+"s"][detourIndex]);
        streamSettings = content[page + "s"][detourIndex]["streamSettings"];
    }

    setTimeout(function () {
        protodetails = _protoDetailsParse(page, protoname, protodetails);

        if(page == "inbound") {
            detourDetails = {
                "tag": tagname,
                "listen": listenAddr,
                "port": parseInt(listenPort), //TODO: Port-range and multiport support
                "protocol": protoname,
                "settings": protodetails,
                "streamSettings": streamSettings,
                "sniffing": {
                    "enabled": false,
                    "destOverride": []
                },
                "allocate": {
                    "strategy": "always"
                }
            };
        }
        if(page == "outbound") {
            detourDetails = {
                "tag": tagname,
                "protocol": protoname,
                "streamSettings": streamSettings,
                "settings": protodetails,
                "mux": { "enabled": false }
            };

            if(sendThrough.length != 0 && sendThrough != "0.0.0.0") {
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
            content[page + "s"].push(detourDetails)
        } else {
            //fixme: remove the following determination while per-detour transport config finished.
            /*if(typeof content[page + "s"][detourIndex]["streamSettings"] == "object") {
                console.warn("Recovering streamSettings from " + detourIndex, content[page+"s"][detourIndex]);
                detourDetails["streamSettings"] = content[page + "s"][detourIndex]["streamSettings"];
            }*/
            content[page + "s"][detourIndex] = detourDetails;
        }

        _globalCommit();
    }, 75);
}