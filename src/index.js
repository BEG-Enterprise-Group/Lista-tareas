import '../src/css/style.css';
import {Todo,TodoList} from './classes/';
import {crearTodoHtml} from './js/componentes.js';

export const todoList = new TodoList();
todoList.todos.forEach(crearTodoHtml);//PINTA EN EL HTML LO QUE TENEMOS ALMACENADO EN EL STORAGE. SI EL PARAMETRO ES IGUAL AL ARGUMENTO DEL METODO A LLAMAR SE PUEDEN QUITAR AMBOS Y SOLO COLOCAR EL NOMBRE DEL METODO




