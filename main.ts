function ShowImage (texte: string) {
    leds = texte.split(" ")
    ledsBin = [
    1,
    2,
    4,
    8,
    16
    ]
    for (let y = 0; y <= 4; y++) {
        val = parseInt(leds[y])
        for (let x = 0; x <= 4; x++) {
            if (val & ledsBin[x]) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
}
input.onSound(DetectedSound.Loud, function () {
    serial.writeLine("c" + " " + input.soundLevel())
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readUntil(serial.delimiters(Delimiters.SemiColon))
    param = serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))
    readData(command, param)
    command = serial.readUntil(serial.delimiters(Delimiters.NewLine))
})
function sendUsbData () {
    serial.writeLine("a" + " " + input.acceleration(Dimension.X) + " " + input.acceleration(Dimension.Y) + " " + input.acceleration(Dimension.Z) + " " + input.acceleration(Dimension.Strength))
    serial.writeLine("r" + " " + input.rotation(Rotation.Pitch) + " " + input.compassHeading() + " " + input.rotation(Rotation.Roll))
    serial.writeLine("s" + " " + input.temperature() + " " + input.lightLevel() + " " + input.soundLevel())
    serial.writeLine("p" + " " + ((p0) ? 0 : pins.digitalReadPin(DigitalPin.P0)) + " " + ((p1) ? 0 : pins.digitalReadPin(DigitalPin.P1)) + " " + ((p2) ? 0 : pins.digitalReadPin(DigitalPin.P2)))
    if (input.buttonIsPressed(Button.A)) {
        serial.writeValue("b.A", 1)
    } else {
        serial.writeValue("b.A", 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        serial.writeValue("b.B", 1)
    } else {
        serial.writeValue("b.B", 0)
    }
    if (input.logoIsPressed()) {
        serial.writeValue("b.L", 1)
    } else {
        serial.writeValue("b.L", 0)
    }
    if (input.isGesture(Gesture.Shake)) {
        serial.writeValue("shake", 1)
    } else {
        serial.writeValue("shake", 0)
    }
    if (input.isGesture(Gesture.LogoUp)) {
        serial.writeValue("d.x", 1)
    } else {
        if (input.isGesture(Gesture.LogoDown)) {
            serial.writeValue("d.x", -1)
        } else {
            serial.writeValue("d.x", 0)
        }
    }
    if (input.isGesture(Gesture.TiltLeft)) {
        serial.writeValue("d.y", -1)
    } else {
        if (input.isGesture(Gesture.TiltRight)) {
            serial.writeValue("d.y", 1)
        } else {
            serial.writeValue("d.y", 0)
        }
    }
}
function readData (command: string, param: string) {
    if ("w" == command) {
        basic.showString(param)
    } else if ("l" == command) {
        ShowImage(param)
    } else if ("b" == command) {
        music.playTone(parseFloat(param), music.beat(BeatFraction.Whole))
    } else if ("m" == command) {
        mval = parseFloat(param)
        if (mval == 0) {
            music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        } else if (mval == 1) {
            music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
        } else if (mval == 2) {
            music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
        } else if (mval == 3) {
            music.startMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once)
        } else if (mval == 4) {
            music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
        } else if (mval == 5) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        } else if (mval == 6) {
            music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
        } else if (mval == 7) {
            music.startMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once)
        } else if (mval == 8) {
            music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once)
        } else if (mval == 9) {
            music.startMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once)
        } else if (mval == 10) {
            music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        } else if (mval == 11) {
            music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
        } else if (mval == 12) {
            music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
        } else if (mval == 13) {
            music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once)
        } else if (mval == 14) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        } else if (mval == 15) {
            music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
        } else if (mval == 16) {
            music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
        } else if (mval == 17) {
            music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
        } else if (mval == 18) {
            music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        } else if (mval == 19) {
            music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
        }
    } else if ("h" == command) {
        serial.writeLine("microbit")
        music.playTone(440, music.beat(BeatFraction.Half))
    } else if ("p0" == command) {
        p0 = 1
        pins.digitalWritePin(DigitalPin.P0, parseFloat(param))
    } else if ("p1" == command) {
        p1 = 1
        pins.digitalWritePin(DigitalPin.P1, parseFloat(param))
    } else if ("p2" == command) {
        p2 = 1
        pins.digitalWritePin(DigitalPin.P2, parseFloat(param))
    }
}
let mval = 0
let param = ""
let command = ""
let leds: string[] = []
let p0 = 0
let p1 = 0
let p2 = 0
let ledsBin: number[] = []
let val = 0
input.setAccelerometerRange(AcceleratorRange.TwoG)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
p0 = 0
p1 = 0
p2 = 0
serial.writeLine("Started")
basic.showString("OS3D")
music.playTone(440, music.beat(BeatFraction.Half))
music.playTone(880, music.beat(BeatFraction.Half))
// ShowImage("0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0")
basic.forever(function () {
    sendUsbData()
    basic.pause(33)
})
