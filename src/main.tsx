import React from 'react'
import ReactDOM from 'react-dom/client'

import { ReactGPT } from './ReactGPT';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactGPT />
  </React.StrictMode>,
)
