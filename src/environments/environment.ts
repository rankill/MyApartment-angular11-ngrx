// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const CDN_URL = 'https://cdn.smartapartmentdata.com/';

export const environment = {
  production: false,
  apiUrl: 'https://app.smartapartmentdata.com/List/json',
  cdnUrl: CDN_URL,
  svgUrl: `${CDN_URL}/images/svg/32/Access+Gates.svg`,
  token: '5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E',
  listID: '5363950',
  tokenAlt: 'A0E2523B25B805CBB6F8EC9D98AF56457EE7A255',
  listIDAlt: '5638557',
  mapBoxToken: 'pk.eyJ1IjoibHVpc3NhcmF6YSIsImEiOiJja2xoaW5jaTc1aGU5MnhxbndpcGd4M2JsIn0.msnDUwXCAjBfXqDFDQvUxA',
  maptilerToken: 'SoL71Zyf7SmLrVYWC7fQ',
  mapStyle: 'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
