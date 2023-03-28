<script setup lang="ts">
import type { LeadWithContactsItem } from '@/mocks/leadsListResponse';

import 'ant-design-vue/es/table/style/css';
import { ref } from 'vue';
import { useThrottleFn } from '@vueuse/core';

import LeadContactsTable from './LeadContactsTable.vue';

defineProps<{
  leads: LeadWithContactsItem[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (event: 'search', text: string): void;
}>();

const columns = [
  {
    title: 'Сделка',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Дата создания',
    dataIndex: 'created_at',
    key: 'created_at',
  },
];

const formatDate = (n: number) => {
  const date = new Date(n * 1000);
  return date.toLocaleString();
};

const searchTextMinLength = 3;
const searchText = ref('');

const validateSearchText = () => {
  if (searchText.value && searchText.value.length < searchTextMinLength) {
    searchTextError.value = `Минимальное количество символов: ${searchTextMinLength}`;
    return false;
  }
  searchTextError.value = '';
  return true;
}

const searchTextError = ref('');
const onSearch = useThrottleFn(() => {
  if (!validateSearchText()) {
    return;
  }
  emit('search', searchText.value);
}, 1500);
</script>

<template>
  <div class="table-wrapper">
    <div class="table-title">
      <div class="table-title-container">
        <div class="table-title-block">
          <a-typography-title :level="2">Тестовое задание</a-typography-title>
        </div>
        <div class="table-title-block">
          <a-input-search
            v-model:value="searchText"
            placeholder="Поиск"
            enter-button
            @search="onSearch"
          />
          <a-typography-text v-if="searchTextError" type="danger">{{ searchTextError }}</a-typography-text>
        </div>
      </div>
    </div>
    <a-table
      rowKey="id"
      :dataSource="leads"
      :loading="loading"
      :columns="columns"
      :rowExpandable="(r: LeadWithContactsItem) => r._embedded.contacts?.length"
      :pagination="false"
    >
      <template #bodyCell="{ text, column }">
        <template v-if="column.key === 'created_at'">
          {{ formatDate(text) }}
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <LeadContactsTable :leadContacts="record._embedded.contacts" />
      </template>
    </a-table>
  </div>
</template>

<style scoped>
.table-wrapper {
  border: 1px solid #40a9ff;
  padding: 4px;
}
.table-title-container {
  display: flex;
  justify-content: space-between;
}
.table-title-block {
  margin: 4px;
}
</style>
