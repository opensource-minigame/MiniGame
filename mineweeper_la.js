let time = document.querySelector('.time');
let score = document.querySelector('.score');

let cnt = 0;

let stopwatch = setInterval(() => { //시간초 세주기
    cnt++;
}, 1000);

let rect = [];

const bomb = 'img/bomb.png';
const number1 = 'img/one.png'; //혹시 몰라서 숫자 이미지도 만들었지만
//숫자이미지를 사용하셔도 되고 그냥 글자로 textContent를 통해 붙여넣어도 될것 같아요
const number2 = 'img/two.png';
const number3 = 'img/three.png';

setBomb = Array(10).fill('BB');   //폭탄 해당 id에 넣어버리기 위한 배열
var setArray = Array(8 * 10 - 10).fill('NBB');//폭탄이 아닌 id 인식을 위한 배열

let setBombArray = [
    ...setBomb,
    ...setArray
];

function shuffleArray(setBombArray) {
    setBombArray.sort(() => 0.5 - Math.random());
    return setBombArray
}
shuffleArray(setBombArray); //셔플완료.

console.log('setBombArray',setBombArray);                       //셔플잘됬나 확인
/////////////////////////////////////////////////////////////////////////////////

let Id = 0;
let bcnt = 0;
let Nbcnt = 0;
let grid;
const playbox = document.querySelector('.playbox');


for (let i = 0; i < 8; i++) {
    let ul = document.createElement('ul');
    for (let j = 0; j < 10; j++) {
        let li = document.createElement('li');
        li.setAttribute('id', Id++);
        //li.classList.add(setBombArray[bcnt++]); 이부분은 폭탄이 있는지는 아래 이미지를 추가하면서 알 수 있기 때문에 굳이 넣지 않아도 될 것 같아서 뻈습니다,
        if(setBombArray[bcnt++] === 'BB'){ //BB가 들어가야 할 칸이 됬을때 img 태그를 만들어서 붙여줌
            let img = document.createElement('img');
            img.classList.add('BB');
            img.src = bomb;
            li.appendChild(img);
        }
        
        ul.appendChild(li);
        rect.push(ul);
    }
    playbox.appendChild(ul);
}

playbox.addEventListener('click',function(event){
    //playbox에 click이벤트를 주더라도 웹브라우저에서 어떤 칸이 클릭 됬는지 알 수 있습니다 그렇기 
    //때문에 playbox에 클릭이벤트를 걸어서
    //아무 칸이나 클릭을 하면 그 칸의 이미지가 보이도록 해놨습니다 만약에 어떤 칸에 뭐가 있는지
    // 일일이 클릭해서 확인하기 귀찮으시다면
    //mineweeper.css가서 img태그의 visibility 속성을 visible로 바꾸신 후에 하시면 됩니다.
    console.log(event);  //클릭했을 때 해당 칸에 어떤 값들이 있는지 알 수 있습니다
    //(그 중에서 내가 누른 칸이 어떤 내용을 정확히 갖고 있는지 알고 싶으면 MoustEvent 속성들 중에
    // target을 누르면 알 수 있어요)
    let target = event.target;
    let selectimg = target.querySelector('img');  //제가 누른 칸에서 img태그를 가져와서 스타일링 할 수 있도록 합니다

    selectimg.style.visibility = 'visible';  //img 속성이 현재 hidden이므로 visible로 바꿔줘서 그려지게 합니다.
});

const modal = document.querySelector('.modal');

modal.addEventListener('click', function () {
    modal.classList.add('hidden');
    time.textContent = 0;
});
//////////////////////////////////////////////////////////////////////////////////