
function onShadowsocksCryptoSelect(method) {
    var AeadCryptoes = ["chacha20-ietf-poly1305", "aes-128-gcm", "aes-256-gcm"];
    var otaCheckbox = $('#shadowsocks_enable_ota')[0];
    if(AeadCryptoes.indexOf(method) != -1) {
        otaCheckbox.checked = false;
        otaCheckbox.disabled = true;
    } else {
        otaCheckbox.disabled = false;
    }
}