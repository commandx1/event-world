'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams, useRouter } from 'next/navigation';

const ShowErrorToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorMessage = searchParams.get('errorMessage');
    const { toast } = useToast();

    useEffect(() => {
        if (errorMessage) {
            toast({
                variant: 'destructive',
                className: 'bg-destructive/10 text-destructive bg-orange-700 text-white',
                title: 'Error',
                description: errorMessage,
            });

            const params = new URLSearchParams(searchParams.toString());
            params.delete('errorMessage');

            router.replace(`?${params.toString()}`, { scroll: false });
        }
    }, [errorMessage, router, toast, searchParams]);

    return null;
};

export default ShowErrorToast;
