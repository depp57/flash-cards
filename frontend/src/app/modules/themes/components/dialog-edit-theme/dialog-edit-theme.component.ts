import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Theme } from '../../../../shared/models/api-response';
import { API_IMAGE_SRC } from '../../../../shared/constants';

@Component({
  selector: 'app-dialog-edit-theme',
  templateUrl: './dialog-edit-theme.component.html',
  styleUrls: ['./dialog-edit-theme.component.scss']
})
export class DialogEditThemeComponent {

  newName     = this.theme.name;
  actualImage = this.theme.image ? API_IMAGE_SRC + this.theme.image : null;
  imageSelected?: File;

  constructor(@Inject(MAT_DIALOG_DATA) public theme: Theme) {}

  onEditName(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;
    this.newName   = textArea.value;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.imageSelected = input.files[0];

      const reader  = new FileReader();
      // @ts-ignore
      reader.onload = () => this.actualImage = reader.result;

      reader.readAsDataURL(this.imageSelected);
    }
  }
}
