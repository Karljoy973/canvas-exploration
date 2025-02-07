import './style.css'

window.addEventListener('load', () => {

    
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="canvas"></canvas>`
    let paragraph = document.getElementById("mouse-coordinates") as HTMLParagraphElement
    let canvas = document.getElementById('canvas') as HTMLCanvasElement; 
    let context = canvas.getContext('2d') as CanvasRenderingContext2D; 

    canvas.addEventListener('mousemove', (e) => {
        paragraph.innerText = `{x : ${e.clientX} ; y: ${e.clientY} }`     
    })
    // canvas.addEventListener('mousedown', (e) => {
    //     context.beginPath(); 
    //     context.strokeStyle = "rgb(2, 49, 77)"
    //     context.moveTo(e.clientX, e.clientY)
    //     context.lineTo(e.clientX+5, e.clientY+5);
    //     context.stroke()
    // })

    // canvas.addEventListener('click', (e) => {
    //     console.log(e)
    //     context.beginPath(); 
    //     context.strokeStyle = "rgb(2, 49, 77)"
    //     context.moveTo(e.clientX, e.clientY)
    //     context.lineTo(e.clientX+5, e.clientY+105);
    //     context.stroke()
    // })
    
    context.beginPath(); 
    context.strokeStyle = "#9b39d8"
    context.lineWidth = 6
    context.moveTo(172, 234)
    context.quadraticCurveTo(120, 96, 4, 12);
    context.stroke();

    // requestAnimationFrame(() => {
        
    // })
})
