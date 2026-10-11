import { Link } from "react-router-dom";

const styles = `
.gh-notfound {
  background: #FDFDFD;
  color: #04364F;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 120px 0;
}
.gh-notfound *,
.gh-notfound *::before,
.gh-notfound *::after {
  box-sizing: border-box;
}
.gh-notfound__inner {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}
.gh-notfound__code {
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-notfound__title {
  margin: 0 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 700;
  line-height: 1.15;
  color: #04364F;
}
.gh-notfound__text {
  margin: 0 auto 36px;
  max-width: 460px;
  font-size: 17px;
  line-height: 1.7;
  color: #04364F;
}
.gh-notfound__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
.gh-notfound__btn {
  display: inline-block;
  padding: 14px 32px;
  background: #601E34;
  color: #FDFDFD;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 1px solid #601E34;
  border-radius: 2px;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.gh-notfound__btn:hover {
  background: #04364F;
  border-color: #04364F;
}
.gh-notfound__btn--outline {
  background: transparent;
  color: #04364F;
  border-color: #04364F;
}
.gh-notfound__btn--outline:hover {
  background: #04364F;
  color: #FDFDFD;
}
.gh-notfound a:focus-visible {
  outline: 2px solid #601E34;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .gh-notfound {
    padding: 72px 0;
  }
  .gh-notfound__btn {
    flex: 1 1 100%;
  }
}
`;

function NotFound() {
  return (
    <>
      <style>{styles}</style>
      <section className="gh-notfound" aria-labelledby="gh-notfound-title">
        <div className="gh-notfound__inner">
          <p className="gh-notfound__code">Error 404</p>
          <h1 id="gh-notfound-title" className="gh-notfound__title">
            Page Not Found
          </h1>
          <p className="gh-notfound__text">
            The page you are looking for doesn't exist or may have moved. You
            can return to the home page or browse our rooms.
          </p>
          <div className="gh-notfound__actions">
            <Link to="/" className="gh-notfound__btn">
              Back to Home
            </Link>
            <Link to="/rooms" className="gh-notfound__btn gh-notfound__btn--outline">
              View Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;