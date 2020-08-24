<?php
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Chakra</title>
    <style type="text/css">
        *
        {
            color: #fff;
            font-family: Sans-Serif;
            font-size: 12px;
        }
        body
        {
            background-color: #000;
            margin: 0;
        }
        #Canvas
        {
			border: none;
            position: absolute;
            left: 0;
            top: 0;
        }
        #Help
        {
            background-color: #90f;
            border: solid 2px #f90;
            border-radius: 24px;
            color: #fff;
            padding: 12px;
            position: absolute;
            left: 16px;
            top: 16px;
            width: 280px;
            opacity: 0.85;
            filter: alpha(opacity=85);
            -moz-opacity: 0.85;
            filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=85);
            -khtml-opacity: 0.85;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=85)";
        }
        #Chakra
        {
            color: #0ff;
            font-size: 56px;
            font-weight: bold;
            letter-spacing: -2px;
        }
        .RB
        {
            background-color: #f90;
            border-radius: 4px;
            color: #90f;
            font-weight: bold;
            margin-bottom: 2px;
            padding: 1px 10px 1px 1px;
            text-align: right;
        }
        .section
        {
            border-bottom: solid 1px #f90;
            clear: both;
            height: 16px;
        }
        .sectionBig
        {
            height: 40px;
        }
        .label
        {
            float: left;
            width: 78px;
        }
        .labelLong
        {
            width: 150px;
        }
        .setting
        {
            border: 0;
            color: #0ff;
            float: left;
            font-weight: bold;
        }
        .slider
        {
            float: right;
            margin: 2px 9px 0 0;
            width: 100px;
        }
        .button
        {
            clear: both;
            color: #90f;
            float: right;
            font-size: 12px;
            font-weight: bold;
            margin-right: 8px;
            width: 104px;
        }
        .buttonHi
        {
            color: #90f;
            float: right;
            font-size: 12px;
            font-weight: bold;
            margin: -2px 8px 0 0;
            width: 104px;
        }
        .checkbox
        {
            float: right;
            font-size: 12px;
            line-height: 6px;
            margin-bottom: -2px;
            width: 114px;
        }
        .hr
        {
            clear: both;
            height: 12px;
        }
        .spacer
        {
            height: 6px;
        }
        td
        {
            font-size: 10px;
        }
        .tdBig
        {
            color: #0ff;
            font-weight: bold;
            padding-right: 6px;
        }
        .tdGap
        {
            width: 20px;
        }
        #CantRun
        {
            background-color: #00f;
            color: #fff;
            font-family: Sans-Serif;
            font-size: 24px;
            position: absolute;
            padding: 48px;
            left: 0;
            top: 0;
            width: 100%;
        }
    </style>
    <link type="text/css" rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/themes/base/jquery-ui.css"
        media="all" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/jquery-ui.min.js"></script>
