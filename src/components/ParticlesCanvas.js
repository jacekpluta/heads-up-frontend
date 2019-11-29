import React from "react";
import Particles from "react-particles-js";

function ParticlesCanvas(params) {
  return (
    <Particles
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        zIndex: -1
      }}
      params={{
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 1200
            }
          },
          line_linked: {
            enable: true,
            opacity: 0.02
          },
          move: {
            direction: "top",
            speed: 0.1,
            random: false
          },
          size: {
            value: 3
          },
          opacity: {
            anim: {
              enable: true,
              speed: 0.2,
              opacity_min: 0.05
            }
          }
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            push: {
              particles_nb: 1
            }
          }
        },
        retina_detect: true
      }}
    />
  );
}

export default ParticlesCanvas;
