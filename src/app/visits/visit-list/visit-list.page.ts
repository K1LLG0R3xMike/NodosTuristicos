import { Component, OnInit } from '@angular/core';
import { Visit, VisitService } from '../visit.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { AuthService } from 'src/app/auth/auth.service';
import { SiteService } from 'src/app/places/place.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.page.html',
  styleUrls: ['./visit-list.page.scss'],
  standalone: false,
})
export class VisitListPage implements OnInit {
  visitas: Visit[] = [];
  isLoading = false;
  error: string | null = null;
  showForm = false;
  newVisit: Visit = {
    user_id: '',
    site_id: '',
    fecha_visita: new Date().toISOString(),
    lat: 0,
    lng: 0,
  };
  imageFile: File | null = null;
  imagePreview: string | null = null;
  isLoadingLocation = false;
  sites: any[] = [];

  constructor(
    private visitService: VisitService,
    private authService: AuthService,
    private router: Router,
    private siteService: SiteService
  ) {}

  ngOnInit() {
    this.loadVisitas();
    this.getCurrentLocation();
    // Verificar si el usuario está autenticado
    const userData = this.authService.getUserData();
    if (!userData || !userData.id) {
      // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error
      this.router.navigate(['/login']);
    }

    // Cargar sitios si es necesario
    this.siteService.getAll().subscribe({
      next: (sites) => {
        console.log('Sitios cargados:', sites);
        this.sites = sites;
      },
      error: (error) => {
        console.error('Error al cargar sitios:', error);
        alert('Error al cargar los sitios');
      },
    });
  }

  doRefresh(event: any) {
    this.loadVisitas();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadVisits() {
    this.loadVisitas();
  }

  loadVisitas() {
    this.isLoading = true;
    this.error = null;
    const userData = this.authService.getUserData();
    if (userData && userData.id) {
      this.visitService.getByUser(userData.id).subscribe({
        next: (visitas) => {
          this.visitas = Array.isArray(visitas) ? visitas : [];
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar las visitas';
          this.visitas = [];
          this.isLoading = false;
        },
      });
    } else {
      this.error = 'No se pudo obtener el ID del usuario';
      this.visitas = [];
      this.isLoading = false;
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.getCurrentLocation();
      this.newVisit.fecha_visita = new Date().toISOString();

      // Obtener automáticamente el user_id del usuario autenticado
      const userData = this.authService.getUserData();
      if (userData && userData.id) {
        this.newVisit.user_id = userData.id;
      } else {
        console.error('No se pudo obtener el ID del usuario');
      }
    }
  }

  async getCurrentLocation() {
    this.isLoadingLocation = true;
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      this.newVisit.lat = coordinates.coords.latitude;
      this.newVisit.lng = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      alert(
        'No se pudo obtener la ubicación. Verifica los permisos de geolocalización.'
      );
    } finally {
      this.isLoadingLocation = false;
    }
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        this.imagePreview = image.dataUrl;

        // Convertir dataUrl a File
        const response = await fetch(image.dataUrl);
        const blob = await response.blob();
        this.imageFile = new File([blob], 'foto.jpg', { type: 'image/jpeg' });
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  }

  submitForm() {
    if (!this.imageFile) {
      alert('Debes tomar una foto');
      return;
    }

    if (!this.newVisit.site_id) {
      alert('Debes seleccionar un sitio');
      return;
    }

    if (!this.newVisit.user_id) {
      const userData = this.authService.getUserData();
      if (userData && userData.id) {
        this.newVisit.user_id = userData.id;
      } else {
        // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error
        this.router.navigate(['/login']);
        return;
      }
    }
    this.visitService.createWithImage(this.newVisit, this.imageFile).subscribe({
      next: () => {
        this.loadVisitas();
        this.showForm = false;
        this.newVisit = {
          user_id: '',
          site_id: '',
          fecha_visita: new Date().toISOString(),
          lat: 0,
          lng: 0,
        };
        this.imageFile = null;
        this.imagePreview = null;
      },
      error: (error) => {
        console.error('Error al crear la visita:', error);
        alert('Error al crear la visita');
      },
    });
  }

  removeImage() {
    this.imageFile = null;
    this.imagePreview = null;
  }

  // Métodos auxiliares para el template
  getSiteName(siteId: any): string {
    if (typeof siteId === 'object' && siteId?.name) {
      return siteId.name;
    }
    return 'Sitio desconocido';
  }

  getUserName(userId: any): string | null {
    if (typeof userId === 'object' && userId?.nombre) {
      return userId.nombre;
    }
    return null;
  }
}
