import { Request, Response } from "express";
import { PlacesService } from "./places.service";

export class PlacesController {
  constructor(private placesService: PlacesService) {}

  info(req: Request, res: Response) {
    try {
      this.placesService.info().then((info) => {
        if (info) {
          return res.status(200).json({
            data: info,
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "시스템 정보 조회에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  getWorshipPlaceList(req: Request, res: Response) {
    try {
      this.placesService.getWorshipPlaceList().then((worshipPlaceList) => {
        if (worshipPlaceList) {
          return res.status(200).json({
            data: {
              count: worshipPlaceList.length,
              worshipPlaces: worshipPlaceList,
            },
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "예배 목록 조회에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  getWorshipPlace(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      this.placesService.getWorshipPlace(id).then((worshipPlace) => {
        if (worshipPlace) {
          return res.status(200).json({
            data: worshipPlace,
            status: "success",
          });
        } else {
          return res.status(200).json({
            message: "No Data!",
            status: "success",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  setWorshipPlace(req: Request, res: Response) {
    try {
      const { places, row, col, date, title, description } = req.body;

      if (places.length === 0) {
        return res.status(400).json({
          message: "유효하지 않은 자리 목록입니다.",
          status: "failed",
        });
      }

      if (typeof row !== "string" || row === "") {
        return res.status(400).json({
          message: "유효하지 않은 행입니다.",
          status: "failed",
        });
      }

      if (typeof col !== "number" || col === 0) {
        return res.status(400).json({
          message: "유효하지 않은 열입니다.",
          status: "failed",
        });
      }

      if (typeof date !== "string" || date === "") {
        return res.status(400).json({
          message: "유효하지 않은 예배일입니다.",
          status: "failed",
        });
      }

      if (typeof title !== "string" || title === "") {
        return res.status(400).json({
          message: "유효하지 않은 예배 제목입니다.",
          status: "failed",
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
          data: newWorshipPlace,
          status: "success",
        });
      } else {
        return res.status(500).json({
          message: "예배 자리 저장에 실패했습니다.",
          status: "error",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  deleteWorshipPlace(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      this.placesService.deleteWorshipPlace(id).then((result) => {
        if (result) {
          return res.status(200).json({
            data: { id },
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "예배 자리 삭제에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  checkId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      this.placesService.checkId(id).then((result) => {
        if (result) {
          return res.status(200).json({
            data: { result: result },
            status: "success",
          });
        } else {
          return res.status(200).json({
            data: { result: result },
            message: "해당 아이디가 존재하지 않습니다.",
            status: "success",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res
        .status(500)
        .json({ message: "서버 에러가 발생했습니다.", status: "error" });
    }
  }

  setPlace(req: Request, res: Response) {
    try {
      const { id, row, col, name, cell } = req.body;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      if (typeof row !== "string" || row === "") {
        return res.status(400).json({
          message: "유효하지 않은 행입니다.",
          status: "failed",
        });
      }

      if (typeof col !== "number" || col === 0) {
        return res.status(400).json({
          message: "유효하지 않은 열입니다.",
          status: "failed",
        });
      }

      if (typeof name !== "string" || name === "") {
        return res.status(400).json({
          message: "유효하지 않은 이름입니다.",
          status: "failed",
        });
      }

      if (typeof cell !== "string" || cell === "") {
        return res.status(400).json({
          message: "유효하지 않은 셀입니다.",
          status: "failed",
        });
      }

      this.placesService.setPlace(id, row, col, name, cell).then((newPlace) => {
        if (newPlace) {
          return res.status(200).json({
            data: newPlace,
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "자리 저장에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  deletePlace(req: Request, res: Response) {
    try {
      const { id, row, col } = req.body;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      if (typeof row !== "string" || row === "") {
        return res.status(400).json({
          message: "유효하지 않은 행입니다.",
          status: "failed",
        });
      }

      if (typeof col !== "number" || col === 0) {
        return res.status(400).json({
          message: "유효하지 않은 열입니다.",
          status: "failed",
        });
      }

      this.placesService.deletePlace(id, row, col).then((newPlace) => {
        if (newPlace) {
          return res.status(200).json({
            data: newPlace,
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "자리 삭제에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  getDisplay(req: Request, res: Response) {
    try {
      this.placesService.getDisplay().then((worshipPlace) => {
        if (worshipPlace) {
          return res.status(200).json({
            data: worshipPlace,
            status: "success",
          });
        } else {
          return res.status(200).json({
            message: "No Data!",
            status: "success",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  setDisplay(req: Request, res: Response) {
    try {
      const { id, afterIsDisplay } = req.body;

      if (typeof id !== "string" || id === "") {
        return res.status(400).json({
          message: "유효하지 않은 아이디입니다.",
          status: "failed",
        });
      }

      if (typeof afterIsDisplay !== "boolean") {
        return res.status(400).json({
          message: "유효하지 않은 값입니다.",
          status: "failed",
        });
      }

      this.placesService.setDisplay(id, afterIsDisplay).then((result) => {
        if (result) {
          return res.status(200).json({
            data: { id, afterIsDisplay },
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "디스플레이 지정에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }

  validateDisplay(req: Request, res: Response) {
    try {
      this.placesService.validateDisplay().then((result) => {
        if (result) {
          return res.status(200).json({
            data: { validatorCode: result },
            status: "success",
          });
        } else {
          return res.status(500).json({
            message: "크론잡 수행(validateDisplay)에 실패했습니다.",
            status: "error",
          });
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json(error);
      }
      return res.status(500).json({
        message: "서버 에러가 발생했습니다.",
        status: "error",
      });
    }
  }
}
