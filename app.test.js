const { scrapeData } = require('./app');
const axios = require('axios');
const cheerio = require('cheerio');

describe('app', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('scrapeData', () => {
    it('should initializes cheerio and get the data', async () => {
      const loadSpy = jest.spyOn(cheerio, 'load').mockImplementation();
      const getSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: '<div>teresa teng</div>' });
      await scrapeData();
      expect(loadSpy).toHaveBeenCalledWith('<div>teresa teng</div>');
    });
  });
});