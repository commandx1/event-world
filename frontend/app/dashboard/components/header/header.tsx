import { PartyPopper, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Logout from './logout';
import { fetchMe } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const Header = async (): Promise<React.ReactNode> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        redirect('/?errorMessage=No access token');
    }

    const user = await fetchMe(accessToken);

    return (
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
                                    <AvatarFallback>
                                        {user.name
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')
                                            .toUpperCase()}
                                    </AvatarFallback>
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
                            <Logout />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default Header;
