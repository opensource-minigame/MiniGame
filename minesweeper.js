let time = document.querySelector('.time');
let score = document.querySelector('.score');

let cnt = 0;
let cntCheck = false;
let clickscore = 0;                             //재밌게 점수반영 하기 위한 옵션툴. 스코어어떤식으로 적용할지 정할때...상의해서쓰자.
let stopwatch = setInterval(() => { //시간초 세주기
    cnt++;
    if(isOver){
        clearTimeout(stopwatch);
        score.textContent = cnt-1;          //12초에 누르면 13초로 출력되는것을 확인하였음.
    }
    else{
        if(cntCheck){
          time.textContent = cnt;   
        }
        else{
            cnt = 0;
        }
    }
}, 1000);


let rect = [,];
const bomb = 'img/bomb.png';
const flag = 'img/one.png';
let isOver = false;
let isFlag = false;
setBomb = Array(10).fill('BB');   //폭탄 해당 id에 넣어버리기 위한 배열

var setArray = Array(8*10-10).fill('NBB');//폭탄이 아닌 id 인식을 위한 배열
let setBombArray = [                  
    ...setBomb,
    ...setArray
];

function shuffleArray(setBombArray){
    setBombArray.sort(()=> Math.random() - 0.5);
}
shuffleArray(setBombArray); //셔플완료.

/////////////////////////////////////////////////////////////////////////////////
let Id = 0;
let bcnt = 0;
const playbox = document.querySelector('.playbox');


for(let i = 0; i < 8 ; i++){ 
    let ul = document.createElement('ul');
    rect[i] = ul;
    for(let j = 0; j < 10; j++){
        let value = 0;
        var li = document.createElement('li');
        li.setAttribute('id',Id++);
        li.setAttribute('value',value);
        li.setAttribute('isflag',isFlag)
        li.classList.add(setBombArray[bcnt++])


        rect[i][j] = li;
        if(rect[i][j].className=='BB'){
            let img = document.createElement('img'); 
            img.src=bomb;
            li.appendChild(img);
        }

        li.addEventListener('mousedown', function(event){
            if(event.button==2){
                addFlags(rect[i][j])
            }
            else{
                click(rect[i][j],i,j)
            }
            if(rect[i][j].className=='BB check'){ 
                isOver = true;                              //그냥 폭탄 그 자체를 여기서 다 처리한다. 
                rect[i][j].style.backgroundColor='white';               //많이 복잡해보이지만 누를 시 
                let target = event.target;                      //className 이 'BB check'로 표시되기때문에    
                let selectimg = target.querySelector('img');    //걍 귀찮아서 새로 스타일을 덮어씌우는 형식이다.
                selectimg.style.visibility = 'visible';
            }
  
        }
        )
        ul.appendChild(rect[i][j])
    }
    playbox.appendChild(ul);
}

for(let i = 0; i < 8 ; i++){ 
    for(let j = 0; j < 10; j++){
        if(rect[i][j].className==="BB"){
            getCountNearby(i, j); 
        }
    }
}

function getCountNearby(i, j){
    for(var a = i-1; a <=i+1; a++){
        for(var b = j-1; b <=j+1; b++){
            try{
            rect[a][b].value++;
            }
            catch(error){
            }
        }
    }
}
//////////////////////////////////////////////////////깃발시스템
function addFlags(li){

    let id = li.id
    var fcheck = li.getAttribute('isflag')
    console.log("id "+id)
    console.log("flag "+fcheck)

    if(fcheck=="false"){
        li.setAttribute('isflag',true)
        let img = document.createElement('img');
        img.src = flag;
        li.appendChild(img);
        li.img.style.visibility='visible';
    }
    else{
        li.setAttribute('isflag', false)                                                                        //5월28일자 그림추가삭제.
                                                                               //removechild이용할거임.
    }
}
//////////////////////////////////////////////////////폭탄카운팅시스템.

const modal = document.querySelector('.modal');

modal.addEventListener('click',function(){
    modal.classList.add('hidden');
    cntCheck = true;
    time.textContent = 0;
});

function click(li,i,j){
    if(li.classList.contains("check")) return;
    else if(li.classList=="BB"){
        alert("GG")
    }
    else{
        let values = li.getAttribute('value')
        if(values!=0){
            li.classList.add("check")            
            li.innerHTML = values
            checkNeighbor(i,j);
            return;
        }
    }
    li.classList.add("check");
    checkNeighbor(i,j);
}

function checkNeighbor(i,j){
    for(let a =i-1; a<=i+1 ; a++){
        for(let b = j-1; b<=j+1; b++){
            try{
                if(rect[a][b].classList.contains("NBB")&&rect[i][j].getAttribute("value")!=0){
                    click(rect[i][j],i,j)
                }
                else if(rect[a][b].classList.contains("NBB")
                &&rect[a][b].getAttribute("value")==0){
                    click(rect[a][b],a,b)
                }
                else if(rect[a][b].getAttribute("value")!=0 && rect[a][b].classList.contains("NBB")){
                    click(rect[a][b],i,j)
                }
            }
            catch(e){
            }
        }
    }
}

//////////////////////////////////////////////////////클릭시스템.