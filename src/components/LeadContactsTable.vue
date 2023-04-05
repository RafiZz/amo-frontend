<script setup lang="ts">
import type { LeadWithContactsItem } from '@/types/leadsListResponse';

import 'ant-design-vue/es/table/style/css';
import { computed } from 'vue';

import ContactCustomFieldsValues from './ContactCustomFieldsValues.vue';

const props = defineProps<{
  leadContacts: LeadWithContactsItem['_embedded']['contacts'];
}>();

const leadContactsData = computed(() => props.leadContacts.map((c) => c.data));

const columns = [
  {
    title: 'Контакт',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Подробности',
    dataIndex: 'custom_fields_values',
    key: 'custom_fields_values',
  },
];
</script>

<template>
  <a-table :columns="columns" :data-source="leadContactsData" :pagination="false">
    <template
      #bodyCell="{
        column,
        record: contactData,
      }: {
        column: (typeof columns)[number],
        record: (typeof leadContactsData.value)[number],
      }"
    >
      <template v-if="column.key === 'custom_fields_values'">
        <ContactCustomFieldsValues :fieldValues="contactData.custom_fields_values" />
      </template>
    </template>
  </a-table>
</template>
