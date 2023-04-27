import { createSignal, Index, Show } from 'solid-js'
import { scenes, SceneService, SpeechRecognitionService } from './Scene.js'
import type { Component } from 'solid-js'

const sceneService = new SceneService()
const speechRecognition = new SpeechRecognitionService(sceneService)

export const App: Component = () => {
  const [callIn, setCallIn] = createSignal(false)
  const { currentScene } = sceneService.sceneSignal

  const toggleCallIn = () => {
    const toggledCallIn = !callIn()
    setCallIn(toggledCallIn)
    sceneService.playScene(toggledCallIn ? 'pickup' : 'hangup')
    speechRecognition.toggleRecognition(toggledCallIn)
  }

  return (
    <>
      <Index each={scenes}>
        {(scene) => (
          <video
            ref={(el) => sceneService.registerScene(scene(), el)}
            class={scene() !== currentScene() ? 'hidden' : 'visible'}
          >
            <source src={scene() + '.mp4'} />
          </video>
        )}
      </Index>
      <div class="phone">
        <Show
          when={callIn()}
          fallback={
            <img
              src="pickup.png"
              onClick={() => toggleCallIn()}
            />
          }
        >
          <img
            src="hangup.png"
            onClick={() => toggleCallIn()}
          />
        </Show>
      </div>
    </>
  )
}
