import { createEffect, Index, Show } from 'solid-js'
import {
  currentScene,
  isAvailabeScene,
  isCalling,
  scenes,
  SceneService,
  setIsCalling
} from './SceneService.js'
import { SpeechRecognitionService } from './SpeechRecognition.js'
import type { Component } from 'solid-js'

const sceneService = new SceneService()
const speechRecognitionService = new SpeechRecognitionService(sceneService)

export const App: Component = () => {
  const toggleCalling = () => {
    const toggledCallIn = !isCalling()
    setIsCalling(toggledCallIn)
    sceneService.playScene(toggledCallIn ? 'pickup' : 'hangup')
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
            <source src={scene() + '.mp4'} />
          </video>
        )}
      </Index>
      <div class="phone">
        <input
          title="Volume"
          class="volume"
          type="range"
          min={0}
          max={100}
          onChange={(event) => {
            sceneService.setScenesVolume(Number(event.target.value) / 100)
          }}
        />
        <Show
          when={isCalling()}
          fallback={
            <img
              draggable={false}
              src="pickup.png"
              onClick={() => toggleCalling()}
            />
          }
        >
          <img
            draggable={false}
            src="hangup.png"
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
