import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Send, 
  Loader2,
  MessageSquare,
  Globe
} from "lucide-react";
import { 
  SiLinkedin, 
  SiGithub, 
  SiX 
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { springPresets, fadeInUp, staggerContainer, staggerItem } from "@/lib/motion";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Introduce un correo electrónico válido." }),
  subject: z.string().min(5, { message: "El asunto debe ser más descriptivo." }),
  message: z.string().min(10, { message: "Cuéntame un poco más sobre tu proyecto o consulta." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    // Simulación de envío de datos
    console.log("Formulario enviado:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("¡Mensaje enviado con éxito!", {
      description: "Me pondré en contacto contigo lo antes posible.",
    });
    
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hablemos de <span className="text-primary">Datos</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ¿Tienes un desafío complejo o un proyecto que requiera análisis avanzado? 
              Estoy disponible para colaborar en soluciones basadas en evidencia y modelos predictivos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-8">
              <Card className="border-none shadow-lg bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Información de Contacto</CardTitle>
                  <CardDescription>Canales directos de comunicación</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email</p>
                      <p className="text-lg font-semibold">osce1428@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent-foreground">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Ubicación</p>
                      <p className="text-lg font-semibold">Santo Domingo / Rep Dom</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Disponibilidad</p>
                      <p className="text-lg font-semibold">Abierto a proyectos & Nuevas ofertas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Estado de Proyectos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/90">
                    Actualmente aceptando consultorías en optimización de modelos y creacion de nuevas soluciones basadas en datos. Si tienes un proyecto interesante o necesitas ayuda con análisis avanzado, no dudes en contactarme.
                  </p>
                  <div className="mt-6 flex gap-4">
                    <a href="https://www.linkedin.com/in/osiris-yordalis-cabrera-lara-749b6a241/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                      <SiLinkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
                      <SiGithub className="w-6 h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <Card className="border-border/40 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Enviar un Mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y responderé en menos de 24 horas hábiles.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre" {...field} className="bg-muted/30" />
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
                              <FormLabel>Correo Electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@email.com" {...field} className="bg-muted/30" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asunto</FormLabel>
                            <FormControl>
                              <Input placeholder="¿En qué puedo ayudarte?" {...field} className="bg-muted/30" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe brevemente tu necesidad o proyecto..."
                                className="min-h-[150px] bg-muted/30"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full py-6 text-lg font-semibold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Enviar Mensaje
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bottom Trust Icons/Badges */}
          <motion.div 
            variants={fadeInUp}
            className="mt-20 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Consultoría Estratégica</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span className="font-medium">Colaboración Internacional</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Soporte Técnico</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
