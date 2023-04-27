import { createSignal } from 'solid-js'
import { IdleTimeout } from './IdleTimeout.js'

const phoneScenes = ['pickup', 'hangup']

export const answerScenes = [
  'agh',
  'no',
  'yes',
  'hohoho'
]

export const scenes = [...phoneScenes, ...answerScenes]

export class SceneService {
  #callSignal = createSignal(false)
  #sceneSignal = createSignal(phoneScenes.at(0)!)
  #videoScenes = new Map<string, HTMLVideoElement>()
  #idleTimeout = new IdleTimeout(1)

  get callSignal() {
    const [isCalling, setIsCalling] = this.#callSignal
    return { isCalling, setIsCalling }
  }

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

  private startIdleTimeout(): void {
    if (!this.callSignal.isCalling()) return
    this.#idleTimeout.start(() => {
      this.playScene(phoneScenes.at(1)!)
      this.callSignal.setIsCalling(false)
    })
  }

  private stopIdleTimeout(): void {
    this.#idleTimeout.stop()
  }

  registerScene(scene: string, video: HTMLVideoElement): void {
    video.addEventListener('ended', () => this.startIdleTimeout())
    video.addEventListener('play', () => this.stopIdleTimeout())
    this.#videoScenes.set(scene, video)
  }
}
