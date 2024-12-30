export const insertMaskIPhone = (telefone) => {
    telefone = telefone.replace(/\D/g, '');
    
    if (telefone.length > 11) {
      telefone = telefone.slice(0, 11);
    }
  
    return telefone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(telefone.length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  };
  