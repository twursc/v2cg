<!DOCTYPE html>
<html lang="zh-CN" class="theme-light">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>V2Ray Configuration Generator</title>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="./resources/stylesheet.css" rel="stylesheet">
    <link rel="shortcut icon" type="image/png" href="./resources/favicon.ico" id="favicon">
    <!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<div class="container-fluid" style="padding:15px;">
    <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation"><div style="display: inline-block; font-weight: bold; padding: 10px 15px 10px 2px;">V2CG - config.json</div></li>
            <li role="presentation"><a class="tabs-click" href="#inbounds" aria-controls="home" role="tab" data-toggle="tab">Inbounds</a></li>
            <li role="presentation"><a class="tabs-click" href="#outbounds" aria-controls="profile" role="tab" data-toggle="tab">Outbounds</a></li>
            <li role="presentation"><a class="tabs-click" href="#routing" aria-controls="messages" role="tab" data-toggle="tab">Routing</a></li>
            <li role="presentation"><a class="tabs-click" href="#transport" aria-controls="settings" role="tab" data-toggle="tab">Transports (Global)</a></li>
            <li role="presentation"><a class="tabs-click" href="#policy" aria-controls="settings" role="tab" data-toggle="tab">Policy</a></li>
            <li role="presentation"><a class="tabs-click" href="#api" aria-controls="settings" role="tab" data-toggle="tab">API</a></li>
            <li role="presentation"><a class="tabs-click" href="#miscellaneous" aria-controls="settings" role="tab" data-toggle="tab">Miscellaneous</a></li>
            <li role="presentation" style="float: right;"><a class="tabs-click" href="#jsoncontent" aria-controls="jsoncontent" role="tab" data-toggle="tab"><b>{JSON}</b></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content" style="max-width: 90%; margin: 42px auto;">
            <!--<div role="tabpanel" class="tab-pane active" id="home">Home...</div>-->
            <div role="tabpanel" class="tab-pane" id="inbounds">
                <h3>Inbounds</h3>
                <p class="panedesc">Configure inbound connections, see <a target="_blank" href="https://www.v2ray.com/chapter_02/02_protocols.html">Protocols</a>.</p>
                <ul class="list-inline">

                    <div class="row">
                        <div class="col-sm-2" id="inbounds-list">
                            <div class="conn-table-container">
                                <table class="table table-hover">
                                    <tr class="inbound-obj" data-inbound-tag="to-japan" data-inbound-primary="1">
                                        <td class="inbound-icon"><img src="./resources/protocol-icons/vmess.png" style="width: 16px"></td>
                                        <td class="inbound-name">to-japan</td>
                                        <td class="inbound-operation">
                                            <a href="#" class="opr-setprimary"><span class="glyphicon glyphicon-open" aria-hidden="true"></span></a>&nbsp;
                                            <a href="#" class="opr-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>&nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <button class="btn btn-default inlist-button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                            </div>
                        </div>

                        <div class="col-sm-10" id="inbound-config" style="width: calc(100% - 260px);" data-inboundtag="to-japan">
                            <div class="conn-table-container">
                                <form class="form-horizontal">
                                    <div class="form-group" style="padding: 0 16px;">
                                        <label for="inboundTag" class="col-sm-2 control-label">Inbound Tag</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="inboundTag" placeholder=""
                                                   onchange="$('div#inbound-config #btnSave').text(i18N[using_language]['Save current as %s'].replace(/%s/, this.value));">
                                        </div>
                                    </div>

                                    <div class="form-group" style="padding: 0 16px;">
                                        <label for="listenAddr" class="col-sm-2 control-label">Listen Address</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="listenAddr" placeholder="">
                                        </div>
                                    </div>

                                    <div class="form-group" style="padding: 0 16px;">
                                        <label for="listenPort" class="col-sm-2 control-label">Port</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="listenPort" placeholder="">
                                        </div>
                                    </div>

                                    <div class="form-group" style="padding: 0 16px;">
                                        <label for="protocol" class="col-sm-2 control-label">Protocol</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" id="protocol" onchange="_showproto('inbound', this.value, $('input#inboundTag').val())">
                                                <option value="null">-- Select a protocol --</option>
                                                <option value="shadowsocks">Shadowsocks</option>
                                                <option value="socks">Socks5</option>
                                                <option value="http">HTTP</option>
                                                <option value="vmess">VMess</option>
                                                <option value="mtproto">Telegram MTProto</option>
                                                <option value="dokodemo-door">どこでも ドア</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="panel panel-default">
                                        <div class="panel-heading">Protocol Settings</div>
                                        <div class="panel-body protodetails" data-currentproto="">Please select a protocol.</div>
                                    </div>
                                </form>
                                <button class="btn btn-primary" id="btnSave" style="float: right;" onclick="_protoDetailsCommit('inbound');">Save current</button>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
            <div role="tabpanel" class="tab-pane" id="outbounds">
                <h3>Outbounds</h3>
            </div>
            <div role="tabpanel" class="tab-pane" id="routing">
                <h3>Routing</h3>
            </div>
            <div role="tabpanel" class="tab-pane" id="transport">
                <h3>Transports</h3>
            </div>
            <div role="tabpanel" class="tab-pane" id="policy">
                <h3>Policy</h3>
            </div>
            <div role="tabpanel" class="tab-pane" id="api">
                <h3>API</h3>
            </div>
            <div role="tabpanel" class="tab-pane" id="miscellaneous">
                <h3>Logging</h3>
                <h3>DNS</h3>
                <h3>Statistics</h3>
            </div>

            <div role="tabpanel" class="tab-pane" id="jsoncontent">
                <h3>JSON Content</h3>
                <p class="panedesc">Contents below are according to your configurations before, it can be used directly by V2Ray by pasting it into <code>config.json</code></p>
                <textarea class="jsonContent form-control" style="height: 540px; min-width: 100%; max-width: 100%; font-family: Consolas" onchange="jsonStorage.setItem('nz.v2cg.storage.content', this.value)">{}</textarea>
                <br><button class="btn btn-primary" onclick="_parseJson($('textarea.jsonContent').val());">解析当前 JSON</button>
                &nbsp;<button class="btn btn-default" onclick="_copyJsonContent();">&nbsp; 复制 &nbsp;</button>
            </div>
        </div>
    </div>
