import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, BookOpen, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";

const StudentDashboard = () => {
  const { currentStudent, logout } = useAuth();
  const { courses, testSeries } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  const approvedCourses = courses.filter((c) => currentStudent?.approvedCourses.includes(c.id));
  const approvedTs = testSeries.filter((t) => currentStudent?.approvedTestSeries.includes(t.id));

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-bold text-lg">Student Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {currentStudent?.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-1" /> Logout</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Courses */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> My Courses</h2>
          {approvedCourses.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground">No courses assigned yet.</CardContent></Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedCourses.map((c) => (
                <Card key={c.id} className="card-hover">
                  <img src={c.image} alt={c.title} className="w-full h-36 object-cover rounded-t-lg" />
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">{c.category}</Badge>
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.chapters.length} chapters</p>
                    <Link to={`/courses/${c.id}`}><Button size="sm" className="mt-3 w-full">View Course</Button></Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>

        {/* Test Series */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-primary" /> My Test Series</h2>
          {approvedTs.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground">No test series assigned yet.</CardContent></Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedTs.map((ts) => (
                <Card key={ts.id} className="card-hover">
                  <img src={ts.image} alt={ts.title} className="w-full h-36 object-cover rounded-t-lg" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{ts.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ts.features.length} features</p>
                    <Link to={`/test-series/${ts.id}`}><Button size="sm" className="mt-3 w-full">View Details</Button></Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
