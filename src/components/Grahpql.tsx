import * as React from 'react';
import Api from '../lib/index';
import { AjaxResponse } from 'rxjs/ajax';
import { GraphqlClient } from '../lib/GraphqlClient';

export class GraphqlQuery<Q, V> extends React.Component<GraphqlQueryProps<Q, V>, State> {
  constructor(props: GraphqlQueryProps<Q, V>) {
    super(props);

    this.state = {
      response: null,
      error: null,
      loading: true,
    };
  }

  static defaultProps = {
    variables: {},
  };

  graphqlClient = new GraphqlClient();

  fetch(query, variables) {
    const {
      url,
      headers,
    } = this.graphqlClient.params;

    Api.post(
      url,
      {
        query,
        variables,
      },
      headers,
    ).subscribe(
      response => this.setState({ response, loading: false }),
      error => this.setState({ error, loading: false }),
    );
  }

  componentDidMount() {
    if (!this.graphqlClient.params.url) {
      throw new Error('Graphql Client Not initialised properly');
    }

    this.fetch(this.props.queryString, this.props.variables);
  }

  componentDidUpdate(prevProps: GraphqlQueryProps<Q, V>) {
    if (JSON.stringify(prevProps.variables) === JSON.stringify(this.props.variables)) {
      return;
    }

    this.setState(
      { loading: true, response: null, error: null },
      () => this.fetch(this.props.queryString, this.props.variables),
    );
  }

  render() {
    const {
      response,
      error,
      loading,
    } = this.state;

    if (!response && !error) {
      return this.props.render(null, null, loading);
    }

    if (error && this.graphqlClient.params.errorHandler) {
      this.graphqlClient.params.errorHandler.error(error.status, error.response);
    }

    return (
      this.props.render(response && response.response && response.response.data, error, loading)
    );
  }
}

export interface GraphqlQueryProps<Q, V> {
  queryString: string;
  variables?: V;
  render: (response: Q, error?: any, loading?: boolean) => React.ReactNode;
}

interface State {
  response: AjaxResponse;
  error: any;
  loading: boolean;
}
