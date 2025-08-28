

import { NavigationContainer } from '@react-navigation/native';
import Constants from "expo-constants";
import { StatusBar } from 'expo-status-bar';
import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';
import ErrorBoundary from './src/components/ErrorBoundary/ErrorBoundary'; // Import ErrorBoundary
import { NetworkLoggerWrapper } from "./src/components/Network/NetworkLoggerWrapper";
import { useApp } from './src/hooks/appConfigs/useApp';

import RootStack from './src/navigation/RootStack/RootStack';
import { navigationRef } from './src/utils/NavigationUtils';

function App(): React.JSX.Element {
    const { loaded, error, rootStore } = useApp() // Remove rootStore from here

    if (!loaded && !error) {
        return <></>;
    }

    const isDevBuild = Constants.expoConfig?.extra?.environment === 'development'


    return (
        <ErrorBoundary> {/* Wrap with ErrorBoundary */}
            <MobxProvider rootStore={rootStore} {...rootStore}>
                <StatusBar backgroundColor={'transparent'} />
                {isDevBuild && <NetworkLoggerWrapper />}
                <NavigationContainer ref={navigationRef}>
                    <RootStack />
                </NavigationContainer>
            </MobxProvider>
        </ErrorBoundary>
    );
}

export default App;
