export function autoFormatDate(event: Event): void {
    
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  
  if (value.length > 0) {
    if (value.length <= 2) {
      input.value = value;
    } else if (value.length <= 4) {
      input.value = value.substring(0, 2) + '.' + value.substring(2);
    } else {
      input.value = value.substring(0, 2) + '.' + value.substring(2, 4) + '.' + value.substring(4, 8);
    }
  }
}