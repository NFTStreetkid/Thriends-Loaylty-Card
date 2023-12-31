import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <nav className={styles.header}>
      <div style={{ width: "200px" }}>
        <Link href="/">
          <Image
            src="https://thriends.io/wp-content/uploads/2023/11/Thriends-LogoLC.svg"
            alt="thirdweb"
            width={52}
            height={32}
            className={styles.logo}
          />
        </Link>
      </div>

      <Link href="/admin" className={styles.link}>
        Thriends Loyalty Dashboard
      </Link>

      <div style={{ width: "200px" }}>
        <ConnectWallet theme="dark" />
      </div>
    </nav>
  );
};
