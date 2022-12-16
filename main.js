let butImg, butImgO, bgImg, titulo, ty, a;
let key;
var menu = 0;
let game;
let musica;

function preload(){//carregar imagens
  soundFormats('mp3');
  
  butImgO = loadImage('assets/Botao.png');
  butImg = loadImage('assets/Botao_Highlight.png');
  bgImg = loadImage('assets/Fundo_Menu.png');
  bgJogo = loadImage('assets/Fundo_Jogo.png')
  blocoImg = loadImage('assets/Bloco_Resposta.png');
  titulo = loadImage('assets/TituloP.png')
  
  musica = loadSound('assets/fishnchips.mp3');
  certo = loadSound('assets/certo.mp3');
  errado = loadSound('assets/errado.mp3');
  
  jumpU = loadImage('assets/player_jumpU.png');
  jumpD = loadImage('assets/player_jumpD.png');
  walk = loadImage('assets/player_walk.png');
  idle = loadImage('assets/player_idle.png');
}
function setup() {//Definir variáveis comuns
  createCanvas(720, 720);
  frameRate(30);
  rectMode(RADIUS);
  imageMode(CENTER);
  ty = (height/2)-200;
  a = 0;
  faseAt = 0;
  fasePre = 0;
  game = new Jogo();
  
  musica.setVolume(0.3);
  musica.play();
  musica.loop();
}

function draw() {
  //definir imagem de fundo
  background(0);
  noStroke();
  if(menu == 0){
    //Menu Principal
    image(bgImg, width/2, height/2, width, height)
    a = a + (deltaTime/1000);
    ty = ty+(Math.sin(a)/5);
    image(titulo, width/2, ty, titulo.width*(128/720)*5, titulo.height*(128/720)*5);

    //invocar botões do menu
    new Button(width/2, (height/2)+ 120, butImg, butImgO, 'CRÉDITOS', sceneLoad, 1, 1);
    new Button(width/2, height/2, butImg,  butImgO, 'JOGAR', sceneLoad, 2, 1, StartFase);
    new Button(width/2, (height/2)+ 240, butImg, butImgO, 'TUTORIAL', sceneLoad, 5, 1)
  }
  
  if(menu == 1){//Menu de Créditos
    image(bgImg, width/2, height/2, width, height)
    image(titulo, width/2, (height/2)-240, titulo.width*(128/720)*3.5, titulo.height*(128/720)*3.5);
    //Nome dos Desenvolvedores
    new TextGen('DESENVOLVEDORES', width/2, height/2 -160, 40, CENTER, CENTER, BOLD, 255);

    new TextGen('Dante Mendes Gomes', width/2, (height/2) - 60, 26, CENTER, CENTER, NORMAL, 255);
    new TextGen('Victor de Alcantara Gouveia', width/2, (height/2) - 20, 26, CENTER, CENTER, NORMAL, 255);
    new TextGen('Sávio Rafael Marques de Alcântara', width/2, (height/2) + 20, 26, CENTER, CENTER, NORMAL, 255);
    new TextGen('Arte da Fase por Michele "Buch" em OpenGameArt.org - Uso sob CC0', width/2, (height/2) + 90, 15, CENTER, CENTER, NORMAL, 255);
    new TextGen('Música - "Fish n Chips" por "iamoneabe" em OpenGameArt.org - Uso sob CC0', width/2, height/2 + 110, 15, CENTER, CENTER, NORMAL, 255);
    //Botão de voltar
    noStroke()
    new Button(100, height - 70, butImg, butImgO, 'VOLTAR', sceneLoad, 0, 0.75)
    if(kb.presses('escape')){
      sceneLoad(0);
    }
  }
  if(menu == 2){
    //Executar o "update" do jogo
    game.update();
    }
  if(menu == 3){
      //Tela de Fim de Jogo
      image(bgImg, width/2, height/2);
      new TextGen('VOCÊ VENCEU O JOGO!!!', width/2, height/2, 50, CENTER, CENTER, BOLD, 255);
      new Button(100, height - 70, butImg, butImgO, 'MENU', sceneLoad, 0, 0.75)
      faseAt = 0;
      fasePre = 0;
      if(kb.presses('escape')){
        menu = 0;
      }
  }
  if(menu == 4){
      //Tela de Derrota
      image(bgImg, width/2, height/2);
      new TextGen('VOCÊ PERDEU :(', width/2, height/2, 50, CENTER, CENTER, BOLD, 255);
      new Button(100, height - 70, butImg, butImgO, 'MENU', sceneLoad, 0, 0.75)
      if(kb.presses('escape')){
        menu = 0;
      }
    }
  if(menu == 5){
      //Tela de Tutorial
      image(bgImg, width/2, height/2);
      image(titulo, width/2, (height/2)-240, titulo.width*(128/720)*3.5, titulo.height*(128/720)*3.5);
      new TextGen('TUTORIAL', width/2, (height/2)-160, 40, CENTER, CENTER, BOLD, 255);
      new TextGen('Use as setas para direita e esquerda ou use os', width/2, (height/2)-75, 25, CENTER, CENTER, BOLD, 255);
    new TextGen('botões A e D para se mover.', width/2, (height/2)-50, 25, CENTER, CENTER, BOLD, 255);
    new TextGen('Use a seta para cima ou W para pular.', width/2, (height/2), 25, CENTER, CENTER, BOLD, 255);
    new TextGen('Uma conta vai aparecer no topo da fase.', width/2, (height/2)+50, 25, CENTER, CENTER, BOLD, 255);
    new TextGen('\nUma conta vai aparecer no topo da fase.\nColete o bloco com a resposta correta.\nVocê só pode errar uma vez.', width/2, (height/2)+75, 25, CENTER, CENTER, BOLD, 255);
    new Button(100, height - 70, butImg, butImgO, 'VOLTAR', sceneLoad, 0, 0.75)
      if(kb.presses('escape')){
        menu = 0;
      }
    }
}

function sceneLoad(n){ //Carregar "Cena" diferente
  menu = n;
}

class Button { //Botão Instanciável
  constructor(bX, bY, img, imgO, txt, act, m, size, act2){
    let over = false;
    //definir imagem e texto do botão
    image(img, bX, bY, img.width*size, img.height*size)

    //detectar sobreposição do mouse
    if(mouseX > bX - img.width*size/2 &&
       mouseX < bX + img.width*size/2 &&
       mouseY > bY - img.height*size/2 &&
       mouseY < bY + img.height*size/2)
    {
      over = true;
      image(imgO, bX, bY, img.width*size, img.height*size)
    }
    else{
      over = false;
    } 
    new TextGen(txt, bX, bY, 24*size, CENTER, CENTER, BOLD, 255)
    //agir quando mouse sobre o botão
    if(over && mouseIsPressed){
      act(m);
      if(act2 != null){
        act2();
      }
    }
  }
}

class TextGen{//texto instanciável
  constructor(txt, pX, pY, size, alX, alY, style, color){
    //em ordem, definir cor, tamanho, estilo, escrita e alinhamento
    fill(color);
    textSize(size);
    textStyle(style);
    text(txt, pX, pY);
    textAlign(alX, alY);
  }
}