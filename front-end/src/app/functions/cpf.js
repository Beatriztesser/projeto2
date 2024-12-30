export const insertMaskinCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11);
    }
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  