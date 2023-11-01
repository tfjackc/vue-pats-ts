<template>
  <div id="map-div"></div>
<!--  <table class="table surveys">-->
<!--    <thead>-->
<!--    <tr>-->
<!--      <th>Survey</th>-->
<!--      <th>TRS</th>-->
<!--      <th>Year</th>-->
<!--      <th>Partition Plat</th>-->
<!--      <th>Prepared For</th>-->
<!--      <th>Prepared By</th>-->
<!--      <th>Subdivision</th>-->
<!--      <th>Type</th>-->
<!--      <th>Description</th>-->
<!--      <th>Link</th>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody id="table-body"></tbody>-->
<!--  </table>-->
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from "vue";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Home from "@arcgis/core/widgets/Home";
import Map from "@arcgis/core/Map";
import Query from "@arcgis/core/rest/support/Query";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const route = useRoute()
const account_id = ref(route.params.account_id)

const map = new Map();
map.basemap = "topo-vector";

const view = new MapView();
var lat = 44.30291;
var long = -120.84585;

onMounted(() => {
  const viewProps = {
    container: "map-div",
    map: map,
    zoom: 11,
    center: [long, lat] // longitude, latitude
  }
  view.set(viewProps);
})

view.when(() => {
  view.map.add(surveyLayer);
})

// return home button
let homeWidget = new Home({
  view: view
});

// adds the home widget to the top left corner of the MapView
view.ui.add(homeWidget, "top-left");

const surveyTemplate = {
  title: "Survey {cs}",
  content: "<strong>PDF:</strong> <a href={image}>View</a> <br /> <strong>Prepared For:</strong> {prepared_for} <br /> <strong>Description:</strong> {identification} <br /> <strong>Year:</strong> {rec_y}",
}

const surveyLayer = new FeatureLayer ({
  url: "https://geo.co.crook.or.us/server/rest/services/surveyor/surveys/MapServer/0",
  popupTemplate: surveyTemplate
});


// Example JavaScript code to retrieve the data-header attribute value

</script>

