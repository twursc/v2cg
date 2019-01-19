function _routingAddRule() {
    let count = $("table#routing-rules tbody .routing-rule-item").length;
    let tmpl = "<tr class=\"routing-rule-item\"><td>\n" +
        "    <div class=\"row routing-rule-container\">\n" +
        "        <div class=\"row\">\n" +
        "            <label for=\"rule_priority_" + count + "\" class=\"col-sm-2 control-label \">" + i18N[using_language]["Priority"] + "</label>\n" +
        "            <div class=\"col-sm-3\">\n" +
        "                <input type=\"number\" class=\"form-control\" name=\"rule_priority_" + count + "\" id=\"rule_priority_" + count + "\" placeholder=\"Priority\" value=\"" + count + "\">\n" +
        "            </div>\n" +
        "            <div class=\"col-sm-1\">&nbsp;</div>\n" +
        "            <label for=\"rule_takeOutbound_" + count + "\" class=\"col-sm-2 control-label\"><span>" + i18N[using_language]["Take Outbound"] + "</span></label>\n" +
        "            <div class=\"col-sm-4\">\n" +
        "                <input type=\"text\" class=\"form-control\" name=\"rule_takeOutbound_" + count + "\" id=\"rule_takeOutbound_" + count + "\" placeholder=\"Take outbound\">\n" +
        "            </div>\n" +
        "            <div class=\"col-sm-12\"><hr style=\"margin: 0 !important;\"></div>\n" +
        "        </div>\n" +
        "        <div class=\"row\">\n" +
        "            <label for=\"rule_SwMatchDestIP_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Match Destination"] + "</label>\n" +
        "            <div class=\"col-sm-4\">\n" +
        "                <textarea class=\"form-control\" id=\"rule_SwMatchDestIP_" + count + "\" name=\"rule_SwMatchDestIP_" + count + "\" placeholder=\"Match Destination IP\"></textarea>\n" +
        "            </div>\n" +
        "            <label for=\"rule_SwMatchDomain_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Match Domain"] + "</label>\n" +
        "            <div class=\"col-sm-4\">\n" +
        "                <textarea class=\"form-control\" id=\"rule_SwMatchDomain_" + count + "\" name=\"rule_SwMatchDomain_" + count + "\" placeholder=\"Match Domain Name\"></textarea>\n" +
        "            </div>\n" +
        "            <label for=\"rule_SwMatchDestPort_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Match Destination Port"] + "</label>\n" +
        "            <div class=\"col-sm-2\">\n" +
        "                <input type=\"text\" class=\"form-control\" name=\"rule_SwMatchDestPort_" + count + "\" id=\"rule_SwMatchDestPort_" + count + "\" placeholder=\"Match Destination Port\">\n" +
        "            </div>\n" +
        "            <div class=\"col-sm-2\">&nbsp;</div>" +
        "            <label class=\"col-sm-2 control-label\">" + i18N[using_language]["Match IP Protocol"] + "</label>\n" +
        "            <div class=\"col-sm-2\">\n" +
        "                <p class=\"form-control-static\">\n" +
        "                    <label style=\"font-weight: normal;\"><input type=\"checkbox\" id=\"rule_SwMatchProtoTCP_" + count + "\" name=\"rule_SwMatchProtoTCP_" + count + "\"><span> TCP</span></label>&nbsp; &nbsp; \n" +
        "                    <label style=\"font-weight: normal;\"><input type=\"checkbox\" id=\"rule_SwMatchProtoUDP_" + count + "\" name=\"rule_SwMatchProtoUDP_" + count + "\"><span> UDP</span></label>\n" +
        "                </p>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"row\">\n" +
        "            <label for=\"rule_SwMatchSrcIP_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Match Source"] + "</label>\n" +
        "            <div class=\"col-sm-10\">\n" +
        "                <textarea class=\"form-control\" id=\"rule_SwMatchSrcIP_" + count + "\" name=\"rule_SwMatchSrcIP_" + count + "\" placeholder=\"Match Source IP\"></textarea>\n" +
        "            </div>\n" +
        "            <label for=\"rule_SwMatchSrcEmail_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Match Email"] + "</label>\n" +
        "            <div class=\"col-sm-10\">\n" +
        "                <textarea class=\"form-control\" id=\"rule_SwMatchSrcEmail_" + count + "\" name=\"rule_SwMatchSrcEmail_" + count + "\" placeholder=\"Match User Email\"></textarea>\n" +
        "            </div>\n" +
        "            <label for=\"rule_SwMatchInbound_" + count + "\" class=\"col-sm-2 control-label\">" + i18N[using_language]["Match InboundTag"] + "</label>\n" +
        "            <div class=\"col-sm-10\">\n" +
        "                <textarea class=\"form-control\" id=\"rule_SwMatchInbound_" + count + "\" name=\"rule_SwMatchInbound_" + count + "\" placeholder=\"Match InboundTag\"></textarea>\n" +
        "            </div>\n" +
        "            <label class=\"col-sm-2 control-label\">" + i18N[using_language]["Match Application"] + "</label>\n" +
        "            <div class=\"col-sm-8\">\n" +
        "                <p class=\"form-control-static\">\n" +
        "                    <label style=\"font-weight: normal;\"><input type=\"checkbox\" id=\"rule_SwMatchL7Proto_http_" + count + "\" name=\"rule_SwMatchL7Proto_http_" + count + "\">\n" +
        "                        <span> HTTP</span></label>&nbsp; &nbsp;\n" +
        "                    <label style=\"font-weight: normal;\"><input type=\"checkbox\" id=\"rule_SwMatchL7Proto_tls_" + count + "\" name=\"rule_SwMatchL7Proto_tls_" + count + "\">\n" +
        "                        <span> TLS</span></label>&nbsp; &nbsp;\n" +
        "                    <label style=\"font-weight: normal;\"><input type=\"checkbox\" id=\"rule_SwMatchL7Proto_btor_" + count + "\" name=\"rule_SwMatchL7Proto_btor_" + count + "\">\n" +
        "                        <span> BitTorrent</span></label>\n" +
        "                </p>\n" +
        "            </div>\n" +
        "            <div class=\"col-sm-2\">\n" +
        "                <button class=\"btn btn-default\" onclick=\"_routingRemoveRule(this)\">\n" +
        "                    <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>&nbsp; <span>" + i18N[using_language]["Remove"] + "</span></button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</td></tr>";
    $("table#routing-rules tbody").append(tmpl);
    return count;
}

