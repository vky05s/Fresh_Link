// Global state
let currentUser = null;
let currentPage = 'landing';
let authMode = 'signup';
let authStep = 1;
let cart = [];
let currentCategory = 'vegetables';
let chatOpen = false;
let chatMinimized = false;

// Sample data
const products = {
    vegetables: [
        {
            id: 1,
            name: 'Fresh Tomatoes',
            image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
            sellers: [
                { name: 'Farm Fresh Co.', price: 40, rating: 4.5, stock: 50 },
                { name: 'Green Valley', price: 38, rating: 4.2, stock: 30 },
                { name: 'Organic Farms', price: 45, rating: 4.8, stock: 25 }
            ]
        },
        {
            id: 2,
            name: 'Onions',
            image: 'https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg',
            sellers: [
                { name: 'Local Farms', price: 25, rating: 4.0, stock: 100 },
                { name: 'Fresh Direct', price: 23, rating: 4.3, stock: 75 }
            ]
        },
        {
            id: 3,
            name: 'Bell Peppers',
            image: 'https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg',
            sellers: [
                { name: 'Premium Produce', price: 80, rating: 4.6, stock: 20 },
                { name: 'Garden Fresh', price: 75, rating: 4.4, stock: 15 }
            ]
        }
    ],
    fruits: [
        {
            id: 4,
            name: 'Apples',
            image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
            sellers: [
                { name: 'Hill Station Fruits', price: 120, rating: 4.7, stock: 40 },
                { name: 'Fresh Orchard', price: 115, rating: 4.5, stock: 35 }
            ]
        },
        {
            id: 5,
            name: 'Bananas',
            image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg',
            sellers: [
                { name: 'Tropical Farms', price: 50, rating: 4.3, stock: 60 },
                { name: 'Golden Banana Co.', price: 48, rating: 4.1, stock: 45 }
            ]
        }
    ],
    dairy: [
        {
            id: 6,
            name: 'Fresh Milk',
            image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
            sellers: [
                { name: 'Dairy Fresh', price: 60, rating: 4.8, stock: 20 },
                { name: 'Pure Milk Co.', price: 58, rating: 4.6, stock: 25 }
            ]
        }
    ]
};

// Page management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    currentPage = pageId;
}

function showLanding() {
    showPage('landing-page');
}

function showAuth(mode) {
    authMode = mode;
    authStep = mode === 'signin' ? 2 : 1;
    document.getElementById('auth-title').textContent = mode === 'signin' ? 'Sign In' : 'Create Account';
    updateAuthStep();
    showPage('auth-page');
}

function updateAuthStep() {
    // Hide all steps
    document.querySelectorAll('.auth-step').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show current step
    document.getElementById(`auth-step-${authStep}`).classList.remove('hidden');
    
    // Update continue button state
    updateContinueButton();
}

function updateContinueButton() {
    const continueBtn = document.getElementById('auth-continue');
    let disabled = false;
    
    if (authMode === 'signup' && authStep === 1) {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        disabled = !firstName || !lastName;
    } else if ((authMode === 'signup' && authStep === 2) || (authMode === 'signin' && authStep === 2)) {
        const phone = document.getElementById('phone').value;
        disabled = !phone;
    } else if ((authMode === 'signup' && authStep === 3) || (authMode === 'signin' && authStep === 2)) {
        const otp = document.getElementById('otp').value;
        disabled = otp.length !== 4;
    }
    
    continueBtn.disabled = disabled;
    continueBtn.style.opacity = disabled ? '0.5' : '1';
    continueBtn.style.cursor = disabled ? 'not-allowed' : 'pointer';
}

function handleAuthContinue() {
    if (authMode === 'signin') {
        if (authStep === 2) {
            authStep = 2; // Go to OTP
            document.getElementById('phone-display').textContent = document.getElementById('phone').value;
            updateAuthStep();
        } else if (authStep === 2) {
            // Complete signin - default to vendor role for demo
            completeAuth('vendor');
        }
    } else {
        if (authStep === 1) {
            authStep = 2; // Go to phone
            updateAuthStep();
        } else if (authStep === 2) {
            authStep = 3; // Go to OTP
            document.getElementById('phone-display').textContent = document.getElementById('phone').value;
            updateAuthStep();
        } else if (authStep === 3) {
            // Show role selection
            showRoleModal();
        }
    }
}

function showRoleModal() {
    document.getElementById('role-modal').classList.add('active');
}

function selectRole(role) {
    document.getElementById('role-modal').classList.remove('active');
    completeAuth(role);
}

function completeAuth(role) {
    const firstName = document.getElementById('firstName').value || 'User';
    const lastName = document.getElementById('lastName').value || 'Name';
    const phone = document.getElementById('phone').value;
    
    currentUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        phone,
        role
    };
    
    // Update dashboard with user info
    updateUserInfo();
    
    // Show appropriate dashboard
    showDashboard(role);
}

