import { createSignal } from 'solid-js'
import { IdleTimeout } from './IdleTimeout.js'

export const phoneScenes = ['pickup', 'hangup']
export const answerScenes = [
  'agh',
  'no',
  'yes',
  'hohoho'
]
export const scenes = [...phoneScenes, ...answerScenes]

export const [volume, setVolume] = createSignal(0.5)
export const [isAvailabeScene, setIsAvailableScene] = createSignal(false)
export const [isCalling, setIsCalling] = createSignal(false)
export const [currentScene, setCurrentScene] = createSignal(phoneScenes.at(0)!)

export class SceneService {
  #videoScenes = new Map<string, HTMLVideoElement>()
  #idleTimeout = new IdleTimeout(10)

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
    setCurrentScene(scene)
  }

  setScenesVolume(volume: number): void {
    setVolume(volume)
    for (const scene of this.#videoScenes.values()) {
      scene!.volume = volume
    }
  }

  registerScene(scene: string, video: HTMLVideoElement): void {
    video.volume = volume()
    video.addEventListener('ended', () => {
      if (!isCalling()) return

      if (scene === 'pickup') {
        setIsAvailableScene(true)
      }

      this.#idleTimeout.start(() => {
        this.playScene(phoneScenes.at(1)!)
        setIsCalling(false)
      })
    })

    video.addEventListener('play', () => {
      if (scene === 'hangup') {
        setIsAvailableScene(false)
      }

      this.#idleTimeout.stop()
    })

    this.#videoScenes.set(scene, video)
  }
}
