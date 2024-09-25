/* "use client";
import { DbUserProvider } from "@/app/context/db-user-context";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { BooksSearchProvider } from "./context/books-search-context";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);

  return (
    <ClerkProvider>
      <DbUserProvider>
        <BooksSearchProvider>
          <html lang="en">
             <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                className="absolute inset-0 z-0"
                options={{
                  background: {
                    color: {
                      value: "#0d47a1",
                    },
                  },
                  fpsLimit: 120,
                  interactivity: {
                    events: {
                      onClick: {
                        enable: true,
                        mode: "push",
                      },
                      onHover: {
                        enable: true,
                        mode: "repulse",
                      },
                      resize: true,
                    },
                    modes: {
                      push: {
                        quantity: 4,
                      },
                      repulse: {
                        distance: 200,
                        duration: 0.4,
                      },
                    },
                  },
                  particles: {
                    color: {
                      value: "#ffffff",
                    },
                    links: {
                      color: "#ffffff",
                      distance: 150,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                    },
                    move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                        default: "bounce",
                      },
                      random: false,
                      speed: 6,
                      straight: false,
                    },
                    number: {
                      density: {
                        enable: true,
                        area: 800,
                      },
                      value: 80,
                    },
                    opacity: {
                      value: 0.5,
                    },
                    shape: {
                      type: "circle",
                    },
                    size: {
                      value: { min: 1, max: 5 },
                    },
                  },
                  detectRetina: true,
                }}
              />
            <body className=" h-screen flex flex-col bg-neutral-300 overflow-y-hidden">
              <Header />
              <main style={{ height: 'calc(100% - 130px)', zIndex: 10 }}>
                {children}
              </main>
              <Toaster />
              <Footer />
            </body>
          </html>
        </BooksSearchProvider>
      </DbUserProvider>
    </ClerkProvider>
  );
}
 */
"use client";
import { DbUserProvider } from "@/app/context/db-user-context";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { BooksSearchProvider } from "./context/books-search-context";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <ClerkProvider>
      <DbUserProvider>
        <BooksSearchProvider>
          <html lang="en">
            <body className="relative h-screen flex flex-col bg-neutral-300 overflow-y-hidden">
              {/* Particles background */}
              <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                className="particles-background"
                options={{
                  background: {
                    color: {
                      value: "#e0f2fe",
                    },
                  },
                  fpsLimit: 120,
                  interactivity: {
                    events: {
                      onClick: {
                        enable: true,
                        mode: "push",
                      },
                      onHover: {
                        enable: true,
                        mode: "repulse",
                      },
                      resize: true,
                    },
                    modes: {
                      push: {
                        quantity: 2,
                      },
                      repulse: {
                        distance: 200,
                        duration: 0.4,
                      },
                    },
                  },
                  particles: {
                    color: {
                      value: "#ffffff",
                    },
                    links: {
                      color: "#ffffff",
                      distance: 150,
                      enable: true,
                      opacity: 0.5,
                      width: 1,
                    },
                    number: {
                      density: {
                        enable: true,
                        area: 800,
                      },
                      value: 20,
                    },
                    opacity: {
                      value: 0.5,
                    },
                    move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                        default: "bounce",
                      },
                      random: false,
                      speed: 2,
                      straight: false,
                    },
                    shape: {
                      type: "image",
                      image: [
                        { src: '/orange-book.png', width: 40, height: 40 },
                        { src: '/blue-book.png', width: 40, height: 40 }
                      ],
                    },
                    size: {
                      value: { min: 20, max: 40 },
                    },
                  },
                  detectRetina: true,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col h-screen">
                <Header />
                <main style={{ height: "calc(100% - 130px)", zIndex: 10 }}>
                  {children}
                </main>
                <Toaster />
                <Footer />
              </div>
            </body>
          </html>
        </BooksSearchProvider>
      </DbUserProvider>
    </ClerkProvider>
  );
}