function updateUserInfo() {
    if (!currentUser) return;
    
    // Update all user info elements
    const elements = {
        'vendor-avatar': currentUser.firstName.charAt(0).toUpperCase(),
        'vendor-name': `${currentUser.firstName} ${currentUser.lastName}`,
        'vendor-phone': currentUser.phone,
        'vendor-welcome-name': currentUser.firstName,
        'seller-avatar': currentUser.firstName.charAt(0).toUpperCase(),
        'seller-name': `${currentUser.firstName} ${currentUser.lastName}`,
        'seller-phone': currentUser.phone,
        'seller-welcome-name': currentUser.firstName,
        'delivery-avatar': currentUser.firstName.charAt(0).toUpperCase(),
        'delivery-name': `${currentUser.firstName} ${currentUser.lastName}`,
        'delivery-phone': currentUser.phone,
        'delivery-welcome-name': currentUser.firstName
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

function showDashboard(role) {
    const dashboardId = `${role}-dashboard`;
    showPage(dashboardId);
    
    // Initialize dashboard content
    if (role === 'vendor') {
        loadProducts();
        updateCartDisplay();
        initializeChat();
    }
}

function signOut() {
    currentUser = null;
    cart = [];
    showLanding();
}

// Vendor Dashboard Functions
function setVendorTab(tabId) {
    // Update navigation
    document.querySelectorAll('#vendor-dashboard .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`#vendor-dashboard .nav-item[onclick="setVendorTab('${tabId}')"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('#vendor-dashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`vendor-${tabId}`).classList.add('active');
    
    // Load content based on tab
    if (tabId === 'categories') {
        loadProducts();
    } else if (tabId === 'cart') {
        updateCartDisplay();
    }
}

function setCategory(category) {
    currentCategory = category;
    
    // Update category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.category-tab[onclick="setCategory('${category}')"]`).classList.add('active');
    
    loadProducts();
}

function loadProducts() {
    const productsList = document.getElementById('products-list');
    const categoryProducts = products[currentCategory] || [];
    
    productsList.innerHTML = categoryProducts.map(product => `
        <div class="product-card">
            <div style="padding: 1rem; display: flex; gap: 1rem;">
                <img src="${product.image}" alt="${product.name}" style="width: 5rem; height: 5rem; border-radius: 0.5rem; object-fit: cover;">
                <div style="flex: 1;">
                    <h3 style="font-weight: 600; font-size: 1.125rem; margin-bottom: 0.5rem;">${product.name}</h3>
                    <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">Available from ${product.sellers.length} sellers</p>
                </div>
            </div>
            
            <div style="padding: 0 1rem 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                ${product.sellers.map(seller => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                        <div style="flex: 1;">
                            <div style="font-weight: 500; margin-bottom: 0.25rem;">${seller.name}</div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #6b7280;">
                                <i class="fas fa-star" style="color: #fbbf24;"></i>
                                <span>${seller.rating}</span>
                                <span>•</span>
                                <span>${seller.stock} kg available</span>
                            </div>
                        </div>
                        <div style="text-align: right; margin-right: 0.75rem;">
                            <div style="font-weight: 600; color: #16a34a;">₹${seller.price}/kg</div>
                        </div>
                        <button class="btn-primary small" onclick="addToCart('${product.name}', '${seller.name}', ${seller.price}, 1, 'kg', '${product.image}')">
                            <span>Add to Cart</span>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function addToCart(productName, sellerName, price, quantity, unit, image) {
    const cartItem = {
        id: Date.now(),
        productName,
        sellerName,
        price,
        quantity,
        unit,
        image
    };
    
    cart.push(cartItem);
    updateCartDisplay();
    
    // Show success feedback
    showToast(`${productName} added to cart!`);
}

function updateCartDisplay() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart badges
    document.getElementById('cart-count').textContent = cartCount;
    document.getElementById('nav-cart-count').textContent = cartCount;
    
    // Show/hide badges
    document.getElementById('cart-count').style.display = cartCount > 0 ? 'block' : 'none';
    document.getElementById('nav-cart-count').style.display = cartCount > 0 ? 'block' : 'none';
    
    // Update cart content
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartEmpty.style.display = 'block';
    } else {
        cartItems.style.display = 'block';
        cartEmpty.style.display = 'none';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.productName}">
                <div class="cart-item-info">
                    <h4>${item.productName}</h4>
                    <div class="cart-item-seller">${item.sellerName}</div>
                    <div class="cart-item-price">₹${item.price}/${item.unit}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateCartQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `).join('') + `
            <div style="background: white; padding: 1rem; border-radius: 0.75rem; border: 1px solid #e5e7eb; margin-top: 1rem;">
                <h3 style="font-weight: 600; margin-bottom: 1rem;">Delivery Slot</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                    ${['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM'].map(slot => `
                        <button style="padding: 0.75rem; border-radius: 0.5rem; border: 1px solid #d1d5db; background: white; cursor: pointer; font-size: 0.875rem;" onclick="selectSlot('${slot}')">
                            ${slot}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div style="background: white; padding: 1rem; border-radius: 0.75rem; border: 1px solid #e5e7eb; margin-top: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 1.125rem; font-weight: 600;">Total</span>
                    <span style="font-size: 1.125rem; font-weight: 600; color: #16a34a;">₹${cartTotal}</span>
                </div>
                <button class="btn-primary full-width" onclick="proceedToCheckout()">
                    <span>Proceed to Checkout</span>
                </button>
              
            </div>
        `;
    }
}

function updateCartQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = Math.max(0, cart[itemIndex].quantity + change);
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
    }
}

function selectSlot(slot) {
    // Update slot selection UI
    document.querySelectorAll('[onclick^="selectSlot"]').forEach(btn => {
        btn.style.borderColor = '#d1d5db';
        btn.style.background = 'white';
        btn.style.color = 'inherit';
    });

    event.target.style.borderColor = '#16a34a';
    event.target.style.background = '#f0fdf4';
    event.target.style.color = '#16a34a';
}

function proceedToCheckout() {
    showToast('Order placed successfully!');
    cart = [];
    updateCartDisplay();
    setVendorTab('orders');
}

function rateOrder(orderId, rating) {
    // Update star display
    const stars = event.target.parentElement.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.style.color = '#fbbf24';
        } else {
            star.classList.remove('active');
            star.style.color = '#d1d5db';
        }
    });
    showToast(`Thank you for rating! ${rating} stars`);
}

// Seller Dashboard Functions
function setSellerTab(tabId) {
    // Update navigation
    document.querySelectorAll('#seller-dashboard .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`#seller-dashboard .nav-item[onclick="setSellerTab('${tabId}')"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('#seller-dashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`seller-${tabId}`).classList.add('active');
}

function showAddProduct() {
    document.getElementById('add-product-modal').classList.add('active');
}

function closeAddProduct() {
    document.getElementById('add-product-modal').classList.remove('active');
}

// Delivery Dashboard Functions
function setDeliveryTab(tabId) {
    // Update navigation
    document.querySelectorAll('#delivery-dashboard .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`#delivery-dashboard .nav-item[onclick="setDeliveryTab('${tabId}')"]`).classList.add('active');
    
    // Update content
    document.querySelectorAll('#delivery-dashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`delivery-${tabId}`).classList.add('active');
}

// Chat Functions
function initializeChat() {
    if (currentUser && (currentUser.role === 'vendor' || currentUser.role === 'seller')) {
        document.getElementById('chat-box').style.display = 'block';
        
        // Update chat title based on role
        const chatTitle = document.querySelector('.chat-title span');
        if (chatTitle) {
            chatTitle.textContent = currentUser.role === 'vendor' ? 'Chat with Farmers' : 'Chat with Vendors';
        }
    }
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatWindow.classList.add('active');
        chatWindow.classList.remove('minimized');
        chatMinimized = false;
    } else {
        chatWindow.classList.remove('active');
    }
}

function minimizeChat() {
    const chatWindow = document.getElementById('chat-window');
    chatMinimized = !chatMinimized;
    
    if (chatMinimized) {
        chatWindow.classList.add('minimized');
    } else {
        chatWindow.classList.remove('minimized');
    }
}

function closeChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.remove('active');
    chatOpen = false;
    chatMinimized = false;
}

function sendMessage() {
    const messageInput = document.getElementById('chat-message');
    const message = messageInput.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        messageInput.value = '';
        
        // Simulate response after 2 seconds
        setTimeout(() => {
            const responseElement = document.createElement('div');
            responseElement.className = 'message received';
            responseElement.innerHTML = `
                <div class="message-sender">${currentUser.role === 'vendor' ? 'Farm Fresh Co.' : 'Street Vendor A'}</div>
                <div class="message-content">Thanks for your message! I'll get back to you soon.</div>
                <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            `;
            messagesContainer.appendChild(responseElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 2000);
    }
}

// Utility Functions
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #16a34a;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(toast);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add input event listeners for auth form validation
    ['firstName', 'lastName', 'phone', 'otp'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateContinueButton);
        }
    });
    
    // Add enter key support for chat
    const chatInput = document.getElementById('chat-message');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Initialize the app
    showLanding();
});

// Handle browser back button
window.addEventListener('popstate', function() {
    showLanding();
});

