import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Download Media from <span className="text-primary">Anywhere</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Save your favorite Reels, Stories, TikToks, and Videos effortlessly. High quality downloads, secure, and fast.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {!user ? (
            <button
              onClick={signInWithGoogle}
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
             <a
              href="/dashboard"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go to Dashboard
            </a>
          )}
          <a href="#" className="text-sm font-semibold leading-6 text-foreground">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
