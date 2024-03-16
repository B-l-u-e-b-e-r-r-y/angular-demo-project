import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {

  constructor() { }

  throwError(e: HttpErrorResponse) {
    console.log(e);
    // alert(`取得 ${e.url} 時發生錯誤`);
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.throwError(error);
        return of(null);
      }),
      tap(event => {
        if (event instanceof HttpResponse) {
          // 如果沒有資料
          if (event.body.length < 1) {
            // alert('所選條件沒有資料');
          }
        }
      })
    );
  }
}