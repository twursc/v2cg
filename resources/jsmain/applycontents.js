function _applyContents() {

    // Fill inbound list
    $('div#inbounds-list .conn-table-container table > tbody').html("");
    Object.keys(content["inboundDetour"]).forEach(function(k) {
        let theInbound = content["inboundDetour"][k];
        let tmpl = "\n" +
            "<tr class=\"inbound-obj\" data-inbound-tag=\"" + theInbound["tag"] + "\" data-inbound-primary=\"\" " +
            "   onclick=\"_showconn('inbound', '" + theInbound["tag"] + "')\">\n" +
            "    <td class=\"inbound-icon\"><img src=\"./resources/protocol-icons/" + theInbound["protocol"] + ".png\" style=\"width: 16px\"></td>\n" +
            "    <td class=\"inbound-name\">" + theInbound["tag"] + "</td>\n" +
            "    <td class=\"inbound-operation\">\n" +
            "        <a href=\"#\" class=\"opr-setprimary\" onclick=\"_setDefaultDetour('inbound', '" + theInbound["tag"] + "')\"><span class=\"glyphicon glyphicon-open\" aria-hidden=\"true\"></span></a>&nbsp;\n" +
            "        <a href=\"#\" class=\"opr-delete\" onclick=\"_removeDetour('inbound', '" + theInbound["tag"] + "')\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a>&nbsp;\n" +
            "    </td>\n" +
            "</tr>";
        $('div#inbounds-list .conn-table-container table > tbody').append(tmpl);
    });

    // Fill outbound list
    $('div#outbounds-list .conn-table-container table > tbody').html("");
    Object.keys(content["outboundDetour"]).forEach(function(k) {
        let theOutbound = content["outboundDetour"][k];
        let tmpl = "\n" +
            "<tr class=\"outbound-obj\" data-oOutbound-tag=\"" + theOutbound["tag"] + "\" data-outbound-primary=\"\" " +
            "   onclick=\"_showconn('outbound', '" + theOutbound["tag"] + "')\">\n" +
            "    <td class=\"outbound-icon\"><img src=\"./resources/protocol-icons/" + theOutbound["protocol"] + ".png\" style=\"width: 16px\"></td>\n" +
            "    <td class=\"outbound-name\">" + theOutbound["tag"] + "</td>\n" +
            "    <td class=\"outbound-operation\">\n" +
            "        <a href=\"#\" class=\"opr-setprimary\" onclick=\"_setDefaultDetour('outbound', '" + theOutbound["tag"] + "')\"><span class=\"glyphicon glyphicon-open\" aria-hidden=\"true\"></span></a>&nbsp;\n" +
            "        <a href=\"#\" class=\"opr-delete\" onclick=\"_removeDetour('outbound', '" + theOutbound["tag"] + "')\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></a>&nbsp;\n" +
            "    </td>\n" +
            "</tr>";
        $('div#outbounds-list .conn-table-container table > tbody').append(tmpl);
    });

    // Fill logging form
    setTimeout("_loggingDisplay()", 10);
    setTimeout("_apiDisplay()", 10);
    setTimeout("_policyDisplay()", 10);
    setTimeout("_dnsServersDisplay()", 10);
}