import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ThinLayoutComponent } from 'app/layout/layouts/vertical/thin/thin.component';
import { items } from 'app/mock-api/apps/file-manager/data';
import { debounceTime, distinctUntilChanged, map, observable, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { combineLatest, combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { StagesService } from '../../stages.service';
import { TagsComponent } from './tags/tags.component';
import { teamList, teamMapList, teamsMap, teamsMapping } from './teamMapping.model';


@Component({
  selector: 'team',
  templateUrl: './teamMapping.component.html',
  styleUrls: ['./teamMapping.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMappingComponent implements OnInit {
  teamList = teamsMapping
  test: Observable<teamsMap>
  teamMapList = teamMapList
  teamName: FormControl = new FormControl()
  teams$: any
  teamMapList$: any
  masonryColumns: number = 5;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() debounce: number = 300;
  @Input() minLength: number = 2;
  @ViewChild(TagsComponent) public tag

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private _stageService: StagesService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,) { }

  ngOnInit() {

    // this.teamsList = combineLatest([this._stageService.notes$]).pipe(
    //   distinctUntilChanged(),
    //   map(([notes]) => {

    //     if (!notes || !notes.length) {
    //       return;
    //     }

    //     // Store the filtered notes
    //     let filteredNotes = notes;
    //     console.log(filteredNotes);

    //     // Filter by query
    //     return filteredNotes;
    //   })
    // );


    /** checkbox */
    this._stageService.label$.subscribe(res => {
      this.teams$ = null
      this.teams$ = res
    })

    /** search value */
    this._stageService.tags$.subscribe(res => {
      this.teamMapList = teamMapList
      this.teamMapList = this.teamMapList.filter(x => x.team_name.toLowerCase().includes(res))
      this._changeDetectorRef.detectChanges()
    })

    /** search FormControl */
    this.teamName.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe((word) => {
      this._stageService.tags$.next(word)
    })


    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Set the masonry columns

        if (matchingAliases.includes('xl')) {
          this.masonryColumns = 5;
        }
        else if (matchingAliases.includes('lg')) {
          this.masonryColumns = 4;
        }
        else if (matchingAliases.includes('md')) {
          this.masonryColumns = 3;
        }
        else if (matchingAliases.includes('sm')) {
          this.masonryColumns = 2;
        }
        else {
          this.masonryColumns = 1;
        }
        this._changeDetectorRef.markForCheck();
      });
  }

  /**  open checkbox */
  openTag(teamList) {
    this._stageService.label$.next(teamList)
  }

  trackByFn(index: number, item: any): any {
    
    return item.id || index;
  }

  /** New Team*/
  // finalData: any
  // addNewNote() {
  //   const dialogRef = this._matDialog.open(TagsComponent, {
  //     autoFocus: false,
  //     data: { stageData: this.finalData },
  //   })

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.teamsList = this._stageService.notes$
  //     console.log(this.teamsList);
  //     this._changeDetectorRef.detectChanges()
  //   });

  // }


  editTeam(team){
    this.tag.editStage(team)
  }
  /** To check checkbox */
  isNoteHasLabel(note: any, label: any): boolean {
    return !!note.team.find(item => item.team_id === label.team_id);
  }

  /** check and Uncheck */
  toggleLabelOnNote(note: teamsMap, label: teamList) {
    // If the note already has the label
    if (this.isNoteHasLabel(note, label)) {
      note.team = note.team.filter(item => item.team_id !== label.team_id);
    }
    // Otherwise
    else {
      note.team.push(label);
    }
  }


}
