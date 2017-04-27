import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.js';
import { videos } from './assets/data.js';

ReactDOM.render(<App videos={videos}/>, document.getElementById('main'));
