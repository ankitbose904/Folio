"use client";
import { useEffect, useState } from "react";

export default function TransparentImage({ src, alt, style, className }) {
    const [dataUrl, setDataUrl] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Get background color from top-left corner
            const bgR = data[0];
            const bgG = data[1];
            const bgB = data[2];
            
            // Tolerance increased to handle noise and slight gradients
            // Flood-fill prevents deleting inner parts of dark objects like camera/cricket
            const tolerance = 40; 
            
            const w = canvas.width;
            const h = canvas.height;
            const visited = new Uint8Array(w * h);
            const queue = [0]; // start at top-left pixel index
            visited[0] = 1;

            let head = 0;
            while(head < queue.length) {
                const idx = queue[head++];
                const pixelIdx = idx * 4;
                
                const r = data[pixelIdx];
                const g = data[pixelIdx + 1];
                const b = data[pixelIdx + 2];
                
                if (Math.abs(r - bgR) <= tolerance && 
                    Math.abs(g - bgG) <= tolerance && 
                    Math.abs(b - bgB) <= tolerance) {
                    
                    data[pixelIdx + 3] = 0; // Make pixel transparent
                    
                    const x = idx % w;
                    const y = Math.floor(idx / w);
                    
                    if (x > 0 && !visited[idx - 1]) { visited[idx - 1] = 1; queue.push(idx - 1); }
                    if (x < w - 1 && !visited[idx + 1]) { visited[idx + 1] = 1; queue.push(idx + 1); }
                    if (y > 0 && !visited[idx - w]) { visited[idx - w] = 1; queue.push(idx - w); }
                    if (y < h - 1 && !visited[idx + w]) { visited[idx + w] = 1; queue.push(idx + w); }
                }
            }
            
            ctx.putImageData(imageData, 0, 0);
            setDataUrl(canvas.toDataURL("image/png"));
            setIsLoading(false);
        };
    }, [src]);

    return (
        <img 
            src={dataUrl} 
            alt={alt} 
            style={{ ...style, opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }} 
            className={className} 
            draggable={false} 
        />
    );
}
