import React, { Suspense, lazy } from 'react';
import Alert from '../components/Alert';
import dynamic from 'next/dynamic';

const ReviewsMicroFrontend = dynamic(() => import('Reviews/Home'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <p>Home page of next app 2</p>
      <Alert />
      <ReviewsMicroFrontend />
    </div>
  )
}
