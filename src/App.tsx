import { Index, Show } from 'solid-js'
import { scenes, SceneService } from './SceneService.js'
import { SpeechRecognitionService } from './SpeechRecognition.js'
import type { Component } from 'solid-js'

const sceneService = new SceneService()
const speechRecognitionService = new SpeechRecognitionService(sceneService)

export const App: Component = () => {
  const { isCalling, setIsCalling } = sceneService.callSignal
  const { currentScene } = sceneService.sceneSignal

  const toggleCalling = () => {
    const toggledCallIn = !isCalling()
    setIsCalling(toggledCallIn)
    sceneService.playScene(toggledCallIn ? 'pickup' : 'hangup')
    speechRecognitionService.toggleRecognition()
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
            onClick={() => toggleCalling()}
          />
        </Show>
      </div>
    </>
  )
}
