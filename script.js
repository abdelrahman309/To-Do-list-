//  get all ellements that we use
let input = document.querySelector(".inp__1");
let addButton = document.querySelector(".add__btn");
let tasksContainer = document.querySelector(".tasks_container");
let clearButton = document.querySelector(".clear__btn");
let counter = document.querySelector(".tasks__counter");
let completedBtn = document.querySelector(".compelete__btn");
let searcInput = document.querySelector(".inp__1");
input.focus();
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
remiendTasks();

addButton.addEventListener("click", function (e) {
  e.preventDefault();
  let value = input.value.trim();
  if (value !== "") {
    addtask(value);
    input.value = "";
  }
});

function addtask(value) {
  tasks.push({ title: value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  remiendTasks();
}

function remiendTasks() {
  tasksContainer.innerHTML = "";

  const totalTasks = tasks.length;
  const compeltedTas = tasks.filter((task) => task.completed).length;
  counter.textContent = `Total Tasks : ${totalTasks} 
  completed Tasks : ${compeltedTas}`;
  tasks.forEach((ele, index) => {
    let div = document.createElement("div");
    div.textContent = ele.title;
    if (ele.completed === true) {
      div.style.color = "green";
    }

    let completedButton = document.createElement("button");
    completedButton.textContent = "Mark As Compelete";
    completedButton.classList.add("compeleted__btn");
    completedButton.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      remiendTasks();
    });
    div.appendChild(completedButton);

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove__btn");

    removeButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      remiendTasks();
    });

    tasksContainer.appendChild(div);

    div.appendChild(removeButton);
  });
}
completedBtn.addEventListener("click", function () {
  tasks.forEach((task) => (task.completed = true));
  localStorage.setItem("tasks", JSON.stringify(tasks));
  remiendTasks();
});

clearButton.addEventListener("click", function () {
  tasks = [];
  localStorage.removeItem("tasks");
  remiendTasks();
});
