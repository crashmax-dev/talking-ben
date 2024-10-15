import { createSignal } from 'solid-js'
import { IdleTimeout } from './IdleTimeout.js'

import pickup from '@/assets/pickup.mp4'
import hangup from '@/assets/hangup.mp4'
import agh from '@/assets/agh.mp4'
import no from '@/assets/no.mp4'
import yes from '@/assets/yes.mp4'
import hohoho from '@/assets/hohoho.mp4'

interface Scene {
  name: string
  src: string
}

export const phoneScenes: Scene[] = [
  { name: 'pickup', src: pickup },
  { name: 'hangup', src: hangup }
]

export const answerScenes: Scene[] = [
  { name: 'agh', src: agh },
  { name: 'no', src: no },
  { name: 'yes', src: yes },
  { name: 'hohoho', src: hohoho }
]
export const scenes: Scene[] = [...phoneScenes, ...answerScenes]

export const [volume, setVolume] = createSignal(0.5)
export const [isAvailabeScene, setIsAvailableScene] = createSignal(false)
export const [isCalling, setIsCalling] = createSignal(false)
export const [currentScene, setCurrentScene] = createSignal(phoneScenes.at(0)!)

export class SceneService {
  #videoScenes = new Map<string, HTMLVideoElement>()
  #idleTimeout = new IdleTimeout(10)

  playScene(scene: Scene): void {
    const video = this.#videoScenes.get(scene.name)
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

  registerScene(scene: Scene, video: HTMLVideoElement): void {
    video.volume = volume()
    video.addEventListener('ended', () => {
      if (!isCalling()) return

      if (scene.name === 'pickup') {
        setIsAvailableScene(true)
      }

      this.#idleTimeout.start(() => {
        this.playScene(phoneScenes.at(1)!)
        setIsCalling(false)
      })
    })

    video.addEventListener('play', () => {
      if (scene.name === 'hangup') {
        setIsAvailableScene(false)
      }

      this.#idleTimeout.stop()
    })

    this.#videoScenes.set(scene.name, video)
  }
}
