var tetris =document.querySelector('#playbox');
var tetrisData =[];
var currentBlock;
var nextBlock;
var currentTopLeft=[0,3]; //블록 나오는위치
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal_content');
const box = document.querySelector('.box');
var stopflag =false;
var gamespeed=2000;
let isGameOver = false; //게임 끝 여부 
let gamestart = false;

var blocks = [
  {
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'pink',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'black',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  },
];


const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'black'];

const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10);
//table 에 tr td 넣는함수
function init() {
  const fragment = document.createDocumentFragment();
  [...Array(20).keys()].forEach((col, i) => {
    const tr = document.createElement('tr');
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((row, j) => {
      const td = document.createElement('td');
      tr.appendChild(td);
    });
    const column = Array(10).fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}
//주석 완료
function draw() { //색을 입혀주는 함수
  tetrisData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row > 0) {
        //해당 부분의 원소에 어떤 값이 들어잇으면 해당값에 대응되는 색갈을 찾아서 className 에 넣어서 색을 입힘 
        //css에서 해당 클래스명에대한 설정해둠
        tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10 - 1]: colors[tetrisData[i][j] - 1];
      } else {
        //0이 면 아무것도 아무색도없는거라 빈칸
        tetris.children[i].children[j].className = '';
      }
    });
  });
}


function drawNext() { // 다음 블록 그리는 함수
  const nextTable = document.getElementById('next_table');
  nextTable.querySelectorAll('tr').forEach((col, i) => {
    Array.from(col.children).forEach((row, j) => {
      if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
        nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
      } else {
        nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
      }
    });
  })
}

function generate() { // 테트리스 블록 생성
  if (!currentBlock) {
    //현재 블럭이 없으면 블럭 뽑기
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  } else {
    //next블럭 넣기
    currentBlock = nextBlock;
  }
  currentBlock.currentShapeIndex = 0;
  nextBlock = blocks[Math.floor(Math.random() * blocks.length)]; // 다음 블록 미리 생성
  drawNext();// 다음블록을 화면에 표시하는함수 실행
  currentTopLeft = [-1, 3]; //처음 시작점 -1,3 인건 블럭 배열 보면 맨위가 비어잇는데 시작은 맨위에서 되야하므로 -1에 서부터 시작

  //블럭 배열속 shap 는 블럭 모양을 나타내는 배열이고 
  //이때 0번째인덱스에는 초기 블럭 모양이 들어잇는데 이걸 1부터 끝까지 slice하는건 맨위 000이 저장된 부분을 제거한다는것이다
  currentBlock.shape[0].slice(1).forEach((col, i) => { // 게임 오버 판단
    col.forEach((row, j) => {
      if (row && tetrisData[i][j + 3]) { //row 가 1 즉 블럭이 처음 시작하는곳에 다른블럭이 그려져있으면 게임 오버
        isGameOver = true;
      }
    });
  });
  
  currentBlock.shape[0].slice(1).forEach((col, i) => { // 블록 데이터 생성
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    });
  });
  if (isGameOver) {
    //블럭 내려오는걸 멈춤
    modal_content.textContent = 'GAME OVER';
        modal.classList.remove('hidden');
        modal.classList.toggle('show');
    clearInterval(int);
    //게임 끝이라 색을 입힐 필요는없지만 테트리스 보면 그림그려지고 게임종료됨
    draw();
    //이부분은 시작창처럼 띄우는거로 바꿔야함
    WIN(); //db 저장
  } else {
    draw();
  }
}


function checkRows() { // 한 줄 다 찼는지 검사
  const fullRows = []; //가득찬줄이 몇번째 줄인지 저장해둘 배열
  tetrisData.forEach((col, i) => {
    let count = 0;// 차잇는 칸의 개수 카운트할 변수
    col.forEach((row, j) => {
      if (row > 0) {
        count++;// 칸이 차잇으면 카운트
      }
    });

    if (count === 10) {//만약 10개 즉 모든 칸이 다차잇으면
      fullRows.push(i);//해당 인덱스 를 저장
    }
  });

  for(let i = 0; i < fullRows.length; i++){
    console.log('fullRow[i]',fullRows[i]);
    const tr = tetris.querySelector(`tr:nth-child(${fullRows[i]})`);


    //줄 터질때 애니매이션 함수
    setTimeout(()=> {
      const clone = tr.cloneNode(true);
      console.log('clone',clone);
      tetris.appendChild(clone);
      clone.style = 'position:absolute';
      clone.classList.add('active');
      clone.addEventListener('animationend',function(){
      clone.remove();
      });
    },i*100);
  }


  const fullRowsCount = fullRows.length;//총 몇개의 줄이 찾는지 
  tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i));//fullRows 배열에 잇는 줄들 을 삭제
  for (let i = 0; i < fullRowsCount; i++) {
    tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);// 언쉬프트로 맨앞에 삭제된만큼의 줄을 추가 
  }
  let score = parseInt(document.getElementById('score').textContent, 10);// 점수 측정
  score += (fullRowsCount *100 )+((fullRowsCount-1)*(fullRowsCount)*10);
  let levelcheck=1;
  if(score >=500&& score <= 1000){
    levelcheck=2;
  }
  else if(score >=1000&& score <= 2000){
    levelcheck=3;
  } 
  else if(score >=2000&& score <= 4000){
    levelcheck=4;
  }
  else if(score >=4000&& score <= 5000){
    levelcheck=5;
  } 
  else if(score >=6000){
    levelcheck=6;
  }
  if( levelcheck != parseInt(document.getElementById('level').textContent,10)){
    document.getElementById('level').textContent = String(levelcheck);
  }
  gamespeed = (2000 -score *(3/10)) <50 ? 50 : (2000 -score *(3/10));
  document.getElementById('score').textContent = String(score);//점수  설정
}



