const toDoForm = document.querySelector(".toDo .toDoContainer .toDoForm");
const toDoInput = document.querySelector(".toDo .toDoContainer .toDoForm .toDoInput");
const toDoList = document.querySelector(".toDo .toDoContainer .toDoList");

let toDos =[];

const TODOS_KEY = "toDos";

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deLeTeToDo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter((toDos) => toDos.id !== parseInt(li.id));
    saveToDos();
    li.remove();
}

function checkList(event) {
    const spanClick = event.target;
    spanClick.classList.toggle("spanCick");
}

function paintToDoList(newToDo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = newToDo.text;

    const button = document.createElement("button");
    button.innerText = "x";

    li.appendChild(span);
    li.appendChild(button);
    li.id = newToDo.id;

    span.addEventListener("click", checkList);

    toDoList.appendChild(li);
    
    button.addEventListener("click", deLeTeToDo);
}

function healeToDoSubmit(event) {
    event.preventDefault(); //submit이라는 기본동작을 브라우저에서 막음

    const newToDo = toDoInput.value;

    toDoInput.value = "";

    const newToDoObj = {
        id: Date.now(),
        text: newToDo,
    };

    toDos.push(newToDoObj);

    paintToDoList(newToDoObj);

    saveToDos();
}

toDoForm.addEventListener("submit", healeToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const praseToDo = JSON.parse(savedToDos);
    toDos = praseToDo;
    praseToDo.forEach(paintToDoList);
}