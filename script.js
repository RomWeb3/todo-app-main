const newTodo = document.getElementById('new-todo');
const newTodoTxt = document.getElementById('new-todo-txt');
const addNewTodoBtn = document.getElementById('add-new-todo-btn');
const todoList = document.querySelector('.todo');
const todoLeft = document.getElementById('todo-left');
const clearCompletedBtn = document.getElementById('clear-completed');
let todos = document.querySelectorAll('.todo');

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
        const div = document.createElement('div')
        newTodo.appendChild(div);
        div.classList.add('todo');

        const div2 = document.createElement('div')
        div.appendChild(div2);
        div2.classList.add('wrap-todo');

        const div3 = document.createElement('div')
        div2.appendChild(div3);
        div3.classList.add('checkbox');
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
                    console.log(`Document successfully updated to true`);
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
                    console.log("Document successfully updated to false");
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







