var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const addicon = document.getElementById('add-icon');
const addTaskTextbox = document.getElementById('add');

/*loads list - all*/
function renderList () {
    taskList.innerHTML='';
    for (var i=0; i<tasks.length; i++){
        let li = document.createElement("li");
        li.setAttribute('id', "li"+tasks[i].id);
        li.innerHTML=`<input type="checkbox" id="${tasks[i].id}" ${tasks[i].completed?'checked':''} class="custom-checkbox">
        <label for="${tasks[i].id}">${tasks[i].title}</label>
        <i class="fa-regular fa-circle-xmark delete hide" data-id="${tasks[i].id}" title="Delete"></i>`
        taskList.appendChild(li);
        li.addEventListener('mouseenter', listMouseHover);
        li.addEventListener('mouseleave', listMouseLeave);
    }
    tasksCounter.innerText=tasks.length;
    /*default view -all*/
    document.getElementById("listAll").style.color="black";
    document.getElementById("listIncomplete").style.color="grey";
    document.getElementById("listCompleted").style.color="grey";
}
/*loads all completed tasks*/
function renderListComplete () {
    taskList.innerHTML='';
    var count=0;
    for (var i=0; i<tasks.length; i++){
        if (tasks[i].completed==true){
            let li = document.createElement("li");
            li.setAttribute('id', tasks[i].id);
            li.innerHTML=`<input type="checkbox" id="${tasks[i].id}" ${tasks[i].completed?'checked':''} class="custom-checkbox">
            <label for="${tasks[i].id}">${tasks[i].title}</label>
            <i class="fa-regular fa-circle-xmark delete hide" data-id="${tasks[i].id}" title="Delete"></i>`
            taskList.appendChild(li);
            count++;
            li.addEventListener('mouseenter', listMouseHover);
            li.addEventListener('mouseleave', listMouseLeave);
        }
    }
    tasksCounter.innerText=count;
}
/*loads all incomplete tasks*/
function renderListIncomplete () {
    taskList.innerHTML='';
    var count=0;
    for (var i=0; i<tasks.length; i++){
        if (tasks[i].completed==false){
            let li = document.createElement("li");
            li.setAttribute('id', tasks[i].id);
            li.innerHTML=`<input type="checkbox" id="${tasks[i].id}" ${tasks[i].completed?'checked':''} class="custom-checkbox">
            <label for="${tasks[i].id}">${tasks[i].title}</label>
            <i class="fa-regular fa-circle-xmark delete hide" data-id="${tasks[i].id}" title="Delete"></i>`
            taskList.appendChild(li);
            count++;
            li.addEventListener('mouseenter', listMouseHover);
            li.addEventListener('mouseleave', listMouseLeave);
        }
    }
    tasksCounter.innerText=count;
}
/*check or uncheck task*/
function toggleTask (taskId) {
    const task = tasks.find(function(t){
        return t.id===taskId;
    });
    if (task){
        task.completed = !task.completed;
    }
}
/*delete task*/
function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !==taskId;
    });
    tasks=newTasks;
    renderList();
}
/*add new task*/
function addTask (task) {
    if (task){
        tasks.push(task);
        renderList();
    }
}

function showNotification(text) {
    alert(text);
}
/*input keypress*/
function handleInputKeypress(event){
    addicon.classList.remove("hide");
    if (event.key === 'Enter'){
        checkAndAddTask();
    } else if(event.target.value==""){
        //if all data is cleared, remove add icon
        addicon.classList.add("hide");
    }
}
/*check if text box is not empty and add the task*/
function checkAndAddTask(){
    const text=addTaskTextbox.value;
    if (!text){
        showNotification('Enter text');
        return;
    }
    addicon.classList.add("hide");
    const task={
        title: text,
        id: Date.now().toString(),
        completed: false
    };
    addTask (task);
    addTaskTextbox.value="";
}
/*clears all completed tasks*/
function clearCompleted(){
    let i=0;
    while (tasks.length>0 && i<tasks.length){
        if (tasks[i].completed== true){
            deleteTask(tasks[i].id);
        }else{
            i++;
        }
    }
}
/*check all items in the todo list*/
function completeAll(){
    for (var i=0; i<tasks.length; i++){
        if (tasks[i].completed== false){
            toggleTask(tasks[i].id);
        }
    }
    renderList();
}
/*handles all click events*/
function clickEvent(event){
    const target= event.target;
    if (target.className=='custom-checkbox'){
        const taskid = target.id;
        toggleTask(taskid);
    }else if (target.className.includes('delete')){
        const taskid = target.dataset.id;
        deleteTask(taskid);
    }else if (target==addicon){
        checkAndAddTask();
    }else if (target.id=='clearCompleted'){
        clearCompleted();
    }else if (target.id=='completeAll'){
        completeAll();
    }else if (target.id=='listAll'){
        renderList();
    }else if (target.id=='listIncomplete'){
        document.getElementById("listAll").style.color="grey";
        document.getElementById("listIncomplete").style.color="black";
        document.getElementById("listCompleted").style.color="grey";
        renderListIncomplete();
    }else if (target.id=='listCompleted'){
        document.getElementById("listAll").style.color="grey";
        document.getElementById("listIncomplete").style.color="grey";
        document.getElementById("listCompleted").style.color="black";
        renderListComplete();
    }
}
/*handle visibilty of delete icon when mouse enters or exits a list item*/
function listMouseHover(event){
    var delIcon = document.querySelector('#'+event.target.id+' i');
    delIcon.classList.remove("hide");
}
function listMouseLeave(event){
    var delIcon = document.querySelector('#'+event.target.id+' i');
    delIcon.classList.add("hide");
} 

function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', clickEvent);
}

initializeApp();

