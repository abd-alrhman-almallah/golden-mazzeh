// TEMPORARY: sample review for the UI only
const review = {
  quote:
    "An unforgettable stay. Every detail was thoughtfully considered, and the team made us feel truly welcome from the moment we arrived.",
  guest: "Sarah M.",
  rating: 5,
};

const styles = `
.gh-reviews {
  background: #EFEFF2;
  color: #04364F;
  padding: 96px 0;
}
.gh-reviews__inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
}
.gh-reviews__label {
  margin: 0 0 24px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #601E34;
}
.gh-reviews__figure {
  margin: 0;
}
.gh-reviews__mark {
  display: block;
  height: 48px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 88px;
  line-height: 1;
  color: #601E34;
}
.gh-reviews__quote {
  margin: 0 0 32px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(22px, 3vw, 32px);
  font-style: italic;
  line-height: 1.5;
  color: #04364F;
}
.gh-reviews__stars {
  margin-bottom: 12px;
  font-size: 20px;
  letter-spacing: 0.2em;
  color: #601E34;
}
.gh-reviews__guest {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #04364F;
}

@media (max-width: 900px) {
  .gh-reviews {
    padding: 64px 0;
  }
}
`;

function Testimonials() {
  return (
    <>
      <style>{styles}</style>
      <section className="gh-reviews" aria-labelledby="gh-reviews-title">
        <div className="gh-reviews__inner">
          <h2 id="gh-reviews-title" className="gh-reviews__label">
            Guest Reviews
          </h2>

          <figure className="gh-reviews__figure">
            <span className="gh-reviews__mark" aria-hidden="true">
              “
            </span>
            <blockquote className="gh-reviews__quote">{review.quote}</blockquote>
            <figcaption>
              <div
                className="gh-reviews__stars"
                role="img"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <div className="gh-reviews__guest">{review.guest}</div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

export default Testimonials;