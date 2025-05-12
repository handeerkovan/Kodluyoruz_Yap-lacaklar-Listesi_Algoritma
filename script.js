window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        createListItem(task.text, task.checked);
    });
};

let old_list = document.getElementById("list");

function newElement() {
    let newTask = document.getElementById("task").value.trim();
    if (!newTask) {
        alert("Listeye boş ekleme yapamazsınız");
    } else {
        createListItem(newTask, false);
        saveTaskToStorage(newTask, false);
        document.getElementById("task").value = "";
    }
}

function createListItem(taskText, isChecked) {
    let li = document.createElement("li");
    li.innerHTML = `
      ${taskText}
      <span class="close" onclick="RemoveElement(this)">x</span>
    `;
    if (isChecked) {
        li.classList.add("checked");
    }

    li.onclick = function (e) {
        // "x" butonuna tıklanmadıysa toggle yap
        if (!e.target.classList.contains("close")) {
            this.classList.toggle("checked");
            updateTaskChecked(this.firstChild.textContent.trim(), this.classList.contains("checked"));
        }
    };

    old_list.appendChild(li);
}

function saveTaskToStorage(taskText, isChecked) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, checked: isChecked });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskChecked(taskText, isChecked) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task =>
        task.text === taskText ? { ...task, checked: isChecked } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function RemoveElement(el) {
    const li = el.parentElement;
    const text = li.firstChild.textContent.trim();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    li.remove();
}
