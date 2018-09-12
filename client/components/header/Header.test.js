import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header.jsx';

describe('<Header />', () => {
  test('it should render a <div />', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
