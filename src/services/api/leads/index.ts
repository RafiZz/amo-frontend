import type { LeadsListResponseData } from '@/types/leadsListResponse';
import { AxiosHttpService } from '@/services/http/axios';

export const getLeads = ({
  search,
}: {
  search: string;
}): Promise<{ data: LeadsListResponseData }> => {
  return new AxiosHttpService().get('/api/v1/leads', {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    params: {
      query: search,
    },
  });
};

export const getMockedLeads = async ({
  search,
}: {
  search: string;
}): Promise<{ data: LeadsListResponseData }> => {
  console.log(`Mocked leads requested: `, { search });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const jsonModule = await import('@/fixtures/leadsListResponse.json');
  return { data: jsonModule.default };
};
