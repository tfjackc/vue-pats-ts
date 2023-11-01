<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <div class="py-14" />
      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-row class="d-flex align-center justify-center" style="margin-bottom: 20px;">
            <v-img width="90" src="src/assets/cc_logo.png" />
            <h1>Crook County Property Search</h1>
          </v-row>
          <v-form v-model="form"
                  @submit.prevent="onSubmit">
            <v-text-field
              v-model="searchedValue"
              placeholder="Search by account, name, maptaxlot, or situs address"
              label="Search"
              :rules="[required]"
              clearable=""
            ></v-text-field>
            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="elevated">
              Submit
            </v-btn>
          </v-form>
        </v-col>
        <v-col cols="auto">
          <v-fade-transition>
            <v-data-table
              v-if="filteredData.length > 0"
              v-model:items-per-page="itemsPerPage"
              :items="filteredData"
              :headers="headers"
              class="elevation-10"
              :hover=true
              @click:row="rowClick"
            >
            </v-data-table>
          </v-fade-transition>
          <div class="d-flex flex-wrap">
            <div v-for="property in filteredData" :key="property.id"></div>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(false)
const loading = ref(false)

function required (v) {
  return !!v || 'Field is required'
}
</script>

<script>
import axios from 'axios';
export default {
  data: () => ({
    // Initialise data
    form: false,
    loading: false,
    searchedValue: '',
    filteredData: [],
    itemsPerPage: 10,
    headers:
      [
        {title: 'Map / Taxlot', key: 'map_taxlot', align: 'center'},
        {title: 'Account', key: 'account_id', align: 'center'},
        {title: 'Owner Name', key: 'owner_name', align: 'center'},
        {title: 'Property Address (Situs)', key: 'situs_address', align: 'center'},
        {title: 'Subdivision', key: 'subdivision', align: 'center'},
        {title: 'Property Type', key: 'account_type', align: 'center'}
      ]

  }),
  methods: {
    onSubmit ()  {
      // Push the searched value into the tableSearchResults function
      if (this.searchedValue) {
        console.log(`Searched Value: ${this.searchedValue}`)
        this.tableSearchResults(this.searchedValue);
      }
    },
    async tableSearchResults(value) {
      // This function queries the PATS tables based on the search bar (this.searchedValue)
      this.filteredData = []
      const splitValue = value.toUpperCase().split(" ");

      // PATS Property Table
      const propUrl = "https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/11/query";
      // PATS Search Table
      const propSearchUrl = "https://geo.co.crook.or.us/server/rest/services/publicApp/Pats_Tables/MapServer/19/query";

      // Define the query parameters
      const params = {
        where: "1=1",            // Retrieve all records
        outFields: "*",           // Specify the fields to include in the response
        returnGeometry: false,    // Exclude geometry information
        f: "json"                 // Specify the response format as JSON
      };

      try {
        // Send the HTTP GET request
        const [searchResponse, tableResponse] = await Promise.all([
          axios.get(propSearchUrl, { params }),
          axios.get(propUrl, { params })
        ]);

        // Parse the JSON response into a JavaScript object
        const searchResult = searchResponse.data.features;
        const tableData = tableResponse.data.features;

        // Loop through the search results and filter based on splitValue
        for (const searchItem of searchResult) {
          const searchItemAttributes = searchItem.attributes;
          const matches = splitValue.every(value => searchItemAttributes.search_all.includes(value));

          if (matches) {
            // Find the corresponding item in tableData by account_id
            const matchingTableItem = tableData.find(tableItem => tableItem.attributes.account_id === searchItemAttributes.account_id);
            if (matchingTableItem) {
              this.filteredData.push({...matchingTableItem.attributes });
            }
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    // Click data table row to go to the summary page
    rowClick(item, row) {
      console.log(row.item.account_id);
      this.$router.push(`/summary/${row.item.account_id}`)
    }
  }
}
</script>

