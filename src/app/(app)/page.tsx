'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mt-10 mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl my-2 font-medium flex">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
          Send feedback secretly to your friend, colleague, favourite youtuber...
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
       
        <section className="text-center mb-8 md:mb-4">
          <h1 className="text-2xl md:mt-4 text-2xl font-bold">
          Why SecretFeedback?
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
          The reason why the feedback should be secret.
          </p>
        </section>
        <div className="grid grid-cols-6 justify-between w-[80vw] gap-4">
          <div className="col-span-6 sm:col-span-3 md:col-span-2 border border-1 border-foreground/20 rounded-md w-full p-4 shadow-sm shadow-foreground/10">
          <div className='text-md my-2 flex items-center'>
          Encourages Honesty
          </div>
          <div className='text-sm text-muted-foreground'>
          People are likely to provide more genuine and honest feedback when their identity remains secret.
          </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 border border-1 border-foreground/20 rounded-md w-full p-4 shadow-sm shadow-foreground/10">
          <div className='text-md my-2 flex items-center'>
          Encourages Honesty
          </div>
          <div className='text-sm text-muted-foreground'>
          People are likely to provide more genuine and honest feedback when their identity remains secret.
          </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 border border-1 border-foreground/20 rounded-md w-full p-4 shadow-sm shadow-foreground/10">
          <div className='text-md my-2 flex items-center'>
          Encourages Honesty
          </div>
          <div className='text-sm text-muted-foreground'>
          People are likely to provide more genuine and honest feedback when their identity remains secret.
          </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 border border-1 border-foreground/20 rounded-md w-full p-4 shadow-sm shadow-foreground/10">
          <div className='text-md my-2 flex items-center'>
          Encourages Honesty
          </div>
          <div className='text-sm text-muted-foreground'>
          People are likely to provide more genuine and honest feedback when their identity remains secret.
          </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 border border-1 border-foreground/20 rounded-md w-full p-4 shadow-sm shadow-foreground/10">
          <div className='text-md my-2 flex items-center'>
          Encourages Honesty
          </div>
          <div className='text-sm text-muted-foreground'>
          People are likely to provide more genuine and honest feedback when their identity remains secret.
          </div>
          </div>
          <div className="col-span-6 sm:col-span-3 md:col-span-2 border border-1 border-foreground/20 rounded-md w-full p-4 shadow-sm shadow-foreground/10">
          <div className='text-md my-2 flex items-center'>
          Encourages Honesty
          </div>
          <div className='text-sm text-muted-foreground'>
          People are likely to provide more genuine and honest feedback when their identity remains secret.
          </div>
          </div>
        </div>
      <div className='w-full md:w-[80vw] my-4 flex flex-col items-center w-full gap-y-4'>
      <div className='text-lg'>FAQs</div>
        <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it free to use?</AccordionTrigger>
        <AccordionContent>
         Yes. SecretFeedback is completely free to use.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Can I stop to receive the messages?</AccordionTrigger>
        <AccordionContent>
        Yes. You have an option to when to receive the message and when not to.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How does SecretFeedback work?</AccordionTrigger>
        <AccordionContent>
        Once your account is created, you will get a shareable link for getting feedback.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Is this an open-source initiative?</AccordionTrigger>
        <AccordionContent>
        Yes, indeed.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 Confidential Feedback. All rights reserved.
      </footer>
    </>
  );
}
