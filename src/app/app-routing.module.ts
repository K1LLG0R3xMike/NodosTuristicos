import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'country-list',
    loadChildren: () => import('./countries/country-list/country-list.module').then( m => m.CountryListPageModule)
  },
  {
    path: 'city-list',
    loadChildren: () => import('./countries/city-list/city-list.module').then( m => m.CityListPageModule)
  },
  {
    path: 'place-list',
    loadChildren: () => import('./places/place-list/place-list.module').then( m => m.PlaceListPageModule)
  },
  {
    path: 'place-detail',
    loadChildren: () => import('./places/place-detail/place-detail.module').then( m => m.PlaceDetailPageModule)
  },
  {
    path: 'famous-list',
    loadChildren: () => import('./famous/famous-list/famous-list.module').then( m => m.FamousListPageModule)
  },
  {
    path: 'famous-detail',
    loadChildren: () => import('./famous/famous-detail/famous-detail.module').then( m => m.FamousDetailPageModule)
  },
  {
    path: 'tag',
    loadChildren: () => import('./famous/tag/tag.module').then( m => m.TagPageModule)
  },
  {
    path: 'food-list',
    loadChildren: () => import('./foods/food-list/food-list.module').then( m => m.FoodListPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./users/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./users/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'routes',
    loadChildren: () => import('./users/routes/routes.module').then( m => m.RoutesPageModule)
  },
  {
    path: 'visit-list',
    loadChildren: () => import('./visits/visit-list/visit-list.module').then( m => m.VisitListPageModule)
  },
  {
    path: 'top-places',
    loadChildren: () => import('./statistics/top-places/top-places.module').then( m => m.TopPlacesPageModule)
  },
  {
    path: 'fame-types',
    loadChildren: () => import('./statistics/fame-types/fame-types.module').then( m => m.FameTypesPageModule)
  },
  {
    path: 'custom-query1',
    loadChildren: () => import('./statistics/custom-query1/custom-query1.module').then( m => m.CustomQuery1PageModule)
  },
  {
    path: 'custom-query2',
    loadChildren: () => import('./statistics/custom-query2/custom-query2.module').then( m => m.CustomQuery2PageModule)
  },
  {
    path: 'restaurants-list',
    loadChildren: () => import('./foods/restaurants-list/restaurants-list.module').then( m => m.RestaurantsListPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AdminGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
