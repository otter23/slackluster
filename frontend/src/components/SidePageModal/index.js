import './SidePageModal.css';

import React, { useEffect, useRef } from 'react';

export default function SidePageModal({
  showModal,
  closeModal,
  // animationToggle,
  // toggleAnimationClass,
  children,
}) {
  const modal = useRef(null);

  // NOTE NEED TO INCLUDE THE FOLLOWING IN PARENT COMPONENT:
  // <SidePageModal
  //     showModal={showAddChannelModal}
  //     closeModal={closeAddChannelModal}
  //   ></SidePageModal>
  //// const [showModal, setShowModal] = useState(false);
  //// const openModal = () => {
  //// if (showModal) return; // do nothing if modal already showing
  //// setShowModal(true); // else open modal
  //// disable page scrolling:
  //// document.getElementById('root').classList.add('overflow');
  //// };
  //// const closeModal = () => {
  ////   if (!showModal) return; // do nothing if modal already closed
  ////   setShowModal(false); // else close modal
  ////   enable page scrolling:
  ////   document.getElementById('root').classList.remove('overflow');
  //// };

  //Check status of Modal
  useEffect(() => {
    //if modal already closed do nothing
    if (!showModal) return;

    // close modal upon click
    const eventListener = ({ target }) => {
      if (target !== modal.current && !modal.current?.contains(target)) {
        // modal.current.classList.remove('slideIn');
        // modal.current.classList.add('slideOut');
        // modal.current.classList.add('hidden');
        // toggleAnimationClass();
        closeModal();
      }
    };
    //add event listener to entire document
    document.addEventListener('click', eventListener);

    //cleanup function - remove listener on dock
    return () => document.removeEventListener('click', eventListener);
  }, [showModal, closeModal]);

  // useEffect(() => {
  //   if (modal.current) {
  //     console.log('IN HERE');
  //     modal.current.addEventListener(
  //       'animationend',
  //       () => {}
  //       // false
  //     );
  //   }
  //   console.log(modal.current);
  // }, [modal.current]);

  // clone all children and add props to each
  const childrenWithProps = React.Children.map(children, (child) => {
    // if element is valid react element
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { closeModal });
    }
    return child;
  });

  return (
    <>
      {showModal && (
        <div className={`SidePageModal-background`}>
          <div
            className={`SidePageModal-child-container slideIn`}
            // ${animationToggle ? 'slideIn' : 'slideOut'}
            ref={modal}
          >
            {childrenWithProps}
          </div>
        </div>
      )}
    </>
  );
}
