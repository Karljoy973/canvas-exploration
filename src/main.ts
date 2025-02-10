import './style.css'
import img from "../assets/img.jpg"

window.addEventListener('load', () => {

    
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="canvas"></canvas>`
    let paragraph = document.getElementById("mouse-coordinates") as HTMLParagraphElement
    let canvas = document.getElementById('canvas') as HTMLCanvasElement; 
    let context = canvas.getContext('2d') as CanvasRenderingContext2D; 

    canvas.addEventListener('mousemove', (e) => {
        paragraph.innerText = `{ x : ${e.clientX -(e.target as HTMLCanvasElement).offsetLeft} ; y: ${e.clientY-(e.target as HTMLCanvasElement).offsetTop} }`     
    })

  canvas.addEventListener('mouseleave', e => paragraph.innerText = `Ta souris est invisible !`)
  

  let x = 50; 
  let y = 70; 
  let radius = 10; 
  let color = "red"
  let xstep = 1.2; 
  let ystep = 1.3; 
  let drawBall = (x: number, y: number, radius: number, color: string) => {
    let radians = Math.PI / 100; 
    context.beginPath()
    context.fillStyle = color; 
    context.strokeStyle = color; 
    context.arc(x, y, radius, 0, 360 * radians, false)
    context.stroke()
    context.fill()
  }    



  let animationLoop = () => {
    context.clearRect(0,0,canvas.width, canvas.height)
    drawBall(x, y, radius, color)
    x += xstep; 
    y += ystep
    
    if (x >= canvas.width ||x <0) xstep = -xstep; 
    if (y >= canvas.height || y < 0) ystep = -ystep;

    window.requestAnimationFrame(animationLoop)
  }
  
  window.requestAnimationFrame(animationLoop)
  
})
