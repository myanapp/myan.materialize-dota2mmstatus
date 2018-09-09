window.onload = init();

var $_data, $_error;

function init() {
    var userid = accSetting('player_id');

    var ajax_Path = window.atob("aHR0cHM6Ly9hcGkub3BlbmRvdGEuY29tL2FwaS9wbGF5ZXJzLw==") + userid;

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
    ajax_Players.open('GET', ajax_Path, true);
    ajax_Players.send();

    function build(x) {
        var player = JSON.parse(x);
        console.log(player);
        $_data = [];
        $_error = {
            scheme: [],
            build: []
        };

        var acc_id = player.profile.account_id;
        var steam_id = player.profile.steamid;
        var avatar_small = player.profile.avatar;
        var steam_url = player.profile.profileurl;
        var local_country = player.profile.acc_loccountrycode;
        var rank_tire = player.rank_tire;

        var body = document.querySelector('.columns#node');
        var pro_img = '<img src="' + player.profile.avatarfull + '">';
        var pro_name = '<p>' + player.profile.personaname + '<br/> <br/> &nbsp &nbsp <span class="chip">(' + player.profile.name + ')</span>' + '</p>';
        var rank = '<img src="./assets/ranks/tire/' + player.rank_tire + '".png>';

        body.innerHTML = pro_img + pro_name + rank;

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