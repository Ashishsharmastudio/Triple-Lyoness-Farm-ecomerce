import React from 'react';
import { Icon } from '@iconify/react';

const OurFarm = () => {
    const livestock = [
        {
            name: 'Laying Hens',
            icon: 'solar:chef-hat-heart-linear', // Placeholder
            content: (
                <>
                    <p className="mb-4">We have a summer house attached to a fenced yard where the hens have access to grass and insects. These naturally occurring feed sources provide the rich flavour and deep yellow colour of our eggs. A couple days a week, they are let out to roam the yard and hunt down grasshoppers.</p>
                    <p>During the winter months, the hens are housed in an insulated barn where they have free access to heated water, feed, lots of straw and roosts. The nest boxes are roomy and private which provides the hens with comfort and privacy during the laying of eggs. They are fed fruit and vegetable scraps which gives the eggs the deep yellow colour and more flavour. On warm, sunny days, the hens do venture out and scratch at the spilled grains in the bin yard nearby.</p>
                </>
            )
        },
        {
            name: 'Turkeys',
            icon: 'solar:star-linear',
            content: (
                <>
                    <p className="mb-4">We raise turkeys each summer on pasture with open faced sheds for wind and weather protection. There are roosts within the sheds to allow the turkeys to fly up and roost for the night.</p>
                    <p>The turkeys are provided with free access to water and a poultry ration feed. They are contained and protected from foxes and coyotes with snow or predator wire and our livestock guardian dogs deter these predators getting too close and figuring out how to get in.</p>
                </>
            )
        },
        {
            name: 'Broiler Chickens',
            icon: 'solar:sun-2-linear',
            content: (
                <>
                    <p>They are started as chicks in a barn until 3 weeks old when they can start being outdoors and then they are moved to the pastured pen at 4 weeks. We station feeders and waterers near 2 shelters, which they sleep in at night and use for protection from wind and rain. The shelters are moved every couple days to move the chickens to fresh grass.</p>
                </>
            )
        },
        {
            name: 'Beef Cattle',
            icon: 'solar:medal-ribbon-star-linear',
            content: (
                <>
                    <p className="mb-4">Each spring we hand select a couple yearling steers (castrated males) from our larger commercial herd to grain finish for our farm-direct meat sales. The calves are usually ones that have been born and raised on our farm, sometimes we select from the herd of steers that we bought the previous fall if the size and quality is better.</p>
                    <p className="mb-4">These cattle are separated into a smaller pasture for the summer and fed additional barley or oat grain 1–2 times a day until they reach finished weight.</p>
                    <p className="mb-4">Our cow herd will calve in April–May on pasture on the main farm. In June when the calves are big and healthy, and the pastures have a good amount of grass, we will haul smaller herds to summer pastures.</p>
                    <p>In the winter, we provide our cattle with free access to baled forages; grass, alfalfa and straw as well as daily grain for needed calories and nutrients.</p>
                </>
            )
        },
        {
            name: 'Hogs',
            icon: 'solar:heart-linear',
            content: (
                <>
                    <p>We currently purchase weaners (2–3 months old, 30–60 lbs) from local farmers that we raise outdoors. They have shelters, straw bedding and free access to feed and water. We also regularly feed them vegetable scraps, extra garden squash and flakes of hay for extra nutrition and entertainment.</p>
                </>
            )
        }
    ];

    return (
        <div className="bg-background min-h-screen">
            {/* Header / Intro */}
            <section className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl font-serif font-bold mb-6">Our Farm</h1>
                    <p className="text-xl max-w-3xl mx-auto text-white/90">
                        A family legacy of ethical farming and diverse production.
                    </p>
                </div>
            </section>

            {/* Family Story */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-primary/5">
                        <span className="text-secondary text-sm font-bold uppercase tracking-widest mb-4 block text-center">The Carlyon Family</span>
                        <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">About Us</h2>
                        <div className="prose prose-lg mx-auto text-text/80 leading-relaxed">
                            <p className="mb-6">
                                Triple Lyoness Farm is family run and operated by the three Carlyon daughters; Andria, Jessica, Briana, and their parents; Rod and Janet Carlyon. We created the name Triple Lyoness to represent the three Carlyon daughters. Our family is proud to produce pastured raised beef, chicken and turkey and free range pork and eggs.
                            </p>
                            <p>
                                Together, we maintain a small rural farming business that is not specialized in one area of agriculture. Instead, we choose to be diverse and have many different means of production. As the main operators, Rod and Janet are the core to a successful enterprise providing constant care to the animals, record keeping, and labour. The three daughters have contributed in many ways on the farm throughout their life and continue to immerse themselves in the agriculture industry while helping with large tasks on the farm and marketing meat products.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Livestock Sections */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-serif font-bold text-primary text-center mb-16">Our Livestock</h2>

                    <div className="space-y-24">
                        {livestock.map((animal, index) => (
                            <div key={animal.name} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="flex-1 w-full">
                                    <div className="aspect-[4/3] bg-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden group">
                                        {/* Placeholder for real images */}
                                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors"></div>
                                        <Icon icon={animal.icon} width="80" height="80" className="text-primary/30" />
                                    </div>
                                </div>
                                <div className="flex-1 w-full">
                                    <h3 className="text-3xl font-serif font-bold text-primary mb-6 flex items-center gap-3">
                                        {animal.name}
                                        <div className="h-px bg-secondary/30 flex-1"></div>
                                    </h3>
                                    <div className="text-text/80 leading-relaxed text-lg">
                                        {animal.content}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Lamb Section */}
                        <div className={`flex flex-col md:flex-row-reverse items-center gap-12`}>
                            <div className="flex-1 w-full">
                                <div className="aspect-[4/3] bg-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                                    <Icon icon="solar:leaf-linear" width="80" height="80" className="text-primary/30" />
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <h3 className="text-3xl font-serif font-bold text-primary mb-6 flex items-center gap-3">
                                    Lamb
                                    <div className="h-px bg-secondary/30 flex-1"></div>
                                </h3>
                                <div className="text-text/80 leading-relaxed text-lg">
                                    <p>We partner with neighbouring farms that raise their lambs out on pasture with added grain to provide you with a whole lamb, custom cut to your specifications.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurFarm;
