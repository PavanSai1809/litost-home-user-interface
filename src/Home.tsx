import React, { useEffect, useState } from 'react';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  icon?: string;
  image_url?: string;
}

interface Section {
  id: number;
  sectionName: string;
  subSectionName?: string;
  title?: string;
  content: ContentItem[];
}

interface SocialMediaLink {
  id: number;
  platformName: string;
  url: string;
}

interface ContactDetail {
  id: number;
  contactType: string;
  value: string;
}

interface Footer {
  about: string;
  social_media_links: SocialMediaLink[];
  contact_details: ContactDetail[];
}

const HomePage: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [footer, setFooter] = useState<Footer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  // Static banner images
  const bannerImageNames = [
    'https://www.lentoindia.com/assets/lento-website-banner.png',
    'https://www.lentoindia.com/assets/lentowebsite4.jpg',
    'https://www.lentoindia.com/assets/lentoslide2.webp',
  ];


  const serviceImages: string[] = [
    'https://lentoindia.com/assets/admin/uploads/Which_inverter_is_best_for_200ah_battery.png',
    'https://lentoindia.com/assets/admin/uploads/Best_Solar_Panels_for_Distributors_High_Efficiency_and_Durability.jpg',
    'https://lentoindia.com/assets/admin/uploads/Which_inverter_is_best_for_200ah_battery.png',

  ];

  const valuePropositions: string[] = [
    'https://lentoindia.com/assets/quality-control.png',
    'https://lentoindia.com/assets/customer-service1.png',
    'https://lentoindia.com/assets/ideaw.png',
  ];

  const testimonials: string[] = [
    'https://lentoindia.com/assets/support.png',
    'https://www.agilitypr.com/wp-content/uploads/2017/09/clients-1.jpg',
    'https://ezranking.s3.eu-west-2.amazonaws.com/blog/wp-content/uploads/2021/01/27074723/Handle-Big-Clients-Successfully.jpg',
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sectionsResponse, footerResponse] = await Promise.all([
        fetch('http://localhost:4002/api/v1/section/sections'),
        fetch('http://localhost:4002/api/v1/section/footer/5')
      ]);

      const sectionsData = await sectionsResponse.json();
      const footerData = await footerResponse.json();

      setSections(sectionsData?.result || []);
      setFooter(footerData?.result || null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const heroSection = sections.find((section) => section.sectionName === "Hero");

  useEffect(() => {
    fetchData();
    let interval: any;

    const startCarousel = () => {
      const heroContentLength = heroSection?.content?.length || 0;
      if (heroContentLength > 0) {
        interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % heroContentLength);
        }, 5000);
      }
    };

    startCarousel();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  // if (!loading) {
  //   return <div className="flex items-center justify-center h-screen">Loading...</div>;
  // }

  const featuredSection = sections.find((section) => section.sectionName === "Featured Products");
  const whyChooseUsSection = sections.find((section) => section.sectionName === "Why Choose us");
  const testimonialsSection = sections.find((section) => section.sectionName === "Testimonials");

  const combinedHeroContent = heroSection?.content.map((item: any, index: number) => {
    const randomIndex = Math.floor(Math.random() * bannerImageNames.length);
    return {
      ...item,
      id: index,
      image_url: bannerImageNames[randomIndex],
    };
  });

  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-500">
            <a
              href="#home"
              className="transition duration-300 ease-in-out hover:text-green-600"
              onClick={() => handleLinkClick('home')}
            >
              Lento
            </a>
          </div>
          <ul className="flex space-x-8">
            <li>
              <a
                href="#home"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'home' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#company"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'company' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('company')}
              >
                Company
              </a>
            </li>
            <li>
              <a
                href="#products"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'products' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('products')}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#blog"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'blog' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('blog')}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#events"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'events' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('events')}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#brands"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'brands' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('brands')}
              >
                Our Brands
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`text-lg transition duration-300 ease-in-out ${activeLink === 'contact' ? 'text-green-400' : 'hover:text-green-400'
                  }`}
                onClick={() => handleLinkClick('contact')}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className="relative h-[600px] overflow-hidden">
        <div className="relative h-full">
          {combinedHeroContent?.map((item, index) => (
            <div
              key={item.id}
              className={`absolute w-full h-full transition-all duration-1000 ease-in-out transform ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.image_url})`,
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="text-white max-w-2xl">
                    <h1 className="text-5xl font-bold mb-4">
                      {item.title}
                    </h1>
                    <p className="text-xl mb-8">
                      {item.description}
                    </p>
                    <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {combinedHeroContent?.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {featuredSection?.sectionName}
          </h2>
          <h2 className="text-3xl font-bold text-center mb-12">
            {featuredSection?.subSectionName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSection?.content.map((product, index) => (
              <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={serviceImages[index % serviceImages.length]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center bg-white/90 p-4">
                  <div className="h-full w-10 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-500">
                      <path fillRule="evenodd" d="M8.25 3.75a3 3 0 013 3v1.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-1.5a3 3 0 013-3h3.75zm6.75 0a3 3 0 013 3v1.5a1.5 1.5 0 01-1.5 1.5H15a1.5 1.5 0 01-1.5-1.5v-1.5a3 3 0 013-3h3.75zM8.25 10.5a3 3 0 013 3v1.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-1.5a3 3 0 013-3h3.75zm6.75 0a3 3 0 013 3v1.5a1.5 1.5 0 01-1.5 1.5H15a1.5 1.5 0 01-1.5-1.5v-1.5a3 3 0 013-3h3.75zM8.25 17.25a3 3 0 013 3v1.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-1.5a3 3 0 013-3h3.75zm6.75 0a3 3 0 013 3v1.5a1.5 1.5 0 01-1.5 1.5H15a1.5 1.5 0 01-1.5-1.5v-1.5a3 3 0 013-3h3.75z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why To Invest In Lento Products?</h2>
          <p className="text-center text-gray-600 mb-12">
            Hydrotech redefines your relationship with energy. Save money. Minimize your carbon
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsSection?.content.map((item, index) => (
              <div key={item.id} className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={valuePropositions[index % valuePropositions.length]}
                  alt={item.title}
                  className="mx-auto mb-4 w-16 h-16"
                />
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="border-2 border-green-600 text-green-600 px-8 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300">
              READ MORE
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{testimonialsSection?.sectionName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsSection?.content.map((item, index) => (
              <div key={item.id} className="bg-gray-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={testimonials[index % testimonials.length]}
                  alt={item.title}
                  className="mx-auto mb-4 w-16 h-16"
                />
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {footer && (
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">About Us</h3>
                <p className="text-gray-400">{footer.about}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <ul>
                  {footer.social_media_links.map((socialLink) => (
                    <li key={socialLink.id}>
                      <a
                        href={socialLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition duration-300"
                      >
                        {socialLink.platformName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <ul>
                  {footer.contact_details.map((contact) => (
                    <li key={contact.id} className="text-gray-400">
                      <strong>{contact.contactType}:</strong> {contact.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <img
                  src="https://lentoindia.com/assets/quality-control.png"
                  alt="Quality Control"
                  className="w-full h-auto object-contain"
                />
                <img
                  src="https://lentoindia.com/assets/customer-service1.png"
                  alt="Customer Service"
                  className="w-full h-auto object-contain"
                />
                <img
                  src="https://lentoindia.com/assets/ideaw.png"
                  alt="Innovation"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default HomePage;