"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesBackgroundProps {
    color?: string;
    particleCount?: number;
    speed?: number;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
    color = "#8b5cf6",
    particleCount = 100,
    speed = 0.5,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; dx: number; dy: number; size: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    dx: (Math.random() - 0.5) * speed,
                    dy: (Math.random() - 0.5) * speed,
                    size: Math.random() * 2 + 0.5,
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.beginPath();

            particles.forEach((particle) => {
                ctx.moveTo(particle.x, particle.y);
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

                // Update position
                particle.x += particle.dx;
                particle.y += particle.dy;

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
            });

            ctx.fill();
            animationFrameId = requestAnimationFrame(drawParticles);
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        drawParticles();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color, particleCount, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-40"
        />
    );
};
