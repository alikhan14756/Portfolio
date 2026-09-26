import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

new_meta_block = """<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Muhammad Ali - Frontend Web Developer & Digital Creator</title>
  <meta name="title" content="Muhammad Ali - Frontend Web Developer & Digital Creator" />
  <meta name="description" content="Top-rated WordPress & Elementor Expert. Muhammad Ali is a Frontend Developer & Digital Creator who builds high-performance, responsive websites that drive business growth." />
  <meta name="keywords" content="Muhammad Ali, Web Developer Pakistan, WordPress Expert, Elementor Pro, Frontend Developer, Fiverr Top Rated, Web App Development, Custom Websites" />
  <meta name="author" content="Muhammad Ali" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://alikhan14756.github.io/Portfolio/" />
  <link rel="icon" type="image/png" href="logo.png" />
  
  <!-- Theme Script -->
  <script>
    (function() {
      const t = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', t);
    })();
  </script>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://alikhan14756.github.io/Portfolio/" />
  <meta property="og:title" content="Muhammad Ali - Frontend Web Developer & Digital Creator" />
  <meta property="og:description" content="Top-rated WordPress & Elementor Expert. Muhammad Ali is a Frontend Developer & Digital Creator who builds high-performance, responsive websites that drive business growth." />
  <meta property="og:image" content="https://alikhan14756.github.io/Portfolio/hero.jfif" />
  <meta property="og:site_name" content="Muhammad Ali Portfolio" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://alikhan14756.github.io/Portfolio/" />
  <meta property="twitter:title" content="Muhammad Ali - Frontend Web Developer & Digital Creator" />
  <meta property="twitter:description" content="Top-rated WordPress & Elementor Expert. Muhammad Ali is a Frontend Developer & Digital Creator who builds high-performance, responsive websites that drive business growth." />
  <meta property="twitter:image" content="https://alikhan14756.github.io/Portfolio/hero.jfif" />

  <!-- JSON-LD Structured Data Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://alikhan14756.github.io/Portfolio/#website",
        "url": "https://alikhan14756.github.io/Portfolio/",
        "name": "Muhammad Ali Portfolio",
        "description": "Frontend Developer & Digital Creator",
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://alikhan14756.github.io/Portfolio/#person",
        "name": "Muhammad Ali",
        "url": "https://alikhan14756.github.io/Portfolio/",
        "image": "https://alikhan14756.github.io/Portfolio/ivan.jfif",
        "jobTitle": "Frontend Web Developer & Digital Creator",
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        },
        "description": "Top-rated WordPress & Elementor Expert building high-performance, responsive websites.",
        "sameAs": [
          "https://github.com/alikhan14756",
          "https://wa.me/923055389967"
        ]
      }
    ]
  }
  </script>

"""

pattern = re.compile(r'<head>.*?<!-- Fonts:', re.DOTALL)
html = pattern.sub(new_meta_block + '  <!-- Fonts:', html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated head using regex")
