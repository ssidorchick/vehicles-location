import { Action } from '@ngrx/store';

export enum Types {
  TEST = 'Test action'
}

export class TestAction implements Action {
  readonly type = Types.TEST;
}

export type Actions
  = TestAction;
