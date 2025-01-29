import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-lazy-loader',
  standalone: true,
  imports: [],
  templateUrl: './lazy-loader.component.html',
  styleUrl: './lazy-loader.component.scss'
})
export class LazyLoaderComponent {
  @Input() componentPath!: string;
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  
  async ngOnChanges() {
    if (!this.componentPath) return;

    this.container.clear(); // Önce mevcut içeriği temizle

    const { [this.componentPath]: ComponentClass } = await import(`../panels/${this.componentPath}`);
    
    this.container.createComponent(ComponentClass);
  }
}
