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
