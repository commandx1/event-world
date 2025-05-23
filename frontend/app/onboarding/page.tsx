'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Mail, PartyPopper, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '@/components/page-transition';
import { AnimatedButton } from '@/components/animated-button';
import { FloatingElement } from '@/components/floating-element';
import confetti from 'canvas-confetti';

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const steps = [
        {
            title: 'Create Events',
            description: 'Design beautiful event pages with all the details your guests need to know.',
            icon: <Calendar className='h-16 w-16 text-primary' />,
        },
        {
            title: 'Invite Guests',
            description: 'Easily invite guests via email or shareable links with just a few clicks.',
            icon: <Users className='h-16 w-16 text-primary' />,
        },
        {
            title: 'Track RSVPs',
            description: "Keep track of who's coming, who's not, and any special requests.",
            icon: <Mail className='h-16 w-16 text-primary' />,
        },
        {
            title: "You're All Set!",
            description: "You're ready to start creating amazing events with EventWave.",
            icon: <PartyPopper className='h-16 w-16 text-primary' />,
        },
    ];

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            // Trigger confetti when completing onboarding
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ff0099', '#00ff99', '#9900ff', '#ff9900'],
            });

            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
        }),
    };

    const [direction, setDirection] = useState(1);

    const handleNext = () => {
        setDirection(1);
        nextStep();
    };

    const handlePrev = () => {
        setDirection(-1);
        prevStep();
    };

    return (
        <PageTransition>
            <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4 py-12'>
                <motion.div
                    className='mb-8 flex items-center gap-2'
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}>
                    <FloatingElement amplitude={5} duration={3}>
                        <PartyPopper className='h-8 w-8 text-primary' />
                    </FloatingElement>
                    <span className='text-2xl font-bold'>EventWave</span>
                </motion.div>

                <motion.div
                    className='relative w-full max-w-md overflow-hidden rounded-lg border bg-background p-8 shadow-lg'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}>
                    <div className='mb-6 flex justify-center'>
                        <div className='flex gap-2'>
                            {steps.map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`h-2 w-8 rounded-full ${i === step ? 'bg-primary' : 'bg-muted'}`}
                                    whileHover={{ scale: 1.2 }}
                                    animate={
                                        i === step
                                            ? {
                                                  scale: [1, 1.1, 1],
                                                  transition: {
                                                      repeat: Number.POSITIVE_INFINITY,
                                                      repeatType: 'reverse',
                                                      duration: 1,
                                                  },
                                              }
                                            : {}
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className='h-[350px]'>
                        <AnimatePresence custom={direction} mode='wait'>
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={variants}
                                initial='enter'
                                animate='center'
                                exit='exit'
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                    bounce: 0.4,
                                }}
                                className='flex h-full flex-col items-center justify-center text-center'>
                                <FloatingElement
                                    amplitude={8}
                                    duration={4}
                                    className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10'>
                                    {steps[step].icon}
                                </FloatingElement>
                                <motion.h2
                                    className='mb-2 text-2xl font-bold'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}>
                                    {steps[step].title}
                                </motion.h2>
                                <motion.p
                                    className='mb-8 text-muted-foreground'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}>
                                    {steps[step].description}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className='flex justify-between'>
                        <AnimatedButton variant='outline' onClick={handlePrev} disabled={step === 0}>
                            Back
                        </AnimatedButton>
                        <AnimatedButton onClick={handleNext} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            {step === steps.length - 1 ? 'Get Started' : 'Next'}
                        </AnimatedButton>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}
