import { Component, OnInit } from '@angular/core';
import { FoodService, Dish } from '../food.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
  standalone: false
})
export class FoodListPage implements OnInit {
  dishes: Dish[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private foodService: FoodService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadDishes();
  }

  async loadDishes() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando platos...',
      spinner: 'bubbles'
    });
    await loading.present();

    try {
      this.dishes = (await this.foodService.getAll().toPromise()) ?? [];
      this.error = null;
    } catch (err) {
      this.error = 'No se pudieron cargar los platos. Por favor intente más tarde.';
      console.error('Error al cargar platos:', err);
    } finally {
      this.isLoading = false;
      loading.dismiss();
    }
  }

  async doRefresh(event: any) {
    try {
      this.dishes = (await this.foodService.getAll().toPromise()) ?? [];
      this.error = null;
    } catch (err) {
      this.error = 'No se pudieron actualizar los platos.';
    } finally {
      event.target.complete();
    }
  }
  
  navigateToRestaurants(dish: Dish) {
    this.router.navigate(['/restaurants-list'], {
      queryParams: { dishId: dish.id }
    });
  }
}