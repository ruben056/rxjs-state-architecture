import { TestBed, inject } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import { AppState, Action } from '../model/app';
import { TodoState, ToggleTodoAction, AddTodoAction, UpdateTodoAction, Todo } from '../model/todos';
import { VisibilityState, SetVisibilityFilter } from '../model/visibility';
import {  stateFn, todos } from './state.management';

describe('todos', () => {

  const initState = new InjectionToken('initState');
  const actionDispatcher = new InjectionToken('actionDispatcher');
  const state = new InjectionToken('state');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      {
        provide: initState,
        useValue: {
        todos: {
          todos: new Array<Todo>()} as TodoState,
          visibilityFilter : {visibilityFilter: 'SHOW_ALL'} as VisibilityState
        } as AppState
      },
      {
        provide: actionDispatcher,
        useValue: new Subject<Action>()
      },
      {
        provide: state,
        useFactory: stateFn,
        deps: [initState, actionDispatcher]
    }]
  });
});

  it('should create a new todo', () => {
    const actionDispatcher = new Subject<Action>();
    const initState = {
      todos: {todos: new Array<Todo>()} as TodoState,
      visibilityFilter : {visibilityFilter: 'SHOW_ALL'} as VisibilityState
    } as AppState;
    const states = stateFn(initState, actionDispatcher);

    actionDispatcher.next(new AddTodoAction(100, 'todo1'));
    actionDispatcher.next(new AddTodoAction(101, 'todo2'));

    states.subscribe(s => {
      console.log(`state:${JSON.stringify(s)}`);
      const todos = s.todos.todos;
      expect(todos.length).toEqual(2);
      expect(todos[0]).toEqual({
        id: 100, text: 'todo1', completed: false});
      expect(todos[1]).toEqual({
        id: 101, text: 'todo2', completed: false});
    });
  });

  it('should created and update todo', inject([actionDispatcher, state], (actionDispatcher, state) => {

    state.subscribe((updatedState)=>console.log('STATECHANGE:', JSON.stringify(updatedState)));
    actionDispatcher.next(new AddTodoAction(150, 'do something asap'));
    let mySubscription = state.subscribe((updatedState) => {
      const todos = updatedState.todos.todos;
      expect(todos.length).toEqual(1);
      expect(todos[0]).toEqual({
        id: 150, text: 'do something asap', completed: false});
    });
    mySubscription.unsubscribe();

    actionDispatcher.next(new UpdateTodoAction(150, 'do something asap', true));
    mySubscription = state.subscribe((updatedState) => {
      const todos = updatedState.todos.todos;
      expect(todos.length).toEqual(1);
      expect(todos[0]).toEqual({
        id: 150, text: 'do something asap', completed: true});
    });
    mySubscription.unsubscribe();
  }));

});
