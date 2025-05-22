const handleError = (error: any, toast: any, title: string) => {
    toast({
        variant: 'destructive',
        className: 'bg-orange-700',
        title,
        description:
            error.message.split(',').map((e: string) => (
                <div className='relative pl-4 capitalize' key={e}>
                    <div className='absolute left-0 top-[6px] w-2 h-2 rounded-full bg-gray-300' />
                    {e}
                </div>
            )) || 'Please try again.',
    });
};

export default handleError;
