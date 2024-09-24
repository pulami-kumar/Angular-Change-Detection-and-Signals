import { ApiResponseStatusEnum } from '../enum/api-response-status.enum';

export class ApiResponse<T> {
  status!: ApiResponseStatusEnum;
  data!: T;
  message!: string;
  error!: string[];
}
