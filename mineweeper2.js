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

let vic =0;

let rect = [,];
const bomb = 'img/bomb.png';
const flag = 'img/flag.png';
let isOver = false;
let isFlag = false;
setBomb = Array(40).fill('BB');   //폭탄 해당 id에 넣어버리기 위한 배열

var setArray = Array(14*18-40).fill('NBB');//폭탄이 아닌 id 인식을 위한 배열
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


for(let i = 0; i < 14 ; i++){ 
    let ul = document.createElement('ul');
    rect[i] = ul;
    for(let j = 0; j < 18; j++){
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

for(let i = 0; i < 14 ; i++){ 
    for(let j = 0; j < 18; j++){
        if(rect[i][j].className==="BB"){
           /* let selectimg = rect[i][j].querySelector('img');    
            selectimg.src = bomb;
            selectimg.style.visibility = 'visible';*/
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

/////////////////////   FLAG SETUP & VIC +1    /////////////////////////////
playbox.addEventListener('contextmenu',function(event){ 
    event.preventDefault();
    var target = event.target;
    var isFlags = target.getAttribute('isflag')
    if(target.classList.contains('check')){
        target.removeEventListener('contextmenu',(e)=>{})
    }
    else{
        if(isFlags==='false'){
            target.setAttribute('isflag', true);
            if(target.classList.contains('BB')){
                vic += 1
            }
            FlagInOut(target);
        }
        else{
            target.parentNode.setAttribute('isflag',false)
            let simg = target.parentNode.querySelector('img');

            setTimeout(()=> {
                const clone = simg.cloneNode(true);
                console.log('clone',clone);
                target.parentNode.appendChild(clone);
                clone.src = 'img/flag.png';
                clone.style = 'position:absolute';
                clone.style.visibility = 'visible';
                clone.classList.add('active');
                clone.addEventListener('animationend',function(){
                clone.remove();
                });
              },100);

            simg.src=''
            simg.style.visibility = 'hidden'
            //let img = document.createElement('img');
            //target.parentNode.appendChild(img);
            if(target.parentNode.classList.contains('BB')){
                vic -= 1
            }
            cnt+=2;
        }
    }
});
/////////////////////////////////////////////////////////////////////////
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
        let row = Math.floor(target.getAttribute('id')/18);
        let col = target.getAttribute('id')%18;
        click(rect[row][col],row,col)
        if(rect[row][col].className=='BB check'){ 
            isOver = true;
            let target = event.target;

            for(let i = 0; i < 14 ; i++){ 
                for(let j = 0; j < 18; j++){
                    if(rect[i][j].classList.contains('BB')){
                        rect[row][col].style.backgroundColor='white';
                        let selectimg = rect[i][j].querySelector('img');    
                        selectimg.src = bomb;
                        selectimg.style.visibility = 'visible';
                    }
                }
            }
            target.style.backgroundColor = 'yellow'
        }
    }
    findCheck();
})

function findCheck(){
    let chk = document.getElementsByClassName('check').length
    if(chk === 212) {
        isOver = true;
        WIN();
    }

}

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


//////////////////

//////////////////
function WIN(){
    window.open('inputtext.html','inputtext','width = 500px, height 300px, left = 100, top = 50')
}


//////////////////////////////////////////////////////클릭시스템.