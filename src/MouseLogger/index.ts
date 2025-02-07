
//my logger needs to be fixed, it gives me coordinattes according to the page but not according to the canvas
export class MouseLogger {
  private _element: HTMLCanvasElement;
  constructor(elementToTrackId: string) {
    this._element = document.getElementById(elementToTrackId) as HTMLCanvasElement;
    let paragraph = document.getElementById(
      "mouse-coordinates",
    ) as HTMLParagraphElement;
    if (this._element != undefined) {
      this._element.addEventListener("mousemove", (e) => {
        paragraph.innerText = `{ x : ${e.layerX - this._element.width} ; y: ${e.layerY - this._element.height} }`;
      });
      this._element.addEventListener("mouseleave", (e) => {
        paragraph.innerText = `Ta souris est invisible !`;
      });
    } else
      paragraph.innerText =
        "Unable to find your canvas, makesure you passed the correct ID";
  }
}
