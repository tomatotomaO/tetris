const color_array = [
  [0, 0, 0],
  [255, 102, 102],
  [255, 178, 102],
  [255, 255, 102],
  [178, 255, 102],
  [102, 255, 255],
  [102, 102, 255],
  [178, 102, 255],
  [255, 255, 255],
  [200, 200, 200],
];

const length_BoxHeight = 18;
const NumofArray = new Array(length_BoxHeight).fill(0).map(() => new Array(12).fill(0));
const TFofArray = new Array(length_BoxHeight).fill(true).map(() => new Array(12).fill(true));

let numRotate = 0;
let newRotate = 0;
let KindofBox = 1;
let newKindofBox = 0;
const startX = 340;
const startY = 40;
const finishX = 880;
const size = 50;
const presentX=new Array(4).fill(0);
const presentY=new Array(4).fill(0);
let Falling=true;

class Box_array {

  guideline() { 
    for (let i = 0; i < length_BoxHeight; i++) {
      NumofArray[i][0] = 9;
      NumofArray[i][11] = 9;
    }
  
    for (let i = 0; i < 12; i++) {
      NumofArray[0][i] = 9;
      NumofArray[length_BoxHeight - 1][i] = 9;
    }
  }
  

  makeResult() {  
    for (let i = 0; i < length_BoxHeight; i++) {
      TFofArray[i].fill(true);
    }
    for (let i = 0; i < length_BoxHeight; i++) {
      for (let j = 0; j < 12; j++) {
        if (NumofArray[i][j] !== 0)
          TFofArray[i][j] = false;
      }
    }
  }
  

}//Array 초기화 
const A=new Box_array();


class Present_box {

  afterPlace_PresentArray() {
    presentX[0] = floor((640 - startX) / size);
    presentY[0] = floor((140 - startY) / size);
    this.Set_kind(numRotate);
  }

