const form = document.getElementById('todo-form')
const todoinput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const todoCount = document.getElementById('todo-count')
const newDate = document.getElementById('time')
const selectEl = document.getElementById("todo-level");

let taskList = []

function addTask (){
    todoList.innerHTML = ''
    taskList.forEach((item, index) => {
        const isiList = document.createElement('li')
        isiList.setAttribute('class', 'todo-item')
        if (item.done) isiList.classList.add("completed");

        isiList.innerHTML = `
            <label class="todo-row">
                <input type="checkbox" class="todo-checkbox" data-index="${index}" ${item.done ? "checked" : ""}>
                <span class="todo-text">${item.text} <span class= "${item.level === "low" ? "todo-level-low" : item.level === "medium" ? "todo-level-medium" : "todo-level-high"}">${item.level}</span>
            </label>
                <div class="todo-actions">
                <button class="todo-delete-btn" data-index="${index}" aria-label="Hapus tugas">Hapus</button>
            </div>
        `

        todoList.appendChild(isiList)
    })

    todoCount.innerHTML = `${taskList.length} tugas tersisa`
}

function todoNewDate () {
    const today = new Date();

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formatted = today.toLocaleDateString('id-ID', options);

    newDate.innerHTML = formatted

}
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const userInput = todoinput.value 
    const todoLevel = selectEl.value
    taskList.push({text: userInput, level: todoLevel, done: false});
    addTask()
    form.reset()
})

todoList.addEventListener('click', function (e) {
    if(e.target.classList.contains("todo-delete-btn")){
        const idx = Number(e.target.dataset.index);
        if(!Number.isNaN(idx)){
            taskList.splice(idx,1);
            addTask()
        }
    }
})

todoList.addEventListener('change', function (e) {
    if(e.target.classList.contains("todo-checkbox")){
        const idx = Number(e.target.dataset.index);
        if(!Number.isNaN(idx)){
            taskList[idx].done = e.target.checked
            addTask()
        }
    }
})

todoNewDate()