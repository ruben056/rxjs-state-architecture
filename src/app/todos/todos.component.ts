import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {Action, AppState} from '../state/model/app';
import {Observable, Subject} from 'rxjs';
import {AddTodoAction} from '../state/model/todos';
import {ACTION_DISPATCHER_TOKEN, STATE_TOKEN} from '../state/management/app.management';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class TodosComponent implements OnInit {

  constructor(@Inject(STATE_TOKEN) public appState$: Observable<AppState>,
              @Inject(ACTION_DISPATCHER_TOKEN) public actionDispatcher: Subject<Action>) {
  }

  ngOnInit() {
    this.addSomeActions();
  }

  private addSomeActions(): void {
    this.actionDispatcher.next(new AddTodoAction(150, 'qsdfqsfd'));
    this.actionDispatcher.next(new AddTodoAction(151, 'blabla'));
  }

  public addTodo(lastId: string, text: string): void {
    const id = parseInt(lastId, 10) + 1;
    this.actionDispatcher.next(new AddTodoAction(id, text));
  }

}
