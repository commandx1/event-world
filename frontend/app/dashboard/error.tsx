'use client'; // Error boundaries must be Client Components

import { logoutUser } from '@/utils/auth';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error & { digest?: string } }) {
    const isSessionExpired = error.message.includes('Session expired');

    const router = useRouter();
    const navigateToHome = () => {
        router.push('/?errorMessage=Your session has expired. Please login again.');
    };

    useEffect(() => {
        if (isSessionExpired) {
            const handleLogout = async () => {
                try {
                    await logoutUser();
                    navigateToHome();
                } catch (error: any) {
                    navigateToHome();
                }
            };
            handleLogout();
        } else {
            redirect('/dashboard');
        }
    }, [isSessionExpired]);

    return <></>;
}
