import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

interface MeetingRoom {
  name: string;
  capacity: number;
  size: number;
  hasProjector: boolean;
}

@Component({
  selector: 'facility-mice',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CardModule,CheckboxModule,InputNumberModule,InputSwitchModule,ButtonModule],
  templateUrl: './mice.component.html',
  styleUrl: './mice.component.scss'
})
export class MiceComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      hasMeetingRoom: [false],
      meetingRoomCount: [0, [Validators.min(1)]],
      meetingRooms: this.fb.array<MeetingRoom>([]),
    });
  }

  get meetingRooms(): FormArray {
    return this.form.get('meetingRooms') as FormArray;
  }



  get hasMeetingRoom(): boolean {
    return this.form.get('hasMeetingRoom')?.value || false;
  }


  onToggleMeetingRooms(value: boolean): void {
    if (value) {
      this.form.get('meetingRoomCount')?.setValue(1);
      this.updateMeetingRooms(1);
    } else {
      this.form.get('meetingRoomCount')?.setValue(0);
      this.meetingRooms.clear();
    }
  }

  updateMeetingRooms(count: number): void {
    this.meetingRooms.clear();
    for (let i = 0; i < count; i++) {
      this.meetingRooms.push(this.createMeetingRoomForm());
    }
  }

  private createMeetingRoomForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      capacity: new FormControl(0, [Validators.required, Validators.min(1)]),
      size: new FormControl(0, [Validators.required, Validators.min(1)]),
      hasProjector: new FormControl(false),
    });
  }
}
