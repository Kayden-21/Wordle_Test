const DB = require('../../routes/Utility/dbUtils');
const word = require('../../routes/Utility/wordUtils');
const { SaveGame, HighScores, HasPlayedGame, getUserRank, getUserScore } = require('../../routes/Utility/gameUtils');

DB.executeQuery = jest.fn();
word.getActiveEvent = jest.fn();

describe('Game Utils Integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('SaveGame should insert the correct game data', async () => {
    word.getActiveEvent.mockResolvedValue();
    DB.executeQuery.mockResolvedValueOnce([{ event_id: 1 }])
      .mockResolvedValueOnce([{ user_id: 2 }])
      .mockResolvedValueOnce();

    await SaveGame('1:00', 'test@example.com');

    expect(DB.executeQuery).toHaveBeenCalledWith('SELECT event_id FROM EVENTS WHERE active = 1');
    expect(DB.executeQuery).toHaveBeenCalledWith('SELECT user_id FROM USERS WHERE user_email = \'test@example.com\'');
    expect(DB.executeQuery).toHaveBeenCalledWith('INSERT INTO EVENTRESPONSES (event_id,user_id,duration) VALUES (1,2,\'1:00\')');
  });

  it('HighScores should retrieve top 5 scores', async () => {
    const mockScores = [
      { event_id: 1, user_id: 2, word: 'hello', duration: '1:00' },
      { event_id: 1, user_id: 3, word: 'hello', duration: '1:27' },
      { event_id: 1, user_id: 4, word: 'hello', duration: '1:54' },
      { event_id: 1, user_id: 5, word: 'hello', duration: '1:21' },
      { event_id: 1, user_id: 6, word: 'hello', duration: '1:30' },
    ];
    DB.executeQuery.mockResolvedValue(mockScores);

    const result = await HighScores();

    expect(result).toEqual(mockScores);
  });

  it('getUserScore should retrieve user score', async () => {
    const mockScore = { event_id: 1, user_id: 2, word: 'hello', duration: '1:00' };
    DB.executeQuery.mockResolvedValueOnce([{ user_id: 2 }])
      .mockResolvedValueOnce([mockScore]);

    const result = await getUserScore('test@example.com');

    expect(result).toEqual([mockScore]);
  });

  it('getUserRank should retrieve user rank', async () => {
    const mockRank = { UserAbove: 5 };
    DB.executeQuery.mockResolvedValue([mockRank]);

    const result = await getUserRank(2);

    expect(result).toEqual([mockRank]);
  });

  it('HasPlayedGame should check if user has played the game', async () => {
    const mockResult = { played: 1 };
    DB.executeQuery.mockResolvedValue([mockResult]);

    const result = await HasPlayedGame('test@example.com');

    expect(result).toEqual([mockResult]);
  });

});

