import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  open = true;

  @Output()
  sideBarToggled = new EventEmitter<void>()

  toggleSidebar() {
    this.open = !this.open;
    this.sideBarToggled.emit()
  }
}
