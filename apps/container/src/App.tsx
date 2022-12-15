import React, { Suspense, lazy } from 'react';
import './App.css';

const ShowsView = lazy(() => import('./views/shows-view'));

function App() {
  return (
    <div className="App">
      <h1>Container</h1>
      <Suspense fallback={'loading views......'}>
        <ShowsView />
      </Suspense>
    </div>
  );
}

export default App;
