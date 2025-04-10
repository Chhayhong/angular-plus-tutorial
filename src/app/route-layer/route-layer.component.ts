import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GuardService } from '../auth/guard.service';
@Component({
  selector: 'app-route-layer',
  imports: [MatButtonModule, MatDividerModule, MatIconModule,RouterLink, RouterOutlet],
  templateUrl: './route-layer.component.html',
  styleUrl: './route-layer.component.scss'
})
export class RouteLayerComponent {
readonly authService = inject(GuardService)
}
