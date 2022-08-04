import { Request, Response } from "express";
import { PlacesService } from "./places.service";

export class PlacesController {
  constructor(private placesService: PlacesService) {}

  getWorshipPlaceList(req: Request, res: Response) {
    try {
      const worshipPlaceList = this.placesService.getWorshipPlaceList();

      if (worshipPlaceList) {
        return res.status(200).json({
          worshipPlaceList: worshipPlaceList,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "예배 목록 조회에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  getWorshipPlace(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
        });
      }

      const worshipPlace = this.placesService.getWorshipPlace(id);

      if (worshipPlace) {
        return res.status(200).json({
          worshipPlace: worshipPlace,
          message: "Success!",
        });
      } else {
        return res.status(200).json({
          message: "No Data!",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  setWorshipPlace(req: Request, res: Response) {
    try {
      const { places, row, col, date, title, description } = req.body;

      if (places.length === 0) {
        return res.status(400).json({
          message: "유효하지 않은 자리 목록입니다.",
        });
      }

      if (typeof row !== "string" || row === "") {
        return res.status(400).json({
          message: "유효하지 않은 행입니다.",
        });
      }

      if (typeof col !== "number" || col === 0) {
        return res.status(400).json({
          message: "유효하지 않은 열입니다.",
        });
      }

      if (typeof date !== "string" || date === "") {
        return res.status(400).json({
          message: "유효하지 않은 예배일입니다.",
        });
      }

      if (typeof title !== "string" || title === "") {
        return res.status(400).json({
          message: "유효하지 않은 예배 제목입니다.",
        });
      }

      const newWorshipPlace = this.placesService.setWorshipPlace(
        places,
        row,
        col,
        date,
        title,
        description
      );

      if (newWorshipPlace) {
        return res.status(200).json({
          worshipPlace: newWorshipPlace,
          createdAt: newWorshipPlace.createdAt,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "예배 자리 저장에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  deleteAllWorshipPlace(req: Request, res: Response) {
    try {
      const result = this.placesService.deleteAllWorshipPlace();

      if (result) {
        return res.status(200).json({
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "예배 자리 전체 삭제에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  deleteWorshipPlace(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
        });
      }

      const result = this.placesService.deleteWorshipPlace(id);

      if (result) {
        return res.status(200).json({
          id,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "예배 자리 삭제에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  checkId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
        });
      }

      const result = this.placesService.checkId(id);

      if (result) {
        return res.status(200).json({
          result: result,
          message: "Success!",
        });
      } else {
        return res.status(200).json({
          result: result,
          message: "해당 아이디가 존재하지 않습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  setPlace(req: Request, res: Response) {
    try {
      const { id, row, col, name, cell } = req.body;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
        });
      }

      if (typeof row !== "string" || row === "") {
        return res.status(400).json({
          message: "유효하지 않은 행입니다.",
        });
      }

      if (typeof col !== "number" || col === 0) {
        return res.status(400).json({
          message: "유효하지 않은 열입니다.",
        });
      }

      if (typeof name !== "string" || name === "") {
        return res.status(400).json({
          message: "유효하지 않은 이름입니다.",
        });
      }

      if (typeof cell !== "string" || cell === "") {
        return res.status(400).json({
          message: "유효하지 않은 셀입니다.",
        });
      }

      const newPlace = this.placesService.setPlace(id, row, col, name, cell);

      if (newPlace) {
        return res.status(200).json({
          place: newPlace,
          updatedAt: newPlace.updatedAt,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "자리 저장에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  deletePlace(req: Request, res: Response) {
    try {
      const { id, row, col } = req.body;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
        });
      }

      if (typeof row !== "string" || row === "") {
        return res.status(400).json({
          message: "유효하지 않은 행입니다.",
        });
      }

      if (typeof col !== "number" || col === 0) {
        return res.status(400).json({
          message: "유효하지 않은 열입니다.",
        });
      }

      const newPlace = this.placesService.deletePlace(id, row, col);

      if (newPlace) {
        return res.status(200).json({
          place: newPlace,
          updatedAt: newPlace.updatedAt,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "자리 삭제에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  getDisplay(req: Request, res: Response) {
    try {
      const worshipPlace = this.placesService.getDisplay();

      if (worshipPlace) {
        return res.status(200).json({
          worshipPlace: worshipPlace,
          message: "Success!",
        });
      } else {
        return res.status(200).json({
          message: "No Data!",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }

  setDisplay(req: Request, res: Response) {
    try {
      const { id, afterIsDisplay } = req.body;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
        });
      }

      if (typeof afterIsDisplay !== "boolean") {
        return res.status(400).json({
          message: "유효하지 않은 값입니다.",
        });
      }

      const result = this.placesService.setDisplay(id, afterIsDisplay);

      if (result) {
        return res.status(200).json({
          id,
          afterIsDisplay,
          message: "Success!",
        });
      } else {
        return res.status(500).json({
          message: "디스플레이 지정에 실패했습니다.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json("서버 에러가 발생했습니다.");
    }
  }
}
