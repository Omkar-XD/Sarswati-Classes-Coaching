import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Monitor, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { testimonials } from "@/data/mockData";
import heroStudentsImg from "@/assets/Screenshot 2026-02-24 165054.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const { testSeries, heroPosters } = useApp();
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState("");
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const openEnroll = (target: string) => {
    setEnrollTarget(target);
    setEnrollOpen(true);
  };

  const enabledPosters = heroPosters.filter((p) => p.enabled);

  useEffect(() => {
    if (!enabledPosters.length) return;
    const timer = setTimeout(() => {
      setCurrentPosterIndex((prev) => (prev + 1) % enabledPosters.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentPosterIndex, enabledPosters.length]);

  const goToNextPoster = () => {
    setCurrentPosterIndex((prev) => (prev + 1) % enabledPosters.length);
  };

  const goToPrevPoster = () => {
    setCurrentPosterIndex((prev) => (prev - 1 + enabledPosters.length) % enabledPosters.length);
  };

  return (
    <Layout>
      <section className="relative bg-secondary overflow-hidden">
        {/* Hero Poster */}
        {enabledPosters.length > 0 && (
          <div className="pointer-events-none absolute inset-x-0 top-4 md:top-6 z-20">
            <div className="pointer-events-auto container mx-auto px-4">
              <div
                className="relative group"
                onTouchStart={(e) => (touchStartXRef.current = e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  const start = touchStartXRef.current;
                  if (start == null) return;
                  const delta = e.changedTouches[0].clientX - start;
                  if (delta > 40) goToPrevPoster();
                  if (delta < -40) goToNextPoster();
                  touchStartXRef.current = null;
                }}
              >
                <div className="bg-background rounded-xl shadow-xl border p-2">
                  <Link to={`/test-series/${enabledPosters[currentPosterIndex].testSeriesId}`}>
                    <motion.img
                      key={enabledPosters[currentPosterIndex].id}
                      src={enabledPosters[currentPosterIndex].imageUrl}
                      className="w-full h-32 md:h-40 object-cover rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    />
                  </Link>

                  {enabledPosters.length > 1 && (
                    <>
                      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                        <button
                          type="button"
                          onClick={goToPrevPoster}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={goToNextPoster}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
                        >
                          ›
                        </button>
                      </div>

                      <div className="absolute -bottom-3 inset-x-0 flex justify-center gap-1.5">
                        {enabledPosters.map((p, index) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setCurrentPosterIndex(index)}
                            className={`h-1.5 rounded-full transition-[width,transform,opacity,background-color] duration-300 ease-out ${
                              index === currentPosterIndex
                                ? "w-6 bg-sky-500 opacity-100 scale-110"
                                : "w-2 bg-sky-200 opacity-60 scale-100"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div className="container mx-auto px-4 pt-44 pb-20 md:pt-52 md:pb-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-5xl font-bold">
                Your Path to <span className="text-primary">Academic Excellence</span>
              </h1>
              <p className="mt-4 text-muted-foreground">
                Expert coaching for CBSE, SSC, JEE, CET & NEET.
              </p>
              <div className="mt-6 flex gap-4">
                <Link to="/courses"><Button>Explore Courses</Button></Link>
                <Link to="/test-series"><Button variant="outline">Test Series</Button></Link>
              </div>
            </motion.div>

            <motion.img
              src={heroStudentsImg}
              alt="Students"
              className="rounded-2xl shadow-2xl"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
            />
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Programs Overview</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Structured programs for school foundation, science streams and competitive exams.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">Foundation (8th - 10th)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Strong conceptual clarity in Maths and Science for CBSE and SSC students.
                </p>
                <Link to="/courses">
                  <Button size="sm" variant="outline" className="gap-1">
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <Monitor className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">Science (11th - 12th)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  PCMB coaching with a balance of board preparation and entrance orientation.
                </p>
                <Link to="/courses">
                  <Button size="sm" variant="outline" className="gap-1">
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <Monitor className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold text-lg">Competitive Exams</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Focused batches for JEE, NEET and CET with regular test series.
                </p>
                <Link to="/test-series">
                  <Button size="sm" variant="outline" className="gap-1">
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Test Series Highlight */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Test Series Highlights</h2>
              <p className="text-muted-foreground">
                Practice with exam-pattern tests for CBSE and CET.
              </p>
            </div>
            <Link to="/test-series">
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testSeries.slice(0, 3).map((ts, index) => (
              <Card key={ts.id} className="card-hover h-full flex flex-col">
                <img
                  src={ts.image}
                  alt={ts.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <CardContent className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">{ts.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {ts.overview}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openEnroll(ts.title)}>
                      Enroll Now
                    </Button>
                    <Link to={`/test-series/${ts.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Students Say</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Hear from students who have trusted Saraswati Classes for their academic journey.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover border border-sky-100"
                  />
                  <p className="text-sm text-muted-foreground">“{t.text}”</p>
                  <div className="mt-1">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.course}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-background shadow-lg px-6 py-10 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to start your journey?
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Explore our curated courses and test series to kickstart your preparation
                with expert guidance.
              </p>
            </div>
            <Link to="/courses">
              <Button size="lg" className="gap-2">
                View Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <EnrollmentModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseOrSeries={enrollTarget}
      />
    </Layout>
  );
};

export default Index;