let time = document.querySelector('.time');
let score = document.querySelector('.score');

let cnt = 0;
let cntCheck = false;
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
setBomb = Array(99).fill('BB');   //폭탄 해당 id에 넣어버리기 위한 배열

var setArray = Array(20*24-99).fill('NBB');//폭탄이 아닌 id 인식을 위한 배열
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


for(let i = 0; i < 20 ; i++){ 
    let ul = document.createElement('ul');
    rect[i] = ul;
    for(let j = 0; j < 24; j++){
        let value = 0;
        var li = document.createElement('li');
        li.setAttribute('id',Id++);
        li.setAttribute('value',value);
        li.setAttribute('isflag',isFlag)
        let img = document.createElement('img');
        li.appendChild(img);
        li.classList.add(setBombArray[bcnt++])

        rect[i][j] = li;

        ul.appendChild(rect[i][j])
    }
    playbox.appendChild(ul);
}

for(let i = 0; i < 20 ; i++){ 
    for(let j = 0; j < 24; j++){
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


playbox.addEventListener('contextmenu',function(event){ 
    event.preventDefault();
    var target = event.target;
    console.log("right-click")
    var isFlags = target.getAttribute('isflag')
    if(target.classList.contains('check')){
        target.removeEventListener('contextmenu',function(e){})
        console.log("if")
    }
    else{
        if(isFlags==='false'){
            target.setAttribute('isflag', true);
            console.log('clicks')
            FlagInOut(target);
        }
        else{
            target.parentNode.setAttribute('isflag',false)
            let simg = target.parentNode.querySelector('img')
            simg.src=''
            simg.style.visibility = 'hidden'
            let img = document.createElement('img');
            target.parentNode.appendChild(img);
            cnt+=2;
        }
    }
});

function FlagInOut(target){

    var simg = target.querySelector('img');
    var isFlags = target.getAttribute('isflag')
    if(isFlags==='true'){
        simg.src = flag;
        simg.style.visibility = 'visible'
    }
}

playbox.addEventListener('click',(event)=>{
    let target = event.target;
    if(target.parentNode.getAttribute('isflag')==='true'){
        target.removeEventListener('click',(event)=>{})
    }
    else{
        let row = Math.floor(target.getAttribute('id')/24);
        let col = target.getAttribute('id')%24;
        click(rect[row][col],row,col)
        if(rect[row][col].className=='BB check'){ 
            isOver = true;                             
            rect[row][col].style.backgroundColor='white';             
            let target = event.target;                         
            let selectimg = target.querySelector('img');    
            selectimg.src = bomb;
            selectimg.style.visibility = 'visible';
        }
    }
})


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