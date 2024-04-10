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
let x1 = 640,
  y1 = 90;

let numRotate = 0;
let newRotate = 0;
let KindofBox = 1;
let newKindofBox = 0;
const startX = 340;
const startY = 40;
const finishX = 880;
const size = 50;

class Box_array_height {
  constructor() {
    this.NumofArray_H = new Array(length_BoxHeight)
      .fill(0)
      .map(() => new Array(12).fill(0));
    this.result = new Array(length_BoxHeight).fill(true);
  }
  guideline() {
    this.NumofArray_H[0].fill(9);
    this.NumofArray_H[length_BoxHeight - 1].fill(9);
    for (let i = 0; i < length_BoxHeight; i++) {
      this.NumofArray_H[i][0] = 9;
      this.NumofArray_H[i][11] = 9;
    }
  }

  result_array() {
    let number = 0;
    let numArr = new Array(4).fill(0);
    this.result.fill(true);

    for (let i = length_BoxHeight - 2; i > 0; i--) {
      if (!this.NumofArray_H[i].some((cell) => cell === 0)) {
        this.result[i] = false;
        this.NumofArray_H[i].fill(8);
        number++;
        if (number > 0) numArr[number - 1] = i;
      }
    }
    if (number !== 0) this.option_seq(number, numArr);
    console.log(this.NumofArray_H);

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
      this.NumofArray_H[i] = this.NumofArray_H[i - kind];
      this.result[i] = this.result[i - kind];
    }
    
