import type leadsListResponse from '../fixtures/leadsListResponse.json';

export type LeadsListResponseData = typeof leadsListResponse;

export type LeadWithContactsItem = LeadsListResponseData[number];
