import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatuiComponent } from './components/chatui/chatui.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: '/chat'},
  {path: 'chat', component: ChatuiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
