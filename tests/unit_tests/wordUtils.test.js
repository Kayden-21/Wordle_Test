const axios = require('axios');
const { createNewEvent, getActiveEvent, getWord } = require('../../routes/Utility/wordUtils');
const DB = require('../../routes/Utility/dbUtils');

jest.mock('axios');

describe('getWord', () => {
  it('should return a random word', async () => {
    axios.get.mockResolvedValue({ data: 'testword' });

    const word = await getWord();
    expect(word).toBe('testword');
  });
});

describe('createNewEvent', () => {
  it('should create a new event', async () => {
    axios.get.mockResolvedValue({ data: 'testword' });

    jest.spyOn(DB, 'executeQuery').mockResolvedValue();

    const result = await createNewEvent();
    expect(result).toBeUndefined();
  });
});

describe('getActiveEvent', () => {
  it('should return the active event', async () => {
    jest.spyOn(DB, 'executeQuery').mockResolvedValue([{ word: 'testword', active: 1 }]);

    const activeEvent = await getActiveEvent();
    expect(activeEvent).toEqual([{ word: 'testword', active: 1 }]);
  });
});
