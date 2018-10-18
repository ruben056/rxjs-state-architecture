interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState{
  todos: Todo[];
}

class AddTodoAction {
  constructor(public id: number, public text: string, public completed = false){}
}

class UpdateTodoAction {
  constructor(public id: number, public text: string, public completed = false){}
}

class ToggleTodoAction {
  constructor(public id: number){}
}

type TodoAction = AddTodoAction | UpdateTodoAction | ToggleTodoAction;

export {TodoState, Todo}
export {TodoAction, AddTodoAction, UpdateTodoAction, ToggleTodoAction}
