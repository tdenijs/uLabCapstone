/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *                 Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 *
 *******************************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import WordEditor from '../src/components/WordEditor.js';

it('WordEditor renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WordEditor coreListTitles={["hello", "friend"]} />, div);

//    coreListTitles
});
