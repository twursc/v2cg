
function onShadowsocksCryptoSelect(method) {
    let AeadCryptoes = ["chacha20-ietf-poly1305", "aes-128-gcm", "aes-256-gcm"];
    let otaCheckbox = $('#shadowsocks_enable_ota')[0];
    if(AeadCryptoes.indexOf(method) != -1) {
        otaCheckbox.checked = false;
        otaCheckbox.disabled = true;
    } else {
        otaCheckbox.disabled = false;
    }
}

function shadowsocks_addRemote() {
    let count = $(".protodetails table#shadowsocks_remotes tbody .ss_remote_item").length;
    let tmpl = "<tr class=\"ss_remote_item\">" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Server"] + "\" type=\"text\" name=\"ssremote_addr_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Port"] + "\" type=\"number\" name=\"ssremote_port_" + count + "\"></td>\n" +
        "    <td><select class=\"form-control input-sm\" name=\"ssremote_crypto_" + count + "\">" +
        "        <option value=\"aes-256-cfb\">AES-256-CFB</option>\n" +
        "        <option value=\"aes-128-cfb\">AES-128-CFB</option>\n" +
        "        <option value=\"chacha20\">chacha20</option>\n" +
        "        <option value=\"chacha20-ietf\">chacha20-ietf</option>\n" +
        "        <option value=\"aes-256-gcm\">[AEAD] AES-256-CFB</option>\n" +
        "        <option value=\"aes-128-gcm\">[AEAD] AES-128-GCM</option>\n" +
        "        <option value=\"chacha20-ietf-poly1305\">[AEAD] chacha20-ietf-poly1305</option>\n" +
        "    </select></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Email"] + "\" type=\"text\" name=\"ssremote_email_" + count + "\"></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Password"] + "\" type=\"password\" name=\"ssremote_password_" + count + "\"></td>\n" +
        "    <td><div class=\"btn-group\" data-toggle=\"buttons\"><label class=\"btn btn-default btn-sm\"><input type=\"checkbox\" id=\"ssremote_ota_" + count + "\" name=\"ss_ota_" + count + "\">OTA</label></div></td>\n" +
        "    <td><input class=\"form-control input-sm\" placeholder=\"" + i18N[using_language]["Level"] + "\" type=\"number\" name=\"ssremote_level_" + count + "\"></td>\n" +
        "    <td><button class=\"btn btn-default btn-sm\" onclick=\"shadowsocks_removeRemote(this)\">" +
        "        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button></td>\n" +
        "</tr>";
    $(".protodetails table#shadowsocks_remotes tbody").append(tmpl);
    return count;
}

function shadowsocks_getRemotes(form, page) {
    console.log("shadowsocksGetRemotes: ", form);
    let ssRemotes = [];
    let formKeys = Object.keys(form);

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        if (formKey.substr(0, 14) == "ssremote_addr_") {
            let lf = formKey.split('_');
            if (typeof form["ssremote_port_" + lf[2]] != undefined &&
                typeof form["ssremote_crypto_" + lf[2]] != undefined &&
                typeof form["ssremote_email_" + lf[2]] != undefined &&
                typeof form["ssremote_password_" + lf[2]] != undefined &&
                typeof form["ssremote_level_" + lf[2]] != undefined) {
                let vEmail = form["ssremote_email_" + lf[2]];
                let vLevel = form["ssremote_level_" + lf[2]];
                let vPwd = form["ssremote_password_" + lf[2]];
                let vCrypto = form["ssremote_crypto_" + lf[2]];
                let vPort = form["ssremote_port_" + lf[2]];
                if (vPwd.length > 0 && vCrypto.length > 0 &&vEmail.length > 0 && formVal.length > 0 && !isNaN(parseInt(vLevel)) && !isNaN(parseInt(vPort))) {
                    ssRemotes.push({
                        "email": vEmail,
                        "address": formVal,
                        "port": parseInt(vPort),
                        "method": vCrypto,
                        "password": vPwd,
                        "ota": $("div#" + page + "-config .protodetails #ssremote_ota_" + lf[2])[0].checked,
                        "level": vLevel
                    });
                }
            }
        }
    }
    return ssRemotes;
}

function shadowsocks_removeRemote(obj) {
    let boxes = obj.parentNode.parentNode.children;
    Object.keys(boxes).forEach(function (k) {
        boxes[k].children[0].disabled = true;
        boxes[k].children[0].value = "";
    });
    $(boxes[5].children[0].children[0]).attr("disabled", "disabled");
    obj.disabled = true;
}