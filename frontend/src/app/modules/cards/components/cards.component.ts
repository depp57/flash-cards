import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderService } from '../../../shared/components/header/header.service';
import { API_IMAGE_SRC } from '../../../shared/constants';
import { CardsRepositoryService } from '../services/cards-repository.service';
import { MatDialog } from '@angular/material/dialog';
import { CardWithTheme } from '../../../shared/models/api-response';
import { MatTableDataSource } from '@angular/material/table';
import { DialogEditCardComponent } from './dialog-edit-card/dialog-edit-card.component';
import { CreateCard } from '../../../shared/models/api-request';

export type CardRow = Partial<CardWithTheme>;

const DEFAULT_DATA: CardRow[] = [
  {theme: {id: -1, name: 'chargement...', image: null}},
  {theme: {id: -1, name: 'chargement...', image: null}},
  {theme: {id: -1, name: 'chargement...', image: null}}
];

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent {

  displayedColumns = ['theme', 'question', 'image'];
  dataSource       = new MatTableDataSource<CardRow>(DEFAULT_DATA);

  readonly IMAGE_SRC = API_IMAGE_SRC;

  constructor(private header: HeaderService,
              private repository: CardsRepositoryService,
              private dialog: MatDialog) {

    this.dataSource.filterPredicate = (data, filter) => {
      let match = false;

      // theme
      if (data.theme) {
        match = data.theme.name.trim().indexOf(filter.trim()) >= 0;
      }

      // question
      if (!match && data.question?.text) {
        match = data.question.text.trim().indexOf(filter.trim()) >= 0;
      }

      return match;
    };

    this.repository.getCards().subscribe(
      cards => this.dataSource.data = cards
    );

    this.header.title$.next('Modifier les cartes');
  }

  applyFilter(event: Event): void {
    const filterValue      = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addCard(): void {
    const dialogRef = this.dialog.open(DialogEditCardComponent, {
      width: 'min(80%, 600px)',
      height: 'min(70%, 800px)'
    });

    dialogRef.afterClosed().subscribe(
      (result: CreateCard) => {
        if (result?.card_theme) {
          this.repository.createCard(result).then(
            () => {
              this.dataSource.data.push({
                theme: {
                  id: -1,
                  name: 'Actualiser la page pour voir la nouvelle carte',
                  image: null
                }
              });
            }
          ).catch(reason => alert(reason.error.cause));
        }
      }
    );
  }

  onModifyCard(card: CardRow): void {
    const dialogRef = this.dialog.open(DialogEditCardComponent, {
      data: card,
      width: 'min(80%, 600px)',
      height: 'min(70%, 800px)'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result === 'delete') {
          this.repository.deleteCard(card.id ?? -1).subscribe();
        }
        else if (result !== '') {
          this.repository.modifyCard(card.id ?? -1, result);
        }
      }
    );
  }
}
