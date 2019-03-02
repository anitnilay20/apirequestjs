import * as React from 'react';
import { GraphqlQuery, GraphqlClient } from './Grahpql';

new GraphqlClient({
  url: 'http://localhost:8000/graphql/',
})

export class App extends React.Component {
  render() {
    this.props.children
    return (
      <div>
        <GraphqlQuery
          queryString={`
          {
            allCompanies {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
          `}
          variables={{}}
          render={(response: any, error, loading) => {
            console.log(response, error, loading)
            if (loading) {
              return <div>loading</div>
            }

            if (error) {
              return <div>{JSON.stringify(error)}</div>
            }
            
            return (
              <div>
                {response.data.allCompanies.edges.map(x => <li>{x.node.name}</li>)}
              </div>
            )
          }}
        />
      </div>
    );
  }
}