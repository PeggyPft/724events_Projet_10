import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = Array.isArray(data?.focus) ? data.focus.sort((evtA, evtB) =>
  new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
) : [];
  
  const nextCard = () => {
    setTimeout(
      () => setIndex(index + 1 < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  }, );
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={event.title}>
          <div
            
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((evt, radioIdx) => (
                <input
                  key={`${evt.title}_${evt.date}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)} // Mise à jour de l'index lorsqu'un bouton est cliqué
                  
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
