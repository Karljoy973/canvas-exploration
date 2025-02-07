export class MouseLogger {
    private _element: HTMLElement
    constructor(elementToTrackId: string) {
        this._element = document.getElementById(elementToTrackId) as HTMLElement
        let paragraph = document.getElementById("mouse-coordinates") as HTMLParagraphElement
        if (this._element != undefined) {
            
            this._element.addEventListener('mousemove', e => {
                paragraph.innerText = `{ x : ${e.clientX} ; y: ${e.clientY} }`
            })
            this._element.addEventListener('mouseleave', e => {
                paragraph.innerText = `Ta souris est invisible !`
            })
        }
        else paragraph.innerText = 'Unable to find your canvas, makesure you passed the correct ID'
    }
}