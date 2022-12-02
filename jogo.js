var x1, x2, result;
var msg, msgW;
var caixaImg;
var bgJogo;
let win = false;
let player, chaoD, resp, txt;
var faseTile;

function StartFase(){ //Iniciar a fase;
  faseTile = new Group();
  CarregarFase(faseTile);
  Resposta();
  //Invocar e definir propriedades do jogador;
  player = new Sprite(100, 550, 40, 60);
  player.color = color(150, 135, 160);
  player.bounciness = 0;
  player.layer = 2;
  player.overlaps(resp);
  
  chaoD = new Sprite(100, 515, 35, 10);
  chaoD.overlaps(faseTile);
  chaoD.overlaps(player);
  chaoD.color = color(0, 0, 0, 25)
  
  // gravidade e plataforma;
  world.gravity.y = 25;
  faseTile.bounciness = 0.01;
  
  txt = new Sprite(0,0)
  txt.removeColliders();
  txt.static = true;
  txt.color = color(0,0,0)
  txt.draw = () => {
    TextoFase();
  }
  
  }

class Jogo{
  update(){ //Manter jogo rodando
    background(0);
    image(bgJogo, width/2, height/2, width, height)

    //detecção de input e travar rotação do player
    keyDetect();
    player.rotation = 0;
    player.rotationSpeed = 0;
    //vitória
    player.overlapping(Bloco, Ganhar)
    //retorno ao menu
    if(kb.presses('escape')){
      fasePre = faseAt;
      player.remove();
      chaoD.remove();
      faseTile.removeAll();
      faseTile.remove();
      resp.remove();
      txt.remove();
      Bloco.removeAll();
      Bloco.remove();
      sceneLoad(0);
    }
    txt.update()
  }
}
function Ganhar(player, blc){
  if(Bloco.indexOf(blc) == 0){
    win = true;
  }
  blc.remove();
}
function TextoFase(){
  //Aviso como voltar pro menu
  image(caixaImg, width/2, 86, 50*caixaImg.width/tS, 50*caixaImg.height/tS)
  textSize(20);
  text('Fase: ' + faseAt, width/2, (50*caixaImg.height/tS/2)-45);
  
  //Texto da pergunta 
    textSize(50);
    textAlign(CENTER, CENTER);
    if(!win){
      text(msg, width/2, ((50*caixaImg.height/tS)/2));
    }
    else{ // Após vencer a fase
      text(msgW, width/2, ((50*caixaImg.height/tS/2)));
      textSize(20);
      text('Aperte X para passar de fase', width/2, ((50*caixaImg.height/tS)/2)+50);
      
      if(kb.presses('x')){
        player.remove();
        chaoD.remove();
        faseTile.removeAll();
        faseTile.remove();
        resp.remove();
        txt.remove();
        Bloco.removeAll();
        Bloco.remove();
        if(faseAt < 20){
          StartFase();
        }
        else{
          txt.remove();
          menu = 3;
        }
      }
    }
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
  }
  chaoD.x = player.x;
  chaoD.y = player.y + 30;
  if((kb.presses('up') || kb.presses('ArrowUp')) && chaoD.overlapping(faseTile)){
    player.addSpeed(1300, 90);
  }
}