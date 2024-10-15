export class IdleTimeout {
  #ms: number
  #timeout: ReturnType<typeof setTimeout> | null = null

  constructor(seconds: number) {
    this.#ms = seconds * 1000
  }

  start(callback: () => void): void {
    this.stop()
    this.#timeout = setTimeout(callback, this.#ms)
  }

  stop(): void {
    if (!this.#timeout) return
    clearTimeout(this.#timeout)
    this.#timeout = null
  }
}
