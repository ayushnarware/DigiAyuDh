import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroDashboardMockup } from '@/components/common/hero-dashboard-mockup';
import { APP_CONFIG } from '@/config/app.config';

const avatars = ['AK', 'RM', 'NS', 'VT', 'PL'];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-400"
          >
            ✦ {APP_CONFIG.tagline}
          </motion.span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              We build digital products that{' '}
              <span className="text-gradient">move businesses</span> forward.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-xl text-lg text-muted-foreground"
            >
              From a powerful first website to a complete business operating system—we design,
              build and launch digital experiences made for real growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button variant="brand" size="lg" asChild >
                <a href="#work">
                  Build my product
                  <ArrowUpRight className="size-4 text-sm text-purple-400 hover:text-purple-300" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#work" className='text-purple-400 hover:text-purple-300'>
                  <Play className="size-4 text-sm " />
                  See our work
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {avatars.map((a) => (
                  <div
                    key={a}
                    className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-violet-500 to-purple-600 text-[10px] font-bold text-white"
                  >
                    {a}
                  </div>
                ))}
                <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground">
                  +
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">★★★★★ 4.9</p>
                <p className="text-xs text-muted-foreground">
                  Trusted by 120+ growing businesses
                </p>
              </div>
            </motion.div>
          </div>

          <HeroDashboardMockup className="mx-auto w-full max-w-lg lg:max-w-none" />
        </div>
      </div>
    </section>
  );
}
