import { Component, Inject } from '@angular/core';
import { API_IMAGE_SRC } from '../../../../shared/constants';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Theme } from '../../../../shared/models/api-response';
import { ThemesRepositoryService } from '../../../themes/services/themes-repository.service';
import { BehaviorSubject } from 'rxjs';
import { CardRow } from '../cards.component';

@Component({
  selector: 'app-dialog-edit-card',
  templateUrl: './dialog-edit-card.component.html',
  styleUrls: ['./dialog-edit-card.component.scss']
})
export class DialogEditCardComponent {

  themes = new BehaviorSubject<Theme[]>([]);

  selectedThemeId = this.card?.theme?.id ?? -1;
  questionImage   = this.card?.question?.image ? API_IMAGE_SRC + this.card.question.image : null;
  answerImage     = this.card?.question?.answer?.image ? API_IMAGE_SRC + this.card.question.answer.image : null;

  questionText = this.card?.question?.text ?? null;
  questionImageFile!: File;
  answerText   = this.card?.question?.answer?.text ?? null;
  answerImageFile!: File;

  constructor(@Inject(MAT_DIALOG_DATA) public card: CardRow | null,
              private repository: ThemesRepositoryService) {
    this.repository.getThemes().subscribe(themes => {
      this.themes.next(themes);
      this.selectedThemeId = themes[0].id;
    });
  }

  onSelectTheme(event: Event) {
    this.selectedThemeId = parseInt((event.target as HTMLSelectElement).value);
  }

  onEditText(event: Event, isQuestion: boolean) {
    const text = (event.target as HTMLTextAreaElement).value;
    isQuestion ? this.questionText = text : this.answerText = text;
  }

  onImageSelected(event: Event, isQuestion: boolean) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      if (isQuestion) {
        this.questionImageFile = input.files[0];
        // @ts-ignore
        reader.onload          = () => this.questionImage = reader.result;
      }
      else {
        this.answerImageFile = input.files[0];
        // @ts-ignore
        reader.onload        = () => this.answerImage = reader.result;
      }

      reader.readAsDataURL(input.files[0]);
    }
  }
}
