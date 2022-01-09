import { createAction, props } from '@ngrx/store';


export const notificationSuccess = createAction(
  '[Notification] Notification Success',
  props<{ message?: string}>()
);

export const notificationFailure = createAction(
  '[Notification] Notification Failure',
  props<{ message?: string }>()
);

