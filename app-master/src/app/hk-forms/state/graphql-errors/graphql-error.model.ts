import { ID } from '@datorama/akita';

export interface GraphqlError {
  key: string;
  display: string;
  rule: string;
}

/**
 * A factory function that creates GraphqlErrors
 */
export function createGraphqlError(params: Partial<GraphqlError>) {
  return {

  } as GraphqlError;
}
