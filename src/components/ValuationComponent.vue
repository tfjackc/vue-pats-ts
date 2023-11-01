<template>
  <v-fade-transition>
    <v-container class="justify-center">
      <v-col>
        <v-row class="d-flex align-center justify-center">
          <v-icon size="x-large" icon="mdi-chart-line" />
          <h1>Valuation for Account: {{ account_id }}</h1>
        </v-row>
        <v-row class="justify-center">
          <Line v-if="chartData"
                :data="chartData"
                :options="chartOptions"
                :sort-by="[{ key: 'year', order: 'asc' }]"/>
          <v-data-table
            v-if="property_values.length > 0"
            v-model:items-per-page="itemsPerPage"
            :items="property_values"
            :headers="headers"
            :sort-by="[{ key: 'year', order: 'asc' }]"
            class="elevation-10"
            :hover=true>
          </v-data-table>
          <div class="d-flex flex-wrap">
          <div v-for="rows in property_values" :key="rows.id"></div>
          </div>
        </v-row>
      </v-col>
    </v-container>
  </v-fade-transition>
</template>
<script setup>
import { shallowRef, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePropertyValuesStore } from '@/store/propertyValuesAPI'
const route = useRoute()
const account_id = ref(route.params.account_id)
const store_table = usePropertyValuesStore()
const { property_values, years, rmv_total, max_av } = storeToRefs(store_table)
const itemsPerPage  = ref(11)
const headers = ref([
  { title: 'Year', key: 'year', align: 'end' },
  { title: 'Real Market Value - Land', key: 'rmv_land', align: 'end' },
  { title: 'Real Market Value - Structure', key: 'rmv_impr', align: 'end' },
  { title: 'Total Real Market Value', key: 'rmv_total', align: 'end' },
  { title: 'Total Assessed Value', key: 'total_av', align: 'end' },
  { title: 'Maximum Assessed Value', key: 'max_av', align: 'end' },
  { title: 'Exemptions', key: 'exempt', align: 'end' },
])
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)
const chartData = shallowRef(null)
const chartOptions = ref(null)
onMounted(() => {
  property_values.value = []
  rmv_total.value = []
  years.value = []
  chartOptions.value = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  }
  try {
    store_table.fetchPropertyValues(account_id.value).then(() => {
      chartData.value = {
        labels:  years.value,
        datasets: [
          {
            label: 'Total Real Market Value',
            borderColor: 'rgb(75, 192, 192)',
            color: 'rgb(75, 192, 192)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 15,
            fill: false,
            data: rmv_total.value
          },
          {
            label: 'Maximum Assessed Value',
            borderColor: '#8B48B8',
            color: '#8B48B8',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 15,
            fill: false,
            data: max_av.value
          },
        ]
      }
    })
  } catch (error) {
    console.log(error)
  }
})
</script>

