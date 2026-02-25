import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  Course,
  TestSeries,
  EnrollmentRequest,
  PopupContent,
  StudentUser,
  HeroPoster,
  defaultCourses,
  defaultTestSeriesList,
  defaultHeroPosters,
  defaultPopupContent,
} from "@/data/mockData";

interface AppContextType {
  courses: Course[];
  addCourse: (c: Omit<Course, "id">) => void;
  deleteCourse: (id: string) => void;

  testSeries: TestSeries[];
  addTestSeries: (ts: Omit<TestSeries, "id"> & { id?: string }) => TestSeries;
  updateTestSeries: (id: string, updates: Partial<TestSeries>) => void;
  deleteTestSeries: (id: string) => void;

  heroPosters: HeroPoster[];
  addHeroPoster: (p: Omit<HeroPoster, "id" | "createdAt">) => void;
  updateHeroPoster: (id: string, updates: Partial<HeroPoster>) => void;
  removeHeroPoster: (id: string) => void;

  enrollments: EnrollmentRequest[];
  addEnrollment: (req: Omit<EnrollmentRequest, "id" | "status" | "createdAt">) => void;
  updateEnrollmentStatus: (id: string, status: "Approved" | "Rejected") => void;
  updateEnrollment: (id: string, updates: Partial<EnrollmentRequest>) => void;

  popup: PopupContent;
  updatePopup: (p: PopupContent) => void;

  students: StudentUser[];
  addStudent: (s: Omit<StudentUser, "id" | "createdAt">) => StudentUser;
  updateStudent: (id: string, updates: Partial<StudentUser>) => void;
  refreshStudentData: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const stored = localStorage.getItem("sc_courses");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parse errors and fall back to defaults
    }
    return defaultCourses;
  });

  const [testSeries, setTestSeries] = useState<TestSeries[]>(() => {
    try {
      const stored = localStorage.getItem("sc_test_series");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parse errors and fall back to defaults
    }
    return defaultTestSeriesList;
  });

  const [heroPosters, setHeroPosters] = useState<HeroPoster[]>(() => {
    try {
      const stored = localStorage.getItem("sc_hero_posters");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore parse errors and fall back to defaults
    }
    return defaultHeroPosters;
  });

  const [enrollments, setEnrollments] = useState<EnrollmentRequest[]>(() => {
    try {
      const stored = localStorage.getItem("sc_enrollments");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore parse errors and fall back to empty
    }
    return [];
  });

  const [popup, setPopup] = useState<PopupContent>(() => {
    try {
      const stored = localStorage.getItem("sc_popup");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch {
      // ignore parse errors and fall back to default
    }
    return defaultPopupContent;
  });

  const [students, setStudents] = useState<StudentUser[]>(() => {
    try {
      const stored = localStorage.getItem("sc_students");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore parse errors and fall back to empty
    }
    return [];
  });

  useEffect(() => { localStorage.setItem("sc_courses", JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem("sc_test_series", JSON.stringify(testSeries)); }, [testSeries]);
  useEffect(() => { localStorage.setItem("sc_hero_posters", JSON.stringify(heroPosters)); }, [heroPosters]);
  useEffect(() => { localStorage.setItem("sc_enrollments", JSON.stringify(enrollments)); }, [enrollments]);
  useEffect(() => { localStorage.setItem("sc_popup", JSON.stringify(popup)); }, [popup]);
  useEffect(() => { localStorage.setItem("sc_students", JSON.stringify(students)); }, [students]);

  const addCourse = (c: Omit<Course, "id">) => {
    setCourses(prev => [...prev, { ...c, id: Date.now().toString() }]);
  };

  const deleteCourse = (id: string) => {
    setCourses((prevCourses) => {
      const course = prevCourses.find((c) => c.id === id);
      if (!course) return prevCourses;

      setStudents((prevStudents) =>
        prevStudents.map((s) => ({
          ...s,
          approvedCourses: s.approvedCourses.filter((cid) => cid !== id),
        }))
      );

      setEnrollments((prevEnrollments) =>
        prevEnrollments.filter((e) => e.courseOrSeries !== course.title)
      );

      return prevCourses.filter((c) => c.id !== id);
    });
  };

  const addTestSeries = (ts: Omit<TestSeries, "id"> & { id?: string }) => {
    const created: TestSeries = { ...ts, id: ts.id || Date.now().toString() };
    setTestSeries((prev) => [...prev, created]);
    return created;
  };

  const updateTestSeries = (id: string, updates: Partial<TestSeries>) => {
    setTestSeries(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTestSeries = (id: string) => {
    setTestSeries((prevSeries) => {
      const series = prevSeries.find((t) => t.id === id);
      if (!series) return prevSeries;

      setStudents((prevStudents) =>
        prevStudents.map((s) => ({
          ...s,
          approvedTestSeries: s.approvedTestSeries.filter((tid) => tid !== id),
        }))
      );

      setEnrollments((prevEnrollments) =>
        prevEnrollments.filter((e) => e.courseOrSeries !== series.title)
      );

      setHeroPosters((prevPosters) =>
        prevPosters.filter((p) => p.testSeriesId !== id)
      );

      return prevSeries.filter((t) => t.id !== id);
    });
  };

  const addHeroPoster = (p: Omit<HeroPoster, "id" | "createdAt">) => {
    setHeroPosters(prev => [...prev, { ...p, id: Date.now().toString(), createdAt: new Date().toISOString() }]);
  };

  const updateHeroPoster = (id: string, updates: Partial<HeroPoster>) => {
    setHeroPosters(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const removeHeroPoster = (id: string) => {
    setHeroPosters(prev => prev.filter(h => h.id !== id));
  };

  const addEnrollment = (req: Omit<EnrollmentRequest, "id" | "status" | "createdAt">) => {
    setEnrollments(prev => [...prev, { ...req, id: Date.now().toString(), status: "Pending", createdAt: new Date().toISOString() }]);
  };

  const updateEnrollmentStatus = (id: string, status: "Approved" | "Rejected") => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const updateEnrollment = (id: string, updates: Partial<EnrollmentRequest>) => {
    setEnrollments(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const updatePopup = (p: PopupContent) => setPopup(p);

  const addStudent = (s: Omit<StudentUser, "id" | "createdAt">) => {
    const newStudent = { ...s, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<StudentUser>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const refreshStudentData = () => {
    const stored = localStorage.getItem("sc_students");
    if (stored) setStudents(JSON.parse(stored));
  };

  return (
    <AppContext.Provider value={{
      courses,
      addCourse,
      deleteCourse,
      testSeries,
      addTestSeries,
      updateTestSeries,
      deleteTestSeries,
      heroPosters,
      addHeroPoster,
      updateHeroPoster,
      removeHeroPoster,
      enrollments,
      addEnrollment,
      updateEnrollmentStatus,
      updateEnrollment,
      popup,
      updatePopup,
      students,
      addStudent,
      updateStudent,
      refreshStudentData,
    }}>
      {children}
    </AppContext.Provider>
  );
};