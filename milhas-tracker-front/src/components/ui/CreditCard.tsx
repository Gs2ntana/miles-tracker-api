import { Wifi } from 'lucide-react';

interface CreditCardProps {
  nome: string;
  digitos: string;
  bandeira: string;
  programa: string;
  titular: string;
  variant?: 'blue' | 'black';
}

const CreditCard = ({ 
  nome, 
  digitos, 
  bandeira,
  programa,
  titular,
  variant = "blue" 
}: CreditCardProps) => {
  
  const isBlue = variant === 'blue';

  const styles = isBlue 
    ? "bg-gradient-to-r from-electric-600 to-electric-400 text-white border-none shadow-electric-500/20"
    : "bg-midnight-800 border border-slate-700 text-white shadow-black/50";

  const labelColor = isBlue ? "text-blue-100" : "text-slate-400";

  return (
    <div className={`${styles} p-6 rounded-3xl w-full h-56 flex flex-col justify-between shadow-lg relative overflow-hidden transition-transform hover:scale-[1.02]`}>
      
      {isBlue && (
        <>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </>
      )}

      {/* Header: Bandeira e Wifi */}
      <div className="flex justify-between items-start z-10">
        <div>
          <p className={`text-[10px] uppercase ${labelColor} font-bold tracking-wider mb-1`}>
            {bandeira}
          </p>
          <h3 className="text-xl font-bold truncate pr-2">
             {nome}
          </h3>
        </div>
        <Wifi className="w-6 h-6 rotate-90 opacity-80" />
      </div>

      {/* Chip */}
      <div className="flex gap-4 z-10">
        <div className="w-12 h-9 bg-yellow-200/20 rounded-md border border-white/20 flex items-center justify-center">
             <div className="w-8 h-6 border border-white/30 rounded-sm"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end z-10">
        <div>
          <p className={`text-[10px] uppercase ${labelColor}`}>Titular</p>
          <p className="font-medium text-sm tracking-wide uppercase truncate max-w-[150px]">
            {titular}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] uppercase ${labelColor}`}>Programa</p>
          <p className="font-medium text-sm mb-1">{programa}</p>
          <div className="text-xl font-mono tracking-widest opacity-90">
            •••• {digitos}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;