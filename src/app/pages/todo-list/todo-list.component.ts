import { ModalComponent } from './../../components/modal/modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ITodo } from './../../models/todo';
import { IUserState } from './../../store/reducers/user.reducers';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as fromSelectors from '../../store/selectors/user.selectors';
import { getTodos } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: ITodo[] = [];
  todos$: Observable<ITodo[] | undefined>;
  modalRef: BsModalRef | undefined;

  constructor(
    private readonly store: Store<IUserState>,
    private modalService: BsModalService
  ) {
    this.todos$ = this.store.pipe(select(fromSelectors.getTodos));
  }

  openModal(id: number | undefined) {
    this.modalRef = this.modalService.show(ModalComponent, {
      initialState: {
        title: 'Do you want to delete?',
        id,
      },
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getTodos());
    this.todos$.subscribe((todos) => {
      if (todos !== undefined) this.todos = todos;
    });
  }
}
