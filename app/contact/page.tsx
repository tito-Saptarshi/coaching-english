import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Excellence Coaching Institute</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-4">
                We&apos;re here to help and answer any questions you might have. Feel free to reach out to us using the contact information below.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2">
                <p className="flex items-center"><Phone className="mr-2" size={18} /> Teacher: (123) 456-7890</p>
                <p className="flex items-center"><Mail className="mr-2" size={18} /> Teacher: teacher@excellencecoaching.com</p>
                <p className="flex items-center"><Mail className="mr-2" size={18} /> Developer: dev@excellencecoaching.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
              <p className="flex items-center"><Clock className="mr-2" size={18} /> Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="ml-6">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="ml-6">Sunday: Closed</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="flex items-center"><MapPin className="mr-2" size={18} /> 123 Education Street, Knowledge City, 12345</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">How to Reach Us</h2>
              <p className="text-muted-foreground mb-4">
                You can contact us using your preferred method of communication. We&apos;re available via email, phone, or you can visit us at our office during business hours.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Preferred Contact Methods</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Email us directly using the provided email addresses</li>
                <li>Call our office during business hours</li>
                <li>Visit us in person at our location</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <p className="mb-2 text-muted-foreground">Stay updated with our latest news and events on social media:</p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary"><Twitter size={24} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></a>
                <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={24} /></a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Map placeholder - Replace with actual map component</p>
        </div>
      </div>
    </div>
  )
}