function tick() { // 한 칸 아래로
  if(isGameOver) return;

  //내려갈부분의 가장꼭대기 부분
  const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
  const activeBlocks = [];
  let canGoDown = true; //이블럭이 움직이는블럭인지
  let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex]; //현재블럭 모양
  for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 아래 내려갈수잇는지 체크
    if (i < 0 || i >= 20) continue;
    for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
      if (isActiveBlock(tetrisData[i][j])) { // 현재 움직이는 블럭이면
        activeBlocks.push([i, j]);
        if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) {// 아래 내려갈곳이 없거나 움직이는 블럭이아니면 canGoDown 을 false 로 
          canGoDown = false;
        }
      }
    }
  }
  if (!canGoDown) { //내려갈수없다면
    activeBlocks.forEach((blocks) => {
      tetrisData[blocks[0]][blocks[1]] *= 10; //해당 부분을 10을 곱해서 움직이지 못하는 블럭으로 설정
    });
    checkRows(); // 지워질 줄 있나 확인
    generate(); // 새 블록 생성
    return false;
  } else if (canGoDown) {//내려갈수잇으면
    for (let i = tetrisData.length - 1; i >= 0; i--) {//아래서 부터 내려줘야함
      const col = tetrisData[i]; //한줄씩
      col.forEach((row, j) => {
        if (row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) { 
          tetrisData[i + 1][j] = row;
          tetrisData[i][j] = 0;
        }
      });
    }
    currentTopLeft = nextTopLeft;
    draw();
    return true;
  }
}

let int = setInterval(tick, 2000); //2초마다 움직이는 블럭 1칸씩내림

modal.addEventListener('click',function(){
  modal.classList.add('hidden');
  if(!isGameOver){
    gamestart = true ; 
    init();
    generate();
  }
});

document.getElementById('stop').addEventListener('click', function() {
  clearInterval(int);
  stopflag = true;
});

document.getElementById('restart').addEventListener('click', function() {
  stopflag = false;
  if (int) {
    clearInterval(int);
  }
  int = setInterval(tick, gamespeed);
});

//전체 비교가아니라 한줄만 비교로 수정 필요
window.addEventListener('keydown', (e) => {
  if(!stopflag && !isGameOver&&gamestart){
  switch (e.code) {
    case 'ArrowLeft': { // 키보드 왼쪽 클릭 = 좌측 한 칸 이동
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1];
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 왼쪽 공간 체크
        if (!isMovable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i] || !tetrisData[i][j]) continue;
          if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])) {
            // console.log(i, j, tetrisData[i][j], tetrisData[i][j-1]);
            isMovable = false;
          }
        }
      }
      // console.log('left', 'isMovable', isMovable);
      if (isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((col, i) => {
          for (var j = 0; j < col.length; j++) {
            const row = col[j];
            if (tetrisData[i][j - 1] === 0 && row < 10) {
              // console.log(row, tetrisData[i][j - 1], i, j);
              tetrisData[i][j - 1] = row;
              tetrisData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }
    case 'ArrowRight': { // 키보드 오른쪽 클릭 = 우측 한 칸 이동
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 오른쪽 공간 체크
        if (!isMovable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i] || !tetrisData[i][j]) continue;
          if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])) {
            // console.log(i, j);
            isMovable = false;
          }
        }
      }
      // console.log('right', 'isMovable', isMovable);
      if (isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((col, i) => {
          for (var j = col.length - 1; j >= 0; j--) {
            const row = col[j];
            if (tetrisData[i][j + 1] === 0 && row < 10) {
              tetrisData[i][j + 1] = row;
              tetrisData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }
    case 'ArrowDown': { // 키보드 아래쪽 클릭 = 하방측 한 칸 이동
      tick();
    }
  }
}
});

window.addEventListener('keyup', (e) => {
  if(!stopflag && !isGameOver&&gamestart){
  switch (e.code) {
    case 'ArrowUp': { // 방향 전환
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      let isChangeable = true;
      const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length
        ? 0
        : currentBlock.currentShapeIndex + 1;
      const nextBlockShape = currentBlock.shape[nextShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
        if (!isChangeable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i]) continue;
          if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && isInvalidBlock(tetrisData[i] && tetrisData[i][j])) {
            console.log(i, j);
            isChangeable = false;
          }
        }
      }
      // console.log('isChangeable', isChangeable);
      if (isChangeable) {
        // console.log('isChangeable', JSON.parse(JSON.stringify(currentBlock)), nextBlockShape);
        while (currentTopLeft[0] < 0) {
          tick();
        }
        for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
          for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            if (!tetrisData[i]) continue;
            let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
            if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {
              // 다음 모양은 있는데 현재 칸이 없으면
              tetrisData[i][j] = currentBlock.numCode;
            } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) {
              // 다음 모양은 없는데  현재 칸이 있으면
              tetrisData[i][j] = 0;
            }
          }
        }
        currentBlock.currentShapeIndex = nextShapeIndex;
      }
      draw();
      break;
    }
    case 'Space': // 한방에 쭉 떨구기
      while (tick()) {}
      break;
  }
}
});

function WIN(){
  window.open('inputtext.html','inputtext','width = 500px, height 300px, left = 100, top = 50')
}