window.onload = init();

var $_data, $_error;

function init() {
    var total_heroes = 123,
        ajax_path = "./test.v1.0.0.json",
        img125_fpath = "./assets/img/125px-",
        img125_lpath = '_Large.png',
        imgVert_fpath = "./assets/img/vert/",
        imgVert_lpath = "_vert.png";

    var ajax_heroes = new XMLHttpRequest();

    ajax_heroes.onreadystatechange = function () {
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    createAPIdata_heroes(this.response);
                    break;
                default:
                    document.body.innerHTML += "<h2>unexpected error occoured!</h2> <p> There were some error occured while connecting to server!! Try reload this page... <br/> HTTP:<code>" + this.status + "</code> <p>";
            }
        }
    }
    ajax_heroes.open('GET', ajax_path, true);
    ajax_heroes.send();

    function createAPIdata_heroes(x) {
        var heroes = JSON.parse(x);
        $_data = [];
        $_error = {
            scheme: [],
            build: []
        };

        for (var i = 0; i <= total_heroes; i++) {
            try {
                var h = heroes[i],
                    img_init = px125_imageURL(),
                    img_vert = vert_imageURL();

                var hero = {
                    id: i,
                    name: h.name,
                    path: {
                        cover: img_init,
                        profile: img_vert
                    },
                    attr: h.attr,
                    attack: attack_type(),
                    style: role_position(),
                    roles: null
                }

                $_data.push(hero);

                function attack_type() {
                    if (!h.isMelee) {
                        return "Ranged";
                    }
                    return "Melee";

                }

                function role_position() {
                    switch (h.isSupport) {
                        case "both":
                            return 2;
                            break;
                        case true:
                            return 1;
                            break;
                    }
                    return 0;
                }

                function px125_imageURL() {
                    var hName = h.name;
                    var hNew = hName.split(' ');
                    hNew = hNew.join('_');
                    return img125_fpath + hNew + img125_lpath;
                }

                function vert_imageURL() {
                    var hName = h.name;
                    var hNew = hName.split(' ');
                    hNew = hNew.join('_');
                    return imgVert_fpath + hNew + imgVert_lpath;
                }
            } catch (e) {
                var err = 'no-data_' + i;
                err = err + '=' + e.message;
                $_error.scheme.push(err);
            }
        }

        var elem = '';
        var new_$data = $_data;
        var v1 = new Date(),
            v2 = Math.floor(Math.random() * 10) + 1,
            v3 = v1.getTime(),
            v0 = Math.floor(Math.random() * 5) + 1,
            dat = (window.btoa((v3 * (v2 * (v1.getDate() * v1.getHours() * v1.getSeconds()))))).slice(v0, (v2 + v0) + 5);
        // console.info('node-id:', dat, new_$data);

        var body = document.querySelector('main#node'),
            inner = document.createElement('div');
        inner.setAttribute('class', 'columns text-center');
        inner.setAttribute('id', dat);
        body.appendChild(inner);

        for (var i = 0; i < (total_heroes - 6); i++) {
            try {
                var buildHero = new_$data[i];

                var hero_id = buildHero.id,
                    localized_hero = buildHero.name,
                    attribute = buildHero.attr,
                    cover = buildHero.path.cover,
                    role = buildHero.style,
                    _buildROLE = '';

                if (role == 0) {
                    _buildROLE = '<span class="label label-primary" style="display: inline-block">CARRY</span>';
                } else {
                    _buildROLE = '<span style="display: inline-block" class="label label-primary">SUPPORT</span>';
                }
                if (role == 2) {
                    _buildROLE += '&nbsp&nbsp&nbsp<span class="label label-primary" style="display: inline-block">CARRY</span>';
                }

                var build_1 = '<div class="card heroes" onclick="click_onHeroCard(this, ' + hero_id + ')" --data-localized-name="' + localized_hero + '">';
                var build_2 = '<div class="card-body"> <div class="chip"> <img src="./assets/misc/attr-' + (attribute).toLowerCase() + '.png" class="avatar avatar-sm">' + localized_hero + '</div> </div>';
                var build_3 = '<div class="card-image"> <img src=' + decodeURIComponent(cover) + ' class="img-responsive"> </div>';
                var build_4 = '<div class="card-footer">' + _buildROLE + '</div>';

                elem += build_1 + build_2 + build_3 + build_4 + '</div>';

            } catch (e) {
                var err = 'no-data_' + i;
                err = err + '=' + e.message;
                $_error.build.push(err);
            }
        }
        document.getElementById(dat).innerHTML += elem;
    }
}