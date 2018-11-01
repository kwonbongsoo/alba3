
<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      hide-actions
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs6
        sm4
        md3
        lg2
      >
        <v-card>
          <v-card-title><h4>{{ props.item.icon_url }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>사이트</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.title }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>URL</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.url }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        
      ]
    }),
    mounted () {
      this.$store.dispatch('l_site', '').then((res) => {
        this.items = res;
      })
    },
  }
</script>

<style>
</style>