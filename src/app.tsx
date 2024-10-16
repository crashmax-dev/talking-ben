import { createEffect, Index, Show } from 'solid-js'
import type { Component } from 'solid-js'

import hangup from '@/assets/hangup.png'
import pickup from '@/assets/pickup.png'
import {
  currentScene,
  isAvailabeScene,
  isCalling,
  phoneScenes,
  scenes,
  SceneService,
  setIsCalling
} from './scene-service.js'
import { SpeechRecognitionService } from './speech-recognition.js'

const sceneService = new SceneService()
const speechRecognitionService = new SpeechRecognitionService(sceneService)

export const App: Component = () => {
  const toggleCalling = () => {
    const toggledCallIn = !isCalling()
    setIsCalling(toggledCallIn)
    sceneService.playScene(phoneScenes[Number(!toggledCallIn)])
  }

  createEffect(() => {
    speechRecognitionService.toggleRecognition()
  })

  return (
    <>
      <Index each={scenes}>
        {(scene) => (
          <video
            preload="auto"
            ref={(el) => sceneService.registerScene(scene(), el)}
            class={scene() !== currentScene() ? 'hidden' : 'visible'}
          >
            <source src={scene().src} />
          </video>
        )}
      </Index>
      <div class="phone">
        <label class="volume">
          Volume
          <input
            title="Volume"
            type="range"
            min={0}
            max={100}
            onChange={(event) => {
              sceneService.setScenesVolume(Number(event.target.value) / 100)
            }}
          />
        </label>
        <Show
          when={isCalling()}
          fallback={
            <img
              draggable={false}
              src={pickup}
              onClick={() => toggleCalling()}
            />
          }
        >
          <img
            draggable={false}
            src={hangup}
            onClick={() => {
              if (!isAvailabeScene()) return
              toggleCalling()
            }}
          />
        </Show>
      </div>
    </>
  )
}
