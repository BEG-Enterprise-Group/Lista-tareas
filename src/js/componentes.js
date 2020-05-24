//Referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const filtrosUl = document.querySelector('.filters');
const enlacesFiltros = document.querySelectorAll('.filtro');

//IMPORTACIONES
import{Todo} from '../classes/';
import{todoList} from '../index.js';

export const crearTodoHtml = (todo)=>{
	const htmlTodo = `	
	<li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);//FIRST ELEMENT CHILD DEVUELVE EL PRIMER HIJO
	return div.firstElementChild;
}

//EVENTOS

txtInput.addEventListener('keyup',(event)=>{
	if (event.keyCode ===13 && txtInput.value.length>0){
		const nuevoTodo = new Todo(txtInput.value);
		todoList.nuevoTodo(nuevoTodo);
		crearTodoHtml(nuevoTodo);
		txtInput.value = '';

	}
});//KEYUP EVENTO CUANDO LA PERSONA SUELTA UNA TECLA

divTodoList.addEventListener('click',(event)=>{
	const nombreElemento = (event.target.localName);
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');
	if(nombreElemento.includes('input')){ //SI EL NOMBRE DEL ELEMENTO INCLUYE ALGUN LLAMADO INPUTS Y SIGNIFICA QUE HIZO CLICK EN EL CHECKBOX
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed');//EL TOGGLE SE USA CUANDO LA CLASE ES COMO UN SUICHE COMO 0 O 1
	}else if(nombreElemento.includes('button')){//SI EL NOMBRE DEL ELEMENTO INCLUYE UN BOTON QUIERE DECIR QUE ES PARA BORRAR EL TODO
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild(todoElemento);
	}

});

btnEliminarCompletados.addEventListener('click',()=>{
	todoList.borrarCompletados();
	for(let i = divTodoList.children.length-1;i>=0;i--){
		todoList.borrarCompletados();
	 //HACEMOS EL FOR DE MANERA INVERSA PARA NO TENER PROBLEMAS DE SALTARNOS UN ELEMENTO
		const elemento = divTodoList.children[i];
		if(elemento.classList.contains('completed')){//ES DECIR SI EN LA LISTA DE CLASES SE ENCUENTRA COMPLETED
			divTodoList.removeChild(elemento);
		}
	}

});

filtrosUl.addEventListener('click',(event)=>{
	const filtro = event.target.text;
	if (!filtro) {return;}
	enlacesFiltros.forEach(elemento =>elemento.classList.remove('selected'));
	event.target.classList.add('Selected');
	for (const elemento of divTodoList.children){
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');
		switch(filtro) {
				case 'Pendientes':
					completado ? elemento.classList.add('hidden'):'';
					break;
				case 'Completados':
					(!completado) ? elemento.classList.add('hidden'):'';
					break;
			}	
	}

});

