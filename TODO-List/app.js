// ------------ selectors ---------------- //

let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let list = document.querySelector('.todo-list');
let deleteBtn = document.querySelector('trash-btn');

// ------------ adding event listeners ---------------- //

todoButton.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', showTodo);

// ------------ functions ---------------- //

function addTask(e) {
    // prevent form from being submit
    e.preventDefault();
    let text = todoInput.value;      // taking input string and storing it in a variable             
    if (text.trim() !== ''){
        
        const item = document.createElement('div');    // creating a div element ---- <div></div>
        item.classList.add('todo');                       // giving it a class todo ---- <div class="todo"></div>
        
        const todoItem = document.createElement('li');    // creating a list element ---- <li></li>
        todoItem.classList.add('todo-item');      // giving it a class todo ---- <li class="todo"></li>
        todoItem.style.fontWeight = 'bold';
        todoItem.innerText = text;       // setting the inner content of list element, e.g.  <li class="todo">text</li>
        saveToLocalStorage(text);

        const trashBtn = document.createElement('button');   // create a button ---- <button></button>
        trashBtn.classList.add( 'trash-btn');         // giving it a class --- trash-btn, e.g <button class="trash-btn"></button>
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';   // inserting an icon inside the button, e.g. <button class="trash-btn"><i class="fas fa-trash"></i></button>
        trashBtn.addEventListener('click', deleteTask);
        
        // inserting li and buttons inside div element
        item.appendChild(todoItem);
        item.appendChild(trashBtn);

        // inserting div element in ul element
        list.appendChild(item);
    }
    todoInput.value = '';

}

function deleteTask(e){
    const item = e.target.parentElement;
    deleteFromLocalStorage(item);
    item.style.transform = 'translateY(0.5rem)';
    item.style.opacity = 0;
    item.addEventListener( 'transitionend', () =>{
        item.remove();
    })
}


function saveToLocalStorage(item){
    let items;
    if( localStorage.getItem('items') == null ){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem( 'items', JSON.stringify(items) );
}

function deleteFromLocalStorage(item){
    let items = JSON.parse(localStorage.getItem('items'));
    const index = items.indexOf(item.children[0].innerText);
    items.splice(index, 1);
    localStorage.setItem( 'items', JSON.stringify(items) );
}

function showTodo(){
    let items;
    if( localStorage.getItem('items') == null ){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach(todo => {
        const item = document.createElement('div');    // creating a div element ---- <div></div>
        item.classList.add('todo');                       // giving it a class todo ---- <div class="todo"></div>
        
        const todoItem = document.createElement('li');    // creating a list element ---- <li></li>
        todoItem.classList.add('todo-item');      // giving it a class todo ---- <li class="todo"></li>
        todoItem.style.fontWeight = 'bold';
        todoItem.innerText = todo;       // setting the inner content of list element, e.g.  <li class="todo">text</li>
        
        const trashBtn = document.createElement('button');   // create a button ---- <button></button>
        trashBtn.classList.add( 'trash-btn');         // giving it a class --- trash-btn, e.g <button class="trash-btn"></button>
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';   // inserting an icon inside the button, e.g. <button class="trash-btn"><i class="fas fa-trash"></i></button>
        trashBtn.addEventListener('click', deleteTask);
        
        // inserting li and buttons inside div element
        item.appendChild(todoItem);
        item.appendChild(trashBtn);

        // inserting div element in ul element
        list.appendChild(item);
    });
}

