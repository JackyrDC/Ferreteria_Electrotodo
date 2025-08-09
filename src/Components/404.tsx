import React from "react";

type CanvasProps = {
    width: number;
    height: number;
};

const Nut404Animation: React.FC<CanvasProps> = ({ width, height }) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = 40;
        const innerRadius = outerRadius * 0.7;
        let frame = 0;
        const totalFrames = 120;
        let animationComplete = false;

        const drawNut = (rotation: number, x: number = centerX, y: number = centerY) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            // TUERCA PRINCIPAL - simple y limpia
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = outerRadius * Math.cos(angle);
                const py = outerRadius * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = '#D71B07'; // Color corporativo limpio
            ctx.fill();
            ctx.strokeStyle = '#B71506'; // Borde más oscuro
            ctx.lineWidth = 2;
            ctx.stroke();

            // AGUJERO INTERIOR - simple
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const px = innerRadius * Math.cos(angle);
                const py = innerRadius * Math.sin(angle);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF'; // Agujero blanco simple
            ctx.fill();
            ctx.strokeStyle = '#B71506';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        };

        const drawFinalComposition = (fadeOpacity: number) => {
            // Dibujar la tuerca en el centro (siempre visible)
            drawNut(0, centerX, centerY);
            
            // Dibujar los "4" con fade in
            ctx.font = 'bold 60px Arial';
            ctx.fillStyle = '#2B2B2B';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = fadeOpacity;
            
            // "4" a la izquierda de la tuerca (reducido de -80 a -65)
            ctx.fillText('4', centerX - 65, centerY);
            
            // "4" a la derecha de la tuerca (reducido de +80 a +65)
            ctx.fillText('4', centerX + 65, centerY);
            
            ctx.globalAlpha = 1;
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            if (!animationComplete) {
                // Fase 1: Animación de la tuerca girando sola
                if (frame < totalFrames * 0.7) {
                    const rotation = (frame / (totalFrames * 0.7)) * Math.PI * 2; // Una rotación completa
                    drawNut(rotation);
                }
                // Fase 2: Tuerca se detiene y aparecen los "4" con fade in
                else {
                    const fadeProgress = (frame - totalFrames * 0.7) / (totalFrames * 0.3);
                    drawFinalComposition(fadeProgress);
                }

                frame++;
                if (frame >= totalFrames) {
                    animationComplete = true;
                }
                requestAnimationFrame(animate);
            } else {
                // Mostrar resultado final estático
                drawFinalComposition(1);
            }
        };

        animate();
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="rounded-lg"
        />
    );
};

export default Nut404Animation;