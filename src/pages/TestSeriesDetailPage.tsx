import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ClipboardList, Star, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const TestSeriesDetailPage = () => {
  const { id } = useParams();
  const { testSeries } = useApp();
  const { currentStudent } = useAuth();

  const ts = testSeries.find((t) => t.id === id);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const isApproved =
    !!(currentStudent && ts && currentStudent.approvedTestSeries.includes(ts.id));

  if (!ts)
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Test Series not found</h1>
          <Link to="/test-series">
            <Button className="mt-4">Back to Test Series</Button>
          </Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <Link
          to="/test-series"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Test Series
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-3">{ts.title}</h1>
              <p className="text-muted-foreground">{ts.overview}</p>
            </div>

            {isApproved ? (
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" /> Demo Test
                </h2>

                {ts.demoTestLink ? (
                  <Button asChild variant="outline" size="sm">
                    <a href={ts.demoTestLink} target="_blank" rel="noopener noreferrer">
                      Open Demo Test
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Demo test link will be shared soon.
                  </p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" /> Features
                  </h2>
                  <ul className="space-y-2">
                    {ts.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Test Pattern
                  </h2>
                  <p className="text-sm text-muted-foreground">{ts.testPattern}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" /> Benefits
                  </h2>
                  <ul className="space-y-2">
                    {ts.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <div>
            <Card className="sticky top-20">
              <img
                src={ts.image}
                alt={ts.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold">{ts.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {ts.features.length} features included
                </p>

                {!isApproved && (
                  <Button className="w-full" onClick={() => setEnrollOpen(true)}>
                    Enroll Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <EnrollmentModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        courseOrSeries={ts.title}
      />
    </Layout>
  );
};

export default TestSeriesDetailPage;