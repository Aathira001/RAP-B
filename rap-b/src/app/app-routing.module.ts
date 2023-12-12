import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatuiComponent } from './components/chatui/chatui.component';
import { FileComponent } from './components/file/file.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {path: '', pathMatch:'full', component: LandingComponent},
  {path: 'chat/:type', component: ChatuiComponent},
  {path: 'file', component: FileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
