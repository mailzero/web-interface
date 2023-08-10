import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletPng from '../../assets/images/app/app_icon_moneybag_grey@2x.png';
import WalletPngWhite from '../../assets/images/app/app_icon_moneybag_white@2x.png';
import styles from './index.module.scss'

const CustomConnectButton= ({loading}) => {
  return (
    <div
      className={`${styles.connectButtonWrap}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <div 
                      onClick={
                        (e) => {
                          if (loading) {
                            return false;
                          }
                          openConnectModal(e);
                        }
                        
                      }
                      className={`${styles.modalButton}`}
                    >
                      <div className={styles.buttonInner}>
                        <img
                          src={WalletPng}
                          alt="wallet"
                        />
                        <span className={``}>Connect Wallet</span>
                      </div>
                    </div>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <div
                      onClick={openChainModal}
                      className={`w-[22.9rem] h-[3.28rem] ${styles.modalButton}`}
                    >
                      Wrong network
                    </div>
                  );
                }

                return (
                  <div 
                      className={`${styles.modalButton}`}
                      onClick={()=> {
                        openConnectModal();
                      } }
                      style={{
                        background: "linear-gradient(89deg, #FF4E00 0%, #FF9327 100%)"
                      }}
                  >
                    <div className={styles.buttonInner}>
                      <img
                        src={WalletPngWhite}
                        alt="wallet"
                      />
                      <span className={``}>
                      {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default CustomConnectButton;
