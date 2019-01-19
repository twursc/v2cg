
function _loggingDisplay() {
    if(typeof content["log"] == "object") {
        $('select#logging_logLevel').val(content["log"]["loglevel"]);
        $('input#logging_accesslog').val(content["log"]["access"]).attr("placeholder", i18N[using_language]["Unset - Print to standard output"]);
        $('input#logging_errorlog').val(content["log"]["error"]).attr("placeholder", i18N[using_language]["Unset - Print to standard output"]);
    }
}

function _loggingCommit() {
    content["log"]["loglevel"] = $('select#logging_logLevel').val();
    if($('input#logging_accesslog').val().length == 0) {
        delete content["log"]["access"];
    } else {
        content["log"]["access"] = $('input#logging_accesslog').val()
    }
    if($('input#logging_errorlog').val().length == 0) {
        delete content["log"]["error"];
    } else {
        content["log"]["error"] = $('input#logging_errorlog').val()
    }
    _globalCommit();
}

function _apiDisplay() {
    if (typeof content["api"] != "undefined") {
        if(typeof content["api"]["tag"] != "undefined") {
            $("input#api_conntag").val(content["api"]["tag"]);
            if(typeof content["api"]["services"] == "object") {
                $("input#api_service_handler")[0].checked = (content["api"]["services"].indexOf("HandlerService") != -1);
                $("input#api_service_logger")[0].checked = (content["api"]["services"].indexOf("LoggerService") != -1);
                $("input#api_service_stats")[0].checked = (content["api"]["services"].indexOf("StatsService") != -1);
            }
        }
    }
    $("input#enable_flowstats")[0].checked = (typeof content["stats"] == "object");
}

function _apiCommit() {
    let tagName = $("input#api_conntag").val();
    let services = [];
    if(tagName.length > 0) {
        if($("input#api_service_handler")[0].checked) { services.push("HandlerService") }
        if($("input#api_service_logger")[0].checked) { services.push("LoggerService") }
        if($("input#api_service_stats")[0].checked) { services.push("StatsService") }
    }
    content["api"] = {
        "tag": tagName,
        "services": services
    };

    if($("input#enable_flowstats")[0].checked) {
        content["stats"] = [];
    } else {
        delete content["stats"];
    }
    _globalCommit();
}


function _policyDisplay() {
    $("table#policy-levels tbody").html("");
    if(typeof content["policy"]["levels"] == "object") {
        Object.keys(content["policy"]["levels"]).forEach(function (level) {
            let row = _policyAddLevel();
            let levelInfo = content["policy"]["levels"][level];
            console.log('form#local-policy-form input[name=\"policy_level_' + row + '\"]');
            $('form#local-policy-form input[name=\"policy_level_' + row + '\"]').val(parseInt(level));
            $('form#local-policy-form input[name=\"policy_handshake_' + row + '\"]').val(parseInt(levelInfo["handshake"]));
            $('form#local-policy-form input[name=\"policy_connIdle_' + row + '\"]').val(parseInt(levelInfo["connIdle"]));
            $('form#local-policy-form input[name=\"policy_uplinkOnly_' + row + '\"]').val(parseInt(levelInfo["uplinkOnly"]));
            $('form#local-policy-form input[name=\"policy_downlinkOnly_' + row + '\"]').val(parseInt(levelInfo["downlinkOnly"]));
            $('form#local-policy-form input[name=\"policy_bufferSize_' + row + '\"]').val(parseInt(levelInfo["bufferSize"]));
            if (levelInfo["statsUserUplink"]) {
                $('input#policy_statsUplink_0').parent().addClass('active');
                $('form#local-policy-form input#policy_statsUplink_' + row)[0].checked = true;
            } else {
                $('input#policy_statsUplink_0').parent().removeClass('active');
                $('form#local-policy-form input#policy_statsUplink_' + row)[0].checked = false;
            }
            if (levelInfo["statsUserDownlink"]) {
                $('input#policy_statsDownlink_0').parent().addClass('active');
                $('form#local-policy-form input#policy_statsDownlink_' + row)[0].checked = true;
            } else {
                $('input#policy_statsDownlink_0').parent().removeClass('active');
                $('form#local-policy-form input#policy_statsDownlink_' + row)[0].checked = false;
            }
        });
    }
    if(typeof content["policy"]["system"] == "object") {
        $("form#local-policy-form #policy_statsAll_inboudUplink")[0].checked = content["policy"]["system"]["statsInboundUplink"];
        $("form#local-policy-form #policy_statsAll_inboudDownlink")[0].checked = content["policy"]["system"]["statsInboundDownlink"];
    }
}

