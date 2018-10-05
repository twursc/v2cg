
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

}

function _apiCommit() {

}