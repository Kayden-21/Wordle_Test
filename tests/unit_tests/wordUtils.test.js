const axios = require('axios');
const { createNewEvent, getActiveEvent, getWord } = require('../../routes/Utility/wordUtils'); // Import getWord along with other functions
const DB = require('../../routes/Utility/dbUtils'); // Make sure to import your DB module as well

// Mock axios.get to avoid making actual HTTP requests
jest.mock('axios');

describe('getWord', () => {
  it('should return a random word', async () => {
    // Mock axios.get to return a fake response
    axios.get.mockResolvedValue({ data: 'testword' });

    const word = await getWord();
    expect(word).toBe('testword');
  });
});

describe('createNewEvent', () => {
  it('should create a new event', async () => {
    // Mock necessary dependencies
    axios.get.mockResolvedValue({ data: 'testword' });

    // Use jest.spyOn to mock DB.executeQuery
    jest.spyOn(DB, 'executeQuery').mockResolvedValue();

    const result = await createNewEvent();
    // Assert that the function completes without errors
    expect(result).toBeUndefined();
  });
});

describe('getActiveEvent', () => {
  it('should return the active event', async () => {
    // Use jest.spyOn to mock DB.executeQuery
    jest.spyOn(DB, 'executeQuery').mockResolvedValue([{ word: 'testword', active: 1 }]);

    const activeEvent = await getActiveEvent();
    expect(activeEvent).toEqual([{ word: 'testword', active: 1 }]);
  });
});
