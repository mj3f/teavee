import React, { Suspense, lazy } from 'react';
import './App.css';

const ShowsView = lazy(() => import('./views/shows-view'));
const ReviewsView = lazy(() => import('./views/reviews-view'));
// const Banner = lazy(() => import('NextHostAndRemote/Banner'));

function App() {
  return (
    <div className="App">
      <h1>Container</h1>
      <Suspense fallback={'loading views......'}>
        <ShowsView />
      </Suspense>
      <Suspense fallback={'loading reviews...'}>
        <ReviewsView />
      </Suspense>
      {/* <Suspense fallback={'loading banner...'}>
        <Banner />
      </Suspense> */}
    </div>
  );
}

export default App;
