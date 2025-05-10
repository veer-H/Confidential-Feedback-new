'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-background/30 flex items-center justify-between border-b h-16 z-50 px-4 safe-area-top">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <a href="#" className="text-xl font-bold">
          Confidential Feedback
        </a>
        
        {session ? (
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              Welcome, {user.username || user.email}
            </span>
            <Button 
              onClick={() => signOut()} 
              className="bg-slate-100 text-black" 
              variant='outline'
              size="sm"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-slate-100 text-black" variant={'outline'} size="sm">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;