class Imagesprite{
  constructor({position,width,maxFrames=1,height,scale=1,slowunit=10,imageurl,offset={x:0,y:0},spriteImages}){
    this.scale=scale;
    this.spriteImages=spriteImages;
    this.offset=offset;
    this.position = position;
    this.currentFrame=0;
    this.maxFrames=maxFrames,
    this.image = new Image(width,height);
    this.image.src=imageurl;
    this.slowUpdate=0;
    this.slowunit=slowunit;
  }
  draw(){
    c.drawImage(this.image,
      this.currentFrame*(this.image.width/this.maxFrames),
      0,
      this.image.width/this.maxFrames,
      this.image.height,
      this.position.x-this.offset.x,
      this.position.y-this.offset.y,
      (this.image.width/this.maxFrames)*this.scale,
      this.image.height*this.scale)
  }
  animateFrames(){
    this.slowUpdate++;
    if(this.slowUpdate % this.slowunit==0){
      if(this.currentFrame<this.maxFrames-1 && this.maxFrames>1){
        this.currentFrame++;
      }else{
        this.currentFrame=0;
      }  
    }
  }
  update(){
    this.draw()
    this.animateFrames()
    
  }
}
class sprite extends Imagesprite {
  constructor({position,velocity,color,width,slowunit=10,maxFrames=1,height,scale=1,imageurl,offset1={x:0,y:0},offset={x:0,y:0},spriteImages}){
    super({position,width,height,scale,maxFrames,imageurl,slowunit,offset,spriteImages})
    this.velocity = velocity;
    this.height=150;
    this.width=50;
    this.health=100;
    this.isAttacking=false;
    this.slowUpdate=0;
    this.attackBox={
      position:{
        x:this.position.x,
        y:this.position.y
      },
      offset1,
      width:200,
      height:50
    }
    this.color=color;
    for(const sprite in this.spriteImages){
      spriteImages[sprite].image=new Image();
      spriteImages[sprite].image.src=spriteImages[sprite].imageurl
    }
  }
  attack(){
    this.selectspriteimages('attack');
    this.isAttacking=true;
  }
  getHit(){
    if(this.health==0){
      this.selectspriteimages('death')
    }else{
      this.selectspriteimages('hit')
    }
  }
  selectspriteimages(key){
    if(this.image==this.spriteImages.death.image){return}
    if(this.image===this.spriteImages.hit.image && this.currentFrame+1<this.spriteImages.hit.maxFrames){
      return
    }
    if(this.image===this.spriteImages.attack.image && this.currentFrame+1<this.spriteImages.attack.maxFrames){
      return
    }
    switch (key) {
      case 'run':
        if(this.image !== this.spriteImages.run.image){
          this.image=this.spriteImages.run.image;
        this.maxFrames=this.spriteImages.run.maxFrames;
        this.currentFrame=0;
        }
        break;
      case 'still':
        if(this.image !== this.spriteImages.still.image){
          this.image=this.spriteImages.still.image;
        this.maxFrames=this.spriteImages.still.maxFrames;
        this.currentFrame=0;
        }
        break;
      case 'jump':
        if(this.image != this.spriteImages.jump.image){
          this.image=this.spriteImages.jump.image;
        this.maxFrames=this.spriteImages.jump.maxFrames;
        this.currentFrame=0;
        }
        break;
      case 'fall':
        if(this.image !== this.spriteImages.fall.image){
          this.image=this.spriteImages.fall.image;
        this.maxFrames=this.spriteImages.fall.maxFrames;
        this.currentFrame=0;
        }
        break;
      case 'attack':
      if(this.image !== this.spriteImages.attack.image){
        this.image=this.spriteImages.attack.image;
      this.maxFrames=this.spriteImages.attack.maxFrames;
      this.currentFrame=0;
      }
        break;
      case 'death':
      if(this.image !== this.spriteImages.death.image){
        this.image=this.spriteImages.death.image;
      this.maxFrames=this.spriteImages.death.maxFrames;
      this.currentFrame=0;
      }
      break;
    case 'hit':
      if(this.image !== this.spriteImages.hit.image){
        this.image=this.spriteImages.hit.image;
      this.maxFrames=this.spriteImages.hit.maxFrames;
      this.currentFrame=0;
      }
      break;
      default:
        break;
    }
  }
  update(){
    this.draw()
    if(this.image==this.spriteImages.death.image && this.currentFrame+1==this.maxFrames){
      return
    }else{
      this.animateFrames();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.attackBox.position.x=this.position.x + this.attackBox.offset1.x ;
    this.attackBox.position.y=this.position.y; 
    if(this.position.y + this.image.height + this.velocity.y > canvas.height){
      this.velocity.y=0;
      this.position.y=380.0000000000001;
    }else{
      this.velocity.y += .8
    }
    }
  }
}