$('body').append('<script src="./resources/jsmain/protocols/mtproto.js"></script>')
    .append('<script src="./resources/jsmain/protocols/http.js"></script>')
    .append('<script src="./resources/jsmain/protocols/shadowsocks.js"></script>');

function _protoDetailsDisplay(page, protoname, details) {
    //console.log("Protocol:",protoname,details);
    switch(protoname) {
        case "http": {

            $(".protodetails table#httpauth_users tbody").html("");
            Object.keys(details["accounts"]).forEach(function(k) {
                var info = details["accounts"][k];
                var newrow = httpAuth_addUser();
                $(".protodetails table#httpauth_users tbody tr.http_authuser_item input[name=http_authuser_"+newrow+"]").val(info["user"]);
                $(".protodetails table#httpauth_users tbody tr.http_authuser_item input[name=http_authpass_"+newrow+"]").val(info["pass"]);
            });
            $('div#'+page+'-config .protodetails #http_timeout').val(parseInt(details["timeout"]));
            $('div#'+page+'-config .protodetails #http_userlevel').val(parseInt(details["userLevel"]));
            $('div#'+page+'-config .protodetails #http_allowtransport')[0].checked = details["allowTransport"];
            break;
        }

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
        case "shadowsocks": {
            var shadowsocks_applied_protocol = details["network"].toLowerCase().split(',');

            $('div#'+page+'-config .protodetails #shadowsocks_email').val(details["email"]);
            $('div#'+page+'-config .protodetails #shadowsocks_crypto').val(details["method"]).change();
            $('div#'+page+'-config .protodetails #shadowsocks_password').val(details["password"]);
            $('div#'+page+'-config .protodetails #shadowsocks_userlevel').val(parseInt(details["userLevel"]));
            $('div#'+page+'-config .protodetails #shadowsocks_enable_ota')[0].checked = details["ota"];
            if(shadowsocks_applied_protocol.indexOf('tcp') != "-1") {
                $('div#' + page + '-config .protodetails #shadowsocks_network_tcp')[0].checked = true;
            } else {
                $('div#' + page + '-config .protodetails #shadowsocks_network_tcp')[0].checked = false;
            }
            if(shadowsocks_applied_protocol.indexOf('udp') != "-1") {
                $('div#' + page + '-config .protodetails #shadowsocks_network_udp')[0].checked = true;
            } else {
                $('div#' + page + '-config .protodetails #shadowsocks_network_udp')[0].checked = false;
            }
        }
    }
}

function _protoDetailsParse(page, protoname, form) {
    console.log("_protoDetailsParse: ", page, protoname, form);
    switch(protoname) {
        case "http": {
            var httpauthAccounts = [];
            Object.keys(form).forEach(function(k) {
                if(k.substr(0,14) == "http_authpass_") {
                    var lf = k.split('_');
                    if(typeof form["http_authuser_"+lf[2]] != undefined) {
                        if(form["http_authuser_"+lf[2]].length > 0 && form[k] > 0) {
                            httpauthAccounts.push({
                                "user": form["http_authuser_"+lf[2]],
                                "pass": form[k]
                            });
                        }
                    }
                }
            });
            console.log("httpauthAccounts:", httpauthAccounts);
            return {
                "accounts": httpauthAccounts,
                "timeout": parseInt(form["http_timeout"]),
                "allowTransport": $("div#" + page + "-config #http_allowtransport")[0].checked,
                "userLevel": parseInt(form["http_userlevel"])
            }
        }

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
                "address": form["dokodemo_destaddr"],
                "port": form["dokodemo_destport"],
                "followRedirect": $("div#"+page+"-config #dokodemo_followredir")[0].checked,
                "network": protocol_types.join(','),
                "timeout": parseInt(form["dokodemo_timeout"]),
                "userLevel": parseInt(form["dokodemo_userlevel"])
            }
        }

        case "shadowsocks": {
            var protocol_types = [];
            if($("div#"+page+"-config #shadowsocks_network_tcp")[0].checked) { protocol_types.push("tcp"); }
            if($("div#"+page+"-config #shadowsocks_network_udp")[0].checked) { protocol_types.push("udp"); }
            return {
                "email": form["shadowsocks_email"],
                "method": form["shadowsocks_crypto"],
                "password": form["shadowsocks_password"],
                "network": protocol_types.join(','),
                "ota": $("div#"+page+"-config #shadowsocks_enable_ota")[0].checked,
                "userLevel": parseInt(form["shadowsocks_userlevel"])
            }
        }
    }
}
