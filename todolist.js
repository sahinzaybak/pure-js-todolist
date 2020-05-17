"use strict";
//SELECTORS
const todoInput = document.querySelector(".form-input");
const todoButton = document.querySelector(".form-button");
const todoList = document.querySelector(".list .list-wrp");
const filter = document.querySelector(".filter select");

//EVENTS
document.addEventListener("DOMContentLoaded", getTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("change", makeFilter);

//FUNCTIONS
function addTodo(e) {
  e.preventDefault();

  //Create div
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");

  //Create p
  const todoName = document.createElement("p");
  todoName.innerText = todoInput.value;
  listItem.appendChild(todoName);

  //Create Buttons
  const listActions = document.createElement("div");
  listActions.classList.add("list-actions");
  listItem.appendChild(listActions);

  //Create check button
  const checkButton = document.createElement("button");
  checkButton.classList.add("check");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  listActions.appendChild(checkButton);

  //Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  listActions.appendChild(deleteButton);

  saveTodo(todoInput.value);
  todoList.appendChild(listItem);
  todoInput.value = "";
}

//Sil ve Tamamlandı butonları
function deleteCheck(e) {
  const item = e.target;

  //DELETE İŞLEMİ
  if (item.classList == "delete") {
    let listAction = item.parentElement; //ana elementine gider.
    let mainElement = listAction.parentElement;
    //ANİMASYON
    mainElement.classList.add("deleted"); // opacity transition
    removeTodo(mainElement);
    mainElement.addEventListener("transitionend", function () {
      //opacity transition bittiği an elementi DOM'dan sil.
      mainElement.remove();
    });
  }

  //COMPLETE İŞLEMİ
  if (item.classList == "check") {
    let listAction = item.parentElement;
    let mainElement = listAction.parentElement;
    //ANİMASYON
    mainElement.classList.toggle("checked"); // opacity transition
  }
}

function makeFilter(e) {
  const todos = todoList.children; //alt elemanlarını alır. --> HTML Collectinon döner.
  Array.from(todos).forEach((element) => {
    switch (e.target.value) {
      case "all":
        element.style.display = "flex";
        break;

      case "completed":
        if (element.classList.contains("checked"))
          element.style.display = "flex";
        else element.style.display = "none";
        break;

      case "uncompleted":
        if (!element.classList.contains("checked"))
          element.style.display = "flex";
        else element.style.display = "none";
        break;
    }
  });
}

//LOCAL STORAGE
function saveTodo(x) {
  let todos;
  if (localStorage.getItem("todosItem") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todosItem"));
  todos.push(x);
  localStorage.setItem("todosItem", JSON.stringify(todos));
}

function getTodo() {
  let todos;
  if (localStorage.getItem("todosItem") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todosItem"));
  todos.forEach((element) => {
    //Create div
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");

    //Create p
    const todoName = document.createElement("p");
    todoName.innerText = element;
    listItem.appendChild(todoName);

    //Create Buttons
    const listActions = document.createElement("div");
    listActions.classList.add("list-actions");
    listItem.appendChild(listActions);

    //Create check button
    const checkButton = document.createElement("button");
    checkButton.classList.add("check");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    listActions.appendChild(checkButton);

    //Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    listActions.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
}

function removeTodo(y) {
  let todos;
  if (localStorage.getItem("todosItem") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todosItem"));
  const index = y.children[0].innerText;
  todos.splice(todos.indexOf(index), 1);
  localStorage.setItem("todosItem", JSON.stringify(todos));
}
