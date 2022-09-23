import { Router } from "express";
import { PlacesController } from "./places.controller";
import { PlacesService } from "./places.service";

const placesRouter = Router();

const placesController = new PlacesController(new PlacesService());

placesRouter.get("/worship-place", (req, res) =>
  placesController.getWorshipPlaceList(req, res)
);
placesRouter.get("/worship-place/:id", (req, res) =>
  placesController.getWorshipPlace(req, res)
);
placesRouter.post("/worship-place", (req, res) =>
  placesController.setWorshipPlace(req, res)
);
placesRouter.delete("/worship-place/:id", (req, res) =>
  placesController.deleteWorshipPlace(req, res)
);

placesRouter.get("/check-id/:id", (req, res) =>
  placesController.checkId(req, res)
);

placesRouter.post("/place/:id", (req, res) =>
  placesController.setPlace(req, res)
);
placesRouter.put("/place/:id", (req, res) =>
  placesController.deletePlace(req, res)
);

placesRouter.get("/display", (req, res) =>
  placesController.getDisplay(req, res)
);
placesRouter.put("/display", (req, res) =>
  placesController.setDisplay(req, res)
);

export default placesRouter;
