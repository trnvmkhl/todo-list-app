//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const themeToggleButton = document.querySelector(".theme-toggle-btn");
const filterButton = document.querySelectorAll(".filter-button");

//events

window.onload = function () {
  calcItems();
};

todoButton.addEventListener("click", addTodo);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo(event);
  }
});

todoList.addEventListener("click", checkComplete);

themeToggleButton.addEventListener("click", themeToggle);

for (i = 0; i < filterButton.length; i++) {
  filterButton[i].addEventListener("click", filterTodo);

  filterButton[i].addEventListener("click", filterButtonColor);
}

// drag n drop

// reaction of start and end of dragging

todoList.addEventListener("dragstart", (evt) => {
  evt.target.classList.add("selected");
});

todoList.addEventListener("dragend", (evt) => {
  evt.target.classList.remove("selected");
});

// drag n drop logic

// allow drop elements in needed area
todoList.addEventListener("dragover", (evt) => {
    evt.preventDefault();

// find draggable element

    const activeElement = todoList.querySelector(".selected");

// find element, which has cursor on it

    const currentElement = evt.target;

// Check working:
// 1. Not on selected element
// 2. On the element of list

    const isMovable =
        activeElement !== currentElement &&
        currentElement.classList.contains("form");

// If not, stop

    if(!isMovable) {
        return;
    }

// find element, before which wi will drop

    const nextElement = (currentElement === activeElement.nextElementSibling)?
        currentElement.nextElementSibling :
        currentElement;

// Drop activeElement before nextElement

    todoList.insertBefore(activeElement, nextElement);
    
});

//functions

function addTodo(event) {
  event.preventDefault();

  if (todoInput.value == "") {
    alert("NO!");
  } else {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("form", "animated", "draggable-form");
    todoDiv.setAttribute("draggable", "true");
    const completedButton = document.createElement("button");
    completedButton.classList.add("btn", "completed-button");
    todoDiv.appendChild(completedButton);
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
  }
  todoInput.value = "";
  calcItems();
}

function checkComplete(event) {
  const item = event.target;

  if (item.classList.contains("completed-button")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed-todo");
    item.classList.toggle("complete");
  } else if (item.classList.contains("todo-item")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed-todo");
    item.previousElementSibling.classList.toggle("complete");
  } else if (item.classList.contains("delete-button")) {
    const todo = item.parentElement;
    todo.remove();
  }
  calcItems();
}

function calcItems() {
  let uncompletedItemsNumber = document.querySelectorAll("li").length;
  let completedItemsNumber = document.querySelectorAll(".completed-todo")
    .length;
  const itemsLeft = document.querySelector("#items-left");
  let calcItemsLeft = uncompletedItemsNumber - completedItemsNumber;
  if (calcItemsLeft == 1) {
    itemsLeft.innerText = calcItemsLeft + " item left";
  } else {
    itemsLeft.innerText = calcItemsLeft + " items left";
  }
}

function themeToggle() {
  const bodyContainer = document.querySelector("body");
  if (bodyContainer.classList.contains("dark-theme")) {
    bodyContainer.classList.remove("dark-theme");
    bodyContainer.classList.add("light-theme");
  } else if (bodyContainer.classList.contains("light-theme")) {
    bodyContainer.classList.remove("light-theme");
    bodyContainer.classList.add("dark-theme");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.innerText) {
      case "All":
        todo.style.display = "flex";
        break;
      case "Active":
        if (!todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Completed":
        if (todo.classList.contains("completed-todo")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "Clear Completed":
        x = document.querySelectorAll(".completed-todo");
        for (i = x.length - 1; i >= 0; i--) {
          x[i].remove();
        }
    }
  });
}

function filterButtonColor(event) {
  for (i = 0; i < filterButton.length; i++) {
    if (filterButton[i].classList.contains("filter-button-used")) {
      filterButton[i].classList.remove("filter-button-used");
    }
  }

  event.target.classList.add("filter-button-used");
}
