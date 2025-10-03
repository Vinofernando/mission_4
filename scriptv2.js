const form = document.getElementById('todo-form')
const todoinput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')
const todoCount = document.getElementById('todo-count')
const newDate = document.getElementById('time')
const selectEl = document.getElementById("todo-level");
const todoDelete = document.getElementById("todo-delete-all");
const filterBtn = document.querySelectorAll(".filter-btn");

let taskList = []
let filterState = "all"

// render / tampilkan data
function addTask () {
  todoList.innerHTML = ''

  let filteredTask = taskList.filter(item => {
    if (filterState === "all") return true;
    if (filterState === "active") return item.status === "active";
    if (filterState === "completed") return item.status === "completed";
  });

  filteredTask.forEach(item => {
    // ambil index asli di taskList (supaya delete/update tidak salah saat difilter)
    const realIndex = taskList.indexOf(item);

    const isiList = document.createElement('li')
    isiList.setAttribute('class', 'todo-item')
    if (item.done) isiList.classList.add("completed");

    isiList.innerHTML = `
      <label class="todo-row">
        <input type="checkbox" class="todo-checkbox" data-index="${realIndex}" ${item.done ? "checked" : ""}>
        <span class="todo-text">
          ${item.text} 
          <span class="${item.level === "low" ? "todo-level-low" : item.level === "medium" ? "todo-level-medium" : "todo-level-high"}">${item.level}</span>
        </span>
      </label>
      <div class="todo-actions">
        <button class="todo-delete-btn" data-index="${realIndex}" aria-label="Hapus tugas">Hapus</button>
      </div>
    `

    todoList.appendChild(isiList)
  })

  // tampilkan jumlah sesuai filter
  todoCount.innerHTML = `${filteredTask.length} tugas ditampilkan`
}

// tampilkan tanggal
function todoNewDate () {
  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formatted = today.toLocaleDateString('id-ID', options);
  newDate.innerHTML = formatted
}

// tambah task baru
form.addEventListener('submit', function (e) {
  e.preventDefault()
  const userInput = todoinput.value 
  const todoLevel = selectEl.value
  taskList.push({text: userInput, level: todoLevel, done: false, status: 'active'});
  addTask()
  form.reset()
})

// hapus 1 task
todoList.addEventListener('click', function (e) {
  if (e.target.classList.contains("todo-delete-btn")) {
    const idx = Number(e.target.dataset.index);
    if (!Number.isNaN(idx)) {
      taskList.splice(idx, 1);
      addTask()
    }
  }
})

// update status task
todoList.addEventListener('change', function (e) {
  if (e.target.classList.contains("todo-checkbox")) {
    const idx = Number(e.target.dataset.index);
    if (!Number.isNaN(idx)) {
      taskList[idx].done = e.target.checked
      taskList[idx].status = e.target.checked ? "completed" : "active"
      addTask()
    }
  }
})

// hapus semua task
todoDelete.addEventListener('click', () => {
  taskList = []
  addTask()
})

// filter tombol
filterBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtn.forEach(el => el.classList.remove("active"));
    btn.classList.add('active');
    filterState = btn.dataset.filter;
    addTask()
  })
})

todoNewDate()
