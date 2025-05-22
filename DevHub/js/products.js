// Products data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        category: "mobile",
        price: 999,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoePF8GESGD-cildPDLyS360LkY_qltBvWaQ&s",
        description: "Latest iPhone with advanced camera system"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        category: "mobile",
        price: 899,
        rating: 4.7,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxmOEIBdaknwcUEi2VG6UEZIXeglAux88-BQ&s",
        description: "Flagship Android phone with AI features"
    },
    {
        id: 3,
        name: "Sony WH-1000XM5",
        category: "headphones",
        price: 399,
        rating: 4.9,
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FSony-Cancellation-Headphones-Multi-Point-Connection%2Fdp%2FB0BS74M665&psig=AOvVaw0ev1qiywj6Lc-kdlFX6Hj_&ust=1748000903667000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCV3_iAt40DFQAAAAAdAAAAABAE",
        description: "Premium noise-cancelling headphones"
    },
    {
        id: 4,
        name: "Poco F1",
        category: "mobile",
        price: 299,
        rating: 4.5,
        image: "https://images.firstpost.com/wp-content/uploads/2018/08/Poco-F1-Hero-1280.jpg?im=FitAndFill=(596,336)",
        description: "Budget flagship with powerful performance"
    },
    {
        id: 5,
        name: "Zebronics Zeb-Blast",
        category: "headphones",
        price: 49,
        rating: 4.2,
        image: "https://shop.zebronics.com/cdn/shop/files/Zeb-Blast-Z-pic1.jpg?v=1708946658",
        description: "Affordable wireless headphones"
    },
    {
        id: 6,
        name: "BMW M5",
        category: "cars",
        price: 99999,
        rating: 4.9,
        image: "https://i.ytimg.com/vi/zEr-mm8OSGo/maxresdefault.jpg",
        description: "Luxury performance sedan"
    },
    {
        id: 7,
        name: "Mercedes AMG GT",
        category: "cars",
        price: 89999,
        rating: 4.8,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPph3j9UzedYwwQBBNeXNtEKDG7pXb7_xnpPagzBkKMqTpK84d5qEAnucCiGzGZ51QE_g&usqp=CAU",
        description: "High-performance sports car"
    },
    {
        id: 8,
        name: "Zebronics Zeb-Havoc",
        category: "headphones",
        price: 79,
        rating: 4.3,
        image: "https://shop.zebronics.com/cdn/shop/files/Zeb-Havoc-pic1.jpg?v=1717221774",
        description: "Gaming headphones with RGB"
    }
];

class ProductsManager {
    constructor() {
        this.products = products;
        this.filteredProducts = [...products];
        this.searchInput = document.querySelector('#searchInput');
        this.categoryFilters = document.querySelectorAll('input[name="category"]');
        this.sortSelect = document.querySelector('#sortSelect');
        this.productsGrid = document.querySelector('#productsGrid');

        this.init();
    }

    init() {
        // Search event listener
        this.searchInput.addEventListener('input', () => this.filterProducts());

        // Category filter event listeners
        this.categoryFilters.forEach(filter => {
            filter.addEventListener('change', () => this.filterProducts());
        });

        // Sort event listener
        this.sortSelect.addEventListener('change', () => this.filterProducts());

        // Initial render
        this.renderProducts();
    }

    filterProducts() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedCategories = Array.from(this.categoryFilters)
            .filter(filter => filter.checked)
            .map(filter => filter.value);

        // Apply filters
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategories.length === 0 || 
                                  selectedCategories.includes(product.category);
            return matchesSearch && matchesCategory;
        });

        // Apply sorting
        const sortBy = this.sortSelect.value;
        switch (sortBy) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        }

        this.renderProducts();
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        if (hasHalfStar) {
            stars += '✨';
        }

        return stars;
    }

    renderProducts() {
        this.productsGrid.innerHTML = '';

        this.filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="star-rating">${this.generateStarRating(product.rating)} (${product.rating})</div>
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            `;

            this.productsGrid.appendChild(productCard);
        });
    }
}

// Initialize Products Manager
const productsManager = new ProductsManager(); 