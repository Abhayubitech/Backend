document.addEventListener('DOMContentLoaded', () => {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Tab Switching
    tabLogin.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLogin.style.borderBottom = '2px solid var(--primary-color)';
        tabLogin.style.color = 'var(--primary-color)';
        tabRegister.style.borderBottom = 'none';
        tabRegister.style.color = 'var(--text-muted)';
    });

    tabRegister.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabRegister.style.borderBottom = '2px solid var(--primary-color)';
        tabRegister.style.color = 'var(--primary-color)';
        tabLogin.style.borderBottom = 'none';
        tabLogin.style.color = 'var(--text-muted)';
    });

    // Login Handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await Api.post('/user/auth', { username, password });
            
            if (response.status) {
                // Login Success
                // The backend returns an array in data: [ { ...user } ]
                const userData = response.data[0]; 
                localStorage.setItem('user', JSON.stringify(userData));
                
                showToast('Login Successful!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showToast(response.msg, 'error');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    // Register Handler
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;
        const address = document.getElementById('reg-address').value;
        const role = document.getElementById('reg-role').value;

        try {
            const response = await Api.post('/user/createUser', {
                username, password, name, email, phone, address, role
            });

            if (response.status) {
                showToast('Registration Successful! Please Login.', 'success');
                // Switch to login tab
                tabLogin.click();
                registerForm.reset();
            } else {
                showToast(response.msg || 'Registration failed', 'error');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    });
});
