import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { GraphqlClient, GraphqlQuery } from '../../index';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('rxjs/ajax');

const { shallow } = Enzyme;

describe('GraphqlClient', () => {
  const gqc = new GraphqlClient({ headers: {}, url: 'mocked' });

  test('fetch on component mount', () => {
    jest.useFakeTimers();

    const gqlc = shallow(
      (
        <GraphqlQuery
          queryString={``}
          render={(r, e, l) => <div />}
        />
      ),
    );

    jest.runOnlyPendingTimers();

    expect(gqlc.state())
      .toStrictEqual({
        response: {
          response: { data: { query: ``, variables: {} } },
        },
        error: null,
        loading: false,
      });
  });

  test('fetch on props change', () => {
    const variables = { name: '' };
    jest.useFakeTimers();

    const render = jest.fn((r, e, l) => <div />);

    const gqlc = shallow(
      (
        <GraphqlQuery
          queryString={``}
          variables={variables}
          render={(r, e, l) => render(r, e, l)}
        />
      ),
    );

    expect(render).toHaveBeenLastCalledWith(null, null, true);

    jest.runTimersToTime(1000);

    expect(render).toHaveBeenLastCalledWith({ query: ``, variables }, null, false);

    expect(gqlc.state())
      .toStrictEqual({
        response: {
          response: { data: { query: ``, variables } },
        },
        error: null,
        loading: false,
      });

    variables.name = 'anit';

    gqlc.setProps({ variables });

    expect(gqlc.state())
      .toStrictEqual({
        response: {
          response: { data: { query: ``, variables } },
        },
        error: null,
        loading: false,
      });
  });

});