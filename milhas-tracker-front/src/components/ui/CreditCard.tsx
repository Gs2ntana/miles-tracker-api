import { Wifi } from 'lucide-react';

const CreditCard = ({ 
  nome = "Visa Infinite", 
  saldo = 5756, 
  digitos = "1234", 
  validade = "12/29", 
  variant = "blue" 
}: any) => {
  
  const styles = variant === 'blue' 
    ? "bg-gradient-to-r from-electric-600 to-electric-400 text-white border-none"
    : "bg-midnight-800 border border-slate-700 text-white";

  const labelColor = variant === 'blue' ? "text-blue-100" : "text-slate-400";

  return (
    <div className={`${styles} p-6 rounded-3xl w-full h-56 flex flex-col justify-between shadow-lg relative overflow-hidden transition-transform hover:scale-[1.02]`}>
      
      {variant === 'blue' && (
        <>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </>
      )}

      <div className="flex justify-between items-start z-10">
        <div>
          <p className={`text-xs ${labelColor} mb-1`}>Saldo Estimado</p>
          <h3 className="text-2xl font-bold">
             {saldo.toLocaleString('pt-BR')} <span className="text-sm font-normal opacity-80">pts</span>
          </h3>
        </div>
        <Wifi className="w-6 h-6 rotate-90 opacity-80" />
      </div>

      <div className="flex gap-4 z-10">
        <div className="w-12 h-9 bg-yellow-200/20 rounded-md border border-white/20 flex items-center justify-center">
             <div className="w-8 h-6 border border-white/30 rounded-sm"></div>
        </div>
      </div>

      <div className="flex justify-between items-end z-10">
        <div>
          <p className={`text-[10px] uppercase ${labelColor}`}>Titular</p>
          <p className="font-medium text-sm tracking-wide">EDDY CUSUMA</p>
        </div>
        <div className="text-right">
          <p className={`text-[10px] uppercase ${labelColor}`}>Validade</p>
          <p className="font-medium text-sm">{validade}</p>
        </div>
        <div className="text-xl font-mono tracking-widest opacity-90">
          **** {digitos}
        </div>
      </div>
    </div>
  );
};

export default CreditCard;