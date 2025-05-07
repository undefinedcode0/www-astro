import type { RenderFunctionInput } from 'astro-opengraph-images';
import React from 'react';
const { twj } = await import('tw-to-css');

export function fnRender({ title, description }: RenderFunctionInput): Promise<React.ReactNode> {
  return Promise.resolve(
    <div style={twj('flex flex-col w-full h-full justify-start flex-col bg-[#F7F5ED]')}>
      <div style={twj('flex justify-start items-start flex-col p-20')}>
        <div style={twj('flex gap-8 items-center')}>
          <div style={twj('h-[80px] w-[80px] mt-[10px] rounded-full bg-[#125EFF]')}></div>
          <h1 style={twj('text-[100px] text-black font-bold text-left')}>{title}</h1>
        </div>
        <p style={twj('text-[50px] text-black text-left')}>{description}</p>
      </div>
      <div style={twj('h-[1px] mb-[1px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[2px] mb-[2px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[4px] mb-[4px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[8px] mb-[8px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[16px] mb-[16px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[32px] mb-[32px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[64px] mb-[64px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[128px] mb-[128px] bg-[#125EFF] w-full')}></div>
      <div style={twj('h-[256px] mb-[256px] bg-[#125EFF] w-full')}></div>
    </div>,
  );
}
