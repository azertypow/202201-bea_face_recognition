export class AudioControl {
    #element = document.createElement('audio')

    #volume = 0

    constructor() {
        this.#element.setAttribute('src', 'public/_sound.mp3')
        this.#element.loop = true

        this.#setVolume()
    }

    play() {this.#element.play()}

    /**
     * @param {number} value between 0 et 100
     */
    set volume(value) {
        if(value < 0) this.#volume      = 0
        if(value > 100) this.#volume    = 100
        this.#volume = value
    }

    #setVolume() {
        const INCREMENT = .005

        const volumeDown    = this.#element.volume * 100 > this.#volume
        const volumeUp      = this.#element.volume * 100 < this.#volume

        if(volumeDown   && this.#element.volume - INCREMENT > 0 )   this.#element.volume -= INCREMENT
        if(volumeUp     && this.#element.volume + INCREMENT < 1)    this.#element.volume += INCREMENT

        console.log( this.#element.volume )

        window.requestAnimationFrame(() => { this.#setVolume() })
    }
}
