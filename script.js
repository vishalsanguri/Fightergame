const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d')
canvas.width=1080;
canvas.height=580;
c.fillRect(0,0,canvas.width,canvas.height)
let lastKeyPressed1='';
let lastKeyPressed2='';
const keys={
  a:{
    pressed:false
  },
  d:{
    pressed:false
  },
  w:{
    pressed:false
  },
  ArrowRight:{
    pressed:false
  },
  ArrowLeft:{
    pressed:false
  },
  ArrowUp:{
    pressed:false
  }
} 
const background=new Imagesprite({position:{x:0,y:0},width:1200,offset:{x:-30,y:0},height:580,imageurl:'./images/background.png'})

const shop=new Imagesprite({position:{x:650,y:237},scale:2,maxFrames:6,imageurl:'./images/shop.png'})

const player1=new sprite({
  position:{x:0,y:100},
  velocity:{x:0,y:0},
  color:'red',
  imageurl:'./images/samuraiMack/Idle.png',
  maxFrames:8,
  offset1:{x:15,y:0},
  scale:2.2,
  slowunit:4,
  offset:{x:180,y:170},
  spriteImages:{
    still:{imageurl:'./images/samuraiMack/Idle.png',maxFrames:8},
    run:{imageurl:'./images/samuraiMack/Run.png',maxFrames:8},
    jump:{imageurl:'./images/samuraiMack/Jump.png',maxFrames:2},
    fall:{imageurl:'./images/samuraiMack/Fall.png',maxFrames:2},
    attack:{imageurl:'./images/samuraiMack/Attack1.png',maxFrames:6},
    hit:{imageurl:'./images/samuraiMack/Take Hit - white silhouette.png',maxFrames:4},
    death:{imageurl:'./images/samuraiMack/Death.png',maxFrames:6}
  }
})

const player2=new sprite({
  position:{x:900,y:100},
  velocity:{x:0,y:0},
  color:'blue',
  imageurl:'./images/kenji/Idle.png',
  maxFrames:4,
  offset1:{x:-150,y:0},
  scale:2.2,
  offset:{x:180,y:180},
  spriteImages:{
    still:{imageurl:'./images/kenji/Idle.png',maxFrames:4},
    run:{imageurl:'./images/kenji/Run.png',maxFrames:8},
    jump:{imageurl:'./images/kenji/Jump.png',maxFrames:2},
    fall:{imageurl:'./images/kenji/Fall.png',maxFrames:2},
    attack:{imageurl:'./images/kenji/Attack1.png',maxFrames:4},
    hit:{imageurl:'./images/kenji/Take hit.png',maxFrames:3},
    death:{imageurl:'./images/kenji/Death.png',maxFrames:7}
  }
})

window.addEventListener('keydown',(e)=>{
  switch (e.key) {
    case 'd':
      keys.d.pressed=true;
      lastKeyPressed1='d';
      break;

    case 'a':
        keys.a.pressed=true;
        lastKeyPressed1='a';
      break;

    case 'w':
      if(e.repeat){
        keys.w.pressed=false;
        return
      };
        keys.w.pressed=true;
      break;

    case ' ':
       player1.attack(); 
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed=true;
      lastKeyPressed2='ArrowRight';
      break;

    case 'ArrowLeft':
        keys.ArrowLeft.pressed=true;
        lastKeyPressed2='ArrowLeft';
      break;

    case 'ArrowUp':
      if(e.repeat){
        keys.ArrowUp.pressed=false;
        return
      };
        keys.ArrowUp.pressed=true;
      break; 
    case 'ArrowDown':
        player2.attack();
       break;
    default:
      break;
  }
})
window.addEventListener('keyup',(e)=>{
  switch (e.key) {
    case 'd':
      keys.d.pressed=false;
      lastKeyPressed1='a';
      
      break;
    case 'a':
      keys.a.pressed=false;
      lastKeyPressed1='d';
      
      break;
    case 'w':
        keys.w.pressed=false;
      break; 
    case 'ArrowRight':
      keys.ArrowRight.pressed=false;
      lastKeyPressed2='ArrowLeft';
      
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed=false;
      lastKeyPressed2='ArrowRight';
      
      break;
    case 'ArrowUp':
        keys.ArrowUp.pressed=false;
      break; 
    default:
      break;
  }
})

function animation(){
  window.requestAnimationFrame(animation)
  
  c.clearRect(0,0,canvas.width=1080,canvas.height=580)
  c.fillRect(0,0,canvas.width,canvas.height)
  background.update()
  shop.update()
  player1.update()
  player2.update()
  player1.velocity.x=0;

  if(keys.a.pressed && lastKeyPressed1 == 'a' && player1.position.x>25){
    player1.selectspriteimages('run');
    player1.velocity.x = -7;
  }else if(keys.d.pressed && lastKeyPressed1 == 'd' && player1.position.x<canvas.width-100){
    player1.selectspriteimages('run');
    player1.velocity.x = 7;
  }else{
    player1.selectspriteimages('still');
  };
  if(keys.w.pressed && player1.velocity.y ==0){
    player1.velocity.y=-12;
    // keys.w.pressed=false;
  }
  if(player1.velocity.y<0){
    player1.selectspriteimages('jump');
  }else if(player1.velocity.y>0){
    player1.selectspriteimages('fall');
  }
  //kenji
  player2.velocity.x=0;

  if(keys.ArrowLeft.pressed && lastKeyPressed2 == 'ArrowLeft' && player2.position.x>25){
    player2.selectspriteimages('run');
    player2.velocity.x = -7;
  }else if(keys.ArrowRight.pressed && lastKeyPressed2 == 'ArrowRight' && player2.position.x<canvas.width-100){
    player2.selectspriteimages('run');
    player2.velocity.x = 7;
  }else{
    player2.selectspriteimages('still');
  }
  if(keys.ArrowUp.pressed && player2.velocity.y ==0){
    player2.velocity.y=-12;
    // keys.ArrowUp.pressed=false;
  }
  if(player2.velocity.y<0){
    player2.selectspriteimages('jump');
  }else if(player2.velocity.y>0){
    player2.selectspriteimages('fall');
  }
  if( checkAttack({one:player1,two:player2}) && player1.isAttacking && player1.currentFrame==3 ){
    
    player1.isAttacking=false;
    if(player2.health>0 && player1.health>0){
      player2.health -= 20;
      player2.getHit()
      
      }
    if(player2.health>=0){
      // document.getElementById('player-2').style.width= player2.health+'%';  
      gsap.to('#player-2',{
        width:player2.health+'%'
      })
    }
  }else if(player1.isAttacking && player1.currentFrame==3){
    player1.isAttacking=false;
  }
  if( checkAttack({one:player2,two:player1}) && player2.isAttacking && player2.currentFrame==1){
    
    player2.isAttacking=false;
    if(player1.health>0 && player2.health>0){
      player1.health -= 20;
      player1.getHit()
    }
    if(player1.health>=0){
      gsap.to('#player-1',{
        width:player1.health+'%'
      }) 
    }
  }else if(player2.isAttacking && player2.currentFrame==1){
    player2.isAttacking=false;
  }
if(player1.health==0 || player2.health==0){
  result({player1,player2})
}
}
animation()