require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('../models/Service');

const products = [
    // Chicken Products
    { name: 'whole chicken', description: 'Fresh whole chicken, pasture-raised and ethically sourced', price: '$10.80/kg', category: 'Chicken', status: 'Sold Out' },
    { name: 'half chicken', description: 'Pasture-raised half chicken, perfect for smaller families', price: '$9.60/kg', category: 'Chicken', status: 'Sold Out' },
    { name: 'boneless skinless breast - single', description: 'Tender boneless, skinless chicken breasts, great for grilling', price: '$21.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'boneless skinless breast - double', description: 'Double portion of tender boneless, skinless chicken breasts', price: '$21.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'whole wings (package of 5 pieces)', description: 'Five whole chicken wings, perfect for roasting or frying', price: '$11.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'thighs (package of 5)', description: 'Juicy chicken thighs, great for braising or grilling', price: '$11.00/kg', category: 'Chicken', status: 'Available' },
    { name: 'drums (package of 5)', description: 'Meaty chicken drumsticks, ideal for barbecuing', price: '$10.80/kg', category: 'Chicken', status: 'Available' },
    { name: 'bird in a bag (individual pieces, back removed)', description: 'Convenient package with individual chicken pieces and backs removed', price: '$10.00/kg', category: 'Chicken', status: 'Sold Out' },
    { name: 'backs (package of 2)', description: 'Two chicken backs, perfect for making stock', price: '$3.50/kg', category: 'Chicken', status: 'Available' },
    { name: 'Greek chicken sausage (package of 4)', description: 'Flavorful Greek-style chicken sausages, four per package', price: '$12.50/pkg', category: 'Chicken', status: 'Available' },
    { name: 'chicken heart & liver (~1lb. pkg)', description: 'Nutritious chicken hearts and liver, approximately one pound', price: '$4.00/lb.', category: 'Chicken', status: 'Sold Out' },

    // Turkey Products
    { name: 'whole turkey', description: 'Fresh whole turkey, perfect for holiday meals', price: 'Sold Out', category: 'Turkey', status: 'Sold Out' },
    { name: 'ground turkey', description: 'Lean ground turkey, great for burgers and meatballs', price: 'Sold Out', category: 'Turkey', status: 'Sold Out' },
    { name: 'turkey giblets (1 of each: neck, heart, liver, kidney)', description: 'Complete set of turkey giblets for traditional recipes', price: '$5.00/bag', category: 'Turkey', status: 'Sold Out' },
    { name: 'turkey livers (~1lb. pkg)', description: 'Rich turkey livers, approximately one pound per package', price: '$4.00/bag', category: 'Turkey', status: 'Available' },
    { name: 'turkey heart & liver (~0.3 lb. pkg)', description: 'Small package of turkey heart and liver, perfect for small households', price: '$1/bag', category: 'Turkey', status: 'Available' },
    { name: 'turkey hearts (~1lb. pkg)', description: 'Nutritious turkey hearts, approximately one pound per package', price: '$4.00/bag', category: 'Turkey', status: 'Sold Out' },

    // Beef Products
    { name: 'ground (1lb. pkg)', description: 'Freshly ground pasture-raised beef, one pound packages', price: '$7.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'ground (2lb. pkg)', description: 'Freshly ground pasture-raised beef, two pound packages', price: '$7.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'stew cubes', description: 'Perfectly cut beef stew cubes, ready for slow cooking', price: '$7.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'fresh dinner sausage', description: 'Delicious fresh beef dinner sausages', price: '$10.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'patties - plain', description: 'Simple beef patties, perfect for classic burgers', price: '$8.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'patties - salisbury', description: 'Traditional Salisbury steak-style beef patties', price: '$8.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'rib roast', description: 'Premium rib roast, excellent for special occasions', price: '$19.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'sirloin tip roast', description: 'Tender sirloin tip roast, great for Sunday dinners', price: '$12.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'round roast', description: 'Versatile round roast, perfect for pot roasts', price: '$9.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'cross rib roast', description: 'Flavorful cross rib roast with rich marbling', price: '$10.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'blade/baron roast', description: 'Tasty blade or baron roast, budget-friendly option', price: '$10.00/lb.', category: 'Beef', status: 'Available' },
    { name: 't-bone steak', description: 'Classic T-bone steak with both strip and tenderloin', price: '$19.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'rib steak', description: 'Juicy rib steak, also known as ribeye', price: '$19.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'sirloin butt steak', description: 'Lean sirloin butt steak, great value option', price: '$10.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'sirloin tip steak', description: 'Tender sirloin tip steak, excellent for grilling', price: '$16.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'blade/chuck steak', description: 'Flavorful blade or chuck steak, perfect for braising', price: '$11.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'flat iron steak', description: 'Tender flat iron steak, great for grilling', price: '$17.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'round steak', description: 'Lean round steak, good for pan-frying', price: '$9.50/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'minute steak', description: 'Quick-cooking minute steak, tender and flavorful', price: '$9.50/lb.', category: 'Beef', status: 'Available' },
    { name: 'tenderloin steak', description: 'Premium tenderloin steak, the most tender cut', price: '$30.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'maui short ribs', description: 'Meaty Maui-style short ribs, great for grilling', price: '$7.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'traditional short ribs', description: 'Classic short ribs, perfect for braising', price: '$7.00/lb.', category: 'Beef', status: 'Sold Out' },
    { name: 'rolled brisket', description: 'Rolled brisket, excellent for smoking or braising', price: '$12.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'oxtail', description: 'Rich oxtail, perfect for stews and soups', price: '$8.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'soup/dog bones', description: 'Bones for making nutritious broth or dog treats', price: '$3.00/lb.', category: 'Beef', status: 'Available' },
    { name: 'liver', description: 'Nutritious beef liver, great for traditional recipes', price: '$4.00/pkg', category: 'Beef', status: 'Available' },
    { name: 'fat', description: 'Beef fat, perfect for rendering tallow or cooking', price: '$4.00/lb.', category: 'Beef', status: 'Sold Out' },

    // Bulk Beef
    { name: 'Quarter (mix of front & hind)', description: 'Quarter beef share, mix of front and hind cuts', price: '$7.10/lb.', category: 'Bulk Beef', status: 'Available' },
    { name: 'Half', description: 'Half beef share, great for families', price: '$6.90/lb.', category: 'Bulk Beef', status: 'Available' },
    { name: 'Whole', description: 'Whole beef share, maximum value option', price: '$6.70/lb.', category: 'Bulk Beef', status: 'Available' },

    // Pork Products
    { name: 'chops', description: 'Tender pork chops, perfect for grilling', price: '$10.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'cutlets', description: 'Thin pork cutlets, great for quick cooking', price: '$10.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'leg steaks', description: 'Meaty pork leg steaks, excellent for grilling', price: '$8.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'ham (cured & smoked)', description: 'Traditional cured and smoked ham', price: '$12.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'bacon (cured & smoked)', description: 'Delicious cured and smoked bacon', price: '$13.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'ground (~1lb. packages)', description: 'Freshly ground pork, one pound packages', price: '$6.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'breakfast sausage', description: 'Seasoned breakfast sausage, perfect for morning meals', price: '$10.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'shoulder/picnic roast', description: 'Versatile pork shoulder or picnic roast', price: '$8.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'loin roast', description: 'Tender pork loin roast, excellent for special occasions', price: '$11.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'leg roast', description: 'Classic pork leg roast, great for Sunday dinners', price: '$8.00/lb.', category: 'Pork', status: 'Available' },
    { name: 'side spare ribs', description: 'Meaty side spare ribs, perfect for barbecuing', price: '$10.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'back spare ribs', description: 'Back spare ribs, great for smoking or grilling', price: '$10.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'riblets', description: 'Smaller riblets, convenient for appetizers', price: '$9.50/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'bag of fat', description: 'Pork fat, perfect for rendering lard or cooking', price: '$4.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'bag of bones (2-3 bones/bag, approx. 2 lbs.)', description: 'Pork bones for making broth or dog treats', price: '$5.00/bag', category: 'Pork', status: 'Available' },
    { name: 'liver (~1lb. pkg)', description: 'Nutritious pork liver, approximately one pound', price: '$4.00/lb.', category: 'Pork', status: 'Sold Out' },
    { name: 'kidney', description: 'Pork kidneys, traditional ingredient', price: '$5.00', category: 'Pork', status: 'Sold Out' },
    { name: 'heart', description: 'Pork heart, great for offal enthusiasts', price: '$6.00', category: 'Pork', status: 'Sold Out' },

    // Bulk Pork
    { name: 'Whole Pork', description: 'Whole pork share, comprehensive selection', price: '$650-1000', category: 'Bulk Pork', status: 'Available' },

    // Bulk Lamb
    { name: 'Whole Lamb', description: 'Whole lamb share, premium pasture-raised option', price: '$400-500', category: 'Bulk Lamb', status: 'Sold Out' },
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
