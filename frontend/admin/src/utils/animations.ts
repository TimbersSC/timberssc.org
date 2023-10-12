export const parallax = (element: HTMLElement) => {
  let state = {
    mouseX: 0,
    mouseY: 0,
    height: element.clientHeight,
    width: element.clientWidth,
  };

  const movementDiff = 10;

  element.addEventListener('mousemove', (event) => {
    const card = element.querySelector('.card') as HTMLElement | undefined;
    if (card) {
      const cardBg = card.querySelector('.cardBg') as HTMLElement | undefined;
      state.mouseX = event.pageX - element.offsetLeft - state.width / 2;
      state.mouseY = event.pageY - element.offsetTop - state.height / 2;

      // parallax angle in card
      const angleX = (state.mouseX / state.width) * movementDiff;
      const angleY = (state.mouseY / state.height) * -movementDiff;
      card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg)`;

      if (cardBg) {
        // parallax position of background in card
        const posX = (state.mouseX / state.width) * -movementDiff;
        const posY = (state.mouseY / state.height) * -movementDiff;
        cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
      }
    }
  });

  element.addEventListener('mouseout', () => {
    const card = element.querySelector('.card') as HTMLElement | undefined;
    if (card) {
      const cardBg = card.querySelector('.cardBg') as HTMLElement | undefined;
      card.style.transform = `rotateY(0deg) rotateX(0deg) `;
      if (cardBg) {
        cardBg.style.transform = `translateX(0px) translateY(0px)`;
      }
    }
  });
};

// export const gradientMouse = (el)