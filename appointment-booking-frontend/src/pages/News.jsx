import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const NEWS_DATA = [
    {
        id: 'world-soil-day-2020',
        title: 'World Soil Day 2020',
        date: 'December 5, 2020',
        excerpt: 'Hey everyone, this weekend, on December 5 was INTERNATIONAL Soil Day and I wanted to share my view on the topic. Soil is just one of the many moving parts...',
        content: `
            <p>Hey everyone, this weekend, on December 5 was INTERNATIONAL Soil Day and I wanted to share my view on the topic.</p>
            <p>Soil is just one of the many moving parts of a successful agricultural operation. Without healthy soil, we cannot grow healthy crops or raise healthy animals. It is the foundation of our farm.</p>
            <p>We believe in regenerative agriculture practices that improve soil health over time. This includes rotational grazing, minimal tillage, and using natural fertilizers (manure) from our livestock.</p>
            <p>By mimicking nature's patterns, we can sequester carbon, improve water retention, and create a thriving ecosystem right beneath our feet.</p>
        `
    }
];

const News = () => {
    return (
        <div className="bg-background min-h-screen">
            <section className="bg-primary text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold mb-4">Latest News</h1>
                    <p className="max-w-xl mx-auto text-white/80">Updates from the farm.</p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-12">
                    {NEWS_DATA.map(post => (
                        <article key={post.id} className="bg-white p-8 md:p-12 border border-primary/10 shadow-sm flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 bg-primary/5 min-h-[200px] flex items-center justify-center text-primary/20">
                                {/* Image Placeholder */}
                                <Icon icon="solar:gallery-linear" width="64" height="64" />
                            </div>
                            <div className="md:w-2/3">
                                <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{post.date}</span>
                                <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                                    <Link to={`/news/${post.id}`} className="hover:text-secondary transition-colors">{post.title}</Link>
                                </h2>
                                <p className="text-text/70 mb-6 leading-relaxed">{post.excerpt}</p>
                                <Link to={`/news/${post.id}`} className="inline-flex items-center gap-2 text-primary font-bold uppercase text-sm tracking-wider hover:text-secondary transition-colors">
                                    Read Article <Icon icon="solar:arrow-right-linear" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;
