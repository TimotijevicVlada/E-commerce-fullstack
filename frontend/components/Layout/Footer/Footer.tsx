import React from 'react'
import css from "./Footer.module.scss";

//jotai
import { useAtom } from 'jotai/react';
import { isWorking } from '@/jotai/trialAtom';

const Footer = () => {

    const [isWorkingAtom, setIsWorkingAtom] = useAtom(isWorking)

    return (
        <div className={css.container}>
            {isWorkingAtom ? "IS WORKING" : "NOT WORKING"}
        </div>
    )
}

export default Footer;