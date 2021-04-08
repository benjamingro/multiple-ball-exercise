
class Ball{
  constructor(id,top,background, velocityEffects = 'linearVelocity', sizeEffects="none"){
    // background = 'red' || 'black' || 'multiColor' 
    // velocityEffects = 'linearVelocity' || exponentialVelocity 
    // sizeEffects="none" || 'sinusoid' 
    this.id = id; 
    this.top = top; 
    this.background = background;
    this.velocityEffects =  velocityEffects;
    this.sizeEffects = sizeEffects 
    this.height = 50; 
    this.width = 50;

    this.minX = 0; 
    this.maxX = 300; 
    this.positionX = 0; 
    this.interval = 10;
    this.velocity = 1; 
    this.reverse = false; 

    let div = document.createElement("div");
    if(this.background !== 'multiColor')
    {
      div.style.background = this.background;
    }
    else
    {
      div.style.background = '0xf00';
    }
    // div.style.background = "black"; 
    div.style.borderRadius="50%"
    div.style.position='absolute';
    div.style.left = "0px"; 
    div.style.top = this.top + 'px'; 
    if(this.sizeEffects === 'none')
    {
      div.style.height=this.height + 'px'; 
      div.style.width=this.width + 'px';
    }
    else
    {
      div.style.height='0px'; 
      div.style.width='0px';
    }
 

 

    div.id = this.id; 

    const body =  document.getElementsByTagName("body")[0]; 
    body.appendChild(div);
    this.move(); 

  }

  move()
  {
    setInterval(()=>{
    let div = document.getElementById(this.id);
    if(!this.reverse)    
    {
      if(this.velocityEffects === 'linearVelocity')
      {
        this.positionX = this.positionX + this.velocity;
      }
      else if(this.velocityEffects === 'exponentialVelocity')
      {
        this.positionX = this.positionX + this.velocity * Math.pow(1.005,this.positionX);
      }
      
      div.style.left = this.positionX; 
    }
    else
    {
      if(this.velocityEffects === 'linearVelocity')
      {
        this.positionX = this.positionX - this.velocity;
      }
      else if(this.velocityEffects === 'exponentialVelocity')
      {
        this.positionX = this.positionX - this.velocity* Math.pow(1.005,this.positionX);
      }
      
      div.style.left = this.positionX; 
    }

    //test for edge and reverse 
    if(this.positionX>this.maxX || this.positionX <= this.minX)
    {
      this.reverse = ! this.reverse;
    }

    //set multicolor 
    if(this.background === 'multiColor')
    {
      div.style.background = this.getColor(); 
    }

    if(this.sizeEffects === 'sinusoid')
    {
      let sizeModulator = Math.sin((this.positionX/this.maxX)*Math.PI); 
      div.style.height = sizeModulator*this.height+'px';
      div.style.width = sizeModulator*this.width+'px';
    }

    },this.interval)
  }

  getColor()
  {
    let myPositionRatio = this.positionX/this.maxX; 
    let r,g,b; 
    if(myPositionRatio<=0.25)
    {
      r = 'f';
      g = Math.round(15*myPositionRatio/0.25).toString(16);  
      b = '0'; 
    }
    else if(myPositionRatio>0.25 && myPositionRatio<=0.5)
    {
      r = Math.round((0.5-myPositionRatio)/(0.25/15)).toString(16); 
      g = 'f';
      b= '0';
    }
    
    else if(myPositionRatio>0.5 && myPositionRatio<=0.75)
    {
      r = '0'; 
      g = 'f'; 
      b = Math.round(15*(myPositionRatio-0.5)/0.25).toString(16); 
    }
    else if(myPositionRatio>0.75 && myPositionRatio<=1.1)
    {
      r = '0'; 
      g = Math.round((1-myPositionRatio)/(0.25/15)).toString(16); 
      b = 'f';
    }

    let myColor = '#'+r+g+b;
    return myColor; 

  }
}

let ball1 = new Ball('ball1',0,'black'); 
let ball2 = new Ball('ball2',100,'multiColor'); 
let ball3 = new Ball('ball3',300,'multiColor','exponentialVelocity'); 
let ball4 = new Ball('ball4',200,'multiColor','linearVelocity','sinusoid'); 



