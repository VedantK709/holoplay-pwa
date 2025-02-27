import { v4 as uuidv4 } from "uuid";
// @ts-ignore
import localStorageDB from "localstoragedb";
import { sponsorBlockCategoriesValues } from "../components/SponsorBlockSettings";
import { Settings } from "../types/interfaces/Settings";

const initDb = () => {
  const db = new localStorageDB("library", localStorage);

  if (db.isNew()) {
    db.createTable("playlists", [
      "playlistId",
      "createdAt",
      "title",
      "videos",
      "videoCount",
      "type",
    ]);
    db.createTable("settings", [
      "createdAt",
      "currentInstance",
      "defaultInstance",
      "customInstances",
    ]);

    db.insert("playlists", {
      createdAt: new Date().toISOString(),
      title: "Favorites",
      videos: [],
    });
    db.insert("settings", {
      createdAt: new Date().toISOString(),
      currentInstance: null,
      defaultInstance: null,
      customInstances: [],
    });

    db.commit();
  }

  if (!db.tableExists("history")) {
    db.createTable("history", [
      "videoThumbnails",
      "description",
      "formatStreams",
      "lengthSeconds",
      "title",
      "type",
      "videoId",
      "videoThumbnails",
    ]);
  }

  if (!db.tableExists("searchHistory")) {
    db.createTable("searchHistory", ["createdAt", "term"]);
  }

  if (!db.columnExists("settings", "defaultInstance")) {
    db.alterTable("settings", "defaultInstance");
    db.commit();
  }

  if (!db.columnExists("settings", "customInstances")) {
    db.alterTable("settings", "customInstances");
    db.commit();
  }

  if (!db.columnExists("settings", "videoMode")) {
    db.alterTable("settings", "videoMode", true);
    db.commit();
  }

  if (!db.columnExists("settings", "deviceId")) {
    db.alterTable("settings", "deviceId", uuidv4());
    db.commit();
  }

  if (!db.columnExists("settings", "sponsorBlock")) {
    db.alterTable("settings", "sponsorBlock", true);
    db.alterTable("settings", "sponsorBlockCategories");
    db.commit();

    db.update("settings", { ID: 1 }, (data: Settings) => ({
      sponsorBlockCategories: sponsorBlockCategoriesValues.map(
        (category) => category.value
      ),
    }));
    db.commit();
  }

  if (!db.tableExists("migrations")) {
    db.createTable("migrations", ["createdAt", "name"]);
  }

  return db;
};

export const db = initDb();

require("./migrations");
