
let todos = JSON.parse(localStorage.getItem('todos')) || [];
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const actionButton = document.getElementById('actionButton');
const errorMessage = document.getElementById('errorMessage');
const filterButtons = document.querySelectorAll('.filter-section button');

let currentFilter = 'all';

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        if (currentFilter === 'all' || (currentFilter === 'active' && !todo.completed) || (currentFilter === 'completed' && todo.completed)) {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span class="task-text">${todo.text}</span>
                <span class="status ${todo.completed ? 'completed' : 'active'}">${todo.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
                <button class="edit" onclick="editTodo(${index})">Sửa</button>
                <button class="delete" onclick="deleteTodo(${index})">Xóa</button>
            `;
            li.querySelector('.status').onclick = () => toggleTodoStatus(index);
            todoList.appendChild(li);
        }
    });
}
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';
    todos.push({ text: todoText, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    renderTodos();
}
function editTodo(index) {
    const newText = prompt('Nhập công việc mới:', todos[index].text);
    if (newText !== null && newText.trim() !== '') {
        todos[index].text = newText.trim();
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
}
function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}
function toggleTodoStatus(index) {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}
function filterTodos(status) {
currentFilter = status;

document.querySelectorAll(".filter-section button").forEach((btn) => {
btn.classList.remove("active");
});

const activeBtn = [...document.querySelectorAll(".filter-section button")].find(
(btn) => btn.textContent ===
(status === "all" ? "Tất cả" : status === "active" ? "Chưa hoàn thành" : "Hoàn thành")
);
if (activeBtn) activeBtn.classList.add("active");

renderTodos();
}
renderTodos();
