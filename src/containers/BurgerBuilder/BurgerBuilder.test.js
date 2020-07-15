import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControlCollection from '../../components/Burger/BuildControlCollection/BuildControlCollection';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });


    it('should render two <BuildControlCollection /> when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {
                salad: 1
            }
        });
        expect(wrapper.find(BuildControlCollection)).toHaveLength(1);
    });

});

