import NewsForm from '@/components/news-form';
import NewsList from '@/components/news-list';
import { useState } from 'react';

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main>
      <h1>🌎 Global News Monitor</h1>
      <NewsForm onSubmitted={() => setRefresh(!refresh)} />
      <NewsList key={refresh ? 1 : 0} />
    </main>
  );
}
