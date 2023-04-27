import { randomNum } from '@zero-dependency/utils'
import { createSignal } from 'solid-js'

export const scenes = [
  'agh',
  'no',
  'yes',
  'hohoho',
  'hangup',
  'pickup'
]

export class SceneService {
  #sceneSignal = createSignal(scenes.at(-1))
  #videoScenes = new Map<string, HTMLVideoElement>()

  get sceneSignal() {
    const [currentScene, setCurrentScene] = this.#sceneSignal
    return { currentScene, setCurrentScene }
  }

  playScene(scene: string): void {
    const video = this.#videoScenes.get(scene)
    if (!video) {
      throw new Error(`Scene ${scene} not found`)
    }

    this.#videoScenes.forEach((scene) => {
      scene.pause()
      scene.currentTime = 0
    })

    video.play()
    this.sceneSignal.setCurrentScene(scene)
  }

  registerScene(scene: string, video: HTMLVideoElement): void {
    this.#videoScenes.set(scene, video)
  }
}

export class SpeechRecognitionService {
  private readonly recognition: SpeechRecognition

  constructor(private readonly scenesService: SceneService) {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()
      this.recognition.interimResults = true
      this.recognition.addEventListener('result', (event) =>
        this.onResult(event)
      )
      this.recognition.addEventListener('end', () => this.onEnd())
    } catch (err) {
      alert('Speech Recognition is not supported in your browser')
    }
  }

  toggleRecognition(state: boolean): void {
    if (state) {
      this.recognition.start()
    } else {
      this.recognition.stop()
    }
  }

  onResult(event: SpeechRecognitionEvent): void {
    const isFinal = event.results[0].isFinal
    const transcription = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('')

    console.log(transcription)

    if (isFinal) {
      const scene = scenes[randomNum(0, scenes.length - 3)]
      this.scenesService.playScene(scene)
    }
  }

  onEnd(): void {
    this.recognition.start()
  }
}
