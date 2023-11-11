import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.logo_box}>
      <img className={styles.logo} src="../../logo_transparent.png" />
    </div>
  );
}

export default Logo;
