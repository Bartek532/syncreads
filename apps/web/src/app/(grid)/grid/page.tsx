import { Grid } from "@/components/landing/home/grid/grid";

import { getMetadata } from "../../../lib/metadata";

export const metadata = getMetadata({
  title: "Grid",
});

const GridPage = () => {
  return <Grid />;
};

export default GridPage;
