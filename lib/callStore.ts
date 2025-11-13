import { CallRequest } from './types';

// TODO: replace this with a real database (e.g. Postgres) in future. This is NOT production-safe.

let calls: CallRequest[] = [];

export function createCall(input: { phoneNumber: string; objective: string; context: string }): CallRequest {
  const id = Date.now().toString();
  const call: CallRequest = {
    id,
    phoneNumber: input.phoneNumber,
    objective: input.objective,
    context: input.context,
    status: 'CREATED',
    createdAt: new Date().toISOString(),
  };
  calls.push(call);
  return call;
}

export function listCalls(): CallRequest[] {
  return calls;
}
