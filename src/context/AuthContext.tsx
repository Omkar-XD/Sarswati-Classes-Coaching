import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { StudentUser } from "@/data/mockData";

type UserRole = "admin" | "student" | null;

interface AuthContextType {
  role: UserRole;
  isAdmin: boolean;
  isStudent: boolean;
  currentStudent: StudentUser | null;
  login: (email: string, password: string) => "admin" | "student" | false;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem("sc_role") as UserRole) || null;
  });
  const [currentStudent, setCurrentStudent] = useState<StudentUser | null>(() => {
    const stored = localStorage.getItem("sc_current_student");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (role) localStorage.setItem("sc_role", role);
    else localStorage.removeItem("sc_role");
  }, [role]);

  useEffect(() => {
    if (currentStudent) localStorage.setItem("sc_current_student", JSON.stringify(currentStudent));
    else localStorage.removeItem("sc_current_student");
  }, [currentStudent]);

  const login = (email: string, password: string): "admin" | "student" | false => {
    // Admin check
    if (email === "admin@saraswaticlasses.com" && password === "admin123") {
      setRole("admin");
      setCurrentStudent(null);
      return "admin";
    }
    // Student check
    const students: StudentUser[] = JSON.parse(localStorage.getItem("sc_students") || "[]");
    const student = students.find((s) => s.email === email && s.password === password);
    if (student) {
      setRole("student");
      setCurrentStudent(student);
      return "student";
    }
    return false;
  };

  const logout = () => {
    setRole(null);
    setCurrentStudent(null);
    localStorage.removeItem("sc_role");
    localStorage.removeItem("sc_current_student");
    localStorage.removeItem("sc_admin");
  };

  const isAdmin = role === "admin";
  const isStudent = role === "student";

  return (
    <AuthContext.Provider value={{ role, isAdmin, isStudent, currentStudent, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
