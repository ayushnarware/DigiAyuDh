import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SectionHeader } from '@/components/common/section-header';
import { contactServiceOptions } from '@/constants/landing.data';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('Project brief sent! We\'ll reply within one business day.');
    reset();
    console.info('Contact form submission (dummy):', data);
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="grid lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <SectionHeader
                badge="Start something great"
                title="Have an idea? Let's make it real."
                description="Tell us where you are and where you want to go. We'll reply with honest recommendations within one business day."
                align="left"
              />

              <ul className="mt-8 space-y-3">
                {[
                  'Free 30-minute strategy call',
                  'No-pressure, practical advice',
                  'Clear scope and next steps',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="size-4 text-green-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-t border-border p-8 lg:border-l lg:border-t-0 lg:p-12"
            >
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Your name" {...register('name')} />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>What do you need?</Label>
                  <Select onValueChange={(v) => setValue('service', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactServiceOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-xs text-destructive">{errors.service.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your idea</Label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Brief description of your project..."
                    className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button variant="brand" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send project brief'}
                  <ArrowUpRight className="size-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our privacy policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
