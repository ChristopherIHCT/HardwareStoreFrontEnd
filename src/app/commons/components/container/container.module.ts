import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './container.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [ContainerComponent, HeaderComponent, FooterComponent],
	imports: [RouterOutlet, RouterLink, MatButtonModule, MatIconModule, NgIf],
	exports: [ContainerComponent]
})
export class ContainerModule {}
