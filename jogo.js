let x1, x2, result;
let win = false;
let player, chaoD, resp;
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
      text('VOCÊ VENCEU!', width/2, 150);
    }
    //detecção de input e travar rotação do player
    keyDetect();
    player.rotation = 0;
    //vitória
    if(player.overlaps(resp)){
      resp.remove();
      win = true;
    }
    //retorno ao menu
    if(kb.presses('escape')){
      player.remove();
      piso.remove();
      resp.remove();
      sceneLoad(0);
    }
  }
}
function StartFase(){ //Iniciar a fase;
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
    CarregarFase();
  //Invocar e definir propriedades do jogador;
  player = new Sprite(100, 550, 40, 60);
  player.color = color(150, 135, 160);
  player.bounciness = 0;
  player.layer = 2;
  player.overlaps(resp);
  
  chaoD = new Sprite(100, 515, 35, 10);
  chaoD.overlaps(group);
  chaoD.overlaps(player);
  chaoD.color = color(0, 0, 0, 0)
  
  // gravidade e plataforma;
  world.gravity.y = 25;
  group.bounciness = 0.01;
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
  chaoD.x = player.x;
  chaoD.y = player.y + 30;
  if((kb.presses('up') || kb.presses('ArrowUp')) && chaoD.overlapping(group)){
    player.addSpeed(1300, 90);
  }
}