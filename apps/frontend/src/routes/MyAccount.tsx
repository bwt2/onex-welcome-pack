import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { useOutletContext } from "react-router";
import type { MyAccountFragment$key } from "./__generated__/MyAccountFragment.graphql";

const MyAccountFragment = graphql`
  fragment MyAccountFragment on User {
    name
    email
    homeGym {
      city
    }
    entries {
      submissionTime
      challenge {
        title
      }
    }
  }
`;


const MyAccount = () => {
    const { user } = useOutletContext<{ user: MyAccountFragment$key }>();
    console.log("macc", user)
    const data = useFragment<MyAccountFragment$key>(
        MyAccountFragment,
        user,
    );

    return (
        <div className="text-2xl text-white flex flex-row gap-25">
            <section>
                <p>Welcome {data.name}!</p>
                <p>Your email is {data.email}!</p>
                <p>Your home gym is {data.homeGym.city}!</p>
            </section>
            <section>
                <p>Entries here</p>
            </section>
        </div>
    )
}

export default MyAccount;