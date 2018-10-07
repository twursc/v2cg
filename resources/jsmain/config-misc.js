
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
        content["stats"] = {};
    } else {
        delete content["stats"];
    }
    _globalCommit();
}


function _policyDisplay() {
    $("table#policy-levels tbody").html("");
    Object.keys(content["policy"]["levels"]).forEach(function(level) {
        let row = _policyAddLevel();
        let levelInfo = content["policy"]["levels"][level];
        console.log('form#local-policy-form input[name=\"policy_level_' + row + '\"]');
        $('form#local-policy-form input[name=\"policy_level_' + row + '\"]').val(parseInt(level));
        $('form#local-policy-form input[name=\"policy_handshake_' + row + '\"]').val(parseInt(levelInfo["handshake"]));
        $('form#local-policy-form input[name=\"policy_connIdle_' + row + '\"]').val(parseInt(levelInfo["connIdle"]));
        $('form#local-policy-form input[name=\"policy_uplinkOnly_' + row + '\"]').val(parseInt(levelInfo["uplinkOnly"]));
        $('form#local-policy-form input[name=\"policy_downlinkOnly_' + row + '\"]').val(parseInt(levelInfo["downlinkOnly"]));
        $('form#local-policy-form input[name=\"policy_bufferSize_' + row + '\"]').val(parseInt(levelInfo["bufferSize"]));
        if(levelInfo["statsUserUplink"]) {
            $('input#policy_statsUplink_0').parent().addClass('active');
            $('form#local-policy-form input#policy_statsUplink_' + row)[0].checked = true;
        } else {
            $('input#policy_statsUplink_0').parent().removeClass('active');
            $('form#local-policy-form input#policy_statsUplink_' + row)[0].checked = false;
        }
        if(levelInfo["statsUserDownlink"]) {
            $('input#policy_statsDownlink_0').parent().addClass('active');
            $('form#local-policy-form input#policy_statsDownlink_' + row)[0].checked = true;
        } else {
            $('input#policy_statsDownlink_0').parent().removeClass('active');
            $('form#local-policy-form input#policy_statsDownlink_' + row)[0].checked = false;
        }
    });
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

