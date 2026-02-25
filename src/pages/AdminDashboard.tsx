import { useState, useCallback, ChangeEvent, DragEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Users, BookOpen, ClipboardList, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useAuth } from "@/context/AuthContext";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

import type { Course, TestSeries, EnrollmentRequest, StudentUser, HeroPoster } from "@/data/mockData";

type Tab = "requests" | "courses" | "test-series";

interface CredentialFormState {
  email: string;
  password: string;
}

interface NewCourseForm {
  title: string;
  category: Course["category"] | "";
  mode: Course["mode"] | "";
  shortDescription: string;
  image: string;
}

interface NewTestSeriesForm {
  title: string;
  overview: string;
  image: string;
  demoTestLink: string;
  heroPosterThumbnail: string;
  showInHeroPoster: boolean;
}

interface NewHeroPosterForm {
  imageUrl: string;
  testSeriesId: string;
}

const AdminDashboard = () => {
  const { logout } = useAuth();
  const {
    courses,
    addCourse,
    deleteCourse,
    testSeries,
    addTestSeries,
    deleteTestSeries,
    heroPosters,
    addHeroPoster,
    enrollments,
    updateEnrollmentStatus,
    updateEnrollment,
    students,
    addStudent,
    updateStudent,
  } = useApp();

  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("requests");

  const [credModalOpen, setCredModalOpen] = useState(false);
  const [credEnrollment, setCredEnrollment] = useState<EnrollmentRequest | null>(null);
  const [credStudent, setCredStudent] = useState<StudentUser | null>(null);
  const [credForm, setCredForm] = useState<CredentialFormState>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [newCourseForm, setNewCourseForm] = useState<NewCourseForm>({
    title: "",
    category: "",
    mode: "",
    shortDescription: "",
    image: "",
  });

  const [newTestSeriesForm, setNewTestSeriesForm] = useState<NewTestSeriesForm>({
    title: "",
    overview: "",
    image: "",
    demoTestLink: "",
    heroPosterThumbnail: "",
    showInHeroPoster: false,
  });

  const [newHeroPosterForm, setNewHeroPosterForm] = useState<NewHeroPosterForm>({
    imageUrl: "",
    testSeriesId: "",
  });

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    kind: "course" | "test-series";
    id: string;
    title: string;
  } | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openDeleteConfirm = (target: { kind: "course" | "test-series"; id: string; title: string }) => {
    setDeleteTarget(target);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.kind === "course") {
      deleteCourse(deleteTarget.id);
      toast({ title: "Course deleted", description: "Course removed permanently from demo state." });
    } else {
      deleteTestSeries(deleteTarget.id);
      toast({ title: "Test series deleted", description: "Test series removed permanently from demo state." });
    }

    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  const resolveEnrollmentTargets = useCallback(
    (enrollment: EnrollmentRequest) => {
      const course = courses.find((c) => c.title === enrollment.courseOrSeries);
      const series = testSeries.find((t) => t.title === enrollment.courseOrSeries);
      return { course, series };
    },
    [courses, testSeries]
  );

  const attachEnrollmentToStudent = useCallback(
    (enrollment: EnrollmentRequest, student: StudentUser) => {
      const { course, series } = resolveEnrollmentTargets(enrollment);
      const updates: Partial<StudentUser> = {};

      if (course && !student.approvedCourses.includes(course.id)) {
        updates.approvedCourses = [...student.approvedCourses, course.id];
      }

      if (series && !student.approvedTestSeries.includes(series.id)) {
        updates.approvedTestSeries = [...student.approvedTestSeries, series.id];
      }

      if (Object.keys(updates).length > 0) {
        updateStudent(student.id, updates);
      }
    },
    [resolveEnrollmentTargets, updateStudent]
  );

  const handleApprove = (enrollment: EnrollmentRequest) => {
    const existingStudent = students.find((s) => s.email === enrollment.email);

    if (existingStudent) {
      attachEnrollmentToStudent(enrollment, existingStudent);

      updateEnrollment(enrollment.id, {
        status: "Approved",
        studentId: existingStudent.id,
        username: existingStudent.email,
      });

      updateEnrollmentStatus(enrollment.id, "Approved");

      toast({
        title: "Enrollment approved",
        description: "Existing student credentials reused and access updated.",
      });

      return;
    }

    setCredEnrollment(enrollment);
    setCredStudent(null);
    setCredForm({ email: enrollment.email, password: "" });
    setShowPassword(false);
    setCredModalOpen(true);
  };

  const openCredentialViewer = (enrollment: EnrollmentRequest) => {
    if (!enrollment.studentId) return;
    const student = students.find((s) => s.id === enrollment.studentId);
    if (!student) return;

    setCredEnrollment(enrollment);
    setCredStudent(student);
    setCredForm({
      email: student.email,
      password: student.password,
    });
    setShowPassword(false);
    setCredModalOpen(true);
  };

  const finalizeEnrollmentApproval = (enrollment: EnrollmentRequest, student: StudentUser, password: string) => {
    attachEnrollmentToStudent(enrollment, student);

    updateEnrollment(enrollment.id, {
      status: "Approved",
      studentId: student.id,
      username: student.email,
      password,
    });

    updateEnrollmentStatus(enrollment.id, "Approved");
  };

  const handleCredentialSubmit = () => {
    if (!credEnrollment) return;

    const trimmedEmail = credForm.email.trim();
    const trimmedPassword = credForm.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast({ title: "Missing details", description: "Email and password are required.", variant: "destructive" });
      return;
    }

    if (credStudent) {
      const updatedStudent: StudentUser = {
        ...credStudent,
        email: trimmedEmail,
        password: trimmedPassword,
      };

      updateStudent(credStudent.id, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      finalizeEnrollmentApproval(credEnrollment, updatedStudent, trimmedPassword);

      toast({
        title: "Credentials updated",
        description: "Student login details have been updated.",
      });
    } else {
      const { course, series } = resolveEnrollmentTargets(credEnrollment);

      const approvedCourses: string[] = [];
      const approvedTestSeries: string[] = [];

      if (course) approvedCourses.push(course.id);
      if (series) approvedTestSeries.push(series.id);

      const newStudent = addStudent({
        email: trimmedEmail,
        password: trimmedPassword,
        name: credEnrollment.name,
        approvedCourses,
        approvedTestSeries,
      });

      finalizeEnrollmentApproval(credEnrollment, newStudent, trimmedPassword);

      toast({
        title: "Student approved",
        description: "New student credentials created.",
      });
    }

    setCredModalOpen(false);
    setCredEnrollment(null);
    setCredStudent(null);
  };

  const tabs = [
    { id: "requests", label: "Enrollment Requests", icon: Users },
    { id: "courses", label: "Courses Manager", icon: BookOpen },
    { id: "test-series", label: "Test Series Manager", icon: ClipboardList },
  ] as const;

  const handleNewCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseForm.title || !newCourseForm.category || !newCourseForm.mode) {
      toast({ title: "Missing details", description: "Title, category and mode are required.", variant: "destructive" });
      return;
    }

    const payload: Omit<Course, "id"> = {
      id: "", // not used, will be overridden in context
      title: newCourseForm.title.trim(),
      category: newCourseForm.category as Course["category"],
      description: newCourseForm.shortDescription.trim() || newCourseForm.title.trim(),
      fullDescription: newCourseForm.shortDescription.trim() || newCourseForm.title.trim(),
      mode: newCourseForm.mode as Course["mode"],
      image:
        newCourseForm.image.trim() ||
        "https://placehold.co/400x250/0ea5e9/ffffff?text=Saraswati+Course",
      chapters: [],
      demoVideoUrl: "",
    };

    const { id, ...rest } = payload;
    addCourse(rest);

    setNewCourseForm({
      title: "",
      category: "",
      mode: "",
      shortDescription: "",
      image: "",
    });

    toast({ title: "Course added", description: "New course saved successfully." });
  };

  const handleNewTestSeriesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestSeriesForm.title || !newTestSeriesForm.overview) {
      toast({
        title: "Missing details",
        description: "Title and overview are required.",
        variant: "destructive",
      });
      return;
    }

    const imageUrl =
      newTestSeriesForm.image.trim() ||
      "https://placehold.co/400x250/0ea5e9/ffffff?text=Saraswati+Test+Series";
    const heroThumb =
      newTestSeriesForm.heroPosterThumbnail.trim() || imageUrl;

    const payload: Omit<TestSeries, "id"> = {
      id: "",
      title: newTestSeriesForm.title.trim(),
      overview: newTestSeriesForm.overview.trim(),
      features: [],
      testPattern: "",
      benefits: [],
      image: imageUrl,
      ctaLabel: "Enroll Now",
      demoTestLink: newTestSeriesForm.demoTestLink.trim(),
      heroPosterThumbnail: heroThumb,
      showInHeroPoster: newTestSeriesForm.showInHeroPoster,
    };

    const { id, ...rest } = payload;
    const created = addTestSeries(rest);

    if (newTestSeriesForm.showInHeroPoster) {
      const posterPayload: Omit<HeroPoster, "id" | "createdAt"> = {
        imageUrl: heroThumb,
        testSeriesId: created.id,
        enabled: true,
      };

      addHeroPoster(posterPayload);
    }

    setNewTestSeriesForm({
      title: "",
      overview: "",
      image: "",
      demoTestLink: "",
      heroPosterThumbnail: "",
      showInHeroPoster: false,
    });

    toast({ title: "Test series added", description: "New test series saved." });
  };

  const handleHeroPosterImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setNewHeroPosterForm((prev) => ({ ...prev, imageUrl: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleHeroPosterFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleHeroPosterImageFile(file);
    }
  };

  const handleHeroPosterDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleHeroPosterImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleHeroPosterDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleHeroPosterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeroPosterForm.imageUrl || !newHeroPosterForm.testSeriesId) {
      toast({
        title: "Missing details",
        description: "Poster image and linked test series are required.",
        variant: "destructive",
      });
      return;
    }

    const payload: Omit<HeroPoster, "id" | "createdAt"> = {
      imageUrl: newHeroPosterForm.imageUrl,
      testSeriesId: newHeroPosterForm.testSeriesId,
      enabled: true,
    };

    addHeroPoster(payload);

    setNewHeroPosterForm({
      imageUrl: "",
      testSeriesId: "",
    });

    toast({ title: "Poster added", description: "Hero poster saved for homepage slider." });
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="bg-background border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-bold text-lg">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <Button
              key={t.id}
              variant={activeTab === t.id ? "default" : "outline"}
              onClick={() => setActiveTab(t.id as Tab)}
            >
              <t.icon className="h-4 w-4 mr-1" /> {t.label}
            </Button>
          ))}
        </div>

        {activeTab === "requests" && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course/Test</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-sm text-muted-foreground py-6">
                        No enrollment requests yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {enrollments.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>{e.email}</TableCell>
                      <TableCell>{e.courseOrSeries}</TableCell>
                      <TableCell>
                        <Badge>{e.status}</Badge>
                      </TableCell>
                      <TableCell>{e.username || "-"}</TableCell>
                      <TableCell>{e.password ? "••••••••" : "-"}</TableCell>
                      <TableCell className="space-x-2 text-right">
                        {e.status === "Pending" && (
                          <Button size="sm" onClick={() => handleApprove(e)}>
                            Approve
                          </Button>
                        )}
                        {e.studentId && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openCredentialViewer(e)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Credentials
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Courses Manager
                  </h2>
                </div>
                <form onSubmit={handleNewCourseSubmit} className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Title</Label>
                    <Input
                      id="course-title"
                      value={newCourseForm.title}
                      onChange={(e) =>
                        setNewCourseForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-category">Category</Label>
                    <select
                      id="course-category"
                      className="border rounded-md h-9 px-2 text-sm bg-background"
                      value={newCourseForm.category}
                      onChange={(e) =>
                        setNewCourseForm((prev) => ({
                          ...prev,
                          category: e.target.value as Course["category"] | "",
                        }))
                      }
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Foundation">Foundation</option>
                      <option value="Science">Science</option>
                      <option value="Competitive">Competitive</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-mode">Mode</Label>
                    <select
                      id="course-mode"
                      className="border rounded-md h-9 px-2 text-sm bg-background"
                      value={newCourseForm.mode}
                      onChange={(e) =>
                        setNewCourseForm((prev) => ({
                          ...prev,
                          mode: e.target.value as Course["mode"] | "",
                        }))
                      }
                      required
                    >
                      <option value="">Select mode</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Online / Offline">Online / Offline</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-image">Image URL</Label>
                    <Input
                      id="course-image"
                      value={newCourseForm.image}
                      onChange={(e) =>
                        setNewCourseForm((prev) => ({ ...prev, image: e.target.value }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="course-desc">Short Description</Label>
                    <Input
                      id="course-desc"
                      value={newCourseForm.shortDescription}
                      onChange={(e) =>
                        setNewCourseForm((prev) => ({
                          ...prev,
                          shortDescription: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" /> Add Course
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Existing Courses</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((c) => (
                    <Card key={c.id}>
                      <CardContent className="p-4 space-y-1">
                        <p className="font-semibold text-sm">{c.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.category} • {c.mode}
                        </p>
                        <div className="pt-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="w-full"
                            onClick={() => openDeleteConfirm({ kind: "course", id: c.id, title: c.title })}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {courses.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No courses available yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "test-series" && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    Test Series Manager
                  </h2>
                </div>

                <form onSubmit={handleNewTestSeriesSubmit} className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ts-title">Title</Label>
                    <Input
                      id="ts-title"
                      value={newTestSeriesForm.title}
                      onChange={(e) =>
                        setNewTestSeriesForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ts-image">Image URL</Label>
                    <Input
                      id="ts-image"
                      value={newTestSeriesForm.image}
                      onChange={(e) =>
                        setNewTestSeriesForm((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="ts-overview">Overview</Label>
                    <Input
                      id="ts-overview"
                      value={newTestSeriesForm.overview}
                      onChange={(e) =>
                        setNewTestSeriesForm((prev) => ({
                          ...prev,
                          overview: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ts-demo-link">Demo Test Link (Google Form)</Label>
                    <Input
                      id="ts-demo-link"
                      value={newTestSeriesForm.demoTestLink}
                      onChange={(e) =>
                        setNewTestSeriesForm((prev) => ({
                          ...prev,
                          demoTestLink: e.target.value,
                        }))
                      }
                      placeholder="https://forms.gle/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ts-hero-thumb">Hero Poster Image URL (optional)</Label>
                    <Input
                      id="ts-hero-thumb"
                      value={newTestSeriesForm.heroPosterThumbnail}
                      onChange={(e) =>
                        setNewTestSeriesForm((prev) => ({
                          ...prev,
                          heroPosterThumbnail: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Show in Hero Slider</Label>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        id="ts-show-hero"
                        type="checkbox"
                        className="h-4 w-4"
                        checked={newTestSeriesForm.showInHeroPoster}
                        onChange={(e) =>
                          setNewTestSeriesForm((prev) => ({
                            ...prev,
                            showInHeroPoster: e.target.checked,
                          }))
                        }
                      />
                      <Label htmlFor="ts-show-hero" className="text-xs cursor-pointer">
                        Add this test series to hero poster slider
                      </Label>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" size="sm" className="gap-1">
                      <Plus className="h-4 w-4" /> Add Test Series
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Existing Test Series</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testSeries.map((ts) => (
                      <Card key={ts.id}>
                        <CardContent className="p-4 space-y-1">
                          <p className="font-semibold text-sm">{ts.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {ts.overview}
                          </p>
                          <div className="pt-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-full"
                              onClick={() => openDeleteConfirm({ kind: "test-series", id: ts.id, title: ts.title })}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {testSeries.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No test series available yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h3 className="font-semibold">Hero Poster Images</h3>
                  <form
                    onSubmit={handleHeroPosterSubmit}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label>Poster Image (drag &amp; drop, file or URL)</Label>
                      <div
                        className="border border-dashed rounded-md p-4 text-xs text-muted-foreground bg-background"
                        onDrop={handleHeroPosterDrop}
                        onDragOver={handleHeroPosterDragOver}
                      >
                        <p>Drag &amp; drop an image here, or choose a file.</p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="mt-2"
                          onChange={handleHeroPosterFileInput}
                        />
                        <Input
                          className="mt-2"
                          placeholder="Or paste image URL..."
                          value={newHeroPosterForm.imageUrl}
                          onChange={(e) =>
                            setNewHeroPosterForm((prev) => ({
                              ...prev,
                              imageUrl: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poster-ts">Link to Test Series</Label>
                      <select
                        id="poster-ts"
                        className="border rounded-md h-9 px-2 text-sm bg-background w-full"
                        value={newHeroPosterForm.testSeriesId}
                        onChange={(e) =>
                          setNewHeroPosterForm((prev) => ({
                            ...prev,
                            testSeriesId: e.target.value,
                          }))
                        }
                        required
                      >
                        <option value="">Select test series</option>
                        {testSeries.map((ts) => (
                          <option key={ts.id} value={ts.id}>
                            {ts.title}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" size="sm" className="mt-3 gap-1">
                        <Plus className="h-4 w-4" /> Add Poster
                      </Button>
                    </div>
                  </form>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {heroPosters.map((p) => (
                      <Card key={p.id}>
                        <CardContent className="p-3 space-y-2">
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <p className="text-xs text-muted-foreground">
                            Linked to:{" "}
                            {testSeries.find((ts) => ts.id === p.testSeriesId)?.title ||
                              "Unknown"}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                    {heroPosters.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No hero posters configured yet.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Dialog open={credModalOpen} onOpenChange={setCredModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {credStudent ? "View / Edit Credentials" : "Create Credentials"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            <div className="space-y-1">
              <Label htmlFor="cred-email">Email / Username</Label>
              <Input
                id="cred-email"
                value={credForm.email}
                onChange={(e) =>
                  setCredForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cred-password">Password</Label>
              <Input
                id="cred-password"
                type={showPassword ? "text" : "password"}
                value={credForm.password}
                onChange={(e) =>
                  setCredForm((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <div className="flex items-center gap-2 mt-1 text-xs">
                <input
                  id="cred-show"
                  type="checkbox"
                  className="h-3 w-3"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <Label htmlFor="cred-show" className="cursor-pointer">
                  Show password
                </Label>
              </div>
            </div>
            {credEnrollment && (
              <p className="text-xs text-muted-foreground">
                Enrollment for: {credEnrollment.courseOrSeries}
              </p>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCredModalOpen(false)}
              >
                Close
              </Button>
              <Button size="sm" onClick={handleCredentialSubmit}>
                {credStudent ? "Save" : "Approve"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {deleteTarget?.kind === "course"
                ? `Are you sure you want to delete this course?`
                : `Are you sure you want to delete this test series?`}
            </p>
            {deleteTarget && (
              <p className="text-sm font-medium">{deleteTarget.title}</p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;