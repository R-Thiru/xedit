import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import { StagemappingService } from '../../stagemapping.service';
import { cardsData, mappedData, processData, templateData } from './stage-map.model';



@Component({
  selector: 'stage-map',
  templateUrl: './stage-map.component.html',
  styleUrls: ['./stage-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StageMapComponent implements OnInit {

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  dragOn: boolean = false
  stageData = processData
  cards: any = cardsData;
  templateData = templateData;
  mapData: any = []
  mapdetails: any = [];
  isTouch: boolean = false;
  flag: boolean = true;

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private stageService: StagemappingService) { }

  ngOnInit(): void {
    
    // Existing data
    // this.mapdetails = mappedData
    // this.mapdetails.forEach(y => {
    //   let i = this.stageData.findIndex(x => x.stage_name == y.stage_name)
    //   this.stageData.splice(i, 1)
    // })
    // for (let i = 0; i < this.mapdetails.length; i++) {
    //   this.cards.push({ stages: [] })
    // }

    // this.mapdetails.forEach((x) => {
    //   let i = (JSON.parse(x.default_order) - 1)
    //   this.cards.forEach((y, index) => {
    //     if (index == i) {
    //       y.stages.push(x)
    //     }
    //   })

    // })
    // this.cards = _.uniqWith(this.cards, _.isEqual);
    

    // Check touch
    this.isTouch = 'ontouchstart' in document.documentElement;
    this.isTouch ? this.dragOn = true : this.dragOn = false
  }


  // Drop Data
  dragData: any
  drop(event) {
    debugger
    if (event.previousContainer === event.container) {
      event.currentIndex = this.dropIndex
      event.container.data[0] = this.dragData
      
      this.dragData.stages ? this.outsideDrag(event): this.insideDrag() 
      
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.currentIndex = this.dropIndex
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    
    if(this.dragData !=undefined && this.dragData.stages){
      this.dragData = undefined
      return
    }
    else{
      this.dropIn(event)
    }
    

  }

  // contentDrag
  insideDrag(){
    let x = this.cards.find(x => x.stages.find(y => y == this.dragData))
    let i = x.stages.findIndex(y => y == this.dragData)
    x.stages.splice(i, 1)
    let val = this.cards.length - 1
    let y = this.cards.findIndex(x => x.stages.length == 0)
    y == val ? null : this.cards.splice(y, 1)
  }

  // BoxDrag
  outsideDrag(event){
    let i = this.cards.findIndex(x=> x.stages == event.container.data[0].stages )
    this.cards.splice(i , 1)
    this.cards.splice(event.currentIndex,0,event.container.data[0])
    
    console.log(this.cards)
  }

  // Drop Inside Box
  dropIn(event){
    debugger
    if(this.mapData) {
      this.cards.forEach((x, index) => {
        let i = index
        let item = this.mapData.find(x => x.stage_id)
        if (i == event.currentIndex) {
          x.stages.splice(event.currentIndex, 0, item)
          x.stages.length > 1 ? null : this.cardPush()
          this.mapData = []
        }
        else if (event.currentIndex == this.cards.length) {
          let a = this.stageData.indexOf(this.mapData[0])
          a == -1 ? this.stageData.unshift(this.mapData[0]) : null
        }
      });
    }
  }


  //Data From same array
  getData(map) {
    this.dragData = map
  }


  // New Card
  cardPush() {
    let req = {
      stages: []
    }
    this.cards.push(req)
  }

  // Remove Stage
  cutStage(temp) {
    let i = this.cards.filter(x => x.stages)
    let j = i.find(y => y.stages.find(z => z == temp))
    let k = j.stages.findIndex(e => e == temp)
    j.stages.splice(k, 1)
    this.cards.forEach((x, index) => {
      if (x.stages.length == 0) {
        this.cards.splice(index, 1)
        let val = this.cards.length - 1
        this.cards[val].stages.length == 0 ? null : this.cardPush()
      }
    })

    this.stageData.unshift(temp)
    this._changeDetectorRef.detectChanges()
  }

  // Index Of dragged card
  dropIndex: any
  dropped(i) {
    this.dropIndex = i
    if (i >= 0) {
      this.dragOn = false
    }
    else {
      this.dragOn = true
    }

  }

  // Next process
  nextStage() {
    this.stageService.projectSelected.next(this.cards)
    this.router.navigateByUrl('/stagemapping/processmap')
  }

}
