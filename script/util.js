function checkAttack({one,two}){
  return one.attackBox.position.x + one.attackBox.width>=two.position.x && one.attackBox.position.x <=two.position.x+two.width && one.attackBox.position.y+one.attackBox.height>=two.position.y && one.attackBox.position.y<=two.position.y+two.height
}
let time=60;
function result({player1,player2}){
  clearInterval(interval)

  let result=document.querySelector('#result-output');
  if(result.innerHTML){
    return
  }

  if(player1.health===player2.health){
    result.innerHTML='DRAW'
  }else if(player1.health>player2.health){
    result.innerHTML='PLAYER 1 WINS'
  }else if(player2.health>player1.health){
    result.innerHTML='PLAYER 2 WINS'
  }
}
const interval=setInterval(()=>{
  time--;
  document.querySelector('.timer-container').innerHTML=time
  if(time==0){
    result({player1,player2})
  }
},1000)

