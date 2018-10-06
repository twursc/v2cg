
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