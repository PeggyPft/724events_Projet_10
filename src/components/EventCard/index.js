import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import { useData } from "../../contexts/DataContext/index";

import "./style.scss";

const EventCard = ({
  imageAlt,
  date = new Date(),
  label,
  small = false,
  ...props
}) => {
  const {last} = useData();

  const imageSrc = last ? last.cover: "";
  const title = last ? last.title: "";


return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard;
