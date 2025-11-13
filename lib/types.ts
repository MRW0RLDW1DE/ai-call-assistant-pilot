export type CallStatus = 'CREATED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'NO_ANSWER';

export interface CallRequest {
  id: string;
  phoneNumber: string;
  objective: string;
  context: string;
  status: CallStatus;
  createdAt: string;
}
