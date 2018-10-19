import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Subject} from 'rxjs';

import {AppComponent} from './app.component';

import {Action, AppState} from './state/model/app';
import {Todo, TodoState} from './state/model/todos';
import {VisibilityState} from './state/model/visibility';
import {ACTION_DISPATCHER_TOKEN, INIT_STATE_TOKEN, STATE_TOKEN, stateFn} from './state/management/app.management';
import {TodosComponent} from './todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      provide: INIT_STATE_TOKEN,
      useValue: {
        todos: {
          todos: new Array<Todo>()} as TodoState,
        visibilityFilter : {visibilityFilter: 'SHOW_ALL'} as VisibilityState
      } as AppState
    },
    {
      provide: ACTION_DISPATCHER_TOKEN,
      useValue: new Subject<Action>()
    },
    {
      provide: STATE_TOKEN,
      useFactory: stateFn,
      deps: [INIT_STATE_TOKEN, ACTION_DISPATCHER_TOKEN]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
