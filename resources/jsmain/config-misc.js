
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