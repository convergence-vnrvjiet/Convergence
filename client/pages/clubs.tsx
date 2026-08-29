import DomeGallery from '../components/DomeGallery';
export default function Clubs() {
  // 46 club logos - Update these paths after downloading images locally
  const clubImages = [
    { src: '/clubs/club-gdgc.png', alt: 'GDGC' },
    { src: '/clubs/club-01.png', alt: 'Club 1' },
    { src: '/clubs/club-02.png', alt: 'Club 2' },
    { src: '/clubs/club-03.png', alt: 'Club 3' },
    { src: '/clubs/club-04.png', alt: 'Club 4' },
    { src: '/clubs/club-05.png', alt: 'Club 5' },
    { src: '/clubs/club-06.png', alt: 'Club 6' },
    { src: '/clubs/club-07.png', alt: 'Club 7' },
    { src: '/clubs/club-09.png', alt: 'Club 9' },
    { src: '/clubs/club-10.png', alt: 'Club 10' },
    { src: '/clubs/club-11.png', alt: 'Club 11' },
    { src: '/clubs/club-12.png', alt: 'Club 12' },
    { src: '/clubs/club-13.png', alt: 'Club 13' },
    { src: '/clubs/club-14.png', alt: 'Club 14' },
    { src: '/clubs/club-15.png', alt: 'Club 15' },
    { src: '/clubs/club-16.png', alt: 'Club 16' },
    { src: '/clubs/club-17.png', alt: 'Club 17' },
    { src: '/clubs/club-18.png', alt: 'Club 18' },
    { src: '/clubs/club-19.png', alt: 'Club 19' },
    { src: '/clubs/club-20.png', alt: 'Club 20' },
    { src: '/clubs/club-21.png', alt: 'Club 21' },
    { src: '/clubs/club-22.png', alt: 'Club 22' },
    { src: '/clubs/club-23.png', alt: 'Club 23' },
    { src: '/clubs/club-24.png', alt: 'Club 24' },
    { src: '/clubs/club-25.png', alt: 'Club 25' },
    { src: '/clubs/club-26.png', alt: 'Club 26' },
    { src: '/clubs/club-27.png', alt: 'Club 27' },
    { src: '/clubs/club-28.png', alt: 'Club 28' },
    { src: '/clubs/club-29.png', alt: 'Club 29' },
    { src: '/clubs/club-30.png', alt: 'Club 30' },
    { src: '/clubs/club-31.png', alt: 'Club 31' },
    { src: '/clubs/club-32.png', alt: 'Club 32' },
    { src: '/clubs/club-33.png', alt: 'Club 33' },
    { src: '/clubs/club-34.png', alt: 'Club 34' },
    { src: '/clubs/club-35.png', alt: 'Club 35' },
    { src: '/clubs/club-36.png', alt: 'Club 36' },
    { src: '/clubs/club-37.png', alt: 'Club 37' },
    { src: '/clubs/club-38.png', alt: 'Club 38' },
    { src: '/clubs/club-39.png', alt: 'Club 39' },
    { src: '/clubs/club-40.png', alt: 'Club 40' },
    { src: '/clubs/club-41.png', alt: 'Club 41' },
    { src: '/clubs/club-42.png', alt: 'Club 42' },
    { src: '/clubs/club-43.png', alt: 'Club 43' },
    { src: '/clubs/club-44.png', alt: 'Club 44' },
    { src: '/clubs/club-45.png', alt: 'Club 45' },
    { src: '/clubs/club-46.png', alt: 'Club 46' },
  ];

  return (
    
      <section className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
            Organised by
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Convergence 2K25R is brought to you by 46 student clubs and technical societies working together to create an unforgettable experience
          </p>
        </div>

        <div className="relative w-full" style={{ height: '400px' }}>
          <DomeGallery
            images={clubImages}
            fit={0.6}
            fitBasis="auto"
            minRadius={500}
            maxRadius={800}
            overlayBlurColor="#000000"
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
            openedImageWidth="500px"
            openedImageHeight="500px"
            grayscale={false}
            dragSensitivity={18}
            maxVerticalRotationDeg={8}
            segments={35}
            dragDampening={2}
            hideOverlays={true}
          />
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-cyan-400 text-xs sm:text-sm">
            Drag to explore • Click to enlarge
          </p>
        </div>
      </section>
    
  );
}
