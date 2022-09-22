import { Place, WorshipPlace } from "../commons/place";
import { InMemoryMap, DisplayPlaceId } from "../commons/in-memory-map";
import { v4 } from "uuid";
import moment from "moment";

const koreaTimezone = 1000 * 60 * 60 * 9;

export class PlacesService {
  getWorshipPlaceList() {
    const mapMultiIterator = InMemoryMap.values();
    const worshipPlaces = Array.from(mapMultiIterator);
    const count = worshipPlaces.length;
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    worshipPlaces.sort((a, b) =>
      moment(a.date, "YYYY-MM-DD").isBefore(moment(b.date, "YYYY-MM-DD"))
        ? -1
        : 1
    );

    return worshipPlaces;
  }

  getWorshipPlace(id: string) {
    const mapMultiIterator = InMemoryMap.values();
    const worshipPlaces = Array.from(mapMultiIterator);

    const worshipPlace = worshipPlaces.filter((item) => {
      if (item.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    return worshipPlace;
  }

  setWorshipPlace(
    places: Place[],
    row: string,
    col: number,
    date: string,
    title: string,
    description?: string
  ) {
    const id = v4();
    const count = places.length;
    const isDisplay = false;
    const createdAt = new Date(Date.now() + koreaTimezone).toISOString();
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    const newWorshipPlace: WorshipPlace = {
      id,
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

    InMemoryMap.set(id, newWorshipPlace);

    return newWorshipPlace;
  }

  deleteAllWorshipPlace() {
    try {
      InMemoryMap.clear();
      return true;
    } catch {
      return false;
    }
  }

  deleteWorshipPlace(id: string) {
    if (!InMemoryMap.has(id)) {
      return false;
    } else {
      InMemoryMap.delete(id);
      return true;
    }
  }

  checkId(id: string) {
    const mapMultiIterator = InMemoryMap.values();
    const worshipPlaces = Array.from(mapMultiIterator);
    const idList = worshipPlaces.map((item) => item.id);

    if (idList.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  setPlace(id: string, row: string, col: number, name: string, cell: string) {
    const mapMultiIterator = InMemoryMap.values();
    const worshipPlaces = Array.from(mapMultiIterator);
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    const worshipPlace = worshipPlaces.filter((item) => {
      if (item.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    const places = worshipPlace.places;

    const newPlaces = places.map((item) => {
      if (item.row === row && item.col === col) {
        const newPlace = {
          ...item,
          status: "reserved",
          name: name,
          cell: cell,
          updatedAt: updatedAt,
        };
        return newPlace;
      } else {
        return item;
      }
    });
    const newWorshipPlace = {
      ...worshipPlace,
      places: newPlaces,
      updatedAt: updatedAt,
    };

    InMemoryMap.set(id, newWorshipPlace);

    const newPlace = newPlaces.filter((item) => {
      if (item.row === row && item.col === col) {
        return true;
      } else {
        return false;
      }
    })[0];
    return newPlace;
  }

  deletePlace(id: string, row: string, col: number) {
    const mapMultiIterator = InMemoryMap.values();
    const worshipPlaces = Array.from(mapMultiIterator);
    const updatedAt = new Date(Date.now() + koreaTimezone).toISOString();

    const worshipPlace = worshipPlaces.filter((item) => {
      if (item.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    const places = worshipPlace.places;

    const newPlaces = places.map((item) => {
      if (item.row === row && item.col === col) {
        const newPlace = {
          ...item,
          status: "empty",
          name: undefined,
          cell: undefined,
          updatedAt: updatedAt,
        };
        return newPlace;
      } else {
        return item;
      }
    });
    const newWorshipPlace = {
      ...worshipPlace,
      places: newPlaces,
      updatedAt: updatedAt,
    };

    InMemoryMap.set(id, newWorshipPlace);

    const newPlace = newPlaces.filter((item) => {
      if (item.row === row && item.col === col) {
        return true;
      } else {
        return false;
      }
    })[0];
    return newPlace;
  }

  getDisplay() {
    if (DisplayPlaceId.size === 0) {
      return undefined;
    } else {
      const mapSingleIterator = DisplayPlaceId.values();
      const displayPlaceId = Array.from(mapSingleIterator);
      const mapMultiIterator = InMemoryMap.values();
      const worshipPlaces = Array.from(mapMultiIterator);

      const id = displayPlaceId[0];
      const worshipPlace = worshipPlaces.filter((item) => {
        if (item.id === id) {
          return true;
        } else {
          return false;
        }
      })[0];
      return worshipPlace;
    }
  }

  setDisplay(id: string, afterIsDisplay: boolean) {
    const mapSingleIterator = DisplayPlaceId.values();
    const displayPlaceId = Array.from(mapSingleIterator);
    const mapMultiIterator = InMemoryMap.values();
    const worshipPlaces = Array.from(mapMultiIterator);

    if (afterIsDisplay) {
      if (displayPlaceId.length !== 0) {
        const beforeId = displayPlaceId[0];
        const beforeData = worshipPlaces.filter((item) => {
          if (item.id === beforeId) {
            return true;
          } else {
            return false;
          }
        })[0];
        const newBeforeData: WorshipPlace = {
          ...beforeData,
          isDisplay: false,
        };
        InMemoryMap.set(beforeId, newBeforeData);
      }

      const afterId = id;
      const afterData = worshipPlaces.filter((item) => {
        if (item.id === afterId) {
          return true;
        } else {
          return false;
        }
      })[0];
      const newAfterData: WorshipPlace = {
        ...afterData,
        isDisplay: true,
      };
      InMemoryMap.set(afterId, newAfterData);

      DisplayPlaceId.clear();
      DisplayPlaceId.set(afterId, afterId);

      if (DisplayPlaceId.has(id)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (displayPlaceId.length === 0) {
        return false;
      } else {
        const afterId = id;
        const afterData = worshipPlaces.filter((item) => {
          if (item.id === afterId) {
            return true;
          } else {
            return false;
          }
        })[0];
        const newAfterData: WorshipPlace = {
          ...afterData,
          isDisplay: false,
        };
        InMemoryMap.set(afterId, newAfterData);

        DisplayPlaceId.clear();

        if (!DisplayPlaceId.has(id)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
