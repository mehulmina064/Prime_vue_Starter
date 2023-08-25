/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import service from "@/utils/request";
const HNA_BASE_URL = "/hacker-api";


export const useHnaStore = defineStore("hnaStore", {
  state: () => ({
    topStoriesList: [],
    pastStoriesList: [],
    commentsOnStoryList: []

  }),
  actions: {
    
    getTopStoriesData() {
        console.log("getTopStoriesData");
      return new Promise((resolve, reject) => {
        service
          .get(
            `${HNA_BASE_URL}/top-stories-data`
          )
          .then((response) => {
            console.log('response',response.length);
            this.topStoriesList = response;
            resolve(response);
          })
          .catch(() => {
            reject(resolve);
          });
      });
    },
    getPastStoriesData() {
        return new Promise((resolve, reject) => {
          service
            .get(
              `${HNA_BASE_URL}/past-stories-data`,
            )
            .then((response) => {
              this.pastStoriesList = response;
              resolve(response);
            })
            .catch(() => {
              reject(resolve);
            });
        });
      },
    getCommentsOnStory(id) {
        return new Promise((resolve, reject) => {
          service
            .get(
              `${HNA_BASE_URL}/comments-data/${id}`,
            )
            .then((response) => {
              this.commentsOnStoryList = response;
              resolve(response);
            })
            .catch(() => {
              reject(resolve);
            });
        });
      },

  },
  getters: {
    getTopStoriesList: (state) => state.topStoriesList,
    getPastStoriesList: (state) => state.pastStoriesList,
    getCommentsOnStoryList: (state) => state.commentsOnStoryList,
  },
});
