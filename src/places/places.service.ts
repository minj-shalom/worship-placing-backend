import { Place } from "../commons/place";
import { DisplayModel, WorshipPlaceModel } from "../models/models";

const koreaTimezone = 1000 * 60 * 60 * 9;

export class PlacesService {
  async getWorshipPlaceList() {
    const worshipPlaces = await WorshipPlaceModel.find(
      {},
      { _id: 0, __v: 0 }
    ).sort({ date: 1 });

    return worshipPlaces;
  }

  async getWorshipPlace(id: string) {
    const worshipPlace = await WorshipPlaceModel.find(
      { id: Number(id) },
      { _id: 0, __v: 0 }
    );

    return worshipPlace[0];
  }

  async setWorshipPlace(
    places: Place[],
    row: string,
    col: number,
    date: string,
    title: string,
    description?: string
  ) {
    const count = places.length;
    const isDisplay = false;
    const createdAt = new Date(Date.now() + koreaTimezone).toISOString();
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    const newWorshipPlace = {
      count,
      places,
      row,
      col,
      date,
      title,
      description,
      isDisplay,
      createdAt,
      updatedAt,
    };

    await WorshipPlaceModel.create(newWorshipPlace);

    return newWorshipPlace;
  }

  async deleteWorshipPlace(id: string) {
    const result = this.checkId(id).then(async (isWorshipPlace) => {
      if (!isWorshipPlace) {
        return false;
      } else {
        await WorshipPlaceModel.deleteOne({ id: Number(id) });
        const displayIdList = await DisplayModel.find({}, { _id: 0, __v: 0 });
        const displayId = displayIdList?.[0]?.id;
        if (displayId === Number(id)) {
          await DisplayModel.deleteOne({ id: Number(id) });
        }
        return true;
      }
    });
    return result;
  }

  async checkId(id: string) {
    const worshipPlaces = await WorshipPlaceModel.find(
      {},
      {
        _id: 0,
        __v: 0,
        count: 0,
        places: 0,
        row: 0,
        col: 0,
        date: 0,
        title: 0,
        description: 0,
        isDisplay: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    ).sort({ date: 1 });

    const idList = worshipPlaces.map((item: { id: number }) => {
      return item.id;
    });

    if (idList.includes(Number(id))) {
      return true;
    } else {
      return false;
    }
  }

  async setPlace(
    id: string,
    row: string,
    col: number,
    name: string,
    cell: string
  ) {
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    const newPlace = this.getWorshipPlace(id).then(async (worshipPlace) => {
      const places = worshipPlace.places;

      const newPlaces = places.map((item: any) => {
        if (item.row === row && item.col === col) {
          return {
            row: item.row,
            col: item.col,
            status: "reserved",
            name: name,
            cell: cell,
            createdAt: item.createdAt,
            updatedAt: updatedAt,
            _id: item._id,
          };
        } else {
          return item;
        }
      });

      await WorshipPlaceModel.updateOne(
        { id: Number(id) },
        { places: newPlaces, updatedAt: updatedAt }
      );

      const newPlace = newPlaces.filter((item: any) => {
        if (item.row === row && item.col === col) {
          return true;
        } else {
          return false;
        }
      })[0];
      return newPlace;
    });

    return newPlace;
  }

  async deletePlace(id: string, row: string, col: number) {
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    const newPlace = this.getWorshipPlace(id).then(async (worshipPlace) => {
      const places = worshipPlace.places;

      const newPlaces = places.map((item: any) => {
        if (item.row === row && item.col === col) {
          return {
            row: item.row,
            col: item.col,
            status: "empty",
            name: undefined,
            cell: undefined,
            createdAt: item.createdAt,
            updatedAt: updatedAt,
            _id: item._id,
          };
        } else {
          return item;
        }
      });

      await WorshipPlaceModel.updateOne(
        { id: Number(id) },
        { places: newPlaces, updatedAt: updatedAt }
      );

      const newPlace = newPlaces.filter((item: any) => {
        if (item.row === row && item.col === col) {
          return true;
        } else {
          return false;
        }
      })[0];
      return newPlace;
    });

    return newPlace;
  }

  async getDisplay() {
    const displayIdList = await DisplayModel.find({}, { _id: 0, __v: 0 });
    const displayId = displayIdList?.[0]?.id;

    if (displayId === undefined) {
      return undefined;
    } else {
      const worshipPlace = this.getWorshipPlace(displayId).then(
        (worshipPlace: any) => {
          const places = worshipPlace.places;
          const newPlaces = places.map((item: any) => {
            return {
              row: item.row,
              col: item.col,
              status: item.status,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
            };
          });
          return {
            count: worshipPlace.count,
            id: worshipPlace.id,
            row: worshipPlace.row,
            col: worshipPlace.col,
            date: worshipPlace.date,
            isDisplay: worshipPlace.isDisplay,
            places: newPlaces,
            title: worshipPlace.title,
            createdAt: worshipPlace.createdAt,
            updatedAt: worshipPlace.updatedAt,
          };
        }
      );
      return worshipPlace;
    }
  }

  async setDisplay(id: string, afterIsDisplay: boolean) {
    const displayIdList = await DisplayModel.find({}, { _id: 0, __v: 0 });
    const displayId = displayIdList?.[0]?.id;

    if (afterIsDisplay) {
      if (displayId) {
        await WorshipPlaceModel.updateOne(
          { id: Number(displayId) },
          { isDisplay: false }
        );
        await WorshipPlaceModel.updateOne(
          { id: Number(id) },
          { isDisplay: true }
        );
        await DisplayModel.updateOne({ id: displayId }, { id: Number(id) });
      } else {
        await WorshipPlaceModel.updateOne(
          { id: Number(id) },
          { isDisplay: true }
        );
        await DisplayModel.create({ id: Number(id) });
      }

      const newDisplayIdList = await DisplayModel.find({}, { _id: 0, __v: 0 });
      if (newDisplayIdList?.[0]?.id === Number(id)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (!displayId) {
        return false;
      } else {
        await WorshipPlaceModel.updateOne(
          { id: Number(id) },
          { isDisplay: false }
        );
        await DisplayModel.deleteOne({ id: Number(id) });

        const newDisplayIdList = await DisplayModel.find(
          {},
          { _id: 0, __v: 0 }
        );
        if (newDisplayIdList?.[0]?.id === Number(id)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
}
