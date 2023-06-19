import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor() { }

  getError(error:HttpErrorResponse):Array<string>{
    const errors: Array<string> = []
    if(error.error.errors){
      for(const field in error.error.errors){
        error.error.errors[field].map((value:string) =>{
          errors.push(value);
        })
      }
    }
    else if(error.error)
      errors.push(error.error);  
      
    return errors;
  }
}
