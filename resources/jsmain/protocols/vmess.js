function _vmessAddUser() {
    var defaultAlterID = $("div#inbound-config .protodetails input#vmess_default_alterid").val();
    var defaultLevel = $("div#inbound-config .protodetails input#vmess_default_level").val();
    if (isNaN(parseInt(defaultAlterID))) { defaultAlterID = 32; }
    if (isNaN(parseInt(defaultLevel))) { defaultLevel = 0; }
    var count = $(".protodetails table#vmess_users tbody .vmess_client").length;
    var tmpl = "<tr class=\"vmess_client\">" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Email"] + "\" type=\"text\" name=\"vmessclient_email_" + count + "\"></td>\n" +
        "    <td class=\"input-group\">" +
        "            <input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Client UUID"] + "\" type=\"text\" name=\"vmessclient_uuid_" + count + "\" style=\"font-family: Consolas\">\n" +
        "            <div class=\"input-group-addon btn btn-sm btn-secondary\" onclick=\"_vmessGenerateUUID(this.parentNode.children[0])\" style=\"font-size: 85%;\">" + i18N[using_language]["Generate"] + "</div>\n" +
        "    </td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Level"] + "\" type=\"number\" name=\"vmessclient_level_" + count + "\" value=\"" + defaultLevel + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["AlterID"] + "\" type=\"number\" name=\"vmessclient_alterid_" + count + "\" value=\"" + defaultAlterID + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"_vmessRemoveUser(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#vmess_users tbody").append(tmpl);
    return count;
}

function _vmessGetUsers(form) {
    console.log("vmessGetUsers: ", form);
    var vmessClients = [];
    var formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        var formKey = Object.keys(form)[i];
        var formVal = form[formKey];
        if (formKey.substr(0, 17) == "vmessclient_uuid_") {
            var lf = formKey.split('_');
            if (typeof form["vmessclient_email_" + lf[2]] != undefined &&
                typeof form["vmessclient_level_" + lf[2]] != undefined &&
                typeof form["vmessclient_alterid_" + lf[2]] != undefined) {
                var vEmail = form["vmessclient_email_" + lf[2]];
                var vLevel = form["vmessclient_level_" + lf[2]];
                var vAlterID = form["vmessclient_alterid_" + lf[2]];
                if (vEmail.length > 0 && formVal.length > 0 && !isNaN(parseInt(vLevel)) && !isNaN(parseInt(vAlterID))) {
                    vmessClients.push({
                        "email": vEmail,
                        "id": formVal,
                        "level": vLevel,
                        "alterId": vAlterID
                    });
                }
            }
        }
    }
    return vmessClients;
}

function _vmessRemoveUser(obj) {
    var boxes = obj.parentNode.parentNode.children;
    Object.keys(boxes).forEach(function (k) {
        boxes[k].children[0].disabled = true;
        boxes[k].children[0].value = "";
    });
    $(boxes[1].children[1]).attr("disabled", "disabled");
    obj.disabled = true;
}

function _vmessGenerateUUID(object) {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    //console.log(uuid);
    object.value = s.join('');

}
