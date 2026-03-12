document.addEventListener('DOMContentLoaded', () => {
    // Referências dos Elementos
    const stepEmail = document.getElementById('step-email');
    const stepPassword = document.getElementById('step-password');
    const formEmail = document.getElementById('form-email');
    const formPassword = document.getElementById('form-password');

    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');

    const emailError = document.getElementById('email-error');
    const emailErrorText = document.getElementById('email-error-text');
    const passwordError = document.getElementById('password-error');
    const passwordErrorText = document.getElementById('password-error-text');

    const userDisplayEmail = document.getElementById('user-display-email');
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

    // Funções de erro para reutilizar
    const showError = (inputElement, errorElement, textElement, message) => {
        inputElement.classList.add('error-border');
        textElement.textContent = message;
        errorElement.classList.add('show-error');
    };

    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('error-border');
        errorElement.classList.remove('show-error');
    };

    // Submissão do Formulário de E-mail
    formEmail.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Remove espaços antes e depois do e-mail
        let emailValue = inputEmail.value.trim();

        // Limpar os erros caso existam
        clearError(inputEmail, emailError);

        // Validação 1: Campo Vazio
        if (emailValue === '') {
            showError(inputEmail, emailError, emailErrorText, "Digite um e-mail ou número de telefone");
            return;
        }

        // Validação 2: Verificar se parece com um telefone
        const isPhone = /^\d{8,15}$/.test(emailValue.replace(/\D/g, ''));

        // Regras de negócio restritas (Exigimos @gmail.com)
        if (!emailValue.includes('@') && !isPhone) {
            // Se o usuário digitou apenas texto (ex: "davib"), o Google anexa @gmail.com sozinho
            emailValue += '@gmail.com';
        } else if (emailValue.includes('@')) {
            // Se ele colocou um '@', mas não for do Gmail, bloqueamos como solicitado
            const domain = emailValue.split('@')[1].toLowerCase();
            if (domain !== 'gmail.com') {
                showError(inputEmail, emailError, emailErrorText, "Não foi possível encontrar sua Conta do Google. Use um @gmail.com.");
                return;
            }
        }

        savedEmail = emailValue.toLowerCase(); // Guarda email e converte para minúsculo

        // Ativando animação de carregamento
        await showLoader(800);

        // Transição de tela
        userDisplayEmail.textContent = savedEmail;

        // Add as animações
        stepEmail.classList.add('slide-left-out');
        stepPassword.classList.remove('hidden');
        stepPassword.classList.add('slide-right-in');

        // Um pequeno delay para o navegador processar a classe nova antes de animar
        setTimeout(() => {
            stepPassword.classList.add('slide-right-in-active');
            setTimeout(() => {
                stepEmail.classList.add('hidden');
                stepEmail.classList.remove('slide-left-out');
                stepPassword.classList.remove('slide-right-in', 'slide-right-in-active');
                inputPassword.focus();
            }, 400); // duração da transição css
        }, 10);
    });

    // Limpar o erro no momento exato em que o usuário voltar a digitar
    inputEmail.addEventListener('input', () => clearError(inputEmail, emailError));
    inputPassword.addEventListener('input', () => clearError(inputPassword, passwordError));

    // Botão Voltar (Click no Perfil do usuário)
    btnBack.addEventListener('click', () => {
        // Reset da senha ao voltar
        inputPassword.value = '';
        clearError(inputPassword, passwordError);

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

        // Validar senha vazia
        if (passValue === '') {
            showError(inputPassword, passwordError, passwordErrorText, "Digite uma senha");
            return;
        }

        // Simula loading final
        await showLoader(1200);

        // Comportamento final com sucesso
        alert(`Login efetuado com sucesso!\nSua conta simulada: ${savedEmail}`); // Alerta de teste

        // Retorna silenciosamente para a página inicial apagando rastro
        inputPassword.value = '';
        btnBack.click();
    });

    // Função nativa do Google: Mostrar ou Ocultar Senha
    showPwdCheckbox.addEventListener('change', () => {
        if (showPwdCheckbox.checked) {
            inputPassword.type = 'text';
        } else {
            inputPassword.type = 'password';
        }
    });

});
