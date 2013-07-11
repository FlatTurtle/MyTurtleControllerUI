<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="stylesheet" type="text/css" href="css/index.css?v=<?php echo rand() ?>" />
        <title>MyTurtleController</title>
    </head>
    <body>
        <header>
            <div class='logo'></div>
        </header>
        <section class='nav'>
            &nbsp;
        </section>

        <div class='app'>
            <section class='start'>
                <h1>NMBS</h1>
                <label>From</label><input type='text' id='txtFrom' value=''/><br/>
                <label>To</label><input type='text' id='txtTo' value=''/><br/><br/>
                <label>&nbsp;</label><button class='btn primary' id='btnGo'>Plan your route</button><br/><br/>
                <span class='note'>The tablet is undergoing a complete overhaul, more functionality is coming in the next few weeks!</span>
            </section>
            <section class='lock'>
                We need the FlatTurtle tablet to be running :), <br/>if you are an administrator you can quit with the password.<br/><br/>
                <input type='text' id='txtUnlock' value=''/><br/><br/>
                <a href='#' class='btn primary' id='btnUnlock'>Unlock</a>
                <a href='#' class='btn btnStart'>Back</a>
            </section>
            <section class='settings'>
                PIN<br/>
                <input type='text' id='txtPin' value=''/><br/>
                Admin password<br/>
                <input type='text' id='txtPass' value='112233' disabled/><br/><br/>
                <a href='#' class='btn primary' id='btnSettingsSave'>Save</a>
                <a href='#' class='btn' id='btnExit'>Quit application</a>
            </section>
        </div>

        <div id="deviceready" class="blink hide">
            <p class="event listening">Connecting to Device</p>
            <p class="event received">Device is Ready</p>
        </div>
        <?php
            $hostname = $_SERVER['SERVER_NAME'];
            if($hostname != 'localhost'){
        ?>
            <script type="text/javascript" src="cordova.js"></script>
        <?
            }
        ?>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/jquery.ui.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript" src="js/app.js?v=<?php echo rand() ?>"></script>
    </body>
</html>