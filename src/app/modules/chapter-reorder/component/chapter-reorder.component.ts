import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { chapters } from '../chapter-reorder.model';

@Component({
  selector: 'chapter-reorder',
  templateUrl: './chapter-reorder.component.html',
  styleUrls: ['./chapter-reorder.component.scss']
})
export class ChapterReorderComponent implements OnInit {

  chapters = chapters
  dropDatas = []
  printView: boolean = true

  constructor() { }

  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);
    //  else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex,
    //   );
    // }
  }

  // cutData(data) {
  //   this.chapters.unshift(data)
  //   let i = this.dropDatas.findIndex(x => x == data)
  //   this.dropDatas.splice(i, 1)
  // }

  selectedTabValue(event) {
    event.tab.textLabel == 'Print' ? this.printView = true : this.printView = false
  }

}
