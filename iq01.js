/***********************************************
*                                              *
*   iq01.js                                    *
*   Copyright (c) 2014-2020 IQ01.com           *
*   Developed by Richard Brunson               *
*   rbrunson@iq01.com                          *
*   http://IQ01.com                            *
*                                              *
***********************************************/

var iq01 = {

    prefs: {
        cookieName: "IQ01",
        delimiter: "|",
        parts: {
            themeId: 0,
            showBg: 1,
            animateBg: 2
        },

        set: function (themeId, showBg, animateBg) {
            $.cookie(iq01.prefs.cookieName, themeId + iq01.prefs.delimiter
                + (showBg ? "1" : "0") + iq01.prefs.delimiter
                + (animateBg ? "1" : "0"),
                { expires: 365 });
        },

        get: function () {
            var pref = $.cookie(iq01.prefs.cookieName);
            if (pref === undefined) {
                iq01.prefs.set(0, true, true);
                return { themeId: 0, showBg: true, animateBg: true };
            } else {
                var vals = pref.split(iq01.prefs.delimiter),
                    themeId = vals[iq01.prefs.parts.themeId],
                    showBg = (vals[iq01.prefs.parts.showBg] == "1"),
                    animateBg = (vals[iq01.prefs.parts.animateBg] == "1");
                themeId = (themeId < 0 || themeId > iq01.theme.themes.length - 1 ? 0 : themeId);
                iq01.prefs.set(themeId, showBg, animateBg);
                return { themeId: themeId, showBg: showBg, animateBg: animateBg };
            }
        }
    },

    math: {
        clamp: function (value, min, max) {
            return Math.max(min, Math.min(value, max));
        },

        hex: function (r, g, b) {
            r = r.toString(16);
            r = (r.length === 1 ? "0" : "") + r;
            g = g.toString(16);
            g = (g.length === 1 ? "0" : "") + g;
            b = b.toString(16);
            b = (b.length === 1 ? "0" : "") + b;
            return "#" + r + g + b;
        },

        rgb: function (hex) {
            hex = hex.replace("#", "");
            var r, g, b;
            if (hex.length === 3) {
                r = hex.substr(0, 1);
                r = parseInt(r + "" + r, 16);
                g = hex.substr(1, 1);
                g = parseInt(g + "" + g, 16);
                b = hex.substr(2, 1);
                b = parseInt(b + "" + b, 16);
            } else {
                r = parseInt(hex.substr(0, 2), 16);
                g = parseInt(hex.substr(2, 2), 16);
                b = parseInt(hex.substr(4, 2), 16);
            }
            return { r: r, g: g, b: b };
        },

        gradient: function (startColor, endColor, stepCount) {
            var start = iq01.math.rgb(startColor),
                end = iq01.math.rgb(endColor),
                count = stepCount - 1,
                rStep = (end.r - start.r) / count,
                gStep = (end.g - start.g) / count,
                bStep = (end.b - start.b) / count,
                r, g, b,
                colors = [];
            for (var i = 0; i < stepCount; i++) {
                r = iq01.math.clamp(Math.round(start.r + rStep * i), 0, 255);
                g = iq01.math.clamp(Math.round(start.g + gStep * i), 0, 255);
                b = iq01.math.clamp(Math.round(start.b + bStep * i), 0, 255);
                colors.push(iq01.math.hex(r, g, b));
            }
            return colors;
        }
    },

    theme: {
        index: 0,

        previous: null,
        current: null,

        make: function (themeObject) {
            var firstPartCount = 9,
                lastPartCount = 4,
                temp,
                logoColors = [];

            logoColors.push(themeObject.logoStart);
            temp = iq01.math.gradient(themeObject.logoStart, themeObject.logoMid, firstPartCount);
            for (var i = 0; i < temp.length; i++) {
                logoColors.push(temp[i]);
            }
            logoColors.push(themeObject.logoMid);
            temp = iq01.math.gradient(themeObject.logoMid, themeObject.logoEnd, lastPartCount);
            for (var i = 0; i < temp.length - 1; i++) {
                logoColors.push(temp[i]);
            }
            logoColors.push(themeObject.logoEnd);

            return {
                id: iq01.theme.index++,
                name: themeObject.name,

                bg: themeObject.bg,
                bitColors: [themeObject.bit1, themeObject.bit2, themeObject.bit3],
                logoColors: logoColors,

                headerBg: themeObject.headerBg,
                headerText: themeObject.headerText,

                titleBg: themeObject.titleBg,
                titleText: themeObject.titleText,
                titleOverBg: themeObject.titleOverBg,
                titleOverText: themeObject.titleOverText,

                sectionBg: themeObject.sectionBg,
                sectionText: themeObject.sectionText,
                sectionLink: themeObject.sectionLink,
                sectionHilite: themeObject.sectionHilite
            };
        },

        init: function () {
            iq01.theme.themes = [
                iq01.theme.make({
                    name: "Psychedelic", bg: "#000", bit1: "#90f", bit2: "#0ff", bit3: "#0f0",
                    logoStart: "#fff", logoMid: "#90f", logoEnd: "#306", headerBg: "#0ff", headerText: "#90f",
                    titleBg: "#90f", titleText: "#fff", titleOverBg: "#0f0", titleOverText: "#90f",
                    sectionBg: "#000", sectionText: "#fff", sectionLink: "#0ff", sectionHilite: "#0f0"
                }),
                iq01.theme.make({
                    name: "Miami Vice", bg: "#fff", bit1: "#f9f", bit2: "#9f9", bit3: "#9ff",
                    logoStart: "#fff", logoMid: "#99f", logoEnd: "#9f9", headerBg: "#f9f", headerText: "#fff",
                    titleBg: "#9f9", titleText: "#fff", titleOverBg: "#9ff", titleOverText: "#f9f",
                    sectionBg: "#fff", sectionText: "#f9f", sectionLink: "#0ff", sectionHilite: "#3f3"
                }),
                iq01.theme.make({
                    name: "Vampire", bg: "#600", bit1: "#f00", bit2: "#000", bit3: "#fff",
                    logoStart: "#600", logoMid: "#f00", logoEnd: "#000", headerBg: "#f00", headerText: "#000",
                    titleBg: "#000", titleText: "#f00", titleOverBg: "#f00", titleOverText: "#fff",
                    sectionBg: "#000", sectionText: "#999", sectionLink: "#fff", sectionHilite: "#f00"
                }),
                iq01.theme.make({
                    name: "Stormy Skies", bg: "#333", bit1: "#999", bit2: "#000", bit3: "#003",
                    logoStart: "#ccc", logoMid: "#667", logoEnd: "#002", headerBg: "#223", headerText: "#fff",
                    titleBg: "#000", titleText: "#999", titleOverBg: "#ccf", titleOverText: "#000",
                    sectionBg: "#333", sectionText: "#ccc", sectionLink: "#ccf", sectionHilite: "#99f"
                }),
                iq01.theme.make({
                    name: "Ocean Depths", bg: "#003", bit1: "#045", bit2: "#000", bit3: "#006",
                    logoStart: "#09f", logoMid: "#00c", logoEnd: "#000", headerBg: "#00f", headerText: "#09f",
                    titleBg: "#06f", titleText: "#003", titleOverBg: "#00f", titleOverText: "#fff",
                    sectionBg: "#000", sectionText: "#9cf", sectionLink: "#0cf", sectionHilite: "#fff"
                }),
                iq01.theme.make({
                    name: "Elven Forest", bg: "#030", bit1: "#0f0", bit2: "#000", bit3: "#6f0",
                    logoStart: "#9f0", logoMid: "#090", logoEnd: "#030", headerBg: "#090", headerText: "#0f6",
                    titleBg: "#060", titleText: "#0c0", titleOverBg: "#0f0", titleOverText: "#003",
                    sectionBg: "#020", sectionText: "#0c0", sectionLink: "#0f6", sectionHilite: "#9f0"
                }),
                iq01.theme.make({
                    name: "Bumblebee", bg: "#990", bit1: "#ff0", bit2: "#000", bit3: "#f90",
                    logoStart: "#ff0", logoMid: "#c90", logoEnd: "#330", headerBg: "#ff0", headerText: "#000",
                    titleBg: "#000", titleText: "#c90", titleOverBg: "#ff0", titleOverText: "#000",
                    sectionBg: "#c90", sectionText: "#000", sectionLink: "#930", sectionHilite: "#ff0"
                }),
                iq01.theme.make({
                    name: "Pink Bomb", bg: "#f0f", bit1: "#303", bit2: "#fff", bit3: "#909",
                    logoStart: "#fff", logoMid: "#f6f", logoEnd: "#c0c", headerBg: "#f6f", headerText: "#fff",
                    titleBg: "#f6f", titleText: "#fff", titleOverBg: "#fff", titleOverText: "#f0f",
                    sectionBg: "#f6f", sectionText: "#fff", sectionLink: "#c0c", sectionHilite: "#909"
                }),
                iq01.theme.make({
                    name: "Supergrape", bg: "#90f", bit1: "#306", bit2: "#000", bit3: "#909",
                    logoStart: "#ebf", logoMid: "#90f", logoEnd: "#306", headerBg: "#306", headerText: "#90f",
                    titleBg: "#306", titleText: "#90f", titleOverBg: "#60c", titleOverText: "#fff",
                    sectionBg: "#306", sectionText: "#fff", sectionLink: "#90f", sectionHilite: "#c0f"
                }),
                iq01.theme.make({
                    name: "White Album", bg: "#fff", bit1: "#eee", bit2: "#eee", bit3: "#eee",
                    logoStart: "#fff", logoMid: "#fff", logoEnd: "#eee", headerBg: "#eee", headerText: "#fff",
                    titleBg: "#eee", titleText: "#fff", titleOverBg: "#ddd", titleOverText: "#fff",
                    sectionBg: "#fff", sectionText: "#ccc", sectionLink: "#bbb", sectionHilite: "#999"
                }),
                iq01.theme.make({
                    name: "There's No L In Christmas", bg: "#f00", bit1: "#f00", bit2: "#0f0", bit3: "#fff",
                    logoStart: "#f00", logoMid: "#fff", logoEnd: "#090", headerBg: "#090", headerText: "#fff",
                    titleBg: "#fff", titleText: "#f00", titleOverBg: "#090", titleOverText: "#fff",
                    sectionBg: "#fff", sectionText: "#f00", sectionLink: "#f00", sectionHilite: "#090"
                }),
                iq01.theme.make({
                    name: "Goth Grrrl", bg: "#000", bit1: "#333", bit2: "#600", bit3: "#60c",
                    logoStart: "#c00", logoMid: "#309", logoEnd: "#000", headerBg: "#309", headerText: "#c00",
                    titleBg: "#900", titleText: "#000", titleOverBg: "#309", titleOverText: "#c00",
                    sectionBg: "#000", sectionText: "#c00", sectionLink: "#f00", sectionHilite: "#60c"
                }),
                iq01.theme.make({
                    name: "Americana", bg: "#fff", bit1: "#f00", bit2: "#fff", bit3: "#00f",
                    logoStart: "#fff", logoMid: "#f00", logoEnd: "#00f", headerBg: "#00f", headerText: "#fff",
                    titleBg: "#f00", titleText: "#fff", titleOverBg: "#00f", titleOverText: "#fff",
                    sectionBg: "#fff", sectionText: "#00f", sectionLink: "#00f", sectionHilite: "#f00"
                }),
                iq01.theme.make({
                    name: "Bryce Canyon", bg: "#732", bit1: "#fdc", bit2: "#da8", bit3: "#a53",
                    logoStart: "#fdc", logoMid: "#da8", logoEnd: "#a53", headerBg: "#da8", headerText: "#a53",
                    titleBg: "#a53", titleText: "#da8", titleOverBg: "#fdc", titleOverText: "#a53",
                    sectionBg: "#da8", sectionText: "#a53", sectionLink: "#a53", sectionHilite: "#fdc"
                }),
                iq01.theme.make({
                    name: "Glacier", bg: "#def", bit1: "#9cf", bit2: "#fff", bit3: "#6ff",
                    logoStart: "#fff", logoMid: "#6ff", logoEnd: "#def", headerBg: "#6ff", headerText: "#fff",
                    titleBg: "#fff", titleText: "#9cf", titleOverBg: "#6ff", titleOverText: "#fff",
                    sectionBg: "#fff", sectionText: "#9cf", sectionLink: "#abc", sectionHilite: "#0ff"
                }),
                iq01.theme.make({
                    name: "Creamsicle", bg: "#f90", bit1: "#fc6", bit2: "#ff0", bit3: "#fff",
                    logoStart: "#fc6", logoMid: "#f90", logoEnd: "#fc6", headerBg: "#fc0", headerText: "#f90",
                    titleBg: "#fc6", titleText: "#fff", titleOverBg: "#ff0", titleOverText: "#f90",
                    sectionBg: "#fc6", sectionText: "#f90", sectionLink: "#ff0", sectionHilite: "#fff"
                }),
                iq01.theme.make({
                    name: "Ketchup & Mustard", bg: "#000", bit1: "#f00", bit2: "#f90", bit3: "#ff0",
                    logoStart: "#ff0", logoMid: "#f90", logoEnd: "#900", headerBg: "#900", headerText: "#f90",
                    titleBg: "#900", titleText: "#f90", titleOverBg: "#ff0", titleOverText: "#f00",
                    sectionBg: "#000", sectionText: "#ff0", sectionLink: "#f90", sectionHilite: "#f00"
                }),
                iq01.theme.make({
                    name: "Dolphins Fan", bg: "#089", bit1: "#fff", bit2: "#f73", bit3: "#0cd",
                    logoStart: "#fff", logoMid: "#089", logoEnd: "#f73", headerBg: "#f73", headerText: "#089",
                    titleBg: "#f73", titleText: "#089", titleOverBg: "#fff", titleOverText: "#f73",
                    sectionBg: "#f73", sectionText: "#fff", sectionLink: "#089", sectionHilite: "#0cd"
                }),
                iq01.theme.make({
                    name: "RGB", bg: "#000", bit1: "#f00", bit2: "#0f0", bit3: "#00f",
                    logoStart: "#0f0", logoMid: "#00f", logoEnd: "#f00", headerBg: "#00f", headerText: "#0f0",
                    titleBg: "#f00", titleText: "#000", titleOverBg: "#0f0", titleOverText: "#00f",
                    sectionBg: "#000", sectionText: "#0f0", sectionLink: "#00f", sectionHilite: "#f00"
                }),
                iq01.theme.make({
                    name: "Lemon-Lime", bg: "#ff0", bit1: "#0f0", bit2: "#0f0", bit3: "#0f0",
                    logoStart: "#ff0", logoMid: "#0f0", logoEnd: "#ff0", headerBg: "#0f0", headerText: "#ff0",
                    titleBg: "#0f0", titleText: "#ff0", titleOverBg: "#0c0", titleOverText: "#ff0",
                    sectionBg: "#ff0", sectionText: "#0c0", sectionLink: "#6c0", sectionHilite: "#0f0"
                }),
                iq01.theme.make({
                    name: "Blue Screen Of Death", bg: "#00f", bit1: "#fff", bit2: "#99f", bit3: "#0ff",
                    logoStart: "#fff", logoMid: "#00f", logoEnd: "#0ff", headerBg: "#fff", headerText: "#00f",
                    titleBg: "#fff", titleText: "#00f", titleOverBg: "#0ff", titleOverText: "#00f",
                    sectionBg: "#fff", sectionText: "#00f", sectionLink: "#09c", sectionHilite: "#009"
                }),
                iq01.theme.make({
                    name: "Caramel Latte", bg: "#210", bit1: "#420", bit2: "#960", bit3: "#c80",
                    logoStart: "#c80", logoMid: "#420", logoEnd: "#210", headerBg: "#960", headerText: "#210",
                    titleBg: "#420", titleText: "#960", titleOverBg: "#c80", titleOverText: "#420",
                    sectionBg: "#210", sectionText: "#960", sectionLink: "#630", sectionHilite: "#c80"
                }),
                iq01.theme.make({
                    name: "Turquoise Jewelry", bg: "#399", bit1: "#fff", bit2: "#0ff", bit3: "#066",
                    logoStart: "#ccc", logoMid: "#399", logoEnd: "#066", headerBg: "#066", headerText: "#399",
                    titleBg: "#066", titleText: "#999", titleOverBg: "#0cc", titleOverText: "#fff",
                    sectionBg: "#399", sectionText: "#fff", sectionLink: "#066", sectionHilite: "#0ff"
                }),
                iq01.theme.make({
                    name: "Minty Fresh", bg: "#9f9", bit1: "#fff", bit2: "#0f0", bit3: "#060",
                    logoStart: "#cfc", logoMid: "#0c0", logoEnd: "#090", headerBg: "#3c3", headerText: "#cfc",
                    titleBg: "#060", titleText: "#9f9", titleOverBg: "#0f0", titleOverText: "#060",
                    sectionBg: "#9f9", sectionText: "#090", sectionLink: "#3c3", sectionHilite: "#030"
                }),
                iq01.theme.make({
                    name: "Back In Black", bg: "#000", bit1: "#111", bit2: "#111", bit3: "#111",
                    logoStart: "#000", logoMid: "#000", logoEnd: "#222", headerBg: "#111", headerText: "#222",
                    titleBg: "#111", titleText: "#222", titleOverBg: "#222", titleOverText: "#111",
                    sectionBg: "#000", sectionText: "#333", sectionLink: "#444", sectionHilite: "#666"
                }),
                iq01.theme.make({
                    name: "Cerulean Blue", bg: "#39f", bit1: "#00f", bit2: "#fff", bit3: "#66f",
                    logoStart: "#cff", logoMid: "#39f", logoEnd: "#06c", headerBg: "#06c", headerText: "#cff",
                    titleBg: "#06c", titleText: "#cff", titleOverBg: "#cff", titleOverText: "#06c",
                    sectionBg: "#fff", sectionText: "#06c", sectionLink: "#39f", sectionHilite: "#00f"
                }),
                iq01.theme.make({
                    name: "All Hallow's Eve", bg: "#000", bit1: "#f30", bit2: "#210", bit3: "#f90",
                    logoStart: "#fc0", logoMid: "#f60", logoEnd: "#210", headerBg: "#f60", headerText: "#000",
                    titleBg: "#f60", titleText: "#000", titleOverBg: "#fc0", titleOverText: "#210",
                    sectionBg: "#000", sectionText: "#f60", sectionLink: "#840", sectionHilite: "#fc0"
                }),
                iq01.theme.make({
                    name: "Radioactive Sludge", bg: "#000", bit1: "#0f0", bit2: "#9c0", bit3: "#060",
                    logoStart: "#0f0", logoMid: "#690", logoEnd: "#060", headerBg: "#0f0", headerText: "#060",
                    titleBg: "#690", titleText: "#9c0", titleOverBg: "#0f0", titleOverText: "#060",
                    sectionBg: "#000", sectionText: "#9c0", sectionLink: "#060", sectionHilite: "#0f0"
                }),
                iq01.theme.make({
                    name: "Candy Cane", bg: "#fff", bit1: "#f00", bit2: "#900", bit3: "#ccc",
                    logoStart: "#fff", logoMid: "#f00", logoEnd: "#900", headerBg: "#f00", headerText: "#fff",
                    titleBg: "#900", titleText: "#f00", titleOverBg: "#f00", titleOverText: "#fff",
                    sectionBg: "#fff", sectionText: "#900", sectionLink: "#c66", sectionHilite: "#f00"
                }),
                iq01.theme.make({
                    name: "Austin City Limits (with Wilco & Nick Lowe)", bg: "#000", bit1: "#f0f", bit2: "#00f", bit3: "#f00",
                    logoStart: "#f00", logoMid: "#f0f", logoEnd: "#00f", headerBg: "#f0f", headerText: "#00f",
                    titleBg: "#00f", titleText: "#f0f", titleOverBg: "#f00", titleOverText: "#000",
                    sectionBg: "#000", sectionText: "#00f", sectionLink: "#f00", sectionHilite: "#f0f"
                }),
                iq01.theme.make({
                    name: "Chartreuse Wedding", bg: "#9f0", bit1: "#fff", bit2: "#f0c", bit3: "#cf9",
                    logoStart: "#9f0", logoMid: "#c06", logoEnd: "#fff", headerBg: "#cf9", headerText: "#c06",
                    titleBg: "#cf9", titleText: "#c06", titleOverBg: "#c06", titleOverText: "#fff",
                    sectionBg: "#cf9", sectionText: "#c06", sectionLink: "#390", sectionHilite: "#f0c"
                }),
                iq01.theme.make({
                    name: "Autumn Canopy", bg: "#930", bit1: "#cc0", bit2: "#c60", bit3: "#210",
                    logoStart: "#f90", logoMid: "#210", logoEnd: "#c00", headerBg: "#310", headerText: "#930",
                    titleBg: "#310", titleText: "#960", titleOverBg: "#fc0", titleOverText: "#310",
                    sectionBg: "#620", sectionText: "#c60", sectionLink: "#fc0", sectionHilite: "#ff0"
                }),
                iq01.theme.make({
                    name: "Whatevs", bg: "#000", bit1: "#fff", bit2: "#90f", bit3: "#f90",
                    logoStart: "#f00", logoMid: "#f90", logoEnd: "#ff0", headerBg: "#00f", headerText: "#0f0",
                    titleBg: "#90f", titleText: "#f0f", titleOverBg: "#0ff", titleOverText: "#00f",
                    sectionBg: "#ff0", sectionText: "#60c", sectionLink: "#f00", sectionHilite: "#f0f"
                })
            ];

            for (var i = 0; i < iq01.theme.themes.length; i++) {
                $("footer nav select").append($("<option/>", {
                    value: iq01.theme.themes[i].id,
                    text: iq01.theme.themes[i].name
                }));
            }
        },

        set: function (themeId) {
            iq01.theme.previous = iq01.theme.current;
            iq01.theme.current = iq01.theme.themes[themeId];

            $("footer nav select").val(themeId);

            $("*").css({ "color": iq01.theme.current.sectionText });
            $("html, body, button, input, select, textarea").css({ "color": iq01.theme.current.sectionText });
            $("body").css({ "background-color": iq01.theme.current.bg });

            for (var i = 0; i < iq01.bits.shapes.length; i++) {
                for (var j = 0; j < iq01.theme.current.bitColors.length; j++) {
                    if (iq01.bits.shapes[i].attr("fill") === iq01.theme.previous.bitColors[j]) {
                        iq01.bits.shapes[i].attr({ "fill": iq01.theme.current.bitColors[j] });
                        break;
                    }
                }
                iq01.bits.shapes[i].attr({ "stroke": iq01.theme.current.titleOverBg });
            }
            $(".svg-item").css({ "stroke": iq01.theme.current.titleOverBg });

            iq01.logo.colors = iq01.theme.current.logoColors;
            iq01.logo.draw();

            $("header h2").css({
                "background-color": iq01.theme.current.headerBg,
                "border-color": iq01.theme.current.bg,
                "color": iq01.theme.current.headerText
            });

            $("article h1, footer nav button, footer nav span, footer nav select, footer nav option").css({
                "background-color": iq01.theme.current.titleBg,
                "border-color": iq01.theme.current.bg,
                "color": iq01.theme.current.titleText
            });
            $(".article-active").css({
                "background-color": iq01.theme.current.titleOverBg,
                "border-color": iq01.theme.current.titleOverBg,
                "color": iq01.theme.current.titleOverText
            });
            $("article h1, footer nav button, footer nav select, footer nav option").hover(function () {
                $(this).css({
                    "background-color": iq01.theme.current.titleOverBg,
                    "border-color": iq01.theme.current.titleOverBg,
                    "color": iq01.theme.current.titleOverText
                });
            }, function () {
                if (!$(this).hasClass(iq01.page.sectionActiveClass)) {
                    $(this).css({
                        "background-color": iq01.theme.current.titleBg,
                        "border-color": iq01.theme.current.bg,
                        "color": iq01.theme.current.titleText
                    });
                }
            });
            $("article div").css({
                "background-color": iq01.theme.current.sectionBg,
                "border-color": iq01.theme.current.titleOverBg
            });
            $("article div h2").css({ "color": iq01.theme.current.sectionHilite });

            $("a").css({ "color": iq01.theme.current.sectionLink });
            $("a").hover(function () {
                $(this).css({ "color": iq01.theme.current.sectionHilite });
            }, function () {
                $(this).css({ "color": iq01.theme.current.sectionLink });
            });

            $("strong, .brand, .disclaimer").css({ "color": iq01.theme.current.sectionHilite });

            $("hr").css({ "border-color": iq01.theme.current.sectionLink });

            iq01.prefs.set(themeId, iq01.page.showPageAnimation, iq01.page.showAnimation);
        }
    },

    bits: {
        svg: null,
        count: 25,
        shapes: [],
        size: { min: { w: 60, h: 20 }, max: { w: 400, h: 100 } },
        offset: { x: 0, y: 10 },
        opacity: { factor: .4, min: .1 },
        speed: { min: 4, max: 16, factor: .05 },
        drawTimeout: 10,

        bit: function () {
            var shape = $("#svg-item").clone().appendTo(iq01.bits.svg);
            shape.attr({
                x: Math.random() * iq01.page.size.w + iq01.bits.offset.x,
                y: Math.random() * iq01.page.size.h,
                fill: (Math.random() >= .75 ? "none" : iq01.theme.current.bitColors[Math.floor(Math.random() * iq01.theme.current.bitColors.length)]),
                opacity: Math.random() * iq01.bits.opacity.factor + iq01.bits.opacity.min,
                width: Math.random() * iq01.bits.size.max.w + iq01.bits.size.min.w,
                height: Math.random() * iq01.bits.size.max.h + iq01.bits.size.min.h
            });
            shape.yMin = -(shape.attr("height") + iq01.bits.offset.y);
            shape.speed = (Math.random() * (iq01.bits.speed.max - iq01.bits.speed.min + 1) + iq01.bits.speed.min) * iq01.bits.speed.factor;
            return shape;
        },

        make: function () {
            iq01.bits.offset.x = -iq01.bits.size.max.w / 2;
            for (var i = 0; i < iq01.bits.count; i++) {
                iq01.bits.shapes.push(iq01.bits.bit());
            }
        },

        draw: function () {
            if (iq01.page.showAnimation) {
                for (var i = 0; i < iq01.bits.shapes.length; i++) {
                    var shape = iq01.bits.shapes[i];
                    shape.attr({ "y": shape.attr("y") - shape.speed });
                    if (shape.attr("y") < shape.yMin) {
                        shape = iq01.bits.bit();
                        shape.attr({ "y": iq01.page.size.h + iq01.bits.offset.y });
                        shape.yMin = -(shape.attr("height") + iq01.bits.offset.y);
                        iq01.bits.shapes[i] = shape;
                    }
                }
                setTimeout(function () { iq01.bits.draw(); }, iq01.bits.drawTimeout);
            }
        }
    },

    logo: {
        canvas: null,
        context: null,

        i: { x: 0, yMin: 0, yMax: 0 },
        q: { x: 0, radius: 0, stroke: { size: 240, x: 0, y: 0 } },
        zero: { x: 0, radius: 0 },
        one: { x: 0, yMin: 0, yMax: 0 },

        size: { w: 0, h: 0 },
        center: { x: 0, y: 0 },
        colors: [],
        pen: 1,
        outline: 5,
        circle: 136,
        line: 316,
        lineClipPercent: 2,
        halfHeight: 100,

        draw: function () {
            if (iq01.logo.canvas !== null) {
                var context = iq01.logo.context;
                context.clearRect(0, 0, iq01.logo.canvas.width, iq01.logo.canvas.height);
                context.save();
                context.translate(iq01.logo.center.x, iq01.logo.center.y);
                context.lineCap = "round";
                for (var j = iq01.logo.colors.length; j--;) {
                    context.strokeStyle = iq01.logo.colors[j];
                    context.lineWidth = (j + iq01.logo.pen) * iq01.logo.outline;

                    context.beginPath();
                    context.moveTo(iq01.logo.i.x, iq01.logo.i.yMin);
                    context.lineTo(iq01.logo.i.x, iq01.logo.i.yMax);
                    context.stroke();

                    context.beginPath();
                    context.arc(iq01.logo.q.x, iq01.logo.q.radius, iq01.logo.q.radius, 0, iq01.logo.circle, false);
                    context.stroke();
                    context.beginPath();
                    context.moveTo(iq01.logo.q.x, iq01.logo.q.radius);
                    context.lineTo(iq01.logo.q.x, iq01.logo.q.radius * 2);
                    context.stroke();

                    context.beginPath();
                    context.arc(iq01.logo.zero.x, iq01.logo.zero.radius, iq01.logo.zero.radius, 0, iq01.logo.circle, false);
                    context.stroke();

                    context.beginPath();
                    context.moveTo(iq01.logo.one.x, iq01.logo.one.yMin);
                    context.lineTo(iq01.logo.one.x, iq01.logo.one.yMax);
                    context.stroke();
                }
                context.restore();
            }
        }
    },

    page: {
        size: { w: 0, h: 0 },

        inactives: "article|article div|h2|hr|img|p|span|strong".split("|"),
        sectionActiveClass: "article-active",
        showPageAnimation: true,
        showAnimation: true,

        hideInfo: function () {
            $("article h1").removeClass(iq01.page.sectionActiveClass)
                .css({
                    "background-color": iq01.theme.current.titleBg,
                    "border-color": iq01.theme.current.bg,
                    "color": iq01.theme.current.titleText
                });
            $("article div").hide();
        },

        resize: function () {
            iq01.page.size.w = $(window).width();
            iq01.page.size.h = $(document).height();

            iq01.bits.svg = $("#svg-shape");
            iq01.bits.svg.attr({ "width": iq01.page.size.w, "height": iq01.page.size.h }).show();
        },

        main: function () {
            $("#copyright").html("-" + (new Date).getFullYear());
            iq01.theme.init();

            var prefs = iq01.prefs.get();
            iq01.theme.set(prefs.themeId);
            /*iq01.page.showPageAnimation = prefs.showBg;*/
            /*iq01.page.showAnimation = prefs.animateBg;*/

            iq01.bits.make();
            iq01.bits.draw();

            iq01.logo.canvas = null;
            try {
                iq01.logo.canvas = $("header canvas").get(0);
                iq01.logo.context = iq01.logo.canvas.getContext("2d");
            }
            catch (ex) {
                $("header canvas").css("display", "none");
                $("header img").css("display", "block");
            }
            if (iq01.logo.canvas !== null) {
                iq01.logo.canvas.width = $("header canvas").width();
                iq01.logo.canvas.height = $("header canvas").height();
                iq01.logo.center.x = Math.floor(iq01.logo.canvas.width / 2);
                iq01.logo.center.y = Math.floor(iq01.logo.canvas.height / 6);

                iq01.logo.size.w = iq01.logo.circle * 2;
                iq01.logo.size.h = iq01.logo.halfHeight * 2;

                iq01.logo.i.x = -iq01.logo.line;
                var lineClip = Math.max(1, Math.floor(iq01.logo.size.h * iq01.logo.lineClipPercent / 100));
                iq01.logo.i.yMin = lineClip;
                iq01.logo.i.yMax = iq01.logo.size.h - lineClip;

                iq01.logo.q.x = -iq01.logo.circle;
                iq01.logo.q.radius = iq01.logo.halfHeight;
                iq01.logo.q.stroke.x = iq01.logo.q.x;
                iq01.logo.q.stroke.y = iq01.logo.q.radius;

                iq01.logo.zero.x = iq01.logo.circle;
                iq01.logo.zero.radius = iq01.logo.q.radius;

                iq01.logo.one.x = iq01.logo.line;
                iq01.logo.one.yMin = iq01.logo.i.yMin;
                iq01.logo.one.yMax = iq01.logo.i.yMax;
            }
            iq01.logo.draw();

            $("*").click(function (event) {
                /**/
                var item = $(this);
                switch (true) {

                    case item.is("a"):
                        if (item.attr("href").indexOf("http") === 0) {
                            item.attr("target", "_blank");
                        }
                        break;

                    case item.is("article h1"):
                        if (!item.hasClass(iq01.page.sectionActiveClass)) {
                            iq01.page.hideInfo();
                            item.addClass(iq01.page.sectionActiveClass);
                            item.parent().find("div").show("slow");
                        }
                        break;

                    case item.is("#background-viewer"):
                        $("#svg-shape").toggle();
                        if ($("#svg-shape").is(":visible")) {
                            item.html("Hide Background");
                            $("#background-animation").show();
                            iq01.page.showAnimation = iq01.page.showPageAnimation;
                            iq01.prefs.set(iq01.theme.current.id, iq01.page.showPageAnimation, iq01.page.showAnimation);
                            iq01.bits.draw();
                        } else {
                            iq01.page.showPageAnimation = iq01.page.showAnimation;
                            iq01.page.showAnimation = false;
                            item.html("Show Background");
                            $("#background-animation").hide();
                            iq01.prefs.set(iq01.theme.current.id, iq01.page.showPageAnimation, iq01.page.showAnimation);
                        }
                        break;

                    case item.is("#background-animation"):
                        iq01.page.showAnimation = !iq01.page.showAnimation;
                        item.html((iq01.page.showAnimation ? "Stop" : "Start") + " Background Animation");
                        iq01.prefs.set(iq01.theme.current.id, iq01.page.showPageAnimation, iq01.page.showAnimation);
                        iq01.bits.draw();
                        break;

                    case item.is("#theme-select"):
                        break;

                    default:
                        var doHideInfo = true;
                        for (var i = 0; i < iq01.page.inactives.length; i++) {
                            if (item.is(iq01.page.inactives[i])) {
                                doHideInfo = false;
                                break;
                            }
                        }
                        if (doHideInfo) {
                            iq01.page.hideInfo();
                        }
                }
                event.stopPropagation();

                if (item.hasClass(iq01.page.sectionActiveClass)) {
                    item.css({
                        "background-color": iq01.theme.current.titleOverBg,
                        "border-color": iq01.theme.current.titleOverBg,
                        "color": iq01.theme.current.titleOverText
                    });
                }
                /**/
            });

            $("#theme-select").change(function (event) {
                iq01.theme.set($(this).val());
            });
        }
    }
};

$(window).resize(function () {
    iq01.page.resize();
});

$(document).ready(function () {
    iq01.page.resize();
    iq01.page.main();
});
