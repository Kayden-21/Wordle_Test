const sql = require('mssql');
const { executeQuery, checkPoolStatus, closeConnection } = require('../../routes/Utility/dbUtils');

const getMockFunctions = () => {
    const mockQuery = jest.fn();
    const mockClose = jest.fn();
    const mockConnect = jest.fn();
  
    return { mockQuery, mockClose, mockConnect };
  };
  
  const { mockQuery, mockClose, mockConnect } = getMockFunctions();
  
  jest.mock('mssql', () => ({
    ConnectionPool: jest.fn().mockImplementation(() => ({
      connect: mockConnect,
      request: jest.fn().mockReturnThis(),
      query: mockQuery,
      connected: false,
      close: mockClose,
    })),
  }));
  
  describe('DB Utils Integration tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('executeQuery should connect to the DB if not connected and execute the given SQL query', async () => {
      const mockResult = [{ id: 1, name: 'test' }];
      mockQuery.mockResolvedValueOnce({ recordset: mockResult });
  
      const result = await executeQuery('SELECT * FROM test');
  
      expect(mockConnect).toHaveBeenCalled();
      expect(mockQuery).toHaveBeenCalledWith('SELECT * FROM test');
      expect(result).toEqual(mockResult);
    });
  
  
  it('checkPoolStatus should return the connection status of the pool', () => {
    sql.ConnectionPool.prototype.connected = true;

    const status = checkPoolStatus();

    expect(status).toBe(true);
  });

  it('closeConnection should close the connection if connected', () => {
    sql.ConnectionPool.prototype.connected = true;
    closeConnection();

    expect(sql.ConnectionPool.prototype.close).toHaveBeenCalled();
  });

});