function _policyAddLevel() {
    let count = $("table#policy-levels tbody .policy-level").length;
    let tmpl = "<tr class=\"policy-level\">" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Level"] + "\" type=\"number\" name=\"policy_level_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"handshake\" type=\"number\" name=\"policy_handshake_" + count + "\" value=\"4\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"connIdle\" type=\"number\" name=\"policy_connIdle_" + count + "\" value=\"300\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"uplinkOnly\" type=\"number\" name=\"policy_uplinkOnly_" + count + "\" value=\"2\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"downlinkOnly\" type=\"number\" name=\"policy_downlinkOnly_" + count + "\" value=\"5\"></td>\n" +
        "    <td><div class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn btn-default btn-sm\"><input type=\"checkbox\" id=\"policy_statsUplink_" + count + "\" name=\"policy_statsUplink_" + count + "\">StatsUplink</label></div></td>\n" +
        "    <td><div class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn btn-default btn-sm\"><input type=\"checkbox\" id=\"policy_statsDownlink_" + count + "\" name=\"policy_statsUplink_" + count + "\">StatsDownlink</label></div></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"bufferSize\" type=\"number\" name=\"policy_bufferSize_" + count + "\" value=\"10240\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"_policyRemoveLevel(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $("table#policy-levels tbody").append(tmpl);
    return count;
}

function _policyRemoveLevel(obj) {
    let boxes = obj.parentNode.parentNode.children;
    Object.keys(boxes).forEach(function (k) {
        boxes[k].children[0].disabled = true;
        boxes[k].children[0].value = "";
    });
    $(boxes[5].children[0].children[0]).attr("disabled", "disabled");
    $(boxes[6].children[0].children[0]).attr("disabled", "disabled");
    obj.disabled = true;
}

function _policyParseLevels() {
    let form = _serializeForm($('form#local-policy-form'));
    let levelSettings = {};
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        console.log(formKey);
        if (formKey != undefined && formKey.substr(0, 13) == "policy_level_") {
            let lf = formKey.split('_');
            let pHandshake = form["policy_handshake_" + lf[2]];
            let pConnIdle = form["policy_connIdle_" + lf[2]];
            let pUplinkVal = form["policy_uplinkOnly_" + lf[2]];
            let pDownlinkVal = form["policy_downlinkOnly_" + lf[2]];
            let pBuffer = form["policy_bufferSize_" + lf[2]];
            levelSettings[formVal.toString()] = {
                "handshake": pHandshake,
                "connIdle": pConnIdle,
                "uplinkOnly": pUplinkVal,
                "downlinkOnly": pDownlinkVal,
                "statsUserUplink": $("form#local-policy-form #policy_statsUplink_" + lf[2])[0].checked,
                "statsUserDownlink": $("form#local-policy-form #policy_statsDownlink_" + lf[2])[0].checked,
                "bufferSize": pBuffer
            }
        }
    }
    return levelSettings;
}

function _policyCommit() {
    content["policy"] = {
        "levels": _policyParseLevels(),
        "system": {
            "statsInboundUplink": $("form#local-policy-form #policy_statsAll_inboudUplink")[0].checked,
            "statsInboundDownlink": $("form#local-policy-form #policy_statsAll_inboudDownlink")[0].checked
        }
    };
    onContentModified();
}


function _dnsAddServer() {
    let count = $("table#dns-servers tbody .dns-item").length;
    let tmpl = "<tr class=\"dns-item\"><td>\n" +
        "    <label for=\"dns_addr_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Server Address"] + "</label><div class=\"col-sm-5\"><input type=\"text\" class=\"form-control\" id=\"dns_addr_" + count + "\" name=\"dns_addr_" + count + "\" placeholder=\"" + i18N[using_language]["Server Address"] + "\"></div>\n" +
        "    <label for=\"dns_port_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["UDP Port"] + "</label><div class=\"col-sm-2\"><input type=\"number\" class=\"form-control\" id=\"dns_port_" + count + "\" name=\"dns_port_" + count + "\" value=\"53\" placeholder=\"" + i18N[using_language]["UDP Port"] + "\"></div>" +
        "    <div class=\"col-sm-1\"><button class=\"btn btn-default btn-sm\" onclick=\"_dnsRemoveServer(this);\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></div>\n" +
        "    <label for=\"dns_assocdomains_" + count + "\" class=\"col-sm-2 control-label\" style=\"margin-top: 16px;\">" + i18N[using_language]["Priority Domains"] + "</label>\n" +
        "    <div class=\"col-sm-10 dns-textarea\"><textarea class=\"form-control\" id=\"dns_assocdomains_" + count + "\" name=\"dns_assocdomains_" + count + "\" placeholder=\"" + i18N[using_language]["Domains to query from this server, split by return or double space. Match subdomain by \"domain:abc.com\""] + "\" style=\"resize: vertical; height: 128px;\"></textarea></div>\n" +
        "</td></tr>";
    $("table#dns-servers tbody").append(tmpl);
    return count;
}

