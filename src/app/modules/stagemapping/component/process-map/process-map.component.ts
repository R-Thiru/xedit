import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Subject, takeUntil } from 'rxjs';
import { StagemappingService } from '../../stagemapping.service';
import { card, cardsData, processCard, processCardsData, processData } from '../stage-map/stage-map.model';

@Component({
  selector: 'process-map',
  templateUrl: './process-map.component.html',
  styleUrls: ['./process-map.component.scss']
})
export class ProcessMapComponent implements OnInit {
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  stagedData: any = []
  mapData: any = []
  process: any = []
  mappedData : any = []
  cards: processCard[] = processCardsData;
  dragData: any
  dropIndex : any
  currentproject: number = 0;
  processData = processData
  @ViewChild('courseSteps', { static: true }) courseSteps: MatTabGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(private stageService: StagemappingService,
              private _fuseMediaWatcherService: FuseMediaWatcherService,
              @Inject(DOCUMENT) private _document: Document,
              private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
     // Subscribe to media changes
     this._fuseMediaWatcherService.onMediaChange$
     .pipe(takeUntil(this._unsubscribeAll))
     .subscribe(({ matchingAliases }) => {

       // Set the drawerMode and drawerOpened
       if (matchingAliases.includes('lg')) {
         this.drawerMode = 'side';
         this.drawerOpened = true;
       }
       else {
         this.drawerMode = 'over';
         this.drawerOpened = false;
       }

       // Mark for check
       this._changeDetectorRef.markForCheck();
     });

    this.stageService.projectSelected.subscribe(res => {
      this.stagedData = res
      this.stagedData = this.stagedData.filter(x => x.mapDatas.length > 0)
    })

    this.stagedData.forEach(x => {
      if (x.mapDatas.length > 0) {
        x.mapDatas.forEach(y => {
          this.mapData.push(y)
        })

      }
    })

    this.mapData.forEach(x => {
      let i = this.stagedData.findIndex(y => y.mapDatas.includes(x))
      x.i = i
      this.process.push(x.process)
    })
    console.log(this.process);
  
  }
  

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  goToStep(i) {
    // Set the current step

    this.currentproject = i;

    // Go to the step
    this.courseSteps.selectedIndex = this.currentproject

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
     * Go to previous step
     */
  goToPreviousStep(): void {

    // Return if we already on the first step
    if (this.currentproject === 0) {
      return;
    }

    // Go to step
    this.goToStep(this.currentproject - 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }

  /**
   * Go to next step
   */
  goToNextStep(): void {

    // Return if we already on the last step
    if (this.currentproject === this.mapData.length - 1) {
      return;
    }

    // Go to step
    this.goToStep(this.currentproject + 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }


  private _scrollCurrentStepElementIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
    setTimeout(() => {

      // Get the current step element and scroll it into view
      const currentStepElement = this._document.getElementsByClassName('current-step')[0];
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  getData(map) {
    this.dragData = map
  }

  drop(event){
    debugger
    if (event.previousContainer === event.container) {
      event.currentIndex = this.dropIndex
      event.container.data[0] = this.dragData
      let x = this.cards.find(x => x.mapDatas.find(y => y == this.dragData))
      let i = x.mapDatas.findIndex(y => y == this.dragData)
      x.mapDatas.splice(i, 1)
      let val = this.cards.length - 1
      let y = this.cards.findIndex(x => x.mapDatas.length == 0)
      y == val ? null : this.cards.splice(y, 1)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else{
      event.currentIndex = this.dropIndex
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    if (this.mappedData) {
      this.cards.forEach((x, index) => {
        debugger
        let i = index
        let item = this.mappedData.find(x => x.process_id)
        if (i == event.currentIndex) {
          x.mapDatas.splice(event.currentIndex, 0, item)
          x.mapDatas.length > 1 ? null : this.cardPush()
          this.mappedData = []
        }
      });
    }

  }


  cutStage(temp) {
    debugger
    let i = this.cards.filter(x => x.mapDatas)
    let j = i.find(y => y.mapDatas.find(z => z == temp))
    let k = j.mapDatas.findIndex(e => e == temp)
    j.mapDatas.splice(k, 1)
    this.cards.forEach((x, index) => {
      if (x.mapDatas.length == 0) {
        this.cards.splice(index, 1)
        let val = this.cards.length - 1
        this.cards[val].mapDatas.length == 0 ? null : this.cardPush()
      }
    })

    this.process.unshift(temp)
    this._changeDetectorRef.detectChanges()
  }

  dropped(i) {
    this.dropIndex = i
  }

  cardPush() {
    let req = {
      uuid: 2,
      mapDatas: []
    }
    this.cards.push(req)
  }

  

  
  
}