    for(let i=0;i<num;i++){
      this.NumofArray_H[i].fill(0);
    }
  }

  repeat_reSave(numArr, kind, num) {
    for (let i = 0; i < num; i++) {
      this.reSave(kind, numArr[i]);
    }
  }

  draw_array() {
    let c = 0;
    for (let iy = 0; iy < length_BoxHeight; iy++) {
      for (let ix = 0; ix < 12; ix++) {
        
        c = this.NumofArray_H[iy][ix];
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

  array_return() {
    return this.NumofArray_H;
  }
}

const H = new Box_array_height();

class Present_box {
  constructor(array) {
    this.NumofArray_H = array;
    this.presentX = new Array(4).fill(0);
    this.presentY = new Array(4).fill(0);
  }

  FindPresent_array() {
    let fr = frameCount % 30;
    this.presentX[0] = floor((x1 - startX) / size);
    this.presentY[0] = floor((y1 - startY) / size);
    this.Stop_rotateYx();
    if (this.Stop_presentYX(0) === true && fr === 0) {
      y1 += size;
    }
    return fr;
  }

  Set_kind(num) {
    let px = this.presentX[0];
    let py = this.presentY[0];
    switch (KindofBox) {
      case 1: //z모양
        switch (num) {
          case 0:
            this.presentX[1] = px - 1;
            this.presentX[2] = px;
            this.presentX[3] = px + 1;
            this.presentY[1] = py;
            this.presentY[2] = py + 1;
            this.presentY[3] = py + 1;
            break;
          case 1:
            this.presentX[1] = px;
            this.presentX[2] = px - 1;
            this.presentX[3] = px - 1;
            this.presentY[1] = py - 1;
            this.presentY[2] = py;
            this.presentY[3] = py+1;

            break;
          case 2:
            this.presentX[1] = px +1;
            this.presentX[2] = px;
            this.presentX[3] = px -1;
            this.presentY[1] = py;
            this.presentY[2] = py - 1;
            this.presentY[3] = py - 1;
            break;
          case 3:
            this.presentX[1] = px;
            this.presentX[2] = px + 1;
            this.presentX[3] = px + 1;
            this.presentY[1] = py +1;
            this.presentY[2] = py;
            this.presentY[3] = py - 1;
            break;
        }

        break;

      case 2: //왼쪽L
        switch (num) {
          case 0:
            this.presentX[1] = px+1;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py;
            this.presentY[2] = py + 1;
            this.presentY[3] = py + 2;
            break;
          case 1:
            this.presentX[1] = px;
            this.presentX[2] = px - 1;
            this.presentX[3] = px - 2;
            this.presentY[1] = py+1;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
          case 2:
            this.presentX[1] = px-1;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py;
            this.presentY[2] = py - 1;
            this.presentY[3] = py - 2;
            break;
          case 3:
            this.presentX[1] = px;
            this.presentX[2] = px + 1;
            this.presentX[3] = px + 2;
            this.presentY[1] = py-1;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
        }

        break;
      case 3: //네모
        this.presentX[1] = px + 1;
        this.presentX[2] = px;
        this.presentX[3] = px + 1;
        this.presentY[1] = py;
        this.presentY[2] = py + 1;
        this.presentY[3] = py + 1;
        break;
      case 4: //L
        switch (num) {
          case 0:
            this.presentX[1] = px-1;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py;
            this.presentY[2] = py + 1;
            this.presentY[3] = py + 2;
            break;
          case 1:
            this.presentX[1] = px;
            this.presentX[2] = px+1;
            this.presentX[3] = px +2;
            this.presentY[1] = py+1;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
          case 2:
            this.presentX[1] = px+1;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py;
            this.presentY[2] = py - 1;
            this.presentY[3] = py - 2;
            break;
          case 3:
            this.presentX[1] = px;
            this.presentX[2] = px + 1;
            this.presentX[3] = px + 2;
            this.presentY[1] = py-1;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
        }

        break;
      case 5: //직선
        switch (num) {
          case 0:
            this.presentX[1] = px;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py - 1;
            this.presentY[2] = py + 1;
            this.presentY[3] = py + 2;
            break;
          case 1:
            this.presentX[1] = px - 1;
            this.presentX[2] = px +1;
            this.presentX[3] = px +2;
            this.presentY[1] = py;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
          case 2:
            this.presentX[1] = px;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py +1;
            this.presentY[2] = py - 1;
            this.presentY[3] = py - 2;
            break;
          case 3:
            this.presentX[1] = px + 1;
            this.presentX[2] = px -1;
            this.presentX[3] = px -2;
            this.presentY[1] = py;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
        }

        break;
      case 6: //왼쪽z
        switch (num) {
          case 0:
            this.presentX[1] = px +1;
            this.presentX[2] = px;
            this.presentX[3] = px - 1;
            this.presentY[1] = py;
            this.presentY[2] = py + 1;
            this.presentY[3] = py + 1;
            break;
          case 1:
            this.presentX[1] = px;
            this.presentX[2] = px - 1;
            this.presentX[3] = px - 1;
            this.presentY[1] = py +1;
            this.presentY[2] = py;
            this.presentY[3] = py - 1;
            break;
          case 2:
            this.presentX[1] = px -1;
            this.presentX[2] = px;
            this.presentX[3] = px + 1;
            this.presentY[1] = py;
            this.presentY[2] = py - 1;
            this.presentY[3] = py - 1;
            break;
          case 3:
            this.presentX[1] = px;
            this.presentX[2] = px + 1;
            this.presentX[3] = px + 1;
            this.presentY[1] = py -1;
            this.presentY[2] = py;
            this.presentY[3] = py + 1;
            break;
        }

        break;
      case 7: //ㅗ
        switch (num) {
          case 0:
            this.presentX[1] = px;
            this.presentX[2] = px-1;
            this.presentX[3] = px + 1;
            this.presentY[1] = py - 1;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
          case 1:
            this.presentX[1] = px +1;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py;
            this.presentY[2] = py+1;
            this.presentY[3] = py - 1;
            break;
          case 2:
            this.presentX[1] = px;
            this.presentX[2] = px+1;
            this.presentX[3] = px - 1;
            this.presentY[1] = py +1 ;
            this.presentY[2] = py;
            this.presentY[3] = py;
            break;
          case 3:
            this.presentX[1] = px - 1;
            this.presentX[2] = px;
            this.presentX[3] = px;
            this.presentY[1] = py;
            this.presentY[2] = py-1;
            this.presentY[3] = py + 1;
            break;
        }

        break;
    }
  }

  guideline_stop(pX, pY) {
    for (let a = 0; a < 4; a++) {
      if (pX <= 0 || pX >= 11 || pY <= 0 || pY >= length_BoxHeight - 1)
        return false;
      else return true;
    }
  }

  Stop_presentYX(i) {
    let r = true;
    let pX = 3,
      pY = 0;
    for (let a = 0; a < 4; a++) {
      pY = this.presentY[a];
      pX = this.presentX[a];

      r = this.guideline_stop(pX, pY);
      if (pY >= 0 && pY < length_BoxHeight && pX >= 0 && pX < 12) {
        if (this.NumofArray_H[pY][pX] !== 0) {
          r = false;
        }
      }

      switch (abs(i)) {
        case 0:
      
          r = this.guideline_stop(pX, pY + 1);
          if (pY + 1 >= 0 && pY + 1 < length_BoxHeight && pX >= 0 && pX < 12) {
            if (this.NumofArray_H[pY + 1][pX] !== 0) {
              r = false;
            }
          }
          break;
        case 1:

          r = this.guideline_stop(pX + i, pY);
          if (pY >= 0 && pY < length_BoxHeight && pX + i >= 0 && pX + i < 12) {
            if (this.NumofArray_H[pY][pX + i] !== 0) {
              r = false;
            }
          }
          break;
      }
    }
    return r;
  }

  Stop_rotateYx() {
    this.Set_kind(newRotate);
    if (this.Stop_presentYX() === false) {
      this.Set_kind(numRotate);
      newRotate = numRotate;
    }
  }

  fallingBox() {
    let c = colorSet();
    this.Stop_rotateYx();
    this.FindPresent_array();

    stroke(0);
    strokeWeight(5);
    fill(c);
    for (let i = 0; i < 4; i++) {
      rect(
        startX + size * this.presentX[i],
        startY + size * this.presentY[i],
        size,
        size
      );
    }
  }

  placeBlock() {
    for (let i = 0; i < 4; i++) {
      this.NumofArray_H[this.presentY[i]][this.presentX[i]] = KindofBox;
    }
    clear();
    background(0);
    x1 = startX + size * 6;
    y1 = startY+50;
    newKindofBox = int(random(1, 8));
    KindofBox = newKindofBox;
    this.Stop_rotateYx();
    newRotate=0;
    numRotate=0;
  }

  presentXReturn(){
    return this.presentX;
  }
  presentYReturn(){
    return this.presentY;
  }
}

const P = new Present_box(H.array_return());

function setup() {
  createCanvas(1280, 980);
  background(0);
  frameRate(30);
  KindofBox = int(random(1, 8));
  P.FindPresent_array();
  P.Stop_rotateYx();
}

function draw() {
  frameRate(100);
  rangeOfXY();
  H.guideline();
  H.draw_array();
  P.fallingBox();
  if (keyIsDown(40)) {
    if (P.Stop_presentYX(0) === true && P.FindPresent_array() !== 0) {
      y1 += size;
    }
  }
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
      if (P.Stop_presentYX(-1) === true) x1 -= size;
      if(P.Stop_presentYX() === false) x1 +=size;
      break;

    case 39: // Right arrow
      if (P.Stop_presentYX(1) === true) x1 += size;
      if(P.Stop_presentYX() === false) x1 -=size;
      break;

    case 13: // Enter
      P.Stop_presentYX(0);
      P.placeBlock();
      H.result_array();
      break;
    case 90: //z
      numRotate = newRotate;
      newRotate--;
      if (newRotate < 0) newRotate = 3;
      P.Stop_rotateYx();
      break;
    case 88: //x
      numRotate = newRotate;
      newRotate++;
      if (newRotate > 3) newRotate = 0;
      P.Stop_rotateYx();
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
}

function rangeOfXY() {
  let NumofArray_H=H.array_return().valueOf();
  stX = startX + 50;
  stY = startY + 50;
  fiX = finishX ;
  fiY = stY + size * (length_BoxHeight - 2);
  if (x1 < stX) x1 = stX;
  else if (x1 > fiX) x1 = fiX;
  if (y1 > fiY) y1 = fiY;

}

class RedictBox{
  constructor(array,x,y) {
    this.NumofArray_H = array.valueOf();
    this.nextX = new Array(4).fill(0);
    this.nextY = new Array(4).fill(0);
    this.presentX=x.valueOf();
    this.presentY=x.valueOf();
  }

  draw_lineBox(){
    this.nextX=this.presentX.valueOf();
    this.find_nextY();

    nofill();
    stroke(255);
    strokeWeight(2);
    for(let i=0;i<4;i++){
      rect(startX+this.nextX*size,startY+this.nextY*size,size,size);
    }
  }

  find_nextY(){
    nextY[0]=16;
    do{
    this.Set_kind(newRotate);
    if(this.calculate_next()===false)
    this.nextY--;
  }while(this.calculate_next()===true);
  }

  calculate_next(){
    let nextR=true;
    for(let i=0;i<4;i++){
nY=this.nextY[i];
nX=this.nextX[i];
      if (this.NumofArray_H[nY][nX] !== 0)
nextR=false;
    }
    return nextR;
  }
}

let R= new RedictBox(H.array_return(),P.presentXReturn(),P.presentYReturn());