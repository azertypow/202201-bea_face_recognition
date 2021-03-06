import {
    detectAllFaces,
    loadFaceLandmarkModel,
    matchDimensions,
    nets,
    resizeResults,
    TinyFaceDetectorOptions,
} from "face-api.js"
import {Info} from "./Info.js"
import {Circle} from "./Circle.js"
import {AudioControl} from "./AudioControl";

const CURRENT_FACE_DETECTOR = nets.tinyFaceDetector
const FACE_DETECTION_OPTION = new TinyFaceDetectorOptions({
    inputSize: 512,
    scoreThreshold: 0.5,
})
// const selectedFaceDetector = 'tiny_face_detector'
const VIDEO_ELEMENT = document.querySelector('video')

const info          = new Info()
const circle        = new Circle()
const audioControl  = new AudioControl()


async function main(){
    console.log('ini')

    // script entry point
    document.querySelector(".start").addEventListener("click", () => {
        console.log("click")
        audioControl.play()
        start()
        document.querySelector(".start").style.display = "none"
    })
}
main()

async function start() {
    info.log = 'init'

    VIDEO_ELEMENT
        .srcObject = await navigator.mediaDevices.getUserMedia({ video: {} })

    VIDEO_ELEMENT
        .addEventListener('loadedmetadata', () => onPlay(VIDEO_ELEMENT))


    CURRENT_FACE_DETECTOR.load('/public/').then(() => {
        info.log = "face detector loaded"
    }).catch(reason => {
        info.log = "face detector loaded error " + reason
    })

    // load face detection and face landmark models
    loadFaceLandmarkModel('/public/').then(() => {
        info.log = "face landmark loaded"
    }).catch(reason => {
        info.log = "face landmark loaded error " + reason
    })

    // start processing frames
    await onPlay( VIDEO_ELEMENT )

}

export  function isFaceDetectionModelLoaded() {
    return !!CURRENT_FACE_DETECTOR.params
}

export async function onPlay(videoEl) {

    if(
        !videoEl.currentTime
        ||  videoEl.paused
        ||  videoEl.ended
        ||  !isFaceDetectionModelLoaded()
    )
        return setTimeout(() => onPlay(videoEl))

    const results = await detectAllFaces(videoEl, FACE_DETECTION_OPTION)

    /**
     * @type {HTMLCanvasElement}
     */
    const resizedResults = resizeResults(results, {
        height: 100,
        width:  100,
    })

    const faceDetected = resizedResults[0] !== undefined

    info.info = {
        y: faceDetected ? 100 - resizedResults[0]?.box.y        : null,
        x: faceDetected ? resizedResults[0]?.box.x              : null,
        width: faceDetected ? resizedResults[0]?.box.width      : null,
        height: faceDetected ? resizedResults[0]?.box.height    : null,
        faceDetected: faceDetected
    }

    if (faceDetected) circle.x = resizedResults[0]?.box.x
    if (faceDetected) circle.y = resizedResults[0]?.box.y
    circle.height       = faceDetected ? resizedResults[0]?.box.width   : 5
    circle.width        = faceDetected ? resizedResults[0]?.box.height  : 5
    circle.background   = faceDetected ? "black" : "red"

    audioControl.volume = faceDetected ? 100 - resizedResults[0]?.box.y   : 0

    setTimeout(() => onPlay(videoEl))
}

