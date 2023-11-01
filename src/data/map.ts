import ArcGISMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { landGroup, taxlotLayer, pointGraphic, bufferGraphic } from "./layers";

const BASEMAP = 'topo-vector'


export const map_app: any = {
  //nearbyLayerView: null
}

export async function initialize(container: HTMLDivElement) {

  const map = new ArcGISMap({
    basemap: BASEMAP,
    layers: []
  })

  const view = new MapView({
    map,
    container,
    center: [-118, 34],
    zoom: 4
  })
  map_app.view = view

  await view.when()
  return view.when()
}
