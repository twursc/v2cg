$('body').append('<script src="./resources/jsmain/mtproto.js"></script>');

function _protoDetailsDisplay(page, protoname, details) {
    //console.log("Protocol:",protoname,details);
    switch(protoname) {
        case "mtproto": {
            $('div#'+page+'-config .protodetails #mtproto_email').val(details["users"][0]["email"]);
            $('div#'+page+'-config .protodetails #mtproto_userlevel').val(parseInt(details["users"][0]["level"]));
            $('div#'+page+'-config .protodetails #mtproto_secret').val(details["users"][0]["secret"]);
            break;
        }
        case "dokodemo-door": {
            if(parseInt(details["timeout"]) == 0) { details["timeout"] = 300; }
            var dokodemo_applied_protocol = details["network"].toLowerCase().split(',');

            $('div#'+page+'-config .protodetails #dokodemo_destaddr').val(details["address"]);
            $('div#'+page+'-config .protodetails #dokodemo_destport').val(parseInt(details["port"]));
            $('div#'+page+'-config .protodetails #dokodemo_timeout').val(parseInt(details["timeout"]));
            $('div#'+page+'-config .protodetails #dokodemo_userlevel').val(parseInt(details["userLevel"]));
            $('div#'+page+'-config .protodetails #dokodemo_followredir')[0].checked = details["followRedirect"];
            if(dokodemo_applied_protocol.indexOf('tcp') != "-1") {
                $('div#' + page + '-config .protodetails #dokodemo_network_tcp')[0].checked = true;
            } else {
                $('div#' + page + '-config .protodetails #dokodemo_network_tcp')[0].checked = false;
            }
            if(dokodemo_applied_protocol.indexOf('udp') != "-1") {
                $('div#' + page + '-config .protodetails #dokodemo_network_udp')[0].checked = true;
            } else {
                $('div#' + page + '-config .protodetails #dokodemo_network_udp')[0].checked = false;
            }
            break;
        }
    }
}

function _protoDetailsParse(page, protoname, form) {
    console.log("_protoDetailsParse: ", page, protoname, form);
    switch(protoname) {
        case "mtproto": {
            return {
                "users": [
                    {
                        "email": form["mtproto_email"],
                        "level": parseInt(form["mtproto_userlevel"]),
                        "secret": form["mtproto_secret"]
                    }
                ]
            }
        }

        case "dokodemo-door": {
            var protocol_types = [];
            if($("div#"+page+"-config #dokodemo_network_tcp")[0].checked) { protocol_types.push("tcp"); }
            if($("div#"+page+"-config #dokodemo_network_udp")[0].checked) { protocol_types.push("udp"); }
            return {
                address: form["dokodemo_destaddr"],
                port: form["dokodemo_destport"],
                followRedirect: $("div#"+page+"-config #dokodemo_followredir")[0].checked,
                network: protocol_types.join(','),
                timeout: parseInt(form["dokodemo_timeout"]),
                userLevel: parseInt(form["dokodemo_userlevel"])
            }
        }
    }
}
