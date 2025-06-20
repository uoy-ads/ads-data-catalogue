<!-- Paginator for search results -->
<template>
  <div class="flex" v-if="active">
    <span
      v-for="(page, key) in getPaging()"
      v-bind:key="key"
      class="leading-1 mx-none my-none py-md px-base text-sm border-base transition-all duration-300"
      :class="pageClasses(page)"
      :title="'page ' + (page.val < 2 ? 1 : page.val)"
      @click.prevent="changePage(page.val, page.hover)"
      v-html="page.label"
    >
    </span>
  </div>
</template>

<script setup lang="ts">
import { $computed } from 'vue/macros';
import { searchModule } from "@/store/modules";
import VueScrollTo from 'vue-scrollto';

const props = defineProps<{
  scrollTop?: boolean,
}>();

const params = $computed(() => searchModule.getParams);
const result = $computed(() => searchModule.getResult);
const perPage = $computed(() => parseInt(searchModule.getPerPage));
const currentPage: number = $computed(() => parseInt(params.page) || 1);
const active: boolean = $computed(() => {
  let val = result?.total?.value;
  return val && parseInt(val) > perPage;
});

const pageClasses = (page: any): string => {
  let classes = page.active ? 'bg-primary border-primary text-white' : 'border-gray text-primary';
  return classes + (page.hover ? ' hover:bg-gray-30 cursor-pointer' : '')
};

// changes page, only if can
const changePage = (page: any, can: boolean) => {
  if (can) {
    searchModule.setSearch({ page: page < 2 ? 0 : page });

    if (props.scrollTop) {
      VueScrollTo.scrollTo('body');
    }
  }
};

// Returns paginator buttons
const getPaging = (): Array<any> => {
  let total = parseInt(result.total.value),
      pages: Array<any> = [],
      start = currentPage - 2,
      max = Math.ceil(total / perPage),
      amount = 5;

  if (amount > max) {
    amount = max
  }
  if (start < 2) {
    start = 1
  }
  if (start + amount > max) {
    start = max - amount + 1;
  }

  const activePage = currentPage < 2 ? 1 : currentPage;

  // Pages buttons
  for (let i = start; i < start + amount; i++) {
    pages.push({
      active: i === activePage,
      hover: i !== activePage,
      label: i,
      val: i
    });
  }

  pages.unshift({ label: '<i class="fas fa-angle-double-left"></i>', val: currentPage - 1, hover: currentPage > 1 });

  // Jump to first page button
  if(currentPage > 1 ) {
    pages.unshift({ label: '<i class="fas fa-arrow-circle-left"></i>', val: 1, hover: currentPage > 1 });
  }

  // Jump to next page button
  if(currentPage < max ) {
    pages.push({ label: '<i class="fas fa-angle-double-right"></i>', val: currentPage + 1 , hover: currentPage < max });
  }

  return pages;
}
</script>
