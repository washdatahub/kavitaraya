import React, { useEffect, useState } from 'react';
import { Instagram as InstagramIcon, ExternalLink } from 'lucide-react';

export default function Instagram() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Fetch Instagram posts
    // Note: Instagram Basic Display API requires backend authentication
    // For now, this is a placeholder structure that can be connected to an API
    const fetchInstagramPosts = async () => {
      try {
        // TODO: Replace with actual Instagram API endpoint
        // Example structure for when API is set up:
        // const response = await fetch('/api/instagram/posts');
        // const data = await response.json();
        // setPosts(data.posts);
        
        // For now, using placeholder structure
        // When Instagram Basic Display API is configured, posts will auto-update here
        setPosts([]);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="instagram" className="py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6">
            LATEST WORK
          </h2>
          <p className="text-sm font-light tracking-wider uppercase text-white/60 mb-8">
            Follow @kavitaa_raya on Instagram
          </p>
          <a
            href="https://www.instagram.com/kavitaa_raya/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-white/70 transition-colors group"
          >
            <InstagramIcon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-light tracking-wider uppercase">View Profile</span>
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Instagram Feed Grid */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-white/5 animate-pulse"></div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post, index) => (
                <div key={index} className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                  <img
                    src={post.media_url}
                    alt={post.caption || 'Instagram post'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          ) : (
            // Placeholder grid with Instagram-style layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* These are placeholder images - will be replaced with actual Instagram posts when API is connected */}
              <div className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                <img
                  src="/images/Instagram/F1.jpg"
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                <img
                  src="/images/Instagram/F7.jpg"
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                <img
                  src="/images/Instagram/F8.jpg"
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                <img
                  src="/images/Instagram/F4.jpg"
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                <img
                  src="/images/Instagram/F5.jpg"
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square bg-white/5 overflow-hidden group cursor-pointer">
                <img
                    src="/images/Instagram/F6.jpg"
                  alt="Instagram post"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="text-center mt-12">
            <a
              href="https://www.instagram.com/kavitaa_raya/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm font-light tracking-wider uppercase rounded-full"
            >
              Follow on Instagram
            </a>
            <p className="text-xs font-light text-white/50 mt-4 max-w-md mx-auto">
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
