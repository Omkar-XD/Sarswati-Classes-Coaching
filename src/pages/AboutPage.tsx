import { motion } from "framer-motion";
import { Users, Award, BookOpen, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const AboutPage = () => (
  <Layout>
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-2">About Saraswati Classes</motion.h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Founded with a mission to provide quality education, Saraswati Classes has been helping students achieve academic excellence for over a decade. Our experienced faculty, structured curriculum, and personalized approach set us apart.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "500+ Students", desc: "Trusted by hundreds of families" },
            { icon: Award, label: "95% Results", desc: "Consistently top results" },
            { icon: BookOpen, label: "10+ Courses", desc: "Comprehensive programs" },
            { icon: Target, label: "Expert Faculty", desc: "IIT/NIT experienced teachers" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <s.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold">{s.label}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              To provide accessible, high-quality education that empowers every student to reach their full potential. We believe in nurturing curiosity, building confidence, and developing critical thinking skills.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <p className="text-muted-foreground">
              We combine traditional teaching methods with modern technology. Small batch sizes ensure personalized attention, while regular assessments track progress. Our doubt-clearing sessions and mentoring programs provide comprehensive support.
            </p>
          </div>
          <img src="https://placehold.co/500x350/0ea5e9/ffffff?text=Our+Team" alt="Our team" className="rounded-xl w-full" />
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
