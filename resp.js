var faseAt, contaTipo, fasePre, blocoImg;
var BlocoCoord = [];
let CoordUsada = [];
let i, j, val, s;

let valores = [];
var Bloco;

function Resposta(){
  //Definir Fase
  if(faseAt == 0){
    faseAt = 5;
  }
  else if(fasePre == 0){
    faseAt++;
  }
  else{
    faseAt = fasePre;
  }
  //Definir Tipo de conta
  contaTipo = parseInt((faseAt-1)/5);
  
  if(contaTipo == 0){
    im = loadImage('assets/Tile1.png');
  }
  if(contaTipo == 1){
    im = loadImage('assets/Tile2.png');
  }
  if(contaTipo == 2){
    im = loadImage('assets/Tile3.png');
  }
  if(contaTipo == 3){
    im = loadImage('assets/Tile4.png');
  }
  
  win = false;
  //Definir conta aleatória
  Conta();
  //Criar bloco da resposta;
  Blocos();
}

function Conta(){
      if(contaTipo == 0){

      result = parseInt(random(5, 15));

      x1 = parseInt(random(1, result-1));
      x2 = result - x1;
    
      msg = x1 + " + _ = " + result;
      msgW = x1 + " + "+ x2 + " = " + result;
    } else if(contaTipo == 1){

      result = parseInt(random(5, 15));

      x2 = parseInt(random(1, result-1));
      x1 = result + x2;
      
      msg = x1 + " - _ = " + result;
      msgW = x1 + " - "+ x2 + " = " + result;
    } else if(contaTipo == 2){

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

      result = parseInt(random(1, 10));

      x2 = parseInt(random(1, 10));
      x1 = x2 * result;
      msg = x1 + " / _ = " + result;
      msgW = x1 + " / "+ x2 + " = " + result;
  }
}

function Blocos(){
  Bloco = new Group();
  i = (BlocoCoord.length/2) - 1;

  j = parseInt(random(0, i)+0.5)*2;
  
  resp = new Sprite(BlocoCoord[j],BlocoCoord[j+1], 28*(blocoImg.width/tS), 28*(blocoImg.height/tS), 'static');
  
  BlocoCoord.splice(j, 2);
  
  resp.draw= () => {
    image(blocoImg, 0, 0, 28*(blocoImg.width/tS), 28*(blocoImg.height/tS));
    
    fill(0);
    textSize(30);
    textStyle(BOLD);
    text(x2, 0, 0);
    textAlign(CENTER, CENTER);
    }
  Bloco.add(resp);
  valores.push(x2);
  
  for(let c = BlocoCoord.length/2; c > 0; c--){
     val = parseInt(random(1, 15));
     while(valores.indexOf(val) != -1){
       val = parseInt(random(1, 15));
     }
     valores.push(val);
  }
  valores.splice(0, 1);
  
  while(BlocoCoord.length > 0){
    s = new Sprite(BlocoCoord[0],BlocoCoord[1], 28*(blocoImg.width/tS), 28*(blocoImg.height/tS), 'static');
    
    BlocoCoord.splice(0, 2);
    let x = valores[0];
    valores.splice(0, 1)
    s.draw= () => {
    image(blocoImg, 0, 0, 28*(blocoImg.width/tS), 28*(blocoImg.height/tS));
    
    fill(0);
    textSize(30);
    textStyle(BOLD);
    text(x, 0, 0);
    textAlign(CENTER, CENTER);
    }
    Bloco.add(s);
  }
}