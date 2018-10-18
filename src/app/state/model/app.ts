import {VisibilityState, VisiblityAction } from './visibility';
import {TodoState, TodoAction} from './todos';

interface AppState {
  todos: TodoState;
  visibilityFilter: VisibilityState;
}


type Action = TodoAction | VisiblityAction;

export { AppState }
export { Action }
