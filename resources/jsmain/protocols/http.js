
function httpAuth_addUser() {
    let count = $(".protodetails table#httpauth_users tbody .http_authuser_item").length;
    let tmpl = "<tr class=\"http_authuser_item\"><td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Username"] + "\" type=\"text\" name=\"http_authuser_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Password"] + "\" type=\"password\" name=\"http_authpass_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"httpAuth_removeUser(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#httpauth_users tbody").append(tmpl);
    return count;
}

function httpAuth_removeUser(obj) {
    let theUser = obj.parentNode.parentNode.children[0].children[0];
    let thePass = obj.parentNode.parentNode.children[1].children[0];
    theUser.disabled = true;
    theUser.value = "";
    thePass.disabled = true;
    thePass.value = "";
    obj.disabled = true;
}

function httpAuth_parseUsers(form) {
    let httpauthAccounts = [];
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        if (formKey.substr(0, 14) == "http_authpass_") {
            let lf = formKey.split('_');
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
    let count = $(".protodetails table#socksauth_users tbody .socks_authuser_item").length;
    let tmpl = "<tr class=\"socks_authuser_item\"><td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Username"] + "\" type=\"text\" name=\"socks_authuser_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Password"] + "\" type=\"password\" name=\"socks_authpass_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"socksAuth_removeUser(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#socksauth_users tbody").append(tmpl);
    return count;
}

function socksAuth_removeUser(obj) {
    let theUser = obj.parentNode.parentNode.children[0].children[0];
    let thePass = obj.parentNode.parentNode.children[1].children[0];
    theUser.disabled = true;
    theUser.value = "";
    thePass.disabled = true;
    thePass.value = "";
    obj.disabled = true;
}

function socksAuth_parseUsers(form) {
    let socksAccounts = [];
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        if (formKey.substr(0, 15) == "socks_authpass_") {
            let lf = formKey.split('_');
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

function socksClient_addRemote() {
    let count = $(".protodetails table#socks_remotes tbody .socks_remote_item").length;
    let tmpl = "<tr class=\"socks_remote_item\">" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Server"] +   "\" type=\"text\" name=\"socksRemote_addr_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Port"] +     "\" type=\"number\" name=\"socksRemote_port_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Username"] + "\" type=\"text\" name=\"socksRemote_username_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Password"] + "\" type=\"password\" name=\"socksRemote_password_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Level"] +  "\" type=\"number\" name=\"socksRemote_level_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"socksClient_removeRemote(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#socks_remotes tbody").append(tmpl);
    return count;
}

function socksClient_removeRemote(obj) {
    let boxes = obj.parentNode.parentNode.children;
    Object.keys(boxes).forEach(function (k) {
        boxes[k].children[0].disabled = true;
        boxes[k].children[0].value = "";
    });
    obj.disabled = true;
}

function socksClient_parseRemotes(form) {
    console.log("socksGetRemotes: ", form);
    let socksRemotes = [];
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        if (formKey.substr(0, 17) == "socksRemote_addr_") {
            let lf = formKey.split('_');
            if (typeof form["socksRemote_port_" + lf[2]] != undefined &&
                typeof form["socksRemote_username_" + lf[2]] != undefined &&
                typeof form["socksRemote_password_" + lf[2]] != undefined &&
                typeof form["socksRemote_level_" + lf[2]] != undefined) {
                let vUser = form["socksRemote_username_" + lf[2]];
                let vLevel = form["socksRemote_level_" + lf[2]];
                let vPwd =   form["socksRemote_password_" + lf[2]];
                let vPort = form["socksRemote_port_" + lf[2]];
                if (formVal.length > 0 && !isNaN(parseInt(vLevel)) && !isNaN(parseInt(vPort))) {
                    let theServer = {
                        "address": formVal,
                        "port": parseInt(vPort)
                    };
                    if(vPwd.length > 0 && vUser.length > 0) {
                        theServer.users = [{
                            "user": vUser,
                            "pass": vPwd,
                            "level": parseInt(vLevel)
                        }]
                    }
                    socksRemotes.push(theServer);
                }
            }
        }
    }
    return socksRemotes;
}