let btn = document.querySelector('.btn');
let body = document.querySelector('body');
let bulb = document.querySelector('.bulb');
let audio = document.querySelector('#audio');
let spans = document.querySelectorAll('.bulb span');

const colors = [
    { bg: 'radial-gradient(#ff5733, #fff)', bulb: '#ff5733', glow: '#ff5733', base: '#ff5733', span: '#ff5733' },
    { bg: 'radial-gradient(#33ff57, #fff)', bulb: '#33ff57', glow: '#33ff57', base: '#33ff57', span: '#33ff57' },
    { bg: 'radial-gradient(#3357ff, #fff)', bulb: '#3357ff', glow: '#3357ff', base: '#3357ff', span: '#3357ff' },
    { bg: 'radial-gradient(#ff33a8, #fff)', bulb: '#ff33a8', glow: '#ff33a8', base: '#ff33a8', span: '#ff33a8' },
    { bg: 'radial-gradient(#ffff33, #fff)', bulb: '#ffff00', glow: '#ffff33', base: '#ffff00', span: '#ffff33' }
];

btn.onclick = function () {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    body.classList.toggle('on');

    if (body.classList.contains('on')) {
        body.style.background = randomColor.bg;
        bulb.style.background = randomColor.bulb;

        let glowColor = randomColor.glow;

        // Remove existing style to avoid conflicts
        let oldStyle = document.querySelector("#dynamic-glow");
        if (oldStyle) oldStyle.remove();

        // Create a new style element for glow animation
        let style = document.createElement('style');
        style.id = "dynamic-glow";
        style.innerHTML = `
            @keyframes dynamic-glow {
                0% { box-shadow: 0 0 10px ${glowColor}40, 0 0 20px ${glowColor}40; }
                50% { box-shadow: 0 0 30px ${glowColor}80, 0 0 60px ${glowColor}80; }
                100% { box-shadow: 0 0 10px ${glowColor}40, 0 0 20px ${glowColor}40; }
            }
            .on .bulb {
                animation: dynamic-glow 1.5s infinite alternate ease-in-out;
                box-shadow: 0 0 50px ${glowColor}, 0 0 100px ${glowColor}, 0 0 150px ${glowColor};
            }
            .on .bulb::before {
                background: ${randomColor.base} !important;
            }
        `;
        document.head.appendChild(style);

        // Update the glow color of bulb edges
        spans.forEach(span => {
            span.style.boxShadow = `30px 30px 0 15px ${randomColor.span}`;
        });
    } else {
        body.style.background = '#222';
        bulb.style.background = '#444';

        // Remove the glow effect on turning off
        let oldStyle = document.querySelector("#dynamic-glow");
        if (oldStyle) oldStyle.remove();

        spans.forEach(span => {
            span.style.boxShadow = `30px 30px 0 15px #666`;
        });
    }

    audio.play();
};