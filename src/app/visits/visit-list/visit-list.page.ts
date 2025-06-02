import { Component, OnInit } from '@angular/core';
import { Visit, VisitService } from '../visit.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.page.html',
  styleUrls: ['./visit-list.page.scss'],
  standalone: false
})
export class VisitListPage implements OnInit {
  visitas: Visit[] = [];
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

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    this.loadVisitas();
    this.getCurrentLocation();
  }

  loadVisitas() {
    this.visitService.getAll().subscribe((data) => {
      this.visitas = data;
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.getCurrentLocation();
      this.newVisit.fecha_visita = new Date().toISOString();
    }
  }

  async getCurrentLocation() {
    this.isLoadingLocation = true;
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      
      this.newVisit.lat = coordinates.coords.latitude;
      this.newVisit.lng = coordinates.coords.longitude;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      alert('No se pudo obtener la ubicación. Verifica los permisos de geolocalización.');
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
        source: CameraSource.Camera
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

    this.visitService.createWithImage(this.newVisit, this.imageFile).subscribe({
      next: () => {
        this.loadVisitas();
        this.showForm = false;
        this.newVisit = { 
          user_id: '', 
          site_id: '', 
          fecha_visita: new Date().toISOString(), 
          lat: 0, 
          lng: 0 
        };
        this.imageFile = null;
        this.imagePreview = null;
      },
      error: (error) => {
        console.error('Error al crear la visita:', error);
        alert('Error al crear la visita');
      }
    });
  }

  removeImage() {
    this.imageFile = null;
    this.imagePreview = null;
  }
}