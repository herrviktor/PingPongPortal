import { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Pick<{ _id: string; name: string; },    "_id" | "name">[] | null>(null);

const handleSearchResults = (results: Pick<{ _id: string; name: string; }, "_id" | "name">[] | null) => {
  setSearchResults(results);
  console.log("Layout: sökresultat state uppdaterat:", results);
};


  return (
    <div className="bg-amber-200">
      <Header onSearchResults={handleSearchResults} />
      <main>
        <Outlet context={{ searchResults }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
