import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const TestSeriesPage = () => {
  const { testSeries } = useApp();
  const { currentStudent } = useAuth();

  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState("");

  const openEnroll = (t: string) => {
    setEnrollTarget(t);
    setEnrollOpen(true);
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-2">
            Test Series
          </motion.h1>

          <p className="text-muted-foreground mb-8">
            Practice with real exam-pattern tests and boost your confidence
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testSeries.map((ts, i) => (
              <motion.div
                key={ts.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="card-hover h-full flex flex-col">
                  <img
                    src={ts.image}
                    alt={ts.title}
                    className="w-full h-44 object-cover rounded-t-lg"
                  />

                  <CardContent className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg mb-2">{ts.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                      {ts.overview}
                    </p>

                    <div className="flex gap-2">
                      {!(currentStudent && currentStudent.approvedTestSeries.includes(ts.id)) && (
                        <Button size="sm" onClick={() => openEnroll(ts.title)}>
                          Enroll Now
                        </Button>
                      )}

                      <Link to={`/test-series/${ts.id}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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

export default TestSeriesPage;