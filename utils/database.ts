import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export const init = (): Promise<void> => {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place: Place) => {
  const promise = new Promise<SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          console.log(result);
          const places = [] as Place[];

          for (const datapoint of result.rows._array) {
            places.push(
              new Place(
                datapoint.title,
                datapoint.imageUri,
                {
                  address: datapoint.address,
                  latitude: datapoint.lat,
                  longitude: datapoint.lng,
                },
                datapoint.id
              )
            );
          }

          resolve(places);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
  
  return promise;
};
