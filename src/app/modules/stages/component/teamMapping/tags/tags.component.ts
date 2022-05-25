import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StagesService } from 'app/modules/stages/stages.service';
import { Observable } from 'rxjs';
import { TeamMappingComponent } from '../teamMapping.component';
import { teamsMap, teamList, teamMapList, stageList, teamsMapping } from '../teamMapping.model';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  tagForm: FormGroup
  teamMapList = teamMapList
  teamMapping = teamsMapping
  stagelist = stageList

  constructor(private _formBuilder: FormBuilder,
    private _stageSevice: StagesService,
    public dialogRef: MatDialogRef<TagsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tagForm = this._formBuilder.group({
      uuid: [],
      stage: ['', [Validators.required]],
      team: ['', [Validators.required]]
    })
  }


  createStage() {
    let team = this.tagForm.get('team').value
    let req: teamsMap = {
      stage_name: this.tagForm.get('stage').value,
      stage_uuid: "",
      stage_id: '',
      team: []
    }

    team.forEach(x => {
      if (x) {
        req.team.push({ team_name: x, team_uuid: '', team_id: '' })
      }
    })

    this.teamMapping.push(req)
    // this._stageSevice.newTag.next(this.teamMapping)
    this.dialogRef.close()
  }

  editStage(team){
    console.log(team)
  }


}
