import React from 'react';
import css from "./Header.module.scss";

//jotai
import { useAtom } from 'jotai/react';
import { isWorking } from '@/jotai/trialAtom';

const Header = () => {

    const [isWorkingAtom, setIsWorkingAtom] = useAtom(isWorking);

    console.log("IS WORKING", isWorkingAtom)

    return (
        <div className={css.container}>
            <p>Header</p>
            <button onClick={() => setIsWorkingAtom(prev => !prev)}>TOGGLE WORKING</button>
        </div>
    )
}

export default Header;