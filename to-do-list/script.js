const search = document.getElementById('search');
const title = document.getElementById('input-task-data');
const date = document.getElementById('input-task-date');
const time = document.getElementById('input-task-time');
const saveBtn = document.getElementById('save-to-do');

const taskContainer = document.querySelector('.task-container');
let isContainerEmpty = true;
let laskList = JSON.parse(localStorage.getItem('taskList')) || [];

// if(laskList.length === 0){
//     taskContainer.innerHTML += `<div class="empty-todo">
//             <img src="empty.png">
//         </div>`;
// }

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

function taskTemplate(task){
    return `<div class="task-item" id="${task.id}">
                    <div>
                        <input type="checkbox" ${task.checked ? "checked" : ""}><label for="${task.id}" class=${task.checked ? "checked" : ""}>${task.title}</label>
                    </div>
                    <div class="task-info">    
                        <input type="time">
                        <select value="">
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>
            </div>`
}


saveBtn.addEventListener('click', () => {
    let taskTitle = title.value;
    let taskDate = date.value;
    let taskTime = time.value;

    if(taskTitle===""){
        alert('Please enter task data');
        return
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
    renderTask(task);


    //localStorage.setItem('taskList', JSON.stringify(laskList));

    taskTitle = "";
    taskDate = "";
    taskTime = "";

});


function renderTask(task){
    console.log(taskContainer.children);
    if(isContainerEmpty){
        taskContainer.innerHTML = "";
        isContainerEmpty = false;

        let newTaskGroup = document.createElement('div');
        newTaskGroup.className = 'task-group';
        newTaskGroup.id = task.date;
        
        let groupName = document.createElement('h2');
        groupName.id = task.date;
        if(task.date === getCurrentDate()){
            groupName.innerHTML = "Today";
        }
        else{
            groupName.innerHTML = getFormattedDate(task.date);
        }
        newTaskGroup.appendChild(groupName);

        // render new task details

        newTaskGroup.innerHTML += taskTemplate(task);

        taskContainer.appendChild(newTaskGroup);
    }
    else{
        let taskGroup = document.getElementById(task.date);
        if(taskGroup === null){
            let newTaskGroup = document.createElement('div');
            newTaskGroup.className = 'task-group';
            newTaskGroup.id = task.date;
            
            let groupName = document.createElement('h2');
            groupName.id = task.date;
            if(task.date === getCurrentDate()){
                groupName.innerHTML = "Today";
            }
            else{
                groupName.innerHTML = getFormattedDate(task.date);
            }
            newTaskGroup.appendChild(groupName);

            // render new task details

            newTaskGroup.innerHTML += taskTemplate(task);

            taskContainer.appendChild(newTaskGroup);
        }
        else{
            taskGroup.innerHTML += taskTemplate(task);
        }
    }

}