</div>

<div class="proto_tmpl_container" style="display: none">
    <div class="proto_tmpl_inbound" id="vmess">
        <table class="table table-bordered">
            <thead><tr><td>Email</td><td>UUID</td><td>Level</td><td>Alter ID</td></tr></thead>
            <tbody>
            <tr><td>email1@user.domain</td><td>1</td><td>64</td></tr>
            </tbody>
        </table>
    </div>

    <div class="proto_tmpl_inbound" id="dokodemo-door">
        <div class="form-group">
            <label for="dokodemo_destaddr" class="col-sm-2 control-label">Destination Address</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="dokodemo_destaddr" name="dokodemo_destaddr" placeholder="">
            </div>
        </div>

        <div class="form-group">
            <label for="dokodemo_destport" class="col-sm-2 control-label">Destination Port</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="dokodemo_destport" name="dokodemo_destport" placeholder="">
            </div>
        </div>

        <div class="form-group">
            <label for="dokodemo_timeout" class="col-sm-2 control-label">Timeout</label>
            <div class="col-sm-10">
                <div class="input-group">
                    <input type="number" class="form-control" id="dokodemo_timeout" name="dokodemo_timeout">
                    <div class="input-group-addon">second(s)</div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="dokodemo_userlevel" class="col-sm-2 control-label">Level</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="dokodemo_userlevel" name="dokodemo_userlevel" placeholder="">
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">Options</label>
            <div class="col-sm-4">
                <p class="form-control-static">
                    <label style="font-weight: normal;">
                        <input type="checkbox" id="dokodemo_followredir" name="dokodemo_followredir">
                        <span>Auto forward packets from IPTABLES</span>
                    </label>
                </p>
            </div>
            <label for="dokodemo_followredir" class="col-sm-2 control-label">Network Type</label>
            <div class="col-sm-4">
                <p class="form-control-static">
                    <label style="font-weight: normal;"><input type="checkbox" id="dokodemo_network_tcp" name="dokodemo_network_tcp"> TCP</label> &nbsp;
                    <label style="font-weight: normal;"><input type="checkbox" id="dokodemo_network_udp" name="dokodemo_network_udp"> UDP</label> &nbsp;
                </p>
            </div>
        </div>

    </div>

    <div class="proto_tmpl_inbound" id="mtproto">
        <div class="form-group">
            <label for="mtproto_email" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="mtproto_email" name="mtproto_email" placeholder="">
            </div>
        </div>

        <div class="form-group">
            <label for="mtproto_userlevel" class="col-sm-2 control-label">Level</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="mtproto_userlevel" name="mtproto_userlevel" placeholder="">
            </div>
        </div>

        <div class="form-group">
            <label for="mtproto_secret" class="col-sm-2 control-label">Secret</label>
            <div class="col-sm-10">
                <div class="input-group">
                    <input type="text" class="form-control" id="mtproto_secret" name="mtproto_secret" style="font-family: Consolas;">
                    <div class="input-group-addon btn btn-secondary"
                         onclick="_mtprotoGenerateSecret($('#mtproto_secret'))">Generate Secret</div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="./language/i18N_Loader.js"></script>
<script src="./language/language_zh-CN.js"></script>
<script src="./resources/js/base.js"></script>
<script src="./resources/js/pageload.js"></script>
<script src="./resources/js/protocol-cust.js"></script>
<script src="./resources/js/protocol-commit.js"></script>

<script>
    content = [];
    clientLang = $('html').attr('lang');
    jsonStorage = window.localStorage;
    $('textarea.jsonContent').val(jsonStorage.getItem("nz.v2cg.storage.content"));
    window.onload = function () {
        _applyI18N();
        _parseJson($('textarea.jsonContent').val());
        $('ul.nav-tabs a.tabs-click:first').click();
    };
</script>

</html>