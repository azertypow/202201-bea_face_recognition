export class Circle {
    #element    = document.createElement('div')
    #x          = 0
    #y          = 0
    #width      = 50
    #height     = 50

    constructor() {
        document.body.appendChild( this.#element )
        this.#element.style.position = "fixed"
        this.#element.style.borderRadius = "100%"
        this.#element.style.background = "black"
        this.#element.style.zIndex = "100000"

        this.x      = this.#x
        this.y      = this.#y
        this.width  = this.#width
        this.height = this.#height
    }

    set x(value) {
        this.#x = value
        this.#element.style.left    = `${this.#x}vh`
    }

    set y(value) {
        this.#y = value
        this.#element.style.top    = `${this.#y}vw`
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
