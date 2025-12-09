require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

const products = [
    // Chicken Products
    { name: 'whole chicken', price: '$10.80/kg', category: 'Chicken', status: 'Sold Out' },
    { name: 'half chicken', price: '$9.60/kg', category: 'Chicken', status: 'Sold Out' },
    { name: 'boneless skinless breast - single', price: '$21.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'boneless skinless breast - double', price: '$21.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'whole wings (package of 5 pieces)', price: '$11.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'thighs (package of 5)', price: '$11.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'drums (package of 5)', price: '$10.80/kg', category: 'Chicken', status: 'Available' },
    { name: 'bird in a bag (individual pieces, back removed)', price: '$10.00/kg', category: 'Chicken', status: 'Sold Out' },
    { name: 'backs (package of 2)', price: '$3.50/kg', category: 'Chicken', status: 'Available' },
    { name: 'Greek chicken sausage (package of 4)', price: '$12.50/pkg', category: 'Chicken', status: 'Available' },
    { name: 'chicken heart & liver (~1lb. pkg)', price: '$4.00/lb.', category: 'Chicken', status: 'Sold Out' },

    // Turkey Products
    { name: 'whole turkey', price: 'Sold Out', category: 'Turkey', status: 'Sold Out' },
    { name: 'ground turkey', price: 'Sold Out', category: 'Turkey', status: 'Sold Out' },
    { name: 'turkey giblets (1 of each: neck, heart, liver, kidney)', price: '$5.00/bag', category: 'Turkey', status: 'Sold Out' },
    { name: 'turkey livers (~1lb. pkg)', price: '$4.00/bag', category: 'Turkey', status: 'Available' },
    { name: 'turkey heart & liver (~0.3 lb. pkg)', price: '$1/bag', category: 'Turkey', status: 'Available' },
    { name: 'turkey hearts (~1lb. pkg)', price: '$4.00/bag', category: 'Turkey', status: 'Sold Out' },

    // Beef Products
    { name: 'ground (1lb. pkg)', price: '$7.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'ground (2lb. pkg)', price: '$7.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'stew cubes', price: '$7.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'fresh dinner sausage', price: '$10.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'patties - plain', price: '$8.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'patties - salisbury', price: '$8.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'rib roast', price: '$19.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'sirloin tip roast', price: '$12.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'round roast', price: '$9.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'cross rib roast', price: '$10.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'blade/baron roast', price: '$10.00/lb.', category: 'Beef', status: 'Available' },
    { name: 't-bone steak', price: '$19.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'rib steak', price: '$19.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'sirloin butt steak', price: '$10.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'sirloin tip steak', price: '$16.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'blade/chuck steak', price: '$11.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'flat iron steak', price: '$17.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'round steak', price: '$9.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'minute steak', price: '$9.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'tenderloin steak', price: '$30.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'maui short ribs', price: '$7.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'traditional short ribs', price: '$7.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'rolled brisket', price: '$12.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'oxtail', price: '$8.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'soup/dog bones', price: '$3.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'liver', price: '$4.00/pkg', category: 'Beef', status: 'Available' },
    { name: 'fat', price: '$4.00/lb.', category: 'Beef', status: 'Sold Out' },

    // Bulk Beef
    { name: 'Quarter (mix of front & hind)', price: '$7.10/lb.', category: 'Bulk Beef', status: 'Available' },
    { name: 'Half', price: '$6.90/lb.', category: 'Bulk Beef', status: 'Available' },
    { name: 'Whole', price: '$6.70/lb.', category: 'Bulk Beef', status: 'Available' },

    // Pork Products
    { name: 'chops', price: '$10.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'cutlets', price: '$10.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'leg steaks', price: '$8.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'ham (cured & smoked)', price: '$12.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'bacon (cured & smoked)', price: '$13.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'ground (~1lb. packages)', price: '$6.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'breakfast sausage', price: '$10.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'shoulder/picnic roast', price: '$8.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'loin roast', price: '$11.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'leg roast', price: '$8.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'side spare ribs', price: '$10.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'back spare ribs', price: '$10.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'riblets', price: '$9.50/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'bag of fat', price: '$4.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'bag of bones (2-3 bones/bag, approx. 2 lbs.)', price: '$5.00/bag', category: 'Pork', status: 'Available' },
    { name: 'liver (~1lb. pkg)', price: '$4.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'kidney', price: '$5.00', category: 'Pork', status: 'Sold Out' },
    { name: 'heart', price: '$6.00', category: 'Pork', status: 'Sold Out' },

    // Bulk Pork
    { name: 'Whole Pork', price: '$650-1000', category: 'Bulk Pork', status: 'Available' },

    // Bulk Lamb
    { name: 'Whole Lamb', price: '$400-500', category: 'Bulk Lamb', status: 'Sold Out' },
];

async function seedProducts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products (optional - comment out if you want to keep existing)
        await Service.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert all products
        const result = await Service.insertMany(products);
        console.log(`✅ Successfully seeded ${result.length} products!`);

        // Display summary by category
        const categories = [...new Set(products.map(p => p.category))];
        console.log('\n📊 Products by category:');
        for (const cat of categories) {
            const count = products.filter(p => p.category === cat).length;
            console.log(`   ${cat}: ${count} products`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
