// ========== Sample Book Data ==========
const sampleRefurbishedBooks = [
    {
        title: 'Introduction to Psychology',
        author: 'David Myers',
        category: 'Science',
        condition: 'Like New',
        price: 45.99,
        description: 'Comprehensive introduction to psychological science'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        category: 'Fiction',
        condition: 'Good',
        price: 12.99,
        description: 'Classic American novel'
    },
    {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        category: 'Non-Fiction',
        condition: 'Like New',
        price: 18.99,
        description: 'A Brief History of Humankind'
    },
    {
        title: 'Linear Algebra',
        author: 'Gilbert Strang',
        category: 'Science',
        condition: 'Acceptable',
        price: 65.00,
        description: 'Mathematics textbook for engineering'
    },
    {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        category: 'Self-Help',
        condition: 'Good',
        price: 16.99,
        description: 'Psychology and decision-making insights'
    },
    {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        category: 'Science',
        condition: 'Like New',
        price: 14.99,
        description: 'Journey through space and time'
    },
    {
        title: 'Python Programming',
        author: 'John Guttag',
        category: 'Technology',
        condition: 'Good',
        price: 55.99,
        description: 'Introduction to computational thinking'
    },
    {
        title: '1984',
        author: 'George Orwell',
        category: 'Fiction',
        condition: 'Like New',
        price: 13.99,
        description: 'Dystopian novel'
    }
];

const sampleEbooks = [
    {
        title: 'Study Tips for Success',
        author: 'Sarah Chen',
        category: 'Self-Help',
        priceType: 'free',
        price: 0,
        description: 'Proven strategies for effective studying'
    },
    {
        title: 'Digital Marketing Handbook',
        author: 'Marcus Williams',
        category: 'Business',
        priceType: 'paid',
        price: 9.99,
        description: 'Complete guide to online marketing'
    },
    {
        title: 'Climate Change 101',
        author: 'Dr. Emma Roberts',
        category: 'Science',
        priceType: 'free',
        price: 0,
        description: 'Understanding environmental science'
    },
    {
        title: 'Creative Writing Workshop',
        author: 'Jessica Martinez',
        category: 'Fiction',
        priceType: 'paid',
        price: 14.99,
        description: 'Learn to write compelling stories'
    },
    {
        title: 'Financial Literacy Guide',
        author: 'Alex Thompson',
        category: 'Business',
        priceType: 'free',
        price: 0,
        description: 'Money management for students'
    }
];

// ========== Initialize Sample Data ==========
function initializeSampleData() {
    // Only add sample data if localStorage doesn't already have it
    if (!localStorage.getItem('refurbishedBooks')) {
        localStorage.setItem('refurbishedBooks', JSON.stringify(sampleRefurbishedBooks));
    }
    if (!localStorage.getItem('ebooks')) {
        localStorage.setItem('ebooks', JSON.stringify(sampleEbooks));
    }
}

// ========== Load Books on Home Page ==========
function loadBooksOnHomePage() {
    initializeSampleData();
    
    const refurbishedGrid = document.getElementById('refurbished-grid');
    const ebooksGrid = document.getElementById('ebooks-grid');
    
    if (refurbishedGrid) {
        const refurbishedBooks = JSON.parse(localStorage.getItem('refurbishedBooks')) || [];
        refurbishedBooks.forEach(book => {
            refurbishedGrid.appendChild(createBookCard(book, 'buy'));
        });
    }
    
    if (ebooksGrid) {
        const ebooks = JSON.parse(localStorage.getItem('ebooks')) || [];
        ebooks.forEach(ebook => {
            ebooksGrid.appendChild(createBookCard(ebook, 'read'));
        });
    }
}

// ========== Create Book Card ==========
function createBookCard(book, actionType = 'buy') {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    const conditionClass = book.condition === 'Like New' ? '' : 
                          book.condition === 'Good' ? ' good' : ' acceptable';
    
    const buttonLabel = actionType === 'read' ? 'Read Now' : 'Buy Now';
    const buttonClass = actionType === 'read' ? 'book-button ebook' : 'book-button';
    
    card.innerHTML = `
        <div class="book-cover">
            ${getBookEmoji(book.category)}
        </div>
        <div class="book-details">
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            ${book.condition ? `<div class="book-condition${conditionClass}">${book.condition}</div>` : ''}
            <div class="book-price">$${book.price.toFixed(2)}</div>
            <button class="${buttonClass}" onclick="handleBookAction(this, '${book.title}', ${book.price})">
                ${buttonLabel}
            </button>
        </div>
    `;
    
    return card;
}

// ========== Get Book Emoji by Category ==========
function getBookEmoji(category) {
    const emojiMap = {
        'Fiction': '📖',
        'Non-Fiction': '📚',
        'Science': '🔬',
        'History': '🏛️',
        'Technology': '💻',
        'Business': '💼',
        'Self-Help': '🌟',
        'Poetry': '✍️',
        'Other': '📕'
    };
    return emojiMap[category] || '📖';
}

// ========== Handle Book Purchase ==========
function handleBookAction(button, title, price) {
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = `Add this book to your collection for just $${price.toFixed(2)}`;
        document.getElementById('modalPrice').textContent = `$${price.toFixed(2)}`;
        modal.classList.add('show');
    }
}

// ========== Complete Purchase ==========
function completePurchase() {
    alert('Thank you for your purchase! In a real app, this would process your payment.');
    const modal = document.getElementById('purchaseModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// ========== Close Modal ==========
function setupModalHandlers() {
    const modal = document.getElementById('purchaseModal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.classList.remove('show');
        };
    }
    
    // Close modal when clicking outside
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    };
}

// ========== DOM Content Loaded ==========
document.addEventListener('DOMContentLoaded', function() {
    loadBooksOnHomePage();
    setupModalHandlers();
    
    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ========== Utility: Save to localStorage with delay prevention ==========
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// ========== Utility: Get from localStorage safely ==========
function getFromLocalStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

// ========== Debounce function for form handling ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== Form validation helper ==========
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    return form.checkValidity();
}

// ========== Number formatting helper ==========
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// ========== Date formatting helper ==========
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
