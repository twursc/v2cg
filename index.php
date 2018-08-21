<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>V2CG</title>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="./resources/stylesheet.css" rel="stylesheet">
    <!--[if lt IE 9]>
        <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>



    <div class="container" style="padding:15px;">
        <div>
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation"><div style="display: inline-block; font-weight: bold; padding: 10px 15px 10px 2px;">V2CG - config.json</div></li>

                <li role="presentation"><a href="#inbounds" aria-controls="home" role="tab" data-toggle="tab">Inbounds</a></li>
                <li role="presentation"><a href="#outbounds" aria-controls="profile" role="tab" data-toggle="tab">Outbounds</a></li>
                <li role="presentation"><a href="#routing" aria-controls="messages" role="tab" data-toggle="tab">Routing</a></li>
                <li role="presentation"><a href="#transport" aria-controls="settings" role="tab" data-toggle="tab">Transports</a></li>
                <li role="presentation"><a href="#policy" aria-controls="settings" role="tab" data-toggle="tab">Policy</a></li>
                <li role="presentation"><a href="#api" aria-controls="settings" role="tab" data-toggle="tab">API</a></li>
                <li role="presentation"><a href="#miscellaneous" aria-controls="settings" role="tab" data-toggle="tab">Miscellaneous</a></li>

                <li role="presentation" style="float: right;"><a href="#jsoncontent" aria-controls="jsoncontent" role="tab" data-toggle="tab">JSON Content</a></li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="home">Home...</div>
                <div role="tabpanel" class="tab-pane" id="inbounds">
                    <h3>Inbounds</h3>
                    <p class="panedesc">Configure inbound connections, see <a target="_blank" href="https://www.v2ray.com/chapter_02/02_protocols.html">Protocols</a></p>
                    <ul class="list-inline">
                        <li class="inline-item" id="inbounds-list">
                            <div class="conn-table-container">
                                <table class="table table-hover">
                                    <tr class="inbound-obj" data-inbound-tag="to-japan" data-inbound-primary="1">
                                        <td class="inbound-icon"><img src="./resources/protocol-icons/vmess.png" style="width: 16px"></td>
                                        <td class="inbound-name">To Japan</td>
                                        <td class="inbound-operation">
                                            <a href="#" class="opr-setprimary"><span class="glyphicon glyphicon-open" aria-hidden="true"></span></a>&nbsp;
                                            <a href="#" class="opr-delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>&nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <button class="btn btn-default inlist-button"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                            </div>
                        </li>
                        <li class="inline-item" id="inbound-config">
                            <div class="conn-table-container">
                                <table>
                                    <tr data-inbound-tag="to-japan" data-inbound-primary="1">
                                        <td><img src="./resources/protocol-icons/vmess.png" style="width: 16px"></td><td>To Japan</td><td></td></tr>
                                </table>
                            </div>
                        </li>
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
                    <h3>Logging</h3>                    <h3>DNS</h3>
                    <h3>Statistics</h3>
                </div>

                <div role="tabpanel" class="tab-pane" id="jsoncontent">
                    <h3>JSON Content</h3>
                    <p class="panedesc">Contents below are according to your configurations before, it can be used directly by V2Ray by pasting it into <code>config.json</code></p>
                    <textarea class="jsonContent form-control" style="height: 540px;" onchange="jsonStorage.setItem('nz.v2cg.storage.content', this.value)">{}</textarea>
                </div>
            </div>
        </div>
    </div>
</body>

<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="./language/i18N_Loader.js"></script>
<script src="./language/language_zh-CN.js"></script>
<script src="./resources/config_handler.js"></script>
<script>
    jsonStorage = window.localStorage;
    $('textarea.jsonContent').val(jsonStorage.getItem("nz.v2cg.storage.content"));
</script>
</html>