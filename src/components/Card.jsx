import LikeButton from './LikeButton';
import Description from './Description';
import './fetchData.css';

const Card = ({ data, className }) => {
  const arrCopy = data.map((a) => Object.assign({}, a));
  const rev = arrCopy.reverse();
  return (
    <div className={className}>
      {rev?.map((card) => {
        return (
          <div className="card" key={card?.date}>
            {card.url.includes('youtube') ? (
              <iframe title={card.title} src={card.url}></iframe>
            ) : (
              <img src={card?.url} alt={card?.title} className="apoc" />
            )}
            <div className="card-description">
              <h2 className="card-title">{card?.title}</h2>
              <section className="button-section">
                <p className="card-date">{card?.date}</p>
                <LikeButton />
              </section>
              <Description text={card.explanation} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
