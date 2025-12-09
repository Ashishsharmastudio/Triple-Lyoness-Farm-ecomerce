import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { NEWS_DATA } from './News';

const NewsPost = () => {
    const { id } = useParams();
    const post = NEWS_DATA.find(p => p.id === id);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link to="/news" className="text-primary hover:underline">Back to News</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            <section className="bg-primary text-white py-16 text-center relative">
                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/news" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white flex items-center gap-2">
                        <Icon icon="solar:arrow-left-linear" /> Back
                    </Link>
                    <span className="text-sm font-bold text-accent uppercase tracking-wider mb-4 block">{post.date}</span>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold">{post.title}</h1>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 shadow-sm border border-primary/5">
                    <div
                        className="prose prose-lg mx-auto text-text/80 leading-relaxed prose-headings:font-serif prose-headings:text-primary prose-a:text-primary"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsPost;
