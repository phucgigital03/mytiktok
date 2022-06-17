import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((publicRoute, index) => {
                        const Page = publicRoute.component;
                        let LayOut = DefaultLayout;

                        if (publicRoute.Layout) {
                            LayOut = publicRoute.Layout;
                        } else if (publicRoute.Layout === null) {
                            LayOut = <Fragment />;
                        }

                        return (
                            <Route
                                key={index}
                                path={publicRoute.path}
                                element={
                                    <LayOut>
                                        <Page />
                                    </LayOut>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
