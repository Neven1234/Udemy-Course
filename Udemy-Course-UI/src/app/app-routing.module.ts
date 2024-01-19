import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MemberListComponent } from './Components/Members/member-list/member-list.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { ListsComponent } from './Components/lists/lists.component';
import { authGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './Components/Members/member-detail/member-detail.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
      {
        path:'members',
        component:MemberListComponent,
      },
      {
        path:'member/:id',
        component:MemberDetailComponent,
      },
      {
        path:'messages',
        component:MessagesComponent,
      },
      {
        path:'list',
        component:ListsComponent,
      },
    ]
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
