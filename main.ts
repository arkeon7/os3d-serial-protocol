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
    }
    command = serial.readUntil(serial.delimiters(Delimiters.NewLine))
})
let command = ""
let val = 0
let ledsBin: number[] = []
let leds: string[] = []
input.setAccelerometerRange(AcceleratorRange.TwoG)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
serial.writeLine("Started")
music.playTone(440, music.beat(BeatFraction.Half))
music.playTone(880, music.beat(BeatFraction.Half))
basic.showString("OS3D")
// ShowImage("0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0")
basic.forever(function () {
    serial.writeLine("a" + " " + input.acceleration(Dimension.X) + " " + input.acceleration(Dimension.Y) + " " + input.acceleration(Dimension.Z) + " " + input.acceleration(Dimension.Strength))
    serial.writeLine("r" + " " + input.rotation(Rotation.Pitch) + " " + input.rotation(Rotation.Roll) + " " + input.compassHeading())
    serial.writeLine("s" + " " + input.temperature() + " " + input.lightLevel() + " " + input.soundLevel())
    if (input.buttonIsPressed(Button.A)) {
        serial.writeValue("b.A", 1)
    } else {
        serial.writeValue("btn.A", 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        serial.writeValue("btn.B", 1)
    } else {
        serial.writeValue("btn.B", 0)
    }
    if (input.logoIsPressed()) {
        serial.writeValue("btn.L", 1)
    } else {
        serial.writeValue("btn.L", 0)
    }
    if (input.isGesture(Gesture.Shake)) {
        serial.writeValue("shake", 1)
    } else {
        serial.writeValue("shake", 0)
    }
    if (input.isGesture(Gesture.TiltLeft)) {
        serial.writeValue("d.l", 1)
    } else {
        serial.writeValue("d.l", 0)
    }
    if (input.isGesture(Gesture.TiltRight)) {
        serial.writeValue("d.r", 1)
    } else {
        serial.writeValue("d.r", 0)
    }
    if (input.isGesture(Gesture.LogoUp)) {
        serial.writeValue("d.u", 1)
    } else {
        serial.writeValue("d.u", 0)
    }
    if (input.isGesture(Gesture.LogoDown)) {
        serial.writeValue("d.d", 1)
    } else {
        serial.writeValue("d.d", 0)
    }
    basic.pause(100)
})
