import { defineStore } from 'pinia'
import axios from "axios";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home";
import { initialize } from "@/data/map";
import Graphic from '@arcgis/core/Graphic'

let view: MapView
export const useMappingStore = defineStore('mapping_store', {
  state: () => ({

  }),
  getters: {

  },
  actions: {
    async createMap(mapContainer: HTMLDivElement) {
      if (mapContainer) {
        view = await initialize(mapContainer)
      }
    }
  },
})
