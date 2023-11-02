<script setup lang="ts">
import {onMounted, ref, shallowRef} from 'vue'
import { useMappingStore } from "@/store/mapping_store";
import {landGroup, taxlotLayer} from "@/data/layers";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";

const mapDiv = ref<HTMLDivElement>()
const app = useMappingStore()
const route = useRoute()
const account_id = ref(route.params.account_id)
const { popupData } = storeToRefs(app)

onMounted(async() => {
  await app.createMap(mapDiv.value!)
  await app.addLayerToMap(landGroup)
  await app.queryTaxlotsFromAccount(taxlotLayer, account_id.value)
  await app.displayResults(popupData.value)
})

</script>

<template>
  <div ref="mapDiv" class="map-container"></div>
</template>
