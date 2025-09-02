import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";
import { getNumeroSemana, getSemanaPorNumero, getInicioFimMes,numeroDoMes,dataParaBR,ucwords } from "@/lib/qlib";

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: { type: 'semana' | 'mes' | 'ano'; value: string; inicio: string | Date; fim: string | Date }) => void;
}

export const PeriodSelector = ({ selectedPeriod, onPeriodChange }: PeriodSelectorProps) => {
  const currentYear: number = new Date().getFullYear();
  const currentMonth: string = new Date().toLocaleString('default', { month: 'long' });
  const currentMonthNumber: number = new Date().getMonth() + 1;
  const currentWeek: number = getNumeroSemana();

  const [year, setYear] = useState<number>(currentYear);
  const [week, setWeek] = useState<string>(currentWeek.toString());
  const [month, setMonth] = useState<string>(currentMonth);
  const [monthNumber, setMonthNumber] = useState<number>(currentMonthNumber);
  const [periodType, setPeriodType] = useState<'semana' | 'mes' | 'ano'>('mes');
  const [showDropdown, setShowDropdown] = useState(false);
  const [inicio, setInicio] = useState<string | Date>('');
  const [fim, setFim] = useState<string | Date>('');
  const [labelDrop,setLabelDrop] = useState<string>(selectedPeriod); 

  const weeks = Array.from({ length: 52 }, (_, i) => `${i + 1}`);
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const years = [year - 1, year, year + 1];

  const getCurrentOptions = () => {
    switch (periodType) {
      case 'semana': return weeks;
      case 'mes': return months;
      case 'ano': return years;
      default: return months;
    }
  };

  const getCurrentDefault = () => {
    switch (periodType) {
      case 'semana': return currentWeek.toString();
      case 'mes': return currentMonth;
      case 'ano': return currentYear.toString();
      default: return currentMonth;
    }
  };

  // Atualiza o callback sempre que mudar inicio/fim/periodType/selectedPeriod
  useEffect(() => {
    if (inicio && fim) {
      onPeriodChange({
        type: periodType,
        value: selectedPeriod || getCurrentDefault(),
        inicio,
        fim
      });
    }
  }, [inicio, fim, periodType, selectedPeriod]);
  
  const handlePeriodTypeChange = (newType: 'semana' | 'mes' | 'ano') => {
    setPeriodType(newType);
    // console.log('showDropdown'+showDropdown);
    
    switch (newType) {
      case 'semana': {        
        const { inicio, fim } = getSemanaPorNumero(Number(year), Number(week));
        const dt_inicio = inicio.toISOString().split("T")[0];
        const dt_fim = fim.toISOString().split("T")[0];
        setInicio(dt_inicio);
        setFim(dt_fim);
        break;
      }
      case 'mes': {
        // console.log(`Perido selecionando ${selectedPeriod}`);        
        const { inicioStr, fimStr } = getInicioFimMes(year, monthNumber);
        setInicio(inicioStr);
        setFim(fimStr);
        break;
      }
      case 'ano': {
        setInicio(`${year}-01-01`);
        setFim(`${year}-12-31`);
        break;
      }
    }
  };
  const oncliSelecDown = (option:Number,type:string)=>{
    // const tem:string = `{value} Ano: ${year}`;
    //   if(periodType=='mes'){
    //     var lab:string = tem.replace('{value}','Mês: '+selectedPeriod);
    //   }
    //   if(lab){
    //     setLabelDrop(lab);
    //   }
    //   console.log(`periodType ${periodType} Ano ${year}`);  
    const val:string = ucwords(String(option));    
    if(type=='semana'){
      const { inicio, fim } = getSemanaPorNumero(Number(year), Number(option));
      const dt_inicio = inicio.toISOString().split("T")[0];
      const dt_fim = fim.toISOString().split("T")[0];
      setInicio(dt_inicio);
      setFim(dt_fim);
      // type = ucwords(type);
    }
    if(type=='mes'){
      const numMes:Number = numeroDoMes(String(option));  
      const { inicioStr, fimStr } = getInicioFimMes(year, Number(numMes));
      setInicio(inicioStr);
      setFim(fimStr);
    }
    if(type=='ano'){
      setInicio(`${option}-01-01`);
      setFim(`${option}-12-31`);
      setYear(Number(option));
    }
    type = ucwords(type);
    const labDrop:string = `${String(type)}: ${val}`
    setLabelDrop(labDrop);
    
    
    // alert();
    // console.log(`selectedPeriod: `+selectedPeriod);
    
    // console.log(`oncliSelecDown ${type}: ${option} ano ${year} `);
    
  }
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Ano {year}</h3>        
      </div>
      {/* <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Período </h3>        
      </div> */}

      {/* Botões de tipo de período */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {['semana', 'mes', 'ano'].map((type) => (
          <button
            key={type}
            onClick={() => handlePeriodTypeChange(type as 'semana' | 'mes' | 'ano')}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              periodType === type
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Dropdown de seleção */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full p-3 bg-muted rounded-lg flex items-center justify-between text-sm font-medium text-foreground"
        >
          {/* <span>{selectedPeriod || getCurrentDefault()}</span> */}
          <span>{labelDrop}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
            {getCurrentOptions().map((option) => (
              <button
                key={option}
                onClick={() => {
                  oncliSelecDown(option,periodType);
                  setShowDropdown(false);
                  onPeriodChange({
                    type: periodType,
                    value: String(option),
                    inicio,
                    fim
                  });
                  
                }}
                className="w-full p-3 text-left text-sm hover:bg-muted transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex ">
        <i>Início: {dataParaBR(String(inicio))} Fim: {dataParaBR(String(fim))}</i>
      </div>
    </Card>
  );
};
