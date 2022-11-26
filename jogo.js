let x1, x2, result;
let win = false;
let player, chaoD, resp;
var faseTile;
class Jogo{
  update(){ //Manter jogo rodando
    background(230);
    fill(15);
    //Aviso como voltar pro menu
      textSize(20);
      text('Aperte ESC para voltar ao menu', width/2, 50);
    //Texto da pergunta 
    textSize(50);
    textAlign(CENTER, CENTER);
    if(!win){
      text(x1 + ' + _ = ' + result, width/2, 100);
    }
    else{ // Após vencer a fase
      text(x1 + ' + ' + x2 + ' = ' + result, width/2, 100);
      textSize(20);
      text('VOCÊ VENCEU! \n Aperte x para passar de fase', width/2, 150);
      
      if(kb.presses('x')){
        player.remove();
        chaoD.remove();
        faseTile.removeAll();
        faseTile.remove();
        resp.remove();
        
        StartFase();
      }
    }
    //detecção de input e travar rotação do player
    keyDetect();
    player.rotation = 0;
    player.rotationSpeed = 0;
    //vitória
    if(player.overlaps(resp)){
      resp.remove();
      win = true;
    }
    //retorno ao menu
    if(kb.presses('escape')){
      player.remove();
      chaoD.remove();
      faseTile.removeAll();
      faseTile.remove();
      resp.remove();
      sceneLoad(0);
    }
  }
}
function StartFase(){ //Iniciar a fase;
  faseTile = new Group();
  CarregarFase(faseTile);
  win = false;
  //Definir conta aleatória
  result = parseInt(random(5, 15));
  x1 = parseInt(random(1, result-1));
  x2 = result - x1;
  //Criar bloco da resposta;
  resp = new Sprite(600, 500, 60, 60);
  resp.collider = 'static'
  resp.draw= () => {
    fill(214, 153, 11);
    rect(0, 0, 60);
    
    fill(0);
    textSize(30);
    textStyle(BOLD);
    text(x2, 0, 0);
    textAlign(CENTER, CENTER);
    }
  //Invocar e definir propriedades do jogador;
  player = new Sprite(100, 550, 40, 60);
  player.color = color(150, 135, 160);
  player.bounciness = 0;
  player.layer = 2;
  player.overlaps(resp);
  player.removed = false;
  
  chaoD = new Sprite(100, 515, 35, 10);
  chaoD.overlaps(faseTile);
  chaoD.overlaps(player);
  chaoD.removed = false;
  chaoD.color = color(0, 0, 0, 25)
  
  // gravidade e plataforma;
  world.gravity.y = 25;
  faseTile.bounciness = 0.01;
  faseTile.removed = false;
  }

function keyDetect(){ // detecção de teclado e movimento do jogador
  //movimento horizontal
  if(kb.pressing('left') || kb.pressing('ArrowLeft')){
    player.vel.x = -8;
  }
  else if(kb.pressing('right') || kb.pressing('ArrowRight'))   {
    player.vel.x = 8;
  }
  else{
    player.vel.x = 0;
  }
  //pulo
  if(chaoD.overlapping(faseTile)){
    console.log('chao')
  }
  chaoD.x = player.x;
  chaoD.y = player.y + 30;
  if((kb.presses('up') || kb.presses('ArrowUp')) && chaoD.overlapping(faseTile)){
    player.addSpeed(1300, 90);
  }
}