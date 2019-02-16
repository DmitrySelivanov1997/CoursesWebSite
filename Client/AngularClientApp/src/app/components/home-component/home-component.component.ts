import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponent implements OnInit {

  public name: string;
  @ViewChild("homeView")
  public homeView: ElementRef;

  constructor() {
    this.name = "Dmitry";
  }
  ngOnInit() {
  }

}
