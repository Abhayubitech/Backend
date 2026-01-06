const API_CONFIG = {
    BASE_URL: 'http://localhost:3000'
};

class Api {
    static async request(endpoint, method = 'GET', body = null) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json'
        };

        const config = {
            method,
            headers,
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            // Adjust this based on your actual backend error structure
            // Identified backend sends { status: false, msg: "..." } on logic error
            // and HTTP codes.
            if (!response.ok) {
                throw new Error(data.msg || data.error || 'API Request Failed');
            }
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static async get(endpoint) {
        return this.request(endpoint, 'GET');
    }

    static async post(endpoint, body) {
        return this.request(endpoint, 'POST', body);
    }

    static async delete(endpoint) {
        return this.request(endpoint, 'DELETE');
    }

    static async put(endpoint, body) { // Assuming PUT, though backend uses POST for updates mostly
        return this.request(endpoint, 'PUT', body);
    }
}

// Simple Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '1rem 2rem';
    toast.style.background = type === 'success' ? 'var(--success)' : 'var(--error)';
    toast.style.color = 'white';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '1000';
    toast.style.animation = 'fadeIn 0.3s ease-out';
    
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
