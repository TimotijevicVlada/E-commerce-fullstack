import { FC } from 'react';
import css from "./Layout.module.scss";

//components
import Header from './Header/Header';
import Footer from './Footer/Footer';

//types
import { LayoutProps } from '@/interfaces/layout';

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={css.container}>
            <Header />
            <div className={css.childrenWrapper}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;