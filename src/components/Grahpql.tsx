import * as React from 'react';
import Api from '../lib/index';
import { AjaxResponse } from 'rxjs/ajax';

export interface GraphqlClientParams {
  url: string;
  headers?: object;
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

export class GraphqlQuery<Q, V> extends React.Component<GraphqlQueryProps<Q, V>, State> {
  constructor(props: GraphqlQueryProps<Q, V>) {
    super(props);

    this.state = {
      response: null,
      error: null,
    }
  }

  static defaultProps = {
    variables: {}
  }

  graphqlClient = new GraphqlClient();

  componentDidMount() {
    const {
      url,
      headers
    } = this.graphqlClient.params;

    Api.post(
      url,
      {
        query: this.props.queryString,
        variables: this.props.variables,
      },
      headers,
    ).subscribe(
      response => this.setState({ response }),
      error => this.setState({ error })
    )
  }

  componentWillReceiveProps(props: GraphqlQueryProps<Q, V>) {
    if (JSON.stringify(props.variables) === JSON.stringify(this.props.variables)) {
      return;
    }

    const {
      url,
      headers
    } = this.graphqlClient.params;

    Api.post(
      url,
      {
        query: props.queryString,
        variables: props.variables,
      },
      headers,
    ).subscribe(
      response => this.setState({ response }),
      error => this.setState({ error })
    )
  }

  render() {
    const {
      response,
      error
    } = this.state;

    if (!response && !error) {
      return this.props.render(null, null, true);
    }

    return (
      this.props.render(response && response.response && response.response.data, error, false)
    );
  }
}

export interface GraphqlQueryProps<Q, V> {
  queryString: string;
  variables?: V;
  render: (response: Q, error?: any, loading?: boolean) => React.ReactElement;
}

interface State {
  response: AjaxResponse;
  error: any;
}