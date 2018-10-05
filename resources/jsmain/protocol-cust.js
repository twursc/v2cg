$('body').append('<script src="./resources/jsmain/protocols/mtproto.js"></script>')
    .append('<script src="./resources/jsmain/protocols/http.js"></script>')
    .append('<script src="./resources/jsmain/protocols/shadowsocks.js"></script>')
    .append('<script src="./resources/jsmain/protocols/vmess.js"></script>');
//TODO: Change to $.getScript()

function _protoDetailsDisplay(page, protoname, details) {
    console.log(page,"Protocol:",protoname,details);
    switch(protoname) {
        case "vmess": {
            if(page=="inbound") {
                $(".protodetails table#vmess_users tbody").html("");
                Object.keys(details["clients"]).forEach(function (k) {
                    let info = details["clients"][k];
                    let newrow = _vmessAddUser();
                    $(".protodetails table#vmess_users tbody tr.vmess_client input[name=vmessclient_email_" + newrow + "]").val(info["email"]);
                    $(".protodetails table#vmess_users tbody tr.vmess_client input[name=vmessclient_uuid_" + newrow + "]").val(info["id"]);
                    $(".protodetails table#vmess_users tbody tr.vmess_client input[name=vmessclient_level_" + newrow + "]").val(info["level"]);
                    $(".protodetails table#vmess_users tbody tr.vmess_client input[name=vmessclient_alterid_" + newrow + "]").val(info["alterId"]);
                });
                $('div#' + page + '-config .protodetails #vmess_default_level').val(parseInt(details["default"]["level"]));
                $('div#' + page + '-config .protodetails #vmess_default_alterid').val(parseInt(details["default"]["alterId"]));
                $('div#' + page + '-config .protodetails #vmess_disableInsecureEncryption')[0].checked = details["disableInsecureEncryption"];
                if (typeof details["detour"] != "undefined") {
                    if (details["detour"]["to"].length > 0) {
                        $('div#' + page + '-config .protodetails #vmess_detourto').val(details["detour"]["to"]);
                    }
                }
            }
            if(page=="outbound"){
                $(".protodetails table#vmess_vnexts tbody").html("");
                Object.keys(details["vnext"]).forEach(function(k) {
                    let info = details["vnext"][k];
                    let newrow = _vmessAddVNext();
                    $(".protodetails table#vmess_vnexts tbody tr.vnext_item input[name=vnext_addr_"+newrow+"]").val(info["address"]);
                    $(".protodetails table#vmess_vnexts tbody tr.vnext_item input[name=vnext_port_"+newrow+"]").val(info["port"]);
                    $(".protodetails table#vmess_vnexts tbody tr.vnext_item input[name=vnext_uuid_" + newrow + "]").val(info["users"][0]["id"]);
                    $(".protodetails table#vmess_vnexts tbody tr.vnext_item input[name=vnext_alterid_" + newrow + "]").val(info["users"][0]["alterId"]);
                    $(".protodetails table#vmess_vnexts tbody tr.vnext_item input[name=vnext_level_" + newrow + "]").val(info["users"][0]["level"]);
                });
            }
            break;
        }

        case "socks": {
            if(page=="inbound") {
                $(".protodetails table#socksauth_users tbody").html("");
                Object.keys(details["accounts"]).forEach(function (k) {
                    let info = details["accounts"][k];
                    let newrow = socksAuth_addUser();
                    $(".protodetails table#socksauth_users tbody tr.socks_authuser_item input[name=socks_authuser_" + newrow + "]").val(info["user"]);
                    $(".protodetails table#socksauth_users tbody tr.socks_authuser_item input[name=socks_authpass_" + newrow + "]").val(info["pass"]);
                });
                $('div#' + page + '-config .protodetails #socks_timeout').val(parseInt(details["timeout"]));
                $('div#' + page + '-config .protodetails #socks_userlevel').val(parseInt(details["userLevel"]));
                $('div#' + page + '-config .protodetails #socks_udpforwarding')[0].checked = details["udp"];
                $('div#' + page + '-config .protodetails #socks_localaddr').val(details["ip"]);
                $('div#' + page + '-config .protodetails #socks_enableauth')[0].checked = (details["auth"] == "password");
            }
            if(page == "outbound") {
                $(".protodetails table#socks_remotes tbody").html("");
                Object.keys(details["servers"]).forEach(function(k) {
                    let info = details["servers"][k];
                    let newrow = socksClient_addRemote();
                    $(".protodetails table#socks_remotes tbody tr.socks_remote_item input[name=socksRemote_addr_"+newrow+"]").val(info["address"]);
                    $(".protodetails table#socks_remotes tbody tr.socks_remote_item input[name=socksRemote_port_"+newrow+"]").val(info["port"]);
                    if(typeof info["user"] != "undefined" && typeof info["pass"] != "undefined" && typeof info["level"] != "undefined") {
                        $(".protodetails table#socks_remotes tbody tr.socks_remote_item input[name=socksRemote_username_" + newrow + "]").val(info["user"]);
                        $(".protodetails table#socks_remotes tbody tr.socks_remote_item input[name=socksRemote_password_" + newrow + "]").val(info["pass"]);
                        $(".protodetails table#socks_remotes tbody tr.socks_remote_item input[name=socksRemote_level_" + newrow + "]").val(info["level"]);
                    }
                });
            }
            break;
        }

        case "http": {
            $(".protodetails table#httpauth_users tbody").html("");
            Object.keys(details["accounts"]).forEach(function(k) {
                let info = details["accounts"][k];
                let newrow = httpAuth_addUser();
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
            let dokodemo_applied_protocol = details["network"].toLowerCase().split(',');

            $('div#'+page+'-config .protodetails #dokodemo_destaddr').val(details["address"]);
            $('div#'+page+'-config .protodetails #dokodemo_destport').val(parseInt(details["port"]));
            $('div#'+page+'-config .protodetails #dokodemo_timeout').val(parseInt(details["timeout"]));
            $('div#'+page+'-config .protodetails #dokodemo_userlevel').val(parseInt(details["userLevel"]));
            $('div#'+page+'-config .protodetails #dokodemo_followredir')[0].checked = details["followRedirect"];
            $('div#' + page + '-config .protodetails #dokodemo_network_tcp')[0].checked = (dokodemo_applied_protocol.indexOf('tcp') != "-1");
            $('div#' + page + '-config .protodetails #dokodemo_network_udp')[0].checked = (dokodemo_applied_protocol.indexOf('udp') != "-1");
            break;
        }

        case "shadowsocks": {
            if(page=="inbound") {
                let shadowsocks_applied_protocol = ["tcp"];
                if (typeof details["network"] != "undefined") {
                    shadowsocks_applied_protocol = details["network"].toLowerCase().split(',');
                }
                if (typeof details["udp"] != "undefined") {
                    shadowsocks_applied_protocol.push("udp");
                }

                $('div#' + page + '-config .protodetails #shadowsocks_email').val(details["email"]);
                $('div#' + page + '-config .protodetails #shadowsocks_crypto').val(details["method"]).change();
                $('div#' + page + '-config .protodetails #shadowsocks_password').val(details["password"]);
                $('div#' + page + '-config .protodetails #shadowsocks_userlevel').val(parseInt(details["userLevel"]));
                $('div#' + page + '-config .protodetails #shadowsocks_enable_ota')[0].checked = details["ota"];
                $('div#' + page + '-config .protodetails #shadowsocks_network_tcp')[0].checked = (shadowsocks_applied_protocol.indexOf('tcp') != "-1");
                $('div#' + page + '-config .protodetails #shadowsocks_network_udp')[0].checked = (shadowsocks_applied_protocol.indexOf('udp') != "-1");
            }
            if(page == "outbound") {
                $(".protodetails table#shadowsocks_remotes tbody").html("");
                Object.keys(details["servers"]).forEach(function(k) {
                    let info = details["servers"][k];
                    let newrow = shadowsocks_addRemote();
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item input[name=ssremote_email_"+newrow+"]").val(info["email"]);
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item input[name=ssremote_addr_"+newrow+"]").val(info["address"]);
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item input[name=ssremote_port_"+newrow+"]").val(info["port"]);
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item input[name=ssremote_password_"+newrow+"]").val(info["password"]);
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item input[name=ssremote_crypto_"+newrow+"]").val(info["method"]);
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item input[name=ssremote_level_"+newrow+"]").val(info["level"]);
                    $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item  input#ssremote_ota_" + newrow)[0].checked = info["ota"];
                    if(info["ota"]) { $(".protodetails table#shadowsocks_remotes tbody tr.ss_remote_item  input#ssremote_ota_" + newrow).parent().addClass("active"); }
                });
            }
            break;
        }

        case "blackhole": {
            if(typeof details["response"] != "undefined") {
                if(typeof details["response"]["type"] == "string") {
                    if(details["response"]["type"] == "http") {
                        $('div#' + page + '-config .protodetails #blackhole_return403')[0].checked = true;
                    }
                }
            }
            break;
        }

        case "freedom": {
            $('div#' + page + '-config .protodetails #freedom_domainStrategy').val(details["domainStrategy"]);
            $('div#' + page + '-config .protodetails #freedom_timeout').val(details["timeout"]);
            $('div#' + page + '-config .protodetails #freedom_redirect').val(details["redirect"]);
            $('div#' + page + '-config .protodetails #freedom_userlevel').val(details["userLevel"]);
            break;
        }
    }
}

function _protoDetailsParse(page, protoname, form) {
    console.log("_protoDetailsParse: ", page, protoname, form);
    switch (protoname) {
        case "vmess": {
            if (page == "inbound") {
                let retval = {
                    "clients": _vmessGetUsers(form),
                    "default": {
                        "level": form["vmess_default_level"],
                        "alterId": form["vmess_default_alterid"]
                    },
                    "disableInsecureEncryption": $("div#" + page + "-config #vmess_disableInsecureEncryption")[0].checked
                };
                if (form["vmess_detourto"].length > 0) {
                    retval["detour"] = {
                        "to": form["vmess_detourto"]
                    }
                }
                return retval;
            }
            if (page == "outbound") {
                let vnexts = _vmessParseVNext(form);
                return {"vnext": vnexts}
            }
            return {}
        }

        case "socks": {
            if (page == "inbound") {
                let authtype = "noauth";
                let socksAccounts = socksAuth_parseUsers(form);
                /*Object.keys(form).forEach(function(k) {
                    if(k.substr(0,15) == "socks_authpass_") {
                        let lf = k.split('_');
                        if(typeof form["socks_authuser_"+lf[2]] != undefined) {
                            if(form["socks_authuser_"+lf[2]].length > 0 && form[k] > 0) {
                                socksAccounts.push({
                                    "user": form["socks_authuser_"+lf[2]],
                                    "pass": form[k]
                                });
                            }
                        }
                    } //TODO: Bugfix - synchronized process
                });*/
                console.log("socksAccounts:", socksAccounts);
                if ($("div#" + page + "-config #socks_enableauth")[0].checked) {
                    authtype = "password";
                }
                return {
                    "auth": authtype,
                    "accounts": socksAccounts,
                    "timeout": parseInt(form["socks_timeout"]),
                    "udp": $("div#" + page + "-config #socks_udpforwarding")[0].checked,
                    "ip": form["socks_localaddr"],
                    "userLevel": parseInt(form["socks_userlevel"])
                }
            }
            if (page == "outbound") {
                let socksRemotes = socksClient_parseRemotes(form);
                return {"servers": socksRemotes}
            }
            return {}
        }

        case "http": {
            let httpauthAccounts = httpAuth_parseUsers(form);
            /*Object.keys(form).forEach(function(k) {
                if(k.substr(0,14) == "http_authpass_") {
                    let lf = k.split('_');
                    if(typeof form["http_authuser_"+lf[2]] != undefined) {
                        if(form["http_authuser_"+lf[2]].length > 0 && form[k] > 0) {
                            httpauthAccounts.push({
                                "user": form["http_authuser_"+lf[2]],
                                "pass": form[k]
                            });
                        }
                    }
                } //TODO: Bugfix - synchronized process
            });*/
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
            let protocol_types = [];
            if ($("div#" + page + "-config #dokodemo_network_tcp")[0].checked) {
                protocol_types.push("tcp");
            }
            if ($("div#" + page + "-config #dokodemo_network_udp")[0].checked) {
                protocol_types.push("udp");
            }
            return {
                "address": form["dokodemo_destaddr"],
                "port": form["dokodemo_destport"],
                "followRedirect": $("div#" + page + "-config #dokodemo_followredir")[0].checked,
                "network": protocol_types.join(','),
                "timeout": parseInt(form["dokodemo_timeout"]),
                "userLevel": parseInt(form["dokodemo_userlevel"])
            }
        }

        case "shadowsocks": {
            if (page == "inbound") {
                let protocol_types = [];
                if ($("div#" + page + "-config #shadowsocks_network_tcp")[0].checked) {
                    protocol_types.push("tcp");
                }
                if ($("div#" + page + "-config #shadowsocks_network_udp")[0].checked) {
                    protocol_types.push("udp");
                }
                return {
                    "email": form["shadowsocks_email"],
                    "method": form["shadowsocks_crypto"],
                    "password": form["shadowsocks_password"],
                    "network": protocol_types.join(','),
                    "ota": $("div#" + page + "-config #shadowsocks_enable_ota")[0].checked,
                    "userLevel": parseInt(form["shadowsocks_userlevel"])
                }
            }
            if (page == "outbound") {
                let ssRemotes = shadowsocks_getRemotes(form, page);
                return {"servers": ssRemotes}
            }
            return {}
        }

        case "blackhole": {
            if (typeof form["blackhole_return403"] != "undefined") {
                if (form["blackhole_return403"] == "on") {
                    return {"response": {"type": "http"}}
                }
            }
            return {"response": {"type": "none"}}
        }

        case "freedom": {
            let retval = {
                "domainStrategy": form["freedom_domainStrategy"],
                "userLevel": 0 //Hard-coded userlevel
            };
            if (!isNaN(parseInt(form["freedom_timeout"]))) {
                retval["timeout"] = parseInt(form["freedom_timeout"]);
            } else {
                retval["timeout"] = 300;
            }
            if (form["freedom_redirect"].length > 0) {
                retval["redirect"] = form["freedom_redirect"];
            }
            return retval;
        }

    }
}