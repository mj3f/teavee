# Remote and host next app
This app imports a nextJS (Reviews) micro-frontend into its home page.
It also exposes the Banner and Alerts components to be imported as microfrontends elsewhere.

Note that to import a microfrontend into a next app, you need to use the next/dynamic instead of lazy loading them in and embedding the component within a Suspense.

Instead of:
       const ReviewsMicroFrontend = lazy(async () => import('Reviews/Home'));

       const ReviewsView = () => {
            return (
                <Suspense fallback={'loading...'}>
                    <ReviewsMicroFrontend />
                </Suspense>
            );
        };

becomes:
      import dynamic from 'next/dynamic';

      const ReviewsMicroFrontend = dynamic(() => import('Reviews/Home'), {
        ssr: false,
      });

      export default function Home() {
            return (
                <div>
                    <ReviewsMicroFrontend />
                </div>
            )
      }