import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) { navigate("/admin"); return null; }
  if (isStudent) { navigate("/dashboard"); return null; }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result === "admin") {
      navigate("/admin");
    } else if (result === "student") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use admin or student credentials.");
    }
  };

  const { login } = useAuth();

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-2" />
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-sm text-muted-foreground">Sign in as Admin or Student</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full">Login</Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-4">Admin: admin@saraswaticlasses.com / admin123</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;
