const posts = [
  {
    title: "Self-hosted Security Cameras + Custom Tablet Viewer",
    excerpt:
      "I built a private, customizable camera system that replaced my old cloud subscriptions with a local one. It runs Frigate for detection, Home Assistant for automations, and a Rust viewer for low-latency monitoring on a dedicated tablet.",
    meta: "Frigate, Home Assistant, Mosquitto MQTT, Docker, Linux",
    context: "Home infrastructure case study",
    href: `${import.meta.env.BASE_URL}projects/camera/index.html`,
    image: "projects/camera/images/tablet_running_app.jpg",
  },
  {
    title: "Sudoku Solver Benchmarks Across C Alternatives",
    excerpt:
      "I implemented the same Sudoku solver in C, Rust, Go, Zig, and Odin to compare both development experience and raw performance. The post walks through the algorithm, benchmark results, and what each language felt like in practice.",
    meta: "C, Rust, Go, Zig, Odin, Benchmarking",
    context: "Language comparison notes",
    href: `${import.meta.env.BASE_URL}projects/sudoku/index.html`,
    image: "projects/sudoku/images/sudoku_pic.png",
  },
];

const BlogFeature = () => {
  return (
    <section className="blog-feature-list" aria-label="Project blog posts">
      {posts.map((post, index) => (
        <article
          className="blog-feature"
          aria-labelledby={`blog-feature-title-${index}`}
          key={post.href}
        >
          <div className="blog-feature__content">
            <p className="blog-feature__eyebrow">{post.context}</p>
            <h2 className="blog-feature__title" id={`blog-feature-title-${index}`}>
              {post.title}
            </h2>
            <p className="blog-feature__excerpt">{post.excerpt}</p>
            <div className="blog-feature__meta">
              <span>{post.meta}</span>
            </div>
            <div className="blog-feature__actions">
              <a className="ghost-button" href={post.href}>
                Read project notes
              </a>
            </div>
          </div>
          <div className="blog-feature__media" aria-hidden="true">
            <img src={`${import.meta.env.BASE_URL}${post.image}`} alt="" loading="lazy" />
            <div className="blog-feature__media-overlay"></div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default BlogFeature;
