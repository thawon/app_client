import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.scss']
})
export class CorrectionComponent implements OnInit {
  @ViewChild('textSpan') textSpan: ElementRef;

  @Input() message: string;
  @Input() replacements: string[];
  @Input() text: string;

  @Output() selectedText = new EventEmitter<string>();

  isSelected: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  RowSelected(selected: string) {
    if (selected) this.text = selected;
    this.isSelected = true;

    this.selectedText.emit(selected);
  }
}
