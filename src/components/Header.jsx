import styles from "./Header.module.scss";
import Logo from "./Logo";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}

export default Header;
