import {Todo} from './todo.class.js'
export class TodoList {
	constructor(){
		this.cargarLocalStorage();
	}

	nuevoTodo(todo){
		this.todos.push(todo);
		this.guardarLocalStorage();
	}

	eliminarTodo(id){
		this.todos = this.todos.filter(todo => todo.id !== parseInt(id));//el fiter en un callback ejecuta una funcion en este caso que devuelva todos los elementos que su id es diferente al parametro
		this.guardarLocalStorage();

	}

	marcarCompletado(id){
		for(const todo of this.todos){
			if(todo.id === parseInt(id)){
				todo.completado = !todo.completado;
				this.guardarLocalStorage();
				break;
			}
		}
	}

	borrarCompletados(){
		this.todos = this.todos.filter(todo => todo.id !== todo.completado);
		this.guardarLocalStorage();
	}

	guardarLocalStorage(){
		localStorage.setItem('todo',JSON.stringify(this.todos));//JSON NOS PERMITE PODER GRABAR EN EL LOCAL STORAGE EL ARREGLO PORQUE SOLO ALMACENA STRINGS
	}

	cargarLocalStorage(){
		this.todos = (localStorage.getItem('todo'))? JSON.parse(localStorage.getItem('todo')): [];
		this.todos = this.todos.map( Todo.fromJson);//MAP ME PERMITE BARRER CADA UNO DE LOS ELEMENTOS QUE ESTAN DENTRO DE UN ARREGLO Y RETORNAR UN NUEVO ARREGLO CON LOS RESULTADOS DEL CALLBACK QUE ESTA ENTREPARENTESIS
	}
}