 Set_kind(num) {
    let px = presentX[0];
    let py = presentY[0];
    switch (KindofBox) {
      case 1: //z모양
        switch (num) {
          case 0:
            presentX[1] = px - 1;
            presentX[2] = px;
            presentX[3] = px + 1;
            presentY[1] = py;
            presentY[2] = py + 1;
            presentY[3] = py + 1;
            break;
          case 1:
            presentX[1] = px;
            presentX[2] = px - 1;
            presentX[3] = px - 1;
            presentY[1] = py - 1;
            presentY[2] = py;
            presentY[3] = py+1;

            break;
          case 2:
            presentX[1] = px +1;
            presentX[2] = px;
            presentX[3] = px -1;
            presentY[1] = py;
            presentY[2] = py - 1;
            presentY[3] = py - 1;
            break;
          case 3:
            presentX[1] = px;
            presentX[2] = px + 1;
            presentX[3] = px + 1;
            presentY[1] = py +1;
            presentY[2] = py;
            presentY[3] = py - 1;
            break;
        }

        break;

      case 2: //왼쪽L
        switch (num) {
          case 0:
            presentX[1] = px+1;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py;
            presentY[2] = py + 1;
            presentY[3] = py + 2;
            break;
          case 1:
            presentX[1] = px;
            presentX[2] = px - 1;
            presentX[3] = px - 2;
            presentY[1] = py+1;
            presentY[2] = py;
            presentY[3] = py;
            break;
          case 2:
            presentX[1] = px-1;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py;
            presentY[2] = py - 1;
            presentY[3] = py - 2;
            break;
          case 3:
            presentX[1] = px;
            presentX[2] = px + 1;
            presentX[3] = px + 2;
            presentY[1] = py-1;
            presentY[2] = py;
            presentY[3] = py;
            break;
        }

        break;
      case 3: //네모
        presentX[1] = px + 1;
        presentX[2] = px;
        presentX[3] = px + 1;
        presentY[1] = py;
        presentY[2] = py + 1;
        presentY[3] = py + 1;
        break;
      case 4: //L
        switch (num) {
          case 0:
            presentX[1] = px-1;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py;
            presentY[2] = py + 1;
            presentY[3] = py + 2;
            break;
          case 1:
            presentX[1] = px;
            presentX[2] = px+1;
            presentX[3] = px +2;
            presentY[1] = py+1;
            presentY[2] = py;
            presentY[3] = py;
            break;
          case 2:
            presentX[1] = px+1;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py;
            presentY[2] = py - 1;
            presentY[3] = py - 2;
            break;
          case 3:
            presentX[1] = px;
            presentX[2] = px + 1;
            presentX[3] = px + 2;
            presentY[1] = py-1;
            presentY[2] = py;
            presentY[3] = py;
            break;
        }

        break;
      case 5: //직선
        switch (num) {
          case 0:
            presentX[1] = px;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py - 1;
            presentY[2] = py + 1;
            presentY[3] = py + 2;
            break;
          case 1:
            presentX[1] = px - 1;
            presentX[2] = px +1;
            presentX[3] = px +2;
            presentY[1] = py;
            presentY[2] = py;
            presentY[3] = py;
            break;
          case 2:
            presentX[1] = px;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py +1;
            presentY[2] = py - 1;
            presentY[3] = py - 2;
            break;
          case 3:
            presentX[1] = px + 1;
            presentX[2] = px -1;
            presentX[3] = px -2;
            presentY[1] = py;
            presentY[2] = py;
            presentY[3] = py;
            break;
        }

        break;
      case 6: //왼쪽z
        switch (num) {
          case 0:
            presentX[1] = px +1;
            presentX[2] = px;
            presentX[3] = px - 1;
            presentY[1] = py;
            presentY[2] = py + 1;
            presentY[3] = py + 1;
            break;
          case 1:
            presentX[1] = px;
            presentX[2] = px - 1;
            presentX[3] = px - 1;
            presentY[1] = py +1;
            presentY[2] = py;
            presentY[3] = py - 1;
            break;
          case 2:
            presentX[1] = px -1;
            presentX[2] = px;
            presentX[3] = px + 1;
            presentY[1] = py;
            presentY[2] = py - 1;
            presentY[3] = py - 1;
            break;
          case 3:
            presentX[1] = px;
            presentX[2] = px + 1;
            presentX[3] = px + 1;
            presentY[1] = py -1;
            presentY[2] = py;
            presentY[3] = py + 1;
            break;
        }

        break;
      case 7: //ㅗ
        switch (num) {
          case 0:
            presentX[1] = px;
            presentX[2] = px-1;
            presentX[3] = px + 1;
            presentY[1] = py - 1;
            presentY[2] = py;
            presentY[3] = py;
            break;
          case 1:
            presentX[1] = px +1;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py;
            presentY[2] = py+1;
            presentY[3] = py - 1;
            break;
          case 2:
            presentX[1] = px;
            presentX[2] = px+1;
            presentX[3] = px - 1;
            presentY[1] = py +1 ;
            presentY[2] = py;
            presentY[3] = py;
            break;
          case 3:
            presentX[1] = px - 1;
            presentX[2] = px;
            presentX[3] = px;
            presentY[1] = py;
            presentY[2] = py-1;
            presentY[3] = py + 1;
            break;
        }

        break;
    }
  }


  testRotate(){
    this.Set_kind(newRotate);
    if (this.test_TF(0,0) === false) {
      this.Set_kind(numRotate);
      newRotate = numRotate;
    }
  
}


testLeft(){
  if(this.test_TF(0,0)===false){
    for(let i=0;i<4;i++){
      presentX[i]+=1;
    }
  }
}

testRight(){
  if(this.test_TF(0,0)===false){
    for(let i=0;i<4;i++){
      presentX[i]-=1;
    }
  }
}

testDown(a){
  if(a===0){
if(this.test_TF(0,0)===false){
    for(let i=0;i<4;i++){
      presentY[i]-=1;
    }
  }
  }
  else
  return this.test_TF(0,1);
}

test2Down(){
  if(this.test_TF(0,0)===false){
    Falling=false;
    for(let i=0;i<4;i++){
      presentY[i]-=1;
    }
}
else
Falling=true;
}

test_TF(x,y){
  let rx=0,ry=0;
  rx=x;
  ry=y;
  A.makeResult();
  let result=true;
  let i=0;
  do{
    result=TFofArray[presentY[i]+ry][presentX[i]+rx];
    if(result===false){
      i+=4;
      break;
    }
    else
    i++;
  }while(i<4);
  return result;
}
  
}
const P=new Present_box();

