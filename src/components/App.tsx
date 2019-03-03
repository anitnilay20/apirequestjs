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
          query ProductDropDown($after: String!, $productName: String) {
            allProducts(first: 10, after: $after, name_Icontains: $productName) {
              edges {
                node {
                  id,
                  name,
                  oldBarcodeId,
                  newBarcodeId
                }
              }
            }
          }
          `}
          variables={{
            after: '',
            productName: '',
          }}
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
                l
              </div>
            )
          }}
        />
      </div>
    );
  }
}