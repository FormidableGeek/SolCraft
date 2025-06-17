
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, type FormEvent } from 'react';
import { UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, type User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase'; // Import db
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const createInitialUserProfile = async (firebaseUser: User) => {
    if (!firebaseUser.email) {
      console.error("User email is null, cannot create profile.");
      toast({
        title: 'Profile Creation Issue',
        description: 'Could not create user profile due to missing email.',
        variant: 'destructive',
      });
      return;
    }
    const username = firebaseUser.email.split('@')[0];
    const userProfileData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      username: username,
      name: username, // Default name to username
      joinedDate: new Date().toISOString(),
      avatarUrl: '', // Initialize with empty or default avatar
      bio: '',
      isWalletConnected: false,
      walletAddress: '',
      // Stats fields will be absent initially or can be defaulted to 0/null if needed
      followersCount: 0,
      followingCount: 0,
      totalInvested: 0,
      overallReturn: 0,
      ranking: null,
    };

    try {
      await setDoc(doc(db, "users", firebaseUser.uid), userProfileData);
      console.log("User profile created in Firestore for UID:", firebaseUser.uid);
    } catch (error) {
      console.error("Error creating user profile in Firestore:", error);
      toast({
        title: 'Profile Creation Failed',
        description: 'Your account was created, but we failed to save your profile information. Please try updating it later.',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: 'Signup Failed',
        description: "Passwords don't match!",
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createInitialUserProfile(userCredential.user);
      toast({
        title: 'Signup Successful!',
        description: 'Your account has been created. Welcome to SolCraft!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      toast({
        title: 'Signup Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 font-body">
      <Card className="w-full max-w-md shadow-xl border-border">
        <CardHeader className="space-y-2 text-center">
           <Image 
            src="/solcraft-logo.png"
            alt="SolCraft Logo" 
            width={72} 
            height={72} 
            className="mx-auto mb-3 rounded-full"
            data-ai-hint="logo brand"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/72x72.png'; (e.target as HTMLImageElement).alt = 'SolCraft Placeholder Logo';}}
          />
          <CardTitle className="text-3xl font-headline text-foreground">Create an Account</CardTitle>
          <CardDescription className="text-muted-foreground">Join SolCraft to manage your crypto assets seamlessly.</CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-6 px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 text-base"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={isLoading}>
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <UserPlus className="mr-2 h-5 w-5" />
              )}
              Sign Up
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/80 hover:underline">
                Login
              </Link>
            </p>
            <p className="mt-2">
                <Link href="/" className="text-xs text-muted-foreground hover:text-primary hover:underline">
                    Back to Home
                </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
