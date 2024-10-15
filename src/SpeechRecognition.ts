import { randomNum } from '@zero-dependency/utils'

import {
  answerScenes,
  isAvailabeScene,
  isCalling,
  SceneService
} from './SceneService.js'

export class SpeechRecognitionService {
  #recognition: SpeechRecognition
  #sceneService: SceneService

  constructor(sceneService: SceneService) {
    this.#sceneService = sceneService

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      this.#recognition = new SpeechRecognition()
      this.#recognition.interimResults = true

      this.#recognition.addEventListener('result', (event) => {
        if (!isAvailabeScene()) return
        this.onResult(event)
      })

      this.#recognition.addEventListener('end', () => {
        if (!isAvailabeScene() && !isCalling()) return
        this.onEnd()
      })
    } catch (err) {
      alert('SpeechRecognition is not supported in your browser')
    }
  }

  toggleRecognition(): void {
    if (isCalling()) {
      this.#recognition.start()
    } else {
      this.#recognition.stop()
    }
  }

  private onResult(event: SpeechRecognitionEvent): void {
    const isFinal = event.results[0].isFinal
    const transcription = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('')

    console.clear()
    console.log(transcription)

    if (isFinal) {
      const scene = answerScenes[randomNum(0, answerScenes.length - 1)]
      this.#sceneService.playScene(scene)
    }
  }

  private onEnd(): void {
    this.#recognition.start()
  }
}
