/**
 * @typedef {Object} ToDoItemType
 * @property {number} id ID задания
 * @property {string} text Текст задания
 * @property {boolean} complite Текст задания
 */

/** @type ToDoItemType[] */
let taskList = [];
/** Сохраняет текущий ToDo в localStorage */
const deleteLocal = () => localStorage.clear();
const saveLocal = () => localStorage.setItem('tasklist', JSON.stringify(taskList));

function Perezapis()
{
  deleteLocal();
  taskList.forEach((i)=>{
    saveLocal(taskList[i]);
  })
}


document.addEventListener('DOMContentLoaded', () => {
  /* Пытаемся получить список заданий из хранилища */
  try {
    taskList = JSON.parse(localStorage.getItem('tasklist'));
  } catch (e) {
    // Обработчики, если что то пошло не так
    console.error(e);
  }
  /* Для каждого элемента отрисовываем задание на странице */
  taskList.forEach(item => addTaskInDom(item.text, item.id, false, item.complite));
})
/** @type {HTMLInputElement} */
const taskInput = document.getElementById('taskText');
/** @type {HTMLButtonElement} */
const addButton = document.getElementById('addButton');
/** @type {HTMLDivElement} */
const taskContainer = document.getElementById('taskBox');
/** @type {HTMLDivElement} */
const addComplite = document.getElementById('chec');

addButton.addEventListener('click', () => {
  /* Создаем новое задание */
  consle.log(taskInput.value)
  addTaskInDom(taskInput.value, new Date().getTime(),);
  taskInput.value = ''; // Зачищаем инпут
});

/**
 * Добавляет новое задание на страницу
 * @param {string} task ID задания
 * @param {number} idTask Текст задания
 * @param {boolean} isNew Признак нового задания
 * @param {boolean} compl Признак выполнености
 */
function addTaskInDom(task, idTask, isNew = true,compl=false) {
  /** @type {ToDoItemType} */
  const taskBody = {
    id: idTask,
    text: task,
    complite: compl,
  }
  console.log(compl)
  /* Создаем обертку для задания */
  const div = document.createElement('div');
  div.className = 'taskItem'; // Добавляем класс
  /* Создаем текст задания*/
  const taskText = document.createElement('div');
  taskText.className = 'taskItemText'; // Добавляем класс
  taskText.innerText = task; // Добавляем текст
  /* Создаем checbox*/
  const checbox =document.createElement('input');
  checbox.type = 'checkbox';
  if(compl == true)
  {
    console.log(compl)
    checbox.setAttribute('checked', checbox.checked ? '' : 'checked')
  }
  else
  {
    console.log(compl)
    checbox.removeAttribute('checked');
  }
  checbox.addEventListener('click', () => {
    if(compl != false){
        compl=false;
    }
    else{
        compl=true;
    }
    for(let key in taskList) {
      if(taskList[key].id == idTask)
        taskList[key].complite = compl;
    }
    Perezapis();
  });
  /* Создаем кнопку удаления задания*/
  const buttonDelete = document.createElement('button');
  buttonDelete.innerText = 'Удалить'; // Текст кнопки
  /* Вешаем обработчик на нажатие кнопки */
  buttonDelete.addEventListener('click', () => {
    div.remove(); // Удалить со страницы
    taskList = taskList.filter(it => it.id !== idTask); // Изменить текущее состояние
    saveLocal(); // Сохранить
  });
  div.appendChild(checbox);
  div.appendChild(taskText); // Добавляем в контейнер текст
  div.appendChild(buttonDelete); // Ддобавляем кнопку
  taskContainer.appendChild(div); // Добавляем задание в контейнер
  /* Если это создание задания, пушим и сохраняем в хранилище */
  if (isNew) {
    console.log(idTask+" "+task+" "+compl);
    taskList.push(taskBody); // Пушим задние
    saveLocal(); // Сохраняем
  }
}
