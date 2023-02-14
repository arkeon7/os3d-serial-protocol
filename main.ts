function ShowImage (texte: string) {
    leds = texte.split(" ")
    for (let y = 0; y <= 4; y++) {
        for (let x = 0; x <= 4; x++) {
            if (leds[x + y * 5] == "1") {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
}
serial.onDataReceived("matrix", function () {
	
})
serial.onDataReceived("sound", function () {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
})
serial.onDataReceived("buzz", function () {
    music.playTone(parseFloat(serial.readLine()), music.beat(BeatFraction.Whole))
})
serial.onDataReceived("music", function () {
    music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
})
let leds: string[] = []
input.setAccelerometerRange(AcceleratorRange.TwoG)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate57600)
serial.writeLine("Started")
basic.showString("OS3D")
basic.showIcon(IconNames.Happy)
// ShowImage("0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0")
basic.forever(function () {
    serial.writeValue("accel.x", input.acceleration(Dimension.X))
    serial.writeValue("accel.y", input.acceleration(Dimension.Y))
    serial.writeValue("accel.z", input.acceleration(Dimension.Z))
    serial.writeValue("accel.f", input.acceleration(Dimension.Strength))
    serial.writeValue("rot.pitch", input.rotation(Rotation.Pitch))
    serial.writeValue("rot.roll", input.rotation(Rotation.Roll))
    serial.writeValue("direction", input.compassHeading())
    serial.writeValue("temp", input.temperature())
    serial.writeValue("light", input.lightLevel())
    serial.writeValue("mic", input.soundLevel())
    if (input.buttonIsPressed(Button.A)) {
        serial.writeValue("btn.a", 1)
    } else {
        serial.writeValue("btn.a", 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        serial.writeValue("btn.b", 1)
    } else {
        serial.writeValue("btn.b", 0)
    }
    if (input.logoIsPressed()) {
        serial.writeValue("btn.l", 1)
    } else {
        serial.writeValue("btn.l", 0)
        if (input.isGesture(Gesture.Shake)) {
            serial.writeValue("shake", 1)
        } else {
            serial.writeValue("shake", 0)
        }
    }
    basic.pause(100)
})
