export default class Timer {
  protected _pauseTime = 0
  protected _pauseDuration = 0
  protected _prevTime = 0
  constructor(public inSeconds = false, public from = Date.now()) {
    this._prevTime = this.from
  }
  get elapsed() {
    return this._getElapsed(Date.now(), this.from)
  }
  get sincePrevElapsed() {
    const curTime = Date.now()
    const elapsed = this._getElapsed(curTime, this._prevTime)
    this._prevTime = curTime
    return elapsed
  }
  start() {
    this._prevTime = this.from = Date.now()
  }
  pause() {
    if (!this._pauseTime) {
      this._pauseTime = Date.now()
    }
  }
  resume() {
    if (this._pauseTime) {
      this._pauseDuration = Date.now() - this._pauseTime
      this._pauseTime = 0
    }
  }
  toggle(flag?: boolean) {
    const toggle = flag ?? !!this._pauseTime
    toggle ? this.resume() : this.pause()
  }
  protected _getElapsed(curTime: number, prevTime: number) {
    let elapsed = curTime - prevTime - this._pauseDuration
    if (this.inSeconds) {
      elapsed = Math.floor(elapsed / 1000)
    }
    this._pauseDuration = 0
    return elapsed > 0 ? elapsed : 0
  }
}
