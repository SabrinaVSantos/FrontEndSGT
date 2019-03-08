import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuHeaderComponent } from './menu-header.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MenuHeaderComponent],
    exports: [MenuHeaderComponent]
})
export class MenuHeaderModule {}
