import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

interface MeetingRoom {
  name: string;
  capacity: number;
  size: number;
  hasProjector: boolean;
}

@Component({
  selector: 'facility-mice',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CardModule,CheckboxModule,InputNumberModule,InputSwitchModule,InputTextModule,ButtonModule,MessageModule],
  templateUrl: './mice.component.html',
  styleUrl: './mice.component.scss'
})
export class MiceComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      hasMeetingRoom: [false], 
      roomCount: [0, ], // Max 10 olacak
      rooms: this.fb.array([]) 
    });

    this.form.get('hasMeetingRoom')?.valueChanges.subscribe((hasMeetingRoom) => {
      if (hasMeetingRoom) {
        this.form.get('roomCount')?.setValidators([Validators.required, Validators.min(1), Validators.max(10)]);
      } else {
        this.form.get('roomCount')?.clearValidators();
        (this.form.get('rooms') as FormArray).clear();
      }
      this.form.get('roomCount')?.updateValueAndValidity();
    });

    this.form.get('roomCount')?.valueChanges.subscribe((count) => {
      this.updateRooms(count);
    });
  }

  get roomsArray(): FormGroup[] {
    return (this.form.get('rooms') as FormArray).controls as FormGroup[];
  }

  private updateRooms(count: number): void {
    const roomArray = this.form.get('rooms') as FormArray;
    while (roomArray.length < count) {
      roomArray.push(this.createRoom());
    }
    while (roomArray.length > count) {
      roomArray.removeAt(roomArray.length - 1);
    }
  }

  private createRoom(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      // capacity: [0], // Max 10 kişi kapasite
      area:[0],
      height:[0],
      theatreCapacity:[0],
      classRoomCapacity:[0],
      uShapeCapacity:[0],
      boardShapeCapacity:[0],
      cabaretCapacity:[0],
      banquetCapacity:[0],


      size: [0], // Max 100 m²
      hasProjector: [false]
    });
  }

  saveRooms(): void {
    if (this.form.valid) {
      console.log(JSON.stringify(this.form.value.rooms, null, 2));
    } else {
      console.log("Form Geçersiz! Lütfen tüm alanları doldurun.");
    }
  }
}
