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
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = serial.readUntil(serial.delimiters(Delimiters.SemiColon))
    if ("write" == command) {
        basic.showString(serial.readUntil(serial.delimiters(Delimiters.CarriageReturn)))
    } else if ("leds" == command) {
        ShowImage(serial.readUntil(serial.delimiters(Delimiters.CarriageReturn)))
    } else if ("buzzer" == command) {
        music.playTone(parseFloat(serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))), music.beat(BeatFraction.Whole))
    } else if ("music" == command) {
        music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
    } else if ("sound" == command) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    } else if ("hello" == command) {
        serial.writeLine("microbit")
    } else if ("p0" == command) {
        pins.digitalWritePin(DigitalPin.P0, parseFloat(serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))))
    } else if ("p1" == command) {
        pins.digitalWritePin(DigitalPin.P1, parseFloat(serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))))
    } else if ("p2" == command) {
        pins.digitalWritePin(DigitalPin.P2, parseFloat(serial.readUntil(serial.delimiters(Delimiters.CarriageReturn))))
    }
    command = serial.readUntil(serial.delimiters(Delimiters.NewLine))
})
let command = ""
let leds: string[] = []
let ledsBin: number[] = []
let val = 0
input.setAccelerometerRange(AcceleratorRange.TwoG)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
serial.writeLine("Started")
basic.showString("OS3D")
music.playTone(440, music.beat(BeatFraction.Half))
music.playTone(880, music.beat(BeatFraction.Half))
// ShowImage("0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0")
basic.forever(function () {
    serial.writeLine("a" + " " + input.acceleration(Dimension.X) + " " + input.acceleration(Dimension.Y) + " " + input.acceleration(Dimension.Z) + " " + input.acceleration(Dimension.Strength))
    serial.writeLine("r" + " " + input.rotation(Rotation.Pitch) + " " + input.compassHeading() + " " + input.rotation(Rotation.Roll))
    serial.writeLine("s" + " " + input.temperature() + " " + input.lightLevel() + " " + input.soundLevel())
    serial.writeLine("p" + " " + pins.digitalReadPin(DigitalPin.P0) + " " + pins.digitalReadPin(DigitalPin.P1) + " " + pins.digitalReadPin(DigitalPin.P2))
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
    basic.pause(33)
})
