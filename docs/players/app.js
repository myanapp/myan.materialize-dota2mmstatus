window.onload = init();

var $_data, $_error;

function init() {
    var userid = accSetting('player_Id');
    if (userid == undefined || userid == null) {
        location.assign('./auth/login/');
        console.log(null);
    } else {
        console.log(userid);
    }
    var ajax_path = "https://api.opendota.com/api/players/" + userid;
    var ajax_Players = new XMLHttpRequest();

    ajax_Players.onreadystatechange = function () {
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    build(this.response);
                    break;
                default:
                    document.body.innerHTML = "<object style=padding-top:20px;></object> <center> <h2> <code> HTTP" + this.status + ":" + this.statusText + "</code></h2> <p style='font-family:monospace'> There were some error occured while connecting to server!!<br/>Try to reload this page... <p> </center>";
            }
        }
    }
    ajax_Players.open('GET', ajax_path, true);
    ajax_Players.send();

    function build(x) {
        var player = JSON.parse(x);
        $_data = [];
        $_error = {
            scheme: [],
            build: []
        };

        try {
            var acc_id = player.profile.account_id;
            var acc_name = player.profile.name;
            var acc_profile = player.profile.personaname;
            var steam_id = player.profile.steamid;
            var avatar_small = player.profile.avatar;
            var avatar_large = player.profile.avatar;
            var steam_url = player.profile.profileurl;
            var local_country = player.profile.acc_loccountrycode;
            var rank_tire = player.rank_tire;

            console.log(acc_id, acc_name, acc_profile, steam_id, avatar_small, avatar_large, steam_url, local_country, rank_tire);



        } catch (e) {
            var err = 'no-data_' + i;
            err = err + '=' + e.message;
            $_error.scheme.push(err);
        }
    }

    function accSetting(svalue, smethod) {
        var x = "player_id";

        switch (smethod) {
            case 1:
                var setPID = localStorage.setItem(x, svalue);
                return setPID;
                break;
            case 2:
                var setPID = sessionStorage.setItem(x, svalue);
                return setPID;
                break;
            case 3:
                var setPID = setCookie(x, svalue, 3);
                return setPID;
                break;
            default:
                var _local = localStorage.getItem(x);
                var _session = sessionStorage.getItem(x);
                var _cookie = getCookie(x);

                if (_local != null || _local != '') {
                    sessionStorage.clear(x);
                    setCookie(x, '', 0);
                    return _local;
                } else
                if (_session != null || _session != '') {

                    localStorage.clear(x);
                    setCookie(x, '', 0);
                    return _session;
                } else
                if (_cookie != null || _cookie != '') {

                    sessionStorage.clear(x);
                    localStorage.clear(x);
                    return _cookie;
                }
        }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    }
}