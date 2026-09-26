import re

with open("articles.html", "r", encoding="utf-8") as f:
    html = f.read()

new_meta_block = """<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Blog & Articles - Muhammad Ali | Web Developer</title>
  <meta name="title" content="Blog & Articles - Muhammad Ali | Web Developer" />
  <meta name="description" content="Read the latest articles, tutorials, and insights on Web Development, WordPress, Elementor, and Performance Optimization by Muhammad Ali." />
  <meta name="keywords" content="Web Development Blog, WordPress Tutorials, Elementor Guide, Frontend Development, JavaScript, Muhammad Ali Blog" />
  <meta name="author" content="Muhammad Ali" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <link rel="canonical" href="https://alikhan14756.github.io/Portfolio/articles.html" />
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
  <meta property="og:url" content="https://alikhan14756.github.io/Portfolio/articles.html" />
  <meta property="og:title" content="Blog & Articles - Muhammad Ali | Web Developer" />
  <meta property="og:description" content="Read the latest articles, tutorials, and insights on Web Development, WordPress, Elementor, and Performance Optimization by Muhammad Ali." />
  <meta property="og:image" content="https://alikhan14756.github.io/Portfolio/hero.jfif" />
  <meta property="og:site_name" content="Muhammad Ali Portfolio" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://alikhan14756.github.io/Portfolio/articles.html" />
  <meta property="twitter:title" content="Blog & Articles - Muhammad Ali | Web Developer" />
  <meta property="twitter:description" content="Read the latest articles, tutorials, and insights on Web Development, WordPress, Elementor, and Performance Optimization by Muhammad Ali." />
  <meta property="twitter:image" content="https://alikhan14756.github.io/Portfolio/hero.jfif" />

"""

pattern = re.compile(r'<head>.*?<link rel="preconnect" href="https://fonts\.googleapis\.com" />', re.DOTALL)
html = pattern.sub(new_meta_block + '  <!-- Fonts: Syne (display) + JetBrains Mono (labels) + Inter (body) -->\n  <link rel="preconnect" href="https://fonts.googleapis.com" />', html)

with open("articles.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated articles.html head")
