let time = document.querySelector('.time');
let score = document.querySelector('.score');

let cnt = 0;

let stopwatch = setInterval(() => { //시간초 세주기
    cnt++;
}, 1000);

let rect = [,];


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
        li.classList.add(setBombArray[bcnt++])
        rect[i][j] = li;
       li.addEventListener('click', ()=>{
            click(rect[i][j],i,j)
        })
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
//////////////////////////////////////////////////////폭탄카운팅시스템.


const modal = document.querySelector('.modal');

modal.addEventListener('click',function(){
    modal.classList.add('hidden');
    time.textContent = 0;
});

function click(li,i,j){

    if(li.classList.contains("check")) return;
    else if(li.classList=="BB"){alert("GG")}
    else{
        let values = li.getAttribute('value')
        if(values!=0){
            li.classList.add("check")            
            console.log(li.classList.contains("check"))
            li.innerHTML = values
            console.log(li.getAttribute("Id"))
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