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
