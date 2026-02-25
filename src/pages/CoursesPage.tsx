import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const categories = ["All", "Foundation", "Science", "Competitive"] as const;

const CoursesPage = () => {
  const { courses } = useApp();
  const { currentStudent } = useAuth();

  const [filter, setFilter] = useState<string>("All");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTarget, setEnrollTarget] = useState("");

  const filtered = filter === "All" ? courses : courses.filter((c) => c.category === filter);

  const openEnroll = (t: string) => {
    setEnrollTarget(t);
    setEnrollOpen(true);
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-2">
            Our Courses
          </motion.h1>
          <p className="text-muted-foreground mb-8">Find the perfect program for your academic journey</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => setFilter(c)}>
                {c}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <motion.div key={course.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="card-hover h-full flex flex-col">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <Badge variant="outline">{course.mode}</Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{course.description}</p>

                    <div className="flex gap-2">
                      {!currentStudent?.approvedCourses.includes(course.id) && (
                        <Button size="sm" onClick={() => openEnroll(course.title)}>
                          Enroll Now
                        </Button>
                      )}

                      <Link to={`/courses/${course.id}`}>
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

      <EnrollmentModal open={enrollOpen} onClose={() => setEnrollOpen(false)} courseOrSeries={enrollTarget} />
    </Layout>
  );
};

export default CoursesPage;