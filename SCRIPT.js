// Fireworks effect using JavaScript and CSS
(function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.getElementById('fireworks').appendChild(canvas);

    const fireworks = [];
    const particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFirework(x, y) {
        const count = 100;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y));
        }
    }

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-3, 3);
        this.alpha = 1;
        this.size = random(2, 4);
    }

    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
    };

    Particle.prototype.draw = function() {
        context.globalAlpha = this.alpha;
        context.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        context.fill();
    };

    function loop() {
        requestAnimationFrame(loop);
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'lighter';

        if (Math.random() < 0.1) {
            fireworks.push({ x: random(0, canvas.width), y: random(0, canvas.height / 2) });
        }

        fireworks.forEach(firework => {
            createFirework(firework.x, firework.y);
        });

        fireworks.splice(0, fireworks.length);

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }
    }

    loop();
})();
