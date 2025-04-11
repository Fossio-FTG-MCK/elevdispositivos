document.addEventListener('DOMContentLoaded', function() {
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    function filterPosts(category) {
        postCards.forEach(card => {
            if (category === 'todos' || card.dataset.category === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterPosts(this.dataset.category);
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function searchPosts(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            // If query is empty, show all posts
            postCards.forEach(card => card.style.display = 'flex');
            return;
        }
        
        postCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
            const category = card.querySelector('.post-category').textContent.toLowerCase();
            
            if (title.includes(query) || excerpt.includes(query) || category.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            searchPosts(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchPosts(searchInput.value);
                e.preventDefault();
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput.value.trim()) return;
            
            // In a real implementation, you would submit the form data to a server
            
            // Show success message
            const formElement = this;
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.innerHTML = `
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="none" stroke="#FFFFFF" stroke-width="2" />
                    <path d="M12,20 L18,26 L28,16" fill="none" stroke="#FFFFFF" stroke-width="2" />
                </svg>
                <p>Obrigado por se inscrever! Em breve você receberá nossas atualizações.</p>
            `;
            
            // Replace form with success message
            formElement.innerHTML = '';
            formElement.appendChild(successMessage);
            
            // Reset form after 3 seconds (for demonstration purposes)
            setTimeout(function() {
                formElement.innerHTML = `
                    <div class="form-group">
                        <input type="email" placeholder="Seu melhor e-mail" required>
                        <button type="submit" class="btn btn-secondary">Inscrever-se</button>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" id="privacy" required>
                        <label for="privacy">Concordo em receber e-mails da ELEV Dispositivos</label>
                    </div>
                `;
            }, 3000);
        });
    }
    
    // Comment form
    const commentForm = document.querySelector('.comment-form form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would submit the form data to a server
            
            // Show success message
            alert('Seu comentário foi enviado com sucesso e será publicado após moderação.');
            
            // Clear form
            this.reset();
        });
    }
    
    // Smooth scrolling for TOC links
    const tocLinks = document.querySelectorAll('.post-toc a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
