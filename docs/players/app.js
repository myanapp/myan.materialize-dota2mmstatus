window.onload = init();

var $data;

function init() {
    var userid = accSetting('player_id');
    var hosturl = 'https://api.opendota.com/api';
    var api = {players: [hosturl, 'players', userid], matches: [hosturl, 'players', userid, 'recentmatches']};

    var ajax_Players = new XMLHttpRequest();
    ajax_Players.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                build(this.response);
            } else {
                document.body.innerHTML = "<object style=padding-top:20px;></object> <center> <h2> <code> HTTP" + this.status + ":" + this.statusText + "</code></h2> <p style='font-family:monospace'> There were some error occured while connecting to server!!<br/> <br/> Try to reload this page... <br/>or<br/> <a href='./auth/login/'>Click here</a> to reset your acccount id. <p> </center>";
            }
        }
    }
    ajax_Players.open('GET', api.players.join('/'), true);
    ajax_Players.send();

    function build(x) {
        var player = JSON.parse(x);
        $data = {
            return: []
        };

        $data['return'].push({
            account_id: player.profile.steamid,
            player_name: player.profile.personaname,
            avatar_img: player.profile.avatarfull,
            rank_tier: player.rank_tier,
            steam_id: player.profile.steamid,
            country: player.profile.loccountrycode,
            last_seen: player.profile.last_login
        });

        console.log(player, $data);

    }

    function accSetting(svalue) {
        var x = svalue;

        try {
            var _session = window.atob(sessionStorage.getItem(x));

            if (_session != null || _session != '') {
                setCookie(x, _session, 3);
                return getCookie(x);
            } else {
                return window.location.assign('./auth/login/');
            }

        } catch (err) {
            window.alert(err.message);
            sessionStorage.clear(x);
            setCookie(x, '', 0);
            window.location.assign('./auth/login/');
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