
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import Header from '@/components/Header';
import { getProductById, getPriceHistory, Product, PriceHistory } from '@/services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExternalLink, Truck, Info } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        
        if (productData) {
          const history = await getPriceHistory(id);
          setPriceHistory(history);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        toast.error('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const formatPrice = (price?: number, currency: string = 'USD') => {
    if (price === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="w-full aspect-square rounded-lg" />
            </div>
            <div className="md:col-span-3 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Sort prices from lowest to highest
  const sortedPrices = [
    ...(product.prices.amazon ? [{ platform: 'Amazon', ...product.prices.amazon }] : []),
    ...(product.prices.flipkart ? [{ platform: 'Flipkart', ...product.prices.flipkart }] : []),
  ].sort((a, b) => a.current - b.current);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Product Image */}
          <div className="md:col-span-2">
            <div className="sticky top-20">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.image || "https://via.placeholder.com/500x500"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/500x500?text=No+Image";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground mt-2">{product.description}</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="price-history">Price History</TabsTrigger>
                <TabsTrigger value="delivery-info">Delivery Info</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="pt-4 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {sortedPrices.length > 0 ? (
                      sortedPrices.map((price, index) => (
                        <Card key={price.platform} className={index === 0 ? "border-brand-orange border-2" : ""}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold">{price.platform}</h4>
                                  {index === 0 && (
                                    <span className="text-xs bg-brand-orange text-white px-2 py-0.5 rounded-full">
                                      Best Deal
                                    </span>
                                  )}
                                </div>
                                <p className="text-xl font-bold mt-1">{formatPrice(price.current, price.currency)}</p>
                                {price.original && (
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-muted-foreground line-through">
                                      {formatPrice(price.original, price.currency)}
                                    </span>
                                    {price.discount && (
                                      <span className="text-xs text-green-600 font-semibold">
                                        {price.discount}% off
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              <Button asChild>
                                <a href={price.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                  <span>Visit Site</span>
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No pricing information available</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Specifications</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex">
                            <span className="font-medium min-w-[120px] text-muted-foreground capitalize">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Ratings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.ratings.amazon && (
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Amazon:</span>
                            <div className="flex items-center">
                              <span className="mr-1 font-bold">{product.ratings.amazon}</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-4 h-4 ${star <= Math.floor(product.ratings.amazon as number) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {product.ratings.flipkart && (
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Flipkart:</span>
                            <div className="flex items-center">
                              <span className="mr-1 font-bold">{product.ratings.flipkart}</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <svg key={star} className={`w-4 h-4 ${star <= Math.floor(product.ratings.flipkart as number) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Price History Tab */}
              <TabsContent value="price-history" className="pt-4">
                {priceHistory.length > 0 ? (
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-black rounded-lg p-4 h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={priceHistory}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${formatPrice(value as number)}`, 'Price']}
                            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="amazon"
                            stroke="#FF9900"
                            activeDot={{ r: 8 }}
                            name="Amazon"
                            connectNulls
                          />
                          <Line
                            type="monotone"
                            dataKey="flipkart"
                            stroke="#2874F0"
                            activeDot={{ r: 8 }}
                            name="Flipkart"
                            connectNulls
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Price History Table */}
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="px-4 py-3 text-left font-medium">Date</th>
                                <th className="px-4 py-3 text-left font-medium">Amazon</th>
                                <th className="px-4 py-3 text-left font-medium">Flipkart</th>
                                <th className="px-4 py-3 text-left font-medium">Lowest Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {priceHistory.map((item) => {
                                // Calculate lowest price for this date
                                let lowestPrice: number | undefined;
                                let lowestPlatform: string | undefined;
                                
                                if (item.amazon !== undefined && item.flipkart !== undefined) {
                                  if (item.amazon <= item.flipkart) {
                                    lowestPrice = item.amazon;
                                    lowestPlatform = 'Amazon';
                                  } else {
                                    lowestPrice = item.flipkart;
                                    lowestPlatform = 'Flipkart';
                                  }
                                } else if (item.amazon !== undefined) {
                                  lowestPrice = item.amazon;
                                  lowestPlatform = 'Amazon';
                                } else if (item.flipkart !== undefined) {
                                  lowestPrice = item.flipkart;
                                  lowestPlatform = 'Flipkart';
                                }

                                return (
                                  <tr key={item.date} className="border-b">
                                    <td className="px-4 py-3 text-left">
                                      {new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                      })}
                                    </td>
                                    <td className="px-4 py-3 text-left">{item.amazon !== undefined ? formatPrice(item.amazon) : 'N/A'}</td>
                                    <td className="px-4 py-3 text-left">{item.flipkart !== undefined ? formatPrice(item.flipkart) : 'N/A'}</td>
                                    <td className="px-4 py-3 text-left">
                                      {lowestPrice !== undefined ? (
                                        <div className="flex items-center">
                                          <span className="font-medium text-brand-orange">{formatPrice(lowestPrice)}</span>
                                          <span className="ml-1 text-xs text-muted-foreground">
                                            on {lowestPlatform}
                                          </span>
                                        </div>
                                      ) : (
                                        'N/A'
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Info className="h-4 w-4 mr-1" />
                      Price history data is updated daily. Historical prices are for reference only and may not reflect current offers.
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No price history available for this product</p>
                  </div>
                )}
              </TabsContent>
              
              {/* Delivery Info Tab */}
              <TabsContent value="delivery-info" className="pt-4">
                <div className="grid gap-4">
                  {product.delivery.amazon && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Truck className="h-6 w-6 text-amazon" />
                          <div>
                            <h4 className="font-semibold">Amazon</h4>
                            <p className="text-base mt-1">Estimated delivery: <span className="font-medium">{product.delivery.amazon.estimatedDate}</span></p>
                            <p className="text-sm mt-1">
                              {product.delivery.amazon.isFree ? (
                                <span className="text-green-600">Free Delivery</span>
                              ) : (
                                <span>Delivery charges may apply</span>
                              )}
                            </p>
                            <Button variant="outline" size="sm" asChild className="mt-3">
                              <a href={product.prices.amazon?.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <span>Check on Amazon</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {product.delivery.flipkart && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Truck className="h-6 w-6 text-flipkart" />
                          <div>
                            <h4 className="font-semibold">Flipkart</h4>
                            <p className="text-base mt-1">Estimated delivery: <span className="font-medium">{product.delivery.flipkart.estimatedDate}</span></p>
                            <p className="text-sm mt-1">
                              {product.delivery.flipkart.isFree ? (
                                <span className="text-green-600">Free Delivery</span>
                              ) : (
                                <span>Delivery charges may apply</span>
                              )}
                            </p>
                            <Button variant="outline" size="sm" asChild className="mt-3">
                              <a href={product.prices.flipkart?.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <span>Check on Flipkart</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
                    <p className="flex items-center">
                      <Info className="h-4 w-4 mr-2" />
                      Delivery information is estimated and subject to change. For accurate delivery details, please check the respective e-commerce platforms.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
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

export default ProductDetails;
