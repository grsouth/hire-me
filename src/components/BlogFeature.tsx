const BlogFeature = () => {
  return (
    <section className="blog-feature" aria-labelledby="blog-feature-title">
      <div className="blog-feature__content">
        <p className="blog-feature__eyebrow">Personal project log</p>
        <h2 className="blog-feature__title" id="blog-feature-title">
          Self-hosted Security Cameras + Custom Tablet Viewer
        </h2>
        <p className="blog-feature__excerpt">
          I built a private, customizable camera system that replaced my old cloud
          subscriptions with a local one. It runs Frigate for detection,
          Home Assistant for automations, and a Rust viewer for low-latency
          monitoring on a dedicated tablet.
        </p>
        <div className="blog-feature__meta">
          <span>Frigate, Home Assistant, Mosquitto MQTT, Docker, Linux</span>
        </div>
        <div className="blog-feature__actions">
          <a className="ghost-button" href="/camera_project.html">
            Read the full post
          </a>
        </div>
      </div>
      <div className="blog-feature__media" aria-hidden="true">
        <img
          src={`${import.meta.env.BASE_URL}tablet_running_app.jpg`}
          alt=""
          loading="lazy"
        />
        <div className="blog-feature__media-overlay"></div>
      </div>
    </section>
  );
};

export default BlogFeature;
