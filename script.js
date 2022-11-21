const newTodo = document.getElementById('new-todo');
const newTodoTxt = document.getElementById('new-todo-txt');
const addNewTodoBtn = document.getElementById('add-new-todo-btn');
const todoList = document.querySelector('.todo');
const todoLeft = document.getElementById('todo-left');


function addNewTodo() {

    const div = document.createElement('div')
    newTodo.prepend(div);
    div.classList.add('todo');
    div.setAttribute('dragable', 'true');

    const div2 = document.createElement('div')
    div.appendChild(div2);
    div2.classList.add('wrap-todo');

    const div3 = document.createElement('div')
    div2.appendChild(div3);
    div3.classList.add('checkbox');
    div3.addEventListener('click', () => {
        div.classList.toggle('completed');
        if (div.classList.contains('completed')) {
            todos--;
            todoLeftCounter();
        } else {
            todos++;
            todoLeftCounter();
        }
    });

    const p = document.createElement('p')
    div2.appendChild(p);
    p.innerHTML = newTodoTxt.value;

    const div4 = document.createElement('div')
    div.appendChild(div4);

    const img = document.createElement('img')
    div4.appendChild(img);
    img.src = './images/icon-cross.svg';
    img.addEventListener('click', () => {
        div.remove();
        todos--;
        todoLeftCounter();
    });

    todos++;
}


let todos = document.querySelectorAll('.todo').length;

function todoLeftCounter() {
 todos > 1 ? todoLeft.innerHTML = 
    todos + ' ' + 'items' : 
    todoLeft.innerHTML = todos + ' ' + 'item';
}


addNewTodoBtn.addEventListener('click', () => {
    if (newTodoTxt.value !== '') {
    addNewTodo();
    todoLeftCounter();
    newTodoTxt.value = '';
    } else {
        return;
    }
});

newTodoTxt.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (newTodoTxt.value !== '') {
            addNewTodo();
            todoLeftCounter();
            newTodoTxt.value = '';
        } else {
            return;
        }
    }
});

const clearCompletedBtn = document.getElementById('clear-completed');

clearCompletedBtn.addEventListener('click', () => {
    const completed = document.querySelectorAll('.completed');
    completed.forEach((todo) => {
        todo.remove();
    });
});


const allTodos = document.getElementById('all');
const activeTodos = document.getElementById('active');
const completedTodos = document.getElementById('completed');

allTodos.addEventListener('click', () => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        todo.style.display = 'flex';
    });
});

activeTodos.addEventListener('click', () => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        if (todo.classList.contains('completed')) {
            todo.style.display = 'none';
        } else {
            todo.style.display = 'flex';
        }
    });
});

completedTodos.addEventListener('click', () => {
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
});







