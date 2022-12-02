var fase = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,2,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,2,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,2,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,0,0,0,0,0,0,0,0,2,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

var im;

var tS, b;

function CarregarFase(group){
  BlocoCoord = [];
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
  tS = width/16;
    for(let i = 0; i < fase.length; i++){
      let x = i%16;
      let y = parseInt(i/16);
      let s;
      if(fase[i] == 1){
        s = new Sprite(tS *(x+0.5), tS *(y+0.5), tS, tS, 'static');
        s.layer = 20;
        s.draw = () =>{
          image(im, 0, 0, tS, tS);
        }
        group.add(s);
      }
      
      if(fase[i] == 2){
        BlocoCoord.push(tS *(x+0.5));
        BlocoCoord.push(tS *(y+0.5));
      }
    }
}