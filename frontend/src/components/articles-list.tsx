'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/types/category';
import Loader from './loader';
import { Article } from '@/types/article';
import { formatDate } from '@/utils/date-format';
import { getCategoryColor } from '@/utils/article-category';

export default function ArticlesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const selectedCategory = (searchParams.get('category') || 'all').toLowerCase();

  useEffect(() => {
    setCategoriesLoading(true);
    fetch('http://localhost:3001/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        setCategories([{ key: 'ALL', value: 'all' }, ...data]);
        setCategoriesLoading(false);
      });
  }, []);

  useEffect(() => {
    setArticlesLoading(true);
    const qs = selectedCategory !== 'all' ? `?category=${selectedCategory}` : '';
    fetch(`http://localhost:3001/api/v1/articles${qs}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setArticlesLoading(false);
      });
  }, [selectedCategory]);

  const handleFilterClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="max-w-6xl min-h-screen mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">📰 Latest Articles</h2>
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map(cat => (
          <a
            key={cat.value}
            href="#"
            onClick={e => {
              e.preventDefault();
              handleFilterClick(cat.value);
            }}
            className={`
              px-4 py-1 rounded-full border transition-all text-sm font-medium cursor-pointer
              ${selectedCategory === cat.value
                ? getCategoryColor(cat.value)
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            {cat.key.charAt(0).toUpperCase() + cat.key.slice(1).replace('_', ' ')}
          </a>
        ))}
      </div>

      {!articlesLoading ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(item => (
              <Link
                href={`/articles/${item.slug}`}
                key={item.id}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4 group"
              >
                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="h-48 w-full object-cover rounded-md mb-3 group-hover:opacity-80"
                  />
                )}
                <div className="flex gap-2 mb-2 items-center">
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-300 text-gray-800">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{formatDate(item.publishedAt)}</span>
                </div>
                <h3 className="font-semibold text-lg line-clamp-2 mb-1">{item.title}</h3>
                <div className="text-sm text-gray-700 line-clamp-2 mb-2">{item.description}</div>
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>Source: {item.sourceName}</span>
                  {item.author && <span>· By {item.author}</span>}
                </div>
              </Link>
            ))}
          </div>
          {articles.length === 0 && (
            <div className="text-center text-gray-400 py-8">No articles found.</div>
          )}
        </>
      ) : (
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <Loader />
        </div>
      )}
    </section>
  );
}
