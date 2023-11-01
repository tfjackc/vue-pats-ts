import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

const simpleTaxlotRenderer = new SimpleFillSymbol({
  style: "none",
  outline: {
    width: 0.5,
    color: [0, 0, 0, 1]
  },
  color: [0, 0, 0, 0.5]
});

const taxlotRenderer = new SimpleRenderer({
  symbol: simpleTaxlotRenderer,
});

// create renderder for subdivisions
const simpleSubdivisionRenderer = new SimpleFillSymbol({
  style: "none",
  outline: {
    color: [165, 19, 200, 1]
  },
  color: [245, 208, 253, 0.5]
});

const subdivisionRenderer = new SimpleRenderer({
  symbol: simpleSubdivisionRenderer,
});

export const landGroup = new MapImageLayer({
  url: "https://geo.co.crook.or.us/server/rest/services/publicApp/landGroup/MapServer",
  sublayers: [
    {
      id: 0,
      renderer: subdivisionRenderer,
      visible: false,
      popupTemplate: {
        title: "Subdivision: {name}"
      },
    },
    {
      id: 1,
      renderer: taxlotRenderer,
      visible: true,
      popupTemplate: {
        title: "{MAPTAXLOT}",
        content: "Owner Name: {OWNER_NAME} <br /> Zone: {ZONE} <br /> Account: {ACCOUNT} <br /> PATS Link: <a href={PATS_LINK}>PATS Link</a> <br /> Tax Map Link: <a href={TAX_MAP_LINK}>Tax Map Link</a> <br /> Tax Card Link: <a href={TAX_CARD_LINK}>Tax Card Link</a>",
      },
    },
    {
      id: 3,
      visible: false
    },
    {
      id: 4,
      visible: false
    },
    {
      id: 5,
      visible: false
    },
    {
      id: 6,
      visible: false,
      opacity: 0.6
    },
    {
      id: 7,
      visible: true,
      opacity: 0.5
    }
  ],
});

export const taxlotLayer = landGroup.findSublayerById(1);

// create graphic for mouse point click
export const pointGraphic = new Graphic({
  symbol: new SimpleMarkerSymbol({
    color: [0, 0, 139],
    outline: {
      color: [255, 255, 255],
      width: 1.5
    }
  })
});

// Create graphic for distance buffer
export const bufferGraphic = new Graphic({
  symbol: new SimpleFillSymbol({
    color: [173, 216, 230, 0.8],
    outline: {
      color: [255, 255, 255],
      width: 1
    }
  })
});
