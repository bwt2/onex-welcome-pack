import { graphql } from "relay-runtime";
import { MyGymsFragment$key } from "./__generated__/MyGymsFragment.graphql";
import { useFragment } from "react-relay";
import { useOutletContext } from "react-router";

const MyGymsFragment = graphql`
  fragment MyGymsFragment on Gym {
    city
    country
    gymId
    state
    streetAddress
    challenges {
      title
      type
    }
  }
`;

const MyGyms = () => {
    const { homeGym } = useOutletContext<{ homeGym: MyGymsFragment$key }>();
    const data = useFragment<MyGymsFragment$key>(
        MyGymsFragment,
        homeGym
    )
    return (
        <section className="text-2xl text-white">
            <p>Gym {data.city}, {data.country}!</p>
            <p>Address {data.state} {data.streetAddress}!</p>
            <p>Challenges ZZZ!</p>
        </section>
    )
}

export default MyGyms;