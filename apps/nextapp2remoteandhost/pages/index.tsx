import React, { Suspense, lazy } from 'react';
import Alert from '../components/Alert';
import dynamic from 'next/dynamic';
import { Button } from "ui";

const ReviewsMicroFrontend = dynamic(() => import('Reviews/Home'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <p>Home page of next app 2</p>
      <Alert />
      <Button>Yo yo yo UI Button in the house!</Button>
      <ReviewsMicroFrontend />
    </div>
  )
}
