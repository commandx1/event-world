'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/utils/auth';
import { useSetAtom } from 'jotai';
import { authAtom } from '@/atoms/authAtom';

export default function SignupPage() {
    const setIsAuthenticated = useSetAtom(authAtom);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            await registerUser(formData.email, formData.password, formData.name);
            toast({
                title: 'Account created!',
                description: "Welcome to EventWorld! Let's get started with your first event.",
            });

            setIsLoading(false);
            setIsAuthenticated(true);
            router.push('/onboarding');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                className: 'bg-orange-700',
                title: 'Failed to create account!',
                description:
                    error.message.split(',').map((e: string) => (
                        <div className='relative pl-4 capitalize' key={e}>
                            <div className='absolute left-0 top-[6px] w-2 h-2 rounded-full bg-gray-300' />
                            {e}
                        </div>
                    )) || 'Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen flex-col'>
            <div className='flex min-h-screen flex-col items-center justify-center px-4 py-12'>
                <Link href='/' className='mb-8 flex items-center gap-2'>
                    <PartyPopper className='h-6 w-6 text-primary' />
                    <span className='text-xl font-bold'>EventWorld</span>
                </Link>
                <div className='w-full max-w-md space-y-8 rounded-lg border bg-background p-6 shadow-lg'>
                    <div className='space-y-2 text-center'>
                        <h1 className='text-3xl font-bold'>Create an account</h1>
                        <p className='text-muted-foreground'>Enter your information to get started</p>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='name'>Full Name</Label>
                                <Input
                                    id='name'
                                    name='name'
                                    placeholder='John Doe'
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='john@example.com'
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                    id='password'
                                    name='password'
                                    type='password'
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                    </form>
                    <div className='mt-4 text-center text-sm'>
                        Already have an account?{' '}
                        <Link href='/login' className='text-primary underline'>
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
