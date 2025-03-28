import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { RootWidthProvider } from './utils/provider/RootWidthProvider';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <RootWidthProvider>
                <App />
            </RootWidthProvider>
        </BrowserRouter>
    </StrictMode>,
);