</head>
<body>
    <canvas id="Canvas"></canvas>
    <div id="Help" style="display: none;">
        <div id="Chakra">
            Chakra
        </div>
        <div class="RB">
            by Richard Brunson
        </div>
        <div>
            <div class="section">
                <div class="label labelLong">
                    Random Chakra
                </div>
                <button id="NewChakraControl" class="buttonHi">
                    Generate
                </button>
            </div>
            <div class="section sectionBig">
                <div class="label">
                    Petals
                </div>
                <div id="PetalsSetting" class="setting">
                </div>
                <div id="PetalsControl" class="slider">
                </div>
                <button id="PetalsRedraw" class="button">
                    Redraw
                </button>
            </div>
            <div class="section sectionBig">
                <div class="label">
                    Colors
                </div>
                <div id="LockColorsSetting" class="setting">
                </div>
                <div class="checkbox">
                    <input id="LockColorsControl" type="checkbox" />Lock
                </div>
                <button id="ColorsRedraw" class="button">
                    Randomize
                </button>
            </div>
            <div class="section">
                <div class="label">
                    Line Width
                </div>
                <div id="LineWidthSetting" class="setting">
                </div>
                <div id="LineWidthControl" class="slider">
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Line Cap
                </div>
                <div id="LineCapSetting" class="setting">
                </div>
                <div id="LineCapControl" class="slider">
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Line Join
                </div>
                <div id="LineJoinSetting" class="setting">
                </div>
                <div id="LineJoinControl" class="slider">
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Mode
                </div>
                <div id="DrawModeSetting" class="setting">
                </div>
                <div id="DrawModeControl" class="slider">
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Tracers
                </div>
                <div id="TracersSetting" class="setting">
                </div>
                <div class="checkbox">
                    <input id="TracersControl" type="checkbox" />Show
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Trails
                </div>
                <div id="TrailsSetting" class="setting">
                </div>
                <div class="checkbox">
                    <input id="TrailsControl" type="checkbox" />Show
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Opacity
                </div>
                <div id="OpacitySetting" class="setting">
                </div>
                <div id="OpacityControl" class="slider">
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Speed
                </div>
                <div id="DrawSpeedSetting" class="setting">
                </div>
                <div id="DrawSpeedControl" class="slider">
                </div>
            </div>
            <div class="section">
                <div class="label">
                    Rotation
                </div>
                <div id="RotationSetting" class="setting">
                </div>
                <div class="checkbox">
                    <input id="RotationControl" type="checkbox" />Clockwise
                </div>
            </div>
        </div>
        <div class="hr">
        </div>
        <div class="RB">
            Key Commands
        </div>
        <div>
            Use these keys when this panel is closed.
            <div class="spacer">
            </div>
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="tdBig">
                        Space / Click
                    </td>
                    <td>
                        Generate a new, random chakra
                    </td>
                </tr>
            </table>
            <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td class="tdBig">
                        C
                    </td>
                    <td>
                        Change colors
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        L
                    </td>
                    <td>
                        Lock or unlock colors
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        2
                    </td>
                    <td>
                        Draw 2 petals
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        3
                    </td>
                    <td>
                        Draw 3 petals
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        4
                    </td>
                    <td>
                        Draw 4 petals
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        5
                    </td>
                    <td>
                        Draw 5 petals
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        6
                    </td>
                    <td>
                        Draw 6 petals
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        7
                    </td>
                    <td>
                        Draw 7 petals
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        8
                    </td>
                    <td>
                        Draw 8 petals
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        9
                    </td>
                    <td>
                        Draw 9 petals
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        0
                    </td>
                    <td>
                        Draw 10 petals
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        1
                    </td>
                    <td>
                        Draw 11 petals
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        A
                    </td>
                    <td>
                        Draw 12 petals
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        B
                    </td>
                    <td>
                        Draw 13 petals
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        M
                    </td>
                    <td>
                        Cycle drawing mode
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        R
                    </td>
                    <td>
                        Change rotation
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        T
                    </td>
                    <td>
                        Toggle tracers
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        Y
                    </td>
                    <td>
                        Toggle trails
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        Up
                    </td>
                    <td>
                        Increase draw speed
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        Down
                    </td>
                    <td>
                        Decrease draw speed
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        Left
                    </td>
                    <td>
                        Minimize draw speed
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        Right
                    </td>
                    <td>
                        Maximize draw speed
                    </td>
                </tr>
                <tr>
                    <td class="tdBig">
                        F11
                    </td>
                    <td>
                        Toggle full screen
                    </td>
                    <td class="tdGap">
                    </td>
                    <td class="tdBig">
                        ?
                    </td>
                    <td>
                        Toggle this panel
                    </td>
                </tr>
            </table>
        </div>
        <div class="hr">
        </div>
        <div>
            <button id="CloseControl" class="buttonHi">
                Close
            </button>
        </div>
    </div>
    <div id="CantRun" style="display: none;">
        This application cannot run in this browser / version.
        <br />
        Chakra requires a browser that supports the Canvas element.
    </div>
    <script type="text/javascript">

        var Circle = 2 * Math.PI, DegreesToRadians = Math.PI / 180;
        var Page, Canvas, Context, Help, ShowHelpScreen;
        var SizeX, SizeY, SizeMax, CenterX, CenterY;
        var ShapeTypes = { Rectangle: 0, Arc: 1, Blob: 2, Polygon: 3 };
        var ShapeTypesCount = ShapeTypes.Polygon, Spins = [], Shapes;
        var Composition, Alpha, Fill, Stroke, Layer;
        var PetalsSetting, PetalsControl, PetalsRedraw, PetalsDefault, PetalsCount;
        var OpacitySetting, OpacityControl, OpacityDefault;
        var LineWidthSetting, LineWidthControl, LineWidthMin, LineWidthMax, LineWidthDefault, LineWidth;
        var LockColorsSetting, LockColorsControl, LockColorsSet, ColorsRedraw;
        var RotationControl, Rotation, Rotate, RotateAmount, Bounce, BounceAmount;
        var LineCapSetting, LineCapControl, LineCaps = ["Round", "Square", "Butt"], LineCap;
        var LineJoinSetting, LineJoinControl, LineJoins = ["Round", "Bevel", "Miter"], LineJoin;
        var Modes = ["Lighter", "Source-Out", "Darker", "Xor", "Copy", "Destination-Atop"], Mode = 0;
        var TracersSetting, TracersControl, TracerCount, ShowTracers;
        var TrailsSetting, TrailsControl, ShowTrails;
        var DrawSpeedSetting, DrawSpeedControl, Delay, DelayMax;

        function Draw() {
            var context = Context, spins = Spins, shapes = Shapes;
            var tracerCount = TracerCount, showTracers = ShowTracers;
            var rotation = Rotation, shapeTypes = ShapeTypes;
            var bounce, rotate, s, p, pl, layer, i, j;

            if (!ShowTrails) {
                context.clearRect(0, 0, SizeX, SizeY);
            }

            context.save();
            context.translate(CenterX, CenterY);
            context.rotate(Rotation * Spins[Bounce].Radians);
            bounce = Spins[Bounce].Sin * BounceAmount;
            rotate = Rotation * Spins[Rotate].Radians;

            for (layer = (showTracers ? tracerCount : 1); layer--; ) {
                for (i = shapes[layer].length; i--; ) {
                    context.save();

                    s = shapes[layer][i];
                    context.rotate(rotation * s.Angle);
                    context.translate(bounce * s.OffsetX, bounce * s.OffsetY);
                    context.rotate(rotate);

                    context.beginPath();
                    switch (s.Type) {
                        case shapeTypes.Arc:
                            context.arc(0, 0, s.Width, 0, s.ArcAngle, true);
                            break;
                        case shapeTypes.Blob:
                            p = s.Points;
                            pl = p.length;
                            context.moveTo(p[4], p[5]);
                            for (j = pl; j-- >= 6; ) {
                                context.bezierCurveTo(p[j--], p[j--], p[j--], p[j--], p[j--], p[j--]);
                            }
                            break;
                        case shapeTypes.Polygon:
                            p = s.Points;
                            pl = p.length;
                            context.moveTo(p[0], p[1]);
                            for (j = pl; j-- >= 2; ) {
                                context.lineTo(p[j--], p[j--]);
                            }
                            break;
                        default:
                            context.fillRect(0, 0, s.Width, s.Height);
                            context.strokeRect(0, 0, s.Width, s.Height);
                            break;
                    }

                    if (s.ClosePath) {
                        context.closePath();
                    }
                    context.stroke();
                    context.fill();

                    context.restore();
                }
            }
            context.restore();

            if (Bounce++ >= 360) {
                Bounce = 0;
            }
            Rotate += RotateAmount;
            if (Rotate >= 360) {
                Rotate -= 360;
            }

            setTimeout(Draw, Delay);
        }

        function Rnd2(min, max) {
            var math = Math;
            return math.floor((max - min + 1) * math.random() + min);
        }

        function Rnd(max) {
            return Rnd2(0, max);
        }

        function Bit() {
            return Rnd(1) == 0;
        }

        function RandomColor() {
            var rnd = Rnd;
            return "#" + rnd(15).toString(16) + rnd(15).toString(16) + rnd(15).toString(16);
        }

        function RandomGradient() {
            var rnd2 = Rnd2, rnd = Rnd, randomColor = RandomColor;
            var gradient = (Bit()
                ? Context.createLinearGradient(0, 0, rnd2(CenterX, SizeX), rnd2(CenterY, SizeY))
                : Context.createRadialGradient(CenterX, CenterY, 0, CenterX, CenterY, rnd(SizeMax)));
            if (Bit()) {
                gradient.addColorStop(0, randomColor());
            }
            var stops = rnd2(1, 3);
            var stop = 1 / (stops + 1);
            for (var i = 0; i < stops; i++) {
                gradient.addColorStop(stop * (i + 1) + rnd2(-10, 10) / 100, randomColor());
            }
            if (Bit()) {
                gradient.addColorStop(1, randomColor());
            }
            return gradient;
        }

        function UpdateSettings() {
            var lineCap = LineCaps[LineCap], lineJoin = LineJoins[LineJoin];
            Context.globalCompositeOperation = Composition.toLowerCase();
            Context.globalAlpha = Alpha / 100;
            Context.lineWidth = LineWidth;
            Context.lineCap = lineCap.toLowerCase();
            Context.lineJoin = lineJoin.toLowerCase();
            Context.strokeStyle = Stroke;
            Context.fillStyle = Fill;

            var lc = LockColorsSet, c = "checked", r = (Rotation == 1), d = DelayMax - Delay;
            var tracers = ShowTracers, trails = ShowTrails;
            PetalsSetting.html(PetalsCount);
            PetalsControl.slider({ value: PetalsCount });
            OpacitySetting.html(Alpha + "%");
            OpacityControl.slider({ value: Alpha });
            LineWidthSetting.html(LineWidth);
            LineWidthControl.slider({ value: LineWidth });
            LockColorsSetting.html((lc ? "Locked" : ""));
            LockColorsControl.attr(c, lc);
            RotationSetting.html((r ? "Forward" : "Backward"));
            RotationControl.attr(c, (r ? true : false));
            LineCapSetting.html(lineCap);
            LineCapControl.slider({ value: LineCap });
            LineJoinSetting.html(lineJoin);
            LineJoinControl.slider({ value: LineJoin });
            DrawModeSetting.html((Composition.indexOf("Dest") > -1 ? "Dest'n-Atop" : Composition));
            DrawModeControl.slider({ value: Mode });
            TracersSetting.html((tracers ? "On" : ""));
            TracersControl.attr(c, (tracers ? true : false));
            TrailsSetting.html((trails ? "On" : ""));
            TrailsControl.attr(c, (trails ? true : false));
            DrawSpeedSetting.html((Delay ? (Delay == DelayMax ? "Minimum" : (Math.floor(d * 100 / DelayMax) + "%")) : "Maximum"));
            DrawSpeedControl.slider({ value: d });
        }

        function ChangeColors() {
            Page.css("background-color", RandomColor());
            Stroke = RandomGradient();
            Context.strokeStyle = Stroke;
            Fill = RandomGradient();
            Context.fillStyle = Fill;
        }

        function CycleMode() {
            if (Mode++ >= Modes.length - 1) {
                Mode = 0;
            }
            Composition = Modes[Mode];
            Context.globalCompositeOperation = Composition.toLowerCase();
        }

        function ChangeDelay(increase) {
            var math = Math;
            Delay = math.min(math.max(0, Delay + (increase ? -1 : 1) * 10), DelayMax);
        }

        function ShowHelp() {
            Help.css("display", (ShowHelpScreen ? "block" : "none"));
        }

        function Reset() {
            Mode = 0;
            Composition = Modes[Mode];
            Alpha = 50;
            LineWidth = 12;
            LineCap = 0;
            LineJoin = 0;
            ShowTracers = false;
            ShowTrails = false;
            Delay = 0;
            DelayMax = 500;
        }

        function Shape(type, x, y, width, height, angle, arcAngle, radius, points, closePath) {
            return {
                Type: type,
                X: x, Y: y,
                Width: width, Height: height,
                OffsetX: -width / 2,
                OffsetY: -height / 2,
                Angle: angle,
                ArcAngle: arcAngle,
                Radius: radius,
                Points: points,
                ClosePath: closePath
            };
        }

        function MakeShapes(count, useNewShape) {
            count = (count === undefined ? Rnd2(2, 13) : count);
            useNewShape = (useNewShape === undefined ? true : useNewShape);
            PetalsCount = count;

            var badBounce = .5, shape, type, pc, i, j, a;
            var angle = Circle / count, maxSize = Math.min(SizeX, SizeY);
            var minSize = Math.max(Math.floor(maxSize / 10), 50);
            var radiusMax = Math.floor(maxSize / 2);
            var polyMax = radiusMax, blobMax = radiusMax;
            var radius = Rnd2(-radiusMax, radiusMax);
            var width = Rnd2(minSize, maxSize), height = Rnd2(minSize, maxSize);
            var arcAngle = 0, points = [], closePath = Bit();

            Reset();
            if (!LockColorsSet) {
                ChangeColors();
            }

            LineWidth = Rnd2(LineWidthMin, LineWidthMax) * 2;
            Context.lineWidth = LineWidth;
            LineCap = Rnd(LineCaps.length - 1);
            Context.lineCap = LineCaps[LineCap].toLowerCase();
            LineJoin = Rnd(LineJoins.length - 1);
            Context.lineJoin = LineJoins[LineJoin].toLowerCase();
            RotateAmount = Rnd2(1, 4);

            if (useNewShape || !Shapes.length) {
                Shapes = [];
                type = Rnd(ShapeTypesCount);

                do {
                    BounceAmount = Rnd2(-100, 100) / 100;
                } while (BounceAmount >= -badBounce && BounceAmount <= badBounce);

                switch (type) {
                    case ShapeTypes.Arc:
                        arcAngle = Rnd2(45, 360) * DegreesToRadians;
                        break;
                    case ShapeTypes.Blob:
                        pc = Rnd2(3, 12);
                        for (i = 0; i < pc; i++) {
                            for (j = 0; j < 6; j++) {
                                points.push(Rnd2(-blobMax, blobMax));
                            }
                        }
                        break;
                    case ShapeTypes.Polygon:
                        pc = Rnd2(6, 18);
                        for (i = 0; i < pc; i++) {
                            for (j = 0; j < 2; j++) {
                                points.push(Rnd2(-polyMax, polyMax));
                            }
                        }
                        break;
                    default:
                        break;
                }
            } else {
                shape = Shapes[0][0];
                type = shape.Type;
                width = shape.Width;
                height = shape.Height;
                arcAngle = shape.ArcAngle;
                radius = shape.Radius;
                points = shape.Points;
                closePath = shape.ClosePath;
            }

            for (i = 0; i < TracerCount; i++) {
                Shapes[i] = [];
                for (j = 0; j < count; j++) {
                    a = angle * j + 3 * i * DegreesToRadians;
                    Shapes[i][j] = new Shape(type, CenterX + Math.sin(a) * radius, CenterY - Math.cos(a) * radius,
                        width, height, a, arcAngle, radius, points, closePath);
                }
            }

            UpdateSettings();
        }

        function Click(e) {
            if (ShowHelpScreen) {
                return;
            }
            MakeShapes();
        }

        function KeyDown(e) {
            var k = e.keyCode;

            if (ShowHelpScreen) {
                if (k == 191) { // forward slash / question mark
                    ShowHelpScreen = !ShowHelpScreen;
                    ShowHelp();
                }
                return;
            }

            switch (true) {
                case (k >= 50 && k <= 57): // 2-9
                    MakeShapes(k - 48);
                    break;
                case (k >= 98 && k <= 105): // keypad 2-9
                    MakeShapes(k - 96);
                    break;
                default:
                    switch (k) {
                        case 32: // space
                            MakeShapes();
                            break;
                        case 37: // left arrow
                            Delay = DelayMax;
                            break;
                        case 38: // up arrow
                            ChangeDelay(true);
                            break;
                        case 39: // right arrow
                            Delay = 0;
                            break;
                        case 40: // down arrow
                            ChangeDelay(false);
                            break;
                        case 48: // 0
                        case 49: // 1
                            MakeShapes(k - 38);
                            break;
                        case 65: // a
                        case 66: // b
                            MakeShapes(k - 53);
                            break;
                        case 67: // c
                            ChangeColors();
                            break;
                        case 76: // l
                            LockColorsSet = !LockColorsSet;
                            break;
                        case 77: // m
                            CycleMode();
                            break;
                        case 82: // r
                            Rotation *= -1;
                            break;
                        case 84: // t
                            ShowTracers = !ShowTracers;
                            break;
                        case 89: // y
                            ShowTrails = !ShowTrails;
                            break;
                        case 96: // keypad 0
                        case 97: // keypad 1
                            MakeShapes(k - 86);
                            break;
                        case 191: // forward slash / question mark
                            ShowHelpScreen = !ShowHelpScreen;
                            ShowHelp();
                            break;
                        default:
                            break;
                    }
                    break;
            }

            UpdateSettings();
        }

        function Resize() {
            Canvas.width = $(window).width();
            Canvas.height = $(window).height();
            SizeX = Canvas.width;
            SizeY = Canvas.height;
            SizeMax = Math.max(SizeX, SizeY);
            CenterX = Math.floor(SizeX / 2);
            CenterY = Math.floor(SizeY / 2);
            UpdateSettings();
        }

        function Spin(angle) {
            var r = angle * DegreesToRadians;
            return { Radians: r, Sin: Math.sin(r) };
        }

        function Main() {
            try {
                Canvas = $("#Canvas").get(0);
                Context = Canvas.getContext("2d");
            }
            catch (ex) {
                $("#CantRun").css("display", "block");
                return;
            }

            Page = $("body");
            Help = $("#Help");

            Reset();
            for (var i = 0; i <= 360; i++) {
                Spins[i] = new Spin(i);
            }
            ShowHelpScreen = true;
            Context.miterLimit = 10;
            Rotation = 1;
            Rotate = 0;
            RotateAmount = 1;
            Bounce = 0;
            BounceAmount = 1;
            TracerCount = 4;
            Shapes = [];

            $("#NewChakraControl").click(function () {
                MakeShapes();
            });

            PetalsSetting = $("#PetalsSetting");
            PetalsControl = $("#PetalsControl");
            PetalsDefault = 6;
            PetalsControl.slider({
                min: 2, max: 13, step: 1, value: PetalsDefault,
                slide: function (event, ui) {
                    PetalsCount = ui.value;
                    UpdateSettings();
                }
            });
            PetalsRedraw = $("#PetalsRedraw");
            PetalsRedraw.click(function () {
                MakeShapes(PetalsCount, false);
            });

            OpacitySetting = $("#OpacitySetting");
            OpacityControl = $("#OpacityControl");
            OpacityDefault = 50;
            OpacityControl.slider({
                min: 25, max: 95, step: 5, value: OpacityDefault,
                slide: function (event, ui) {
                    Alpha = ui.value;
                    UpdateSettings();
                }
            });

            LineWidthSetting = $("#LineWidthSetting");
            LineWidthControl = $("#LineWidthControl");
            LineWidthMin = 1;
            LineWidthMax = 100;
            LineWidthDefault = 12;
            LineWidthControl.slider({
                min: LineWidthMin * 2, max: LineWidthMax * 2, step: 2, value: LineWidthDefault,
                slide: function (event, ui) {
                    LineWidth = ui.value;
                    UpdateSettings();
                }
            });

            LockColorsSetting = $("#LockColorsSetting");
            LockColorsControl = $("#LockColorsControl");
            LockColorsControl.click(function () {
                LockColorsSet = LockColorsControl.attr("checked");
                UpdateSettings();
            });
            ColorsRedraw = $("#ColorsRedraw");
            ColorsRedraw.click(function () {
                if (!LockColorsSet) {
                    ChangeColors();
                }
                UpdateSettings();
            });

            RotationSetting = $("#RotationSetting");
            RotationControl = $("#RotationControl");
            RotationControl.click(function () {
                Rotation = (RotationControl.attr("checked") ? 1 : -1);
                UpdateSettings();
            });

            LineCapSetting = $("#LineCapSetting");
            LineCapControl = $("#LineCapControl");
            LineCapControl.slider({
                min: 0, max: LineCaps.length - 1, step: 1, value: 0,
                slide: function (event, ui) {
                    LineCap = ui.value;
                    UpdateSettings();
                }
            });

            LineJoinSetting = $("#LineJoinSetting");
            LineJoinControl = $("#LineJoinControl");
            LineJoinControl.slider({
                min: 0, max: LineJoins.length - 1, step: 1, value: 0,
                slide: function (event, ui) {
                    LineJoin = ui.value;
                    UpdateSettings();
                }
            });

            DrawModeSetting = $("#DrawModeSetting");
            DrawModeControl = $("#DrawModeControl");
            DrawModeControl.slider({
                min: 0, max: Modes.length - 1, step: 1, value: 0,
                slide: function (event, ui) {
                    Mode = ui.value;
                    Composition = Modes[Mode];
                    UpdateSettings();
                }
            });

            TracersSetting = $("#TracersSetting");
            TracersControl = $("#TracersControl");
            TracersControl.click(function () {
                ShowTracers = TracersControl.attr("checked");
                UpdateSettings();
            });

            TrailsSetting = $("#TrailsSetting");
            TrailsControl = $("#TrailsControl");
            TrailsControl.click(function () {
                ShowTrails = TrailsControl.attr("checked");
                UpdateSettings();
            });

            DrawSpeedSetting = $("#DrawSpeedSetting");
            DrawSpeedControl = $("#DrawSpeedControl");
            DrawSpeedControl.slider({
                min: 0, max: DelayMax, step: 10, value: 0,
                slide: function (event, ui) {
                    Delay = DelayMax - ui.value;
                    UpdateSettings();
                }
            });

            $("#CloseControl").click(function () {
                ShowHelpScreen = false;
                ShowHelp();
                return false; // cancel further click events
            });

            $(document).click(Click);
            $(document).keydown(KeyDown);
            $(window).resize(Resize);

            Resize();
            ChangeColors();
            MakeShapes();
            ShowHelp();
            Draw();
        }

        $(document).ready(Main);

    </script>
</body>
</html>
