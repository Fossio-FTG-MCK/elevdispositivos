document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const capacidadeSelect = document.getElementById('capacidade');
    const travamentoSelect = document.getElementById('travamento');
    const productItems = document.querySelectorAll('.product-item');
    
    function filterProducts() {
        const selectedCategory = document.querySelector('.category-btn.active').dataset.category;
        const selectedCapacidade = capacidadeSelect.value;
        const selectedTravamento = travamentoSelect.value;
        
        productItems.forEach(item => {
            const matchesCategory = selectedCategory === 'todos' || item.dataset.category === selectedCategory;
            const matchesCapacidade = selectedCapacidade === 'todos' || item.dataset.capacidade === selectedCapacidade;
            const matchesTravamento = selectedTravamento === 'todos' || item.dataset.travamento === selectedTravamento;
            
            if (matchesCategory && matchesCapacidade && matchesTravamento) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Category button click handler
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterProducts();
        });
    });
    
    // Select change handlers
    capacidadeSelect.addEventListener('change', filterProducts);
    travamentoSelect.addEventListener('change', filterProducts);
    
    // Check if URL has a hash and activate the corresponding category
    function activateFromHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const button = document.getElementById(hash);
            if (button) {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterProducts();
                
                // Scroll to filter section
                const filterSection = document.querySelector('.filter-section');
                if (filterSection) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: filterSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        }
    }
    
    activateFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', activateFromHash);
    
    // Responsive adjustments
    function handleResponsiveLayout() {
        const filterSection = document.querySelector('.filter-section');
        if (window.innerWidth <= 768) {
            filterSection.classList.remove('sticky');
        } else {
            filterSection.classList.add('sticky');
        }
    }
    
    window.addEventListener('resize', handleResponsiveLayout);
    handleResponsiveLayout();
});

