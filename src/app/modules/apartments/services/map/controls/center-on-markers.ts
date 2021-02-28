import * as mapboxgl from 'mapbox-gl';
import {Subject} from 'rxjs';

export class CenterOnMarkersControl {
  private container!: HTMLElement;
  private map: mapboxgl.Map | undefined;

  constructor() {
    this.configureContainer();
  }

  onAdd(map: mapboxgl.Map): HTMLElement {
    this.map = map;
    return this.container;
  }

  onRemove(map: mapboxgl.Map): any {
    if (this.container?.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    this.map = undefined;
  }

  createIcon(): HTMLElement {
    const image = document.createElement('img');
    image.setAttribute('src', '/assets/icons/center-map.svg');
    image.setAttribute('alt', 'Center On Marker Control');
    return image;
  }

  configureContainer(): void {
    const iconElement = this.createIcon();
    this.container = document.createElement('div');

    this.container.setAttribute('role', 'button');
    this.container.setAttribute('tabindex', '0');

    this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group', 'mapboxgl-ctrl__center-on-markers');
    this.container.appendChild(iconElement);
  }

  onPressed(cb: () => void): void {
    this.container.addEventListener('click', () => {
      if (cb) {
        cb();
      }
    });
  }
}
