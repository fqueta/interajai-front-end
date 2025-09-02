export function cepApplyMask(value: string) {
  // Remove todos os caracteres não numéricos
  const cleanValue = value.replace(/\D/g, '');
  
  // Aplica a máscara 99999-999
  return cleanValue.replace(
    /^(\d{5})(\d{3})$/,
    "$1-$2"
  );
}

// Função para remover a máscara e retornar apenas números
export function cepRemoveMask(value: string) {
  return value.replace(/\D/g, '');
}