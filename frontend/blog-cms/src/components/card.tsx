import { useEffect, useRef, Children } from 'react';

import { parallax } from '../utils/animations';

const Card = (props: any) => {
  const { children, backgroundImage } = props;

  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      parallax(ref.current);
    }
  }, [ref]);

  let subComponentList = Object.keys(Card);

  let subComponents = subComponentList.map((key) => {
    return Children.map(children, (child) =>
      child.type.name === key ? child : null
    );
  });

  return (
    <div className="cardContainer">
      <div ref={ref} className="cardWrap">
        <div className="card color-shadow-extra-large">
          <div
            className="cardBg"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          ></div>
          <div className="cardInfo">
            {subComponents.map((component) => component)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Title = (props: any) => <h3 className="cardTitle">{props.children}</h3>;
Card.Title = Title;

const Body = (props: any) => <p>{props.children}</p>;
Card.Body = Body;

export default Card;
