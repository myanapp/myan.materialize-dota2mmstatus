var Error = [];
var $data = document.getElementById('api');
var $oput = document.getElementById('output');

window.onload = function () {
    $data = JSON.parse($data.value);

    for (var i = 0, $hero = []; i < 122; i++) {
        try {
            var api = $data[i],
                hName = api.name,
                isMelee = api.isMelee,
                isSupport = api.isSupport,
                heroAttribute = api.attr,
                str = "{"; // Beginning of {{Array:Hero}}

            str += "\"hero_id" + i + "\": \"" + hName + "\"";

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

            str += "}, \"roles\": {"; // End Syntax > Attribute || Begin Syntax > Roles

            /**
             * FOR Roles
             * [roles: support, carry, initiator, durable, disabler, jungler, nuker, escape]
             */
            roles_func(i);

            function roles_func(x) {
                try {
                    var stats = JSON.parse(document.getElementById('heroStats').value),
                        role = stats[x].roles;
                    role = role.join(',');

                    var supp = role.search(/support/gmi);
                    var carr = role.search(/carry/gmi);
                    var init = role.search(/initiator/gmi);
                    var disb = role.search(/disable/gmi);
                    var jung = role.search(/jungler/gmi);
                    var durb = role.search(/durable/gmi);
                    var nuke = role.search(/nuker/gmi);
                    var escp = role.search(/escape/gmi);

                } catch (err) {
                    console.log(err.message);
                    return "[]";
                }
                return "";
            }



            str += "}"; // End Syntax > Roles

            str += "}"; // End Syntax {{Array:Hero}}

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
{
}