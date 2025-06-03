import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-famous-list',
  templateUrl: './famous-list.page.html',
  styleUrls: ['./famous-list.page.scss'],
  standalone: false
})
export class FamousListPage implements OnInit {

  tags: any[] = [];
  isLoading = false;
  error: string | null = null;
  private api = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.isLoading = true;
    this.error = null;
    console.log('Solicitando tags desde la API:', this.api);

    // Suponiendo que tienes el usuario actual en localStorage o authService
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('Datos de usuario obtenidos de localStorage:', userData);
    const userId = userData?.id;
    console.log('ID de usuario extraído:', userId);

    this.http.get<any>(this.api).subscribe({
      next: (data) => {
        console.log('Tags recibidos:', data);
        const tagsArray = Array.isArray(data) ? data : data.tags;
        this.tags = (tagsArray ?? []).filter((tag: { user_id: { id: any; }; }) => tag.user_id?.id === userId);
        console.log('Tags filtrados por usuario', userId, ':', this.tags);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar tags:', err);
        this.error = 'No se pudieron cargar los tags.';
        this.isLoading = false;
      }
    });
  }

  doRefresh(event: any) {
    this.loadTags();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  navigateToTagDetail(tag: any) {
    // Implementa la navegación si tienes una página de detalle
    // this.router.navigate(['/tag-detail', tag._id]);
  }
}
