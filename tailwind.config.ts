import { Config } from 'tailwindcss/types/config';
import { BREAKPOINTS } from './lib/constants';
/** @type {import('tailwindcss').Config} */

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      sm: `${BREAKPOINTS.SM}px`,
      md: `${BREAKPOINTS.MD}px`,
      lg: `${BREAKPOINTS.LG}px`,
      xl: `${BREAKPOINTS.XL}px`,
      '2xl': `${BREAKPOINTS['2XL']}px`,
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        '3xs': ['.5rem', '.625rem'],
        '2xs': ['.625rem', '.75rem'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-bullets': theme('colors.foreground'),
            '--tw-prose-invert-counters': theme('colors.foreground'),
            // ...
          },
        },
        // sm: {
        //   css: {
        //     color: '#333',
        //     a: {
        //       color: '#3182ce',
        //       '&:hover': {
        //         color: '#2c5282',
        //       },
        //     },
        //     '> ul > li p ': {
        //       marginTop: 0,
        //       marginBottom: 0,
        //     },
        //     '> ol > li p': {
        //       marginTop: 0,
        //       marginBottom: 0,
        //     },
        //   },
        // },
      }),
      boxShadow: {
        'inner-outline': 'inset 0 0 0 2px hsl(var(--ring))',
      },

      colors: {
        brand: {
          400: '#EF8933',
          500: '#EE7231',
          600: '#EC5C31',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        subtle: {
          DEFAULT: 'hsl(var(--subtle))',
          foreground: 'hsl(var(--subtle-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
