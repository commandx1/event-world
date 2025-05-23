'use client';

import { authAtom } from '@/atoms/authAtom';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { logoutUser } from '@/utils/auth';
import { useSetAtom } from 'jotai';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import handleError from '@/utils/handleError';

const Logout = () => {
    const { toast } = useToast();
    const setIsAuthenticated = useSetAtom(authAtom);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast({
                title: 'Logged out',
                description: 'You have been successfully logged out.',
            });
            setIsAuthenticated(false);
            router.push('/');
        } catch (error: any) {
            handleError(error, toast, 'Failed to logout!');
        }
    };

    return (
        <DropdownMenuItem onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
        </DropdownMenuItem>
    );
};

export default Logout;
