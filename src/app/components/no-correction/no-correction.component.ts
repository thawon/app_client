import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-correction',
  templateUrl: './no-correction.component.html',
  styleUrls: ['./no-correction.component.scss']
})
export class NoCorrectionComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
