

//global variables
let canvas_width=1920;
let canvas_height=3*1080;
let ctx;
let ctx2;
let fps=80;
let moving_boxes=[];
let static_boxes=[];
let cats=[];
let clouds=[];
let stars=[]
let ground;
let ground_height;



//animation
const room_width = 1000;
const room_height = 600;
const moon_width = 800;
const moon_height = 800;
const boyW=80;
const boyH=80;
const cloudW=200;
const cloudH = 200;
drawboy=false;
drawboy2=false;
drawboy3=false;
textdraw=false
movewithcloud=false;
movewithsanta=false
movealone=false
endscreen=false

//spritesheet
let spritesheetW=1176;
let spritesheetH=249;

let row =1;
let col = 6;

//every sprite 
let width = spritesheetW/col;
let height = spritesheetH/row;

var x = 0;
var y = 10;



 function startGame() {
    gameArea.start();
    
    ctx=gameArea.context;
    //get the canvas element using the DOM
    ground=new myREctangle(0,canvas_height,canvas_width,30,'green')
    ground_height=canvas_height-ground.y;

    box = new myREctangle(0,ground.y-190,800,0.2,'red')//moving up
    box2 = new myREctangle(canvas_width*0.3,200,100,20,'blue')//moving down
    box3 = new myREctangle(0,ground.y*0.3,200,20,'purple')//moving right
    box4 = new myREctangle(canvas_width,ground.y*0.6,80,20,'navy')//moving left
    box5 = new myREctangle(canvas_width*0.7,ground.y-40,80,20,'green')//moving up

    sky = new imageBuilder(0,0,canvas_width,2160,'./images/sky7.png')
    sky2 = new imageBuilder(0,1000,canvas_width,2160,'./images/sky7.png')
    room = new imageBuilder(0,canvas_height-room_height,room_width,room_height,'./images/Bedroom.jpg')
    moon = new imageBuilder(canvas_width/2,200,moon_width,moon_height,'./images/moon.png')
    boy_asleep = new imageBuilder(20,box.y-60,250,80,'images/boy_sleeping.png')
    textbubble = new imageBuilder(50,box.y-200,150,150,'./images/text-bubble.png')
    boy = new drawImage(0,0,width,height,20,box.y-150,150,200,'images/Male22.png')
    santa = new imageBuilder(1600,2000,400,400,'./images/sants.png')
    boy2 = new drawImage(santa.x+30,santa.y+20,width,height,20,box.y-150,150,200,'images/Male22.png')
    cloud1 = new imageBuilder(room.x,room.y-cloudH,cloudW,cloudH,'images/cloud.svg')
    cloud2 = new imageBuilder(room.x+100,room.y-cloudH,cloudW,cloudH,'images/cloud.svg')
    cloud3 = new imageBuilder(0,1585,cloudW,cloudH,'images/cloud.svg')
    

   
    for(let i=0;i<3;i++){
        for(let j=0;j<7;j++){
            clouds.push(new imageBuilder(getRndInteger(200,500)*i,1000+getRndInteger(200,500)*j,cloudW,cloudH,'images/cloud.svg'))
        } 
    }
    for(let i=0;i<4;i++){
        for(let j=0;j<7;j++){
            stars.push(new imageBuilder(getRndInteger(200,500)*i,200+getRndInteger(200,500)*j,50,50,'images/star.svg'))
        } 
    }
    

  

  
 }
 


var gameArea = {
    canvas:document.getElementById('gameCanvas'),
	can:document.getElementById('gameCanvasV'),
            
    start:function(){
            this.canvas.width = canvas_width;
            this.canvas.height = canvas_height;
            this.canvas.style.border="2px solid"
            this.canvas.style.backgroundImage='url(./images/sky7.png)';
            this.context=this.canvas.getContext('2d');
			this.can.width = 1000;
            this.can.height = 600;
            this.can.style.border="2px solid"
            this.ctx=this.can.getContext('2d');//view port canvas!!
            this.frameNo=0;
            // this.interval2=setInterval(() => {
            //     boy.draw()
            // }, 150);
            this.interval=setInterval(function(){
                 
                 drawSomething();
				 
				var ctx = gameArea.ctx;//viewport
			
				 var w = -boy.x+500-boy.height/2;//camera fix
				 var h = -boy.y+350-boy.height/2;
				 
                 if(w > 0)w = 0;
                 if(h > 0)h = 0;
				 if(w < -gameArea.canvas.width+1000)w = -gameArea.canvas.width+1000;
				 gameArea.ctx.drawImage(gameArea.canvas,w,h);
				 
				 
              },150);
            
                
            },
          
    clear:function(){
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.ctx.clearRect(0, 0, this.can.width, this.can.height);
            },
        
    stop:function(){ 
                clearInterval(this.interval);
            }
}



