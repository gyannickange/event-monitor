import { Article } from '@/types/article';
import { notFound } from 'next/navigation';

async function getArticles(slug: string): Promise<Article | null> {
  const res = await fetch(`http://localhost:3001/api/v1/articles/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ArticlesDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticles(params.slug);

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-4">
        <a
          href={`/articles?category=${article.category}`}
          className="inline-block px-3 py-1 rounded-full bg-gray-200 text-sm font-medium mr-2"
        >
          {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
        </a>
        <span className="text-xs text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <div className="text-sm text-gray-600 mb-6">
        <span>By {article.author || article.sourceName}</span>
      </div>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="mb-6 rounded-xl max-h-96 object-cover w-full"
        />
      )}
      <p className="mb-4 text-lg">{article.description}</p>
      <div className="mb-8 text-base whitespace-pre-line">{article.content}</div>
    </div>
  );
}
