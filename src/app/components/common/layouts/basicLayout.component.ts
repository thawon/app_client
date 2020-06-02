import { Component } from '@angular/core';
import { detectBody } from '../../../app.helpers';
import { LineLIFFService } from '../../../services/line.liff.service';

declare var jQuery:any;

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent {

  constructor(
    public lineLIFFService: LineLIFFService) { }

  public ngOnInit():any {
    detectBody();
  }

  public onResize(){
    detectBody();
  }

}
