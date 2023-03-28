export interface HttpService {
  get<SuccessResponse, ErrorResponse>(
    url: string,
  ): Promise<{ data: SuccessResponse | ErrorResponse }>;
}
