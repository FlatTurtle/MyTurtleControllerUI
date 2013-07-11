
var API_URI = "https://s.flatturtle.com/";
var URI_AUTH = "auth/mobile";
var URI_ROUTE_NMBS = "tablet/plugins/route/nmbs";
var AUTOCOMPLETE_NMBS = 'https://data.irail.be/NMBS/Stations.json';
var nmbs_stations = [];
var token = "";


// Init phonegap app
app.initialize();

// Listen for device ready
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    // Bind back key
    document.addEventListener("backbutton", onBackKeyDown, false);
}

// Disable back key
function onBackKeyDown(){
    show('lock');
    return false;
}

// Hide all
function hideAll(){
    $('.app section').hide();
}

function goUnlock(e){
    e.preventDefault();
    if($('#txtUnlock').val() === '112233'){
        $('#txtUnlock').val('');
        show('settings');
    }else{
        show('start');
    }
}

// Show a section
function show(section){
    hideAll();
    $('section.'+ section).show();
}

// Load settings
function loadSettings(){
    var pin = parseInt(localStorage["settings.pin"]);

    if(pin > 0)
        $('#txtPin').val(pin);
}

// Save settings
function saveSettings(e){
    e.preventDefault();
    hideAll();
    localStorage["settings.pin"] = $('#txtPin').val();
    show('start');
}

// Exit application
function exitFromApp(e){
    e.preventDefault();
    navigator.app.exitApp();
}

// Plan a route
function goRoute(e){
    e.preventDefault();

    if(!$('#btnGo').is(':disabled')){
        $('#btnGo').prop('disabled', true);

        $.ajax(API_URI + URI_ROUTE_NMBS, {
            type: 'POST',
            data: {
                'from': encodeURIComponent($('#txtFrom').val()),
                'to': encodeURIComponent($('#txtTo').val()),
            },
            beforeSend: function (request)
            {
                request.setRequestHeader("Authorization", token);
            },
            success: function(data){
                $('#btnGo').prop('disabled', false);
            },
            error: function(xhr){
                console.log(xhr);
                if(xhr.status == 403){
                    // Token expired
                    authenticate();
                    goRoute();
                }

                if(xhr.status != 200)
                    alert('Couldn\'t plan route, please try again.');

                $('#btnGo').prop('disabled', false);
            }
        });
    }
}

// Authenticate
function authenticate(){

    // Check for empty pin
    var pin = parseInt($('#txtPin').val());

    $.ajax(API_URI + URI_AUTH, {
        type: 'POST',
        data: {
            'pin': encodeURIComponent(pin)
        },
        success: function(data){
            token = data;
            console.log('Got token: ' + token);
        },
        error: function(xhr){
            console.log(xhr);
            // Invalid PIN
            alert('Invalid PIN');
            return;
        }
    });
}

/**
 * Boot everything
 */
function boot(){
    // Load settings
    loadSettings();

    // Auth
    authenticate();

    // Load autocomplete list
    $.ajax(AUTOCOMPLETE_NMBS, {
        success:function(data){
            if(typeof data.Stations != 'undefined'){
                for(i in data.Stations){
                    nmbs_stations.push(data.Stations[i].name.toLowerCase());
                }

                $('#txtFrom').autocomplete({
                    minLength: 1,
                    source: function( request, response ) {
                        // delegate back to autocomplete, but extract the last term
                        response( $.ui.autocomplete.filter(
                        nmbs_stations, request.term.toLowerCase() ) );
                    },
                    focus: function() {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function( event, ui ) {
                        this.value = ui.item.value;
                        return false;
                    }
                });

                $('#txtTo').autocomplete({
                    minLength: 1,
                    source: function( request, response ) {
                        // delegate back to autocomplete, but extract the last term
                        response( $.ui.autocomplete.filter(
                        nmbs_stations, request.term.toLowerCase() ) );
                    },
                    focus: function() {
                        // prevent value inserted on focus
                        return false;
                    },
                    select: function( event, ui ) {
                        this.value = ui.item.value;
                        return false;
                    }
                });
            }
        }
    })

    // Start screen
    show('start');

    // Bind events
    $('.btnStart').on('click', function(e){
        e.preventDefault();
        show('start');
    });
    $('#btnGo').on('click', goRoute);
    $('#btnUnlock').on('click', goUnlock);
    $('#btnSettingsSave').on('click', saveSettings);
    $('#btnExit').on('click', exitFromApp);
}
boot();