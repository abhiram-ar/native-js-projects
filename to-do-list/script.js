//todo list
// 1. reafactor code
// 2. add edit task
// 3. inline add task



const search = document.getElementById('search');
const title = document.getElementById('input-task-data');
const date = document.getElementById('input-task-date');
const datelabel = document.getElementById('date-label');
const time = document.getElementById('input-task-time');
const saveBtn = document.getElementById('save-to-do');
const noList = document.querySelector('.no-list');

const taskContainer = document.querySelector('.task-container');

let laskList = JSON.parse(localStorage.getItem('taskList')) || [];
taskContainer.innerHTML = "";

if(laskList.length === 0){
    noList.innerHTML += `<div class="empty-todo">
            <img src="empty.png">
        </div>`;
}
else{
    laskList.forEach((task) => {
        renderNewTask(task);
    });
}


date.addEventListener('change', () => {
    datelabel.innerText = date.value;
})

function getCurrentDate(){
    let today = new Date(Date.now());
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    return `${day}-${month}-${year}`;
}

function getFormattedDate(date){
    let targetDate = new Date(date);  // 2009-11-10
    let month = targetDate.toLocaleString('default', { month: 'long' });
    console.log(month);
    return `${month} ${targetDate.getDate()}`;
}


saveBtn.addEventListener('click', () => {
    let taskTitle = title.value;
    let taskDate = date.value;
    let taskTime = time.value;

    if(taskTitle===""){
        alert('Please enter task data');
        return
    }

    if(taskTime === ""){
        taskTime = "00:00";
    }

    if(taskDate === ""){
        taskDate = getCurrentDate();
    }

    let taskID = Date.now();
    let task = {
        id: taskID,
        title: taskTitle,
        date: taskDate,
        time: taskTime,
        checked: false
    }

    laskList.push(task);
    console.log(laskList);
    renderNewTask(task);


    
    title.value = "";
    date.value = "";
    time.value = "";
    
    localStorage.setItem('taskList', JSON.stringify(laskList));
});


function renderNewTask(task){
    if(taskContainer.children.length === 0){
        noList.innerHTML = "";
        createNewTaskGroupAndAddTask(task);
    }
    else{
        let taskGroup = document.getElementById(task.date);
        if(taskGroup === null){
            createNewTaskGroupAndAddTask(task);
        }
        else{
            let panel = taskGroup.querySelector(".panel")
            
            let newTask = document.createElement('div');
                newTask.className = 'task-item';
                newTask.id = task.id;

            let checkboxDiv = document.createElement('div');
            let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = task.id + "c";
                checkbox.checked = task.checked;
                checkboxDiv.append(checkbox);
            let label = document.createElement('label');
                label.htmlFor = task.id + "c";
                label.innerText = task.title;
                label.className = task.checked ? "checked" : "";
            checkboxDiv.appendChild(label);

            newTask.appendChild(checkboxDiv);

            let taskInfo = document.createElement('div');
                taskInfo.className = 'task-info';
            let timeInput = document.createElement('input');
                timeInput.type = 'time';
                timeInput.value = task.time;
            let select = document.createElement('select');
            let editOption = document.createElement('option');
                editOption.value = 'edit';
                editOption.innerText = 'Edit';
            let deleteOption = document.createElement('option');
                deleteOption.value = 'delete';
                deleteOption.innerText = 'Delete';
            
            select.appendChild(editOption);
            select.appendChild(deleteOption);
            taskInfo.appendChild(timeInput);
            taskInfo.appendChild(select);
            newTask.appendChild(taskInfo);
            panel.appendChild(newTask);
            taskGroup.appendChild(panel);

            checkbox.addEventListener('change', (e) => {
                console.log(e.target.checked);
                if(e.target.checked){
                    label.className = "checked";
                    let index = laskList.findIndex((item) => item.id === task.id);
                    laskList[index].checked = true
                    localStorage.setItem('taskList', JSON.stringify(laskList));
                }
                else{
                    label.className = "";
                    let index = laskList.findIndex((item) => item.id === task.id);
                    laskList[index].checked = false 
                    localStorage.setItem('taskList', JSON.stringify(laskList));

                }
            }); 

            //delete and edit task
            select.addEventListener('change', (e) => {
                if(e.target.value === 'edit'){
                    console.log('edit');
                }
                else if(e.target.value === 'delete'){
                    console.log('delete');
                    let taskGroup = document.getElementById(task.date);
                    panel.removeChild(newTask);
                    if(panel.children.length === 0){
                        taskContainer.removeChild(taskGroup);
                    }
                    let index = laskList.findIndex((item) => item.id === task.id);
                    laskList.splice(index, 1);
                    if(laskList.length === 0){
                    noList.innerHTML += `<div class="empty-todo">
                        <img src="empty.png">
                    </div>`;
            }
                    localStorage.setItem('taskList', JSON.stringify(laskList));
                }
            });
        }
    }

}

