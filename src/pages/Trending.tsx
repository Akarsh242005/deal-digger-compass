
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Product, searchProducts } from '@/services/api';
import { ExternalLink } from 'lucide-react';

const Trending: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Here we use our search function with some popular queries to simulate trending products
        const results = await searchProducts("popular");
        setProducts(results);
      } catch (err) {
        console.error('Error fetching trending products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price?: number, currency: string = 'USD') => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  };

  const filterByCategory = (category: string) => {
    // In a real app, this would filter products by category
    // For now, we'll just return all products
    return products;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Trending Products</h1>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="home">Home & Kitchen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {renderProductGrid(products, isLoading)}
          </TabsContent>
          
          <TabsContent value="electronics" className="mt-4">
            {renderProductGrid(filterByCategory('electronics'), isLoading)}
          </TabsContent>
          
          <TabsContent value="fashion" className="mt-4">
            {renderProductGrid(filterByCategory('fashion'), isLoading)}
          </TabsContent>
          
          <TabsContent value="home" className="mt-4">
            {renderProductGrid(filterByCategory('home'), isLoading)}
          </TabsContent>
        </Tabs>
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

  function renderProductGrid(productList: Product[], loading: boolean) {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (productList.length === 0) {
      return (
        <div className="p-8 text-center">
          <p className="mb-4">No trending products found</p>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productList.map((product) => {
          // Calculate lowest price platform
          let lowestPrice: number | undefined;
          let lowestPlatform: string | undefined;
          
          if (product.prices.amazon?.current && product.prices.flipkart?.current) {
            if (product.prices.amazon.current <= product.prices.flipkart.current) {
              lowestPrice = product.prices.amazon.current;
              lowestPlatform = 'Amazon';
            } else {
              lowestPrice = product.prices.flipkart.current;
              lowestPlatform = 'Flipkart';
            }
          } else if (product.prices.amazon?.current) {
            lowestPrice = product.prices.amazon.current;
            lowestPlatform = 'Amazon';
          } else if (product.prices.flipkart?.current) {
            lowestPrice = product.prices.flipkart.current;
            lowestPlatform = 'Flipkart';
          }

          return (
            <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/300x200"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <Link to={`/product/${product.id}`}>
                  <h2 className="font-semibold text-lg mb-1 hover:text-brand-blue truncate">
                    {product.name}
                  </h2>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                
                <div className="mt-4 flex flex-wrap items-center gap-x-2">
                  <span className="text-sm font-medium">Best Price:</span>
                  <span className="text-lg font-bold text-brand-orange">
                    {lowestPrice ? formatPrice(lowestPrice) : 'N/A'}
                  </span>
                  {lowestPlatform && (
                    <span className="text-xs bg-muted rounded px-1.5 py-0.5">
                      on {lowestPlatform}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button asChild className="flex-1">
                  <Link to={`/product/${product.id}`}>
                    View Details
                  </Link>
                </Button>
                <div className="flex gap-1">
                  {product.prices.amazon && (
                    <Button variant="outline" size="icon" asChild className="h-9 w-9" title="Go to Amazon">
                      <a href={product.prices.amazon.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {product.prices.flipkart && (
                    <Button variant="outline" size="icon" asChild className="h-9 w-9" title="Go to Flipkart">
                      <a href={product.prices.flipkart.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    );
  }
};

export default Trending;