class Save_Array{
  constructor(){
    this.result = new Array(length_BoxHeight).fill(true);
  }
  result_array() {
    let number = 0;
    let numArr = new Array(4).fill(0);
    this.result.fill(true);
  
    for (let i = length_BoxHeight - 2; i > 0; i--) {
      if (!NumofArray[i].some((cell) => cell === 0)) {
        this.result[i] = false;
        NumofArray[i].fill(8);
        number++;
        if (number > 0) numArr[number - 1] = i;
      }
    }
    if (number !== 0) this.option_seq(number, numArr);


    for(let i=0;i<length_BoxHeight;i++){
      for(let j=0;j<12;j++){
        if(NumofArray[i][j]===null)
        NumofArray[i][j]=0;
        else if(NumofArray[i][j]===8)
        NumofArray[i][j]=0;
      }
    }
  }
  

  is_sequance(n, numArr) {
    let r=0;
    switch(n){
      case 2:
        r= new Array(1);
        break;
        case 3:
        r= new Array(2);
        break;
        case 4:
        r= new Array(3);
        break;
    }
    for (let i = 0; i < n - 1; i++) {
      r[i] = numArr[i] - 1 === numArr[i + 1];
    }
    return r;

    
  }

  option_seq(n, numArr) {
    let r = this.is_sequance(n, numArr);
    let a = 0;
    if (r===0||r.indexOf(false)=== -1) {
      this.reSave(n, numArr[0]);
    } else {
      switch (n) {
        case 2:
          if (r.indexOf(true) === -1) {
            this.repeat_reSave(numArr, 1, 2); // 1, 1
          } else {
            this.reSave(2, numArr[r.indexOf(true)]);
            this.reSave(1, numArr[r.indexOf(false)]);
          }
          break;
        case 3:
          if (r.indexOf(true) === -1) {
            this.repeat_reSave(numArr, 1, 3); // 1, 1, 1
          } else {
            this.reSave(2, numArr[r.indexOf(true)]);
            this.reSave(1, numArr[r.indexOf(false)]);
          }
          break;
        case 4:
          for (let i = 0; i < 3; i++) {
            if (r[i] === true) a++;
          }
  
          if (a === 3) {
            this.reSave(1, numArr[b]);
            this.reSave(3, numArr[r.indexOf(true)]);
          } else if (a === 2) {
            if (r[0] === true && r[1] === false) {
              this.reSave(1, numArr[b]);
              this.reSave(1, numArr[r.indexOf(true)]);
            } else if (r[1] === true && r[2] === false) {
              this.reSave(1, numArr[b]);
              this.reSave(1, numArr[r.indexOf(true)]);
            }
          } else if (a === 1) {
            this.reSave(1, numArr[b]);
            this.reSave(2, numArr[r.indexOf(true)]);
            this.reSave(1, numArr[r.indexOf(false)]);
          } else {
            this.repeat_reSave(numArr, 1, 4);
          }
          break;
      }
    }
  }
  
  

  reSave(kind, num) {
    for (let i = num; i-kind>0; i--) {
      NumofArray[i] = NumofArray[i - kind];
      this.result[i] = this.result[i - kind];
    }
  }

  repeat_reSave(numArr, kind, num) {
    for (let i = 0; i < num; i++) {
      this.reSave(kind, numArr[i]);
    }
  }

placeBlock() {
    for (let i = 0; i < 4; i++) {
      if(NumofArray[presentY[i]][presentX[i]]===0)
      NumofArray[presentY[i]][presentX[i]] = KindofBox;
    }
    clear();
    background(0);
    newKindofBox = int(random(1, 8));
    KindofBox = newKindofBox;
    newRotate=0;
    numRotate=0;
    P.afterPlace_PresentArray();
  }


}
const S=new Save_Array();


class Draw_Game{

