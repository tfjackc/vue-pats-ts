<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMappingStore } from "@/store/mapping_store";

const mapDiv = ref<HTMLDivElement>()
const app = useMappingStore()

onMounted(() => {
  app.createMap(mapDiv.value!)
})

</script>

<template>
  <div ref="mapDiv" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
