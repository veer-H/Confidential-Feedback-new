"use client";

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { motion } from 'framer-motion';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [completion, setCompletion] = useState<string>(initialMessageString);
  const [isSuggestLoading, setIsSuggestLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/suggest-messages', {
        prompt: `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.`,
      });

      if (response.status === 200 && response.data) {
        setCompletion(response.data);
      }
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching messages:', err);
    } finally {
      setIsSuggestLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestedMessages();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonHover = {
    scale: 1.02,
    boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.4)",
    transition: { duration: 0.3 }
  };

  const buttonTap = {
    scale: 0.98,
    boxShadow: "0 5px 10px -3px rgba(59, 130, 246, 0.4)"
  };

  const messageHover = {
    scale: 1.01,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: { duration: 0.2 }
  };

  return (
    <div className="flex justify-center items-start md:items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 pt-8 md:pt-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-2xl p-4 md:p-8 space-y-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 shadow-2xl"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transformStyle: "preserve-3d"
        }}
      >
        <motion.h1 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold text-center text-white mb-4 md:mb-6"
        >
          Send Anonymous Message
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-center text-gray-300 text-sm md:text-base"
        >
          Share your thoughts with @{username} without revealing your identity
        </motion.p>

        <Form {...form}>
          <motion.form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4 md:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm md:text-base">
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here"
                        className="resize-none bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-rose-400 text-xs md:text-sm" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div 
              className="flex justify-center"
              variants={itemVariants}
            >
              {isLoading ? (
                <Button 
                  disabled 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </Button>
              ) : (
                <motion.div
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className="w-full"
                >
                  <Button 
                    type="submit" 
                    disabled={isLoading || !messageContent}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Send Anonymously
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.form>
        </Form>

        <motion.div 
          className="space-y-4 my-6 md:my-8"
          variants={containerVariants}
        >
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
          >
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="w-full"
            >
              <Button
                onClick={fetchSuggestedMessages}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSuggestLoading}
                
              >
                {isSuggestLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Suggest Messages
              </Button>
            </motion.div>
            <p className="text-gray-400 text-xs md:text-sm">Click on any message below to select it</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/5 border-white/10 shadow-lg">
              <CardHeader className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">Message Suggestions</h3>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3 p-4 md:p-6 md:space-y-4">
                {error ? (
                  <p className="text-rose-400 text-sm md:text-base">{error.message}</p>
                ) : (
                  parseStringMessages(completion).map((message, index) => (
                    <motion.div
                      key={index}
                      whileHover={messageHover}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start bg-white/5 text-white border-white/10 hover:bg-white/10 hover:text-white text-xs md:text-sm py-2 px-3 md:py-2 md:px-4"
                        onClick={() => handleMessageClick(message)}
                      >
                        {message}
                      </Button>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
        >
          <Separator className="my-4 md:my-6 bg-white/20" />
        </motion.div>

        <motion.div 
          className="text-center space-y-4"
          variants={containerVariants}
        >
          <motion.p 
            variants={itemVariants}
            className="text-gray-300 text-sm md:text-base"
          >
            Want to receive anonymous messages?
          </motion.p>
          <Link href={'/sign-up'} passHref>
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
              className="w-full"
            >
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Create Your Own Message Board
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}