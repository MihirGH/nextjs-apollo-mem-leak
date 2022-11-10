// Libraries
import { useQuery, gql, type QueryHookOptions } from "@apollo/client";

// Styles
import styles from "../styles/Home.module.css";

const CLUB_CARD_QUERY = gql`
  query nodeDetail($id: String!) {
    nodeDetail(id: $id) {
      id
      title
      description
    }
  }
`;

const CoursesTableTombstones = () => {
  return (
    <div>
      <div className={styles.tombstone} />
      <div
        className={styles.tombstone}
        style={{ width: "50%", marginTop: "2px" }}
      />
    </div>
  );
};

export const CoursesTable = ({ id }) => {
  const { data, loading } = useQuery(CLUB_CARD_QUERY, {
    ssr: false,
    variables: { id },
  });
  return loading ? (
    <CoursesTableTombstones />
  ) : (
    <p>{data.nodeDetail.description}</p>
  );
};
