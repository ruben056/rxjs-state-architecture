import { Observable } from 'rxjs';
import { scan, map } from 'rxjs/operators';

import { Action } from '../model/app';
import { TodoState, ToggleTodoAction, AddTodoAction, UpdateTodoAction } from '../model/todos';

function todos(initState: TodoState, actions: Observable<Action>): Observable<TodoState> {
  //todo probably replace with switch case... iso if else...
    return actions.pipe(
      scan((state: TodoState,action: Action)=>{
        if(action instanceof AddTodoAction){
          return addTodo(state, action);
        } else if(action instanceof UpdateTodoAction){
          return updateTodo(state, action);
        } else if(action instanceof ToggleTodoAction){
          return toggleTodo(state, action);
        }
        return state;
      }, initState));
}

function addTodo(state: TodoState, action: AddTodoAction): TodoState {
  const newTodo = {
    id: action.id,
    text: action.text,
    completed: false
  };
  return { todos: [...state.todos, newTodo] };
}

function updateTodo(state: TodoState, action: UpdateTodoAction): TodoState {
  const baseTodoToUpdate = state.todos.find(todo => todo.id === action.id);
  const newTodos = state.todos.map(todo=>{
    if(todo.id === action.id){
      return {...todo,
        text: action.text,
        completed: action.completed
      };
    }
    return todo;
  });
  return {todos: newTodos};
}

function toggleTodo(state: TodoState, action: ToggleTodoAction): TodoState {
  const baseTodoToUpdate = state.todos.find(todo => todo.id === action.id);
  const newTodos = state.todos.map(todo=>{
    if(todo.id === action.id){
      return {...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });
  return {todos: newTodos};
}

export { todos };
