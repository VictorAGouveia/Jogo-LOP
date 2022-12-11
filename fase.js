var fase = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,2,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,2,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

var im, tS;

function CarregarFase(group){
  //Obter tamanho dos blocos e grupo de respostas
  BlocoCoord = [];
  tS = width/16;
  //conferir cada bloco e definir sua coordenada
    for(let i = 0; i < fase.length; i++){
      let x = i%16;
      let y = parseInt(i/16);
      let s;
      if(fase[i] == 1){
        //criar blocos com colisões para cada parte do mapa
        s = new Sprite(tS *(x+0.5), tS *(y+0.5), tS, tS, 'static');
        s.layer = 0;
        s.draw = () =>{
          image(im, 0, 0, tS, tS);
        }
        group.add(s);
      }
      
      if(fase[i] == 2){
        //adicionar coordenadas dos blocos de respostas no seu grupo
        BlocoCoord.push(tS *(x+0.5));
        BlocoCoord.push(tS *(y+0.5));
      }
    }
}