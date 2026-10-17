import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import RoutePhoto from '@/components/RoutePhoto';
import { format } from 'date-fns';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useBlogPost(slug || '');

  const post = data?.post;

  const formattedDate = post?.published_at 
    ? format(new Date(post.published_at), 'MMMM d, yyyy')
    : '';

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-16">
          <header className="page-hero">
            <RoutePhoto />
            <div className="container relative mx-auto px-4">
              <p className="page-hero__lede">Blog</p>
            </div>
          </header>
          <div className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-8 w-32 mb-8" />
              <Skeleton className="aspect-video w-full mb-8" />
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-6 w-1/3 mb-8" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-16">
          <header className="page-hero">
            <RoutePhoto />
            <div className="container relative mx-auto px-4 text-center">
              <h1 className="page-hero__title">Post not found</h1>
            </div>
          </header>
          <div className="container mx-auto px-4 pt-12 text-center">
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Wild AI Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        <meta property="og:type" content="article" />
        {post.og_image_url && <meta property="og:image" content={post.og_image_url} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.meta_description || post.excerpt} />
        {post.og_image_url && <meta name="twitter:image" content={post.og_image_url} />}
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pb-16">
          <header className="page-hero">
            <RoutePhoto />
            <div className="container relative mx-auto px-4">
              <Link
                to="/blog"
                className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <div className="mb-4 flex items-center gap-3">
                {post.category && (
                  <Badge variant="secondary">{post.category}</Badge>
                )}
                {formattedDate && (
                  <span className="text-sm text-white/80">{formattedDate}</span>
                )}
              </div>
              <h1 className="page-hero__title">{post.title}</h1>
              {post.excerpt && <p className="page-hero__lede">{post.excerpt}</p>}
            </div>
          </header>
          <article className="container mx-auto px-4 pt-12">
            <div className="max-w-3xl mx-auto">
              {post.og_image_url && (
                <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                  <img
                    src={post.og_image_url}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-mono prose-headings:text-foreground
                  prose-p:text-foreground/90
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-code:text-primary prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-secondary prose-pre:border prose-pre:border-border
                  prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                  prose-li:text-foreground/90
                  prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
