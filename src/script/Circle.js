export class Circle {
    #element    = document.createElement('div')
    #x          = 50
    #y          = 50
    #width      = 5
    #height     = 5
    #background = "black"

    constructor() {
        document.body.appendChild( this.#element )
        this.#element.style.position = "fixed"
        this.#element.style.borderRadius = "100%"
        this.#element.style.zIndex = "100000"
        this.#element.style.transition = "width 250ms, height 250ms, top 250ms, left 250ms"

        this.x      = this.#x
        this.y      = this.#y
        this.width  = this.#width
        this.height = this.#height
    }

    /**
     * @param {'red' | 'black'} color
     */
    set background(color) {
        this.#background = color
        this.#element.style.background = this.#background
    }

    set x(value) {
        this.#x = value
        this.#element.style.left    = `${this.#x}vw`
    }

    set y(value) {
        this.#y = value
        this.#element.style.top    = `${this.#y}vh`
    }

    set width(value) {
        this.#width = value
    }

    set height(value) {
        this.#height = value
        this.#element.style.width     = `${this.#height}vh`
        this.#element.style.height    = `${this.#height}vh`
    }
}
