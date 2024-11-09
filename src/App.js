import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State variables
  const [bookTitle, setBookTitle] = useState('');  // To store the input title
  const [bookResults, setBookResults] = useState([]);  // To store the fetched books
  const [loading, setLoading] = useState(false);  // To track loading state
  const [error, setError] = useState('');  // To store error messages

  // Handle Search Function
  const handleSearch = async () => {
    if (!bookTitle) return; // Prevent search if no input
    setLoading(true); // Set loading to true
    setError(''); // Reset previous errors
    
    try {
      // Fetch data from Open Library API
      const response = await axios.get(`https://openlibrary.org/search.json?title=${bookTitle}`);
      setBookResults(response.data.docs); // Set the result to state
    } catch (err) {
      setError('Error fetching data. Please try again.'); // Set error if the request fails
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="App">
      <h1>Book Finder</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)} // Update the title state
        placeholder="Search for a book"
      />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}
      
      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Book Results */}
      <div>
        {bookResults.length > 0 && (
          <ul>
            {bookResults.map((book, index) => (
              <li key={index}>
                <h2>{book.title}</h2>
                {book.author_name && <p>Author(s): {book.author_name.join(', ')}</p>}
                {book.first_publish_year && <p>First Published: {book.first_publish_year}</p>}
                {book.cover_i && (
                  <img 
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                    alt={book.title} 
                    style={{ width: '100px' }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
