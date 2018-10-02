
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