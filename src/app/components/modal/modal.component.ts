import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { IUserState } from 'src/app/store/reducers/user.reducers';
import { deleteTodo } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  title: string;
  id: number | undefined;

  constructor(public modalRef: BsModalRef, private store: Store<IUserState>) {
    this.title = '';
  }

  ngOnInit() {}

  confirm() {
    this.id && this.store.dispatch(deleteTodo({ id: this.id }));
    this.modalRef.hide();
  }
}
