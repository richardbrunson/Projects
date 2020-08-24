/***********************************************
drunkbots.js
Copyright (c) 2015 Richard Brunson
http://IQ01.com
richardbrunson@gmail.com
***********************************************/

(function () {

    var drunkbots = {

        bot: {

            chars: [
                { char: "@", color: "f00" },
                { char: "^", color: "f90" },
                { char: ":", color: "ff0" },
                { char: "&", color: "0f0" },
                { char: "#", color: "090" },
                { char: "*", color: "0ff" },
                { char: "+", color: "09f" },
                { char: "%", color: "00f" },
                { char: "=", color: "90f" },
                { char: "$", color: "f0f" },
                { char: "_", color: "fff" },
                { char: ".", color: "999" },
                { char: "!", color: "666" },
                { char: "'", color: "930" },
                { char: "-", color: "009" },
                { char: "~", color: "000" }
            ],
            noColor: " ",
            errorColor: "9f0",

            sizes: {
                small: { id: 0, mag: 3, style: "smallsize" },
                medium: { id: 1, mag: 6, style: "mediumsize" },
                large: { id: 2, mag: 9, style: "largesize" }
            },

            directions: {
                left: 0,
                right: 1,
                up: 2,
                down: 3
            },
            drunkMag: 100,

            defs: [
                {
                    name: "ship1",
                    def: [
                            "       _       ",
                            "       _       ",
                            "       _       ",
                            "      ___      ",
                            "  @   ___   @  ",
                            "  _   _@_   _  ",
                            "  _  __@__  _  ",
                            "  _  _@@@_  _  ",
                            "_ _ __@@@__ _ _",
                            "_ %___@_@___% _",
                            "_______________",
                            "__%  %___%  %__",
                            "@@_  %%_%%  _@@",
                            "  _  _____  _  ",
                            "      ___      ",
                            "      @@@      "
                    ]
                },
                {
                    name: "ship2",
                    def: [
                            "    __**    ",
                            "  __******  ",
                            "  _@@*@@*@  ",
                            " __@@*@@*@* ",
                            "_______*****",
                            "   @_*@**   ",
                            "     *@     "
                    ]
                },
                {
                    name: "ship3",
                    def: [
                            "     @@@@@@     ",
                            "   @@@@@@@@@@   ",
                            "  @@@@@@@@@@@@  ",
                            " @@:@@:@@:@@:@@ ",
                            "@@@@@@@@@@@@@@@@",
                            "  @@@  @@  @@@  ",
                            "   @        @   "
                    ]
                },
                {
                    name: "ship4",
                    def: [
                            "      =      ",
                            "    =====    ",
                            "  =========  ",
                            "===$=$=$=$===",
                            " =========== ",
                            "     ===     "
                    ]
                },
                {
                    name: "ship5",
                    def: [
                            "  &&&&&&&  ",
                            " &'~~'~~'& ",
                            "&::~::~::~&",
                            " &&&&&&&&& "
                    ]
                },
                {
                    name: "ship6",
                    def: [
                            "$$           ",
                            " $$          ",
                            "$$$$$$$$     ",
                            " $$____&$~_  ",
                            "$$________&$$",
                            " __&$$$      "
                    ]
                },
                {
                    name: "ghost",
                    def: [
                            "     %%%%     ",
                            "   %%%%%%%%   ",
                            "  %%%%%%%%%%  ",
                            " %%__%%%%__%% ",
                            " %____%%____% ",
                            " %_@@_%%_@@_% ",
                            "%%_@@_%%_@@_%%",
                            "%%%__%%%%__%%%",
                            "%%%%%%%%%%%%%%",
                            "%%%%%%%%%%%%%%",
                            "%%%%%%%%%%%%%%",
                            "%%%%%%%%%%%%%%",
                            "%% %%%  %%% %%",
                            "%   %%  %%   %"
                    ]
                },
                {
                    name: "otto",
                    def: [
                            "  ::::  ",
                            " :::::: ",
                            "::%::%::",
                            "::::::::",
                            ":%::::%:",
                            "::%%%%::",
                            " :::::: ",
                            "  ::::  "
                    ]
                },
                {
                    name: "alien3",
                    def: [
                            "   $$$   ",
                            "  *$$$$  ",
                            " **$$$$$ ",
                            "$$$$$$$$$",
                            "$$$& &$$$",
                            "   & & $$",
                            "   & & & ",
                            "  & &   &"
                    ]
                },
                {
                    name: "alien4",
                    def: [
                            "  &&&&&&     ",
                            "&&&&&&&&__   ",
                            " _ _&&&_%%_  ",
                            "_ _ _ &_%%%_ ",
                            "&&&&&  &_%__ ",
                            " &&&&&&&&___ ",
                            "   &&&&&&@@@ ",
                            "     &&@@@@@@",
                            "    &&&&@ @ @",
                            "@ &&&&&&     ",
                            "@ &&&&@&&   &",
                            " @&&&&@&&&&&&",
                            " @  @@@@ &&& "
                    ]
                },
                {
                    name: "alien5",
                    def: [
                            "         $$$$$  ",
                            "        $$___$$ ",
                            "  :::  $$$$$$$  ",
                            "  __:: $$__$$   ",
                            " $%_:::$$$$$$ : ",
                            "$$$::::$$_$$::::",
                            "$$:::: :$$$:::  ",
                            "$      ::::::   ",
                            "        :::     ",
                            "       $:       ",
                            "     $$$        ",
                            "       $        "
                    ]
                },
                {
                    name: "alien6",
                    def: [
                            "    @ @    ",
                            "    @ @    ",
                            "@  @@@@@  @",
                            "@@@@:@:@@@@",
                            "   @@@@@   ",
                            " %%%@@@%%% ",
                            "%%% @@@ %%%",
                            "%%   @   %%"
                    ]
                },
                {
                    name: "alien7",
                    def: [
                            "  &     &  ",
                            "   &   &   ",
                            "  &&&&&&&  ",
                            " &&%&&&%&& ",
                            "&&&&&&&&&&&",
                            "& &&&&&&& &",
                            "& &     & &",
                            "   && &&   "
                    ]
                },
                {
                    name: "alien8",
                    def: [
                            " %    :    % ",
                            "  % :@:@: %  ",
                            "   %@@:@@%   ",
                            "    :::::    ",
                            "   %%:::%%   ",
                            "  %%%@@@%%%  ",
                            " %%% @@@ %%% ",
                            "%%%% ::: %%%%",
                            "%%%  @@@  %%%",
                            "%%%   @   %%%"
                    ]
                },
                {
                    name: "alien9",
                    def: [
                            " :       : ",
                            "  :     :  ",
                            "   :   :   ",
                            "   :::::   ",
                            " ::::::::: ",
                            "::@@:::@@::",
                            ":::::::::::",
                            "  ::: :::  ",
                            " :::: :::: "
                    ]
                },
                {
                    name: "alien10",
                    def: [
                            "   ==~   ",
                            "  &==~&  ",
                            " &~==$~& ",
                            " &~$^$~& ",
                            "  &$^$&  ",
                            "  & ^ &  ",
                            " &  ^  & ",
                            "&   ^   &"
                    ]
                },
                {
                    name: "fish",
                    def: [
                            "    ^^^  ",
                            "   ^^^^^ ",
                            "^ ^^^^^_^",
                            " ^^^^ ^^^",
                            "^ ^^^    ",
                            "   ^^^^^ ",
                            "    ^^^  "
                    ]
                },
                {
                    name: "robot1",
                    def: [
                            "  @@@@  ",
                            " @@__@@ ",
                            "@@@@@@@@",
                            "@ @@@@ @",
                            "@ @@@@ @",
                            "@ @@@@ @",
                            "  @@@@  ",
                            "  @  @  ",
                            "  @  @  ",
                            "  @  @  ",
                            " @@  @@ "
                    ]
                },
                {
                    name: "robot2",
                    def: [
                            "    ^ ^    ",
                            "    ^^^    ",
                            "  ^^^^^^^  ",
                            " ^^^&^&^^^ ",
                            "^^ ^^^^^ ^^",
                            "^^ ^^^^^ ^^",
                            "^^  ^^^  ^^",
                            " :  ^^^  : ",
                            "     ^     ",
                            "     ^     ",
                            "   ^^^^^   ",
                            "  ::   ::  "
                    ]
                },
                {
                    name: "robot3",
                    def: [
                            "   *****   ",
	                        " ********* ",
	                        "**@@***@@**",
	                        "**@@***@@**",
	                        "***********",
	                        " ********* ",
	                        "  *** ***  ",
	                        " **** **** "
                    ]
                },
                {
                    name: "robot4",
                    def: [
                            "   @   ",
	                        "   +   ",
	                        " @ + @ ",
	                        " + + + ",
	                        " + + + ",
	                        "  !!!  ",
                            " !_!_! ",
	                        "  !!!  ",
	                        " == == ",
	                        " == == ",
	                        "--- ---"
                    ]
                },
                {
                    name: "robot5",
                    def: [
                            "  @@@  ",
                            "  ===  ",
                            " @_@_@ ",
                            ":@@_@@:",
                            ": @@@ :",
                            "  @ @  ",
                            "  @ @  ",
                            " :: :: "
                    ]
                },
                {
                    name: "mario",
                    def: [
                            "      @@@@     ",
                            "     @@@@@@@@  ",
                            "     ----^^    ",
                            "    -^^-^^-^^^ ",
                            "    -^^--^^-^^^",
                            "   ---^^^^---- ",
                            "      ^^^^^^^  ",
                            "    -----@ ^   ",
                            "   ^------^^^  ",
                            "  ^^@@----^^   ",
                            "--@@@@@@@@@@   ",
                            "--@@@@@@@@@@   ",
                            "--@@@@  @@@    ",
                            "-      ---     ",
                            "       ----    "
                    ]
                },
                {
                    name: "fruit1",
                    def: [
                            "   &&      &  ",
                            "   &&&   &&&  ",
                            "    &&& &&&   ",
                            "   :::&&      ",
                            " :::::^::^^^  ",
                            ":::::^^::::^^ ",
                            ":::::^^:::::^^",
                            "::::^^ :::::^^",
                            " ^^^^  :::::^^",
                            "        ::::^^",
                            "          :^^ "
                    ]
                },
                {
                    name: "joust1",
                    def: [
                            "    * :'   '*'  ",
                            "     :''*  '':* ",
                            "     ::    ''   ",
                            "    ::::    '   ",
                            "    '''::'**'**:",
                            "     :::    '   ",
                            " '   ::::   '   ",
                            "'** * ::*  ''   ",
                            "**********'''   ",
                            "***'******''    ",
                            "  *''*****''    ",
                            "  **'''****     ",
                            "   **''''**     ",
                            "    ******      ",
                            "    '***'       ",
                            "   ''' ''       ",
                            "   ''  '        ",
                            "   '   '        ",
                            "   '   '        ",
                            "   '   '        ",
                            "   '   ''       ",
                            "   '    '       ",
                            "   *    '*      "
                    ]
                },
                {
                    name: "qbert",
                    def: [
                            "  ''    ",
                            " ''''   ",
                            "''~'~'  ",
                            "''_'_'  ",
                            "''''''' ",
                            "''''''~'",
                            "''''''~'",
                            " '''' ' ",
                            "  ' '   ",
                            "  ' ''  ",
                            "  '  '' ",
                            "  ''    ",
                            "   ''   "
                    ]
                },
                {
                    name: "frog",
                    def: [
                            " &  :&::  & ",
                            "&& $&::&$ &&",
                            " & &&::&& & ",
                            " &&::::::&& ",
                            "   :&::::   ",
                            " &&:&::::&& ",
                            " & &:&::& & ",
                            "&&  &::&  &&",
                            " &        & "
                    ]
                },
                /*{
                    name: "test-pattern",
                    def: [
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!",
                            "@^:&#*+%=$_.!"
                    ]
                }*/
            ],

            bots: [],

            zIndex: function () {
                return (Math.floor(Math.random() * 10000) + 1);
            },

            charColor: function (char) {
                var chars = drunkbots.bot.chars;
                for (var i = 0; i < chars.length; i++) {
                    if (chars[i].char === char) {
                        return chars[i].color;
                    }
                }
                return drunkbots.bot.errorColor;
            },

            divSize: function (size, sizers) {
                var blank = drunkbots.bot.noColor,
                    sizes = drunkbots.bot.sizes,
                    wh = { w: 0, h: 0 },
                    div;

                switch (size.id) {
                    case sizes.small.id:
                        wh = { w: sizers.small.w, h: sizers.small.h };
                        break;
                    case sizes.medium.id:
                        wh = { w: sizers.medium.w, h: sizers.medium.h };
                        break;
                    default:
                        wh = { w: sizers.large.w, h: sizers.large.h };
                }
                return wh;
            },

            div: function (name, def, size, sizers, pos) {
                var blank = drunkbots.bot.noColor,
                    wh = drunkbots.bot.divSize(size, sizers),
                    div;

                div = "<div id=\"" + name + "\" class=\"sprite\" style=\""
                    + "left: " + pos.x + "px; "
                    + "top: " + pos.y + "px; "
                    + "width: " + sizers.large.w + "px; "
                    + "height: " + sizers.large.h + "px; "
                    + "z-index: " + drunkbots.bot.zIndex() + ";\">";
                for (var i = 0; i < def.length; i++) {
                    div += "<div class=\"clearall\">";
                    for (var j = 0; j < def[i].length; j++) {
                        var bg = def[i].substring(j, j + 1);
                        div += "<div class=\"cell " + size.style + "\"";
                        if (bg !== blank) {
                            div += " style=\"background-color: #" + drunkbots.bot.charColor(bg) + ";\"";
                        }
                        div += "></div>";
                    }
                    div += "</div>";
                }
                div += "</div>";

                return div;
            },

            size: function () {
                var sizer = Math.floor(Math.random() * 3),
                    sizes = drunkbots.bot.sizes;
                return (sizer === sizes.small.id ? sizes.small : (sizer === sizes.medium.id ? sizes.medium : sizes.large));
            },

            direction: function () {
                return Math.floor(Math.random() * 4);
            },

            drunk: function () {
                return Math.floor(Math.random() * drunkbots.bot.drunkMag);
            },

            make: function (name, def) {
                var div = drunkbots.bot.div,
                    dirs = drunkbots.bot.directions,
                    sizes = drunkbots.bot.sizes,
                    size = drunkbots.bot.size(),
                    width = def[0].length,
                    height = def.length,
                    sizers = {
                        small: { w: sizes.small.mag * width, h: sizes.small.mag * height, maxX: 0, maxY: 0 },
                        medium: { w: sizes.medium.mag * width, h: sizes.medium.mag * height, maxX: 0, maxY: 0 },
                        large: { w: sizes.large.mag * width, h: sizes.large.mag * height, maxX: 0, maxY: 0 },
                    },
                    pos = { x: 0, y: 0 };

                sizers.small.maxX = drunkbots.page.dims.width - sizers.small.w;
                sizers.small.maxY = drunkbots.page.dims.height - sizers.small.h;
                sizers.medium.maxX = drunkbots.page.dims.width - sizers.medium.w;
                sizers.medium.maxY = drunkbots.page.dims.height - sizers.medium.h;
                sizers.large.maxX = drunkbots.page.dims.width - sizers.large.w;
                sizers.large.maxY = drunkbots.page.dims.height - sizers.large.h;

                switch (size.id) {
                    case sizes.small.id:
                        pos.x = Math.floor(Math.random() * sizers.small.maxX);
                        pos.y = Math.floor(Math.random() * sizers.small.maxY);
                        break;
                    case sizes.medium.id:
                        pos.x = Math.floor(Math.random() * sizers.medium.maxX);
                        pos.y = Math.floor(Math.random() * sizers.medium.maxY);
                        break;
                    default:
                        pos.x = Math.floor(Math.random() * sizers.large.maxX);
                        pos.y = Math.floor(Math.random() * sizers.large.maxY);
                }

                return {
                    name: name,
                    pos: pos,
                    div: div(name, def, size, sizers, pos),
                    size: size,
                    sizes: sizers,
                    direction: drunkbots.bot.direction(),
                    drunk: drunkbots.bot.drunk()
                };
            },

            move: function () {
                var dirs = drunkbots.bot.directions,
                    dir = drunkbots.bot.direction,
                    drunk = drunkbots.bot.drunk,
                    zIndex = drunkbots.bot.zIndex,
                    zin,
                    bots = drunkbots.bot.bots,
                    bot,
                    speed = 1,
                    bounce;

                for (var i = 0; i < bots.length; i++) {
                    bot = bots[i];
                    bounce = false;

                    switch (bot.direction) {
                        case dirs.left:
                            bot.pos.x -= speed;
                            break;
                        case dirs.right:
                            bot.pos.x += speed;
                            break;
                        case dirs.up:
                            bot.pos.y -= speed;
                            break;
                        default:
                            bot.pos.y += speed;
                    }
                    bot.pos.x = (bot.pos.x < 0 ? 0 : bot.pos.x);
                    bot.pos.y = (bot.pos.y < 0 ? 0 : bot.pos.y);
                    bot.pos.x = (bot.pos.x > bot.sizes.large.maxX ? bot.sizes.large.maxX : bot.pos.x);
                    bot.pos.y = (bot.pos.y > bot.sizes.large.maxY ? bot.sizes.large.maxY : bot.pos.y);

                    if (drunk() >= bot.drunk) {
                        bot.direction = dir();
                        bot.drunk = drunk();
                        /*zin = zIndex();*/
                    }

                    $("#" + bot.name).css({
                        "left": bot.pos.x,
                        "top": bot.pos.y/*,
                        "z-index": zIndex()*/
                    });
                }
            },

            resize: function () {
                var bots = drunkbots.bot.bots,
                    bot,
                    sizer = drunkbots.bot.size,
                    size,
                    rnd = Math.random;

                for (var i = 0; i < bots.length; i++) {
                    if (rnd() >= .9) {
                        bot = bots[i];
                        size = sizer();
                        $("#" + bot.name).find(".cell").removeClass(bot.size.style).addClass(size.style);
                    }
                }
            }

        },

        page: {

            dims: {
                width: 0,
                height: 0
            },

            resize: function () {
                drunkbots.page.dims.width = $(window).width();
                drunkbots.page.dims.height = $(document).height();
            },

            main: function () {
                var defs = drunkbots.bot.defs,
                    bots = drunkbots.bot.bots,
                    bot,
                    make = drunkbots.bot.make,
                    html = "",
                    i;

                for (i = 0; i < defs.length; i++) {
                    bots.push(make(defs[i].name, defs[i].def));
                }

                for (i = 0; i < bots.length; i++) {
                    html += bots[i].div;
                }
                $("#main").html(html);

                setInterval(drunkbots.bot.move, 10);
                setInterval(drunkbots.bot.resize, 1000);
            }

        }

    };

    $(window).resize(function () {
        drunkbots.page.resize();
    });

    $(document).ready(function () {
        drunkbots.page.resize();
        drunkbots.page.main();
    });

})();
