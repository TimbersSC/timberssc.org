import type { ActionArgs, LoaderArgs } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData, useParams } from "@remix-run/react";

import axios from "axios";

export const loader = async ({ params }: LoaderArgs) => {
  console.log(params.categoryId);
  return [];
};

export default function Category() {
  let results = useLoaderData();
  return (
    <div>
      <h1>Category</h1>
    </div>
  );
}
