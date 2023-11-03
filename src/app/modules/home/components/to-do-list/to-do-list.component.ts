import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, NgZone, Output } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent implements DoCheck {

  public list: Array<string> = JSON.parse(localStorage.getItem("List") || '[]');
  public tarefa: string = '';
  @Output() sendListLength = new EventEmitter();
  isSelectAllChecked: boolean = false;
  checkboxStates: boolean[] = [];

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {

    this.checkboxStates = Array(this.list.length).fill(false);
  }

  ngDoCheck(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.setLocalStorage();
        this.cd.detectChanges();
      });
    });

    if(this.list.length > 0){
      this.sendListLength.emit(this.list.length);
    }
  }

  public handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {

      if(this.tarefa !== ''){

        this.sendListLength.emit(this.list.length + 1);
        this.checkboxStates.push(false);
        this.list.push(this.tarefa);
        this.tarefa = '';


      }
    }
  }

  public toggleSelectAll(): void {
    this.checkboxStates = this.checkboxStates.map(
      () => this.isSelectAllChecked
    );
  }

  public cleanList(): void {
    if(this.isSelectAllChecked){
      this.list = [];
      this.sendListLength.emit(this.list.length);
    }else{

      const indicesToRemove = [];
      for (let i = 0; i < this.checkboxStates.length; i++) {
        if (this.checkboxStates[i]) {
          indicesToRemove.push(i);
        }
      }

      indicesToRemove.reverse();

      for (const index of indicesToRemove) {
        this.list.splice(index, 1);
        this.checkboxStates.splice(index, 1);
        this.sendListLength.emit(this.list.length);
      }

    }

  }

  public setLocalStorage(){
    if(this.list){
      localStorage.setItem('List', JSON.stringify(this.list));
    }
  }

  }


