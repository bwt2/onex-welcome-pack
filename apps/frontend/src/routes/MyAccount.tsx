import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { useOutletContext } from "react-router";
import type { MyAccountFragment$key } from "./__generated__/MyAccountFragment.graphql";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const MyAccountFragment = graphql`
  fragment MyAccountFragment on User {
    name
    email
    homeGym {
      city
      country  
      state
      streetAddress
    }
    entries {
      id
      submissionTime
      data
      challenge {
        title
        gym {
          streetAddress
          city
        }
      }
    }
  }
`;


const MyAccount = () => {
    const { user } = useOutletContext<{ user: MyAccountFragment$key }>();
    const data = useFragment<MyAccountFragment$key>(
        MyAccountFragment,
        user,
    );

    return (
        <div className="flex">
          <aside className="mt-20 flex flex-col gap-5 min-h-50 text-2xl text-white">
            <div>
                <p>Welcome</p>
                <p className="text-9xl font-semibold">{data.name}</p>
                <p className="text-xl text-slate-400">{data.email}</p>
            </div>
            <div className="mt-5">
              <p>Your gym</p>
              <p className="text-4xl font-semibold capitalize">{data.homeGym.streetAddress}</p>
              <p className="text-4xl font-semibold capitalize">{data.homeGym.city}, <span className="uppercase">{data.homeGym.state}</span> {data.homeGym.country}</p>
            </div>
          </aside>
          <main className="mt-20 text-white ml-auto">
            <h1 className="text-4xl font-semibold text-center mb-10">My Entries</h1>
            <Table className="text-white capitalize text-xl">
              <TableCaption>Last updated {new Date().toUTCString()}</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead  className="text-white font-semibold">Challenge</TableHead>
                      <TableHead  className="text-white font-semibold">Gym</TableHead>
                      <TableHead  className="text-white font-semibold">Submission Time</TableHead>
                      <TableHead  className="text-white font-semibold">Entry</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {data.entries?.map((entry) => {
                      return (
                          <TableRow key={entry.id}>
                              <TableCell>{entry.challenge.title}</TableCell>
                              <TableCell>{entry.challenge.gym.streetAddress} {entry.challenge.gym.city}</TableCell>
                              <TableCell>{new Date(Number(entry.submissionTime)).toUTCString()}</TableCell>
                              <TableCell>
                                  {
                                      Object.entries(entry.data)
                                      .map(([key, value]) => `${key}: ${value}`)
                                      .join(", ")
                                  }
                              </TableCell>
                          </TableRow>
                      )
                  })}
              </TableBody>
            </Table>
          </main>
        </div>
  )
}

export default MyAccount;