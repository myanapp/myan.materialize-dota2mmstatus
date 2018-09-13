var Error = [];
var $data = document.getElementById('api');
var $oput = document.getElementById('output');

window.onload = init_Func();

function init_Func() {
    $data = JSON.parse($data.value);

    for (var i = 0, $hero = []; i < 122; i++) {
        try {
            var api = $data[i],
                hName = api.name,
                isMelee = api.isMelee,
                heroAttribute = api.attr,
                str = "{"; // Beginning of {{Array:Hero}}

            str += "\"id_" + i + "\": \"" + hName + "\"";

            str += ", \"attack_type\": {"; // End Syntax > ID || Begin Syntax > AttackType

            switch (isMelee) {
                case true:
                    str += "\"melee\": true, \"ranged\": false";
                    break;
                case false:
                    str += "\"melee\": false, \"ranged\": true";
                    break;
            }

            str += "}, \"primary_attribute\": {"; // End Syntax > AttackType || Begin Syntax > Attribute

            switch (heroAttribute) {
                case "Strength":
                    str += "\"strength\": true, \"agility\": false, \"intelligent\": false";
                    break;
                case "Agility":
                    str += "\"strength\": false, \"agility\": true, \"intelligent\": false";
                    break;
                case "Intelligent":
                    str += "\"strength\": false, \"agility\": false, \"intelligent\": true";
                    break;
            }

            str += "}, \"roles\": "; // End Syntax > Attribute || Begin Syntax > Roles

            /*
             * FOR Roles *
             ** [roles: support, carry, initiator, durable, disabler, jungler, nuker, escape]
             */
            str += roles_func(i);

            function roles_func(x) {

                var roles = {
                    support: tf_func('support'),
                    carry: tf_func('carry'),
                    initiator: tf_func('initiator'),
                    disabler: tf_func('disable'),
                    jungler: tf_func('jungler'),
                    durable: tf_func('durable'),
                    nuker: tf_func('nuker'),
                    escape: tf_func('escape')
                }

                function tf_func(param) {
                    var role = JSON.parse(document.getElementById('heroStats').value);
                        role = role[x].roles;
                        role = role.join('');
                    var searchThis = role.search(eval('/' + param + '/gmi'))

                    if (searchThis >= 0) {
                        return true;
                    } else {
                        return false;
                    }
                }

                var oputis = JSON.stringify(roles);
                
                return oputis;
            }


            str += "}"; // End Syntax > Roles

            // str += "}"; // End Syntax {{Array:Hero}}


            /*
             * Final Step For Each Hero *
             */
            $hero.push(JSON.parse(str));
        } catch (err) {
            ignore = (String(err.message)).search(/cannot read property 'name'/i);
            if (ignore >= 0) {
                Error.push(i);
            } else {
                Error.push(err.message + ' @' + i);
            }
        }
    }
    $oput.value = JSON.stringify($hero);
    console.log('Total Error: ' + Error.length);

}