function _routingRemoveRule(obj) {
    let rows = obj.parentNode.parentNode.parentNode.children;
    Object.keys(rows).forEach(function(c) {
        let boxes = rows[c].children;
        //console.log(boxes);
        Object.keys(boxes).forEach(function (k) {
            Object.keys(boxes[k].children).forEach(function (s) {
                //console.log(boxes[k].children[s]);
                if(boxes[k].children[s].tagName.toLowerCase() == "textarea" || boxes[k].children[s].tagName.toLowerCase() == "input") {
                    boxes[k].children[0].disabled = true;
                    boxes[k].children[0].value = "";
                }
                if(boxes[k].children[s].tagName.toLowerCase() == "p") {
                    Object.keys(boxes[k].children[s].children).forEach(function(r) {
                        boxes[k].children[s].children[r].children[0].disabled = true;
                        boxes[k].children[s].children[r].children[0].checked = false;

                    })
                }
            });
        });
    });

    obj.disabled = true;
}

function _routingGetRules() {
    let form = _serializeForm($('form#routing-config-form'));
    let routingRules = [];
    let formKeys = Object.keys(form);
    let currentPriority = 0;

    for (var i = 0; i < formKeys.length; i++) {
        let formKey = Object.keys(form)[i];
        let formVal = form[formKey];
        if (typeof formKey != "undefined" && formKey.substr(0, 18) == "rule_takeOutbound_") {
            let lf = formKey.split('_');
            if(formVal.length > 0) {
                let current = {
                    type: "field",
                    outboundTag: formVal
                };
                let matchL4Proto = [];
                let matchL7Proto = [];
                if(form["rule_SwMatchDestIP_" + lf[2]]) {
                    let items = form["rule_SwMatchDestIP_" + lf[2]].trim();
                    items = items.replace(/\r\n/g, "  ");
                    items = items.replace(/\n/g, "  ");
                    items = items.split("  ");
                    current.ip = items;
                }
                if(form["rule_SwMatchDomain_" + lf[2]]) {
                    let items = form["rule_SwMatchDomain_" + lf[2]].trim();
                    items = items.replace(/\r\n/g, "  ");
                    items = items.replace(/\n/g, "  ");
                    items = items.split("  ");
                    current.domain = items;
                }
                if(form["rule_SwMatchDestPort_" + lf[2]]) {
                    current.port = form["rule_SwMatchDestPort_" + lf[2]].trim();
                }
                if(form["rule_SwMatchSrcIP_" + lf[2]]) {
                    let items = form["rule_SwMatchSrcIP_" + lf[2]].trim();
                    items = items.replace(/\r\n/g, "  ");
                    items = items.replace(/\n/g, "  ");
                    items = items.split("  ");
                    current.source = items;
                }
                if(form["rule_SwMatchSrcEmail_" + lf[2]]) {
                    let items = form["rule_SwMatchSrcEmail_" + lf[2]].trim();
                    items = items.replace(/\r\n/g, "  ");
                    items = items.replace(/\n/g, "  ");
                    items = items.split("  ");
                    current.user = items;
                }
                if(form["rule_SwMatchInbound_" + lf[2]]) {
                    let items = form["rule_SwMatchInbound_" + lf[2]].trim();
                    items = items.replace(/\r\n/g, "  ");
                    items = items.replace(/\n/g, "  ");
                    items = items.split("  ");
                    current.inboundTag = items;
                }

                if($('form#routing-config-form input#rule_SwMatchL7Proto_http_' + lf[2])[0].checked) { matchL7Proto.push("http"); }
                if($('form#routing-config-form input#rule_SwMatchL7Proto_tls_' + lf[2])[0].checked) { matchL7Proto.push("tls"); }
                if($('form#routing-config-form input#rule_SwMatchL7Proto_btor_' + lf[2])[0].checked) { matchL7Proto.push("bittorrent"); }
                if(matchL7Proto.length != 0) { current.protocol = matchL7Proto; }

                if($('form#routing-config-form input#rule_SwMatchProtoTCP_' + lf[2])[0].checked) { matchL4Proto.push("tcp"); }
                if($('form#routing-config-form input#rule_SwMatchProtoUDP_' + lf[2])[0].checked) { matchL4Proto.push("udp"); }
                if(matchL4Proto.length != 0) { current.network = matchL4Proto.join(','); }

                let priority = parseInt(form["rule_priority_" + lf[2]]);
                if(!isNaN(priority)) {
                    if (priority <= currentPriority) {
                        routingRules.unshift(current);
                    } else {
                        routingRules.push(current);
                    }
                    currentPriority = priority;
                } else {
                    routingRules.push(current);
                }
            }
        }
    }
    return routingRules;
}

