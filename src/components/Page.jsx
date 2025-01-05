// import React, { useEffect, useState } from "react";

// const Page = () => {
//     const [displayArt, setDisplayArt] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     useEffect(() => {
//         getArtByCulture('African'); // Fetching initial art culture
//     }, []);
    
//     const getArtByCulture = async (culture) => {
//         try {
//             const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=culture:${culture}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             const data = await response.json();
//             // Extracting the object IDs
//             const objectIds = data.objectIDs.slice(0, 300); 
//             // Fetching the detailed data for each object ID
//             const artworks = await Promise.all(objectIds.map(async (objectId) => {
//                 try {
//                     const artResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
//                     if (!artResponse.ok) {
//                         throw new Error(`Failed to fetch artwork with ID ${objectId}`);
//                     }
//                     const artData = await artResponse.json();
//                     return artData;
//                 } catch (error) {
//                     console.error(error.message);
//                     return null;
//                 }
//             }));
//             setDisplayArt(artworks.filter(artwork => artwork !== null)); // Filtering out null values
//             setIsLoading(false);
//         } catch (error) {
//             console.error('Error fetching art data:', error);
//             setIsLoading(false);
//             setError(error);
//         }
//     };

//     return (
//         <>
//             <div className="grayContainer">
//                 <div className="heroContainer">
//                     <h1>Journey Through Time and Culture</h1>
//                     <p className="heroText">
//                         Explore a vast collection of artistic masterpieces and cultural artifacts that span centuries and continents.
//                         Discover the stories behind each piece and uncover the history, craftsmanship, and traditions that have shaped
//                         civilizations across the globe. From ancient relics to modern creations, experience the diversity of human expression
//                         and creativity. Every object tells a unique story, waiting for you to uncover.
//                     </p>
//                 </div>
//             </div>

//             <div className="container">
//                 {isLoading ? (
//                     <p className="loading">Loading...</p>
//                 ) : (
//                     <>
//                         {error && <p>Error fetching art data: {error.message}</p>}
//                         <div className="artwork-container">
//                             {displayArt.map((artwork, index) => (
//                                 artwork.primaryImage && (
//                                     <Artwork key={index} artwork={artwork} />
//                                 )
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// const Artwork = ({ artwork }) => {
//     return (
//         <div className="work">
//             <img src={artwork.primaryImage} alt={artwork.title} loading="lazy" />
//             <div className="layer">
//                 <h1>Art Title: {artwork.title}</h1>
//                 <h3>Country: <span>{artwork.country}</span></h3>
//                 <h3>Period: <span>{artwork.period}</span></h3>
//             </div>
//         </div>
//     );
// };

// export default Page;



import React, { useEffect, useState } from "react";

// Page component to display artworks and categories
const Page = () => {
  const [displayArt, setDisplayArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("African"); // Default category
  const [offset, setOffset] = useState(0); // Track the offset for pagination
  const [loadingMore, setLoadingMore] = useState(false); // Flag for loading more artworks
  const [isModalOpen, setIsModalOpen] = useState(false); // Flag for opening modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index of the currently selected image

  // Categories to display in the UI
  const categories = ["African", "European", "Asian", "Oceanic", "American", "Middle Eastern", "indian", "islamic", "Caribbean"];

  useEffect(() => {
    getArtByCulture(selectedCategory, 0); // Fetch data based on selected category and offset 0 (initial load)
  }, [selectedCategory]);

  // Function to fetch art by culture
  const getArtByCulture = async (culture, offsetValue) => {
    try {
      setLoadingMore(true); // Set loading state when fetching more data
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=culture:${culture}&offset=${offsetValue}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // Extracting the object IDs
      const objectIds = data.objectIDs.slice(0, 300);
      const artworks = await Promise.all(
        objectIds.map(async (objectId) => {
          try {
            const artResponse = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
            );
            if (!artResponse.ok) {
              throw new Error(`Failed to fetch artwork with ID ${objectId}`);
            }
            const artData = await artResponse.json();
            return artData;
          } catch (error) {
            console.error(error.message);
            return null; 
          }
        })
      );
    
      setDisplayArt((prevArtworks) => [...prevArtworks, ...artworks.filter((artwork) => artwork !== null)]);
      setIsLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching art data:", error);
      setIsLoading(false);
      setLoadingMore(false);
      setError(error);
    }
  };


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setDisplayArt([]);
    setOffset(0); 
  };


  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 
  const handleLoadMore = () => {
    setOffset(offset + 300); 
    getArtByCulture(selectedCategory, offset + 300); 
  };

  return (
    <div>
      <div className="grayContainer">
        <div className="heroContainer">
          <h1>Journey Through Time and Culture</h1>
          <p className="heroText">
            Explore a vast collection of artistic masterpieces and cultural
            artifacts that span centuries and continents. Discover the stories
            behind each piece and uncover the history, craftsmanship, and
            traditions that have shaped civilizations across the globe. From
            ancient relics to modern creations, experience the diversity of
            human expression and creativity. Every object tells a unique story,
            waiting for you to uncover.
          </p>
        </div>
      </div>
      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${category === selectedCategory ? "selected" : ""}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="artwork-container">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p>Error fetching art data: {error.message}</p>
        ) : (
          displayArt.map((artwork, index) => (
            artwork.primaryImage && (
              <div className="work" key={index} onClick={() => openModal(index)}>
                <img src={artwork.primaryImage} alt={artwork.title} loading="lazy" />
              </div>
            )
          ))
        )}
      </div>
      {!isLoading && !loadingMore && displayArt.length > 0 && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}

      {loadingMore && <p>Loading more artworks...</p>}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-image-container">
              <img
                src={displayArt[currentImageIndex].primaryImage}
                alt={displayArt[currentImageIndex].title}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const Artwork = ({ artwork }) => {
  return (
    <div className="work">
      <img src={artwork.primaryImage} alt={artwork.title} loading="lazy" />
      <div className="layer">
        <h1>{artwork.title}</h1>
        <h3>
          Country: <span>{artwork.country}</span>
        </h3>
        <h3>
          Period: <span>{artwork.period}</span>
        </h3>
      </div>
    </div>
  );
};

export default Page;
