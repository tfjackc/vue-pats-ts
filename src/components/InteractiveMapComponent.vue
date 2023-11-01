<template>
  <div id="map-div"></div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from "vue";
import { landGroup, taxlotLayer, pointGraphic, bufferGraphic } from "@/data/layers";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home";
import ArcGISMap from "@arcgis/core/Map";
import Query from "@arcgis/core/rest/support/Query";

const route = useRoute()
const account_id = ref(route.params.account_id)

const map = new ArcGISMap({
  basemap: 'topo-vector'
});

const view = new MapView();

let homeWidget = new Home({
  view: view
});


onMounted(() => {
  const viewProps = {
    container: "map-div",
    map: map,
    zoom: 12,
    center: [ -120.8345, 44.2998 ],
    popupEnabled: true,
    popup: {
        dockEnabled: true,
        dockOptions: {
            // dock popup at bottom-right side of view
            buttonEnabled: false,
            breakpoint: false,
            position: "bottom-right"
        }
    }
  };

    view.set(viewProps);
    view.ui.add(homeWidget, "top-left");
   // view.ui.add(basemapToggle, "top-left");
    view.when(() => {
        view.map.add(landGroup);

        taxlotLayer.createFeatureLayer()
            .then(function(featureLayer){
                return featureLayer.load();
            })
            .then(queryNewFeatureLayer);
    })
})

function queryNewFeatureLayer (createdLayer: any) {
  createdLayer.popupTemplate = taxlotLayer.createPopupTemplate();
    let queryTaxlots = createdLayer.createQuery();
    queryTaxlots.geometry = createdLayer.geometry
    queryTaxlots.where = `ACCOUNT = ${account_id.value}`
    queryTaxlots.outFields = ["*"]
    queryTaxlots.returnQueryGeometry = true
    queryTaxlots.outSpatialReference = view.map.basemap.baseLayers.items[0].spatialReference
  createdLayer.queryFeatures(queryTaxlots).then((featureSet: any) => {
        displayResults(featureSet);
    })

}
function displayResults(fset: any) {
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
}
// when a tax lot is clicked, get attribute information // for future use
    view.on("click", function (evt) {
        var query = new Query();
        query.geometry = evt.mapPoint;
        query.outFields = ["*"];
        query.returnGeometry = true;
        query.spatialRelationship = "intersects";
        taxlotLayer.queryFeatures(query).then(function (results) {
            console.log(results)
        });
    });
</script>

<style>

</style>
