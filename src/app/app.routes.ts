import { Routes } from '@angular/router';

import { ListComponent as CustomerList } from './customers/list/list.component';
import { AddComponent as CustomerAdd } from './customers/add/add.component';
import { EditComponent as CustomerEdit } from './customers/edit/edit.component';
import { DetailComponent as CustomerDetail } from './customers/detail/detail.component';

import { ListComponent as PackList } from './packs/list/list.component';
import { AddComponent as PackAdd } from './packs/add/add.component';
import { EditComponent as PackEdit } from './packs/edit/edit.component';

import { ListComponent as SubscriptionList } from './subscriptions/list/list.component';
import { AddComponent as SubscriptionAdd } from './subscriptions/add/add.component';
import { EditComponent as SubscriptionEdit } from './subscriptions/edit/edit.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';

import { DashboardComponent } from './statistics/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'customers', component: CustomerList },
  { path: 'customers/add', component: CustomerAdd },
  { path: 'customers/edit/:id', component: CustomerEdit },
  { path: 'customers/:id', component: CustomerDetail },

  { path: 'packs', component: PackList },
  { path: 'packs/add', component: PackAdd },
  { path: 'packs/edit/:id', component: PackEdit },

  { path: 'subscriptions', component: SubscriptionList },
  { path: 'subscriptions/add', component: SubscriptionAdd },
  { path: 'subscriptions/edit/:id', component: SubscriptionEdit },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'statistics', component: DashboardComponent },
];
