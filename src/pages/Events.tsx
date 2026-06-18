import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Noche de Jazz & Blues",
    date: "Viernes, 24 de Junio",
    time: "22:00 Hrs",
    description: "Una velada mágica con la banda local 'Blue Notes'. Disfruta de nuestros cócteles clásicos con música en vivo.",
    image: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=live%20jazz%20band%20playing%20in%20a%20dimly%20lit%20bar%20moody%20atmosphere&image_size=landscape_4_3"
  },
  {
    id: 2,
    title: "Guest Bartender: Alex Silva",
    date: "Sábado, 25 de Junio",
    time: "21:00 Hrs",
    description: "Recibimos al galardonado mixólogo Alex Silva, presentando una carta especial de 4 cócteles exclusivos por una sola noche.",
    image: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=bartender%20mixing%20a%20cocktail%20with%20fire%20cinematic%20lighting%20dark%20background&image_size=landscape_4_3"
  },
  {
    id: 3,
    title: "Vinyl Night: 80s & 90s",
    date: "Jueves, 30 de Junio",
    time: "20:00 Hrs",
    description: "DJ Set en vinilo. Revivimos los mejores clásicos mientras pruebas nuestras nuevas tapas de temporada.",
    image: "https://coreva-normal.trae.ai/api/ide/v1/text_to_image?prompt=vinyl%20record%20player%20spinning%20in%20a%20moody%20bar%20neon%20lights&image_size=landscape_4_3"
  }
];

export default function Events() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display text-white mb-4 uppercase tracking-widest">Próximos Eventos</h1>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-6" />
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            La música, el ambiente y las experiencias que hacen que cada noche en La Toma sea única.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-zinc-900 border border-white/5 group hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-2 text-primary font-display uppercase tracking-widest text-xs">
                  {event.date.split(',')[0]}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-display text-white mb-4 uppercase tracking-wide group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground font-light text-sm mb-6 flex-1">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm text-zinc-400 mb-6">
                  <div className="flex items-center">
                    <CalendarIcon size={16} className="text-primary mr-3" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-primary mr-3" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="text-primary mr-3" />
                    La Toma Bar
                  </div>
                </div>
                <button className="w-full border border-primary/50 text-primary py-3 uppercase tracking-widest text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors mt-auto">
                  Reservar Lugar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}