document.addEventListener('DOMContentLoaded', () => {
    // Referências dos Elementos
    const stepEmail = document.getElementById('step-email');
    const stepPassword = document.getElementById('step-password');
    const formEmail = document.getElementById('form-email');
    const formPassword = document.getElementById('form-password');
    
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    const userDisplayEmail = document.getElementById('user-display-email');
    const fakeHiddenEmail = document.getElementById('email-hidden');
    const btnBack = document.getElementById('btn-back');
    const showPwdCheckbox = document.getElementById('show-pwd-checkbox');
    const loader = document.getElementById('loader');

    let savedEmail = '';

    // Função de carregar (Loader)
    const showLoader = (ms) => {
        return new Promise(resolve => {
            loader.classList.add('active');
            setTimeout(() => {
                loader.classList.remove('active');
                resolve();
            }, ms);
        });
    };

    // Validar Email básico
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email) || !isNaN(email) && email.length >= 8;
    };

    // Submissão do Formulário de E-mail
    formEmail.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailValue = inputEmail.value.trim();
        
        if (emailValue === '') {
            inputEmail.classList.add('error-border');
            emailError.textContent = "Digite um e-mail ou número de telefone válido";
            emailError.classList.add('show-error');
            return;
        }

        // Tira o erro se estava mostrando
        inputEmail.classList.remove('error-border');
        emailError.classList.remove('show-error');
        
        savedEmail = emailValue;
        
        // Ativando animação de carregamento
        await showLoader(800);
        
        // Transição de tela
        userDisplayEmail.textContent = savedEmail;
        fakeHiddenEmail.value = savedEmail; // pra questões de auto-save de senha do browser
        
        stepEmail.classList.add('slide-left-out');
        stepPassword.classList.remove('hidden');
        stepPassword.classList.add('slide-right-in');

        // Um pequenino delay para ativar animação
        setTimeout(() => {
            stepPassword.classList.add('slide-right-in-active');
            setTimeout(() => {
                stepEmail.classList.add('hidden');
                stepEmail.classList.remove('slide-left-out');
                stepPassword.classList.remove('slide-right-in', 'slide-right-in-active');
                inputPassword.focus();
            }, 400); // duracao da transicao css
        }, 10);
    });

    // Botão Voltar (Click no Perfil)
    btnBack.addEventListener('click', async () => {
        
        stepPassword.classList.add('slide-right-out');
        stepEmail.classList.remove('hidden');
        stepEmail.classList.add('slide-left-in');

        setTimeout(() => {
            stepEmail.classList.add('slide-left-in-active');
            setTimeout(() => {
                stepPassword.classList.add('hidden');
                stepPassword.classList.remove('slide-right-out');
                stepEmail.classList.remove('slide-left-in', 'slide-left-in-active');
                inputEmail.focus();
            }, 400);
        }, 10);
    });

    // Submissão do Formulário de Senha
    formPassword.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const passValue = inputPassword.value;
        if(passValue === '') {
            inputPassword.classList.add('error-border');
            passwordError.classList.add('show-error');
            return;
        }

        inputPassword.classList.remove('error-border');
        passwordError.classList.remove('show-error');

        // Simula loading final
        await showLoader(1200);
        
        // Comportamento fake final
        alert(`Login efetuado com sucesso!\nEmail: ${savedEmail}`);
        
        // Reset 
        inputPassword.value = '';
        btnBack.click();
    });

    // Mostrar ocultar senha
    showPwdCheckbox.addEventListener('change', () => {
        if (showPwdCheckbox.checked) {
            inputPassword.type = 'text';
        } else {
            inputPassword.type = 'password';
        }
    });

    // Remover borda de erro ao digitar
    inputEmail.addEventListener('input', () => {
        inputEmail.classList.remove('error-border');
        emailError.classList.remove('show-error');
    });

    inputPassword.addEventListener('input', () => {
        inputPassword.classList.remove('error-border');
        passwordError.classList.remove('show-error');
    });
});
