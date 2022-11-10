// Libraries
import Head from "next/head";
import Link from "next/link";
import { useQuery, gql, type QueryHookOptions } from "@apollo/client";

// Components
import { ClubCards } from "../components/ClubCards";
import { CoursesTable } from "../components/CoursesTable";

// Styles
import styles from "../styles/Home.module.css";

const LAYOUT_QUERY = gql`
  query layout {
    layout {
      id
      nodes {
        id
        templateId
        title
        href
      }
    }
  }
`;

const useLayoutQuery = (options?: QueryHookOptions) =>
  useQuery(LAYOUT_QUERY, options);

const TEMPLATE_ID_TO_COMPONENT = {
  "card-list/clubs": ClubCards,
  "table/courses": CoursesTable,
};

const Home = () => {
  const { data, loading } = useLayoutQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js + Apollo!</a>
        </h1>

        <p className={styles.description}>Server Side Render</p>

        <div className={styles.grid}>
          {loading ? (
            <div>loading</div>
          ) : (
            data.layout.nodes.map((node) => {
              const Component = TEMPLATE_ID_TO_COMPONENT[node.templateId];
              return (
                <Link href={`/node/${node.href}`} key={node.id}>
                  <a className={styles.card}>
                    <div>
                      <h2>{node.title} &rarr;</h2>
                      <Component id={node.id} />
                    </div>
                  </a>
                </Link>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
