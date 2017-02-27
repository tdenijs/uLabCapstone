/***************************************************************
 * Copyright (c) 2016 Universal Design Lab. All rights reserved.
 *
 * This file is part of uLabCapstone, distibuted under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 **************************************************************/

import React from 'react';
import { shallow } from 'enzyme';
import Column from '../src/components/Column';
import speechSynthesis from '../src/mocks';

it('Column component shallow renders without crashing', () => {
    let add = jest.fn();
    shallow(<Column add={add}/>);
});
