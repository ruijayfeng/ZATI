import type { ButtonHTMLAttributes } from 'react';
export function IconButton({ label, className='', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label:string }) { return <button aria-label={label} title={label} className={`icon-command ${className}`.trim()} {...props} />; }
