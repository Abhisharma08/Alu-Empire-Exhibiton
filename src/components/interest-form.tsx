'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { submitInterest } from '@/app/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }).max(50, { message: 'Name is too long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  designation: z.string().min(2, { message: 'Please enter your designation.' }),
  city: z.string().min(2, { message: 'Please enter your city.' }),
});

type FormData = z.infer<typeof formSchema>;

export function InterestForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '+91',
      designation: '',
      city: '',
    },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await submitInterest(data);
      if (result.success) {
        setIsSuccess(true);
      } else {
        toast({
          title: 'Submission Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    });
  }
  
  if (isSuccess) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader className="items-center text-center">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full mb-2">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle>Thank You for Connecting!</CardTitle>
            <CardDescription>We've received your details and will be in touch shortly.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>ACE TECH Hyderabad 2026</CardTitle>
        <CardDescription>
          Visit our booth at HITEX Exhibition Centre (Jan 23-25). Please leave your details below for us to connect with you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@example.com" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Designation" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Your City" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-semibold" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
