import { GraphqlError } from '../lib/GraphqlError';

export interface GraphqlClientParams {
  url: string;
  headers?: object;
  errorHandler?: GraphqlError;
}

export class GraphqlClient {
  static instance: GraphqlClient = null;
  params: GraphqlClientParams;

  constructor(params?: GraphqlClientParams) {
    if (GraphqlClient.instance) {
      return GraphqlClient.instance;
    } else {
      GraphqlClient.instance = this;
    }

    this.params = params;
    this.params.headers = this.params.headers || {};
    params.headers['Content-Type'] = 'application/json';
  }
}
