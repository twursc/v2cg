
function httpAuth_addUser() {
    var count = $(".protodetails table#httpauth_users tbody .http_authuser_item").length;
    var tmpl = "<tr class=\"http_authuser_item\"><td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Username"] + "\" type=\"text\" name=\"http_authuser_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Password"] + "\" type=\"password\" name=\"http_authpass_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"httpAuth_removeUser(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#httpauth_users tbody").append(tmpl);
    return count;
}

function httpAuth_removeUser(obj) {
    var theUser = obj.parentNode.parentNode.children[0].children[0];
    var thePass = obj.parentNode.parentNode.children[1].children[0];
    theUser.disabled = true;
    theUser.value = "";
    thePass.disabled = true;
    thePass.value = "";
    obj.disabled = true;
}

function httpAuth_parseUsers(form) {
    var httpauthAccounts = [];
    var formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        var formKey = Object.keys(form)[i];
        var formVal = form[formKey];
        if (formKey.substr(0, 14) == "http_authpass_") {
            var lf = formKey.split('_');
            if (typeof form["http_authuser_" + lf[2]] != undefined) {
                if (form["http_authuser_" + lf[2]].length > 0 && form[formKey].length > 0) {
                    httpauthAccounts.push({
                        "user": form["http_authuser_" + lf[2]],
                        "pass": form[formKey]
                    });
                }
            }
        }
    }
    return httpauthAccounts;
}

function socksAuth_addUser() {
    var count = $(".protodetails table#socksauth_users tbody .socks_authuser_item").length;
    var tmpl = "<tr class=\"socks_authuser_item\"><td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Username"] + "\" type=\"text\" name=\"socks_authuser_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Password"] + "\" type=\"password\" name=\"socks_authpass_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"socksAuth_removeUser(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#socksauth_users tbody").append(tmpl);
    return count;
}

function socksAuth_removeUser(obj) {
    var theUser = obj.parentNode.parentNode.children[0].children[0];
    var thePass = obj.parentNode.parentNode.children[1].children[0];
    theUser.disabled = true;
    theUser.value = "";
    thePass.disabled = true;
    thePass.value = "";
    obj.disabled = true;
}

function socksAuth_parseUsers(form) {
    var socksAccounts = [];
    var formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        var formKey = Object.keys(form)[i];
        var formVal = form[formKey];
        if (formKey.substr(0, 15) == "socks_authpass_") {
            var lf = formKey.split('_');
            if (typeof form["socks_authuser_" + lf[2]] != undefined) {
                if (form["socks_authuser_" + lf[2]].length > 0 && form[formKey].length > 0) {
                    socksAccounts.push({
                        "user": form["socks_authuser_" + lf[2]],
                        "pass": form[formKey]
                    });
                }
            }
        }
    }
    return socksAccounts;
}