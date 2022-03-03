const answers = [
  'agh',
  'no',
  'yes',
  'hohoho',
  'hangup',
  'pickup'
] as const

const banWords = [
  'путин'
]

type Answers = typeof answers[number]

const videos = {} as Record<Answers, HTMLVideoElement>

for (const answer of answers) {
  const video = document.createElement('video')
  video.classList.add('hidden')
  video.setAttribute('preload', 'auto')

  const source = document.createElement('source')
  source.src = `${answer}.mp4`

  video.appendChild(source)
  document.body.appendChild(video)

  videos[answer] = video
}

let hasIdle = false
let hasEnable = false
const phoneContainer = document.createElement('div')
phoneContainer.classList.add('phone-container')

const callStart = document.createElement('img')
callStart.src = 'pickup.png'
callStart.onclick = () => {
  playAnswer('pickup')
  recognition.start()
  callStart.classList.add('hidden')
  callEnd.classList.remove('hidden')
  hasEnable = true
  hasIdle = false
}

const callEnd = document.createElement('img')
callEnd.src = 'hangup.png'
callEnd.classList.add('hidden')
callEnd.onclick = () => {
  playAnswer('hangup')
  recognition.stop()
  callEnd.classList.add('hidden')
  callStart.classList.remove('hidden')
  hasEnable = false
}

phoneContainer.appendChild(callStart)
phoneContainer.appendChild(callEnd)
document.body.append(phoneContainer)

videos.pickup.classList.remove('hidden')

function playAnswer(answer: Answers): void {
  Object.values(videos).forEach((video) => {
    video.classList.add('hidden')
    video.pause()
    video.currentTime = 0
  })
  videos[answer].classList.remove('hidden')
  videos[answer].play()
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function textToSpeech(message: string, end: () => void): void {
  const speech = new SpeechSynthesisUtterance()

  speech.text = message
  speech.volume = 1
  speech.rate = 5
  speech.pitch = 5

  window.speechSynthesis.speak(speech)
  speech.addEventListener('end', () => end())
}

// TODO: fix types
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
console.log(recognition)

recognition.interimResults = true

recognition.addEventListener('result', (event) => {
  const isFinal = event.results[0].isFinal
  const message = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('')
    .toLowerCase()

  console.log(message)

  if (isFinal) {
    hasIdle = false

    if (banWords.some(word => message.indexOf(word) !== -1)) {
      textToSpeech('Пошел нахуй, долбаёб', () => {
        callEnd.click()
      })

      return
    }

    const answerIndex = randomInt(0, answers.length - 3)
    playAnswer(answers[answerIndex])
  }
})

recognition.addEventListener('end', () => {
  if (!hasEnable) {
    return
  }

  if (hasIdle) {
    callEnd.click()
    return
  }

  recognition.start()
  hasIdle = true
})
