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

const CURRENT_FACE_DETECTOR = nets.tinyFaceDetector
const FACE_DETECTION_OPTION = new TinyFaceDetectorOptions({
    inputSize: 512,
    scoreThreshold: 0.5,
})
// const selectedFaceDetector = 'tiny_face_detector'
const VIDEO_ELEMENT = document.querySelector('video')

const info = new Info()
const circle = new Circle()

async function main() {
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
main()

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

    const faceDetected = Array.isArray( resizedResults )

    info.info = {
        y: faceDetected ? 100 - resizedResults[0]?.box.y        : null,
        x: faceDetected ? resizedResults[0]?.box.x              : null,
        width: faceDetected ? resizedResults[0]?.box.width      : null,
        height: faceDetected ? resizedResults[0]?.box.height    : null,
        faceDetected: faceDetected
    }

    circle.x        = faceDetected ? resizedResults[0]?.box.y       : 0
    circle.y        = faceDetected ? resizedResults[0]?.box.x       : 0
    circle.height   = faceDetected ? resizedResults[0]?.box.width   : 5
    circle.width    = faceDetected ? resizedResults[0]?.box.height  : 5



    setTimeout(() => onPlay(videoEl))
}

