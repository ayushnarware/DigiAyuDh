import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeader } from "@/components/common/section-header";
import { contactServiceOptions } from "@/constants/landing.data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key:
            import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
            "65f00d41-7561-4d9f-afc6-56ba1b83724c",

          subject: "New Project Inquiry",
          from_name: "Portfolio Website",

          name: data.name,
          email: data.email,
          service: data.service,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("✅ Message sent successfully!");
        reset();
      } else {
        toast.error(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="grid lg:grid-cols-2">
            {/* Left Side */}
            <div className="p-8 lg:p-12">
              <SectionHeader
                badge="Start something great"
                title="Have an idea? Let's make it real."
                description="Tell us about your project and we'll get back to you within one business day."
                align="left"
              />

              <ul className="mt-8 space-y-3">
                {[
                  "Free 30-minute strategy call",
                  "No-pressure, practical advice",
                  "Clear scope and next steps",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="size-4 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border-t border-border p-8 lg:border-l lg:border-t-0 lg:p-12"
            >
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Service</Label>

                  <Select
                    onValueChange={(value) =>
                      setValue("service", value, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>

                    <SelectContent>
                      {contactServiceOptions.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.service && (
                    <p className="text-xs text-destructive">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>

                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    {...register("message")}
                  />

                  {errors.message && (
                    <p className="text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Project Brief"}
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Your information is secure and will never be shared.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}