function createNewTaskGroupAndAddTask(task){
    let newTaskGroup = document.createElement('div');
    newTaskGroup.className = 'task-group';
    newTaskGroup.id = task.date;
        
    let groupName = document.createElement('h2');
    if(task.date === getCurrentDate()) groupName.innerHTML = "Today";
    else groupName.innerHTML = getFormattedDate(task.date);
    groupName.classList.add('accordion');
    newTaskGroup.appendChild(groupName);

    //create panel
    let panel = document.createElement('div');
    panel.className = 'panel';
    newTaskGroup.appendChild(panel);

    // render new task details
    let newTask = document.createElement('div');
    newTask.className = 'task-item';
    newTask.id = task.id;

    let checkboxDiv = document.createElement('div');
    let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = task.id + "c";
        checkbox.checked = task.checked;
        checkboxDiv.append(checkbox);
    let label = document.createElement('label');
        label.htmlFor = task.id + "c";
        label.innerText = task.title;
        label.className = task.checked ? "checked" : "";
        checkboxDiv.appendChild(label);
    newTask.appendChild(checkboxDiv);

    let taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';
    let timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.value = task.time;
    let select = document.createElement('select');
    let editOption = document.createElement('option');
        editOption.value = 'edit';
        editOption.innerText = 'Edit';
    let deleteOption = document.createElement('option');
        deleteOption.value = 'delete';
        deleteOption.innerText = 'Delete';
    
    select.appendChild(editOption);
    select.appendChild(deleteOption);
    taskInfo.appendChild(timeInput);
    taskInfo.appendChild(select);
    newTask.appendChild(taskInfo);
    panel.appendChild(newTask);
    newTaskGroup.appendChild(panel);
    taskContainer.appendChild(newTaskGroup);


    //add event listener to checkbox
    checkbox.addEventListener('change', (e) => {
        console.log(e.target.checked);
        if(e.target.checked){
            label.className = "checked";
            let index = laskList.findIndex((item) => item.id === task.id);  
            laskList[index].checked = true
            localStorage.setItem('taskList', JSON.stringify(laskList));
        }
        else{
            label.className = "";
            let index = laskList.findIndex((item) => item.id === task.id);
            laskList[index].checked = false
            localStorage.setItem('taskList', JSON.stringify(laskList));
        }
    }); 

    //accordion
    groupName.addEventListener("click", function(event) {
        event.target.classList.toggle("active");
        if (panel.style.display === "block") {
            panel.style.display = "none";
        }
        else {
            panel.style.display = "block";
        }    
    });

    //delete and edit task
    select.addEventListener('change', (e) => {
        if(e.target.value === 'edit'){
            console.log('edit');
        }
        else if(e.target.value === 'delete'){
            console.log('delete');
            let taskGroup = document.getElementById(task.date);
            panel.removeChild(newTask);
            if(panel.children.length === 0){
                taskContainer.removeChild(taskGroup);
            }
            let index = laskList.findIndex((item) => item.id === task.id);
            laskList.splice(index, 1);
            if(laskList.length === 0){
            noList.innerHTML += `<div class="empty-todo">
                <img src="empty.png">
            </div>`;
    }
            localStorage.setItem('taskList', JSON.stringify(laskList));
        }
    });

}

