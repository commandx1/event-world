'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, LogOut, PartyPopper, Plus, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { fetchMe, logoutUser } from '@/utils/auth';
import handleError from '@/utils/handleError';

// Mock data for events
const mockEvents = [
    {
        id: '1',
        name: 'Summer Party',
        date: 'July 15, 2024',
        time: '6:00 PM',
        location: 'Sunset Beach',
        confirmed: 15,
        pending: 8,
        declined: 3,
        coverImage: '/placeholder.svg?height=100&width=200',
    },
    {
        id: '2',
        name: 'Team Building Workshop',
        date: 'August 5, 2024',
        time: '9:00 AM',
        location: 'Conference Center',
        confirmed: 22,
        pending: 5,
        declined: 1,
        coverImage: '/placeholder.svg?height=100&width=200',
    },
    {
        id: '3',
        name: 'Birthday Celebration',
        date: 'September 10, 2024',
        time: '7:30 PM',
        location: 'Rooftop Lounge',
        confirmed: 12,
        pending: 4,
        declined: 2,
        coverImage: '/placeholder.svg?height=100&width=200',
    },
];

export default function DashboardPage() {
    const [events, setEvents] = useState(mockEvents);
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast({
                title: 'Logged out',
                description: 'You have been successfully logged out.',
            });
            router.push('/');
        } catch (error: any) {
            handleError(error, toast, 'Failed to logout!');
        }
    };

    useEffect(() => {
        fetchMe().then(data => {
            console.log(data);
        }).catch(error => {
            handleError(error, toast, 'Failed to fetch me!');
            router.push('/');
        });
    }, []);

    return (
        <div className='flex min-h-screen flex-col'>
            <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <div className='container flex h-16 items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <PartyPopper className='h-6 w-6 text-primary' />
                        <span className='text-xl font-bold'>EventWorld</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                                    <Avatar className='h-8 w-8'>
                                        <AvatarImage src='/placeholder.svg' alt='User' />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56' align='end' forceMount>
                                <DropdownMenuLabel className='font-normal'>
                                    <div className='flex flex-col space-y-1'>
                                        <p className='text-sm font-medium leading-none'>John Doe</p>
                                        <p className='text-xs leading-none text-muted-foreground'>john@example.com</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className='mr-2 h-4 w-4' />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className='mr-2 h-4 w-4' />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            <main className='flex-1 bg-muted/30'>
                <div className='container py-8'>
                    <div className='mb-8 flex items-center justify-between'>
                        <h1 className='text-3xl font-bold'>My Events</h1>
                        <Link href='/events/create'>
                            <Button>
                                <Plus className='mr-2 h-4 w-4' /> Create Event
                            </Button>
                        </Link>
                    </div>

                    {events.length === 0 ? (
                        <div className='flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8 text-center'>
                            <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
                                <Calendar className='h-10 w-10 text-primary' />
                            </div>
                            <h2 className='mb-2 text-xl font-semibold'>No events yet</h2>
                            <p className='mb-6 max-w-md text-muted-foreground'>
                                Create your first event to start inviting guests and tracking RSVPs.
                            </p>
                            <Link href='/events/create'>
                                <Button>
                                    <Plus className='mr-2 h-4 w-4' /> Create Event
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {events.map(event => (
                                <Link href={`/events/${event.id}`} key={event.id}>
                                    <div className='group overflow-hidden rounded-lg border bg-background shadow-sm transition-all hover:shadow-md'>
                                        <div className='relative h-40 w-full overflow-hidden'>
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                                            <img
                                                src={event.coverImage || '/placeholder.svg'}
                                                alt={event.name}
                                                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                                            />
                                            <div className='absolute bottom-4 left-4 right-4'>
                                                <h3 className='text-xl font-bold text-white'>{event.name}</h3>
                                                <div className='flex items-center text-sm text-white/90'>
                                                    <Calendar className='mr-1 h-4 w-4' />
                                                    <span>
                                                        {event.date} • {event.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-4'>
                                            <div className='mb-2 text-sm text-muted-foreground'>{event.location}</div>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='flex flex-col'>
                                                        <span className='text-lg font-bold text-green-500'>
                                                            {event.confirmed}
                                                        </span>
                                                        <span className='text-xs text-muted-foreground'>Confirmed</span>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span className='text-lg font-bold text-amber-500'>
                                                            {event.pending}
                                                        </span>
                                                        <span className='text-xs text-muted-foreground'>Pending</span>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <span className='text-lg font-bold text-red-500'>
                                                            {event.declined}
                                                        </span>
                                                        <span className='text-xs text-muted-foreground'>Declined</span>
                                                    </div>
                                                </div>
                                                <Button variant='ghost' size='sm' className='rounded-full'>
                                                    <span className='sr-only'>View event</span>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='24'
                                                        height='24'
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        className='h-4 w-4'>
                                                        <path d='m9 18 6-6-6-6' />
                                                    </svg>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
