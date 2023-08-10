import React from "react";
import styles from "./header.module.scss"

import logoImg from "../../assets/images/logo@2x.png"

const Litepaper = "https://learn.phezzan.xyz"

const Twitter = "https://twitter.com/PhezzanProtocol"

const Telegram = "https://t.me/phezzanprotocol "

const Medium = "https://medium.com/@phezzan "

const Header = ({isFooter}) => {
    const wrapperStyle = isFooter ? styles.footerWrapper : styles.headerWrapper;
    return(
        <div className={wrapperStyle}>
            <img className={styles.logo} src={logoImg} alt="logo" />
            <div className={styles.list}>
                <a 
                    className={styles.twitter}
                    href={Twitter}
                    target="_blank"
                    rel="noreferrer"
                ></a>
                <a 
                    className={styles.telegram}
                    href={Telegram}
                    target="_blank"
                    rel="noreferrer"
                ></a>
                <a 
                    className={styles.medium}
                    href={Medium}
                    target="_blank"
                    rel="noreferrer"
                ></a>
                <a 
                    className={styles.litepaper}
                    href={Litepaper}
                    target="_blank"
                    rel="noreferrer"
                ></a>
            </div>
        </div>
    )
}

export default Header;