// Libraries
import { useQuery, gql } from "@apollo/client";

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

const ClubCardsTombstones = () => {
  return <div className={styles.tombstone} />;
};

export const ClubCards = ({ id }) => {
  const { data, loading } = useQuery(CLUB_CARD_QUERY, {
    ssr: false,
    variables: { id },
  });

  return loading ? (
    <ClubCardsTombstones />
  ) : (
    <p>{data.nodeDetail.description}</p>
  );
};
