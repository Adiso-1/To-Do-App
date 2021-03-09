
const taskInput = document.querySelector('.task-input');
const taskInputButton = document.querySelector('.task-container > button');
const toDoTaskContainer = document.querySelector('.to-do-task-container');
const taskNumber = document.querySelector('.task-number');
let completedNumber = document.querySelector('.completed-number');
const test = document.querySelector('.category h3');
const completed = document.querySelector('.completed')

//!Read
let AAA;
const renderData = () => {
    toDoTaskContainer.innerHTML = '';
    let counter = 0;
    let local = JSON.parse(localStorage.personal)    
    local.forEach((task, index) => {
			const toDoTask = document.createElement('div');
			toDoTask.classList.add('to-do-task');

			const checkBox = document.createElement('input');
			checkBox.type = 'checkbox';
			checkBox.classList.add = 'checkbox';
			checkBox.addEventListener('click', (e) => markAsDone(index, e, task));

			const userTask = document.createElement('div');
			userTask.classList.add('user-task');
			userTask.textContent = task.taskName;

			const edit = document.createElement('div');
			edit.classList.add('edit');
			edit.innerHTML = `<i class="fas fa-edit"></i>`;
			edit.addEventListener('click', (e) => editItem(index, e));

			const trash = document.createElement('div');
			trash.classList.add('trash');
			trash.innerHTML = `<i class="far fa-trash-alt"></i>`;
			trash.addEventListener('click', (e) => deleteItem(index,e));

			const check = document.createElement('div');
			check.classList.add('check');
			check.innerHTML = `<i class="fas fa-check"></i>`;
			check.addEventListener('checked', (e) => console.log(e));
			
            const date = document.createElement('div');
            date.classList.add('date')
            date.innerHTML = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`

			toDoTaskContainer.appendChild(toDoTask);
			toDoTask.appendChild(checkBox);
			toDoTask.appendChild(userTask);
			toDoTask.appendChild(date);
			toDoTask.appendChild(check);
			toDoTask.appendChild(edit);
			toDoTask.appendChild(trash);

			counter = index + 1;
		});
    taskNumber.textContent = counter.toString();
}
//! Add Item
const addItem = () => {
    const taskName = taskInput.value;
    if (!taskName) {
        return;
    }
    if (localStorage.personal) {
        let arr = JSON.parse(localStorage.personal);
        arr.push({ taskName, isCompleted: false });
        localStorage.setItem('personal',JSON.stringify(arr));
        taskInput.value = '';
        renderData();
	} else {
        localStorage.setItem('personal',JSON.stringify([{ taskName: taskName, isCompleted: false }]));
        taskInput.value = '';
        renderData();
    }
};
//! Delete Item
const deleteItem = (index) => {
        let arr = JSON.parse(localStorage.personal)
        arr.splice(index, 1);
        localStorage.setItem('personal',JSON.stringify(arr))
        renderData();
    }
//!update
let temp;
let flag;
const editItem = (index,e) => {
    taskInputButton.disabled = true;
    flag = e.target.parentElement.previousElementSibling;
    taskInput.focus();
    let arr = JSON.parse(localStorage.personal);
    taskInput.value = arr[index].taskName;
    e.target.parentElement.previousElementSibling.style.visibility = 'visible'
    e.target.style.display = 'none';
    flag.addEventListener('click',(el)=> {
        arr[index].taskName = taskInput.value;
        localStorage.setItem('personal', JSON.stringify(arr));
        el.target.parentElement.previousElementSibling.textContent = taskInput.value;
        taskInput.value = '';
        flag.style.visibility = 'hidden';
        e.target.style.display = 'block';
        taskInputButton.disabled = false;
        renderData();
    })
}

//! Mark as done
let myE;
let myIndex;
let myTask;
const markAsDone = (index, e, task) => {
	myTask = task;
    myE = e;
	myIndex = index;
	if (e.target.checked) {
		JSON.parse(localStorage.personal)[index].isCompleted = true;
		completed.appendChild(e.target.parentElement);
        e.target.nextElementSibling.style.textDecoration = 'line-through';
        let newNumber = parseInt(completedNumber.textContent) + 1;
        completedNumber.textContent = newNumber;
        console.log(newNumber);
		deleteItem(index);
	} else {
		toDo[index].isCompleted = false;
	}
};
taskInputButton.addEventListener('click',() => addItem());
if (localStorage.length) {
    renderData()
}