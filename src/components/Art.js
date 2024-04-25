import React, { useEffect, useState } from "react";

const Art = () => {
    const [displayArt, setDisplayArt] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getArtByCulture('African');//fetching initail art culture
    }, []);
    
    const getArtByCulture = async (culture) => { 
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=culture:${culture}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Extracting the object IDs
            const objectIds = data.objectIDs.slice(0, 300); 
            // Fetching the detailed data for each object ID
            const artworks = await Promise.all(objectIds.map(async (objectId) => {
                try {
                    const artResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
                    if (!artResponse.ok) {
                        throw new Error(`Failed to fetch artwork with ID ${objectId}`);
                    }
                    const artData = await artResponse.json();
                    console.log(artData)
                    return artData;
                } catch (error) {
                    console.error(error.message);
                    return null; 
                }
            }));
            setDisplayArt(artworks.filter(artwork => artwork !== null)); // to Filtering out null values
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching art data:', error);
            setIsLoading(false);
            setError(error);
setIsLoading(false);
        }
    };


  return (
    <>
       <header>
      <a href='#' className="logo">ArtVista</a>
      <nav>
        <ul>
            <li>
                <a href="/">home</a>
            </li>
            <li>
                <a href="#">about</a>
            </li>
            <li>
                <a href="#">contact</a>
            </li>
        </ul>
      </nav>
    </header>
      <div className="container">
          {isLoading ? (
              <p className="loading">Loading...</p>
          ) : (
              <>
              {error && <p>Error fetching art data: {error.message}</p>}
                  <div className="artwork-container">
                      {displayArt.map((artwork, index) => (
                          artwork.primaryImage && (
                              <Artwork key={index} artwork={artwork} />
                          )
                      ))}
                  </div>
              </>
          )}
      </div>
  </>
  )
}

const Artwork = ({ artwork }) => {
    return (
     <>
        <div className="work">
            <img src={artwork.primaryImage} alt={artwork.title} loading="lazy"/>
            <div className="layer">
                <h1>Art Title: {artwork.title}</h1>
                <h3>country: <span>{artwork.country}</span></h3>
                <h3>period: <span>{artwork.period}</span></h3>
            </div>
        </div>
      
        </>
    );
};

export default Art
