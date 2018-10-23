/*
error handler service to log errors for debugging purposes.
Spinner service is used to show spinner while making http calls.
*/
import { SpinnerVisibilityService } from 'ng-http-loader';
import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {

  constructor(private spinner: SpinnerVisibilityService) {

  }

  handleError(error) {
    console.warn('Unhandled Error', error);
    this.spinner.hide();
  }
}
