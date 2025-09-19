/**
 * Aplica máscara de moeda brasileira (R$) a um valor
 * @param value - Valor a ser formatado
 * @returns Valor formatado como moeda brasileira
 */
export function currencyApplyMask(value: string | number): string {
  // Remove todos os caracteres não numéricos
  const numericValue = String(value).replace(/\D/g, '');
  
  if (!numericValue) return 'R$ 0,00';
  
  // Converte para número e divide por 100 para ter os centavos
  const numberValue = parseInt(numericValue) / 100;
  
  // Formata como moeda brasileira
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

/**
 * Remove a máscara de moeda e retorna apenas o valor numérico
 * @param maskedValue - Valor com máscara de moeda
 * @returns Valor numérico
 */
export function currencyRemoveMask(maskedValue: string): number {
  if (!maskedValue) return 0;
  
  // Remove R$, espaços e pontos (separadores de milhares)
  let cleanValue = maskedValue.replace(/[R$\s\.]/g, '');
  
  // Substitui vírgula por ponto para conversão decimal
  cleanValue = cleanValue.replace(',', '.');
  
  // Remove caracteres não numéricos exceto ponto decimal
  cleanValue = cleanValue.replace(/[^\d\.]/g, '');
  
  return parseFloat(cleanValue) || 0;
}

/**
 * Formata um valor numérico para exibição como moeda
 * @param value - Valor numérico
 * @returns Valor formatado como moeda brasileira
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}