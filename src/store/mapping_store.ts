import { defineStore } from 'pinia';
import MapView from '@arcgis/core/views/MapView';
import { initialize } from '@/data/map';
import { landGroup, taxlotLayer, pointGraphic, bufferGraphic } from '@/data/layers';
import { useRoute } from 'vue-router'
import { ref } from "vue";
// const route = useRoute()
// const account_id = ref(route.params.account_id)

let view: MapView;

export const useMappingStore = defineStore('mapping_store', {
  state: () => ({
    // Define your store state if needed
  }),
  getters: {
    // Define your getters if needed
  },
  actions: {
    async createMap(mapContainer: HTMLDivElement) {
      if (mapContainer) {
        view = await initialize(mapContainer);
        // Now, you have access to the view object in your store

        // Add layers to the map using the view
        this.addLayerToMap(landGroup);
        // You can add other layers as needed
      }
    },
    async addLayerToMap(layer: any) {
      // Add the provided layer to the map's layers
      if (view && layer) {
        view.map.add(layer);

        // Use async/await to load the feature layer and query it
        try {
          const featureLayer = await taxlotLayer.createFeatureLayer();
          await featureLayer.load();
          const featureSet = await this.queryNewFeatureLayer(featureLayer);

          // Pass the featureSet to displayResults
          this.displayResults(featureSet);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    },
    async queryNewFeatureLayer(createdLayer: any) {
      createdLayer.popupTemplate = taxlotLayer.createPopupTemplate();
      const queryTaxlots = createdLayer.createQuery();
      queryTaxlots.geometry = createdLayer.geometry
      //queryTaxlots.where = `ACCOUNT = ${account_id.value}`
      queryTaxlots.where = "ACCOUNT = 1001"
      queryTaxlots.outFields = ["*"]
      queryTaxlots.returnQueryGeometry = true
      queryTaxlots.outSpatialReference = view.map.basemap.baseLayers.items[0].spatialReference
      return createdLayer.queryFeatures(queryTaxlots);
    },
    async displayResults(fset: any) {
      fset.features.forEach(function(taxlots: any) {
        bufferGraphic.geometry = taxlots.geometry;
        view.graphics.add(bufferGraphic);
        view.goTo(bufferGraphic.geometry.extent)
        pointGraphic.geometry = taxlots.geometry.centroid;
        view.graphics.add(pointGraphic);

        console.log(fset.features)

        view.openPopup({
          location: pointGraphic.geometry,
          features: fset.features,
          featureMenuOpen: true
        })

      })
    },
  },
});
