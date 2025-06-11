<!--
  App.vue - main component
-->
<template>
  <div>
    <div>

      <Header />

      <div class="pb-11x" style="padding-top:81px;">
        <router-view />
      </div>

      <Footer />

    </div>

    <help-loader />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { generalModule } from "@/store/modules";
import Header from './theme/Header.vue';
import Footer from './theme/Footer.vue';
import HelpLoader from './component/Help/Loader.vue';
import '../static/fa/css/all.min.css';
import 'leaflet/dist/leaflet.css';
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet-draw/dist/leaflet.draw.css";

onMounted(() => {
  generalModule.setServicesAndPublishers();
  generalModule.setWindow();
  window.addEventListener('resize', () => generalModule.setWindow());
});
</script>
