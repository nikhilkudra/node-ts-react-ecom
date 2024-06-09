import app from "./app";
import { syncModels } from "./models";

const PORT = process.env.PORT || 3000;

syncModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
