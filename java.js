const task =[];
let time = 0;
let timer = null;
let timerbreak = null;
let current = null;

const submit = document.querySelector("#submit");
const text = document.querySelector("#text");
const form = document.querySelector("#form")
const taskname = document.querySelector('#time #taskname');

rendertime()
rendertask()

form.addEventListener('submit',(e)=>{
    e.preventDefault('submit');
    if(text.value != ""){
         taskfuntion(text.value); 
         text.value = "";
         rendertask()
         }
})

function taskfuntion(value){
    const newtask = {
        id : (Math.random() * 100).toString(36).slice(3),
        title: value,
        complite: false,
    };
    task.unshift(newtask);

}

function rendertask(){
    const html = task.map((task) => {
        return `<div class="task">
            <div class="complite">${task.complite ? `<span class="done">DONE</span>`: `<button class="start-button" data-id=${task.id}>start</button>`}</div>
            <div class="title">${task.title}</div>        
        </div>

        `;
    })

   const taskcontainer = document.querySelector("#task");
   taskcontainer.innerHTML = html.join("");

   const startbutton = document.querySelectorAll('.task .start-button');

    startbutton.forEach(button =>{
         button.addEventListener('click',e =>{
              if(!timer){
                   const id = button.getAttribute('data-id');
                  startButtonHandler(id);
                  button.textContent = 'In progrees...'
                }
            })
        })
}

function startButtonHandler(id){
    time = 5;
    current = id;
    const taskindex = task.findIndex(task => task.id === id);
    
    taskname.textContent = task[taskindex].title
    rendertime()

    timer = setInterval(()=>{
        timehanderl(id);
    },1000)
}

function timehanderl(id){
    time--;
    rendertime() 
    if(time === 0){
        clearInterval(timer);
        markcomplete(id);
        timer = null
        rendertask();
        startBreak()
}
       
}

function startBreak(){
time = 3;
taskname.textContent = 'break';
rendertime()
timerbreak = setInterval(() =>{
     timehanderlbreak()
},1000)
}

function timehanderlbreak(){
    time--;
    rendertime() 
    if(time === 0){
        clearInterval(timerbreak);
        current = null;
        timerbreak = null 
        taskname.textContent = ""
        rendertask();
}
}

function rendertime(){
    const divtime = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    divtime.textContent = `${minutes < 10 ? "0": "" }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
}

function markcomplete(id){
    const taskindex = task.findIndex(task => task.id === id)
    task[taskindex].complite = true
}