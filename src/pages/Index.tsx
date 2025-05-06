
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import { useState } from 'react';

const trendingSearches = ["iPhone", "Samsung Galaxy", "MacBook", "Wireless Headphones"];
const featuredCategories = [
  { id: "electronics", name: "Electronics", image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80" },
  { id: "fashion", name: "Fashion", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" },
  { id: "home", name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" },
];

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleTrendingSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-brand-light to-white dark:from-brand-dark dark:to-black">
          <div className="container flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              <span className="logo-gradient">Deal Digger</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Compare prices across Amazon, Flipkart, and more to find the best deals on your favorite products.
            </p>
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="absolute right-1 top-1/2 -translate-y-1/2 h-10" type="submit">
                  Search
                </Button>
              </div>
            </form>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-muted-foreground">Trending:</span>
              {trendingSearches.map((query) => (
                <Button
                  key={query}
                  variant="link"
                  className="p-0 h-auto text-brand-blue dark:text-blue-400"
                  onClick={() => handleTrendingSearch(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Deal Digger?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-black">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white mx-auto">
                      <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">Compare Prices</h3>
                    <p className="text-muted-foreground">
                      See real-time prices from multiple platforms in one place
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-black">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange text-white mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <path d="M3 3v18h18"></path>
                        <path d="m19 9-5 5-4-4-3 3"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Price History</h3>
                    <p className="text-muted-foreground">
                      Track price changes over time to find the best moment to buy
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-black">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Direct Links</h3>
                    <p className="text-muted-foreground">
                      Jump straight to product pages on your preferred platform
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <Link to={`/search?category=${category.id}`} key={category.id}>
                  <div className="group relative overflow-hidden rounded-lg h-48 w-full">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row md:h-16 items-center justify-between gap-4 md:gap-0">
          <p className="text-center md:text-left text-sm leading-loose text-muted-foreground">
            © 2025 Deal Digger. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
