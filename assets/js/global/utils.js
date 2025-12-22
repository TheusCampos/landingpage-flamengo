export const qs = (s, p = document) => p.querySelector(s);
export const qsa = (s, p = document) => p.querySelectorAll(s);

// Marca o documento como com JS ativo para habilitar efeitos progressivos
document.documentElement.classList.add('js');
