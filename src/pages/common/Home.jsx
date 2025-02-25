import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { IoIosLink } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { ARTICLES } from "../../constants/articles";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <Header />
      <ClaimArticles />
    </div>
  );
};

function Header() {
  return (
    <div className="pt-4 pb-4">
      <div className="flex items-center">
        <svg
          className="w- mr-2 h-9 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
        <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      </div>
      <p className="mt-2 text-gray-700 italic">
        Welcome to our claims management system. Stay informed about the latest
        claim processes and tips.
      </p>
    </div>
  );
}

function ClaimArticles() {
  const [visibleCount, setVisibleCount] = useState(1);

  const handleReadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 1, ARTICLES.length));
  };

  return (
    <div className="mx-auto max-w-7xl">
      {ARTICLES.slice(0, visibleCount).map((article, index) => (
        <Articles key={index} article={article} />
      ))}

      {visibleCount < ARTICLES.length ? (
        <ButtonAction onClick={handleReadMore}>Read more</ButtonAction>
      ) : (
        <p className="w mx-auto text-center text-gray-500">
          No more articles to load.
        </p>
      )}
    </div>
  );
}

function Articles({ article }) {
  return (
    <div className="mb-8 w-full">
      <h2 className="flex cursor-pointer items-center gap-2 text-xl font-bold">
        <FaHashtag className="inline text-gray-500" />
        <p>{article.title}</p>

        <IoIosLink className="inline text-gray-500" />
      </h2>
      <hr className="mt-1 mb-3 w-[30%] border-gray-300" />

      <p className="mb-3 text-gray-700">{article.content}</p>

      <img
        src={article.image}
        alt={article.title}
        className="h-64 w-full rounded-md object-cover"
      />
    </div>
  );
}

function ButtonAction({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 cursor-pointer rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
    >
      {children}
    </button>
  );
}

export default Home;
