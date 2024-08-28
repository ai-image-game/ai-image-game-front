import React, { useState, useEffect } from 'react';

function ImageInfo({imageInfo}) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        // Add event listener to detect window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    
    return (<img src={isMobile ? imageInfo.mobileImage : imageInfo.pcImage} />);
}

export default ImageInfo;