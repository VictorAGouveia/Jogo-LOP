var faseAt, contaTipo, fasePre, blocoImg;
var BlocoCoord = [];
let CoordUsada = [];
let i, j, val, s;

let valores = [];
var Bloco;

function Resposta(){
  //Definir Fase
  if(faseAt == 0){
    faseAt = 1;
  }
  else{
    if(win){
    faseAt++;
    }
    else{
      faseAt = fasePre;
    }
  }
  //Definir Tipo de conta
  contaTipo = parseInt((faseAt-1)/5);
  
  if(contaTipo == 0){
    im = loadImage('assets/Tile1.png');
    caixaImg = loadImage('assets/Caixa_Info1.png');
  }
  if(contaTipo == 1){
    im = loadImage('assets/Tile2.png');
    caixaImg = loadImage('assets/Caixa_Info2.png');
  }
  if(contaTipo == 2){
    im = loadImage('assets/Tile3.png');
    caixaImg = loadImage('assets/Caixa_Info3.png');
  }
  if(contaTipo == 3){
    im = loadImage('assets/Tile4.png');
    caixaImg = loadImage('assets/Caixa_Info4.png');
  }
  
  win = false;
  //Definir conta aleatória
  Conta();
  //Criar bloco da resposta;
  Blocos();
}

function Conta(){
      if(contaTipo == 0){
        //Entre as fases 1 a 5, contas de soma
        result = parseInt(random(5, 15));

        x1 = parseInt(random(1, result-1));
        x2 = result - x1;
    
        msg = x1 + " + _ = " + result;
        msgW = x1 + " + "+ x2 + " = " + result;
    } else if(contaTipo == 1){
        //Entre as fases 6 a 10, contas de subtração
      result = parseInt(random(5, 15));

      x2 = parseInt(random(1, result-1));
      x1 = result + x2;
      
      msg = x1 + " - _ = " + result;
      msgW = x1 + " - "+ x2 + " = " + result;
    } else if(contaTipo == 2){
        //Entre as fases 11 a 15, contas de multiplicação
      result = parseInt(random(5, 50));
      x2 = parseInt(random(1, result-1));
      if(result%x2 != 0){
        Conta();
      }
      else{
        x1 = result / x2;
      
        msg = x1 + " x _ = " + result;
        msgW = x1 + " x "+ x2 + " = " + result;
      }
    } else if(contaTipo == 3){
        //Entre as fases 16 a 20, contas de divisão
      result = parseInt(random(1, 10));

      x2 = parseInt(random(1, 10));
      x1 = x2 * result;
      msg = x1 + " / _ = " + result;
      msgW = x1 + " / "+ x2 + " = " + result;
  }
}

function Blocos(){
  Bloco = new Group();
  //escolher bloco aleatorio
  i = (BlocoCoord.length/2) - 1;

  j = parseInt(random(0, i)+0.5)*2;
  //criar sprite do bloco na posição escolhida
  resp = new Sprite(BlocoCoord[j],BlocoCoord[j+1], blocoImg.width*(tS/64), blocoImg.height*(tS/64), 'static');
  
  BlocoCoord.splice(j, 2);
  
  resp.draw= () => {
    noStroke();
    image(blocoImg, 0, 0, blocoImg.width*(tS/64), blocoImg.height*(tS/64));
    
    fill(0);
    textSize(30);
    textStyle(BOLD);
    text(x2, 0, 0);
    textAlign(CENTER, CENTER);
    }
  Bloco.add(resp);
  valores.push(x2);
  //criar outros blocos diferentes nas demais localizações
  for(let c = BlocoCoord.length/2; c > 0; c--){
     val = parseInt(random(1, 15));
     while(valores.indexOf(val) != -1){
       val = parseInt(random(1, 15));
     }
     valores.push(val);
  }
  valores.splice(0, 1);
  
  while(BlocoCoord.length > 0){
    s = new Sprite(BlocoCoord[0],BlocoCoord[1], blocoImg.width*(tS/64), blocoImg.height*(tS/64), 'static');
    
    BlocoCoord.splice(0, 2);
    let x = valores[0];
    valores.splice(0, 1)
    s.draw= () => {
      noStroke();
      image(blocoImg, 0, 0, blocoImg.width*(tS/64), blocoImg.height*(tS/64));
    
      fill(0);
      textSize(30);
      textStyle(BOLD);
      text(x, 0, 0);
      textAlign(CENTER, CENTER);
    }
    Bloco.add(s);
  }
}
