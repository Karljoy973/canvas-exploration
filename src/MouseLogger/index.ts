export class MouseLogger {
  private _element: HTMLCanvasElement;
  constructor(elementToTrackId: string) {
    this._element = document.getElementById(
      elementToTrackId,
    ) as HTMLCanvasElement;
    let paragraph = document.getElementById(
      "mouse-coordinates",
    ) as HTMLParagraphElement;
    if (this._element != undefined) {
      this._element.addEventListener("mousemove", (e) => {
        paragraph.innerText = `{ x : ${e.clientX - (e.currentTarget! as HTMLCanvasElement).offsetLeft} ; y: ${e.clientY - (e.currentTarget! as HTMLCanvasElement).offsetTop} }`;
      });
      this._element.addEventListener("mouseleave", (e) => {
        paragraph.innerText = `Ta souris est invisible !`;
      });
    } else
      paragraph.innerText =
        "Unable to find your canvas, makesure you passed the correct ID";
  }
}
