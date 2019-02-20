import { BehaviorSubject, Observable } from "rxjs";
import { DataSource } from "@angular/cdk/table";

export abstract class AbstractDataSource implements DataSource<any> {
  protected dataSubject = new BehaviorSubject<any[]>([]);
  public data: any[];
  protected dataCount = new BehaviorSubject<number>(0);
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public dataCount$ = this.dataCount.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor() {
    this.dataSubject.asObservable().subscribe(data => (this.data = data));
  }

  connect(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
  disconnect(): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}
