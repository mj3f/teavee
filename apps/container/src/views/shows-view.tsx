import React, { Suspense, lazy } from 'react';

const ShowsDirectoryMicroFrontend = lazy(async () => import('ShowsDirectory/App'));
// const ShowsDirectoryMicroFrontend = lazy(async () => import('ShowsDirectory/About'));

const ShowsView = () => {
    return (
        <Suspense fallback={'loading...'}>
            <ShowsDirectoryMicroFrontend />
        </Suspense>
    );
};

export default ShowsView;