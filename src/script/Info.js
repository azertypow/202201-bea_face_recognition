export class Info {
    #value = ""
    #element = document.createElement('div')
    #info = {
        faceDetected: false,
        x: null,
        y: null,
        width: null,
        height: null,
    }

    constructor() {
        document.body.appendChild( this.#element )
        this.#element.innerHTML = "wait…"
        this.#element.style.position = "fixed"
        this.#element.style.textAlign = "right"
        this.#element.style.zIndex = "100000"
        this.#element.style.top = "10px"
        this.#element.style.right = "10px"
    }

    /**
     * @param {string} value
     */
    set log(value) {
        this.#value += "<br>" + value
        this.#refreshView()
    }

    /**
     * @param {{faceDetected: boolean, x: null, y: null}} info
     */
    set info(info) {
        this.#info = info
        this.#refreshView()
    }

    #refreshView() {
        this.#element.innerHTML =
            `${this.#value}
        <br>
        <br><b>face detected</b>
        <br>${this.#info.faceDetected}
        <br>
        <br><b>top left x</b>
        <br>${this.#info.x}% of webcam view
        <br><b>top left y</b>
        <br>${this.#info.y}% of webcam view
        <br><b>width</b>
        <br>${this.#info.width}px
        <br><b>height</b>
        <br>${this.#info.height}px
        `
    }
}
