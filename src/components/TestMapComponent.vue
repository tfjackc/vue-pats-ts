<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMappingStore } from "@/store/mapping_store";
import {landGroup, taxlotLayer} from "@/data/layers";
import {useRoute} from "vue-router";

const mapDiv = ref<HTMLDivElement>()
const app = useMappingStore()
const route = useRoute()
const account_id = ref(route.params.account_id)

onMounted(async() => {
  await app.createMap(mapDiv.value!)
  await app.addLayerToMap(landGroup)
  await app.queryTaxlotsFromAccount(taxlotLayer, account_id.value)
})

</script>

<template>
  <div ref="mapDiv" class="map-container"></div>
</template>
