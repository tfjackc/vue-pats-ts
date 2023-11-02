import { defineStore } from 'pinia';
import MapView from '@arcgis/core/views/MapView';
import { initialize } from '@/data/map';
import { landGroup, taxlotLayer, pointGraphic, bufferGraphic } from '@/data/layers';

let view: MapView;

export const useMappingStore = defineStore('mapping_store', {
  state: () => ({
    popupData: []// Define your store state if needed
  }),
  getters: {
    getProperty(state){
      return state.popupData
    }
  },
  actions: {
    async createMap(mapContainer: HTMLDivElement) {
      if (mapContainer) {
        view = await initialize(mapContainer);
      }
    },

    async addLayerToMap(layer: any) {
      if (view && layer) {
        view.map.add(layer);
      }
    },

    async queryTaxlotsFromAccount(layer: any, account_id: any) {
      try {
        const featureLayer = await layer.createFeatureLayer();
        await featureLayer.load();
        await this.queryNewFeatureLayer(featureLayer, account_id);
        //await this.displayResults(featureSet);
      } catch (error) {
        console.error('Error:', error);
      }
    },

    async queryNewFeatureLayer(createdLayer: any, account_id: any) {
      createdLayer.popupTemplate = taxlotLayer.createPopupTemplate();
      const queryTaxlots = createdLayer.createQuery();
      queryTaxlots.geometry = createdLayer.geometry;
      queryTaxlots.where = `ACCOUNT = ${account_id}`;
      queryTaxlots.outFields = ["*"];
      queryTaxlots.returnQueryGeometry = true;
      const baseLayers = view.map.basemap.baseLayers as any;
      queryTaxlots.outSpatialReference = baseLayers.items[0].spatialReference;
        // Use the 'then' method to call 'displayResults' after the query is complete
      // Use the 'then' method to call 'displayResults' after the query is complete
      return createdLayer.queryFeatures(queryTaxlots).then((fset: any) => {
        this.popupData = fset.features
        this.displayResults(fset);
      });
    },

    async displayResults(fset: any) {
      if (fset && fset.features) {
        const data = fset.features
        console.log(data.attributes)
        await view.openPopup({
          location: pointGraphic.geometry,
          features: data,
          featureMenuOpen: true,
        });

        fset.features.forEach(function (taxlots: any) {
          bufferGraphic.geometry = taxlots.geometry;
          view.graphics.add(bufferGraphic);
          view.goTo(bufferGraphic.geometry.extent);
          pointGraphic.geometry = taxlots.geometry.centroid;
          view.graphics.add(pointGraphic);
        });
      } else {
        console.warn('No features found in the query result.');
      }
    },
  },
});
