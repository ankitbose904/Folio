import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    // Next.js 15 requires awaiting params
    const resolvedParams = await params;
    const icon = resolvedParams.icon;
    
    const icons = {
        'figma.png': '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/figma_3d_1777437696945.png',
        'framer.png': '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/framer_3d_1777437716028.png',
        'openai.png': '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/openai_3d_1777437733788.png',
        'gemini.png': '/Users/ankit/.gemini/antigravity/brain/1dfbca2b-5953-4e25-90a4-14694fa11db6/gemini_3d_1777437748984.png'
    };

    const filePath = icons[icon];

    if (filePath && fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new NextResponse(fileBuffer, {
            headers: { 
                'Content-Type': 'image/png',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
            },
        });
    }

    console.log("API ROUTE 404: icon requested was", icon, "mapped to", filePath, "exists:", filePath ? fs.existsSync(filePath) : "N/A");

    return new NextResponse('Not found: ' + icon, { status: 404 });
}

export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
        },
    });
}
