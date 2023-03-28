import type leadsListResponse from './leadsListResponse.json';

export type LeadsListResponseData = typeof leadsListResponse;

export type LeadWithContactsItem = LeadsListResponseData[number];
