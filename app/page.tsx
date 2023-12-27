import React from "react";
import backgroundImage from "./img/bills-stadium.webp";
import styles from "./styles.module.css";
import HomeHeader from "./components/HomeHeader";

const Home = () => {
  return (
    <main className="flex flex-row items-center">
      <HomeHeader></HomeHeader>
      <span className={styles["welcome-text"]}>WELCOME TO ALL THINGS NFL</span>
      <img
        src={backgroundImage.src}
        alt="Logo"
        className={styles["bg-image"]}
      ></img>{" "}
    </main>
  );
};

export default Home;
