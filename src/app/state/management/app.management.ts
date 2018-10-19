import {BehaviorSubject, Observable, merge, zip, Subject} from 'rxjs';
import { scan, map } from 'rxjs/operators';
import { AppState, Action } from '../model/app';
import { todos } from './todos.management';
import { filter } from './filter.management';
import {InjectionToken} from '@angular/core';

export const INIT_STATE_TOKEN = new InjectionToken('initState');
export const ACTION_DISPATCHER_TOKEN = new InjectionToken<Subject<Action>>('actionDispatcher');
export const STATE_TOKEN = new InjectionToken<Observable<AppState>>('state');

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

export {todos, filter, stateFn}
