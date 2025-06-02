import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

interface TagData {
  user_id: string;
  famous_id: string;
  comentario?: string;
  foto_url?: string;
  lat?: number;
  lng?: number;
}

interface Famous {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.page.html',
  styleUrls: ['./tag.page.scss'],
  standalone: false
})
export class TagPage implements OnInit {
  @ViewChild('photoPreview', { static: false }) photoPreview!: ElementRef<HTMLImageElement>;

  private api = `${environment.apiUrl}/sitios`;
  private famousApi = `${environment.apiUrl}/famous`; // Asumiendo que tienes este endpoint

  // Estado de la aplicación
  capturedPhoto: string | null = null;
  isPhotoTaken = false;
  
  // Datos del formulario
  selectedFamous: string = '';
  comment: string = '';
  currentLocation: { lat: number; lng: number } | null = null;
  
  // Lista de famosos (necesario para el selector)
  famousList: Famous[] = [];
  
  // Usuario actual (deberías obtenerlo del servicio de autenticación)
  currentUserId: string = ''; // Implementar según tu sistema de auth

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadFamousList();
    this.getCurrentLocation();
    this.getCurrentUser();
  }

  // Cargar lista de famosos
  async loadFamousList() {
    try {
      const response = await this.http.get<Famous[]>(this.famousApi).toPromise();
      this.famousList = response || [];
    } catch (error) {
      console.error('Error loading famous list:', error);
      this.showToast('Error cargando lista de famosos', 'danger');
    }
  }

  // Obtener usuario actual (implementar según tu sistema)
  getCurrentUser() {
    // Aquí deberías obtener el ID del usuario logueado
    // this.currentUserId = this.authService.getCurrentUserId();
    this.currentUserId = 'USER_ID_PLACEHOLDER'; // Reemplazar con lógica real
  }

  // Obtener ubicación actual
  async getCurrentLocation() {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          },
          (error) => {
            console.warn('Error getting location:', error);
          }
        );
      }
    } catch (error) {
      console.warn('Geolocation not available:', error);
    }
  }

  // Activar cámara y tomar foto
  async takePhoto() {
    try {
      const loading = await this.loadingController.create({
        message: 'Abriendo cámara...'
      });
      await loading.present();

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      await loading.dismiss();

      if (image.dataUrl) {
        this.capturedPhoto = image.dataUrl;
        this.isPhotoTaken = true;
      }

    } catch (error) {
      await this.loadingController.dismiss();
      console.error('Error taking photo:', error);
      this.showToast('Error al tomar la foto', 'danger');
    }
  }

  // Retomar foto
  async retakePhoto() {
    this.capturedPhoto = null;
    this.isPhotoTaken = false;
    await this.takePhoto();
  }

  // Cancelar foto
  cancelPhoto() {
    this.capturedPhoto = null;
    this.isPhotoTaken = false;
    this.selectedFamous = '';
    this.comment = '';
  }

  // Guardar tag
  async saveTag() {
    if (!this.capturedPhoto || !this.selectedFamous) {
      this.showToast('Foto y famoso son requeridos', 'warning');
      return;
    }

    if (!this.currentUserId) {
      this.showToast('Usuario no identificado', 'danger');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando tag...'
    });
    await loading.present();

    try {
      // Convertir imagen a base64 si es necesario o subirla a un servicio
      const photoUrl = await this.uploadPhoto(this.capturedPhoto);

      const tagData: TagData = {
        user_id: this.currentUserId,
        famous_id: this.selectedFamous,
        comentario: this.comment || undefined,
        foto_url: photoUrl,
        lat: this.currentLocation?.lat,
        lng: this.currentLocation?.lng
      };

      await this.create(tagData).toPromise();
      
      await loading.dismiss();
      this.showToast('Tag guardado exitosamente', 'success');
      
      // Limpiar formulario
      this.resetForm();

    } catch (error) {
      await loading.dismiss();
      console.error('Error saving tag:', error);
      this.showToast('Error al guardar el tag', 'danger');
    }
  }

  // Subir foto (implementar según tu backend)
  private async uploadPhoto(photoDataUrl: string): Promise<string> {
    // Aquí deberías implementar la lógica para subir la foto
    // Por ejemplo, convertir a blob y enviar a un endpoint de upload
    try {
      const response = await fetch(photoDataUrl);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('photo', blob, 'tag-photo.jpg');
      
      const uploadResponse = await this.http.post<{url: string}>(`${environment.apiUrl}/upload`, formData).toPromise();
      return uploadResponse?.url || photoDataUrl;
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      return photoDataUrl; // Fallback a data URL
    }
  }

  // Limpiar formulario
  private resetForm() {
    this.capturedPhoto = null;
    this.isPhotoTaken = false;
    this.selectedFamous = '';
    this.comment = '';
  }

  // Mostrar toast
  private async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  // Métodos HTTP existentes
  getAll() {
    return this.http.get(`${this.api}/tags`);
  }

  getById(id: string) {
    return this.http.get(`${this.api}/tags/${id}`);
  }

  create(data: TagData) {
    return this.http.post(`${this.api}/tags`, data);
  }
}