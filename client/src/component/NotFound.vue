<!-- 404 error page -->
<template>
  <div>
    <b-link
      to="/"
      class="p-md bg-danger text-white hover:bg-danger-90 transition-bg duration-300 w-full block text-center"
    >
      <i class="fas fa-long-arrow-alt-left mr-sm"></i>
      Go back to Front page
    </b-link>

    <div class="text-center pt-3x px-base max-w-screen-xl mx-auto">
      <h1 class="text-xl text-danger mb-md">
        Sorry, we can't find that page (404).
      </h1>
      <p class="mb-md">
        Unfortunately we couldn't find the page you were looking for.<br>
        It might have been deleted, or relocated.
      </p>
      <p class="mb-xl">
        Try a search in the portal?
      </p>

      <div class="mb-2x">
        <filter-search
          class="max-w-2xl m-auto"
          color="primary"
          hoverStyle="hover:bg-primary-80"
          focusStyle="focus:border-primary"
          :big="true"
          :hasAutocomplete="true"
          showFields="select"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BLink from '@/component/Base/Link.vue';
import FilterSearch from '@/component/Filter/Search.vue';
</script>