  draw_array() {
    let c = 0;
  
    for (let iy = 0; iy < length_BoxHeight; iy++) {
      for (let ix = 0; ix < 12; ix++) {
        
        c = NumofArray[iy][ix];
        if(c===0)
        noStroke();
        else{
          stroke(0);
          strokeWeight(5);
        }
        fill(color_array[c]);
        rect(startX + size * ix, startY + size * iy, size, size);
      }
    }
  }


  fallingBox() {
    let c = colorSet();
    stroke(0);
    strokeWeight(5);
    fill(c);
    for (let i = 0; i < 4; i++) {
      rect(
        startX + size * presentX[i],
        startY + size * presentY[i],
        size,
        size
      );
    }
  }
}


const D=new Draw_Game();


function fall(){
  let fr = frameCount % 30;
  if (fr === 0 && P.testDown(1) === true&&Falling===true) {
      for(let i=0;i<4;i++){
 presentY[i]+=1;
      } 
  }
  return fr;
}


function setup() {
  A.guideline();
  A.makeResult();
  createCanvas(1280, 980);
  background(0);
  frameRate(100);
  KindofBox = int(random(1, 8));
  P.afterPlace_PresentArray()
}



function draw() {
  A.guideline();
  Falling=P.testDown(1);
  fall();
  D.draw_array();
  D.fallingBox();


  if (keyIsDown(40)) {
    if(fall()!==0){
      for(let i=0;i<4;i++){
 presentY[i]+=1;
      } 
      P.testDown(0);
  }}
  P.test2Down();
}

function colorSet() {
  let i;
  switch (KindofBox) {
    case 0:
      i = color_array[0];
      break;
    case 1:
      i = color_array[1];
      break;
    case 2:
      i = color_array[2];
      break;
    case 3:
      i = color_array[3];
      break;
    case 4:
      i = color_array[4];
      break;
    case 5:
      i = color_array[5];
      break;
    case 6:
      i = color_array[6];
      break;
    case 7:
      i = color_array[7];
      break;
    default:
      i = 0;
      break;
  }
  return i;
}

function keyPressed() {

  switch (keyCode) {
    case 37: // Left arrow
      
      
      for(let i=0;i<4;i++){
        presentX[i]-=1;
      }
      P.testLeft();
      break;

    case 39: // Right arrow
    for(let i=0;i<4;i++){
        presentX[i]+=1;
      }
      P.testRight();
      
      break;
    case 90: //z
      numRotate = newRotate;
      newRotate--;
      P.testRotate();
      break;
    case 88: //x
      numRotate = newRotate;
      newRotate++;
      P.testRotate();
      break;
      case 13:
        S.placeBlock();
        S.result_array();
        A.guideline();
        A.makeResult();
      break;

  }



  switch (key) {
    case "1":
      KindofBox = 1;
      break;
    case "2":
      KindofBox = 2;
 
      break;
    case "3":
      KindofBox = 3;
   
      break;
    case "4":
      KindofBox = 4;
 
      break;
    case "5":
      KindofBox = 5;
      break;
    case "6":
      KindofBox = 6;
      break;
    case "7":
      KindofBox = 7;
      break;
}
if(keyCode>=48&&keyCode<=57)
P.Set_kind(numRotate);
}

class RedictBox{

  constructor() {
    this.nextX = new Array(4).fill(0);
    this.nextY = new Array(4).fill(0);
  }

  draw_lineBox(){
    this.nextX=presentX.valueOf();
    this.find_nextY();
    noFill();
    stroke(255);
    strokeWeight(2);
    for(let i=0;i<4;i++){
      rect(startX+this.nextX*size,startY+this.nextY*size,size,size);
    }
  }

  find_nextY(){
    this.nextY[0]=16;
    if(this.calculate_next()===false)
    this.nextY--;
  }

  calculate_next(){
    let nextR=true;
    let nY,nX;
    for(let i=0;i<4;i++){
nY=this.nextY[i];
nX=this.nextX[i];
      if (NumofArray[nY][nX] !== 0)
this.nextR=false;
    }
    return nextR;
  }
}

const R=new RedictBox();