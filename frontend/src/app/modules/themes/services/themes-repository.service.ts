import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiImageResult,
  ApiResult,
  ThemeModification,
  Theme,
  ThemeCreation
} from '../../../shared/models/api-response';
import { API_ENDPOINT } from '../../../shared/constants';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemesRepositoryService {

  constructor(private http: HttpClient) {}

  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(API_ENDPOINT + 'themes');
  }

  createTheme(newTheme: ThemeCreation): Observable<ApiResult> {
    if (newTheme.theme_image) {
      return this.uploadImage(newTheme.theme_image).pipe(
        mergeMap(uploaded => {
          const data = uploaded.success && uploaded.path ?
            {theme_name: newTheme.theme_name, theme_image: uploaded.path}
            :
            {theme_name: newTheme.theme_name};
          return this.http.post<ApiResult>(API_ENDPOINT + 'themes', data);
        })
      );
    }

    return this.http.post<ApiResult>(API_ENDPOINT + 'themes', {theme_name: newTheme.theme_name});
  }

  deleteTheme(theme: Theme): Observable<ApiResult> {
    return this.http.delete<ApiResult>(API_ENDPOINT + 'themes/' + theme.id);
  }

  modifyTheme(theme: Theme, modification: ThemeModification): Observable<ApiResult> {
    if (modification.theme_image) {
      return this.uploadImage(modification.theme_image).pipe(
        mergeMap(uploaded => {
          const data = uploaded.success && uploaded.path ?
            {theme_name: modification.theme_name, theme_image: uploaded.path}
            :
            {theme_name: modification.theme_name};
          return this.http.post<ApiResult>(API_ENDPOINT + 'themes/' + theme.id, data);
        })
      );
    }

    return this.http.post<ApiResult>(API_ENDPOINT + 'themes/' + theme.id, {theme_name: modification.theme_name});
  }

  uploadImage(image: File): Observable<ApiImageResult> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post<ApiImageResult>(API_ENDPOINT + 'images', formData);
  }
}
