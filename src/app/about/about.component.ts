import { Component } from '@angular/core';
import { FileChangedEvent } from '../directives/file-input.directive';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  imageURL!: string;

  onFileChanged(evt: FileChangedEvent) {
    this.imageURL = evt.url as string;
  }

  onFileInputError(msg: string) {
    alert(msg);
  }
}
