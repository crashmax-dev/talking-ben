import { el, mount } from 'redom'

export const BEN_ANSWERS = [
  'agh',
  'no',
  'yes',
  'hohoho',
  'hangup',
  'pickup'
] as const

type BenAnswers = typeof BEN_ANSWERS[number]

export class Ben {
  videos: Record<BenAnswers, HTMLVideoElement>
  pickup: HTMLImageElement
  hangup: HTMLImageElement
  hasEnable = false
  countIdle = 0

  constructor() {
    this.videos = {} as Record<BenAnswers, HTMLVideoElement>

    for (const answer of BEN_ANSWERS) {
      const source = el('source', {
        src: `${answer}.mp4`
      })

      const video = el('video', {
        className: 'hidden'
      }, [source]) as HTMLVideoElement

      this.videos[answer] = video
      mount(document.body, video)
    }

    this.videos.pickup.classList.remove('hidden')

    this.pickup = el('img', {
      src: 'pickup.png'
    })

    this.hangup = el('img', {
      src: 'hangup.png',
      className: 'hidden'
    })

    const phone = el('div', {
      className: 'phone-container'
    }, [
      this.pickup,
      this.hangup
    ])

    mount(document.body, phone)
  }

  playAnswer(answer: BenAnswers): void {
    Object.values(this.videos).forEach((video) => {
      video.classList.add('hidden')
      video.pause()
      video.currentTime = 0
    })

    this.videos[answer].classList.remove('hidden')
    this.videos[answer].play()
  }

  playPickup(): void {
    this.playAnswer('pickup')
    this.pickup.classList.add('hidden')
    this.hangup.classList.remove('hidden')
    this.hasEnable = true
    this.countIdle = 0
  }

  playHangup(): void {
    this.playAnswer('hangup')
    this.pickup.classList.remove('hidden')
    this.hangup.classList.add('hidden')
    this.hasEnable = false
    this.countIdle = 0
  }
}
