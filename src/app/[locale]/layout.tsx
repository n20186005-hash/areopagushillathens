import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://areopagushillathens.com';

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const elUrl = `${baseUrl}`;
  const selfUrl = locale === 'el' ? `${baseUrl}` : `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'el': elUrl,
        'x-default': elUrl,
      },
    },
    openGraph: {
      title: `${messages.meta.ogTitle || messages.meta.title}`,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Areopagus Hill",
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : 'el_GR',
      type: 'website',
      images: [
        {
          url: '/gallery/areopagus-hill-1.jpg',
          width: 1200,
          height: 630,
          alt: 'Areopagus Hill (Mars Hill) Athens - Best free sunset viewpoint near the Acropolis',
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'el' ? 'el-GR' : 'en'} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={locale === 'el' ? 'https://areopagushillathens.com' : `https://areopagushillathens.com/${locale}`} />
        <meta property="og:image" content="https://areopagushillathens.com/gallery/areopagus-hill-1.jpg" />
        <meta property="og:image:alt" content="Areopagus Hill (Λόφος Αρείου Πάγου) in Athens, Greece" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#d4a853" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HXM22WWPKP');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "TouristAttraction",
                  "@id": "https://areopagushillathens.com/#attraction",
                  "name": "Areopagus Hill (Λόφος Αρείου Πάγου)",
                  "alternateName": ["Areopagus Hill", "Mars Hill Athens", "Mars Hill", "Άρειος Πάγος"],
                  "description": "Comprehensive visitor guide to Areopagus Hill in Athens, Attica, Greece. Historic rock outcropping northwest of the Acropolis, famous for the ancient court, Apostle Paul's sermon, and panoramic sunset views.",
                  "url": "https://areopagushillathens.com",
                  "image": [
                    "https://areopagushillathens.com/gallery/areopagus-hill-1.jpg",
                    "https://areopagushillathens.com/gallery/areopagus-hill-2.jpg",
                    "https://areopagushillathens.com/gallery/areopagus-hill-3.jpg"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Theorias 21",
                    "addressLocality": "Athens",
                    "addressRegion": "Attica",
                    "postalCode": "105 55",
                    "addressCountry": "GR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.972365,
                    "longitude": 23.720657
                  },
                  "hasMap": "https://maps.app.goo.gl/Dupzqbpja8DxWKSH8",
                  "sameAs": [
                    "https://maps.app.goo.gl/Dupzqbpja8DxWKSH8",
                    "https://www.visitgreece.gr/"
                  ],
                  "isAccessibleForFree": true,
                  "publicAccess": true,
                  "openingHours": "Mo-Su 00:00-23:59",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "5603"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Do I need a ticket to visit Areopagus Hill?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No. Areopagus Hill (Mars Hill) is a completely free public site, open 24 hours a day, all year round. You do not need a ticket for the Acropolis to visit it."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the best time of day to visit Areopagus Hill?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The best time is sunset, when the Acropolis and the city are bathed in golden light. Arrive about 45 minutes before sunset to secure a good spot on the rock. In summer, mornings and evenings help you avoid the midday heat."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "How do I get to Areopagus Hill from Monastiraki?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Walk from Monastiraki or Thisseio metro stations (Lines 1 and 3). It is about a 10-15 minute walk from Plaka or Monastiraki to the hill entrance on Theorias Street, near the Roman Agora."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is it safe to climb to the top at night?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "There is some lighting at night, but the rocks are very slippery and there are no guardrails at the edges. We recommend bringing a flashlight, wearing non-slip shoes, and paying close attention to your footing. The night view of Athens is stunning, but safety comes first."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Are there restrooms or food vendors on the hill?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "There are no commercial facilities or public restrooms on the hill itself. It is advisable to use the facilities and grab a bite in the nearby Plaka district or at cafes around the Acropolis beforehand."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Is the climb difficult? Is it suitable for the elderly or children?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The climb is not very high, and there are metal and stone steps available, making it relatively easy for most fitness levels. However, due to the uneven and extremely slippery rocks, elderly visitors and children should be very careful and may need assistance."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What other attractions are near Areopagus Hill?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "It sits in the heart of Athens' archaeological district. Within a 3-8 minute walk you'll find the Acropolis of Athens, the Roman Agora, and the Plaka district - easy to combine into a single half-day walking route."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What is the history of Areopagus Hill (Mars Hill)?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Areopagus Hill was the seat of the highest criminal court in ancient Athens, and in mythology Ares was tried here. Around 51 AD, the Apostle Paul delivered his famous 'Unknown God' sermon here, making it a key biblical site also known as Mars Hill."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
