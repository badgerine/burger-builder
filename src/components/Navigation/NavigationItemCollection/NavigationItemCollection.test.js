import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItemCollection from './NavigationItemCollection';
import NavigationItem from '../NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItemCollection />', () => {
    it('should render two <NavigationItem/> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItemCollection />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});