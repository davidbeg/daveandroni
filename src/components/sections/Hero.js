import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Image from '../elements/Image';
import Modal from '../elements/Modal';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );


  let invertMobile = false;
  let invertDesktop = false;
  let alignTop = false;
  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Future of Education. <span className="text-color-primary">Today.</span>
            </h1>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">

            <div className={
              classNames(
                'split-item-image center-content-mobile reveal-from-bottom',
                'split-item-image-fill'
              )}
                 style={{position: 'relative'}}
                 >
            <Image
              src={'./teacher.svg'}
              alt="Features split 01"
              width={900}/>
            </div>

            <div className="hero-content" style={{margin: '80px'}}>
              <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
                <span className="text-color-primary">Portfolio</span> Projects
              </h1>
            </div>

            <div className={splitClasses}>
              <div className="split-item">
                <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                  <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                    Interactive Negotiation Simulation
                  </div>
                  <h3 className="mt-0 mb-12">
                    The Golden Nugget Game
                  </h3>
                  <p className="m-0">
                    Developed with Prof. John Richardson of MIT, the Golden Nugget Game uses a real-time game to educate on various negotiation concepts in a fun, intuitive and easy-to-use platform
                  </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile reveal-from-bottom',
                    'split-item-image-fill'
                  )}
                     data-reveal-container=".split-item">
                  <Image
                    src={'./example.png'}
                    alt="Features split 01"
                    width={677}/>
                </div>
              </div>
              <div className="split-item">
                <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                  <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                    Organizational Processes
                  </div>
                  <h3 className="mt-0 mb-12">
                    CorpConvince
                  </h3>
                  <p className="m-0">
                    Interactive simulation for Organizational Process. Teach effective tactics, terms, and practices with a hands-on experience.
                  </p>
                </div>
                <div className={
                  classNames(
                    'split-item-image center-content-mobile reveal-from-bottom',
                    'split-item-image-fill'
                  )}
                     data-reveal-container=".split-item">
                  <Image
                    src={'./example2.png'}
                    alt="Features split 02"
                    width={400}
                    height={296} />
                </div>
              </div>
            </div>
          </div>


          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;