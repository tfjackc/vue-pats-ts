<template>
      <v-navigation-drawer>
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-database-outline"
            title="Summary"
            value="summary"
            router :to="{ name : 'SummaryPage' }"></v-list-item>
          <v-list-item
            prepend-icon="mdi-chart-line"
            title="Valuation"
            value="valuation"
            router :to="{ name : 'ValuationPage' }"></v-list-item>
          <v-list-item prepend-icon="mdi-bank" title="Tax Information" value="tax_information"></v-list-item>
          <v-list-item prepend-icon="mdi-account-cash-outline" title="Sales" value="sales"></v-list-item>
          <v-list-item prepend-icon="mdi-domain" title="Land and Structures" value="land_and_structures"></v-list-item>
          <v-list-item prepend-icon="mdi-map-legend" title="Tax Map" value="tax_map"></v-list-item>
          <v-list-item prepend-icon="mdi-timeline-clock-outline" title="Tax Lot History" value="tax_lot_history"></v-list-item>
          <v-list-item prepend-icon="mdi-vector-link" title="Related Accounts" value="related_Accounts"></v-list-item>
          <v-list-item prepend-icon="mdi-alert-box-outline" title="Warnings/Notations" value="warnings_notations"></v-list-item>
          <v-list-item prepend-icon="mdi-home-plus-outline" title="Development" value="development"></v-list-item>
          <v-list-item
            prepend-icon="mdi-map-marker-outline"
            title="Property Map"
            value="property_map"
            router :to="{ name : 'PropertyMapPage' }"></v-list-item>
          <v-list-item
            prepend-icon="mdi-ruler-square-compass"
            title="Surveys"
            value="surveys"
            router :to="{ name : 'SurveyMapPage' }"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script setup>

</script>
