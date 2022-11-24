// import Sortable from './node_modules/sortablejs/modular/sortable.core.esm.js';

const newTodo = document.getElementById('new-todo');
const newTodoTxt = document.getElementById('new-todo-txt');
const addNewTodoBtn = document.getElementById('add-new-todo-btn');
const todoList = document.querySelector('.todo');
const todoLeft = document.getElementById('todo-left');
const clearCompletedBtn = document.getElementById('clear-completed');
let todos = document.querySelectorAll('.todo');

//Drag & Drop with sortablejs library
let el = document.getElementById('new-todo');
let sortable = Sortable.create(el);

new Sortable(el, {
    animation: 150,
    ghostClass: 'blue-background-class',
  });


// Get all todo items from Firebase Firestore Database
function getItems() {
    db.collection('todo-items').onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        })
        generateItems(items);
});
}

function generateItems(items) {
    let todoItems = [];
    items.forEach(item => {
        const div = document.createElement('li')
        newTodo.appendChild(div);
        div.classList.add('todo');
        if (header.classList.contains('dark')) {
            div.classList.add('dark');
        }
        toggleDarkMode.addEventListener('click', () => {
            div.classList.toggle('dark');
        });

        const div2 = document.createElement('div')
        div.appendChild(div2);
        div2.classList.add('wrap-todo');

        const div3 = document.createElement('div')
        div2.appendChild(div3);
        div3.classList.add('checkbox');
        if (header.classList.contains('dark')) {
            div3.classList.add('dark');
        }
        toggleDarkMode.addEventListener('click', () => {
            div3.classList.toggle('dark');
        });


        let itemActive = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].completed === false) {
                itemActive++;
            }
        }
        todoLeft.innerHTML = itemActive + (itemActive > 1 ? ' items' : ' item');
        div3.addEventListener('click', () => {
            div.classList.toggle('completed');
            if (div.classList.contains('completed')) {

                db.collection('todo-items').doc(item.id).update({
                    completed: true
                })
                .then(() => {
                    console.log(`Document successfully updated to completed: true`);
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });

                todos--;
                } else {

                db.collection('todo-items').doc(item.id).update({
                    completed: false
                })
                .then(() => {
                    console.log("Document successfully updated to completed: false");
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });

                todos++;
            }
        });

        item.completed ? div.classList.add('completed') : div.classList.remove('completed');

        const p = document.createElement('p')
        div2.appendChild(p);
        p.innerHTML = item.text;

        const div4 = document.createElement('div')
        div.appendChild(div4);

        const img = document.createElement('img')
        div4.appendChild(img);
        img.src = './images/icon-cross.svg';
        img.addEventListener('click', () => {
            div.remove();
            db.collection('todo-items').doc(item.id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        });

        todoItems.push(div);

        let itemsToClear = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].completed === true) {
                itemsToClear.push(items[i]);
            }
        }

        clearCompletedBtn.addEventListener('click', () => {
            const completed = document.querySelectorAll('.completed');
            completed.forEach((todo) => {
                todo.remove();
            });
            itemsToClear.forEach((item) => {
                db.collection('todo-items').doc(item.id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            });
        });
    });
    newTodo.replaceChildren(...todoItems);
}



function addNewTodo() {
    db.collection("todo-items").add({
        text: newTodoTxt.value,
        completed: false
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

addNewTodoBtn.addEventListener('click', () => {
    if (newTodoTxt.value !== '') {
        addNewTodo();
        newTodoTxt.value = '';
    }
});

newTodoTxt.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && newTodoTxt.value !== '') {
            addNewTodo();
            newTodoTxt.value = '';
        }
});

getItems();


// Make All, Active & Completed filters work
const allTodos = document.getElementById('all');
const activeTodos = document.getElementById('active');
const completedTodos = document.getElementById('completed');


allTodos.addEventListener('click', () => {
    allTodos.style.color = 'hsl(220, 98%, 61%)';
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        todo.style.display = 'flex';
    });
});

activeTodos.addEventListener('click', () => {
    allTodos.style.color = 'hsl(236, 9%, 61%)';
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
    allTodos.style.color = 'hsl(236, 9%, 61%)';
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        if (todo.classList.contains('completed')) {

            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
});


const allTodosDesktop = document.getElementById('all-desktop');
const activeTodosDesktop = document.getElementById('active-desktop');
const completedTodosDesktop = document.getElementById('completed-desktop');


allTodosDesktop.addEventListener('click', () => {
    allTodosDesktop.style.color = 'hsl(220, 98%, 61%)';
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        todo.style.display = 'flex';
    });
});

activeTodosDesktop.addEventListener('click', () => {
    allTodosDesktop.style.color = 'hsl(236, 9%, 61%)';
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        if (todo.classList.contains('completed')) {
            todo.style.display = 'none';
        } else {
            todo.style.display = 'flex';
        }
    });
});

completedTodosDesktop.addEventListener('click', () => {
    allTodosDesktop.style.color = 'hsl(236, 9%, 61%)';
    const todos = document.querySelectorAll('.todo');
    todos.forEach((todo) => {
        if (todo.classList.contains('completed')) {

            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
});


//Toggle Light & Dark Mode

const toggleDarkMode = document.getElementById('toggle-dark-mode');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const createNewTodo = document.querySelector('.new-todo');
const input = document.querySelector('input');
const checkboxTop = document.querySelector('.checkbox');
const todoFooter = document.querySelector('.todo-footer');
const filterDesktop = document.querySelector('.filter-desktop');
const filter = document.querySelector('.filter');

toggleDarkMode.addEventListener('click', () => {
    body.classList.toggle('dark');
    header.classList.toggle('dark');
    createNewTodo.classList.toggle('dark');
    input.classList.toggle('dark');
    checkboxTop.classList.toggle('dark');
    todoFooter.classList.toggle('dark');
    filterDesktop.classList.toggle('dark');
    clearCompletedBtn.classList.toggle('dark');
    filter.classList.toggle('dark');
    body.classList.contains('dark') ? toggleDarkMode.src = './images/icon-sun.svg' : toggleDarkMode.src = './images/icon-moon.svg';
    
});








