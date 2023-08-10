import React, { useState, useEffect } from 'react';
//@ts-ignore
import { useGoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import Modal from 'react-modal';
import axios from "axios";
import LogoPng from '../../assets/images/app/app_icon_logo@2x.png';
import HelloPng from '../../assets/images/app/app_text_sayhello@2x.png';
import GooglePng from '../../assets/images/app/app_icon_google@2x.png';
import AstronautPng from '../../assets/images/app/astronaut@2x.png';
import UnlockPng from '../../assets/images/app/app_icon_unlock_white.png';
import EthPng from '../../assets/images/app/eth.png';
import styles from "./index.module.scss"
import { initializeApp } from "firebase/app";
import { useAccount } from 'wagmi';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";
import CustomConnectButton from './CustomConnectButton';

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.70)"
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
  },
};

const TG = "https://t.me/mailzeroofficial"
const DC = "https://discord.gg/5ETYakTnkh"
const TW = "https://twitter.com/MailZeroNetwork"
const MEDIUM = "https://medium.com/@mailzeronetwork"

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentStep, setCurrentStep] = useState("login");
  const [loading, setLoading] = useState(false);

  const { address, isConnected } = useAccount()

  const onLogin = () => {
    setLoading(true);
    axios.post("https://api.mailzero.network/user", {
      email: userEmail,
      address: address,
      ip: "14.250.189.238",
      status: 1
    })
    .then((response) => {
      setLoading(false);
      console.log("response___", response);
      //@ts-ignore
      if (response.data && response.data.address && response.data.email) {
        setCurrentStep("success");
      }

      if (response.data && response.data.result === "already claim") {
        setCurrentStep("skipEnd");
      }
    }).catch((err) => {
      setLoading(false);
      console.log("err____", err)
    });
  }

  useEffect(() => {
    if (isConnected && userEmail && modalIsOpen) {
      onLogin();
    }
  },  [userEmail, address, modalIsOpen])


  const onClickGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data);

        console.log("tokenResponse____", tokenResponse);
        console.log("userInfo____", userInfo);

        if (userInfo && userInfo.email) {
          setUserEmail(userInfo.email);
        }
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const onSkip = () => {
    if (loading) {
      return false;
    }
    setCurrentStep("skipEnd");
  }

  return (
    <>   
        <div className={styles.container}>
        
          <div
            className={styles.loaderWrapper}
            style={{
              display: loading ? "grid" : "none"
            }}
          >
            <div className={styles.loader}></div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
            className={
              `${styles.modalContent}`
            }
          >
            <div
              className={styles.closeButton}
              onClick={
                () => {
                  if (loading) {
                    return false;
                  }
                  setIsOpen(false);
                }}
              ></div>
            {currentStep == "success" && <div className={styles.successEnd}>
              <h3 className={``}>
                Congratulations, you just
              </h3>
              <h3 className={``}>
                earned your <span className={`${styles.fontFocus}`}>first $49 MAIL!</span>
              </h3>
              <p className={``}>You will receive your $MAIL as soon as zkSync Era</p>
              <p>is supported. Join official Discord for more</p>
              <p>information and more airdrop!</p>
              <a
                className={`${styles.modalButton} ${styles.unLockButton}`}
                href={DC}
                target="_blank"
              >
                <div className={styles.buttonInner}>
                  <img
                    src={UnlockPng}
                    width={27.8}
                    height={32.4}
                    alt="earn"
                  />
                  <span className={``}>
                    Unlock more airdrop
                  </span>
                </div>
              </a>
              <div className={`${styles.unlocked}`}>Unlocked member</div>
            </div>}

            {currentStep == "skipEnd" && <div className={styles.skipEnd}>
              <div className={styles.skipEndContent}>
                <h3 className={``}>
                  To get updates, please join
                </h3>
                <h3 className={``}>
                  <span className={`${styles.fontFocus}`}>official Discord group</span> and
                </h3>
                <h3>
                  unlock more airdrop
                </h3>
              </div>
              <a
                className={`${styles.modalButton} ${styles.unLockButton}`}
                href={DC}
                target="_blank"
              >
                <div className={styles.buttonInner}>
                  <img
                    src={UnlockPng}
                    width={20.826}
                    height={24.3}
                    alt="earn"
                  />
                  <span className={``}>
                    Unlock more airdrop
                  </span>
                </div>
              </a>
              <div className={`${styles.unlocked}`}>Unlocked member</div>
            </div>}


            {currentStep == "login" && <div className={`${styles.login}`}>
            
              <div
                className={`${styles.modalButton}`}
                onClick={
                  () => {
                    if (loading) {
                      return false;
                    }
                    onClickGoogle()
                }}
              >
                <div className={styles.buttonInner}>
                  <img
                    src={GooglePng}
                    alt="google"
                  />
                  <span className={``}>
                    {userEmail ? userEmail : "Google"}
                  </span>
                </div>
              </div>
              <div className={`${styles.arrow}`}></div>
              <CustomConnectButton loading={loading} />
              <h3 className={`${styles.modalDesc}`}>Secondary Email <span className={`${styles.fontFocus}`}>(+$49 MAIL)</span></h3>
              <p className={styles.loginDesc}>Strongly recommend add a secondary email to</p>
              <p>enhanced security and earn $49 MAIL</p>
              <div
                className={`${styles.modalButtonSkip}`}
                onClick={onSkip}
              >
                Skip
              </div>
            </div>}
          </Modal>
          <div
            className={`${styles.header}`}
          >
            <div className={`w-full pt-3 ${styles.inner}`}>
              <div className={styles.logo}>
                <img
                  src={LogoPng}
                  alt="logo"
                />
              </div>
              <div className={styles.toolTip}>
                <div 
                  className={`${styles.getEarn}`}
                >
                  Earn <span className={`${styles.fontFocus}`}>$49</span> MAIL now & Win 3.88 <img src={EthPng} alt="eth" /> ETH on zkSync Era Later!
                </div>
              </div>
              <div className={`${styles.descContainer}`}>
                <div className={styles.left}>
                  <div className={`${styles.sayHello}`}>
                    <img
                      src={HelloPng}
                      alt="logo"
                    />
                  </div>
                  <div className={`${styles.desc}`}>
                    <p className={``}>MailZero is the world's first platform</p>
                    <p className={``}>that enables Web2 to Web3</p>
                    <p className={``}>interoperability for Stamp2Earn.</p>                    
                  </div>
                </div>
              </div>
                

              <div
                className={`${styles.mintButton}`}
              >
                Earn <span className={`mx-1 ${styles.fontFocus}`}>$49</span> MAIL on Desktop
              </div>
              <div className={`${styles.list}`}>
                <a 
                  className={`${styles.telegram}`}
                  href={TG}
                  target="_blank"
                ></a>
                <a 
                  className={`${styles.discord}`}
                  href={DC}
                  target="_blank"
                ></a>
                <a
                  className={`${styles.twitter}`}
                  href={TW}
                  target="_blank"
                ></a>
                <a
                  className={`${styles.medium}`}
                  href={MEDIUM}
                  target="_blank"
                ></a>
              </div>
            </div>
          </div>
          <div className={`${styles.partner}`}>
            <div className={`${styles.partnerInner}`}>
              <h2 className={``}></h2>
              <div className={`${styles.partnersList}`}>
                <a className={`${styles.layerZero}`}></a>
                <a className={`${styles.zkSync}`}></a>
              </div>
            </div>

            <div className={`${styles.footer}`}>© 2023 MailZero Network</div>
          </div>
        </div>
    </>
  );
};

export default Home;