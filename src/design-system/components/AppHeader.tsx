import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
export function AppHeader({actions}:{actions?:ReactNode}) { return <header className="app-header"><Link className="brand" to="/">ZATI · 紫曜型格</Link><nav>{actions}</nav></header>; }
