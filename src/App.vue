<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css';

import type { LeadWithContactsItem } from './mocks/leadsListResponse';
import { getLeads } from './services/api/leads';

const leads = ref<LeadWithContactsItem[]>([]);
const leadsLoading = ref(false);

const requestLeads = async ({ search }: { search: string } = { search: '' }) => {
  const hideLoading = message.loading('Загрузка...', 0);
  leadsLoading.value = true;
  try {
    const { data } = await getLeads({ search });
    leads.value = data;
  } catch (e) {
    const hideError = message.error((e as Error).message, 0);
    setTimeout(hideError, 2500);
  } finally {
    hideLoading();
    leadsLoading.value = false;
  }
};

requestLeads();

const onSearch = (search: string) => {
  requestLeads({ search });
};
</script>

<template>
  <main>
    <a-row>
      <a-col :span="24">
        <LeadsTable v-if="leads" :leads="leads" :loading="leadsLoading" @search="onSearch" />
      </a-col>
    </a-row>
  </main>
</template>

<style>
main {
  width: 100%;
  flex-grow: 1;
}
</style>
