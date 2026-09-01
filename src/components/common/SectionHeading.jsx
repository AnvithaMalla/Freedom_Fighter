import React from 'react';

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  centered = true,
  className = '',
  actionButton = null,
}) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {kicker && (
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#996515] uppercase mb-1 font-ntr">
          <span className="h-[1px] w-4 bg-[#996515]"></span>
          <span>{kicker}</span>
          <span className="h-[1px] w-4 bg-[#996515]"></span>
        </div>
      )}

      <div className={`flex flex-col md:flex-row items-center ${centered ? 'justify-center' : 'justify-between'} gap-4`}>
        <h2 className="font-gurajada text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight leading-tight">
          {title}
        </h2>
        {actionButton && (
          <div className="shrink-0">{actionButton}</div>
        )}
      </div>

      {subtitle && (
        <p className="font-ntr text-sm sm:text-base text-[#57524C] mt-1.5 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative Ornate Divider Line */}
      <div className="flex items-center justify-center gap-3 my-3">
        <span className="h-[1px] w-12 sm:w-24 bg-[#D6CFC7]"></span>
        <span className="text-[#781D22] text-xs font-bold">❖ ── ✦ ── ❖</span>
        <span className="h-[1px] w-12 sm:w-24 bg-[#D6CFC7]"></span>
      </div>
    </div>
  );
}
