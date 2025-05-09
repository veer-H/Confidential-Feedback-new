'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
      return;
    }

    if (result?.url) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in',
      });
      router.replace('/dashboard');
    }
  };

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md p-6 sm:p-8 space-y-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 shadow-2xl"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to <span className="text-blue-400">Confidential Feedback</span>
          </h1>
          <p className="text-gray-300">Sign in to continue your anonymous journey</p>
        </motion.div>

        <Form {...form}>
          <motion.form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email or Username</FormLabel>
                    <Input
                      {...field}
                      autoComplete="username"
                      className="bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                    />
                    {form.formState.errors.identifier && (
                      <FormMessage className="text-rose-400">
                        {form.formState.errors.identifier.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        autoComplete="current-password"
                        className="bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <FormMessage className="text-rose-400">
                        {form.formState.errors.password.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Button
                  className="w-full bg-slate-100 hover:bg-slate-100 text-black font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </Form>

        <motion.div 
          variants={itemVariants}
          className="text-center pt-2"
        >
          <p className="text-gray-400">
            Not a member yet?{' '}
            <Link href="/sign-up" passHref>
              <motion.a
                className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up
              </motion.a>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}