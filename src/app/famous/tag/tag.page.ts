import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FamousService, Famous } from '../famous.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TagService, Tag } from '../tag.service'; 

interface TagData {
  user_id: string;
  famous_id: string;
  comentario?: string;
  foto_url?: string;
  lat?: number;
  lng?: number;
}


@Component({
  selector: 'app-tag',
  templateUrl: './tag.page.html',
  styleUrls: ['./tag.page.scss'],
  standalone: false
})
export class TagPage implements OnInit {
  @ViewChild('photoPreview', { static: false }) photoPreview!: ElementRef<HTMLImageElement>;



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
  currentUserId: string = ''; 

   constructor(
  private alertController: AlertController,
  private loadingController: LoadingController,
  private toastController: ToastController,
  private famousService: FamousService,
  private authService: AuthService,
  private tagService: TagService // Inyectar el servicio de tags
) {}

  ngOnInit() {
    this.loadFamousList();
    this.getCurrentLocation();
    this.getCurrentUser();
    const user = this.authService.getUserData?.();
    if (user) {
      this.currentUserId = user.id;
    } else {
      console.warn('No user logged in');
    }
  }

  // Cargar lista de famosos
  async loadFamousList() {
    try {
      this.famousService.getAll().subscribe({
        next: (response) => {
          this.famousList = response || [];
        },
        error: (error) => {
          console.error('Error loading famous list:', error);
          this.showToast('Error cargando lista de famosos', 'danger');
        }
      });
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
  // Validaciones
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
    // Convertir dataURL a Blob
    const response = await fetch(this.capturedPhoto);
    const blob = await response.blob();

    // Crear objeto tag con los datos del formulario
    const tagData: Tag = {
      user_id: this.currentUserId,
      famous_id: this.selectedFamous,
      comentario: this.comment || undefined,
      // No incluimos foto_url aquí, ya que se enviará como blob
      lat: this.currentLocation?.lat,
      lng: this.currentLocation?.lng
    };

    // Usar el servicio para crear el tag con la foto
    await this.tagService.create(tagData, blob).toPromise();
    
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
}