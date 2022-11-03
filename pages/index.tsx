import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
  const test = async () => {
    const response = await axios.post("https://manyuser.tk/api/user/signup", {
      name: "self",
      email: "test@gamil.com",
      password: "react",
    });
    console.log(response);
  };
  test();

  return <div className={styles.container}>안녕하세요 크크크</div>;
}
