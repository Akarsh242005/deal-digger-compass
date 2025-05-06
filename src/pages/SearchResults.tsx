
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import { Product, searchProducts } from '@/services/api';
import { ExternalLink } from 'lucide-react';

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (err) {
        console.error('Error searching products:', err);
        setError('Failed to fetch search results');
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [query]);

  const formatPrice = (price?: number, currency: string = 'INR') => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            {query ? `Search results for "${query}"` : "Browse products"}
          </h1>
          
          {isLoading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <div className="flex justify-between mt-4">
                      <Skeleton className="h-10 w-24" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-destructive mb-4">{error}</p>
              <Button asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="mb-4">No products found for "{query}"</p>
              <Button asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
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
                  <Card key={product.id} className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg transition-shadow">
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
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-sm font-semibold">Best Price:</span>
                          <span className="text-lg font-bold text-brand-orange">
                            {lowestPrice ? formatPrice(lowestPrice) : 'N/A'}
                          </span>
                          {lowestPlatform && (
                            <span className="text-xs bg-muted rounded px-1.5 py-0.5">
                              on {lowestPlatform}
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {product.prices.amazon && (
                            <div className="border rounded p-2 text-center">
                              <div className="text-sm">Amazon</div>
                              <div className="font-semibold">
                                {formatPrice(product.prices.amazon.current)}
                              </div>
                              {product.prices.amazon.discount && (
                                <div className="text-xs text-green-600">
                                  {product.prices.amazon.discount}% off
                                </div>
                              )}
                            </div>
                          )}
                          
                          {product.prices.flipkart && (
                            <div className="border rounded p-2 text-center">
                              <div className="text-sm">Flipkart</div>
                              <div className="font-semibold">
                                {formatPrice(product.prices.flipkart.current)}
                              </div>
                              {product.prices.flipkart.discount && (
                                <div className="text-xs text-green-600">
                                  {product.prices.flipkart.discount}% off
                                </div>
                              )}
                            </div>
                          )}
                        </div>
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
          )}
        </div>
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

export default SearchResults;
