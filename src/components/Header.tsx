
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold logo-gradient">Deal Digger</span>
              <span className="text-xs text-muted-foreground">Compare. Save. Shop.</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <form onSubmit={handleSearch} className="hidden md:block md:flex-1 md:px-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <nav className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="ghost" className="hidden md:flex">
                Home
              </Button>
            </Link>
            <Link to="/trending">
              <Button variant="ghost" className="hidden md:flex">
                Trending
              </Button>
            </Link>
            <form onSubmit={handleSearch} className="flex md:hidden">
              <Input
                type="search"
                placeholder="Search..."
                className="mr-2 w-36"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
