//server.js
import { serve } from "./handler";

serve.listen(5678, () => {
  console.log("Example app listening on port 5678!");
});
