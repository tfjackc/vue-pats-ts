<template>
  <v-fade-transition>
  <v-container class="justify-center">
    <v-col>
    <v-row class="d-flex align-center justify-center">
    <v-icon size="x-large" icon="mdi-database-outline" />
    <h1>Summary for Account: {{ account_id }}</h1>
    </v-row>
  <v-row class="justify-center">
  <v-card
    class="summaryPage"
    width="450"
    title="Account Information"
    elevation="10"
  >
    <v-divider></v-divider>
  <v-list>
    <v-list-item><strong>Mailing Name:</strong> {{property.owner_name}}</v-list-item>
    <v-list-item><strong>Map and Tax Lot: </strong>{{property.map_taxlot}}</v-list-item>
    <v-list-item><strong>Situs Address:</strong> {{property.situs_address}}</v-list-item>
    <v-list-item><strong>Tax Status: </strong>{{property.tax_status}}</v-list-item>
  </v-list>
  </v-card>
  <v-card
    scroll=false
    class="summaryPage"
    width="450"
    title="Ownership"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <p>
          <strong>Mailing To:</strong>
          <br />{{property.owner_name}}
          <br />{{property.owner_mailing_address1}}
          <br />{{property.owner_mailing_city}}, {{property.owner_mailing_state}} {{property.owner_mailing_zip}}
        </p>
      </v-list-item>
    </v-list>
      <v-row class="d-flex align-center justify-center">
        <v-card-actions>
          <v-btn
            block rounded="lg"
            density="comfortable"
            :href="'https://co.crook.or.us/assessor/webform/mailing-address-change-request-form'">
            Change of Mailing Address Form
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            block rounded="lg"
            density="comfortable"
            :href="'https://geo.co.crook.or.us/portal/apps/webappviewer/index.html?id=370f5ec185b945db9d92999cef827982&query=Taxlots,Maptaxlot,{{property.map_taxlot}}'">
            View Overview Map
          </v-btn>
        </v-card-actions>
      </v-row>
  </v-card>
  <v-card
    class="summaryPage"
    width="450"
    title="Taxes"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item><strong>Property Tax (Current Year): </strong>{{property.current_property_tax}}</v-list-item>
<!--      <v-list-item>Get Current Balance Due (PDF)</v-list-item>-->
<!--      <v-list-item>Tax Payments & History</v-list-item>-->
      <v-list-item><strong>Tax Code Area:</strong> 00{{property.tax_code_area}}</v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn
        block rounded="lg"
        density="comfortable"
        :href="'https://co.crook.or.us/tax-collection'">
        Pay Your Property Taxes
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    class="summaryPage"
    width="450"
    title="Assessment"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>  <strong>Assessor Property Description:</strong> information pop-up here</v-list-item>
      <v-list-item>{{property.subdivision}}</v-list-item>
      <v-list-item><strong>Assessor Acres:</strong> {{property.land_size_acres}}</v-list-item>
      <v-list-item><strong>Property Class:</strong> {{property.property_class}} </v-list-item>
    </v-list>
  </v-card>
  <v-card
    class="summaryPage"
    width="450"
    title="Zoning"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-list>
      <v-list-item>Zone: </v-list-item>
      <v-list-item>Zone Description: </v-list-item>
      <v-list-item :href="'https://www.codepublishing.com/OR/CrookCounty/#!/CrookCounty18/CrookCounty1840.html#18.40'">Zone Link</v-list-item>
    </v-list>
  </v-card>
  <v-card
    class="summaryPage"
    width="450"
    title="Valuation"
    elevation="10"
  >
    <v-divider></v-divider>
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Category
        </th>
        <th class="text-left">
          Value
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Land</td>
        <td>${{property.rmv_land}}</td>
      </tr>
      <tr>
        <td>Structures</td>
        <td>${{property.rmv_improvements}}</td>
      </tr>
      <tr>
        <td>Total</td>
        <td>${{property.rmv_total}}</td>
      </tr>
      </tbody>
    </v-table>
    <v-card-actions>
      <v-btn
        block rounded="lg"
        density="comfortable"
        :href="'http://apps.lanecounty.org/PropertyAssessmentTaxationSearch/crook/Real/Valuation/' + account_id">
        Current Year Value Summary
      </v-btn>
    </v-card-actions>
  </v-card>
    </v-row>
    </v-col>
  </v-container>
    </v-fade-transition>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePropertyStore } from '@/store/propertyAPI'

const route = useRoute()
const account_id = ref(route.params.account_id)
const store_table = usePropertyStore()

const { property } = storeToRefs(store_table)
onMounted(() => {
  store_table.fetchProperty(account_id.value)
})
</script>

<style>

</style>
