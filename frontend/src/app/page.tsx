import Footer from '@/components/footer';
import Header from '@/components/header';
import NewsList from '@/components/news-list';

export default function HomePage() {
  return (
    <main>
      <Header />
      <NewsList />
      <Footer />
    </main>
  );
}
