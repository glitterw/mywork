/* default dom id (particles-js) */
//particlesJS();

/* config dom id */
//particlesJS('dom-id');

/* config dom id (optional) + config particles params */
//particlesJS('particles-js', {
//  particles: {
//    color: '#fff',
//    shape: 'circle', // "circle", "edge" or "triangle"
//    opacity: 0.3,
//    size: 4,
//    size_random: true,
//    nb: 150,
//    line_linked: {
//      enable_auto: true,
//      distance: 100,
//      color: '#fff',
//      opacity: 1,
//      width: 1,
//      condensed_mode: {
//        enable: false,
//        rotateX: 600,
//        rotateY: 600
//      }
//    },
//    anim: {
//      enable: true,
//      speed: 1
//    }
//  },
//  interactivity: {
//    enable: true,
//    mouse: {
//      distance: 300
//    },
//    detect_on: 'canvas', // "canvas" or "window"
//    mode: 'grab',
//    line_linked: {
//      opacity: .5
//    },
//    events: {
//      onclick: {
//        enable: true,
//        mode: 'push', // "push" or "remove"
//        nb: 4
//      }
//    }
//  },
//  /* Retina Display Support */
//  retina_detect: true
//});
// Particles JS Animation
// ------------------------------------------------------------------------
window.onload=function(){
  if ($("#particles-js").length) {
    if ($(window).width() > 300) {
      particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 120,
            "density": {
              "enable": true,
              "value_area": 1800
            }
          },
          "color": {
            "value": "#e6e6e6"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 1,
              "color": "#e6e6e6"
            },
            "polygon": {
              "nb_sides": 3
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.2,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 20,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 250,
            "color": "#e6e6e6",
            "opacity": 0.5,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "window",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 180,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }
}
