import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Base } from 'src/app/models/Base';
@Component({
  selector: 'app-item-detail-dialog',
  templateUrl: './item-detail-dialog.component.html',
  styleUrls: ['./item-detail-dialog.component.scss']
})
export class ItemDetailDialogComponent implements OnInit {

  public itemJSON: any;

  constructor(@Inject(MAT_DIALOG_DATA) public item: Base, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get('../../assets/' + this.item.type.toLowerCase() + '/' + this.item.id + '/item.json').pipe(
      catchError(this.handleError)
    ).subscribe( res => {
      this.itemJSON = res;
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
