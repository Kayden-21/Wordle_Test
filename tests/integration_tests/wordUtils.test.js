const axios = require('axios');
const { createNewEvent, getActiveEvent, getWord } = require('../../routes/Utility/wordUtils');
const DB = require('../../routes/Utility/dbUtils');

jest.mock('axios');

DB.executeQuery = jest.fn();

describe('Integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getWord should fetch a word from the external API', async () => {
    axios.get.mockResolvedValue({ data: 'hello' });

    const result = await getWord();

    expect(result).toBe('hello');
    expect(axios.get).toHaveBeenCalledWith('https://random-word-api.vercel.app/api?words=1&length=5');
  });

  it('createNewEvent should deactivate previous events and create a new event', async () => {
    axios.get.mockResolvedValue({ data: 'hello' });
    DB.executeQuery.mockResolvedValueOnce().mockResolvedValueOnce();

    await createNewEvent();

    expect(DB.executeQuery).toHaveBeenCalledWith('UPDATE EVENTS SET active = 0;');
    expect(DB.executeQuery).toHaveBeenCalledWith('INSERT INTO EVENTS (word, active) VALUES (\'hello\', 1)');
  });

  it('getActiveEvent should fetch the active event from the DB', async () => {
    const mockResult = [{ word: 'hello', active: 1 }];
    DB.executeQuery.mockResolvedValue(mockResult);

    const result = await getActiveEvent();

    expect(result).toEqual(mockResult);
    expect(DB.executeQuery).toHaveBeenCalledWith('SELECT * FROM EVENTS WHERE active = 1');
  });
});
