import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public title: string = 'My to-do list';
  public getLength: number = 0;

  constructor() {}


  public receberListaLength(event: number) {
    this.getLength = event;
  }

  public backgroundConditionFunction(){
    if(this.getLength > 0){
      return false;
    }else{
      return true;
    }
  }

}

