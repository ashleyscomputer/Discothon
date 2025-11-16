// src/pages/RegisterPage.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Shield } from "lucide-react";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

// Schema remains the same
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  dateOfBirth: z.string().optional(),
  emergencyWord: z.string().min(3, { message: "Trigger word must be at least 3 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  contactName1: z.string().optional(),
  contactPhone1: z.string().optional(),
  contactName2: z.string().optional(),
  contactPhone2: z.string().optional(),
  contactName3: z.string().optional(),
  contactPhone3: z.string().optional(),
  medicalInfo: z.string().optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.superRefine((data, ctx) => {
  if (data.contactName1 && !data.contactPhone1) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone is required.", path: ["contactPhone1"] });
  }
  if (!data.contactName1 && data.contactPhone1) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is required.", path: ["contactName1"] });
  }
  if (data.contactName2 && !data.contactPhone2) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone is required.", path: ["contactPhone2"] });
  }
  if (!data.contactName2 && data.contactPhone2) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is required.", path: ["contactName2"] });
  }
  if (data.contactName3 && !data.contactPhone3) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone is required.", path: ["contactPhone3"] });
  }
  if (!data.contactName3 && data.contactPhone3) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Name is required.", path: ["contactName3"] });
  }
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      emergencyWord: "",
      password: "",
      confirmPassword: "",
      contactName1: "",
      contactPhone1: "",
      contactName2: "",
      contactPhone2: "",
      contactName3: "",
      contactPhone3: "",
      medicalInfo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Registration details:", values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center p-4">
        <NavBar />
      <Card className="w-full min-w-[350px] max-w-lg mt-20">
        <CardHeader className="text-center">
          <Shield className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-bold">Create Your Secure Account</CardTitle>
          <CardDescription>
            Your personal details are vital for your safety.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Personal Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Safety & Security */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Safety & Security</h3>
                <FormField
                  control={form.control}
                  name="emergencyWord"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice Trigger Word</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., oranges, pineapple" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the secret word you will say to trigger an alert.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Emergency Contacts (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="contactName1" render={({ field }) => (<FormItem><FormLabel>Contact 1 Name</FormLabel><FormControl><Input placeholder="Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="contactPhone1" render={({ field }) => (<FormItem><FormLabel>Contact 1 Phone</FormLabel><FormControl><Input placeholder="Phone number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="contactName2" render={({ field }) => (<FormItem><FormLabel>Contact 2 Name</FormLabel><FormControl><Input placeholder="Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="contactPhone2" render={({ field }) => (<FormItem><FormLabel>Contact 2 Phone</FormLabel><FormControl><Input placeholder="Phone number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="contactName3" render={({ field }) => (<FormItem><FormLabel>Contact 3 Name</FormLabel><FormControl><Input placeholder="Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="contactPhone3" render={({ field }) => (<FormItem><FormLabel>Contact 3 Phone</FormLabel><FormControl><Input placeholder="Phone number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </div>

              {/* Medical Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Medical Info (Optional)</h3>
                <FormField
                  control={form.control}
                  name="medicalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Allergies: Penicillin, Blood Type: O+"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This info can be shared with emergency services.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Create Secure Account
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}