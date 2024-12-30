export const checkCep = async (cep, setValue, toast) => {
  cep = cep.replace(/\D/g, '');
  const formatCep = (cep) => {
    if (cep.length > 9) {
      cep = cep.slice(0, 9);
    }
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  };

  const formattedCep = formatCep(cep);
  setValue('cep', formattedCep);

  const cleanCep = formattedCep.replace(/\D/g, '');

  // Se o CEP for apagado ou tiver menos de 8 caracteres, limpamos os campos de endereço
  if (cleanCep.length < 8) {
    setValue('endereco', '');
    setValue('bairro', '');
    setValue('cidade', '');
    setValue('estado', '');
    return; // Interrompe a execução se o CEP for inválido ou incompleto
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (!response.ok) {
      throw new Error('Falha ao buscar o CEP');
    }

    const data = await response.json();

    if (data.erro) {
      toast.warn("CEP não encontrado!");
      setValue('endereco', '');
      setValue('bairro', '');
      setValue('cidade', '');
      setValue('estado', '');
    } else {
      setValue('endereco', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('cidade', data.localidade);
      setValue('estado', data.uf);
    }

  } catch (error) {
    toast.warn("CEP não encontrado!");
    setValue('endereco', '');
    setValue('bairro', '');
    setValue('cidade', '');
    setValue('estado', '');
  }
};
