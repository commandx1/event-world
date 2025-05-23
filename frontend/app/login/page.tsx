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
import { loginUser } from '@/utils/auth';

export default function LoginPage() {
    const [formData, setFormData] = useState({
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

            await loginUser(formData.email, formData.password);

            toast({
                title: 'Logged in!',
                className: 'bg-green-700 text-white',
                description: 'Welcome to EventWorld!',
            });

            setIsLoading(false);
            router.push('/dashboard');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                className: 'bg-orange-700',
                title: 'Failed to login!',
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
                        <h1 className='text-3xl font-bold'>Welcome back</h1>
                        <p className='text-muted-foreground'>Log in to your account</p>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='space-y-4'>
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
                            <div className='flex items-center justify-end'>
                                <Link href='/forgot-password' className='text-sm text-primary underline'>
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </Button>
                    </form>
                    <div className='mt-4 text-center text-sm'>
                        Don&apos;t have an account?{' '}
                        <Link href='/signup' className='text-primary underline'>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
