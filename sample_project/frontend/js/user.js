document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('users-table-body');
    const modalOverlay = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const modalTitle = document.getElementById('modal-title');
    const addUserBtn = document.getElementById('add-user-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    
    // Form fields
    const userIdInput = document.getElementById('user-id');
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const roleInput = document.getElementById('role');
    const passwordInput = document.getElementById('password');
    const passwordHint = document.getElementById('password-hint');

    // Hidden fields for updates
    const oldUsernameInput = document.getElementById('old-username');
    const oldEmailInput = document.getElementById('old-email');
    const oldPhoneInput = document.getElementById('old-phone');

    // Load Users
    loadUsers();

    async function loadUsers() {
        try {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Loading...</td></tr>';
            const response = await Api.get('/user/getAllUser');
            
            if (response.status) {
                renderTable(response.data);
            } else {
                tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">${response.msg}</td></tr>`;
            }
        } catch (error) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--error);">${error.message}</td></tr>`;
        }
    }

    function renderTable(users) {
        tableBody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><span style="padding: 0.25rem 0.5rem; background: ${user.role === 'admin' ? '#e0e7ff' : '#f1f5f9'}; color: ${user.role === 'admin' ? 'var(--primary-color)' : 'var(--text-main)'}; border-radius: 4px; font-size: 0.875rem;">${user.role}</span></td>
                <td>
                    <button class="btn btn-edit" style="color: var(--primary-color); background: none; padding: 0.25rem 0.5rem; margin-right: 0.5rem;">Edit</button>
                    <button class="btn btn-delete" style="color: var(--error); background: none; padding: 0.25rem 0.5rem;">Delete</button>
                </td>
            `;
            
            // Attach event listeners
            tr.querySelector('.btn-edit').addEventListener('click', () => openModal(user));
            tr.querySelector('.btn-delete').addEventListener('click', () => deleteUser(user.user_id || user.id)); // Assuming user_id based on DB schema

            tableBody.appendChild(tr);
        });
    }

    // Modal Logic
    addUserBtn.addEventListener('click', () => openModal(null));
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    function openModal(user) {
        userForm.reset();
        if (user) {
            modalTitle.textContent = 'Edit User';
            userIdInput.value = user.user_id || user.id; // Try both based on payload
            nameInput.value = user.name;
            usernameInput.value = user.username;
            emailInput.value = user.email;
            phoneInput.value = user.phone;
            addressInput.value = user.address;
            roleInput.value = user.role;
            
            // Set old values for validation bypass
            oldUsernameInput.value = user.username;
            oldEmailInput.value = user.email;
            oldPhoneInput.value = user.phone;

            passwordInput.required = false;
            passwordHint.style.display = 'block';
        } else {
            modalTitle.textContent = 'Add User';
            userIdInput.value = '';
            passwordInput.required = true;
            passwordHint.style.display = 'none';
        }
        modalOverlay.classList.add('open');
    }

    function closeModal() {
        modalOverlay.classList.remove('open');
    }

    // Submit Logic
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const isEdit = !!userIdInput.value;
        const payload = {
            name: nameInput.value,
            username: usernameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            address: addressInput.value,
            role: roleInput.value,
            password: passwordInput.value
        };

        let endpoint = '/user/createUser';
        
        if (isEdit) {
            endpoint = '/user/updateUser';
            payload.user_id = userIdInput.value;
            payload.old_username = oldUsernameInput.value;
            payload.old_email = oldEmailInput.value;
            payload.old_phone = oldPhoneInput.value;
            if (!payload.password) payload.password = 'unchanged'; // Backend might require it or checking logic
        }

        try {
            const response = await Api.post(endpoint, payload);
            if (response.status) {
                showToast(isEdit ? 'User Updated!' : 'User Created!', 'success');
                closeModal();
                loadUsers();
            } else {
                showToast(response.msg, 'error');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    async function deleteUser(id) {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        try {
            const response = await Api.delete(`/user/delete/${id}`);
            if (response.status) {
                showToast('User Deleted', 'success');
                loadUsers();
            } else {
                showToast(response.msg, 'error');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    }
});
