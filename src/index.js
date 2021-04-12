import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from 'store';
import './common/fonts/fonts.scss';

import {ThemeProvider} from "styled-components";
import {theme} from "config/theme";
import App from "components/App";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Provider>,
    document.getElementById('app'),
);