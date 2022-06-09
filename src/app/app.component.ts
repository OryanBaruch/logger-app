import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  public BASE_URL: string = `https://jsonplaceholder.typicode.com/user1s`
  public BASE_UR2L: string = `https://jsonplaceholder.typicode.com/use1rs`

  public data$: Observable<any>
  public data1$: Observable<any>

  ngOnInit(): void {
    this.data1$ = this.httpClient.get(this.BASE_UR2L)
    this.data$ = this.httpClient.get(this.BASE_URL)
  }

  title = 'logger-app';

  throwError(){
    throw new Error('My Pretty Error');
  }
}
