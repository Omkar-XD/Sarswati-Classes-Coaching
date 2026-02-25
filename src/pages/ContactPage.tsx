import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-2">Contact Us</motion.h1>
          <p className="text-muted-foreground mb-8">Get in touch with us for any queries</p>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div><Label htmlFor="name">Name</Label><Input id="name" required /></div>
                    <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
                    <div><Label htmlFor="subject">Subject</Label><Input id="subject" required /></div>
                    <div><Label htmlFor="message">Message</Label><Textarea id="message" rows={4} required /></div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {[
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "info@saraswaticlasses.com" },
                { icon: MapPin, label: "Address", value: "123, Education Lane, Pune, Maharashtra 411001" },
                { icon: Clock, label: "Hours", value: "Mon - Sat: 8:00 AM - 8:00 PM" },
              ].map((c) => (
                <Card key={c.label}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
