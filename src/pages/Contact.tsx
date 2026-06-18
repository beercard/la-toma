import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert("Solicitud de reserva enviada. Nos pondremos en contacto pronto.");
    setFormData({ name: "", email: "", date: "", time: "", guests: "2", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display text-white mb-4 uppercase tracking-widest">Reservas & Contacto</h1>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-6" />
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Asegura tu lugar para una noche inolvidable o contáctanos para eventos privados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div className="animate-fade-in-up">
            <h2 className="text-2xl font-display text-white mb-8 uppercase tracking-widest">Información</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-zinc-900 p-4 border border-white/5 mr-6">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-display uppercase tracking-widest mb-2">Ubicación</h3>
                  <p className="text-muted-foreground font-light text-sm">
                    Av. Principal 123<br />
                    Ciudad, CP 1000
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-zinc-900 p-4 border border-white/5 mr-6">
                  <Clock className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-display uppercase tracking-widest mb-2">Horarios</h3>
                  <p className="text-muted-foreground font-light text-sm">
                    Jueves: 20:00 - 03:00<br />
                    Viernes: 20:00 - 04:00<br />
                    Sábado: 21:00 - 05:00
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-zinc-900 p-4 border border-white/5 mr-6">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-display uppercase tracking-widest mb-2">Teléfono</h3>
                  <p className="text-muted-foreground font-light text-sm">
                    +1 (555) 123-4567<br />
                    Atención de 18:00 a 22:00
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-zinc-900 p-4 border border-white/5 mr-6">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-display uppercase tracking-widest mb-2">Email</h3>
                  <p className="text-muted-foreground font-light text-sm">
                    hola@latoma.com<br />
                    eventos@latoma.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-zinc-900 border border-white/5 p-8 md:p-10 animate-fade-in-up">
            <h2 className="text-2xl font-display text-white mb-8 uppercase tracking-widest text-center">Haz tu Reserva</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="date" className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Fecha</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Hora</label>
                  <select 
                    id="time" 
                    name="time" 
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light appearance-none"
                  >
                    <option value="">Seleccionar</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                    <option value="22:00">22:00</option>
                    <option value="23:00">23:00</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Personas</label>
                  <select 
                    id="guests" 
                    name="guests" 
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Personas'}</option>
                    ))}
                    <option value="9+">Más de 8</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Mensaje Especial (Opcional)</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-light resize-none"
                  placeholder="¿Celebras algo especial? ¿Alguna alergia?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-sm font-semibold hover:bg-amber-400 transition-colors mt-4"
              >
                Solicitar Reserva
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}