import './style.css'
import img from "../assets/img.jpg"

window.addEventListener('load', () => {

    
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<canvas id="canvas"></canvas>`
    let paragraph = document.getElementById("mouse-coordinates") as HTMLParagraphElement
    let canvas = document.getElementById('canvas') as HTMLCanvasElement; 
    let context = canvas.getContext('2d') as CanvasRenderingContext2D; 

    canvas.addEventListener('mousemove', (e) => {
        paragraph.innerText = `{ x : ${e.clientX} ; y: ${e.clientY} }`     
    })

    canvas.addEventListener('mouseleave', e => paragraph.innerText = `Ta souris est invisible !`)
    
    // draw line 
    context.beginPath(); 
    context.lineCap = "round" //setup linecap 
    context.strokeStyle = "#242424"
    context.lineWidth = 6
    context.shadowColor = "rgb(53, 4, 84)"
    context.shadowOffsetX = 13;
    context.shadowOffsetY = 5;
    context.shadowBlur = 2
    context.moveTo(172,134)
    context.lineTo(125, 125);
    context.stroke();
    
    
    
    //you have to always redefine the shadows attributes, otherwise your current line will have the 
    // same presets as the previous one
    //you can also "refresh" the settings once you quit 
    context.shadowBlur = 0
    context.shadowColor = "transparent"
    context.shadowOffsetX = 0; 
    context.shadowOffsetY = 0


    context.beginPath(); 
    context.strokeStyle = "#9b39d8"
    context.lineWidth = 6
    context.moveTo(172, 234)
    context.quadraticCurveTo(120, 96, 4, 12);
    context.stroke();


    context.beginPath(); 
    context.lineCap = "round" //setup linecap 
    context.strokeStyle = "#242424"
    context.lineWidth = 6
    context.moveTo(30, 40)
    context.lineTo(80, 40);
    context.lineTo(40, 90);
    context.lineTo(90, 90 );
    context.stroke();

    context.beginPath(); 
    context.lineCap = "round" //setup linecap 
    context.strokeStyle = "rgb(53, 4, 84)"
    context.lineWidth = 6
    context.moveTo(35+190, 40)
    context.lineTo(85+190, 40);
    context.lineTo(45+190, 90);
    context.lineTo(95+190, 90 );
    context.stroke();
    

    context.beginPath(); 
    context.lineCap = "round" //setup linecap 
    context.strokeStyle = "rgb(53, 4, 84)"
    context.lineWidth = 6
    context.stroke();


    //le boolien va surtout indiquer dans quuel sens tu mets tes parametres, si tu les mets à l'envers 
    // par rapport au sens choisi, tu vas faire un tour (mais les tours ne vont pas "s'empiler")
    context.beginPath()
    context.strokeStyle = "rgba(4, 84, 35, 0.2)"
    context.arc(200, 100, 500*Math.PI/100, 45, 750, false)
    context.stroke()

    context.beginPath()
    context.strokeStyle = "rgba(4, 84, 35, 0.2)"
    context.moveTo(8, 12)
    context.quadraticCurveTo(15, 45, 82, 8)
    // context.arc(200, 100, 500*Math.PI/100, 45, 750, false)
    context.stroke()

    context.beginPath()
    context.strokeStyle = "rgba(4, 84, 35, 0.2)"
    context.moveTo(88, 12)
    context.bezierCurveTo(185, 45, 182, 28, 212, 24)
    // context.arc(200, 100, 500*Math.PI/100, 45, 750, false)
    context.stroke()

    //TODO - Discover how the coordinate system works 
  let img = new Image()
  
  img.src = `../assets/img0.jpg`
  
  img.onload = () => context.drawImage(img, 5, 12, 180, 90)
  

  //NOTE - getImageData nous permet d'avoir les cannaux rgb et derriere de pouvoir faire du traitement d'images ! 
  //NOTE - save permet de sauvegarder l'etat du canvas dans une pile au moment où on l'utilise 
    //NOTE - restore nous permet de réutiliser ce state 
    //NOTE on peut prendre le contenu d'un canvas et le mettre dans une baliise img en utilisant la methode toDataURL() et on passe le resultat à img.src()
  //NOTE - Upscale / downscale the canvas - à placer avant de faire les transformations qui nous intéressent  
  //NOTE - Toutes les transformations appliquées au contexte doivent se faire avant de commencer à dessiner 
  // context.scale(0.25, 0.25)
  // requestAnimationFrame(() => {
        
  //   })
})
