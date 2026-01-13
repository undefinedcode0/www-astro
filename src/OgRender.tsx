import type { RenderFunctionInput } from 'astro-opengraph-images';
import React from 'react';
const { twj } = await import('tw-to-css');

export function fnRender({ title, description }: RenderFunctionInput): Promise<React.ReactNode> {
  const stripes = [1, 2, 4, 8, 16, 32, 64, 128, 256];
  return Promise.resolve(
    <div style={twj('flex flex-col w-full h-full justify-start flex-col bg-[#F7F5ED]')}>
      <div style={twj('flex justify-start items-start flex-col p-20')}>
        <div style={twj('flex gap-8 items-center')}>
          <div style={twj('h-[80px] w-[80px] mt-[10px] rounded-full bg-[#125EFF]')}></div>
          <h1 style={twj('text-[100px] text-black font-bold text-left')}>{title}</h1>
        </div>
        <p style={twj('text-[50px] text-black text-left')}>{description}</p>
      </div>
      {stripes.map((h) => (
        <div key={h} style={twj(`h-[${h}px] mb-[${h}px] bg-[#125EFF] w-full`)}></div>
      ))}
    </div>,
  );
}
