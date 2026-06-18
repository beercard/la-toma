import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="text-3xl font-display font-bold tracking-widest text-primary mb-6 block">
            LA TOMA
          </Link>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            El mejor bar de la ciudad. Coctelería de autor, buena música y un ambiente inigualable.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-display text-lg mb-6 uppercase tracking-widest">Navegación</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide">Inicio</Link></li>
            <li><Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide">Menú</Link></li>
            <li><Link to="/eventos" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide">Eventos</Link></li>
            <li><Link to="/contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm uppercase tracking-wide">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-display text-lg mb-6 uppercase tracking-widest">Contacto</h4>
          <ul className="space-y-4 text-muted-foreground text-sm">
            <li>Av. Principal 123, Ciudad</li>
            <li>+1 (555) 123-4567</li>
            <li>hola@latoma.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-display text-lg mb-6 uppercase tracking-widest">Horarios</h4>
          <ul className="space-y-4 text-muted-foreground text-sm">
            <li>Jueves: 20:00 - 03:00</li>
            <li>Viernes: 20:00 - 04:00</li>
            <li>Sábado: 21:00 - 05:00</li>
            <li>Dom - Mie: Cerrado</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} La Toma Bar. Todos los derechos reservados.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="#" className="hover:text-primary transition-colors">Términos de Servicio</Link>
          <Link to="#" className="hover:text-primary transition-colors">Política de Privacidad</Link>
        </div>
      </div>
    </footer>
  );
}