function drawSomething(){
    
    setTimeout(() => {
        drawboy=true
    },10000);
    setTimeout(() => {
        textdraw=true
    }, 3000);
  
    gameArea.clear() 
  
            gameArea.frameNo+=1;

           
           
            sky.draw()
            sky2.draw()
           
            stars.forEach(star=>{
                star.draw()
            })
            clouds.forEach((cloud)=>{
                cloud.draw()
            })
            cloud3.draw()
            santa.draw()
            
            
            
            room.draw()
            if(textdraw){
                textbubble.draw()
                setTimeout(() => {
                    textdraw=false
                }, 7000);
            }
            
            moon.draw()
            cloud1.draw()
            cloud2.draw()
            cloud2.moveRight()
           // cloud2.moveup()

           

            boy_asleep.draw()
            if(drawboy==true){
                if(boy.y<=cloud1.y){
                    if(cloud1.y<=santa.y+santa.height&&cloud1.x+cloud1.width>=santa.x){
                        if(santa.x<=0){
                            
                            //santa.image.src='./images/sants2.png'
                            cloud1.movewithcloud(cloud3)
                            //santa.vanish()
                            cloud3.moveRight()
                            cloud3.moveup2()
                            if(cloud1.x>=moon.x&&cloud1.y<=moon.y+moon.height-30){
                                console.log(cloud1.y,'hey')
                                cloud1.y=moon.y
                                cloud1.vanish()
                                setInterval(() => {
                                   endscreen=true
                                   cloud1.movewithcloud(moon)
                                   moon.y+=5
                                   moon.x-=7
                                   if(moon.y>=room.y+400){
                                    cloud1.y=room.y+200
                                    cloud1.x=room.x
                                    gameArea.stop()
                                }
                                   // gameArea.stop()
                                }, 1000);
                               
                            
                            }
                            
                        }else{
                            console.log('ok')
                            cloud1.movewithsanta(santa)
                            
                            santa.moveleft()
                            santa.moveup()
                        }
                      
                    }
                        boy.movewithcloud(cloud1)
                        boy.draw()
                        cloud1.moveup()
                        cloud1.moveRight()
                }
            
               
                else{
                        boy.draw()
                        boy.moveup()  
                }
               
           }
           
       
           

            box.draw()
            // box2.draw()
            // box3.draw() 
            // box4.draw()
            // box5.draw()

            ground.draw()

  
            

          
        }

        //constructor functions

        class myREctangle{
            constructor(x,y,width,height,stylestring){
               this.x =x;
               this.y = y;
               this.angle=0;
               this.mid=this.x+this.width/2;
               this.width = width;
               this.height = height;
               this.fillStyle = stylestring;
            }
            draw(){             
                ctx.fillStyle = this.fillStyle;
                ctx.fillRect(this.x,this.y,this.width,this.height);
            }
            rotate90(){
                ctx.translate(this.x+(this.width/2),this.y+(this.height/2));
                ctx.rotate(this.angle*Math.PI/180)
                ctx.translate(-(this.x+this.width/2),-(this.y+this.height/2)); 
            }
            restore(){
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        class imageBuilder{
            constructor(x,y,width,height,color){
                this.x=x;
                this.y=y;
                this.score=0;
                this.GroundPound=false;
                this.keyboardMoveLeft=false;
                this.keyboardMoveRight=false;
                this.previouslyFacingLeft=false;
                this.SPLAT=false;
                this.tomatoFall=0;
               
                this.width=width;
                this.height=height;
                this.angle=0;
                this.image = new Image();
                this.image.src = color;   
               
                this.speedY=0; 
                this.bounce=0.2; 
                this.gravity = .1;
                this.gravitySpeed = 0;  
            }
            draw(){
                 ctx=gameArea.context;
                 ctx.drawImage(this.image,this.x, this.y, this.width, this.height);
            }
  
    

             moveRight(){
                 this.x+=15;
             }
             moveleft(){
                this.x-=10;
            }
             moveup(){
                 this.y-=5;
             }
             moveup2(){
                this.y-=13;
            }
            vanish(){
                this.width=1;
                this.height=1;
            }
            
             movewithcloud(cloud){
                this.x=cloud.x;
                this.y=cloud.y;
            }
            movewithsanta(santa){
                this.x=santa.x+santa.width/2-50;
                this.y=santa.y+santa.height/2;
            }
            
            
            }


            class drawImage{
                constructor(srcX,srcY,swidth,sheight,x,y,width,height,src){
                    this.srcX = srcX;
                    this.srcY = srcY;
                    this.swidth = swidth;
                    this.sheight =sheight;
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    this.framecount = 9;
                    this.curFrame = 0;
                    this.image = new Image()
                    this.image.src = src;
                }
                draw(){
                    this.updateFrame()
                    ctx.drawImage(this.image,this.srcX,this.srcY,this.swidth,this.sheight,this.x,this.y,this.width,this.height)
                }
                updateFrame(){
                   if(this.curFrame>=col){
                       this.curFrame=0;
                      // this.srcY=1*this.sheight
                   }
                    
                    this.srcX = this.curFrame * this.swidth; 
                    
                    this.curFrame++
                }
                moveRight(){
                    this.x+=10;
                }
                moveup(){
                    this.y-=10;
                }
                movewithcloud(cloud){
                    this.x=cloud.x;
                    this.y=cloud.y-this.height/2;
                }
                movewithsanta(santa){
                    this.x=santa.x;
                    this.y=santa.y-this.height/2;
                }
        }
        
            
     
            function everyinterval(n) {
                return ((gameArea.frameNo / n) % 1 == 0) ?  true : false;
            }
            
            function getRndInteger(min, max) {
                return Math.floor(Math.random() * (max - min) ) + min;
              }