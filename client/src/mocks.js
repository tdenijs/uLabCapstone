/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
 *******************************************************************/

import React from 'react';

module.exports = {
    speechSynthesis: global.speechSynthesis = {
        getVoices: () => {
            return [{name: "Google UK English Male"}, {name: "Google UK English Female"}];
        },
        speak: (msg) => {
            return msg;
        },
    },

    SpeechSynthesisUtterance: global.SpeechSynthesisUtterance = jest.fn()
};
