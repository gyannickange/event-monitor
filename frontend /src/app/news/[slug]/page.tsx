import { News } from '@/types/news';
import { notFound } from 'next/navigation';

async function getNews(slug: string): Promise<News | null> {
  const res = await fetch(`http://localhost:3001/news/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await getNews(params.slug);

  if (!news) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-4">
        <a
          href={`/news?category=${news.category}`}
          className="inline-block px-3 py-1 rounded-full bg-gray-200 text-sm font-medium mr-2"
        >
          {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
        </a>
        <span className="text-xs text-gray-500">{new Date(news.publishedAt).toLocaleDateString()}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{news.title}</h1>
      <div className="text-sm text-gray-600 mb-6">
        <span>By {news.author || news.sourceName}</span>
      </div>
      {news.urlToImage && (
        <img
          src={news.urlToImage}
          alt={news.title}
          className="mb-6 rounded-xl max-h-96 object-cover w-full"
        />
      )}
      <p className="mb-4 text-lg">{news.description}</p>
      <div className="mb-8 text-base whitespace-pre-line">{news.content}</div>
    </div>
  );
}
