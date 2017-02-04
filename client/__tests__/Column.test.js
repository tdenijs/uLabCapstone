import React from 'react';
import { shallow } from 'enzyme';
import Column from '../src/components/Column';
import speechSynthesis from '../src/mocks';

// global.speechSynthesis = {
//     getVoices: () => {
//         return [{ name: "Google UK English Male" }, { name: "Google UK English Female" }];
//     }
// };

it('Column component shallow renders without crashing', () => {
    let add = jest.fn();
    shallow(<Column add={add}/>);
});