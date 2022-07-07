import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { WalletConnectProvider } from './components/WalletConnectProvider';

import React, { Suspense } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

export default function App() {
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <WalletConnectProvider>
                    <Switch>
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/profile/:address" component={Profile} />
                        <Route exact strict path="/" component={Home} />
                    </Switch>
                </WalletConnectProvider>
            </BrowserRouter>
        </Suspense>
    );
};