import React, { Suspense, lazy } from 'react';

const ReviewsMicroFrontend = lazy(async () => import('Reviews/Home'));

const ReviewsView = () => {
    return (
        <Suspense fallback={'loading...'}>
            <ReviewsMicroFrontend />
        </Suspense>
    );
};

export default ReviewsView;