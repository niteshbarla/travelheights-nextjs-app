import Link from "next/link";
import Head from "next/head";

export default function Custom404({ message }) {
  return (
    <div style={styles.container}>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>{message}</p>
      <Link href="/" style={styles.link}>
        Go back to the homepage
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch data from an API or use static data
  const message = "Oops! The page you're looking for doesn't exist.";

  return {
    props: {
      message,
    },
  };
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f7f7f7",
    color: "#333",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  link: {
    color: "#0070f3",
    textDecoration: "none",
    fontSize: "1rem",
  },
};
