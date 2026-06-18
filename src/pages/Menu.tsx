import { useState } from "react";
import { cn } from "@/lib/utils";

const menuData = {
  cocteles: [
    { name: "El Alquimista", description: "Gin infusionado con romero, tónica artesanal, pepino y bayas de enebro.", price: "$12" },
    { name: "Humo y Fuego", description: "Mezcal, licor de chile ancho, jarabe de agave y borde de sal de gusano.", price: "$14" },
    { name: "La Toma Clásico", description: "Bourbon, vermouth dulce, campari y un toque de bitter de naranja.", price: "$13" },
    { name: "Noche de Verano", description: "Vodka, puré de maracuyá, jugo de limón y hojas de menta fresca.", price: "$11" },
  ],
  tapas: [
    { name: "Tabla de Quesos", description: "Selección de quesos curados, miel de trufa, nueces y pan artesanal.", price: "$18" },
    { name: "Croquetas de Jamón", description: "Croquetas crujientes de jamón ibérico con alioli de ajo asado.", price: "$10" },
    { name: "Ceviche Nikkei", description: "Pescado blanco fresco, leche de tigre, maíz chulpi y boniato.", price: "$16" },
    { name: "Papas Bravas", description: "Papas rústicas con salsa brava casera y alioli.", price: "$8" },
  ],
  vinos: [
    { name: "Malbec Reserva", description: "Valle de Uco, Mendoza. Notas de ciruela y roble.", price: "$9 / copa" },
    { name: "Sauvignon Blanc", description: "Marlborough. Fresco, cítrico y vibrante.", price: "$8 / copa" },
    { name: "Pinot Noir", description: "Valle de Leyda. Elegante, con notas a frutos rojos.", price: "$10 / copa" },
  ]
};

export default function Menu() {
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>("cocteles");

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display text-white mb-4 uppercase tracking-widest">Nuestra Carta</h1>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-6" />
          <p className="text-muted-foreground font-light max-w-lg mx-auto">
            Descubre nuestra selección de bebidas y platillos elaborados con pasión y los mejores ingredientes.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-white/10 pb-4">
          {Object.keys(menuData).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category as keyof typeof menuData)}
              className={cn(
                "uppercase tracking-widest text-sm font-semibold px-6 py-2 transition-colors",
                activeTab === category 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid gap-8 animate-fade-in-up" key={activeTab}>
          {menuData[activeTab].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-baseline border-b border-white/5 pb-6 last:border-0 group">
              <div className="sm:pr-8 mb-2 sm:mb-0">
                <h3 className="text-xl font-display text-white uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-muted-foreground font-light text-sm">
                  {item.description}
                </p>
              </div>
              <div className="text-primary font-display text-xl whitespace-nowrap">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}