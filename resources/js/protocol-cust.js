$('body').append('<script src="./resources/js/mtproto.js"></script>');


function _protoDetailsDisplay(page, protoname, details) {
    switch(protoname) {
        case "mtproto": {
            console.log("Protocol:",protoname,details);
            $('div#'+page+'-config .protodetails #mtproto_email').val(details["users"][0]["email"]);
            $('div#'+page+'-config .protodetails #mtproto_userlevel').val(parseInt(details["users"][0]["level"]));
            $('div#'+page+'-config .protodetails #mtproto_secret').val(details["users"][0]["secret"]);
        }
    }
}

function _protoDetailsParse(page, protoname, form) {
    switch(protoname) {
        case "mtproto": {
            return {
                "users": [
                    {
                        "email": form["mtproto_email"],
                        "level": parseInt(form["mtproto_userlevel"]),
                        "secret": form["mtproto_secret"]
                    }
                ]
            }
        }
    }
}