function _dnsRemoveServer(obj) {
    let boxes = obj.parentNode.parentNode.children;
    Object.keys(boxes).forEach(function (k) {
        if(boxes[k].children.length != 0) {
            boxes[k].children[0].disabled = true;
            boxes[k].children[0].value = "";
        }
    });
    obj.disabled = true;
}

function _dnsServersCommit() {
    if(typeof content["dns"] != "object") {
        content["dns"] = {};
    }
    content["dns"]["servers"] = _dnsGetServerList();
    onContentModified();
}

function _dnsGetServerList() {
    let form = _serializeForm($('form#dns-config-form'));
    let dnsServers = [];
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        console.log(formKey);
        if (formKey != undefined && formKey.substr(0, 9) == "dns_addr_") {
            let lf = formKey.split('_');
            let dnsPort = form["dns_port_" + lf[2]];
            let ascDomains = form["dns_assocdomains_" + lf[2]];
            let currentDns = { address: formVal, port: 53, domains: [] };
            if(!isNaN(parseInt(dnsPort))) { currentDns.port = parseInt(dnsPort) }
            if(ascDomains.length > 1) {
                ascDomains = ascDomains.replace(/\n/g, "  ");
                ascDomains = ascDomains.replace(/\r\n/g, "  ");
                currentDns.domains = ascDomains.split("  ");
            }
            dnsServers.push(currentDns);
        }
    }
    return dnsServers;
}

function _dnsServersDisplay() {
    $("table#dns-servers tbody").html("");
    if(typeof content["dns"]["servers"] == "object") {
        Object.keys(content["dns"]["servers"]).forEach(function (k) {
            let row = _dnsAddServer();
            let info = {};
            if (typeof content["dns"]["servers"][k] == "object") {
                info = content["dns"]["servers"][k];
            } else {
                info = {address: content["dns"]["servers"][k], port: 53, domains: []}
            }
            $('form#dns-config-form input[name=\"dns_addr_' + row + '\"]').val(info["address"]);
            $('form#dns-config-form input[name=\"dns_port_' + row + '\"]').val(parseInt(info["port"]));
            $('form#dns-config-form textarea[name=\"dns_assocdomains_' + row + '\"]').val(info["domains"].join("\n"));
        });
    }
}

function _dnsAddBinding() {
    let count = $("table#dns-static-bindings tbody .dns-binding").length;
    let tmpl = "<tr class=\"dns-binding\">" +
        "    <td style=\"width: 65%\"><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Domain Name"] + "\" type=\"text\" name=\"dnsbinding_domain_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Address"] + "\" type=\"text\" name=\"dnsbinding_addr_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"_dnsRemoveBinding(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $("table#dns-static-bindings tbody").append(tmpl);
    return count;
}

function _dnsRemoveBinding(obj) {
    let boxes = obj.parentNode.parentNode.children;
    Object.keys(boxes).forEach(function (k) {
        boxes[k].children[0].disabled = true;
        boxes[k].children[0].value = "";
    });
    obj.disabled = true;
}

function _dnsGetBindingList() {
    let form = _serializeForm($('form#dns-config-form'));
    let dnsBinding = {};
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        if (formKey != undefined && formKey.substr(0, 18) == "dnsbinding_domain_") {
            let lf = formKey.split('_');
            let bindAddr = form["dnsbinding_addr_" + lf[2]];
            if(formVal.length >= 2 && bindAddr.length >= 2) {
                dnsBinding[formVal] = bindAddr;
            }
        }
    }
    return dnsBinding;
}

function _dnsBindingCommit() {
    if(typeof content["dns"] != "object") {
        content["dns"] = {};
    }
    content["dns"]["hosts"] = _dnsGetBindingList();
    _globalCommit();
}

function _dnsBindingDisplay() {
    $("table#dns-static-bindings tbody").html("");
    if(typeof content["dns"]["hosts"] == "object") {
        Object.keys(content["dns"]["hosts"]).forEach(function (domain) {
            let row = _dnsAddBinding();
            let addr = content["dns"]["hosts"][domain];
            $('form#dns-config-form input[name=\"dnsbinding_domain_' + row + '\"]').val(domain);
            $('form#dns-config-form input[name=\"dnsbinding_addr_' + row + '\"]').val(addr);
        });
    }
}
