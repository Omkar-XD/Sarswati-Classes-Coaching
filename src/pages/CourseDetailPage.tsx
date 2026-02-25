import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, PlayCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import EnrollmentModal from "@/components/EnrollmentModal";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { courses } = useApp();
  const { currentStudent } = useAuth();

  const course = courses.find((c) => c.id === id);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const isApproved =
    !!(currentStudent && course && currentStudent.approvedCourses.includes(course.id));

  if (!course)
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
          <Link to="/courses">
            <Button className="mt-4">Back to Courses</Button>
          </Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.mode}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
              <p className="text-muted-foreground">{course.fullDescription}</p>
            </div>

            {course.demoVideoUrl && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Demo Lecture</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src={course.demoVideoUrl}
                    title="Demo lecture"
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Course Chapters
              </h2>

              {isApproved ? (
                <div className="space-y-2">
                  {course.chapters.map((ch, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="text-sm font-medium text-primary bg-secondary w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <div>
                              <span className="font-medium text-sm">{ch.title}</span>
                              {ch.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {ch.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <a
                            href={ch.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-sm flex items-center gap-1 hover:underline shrink-0"
                          >
                            <PlayCircle className="h-4 w-4" /> Watch
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Enroll and get approved to view detailed chapter list and private video links.
                </p>
              )}
            </div>
          </div>

          <div>
            <Card className="sticky top-20">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-5 space-y-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Mode:</strong> {course.mode}</p>
                  <p><strong>Chapters:</strong> {course.chapters.length}</p>
                  <p><strong>Category:</strong> {course.category}</p>
                </div>

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
        courseOrSeries={course.title}
      />
    </Layout>
  );
};

export default CourseDetailPage;