function _routingCommit() {
    content["routing"]["domainStrategy"] = $('#routing_domainStrategy').val();
    content["routing"]["rules"] = _routingGetRules();
    _globalCommit();
}

function _routingDisplay() {
    $("table#routing-rules tbody").html("");
    if(typeof content["routing"]["domainStrategy"] === "string") {
        $('#routing_domainStrategy').val(content["routing"]["domainStrategy"]);
    }
    Object.keys(content["routing"]["rules"]).forEach(function (rule) {
        let row = _routingAddRule();
        let theRule = content["routing"]["rules"][rule];
        console.log("Adding ", theRule);
        $('form#routing-config-form input[name=\"rule_takeOutbound_' + row + '\"]').val(theRule["outboundTag"]);
        if(typeof theRule["domain"] === "object") {
            $('form#routing-config-form textarea[name=\"rule_SwMatchDomain_' + row + '\"]').val(theRule["domain"].join("  "));
        }
        if(typeof theRule["ip"] === "object") {
            $('form#routing-config-form textarea[name=\"rule_SwMatchDestIP_' + row + '\"]').val(theRule["ip"].join("  "));
        }
        if(typeof theRule["port"] === "string") {
            $('form#routing-config-form input[name=\"rule_SwMatchDestPort_' + row + '\"]').val(theRule["port"]);
        }
        if(typeof theRule["network"] === "string") {
            let matchL4Proto = theRule["network"].split(',');
            $('form#routing-config-form input#rule_SwMatchProtoTCP_' + row)[0].checked = (matchL4Proto.indexOf("tcp") !== -1);
            $('form#routing-config-form input#rule_SwMatchProtoUDP_' + row)[0].checked = (matchL4Proto.indexOf("udp") !== -1);
        }
        if(typeof theRule["source"] === "object") {
            $('form#routing-config-form textarea[name=\"rule_SwMatchSrcIP_' + row + '\"]').val(theRule["source"].join("  "));
        }
        if(typeof theRule["user"] === "object") {
            $('form#routing-config-form textarea[name=\"rule_SwMatchSrcEmail_' + row + '\"]').val(theRule["source"].join("  "));
        }
        if(typeof theRule["inboundTag"] === "object") {
            $('form#routing-config-form textarea[name=\"rule_SwMatchInbound_' + row + '\"]').val(theRule["inboundTag"].join("  "));
        }
        if(typeof theRule["protocol"] === "object") {
            $('form#routing-config-form input#rule_SwMatchL7Proto_http_' + row)[0].checked = (theRule["protocol"].indexOf("http") !== -1);
            $('form#routing-config-form input#rule_SwMatchL7Proto_tls_' + row)[0].checked = (theRule["protocol"].indexOf("tls") !== -1);
            $('form#routing-config-form input#rule_SwMatchL7Proto_btor_' + row)[0].checked = (theRule["protocol"].indexOf("bittorrent") !== -1);
        }
    });
}
