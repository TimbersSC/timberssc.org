import React from "react";

export const BubblesLoader = () => {
  return (
    <div className='loader-wrapper'>
      <div className='loader'>
        {/* <!-- orbit class defines the animation path the orb follows --> */}
        <div className='orbit orbit-red'>
          {/* <!-- pos class defines the position of the orb relative to itself --> */}
          <div className='pos pos-red'>
            {/* <!-- orb class renders the orb --> */}
            <div className='orb orb-red'></div>
          </div>
        </div>

        <div className='orb orb-blue'></div>

        <div className='orbit orbit-green'>
          <div className='pos pos-green'>
            <div className='orb orb-green'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
