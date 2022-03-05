import { Ben, BEN_ANSWERS } from './ben'
import { randomInt } from './helpers'

try {
  const ben = new Ben()
  console.log(ben)

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  console.log(recognition)
  recognition.interimResults = true

  recognition.addEventListener('result', (event) => {
    const isFinal = event.results[0].isFinal
    const transcription = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

    console.log(transcription)
    ben.countIdle = 0

    if (isFinal) {
      const randomAnswer = randomInt(0, BEN_ANSWERS.length - 3)
      ben.playAnswer(BEN_ANSWERS[randomAnswer])
    }
  })

  recognition.addEventListener('end', () => {
    if (!ben.hasEnable) {
      return
    }

    if (ben.countIdle === 2) {
      ben.hangup.click()
      return
    }

    recognition.start()
    ben.countIdle++
  })

  ben.pickup.addEventListener('click', () => {
    recognition.start()
    ben.playPickup()
  })

  ben.hangup.addEventListener('click', () => {
    recognition.stop()
    ben.playHangup()
  })
} catch (err) {
  alert('This browser doesn\'t support SpeechRecognition API')
}
