import { Ben, BEN_ANSWERS } from './ben'
import { randomInt } from './helpers'

try {
  const ben = new Ben()

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
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
    ben.playAnswer('pickup')
    console.log(recognition)
    recognition.start()
    ben.pickup.classList.add('hidden')
    ben.hangup.classList.remove('hidden')
    ben.hasEnable = true
    ben.countIdle = 0
  })

  ben.hangup.addEventListener('click', () => {
    ben.playAnswer('hangup')
    recognition.stop()
    ben.pickup.classList.remove('hidden')
    ben.hangup.classList.add('hidden')
    ben.hasEnable = false
    ben.countIdle = 0
  })
} catch (err) {
  alert('This browser doesn\'t support SpeechRecognition API')
}
