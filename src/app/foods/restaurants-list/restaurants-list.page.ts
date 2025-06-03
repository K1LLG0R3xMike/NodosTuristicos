import { Component, OnInit } from '@angular/core';
import { MenuService, DishSitesResponse, SiteInfo } from '../menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.page.html',
  styleUrls: ['./restaurants-list.page.scss'],
  standalone: false
})
export class RestaurantsListPage implements OnInit {
  dishId: string = '';
  response?: DishSitesResponse;
  loading = false;
  error = '';

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get dishId from query params instead of route params
    this.route.queryParams.subscribe(params => {
      this.dishId = params['dishId'] || '';
      if (this.dishId) {
        this.loadSitesForDish();
      } else {
        this.error = 'No se especificó el ID del plato';
      }
    });
  }

  loadSitesForDish() {
    this.loading = true;
    this.menuService.getByDish(this.dishId).subscribe({
      next: (data) => {
        this.response = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los sitios: ' + err.message;
        this.loading = false;
      }
    });
  }

  getIconForType(type: string): string {
    // Return appropriate icon based on restaurant type
    switch (type.toLowerCase()) {
      case 'restaurante':
        return 'restaurant';
      case 'cafetería':
      case 'cafeteria':
        return 'cafe';
      case 'bar':
        return 'beer';
      case 'comida rápida':
      case 'comida rapida':
        return 'fast-food';
      default:
        return 'restaurant';
    }
  }

  openMap(site: any) {
    // Open map with restaurant location
    // You can implement this to open Google Maps or your own map component
    if (site.lat && site.lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`;
      window.open(url, '_blank');
    }
  }

  showQR(site: any) {
    // Implement QR code display functionality
    // This could open a modal with the QR code
    console.log('Show QR for site:', site.qr_code);
    // You might need to implement a modal or toast to show the QR code
  }
}