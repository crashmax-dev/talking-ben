const answers = [
  'agh',
  'no',
  'yes',
  'hohoho',
  'hangup',
  'pickup'
] as const

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

const phoneContainer = document.createElement('div')
phoneContainer.classList.add('phone-container')

const callStart = document.createElement('img')
callStart.src = 'pickup.png'
callStart.onclick = () => {
  recognition.start()
  callStart.classList.add('hidden')
  callEnd.classList.remove('hidden')
}

const callEnd = document.createElement('img')
callEnd.src = 'hangup.png'
callEnd.classList.add('hidden')
callEnd.onclick = () => {
  recognition.stop()
  callEnd.classList.add('hidden')
  callStart.classList.remove('hidden')
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

// TODO: fix types
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition()
console.log(recognition)

recognition.continuous = true

recognition.onresult = (event) => {
  const resultIndex = event.resultIndex
  const transcript = event.results[resultIndex][0].transcript
  console.log(transcript)
  const answerIndex = randomInt(0, answers.length - 3)
  playAnswer(answers[answerIndex])
}

recognition.onstart = () => {
  playAnswer('pickup')
}

recognition.onspeechend = () => {
  playAnswer('hangup')
}

recognition.onend = () => {
  playAnswer('hangup')
}
