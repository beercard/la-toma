import { Link } from "react-router-dom";
import { ArrowRight, GlassWater, Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=dark%20moody%20cocktail%20bar%20interior%20with%20warm%20golden%20lighting%20professional%20photography&image_size=landscape_16_9')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-wider">
            LA TOMA
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light tracking-wide">
            Donde la coctelería de autor se encuentra con noches inolvidables. Descubre tu nuevo refugio en la ciudad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contacto" 
              className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-amber-400 transition-colors w-full sm:w-auto"
            >
              Reservar Mesa
            </Link>
            <Link 
              to="/menu" 
              className="border border-white/30 text-white px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-sm"
            >
              Ver Carta
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-primary mb-4 uppercase tracking-widest">Nuestra Esencia</h2>
            <div className="w-24 h-1 bg-primary/30 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                <GlassWater className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-display mb-4 uppercase tracking-widest">Coctelería de Autor</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Nuestros mixólogos crean experiencias únicas en cada vaso, utilizando ingredientes premium y técnicas vanguardistas.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                <Calendar className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-display mb-4 uppercase tracking-widest">Eventos Exclusivos</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                DJs internacionales, bandas en vivo y fiestas temáticas. Cada noche en La Toma es una historia diferente.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto border border-primary/20 rounded-full flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                <MapPin className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-display mb-4 uppercase tracking-widest">Ubicación Privilegiada</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Situados en el corazón de la ciudad, con un ambiente diseñado para desconectar de la rutina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/2 bg-zinc-900" />
          <div className="w-1/2 bg-zinc-950" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-zinc-900 border border-white/5 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl">
            <div className="mb-8 md:mb-0 max-w-lg">
              <h2 className="text-3xl md:text-4xl font-display text-white mb-4 uppercase tracking-widest">Sabores que Despiertan</h2>
              <p className="text-muted-foreground font-light mb-6">
                Acompaña tu bebida favorita con nuestra selección de tapas gourmet y platillos para compartir.
              </p>
              <Link to="/menu" className="inline-flex items-center text-primary uppercase tracking-widest hover:text-amber-400 transition-colors font-semibold text-sm">
                Explorar el menú completo <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="w-full md:w-1/2 relative h-64 md:h-80">
              <img 
                src="https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=elegant%20gourmet%20tapas%20and%20cocktails%20on%20a%20dark%20table%20top%20down%20view%20moody%20lighting&image_size=landscape_4_3" 
                alt="Comida destacada" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}