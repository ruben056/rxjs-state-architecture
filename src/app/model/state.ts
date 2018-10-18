import { ToggleTodoAction, AddTodoAction, UpdateTodoAction, SetVisibilityFilter, Action } from './actions';
import { BehaviorSubject, Observable, merge, zip } from 'rxjs';
import { scan, map } from 'rxjs/operators';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface AppState {
  todos: TodoState;
  visibilityFilter: VisibilityState;
}

interface TodoState{
  todos: Todo[];
}

interface VisibilityState{
  visibilityFilter: string;
}

function todos(initState: TodoState, actions: Observable<Action>): Observable<TodoState> {
    return actions.pipe(
      scan((state: TodoState,action: Action)=>{
        if (action instanceof AddTodoAction) {
          const newTodo = {
            id: action.id,
            text: action.text,
            completed: false
          };
          return {...state,
                  todos: [...state.todos, newTodo]};
        } else if(action instanceof UpdateTodoAction){
          return updateTodo(state, action);
        }
        return state;
      }, initState));
}

function updateTodo(state: TodoState, actionfunction todos(initState: TodoState, actions: Observable<Action>): Observable<TodoState> {
    return actions.pipe(
      scan((state: TodoState,action: Action)=>{
        if (action instanceof AddTodoAction) {
          const newTodo = {
            id: action.id,
            text: action.text,
            completed: false
          };
          return {...state,
                  todos: [...state.todos, newTodo]};
        } else if(action instanceof UpdateTodoAction){
          return updateTodo(state, action);
        }
        return state;
      }, initState));
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

function filter(initState: VisibilityState, actions: Observable<Action>): Observable<VisibilityState> {

  return actions.pipe(
    scan((state: VisibilityState,action: Action)=>{
      if (action instanceof SetVisibilityFilter) {
        return {
          ...state,
          visibilityFilter : action.filter
        }
      }
      return state;
    }, initState));
}

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const combine = actionResults => ({todos: actionResults[0], visibilityFilter: actionResults[1]});
  const appState$: Observable<AppState> =
    zip(
      todos(initState.todos, actions),
      filter(initState.visibilityFilter, actions))
    .pipe(map(combine));
  return wrapIntoBehavior(initState, appState$);
}

function wrapIntoBehavior(init: AppState, obs: Observable<AppState>): Observable<AppState> {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}: UpdateTodoAction): TodoState {

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

function filter(initState: VisibilityState, actions: Observable<Action>): Observable<VisibilityState> {

  return actions.pipe(
    scan((state: VisibilityState,action: Action)=>{
      if (action instanceof SetVisibilityFilter) {
        return {
          ...state,
          visibilityFilter : action.filter
        }
      }
      return state;
    }, initState));
}

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const combine = actionResults => ({todos: actionResults[0], visibilityFilter: actionResults[1]});
  const appState$: Observable<AppState> =
    zip(
      todos(initState.todos, actions),
      filter(initState.visibilityFilter, actions))
    .pipe(map(combine));
  return wrapIntoBehavior(initState, appState$);
}

function wrapIntoBehavior(init: AppState, obs: Observable<AppState>): Observable<AppState> {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}

export {VisibilityState, TodoState, AppState, Todo, stateFn, todos, filter};
