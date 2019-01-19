function _listSlots() {
    slotnames = {};
    slotactive = 0;
    if (typeof jsonStorage["slotnames"] == "string") {
        slotnames = JSON.parse(jsonStorage["slotnames"]);
    } else {
        jsonStorage["slotnames"] = "{}";
    }
    if(typeof jsonStorage["slotactive"] != "undefined") {
        slotactive = jsonStorage["slotactive"];
    }

    $('#slot-selector').html("");
    for (let n = 0; n <= 15; n++) {
        let theName = "";
        if (typeof slotnames[n] != "undefined") {
            theName = " - " + slotnames[n];
        }
        $('#slot-selector').append("<option value='" + n + "'>Slot " + n + theName + "</option>")
    }
}

function _nameSlot(slot_id) {
    slotnames[slot_id] = prompt("Set new name for slot " + slot_id, slotnames[slot_id]);
    jsonStorage["slotnames"] = JSON.stringify(slotnames);
    _listSlots();
}

function _loadSlot(slot_id) {
    if(typeof slot_id == "undefined") {
        slot_id = slotactive;
    } else {
        if(!confirm(i18N[using_language]["Reload or switch slot will lost unsaved configuration, continue?"])) {
            return "cancelled";
        }
    }

    $('textarea.jsonContent').val(jsonStorage.getItem("nz.v2cg.storage.content." + slot_id));
    $('select#slot-selector').val(slot_id);
    _parseJson($('textarea.jsonContent').val());
    jsonStorage["slotactive"] = slotactive = slot_id;
    return "switch to slot "+ slot_id;
}
