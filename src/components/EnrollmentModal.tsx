import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

interface EnrollmentModalProps {
  open: boolean;
  onClose: () => void;
  courseOrSeries: string;
}

const EnrollmentModal = ({ open, onClose, courseOrSeries }: EnrollmentModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { addEnrollment } = useApp();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnrollment({ name, email, phone, message, courseOrSeries });
    toast({ title: "Enrollment Request Sent!", description: "We'll get back to you soon." });
    setName(""); setEmail(""); setPhone(""); setMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-background rounded-lg shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Enrollment form"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Enroll in {courseOrSeries}</h3>
              <button onClick={onClose} aria-label="Close modal" className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="enroll-name">Name</Label>
                <Input id="enroll-name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="enroll-email">Email</Label>
                <Input id="enroll-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="enroll-phone">Phone</Label>
                <Input id="enroll-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="enroll-message">Message</Label>
                <Textarea id="enroll-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
              </div>
              <Button type="submit" className="w-full">Submit Enrollment</Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentModal;
