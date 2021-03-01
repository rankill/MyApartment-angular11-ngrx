import * as mapboxgl from 'mapbox-gl';
import {Subject} from 'rxjs';

export class CommonIconControl {
  private container!: HTMLElement;
  private map: mapboxgl.Map | undefined;

  url: string;
  alt: string;
  controlClass: string;

  constructor(imageUrl?: string, imageAlt?: string, className?: string) {
    this.url = imageUrl || '/assets/icons/center-map.svg';
    this.alt = imageAlt || 'Map icon';
    this.controlClass = className || 'mapboxgl-ctrl__common-icon-control';

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

  createImageIcon(): HTMLElement {
    const image = document.createElement('img');
    image.setAttribute('src', this.url);
    image.setAttribute('alt', this.alt);
    return image;
  }

  configureContainer(): void {
    const imageIconElement = this.createImageIcon();
    this.container = document.createElement('div');

    this.container.setAttribute('role', 'button');
    this.container.setAttribute('tabindex', '0');

    this.container.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group', this.controlClass);
    this.container.appendChild(imageIconElement);
  }

  onPressed(cb: () => void): void {
    this.container.addEventListener('click', () => {
      if (cb) {
        cb();
      }
    });
  }
}
