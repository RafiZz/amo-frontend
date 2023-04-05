<script setup lang="ts">
import type { LeadWithContactsItem } from '@/types/leadsListResponse';

import { MailOutlined, PhoneOutlined } from '@ant-design/icons-vue';

type LeadContactFieldValues =
  LeadWithContactsItem['_embedded']['contacts'][number]['data']['custom_fields_values'];

enum ContactFieldCodes {
  phone = 'PHONE',
  email = 'EMAIL',
}

defineProps<{
  fieldValues: LeadContactFieldValues;
}>();
</script>

<template>
  <template v-for="(fieldData, index) in fieldValues" :key="fieldData.field_id">
    <template v-for="values in fieldData.values" :key="values.value">
      <a-divider v-if="index" type="vertical" />
      <template v-if="fieldData.field_code === ContactFieldCodes.email">
        <a :href="`mailto:${values.value}`"><mail-outlined /></a>
      </template>
      <template v-else-if="fieldData.field_code === ContactFieldCodes.phone">
        <a :href="`tel:${values.value}`"><phone-outlined /></a>
      </template>
      {{ `${values.value} (${values.enum_code})` }}
    </template>
  </template>
</template>
